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
