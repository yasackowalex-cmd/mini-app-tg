# -*- coding: utf-8 -*-
"""
Сборка банка: папка bank/**/*.md → один bank.json для приложения.
Картинки берутся из assets/ (их делает scripts/tikz_to_svg.py).
Запуск: python -I scripts/build_bank.py [--bank bank] [--assets assets] [--out out/bank.json]
"""
import re, os, sys, json, glob, argparse
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INT_FIELDS = ('kim', 'variant')
BOOL_FIELDS = ('has_image', 'author_task')
REQUIRED = ('id', 'exam', 'kim', 'section', 'topic', 'level', 'type', 'answer')


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
    meta['solution'] = None if sol in ('', 'TODO') else sol
    return meta


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bank', default=os.path.join(ROOT, 'bank'))
    ap.add_argument('--assets', default=os.path.join(ROOT, 'assets'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'out', 'bank.json'))
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
        imgs = []
        for i in range(1, len(t['tikz']) + 1):
            name = f"{t['id']}_{i}.svg"
            if os.path.exists(os.path.join(a.assets, name)):
                imgs.append('assets/' + name)
            else:
                problems.append((rel, f'нет SVG {name} (запустить tikz_to_svg.py)'))
        t['images'] = imgs
        tasks.append(t)
    for i, n in ids.items():
        if n > 1:
            problems.append((str(i), f'id повторяется {n} раз'))

    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(tasks, f, ensure_ascii=False, indent=1)

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
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
