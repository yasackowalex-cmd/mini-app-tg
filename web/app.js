// Банк задач: загрузка out/bank.json, фильтры, поиск, показ задач.
// Состояние фильтров хранится в адресе (#topic=3.1.1&kim=11), ссылку можно отправить ученику.
(function () {
  'use strict';

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

  function card(t) {
    const el = document.createElement('article');
    el.className = 'task lv-' + t.level;
    const chips = [
      `<span class="chip kim">КИМ ${t.kim ?? '?'}</span>`,
      `<span class="chip">${t.topic} ${topics[t.topic] || ''}</span>`,
      `<span class="chip">${t.type}</span>`,
      t.author_task ? '<span class="chip avt">авторская</span>' : '',
    ].join('');
    const figs = (t.images || []).map(src => `<img src="${src}" alt="Рисунок к задаче" loading="lazy">`).join('');
    el.innerHTML = `<div class="meta">${chips}</div>
      <div class="cond">${texToHtml(t.condition)}</div>
      ${figs ? `<div class="figs">${figs}</div>` : ''}
      <div class="actions">
        <button class="btn" type="button" data-show="answer" aria-expanded="false">Ответ</button>
        ${t.solution ? '<button class="btn" type="button" data-show="solution" aria-expanded="false">Решение</button>' : ''}
      </div>
      <div class="reveal" data-part="answer" hidden><b>Ответ:</b> ${t.answer ? texToHtml(t.answer).replace(/^<p>|<\/p>$/g, '') : 'нет в банке'}</div>
      ${t.solution ? `<div class="reveal cond" data-part="solution" hidden>${texToHtml(t.solution)}</div>` : ''}
      <div class="id">${t.id}</div>`;
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-show]');
      if (!b) return;
      const part = el.querySelector(`[data-part="${b.dataset.show}"]`);
      part.hidden = !part.hidden;
      b.setAttribute('aria-expanded', String(!part.hidden));
    });
    return el;
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
        fetch('out/bank.json').then(r => r.json()),
        fetch('out/topics.json').then(r => r.json()),
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
    apply();
  }

  init();
})();
