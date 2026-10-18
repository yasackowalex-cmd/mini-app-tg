// Банк задач: загрузка out/bank.json, фильтры, поиск, показ задач.
// Состояние фильтров хранится в адресе (#topic=3.1.1&kim=11), ссылку можно отправить ученику.
(function () {
  'use strict';

  // решение; метка [[рис N]] — чертёж из «## Решение» (assets/<id>_sN.svg)
  function solutionHtml(t) {
    const imgs = t.solution_images || [];
    return texToHtml(t.solution).replace(/(?:<p>\s*)?\[\[рис (\d+)\]\](?:\s*<\/p>)?/g, (m, n) => {
      const src = imgs[n - 1];
      return src ? `<div class="figs"><img src="${src}" alt="Рисунок к решению" loading="lazy"></div>` : '';
    });
  }

  // условие; метка [[рис N]] ставит N-й рисунок задачи в это место, остальные рисунки идут после условия
  function conditionHtml(t) {
    const imgs = t.images || [];
    const used = new Set();
    const html = texToHtml(t.condition).replace(/(?:<p>\s*)?\[\[рис (\d+)\]\](?:\s*<\/p>)?/g, (m, n) => {
      const src = imgs[n - 1];
      if (!src) return '';
      used.add(n - 1);
      return `<div class="figs"><img src="${src}" alt="Рисунок к задаче" loading="lazy"></div>`;
    });
    return { html, rest: imgs.filter((_, i) => !used.has(i)) };
  }

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
  let bank = [], topics = {}, found = [], shown = 0;

  const codeKey = c => String(c).split('.').map(n => n.padStart(3, '0')).join('.');
  const norm = s => (s || '').toLowerCase().replace(/ё/g, 'е');

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    const st = { q: p.get('q') || '' };
    FILTERS.forEach(f => { st[f.key] = p.get(f.key) || ''; });
    return st;
  }

  function writeHash(st) {
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

  // число: «0,5», «0.50», «−3» и «-3» считаются одним ответом
  // число, в том числе вида 2,5·10⁸, 2,5*10^8, 2,5e8
  const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
  const toNum = s => {
    const v = String(s).replace(/\s+/g, '').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, c => SUP[c]).replace(/[−–]/g, '-').replace(',', '.');
    const m = v.match(/^([-+]?\d+(?:\.\d+)?)(?:(?:[eE]|[·*xх×]10\^?)([-+]?\d+))?$/);
    return m ? parseFloat(m[1]) * Math.pow(10, m[2] ? parseInt(m[2], 10) : 0) : NaN;
  };
  const digits = s => String(s).replace(/[\s,;.]+/g, '');

  // «4,4 ± 0,2», «4,4 0,2», «4,4+-0,2»: два числа, оба должны совпасть
  const pair = s => String(s).trim().split(/\s*(?:±|\+\/?-)\s*|\s+/).map(toNum);

  function isRight(t, input) {
    if (t.check === 'pm') {
      const a = pair(input), b = pair(t.answer);
      return a.length === 2 && a.every((v, i) => Math.abs(v - b[i]) <= 1e-9 * Math.max(1, Math.abs(b[i])));
    }
    if (t.check === 'number') {
      const a = toNum(input), b = toNum(t.answer);
      return !isNaN(a) && Math.abs(a - b) <= 1e-9 * (b === 0 ? 1 : Math.abs(b));
    }
    const a = digits(input), b = digits(t.answer);
    // «выберите верные утверждения» — порядок цифр не важен, в соответствии важен
    if (t.check === 'set') return [...a].sort().join('') === [...b].sort().join('');
    return a === b;
  }

  function card(t) {
    const el = document.createElement('article');
    el.className = 'task lv-' + t.level;
    const chips = [
      `<span class="chip kim">КИМ ${t.kim ?? '?'}</span>`,
      `<span class="chip">${t.topic} ${topics[t.topic] || ''}</span>`,
      `<span class="chip">${t.type}</span>`,
      t.author_task ? '<span class="chip avt">авторская</span>' : '',
      '<span class="chip mark" hidden></span>',
    ].join('');
    const cond = conditionHtml(t);
    const figs = cond.rest.map(src => `<img src="${src}" alt="Рисунок к задаче" loading="lazy">`).join('');
    const answerHtml = t.answer ? texToHtml(t.answer).replace(/^<p>|<\/p>$/g, '') + (t.unit ? ' ' + t.unit : '') : 'нет в банке';
    const form = t.check && t.check !== 'none' ? `<form class="try">
        <label>Ответ: <input name="a" autocomplete="off" inputmode="${t.check === 'number' ? 'decimal' : t.check === 'pm' ? 'text' : 'numeric'}"
          placeholder="${{number: 'число', pm: 'x ± Δx'}[t.check] || 'цифры'}" aria-label="Ваш ответ"></label>
        ${t.unit ? `<span class="unit">${t.unit}</span>` : ''}
        <button class="btn" type="submit">Проверить</button>
        <span class="verdict" role="status"></span>
      </form>` : '';
    el.innerHTML = `<div class="meta">${chips}</div>
      <div class="cond">${cond.html}</div>
      ${figs ? `<div class="figs">${figs}</div>` : ''}
      ${form}
      <div class="actions">
        ${t.solution ? '<button class="btn" type="button" data-show="solution" aria-expanded="false">Подсказка</button>' : ''}
        <button class="btn" type="button" data-show="answer" aria-expanded="false">Показать ответ</button>
      </div>
      ${t.solution ? `<div class="reveal cond" data-part="solution" hidden><b>Решение.</b> ${solutionHtml(t)}</div>` : ''}
      <div class="reveal" data-part="answer" hidden><b>Ответ:</b> ${answerHtml}</div>
      <div class="id">${t.id}</div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-show]');
      if (!b) return;
      const part = el.querySelector(`[data-part="${b.dataset.show}"]`);
      part.hidden = !part.hidden;
      b.setAttribute('aria-expanded', String(!part.hidden));
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
    });
    markCard(el, t);
    return el;
  }

  // ---- Прогресс ученика (только в Телеграме, после проверки входа на сервере) ----
  const prog = () => window.tgProgress;

  function markCard(el, t) {
    const m = el.querySelector('.chip.mark'), p = prog() && prog()[t.id];
    if (!p) { m.hidden = true; return; }
    m.hidden = false;
    m.textContent = p.ok ? '✓ решена' : 'пока не решена';
    m.className = 'chip mark ' + (p.ok ? 'ok' : 'bad');
  }

  function saveAttempt(t, answer, correct) {
    if (!window.tgApi || !prog()) return;
    const p = prog()[t.id] || (prog()[t.id] = { n: 0, ok: 0 });
    p.n++;
    if (correct) p.ok++;
    if (window.tgLog) window.tgLog.unshift([t.id, correct ? 1 : 0, Math.floor(Date.now() / 1000)]);
    window.tgApi('attempt', { task_id: t.id, answer, correct });
    renderProgress();
  }

  // Готовность к ЕГЭ по номерам КИМ. Номер освоен, когда верно решено не меньше KIM_MIN_SOLVED
  // разных задач этого номера (по уровню сложности номера) и из последних KIM_WINDOW ответов по нему
  // верных не меньше KIM_MIN_ACC. Освоение можно потерять: ошибки в последних ответах возвращают номер
  // «в работу», а если номер не решали KIM_STALE_DAYS дней, он просит повторения и не идёт в прогноз.
  // Звёзды — за 2× и 3× порога разных решённых задач, чтобы было куда расти после «освоен».
  // Прогноз первичного балла: сумма максимальных баллов освоенных номеров (спецификация 2027, всего 45).
  const KIM_POINTS = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 1, 8: 1, 9: 2, 10: 2, 11: 1, 12: 1, 13: 1,
    14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 3, 22: 2, 23: 2, 24: 3, 25: 3, 26: 4 };
  const KIM_LEVEL = k => [24, 25, 26].includes(+k) ? 'В' : [5, 9, 14, 21, 22, 23].includes(+k) ? 'П' : 'Б';
  const KIM_MAX = 45, KIM_MIN_SOLVED = { 'Б': 5, 'П': 7, 'В': 7 }, KIM_MIN_ACC = 0.8, KIM_WINDOW = 10, KIM_STALE_DAYS = 21;

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

  function kimStats(p) {
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
    const log = window.tgLog;
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

    const ks = kimStats(p), kims = Object.keys(KIM_POINTS);
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
        <div>из ${KIM_MAX} первичных баллов можно набрать на освоенных номерах</div></div>
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
    found = bank.filter(t => matches(t, st));
    $('count').textContent = `Найдено задач: ${found.length} из ${bank.length}`;
    $('list').innerHTML = '';
    shown = 0;
    $('status').textContent = found.length ? '' : 'Ничего не нашлось. Попробуйте убрать часть фильтров.';
    showMore();
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
    } catch (e) {
      $('status').textContent = 'Не удалось загрузить банк задач.';
      return;
    }
    const st = readHash();
    $('q').value = st.q;
    fillSelects(st);
    FILTERS.forEach(f => $(f.el).addEventListener('change', apply));
    let timer;
    $('q').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(apply, 250); });
    $('reset').addEventListener('click', () => {
      $('q').value = '';
      FILTERS.forEach(f => { $(f.el).value = ''; });
      apply();
    });
    $('more').addEventListener('click', showMore);
    window.addEventListener('hashchange', () => {
      const h = readHash();
      $('q').value = h.q;
      fillSelects(h);
      apply();
    });
    apply();
    document.addEventListener('tg-progress', onProgress);
    if (prog()) onProgress();
  }

  init();
})();
