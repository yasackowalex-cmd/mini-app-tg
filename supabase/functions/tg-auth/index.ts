// Функция Supabase: проверяет initData из Telegram и запоминает ученика.
// Запрос: POST {"initData": "<window.Telegram.WebApp.initData>", "action": ...}.
//   action "login" (по умолчанию) — запомнить ученика, ответ {"ok": true, "user": {...}, "profile": {last_name, grade} | null};
//   action "profile", last_name, grade — анкета ученика (фамилия и класс);
//   action "hw_create" (учитель), title, task_ids — задать ДЗ, ответ {"hw": {id, ...}};
//   action "hw_open", id — ученик открыл ссылку на ДЗ; "hw_list" — ДЗ ученика (mine) и заданные учителем (given);
//   action "hw_report" (учитель), id — ученики ДЗ и отметки по задачам; "hw_delete" (учитель), id — удалить ДЗ;
//   action "teacher" (учитель) — кабинет: все его ДЗ, их ученики и результаты, итоги пробников всех учеников (exams),
//     в results по паре «ДЗ — ученик»: ok (решены верно), из них retry (после неверного ответа) и help (после подсказки или ответа), bad;
//     все ученики (students) и журнал ответов каждого (logs: {tg_id: [[task_id, 1|0, unix-время], ...]} от новых к старым)
//     и открытые подсказки и ответы каждого (rlogs: {tg_id: [[task_id, вид, unix-время], ...]}, без таблицы reveals — null);
//   action "exam_save", started, finished (мс), task_ids, p1, p2, graded — итог пробного варианта ЕГЭ.
// Учителя — секрет TEACHER_IDS (Telegram id через запятую).
//   action "attempt", task_id, answer, correct — записать попытку;
//   action "progress" — {"ok": true, "tasks": {"<task_id>": {"n": попыток, "ok": верных}},
//     "log": [[task_id, 1|0 (верно), unix-время], ...] от новых к старым, "fav": [task_id, ...] избранное, новые первыми};
//   action "reveal", task_id, kind ("hint" | "answer") — ученик открыл подсказку или ответ (в progress — reveals: [[task_id, kind, unix]]);
//   action "fav_set", task_id, on — добавить задачу в избранное (on: true) или убрать (on: false).
//   action "join", code — ученик открыл личную ссылку учителя t.me/<бот>?startapp=t_<код>: он становится «его учеником»;
//   action "my_set" (учитель), tg_id, on — отметить ученика своим или убрать из своих.
//   Своим ученик становится и когда открывает ДЗ учителя. В кабинете (action "teacher") — mine: [tg_id] и invite: код ссылки.
// Без верной подписи initData — 401.
// Секрет BOT_TOKEN задаётся в панели Supabase (Edge Functions → Secrets).
// Один файл, чтобы его можно было вставить в редактор функций в панели Supabase.

// Проверка подписи initData из Telegram Mini App.
// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
// secret = HMAC_SHA256(key="WebAppData", msg=bot_token);
// hash = hex(HMAC_SHA256(key=secret, msg=data_check_string)).

const enc = new TextEncoder();

async function hmac(key: Uint8Array, msg: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}

const hex = (b: Uint8Array) => Array.from(b, x => x.toString(16).padStart(2, '0')).join('');

export type TgUser = { id: number; first_name?: string };

