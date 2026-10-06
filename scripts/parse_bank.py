# -*- coding: utf-8 -*-
"""
Парсер банка задач ЕГЭ из .tex-файлов курса «Саня дай сотку».
Вход:  файлы с окружениями taskbasic/taskmedium/taskadvanced + \answer{}
Выход: по файлу bank/<раздел>/<id>.md на задачу + отчёт.
       topic проставляется по themes.csv (словесная тема → код).
       bank.json собирает scripts/build_bank.py из папки bank/.
Запуск: python -I scripts/parse_bank.py src/*.tex
"""
import re, csv, sys, os, argparse, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LEVEL = {'taskbasic': 'Б', 'taskmedium': 'П', 'taskadvanced': 'В'}

SECTION_BY_DIR = {
    '01_mechanics': 'Механика',
    '02_mkt': 'МКТ и термодинамика',
    '03_electrodynamics': 'Электродинамика',
    '04_optics': 'Оптика',
    '05_quantum': 'Квантовая физика',
}
SECTION_BY_TAG = {
    'МЕХАНИКА': 'Механика',
    'МКТ': 'МКТ и термодинамика',
    'ТЕРМОДИНАМИКА': 'МКТ и термодинамика',
    'ЭЛЕКТРОДИНАМИКА': 'Электродинамика',
    'ОПТИКА': 'Оптика',
    'КВАНТЫ': 'Квантовая физика',
    'АТОМ': 'Квантовая физика',
}

# тип задачи по номеру КИМ (ЕГЭ физика): первая часть / вторая часть
def kim_type(kim, body):
    if kim is None: return 'не определён'
    k = int(kim)
    if k in (5, 6, 10, 12, 16, 18, 20):
        return 'соответствие/выбор'
    if k in (21,):
        return 'качественная'
    if k >= 22:
        return 'расчётная (часть 2)'
    return 'расчётная'

def norm(s):
    return unicodedata.normalize('NFC', s)

def theme_key(s):
    """Ключ для сверки темы с themes.csv: регистр, Ё/Е, пробелы и точка в конце не важны."""
    s = norm(s or '').upper().replace('Ё', 'Е')
    s = re.sub(r'\s+', ' ', s).strip().rstrip('.')
    return s

def load_themes(path):
    if not os.path.exists(path):
        return {}
    with open(path, encoding='utf-8-sig', newline='') as f:
        return {theme_key(r['theme']): r['topic'].strip()
                for r in csv.DictReader(f) if r.get('theme') and r.get('topic')}

DIR_BY_SECTION = {v: k for k, v in SECTION_BY_DIR.items()}

def section_dir(t):
    """Папка раздела в bank/: как в исходной библиотеке (01_mechanics, ...)."""
    for d in SECTION_BY_DIR:
        if t['src_path'] and d in t['src_path']: return d
    return DIR_BY_SECTION.get(t['section'], '00_other')

