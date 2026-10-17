// Функция Supabase: проверяет initData из Telegram и запоминает ученика.
// Запрос: POST {"initData": "<window.Telegram.WebApp.initData>"}.
// Ответ: {"ok": true, "user": {"id": ..., "first_name": ...}} или 401.
// Секрет BOT_TOKEN задаётся в панели Supabase (Edge Functions → Secrets).
import { createClient } from 'npm:@supabase/supabase-js@2';
import { verifyInitData } from './verify.ts';

const ORIGIN = 'https://yasackowalex-cmd.github.io';
const cors = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return json({ ok: false, error: 'method' }, 405);

  let initData = '';
  try {
    initData = String((await req.json()).initData || '');
  } catch {
    return json({ ok: false, error: 'bad request' }, 400);
  }
  const user = await verifyInitData(initData, Deno.env.get('BOT_TOKEN') ?? '');
  if (!user) return json({ ok: false, error: 'unauthorized' }, 401);

  // Храним только Telegram id и имя (PROJECT.md: минимум персональных данных).
  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { error } = await db.from('users').upsert(
    { tg_id: user.id, first_name: user.first_name ?? '', last_seen_at: new Date().toISOString() },
    { onConflict: 'tg_id' },
  );
  if (error) return json({ ok: false, error: 'db' }, 500);

  return json({ ok: true, user: { id: user.id, first_name: user.first_name ?? '' } });
});