// Возвращает пользователя, если подпись верна и данные не старше maxAgeSec; иначе null.
export async function verifyInitData(initData: string, botToken: string, maxAgeSec = 86400, now = Date.now() / 1000): Promise<TgUser | null> {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return null;
  params.delete('hash');
  const dataCheck = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort().join('\n');
  const secret = await hmac(enc.encode('WebAppData'), botToken);
  const expected = hex(await hmac(secret, dataCheck));
  // сравнение без раннего выхода
  if (expected.length !== hash.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ hash.charCodeAt(i);
  if (diff !== 0) return null;
  const authDate = Number(params.get('auth_date'));
  if (!authDate || now - authDate > maxAgeSec) return null;
  try {
    const user = JSON.parse(params.get('user') || 'null');
    return user && typeof user.id === 'number' ? user : null;
  } catch {
    return null;
  }
}

const ORIGIN = 'https://yasackowalex-cmd.github.io';
const cors = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

// Код ДЗ для ссылки t.me/<бот>?startapp=hw_<код>: 8 символов без похожих букв и цифр.
const HW_ABC = 'abcdefghjkmnpqrstuvwxyz23456789';
function hwCode(): string {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, x => HW_ABC[x % HW_ABC.length]).join('');
}
const cleanIds = (a: unknown): string[] | null =>
  Array.isArray(a) && a.length >= 1 && a.length <= 60 && a.every(x => typeof x === 'string' && x.length > 0 && x.length <= 100)
    ? [...new Set(a as string[])] : null;

// Код личной ссылки учителя: из его Telegram id и BOT_TOKEN, поэтому хранить его не нужно, а подобрать нельзя.
async function inviteCode(teacherId: number, secret: string): Promise<string> {
  return hex(await hmac(enc.encode(secret), 'invite:' + teacherId)).slice(0, 12);
}

