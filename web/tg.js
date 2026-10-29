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
  // избранное с сервера в window.tgFav (null, если сервер его не хранит);
  // о загрузке app.js узнаёт по событию tg-progress.
  // Если сервер недоступен, банк работает как раньше, без сохранения.
  api('login').then(res => {
    if (!res) return null;
    window.tgUser = res.user;
    window.tgApi = api;
    window.tgTeacher = !!res.teacher;
    if (res.profile && !res.profile.last_name) askProfile();
    loadHomework();
    return api('progress');
  }).then(res => {
    if (!res) return;
    window.tgProgress = res.tasks || {};
    window.tgLog = Array.isArray(res.log) ? res.log : null;
    window.tgFav = Array.isArray(res.fav) ? res.fav : null;
    window.tgReveals = Array.isArray(res.reveals) ? res.reveals : [];
    // ответы на 2 часть: {task_id: {a: ответ, self, teacher, max}}; null — сервер их не хранит (нет таблицы part2)
    window.tgP2 = Array.isArray(res.p2)
      ? Object.fromEntries(res.p2.map(([id, a, self, teacher, max]) => [id, { a, self, teacher, max }])) : null;
    document.dispatchEvent(new CustomEvent('tg-progress'));
  });

  // ДЗ: ссылка t.me/<бот>?startapp=hw_<код> приходит сюда как start_param.
  // Сначала ученик записывается в это ДЗ, потом загружается список его ДЗ (и заданных, если это учитель).
  function loadHomework() {
    const sp = tg.initDataUnsafe && tg.initDataUnsafe.start_param;
    const hwId = sp && /^hw_[a-z0-9]{4,20}$/.test(sp) ? sp.slice(3) : null;
    // личная ссылка учителя t.me/<бот>?startapp=t_<код>: ученик попадает в его «Мои ученики»
    if (sp && /^t_[a-f0-9]{12}$/.test(sp)) api('join', { code: sp.slice(2) });
    (hwId ? api('hw_open', { id: hwId }) : Promise.resolve(null)).then(o => {
      window.tgHwOpen = o && o.hw ? o.hw.id : null;
      return api('hw_list');
    }).then(l => {
      if (!l) return;
      window.tgHw = { mine: l.mine || [], given: l.given || [] };
      document.dispatchEvent(new CustomEvent('tg-hw'));
    });
  }
  window.tgReloadHw = () => api('hw_list').then(l => {
    if (!l) return;
    window.tgHw = { mine: l.mine || [], given: l.given || [] };
    document.dispatchEvent(new CustomEvent('tg-hw'));
  });

  // Анкета при первом входе: фамилия и класс, чтобы учитель видел, кто решает ДЗ.
  function askProfile() {
    const f = document.getElementById('profile');
    if (!f) return;
    f.hidden = false;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const last_name = f.elements.last_name.value.trim(), grade = f.elements.grade.value.trim();
      const msg = f.querySelector('.msg');
      if (!last_name || !grade) { msg.textContent = 'Заполните фамилию и класс.'; return; }
      f.elements.save.disabled = true;
      api('profile', { last_name, grade }).then(res => {
        f.elements.save.disabled = false;
        if (!res) { msg.textContent = 'Не получилось сохранить, попробуйте ещё раз.'; return; }
        f.hidden = true;
      });
    });
  }
})();
