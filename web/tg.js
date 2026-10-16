// Запуск внутри Telegram Mini App: сообщить Телеграму, что страница готова,
// развернуть на весь экран, покрасить шапку в цвет бренда и поздороваться по имени.
// В обычном браузере initData пустой, и файл ничего не делает.
(function () {
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
})();