// Действия после проверки подписи. db — клиент Supabase с сервисным ключом.
// Supabase отдаёт не больше 1000 строк за запрос, поэтому длинные списки (попытки) читаем страницами.
// make() строит запрос заново для каждой страницы; порядок в нём должен быть однозначным (по id).
async function pages(make: () => any, max = 200000): Promise<{ data: any[] | null; error: unknown }> {
  const out: any[] = [];
  for (let from = 0; from < max; from += 1000) {
    const { data, error } = await make().range(from, from + 999);
    if (error) return { data: null, error };
    out.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return { data: out, error: null };
}

// teachers — Telegram id учителей из секрета TEACHER_IDS (через запятую); secret — BOT_TOKEN, ключ для кодов ссылок.
export async function route(body: any, user: TgUser, db: any, teachers: number[] = [], secret = ''): Promise<[number, unknown]> {
  const action = body.action || 'login';
  const isTeacher = teachers.includes(user.id);

  if (action === 'login') {
    // Храним только Telegram id, имя, а после анкеты фамилию и класс (минимум персональных данных).
    const { error } = await db.from('users').upsert(
      { tg_id: user.id, first_name: user.first_name ?? '', last_seen_at: new Date().toISOString() },
      { onConflict: 'tg_id' },
    );
    if (error) return [500, { ok: false, error: 'db' }];
    // Фамилия и класс — анкета ученика для учителя. Если столбцов ещё нет (миграция 002 не выполнена),
    // profile: null, и сайт анкету не показывает.
    const { data: prof, error: perr } = await db.from('users').select('last_name, grade').eq('tg_id', user.id).maybeSingle();
    const profile = perr ? null : { last_name: prof?.last_name ?? '', grade: prof?.grade ?? '' };
    return [200, { ok: true, user: { id: user.id, first_name: user.first_name ?? '' }, profile, teacher: isTeacher }];
  }

  if (action === 'profile') {
    const last_name = String(body.last_name ?? '').trim().replace(/\s+/g, ' ');
    const grade = String(body.grade ?? '').trim().replace(/\s+/g, '').toUpperCase();
    if (!last_name || last_name.length > 50 || !grade || grade.length > 10) return [400, { ok: false, error: 'bad request' }];
    const { error } = await db.from('users').update({ last_name, grade }).eq('tg_id', user.id);
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true, profile: { last_name, grade } }];
  }

  if (action === 'attempt') {
    const task_id = String(body.task_id || '').slice(0, 100);
    const answer = String(body.answer ?? '').slice(0, 200);
    if (!task_id || typeof body.correct !== 'boolean') return [400, { ok: false, error: 'bad request' }];
    const { error } = await db.from('attempts').insert({ tg_id: user.id, task_id, answer, correct: body.correct });
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true }];
  }

  if (action === 'progress') {
    const { data, error } = await pages(() => db.from('attempts').select('task_id, correct, created_at').eq('tg_id', user.id)
      .order('id', { ascending: false }));
    if (error) return [500, { ok: false, error: 'db' }];
    const tasks: Record<string, { n: number; ok: number }> = {};
    const log: [string, number, number][] = [];
    for (const r of data ?? []) {
      const t = (tasks[r.task_id] ??= { n: 0, ok: 0 });
      t.n++;
      if (r.correct) t.ok++;
      log.push([r.task_id, r.correct ? 1 : 0, Math.floor(Date.parse(r.created_at) / 1000) || 0]);
    }
    // избранное; если таблицы ещё нет (не выполнен favorites.sql), прогресс отдаётся без него
    const f = await pages(() => db.from('favorites').select('task_id').eq('tg_id', user.id)
      .order('created_at', { ascending: false }).order('task_id'));
    const fav = f.error ? null : (f.data ?? []).map(r => r.task_id);
    // открытые подсказки и ответы (для звёзд за ДЗ); без таблицы reveals — null
    const rv = await pages(() => db.from('reveals').select('task_id, kind, created_at').eq('tg_id', user.id).order('id', { ascending: false }));
    const reveals = rv.error ? null : (rv.data ?? []).map(r => [r.task_id, r.kind, Math.floor(Date.parse(r.created_at) / 1000) || 0]);
    return [200, { ok: true, tasks, log, fav, reveals }];
  }

  if (action === 'reveal') {
    const task_id = String(body.task_id || '').slice(0, 100);
    if (!task_id || !['hint', 'answer'].includes(body.kind)) return [400, { ok: false, error: 'bad request' }];
    const { error } = await db.from('reveals').insert({ tg_id: user.id, task_id, kind: body.kind });
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true }];
  }

  if (action === 'fav_set') {
    const task_id = String(body.task_id || '').slice(0, 100);
    if (!task_id || typeof body.on !== 'boolean') return [400, { ok: false, error: 'bad request' }];
    const { error } = body.on
      ? await db.from('favorites').upsert({ tg_id: user.id, task_id }, { onConflict: 'tg_id,task_id', ignoreDuplicates: true })
      : await db.from('favorites').delete().eq('tg_id', user.id).eq('task_id', task_id);
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true }];
  }

  // ---- Домашние задания ----
  if (action === 'hw_create') {
    if (!isTeacher) return [403, { ok: false, error: 'forbidden' }];
    const title = String(body.title ?? '').trim().slice(0, 100) || 'Домашнее задание';
    const task_ids = cleanIds(body.task_ids);
    if (!task_ids) return [400, { ok: false, error: 'bad request' }];
    const id = hwCode();
    const { error } = await db.from('homework').insert({ id, title, task_ids, teacher_id: user.id });
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true, hw: { id, title, task_ids } }];
  }

  if (action === 'hw_open') {
    // ученик открыл ссылку на ДЗ: запоминаем, что ДЗ у него есть, и он становится учеником этого учителя
    const id = String(body.id ?? '').slice(0, 20);
    const { data: hw, error } = await db.from('homework').select('id, title, task_ids, created_at, teacher_id').eq('id', id).maybeSingle();
    if (error) return [500, { ok: false, error: 'db' }];
    if (!hw) return [404, { ok: false, error: 'not found' }];
    const { error: e2 } = await db.from('homework_students').upsert({ hw_id: id, tg_id: user.id }, { onConflict: 'hw_id,tg_id' });
    if (e2) return [500, { ok: false, error: 'db' }];
    if (Number(hw.teacher_id) !== user.id) await addMine(db, Number(hw.teacher_id), user.id, 'hw');
    const { teacher_id: _, ...out } = hw;
    return [200, { ok: true, hw: out }];
  }

  if (action === 'join') {
    // личная ссылка учителя: код сверяем с каждым учителем из TEACHER_IDS
    const code = String(body.code ?? '');
    for (const t of teachers) {
      if (t === user.id || !secret || code !== await inviteCode(t, secret)) continue;
      const ok = await addMine(db, t, user.id, 'link');
      return ok ? [200, { ok: true }] : [500, { ok: false, error: 'db' }];
    }
    return [404, { ok: false, error: 'not found' }];
  }

  if (action === 'my_set') {
    if (!isTeacher) return [403, { ok: false, error: 'forbidden' }];
    const tg_id = Number(body.tg_id);
    if (!Number.isSafeInteger(tg_id) || tg_id <= 0 || typeof body.on !== 'boolean') return [400, { ok: false, error: 'bad request' }];
    if (body.on) {
      if (!await addMine(db, user.id, tg_id, 'manual')) return [500, { ok: false, error: 'db' }];
    } else {
      const { error } = await db.from('my_students').delete().eq('teacher_id', user.id).eq('tg_id', tg_id);
      if (error) return [500, { ok: false, error: 'db' }];
    }
    return [200, { ok: true }];
  }

  if (action === 'hw_list') {
    // ученику — его ДЗ, учителю — ещё и заданные им
    const { data: links, error } = await db.from('homework_students').select('hw_id').eq('tg_id', user.id);
    if (error) return [500, { ok: false, error: 'db' }];
    const ids = (links ?? []).map((r: any) => r.hw_id);
    let mine: any[] = [];
    if (ids.length) {
      const { data, error: e2 } = await db.from('homework').select('id, title, task_ids, created_at').in('id', ids);
      if (e2) return [500, { ok: false, error: 'db' }];
      mine = data ?? [];
    }
    let given: any[] = [];
    if (isTeacher) {
      const { data, error: e3 } = await db.from('homework').select('id, title, task_ids, created_at').eq('teacher_id', user.id);
      if (e3) return [500, { ok: false, error: 'db' }];
      given = data ?? [];
    }
    const byDate = (a: any, b: any) => String(b.created_at).localeCompare(String(a.created_at));
    return [200, { ok: true, mine: mine.sort(byDate), given: given.sort(byDate) }];
  }

  if (action === 'hw_report') {
    // учителю: по каждому ученику ДЗ — лучший результат по каждой задаче после выдачи ДЗ
    if (!isTeacher) return [403, { ok: false, error: 'forbidden' }];
    const id = String(body.id ?? '').slice(0, 20);
    const { data: hw, error } = await db.from('homework').select('id, title, task_ids, created_at, teacher_id').eq('id', id).maybeSingle();
    if (error) return [500, { ok: false, error: 'db' }];
    if (!hw || hw.teacher_id !== user.id) return [404, { ok: false, error: 'not found' }];
    const { data: links, error: e2 } = await db.from('homework_students').select('tg_id').eq('hw_id', id);
    if (e2) return [500, { ok: false, error: 'db' }];
    const sids = (links ?? []).map((r: any) => r.tg_id);
    if (!sids.length) return [200, { ok: true, hw: { id, title: hw.title, task_ids: hw.task_ids }, students: [] }];
    const { data: us, error: e3 } = await db.from('users').select('tg_id, first_name, last_name, grade').in('tg_id', sids);
    if (e3) return [500, { ok: false, error: 'db' }];
    const { data: at, error: e4 } = await pages(() => db.from('attempts').select('tg_id, task_id, correct')
      .in('tg_id', sids).in('task_id', hw.task_ids).gte('created_at', hw.created_at).order('id', { ascending: true }));
    if (e4) return [500, { ok: false, error: 'db' }];
    // по задаче: 1 — решена верно, 0 — были только неверные ответы; нет ключа — не решал
    const res: Record<string, Record<string, number>> = {};
    for (const a of at ?? []) {
      const r = (res[a.tg_id] ??= {});
      r[a.task_id] = Math.max(r[a.task_id] ?? 0, a.correct ? 1 : 0);
    }
    const students = (us ?? []).map((u: any) => ({
      first_name: u.first_name ?? '', last_name: u.last_name ?? '', grade: u.grade ?? '', tasks: res[u.tg_id] ?? {},
    }));
    return [200, { ok: true, hw: { id, title: hw.title, task_ids: hw.task_ids }, students }];
  }

  if (action === 'hw_delete') {
    // учитель удаляет своё ДЗ; записи учеников о нём удаляются вместе с ним (on delete cascade)
    if (!isTeacher) return [403, { ok: false, error: 'forbidden' }];
    const id = String(body.id ?? '').slice(0, 20);
    const { error } = await db.from('homework').delete().eq('id', id).eq('teacher_id', user.id);
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true }];
  }

  if (action === 'exam_save') {
    // итог пробника; ключ — ученик и время завершения, повторная запись (ученик оценил вторую часть) обновляет его
    const fin = Number(body.finished), st = Number(body.started) || 0;
    const ids = cleanIds(body.task_ids);
    const int = (v: unknown, max: number) => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= max;
    if (!ids || !int(body.p1, 28) || !int(body.p2, 17) || typeof body.graded !== 'boolean' ||
      !(fin > Date.UTC(2026, 0, 1)) || fin > Date.now() + 864e5) return [400, { ok: false, error: 'bad request' }];
    const { error } = await db.from('exams').upsert({
      tg_id: user.id, finished_at: new Date(fin).toISOString(), started_at: st ? new Date(st).toISOString() : null,
      task_ids: ids, p1: body.p1, p2: body.p2, graded: body.graded, score: (body.p1 as number) + (body.p2 as number),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'tg_id,finished_at' });
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true }];
  }

  if (action === 'teacher') {
    // кабинет учителя одним запросом: его ДЗ, ученики этих ДЗ и по каждой паре «ДЗ — ученик»
    // верно решённые (ok) и решённые только неверно (bad) задачи, ответы после выдачи ДЗ
    if (!isTeacher) return [403, { ok: false, error: 'forbidden' }];
    const { data: hws, error } = await db.from('homework').select('id, title, task_ids, created_at').eq('teacher_id', user.id);
    if (error) return [500, { ok: false, error: 'db' }];
    const homework = (hws ?? []).sort((a: any, b: any) => String(b.created_at).localeCompare(String(a.created_at)));
    // пробники всех учеников, новые первыми; без таблицы exams (миграция 004 не выполнена) — пустой список
    const { data: ex } = await db.from('exams').select('tg_id, finished_at, started_at, task_ids, p1, p2, graded, score')
      .order('finished_at', { ascending: false }).limit(5000);
    const exams = ex ?? [];
    let links: any[] = [];
    if (homework.length) {
      const { data, error: e2 } = await db.from('homework_students').select('hw_id, tg_id').in('hw_id', homework.map((h: any) => h.id));
      if (e2) return [500, { ok: false, error: 'db' }];
      links = data ?? [];
    }
    const sids = [...new Set(links.map((r: any) => r.tg_id))];
    // все ученики (кроме учителей) и все их ответы — для вида «Прогресс»
    const { data: us, error: e3 } = await db.from('users').select('tg_id, first_name, last_name, grade, last_seen_at').limit(5000);
    if (e3) return [500, { ok: false, error: 'db' }];
    const students = (us ?? []).filter((u: any) => !teachers.includes(Number(u.tg_id)));
    const { data: all, error: e5 } = await pages(() => db.from('attempts').select('tg_id, task_id, correct, created_at')
      .order('id', { ascending: false }));
    if (e5) return [500, { ok: false, error: 'db' }];
    const logs: Record<string, [string, number, number][]> = {};
    for (const r of all ?? []) (logs[r.tg_id] ??= []).push([r.task_id, r.correct ? 1 : 0, Math.floor(Date.parse(r.created_at) / 1000) || 0]);
    // все открытые подсказки и ответы учеников — для ДЗ уроков; без таблицы reveals (миграция 007) — null
    const ra = await pages(() => db.from('reveals').select('tg_id, task_id, kind, created_at').order('id', { ascending: false }));
    let rlogs: Record<string, [string, string, number][]> | null = null;
    if (!ra.error) {
      rlogs = {};
      for (const r of ra.data ?? []) (rlogs[r.tg_id] ??= []).push([r.task_id, r.kind, Math.floor(Date.parse(r.created_at) / 1000) || 0]);
    }
    let at: any[] = [], rv: any[] = [];
    if (sids.length) {
      const tasks = [...new Set(homework.flatMap((h: any) => h.task_ids))];
      const since = homework[homework.length - 1].created_at;
      const { data, error: e4 } = await pages(() => db.from('attempts').select('tg_id, task_id, correct, created_at')
        .in('tg_id', sids).in('task_id', tasks).gte('created_at', since).order('id', { ascending: true }));
      if (e4) return [500, { ok: false, error: 'db' }];
      at = data ?? [];
      // подсказки и ответы, открытые после выдачи ДЗ; без таблицы reveals (миграция 007) — без них
      const r = await pages(() => db.from('reveals').select('tg_id, task_id, created_at')
        .in('tg_id', sids).in('task_id', tasks).gte('created_at', since).order('id', { ascending: true }));
      if (!r.error) rv = r.data ?? [];
    }
    const byHw = Object.fromEntries(homework.map((h: any) => [h.id, h]));
    // по задаче ДЗ: решена ли верно и что было до первого верного ответа — неверные ответы (retry)
    // или открытая подсказка/ответ (help); учитываются только события после выдачи ДЗ
    const results: Record<string, Record<string, { ok: string[]; bad: string[]; retry: string[]; help: string[] }>> = {};
    for (const l of links) {
      const h = byHw[l.hw_id], first = new Map<string, string>(), tried = new Set<string>(), wrong = new Set<string>();
      const mine = (x: any) => x.tg_id === l.tg_id && x.created_at >= h.created_at && h.task_ids.includes(x.task_id);
      for (const a of at) {
        if (!mine(a)) continue;
        tried.add(a.task_id);
        if (a.correct && !first.has(a.task_id)) first.set(a.task_id, a.created_at);
        if (!a.correct && !first.has(a.task_id)) wrong.add(a.task_id);
      }
      const ok = [...first.keys()];
      const help = ok.filter(t => rv.some(r => mine(r) && r.task_id === t && r.created_at <= first.get(t)!));
      (results[l.hw_id] ??= {})[l.tg_id] = {
        ok, bad: [...tried].filter(t => !first.has(t)), help, retry: ok.filter(t => wrong.has(t) && !help.includes(t)),
      };
    }
    // свои ученики; без таблицы my_students (миграция 006 не выполнена) — null, и кабинет показывает всех
    const { data: my, error: e6 } = await db.from('my_students').select('tg_id').eq('teacher_id', user.id).limit(5000);
    const mine = e6 ? null : (my ?? []).map((r: any) => Number(r.tg_id));
    const invite = secret ? await inviteCode(user.id, secret) : null;
    return [200, { ok: true, homework, students, results, exams, logs, rlogs, mine, invite }];
  }

  return [400, { ok: false, error: 'action' }];
}

// Ученик становится «своим» для учителя. Повторная запись ничего не меняет (источник остаётся первым).
async function addMine(db: any, teacher_id: number, tg_id: number, source: string): Promise<boolean> {
  const { error } = await db.from('my_students').upsert({ teacher_id, tg_id, source },
    { onConflict: 'teacher_id,tg_id', ignoreDuplicates: true });
  return !error;
}

// В Node (тесты) Deno нет: там файл только отдаёт verifyInitData и route.
const D = (globalThis as any).Deno;
if (D) D.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: 'bad request' }, 400);
  }
  const user = await verifyInitData(String(body?.initData || ''), D.env.get('BOT_TOKEN') ?? '');
  if (!user) return json({ ok: false, error: 'unauthorized' }, 401);

  const { createClient } = await import('npm:@supabase/supabase-js@2');
  const db = createClient(D.env.get('SUPABASE_URL')!, D.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const teachers = String(D.env.get('TEACHER_IDS') ?? '').split(',').map(Number).filter(Boolean);
  const [status, res] = await route(body, user, db, teachers, D.env.get('BOT_TOKEN') ?? '');
  return json(res, status);
});
