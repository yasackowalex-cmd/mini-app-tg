# Банк задач «Саня дай сотку»

Банк задач ЕГЭ по физике и (позже) Telegram Mini App. Архитектура и решения: [PROJECT.md](PROJECT.md).

## Этап 0: сборка банка

```
python -I scripts/parse_bank.py <библиотека>/tasks/**/*.tex   # .tex → bank/<раздел>/<id>.md
python -I scripts/tikz_to_svg.py                               # TikZ → assets/<id>_<n>.svg
python -I scripts/build_bank.py                                # bank/ → out/bank.json
```

- `themes.csv`: словесная тема из `% ТЕМА:` → код темы. Парсер печатает темы без кода, их дописать сюда.
- `topics.csv`: справочник кодов тем курса.
- Парсер не перезаписывает существующие .md (ручные правки сохраняются); перезаписать: `--force`.
- Для чертежей нужны TeX Live или MiKTeX (`latex`, `dvisvgm`). Макросы из `egephys-style.sty`
  добавлять в `scripts/tikz_preamble.tex`.
