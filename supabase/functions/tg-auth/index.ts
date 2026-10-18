// Функция Supabase: проверяет initData из Telegram и запоминает ученика.
// Запрос: POST {"initData": "<window.Telegram.WebApp.initData>", "action": ...}.
//   action "login" (по умолчанию) — запомнить ученика, ответ {"ok": true, "user": {...}};
//   action "attempt", task_id, answer, correct — записать попытку;
//   action "progress" — {"ok": true, "tasks": {"<task_id>": {"n": попыток, "ok": верных}},
//     "log": [[task_id, 1|0 (верно), unix-время], ...] от новых к старым}.
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

// Действия после проверки подписи. db — клиент Supabase с сервисным ключом.
export async function route(body: any, user: TgUser, db: any): Promise<[number, unknown]> {
  const action = body.action || 'login';

  if (action === 'login') {
    // Храним только Telegram id и имя (PROJECT.md: минимум персональных данных).
    const { error } = await db.from('users').upsert(
      { tg_id: user.id, first_name: user.first_name ?? '', last_seen_at: new Date().toISOString() },
      { onConflict: 'tg_id' },
    );
    if (error) return [500, { ok: false, error: 'db' }];
    return [200, { ok: true, user: { id: user.id, first_name: user.first_name ?? '' } }];
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
    const { data, error } = await db.from('attempts').select('task_id, correct, created_at').eq('tg_id', user.id)
      .order('created_at', { ascending: false }).limit(20000);
    if (error) return [500, { ok: false, error: 'db' }];
    const tasks: Record<string, { n: number; ok: number }> = {};
    const log: [string, number, number][] = [];
    for (const r of data ?? []) {
      const t = (tasks[r.task_id] ??= { n: 0, ok: 0 });
      t.n++;
      if (r.correct) t.ok++;
      log.push([r.task_id, r.correct ? 1 : 0, Math.floor(Date.parse(r.created_at) / 1000) || 0]);
    }
    return [200, { ok: true, tasks, log }];
  }

  return [400, { ok: false, error: 'action' }];
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
  const [status, res] = await route(body, user, db);
  return json(res, status);
});
