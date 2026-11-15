// Интерактивные анимации в конспектах уроков. В конспекте метка [[anim <имя>]] → <div class="lanim" data-anim="<имя>">,
// lesson.js подгружает этот файл, только когда в открытом уроке есть такая метка (главная не тяжелеет).
// Чистый JS + SVG, без библиотек. Новая анимация — функция в ANIMS: (el) => { рисует в el }.
// Общие детали: slider (ползунок), axes (оси с сеткой), strip (тела на оси x), timeline (кнопка «Пуск»), arrow (стрелка).
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { blue: '#0066FF', orange: '#FF6B35', dark: '#1B1F3B', muted: '#5B6075', line: '#E1E4EC', grid: '#EEF0F5', green: '#1E9E5A' };
  // 1,5 и −2 — как в учебнике: запятая и длинный минус
  const fmt = (n, d = 1) => {
    const r = Math.round(n * 10 ** d) / 10 ** d;
    return (Object.is(r, -0) ? 0 : r).toString().replace('.', ',').replace('-', '−');
  };
  // число для KaTeX: −1,5 → -1{,}5 (без пробела после запятой)
  const tx = (n, d = 2) => fmt(n, d).replace('−', '-').replace(',', '{,}');
  // слагаемое формулы со знаком: «+ 1,5t», «− 2t», 0 — пусто
  const term = (k, s, first) => !k ? '' : (k < 0 ? '-' : first ? '' : '+') + (Math.abs(k) === 1 && s ? '' : tx(Math.abs(k))) + s;
  const poly = (...ts) => { let out = '', first = true; ts.forEach(([k, s]) => { const p = term(k, s, first); if (p) { out += p; first = false; } }); return out || '0'; };
  const svg = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    set(e, attrs);
    if (parent) parent.appendChild(e);
    return e;
  };
  const set = (e, attrs) => { for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const text = (parent, x, y, s, cls = 'an-tk', anchor = 'start', fill) => {
    const t = svg('text', { x, y, class: cls, 'text-anchor': anchor }, parent);
    if (fill) t.setAttribute('fill', fill);
    t.textContent = s;
    return t;
  };
  let uid = 0;
  const math = s => window.renderMath ? window.renderMath(s, false) : s;

  // стрелка из (x1,y1) в (x2,y2): тонкая линия и короткий наконечник
  const ARROW = { 'stroke-width': 1.7, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  function arrowD(x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 2) return '';
    const ux = dx / len, uy = dy / len, h = Math.min(6, len * .6), w = h * .55;
    return `M${x1} ${y1}L${x2} ${y2}M${x2 - ux * h - uy * w} ${y2 - uy * h + ux * w}L${x2} ${y2}L${x2 - ux * h + uy * w} ${y2 - uy * h - ux * w}`;
  }
  const arrow = (parent, color) => svg('path', { ...ARROW, stroke: color }, parent);

  // ползунок: подпись (KaTeX) + значение
  function slider(box, { label, min, max, step, value, unit }, onInput) {
    const w = document.createElement('label');
    w.className = 'an-sl';
    w.innerHTML = `<span class="an-sl-t"><span>${math(label)}</span> = <b></b> ${unit}</span>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;
    box.appendChild(w);
    const inp = w.querySelector('input'), out = w.querySelector('b');
    const upd = () => { out.textContent = fmt(+inp.value, 2); onInput(+inp.value); };
    inp.addEventListener('input', upd);
    return { get: () => +inp.value, init: upd };
  }

  // каркас: ползунки, формула, svg-графики, кнопка и строка «сейчас»
  function frame(el, svgs, withPlay = true) {
    el.innerHTML = `<div class="an-ctl"></div><div class="an-f"></div>` +
      svgs.map(([cls, w, h, label]) => `<svg class="${cls}" viewBox="0 0 ${w} ${h}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}></svg>`).join('') +
      `<div class="an-bar">${withPlay ? '<button type="button" class="btn solid an-play">▶ Пуск</button>' : ''}<span class="an-now"></span></div>`;
    const q = s => el.querySelector(s);
    return { ctl: q('.an-ctl'), f: q('.an-f'), now: q('.an-now'), btn: q('.an-play'), svgs: svgs.map(([cls]) => q('.' + cls.split(' ')[0])) };
  }

  // удобный шаг сетки: 1, 2, 5, 10, 20, …
  function niceStep(span, n = 6) {
    const raw = span / n, p = 10 ** Math.floor(Math.log10(raw)), m = raw / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }

  // оси с сеткой в прямоугольнике box = {L, R, T, B}; set(xr, yr) перерисовывает сетку под новые пределы.
  // xr, yr = [min, max, шаг сетки, шаг подписей]. dyn — группа, обрезанная по полю графика.
  function axes(g, box, { xl, yl }) {
    const { L, R, T, B } = box, cid = 'an-clip' + (++uid);
    const grid = svg('g', {}, g);
    svg('clipPath', { id: cid }, svg('defs', {}, g)).appendChild(svg('rect', { x: L, y: T, width: R - L, height: B - T }));
    const dyn = svg('g', { 'clip-path': `url(#${cid})` }, g);
    const top = svg('g', {}, g);   // подписи поверх графиков
    const A = { dyn, top, xr: [0, 1], yr: [0, 1] };
    A.X = x => L + (R - L) * (x - A.xr[0]) / (A.xr[1] - A.xr[0]);
    A.Y = y => B - (B - T) * (y - A.yr[0]) / (A.yr[1] - A.yr[0]);
    A.set = (xr, yr) => {
      A.xr = xr; A.yr = yr;
      grid.textContent = '';
      const [x0, x1, xs, xls] = xr, [y0, y1, ys, yls] = yr, eps = 1e-9;
      const zy = y0 <= 0 && y1 >= 0 ? A.Y(0) : B, zx = x0 <= 0 && x1 >= 0 ? A.X(0) : L;
      for (let x = Math.ceil(x0 / xs) * xs; x <= x1 + eps; x += xs) svg('line', { x1: A.X(x), x2: A.X(x), y1: T, y2: B, stroke: C.grid }, grid);
      for (let y = Math.ceil(y0 / ys) * ys; y <= y1 + eps; y += ys) svg('line', { x1: L, x2: R, y1: A.Y(y), y2: A.Y(y), stroke: C.grid }, grid);
      svg('line', { x1: L, x2: R, y1: zy, y2: zy, stroke: C.dark, 'stroke-width': 1.3 }, grid);
      svg('line', { x1: zx, x2: zx, y1: T, y2: B, stroke: C.dark, 'stroke-width': 1.3 }, grid);
      for (let x = Math.ceil(x0 / xls) * xls; x <= x1 + eps; x += xls)
        if (Math.abs(x) > eps) text(grid, A.X(x), zy + 14, fmt(x), 'an-tk', 'middle');
      for (let y = Math.ceil(y0 / yls) * yls; y <= y1 + eps; y += yls)
        if (Math.abs(y) > eps) text(grid, zx - 4, A.Y(y) + 4, fmt(y), 'an-tk', 'end');
      text(grid, zx - 4, zy + (y0 < 0 ? 4 : 14), '0', 'an-tk', 'end');   // ось t посередине — 0 на её уровне, не налезает на −5
      text(grid, zx + 5, T + 11, yl, 'an-ax');
      text(grid, R - 6, zy - 5, xl, 'an-ax', 'end');
    };
    return A;
  }

  // тела на оси x (полоса под графиком): машинки, стрелки скорости над ними
  function strip(sv, colors, W = 340) {
    const CL = 14, CR = W - 14, CY = 42;
    svg('line', { x1: CL, x2: CR, y1: CY, y2: CY, stroke: C.dark, 'stroke-width': 1.3 }, sv);
    svg('path', { d: `M${CR} ${CY}l-7 -4v8z`, fill: C.dark }, sv);
    text(sv, CR - 2, CY + 16, 'x', 'an-ax', 'end');
    const zero = svg('g', {}, sv);
    svg('line', { x1: 0, x2: 0, y1: CY - 4, y2: CY + 4, stroke: C.dark }, zero);
    text(zero, 0, CY + 16, '0', 'an-tk', 'middle');
    const bodies = colors.map(col => {
      const b = svg('g', {}, sv);
      svg('rect', { x: -11, y: CY - 13, width: 22, height: 11, rx: 3, fill: col }, b);
      svg('circle', { cx: -6, cy: CY - 1.5, r: 2.6, fill: C.muted }, b);
      svg('circle', { cx: 6, cy: CY - 1.5, r: 2.6, fill: C.muted }, b);
      return { g: b, v: arrow(sv, C.blue), a: arrow(sv, C.orange), lv: text(sv, 0, 0, '', 'an-lb', 'start', C.blue), la: text(sv, 0, 0, '', 'an-lb', 'start', C.orange) };
    });
    // lo..hi — какой отрезок оси показать; items = [{x, v, a}], kv и ka — пикселей на м/с и на м/с²
    return (lo, hi, items, kv = 2.2, ka = 6) => {
      if (hi - lo < 10) { const m = (lo + hi) / 2; lo = m - 5; hi = m + 5; }
      const px = xx => CL + 16 + (CR - CL - 40) * (xx - lo) / (hi - lo);
      zero.setAttribute('transform', `translate(${px(0)} 0)`);
      zero.style.display = lo <= 0 && hi >= 0 ? '' : 'none';
      items.forEach((it, i) => {
        const B = bodies[i], bx = px(it.x);
        B.g.setAttribute('transform', `translate(${bx} 0)`);
        const lv = it.v * kv, la = (it.a || 0) * ka;
        B.v.setAttribute('d', arrowD(bx, CY - 19, bx + lv, CY - 19));
        B.a.setAttribute('d', arrowD(bx, CY - 28, bx + la, CY - 28));
        set(B.lv, { x: bx + lv + (lv > 0 ? 3 : -9), y: CY - 15 }).textContent = Math.abs(lv) >= 2 ? 'v' : '';
        set(B.la, { x: bx + la + (la > 0 ? 3 : -9), y: CY - 24 }).textContent = Math.abs(la) >= 2 ? 'a' : '';
      });
    };
  }

  // «Пуск»: время от 0 до T, speed — секунд модели за секунду. loop — по кругу без остановки
  function timeline(btn, T, speed, onT, loop = false) {
    let t = 0, playing = false, last = 0;
    const step = ms => {
      if (!playing) return;
      if (!btn.isConnected) { playing = false; return; }   // урок закрыли
      t += (ms - last) / 1000 * speed; last = ms;
      if (loop) t %= T;
      else if (t >= T) { t = T; playing = false; btn.textContent = '↻ Сначала'; }
      onT(t);
      if (playing) requestAnimationFrame(step);
    };
    const play = () => { playing = true; btn.textContent = '❚❚ Пауза'; requestAnimationFrame(ms => { last = ms; step(ms); }); };
    const pause = () => { playing = false; btn.textContent = '▶ Дальше'; };
    btn.addEventListener('click', () => {
      if (playing) return pause();
      if (t >= T) t = 0;
      play();
    });
    return { t: () => t, set: v => { t = v; onT(t); }, play, pause, playing: () => playing };
  }

  // ---- 1.1.3: v_x(t) равноускоренного движения, ползунки v0x и ax, ниже — тело на оси x ----
  function vt(el) {
    const T = 10, VMAX = 20;
    const F = frame(el, [['an-g', 340, 220, 'График проекции скорости от времени'], ['an-car', 340, 62]]);
    const [g, car] = F.svgs;
    const A = axes(g, { L: 34, R: 326, T: 10, B: 200 }, { xl: 't, с', yl: 'vₓ, м/с' });
    A.set([0, T, 1, 2], [-VMAX, VMAX, 5, 5]);
    const { X, Y, dyn } = A;
    let v0 = 4, a = 1.5;

    const areaP = svg('polygon', { fill: C.blue, 'fill-opacity': .16 }, dyn);
    const areaN = svg('polygon', { fill: C.orange, 'fill-opacity': .2 }, dyn);
    const tri = svg('path', { fill: 'none', stroke: C.orange, 'stroke-width': 1.6, 'stroke-dasharray': '4 3' }, dyn);
    const line = svg('line', { stroke: C.blue, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, dyn);
    const cur = svg('line', { stroke: C.muted, 'stroke-dasharray': '3 3', y1: 10, y2: 200 }, dyn);
    const dot = svg('circle', { r: 5, fill: C.blue, stroke: '#fff', 'stroke-width': 1.5 }, dyn);
    const triT = text(A.top, 0, 0, '', 'an-lb', 'middle', C.orange), triV = text(A.top, 0, 0, '', 'an-lb', 'start', C.orange);
    const body = strip(car, [C.dark]);

    const v = tt => v0 + a * tt, x = tt => v0 * tt + a * tt * tt / 2;
    function draw(t) {
      set(line, { x1: X(0), y1: Y(v(0)), x2: X(T), y2: Y(v(T)) });
      // площадь под графиком до текущего момента: над осью — синяя (sₓ > 0), под осью — оранжевая (sₓ < 0)
      const root = a ? -v0 / a : -1, cut = root > 0 && root < t ? root : null;
      const pg = (t1, t2) => `${X(t1)},${Y(0)} ${X(t1)},${Y(v(t1))} ${X(t2)},${Y(v(t2))} ${X(t2)},${Y(0)}`;
      areaP.setAttribute('points', ''); areaN.setAttribute('points', '');
      (cut == null ? [[0, t]] : [[0, cut], [cut, t]]).forEach(([t1, t2]) => { if (t2 > t1) (v((t1 + t2) / 2) >= 0 ? areaP : areaN).setAttribute('points', pg(t1, t2)); });
      // треугольник наклона: за Δt = 2 с скорость меняется на Δv = 2aₓ
      tri.setAttribute('d', a ? `M${X(1)} ${Y(v(1))}H${X(3)}V${Y(v(3))}` : '');
      const vis = a && Math.abs(v(1)) < VMAX && Math.abs(v(3)) < VMAX;
      set(triT, { x: X(2), y: Y(v(1)) + (a > 0 ? 13 : -5) }).textContent = vis ? 'Δt = 2 с' : '';
      set(triV, { x: X(3) + 4, y: (Y(v(1)) + Y(v(3))) / 2 + 4 }).textContent = vis ? `Δv = ${fmt(2 * a)}` : '';
      set(cur, { x1: X(t), x2: X(t) });
      set(dot, { cx: X(t), cy: Y(Math.max(-VMAX - 1, Math.min(VMAX + 1, v(t)))) });
      let lo = 0, hi = 0;
      for (let i = 0; i <= 40; i++) { const xx = x(T * i / 40); lo = Math.min(lo, xx); hi = Math.max(hi, xx); }
      body(lo, hi, [{ x: x(t), v: v(t), a }]);
      // разгон, если знаки vₓ и aₓ совпадают, торможение — если разные
      const vt_ = v(t), kind = !a || Math.abs(vt_) < 1e-9 ? (a ? 'разворот' : 'равномерно') : vt_ * a > 0 ? 'разгон' : 'торможение';
      F.now.innerHTML = `t = ${fmt(t)} с, vₓ = ${fmt(vt_)} м/с, sₓ = ${fmt(x(t))} м · <b class="an-${kind === 'разгон' ? 'up' : kind === 'торможение' ? 'down' : 'eq'}">${kind}</b>`;
    }
    const tl = timeline(F.btn, T, 2, draw);
    const upd = () => { F.f.innerHTML = math(`v_x(t)=${poly([v0, ''], [a, '\\,t'])}`); draw(tl.t()); };
    slider(F.ctl, { label: 'v_{0x}', min: -10, max: 10, step: 1, value: v0, unit: 'м/с' }, val => { v0 = val; upd(); }).init();
    slider(F.ctl, { label: 'a_x', min: -4, max: 4, step: 0.5, value: a, unit: 'м/с²' }, val => { a = val; upd(); }).init();
  }

  // ---- 1.1.3: x(t) — парабола, касательная в текущей точке (её наклон = vₓ), вершина = разворот ----
  function xt(el) {
    const T = 8;
    const F = frame(el, [['an-g', 340, 230, 'График координаты от времени'], ['an-car', 340, 62]]);
    const [g, car] = F.svgs;
    const A = axes(g, { L: 38, R: 326, T: 10, B: 214 }, { xl: 't, с', yl: 'x, м' });
    const { dyn } = A;
    let v0 = 6, a = -1.5;
    const curve = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, dyn);
    const tan = svg('line', { stroke: C.orange, 'stroke-width': 1.6, 'stroke-dasharray': '5 3' }, dyn);
    const top = svg('circle', { r: 4, fill: '#fff', stroke: C.dark, 'stroke-width': 1.5 }, dyn);
    const topL = text(A.top, 0, 0, '', 'an-lb', 'middle', C.dark);
    const dot = svg('circle', { r: 5, fill: C.blue, stroke: '#fff', 'stroke-width': 1.5 }, dyn);
    const body = strip(car, [C.dark]);
    const v = tt => v0 + a * tt, x = tt => v0 * tt + a * tt * tt / 2;
    let lo = 0, hi = 0;

    function rescale() {
      lo = 0; hi = 0;
      for (let i = 0; i <= 64; i++) { const xx = x(T * i / 64); lo = Math.min(lo, xx); hi = Math.max(hi, xx); }
      if (hi - lo < 10) hi = lo + 10;
      const s = niceStep(hi - lo, 5), y0 = Math.floor(lo / s) * s, y1 = Math.ceil(hi / s) * s;
      A.set([0, T, 1, 2], [y0, y1, s, s]);
      let d = '';
      for (let i = 0; i <= 64; i++) { const tt = T * i / 64; d += (i ? 'L' : 'M') + A.X(tt) + ' ' + A.Y(x(tt)); }
      curve.setAttribute('d', d);
      const tv = a ? -v0 / a : -1, has = tv > 0 && tv < T;
      top.style.display = has ? '' : 'none';
      set(top, { cx: A.X(tv), cy: A.Y(x(tv)) });
      set(topL, { x: A.X(tv), y: A.Y(x(tv)) + (a < 0 ? -9 : 17) }).textContent = has ? 'v = 0' : '';
    }
    function draw(t) {
      const { X, Y } = A, h = 1.5;
      set(tan, { x1: X(t - h), y1: Y(x(t) - v(t) * h), x2: X(t + h), y2: Y(x(t) + v(t) * h) });
      set(dot, { cx: X(t), cy: Y(x(t)) });
      body(lo, hi, [{ x: x(t), v: v(t), a }]);
      F.now.innerHTML = `t = ${fmt(t)} с, x = ${fmt(x(t))} м, vₓ = ${fmt(v(t))} м/с (<span class="an-down">наклон касательной</span>)`;
    }
    const tl = timeline(F.btn, T, 1.6, draw);
    const upd = () => { F.f.innerHTML = math(`x(t)=${poly([v0, 't'], [a / 2, 't^2'])}`); rescale(); draw(tl.t()); };
    slider(F.ctl, { label: 'v_{0x}', min: -8, max: 8, step: 1, value: v0, unit: 'м/с' }, val => { v0 = val; upd(); }).init();
    slider(F.ctl, { label: 'a_x', min: -3, max: 3, step: 0.5, value: a, unit: 'м/с²' }, val => { a = val; upd(); }).init();
  }

  // ---- 1.1.2: x(t) двух тел при равномерном движении, точка пересечения — встреча ----
  function meet(el) {
    const T = 10, XM = 50;
    const F = frame(el, [['an-g', 340, 230, 'Графики координат двух тел'], ['an-car', 340, 62]]);
    const [g, car] = F.svgs;
    const A = axes(g, { L: 34, R: 326, T: 10, B: 214 }, { xl: 't, с', yl: 'x, м' });
    A.set([0, T, 1, 2], [-XM, XM, 10, 20]);
    const { X, Y, dyn } = A;
    let x1 = -20, v1 = 4, x2 = 30, v2 = -2;
    const l1 = svg('line', { stroke: C.blue, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, dyn);
    const l2 = svg('line', { stroke: C.orange, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, dyn);
    const drop = svg('path', { fill: 'none', stroke: C.dark, 'stroke-dasharray': '3 3' }, dyn);
    const mp = svg('circle', { r: 5, fill: '#fff', stroke: C.dark, 'stroke-width': 2 }, dyn);
    const d1 = svg('circle', { r: 4.5, fill: C.blue, stroke: '#fff', 'stroke-width': 1.5 }, dyn);
    const d2 = svg('circle', { r: 4.5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, dyn);
    const bodies = strip(car, [C.blue, C.orange]);
    const p1 = tt => x1 + v1 * tt, p2 = tt => x2 + v2 * tt;
    let tm = null;
    function draw(t) {
      set(l1, { x1: X(0), y1: Y(p1(0)), x2: X(T), y2: Y(p1(T)) });
      set(l2, { x1: X(0), y1: Y(p2(0)), x2: X(T), y2: Y(p2(T)) });
      tm = v1 !== v2 ? (x2 - x1) / (v1 - v2) : x1 === x2 ? 0 : null;
      if (tm != null && (tm < 0 || tm > T || Math.abs(p1(tm)) > XM)) tm = null;
      mp.style.display = tm == null ? 'none' : '';
      if (tm != null) {
        set(mp, { cx: X(tm), cy: Y(p1(tm)) });
        drop.setAttribute('d', `M${X(tm)} ${Y(p1(tm))}V${Y(0)}M${X(tm)} ${Y(p1(tm))}H${X(0)}`);
      } else drop.setAttribute('d', '');
      set(d1, { cx: X(t), cy: Y(p1(t)) }); set(d2, { cx: X(t), cy: Y(p2(t)) });
      bodies(-XM, XM, [{ x: p1(t), v: v1 }, { x: p2(t), v: v2 }], 4);
      F.now.innerHTML = `t = ${fmt(t)} с · ` + (tm != null ? `<b>встреча: t = ${fmt(tm)} с, x = ${fmt(p1(tm))} м</b>` : 'за 10 с не встретятся');
    }
    const tl = timeline(F.btn, T, 2, draw);
    const upd = () => {
      F.f.innerHTML = `<span class="an-c1">${math(`x_1=${poly([x1, ''], [v1, 't'])}`)}</span><span class="an-c2">${math(`x_2=${poly([x2, ''], [v2, 't'])}`)}</span>`;
      draw(tl.t());
    };
    slider(F.ctl, { label: 'x_{01}', min: -40, max: 40, step: 5, value: x1, unit: 'м' }, val => { x1 = val; upd(); }).init();
    slider(F.ctl, { label: 'x_{02}', min: -40, max: 40, step: 5, value: x2, unit: 'м' }, val => { x2 = val; upd(); }).init();
    slider(F.ctl, { label: 'v_{1x}', min: -6, max: 6, step: 1, value: v1, unit: 'м/с' }, val => { v1 = val; upd(); }).init();
    slider(F.ctl, { label: 'v_{2x}', min: -6, max: 6, step: 1, value: v2, unit: 'м/с' }, val => { v2 = val; upd(); }).init();
  }

  // ---- 1.1.4: бросок под углом, g = 10 м/с². Траектория, H и l, вектор скорости и его проекции ----
  function throwA(el) {
    const G = 10, XMAX = 70, YMAX = 35;
    const F = frame(el, [['an-g', 340, 190, 'Траектория тела, брошенного под углом к горизонту']]);
    const [g] = F.svgs;
    const box = { L: 30, R: 330, T: 12, B: 12 + 300 * YMAX / XMAX };   // одинаковый масштаб по осям
    const A = axes(g, box, { xl: 'x, м', yl: 'y, м' });
    A.set([0, XMAX, 5, 10], [0, YMAX, 5, 10]);
    const { X, Y, dyn } = A;
    let v0 = 20, al = 60;
    const ghost = svg('path', { fill: 'none', stroke: C.muted, 'stroke-width': 1.3, 'stroke-dasharray': '5 4' }, dyn);
    const path = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, dyn);
    const hl = svg('path', { fill: 'none', stroke: C.dark, 'stroke-dasharray': '3 3' }, dyn);
    const ball = svg('circle', { r: 5, fill: C.dark }, dyn);
    const avx = arrow(g, C.muted), avy = arrow(g, C.muted), av = arrow(g, C.blue);
    const lv = text(g, 0, 0, 'v', 'an-lb', 'start', C.blue);
    const hT = text(A.top, 0, 0, '', 'an-lb', 'end', C.dark), lT = text(A.top, 0, 0, '', 'an-lb', 'middle', C.dark);
    const gl = text(A.top, 0, 0, '45°', 'an-tk', 'start');
    const traj = (vv, deg) => {
      const r = deg * Math.PI / 180, vx = vv * Math.cos(r), vy = vv * Math.sin(r), tf = 2 * vy / G;
      return { vx, vy, tf, x: t => vx * t, y: t => vy * t - G * t * t / 2 };
    };
    const pathD = P => { let d = ''; for (let i = 0; i <= 60; i++) { const t = P.tf * i / 60; d += (i ? 'L' : 'M') + X(P.x(t)) + ' ' + Y(Math.max(0, P.y(t))); } return d; };
    let P, tl;
    function draw(t) {
      const tt = t * P.tf, bx = X(P.x(tt)), by = Y(Math.max(0, P.y(tt))), k = 2.2;
      const vx = P.vx, vy = P.vy - G * tt;
      set(ball, { cx: bx, cy: by });
      avx.setAttribute('d', arrowD(bx, by, bx + vx * k, by));
      avy.setAttribute('d', arrowD(bx, by, bx, by - vy * k));
      av.setAttribute('d', arrowD(bx, by, bx + vx * k, by - vy * k));
      set(lv, { x: bx + vx * k + 3, y: by - vy * k - 2 });
      F.now.innerHTML = `t = ${fmt(tt)} с, vₓ = ${fmt(vx)} м/с, v<sub>y</sub> = ${fmt(vy)} м/с`;
    }
    const upd = () => {
      P = traj(v0, al);
      const G45 = traj(v0, 45), H = P.vy * P.vy / (2 * G), Lr = P.vx * P.tf;
      ghost.setAttribute('d', al === 45 ? '' : pathD(G45));
      set(gl, { x: Math.min(X(G45.x(G45.tf / 2)) + 4, box.R - 24), y: Math.max(Y(G45.y(G45.tf / 2)) - 4, box.T + 10) }).textContent = al === 45 ? '' : '45°';
      path.setAttribute('d', pathD(P));
      hl.setAttribute('d', `M${X(0)} ${Y(H)}H${X(Lr / 2)}V${Y(0)}`);
      set(hT, { x: X(0) - 3, y: Y(H) + 4 }).textContent = H < YMAX ? 'H' : '';
      set(lT, { x: X(Lr), y: Y(0) + 14 }).textContent = Lr < XMAX ? 'l' : '';
      F.f.innerHTML = `<span>${math(`t_{\\text{пол}}=${tx(P.tf, 1)}~\\text{с}`)}</span><span>${math(`H=${tx(H, 1)}~\\text{м}`)}</span><span>${math(`l=${tx(Lr, 1)}~\\text{м}`)}</span>`;
      draw(tl ? tl.t() : 0);
    };
    tl = timeline(F.btn, 1, 0.45, draw);   // t — доля времени полёта, полёт идёт ≈ 2 с при любых v₀ и α
    slider(F.ctl, { label: 'v_0', min: 5, max: 25, step: 1, value: v0, unit: 'м/с' }, val => { v0 = val; upd(); }).init();
    slider(F.ctl, { label: '\\alpha', min: 5, max: 85, step: 5, value: al, unit: '°' }, val => { al = val; upd(); }).init();
  }

  // ---- 1.1.5: равномерное движение по окружности. v по касательной, a = v²/R к центру ----
  function circle(el) {
    const F = frame(el, [['an-g', 340, 250, 'Точка на окружности с векторами скорости и ускорения']]);
    const [g] = F.svgs;
    const CX = 170, CY = 125, KR = 50;     // 1 м радиуса = 50 px
    let v = 2, R = 1.5, phi = 0;
    const ring = svg('circle', { cx: CX, cy: CY, fill: 'none', stroke: C.line, 'stroke-width': 2 }, g);
    svg('circle', { cx: CX, cy: CY, r: 2.5, fill: C.dark }, g);
    text(g, CX + 5, CY + 14, 'O', 'an-ax');
    const rad = svg('line', { x1: CX, y1: CY, stroke: C.muted, 'stroke-dasharray': '3 3' }, g);
    const av = arrow(g, C.blue), aa = arrow(g, C.orange);
    const lv = text(g, 0, 0, 'v', 'an-lb', 'middle', C.blue), la = text(g, 0, 0, 'a', 'an-lb', 'middle', C.orange);
    const pt = svg('circle', { r: 6, fill: C.dark }, g);
    function draw() {
      const r = R * KR, px = CX + r * Math.cos(phi), py = CY - r * Math.sin(phi);
      const tx_ = -Math.sin(phi), ty = -Math.cos(phi);   // касательная (против часовой)
      const kv = 16, ka = 5, a = v * v / R;
      ring.setAttribute('r', r);
      set(rad, { x2: px, y2: py });
      set(pt, { cx: px, cy: py });
      av.setAttribute('d', arrowD(px, py, px + tx_ * v * kv, py + ty * v * kv));
      aa.setAttribute('d', arrowD(px, py, px - Math.cos(phi) * a * ka, py + Math.sin(phi) * a * ka));
      set(lv, { x: px + tx_ * (v * kv + 9), y: py + ty * (v * kv + 9) + 4 });
      set(la, { x: px - Math.cos(phi) * (a * ka + 9), y: py + Math.sin(phi) * (a * ka + 9) + 4 });
    }
    const upd = () => {
      const T = 2 * Math.PI * R / v, a = v * v / R;
      F.f.innerHTML = `<span>${math(`T=\\dfrac{2\\pi R}{v}=${tx(T, 1)}~\\text{с}`)}</span><span>${math(`a=\\dfrac{v^2}{R}=${tx(a, 1)}~\\text{м/с}^2`)}</span>`;
      draw();
    };
    // крутится всё время, пока анимация на экране; угол растёт на ω·Δt, ω = v/R
    let last = 0;
    const tl = timeline(F.btn, 1e9, 1, t => { phi += (t - last) * v / R; last = t; draw(); }, true);
    slider(F.ctl, { label: 'v', min: 1, max: 3, step: 0.5, value: v, unit: 'м/с' }, val => { v = val; upd(); }).init();
    slider(F.ctl, { label: 'R', min: 1, max: 2, step: 0.25, value: R, unit: 'м' }, val => { R = val; upd(); }).init();
    if ('IntersectionObserver' in window) {
      let auto = true;
      new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && auto && !tl.playing()) tl.play();
        else if (!e.isIntersecting && tl.playing()) tl.pause();
      })).observe(el);
      F.btn.addEventListener('click', () => { auto = tl.playing(); });
    }
  }

  const ANIMS = { vt, xt, meet, throw: throwA, circle };
  window.lessonAnims = {
    mount(root) {
      root.querySelectorAll('.lanim[data-anim]:not([data-done])').forEach(el => {
        const f = ANIMS[el.dataset.anim];
        el.dataset.done = '1';
        if (f) f(el); else el.remove();
      });
    }
  };
})();
