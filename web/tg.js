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
  // ссылка учителя на урок (t.me/<бот>?startapp=l_3-1-7_<код>, урок ОГЭ — l_oge-1-1-2_<код>) сразу открывает урок
  const lsp = ((tg.initDataUnsafe || {}).start_param || '').match(/^l_((?:oge-)?)(\d+(?:-\d+)*)(?:_[a-f0-9]{12})?$/);
  if (lsp) location.hash = '#lesson=' + lsp[1] + lsp[2].replace(/-/g, '.');
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

  // Очередь ответов и подсказок (attempt, reveal): запись сначала ложится в localStorage, потом уходит
  // на сервер. Если сети нет, вход ещё не завершён или сервер не ответил, запись остаётся и уходит
  // при следующей возможности (повтор раз в 20 с, при возврате в приложение, при следующем открытии).
  // Раньше ответ, данный до окончания входа или при обрыве связи, терялся молча.
  const uid = (tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.id) || 0;
  const QKEY = 'tgOutbox:' + uid;
  const qGet = () => { try { const v = JSON.parse(localStorage.getItem(QKEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
  const qSet = v => { try { localStorage.setItem(QKEY, JSON.stringify(v.slice(-500))); } catch (e) { /* хранилище недоступно */ } };
  let mem = qGet(), flushing = false, stale = false, timer = null, ready = false;   // ready: прогресс загружен (иначе ответ мог бы посчитаться дважды)
  const send = (action, extra) => fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData: tg.initData, action, ...extra }) })
    .then(r => r.status).catch(() => 0);
  function flush() {
    if (flushing || stale || !ready || !window.tgApi || !mem.length) return;
    flushing = true;
    const it = mem[0];
    send(it.a, it.p).then(st => {
      flushing = false;
      // 2xx — записано; 400 — запись испорчена, повторять бесполезно
      if ((st >= 200 && st < 300) || st === 400) { mem = mem.filter(x => x !== it); qSet(mem); flush(); return; }
      // 401: данные входа Телеграма устарели (приложение долго было открыто) — нужен перезапуск
      if (st === 401) { stale = true; staleNote(); return; }
      if (!timer) timer = setTimeout(() => { timer = null; flush(); }, 20000);
    });
  }
  function staleNote() {
    if (!el) return;
    el.innerHTML = 'Ответы сейчас не сохраняются: Телеграм передал устаревшие данные входа. Закройте мини-приложение полностью и откройте снова из бота — решённые задачи сохранятся.';
    el.classList.add('login-fail');
    el.hidden = false;
  }
  window.tgQueue = (a, p) => { mem.push({ a, p, t: Math.floor(Date.now() / 1000) }); qSet(mem); flush(); };
  // ещё не отправленные записи: при загрузке прогресса их добавляем к ответу сервера
  window.tgPending = () => mem.slice();
  window.addEventListener('online', flush);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) flush(); });

  // Вход: проверенный ученик в window.tgUser, его попытки в window.tgProgress
  // ({task_id: {n, ok}}) и журнал ответов в window.tgLog ([task_id, 1|0, время], новые первыми),
  // избранное с сервера в window.tgFav (null, если сервер его не хранит);
  // о загрузке app.js узнаёт по событию tg-progress.
  // Если сервер недоступен, банк работает как раньше, без сохранения.
  // Вход с разбором ошибки: если сервер не пустил, ученик видит, что делать, а код причины помогает учителю.
  const login = () => fetch(AUTH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData: tg.initData, action: 'login' }) })
    .then(r => r.json().catch(() => ({})).then(b => (r.ok && b && b.ok ? b : { fail: (b && b.error) || 'http ' + r.status })))
    .catch(() => ({ fail: 'network' }));
  function loginFailed(code) {
    if (!el) return;
    const age = Math.round(Date.now() / 1000 - Number((tg.initDataUnsafe || {}).auth_date || 0));
    const why = code === 'unauthorized'
      ? 'Телеграм передал устаревшие данные входа. Закройте мини-приложение полностью (не сворачивая) и откройте его снова из бота. Если не поможет, обновите Телеграм.'
      : code === 'network' ? 'Нет связи с сервером. Проверьте интернет и откройте приложение снова.'
      : 'Сервер не ответил. Попробуйте открыть приложение позже.';
    el.innerHTML = `Не получилось войти: ответы и ДЗ сейчас не сохраняются. ${why} <span class="small">(код: ${code}, ${tg.platform || '?'} ${tg.version || '?'}, вход ${age} с назад)</span>`;
    el.classList.add('login-fail');
    el.hidden = false;
  }
  // один повтор: первый запрос иногда не доходит (холодный старт функции, плохая сеть)
  login().then(r => r.fail && r.fail !== 'unauthorized' ? login() : r).then(res => {
    if (res.fail) { loginFailed(res.fail); return null; }
    window.tgUser = res.user;
    window.tgApi = api;
    window.tgTeacher = !!res.teacher;
    if (res.profile && !res.profile.last_name) askProfile();
    loadHomework();
    return api('progress');
  }).then(res => {
    // прогресс не загрузился — очередь всё равно отправляем (считать дважды нечего)
    if (!res) { if (window.tgApi) { ready = true; flush(); } return; }
    window.tgProgress = res.tasks || {};
    window.tgLog = Array.isArray(res.log) ? res.log : null;
    window.tgFav = Array.isArray(res.fav) ? res.fav : null;
    window.tgReveals = Array.isArray(res.reveals) ? res.reveals : [];
    // ответы и подсказки, которые ещё в очереди (не дошли до сервера), — как будто уже записаны
    for (const it of mem) {
      const id = it.p && it.p.task_id;
      if (!id) continue;
      if (it.a === 'attempt') {
        const p = window.tgProgress[id] || (window.tgProgress[id] = { n: 0, ok: 0 });
        p.n++;
        if (it.p.correct) p.ok++;
        if (window.tgLog) window.tgLog.unshift(it.p.correct ? [id, 1, it.t] : [id, 0, it.t, String(it.p.answer || '').slice(0, 40)]);
      } else if (it.a === 'reveal') window.tgReveals.unshift([id, it.p.kind, it.t]);
    }
    if (window.tgLog) window.tgLog.sort((x, y) => y[2] - x[2]);
    window.tgReveals.sort((x, y) => y[2] - x[2]);
    ready = true;
    flush();
    // ответы на 2 часть: {task_id: {a: ответ, self, teacher, max}}; null — сервер их не хранит (нет таблицы part2)
    window.tgP2 = Array.isArray(res.p2)
      ? Object.fromEntries(res.p2.map(([id, a, self, teacher, max]) => [id, { a, self, teacher, max }])) : null;
    // достижения, сохранённые на сервере (null — сервер их не хранит, миграция 011), псевдоним в рейтинге и итоги пробников
    window.tgAch = Array.isArray(res.ach) ? res.ach : null;
    window.tgNick = res.nick || null;
    window.tgExams = Array.isArray(res.exams) ? res.exams : null;
    // напоминания бота о серии: true/false, null — сервер их не умеет (миграция 012)
    window.tgRemind = typeof res.remind === 'boolean' ? res.remind : null;
    document.dispatchEvent(new CustomEvent('tg-progress'));
  });

  // ДЗ: ссылка t.me/<бот>?startapp=hw_<код> приходит сюда как start_param.
  // Сначала ученик записывается в это ДЗ, потом загружается список его ДЗ (и заданных, если это учитель).
  function loadHomework() {
    const sp = tg.initDataUnsafe && tg.initDataUnsafe.start_param;
    const hwId = sp && /^hw_[a-z0-9]{4,20}$/.test(sp) ? sp.slice(3) : null;
    // личная ссылка учителя t.me/<бот>?startapp=t_<код>: ученик попадает в его «Мои ученики»
    if (sp && /^t_[a-f0-9]{12}$/.test(sp)) api('join', { code: sp.slice(2) });
    // ссылка учителя на урок t.me/<бот>?startapp=l_3-1-7_<код>: ученик попадает в «Мои ученики» и открывает урок
    const ls = sp && sp.match(/^l_((?:oge-)?\d+(?:-\d+)*)(?:_([a-f0-9]{12}))?$/);
    if (ls && ls[2]) api('join', { code: ls[2] });
    (hwId ? api('hw_open', { id: hwId }) : Promise.resolve(null)).then(o => {
      window.tgHwOpen = o && o.hw ? o.hw.id : null;
      return api('hw_list');
    }).then(l => {
      // ДЗ не загрузились — пустой список, чтобы «План на сегодня» собрался без них
      if (!l) { if (!window.tgHw) { window.tgHw = { mine: [], given: [] }; document.dispatchEvent(new CustomEvent('tg-hw')); } return; }
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