def strip_tex(s):
    """Чистим условие от служебного, оставляя математику и текст."""
    s = re.sub(r'\\textbf\{Задача\s*\d+\.\}\s*', '', s)
    s = re.sub(r'\\nopagebreak\\smallskip\s*', '', s)
    s = re.sub(r'\\kim(avt)?\{\d+\}', '', s)
    # убираем опустевшие после выноса TikZ обёртки
    for _ in range(4):
        s = re.sub(r'\\begin\{center\}\s*\\end\{center\}', '', s)
        s = re.sub(r'\\begin\{(stylebasic|tabular)\}(\{[^}]*\})?\s*\\end\{\1\}', '', s)
        s = re.sub(r'\\begin\{center\}\s*\\end\{center\}', '', s)
    s = re.sub(r'(&\s*)+\n', '\n', s)
    s = re.sub(r'\n[ \t]*\n[ \t]*\n+', '\n\n', s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()

def extract_tikz(body):
    """Вынимаем все tikzpicture целиком (вместе с обёрткой center/tabular, если она только для них)."""
    pics, rest, i = [], [], 0
    while True:
        m = re.search(r'\\begin\{tikzpicture\}', body[i:])
        if not m: 
            rest.append(body[i:]); break
        start = i + m.start()
        depth, j = 0, start
        while True:
            nb = body.find(r'\begin{tikzpicture}', j)
            ne = body.find(r'\end{tikzpicture}', j)
            if ne == -1: ne = len(body)
            if nb != -1 and nb < ne:
                depth += 1; j = nb + 19
            else:
                depth -= 1; j = ne + 17
                if depth == 0: break
        pics.append(body[start:j])
        rest.append(body[i:start])
        i = j
    return pics, ''.join(rest)

TASK_RE = re.compile(
    r'\\begin\{(taskbasic|taskmedium|taskadvanced)\}'
    r'(?:\[(?P<opts>[^\]]*)\])?'
    r'(?P<body>.*?)'
    r'\\end\{\1\}'
    r'\s*(?:\\answer\{(?P<ans>[^}]*)\})?',
    re.S)

HEADER_RE = re.compile(r'%\s*ФАЙЛ:\s*(?P<path>\S+)\s*\n%\s*ТЕМА:\s*(?P<theme>.+?)\s*\n', re.S)
TAG_RE = re.compile(r'%\s*Тег:\s*(?P<tags>[^\n]+)')

def parse_file(path):
    raw = norm(open(path, encoding='utf-8').read())

    # карта: позиция -> (file_path, theme) из блочных заголовков
    headers = [(m.start(), m.group('path'), m.group('theme').strip()) for m in HEADER_RE.finditer(raw)]
    def header_for(pos):
        cur = (None, None)
        for p, fp, th in headers:
            if p <= pos: cur = (fp, th)
        return cur

    # карта: позиция -> теги из комментария перед задачей
    tagmarks = [(m.start(), m.group('tags').strip()) for m in TAG_RE.finditer(raw)]
    def tags_for(pos):
        best = None
        for p, t in tagmarks:
            if p <= pos: best = t
        return best or ''

    out = []
    for m in TASK_RE.finditer(raw):
        env = m.group(1)
        opts = m.group('opts') or ''
        body = m.group('body')
        ans = m.group('ans')
        pos = m.start()

        fp, theme = header_for(pos)
        tagline = tags_for(pos)

        lab = re.search(r'\\label\{task:([^}]+)\}', opts)
        label = lab.group(1) if lab else None

        kim = re.search(r'\\kim(?:avt)?\{(\d+)\}', body)
        kim_n = kim.group(1) if kim else None
        avt = bool(re.search(r'\\kimavt\{', body))
        if kim_n is None:
            k2 = re.search(r'#КИМ_(\d+)', tagline)
            kim_n = str(int(k2.group(1))) if k2 else None

        var = re.search(r'#ВАРИАНТ_(\d+)', tagline)
        variant = int(var.group(1)) if var else None

        tags = [t.lstrip('#') for t in re.findall(r'#[^\s#]+', tagline)]
        tags = [t for t in tags if not t.startswith('КИМ_') and not t.startswith('ВАРИАНТ_')]

        section = None
        if fp:
            for d, name in SECTION_BY_DIR.items():
                if d in fp: section = name; break
        if section is None:
            for t in tags:
                if t in SECTION_BY_TAG: section = SECTION_BY_TAG[t]; break

        pics, text = extract_tikz(body)
        text = strip_tex(text)

        out.append({
            'label': label,
            'src': os.path.basename(path),
            'src_path': fp,
            'section': section,
            'theme': theme,
            'kim': int(kim_n) if kim_n else None,
            'author_task': avt,
            'level': LEVEL[env],
            'variant': variant,
            'tags': tags,
            'type': kim_type(kim_n, body),
            'answer': ans.strip() if ans else None,
            'condition': text,
            'tikz': pics,
            'has_image': len(pics) > 0,
        })
    return out

def slug(t):
    return re.sub(r'[^a-z0-9_]+', '-', (t or 'task').lower())

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('files', nargs='+')
    ap.add_argument('--out', default=os.path.join(ROOT, 'bank'))
    ap.add_argument('--themes', default=os.path.join(ROOT, 'themes.csv'))
    ap.add_argument('--force', action='store_true',
                    help='перезаписать уже существующие .md (иначе ручные правки не трогаем)')
    a = ap.parse_args()
    themes = load_themes(a.themes)

    tasks, bad = [], []
    for f in a.files:
        for t in parse_file(f):
            if not t['label']: bad.append((f, t['condition'][:60], 'нет \\label'))
            if t['answer'] is None: bad.append((f, (t['label'] or '?'), 'нет \\answer'))
            tasks.append(t)

    seen, written, kept, unmapped = {}, 0, 0, {}
    for t in tasks:
        tid = t['label'] or slug(t['condition'][:30])
        seen[tid] = seen.get(tid, 0) + 1
        if seen[tid] > 1: tid = f"{tid}--{seen[tid]}"
        t['id'] = tid
        t['topic'] = themes.get(theme_key(t['theme']))
        if not t['topic']:
            unmapped[t['theme'] or '(нет темы)'] = unmapped.get(t['theme'] or '(нет темы)', 0) + 1
        fm = [
            '---',
            f"id: {tid}",
            "exam: ЕГЭ",
            f"kim: {t['kim'] if t['kim'] else ''}",
            f"section: {t['section'] or ''}",
            f"theme: {t['theme'] or ''}",
            f"topic: {t['topic'] or 'TODO'}",
            f"level: {t['level']}",
            f"type: {t['type']}",
            f"variant: {t['variant'] if t['variant'] else ''}",
            f"answer: \"{t['answer'] or ''}\"",
            f"has_image: {str(t['has_image']).lower()}",
            f"author_task: {str(t['author_task']).lower()}",
            f"tags: [{', '.join(t['tags'])}]",
            f"source: {t['src']}",
            '---', '',
            '## Условие', '', t['condition'], '',
        ]
        if t['tikz']:
            fm += ['## Рисунок (TikZ)', '', '```latex'] + t['tikz'] + ['```', '']
        fm += ['## Решение', '', 'TODO', '']
        tdir = os.path.join(a.out, section_dir(t)); os.makedirs(tdir, exist_ok=True)
        dst = os.path.join(tdir, tid + '.md')
        if os.path.exists(dst) and not a.force:
            kept += 1; continue
        open(dst, 'w', encoding='utf-8', newline='\n').write('\n'.join(fm))
        written += 1

    # отчёт
    from collections import Counter
    print(f"ЗАДАЧ ИЗВЛЕЧЕНО: {len(tasks)}")
    print(f"с рисунком: {sum(1 for t in tasks if t['has_image'])}")
    print(f"с ответом:  {sum(1 for t in tasks if t['answer'])}")
    print(f"с topic:    {sum(1 for t in tasks if t['topic'])}")
    print(f"записано .md: {written}, уже были и не тронуты: {kept}" + (" (перезаписать: --force)" if kept else ''))
    print()
    for key in ('section', 'theme', 'topic', 'kim', 'level', 'type'):
        c = Counter(str(t[key]) for t in tasks)
        print(f"-- {key}:")
        for k, v in sorted(c.items(), key=lambda x: -x[1]):
            print(f"   {k}: {v}")
        print()
    if unmapped:
        print(f"ТЕМЫ БЕЗ КОДА (добавить в {os.path.basename(a.themes)}):")
        for th, n in sorted(unmapped.items(), key=lambda x: -x[1]): print(f"   {th}  (задач: {n})")
        print()
    if bad:
        print("ПРОБЛЕМЫ:")
        for f, w, why in bad: print(f"   {os.path.basename(f)} | {w} | {why}")

if __name__ == '__main__':
    main()
