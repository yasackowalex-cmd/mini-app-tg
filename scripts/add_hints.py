"""Вписывает подсказки (раздел «## Подсказка» перед «## Решение») из JSON {id: текст}.

Подсказка — одна идея: с какого закона или формулы начать, без решения и ответа.
Запуск: python3 scripts/add_hints.py файл.json [...]; существующая подсказка заменяется.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
files = {p.stem: p for p in list(ROOT.glob('bank/**/*.md')) + list(ROOT.glob('lessons/tasks/*.md'))}
done = miss = 0
for arg in sys.argv[1:]:
    for tid, text in json.load(open(arg, encoding='utf-8')).items():
        p = files.get(tid)
        if not p:
            print('нет файла:', tid); miss += 1; continue
        s = p.read_text(encoding='utf-8')
        s = re.sub(r'## Подсказка\n.*?(?=\n## )\n', '', s, flags=re.S)
        if '\n## Решение' not in s:
            print('нет «## Решение»:', tid); miss += 1; continue
        s = s.replace('\n## Решение', f'\n## Подсказка\n\n{text.strip()}\n\n## Решение', 1)
        p.write_text(s, encoding='utf-8'); done += 1
print(f'подсказок: {done}, пропущено: {miss}')
