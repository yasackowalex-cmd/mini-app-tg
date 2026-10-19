-- Пробные варианты ЕГЭ (exam.html): итог каждого пробника ученика для кабинета учителя.
-- Первую часть считает сайт, вторую ученик оценивает сам, поэтому балл — ориентир, а не протокол.
create table if not exists exams (
  tg_id       bigint not null references users(tg_id) on delete cascade,
  finished_at timestamptz not null,
  started_at  timestamptz,
  task_ids    text[] not null,
  p1          int not null,          -- первая часть, 0–28
  p2          int not null,          -- вторая часть (самооценка), 0–17
  graded      boolean not null,      -- вторая часть оценена целиком
  score       int not null,          -- первичный балл, 0–45
  updated_at  timestamptz not null default now(),
  primary key (tg_id, finished_at)
);
create index if not exists exams_finished on exams (finished_at desc);

-- Доступ только через функцию (сервисный ключ), как у остальных таблиц.
alter table exams enable row level security;
