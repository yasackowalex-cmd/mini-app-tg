-- Достижения и рейтинг. Достижения считает сайт по журналу ответов; сервер хранит полученные (они не отнимаются),
-- чтобы их видел учитель и по ним строился общий рейтинг. В рейтинге вместо ФИО — псевдоним из физических слов.
alter table users add column if not exists ach text[] not null default '{}';
alter table users add column if not exists nick text;
create unique index if not exists users_nick_key on users (nick);
-- доступ к users у функции (service_role) уже есть с миграции 001; anon и authenticated не даём
