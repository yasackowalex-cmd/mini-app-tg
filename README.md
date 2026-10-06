# Банк задач «Саня дай сотку»

Банк задач ЕГЭ по физике и (позже) Telegram Mini App. Архитектура и решения: [PROJECT.md](PROJECT.md).

## Этап 0: сборка банка

```
python -I scripts/parse_bank.py library/*.tex library/*/*.tex  # .tex → bank/<раздел>/<id>.md
python -I scripts/tikz_to_svg.py                               # TikZ → assets/<id>_<n>.svg
python -I scripts/build_bank.py                                # bank/ → out/bank.json
```

- `library/`: исходная .tex библиотека и `egephys-style.sty`.
- `topic` проставляется по порядку: `overrides.csv` (ручная правка по id) → `themes.csv` (тема из `% ТЕМА:`;
  пустой код значит «тема смешанная») → `topic_tags.csv` (первый тег задачи с кодом).
  Парсер печатает задачи, которым код не нашёлся.
- `overrides.csv`: ручные правки по id задачи (`topic`, `answer`), переживают перезапуск парсера.
- `topics.csv`: справочник кодов тем курса.
- Одна и та же задача под разными id попадает в банк один раз, парсер печатает список повторов.
- Парсер не перезаписывает существующие .md (ручные правки сохраняются); перезаписать: `--force`.
- Для чертежей нужны TeX Live или MiKTeX (`latex`, `dvisvgm`). Макросы из `egephys-style.sty`
  добавлять в `scripts/tikz_preamble.tex`.

## Этап 1: страница банка

`index.html` в корне репозитория: фильтры (раздел, тема, № КИМ, уровень, тип, экзамен), поиск по тексту,
формулы через KaTeX (лежит в `web/katex/`, без внешних CDN), чертежи из `assets/`, ответ по кнопке.
Страница читает `out/bank.json` и `out/topics.json`, поэтому после правок банка достаточно `build_bank.py`.
Фильтры попадают в адрес страницы (`#topic=3.1.1&kim=11`), такую ссылку можно отправить ученику.

Посмотреть локально: `python -m http.server` в корне и открыть http://localhost:8000.

Выкладка: Settings → Pages → Deploy from a branch → `main`, папка `/ (root)`.
