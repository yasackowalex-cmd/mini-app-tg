-- Анкета ученика для учителя: фамилия и класс (ученик вводит сам при первом входе).
alter table users add column if not exists last_name text not null default '';
alter table users add column if not exists grade text not null default '';
