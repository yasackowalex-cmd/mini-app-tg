-- «Мои ученики» в кабинете учителя: кого показывать по умолчанию, остальные — в виде «Остальные».
-- Ученик попадает сюда, когда открывает личную ссылку учителя (source 'link') или его ДЗ ('hw'),
-- либо учитель отмечает его сам ('manual').
create table if not exists my_students (
  teacher_id bigint not null,
  tg_id      bigint not null references users(tg_id) on delete cascade,
  source     text not null,
  created_at timestamptz not null default now(),
  primary key (teacher_id, tg_id)
);

-- Доступ только через функцию (сервисный ключ), как у остальных таблиц.
alter table my_students enable row level security;

-- кто уже открывал ДЗ учителя — сразу его ученик
insert into my_students (teacher_id, tg_id, source)
select distinct h.teacher_id, s.tg_id, 'hw'
from homework_students s join homework h on h.id = s.hw_id
where h.teacher_id <> s.tg_id
on conflict do nothing;
