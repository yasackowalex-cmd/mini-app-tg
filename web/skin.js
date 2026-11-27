// Оформление и награды ученика.
// Оформление (цвет кнопок, фон, эффект верного ответа, огонёк серии, значок и рамка ника в рейтинге) выбирает сам ученик.
// Часть предметов бесплатна сразу (и на сайте без Телеграма), остальные — награды:
//   «Автомат дня»: одна крутка в день, когда выполнен «План на сегодня», выигрыш — осколки ✦;
//   кейс за каждую полученную ступень достижения (ach.js): внутри предмет, повтор превращается в осколки;
//   «Мастерская»: любой предмет можно забрать за осколки напрямую.
// Ничего не покупается за деньги, награды только косметические.
// Случайность зависит от id ученика и номера кейса (дня крутки), поэтому перезагрузка страницы результат не меняет.
// Состояние { v: версия, o: открыто кейсов, s: [дни круток], inv: [предметы], sh: осколки, e: {категория: надетый предмет} }
// хранится в браузере и на сервере (action "skin_set", в progress — skin; миграция 013).
// Файл подключается в <head>: оформление ставится до отрисовки страницы, без мигания.
(function () {
  const root = document.documentElement;
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---- каталог ----
  const RAR = ['Обычное', 'Редкое', 'Эпическое', 'Легендарное'];
  const PRICE = [40, 80, 160, 320], DUP = [10, 20, 40, 80], ODDS = [60, 28, 10, 2];
  const CATS = [['acc', 'Цвет кнопок'], ['bg', 'Фон'], ['eff', 'Эффект верного ответа'], ['fire', 'Огонёк серии'], ['badge', 'Значок в рейтинге'], ['frame', 'Рамка ника в рейтинге']];
  // r: −1 — бесплатно, 0…3 — редкость; v — значение (цвет, emoji и т. п.)
  const I = (id, cat, name, r, v) => ({ id, cat, name, r, v });
  const ITEMS = [
    I('acc-blue', 'acc', 'Синий', -1, ['#0066FF']), I('acc-violet', 'acc', 'Фиолетовый', -1, ['#7B3FE4']),
    I('acc-green', 'acc', 'Зелёный', -1, ['#1E8E3E']), I('acc-orange', 'acc', 'Оранжевый', -1, ['#E8590C']),
    I('acc-pink', 'acc', 'Розовый', -1, ['#D6336C']), I('acc-teal', 'acc', 'Бирюзовый', -1, ['#0B93AD']),
    I('acc-red', 'acc', 'Алый', 0, ['#D93025']), I('acc-indigo', 'acc', 'Индиго', 0, ['#3949AB']), I('acc-graphite', 'acc', 'Графит', 0, ['#455A64']),
    I('acc-aurora', 'acc', 'Сияние', 1, ['#0B8F86', 'linear-gradient(120deg, #00A896, #7B3FE4)']),
    I('acc-sunset', 'acc', 'Закат', 1, ['#E8590C', 'linear-gradient(120deg, #FF8A3D, #D6336C)']),
    I('acc-plasma', 'acc', 'Плазма', 2, ['#8E24D9', 'linear-gradient(120deg, #5B00E6, #D500F9)']),
    I('acc-rainbow', 'acc', 'Радуга', 3, ['#1E88E5', 'linear-gradient(100deg, #F44336, #FF9800, #2FBF71, #1E88E5, #8E24D9)']),

    I('bg-light', 'bg', 'Светлый', -1, 'light'), I('bg-dark', 'bg', 'Тёмный', -1, 'dark'),
    I('bg-notebook', 'bg', 'Тетрадь', 0, 'light'), I('bg-mm', 'bg', 'Миллиметровка', 1, 'light'), I('bg-midnight', 'bg', 'Полночь', 1, 'dark'),
    I('bg-formulas', 'bg', 'Формулы', 2, 'light'), I('bg-neon', 'bg', 'Неон', 2, 'dark'),
    I('bg-space', 'bg', 'Космос', 3, 'dark'), I('bg-aurora', 'bg', 'Северное сияние', 3, 'dark'),
    // своя картинка ученика: хранится только в этом браузере (на сервер фото не уходят), см. «свой фон» ниже
    I('bg-custom', 'bg', 'Свой фон', 3, 'dark'),

    I('eff-none', 'eff', 'Без эффекта', -1, '○'), I('eff-confetti', 'eff', 'Конфетти', -1, '🎉'),
    I('eff-sparks', 'eff', 'Искры', 1, '✨'), I('eff-bolt', 'eff', 'Молния', 2, '⚡'), I('eff-salute', 'eff', 'Салют', 3, '🎆'),

    I('fire-orange', 'fire', 'Обычный', -1, '🔥'), I('fire-blue', 'fire', 'Синее пламя', 1, '🔥'),
    I('fire-violet', 'fire', 'Фиолетовое пламя', 2, '🔥'), I('fire-green', 'fire', 'Изумрудное пламя', 3, '🔥'),

    I('badge-smile', 'badge', 'Улыбка', -1, '🙂'),
    I('badge-magnet', 'badge', 'Магнит', 0, '🧲'), I('badge-bulb', 'badge', 'Лампочка', 0, '💡'), I('badge-battery', 'badge', 'Батарейка', 0, '🔋'), I('badge-scope', 'badge', 'Телескоп', 0, '🔭'),
    I('badge-sat', 'badge', 'Спутник', 1, '🛰️'), I('badge-flask', 'badge', 'Колба', 1, '🧪'), I('badge-gear', 'badge', 'Шестерня', 1, '⚙️'),
    I('badge-rocket', 'badge', 'Ракета', 2, '🚀'), I('badge-atom', 'badge', 'Атом', 2, '⚛️'),
    I('badge-crown', 'badge', 'Корона', 3, '👑'), I('badge-galaxy', 'badge', 'Галактика', 3, '🌌'),

    I('frame-none', 'frame', 'Без рамки', -1, ''), I('frame-silver', 'frame', 'Серебро', 1, ''), I('frame-neon', 'frame', 'Неон', 2, ''), I('frame-gold', 'frame', 'Золото', 3, ''),
  ];
  const byId = Object.fromEntries(ITEMS.map(x => [x.id, x]));
  const DEF = { acc: 'acc-blue', bg: 'bg-light', eff: 'eff-none', fire: 'fire-orange', badge: 'badge-smile', frame: 'frame-none' };
  const PAID = ITEMS.filter(x => x.r >= 0);

  // ---- хранение ----
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* без хранилища выбор живёт до перезагрузки */ } },
  };
  const fresh = () => ({ v: 0, o: 0, s: [], inv: [], sh: 0, e: { ...DEF } });
  const clean = x => {
    const s = fresh();
    if (!x || typeof x !== 'object') return s;
    s.v = Math.max(0, +x.v || 0); s.o = Math.max(0, +x.o || 0); s.sh = Math.max(0, +x.sh || 0);
    s.s = Array.isArray(x.s) ? x.s.filter(Number.isFinite).slice(-400) : [];
    s.inv = Array.isArray(x.inv) ? [...new Set(x.inv.filter(id => byId[id] && byId[id].r >= 0))] : [];
    if (x.e && typeof x.e === 'object') CATS.forEach(([c]) => { const it = byId[x.e[c]]; if (it && it.cat === c) s.e[c] = it.id; });
    return s;
  };
  // до входа через Телеграм — оформление этого устройства (только надетое), после — состояние ученика
  let st = clean({ e: ls.get('skinEq') || {} });
  let uid = null;
  // учитель (TEACHER_IDS): без ограничений — всё оформление открыто, автомат и кейсы сколько угодно
  const boss = () => !!window.tgTeacher;
  const owns = id => byId[id] && (byId[id].r < 0 || boss() || st.inv.includes(id));
  const game = () => !!(uid && window.tgApi && window.achView);

  // ---- оформление страницы ----
  function apply() {
    const e = st.e;
    // надетое, но не своё (например, другой ученик на этом устройстве) не показываем
    CATS.forEach(([c]) => { if (!owns(e[c])) e[c] = DEF[c]; });
    const acc = byId[e.acc].v;
    root.style.setProperty('--blue', acc[0]);
    if (acc[1]) root.style.setProperty('--acc-grad', acc[1]); else root.style.removeProperty('--acc-grad');
    root.dataset.bg = e.bg.slice(3);
    if (byId[e.bg].v === 'dark') root.dataset.dark = ''; else delete root.dataset.dark;
    root.dataset.fire = e.fire.slice(5);
    photoApply();
    tgColors();
  }
  // ---- свой фон: фото из галереи, уменьшенное до 1280 px, хранится только в браузере (localStorage) ----
  const photo = { get: () => { try { return localStorage.getItem('skinPhoto') || ''; } catch (e) { return ''; } },
    dim: () => { const d = ls.get('skinPhotoDim'); return typeof d === 'number' ? d : 0.45; } };
  function photoApply() {
    const u = st.e.bg === 'bg-custom' ? photo.get() : '';
    if (u) { root.style.setProperty('--photo', `url("${u}")`); root.style.setProperty('--photo-dim', String(photo.dim())); }
    else { root.style.removeProperty('--photo'); }
  }
  function photoPick() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*';
    inp.onchange = () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      const img = new Image(), url = URL.createObjectURL(f);
      img.onload = () => {
        const k = Math.min(1, 1280 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        let data = c.toDataURL('image/jpeg', 0.8);
        try { localStorage.setItem('skinPhoto', data); }
        catch (e) { data = c.toDataURL('image/jpeg', 0.55); try { localStorage.setItem('skinPhoto', data); } catch (e2) { alertBox('Картинка слишком большая, выберите другую.'); return; } }
        st.e.bg = 'bg-custom'; apply(); save(); if ($('skin-modal') && !$('skin-modal').hidden) openSkin();
      };
      img.onerror = () => { URL.revokeObjectURL(url); alertBox('Не получилось открыть картинку.'); };
      img.src = url;
    };
    inp.click();
  }
  const alertBox = t => { const m = $('skin-modal'), p = m && m.querySelector('.sk-pmsg'); if (p) p.textContent = t; };
  // цвет шапки и фона самого Телеграма — под оформление
  function tgColors() {
    const tg = window.Telegram && window.Telegram.WebApp;
    if (!tg || !document.body) return;
    const cs = getComputedStyle(root);
    try {
      if (tg.setHeaderColor) tg.setHeaderColor(cs.getPropertyValue('--dark').trim() || '#1B1F3B');
      if (tg.setBackgroundColor) tg.setBackgroundColor(cs.getPropertyValue('--bg').trim() || '#F4F5F8');
    } catch (err) { /* старый Телеграм */ }
  }
  apply();

  function save() {
    st.v++;
    ls.set('skinEq', st.e);
    if (uid) ls.set('skin:' + uid, st);
    if (game()) window.tgApi('skin_set', { skin: st });
  }

  // вход через Телеграм: берём более новое из сервера и браузера
  function load() {
    if (!window.tgUser || uid === window.tgUser.id) return;
    uid = window.tgUser.id;
    const loc = clean(ls.get('skin:' + uid)), srv = window.tgSkin ? clean(window.tgSkin) : null;
    // на этом устройстве до входа могли выбрать бесплатное оформление — оно остаётся, если у ученика ничего не сохранено
    const dev = st.e;
    st = srv && srv.v >= loc.v ? srv : loc;
    if (!st.v) { st.e = { ...dev }; }
    apply();
    ls.set('skinEq', st.e);
    if (srv && loc.v > srv.v && window.tgApi && window.tgSkin !== undefined) window.tgApi('skin_set', { skin: st });
    render();
  }

  // ---- случайность от id ученика ----
  const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  function rng(seed) {
    let a = fnv(seed);
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const pickRar = x => { let p = x * 100; for (let r = 0; r < 4; r++) { if (p < ODDS[r]) return r; p -= ODDS[r]; } return 0; };

  // ---- автомат дня ----
  const SYM = ['💡', '🧲', '⚡', '🔭', '⚛️', '⭐'];
  const dayNow = () => { const d = new Date(); return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); };
  function spinOf(day) {
    const r = rng(uid + ':spin:' + day), a = [0, 1, 2].map(() => Math.floor(r() * SYM.length));
    const star = SYM.indexOf('⭐');
    let win, text;
    if (a[0] === a[1] && a[1] === a[2]) { win = a[0] === star ? 300 : 50; text = a[0] === star ? 'ДЖЕКПОТ! Три звезды' : 'Три одинаковых'; }
    else if (a[0] === a[1] || a[1] === a[2] || a[0] === a[2]) { win = 10; text = 'Две одинаковых'; }
    else { win = 4; text = 'Утешительный приз'; }
    return { a, win, text };
  }
  const plan = () => window.todayPlan || null;
  const spunToday = () => st.s.includes(dayNow());
  const canSpin = () => game() && (boss() || (!spunToday() && !!(plan() && plan().all)));

  // ---- кейсы ----
  const casesLeft = () => !game() ? 0 : boss() ? 99 : Math.max(0, window.achView.earnedCount() - st.o);
  function caseOf(n) {
    const r = rng(uid + ':case:' + n), rar = pickRar(r()), pool = PAID.filter(x => x.r === rar);
    return pool[Math.floor(r() * pool.length)];
  }

  // ---- блок «Награды» во вкладке «Прогресс» ----
  let spinning = false, lastSpin = null;
  function reelHtml(i, sym) {
    return `<div class="reel"><div class="rl" data-reel="${i}"><span>${SYM[(sym + 5) % 6]}</span><span>${SYM[sym]}</span><span>${SYM[(sym + 1) % 6]}</span></div></div>`;
  }
  function render() {
    const el = $('rewards');
    if (!el) return;
    if (!game() || !window.tgLog) { el.hidden = true; return; }
    el.hidden = false;
    if (spinning) return;
    const today = dayNow(), done = !boss() && spunToday(), res = done ? spinOf(today) : lastSpin, cases = boss() ? '∞' : casesLeft();
    const shown = res ? res.a : [5, 5, 5];
    const p = plan();
    const line = done ? `<b class="slot-res">${res.text}: +${res.win} ✦</b><span class="slot-sub">Следующая крутка — завтра</span>`
      : boss() ? (res ? `<b class="slot-res">${res.text}: +${res.win} ✦</b>` : '') + '<span class="slot-sub">Учителю — без ограничений</span>'
      : canSpin() ? '<span class="slot-sub">План на сегодня выполнен — можно крутить</span>'
      : `<span class="slot-sub">Крутка откроется, когда будет выполнен план на сегодня${p && p.n ? ` (${p.done} из ${p.n})` : ''}</span>`;
    el.innerHTML = `<div class="rw-head"><h3 class="ph">Награды</h3><span class="rw-wal" title="Кейсы и осколки">📦 ${cases} · ✦ ${st.sh}</span></div>
      <div class="slot"><div class="slot-t">Автомат дня</div><div class="reels">${shown.map((s, i) => reelHtml(i, s)).join('')}</div>
        <div class="slot-line">${line}</div>
        ${canSpin() ? '<button type="button" class="btn slot-go" data-rw="spin">Крутить</button>' : ''}</div>
      <div class="rw-case"><span class="rw-box">📦</span><span class="rw-ct"><b>Кейсы за достижения: ${cases}</b><small class="muted">Кейс — за каждую новую ступень достижения</small></span>
        <button type="button" class="btn solid" data-rw="case"${casesLeft() ? '' : ' disabled'}>Открыть</button></div>
      <button type="button" class="btn rw-skin" data-rw="skin">🎨 Оформление <small>${owned()} из ${ITEMS.length}</small></button>`;
  }
  const owned = () => ITEMS.filter(x => owns(x.id)).length;

  function spin() {
    if (!canSpin() || spinning) return;
    const today = dayNow(), res = boss() ? spinOf('t' + Date.now()) : spinOf(today);
    spinning = true;
    if (!boss()) { st.s.push(today); st.s = st.s.slice(-400); }
    st.sh += res.win; lastSpin = res;
    save();
    const el = $('rewards');
    const go = el.querySelector('[data-rw="spin"]'); if (go) go.remove();
    el.querySelector('.slot-line').innerHTML = '<span class="slot-sub">Крутим…</span>';
    // каждый барабан — лента из случайных значков, в конце нужный
    const H = 52, N = 18;
    el.querySelectorAll('.rl').forEach((rl, i) => {
      const seq = []; for (let k = 0; k < N + i * 6; k++) seq.push(SYM[Math.floor(Math.random() * 6)]);
      seq.push(SYM[(res.a[i] + 5) % 6], SYM[res.a[i]], SYM[(res.a[i] + 1) % 6]);
      rl.innerHTML = seq.map(s => `<span>${s}</span>`).join('');
      rl.style.transition = 'none'; rl.style.transform = 'translateY(0)';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        rl.style.transition = `transform ${1.4 + i * 0.5}s cubic-bezier(.15,.85,.25,1)`;
        rl.style.transform = `translateY(-${(seq.length - 3) * H}px)`;
      }));
    });
    setTimeout(() => {
      spinning = false; render();
      haptic(res.win >= 50 ? 'success' : 'light');
      if (res.win >= 50) fx(el.querySelector('.slot'), res.win >= 300 ? 'eff-salute' : 'eff-confetti');
    }, 1400 + 2 * 500 + 300);
  }

  // ---- окно (кейс и оформление) ----
  function modal(html) {
    let m = $('skin-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'skin-modal'; m.className = 'sk-modal';
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-sk="close"]')) close(); });
      document.body.appendChild(m);
    }
    m.innerHTML = `<div class="sk-sheet" role="dialog" aria-modal="true">${html}</div>`;
    m.hidden = false;
    document.body.classList.add('sk-lock');
    return m;
  }
  function close() { const m = $('skin-modal'); if (m) m.hidden = true; document.body.classList.remove('sk-lock'); casing = false; render(); }

  // плитка предмета
  function icon(it) {
    if (it.cat === 'acc') return `<i class="sk-sw" style="background:${it.v[1] || it.v[0]}"></i>`;
    if (it.id === 'bg-custom') { const u = photo.get(); return u ? `<i class="sk-bg" style="background:url(&quot;${u}&quot;) center/cover"></i>` : '<i class="sk-em">🖼️</i>'; }
    if (it.cat === 'bg') return `<i class="sk-bg sk-bg-${it.id.slice(3)}"></i>`;
    if (it.cat === 'frame') return `<i class="sk-fr rf-${it.id.slice(6)}">🙂</i>`;
    if (it.cat === 'fire') return `<i class="sk-em fi-${it.id.slice(5)}">${it.v}</i>`;
    return `<i class="sk-em">${it.v}</i>`;
  }
  const tile = (it, extra, attrs) => `<button type="button" class="sk-it r${Math.max(0, it.r)}${it.r < 0 ? ' free' : ''}${extra || ''}" ${attrs || ''}>${icon(it)}<span class="sk-n">${esc(it.name)}</span>`;

  // ---- кейс: лента прокручивается и останавливается ----
  let casing = false, caseTok = 0;
  function openCase() {
    if (!casesLeft() || casing) return;
    casing = true;
    const tok = ++caseTok;
    const it = caseOf(st.o), dup = st.inv.includes(it.id);
    st.o++;
    if (dup) st.sh += DUP[it.r]; else st.inv.push(it.id);
    save();
    // лента: случайные предметы по тем же шансам, выигрыш — 30-й
    const W = 88, WIN = 30, strip = [];
    for (let i = 0; i < WIN + 5; i++) { const pool = PAID.filter(x => x.r === pickRar(Math.random())); strip.push(i === WIN ? it : pool[Math.floor(Math.random() * pool.length)]); }
    const m = modal(`<div class="sk-top"><b>Кейс за достижения</b><button type="button" class="sk-x" data-sk="close" aria-label="Закрыть">✕</button></div>
      <div class="cs-strip"><div class="cs-ln">${strip.map(x => `<div class="sk-it r${x.r}">${icon(x)}<span class="sk-n">${esc(x.name)}</span></div>`).join('')}</div></div>
      <div class="cs-res"></div>`);
    const ln = m.querySelector('.cs-ln'), box = m.querySelector('.cs-strip');
    const shift = WIN * W + W / 2 - box.clientWidth / 2 + (Math.random() - 0.5) * (W - 24);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ln.style.transition = 'transform 4.2s cubic-bezier(.08,.75,.12,1)';
      ln.style.transform = `translateX(-${shift}px)`;
    }));
    setTimeout(() => {
      if (!casing || tok !== caseTok) return;
      haptic(it.r >= 2 ? 'success' : 'light');
      const res = m.querySelector('.cs-res'), more = casesLeft();
      res.innerHTML = `<div class="cs-win r${it.r}"><div class="cs-rar">${RAR[it.r]}</div>${icon(it)}<b>${esc(it.name)}</b><span class="muted small">${CATS.find(c => c[0] === it.cat)[1]}</span>
        ${dup ? `<p class="small">Уже есть — получено <b>+${DUP[it.r]} ✦</b></p>` : ''}
        <div class="cs-btns">${dup ? '' : `<button type="button" class="btn solid" data-sk="eq" data-id="${it.id}">Надеть</button>`}
        ${more ? `<button type="button" class="btn" data-sk="again">Ещё кейс (${more})</button>` : `<button type="button" class="btn" data-sk="close">Готово</button>`}</div></div>`;
      if (it.r >= 2) fx(res.querySelector('.cs-win'), it.r === 3 ? 'eff-salute' : 'eff-sparks');
      casing = false;
    }, 4400);
  }

  // ---- оформление: выбрать надетое, забрать за осколки ----
  let buyAsk = null;
  function openSkin() {
    const g = game();
    modal(`<div class="sk-top"><b>Оформление</b>${g ? `<span class="rw-wal">✦ ${st.sh}</span>` : ''}<button type="button" class="sk-x" data-sk="close" aria-label="Закрыть">✕</button></div>
      <div class="sk-body">${CATS.filter(([c]) => g || !['badge', 'frame'].includes(c)).map(([c, title]) => `<div class="sk-cat"><div class="sk-ct">${title}</div><div class="sk-grid">${ITEMS.filter(x => x.cat === c).map(it => {
        const on = st.e[c] === it.id, have = owns(it.id);
        if (have) return tile(it, on ? ' on' : '', `data-sk="eq" data-id="${it.id}"`) + `<small>${on ? 'надет' : it.r < 0 ? 'бесплатно' : 'есть'}</small></button>`;
        if (!g) return tile(it, ' lock', 'disabled') + '<small>🔒</small></button>';
        const ask = buyAsk === it.id, enough = st.sh >= PRICE[it.r];
        return tile(it, ' lock' + (ask ? ' ask' : ''), `data-sk="buy" data-id="${it.id}"`) + `<small>${ask ? (enough ? `Забрать за ✦ ${PRICE[it.r]}?` : `Нужно ✦ ${PRICE[it.r]}`) : `✦ ${PRICE[it.r]}`}</small></button>`;
      }).join('')}</div>${c === 'bg' && owns('bg-custom') ? `<div class="sk-photo"><button type="button" class="btn" data-sk="photo">🖼️ ${photo.get() ? 'Другое фото' : 'Выбрать фото'}</button>
        ${photo.get() && st.e.bg === 'bg-custom' ? `<label class="small">Затемнение <input type="range" min="0" max="0.85" step="0.05" value="${photo.dim()}" data-sk-dim></label>` : ''}<span class="sk-pmsg small"></span></div>` : ''}</div>`).join('')}
      ${g ? '' : '<p class="muted small">Остальное оформление — награды за учёбу в приложении в Телеграме.</p>'}</div>`);
  }

  document.addEventListener('click', e => {
    const r = e.target.closest('[data-rw]');
    if (r) {
      if (r.dataset.rw === 'spin') spin();
      if (r.dataset.rw === 'case') openCase();
      if (r.dataset.rw === 'skin') { buyAsk = null; openSkin(); }
      return;
    }
    if (e.target.closest('#skin-open')) { buyAsk = null; openSkin(); return; }
    const b = e.target.closest('#skin-modal [data-sk]');
    if (!b) return;
    const it = byId[b.dataset.id], k = b.dataset.sk;
    if (k === 'again') { casing = false; openCase(); return; }
    if (k === 'photo') { photoPick(); return; }
    // «Свой фон» без выбранного фото: сначала выбрать фото
    if (k === 'eq' && it && it.id === 'bg-custom' && !photo.get()) { photoPick(); return; }
    if (k === 'eq' && it && owns(it.id)) {
      st.e[it.cat] = it.id; apply(); save();
      if (it.cat === 'eff' && it.id !== 'eff-none') fx(b, it.id);
      if ($('skin-modal').querySelector('.sk-body')) openSkin(); else close();
      return;
    }
    if (k === 'buy' && it && game() && !owns(it.id)) {
      if (buyAsk !== it.id) { buyAsk = it.id; openSkin(); return; }
      if (st.sh < PRICE[it.r]) return;
      st.sh -= PRICE[it.r]; st.inv.push(it.id); st.e[it.cat] = it.id; buyAsk = null;
      apply(); save(); haptic('success'); openSkin();
    }
  });
  document.addEventListener('input', e => {
    if (!e.target.matches('#skin-modal [data-sk-dim]')) return;
    ls.set('skinPhotoDim', +e.target.value); photoApply();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('skin-modal') && !$('skin-modal').hidden) close(); });

  function haptic(kind) {
    try { const h = window.Telegram.WebApp.HapticFeedback; if (kind === 'light') h.impactOccurred('light'); else h.notificationOccurred(kind); } catch (e) { /* не в Телеграме */ }
  }

  // ---- эффект верного ответа ----
  const COLORS = ['#FF6B35', '#0066FF', '#2FBF71', '#E0A800', '#D6336C', '#7B3FE4'];
  function layer() {
    let l = $('fx-layer');
    if (!l) { l = document.createElement('div'); l.id = 'fx-layer'; l.className = 'fx-layer'; document.body.appendChild(l); }
    return l;
  }
  function dot(l, x, y, cls, color) {
    const d = document.createElement('i');
    d.className = cls; d.style.left = x + 'px'; d.style.top = y + 'px'; if (color) d.style.background = color;
    l.appendChild(d);
    return d;
  }
  function fx(el, kind) {
    kind = kind || st.e.eff;
    if (!el || kind === 'eff-none' || !el.getBoundingClientRect || !document.body.animate) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = layer(), b = el.getBoundingClientRect(), x = b.left + Math.min(b.width, 160) / 2, y = b.top + b.height / 2;
    const rm = (d, ms) => setTimeout(() => d.remove(), ms);
    if (kind === 'eff-confetti') {
      for (let i = 0; i < 30; i++) {
        const d = dot(l, x, y, 'fx-cf', COLORS[i % COLORS.length]), dx = (Math.random() - 0.5) * 320, up = 80 + Math.random() * 120;
        d.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${dx * 0.6}px,${-up}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.35 },
          { transform: `translate(${dx}px,${200 + Math.random() * 120}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 1300 + Math.random() * 400, easing: 'cubic-bezier(.2,.6,.4,1)' });
        rm(d, 1800);
      }
    } else if (kind === 'eff-sparks') {
      for (let i = 0; i < 22; i++) {
        const a = (i / 22) * Math.PI * 2, r = 50 + Math.random() * 60, d = dot(l, x, y, 'fx-sp');
        d.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r}px) scale(.2)`, opacity: 0 }], { duration: 650, easing: 'ease-out' });
        rm(d, 700);
      }
    } else if (kind === 'eff-bolt') {
      const f = document.createElement('div'); f.className = 'fx-flash'; l.appendChild(f);
      f.animate([{ opacity: 0 }, { opacity: 0.35 }, { opacity: 0 }, { opacity: 0.25 }, { opacity: 0 }], { duration: 450 });
      rm(f, 500);
      const z = dot(l, x - 18, y - 70, 'fx-bolt'); z.textContent = '⚡';
      z.animate([{ transform: 'translateY(-30px) scale(.6)', opacity: 0 }, { transform: 'translateY(0) scale(1.3)', opacity: 1, offset: 0.25 }, { transform: 'translateY(6px) scale(1)', opacity: 0 }], { duration: 800 });
      rm(z, 850);
      el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }], { duration: 240 });
    } else if (kind === 'eff-salute') {
      const W = window.innerWidth, H = window.innerHeight;
      [[W * 0.25, H * 0.3, 0], [W * 0.7, H * 0.22, 250], [x, Math.max(60, y - 80), 500]].forEach(([cx, cy, delay], k) => setTimeout(() => {
        for (let i = 0; i < 28; i++) {
          const a = (i / 28) * Math.PI * 2, r = 70 + Math.random() * 50, d = dot(l, cx, cy, 'fx-sp', COLORS[(i + k) % COLORS.length]);
          d.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * r}px,${Math.sin(a) * r + 30}px)`, opacity: 0 }], { duration: 1000, easing: 'cubic-bezier(.1,.7,.3,1)' });
          rm(d, 1050);
        }
      }, delay));
    }
  }

  // для app.js (верный ответ) и ach.js (значок и рамка в рейтинге)
  window.skinFx = el => fx(el);
  window.skinView = {
    badge: id => (byId[id] && byId[id].cat === 'badge' ? byId[id].v : ''),
    frame: id => (byId[id] && byId[id].cat === 'frame' && id !== 'frame-none' ? 'rf-' + id.slice(6) : ''),
    mine: () => ({ badge: st.e.badge, frame: st.e.frame }),
  };

  document.addEventListener('DOMContentLoaded', tgColors);
  document.addEventListener('tg-progress', load);
  ['tg-progress', 'tg-attempt', 'today-plan', 'lessons-ready', 'bank-ready'].forEach(ev => document.addEventListener(ev, () => { if (uid) render(); }));
})();
