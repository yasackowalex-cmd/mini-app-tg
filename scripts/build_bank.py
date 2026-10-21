# -*- coding: utf-8 -*-
"""
Сборка банка: папка bank/**/*.md → один bank.json для приложения.
Картинки берутся из assets/ (их делает scripts/tikz_to_svg.py).
Запуск: python -I scripts/build_bank.py [--bank bank] [--assets assets] [--out out/bank.json]
"""
import re, os, sys, json, glob, argparse, hashlib
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INT_FIELDS = ('kim', 'variant')
BOOL_FIELDS = ('has_image', 'author_task')
REQUIRED = ('id', 'exam', 'kim', 'section', 'topic', 'level', 'type', 'answer')



def versioned(assets_dir, path, rel=None):
    # rel: путь файла относительно assets_dir; по умолчанию только имя файла
    with open(os.path.join(assets_dir, rel or os.path.basename(path)), 'rb') as fh:
        return f"{path}?v={hashlib.sha1(fh.read()).hexdigest()[:8]}"

def parse_scalar(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] == '"':
        return v[1:-1].replace('\\"', '"')
    if v.startswith('[') and v.endswith(']'):
        return [x.strip() for x in v[1:-1].split(',') if x.strip()]
    return v


def parse_md(path):
    """Шапка YAML (плоская, как пишет parse_bank.py) + разделы «## ...»."""
    raw = open(path, encoding='utf-8').read().replace('\r\n', '\n')
    m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
    if not m:
        raise ValueError('нет YAML-шапки')
    meta = {}
    for line in m.group(1).split('\n'):
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        k, _, v = line.partition(':')
        v = re.sub(r'\s+#.*$', '', v) if not v.strip().startswith('"') else v
        meta[k.strip()] = parse_scalar(v)
    for k in INT_FIELDS:
        meta[k] = int(meta[k]) if str(meta.get(k, '')).isdigit() else None
    for k in BOOL_FIELDS:
        meta[k] = str(meta.get(k, '')).lower() == 'true'

    sections, cur = {}, None
    for line in m.group(2).split('\n'):
        h = re.match(r'##\s+(.+?)\s*$', line)
        if h:
            cur = h.group(1); sections[cur] = []
        elif cur:
            sections[cur].append(line)
    sections = {k: '\n'.join(v).strip() for k, v in sections.items()}

    tikz_sec = next((v for k, v in sections.items() if k.startswith('Рисунок')), '')
    meta['tikz'] = re.findall(r'```latex\n(.*?)\n```', tikz_sec, re.S)
    meta['condition'] = sections.get('Условие', '')
    sol = sections.get('Решение', '')
    # чертежи внутри решения (рисунок с указанием сил и т. п.): блок ```latex → метка [[рис N]]
    meta['sol_tikz'] = re.findall(r'```latex\n(.*?)\n```', sol, re.S)
    n = iter(range(1, len(meta['sol_tikz']) + 1))
    sol = re.sub(r'```latex\n.*?\n```', lambda _: f'[[рис {next(n)}]]', sol, flags=re.S)
    meta['solution'] = None if sol in ('', 'TODO') else sol
    meta['unit'] = meta.get('unit', '')
    meta['check'] = check_mode(meta)
    return meta


CHOICE_RE = re.compile(r'соответстви|выбер|цифры в ответе могут повторяться|характер изменения|как измен|как меня', re.I)


def check_mode(t):
    """Как сайт проверяет ответ ученика: number — число, seq — цифры по порядку,
    set — цифры в любом порядке («выберите верные утверждения», КИМ 20), pm — значение и погрешность
    (КИМ 19, ответ «4,4 ± 0,2»), none — только показать ответ."""
    a = str(t.get('answer', '')).strip()
    if re.fullmatch(r'\d+(?:[.,]\d+)?\s*±\s*\d+(?:[.,]\d+)?', a):
        return 'pm'
    if str(t.get('kim')) == '20' and re.fullmatch(r'\d+', a):
        return 'set'
    if t.get('type') == 'соответствие/выбор' and re.fullmatch(r'\d+', a):
        cond = t.get('condition', '')
        if re.search(r'выбер', cond, re.I) and not re.search(r'соответстви', cond, re.I):
            return 'set'
        return 'seq'
    if re.fullmatch(r'[-−]?\d+(?:[.,]\d+)?(?:·10[⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?', a):
        return 'number'
    return 'none'


