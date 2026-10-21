-- Избранное ученика (звёздочка на карточке): задачи, к которым он хочет вернуться позже.
-- Хранится на сервере, чтобы не терялось при смене телефона или очистке Телеграма.
create table if not exists favorites (
  tg_id bigint not null references users (tg_id) on delete cascade,
  task_id text not null,
  created_at timestamptz not null default now(),
  primary key (tg_id, task_id)
);

-- доступ только через функцию с сервисным ключом
alter table favorites enable row level security;
