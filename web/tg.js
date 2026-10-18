// Запуск внутри Telegram Mini App: сообщить Телеграму, что страница готова,
// развернуть на весь экран, покрасить шапку в цвет бренда и поздороваться по имени.
// В обычном браузере initData пустой, и файл ничего не делает.
(function () {
  // Функция tg-auth в панели Supabase создана с адресом clever-responder.
  const AUTH_URL = 'https://jbvcqegszgggvlbyccwk.supabase.co/functions/v1/clever-responder';
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
  // Запрос к серверу: каждый раз с initData, сервер проверяет подпись. Ответ или null.
  const api = (action, extra) =>
    fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData: tg.initData, action, ...extra }) })
      .then(r => r.ok ? r.json() : null)
      .then(res => res && res.ok ? res : null)
      .catch(() => null);

  // Вход: проверенный ученик в window.tgUser, его попытки в window.tgProgress
  // ({task_id: {n, ok}}) и журнал ответов в window.tgLog ([task_id, 1|0, время], новые первыми),
  // о загрузке app.js узнаёт по событию tg-progress.
  // Если сервер недоступен, банк работает как раньше, без сохранения.
  api('login').then(res => {
    if (!res) return null;
    window.tgUser = res.user;
    window.tgApi = api;
    return api('progress');
  }).then(res => {
    if (!res) return;
    window.tgProgress = res.tasks || {};
    window.tgLog = Array.isArray(res.log) ? res.log : null;
    document.dispatchEvent(new CustomEvent('tg-progress'));
  });
})();