def stamp_index():
    """Ставит в index.html, print.html и exam.html ?v=<хеш файла> у скриптов и стилей из web/,
    чтобы Телеграм и браузеры брали новую версию сразу после заливки."""
    def sub(m):
        return f'{m.group(1)}="{versioned(ROOT, m.group(2), m.group(2))}"'
    for name in ('index.html', 'print.html', 'exam.html'):
        path = os.path.join(ROOT, name)
        html = open(path, encoding='utf-8').read()
        new = re.sub(r'(src|href)="(web/[^"?]+\.(?:js|css))(?:\?v=[0-9a-f]+)?"', sub, html)
        if new != html:
            open(path, 'w', encoding='utf-8', newline='\n').write(new)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bank', default=os.path.join(ROOT, 'bank'))
    ap.add_argument('--assets', default=os.path.join(ROOT, 'assets'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'out', 'bank.json'))
    ap.add_argument('--strict', action='store_true', help='код выхода 1, если есть проблемы')
    a = ap.parse_args()

    files = sorted(glob.glob(os.path.join(a.bank, '**', '*.md'), recursive=True))
    tasks, problems, ids = [], [], Counter()
    for f in files:
        rel = os.path.relpath(f, a.bank).replace(os.sep, '/')
        try:
            t = parse_md(f)
        except Exception as e:
            problems.append((rel, f'не разобран: {e}')); continue
        t['file'] = rel
        ids[t.get('id')] += 1
        for k in REQUIRED:
            if t.get(k) in (None, '', 'TODO'):
                problems.append((rel, f'пусто поле {k}'))
        # фото и сканы, которые не перерисованы в TikZ: assets/<id>_photo<N>.png или .jpg, идут перед чертежами
        imgs = ['assets/' + os.path.basename(p) for p in sorted(
            glob.glob(os.path.join(a.assets, f"{t['id']}_photo*.png")) + glob.glob(os.path.join(a.assets, f"{t['id']}_photo*.jpg")))]
        for i in range(1, len(t['tikz']) + 1):
            name = f"{t['id']}_{i}.svg"
            if os.path.exists(os.path.join(a.assets, name)):
                imgs.append('assets/' + name)
            else:
                problems.append((rel, f'нет SVG {name} (запустить tikz_to_svg.py)'))
        # ?v=<хеш файла>: браузер и Telegram не показывают старую картинку после правки рисунка
        t['images'] = [versioned(a.assets, p) for p in imgs]
        t['solution_images'] = []
        for i in range(1, len(t['sol_tikz']) + 1):
            name = f"{t['id']}_s{i}.svg"
            if os.path.exists(os.path.join(a.assets, name)):
                t['solution_images'].append(versioned(a.assets, 'assets/' + name))
            else:
                problems.append((rel, f'нет SVG {name} (запустить tikz_to_svg.py)'))
        tasks.append(t)
    for i, n in ids.items():
        if n > 1:
            problems.append((str(i), f'id повторяется {n} раз'))

    # постоянные пробные варианты (exams/variants.json, scripts/make_variants.py): задачи должны быть в банке и стоять на своём номере
    vpath = os.path.join(ROOT, 'exams', 'variants.json')
    if os.path.exists(vpath):
        kims = {t['id']: t.get('kim') for t in tasks}
        for v in json.load(open(vpath, encoding='utf-8')):
            for i, tid in enumerate(v['ids']):
                if tid not in kims:
                    problems.append(('exams/variants.json', f"вариант {v['n']}: задачи {tid} нет в банке, заменить другой задачей №{i + 1}"))
                elif str(kims[tid]) != str(i + 1):
                    problems.append(('exams/variants.json', f"вариант {v['n']}: {tid} теперь КИМ {kims[tid]}, а стоит на №{i + 1}"))

    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(tasks, f, ensure_ascii=False, indent=1)

    # справочник кодов тем для фильтра на странице банка
    import csv
    with open(os.path.join(ROOT, 'topics.csv'), encoding='utf-8-sig', newline='') as f:
        topics = {r['topic']: r['title'] for r in csv.DictReader(f)}
    with open(os.path.join(os.path.dirname(a.out), 'topics.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump(topics, f, ensure_ascii=False, indent=1)

    # уроки по темам (lessons/<тема>.md, scripts/import_lesson.py): конспект, видео, задачи ДЗ из банка
    lessons = []
    by_id = {t['id'] for t in tasks}
    for f in sorted(glob.glob(os.path.join(ROOT, 'lessons', '*.md'))):
        rel = os.path.relpath(f, ROOT)
        L = parse_md(f)
        code = L['topic'].replace('.', '_')
        raw = open(f, encoding='utf-8').read()
        m = re.search(r'## Конспект\n(.*?)(?=\n## |\Z)', raw, re.S)

        def img(m, rel=rel, code=code):
            # [[рис N]] — чертёж TikZ из этого файла, [[файл имя]] — картинка из assets/lessons/
            name = f'lesson_{code}_{m.group(1)}.svg' if m.group(1) else 'lessons/' + m.group(2)
            if not os.path.exists(os.path.join(a.assets, name)):
                problems.append((rel, f'нет картинки {name}'))
                return ''
            return f'[[img {versioned(a.assets, "assets/" + name, name)}]]'
        text = re.sub(r'\[\[рис (\d+)\]\]|\[\[файл ([^\]]+)\]\]', img, m.group(1).strip() if m else '')
        hw = [i for i in (L.get('hw') or []) if i in by_id]
        for i in set(L.get('hw') or []) - by_id:
            problems.append((rel, f'задачи ДЗ {i} нет в банке'))
        lessons.append({'topic': L['topic'], 'title': L.get('title', ''), 'keywords': L.get('keywords', ''),
                        'video': L.get('video') or [], 'hw': hw, 'conspect': text})
    with open(os.path.join(os.path.dirname(a.out), 'lessons.json'), 'w', encoding='utf-8', newline='\n') as f:
        json.dump(lessons, f, ensure_ascii=False, indent=1)

    stamp_index()
    print(f"ЗАДАЧ В БАНКЕ: {len(tasks)}  →  {os.path.relpath(a.out, ROOT)}")
    print(f"с topic: {sum(1 for t in tasks if t.get('topic') not in (None, '', 'TODO'))}, "
          f"с решением: {sum(1 for t in tasks if t['solution'])}, "
          f"с рисунком: {sum(1 for t in tasks if t['tikz'])}")
    for key in ('section', 'topic', 'kim'):
        c = Counter(str(t.get(key)) for t in tasks)
        print(f"-- {key}: " + ', '.join(f'{k}: {v}' for k, v in sorted(c.items())))
    if problems:
        print(f"\nПРОБЛЕМЫ ({len(problems)}):")
        for rel, why in problems:
            print(f"   {rel} | {why}")
    return 1 if problems and a.strict else 0


if __name__ == '__main__':
    sys.exit(main())
