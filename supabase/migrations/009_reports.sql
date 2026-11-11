-- Сообщения учеников об ошибке в задаче (кнопка «⚠ Ошибка в задаче» на карточке).
-- Учитель видит их в кабинете (вид «Ошибки») и отмечает «Исправлено».
create table if not exists reports (
  id          bigint generated always as identity primary key,
  tg_id       bigint not null references users(tg_id) on delete cascade,
  task_id     text not null,
  text        text not null,
  answer      text,                       -- последний ответ ученика на эту задачу, если был
  created_at  timestamptz not null default now(),
  resolved_at timestamptz
);
create index if not exists reports_open on reports (resolved_at, id);

-- Доступ только через функцию (сервисный ключ), как у остальных таблиц.
alter table reports enable row level security;

-- С 30.10.2026 Supabase не открывает новые таблицы для API сам: доступ только сервисному ключу функции.
-- anon и authenticated доступа не даём (RLS без политик).
grant select, insert, update, delete on public.reports to service_role;
