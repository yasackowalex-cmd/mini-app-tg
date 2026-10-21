-- Открытые учеником подсказки (решения) и ответы. Нужны, чтобы в ДЗ отличать задачи,
-- решённые самостоятельно, от решённых после подсказки, и давать за ДЗ звёзды.
create table if not exists reveals (
  id         bigint generated always as identity primary key,
  tg_id      bigint not null references users(tg_id) on delete cascade,
  task_id    text not null,
  kind       text not null check (kind in ('hint', 'answer')),
  created_at timestamptz not null default now()
);
create index if not exists reveals_user on reveals (tg_id, task_id);

-- Доступ только через функцию (сервисный ключ), как у остальных таблиц.
alter table reveals enable row level security;
