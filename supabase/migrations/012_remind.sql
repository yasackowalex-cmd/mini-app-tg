-- Напоминания бота о серии: ученик может выключить их в приложении.
alter table users add column if not exists remind boolean not null default true;

-- Расписание: каждый день в 19:00 по Москве (16:00 UTC) база вызывает функцию, а она рассылает напоминания тем,
-- у кого идёт серия дней, а сегодня задач ещё не решено.
-- Перед запуском: 1) придумать секрет (не короче 16 символов) и положить его в секреты функции как CRON_SECRET;
--                 2) вписать тот же секрет ниже вместо СЕКРЕТ.
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.unschedule('streak-remind') where exists (select 1 from cron.job where jobname = 'streak-remind');
select cron.schedule('streak-remind', '0 16 * * *', $$
  select net.http_post(
    url := 'https://jbvcqegszgggvlbyccwk.supabase.co/functions/v1/clever-responder',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{"cron": "СЕКРЕТ"}'::jsonb
  );
$$);
