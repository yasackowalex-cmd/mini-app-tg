-- Ученики и их попытки. Храним только Telegram id и имя (без телефонов, email, фамилий).
create table if not exists users (
  tg_id        bigint primary key,
  first_name   text not null default '',
  created_at   timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- Попытки понадобятся на этапе 3 (прогресс); таблица заводится сразу.
create table if not exists attempts (
  id         bigserial primary key,
  tg_id      bigint not null references users(tg_id) on delete cascade,
  task_id    text   not null,
  answer     text   not null,
  correct    boolean not null,
  created_at timestamptz not null default now()
);
create index if not exists attempts_user_idx on attempts (tg_id, created_at desc);

-- Прямой доступ из браузера закрыт: RLS включён, политик нет.
-- Пишут и читают только функции Supabase с сервисным ключом.
alter table users    enable row level security;
alter table attempts enable row level security;
