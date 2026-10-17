// Запуск внутри Telegram Mini App: сообщить Телеграму, что страница готова,
// развернуть на весь экран, покрасить шапку в цвет бренда и поздороваться по имени.
// В обычном браузере initData пустой, и файл ничего не делает.
(function () {
  const AUTH_URL = 'https://jbvcqegszgggvlbyccwk.supabase.co/functions/v1/tg-auth';
  const tg = window.Telegram && window.Telegram.WebApp;
  if (!tg || !tg.initData) return;
  document.documentElement.classList.add('in-tg');
  tg.ready();
  tg.expand();
  // Тёмную тему Телеграма не берём: чертежи нарисованы чёрным по белому.
  if (tg.setHeaderColor) tg.setHeaderColor('#1B1F3B');
  if (tg.setBackgroundColor) tg.setBackgroundColor('#F4F5F8');
  // Имя из initDataUnsafe не проверено подписью; годится только для приветствия.
  const user = tg.initDataUnsafe && tg.initDataUnsafe.user;
  const el = document.getElementById('hello');
  if (user && user.first_name && el) {
    el.textContent = `Привет, ${user.first_name}!`;
    el.hidden = false;
  }
  // Сервер проверяет подпись initData и запоминает ученика. Проверенный пользователь
  // лежит в window.tgUser; если сервер недоступен, банк работает как раньше.
  fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ initData: tg.initData }) })
    .then(r => r.ok ? r.json() : null)
    .then(res => { if (res && res.ok) window.tgUser = res.user; })
    .catch(() => {});
})();
