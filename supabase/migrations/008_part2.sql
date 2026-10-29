-- Ответы на задачи второй части и задачи без автопроверки (качественные): ответ ученика (число или
-- короткий текст), его самооценка по решению и балл учителя после проверки. Одна строка на пару
-- «ученик — задача»: новый ответ заменяет прежний и сбрасывает обе оценки.
create table if not exists part2 (
  tg_id         bigint not null references users(tg_id) on delete cascade,
  task_id       text not null,
  answer        text not null default '',
  max_score     smallint not null check (max_score between 1 and 4),
  self_score    smallint check (self_score between 0 and 4),
  teacher_score smallint check (teacher_score between 0 and 4),
  updated_at    timestamptz not null default now(),
  checked_at    timestamptz,
  primary key (tg_id, task_id)
);

-- Доступ только через функцию (сервисный ключ), как у остальных таблиц.
alter table part2 enable row level security;

-- С 30.10.2026 Supabase не открывает новые таблицы для API сам: доступ только сервисному ключу функции.
-- anon и authenticated доступа не даём (RLS без политик).
grant select, insert, update, delete on public.part2 to service_role;
