// Банк задач: загрузка out/bank.json, фильтры, поиск, показ задач.
// Состояние фильтров хранится в адресе (#topic=3.1.1&kim=11), ссылку можно отправить ученику.
(function () {
  'use strict';

  const { solutionHtml, conditionHtml, answerHtml, isRight, pick, fav, KIM_POINTS, testScore } = window.taskRender;

  const PAGE = 20;
  const FILTERS = [
    { key: 'section', el: 'f-section', all: 'Все разделы' },
    { key: 'topic', el: 'f-topic', all: 'Все темы' },
    { key: 'kim', el: 'f-kim', all: 'Все номера' },
    { key: 'level', el: 'f-level', all: 'Любой' },
    { key: 'type', el: 'f-type', all: 'Любой' },
    { key: 'exam', el: 'f-exam', all: 'Любой' },
  ];
  const SECTION_ORDER = ['Механика', 'МКТ и термодинамика', 'Электродинамика', 'Оптика', 'Квантовая физика'];
  const LEVEL_NAME = { 'Б': 'базовый', 'П': 'повышенный', 'В': 'высокий' };

  const $ = id => document.getElementById(id);
  let bank = [], topics = {}, found = [], shown = 0, byId = {};
  // view — показ одного ДЗ ({title, ids}) или избранного ({fav: true, ids}) вместо фильтров банка; любой фильтр его снимает
  let view = null;

  // ---- вкладки «Задачи» / «Уроки» / «Кабинет учителя» (последняя только у учителя, её открывает teacher.js) ----
  let tab = 'bank';
  function setTab(t) {
    if (t === tab) return;
    tab = t;
    document.querySelectorAll('#tabs [data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === t)));
    $('bank-area').hidden = t !== 'bank';
    $('lessons-area').hidden = t !== 'lessons';
    $('teacher').hidden = t !== 'teacher';
    document.documentElement.classList.toggle('teacher-mode', t === 'teacher');
    if (t === 'bank' && bank.length) writeHash(state());
    document.dispatchEvent(new CustomEvent('tab', { detail: t }));
  }
  window.setTab = setTab;
  $('tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) setTab(b.dataset.tab); });

  const codeKey = c => String(c).split('.').map(n => n.padStart(3, '0')).join('.');
  const norm = s => (s || '').toLowerCase().replace(/ё/g, 'е');

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    const st = { q: p.get('q') || '' };
    FILTERS.forEach(f => { st[f.key] = p.get(f.key) || ''; });
    return st;
  }

  function writeHash(st) {
    // адрес вкладки «Уроки» (#lessons, #lesson=<тема>) ведёт lesson.js
    if (tab !== 'bank') return;
    const p = new URLSearchParams();
    Object.entries(st).forEach(([k, v]) => { if (v) p.set(k, v); });
    const h = p.toString();
    history.replaceState(null, '', h ? '#' + h : location.pathname + location.search);
  }

  function state() {
    const st = { q: $('q').value.trim() };
    FILTERS.forEach(f => { st[f.key] = $(f.el).value; });
    return st;
  }

  function matches(t, st, skip) {
    for (const f of FILTERS) {
      if (f.key === skip || !st[f.key]) continue;
      if (String(t[f.key] ?? '') !== st[f.key]) return false;
    }
    if (st.q) {
      const words = norm(st.q).split(/\s+/);
      const hay = t._search;
      if (!words.every(w => hay.includes(w))) return false;
    }
    return true;
  }

  // варианты в каждом списке считаются с учётом остальных фильтров
  function fillSelects(st) {
    FILTERS.forEach(f => {
      const counts = new Map();
      bank.forEach(t => {
        if (!matches(t, st, f.key)) return;
        const v = String(t[f.key] ?? '');
        if (v) counts.set(v, (counts.get(v) || 0) + 1);
      });
      if (st[f.key] && !counts.has(st[f.key])) counts.set(st[f.key], 0);
      let vals = [...counts.keys()];
      if (f.key === 'topic') vals.sort((a, b) => codeKey(a) < codeKey(b) ? -1 : 1);
      else if (f.key === 'kim') vals.sort((a, b) => a - b);
      else if (f.key === 'section') vals.sort((a, b) => SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b));
      else vals.sort();
      const label = v => {
        if (f.key === 'topic') return `${v} ${topics[v] || ''}`;
        if (f.key === 'kim') return `№ ${v}`;
        if (f.key === 'level') return `${v} — ${LEVEL_NAME[v] || ''}`;
        return v;
      };
      const sel = $(f.el);
      sel.innerHTML = `<option value="">${f.all}</option>` +
        vals.map(v => `<option value="${v}">${label(v)} (${counts.get(v)})</option>`).join('');
      sel.value = st[f.key];
    });
  }

  function card(t) {
    const el = document.createElement('article');
    el.className = 'task lv-' + t.level;
    const chips = [
      t.kim ? `<span class="chip kim">КИМ ${t.kim}</span>` : '',
      t.topic ? `<span class="chip">${t.topic} ${topics[t.topic] || ''}</span>` : '',
      `<span class="chip">${t.type}</span>`,
      t.author_task ? '<span class="chip avt">авторская</span>' : '',
      view && view.err && view.ids.indexOf(t.id) >= view.err ? '<span class="chip sim">похожая</span>' : '',
      '<span class="chip mark" hidden></span>',
    ].join('');
    const cond = conditionHtml(t);
    const figs = cond.rest.map(src => `<img src="${src}" alt="Рисунок к задаче" loading="lazy">`).join('');
    const form = t.check && t.check !== 'none' ? `<form class="try">
        <label>Ответ: <input name="a" autocomplete="off" inputmode="${t.check === 'number' ? 'decimal' : t.check === 'pm' ? 'text' : 'numeric'}"
          placeholder="${{number: 'число', pm: 'x ± Δx'}[t.check] || 'цифры'}" aria-label="Ваш ответ"></label>
        ${t.unit ? `<span class="unit">${t.unit}</span>` : ''}
        <button class="btn" type="submit">Проверить</button>
        <span class="verdict" role="status"></span>
      </form>` : '';
    // свои задачи урока (lesson.js) не в банке: в подборку и избранное их не положить
    const inBank = !!byId[t.id];
    el.innerHTML = `${inBank ? '<button class="fav" type="button" data-fav></button>' : ''}
      <div class="meta">${chips}</div>
      <div class="cond">${cond.html}</div>
      ${figs ? `<div class="figs">${figs}</div>` : ''}
      ${form}
      <div class="actions">
        ${inBank ? '<button class="btn pick" type="button" data-pick></button>' : ''}
        ${t.solution ? '<button class="btn hint" type="button" data-show="solution" aria-expanded="false">💡 Подсказка</button>' : ''}
        <button class="btn" type="button" data-show="answer" aria-expanded="false">Показать ответ</button>
      </div>
      ${t.solution ? `<div class="reveal cond" data-part="solution" hidden><b>Решение.</b> ${solutionHtml(t)}</div>` : ''}
      <div class="reveal" data-part="answer" hidden><b>Ответ:</b> ${answerHtml(t)}</div>
      ${selfMax(t) ? `<div class="grade" hidden><span>Сравните своё решение с разбором и поставьте себе балл:</span>${
        Array.from({ length: selfMax(t) + 1 }, (_, g) => `<button type="button" class="btn" data-grade="${g}" aria-pressed="false">${g}</button>`).join('')}</div>` : ''}
      <div class="id">${t.id}</div>`;
    el.addEventListener('click', e => {
      if (e.target.closest('[data-pick]')) { togglePick(t.id); return; }
      if (e.target.closest('[data-fav]')) { toggleFav(t.id); markFav(el, t); return; }
      const g = e.target.closest('[data-grade]');
      if (g) { saveGrade(el, t, Number(g.dataset.grade)); return; }
      const b = e.target.closest('[data-show]');
      if (!b) return;
      const part = el.querySelector(`[data-part="${b.dataset.show}"]`);
      part.hidden = !part.hidden;
      b.setAttribute('aria-expanded', String(!part.hidden));
      if (!part.hidden) { saveReveal(t, b.dataset.show === 'solution' ? 'hint' : 'answer'); showGrade(el); }
    });
    const f = el.querySelector('form.try');
    if (f) f.addEventListener('submit', e => {
      e.preventDefault();
      const v = f.elements.a.value, out = f.querySelector('.verdict');
      if (!v.trim()) { out.textContent = ''; out.className = 'verdict'; return; }
      const ok = isRight(t, v);
      out.textContent = ok ? 'Верно!' : 'Неверно, попробуйте ещё раз';
      out.className = 'verdict ' + (ok ? 'ok' : 'bad');
      f.elements.a.classList.toggle('ok', ok);
      f.elements.a.classList.toggle('bad', !ok);
      saveAttempt(t, v, ok);
      markCard(el, t);
      showGrade(el);
    });
    markCard(el, t);
    markGrade(el, t);
    el._task = t;
    if (inBank) { markPick(el, t); markFav(el, t); }
    return el;
  }

  // ---- Самооценка по решению ----
  // Вторая часть (КИМ 21–26) и задачи без автопроверки ответа: ученик сверяет решение с разбором и ставит
  // себе балл (как в пробнике). Максимум — балл номера КИМ, у задач без номера 1. Полный балл считается
  // верным ответом, меньше — неверным: так оценка идёт в прогресс, ДЗ и кабинет учителя.
  // Кнопки появляются после проверки ответа или открытого разбора/ответа; поставленный балл помнит браузер.
  const selfMax = t => (t.kim >= 21 || !t.check || t.check === 'none') ? (KIM_POINTS[t.kim] || 1) : 0;
  const grades = (() => { try { return JSON.parse(localStorage.getItem('grades')) || {}; } catch (e) { return {}; } })();
  function showGrade(el) { const g = el.querySelector('.grade'); if (g) g.hidden = false; }
  function markGrade(el, t) {
    const g = grades[t.id];
    if (g === undefined) return;
    showGrade(el);
    el.querySelectorAll('[data-grade]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.grade) === g)));
  }
  function saveGrade(el, t, g) {
    if (grades[t.id] === g) return;
    const max = selfMax(t);
    grades[t.id] = g;
    try { localStorage.setItem('grades', JSON.stringify(grades)); } catch (e) { /* только до перезагрузки */ }
    saveAttempt(t, `балл ${g} из ${max}`, g === max);
    markGrade(el, t);
    markCard(el, t);
  }

  // ---- Подборка: задачи для печати в PDF и для ДЗ ----
  const PICK_ALL_MAX = 100;

  function markPick(el, t) {
    const on = pick.get().includes(t.id), b = el.querySelector('[data-pick]');
    b.textContent = on ? '✓ В подборке' : '+ В подборку';
    b.setAttribute('aria-pressed', String(on));
  }

  // ---- Избранное: звёздочка в углу карточки ----
  function markFav(el, t) {
    const on = fav.get().includes(t.id), b = el.querySelector('[data-fav]');
    b.textContent = on ? '★' : '☆';
    b.setAttribute('aria-pressed', String(on));
    b.title = on ? 'Убрать из избранного' : 'В избранное: вернуться к задаче позже';
    b.setAttribute('aria-label', b.title);
  }

  function toggleFav(id) {
    const ids = fav.get(), i = ids.indexOf(id);
    if (i < 0) ids.unshift(id); else ids.splice(i, 1);
    fav.set(ids);
    renderFav();
    if (window.tgApi) window.tgApi('fav_set', { task_id: id, on: i < 0 });
  }

  // В Телеграме избранное хранится на сервере: объединяем его с отмеченным на этом устройстве,
  // недостающее на сервере досылаем
  function syncFav() {
    const server = window.tgFav;
    if (!server) return;
    const local = fav.get(), merged = [...local];
    for (const id of server) if (!merged.includes(id)) merged.push(id);
    for (const id of local) if (!server.includes(id)) window.tgApi('fav_set', { task_id: id, on: true });
    fav.set(merged);
    renderFav();
    document.querySelectorAll('#list article.task').forEach((el, i) => markFav(el, found[i]));
  }

  function renderFav() {
    const n = fav.get().filter(id => byId[id]).length;
    $('fav-open').hidden = !n;
    $('fav-open').textContent = `★ Избранное (${n})`;
  }

  // ---- Работа над ошибками (только в Телеграме, по журналу ответов) ----
  // В списке задачи, последний ответ на которые неверный (новые первыми), а после них к каждой
  // одна похожая: тот же номер КИМ и, если найдётся, та же тема, ещё не решавшаяся учеником.
  function mistakes() {
    const log = window.tgLog;
    if (!log) return null;
    const last = {}, wrong = [];
    for (const [id, ok] of log) if (!(id in last)) { last[id] = ok; if (!ok && byId[id]) wrong.push(id); }
    const used = new Set(wrong), similar = [];
    for (const id of wrong) {
      const w = byId[id], free = t => t.kim === w.kim && !(t.id in last) && !used.has(t.id);
      const t = bank.find(t => free(t) && t.topic === w.topic) || bank.find(free);
      if (t) { used.add(t.id); similar.push(t.id); }
    }
    return { wrong, similar };
  }

  function renderMistakes() {
    const m = mistakes(), b = $('err-open');
    b.hidden = !m || !m.wrong.length;
    if (m) b.textContent = `✗ Работа над ошибками (${m.wrong.length})`;
  }

  function togglePick(id) {
    const ids = pick.get(), i = ids.indexOf(id);
    if (i < 0) ids.push(id); else ids.splice(i, 1);
    pick.set(ids);
    renderPick();
  }

  function pickUrl(ids) {
    return new URL('print.html#ids=' + ids.map(encodeURIComponent).join(','), location.href).href;
  }

  function renderPick() {
    const ids = pick.get();
    $('pickbar').hidden = !ids.length;
    $('pick-count').textContent = `В подборке задач: ${ids.length}`;
    $('pick-open').href = pickUrl(ids);
    const rest = found.filter(t => !ids.includes(t.id)).length;
    $('pick-all').hidden = !rest || found.length > PICK_ALL_MAX;
    $('pick-all').textContent = `Добавить найденные в подборку (${rest})`;
    document.querySelectorAll('#list article.task').forEach((el, i) => markPick(el, found[i]));
  }

  $('pick-clear').addEventListener('click', () => { pick.set([]); renderPick(); });
  document.addEventListener('pick-changed', renderPick);
  $('pick-all').addEventListener('click', () => {
    const ids = pick.get();
    found.forEach(t => { if (!ids.includes(t.id)) ids.push(t.id); });
    pick.set(ids);
    renderPick();
  });
  // В Телеграме печати нет: подборка открывается в обычном браузере.
  $('pick-open').addEventListener('click', e => {
    const tg = window.Telegram && window.Telegram.WebApp;
    if (tg && tg.initData) { e.preventDefault(); tg.openLink(e.currentTarget.href); }
  });

  // ---- Прогресс ученика (только в Телеграме, после проверки входа на сервере) ----
  const prog = () => window.tgProgress;

  function markCard(el, t) {
    const m = el.querySelector('.chip.mark'), p = prog() && prog()[t.id];
    if (!p) { m.hidden = true; return; }
    m.hidden = false;
    // решённая задача, к которой не возвращались KIM_STALE_DAYS дней (по журналу ответов), просит повторения
    const last = p.ok && window.tgLog && window.tgLog.find(r => r[0] === t.id && r[1]);
    const stale = last && Date.now() / 1000 - last[2] > KIM_STALE_DAYS * 86400;
    m.textContent = stale ? '↻ пора повторить' : p.ok ? '✓ решена' : 'пока не решена';
    m.className = 'chip mark ' + (stale ? 'part' : p.ok ? 'ok' : 'bad');
  }

  function saveAttempt(t, answer, correct) {
    if (!window.tgApi || !prog()) return;
    const p = prog()[t.id] || (prog()[t.id] = { n: 0, ok: 0 });
    p.n++;
    if (correct) p.ok++;
    if (window.tgLog) window.tgLog.unshift([t.id, correct ? 1 : 0, Math.floor(Date.now() / 1000)]);
    window.tgApi('attempt', { task_id: t.id, answer, correct });
    renderProgress();
    renderMistakes();
    document.dispatchEvent(new CustomEvent('tg-attempt'));
  }

  // Открытая подсказка или ответ (в Телеграме): для ДЗ задача, решённая после неё, считается решённой с подсказкой.
  // Одна запись на задачу и вид за время работы страницы.
  const revealed = new Set();
  function saveReveal(t, kind) {
    if (!window.tgApi || revealed.has(kind + t.id)) return;
    revealed.add(kind + t.id);
    (window.tgReveals || (window.tgReveals = [])).unshift([t.id, kind, Math.floor(Date.now() / 1000)]);
    window.tgApi('reveal', { task_id: t.id, kind });
  }

  // Готовность к ЕГЭ по номерам КИМ. Номер освоен, когда верно решено не меньше KIM_MIN_SOLVED
  // разных задач этого номера (по уровню сложности номера) и из последних KIM_WINDOW ответов по нему
  // верных не меньше KIM_MIN_ACC. Освоение можно потерять: ошибки в последних ответах возвращают номер
  // «в работу», а если номер не решали KIM_STALE_DAYS дней, он просит повторения и не идёт в прогноз.
  // Звёзды — за 2× и 3× порога разных решённых задач, чтобы было куда расти после «освоен».
  // Прогноз первичного балла: сумма максимальных баллов освоенных номеров (KIM_POINTS в render.js, всего 45).
  const KIM_LEVEL = k => [24, 25, 26].includes(+k) ? 'В' : [5, 9, 14, 21, 22, 23].includes(+k) ? 'П' : 'Б';
  const KIM_MAX = 45, KIM_MIN_SOLVED = { 'Б': 10, 'П': 7, 'В': 7 }, KIM_MIN_ACC = 0.8, KIM_WINDOW = 10, KIM_STALE_DAYS = 21;

  // Ниже — решено задач по четырём разделам физики (оптика входит в электродинамику,
  // как в кодификаторе) и по темам внутри раздела. Доля верных ответов — отдельной строкой.
  const PROGRESS_GROUPS = [
    { name: 'Механика', sections: ['Механика'] },
    { name: 'МКТ и термодинамика', sections: ['МКТ и термодинамика'] },
    { name: 'Электродинамика и оптика', sections: ['Электродинамика', 'Оптика'] },
    { name: 'Квантовая физика', sections: ['Квантовая физика'] },
  ];

  const pct = (a, b) => {
    const v = b ? 100 * a / b : 0;
    return v > 0 && v < 10 ? v.toFixed(1).replace('.', ',') : String(Math.round(v));
  };
  const bar = (a, b, big) =>
    `<div class="bar${big ? ' big' : ''}"><span style="width:${b ? Math.min(100, 100 * a / b) : 0}%"></span></div>`;
  const balls = n => n % 10 === 1 && n % 100 !== 11 ? 'балл' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'балла' : 'баллов';

  // p — {task_id: {n, ok}}, log — журнал ответов [[task_id, 1|0, время]] от новых к старым или null
  function kimStats(p, log) {
    const st = {}, kimOf = {};
    Object.keys(KIM_POINTS).forEach(k => { st[k] = { solved: 0, n: 0, ok: 0, recent: [], last: 0 }; });
    bank.forEach(t => {
      if (!st[t.kim] || (t.tags || []).includes('ВНЕ_ЕГЭ_2027')) return;
      kimOf[t.id] = t.kim;
      const r = p[t.id], s = st[t.kim];
      if (!r) return;
      s.n += r.n; s.ok += r.ok;
      if (r.ok > 0) s.solved++;
    });
    // Журнал ответов (новые первыми). Без него (старая версия функции) — доля верных за всё время.
    if (log) log.forEach(([id, ok, ts]) => {
      const s = st[kimOf[id]];
      if (!s) return;
      if (s.recent.length < KIM_WINDOW) s.recent.push(ok);
      if (ts > s.last) s.last = ts;
    });
    const now = Date.now() / 1000;
    Object.entries(st).forEach(([k, s]) => {
      const need = KIM_MIN_SOLVED[KIM_LEVEL(k)];
      const acc = log ? s.recent.filter(Boolean).length / (s.recent.length || 1) : s.ok / (s.n || 1);
      s.acc = acc;
      s.stars = s.solved >= 3 * need ? 2 : s.solved >= 2 * need ? 1 : 0;
      s.state = !s.n ? 'none'
        : s.solved < need || acc < KIM_MIN_ACC ? 'work'
        : log && s.last && now - s.last > KIM_STALE_DAYS * 86400 ? 'stale' : 'done';
    });
    return st;
  }

  function renderProgress() {
    const box = $('progress');
    if (!prog()) { box.hidden = true; return; }
    box.hidden = false;
    const p = prog();
    const isSolved = t => p[t.id] && p[t.id].ok > 0;
    let n = 0, ok = 0;
    Object.values(p).forEach(r => { n += r.n; ok += r.ok; });
    const solved = bank.filter(isSolved).length;

    const ks = kimStats(p, window.tgLog), kims = Object.keys(KIM_POINTS);
    const done = kims.filter(k => ks[k].state === 'done');
    const score = done.reduce((a, k) => a + KIM_POINTS[k], 0);
    const cells = kims.map(k => {
      const s = ks[k], hint = !s.n ? 'не начат'
        : `решено ${s.solved} разных задач (нужно ${KIM_MIN_SOLVED[KIM_LEVEL(k)]}), верных ${Math.round(100 * s.acc)}%` +
          (s.state === 'stale' ? ', пора повторить' : s.state === 'done' ? ', освоен' : '');
      return `<a class="kc ${s.state}" href="#kim=${k}" title="№ ${k}: ${hint}"><b>${k}</b><small>${KIM_POINTS[k]} б</small>` +
        (s.stars ? `<i class="stars">${'★'.repeat(s.stars)}</i>` : '') + `</a>`;
    }).join('');

    const groups = PROGRESS_GROUPS.map(g => {
      const tasks = bank.filter(t => g.sections.includes(t.section));
      const byTopic = new Map();
      tasks.forEach(t => {
        const r = byTopic.get(t.topic) || { total: 0, solved: 0 };
        r.total++; if (isSolved(t)) r.solved++;
        byTopic.set(t.topic, r);
      });
      const gs = tasks.filter(isSolved).length;
      const topicsHtml = [...byTopic.entries()].sort((x, y) => codeKey(x[0]) < codeKey(y[0]) ? -1 : 1).map(([code, r]) =>
        `<li><a href="#topic=${encodeURIComponent(code)}">${code} ${topics[code] || ''}</a>
          <span class="cnt">${r.solved} из ${r.total}</span>${bar(r.solved, r.total)}</li>`).join('');
      return `<details class="grp"><summary><span class="gname">${g.name}</span>
          <span class="cnt">${gs} из ${tasks.length} · ${pct(gs, tasks.length)}%</span>${bar(gs, tasks.length)}</summary>
        <ul class="tlist">${topicsHtml}</ul></details>`;
    }).join('');

    $('progress-body').innerHTML = `
      <h3 class="ph">Готовность к ЕГЭ</h3>
      <div class="total"><div class="big-num">${score}</div>
        <div>из ${KIM_MAX} первичных баллов можно набрать на освоенных номерах, это <b>${testScore(score)}</b> тестовых из 100</div></div>
      ${bar(score, KIM_MAX, true)}
      <div class="cnt">Освоено номеров: <b>${done.length}</b> из ${kims.length}</div>
      <div class="kgrid">${cells}</div>
      <p class="legend"><span class="kc done"></span> освоен <span class="kc stale"></span> пора повторить <span class="kc work"></span> в работе <span class="kc none"></span> не начат</p>
      <p class="muted small">Номер освоен, когда верно решены ${KIM_MIN_SOLVED['Б']} разных задач этого номера (у номеров повышенного и высокого уровня ${KIM_MIN_SOLVED['П']}) и из последних ${KIM_WINDOW} ответов по нему верных не меньше ${Math.round(100 * KIM_MIN_ACC)}%. Ошибки возвращают номер в работу, а если не решать его ${KIM_STALE_DAYS} день, он попросит повторения. Звёзды — за вдвое и втрое больше решённых задач. Нажмите на номер, чтобы открыть его задачи.</p>
      <h3 class="ph">Банк задач</h3>
      <div class="cnt">Решено <b>${solved}</b> из ${bank.length} задач · ${pct(solved, bank.length)}%</div>
      ${bar(solved, bank.length)}
      ${groups}
      <p class="muted">${n ? `Верных ответов: ${pct(ok, n)}% (${ok} из ${n} попыток)` : 'Решайте задачи и нажимайте «Проверить», здесь будет ваш прогресс.'}</p>`;
  }

  function onProgress() {
    renderProgress();
    document.querySelectorAll('#list article.task').forEach((el, i) => markCard(el, found[i]));
    document.querySelectorAll('#lesson article.task').forEach(el => el._task && markCard(el, el._task));
    syncFav();
    renderMistakes();
  }

  function showMore() {
    const frag = document.createDocumentFragment();
    found.slice(shown, shown + PAGE).forEach(t => frag.appendChild(card(t)));
    $('list').appendChild(frag);
    shown = Math.min(shown + PAGE, found.length);
    $('more').hidden = shown >= found.length;
    $('more').textContent = `Показать ещё (осталось ${found.length - shown})`;
  }

  function apply() {
    const st = state();
    writeHash(st);
    fillSelects(st);
    found = view ? view.ids.map(id => byId[id]).filter(Boolean) : bank.filter(t => matches(t, st));
    $('count').textContent = `Найдено задач: ${found.length} из ${bank.length}`;
    $('viewbar').hidden = !view;
    if (view) $('view-title').textContent = view.fav ? `★ Избранное: задач ${found.length}`
      : view.err ? `✗ Работа над ошибками: с ошибками ${view.err}, похожих ${found.length - view.err}`
      : view.plain ? `${view.title}: задач ${found.length}`
      : `Домашнее задание «${view.title}»: задач ${found.length}`;
    $('list').innerHTML = '';
    shown = 0;
    $('status').textContent = found.length ? '' : 'Ничего не нашлось. Попробуйте убрать часть фильтров.';
    showMore();
    renderPick();
    renderFav();
    renderMistakes();
  }

  async function init() {
    try {
      const [b, tp] = await Promise.all([
        fetch('out/bank.json', { cache: 'no-cache' }).then(r => r.json()),
        fetch('out/topics.json', { cache: 'no-cache' }).then(r => r.json()),
      ]);
      topics = tp;
      bank = b.map(t => ({ ...t, kim: t.kim ?? '', _search: norm(t.condition + ' ' + t.id + ' ' + (t.theme || '')) }));
      bank.sort((a, b) => codeKey(a.topic) < codeKey(b.topic) ? -1 : codeKey(a.topic) > codeKey(b.topic) ? 1 : (a.kim - b.kim) || (a.variant || 0) - (b.variant || 0));
      bank.forEach(t => { byId[t.id] = t; });
    } catch (e) {
      $('status').textContent = 'Не удалось загрузить банк задач.';
      return;
    }
    const st = readHash();
    $('q').value = st.q;
    fillSelects(st);
    const applyAll = () => { view = null; apply(); };
    FILTERS.forEach(f => $(f.el).addEventListener('change', applyAll));
    let timer;
    $('q').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(applyAll, 250); });
    $('view-close').addEventListener('click', applyAll);
    $('fav-open').addEventListener('click', () => {
      view = { fav: true, ids: fav.get() };
      apply();
      $('viewbar').scrollIntoView({ behavior: 'smooth' });
    });
    $('err-open').addEventListener('click', () => {
      const m = mistakes();
      view = { err: m.wrong.length, ids: [...m.wrong, ...m.similar] };
      apply();
      $('viewbar').scrollIntoView({ behavior: 'smooth' });
    });
    $('reset').addEventListener('click', () => {
      view = null;
      $('q').value = '';
      FILTERS.forEach(f => { $(f.el).value = ''; });
      apply();
    });
    $('more').addEventListener('click', showMore);
    window.addEventListener('hashchange', () => {
      if (window.lessonView && window.lessonView.route()) return;
      setTab('bank');
      const h = readHash();
      $('q').value = h.q;
      fillSelects(h);
      applyAll();
    });
    if (window.lessonView) window.lessonView.route();   // #lesson=… сразу открывает вкладку «Уроки»
    apply();
    document.addEventListener('tg-progress', onProgress);
    if (prog()) onProgress();
    // для teacher.js: готовность ученика по номерам КИМ тем же правилом, что в «Моём прогрессе»
    window.bankStats = { kimStats, topics, byId, KIM_MIN_SOLVED, KIM_LEVEL, KIM_MIN_ACC, KIM_WINDOW, KIM_STALE_DAYS };
    // для hw.js: показать задачи ДЗ списком и узнать, решена ли задача
    window.bankView = {
      show(title, ids, plain) { view = { title, ids, plain }; apply(); $('viewbar').scrollIntoView({ behavior: 'smooth' }); },
      solved: id => !!(prog() && prog()[id] && prog()[id].ok > 0),
      has: id => !!byId[id],
      task: id => byId[id],
      // для lesson.js: карточки задач ДЗ урока (задачи банка и свои задачи урока) — те же, что в банке
      cards: tasks => tasks.map(t => card({ ...t, kim: t.kim ?? '' })),
    };
    document.dispatchEvent(new CustomEvent('bank-ready'));
  }

  // пробные варианты наверху: решённые (история пробников в этом браузере, exam.js) отмечены лучшим тестовым баллом
  function markExams() {
    let hist = [];
    try { hist = JSON.parse(localStorage.getItem('exams')) || []; } catch (e) { return; }
    const best = {};
    hist.forEach(e => { if (e.n) best[e.n] = Math.max(best[e.n] ?? 0, e.score); });
    document.querySelectorAll('#exams-top [data-v]').forEach(a => {
      const b = best[a.dataset.v];
      if (b === undefined) return;
      a.classList.add('done');
      a.title = `решён: ${testScore(b)} тестовых`;
      a.insertAdjacentHTML('beforeend', `<small>${testScore(b)}</small>`);
    });
  }

  markExams();
  init();
})();
