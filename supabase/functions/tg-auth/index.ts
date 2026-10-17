// Функция Supabase: проверяет initData из Telegram и запоминает ученика.
// Запрос: POST {"initData": "<window.Telegram.WebApp.initData>"}.
// Ответ: {"ok": true, "user": {"id": ..., "first_name": ...}} или 401.
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

// В Node (тесты) Deno нет: там файл только отдаёт verifyInitData.
const D = (globalThis as any).Deno;
if (D) D.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405);

  let initData = '';
  try {
    initData = String((await req.json()).initData || '');
  } catch {
    return json({ ok: false, error: 'bad request' }, 400);
  }
  const user = await verifyInitData(initData, D.env.get('BOT_TOKEN') ?? '');
  if (!user) return json({ ok: false, error: 'unauthorized' }, 401);

  // Храним только Telegram id и имя (PROJECT.md: минимум персональных данных).
  const { createClient } = await import('npm:@supabase/supabase-js@2');
  const db = createClient(D.env.get('SUPABASE_URL')!, D.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { error } = await db.from('users').upsert(
    { tg_id: user.id, first_name: user.first_name ?? '', last_seen_at: new Date().toISOString() },
    { onConflict: 'tg_id' },
  );
  if (error) return json({ ok: false, error: 'db' }, 500);

  return json({ ok: true, user: { id: user.id, first_name: user.first_name ?? '' } });
});
