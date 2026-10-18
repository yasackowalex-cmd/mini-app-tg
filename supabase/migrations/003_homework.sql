-- Домашние задания: учитель (TEACHER_IDS в секретах функции) задаёт подборку задач,
-- ученик открывает ссылку t.me/<бот>?startapp=hw_<код> и попадает в homework_students.
create table if not exists homework (
  id         text primary key,
  title      text not null default '',
  task_ids   text[] not null,
  teacher_id bigint not null,
  created_at timestamptz not null default now()
);
create index if not exists homework_teacher on homework (teacher_id, created_at desc);

create table if not exists homework_students (
  hw_id     text not null references homework(id) on delete cascade,
  tg_id     bigint not null references users(tg_id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (hw_id, tg_id)
);
create index if not exists homework_students_tg on homework_students (tg_id);

-- Доступ только через функцию (сервисный ключ), как у users и attempts.
alter table homework enable row level security;
alter table homework_students enable row level security;
