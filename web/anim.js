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
      // оси со стрелками на концах
      svg('line', { x1: L, x2: R + 7, y1: zy, y2: zy, stroke: C.dark, 'stroke-width': 1.3 }, grid);
      svg('line', { x1: zx, x2: zx, y1: T - 7, y2: B, stroke: C.dark, 'stroke-width': 1.3 }, grid);
      svg('path', { d: `M${R + 9} ${zy}l-8 -3.5v7z`, fill: C.dark }, grid);
      svg('path', { d: `M${zx} ${T - 9}l-3.5 8h7z`, fill: C.dark }, grid);
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
      const TT = typeof T === 'function' ? T() : T;
      if (loop) t %= TT;
      else if (t >= TT) { t = TT; playing = false; btn.textContent = '↻ Сначала'; }
      onT(t);
      if (playing) requestAnimationFrame(step);
    };
    const play = () => { playing = true; btn.textContent = '❚❚ Пауза'; requestAnimationFrame(ms => { last = ms; step(ms); }); };
    const pause = () => { playing = false; btn.textContent = '▶ Дальше'; };
    btn.addEventListener('click', () => {
      if (playing) return pause();
      if (t >= (typeof T === 'function' ? T() : T)) t = 0;
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
    autoplay(el, tl, F.btn);
  }

  // переключатель вариантов (упругий / неупругий и т. п.)
  function seg(box, opts, value, onPick) {
    const d = document.createElement('div');
    d.className = 'seg an-seg';
    d.innerHTML = opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${v === value}">${l}</button>`).join('');
    box.appendChild(d);
    d.addEventListener('click', e => {
      const b = e.target.closest('[data-v]');
      if (!b) return;
      d.querySelectorAll('[data-v]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      onPick(b.dataset.v);
    });
  }
  // пружина витками: одинаковое число витков при любой длине (как в рисунках уроков)
  function coilD(x1, x2, y, r = 9, n = 9) {
    const lead = 8, len = x2 - x1 - 2 * lead, p = len / (n + 0.5);
    let d = `M${x1} ${y}H${x1 + lead}`;
    for (let i = 0; i <= n * 24; i++) {
      const t = i / 24, a = t * 2 * Math.PI;
      d += `L${x1 + lead + p * t + p / 2 * (1 - Math.cos(a)) * .5} ${y - r * Math.sin(a)}`;
    }
    return d + `L${x2 - lead} ${y}H${x2}`;
  }
  // подпись силы у конца стрелки
  const forceLabel = (parent, color) => text(parent, 0, 0, '', 'an-lb', 'middle', color);
  // подпись силы; «F_A», «F_тр» — с нижним индексом после «_»
  const putLabel = (t, x, y, ux, uy, s) => {
    set(t, { x: x + ux * 12, y: y + uy * 12 + 4 });
    const [main, sub] = s.split('_');
    t.textContent = main;
    if (sub) { const ts = svg('tspan', { 'baseline-shift': 'sub', 'font-size': '9px' }, t); ts.textContent = sub; }
  };

  // ---- 1.2.4: брусок на наклонной, m = 1 кг, g = 10 м/с². Силы: mg, N, F_тр; покоится или скользит ----
  function incline(el) {
    const G = 10, M = 1, K = 6;            // K — пикселей на ньютон
    const F = frame(el, [['an-g', 340, 250, 'Брусок на наклонной плоскости и силы, действующие на него']]);
    const [g] = F.svgs;
    const S = 250, BX = 326, BY = 236;    // длина наклона, нижний правый угол
    let al = 30, mu = 0.4;
    const hill = svg('path', { fill: '#E8F1FF', stroke: C.dark, 'stroke-width': 1.3 }, g);
    const arc = svg('path', { fill: 'none', stroke: C.dark }, g);
    const alT = text(g, 0, 0, 'α', 'an-ax', 'middle');
    const block = svg('g', {}, g);
    svg('rect', { x: -20, y: -24, width: 40, height: 24, rx: 2, fill: C.dark }, block);
    const aG = arrow(g, C.dark), aN = arrow(g, C.blue), aF = arrow(g, C.orange), aA = arrow(g, C.green);
    const lG = forceLabel(g, C.dark), lN = forceLabel(g, C.blue), lF = forceLabel(g, C.orange), lA = forceLabel(g, C.green);
    let st;   // { slide, a, f }
    const state = () => {
      const r = al * Math.PI / 180, down = M * G * Math.sin(r), N = M * G * Math.cos(r), fmax = mu * N;
      return down > fmax + 1e-9 ? { slide: true, a: down / M - fmax / M, f: fmax, N, r } : { slide: false, a: 0, f: down, N, r };
    };
    function draw(t) {
      const { r } = st, c = Math.cos(r), s = Math.sin(r), dx = c, dy = s, nx = s, ny = -c;
      const TX = BX - S * c, TY = BY - S * s;          // вершина наклона
      hill.setAttribute('d', `M${TX} ${TY}L${BX} ${BY}L${TX} ${BY}Z`);
      arc.setAttribute('d', `M${BX - 34} ${BY}A34 34 0 0 1 ${BX - 34 * c} ${BY - 34 * s}`);
      set(alT, { x: BX - 46 * Math.cos(r / 2), y: BY - 46 * Math.sin(r / 2) + 4 }).textContent = al >= 8 ? 'α' : '';
      // путь вдоль наклона: от четверти длины до 70%, скользит с ускорением a (масштаб: 1 м = 25 px)
      const p0 = S * 0.25, p = Math.min(S * 0.7, p0 + (st.slide ? st.a * t * t / 2 * 25 : 0));
      const px = TX + dx * p, py = TY + dy * p;
      block.setAttribute('transform', `translate(${px} ${py}) rotate(${al})`);
      const cx = px + nx * 12, cy = py + ny * 12;   // центр бруска
      const mg = M * G * K, N = st.N * K, f = st.f * K;
      aG.setAttribute('d', arrowD(cx, cy, cx, cy + mg)); putLabel(lG, cx, cy + mg, 0, 1, 'mg');
      aN.setAttribute('d', arrowD(cx, cy, cx + nx * N, cy + ny * N)); putLabel(lN, cx + nx * N, cy + ny * N, nx, ny, 'N');
      // трение — вдоль поверхности, от нижней грани бруска
      const fx = px - dx * 20, fy = py - dy * 20;
      aF.setAttribute('d', arrowD(fx, fy, fx - dx * f, fy - dy * f)); putLabel(lF, fx - dx * f, fy - dy * f, -dx * 1.4, -dy * 1.4 + .5, f > 2 ? 'F_тр' : '');
      const aa = st.a * K * 1.4;
      // ускорение — над бруском, вдоль наклона
      const ax0 = px + nx * 36 + dx * 22, ay0 = py + ny * 36 + dy * 22;
      aA.setAttribute('d', st.slide ? arrowD(ax0, ay0, ax0 + dx * aa, ay0 + dy * aa) : '');
      putLabel(lA, ax0 + dx * aa, ay0 + dy * aa, dx, dy, st.slide ? 'a' : '');
      // по высоте — только сам наклон и стрелки (при малом угле сверху не остаётся пустоты)
      const top = Math.max(0, Math.min(TY, cy - N - 10) - 24);
      g.setAttribute('viewBox', `0 ${top} 340 ${276 - top}`);   // снизу место под подпись mg
    }
    const tl = timeline(F.btn, 6, 1, draw);
    const upd = () => {
      st = state();
      const tg = Math.tan(st.r);
      F.f.innerHTML = st.slide
        ? `<span>${math(`\\operatorname{tg}\\alpha=${tx(tg)}>\\mu`)}</span><span>${math(`a=g(\\sin\\alpha-\\mu\\cos\\alpha)=${tx(st.a, 1)}~\\text{м/с}^2`)}</span>`
        : `<span>${math(`\\operatorname{tg}\\alpha=${tx(tg)}\\le\\mu`)}</span><span>${math(`F_{\\text{тр}}=mg\\sin\\alpha=${tx(st.f, 1)}~\\text{Н}`)}</span>`;
      F.now.innerHTML = st.slide ? '<b class="an-down">скользит вниз</b>, трение скольжения μN' : '<b class="an-up">покоится</b>, трение покоя равно mg sin α';
      tl.set(0);
    };
    slider(F.ctl, { label: '\\alpha', min: 0, max: 60, step: 1, value: al, unit: '°' }, val => { al = val; upd(); }).init();
    slider(F.ctl, { label: '\\mu', min: 0, max: 1, step: 0.05, value: mu, unit: '' }, val => { mu = val; upd(); }).init();
  }

  // ---- 1.2.4: закон Гука. Пружина, брусок, сила упругости и график F(Δx) ----
  function spring(el) {
    const F = frame(el, [['an-car', 340, 90, 'Пружина и сила упругости'], ['an-g', 340, 200, 'График силы упругости от деформации']], false);
    const [sp, g] = F.svgs;
    const WALL = 20, L0 = 150, KPX = 6, Y0 = 52;   // 1 см деформации = 6 px
    let k = 100, dx = 4;
    svg('rect', { x: WALL - 8, y: 14, width: 8, height: 66, fill: C.muted }, sp);
    svg('line', { x1: WALL, x2: 330, y1: 78, y2: 78, stroke: C.dark, 'stroke-width': 1.3 }, sp);
    const eq = svg('line', { x1: WALL + L0, x2: WALL + L0, y1: 22, y2: 82, stroke: C.muted, 'stroke-dasharray': '3 3' }, sp);
    text(sp, WALL + L0, 18, 'Δx = 0', 'an-tk', 'middle');
    const coil = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 1.5 }, sp);
    const blk = svg('rect', { y: Y0 - 18, width: 40, height: 36, rx: 3, fill: C.dark }, sp);
    const aF = arrow(sp, C.orange), lF = forceLabel(sp, C.orange);
    const A = axes(g, { L: 34, R: 326, T: 10, B: 186 }, { xl: 'Δx, см', yl: 'F, Н' });
    A.set([-10, 10, 1, 5], [0, 20, 2, 5]);
    const ln = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, A.dyn);
    const dot = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A.dyn);
    const upd = () => {
      const x2 = WALL + L0 + dx * KPX, f = k * Math.abs(dx) / 100;
      coil.setAttribute('d', coilD(WALL, x2, Y0));
      set(blk, { x: x2 });
      const bx = x2 + 20, len = -Math.sign(dx) * f * 4;
      aF.setAttribute('d', arrowD(bx, Y0 - 26, bx + len, Y0 - 26));
      putLabel(lF, bx + len, Y0 - 26, Math.sign(len), 0, f > 0.1 ? 'F_упр' : '');
      ln.setAttribute('d', `M${A.X(-10)} ${A.Y(k / 10)}L${A.X(0)} ${A.Y(0)}L${A.X(10)} ${A.Y(k / 10)}`);
      set(dot, { cx: A.X(dx), cy: A.Y(f) });
      F.f.innerHTML = math(`F_{\\text{упр}}=k\\,|\\Delta x|=${k}\\cdot${tx(Math.abs(dx) / 100)}=${tx(f, 1)}~\\text{Н}`);
      F.now.innerHTML = dx > 0 ? 'растяжение: сила упругости тянет брусок к стене' : dx < 0 ? 'сжатие: сила упругости толкает брусок от стены' : 'пружина не деформирована, силы нет';
    };
    slider(F.ctl, { label: 'k', min: 20, max: 200, step: 10, value: k, unit: 'Н/м' }, val => { k = val; upd(); }).init();
    slider(F.ctl, { label: '\\Delta x', min: -10, max: 10, step: 1, value: dx, unit: 'см' }, val => { dx = val; upd(); }).init();
  }

  // ---- 1.3.1: удар двух тележек. Упругий и неупругий, импульс до и после ----
  function collide(el) {
    const F = frame(el, [['an-car', 340, 80, 'Удар двух тележек']]);
    const [sv] = F.svgs;
    const W = 1.6;   // тележка 1,6 м
    let PX = 16, lo = 0;   // масштаб и левый край кадра: весь путь тележек помещается в 340 px
    let m1 = 2, m2 = 1, v1 = 4, v2 = -2, mode = 'el';
    svg('line', { x1: 0, x2: 340, y1: 66, y2: 66, stroke: C.dark, 'stroke-width': 1.3 }, sv);
    const cart = (col) => {
      const gg = svg('g', {}, sv);
      const r = svg('rect', { y: 40, height: 20, rx: 3, fill: col }, gg);
      const w1 = svg('circle', { cy: 62.5, r: 3.5, fill: C.muted }, gg), w2 = svg('circle', { cy: 62.5, r: 3.5, fill: C.muted }, gg);
      const m = text(gg, 0, 55, '', 'an-lb', 'middle', '#fff');
      return { gg, r, w1, w2, m, a: arrow(sv, C.blue), l: text(sv, 0, 0, '', 'an-lb', 'middle', C.blue) };
    };
    const c1 = cart(C.blue), c2 = cart(C.orange);
    const out = () => {
      if (mode === 'in') { const u = (m1 * v1 + m2 * v2) / (m1 + m2); return [u, u]; }
      return [((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2), ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)];
    };
    const gap = 5;   // расстояние между тележками в начале, м
    const tc = () => v1 > v2 ? gap / (v1 - v2) : Infinity;
    const T = () => Math.min(tc(), 6) + 3;
    function pos(t) {
      const a0 = 3, b0 = a0 + W + gap, t1 = tc();
      if (t <= t1) return [a0 + v1 * t, b0 + v2 * t, v1, v2, false];
      const [u1, u2] = out(), a1 = a0 + v1 * t1, b1 = b0 + v2 * t1;
      return [a1 + u1 * (t - t1), b1 + u2 * (t - t1), u1, u2, true];
    }
    function place(c, x, w, m, v) {
      const x0 = 10 + (x - lo) * PX, ww = w * PX;
      set(c.r, { x: x0, width: ww }); set(c.w1, { cx: x0 + ww * .25 }); set(c.w2, { cx: x0 + ww * .75 });
      set(c.m, { x: x0 + ww / 2 }).textContent = m + ' кг';
      const cx = x0 + ww / 2, len = v * 7;
      c.a.setAttribute('d', arrowD(cx, 30, cx + len, 30));
      set(c.l, { x: cx + len + (len > 0 ? 8 : -8), y: 34 }).textContent = Math.abs(len) >= 2 ? fmt(v) : '';
    }
    function draw(t) {
      const [a, b, va, vb, after] = pos(t);
      place(c1, a, W, m1, va); place(c2, b, W, m2, vb);
      F.now.innerHTML = after ? '<b>после удара</b>' : v1 > v2 ? 'до удара' : 'первая тележка не догонит вторую';
    }
    const tl = timeline(F.btn, T, 1.2, draw);
    const upd = () => {
      let a = Infinity, b = -Infinity;
      for (let i = 0; i <= 60; i++) { const q = pos(T() * i / 60); a = Math.min(a, q[0], q[1]); b = Math.max(b, q[0] + W, q[1] + W); }
      lo = a; PX = Math.min(24, 320 / (b - a));
      const [u1, u2] = out(), p0 = m1 * v1 + m2 * v2, p1 = m1 * u1 + m2 * u2;
      const E0 = (m1 * v1 * v1 + m2 * v2 * v2) / 2, E1 = (m1 * u1 * u1 + m2 * u2 * u2) / 2;
      F.f.innerHTML = `<span>${math(`p_{\\text{до}}=${tx(p0, 1)},\\ p_{\\text{после}}=${tx(p1, 1)}~\\text{кг}\\cdot\\text{м/с}`)}</span>` +
        `<span>${math(`E_{\\text{к до}}=${tx(E0, 1)},\\ E_{\\text{к после}}=${tx(E1, 1)}~\\text{Дж}`)}</span>`;
      tl.set(0);
    };
    seg(F.ctl, [['el', 'Упругий'], ['in', 'Неупругий']], mode, v => { mode = v; upd(); });
    F.ctl.appendChild(document.createElement('span'));
    slider(F.ctl, { label: 'm_1', min: 1, max: 5, step: 1, value: m1, unit: 'кг' }, val => { m1 = val; upd(); }).init();
    slider(F.ctl, { label: 'm_2', min: 1, max: 5, step: 1, value: m2, unit: 'кг' }, val => { m2 = val; upd(); }).init();
    slider(F.ctl, { label: 'v_{1x}', min: -4, max: 6, step: 1, value: v1, unit: 'м/с' }, val => { v1 = val; upd(); }).init();
    slider(F.ctl, { label: 'v_{2x}', min: -6, max: 4, step: 1, value: v2, unit: 'м/с' }, val => { v2 = val; upd(); }).init();
  }

  // ---- 1.3.3: шарик в ложбине y = 0,2x², m = 1 кг. Столбики Eк, Eп и E; трение уменьшает E ----
  function energy(el) {
    const G = 10, M = 1, CF = 0.2, XM = 5;
    const F = frame(el, [['an-g', 340, 190, 'Шарик в ложбине и столбики энергии']]);
    const [g] = F.svgs;
    const KX = 22, OX = 120, OY = 160;    // 1 м = 22 px, дно ложбины
    const sx = x => OX + x * KX, sy = y => OY - y * KX;
    let d = '';
    for (let i = 0; i <= 60; i++) { const x = -XM + 2 * XM * i / 60; d += (i ? 'L' : 'M') + sx(x) + ' ' + sy(CF * x * x); }
    svg('path', { d: d + `L${sx(XM)} ${OY + 14}L${sx(-XM)} ${OY + 14}Z`, fill: '#E8F1FF', stroke: 'none' }, g);
    svg('path', { d, fill: 'none', stroke: C.dark, 'stroke-width': 1.6 }, g);
    const lvl = svg('line', { x1: sx(-XM), x2: sx(XM), stroke: C.muted, 'stroke-dasharray': '4 3' }, g);
    const ball = svg('circle', { r: 7, fill: C.dark }, g);
    // столбики
    const BX = 256, BW = 20, BH = 140, BB = 168, EMAX = M * G * 5;
    const bar = (i, col, lab) => {
      text(g, BX + i * 26 + BW / 2, BB + 14, lab, 'an-lb', 'middle', col);
      svg('rect', { x: BX + i * 26, y: BB - BH, width: BW, height: BH, fill: 'none', stroke: C.line }, g);
      return svg('rect', { x: BX + i * 26, width: BW, fill: col }, g);
    };
    const bK = bar(0, C.blue, 'Eк'), bP = bar(1, C.orange, 'Eп'), bE = bar(2, C.dark, 'E');
    const setBar = (b, e) => set(b, { y: BB - BH * e / EMAX, height: BH * e / EMAX });
    let h0 = 4, ftr = 0, x, E, dir, last;
    const reset = () => { x = -Math.sqrt(h0 / CF); E = M * G * h0; dir = 1; last = 0; };
    function draw() {
      const h = CF * x * x, Ep = M * G * h, Ek = Math.max(0, E - Ep);
      const r = 7, slope = 2 * CF * x, nrm = Math.hypot(1, slope);
      set(ball, { cx: sx(x) - slope / nrm * r, cy: sy(h) - r / nrm });   // центр шарика — по нормали к ложбине
      setBar(bK, Ek); setBar(bP, Ep); setBar(bE, E);
      F.now.innerHTML = `Eк = ${fmt(Ek)} Дж, Eп = ${fmt(Ep)} Дж, E = ${fmt(E)} Дж`;
    }
    // шаг по 1 мс: скорость вдоль ложбины из энергии, у края — разворот, трение отнимает F·Δs
    function stepTo(t) {
      const n = Math.min(4000, Math.round((t - last) * 1000));
      for (let i = 0; i < n; i++) {
        const dt = 0.001, slope = 2 * CF * x, k = Math.hypot(1, slope);
        const ek = E - M * G * CF * x * x;
        let v = Math.sqrt(Math.max(0, 2 * ek / M));
        if (v < 0.05) {   // точка поворота или покой на дне
          if (Math.abs(x) < 0.02 && E < 0.01) { E = 0; break; }
          dir = slope > 0 ? -1 : slope < 0 ? 1 : dir; v = 0.05;
        }
        const ds = v * dt, nx = x + dir * ds / k;
        if (M * G * CF * nx * nx > E - ftr * ds) { dir = -dir; continue; }
        x = nx; E = Math.max(0, E - ftr * ds);
      }
      last = t;
      draw();
    }
    const tl = timeline(F.btn, 30, 1, t => { if (t < last) reset(); stepTo(t); });
    const upd = () => {
      reset();
      set(lvl, { y1: sy(h0), y2: sy(h0) });
      F.f.innerHTML = math(ftr ? `E_2-E_1=A_{\\text{тр}}<0` : `E=E_{\\text{к}}+E_{\\text{п}}=mgh_0=${tx(M * G * h0, 1)}~\\text{Дж}`);
      if (tl) tl.set(0);
      draw();
    };
    slider(F.ctl, { label: 'h_0', min: 1, max: 5, step: 0.5, value: h0, unit: 'м' }, val => { h0 = val; upd(); }).init();
    slider(F.ctl, { label: 'F_{\\text{тр}}', min: 0, max: 2, step: 0.25, value: ftr, unit: 'Н' }, val => { ftr = val; upd(); }).init();
  }

  // анимация идёт сама, пока она на экране (ушла с экрана — пауза; нажали «Пауза» — больше сама не запускается)
  function autoplay(el, tl, btn) {
    if (!('IntersectionObserver' in window)) return;
    let auto = true;
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && auto && !tl.playing()) tl.play();
      else if (!e.isIntersecting && tl.playing()) tl.pause();
    })).observe(el);
    btn.addEventListener('click', () => { auto = tl.playing(); });
  }
  // плавно подводит значение к цели (для рычага и тела в жидкости)
  function easeLoop(el, step) {
    let raf = 0, last = 0;
    const tick = ms => {
      const dt = Math.min(0.05, (ms - last) / 1000); last = ms;
      if (!el.isConnected) return;
      raf = step(dt) ? requestAnimationFrame(tick) : 0;
    };
    return () => { if (!raf) raf = requestAnimationFrame(ms => { last = ms; tick(ms); }); };
  }

  // ---- 1.4.1: рычаг. Грузы m₁, m₂ на плечах l₁, l₂ (деление = 10 см), g = 10 м/с² ----
  function lever(el) {
    const G = 10, DIV = 28, PX = 170, PY = 44;
    const F = frame(el, [['an-g', 340, 176, 'Рычаг с двумя грузами']], false);
    const [g] = F.svgs;
    svg('path', { d: `M${PX} ${PY}l-14 26h28z`, fill: C.muted }, g);
    svg('line', { x1: PX - 40, x2: PX + 40, y1: PY + 26, y2: PY + 26, stroke: C.dark, 'stroke-width': 1.5 }, g);
    const beam = svg('g', {}, g);
    svg('rect', { x: PX - 5.5 * DIV, y: PY - 4, width: 11 * DIV, height: 8, rx: 2, fill: C.dark }, beam);
    for (let i = -5; i <= 5; i++) if (i) svg('line', { x1: PX + i * DIV, x2: PX + i * DIV, y1: PY - 4, y2: PY + 4, stroke: '#fff', 'stroke-width': 1 }, beam);
    svg('circle', { cx: PX, cy: PY, r: 3.5, fill: '#fff' }, beam);
    const load = col => {
      const s = svg('line', { stroke: C.dark }, g), b = svg('rect', { width: 26, height: 26, rx: 3, fill: col }, g);
      const t = text(g, 0, 0, '', 'an-lb', 'middle', '#fff'), a = arrow(g, C.dark), l = forceLabel(g, C.dark);
      return { s, b, t, a, l };
    };
    const L1 = load(C.blue), L2 = load(C.orange);
    let m1 = 2, l1 = 4, m2 = 4, l2 = 2, ang = 0, target = 0;
    function place(Ld, m, d) {
      const r = ang * Math.PI / 180, ax = PX + d * DIV * Math.cos(r), ay = PY + d * DIV * Math.sin(r);
      const by = ay + 36;
      set(Ld.s, { x1: ax, y1: ay + 4, x2: ax, y2: by });
      set(Ld.b, { x: ax - 13, y: by });
      set(Ld.t, { x: ax, y: by + 17 }).textContent = m;
      const len = m * G * 1.6;
      Ld.a.setAttribute('d', arrowD(ax, by + 26, ax, by + 26 + len));
      set(Ld.l, { x: ax + 6, y: by + 22 + len, 'text-anchor': 'start' }).textContent = `${m * G} Н`;
    }
    function draw() {
      beam.setAttribute('transform', `rotate(${ang} ${PX} ${PY})`);
      place(L1, m1, -l1); place(L2, m2, l2);
    }
    const go = easeLoop(el, dt => { ang += (target - ang) * Math.min(1, dt * 4); draw(); return Math.abs(target - ang) > 0.05; });
    const upd = () => {
      const Ma = m1 * G * l1 / 10, Mc = m2 * G * l2 / 10;   // плечо: деление = 0,1 м
      target = Math.abs(Ma - Mc) < 1e-9 ? 0 : Mc > Ma ? 12 : -12;
      F.f.innerHTML = `<span class="an-c1">${math(`M_{\\text{против час.}}=m_1gl_1=${tx(Ma)}~\\text{Н}\\cdot\\text{м}`)}</span>` +
        `<span class="an-c2">${math(`M_{\\text{по час.}}=m_2gl_2=${tx(Mc)}~\\text{Н}\\cdot\\text{м}`)}</span>`;
      F.now.innerHTML = (!target ? '<b class="an-up">равновесие</b>' : target > 0 ? 'поворачивается по часовой стрелке' : 'поворачивается против часовой стрелки') + ' · деление = 10 см';
      go();
    };
    slider(F.ctl, { label: 'm_1', min: 1, max: 5, step: 1, value: m1, unit: 'кг' }, val => { m1 = val; upd(); }).init();
    slider(F.ctl, { label: 'm_2', min: 1, max: 5, step: 1, value: m2, unit: 'кг' }, val => { m2 = val; upd(); }).init();
    slider(F.ctl, { label: 'l_1', min: 1, max: 5, step: 1, value: l1, unit: 'дел.' }, val => { l1 = val; upd(); }).init();
    slider(F.ctl, { label: 'l_2', min: 1, max: 5, step: 1, value: l2, unit: 'дел.' }, val => { l2 = val; upd(); }).init();
    draw();
  }

  // ---- 1.4.2: тело объёмом 1 дм³ в жидкости. mg и F_A = ρж g Vпогр; плавает, тонет или висит внутри ----
  function buoy(el) {
    const G = 10, V = 0.001, A = 60, LV = 64, BOT = 206, XL = 80, XR = 260, K = 8;   // A — сторона кубика (1 дм), K — px на ньютон
    const F = frame(el, [['an-g', 340, 214, 'Тело в сосуде с жидкостью и силы, действующие на него']], false);
    const [g] = F.svgs;
    // брусок полупрозрачный оранжевый, жидкость полупрозрачная поверх него — видно погружённую часть
    const blk = svg('rect', { x: 170 - A / 2, width: A, height: A, rx: 2, fill: C.orange, 'fill-opacity': .55, stroke: C.orange }, g);
    svg('rect', { x: XL, y: LV, width: XR - XL, height: BOT - LV, fill: C.blue, 'fill-opacity': .22 }, g);
    svg('path', { d: `M${XL} 20V${BOT}H${XR}V20`, fill: 'none', stroke: C.dark, 'stroke-width': 2 }, g);
    const aG = arrow(g, C.dark), aA = arrow(g, C.blue), aN = arrow(g, C.green);
    const lG = forceLabel(g, C.dark), lA = forceLabel(g, C.blue), lN = forceLabel(g, C.green);
    let rb = 600, rl = 1000, y = LV - A, target = 0;   // y — верх кубика
    const mg = () => rb * V * G;
    const fa = () => rl * G * V * Math.max(0, Math.min(1, (y + A - LV) / A));
    function draw() {
      set(blk, { y });
      const cx = 170, cy = y + A / 2, G_ = mg(), FA = fa(), onBottom = y + A >= BOT - 0.5, N = onBottom ? Math.max(0, G_ - FA) : 0;
      // mg и F_A на одной линии — из центра бруска
      aG.setAttribute('d', arrowD(cx, cy, cx, cy + G_ * K)); putLabel(lG, cx, cy + G_ * K, 1.8, 0.2, 'mg');
      aA.setAttribute('d', arrowD(cx, cy, cx, cy - FA * K)); putLabel(lA, cx, cy - FA * K, 1.8, 0.2, FA > 0.2 ? 'F_A' : '');
      const top = Math.min(0, cy - FA * K - 12), bot = Math.max(214, cy + G_ * K + 14);   // длинные стрелки помещаются целиком
      g.setAttribute('viewBox', `0 ${top} 340 ${bot - top}`);
      aN.setAttribute('d', N > 0.2 ? arrowD(cx + 40, BOT, cx + 40, BOT - N * K) : ''); putLabel(lN, cx + 40, BOT - N * K, 1, -0.5, N > 0.2 ? 'N' : '');
      F.now.innerHTML = `mg = ${fmt(G_)} Н, F<sub>A</sub> = ${fmt(FA)} Н${N > 0.2 ? `, N = ${fmt(N)} Н` : ''}`;
    }
    const go = easeLoop(el, dt => { y += (target - y) * Math.min(1, dt * 2.5); draw(); return Math.abs(target - y) > 0.2; });
    const upd = () => {
      // где тело остановится: плавает (F_A = mg), висит внутри, лежит на дне
      target = rb < rl ? LV + A * rb / rl - A : rb > rl ? BOT - A : (LV + BOT) / 2 - A / 2;
      F.f.innerHTML = '<span>' + (rb < rl ? `${math('\\rho_{\\text{т}}<\\rho_{\\text{ж}}')} — <b class="an-up">плавает на поверхности</b>, ${math('F_A=mg')}`
        : rb > rl ? `${math('\\rho_{\\text{т}}>\\rho_{\\text{ж}}')} — <b class="an-down">тонет</b>, ${math('F_A<mg')}`
        : `${math('\\rho_{\\text{т}}=\\rho_{\\text{ж}}')} — <b>плавает внутри</b>, ${math('F_A=mg')}`) + '</span>';
      go();
    };
    slider(F.ctl, { label: '\\rho_{\\text{т}}', min: 200, max: 2000, step: 100, value: rb, unit: 'кг/м³' }, val => { rb = val; y = Math.min(y, LV - A * 0.3); upd(); }).init();
    slider(F.ctl, { label: '\\rho_{\\text{ж}}', min: 700, max: 1300, step: 100, value: rl, unit: 'кг/м³' }, val => { rl = val; upd(); }).init();
    draw();
  }

  // ---- 1.5.1: пружинный маятник x = A cos ωt и график x(t) ----
  function osc(el) {
    const TW = 4, XM = 10;
    const F = frame(el, [['an-car', 340, 70, 'Пружинный маятник'], ['an-g', 340, 170, 'График координаты от времени']]);
    const [sp, g] = F.svgs;
    const EQ = 190, KX = 6, Y0 = 36;   // положение равновесия и 1 см = 6 px
    svg('rect', { x: 12, y: 8, width: 8, height: 50, fill: C.muted }, sp);
    svg('line', { x1: 20, x2: 330, y1: 58, y2: 58, stroke: C.dark, 'stroke-width': 1.3 }, sp);
    svg('line', { x1: EQ + 18, x2: EQ + 18, y1: 4, y2: 62, stroke: C.muted, 'stroke-dasharray': '3 3' }, sp);
    const coil = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 1.5 }, sp);
    const blk = svg('rect', { y: Y0 - 18, width: 36, height: 36, rx: 3, fill: C.dark }, sp);
    const A_ = axes(g, { L: 34, R: 326, T: 10, B: 160 }, { xl: 't, с', yl: 'x, см' });
    A_.set([0, TW, 0.5, 1], [-XM, XM, 2, 5]);
    const curve = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, A_.dyn);
    const dot = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A_.dyn);
    const per = svg('path', { fill: 'none', stroke: C.orange, 'stroke-width': 1.4 }, A_.top);
    const perT = text(A_.top, 0, 0, 'T', 'an-lb', 'middle', C.orange);
    let m = 0.4, k = 40, A = 6, T = 0;
    const x = t => A * Math.cos(2 * Math.PI * t / T);
    function draw(t) {
      const tt = t % TW, xx = x(t);
      coil.setAttribute('d', coilD(20, EQ + xx * KX, Y0, 8, 8));
      set(blk, { x: EQ + xx * KX });
      let d = '';
      for (let i = 0; i <= 200 * tt / TW; i++) { const s = TW * i / 200; d += (i ? 'L' : 'M') + A_.X(s) + ' ' + A_.Y(x(t - tt + s)); }
      curve.setAttribute('d', d);
      set(dot, { cx: A_.X(tt), cy: A_.Y(xx) });
    }
    const tl = timeline(F.btn, 1e9, 1, draw, true);
    const upd = () => {
      T = 2 * Math.PI * Math.sqrt(m / k);
      F.f.innerHTML = math(`T=2\\pi\\sqrt{\\dfrac{m}{k}}=${tx(T, 2)}~\\text{с}`);
      // отрезок длиной в период на графике (от первого максимума)
      const y = A_.Y(-XM) - 8;
      per.setAttribute('d', T < TW ? `M${A_.X(0)} ${y}H${A_.X(T)}M${A_.X(0)} ${y - 4}v8M${A_.X(T)} ${y - 4}v8` : '');
      set(perT, { x: A_.X(Math.min(T, TW) / 2), y: y - 6 }).textContent = T < TW ? 'T' : '';
      F.now.textContent = 'период не зависит от амплитуды';
      draw(tl.t());
    };
    slider(F.ctl, { label: 'm', min: 0.1, max: 1, step: 0.1, value: m, unit: 'кг' }, val => { m = val; upd(); }).init();
    slider(F.ctl, { label: 'k', min: 10, max: 100, step: 10, value: k, unit: 'Н/м' }, val => { k = val; upd(); }).init();
    slider(F.ctl, { label: 'A', min: 2, max: 8, step: 1, value: A, unit: 'см' }, val => { A = val; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // ---- 1.5.2: бегущая поперечная волна y = A sin 2π(νt − x/λ). Поплавок качается на месте ----
  function wave(el) {
    const XM = 10, KX = 30, Y0 = 70, AP = 32;   // 1 м = 30 px, амплитуда 32 px
    const F = frame(el, [['an-g', 340, 130, 'Бегущая поперечная волна']]);
    const [g] = F.svgs;
    const sx = x => 20 + x * KX;
    svg('line', { x1: sx(0), x2: sx(XM), y1: Y0, y2: Y0, stroke: C.line }, g);
    svg('path', { d: `M${sx(XM) + 8} ${Y0}l-7 -4v8z`, fill: C.muted }, g);
    const line = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2 }, g);
    const dots = [];
    for (let x = 0; x <= XM + 1e-9; x += 0.5) dots.push([x, svg('circle', { r: 2.6, fill: C.blue }, g)]);
    const XF = 5;
    svg('line', { x1: sx(XF), x2: sx(XF), y1: Y0 - AP - 6, y2: Y0 + AP + 6, stroke: C.orange, 'stroke-dasharray': '2 3' }, g);
    const flo = svg('circle', { r: 6, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, g);
    const lam = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 1.2 }, g), lamT = text(g, 0, 0, 'λ', 'an-lb', 'middle', C.dark);
    const vA = arrow(g, C.green), vT = text(g, 0, 0, 'v', 'an-lb', 'start', C.green);
    let la = 3, nu = 0.5;
    const yOf = (x, t) => Y0 - AP * Math.sin(2 * Math.PI * (nu * t - x / la));
    function draw(t) {
      let d = '';
      for (let i = 0; i <= 200; i++) { const x = XM * i / 200; d += (i ? 'L' : 'M') + sx(x) + ' ' + yOf(x, t); }
      line.setAttribute('d', d);
      dots.forEach(([x, c]) => set(c, { cx: sx(x), cy: yOf(x, t) }));
      set(flo, { cx: sx(XF), cy: yOf(XF, t) });
      // λ — между двумя соседними гребнями, гребень едет вправо со скоростью v
      let xc = la * (nu * t - 0.25);
      xc -= Math.floor((xc - 0.3) / la) * la;
      const yT = Y0 - AP - 12;
      if (xc + la <= XM) {
        lam.setAttribute('d', `M${sx(xc)} ${yT}H${sx(xc + la)}M${sx(xc)} ${yT - 4}v8M${sx(xc + la)} ${yT - 4}v8`);
        set(lamT, { x: sx(xc + la / 2), y: yT - 5 }).textContent = 'λ';
      } else { lam.setAttribute('d', ''); lamT.textContent = ''; }
      vA.setAttribute('d', arrowD(sx(xc) - 14, Y0 + AP + 16, sx(xc) + 14, Y0 + AP + 16));
      set(vT, { x: sx(xc) + 17, y: Y0 + AP + 20 });
    }
    const tl = timeline(F.btn, 1e9, 1, draw, true);
    const upd = () => {
      F.f.innerHTML = `<span>${math(`T=\\dfrac{1}{\\nu}=${tx(1 / nu, 1)}~\\text{с}`)}</span><span>${math(`v=\\lambda\\nu=${tx(la * nu, 2)}~\\text{м/с}`)}</span>`;
      F.now.innerHTML = '<span class="an-down">поплавок</span> качается вверх-вниз и остаётся на месте';
      draw(tl.t());
    };
    slider(F.ctl, { label: '\\lambda', min: 1, max: 5, step: 0.5, value: la, unit: 'м' }, val => { la = val; upd(); }).init();
    slider(F.ctl, { label: '\\nu', min: 0.2, max: 1, step: 0.1, value: nu, unit: 'Гц' }, val => { nu = val; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // ---- 1.5.2: математический маятник. T = 2π√(ℓ/g): от длины и g зависит, от массы — нет ----
  function pendulum(el) {
    const TW = 8, XM = 60;   // окно графика 8 с, x до ±60 см
    const F = frame(el, [['an-g', 340, 214, 'Математический маятник'], ['an-g2', 340, 170, 'График смещения груза от времени']]);
    const [g, gr] = F.svgs;
    const A_ = axes(gr, { L: 34, R: 326, T: 10, B: 160 }, { xl: 't, с', yl: 'x, см' });
    A_.set([0, TW, 1, 2], [-XM, XM, 10, 20]);
    const curve = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, A_.dyn);
    const dot = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A_.dyn);
    const per = svg('path', { fill: 'none', stroke: C.orange, 'stroke-width': 1.4 }, A_.top);
    const perT = text(A_.top, 0, 0, 'T', 'an-lb', 'middle', C.orange);
    const PX = 170, PY = 14, KL = 90, A0 = 15 * Math.PI / 180;   // 1 м нити = 90 px, амплитуда 15°
    svg('rect', { x: PX - 40, y: PY - 8, width: 80, height: 8, fill: C.muted }, g);
    const vert = svg('line', { x1: PX, x2: PX, y1: PY, stroke: C.muted, 'stroke-dasharray': '3 3' }, g);
    const arc = svg('path', { fill: 'none', stroke: C.line, 'stroke-width': 1.5 }, g);
    const thread = svg('line', { x1: PX, y1: PY, stroke: C.dark, 'stroke-width': 1.3 }, g);
    const ball = svg('circle', { fill: C.orange }, g);
    let l = 1, m = 0.3, gv = 9.8, T = 0;
    function draw(t) {
      const L = l * KL, th = A0 * Math.cos(2 * Math.PI * t / T), bx = PX + L * Math.sin(th), by = PY + L * Math.cos(th);
      set(thread, { x2: bx, y2: by });
      set(ball, { cx: bx, cy: by, r: 6 + m * 8 });
      // смещение груза по горизонтали x = ℓ sin θ, см
      const xs = s => l * 100 * Math.sin(A0 * Math.cos(2 * Math.PI * s / T)), tt = t % TW;
      let d = '';
      for (let i = 0; i <= 240 * tt / TW; i++) { const s = TW * i / 240; d += (i ? 'L' : 'M') + A_.X(s) + ' ' + A_.Y(xs(t - tt + s)); }
      curve.setAttribute('d', d);
      set(dot, { cx: A_.X(tt), cy: A_.Y(xs(t)) });
    }
    const tl = timeline(F.btn, 1e9, 1, draw, true);
    const upd = () => {
      T = 2 * Math.PI * Math.sqrt(l / gv);
      const L = l * KL;
      set(vert, { y2: PY + L + 14 });
      g.setAttribute('viewBox', `0 0 340 ${PY + L + 34}`);   // высота рисунка — по длине нити
      arc.setAttribute('d', `M${PX - L * Math.sin(A0)} ${PY + L * Math.cos(A0)}A${L} ${L} 0 0 0 ${PX + L * Math.sin(A0)} ${PY + L * Math.cos(A0)}`);
      F.f.innerHTML = math(`T=2\\pi\\sqrt{\\dfrac{\\ell}{g}}=${tx(T, 2)}~\\text{с}`);
      const y = A_.Y(-XM) - 8;
      per.setAttribute('d', T < TW ? `M${A_.X(0)} ${y}H${A_.X(T)}M${A_.X(0)} ${y - 4}v8M${A_.X(T)} ${y - 4}v8` : '');
      set(perT, { x: A_.X(Math.min(T, TW) / 2), y: y - 6 }).textContent = T < TW ? 'T' : '';
      F.now.textContent = 'масса груза на период не влияет';
      draw(tl.t());
    };
    seg(F.ctl, [['9.8', 'Земля'], ['1.6', 'Луна']], '9.8', v => { gv = +v; upd(); });
    F.ctl.appendChild(document.createElement('span'));
    slider(F.ctl, { label: '\\ell', min: 0.25, max: 2, step: 0.25, value: l, unit: 'м' }, val => { l = val; upd(); }).init();
    slider(F.ctl, { label: 'm', min: 0.1, max: 1, step: 0.1, value: m, unit: 'кг' }, val => { m = val; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // три маленьких графика в одном svg: p–V, p–T, V–T
  function triAxes(g, specs) {
    return specs.map(([xl, yl, xr, yr, xs = xr / 4, ys = yr / 4], i) => {
      const A = axes(g, { L: 24 + i * 112, R: 100 + i * 112, T: 18, B: 112 }, { xl, yl });
      A.set([0, xr, xs, xr * 2], [0, yr, ys, yr * 2]);   // сетка без чисел: важна форма линии
      return A;
    });
  }
  // линия процесса по точкам [[x, y], …] в осях A
  const polyD = (A, pts) => pts.map(([x, y], i) => (i ? 'L' : 'M') + A.X(x) + ' ' + A.Y(y)).join('');

  // ---- 2.2: изопроцессы. Цилиндр с поршнем и молекулами, процесс сразу на трёх графиках ----
  function iso(el) {
    const P0 = 100, V0 = 1, T0 = 300;   // кПа, л, К — начальное состояние
    const F = frame(el, [['an-car', 340, 150, 'Газ в цилиндре под поршнем'], ['an-g', 340, 132, 'Процесс на графиках p–V, p–T и V–T']]);
    const [cy, g] = F.svgs;
    // цилиндр: дно y = 140, высота газа ∝ V (1 л = 40 px)
    const CX = 120, CW = 100, BOT = 140, KV = 40;
    svg('path', { d: `M${CX} 10V${BOT}H${CX + CW}V10`, fill: 'none', stroke: C.dark, 'stroke-width': 2 }, cy);
    const gas = svg('rect', { x: CX + 1, width: CW - 2, fill: C.blue, 'fill-opacity': .08 }, cy);
    const pist = svg('rect', { x: CX + 1, width: CW - 2, height: 8, fill: C.muted }, cy);
    const rod = svg('line', { x1: CX + CW / 2, x2: CX + CW / 2, y1: 0, stroke: C.muted, 'stroke-width': 4 }, cy);
    const mol = Array.from({ length: 26 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 2 * Math.PI, c: svg('circle', { r: 2.6, fill: C.blue }, cy) }));
    const info = text(cy, CX + CW + 16, 60, '', 'an-lb', 'start', C.dark), info2 = text(cy, CX + CW + 16, 78, '', 'an-lb', 'start', C.dark), info3 = text(cy, CX + CW + 16, 96, '', 'an-lb', 'start', C.dark);
    const flame = text(cy, CX + CW / 2, BOT + 0, '', 'an-lb', 'middle', C.orange);
    const [Apv, Apt, Avt] = triAxes(g, [['V', 'p', 3.5, 250, 0.5, 50], ['T', 'p', 750, 250, 150, 50], ['T', 'V', 750, 3.5, 150, 0.5]]);   // шаг сетки — по значениям состояний: линии идут по узлам
    const mk = A => ({ full: svg('path', { fill: 'none', stroke: C.blue, 'stroke-opacity': .25, 'stroke-width': 2 }, A.dyn),
      zero: svg('path', { fill: 'none', stroke: C.muted, 'stroke-dasharray': '3 3' }, A.dyn),
      dot: svg('circle', { r: 4, fill: C.orange }, A.dyn) });
    const G3 = [mk(Apv), mk(Apt), mk(Avt)];
    let kind = 'T', s = 1;   // s — значение ползунка: V для изотермы, T для изобары и изохоры
    const state = (k, v) => k === 'T' ? { V: v, T: T0, p: P0 * V0 / v } : k === 'p' ? { T: v, p: P0, V: V0 * v / T0 } : { T: v, V: V0, p: P0 * v / T0 };
    const range = k => k === 'T' ? [0.5, 3] : [150, 600];
    let st = state('T', 1), last = 0;
    function drawGas(t) {
      const top = BOT - st.V * KV, h = BOT - top - 8, dt = Math.min(0.05, t - last), sp = 0.35 * Math.sqrt(st.T / T0);
      last = t;
      set(gas, { y: top + 8, height: h }); set(pist, { y: top }); set(rod, { y2: top });
      mol.forEach(m => {
        m.x += Math.cos(m.a) * sp * dt * 3; m.y += Math.sin(m.a) * sp * dt * 3 * 40 / Math.max(20, h);
        if (m.x < 0 || m.x > 1) { m.a = Math.PI - m.a; m.x = Math.max(0, Math.min(1, m.x)); }
        if (m.y < 0 || m.y > 1) { m.a = -m.a; m.y = Math.max(0, Math.min(1, m.y)); }
        set(m.c, { cx: CX + 5 + m.x * (CW - 10), cy: top + 12 + m.y * (h - 8) });
      });
    }
    function upd() {
      st = state(kind, s);
      const [a, b] = range(kind), pts = [];
      for (let i = 0; i <= 40; i++) pts.push(state(kind, a + (b - a) * i / 40));
      const xy = [[q => [q.V, q.p], Apv], [q => [q.T, q.p], Apt], [q => [q.T, q.V], Avt]];
      xy.forEach(([f, A], i) => {
        G3[i].full.setAttribute('d', polyD(A, pts.map(f)));
        set(G3[i].dot, { cx: A.X(f(st)[0]), cy: A.Y(f(st)[1]) });
        // прямая через начало координат — пунктиром до нуля
        const [x0, y0] = f(pts[0]), through0 = (kind === 'p' && i === 2) || (kind === 'V' && i === 1);
        G3[i].zero.setAttribute('d', through0 ? `M${A.X(0)} ${A.Y(0)}L${A.X(x0)} ${A.Y(y0)}` : '');
      });
      info.textContent = `p = ${fmt(st.p)} кПа`; info2.textContent = `V = ${fmt(st.V, 2)} л`; info3.textContent = `T = ${fmt(st.T, 0)} К`;
      F.f.innerHTML = math(kind === 'T' ? 'T=\\text{const},\\quad pV=\\text{const}' : kind === 'p' ? 'p=\\text{const},\\quad \\dfrac{V}{T}=\\text{const}' : 'V=\\text{const},\\quad \\dfrac{p}{T}=\\text{const}');
      F.now.textContent = kind === 'T' ? 'изотерма: на p–V гипербола' : kind === 'p' ? 'изобара: на V–T прямая через 0' : 'изохора: на p–T прямая через 0';
    }
    const tl = timeline(F.btn, 1e9, 1, drawGas, true);
    let sl;
    const mkSlider = () => {
      const old = F.ctl.querySelector('.an-sl'); if (old) old.remove();
      const [a, b] = range(kind);
      s = kind === 'T' ? 1 : 300;
      sl = kind === 'T' ? slider(F.ctl, { label: 'V', min: a, max: b, step: 0.1, value: s, unit: 'л' }, v => { s = v; upd(); })
        : slider(F.ctl, { label: 'T', min: a, max: b, step: 10, value: s, unit: 'К' }, v => { s = v; upd(); });
      sl.init();
    };
    seg(F.ctl, [['T', 'Изотерма'], ['p', 'Изобара'], ['V', 'Изохора']], kind, v => { kind = v; mkSlider(); });
    mkSlider();
    autoplay(el, tl, F.btn);
  }

  // ---- 2.5: работа газа = площадь под графиком p(V) ----
  function work(el) {
    const F = frame(el, [['an-g', 340, 210, 'Работа газа на графике p–V']]);
    const [g] = F.svgs;
    const A = axes(g, { L: 40, R: 326, T: 10, B: 186 }, { xl: 'V, л', yl: 'p, кПа' });
    A.set([0, 6, 1, 1], [0, 300, 50, 100]);
    const area = svg('polygon', { 'fill-opacity': .2 }, A.dyn);
    const line = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 2.4 }, A.dyn);
    const dir = arrow(A.dyn, C.dark);
    const d1 = svg('circle', { r: 4.5, fill: C.dark }, A.dyn), d2 = svg('circle', { r: 4.5, fill: C.dark }, A.dyn);
    const t1 = text(A.top, 0, 0, '1', 'an-lb', 'middle', C.dark), t2 = text(A.top, 0, 0, '2', 'an-lb', 'middle', C.dark);
    const cur = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A.dyn);
    let kind = 'p', V1 = 1, V2 = 4, p1 = 200, p2 = 100, sP2;
    const P2 = () => kind === 'p' ? p1 : p2;
    const pAt = V => p1 + (P2() - p1) * (V - V1) / ((V2 - V1) || 1);
    function draw(f) {   // f — доля пройденного пути 0…1
      const Vc = V1 + (V2 - V1) * f, pc = pAt(Vc);
      area.setAttribute('points', `${A.X(V1)},${A.Y(0)} ${A.X(V1)},${A.Y(p1)} ${A.X(Vc)},${A.Y(pc)} ${A.X(Vc)},${A.Y(0)}`);
      area.setAttribute('fill', V2 >= V1 ? C.blue : C.orange);
      set(cur, { cx: A.X(Vc), cy: A.Y(pc) });
      const W = (p1 + pc) / 2 * (Vc - V1);   // кПа·л = Дж
      F.now.innerHTML = `A = ${fmt(W, 0)} Дж — ` + (V2 > V1 ? '<b class="an-up">расширение, A &gt; 0</b>' : V2 < V1 ? '<b class="an-down">сжатие, A &lt; 0</b>' : 'объём не меняется, A = 0');
    }
    const tl = timeline(F.btn, 1, 0.4, draw);
    const upd = () => {
      if (sP2) sP2.querySelector('input').disabled = kind === 'p';
      line.setAttribute('d', `M${A.X(V1)} ${A.Y(p1)}L${A.X(V2)} ${A.Y(P2())}`);
      const mx = (V1 + V2) / 2, my = (p1 + P2()) / 2, len = Math.hypot(A.X(V2) - A.X(V1), A.Y(P2()) - A.Y(p1));
      const ux = (A.X(V2) - A.X(V1)) / (len || 1), uy = (A.Y(P2()) - A.Y(p1)) / (len || 1);
      dir.setAttribute('d', len > 30 ? arrowD(A.X(mx) - ux * 8, A.Y(my) - uy * 8, A.X(mx) + ux * 8, A.Y(my) + uy * 8) : '');
      set(d1, { cx: A.X(V1), cy: A.Y(p1) }); set(d2, { cx: A.X(V2), cy: A.Y(P2()) });
      set(t1, { x: A.X(V1), y: A.Y(p1) - 9 }); set(t2, { x: A.X(V2), y: A.Y(P2()) - 9 });
      const W = (p1 + P2()) / 2 * (V2 - V1);
      F.f.innerHTML = math(kind === 'p' ? `A=p\\,\\Delta V=${p1}\\cdot${tx(V2 - V1, 1)}=${tx(W, 0)}~\\text{Дж}`
        : `A=\\dfrac{p_1+p_2}{2}\\,\\Delta V=${tx(W, 0)}~\\text{Дж}`);
      tl.set(1);
    };
    seg(F.ctl, [['p', 'Изобара'], ['lin', 'Прямая']], kind, v => { kind = v; upd(); });
    F.ctl.appendChild(document.createElement('span'));
    slider(F.ctl, { label: 'V_1', min: 1, max: 5, step: 0.5, value: V1, unit: 'л' }, v => { V1 = v; upd(); }).init();
    slider(F.ctl, { label: 'V_2', min: 1, max: 5, step: 0.5, value: V2, unit: 'л' }, v => { V2 = v; upd(); }).init();
    slider(F.ctl, { label: 'p_1', min: 50, max: 300, step: 25, value: p1, unit: 'кПа' }, v => { p1 = v; upd(); }).init();
    slider(F.ctl, { label: 'p_2', min: 50, max: 300, step: 25, value: p2, unit: 'кПа' }, v => { p2 = v; upd(); }).init();
    sP2 = F.ctl.querySelectorAll('.an-sl')[3];
    upd();
  }

  // ---- 2.6: цикл из двух изохор и двух изобар (одноатомный газ). Работа = площадь, η = A/Q₁ ----
  function cycle(el) {
    const F = frame(el, [['an-g', 340, 210, 'Цикл на графике p–V']]);
    const [g] = F.svgs;
    const A = axes(g, { L: 40, R: 326, T: 10, B: 186 }, { xl: 'V, л', yl: 'p, кПа' });
    A.set([0, 6, 1, 1], [0, 400, 50, 100]);
    const area = svg('polygon', { fill: C.blue, 'fill-opacity': .15 }, A.dyn);
    const segs = [0, 1, 2, 3].map(() => svg('line', { 'stroke-width': 2.8, 'stroke-linecap': 'round' }, A.dyn));
    const arrs = [0, 1, 2, 3].map(() => svg('path', { ...ARROW, stroke: C.dark }, A.dyn));
    const lbl = [1, 2, 3, 4].map(i => text(A.top, 0, 0, String(i), 'an-lb', 'middle', C.dark));
    const cur = svg('circle', { r: 5.5, fill: C.dark, stroke: '#fff', 'stroke-width': 1.5 }, A.dyn);
    const P1 = 100, V1 = 1;
    let p2 = 300, V3 = 4, cw = true, pts, Q;
    function geom() {
      // 1(V1,P1) → 2(V1,p2) → 3(V3,p2) → 4(V3,P1); против часовой — обратный обход
      const base = [[V1, P1], [V1, p2], [V3, p2], [V3, P1]];
      pts = cw ? base : [base[0], base[3], base[2], base[1]];
      // теплота на участках: изохора Q = 3/2·VΔp, изобара Q = 5/2·pΔV (кПа·л = Дж)
      Q = pts.map((a, i) => { const b = pts[(i + 1) % 4]; return a[0] === b[0] ? 1.5 * a[0] * (b[1] - a[1]) : 2.5 * a[1] * (b[0] - a[0]); });
    }
    function draw(t) {   // t — 0…4, номер участка и доля
      const i = Math.floor(t) % 4, f = t - Math.floor(t), a = pts[i], b = pts[(i + 1) % 4];
      set(cur, { cx: A.X(a[0] + (b[0] - a[0]) * f), cy: A.Y(a[1] + (b[1] - a[1]) * f) });
      segs.forEach((s, k) => s.setAttribute('stroke-opacity', k === i ? 1 : .55));
    }
    const tl = timeline(F.btn, 4, 0.8, draw, true);
    const upd = () => {
      geom();
      area.setAttribute('points', pts.map(([v, p]) => `${A.X(v)},${A.Y(p)}`).join(' '));
      area.setAttribute('fill', cw ? C.blue : C.orange);
      pts.forEach((a, i) => {
        const b = pts[(i + 1) % 4];
        set(segs[i], { x1: A.X(a[0]), y1: A.Y(a[1]), x2: A.X(b[0]), y2: A.Y(b[1]), stroke: Q[i] > 0 ? C.orange : C.blue });
        const mx = (A.X(a[0]) + A.X(b[0])) / 2, my = (A.Y(a[1]) + A.Y(b[1])) / 2, len = Math.hypot(A.X(b[0]) - A.X(a[0]), A.Y(b[1]) - A.Y(a[1]));
        const ux = (A.X(b[0]) - A.X(a[0])) / len, uy = (A.Y(b[1]) - A.Y(a[1])) / len;
        arrs[i].setAttribute('d', arrowD(mx - ux * 7, my - uy * 7, mx + ux * 7, my + uy * 7));
      });
      // номера состояний по исходной нумерации 1→2→3→4
      [[V1, P1], [V1, p2], [V3, p2], [V3, P1]].forEach(([v, p], i) => set(lbl[i], { x: A.X(v) + (i < 2 ? -9 : 9), y: A.Y(p) + (i === 1 || i === 2 ? -6 : 14) }));
      const W = (p2 - P1) * (V3 - V1), Q1 = Q.filter(q => q > 0).reduce((s, q) => s + q, 0), Q2 = -Q.filter(q => q < 0).reduce((s, q) => s + q, 0);
      F.f.innerHTML = cw
        ? `<span>${math(`A=${tx(W, 0)}~\\text{Дж}`)}</span><span>${math(`Q_1=${tx(Q1, 0)}~\\text{Дж}`)}</span><span>${math(`|Q_2|=${tx(Q2, 0)}~\\text{Дж}`)}</span><span>${math(`\\eta=\\dfrac{A}{Q_1}=${tx(W / Q1 * 100, 0)}\\%`)}</span>`
        : `<span>${math(`A=-${tx(W, 0)}~\\text{Дж}`)}</span><span>работу совершают над газом</span>`;
      F.now.innerHTML = '<span class="an-down">оранжевые</span> участки — газ получает теплоту, <span class="an-up">синие</span> — отдаёт';
      draw(tl.t());
    };
    seg(F.ctl, [['cw', 'По часовой'], ['ccw', 'Против часовой']], 'cw', v => { cw = v === 'cw'; upd(); });
    F.ctl.appendChild(document.createElement('span'));
    slider(F.ctl, { label: 'p_2', min: 150, max: 400, step: 25, value: p2, unit: 'кПа' }, v => { p2 = v; upd(); }).init();
    slider(F.ctl, { label: 'V_3', min: 2, max: 6, step: 0.5, value: V3, unit: 'л' }, v => { V3 = v; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // перетаскивание точки в svg пальцем или мышью: onMove(x, y) в координатах viewBox
  function draggable(sv, handle, onMove) {
    handle.style.cursor = 'grab'; handle.style.touchAction = 'none';
    const pt = e => { const r = sv.getBoundingClientRect(), vb = sv.viewBox.baseVal; return [vb.x + (e.clientX - r.left) * vb.width / r.width, vb.y + (e.clientY - r.top) * vb.height / r.height]; };
    let on = false;
    handle.addEventListener('pointerdown', e => { on = true; handle.setPointerCapture(e.pointerId); e.preventDefault(); });
    handle.addEventListener('pointermove', e => { if (on) onMove(...pt(e)); });
    handle.addEventListener('pointerup', () => { on = false; });
    handle.addEventListener('pointercancel', () => { on = false; });
  }

  // ---- 3.2.1: линии поля полосового магнита и магнитная стрелка, которую можно перетаскивать ----
  function magnet(el) {
    const W = 340, H = 230, MX = 170, MY = 115, ML = 130, MH = 30;
    const F = frame(el, [['an-g', W, H, 'Линии магнитного поля полосового магнита и магнитная стрелка']], false);
    const [g] = F.svgs;
    svg('rect', { width: W, height: H, fill: '#fff' }, g);
    const lines = svg('g', {}, g);
    const mag = svg('g', {}, g);
    const cp = svg('g', {}, g);
    svg('circle', { r: 15, fill: '#fff', stroke: C.muted, 'stroke-width': 1.2 }, cp);
    const needle = svg('g', {}, cp);
    svg('path', { d: 'M0 -3.8L13 0L0 3.8z', fill: C.blue }, needle);
    svg('path', { d: 'M0 -3.8L-13 0L0 3.8z', fill: '#fff', stroke: C.muted, 'stroke-width': 1 }, needle);
    svg('circle', { r: 1.8, fill: C.dark }, cp);
    const hit = svg('circle', { r: 24, fill: 'transparent' }, cp);
    let nRight = true, P = { x: 250, y: 50 };
    const poles = () => nRight ? [[MX + ML / 2 - 10, 1], [MX - ML / 2 + 10, -1]] : [[MX - ML / 2 + 10, 1], [MX + ML / 2 - 10, -1]];
    const B = (x, y) => { let bx = 0, by = 0; poles().forEach(([px, q]) => { const dx = x - px, dy = y - MY, r3 = Math.hypot(dx, dy) ** 3 || 1; bx += q * dx / r3; by += q * dy / r3; }); return [bx, by]; };
    function draw() {
      mag.innerHTML = ''; lines.innerHTML = '';
      const [[nx], [sx]] = poles();
      // магнит: северная половина голубая с буквой N
      [[nx, 'N', '#BFD9FF'], [sx, 'S', '#fff']].forEach(([px, l, col]) => {
        const x0 = px > MX ? MX : MX - ML / 2;
        svg('rect', { x: x0, y: MY - MH / 2, width: ML / 2, height: MH, fill: col }, mag);
        text(mag, x0 + ML / 4, MY + 5, l, 'an-lb', 'middle', C.dark);
      });
      svg('rect', { x: MX - ML / 2, y: MY - MH / 2, width: ML, height: MH, fill: 'none', stroke: C.dark, 'stroke-width': 1.3 }, mag);
      // линии выходят из N и входят в S; те, что уходят за рисунок, дорисовываем от S назад — картина симметрична
      const trace = (px, sgn, k) => {
        const a = (px > MX ? 0 : Math.PI) + (px > MX ? 1 : -1) * k * 0.28;
        let x = px + 11 * Math.cos(a), y = MY + 11 * Math.sin(a), d = `M${x} ${y}`, pts = [], closed = false;
        for (let i = 0; i < 900; i++) {
          const [bx, by] = B(x, y), m = Math.hypot(bx, by) || 1;
          x += sgn * 2 * bx / m; y += sgn * 2 * by / m; d += `L${x.toFixed(1)} ${y.toFixed(1)}`; pts.push([x, y, bx / m, by / m]);
          const other = sgn > 0 ? sx : nx;
          if (Math.hypot(x - other, y - MY) < 9) { closed = true; break; }
          if (y < -10 || y > H + 10 || x < -10 || x > W + 10) break;
        }
        if (sgn < 0 && closed) return;   // эта линия уже нарисована от N
        svg('path', { d, fill: 'none', stroke: C.blue, 'stroke-opacity': .4, 'stroke-width': 1.2 }, lines);
        // стрелка на линии — в её видимой части, примерно посередине
        const vis = pts.filter(([qx, qy]) => qx > 8 && qx < W - 8 && qy > 8 && qy < H - 8 && !(Math.abs(qx - MX) < ML / 2 + 4 && Math.abs(qy - MY) < MH / 2 + 4));
        if (vis.length > 10) { const [mx, my, ux, uy] = vis[Math.floor(vis.length / 2)]; svg('path', { d: arrowD(mx - ux * 5, my - uy * 5, mx + ux * 2, my + uy * 2), ...ARROW, stroke: C.blue }, lines); }
      };
      for (let k = -5; k <= 5; k++) { trace(nx, 1, k); trace(sx, -1, k); }
      moveCp();
    }
    function moveCp() {
      const [bx, by] = B(P.x, P.y);
      cp.setAttribute('transform', `translate(${P.x} ${P.y})`);
      needle.setAttribute('transform', `rotate(${Math.atan2(by, bx) * 180 / Math.PI})`);
    }
    draggable(g, hit, (x, y) => {
      const nx = Math.max(16, Math.min(W - 16, x)), ny = Math.max(16, Math.min(H - 16, y));
      if (Math.abs(nx - MX) < ML / 2 + 16 && Math.abs(ny - MY) < MH / 2 + 16) return;   // на магнит не кладём
      P = { x: nx, y: ny }; moveCp();
    });
    seg(F.ctl, [['r', 'N справа'], ['l', 'N слева']], 'r', v => { nRight = v === 'r'; draw(); });
    // легенда — сама стрелка с подписями полюсов
    F.now.innerHTML = `<svg viewBox="0 0 96 22" width="96" height="22" aria-label="магнитная стрелка: синий конец — N, белый — S">
      <text x="6" y="15" class="an-lb" text-anchor="middle" fill="${C.dark}">S</text>
      <path d="M48 6L18 11L48 16z" fill="#fff" stroke="${C.muted}"/><path d="M48 6L78 11L48 16z" fill="${C.blue}"/>
      <circle cx="48" cy="11" r="1.8" fill="${C.dark}"/>
      <text x="90" y="15" class="an-lb" text-anchor="middle" fill="${C.dark}">N</text></svg>`;
    draw();
  }

  // ---- 3.1.1: поле двух зарядов. Силовые линии, пробная точка с E₁, E₂ и E = E₁ + E₂ ----
  function field(el) {
    const W = 340, H = 230, Q = [{ x: 105, y: 115 }, { x: 235, y: 115 }];
    const F = frame(el, [['an-g', W, H, 'Силовые линии поля двух зарядов']], false);
    const [g] = F.svgs;
    svg('rect', { width: W, height: H, fill: '#fff' }, g);
    const lines = svg('g', {}, g);
    const chg = Q.map(() => { const c = svg('circle', { r: 13, stroke: '#fff', 'stroke-width': 2 }, g); return { c, t: text(g, 0, 0, '', 'an-lb', 'middle', '#fff') }; });
    const vec = [arrow(g, C.muted), arrow(g, C.muted), arrow(g, C.green)];
    const vl = [forceLabel(g, C.muted), forceLabel(g, C.muted), forceLabel(g, C.green)];
    const probe = svg('circle', { r: 7, fill: '#fff', stroke: C.dark, 'stroke-width': 2 }, g);
    const hit = svg('circle', { r: 22, fill: 'transparent' }, g);   // большая область для пальца
    let q = [2, -1], P = { x: 175, y: 80 };
    const Ef = (x, y) => {   // напряжённость в точке (условные единицы)
      let ex = 0, ey = 0;
      Q.forEach((c, i) => { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r = Math.sqrt(r2); ex += q[i] * dx / (r2 * r); ey += q[i] * dy / (r2 * r); });
      return [ex, ey];
    };
    function drawLines() {
      lines.textContent = '';
      // линии выходят из положительных зарядов (если их нет — входят в отрицательные), 8 линий на единицу заряда
      const pos = q.some(v => v > 0), sgn = pos ? 1 : -1;
      Q.forEach((c, i) => {
        if (q[i] * sgn <= 0) return;
        const n = 8 * Math.abs(q[i]);
        for (let k = 0; k < n; k++) {
          const a = 2 * Math.PI * (k + 0.5) / n;
          let x = c.x + 15 * Math.cos(a), y = c.y + 15 * Math.sin(a), d = `M${x} ${y}`, mid = null;
          for (let s = 0; s < 500; s++) {
            const [ex, ey] = Ef(x, y), m = Math.hypot(ex, ey) || 1;
            x += sgn * 2 * ex / m; y += sgn * 2 * ey / m;
            d += `L${x.toFixed(1)} ${y.toFixed(1)}`;
            if (s === 30) mid = [x, y, sgn * ex / m, sgn * ey / m];
            if (x < -20 || x > W + 20 || y < -20 || y > H + 20) break;
            if (Q.some((o, j) => j !== i && Math.hypot(x - o.x, y - o.y) < 12)) break;
          }
          svg('path', { d, fill: 'none', stroke: C.blue, 'stroke-opacity': .45, 'stroke-width': 1.2 }, lines);
          if (mid) { const [mx, my, ux, uy] = sgn > 0 ? mid : [mid[0], mid[1], -mid[2], -mid[3]];
            svg('path', { d: arrowD(mx - ux * 4, my - uy * 4, mx + ux * 2, my + uy * 2), ...ARROW, stroke: C.blue, 'stroke-opacity': .7 }, lines); }
        }
      });
    }
    function drawProbe() {
      set(probe, { cx: P.x, cy: P.y }); set(hit, { cx: P.x, cy: P.y });
      const K = 2.6e5, cap = 80, parts = Q.map((c, i) => { const dx = P.x - c.x, dy = P.y - c.y, r = Math.hypot(dx, dy); return [K * q[i] * dx / r ** 3, K * q[i] * dy / r ** 3]; });
      const sum = [parts[0][0] + parts[1][0], parts[0][1] + parts[1][1]];
      // общий масштаб для всех трёх стрелок (чтобы E оставалась суммой E1 и E2): не длиннее cap и не залезать на «−» заряд
      const vs = [parts[0], parts[1], sum];
      let f = 1;
      vs.forEach(([vx, vy], i) => {
        const m = Math.hypot(vx, vy), lim = i < 2 && q[i] < 0 ? Math.hypot(P.x - Q[i].x, P.y - Q[i].y) - 40 : cap;
        if (m * f > Math.min(cap, lim)) f = Math.max(0, Math.min(cap, lim)) / m;
      });
      vs.forEach(([vx, vy], i) => {
        const m = Math.hypot(vx, vy), x2 = P.x + vx * f, y2 = P.y + vy * f;
        vec[i].setAttribute('d', arrowD(P.x, P.y, x2, y2));
        putLabel(vl[i], x2, y2, vx / (m || 1) * 1.1, vy / (m || 1) * 1.1, m * f > 6 ? ['E_1', 'E_2', 'E'][i] : '');
      });
    }
    const upd = () => {
      Q.forEach((c, i) => {
        set(chg[i].c, { cx: c.x, cy: c.y, fill: q[i] > 0 ? C.orange : q[i] < 0 ? C.blue : C.line });
        set(chg[i].t, { x: c.x, y: c.y + 4 }).textContent = q[i] > 0 ? '+' : q[i] < 0 ? '−' : '0';
      });
      drawLines(); drawProbe();
      F.f.innerHTML = math('\\vec E=\\vec E_1+\\vec E_2');
      F.now.textContent = 'перетащите белую точку';
    };
    draggable(g, hit, (x, y) => { P = { x: Math.max(8, Math.min(W - 8, x)), y: Math.max(8, Math.min(H - 8, y)) }; if (Q.some(c => Math.hypot(P.x - c.x, P.y - c.y) < 18)) return; drawProbe(); });
    slider(F.ctl, { label: 'q_1', min: -3, max: 3, step: 1, value: q[0], unit: 'нКл' }, v => { q[0] = v; upd(); }).init();
    slider(F.ctl, { label: 'q_2', min: -3, max: 3, step: 1, value: q[1], unit: 'нКл' }, v => { q[1] = v; upd(); }).init();
  }

  // ---- 3.1.5: закон Ома для полной цепи. Реостат R, источник (ε, r), амперметр, вольтметр; U = ε − Ir ----
  function ohm(el) {
    const EPS = 12;
    const F = frame(el, [['an-car', 340, 160, 'Схема: источник, амперметр, реостат и вольтметр'], ['an-g', 340, 160, 'Зависимость напряжения от силы тока']]);
    const [sc, g] = F.svgs;
    const L = 40, R_ = 300, T = 28, B = 108;
    const wire = (d) => svg('path', { d, fill: 'none', stroke: C.dark, 'stroke-width': 1.6 }, sc);
    wire(`M${L} ${T}H${R_}V${B}H${L}V${T}`);
    // источник на левой стороне: длинная тонкая пластина «+», короткая толстая «−»
    svg('rect', { x: L - 14, y: 58, width: 28, height: 22, fill: '#fff' }, sc);
    svg('line', { x1: L - 14, x2: L + 14, y1: 62, y2: 62, stroke: C.dark, 'stroke-width': 1.6 }, sc);
    svg('line', { x1: L - 7, x2: L + 7, y1: 74, y2: 74, stroke: C.dark, 'stroke-width': 4 }, sc);
    text(sc, L - 18, 72, 'ε, r', 'an-ax', 'end');
    text(sc, L + 18, 60, '+', 'an-lb', 'start', C.dark);
    // амперметр на верхнем проводе
    const meter = (x, y, s) => { svg('circle', { cx: x, cy: y, r: 14, fill: '#fff', stroke: C.dark, 'stroke-width': 1.6 }, sc); text(sc, x, y + 5, s, 'an-lb', 'middle', C.dark); };
    meter(170, T, 'A');
    // реостат на нижнем проводе: прямоугольник и стрелка ползунка
    svg('rect', { x: 130, y: B - 8, width: 80, height: 16, fill: '#fff', stroke: C.dark, 'stroke-width': 1.6 }, sc);
    const knob = svg('path', { ...ARROW, stroke: C.orange, 'stroke-width': 2 }, sc);
    // вольтметр параллельно реостату
    wire(`M120 ${B}V142H156M184 142H220V${B}`);
    svg('circle', { cx: 120, cy: B, r: 2.5, fill: C.dark }, sc); svg('circle', { cx: 220, cy: B, r: 2.5, fill: C.dark }, sc);
    meter(170, 142, 'V');
    const aT = text(sc, 192, T - 16, '', 'an-lb', 'start', C.blue), vT = text(sc, 192, 158, '', 'an-lb', 'start', C.blue);
    // ток — точки, бегущие по контуру от «+» источника (по часовой)
    const per = [[L, 62], [L, T], [R_, T], [R_, B], [L, B], [L, 74]];
    const seglen = per.slice(1).map((p, i) => Math.hypot(p[0] - per[i][0], p[1] - per[i][1])), total = seglen.reduce((a, b) => a + b, 0);
    const at = s => { s = ((s % total) + total) % total; for (let i = 0; i < seglen.length; i++) { if (s <= seglen[i]) { const f = s / seglen[i]; return [per[i][0] + (per[i + 1][0] - per[i][0]) * f, per[i][1] + (per[i + 1][1] - per[i][1]) * f]; } s -= seglen[i]; } return per[0]; };
    const dots = Array.from({ length: 18 }, (_, i) => ({ s: i * total / 18, c: svg('circle', { r: 2.6, fill: C.orange }, sc) }));
    const A = axes(g, { L: 38, R: 326, T: 10, B: 144 }, { xl: 'I, А', yl: 'U, В' });
    A.set([0, 12, 1, 2], [0, 15, 1, 3]);
    const ln = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, A.dyn);
    const pt = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A.dyn);
    const eT = text(A.top, 0, 0, 'ε', 'an-lb', 'start', C.dark), kT = text(A.top, 0, 0, 'Iкз', 'an-lb', 'middle', C.dark);
    let R = 4, r = 2, I = 0, last = 0;
    const tl = timeline(F.btn, 1e9, 1, t => {
      const dt = t - last; last = t;
      dots.forEach(d => { d.s += I * 12 * dt; const [x, y] = at(d.s); set(d.c, { cx: x, cy: y }); d.c.style.display = ((x > L - 15 && x < L + 15 && y > 58 && y < 80) || Math.hypot(x - 170, y - T) < 15) ? 'none' : ''; });
    }, true);
    const upd = () => {
      I = EPS / (R + r); const U = I * R;
      const kx = 134 + 72 * R / 20;
      knob.setAttribute('d', arrowD(kx, B - 26, kx, B - 9));
      aT.textContent = `${fmt(I, 2)} А`; vT.textContent = `${fmt(U, 1)} В`;
      ln.setAttribute('d', `M${A.X(0)} ${A.Y(EPS)}L${A.X(EPS / r)} ${A.Y(0)}`);
      set(pt, { cx: A.X(I), cy: A.Y(U) });
      set(eT, { x: A.X(0) + 8, y: A.Y(EPS) + 4 });
      set(kT, { x: A.X(Math.min(EPS / r, 12)) + 18, y: A.Y(0) - 8 }).textContent = EPS / r <= 12 ? 'Iкз' : '';
      F.f.innerHTML = `<span>${math(`I=\\dfrac{\\mathcal E}{R+r}=${tx(I, 2)}~\\text{А}`)}</span><span>${math(`U=\\mathcal E-Ir=${tx(U, 1)}~\\text{В}`)}</span>`;
      F.now.textContent = R === 0 ? 'короткое замыкание: U = 0, ток наибольший' : 'ε = 12 В; меньше R — больше ток и меньше U';
    };
    slider(F.ctl, { label: 'R', min: 0, max: 20, step: 1, value: R, unit: 'Ом' }, v => { R = v; upd(); }).init();
    slider(F.ctl, { label: 'r', min: 1, max: 4, step: 0.5, value: r, unit: 'Ом' }, v => { r = v; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // ---- 3.2.2: правило Ленца. Магнит подносят к кольцу и уносят; поле индукционного тока и направление тока ----
  function lenz(el) {
    const F = frame(el, [['an-g', 340, 140, 'Магнит и проводящее кольцо']]);
    const [g] = F.svgs;
    const RX = 250, RY = 66, RR = 46, OB = 0.3;   // кольцо: центр, радиус, наклон перспективы
    // кольцо в плоскости, перпендикулярной оси x; ближняя к нам половина — справа (сплошная), дальняя — пунктир
    // линии поля магнита (едут вместе с магнитом) — под кольцом
    const fl = svg('g', {}, g);
    const ring = (from, to) => { let d = ''; for (let i = 0; i <= 40; i++) { const f = from + (to - from) * i / 40; d += (i ? 'L' : 'M') + (RX + RR * OB * Math.sin(f)) + ' ' + (RY - RR * Math.cos(f)); } return d; };
    svg('path', { d: ring(Math.PI, 2 * Math.PI), fill: 'none', stroke: C.muted, 'stroke-width': 3, 'stroke-dasharray': '4 3' }, g);
    const bIn = svg('g', {}, g);
    svg('path', { d: ring(0, Math.PI), fill: 'none', stroke: C.dark, 'stroke-width': 3.5 }, g);
    const cur = svg('path', { ...ARROW, stroke: C.orange, 'stroke-width': 2.4 }, g);
    const curT = text(g, 0, 0, 'I', 'an-lb', 'start', C.orange);
    const mag = svg('g', {}, g);
    const nS = svg('rect', { y: RY - 14, width: 50, height: 28 }, mag), sS = svg('rect', { y: RY - 14, width: 50, height: 28 }, mag);
    const nT = text(mag, 0, RY + 5, 'N', 'an-lb', 'middle', C.dark), sT = text(mag, 0, RY + 5, 'S', 'an-lb', 'middle', C.dark);
    svg('rect', { x: 0, y: RY - 14, width: 100, height: 28, fill: 'none', stroke: C.dark, 'stroke-width': 1.3 }, mag);
    const bE = arrow(g, C.blue), bET = text(g, 0, 0, '', 'an-lb', 'start', C.blue);
    const bI = arrow(g, C.orange), bIT = text(g, 0, 0, '', 'an-lb', 'start', C.orange);
    const vA = arrow(g, C.green), vT = text(g, 0, 0, 'v', 'an-lb', 'middle', C.green);
    // магнитная стрелка: синяя половина — северный конец, показывает направление поля
    const CPX = 150, CPY = 20;
    svg('circle', { cx: CPX, cy: CPY, r: 15, fill: '#fff', stroke: C.muted, 'stroke-width': 1.2 }, g);
    const needle = svg('g', {}, g);
    svg('path', { d: 'M0 -3.5L12 0L0 3.5z', fill: C.blue }, needle);
    svg('path', { d: 'M0 -3.5L-12 0L0 3.5z', fill: '#fff', stroke: C.muted, 'stroke-width': 1 }, needle);
    svg('circle', { cx: CPX, cy: CPY, r: 1.8, fill: C.dark }, g);
    let northFirst = true;   // к кольцу обращён северный полюс
    // поле магнита — как от двух «полюсов» у его концов (в координатах магнита: x от 0 до 100)
    const poles = () => northFirst ? [[92, 1], [8, -1]] : [[8, 1], [92, -1]];
    const Bm = (x, y) => { let bx = 0, by = 0; poles().forEach(([px, q]) => { const dx = x - px, dy = y - RY, r3 = Math.hypot(dx, dy) ** 3 || 1; bx += q * dx / r3; by += q * dy / r3; }); return [bx, by]; };
    function drawLines() {
      fl.textContent = '';
      const [[nx], [sx]] = poles();
      [-4, -3, -2, -1, 1, 2, 3, 4].forEach(k => [1, -1].forEach(side => {
        // линия выходит из N под углом к оси и идёт, пока не войдёт в S или не уйдёт за рисунок
        const a = side > 0 ? k * 0.36 : Math.PI - k * 0.36;
        let x = nx + 9 * Math.cos(a), y = RY + 9 * Math.sin(a), d = `M${x} ${y}`, mid = null;
        if ((nx > sx) !== (Math.cos(a) > 0)) return;   // только «наружу» от магнита
        for (let i = 0; i < 700; i++) {
          const [bx, by] = Bm(x, y), m = Math.hypot(bx, by) || 1;
          x += 2 * bx / m; y += 2 * by / m; d += `L${x.toFixed(1)} ${y.toFixed(1)}`;
          if (i === 22) mid = [x, y, bx / m, by / m];
          if (Math.hypot(x - sx, y - RY) < 8 || y < -60 || y > 200 || x < -300 || x > 420) break;
        }
        svg('path', { d, fill: 'none', stroke: C.blue, 'stroke-opacity': .3, 'stroke-width': 1.1 }, fl);
        if (mid) svg('path', { d: arrowD(mid[0] - mid[2] * 4, mid[1] - mid[3] * 4, mid[0] + mid[2] * 2, mid[1] + mid[3] * 2), ...ARROW, stroke: C.blue, 'stroke-opacity': .75 }, fl);
      }));
    }
    const xOf = t => 10 + 48 * (1 - Math.cos(2 * Math.PI * t / 4));   // левый край магнита: подходит и уходит, период 4 с
    const flux = x => { const d = RX - (x + 100); return 1 / (1 + (d / 40) ** 2); };   // условный поток через кольцо
    function draw(t) {
      const x = xOf(t), v = (xOf(t + 0.01) - x) / 0.01;
      mag.setAttribute('transform', `translate(${x} 0)`); fl.setAttribute('transform', `translate(${x} 0)`);
      const [cbx, cby] = Bm(CPX - x, CPY);
      needle.setAttribute('transform', `translate(${CPX} ${CPY}) rotate(${Math.atan2(cby, cbx) * 180 / Math.PI})`);
      // правый край магнита — полюс, обращённый к кольцу
      set(nS, { x: northFirst ? 50 : 0, fill: '#BFD9FF' }); set(sS, { x: northFirst ? 0 : 50, fill: '#fff' });
      set(nT, { x: northFirst ? 75 : 25 }); set(sT, { x: northFirst ? 25 : 75 });
      const ph = flux(x), dph = (flux(xOf(t + 0.01)) - ph) / 0.01;   // скорость изменения потока
      const bs = northFirst ? 1 : -1;   // поле магнита в кольце: от N (вдоль +x), к S (вдоль −x)
      const lb = 20 + 50 * ph;
      bE.setAttribute('d', arrowD(RX - lb / 2, RY - 8, RX + lb / 2, RY - 8));
      if (bs < 0) bE.setAttribute('d', arrowD(RX + lb / 2, RY - 8, RX - lb / 2, RY - 8));
      set(bET, { x: RX + 34, y: RY - 4 }).textContent = 'B';
      // поле индукционного тока: против B, если поток растёт; по B, если убывает
      const ind = -Math.sign(dph) * bs, mI = Math.min(1, Math.abs(dph) * 1.2);
      const li = 40 * mI;
      bI.setAttribute('d', mI > 0.08 ? arrowD(RX - ind * li / 2, RY + 10, RX + ind * li / 2, RY + 10) : '');
      set(bIT, { x: RX + 34, y: RY + 16 }).innerHTML = mI > 0.08 ? 'B<tspan baseline-shift="sub" font-size="9">инд</tspan>' : '';
      // ток на ближней дуге: вниз, если Bинд вдоль +x, вверх — если вдоль −x
      const fx = RX + RR * OB, dir = ind > 0 ? 1 : -1;
      cur.setAttribute('d', mI > 0.08 ? arrowD(fx + 1, RY - dir * 16, fx + 1, RY + dir * 16) : '');
      cur.setAttribute('stroke-opacity', .35 + .65 * mI);
      set(curT, { x: fx + 6, y: RY + 4 }).textContent = mI > 0.08 ? 'I' : '';
      vA.setAttribute('d', Math.abs(v) > 3 ? arrowD(x + 50 - Math.sign(v) * 14, RY + 34, x + 50 + Math.sign(v) * 14, RY + 34) : '');
      set(vT, { x: x + 50, y: RY + 50 }).textContent = Math.abs(v) > 3 ? 'v' : '';
      F.now.innerHTML = mI <= 0.08 ? 'магнит почти не движется — тока нет'
        : dph > 0 ? 'магнит приближается: поток растёт, B<sub>инд</sub> против B — кольцо отталкивает магнит'
        : 'магнит удаляется: поток убывает, B<sub>инд</sub> по B — кольцо притягивает магнит';
    }
    const tl = timeline(F.btn, 1e9, 1, draw, true);
    seg(F.ctl, [['N', 'К кольцу N'], ['S', 'К кольцу S']], 'N', v => { northFirst = v === 'N'; drawLines(); draw(tl.t()); });
    drawLines(); draw(0);
    autoplay(el, tl, F.btn);
  }

  // ---- 3.2.3: колебательный контур. Заряд конденсатора, ток катушки, энергии W_э и W_м ----
  function lc(el) {
    const F = frame(el, [['an-car', 340, 150, 'Колебательный контур'], ['an-g', 340, 162, 'Графики заряда и силы тока']]);
    const [sc, g] = F.svgs;
    const L0 = 60, R0 = 220, T0 = 20, B0 = 130, CY = 75;
    svg('path', { d: `M${L0} ${CY - 8}V${T0}H${R0}V40M${R0} 110V${B0}H${L0}V${CY + 8}`, fill: 'none', stroke: C.dark, 'stroke-width': 1.6 }, sc);
    // конденсатор: две пластины, цвет — знак и величина заряда
    const pl1 = svg('rect', { x: L0 - 22, y: CY - 11, width: 44, height: 5 }, sc), pl2 = svg('rect', { x: L0 - 22, y: CY + 6, width: 44, height: 5 }, sc);
    const s1 = text(sc, L0 - 30, CY - 4, '', 'an-lb', 'end', C.dark), s2 = text(sc, L0 - 30, CY + 14, '', 'an-lb', 'end', C.dark);
    const eF = svg('g', {}, sc);
    for (let i = -1; i <= 1; i++) svg('line', { x1: L0 + i * 12, x2: L0 + i * 12, y1: CY - 5, y2: CY + 5, stroke: C.orange, 'stroke-width': 1.4 }, eF);
    // катушка — спираль
    let d = `M${R0} 40`;
    for (let i = 0; i <= 6 * 24; i++) { const t = i / 24, a = t * 2 * Math.PI; d += `L${R0 + 12 * Math.sin(a)} ${40 + t * 70 / 6 - 4 * Math.cos(a) + 4}`; }
    svg('path', { d, fill: 'none', stroke: C.dark, 'stroke-width': 1.5 }, sc);
    const bA = arrow(sc, C.blue), bT = text(sc, R0 - 28, CY + 4, '', 'an-lb', 'start', C.blue);
    // столбики энергии
    const BX = 270, BH = 100, BB = 130;
    const bar = (i, col, lab) => { svg('rect', { x: BX + i * 30, y: BB - BH, width: 22, height: BH, fill: 'none', stroke: C.line }, sc); text(sc, BX + i * 30 + 11, BB + 14, lab, 'an-lb', 'middle', col); return svg('rect', { x: BX + i * 30, width: 22, fill: col }, sc); };
    const wE = bar(0, C.orange, 'Wэ'), wM = bar(1, C.blue, 'Wм');
    const curA = arrow(sc, C.orange);
    const TM = 40;   // мс на графике
    const A = axes(g, { L: 30, R: 326, T: 24, B: 140 }, { xl: '', yl: '' });
    A.set([0, TM, 5, 1e3], [-1.2, 1.2, 0.5, 9]);
    // подписи времени — под полем графика, чтобы не налезали на кривые
    [10, 20, 30].forEach(v => text(A.top, A.X(v), 154, String(v), 'an-tk', 'middle'));
    text(A.top, 326, 154, 't, мс', 'an-ax', 'end');
    const qL = svg('path', { fill: 'none', stroke: C.orange, 'stroke-width': 2.2 }, A.dyn), iL = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.2 }, A.dyn);
    const cur = svg('line', { stroke: C.muted, 'stroke-dasharray': '3 3', y1: 24, y2: 140 }, A.dyn);
    text(A.top, 36, 14, 'q', 'an-lb', 'start', C.orange); text(A.top, 46, 14, ',', 'an-lb', 'start', C.dark); text(A.top, 52, 14, 'i', 'an-lb', 'start', C.blue);
    let Lm = 40, Cm = 40;   // мГн, мкФ
    let Tms = 1;
    const curves = () => {   // графики за 40 мс: чем больше период, тем реже волны
      let dq = '', di = '';
      for (let k = 0; k <= 600; k++) { const s = TM * k / 600, ph = 2 * Math.PI * s / Tms; dq += (k ? 'L' : 'M') + A.X(s) + ' ' + A.Y(Math.cos(ph)); di += (k ? 'L' : 'M') + A.X(s) + ' ' + A.Y(-Math.sin(ph)); }
      qL.setAttribute('d', dq); iL.setAttribute('d', di);
    };
    function draw(t) {   // t — время в периодах
      const ph = 2 * Math.PI * t, q = Math.cos(ph), i = -Math.sin(ph);
      const c1 = q > 0 ? C.orange : C.blue, c2 = q > 0 ? C.blue : C.orange, op = 0.25 + 0.75 * Math.abs(q);
      set(pl1, { fill: c1, 'fill-opacity': op }); set(pl2, { fill: c2, 'fill-opacity': op });
      s1.textContent = Math.abs(q) > .15 ? (q > 0 ? '+' : '−') : ''; s2.textContent = Math.abs(q) > .15 ? (q > 0 ? '−' : '+') : '';
      eF.setAttribute('opacity', Math.abs(q));
      bA.setAttribute('d', Math.abs(i) > .1 ? arrowD(R0, CY + Math.sign(i) * 24 * Math.abs(i), R0, CY - Math.sign(i) * 24 * Math.abs(i)) : '');
      bA.setAttribute('transform', `translate(-34 0)`);
      bT.textContent = Math.abs(i) > .1 ? 'B' : '';
      // ток по верхнему проводу: i = q' < 0 (верхняя пластина «+» разряжается) — вправо
      curA.setAttribute('d', Math.abs(i) > .1 ? arrowD(140 + Math.sign(i) * 14 * Math.abs(i), T0, 140 - Math.sign(i) * 14 * Math.abs(i), T0) : '');
      set(wE, { y: BB - BH * q * q, height: BH * q * q }); set(wM, { y: BB - BH * i * i, height: BH * i * i });
      const tc = (t * Tms) % TM;   // t — в периодах
      set(cur, { x1: A.X(tc), x2: A.X(tc) });
    }
    const tl = timeline(F.btn, 1e9, 1 / 3, draw, true);   // один период — 3 секунды на экране
    const upd = () => {
      const T = 2 * Math.PI * Math.sqrt(Lm * 1e-3 * Cm * 1e-6) * 1000;   // мс
      Tms = T; curves();
      F.f.innerHTML = math(`T=2\\pi\\sqrt{LC}=${tx(T, 2)}~\\text{мс}`);
      F.now.textContent = 'показано замедленно: один период — 3 с';
      draw(tl.t());
    };
    slider(F.ctl, { label: 'L', min: 10, max: 100, step: 10, value: Lm, unit: 'мГн' }, v => { Lm = v; upd(); }).init();
    slider(F.ctl, { label: 'C', min: 10, max: 100, step: 10, value: Cm, unit: 'мкФ' }, v => { Cm = v; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  // подпись с нижним индексом: sub('n', '1') → n₁ (для textContent-узлов svg)
  const subT = (t, a, b, rest = '') => { t.innerHTML = `${a}<tspan baseline-shift="sub" font-size="9">${b}</tspan>${rest}`; return t; };
  const DEG = Math.PI / 180;
  // дуга угла с центром (cx, cy) радиуса r между направлениями a1 и a2 (углы от оси x, по часовой на экране)
  const arcD = (cx, cy, r, a1, a2) => {
    const p = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)], [x1, y1] = p(a1), [x2, y2] = p(a2);
    return `M${x1} ${y1}A${r} ${r} 0 0 ${a2 > a1 ? 1 : 0} ${x2} ${y2}`;
  };

  // ---- 4.1: преломление и полное внутреннее отражение. Угол падения α, показатели n₁ (сверху) и n₂ (снизу) ----
  function refract(el) {
    const W = 340, H = 220, OX = 170, OY = 110, R = 100;
    const F = frame(el, [['an-g', W, H, 'Преломление и отражение луча на границе двух сред']], false);
    const [g] = F.svgs;
    const m1 = svg('rect', { x: 0, y: 0, width: W, height: OY, fill: C.blue }, g), m2 = svg('rect', { x: 0, y: OY, width: W, height: H - OY, fill: C.blue }, g);
    svg('line', { x1: 0, x2: W, y1: OY, y2: OY, stroke: C.dark, 'stroke-width': 1.3 }, g);
    svg('line', { x1: OX, x2: OX, y1: 6, y2: H - 6, stroke: C.muted, 'stroke-dasharray': '4 3' }, g);
    const n1T = text(g, 10, 20, '', 'an-lb', 'start', C.dark), n2T = text(g, 10, H - 10, '', 'an-lb', 'start', C.dark);
    const ray = () => ({ l: svg('line', { stroke: C.orange, 'stroke-linecap': 'round' }, g), a: svg('path', { ...ARROW, stroke: C.orange }, g) });
    const rin = ray(), rre = ray(), rout = ray();
    const aA = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 1.2 }, g), aB = svg('path', { fill: 'none', stroke: C.dark, 'stroke-width': 1.2 }, g);
    const aT = text(g, 0, 0, 'α', 'an-ax', 'middle'), bT = text(g, 0, 0, 'β', 'an-ax', 'middle');
    // луч из (x1,y1) в (x2,y2) со стрелкой посередине
    const put = (r, x1, y1, x2, y2, w, op) => {
      set(r.l, { x1, y1, x2, y2, 'stroke-width': w, 'stroke-opacity': op });
      const mx = x1 + (x2 - x1) * .55, my = y1 + (y2 - y1) * .55, L = Math.hypot(x2 - x1, y2 - y1) || 1;
      r.a.setAttribute('d', w ? arrowD(mx - (x2 - x1) / L * 8, my - (y2 - y1) / L * 8, mx, my) : '');
      set(r.a, { 'stroke-opacity': op, 'stroke-width': Math.max(1.7, w * .8) });
    };
    let al = 30, n1 = 1.5, n2 = 1;
    const upd = () => {
      set(m1, { 'fill-opacity': .05 + (n1 - 1) * .3 }); set(m2, { 'fill-opacity': .05 + (n2 - 1) * .3 });
      subT(n1T, 'n', '1', ` = ${fmt(n1, 2)}`); subT(n2T, 'n', '2', ` = ${fmt(n2, 2)}`);
      const a = al * DEG, sb = n1 * Math.sin(a) / n2, tir = sb > 1, b = tir ? 0 : Math.asin(sb);
      // α — от перпендикуляра вверх, β — от перпендикуляра вниз
      put(rin, OX - R * Math.sin(a), OY - R * Math.cos(a), OX, OY, 2.4, 1);
      put(rre, OX, OY, OX + R * Math.sin(a), OY - R * Math.cos(a), tir ? 2.4 : 1.4, tir ? 1 : .4);
      put(rout, OX, OY, OX + R * Math.sin(b), OY + R * Math.cos(b), tir ? 0 : 2.4, tir ? 0 : 1);
      aA.setAttribute('d', al > 2 ? arcD(OX, OY, 30, -Math.PI / 2 - a, -Math.PI / 2) : '');
      set(aT, { x: OX - 42 * Math.sin(a / 2), y: OY - 42 * Math.cos(a / 2) + 4 }).textContent = al > 2 ? 'α' : '';
      aB.setAttribute('d', !tir && b > 2 * DEG ? arcD(OX, OY, 30, Math.PI / 2 - b, Math.PI / 2) : '');
      set(bT, { x: OX + 42 * Math.sin(b / 2), y: OY + 42 * Math.cos(b / 2) + 4 }).textContent = !tir && b > 2 * DEG ? 'β' : '';
      const crit = n1 > n2 ? Math.asin(n2 / n1) / DEG : null;
      F.f.innerHTML = tir
        ? `<span>${math(`\\sin\\alpha>\\dfrac{n_2}{n_1}`)}</span>`
        : `<span>${math(`n_1\\sin\\alpha=n_2\\sin\\beta,\\quad \\beta=${tx(b / DEG, 1)}^\\circ`)}</span>`;
      F.now.innerHTML = tir ? `<b class="an-down">полное внутреннее отражение</b>: α больше предельного угла α<sub>пр</sub> = ${fmt(crit, 1)}°`
        : crit != null ? `из оптически более плотной среды: β > α; при α > ${fmt(crit, 1)}° луч не выйдет`
        : n1 < n2 ? 'в оптически более плотную среду: луч прижимается к перпендикуляру, β < α'
        : 'одинаковые среды: луч не преломляется';
    };
    slider(F.ctl, { label: '\\alpha', min: 0, max: 85, step: 1, value: al, unit: '°' }, v => { al = v; upd(); }).init();
    slider(F.ctl, { label: 'n_1', min: 1, max: 2, step: 0.05, value: n1, unit: '' }, v => { n1 = v; upd(); }).init();
    slider(F.ctl, { label: 'n_2', min: 1, max: 2, step: 0.05, value: n2, unit: '' }, v => { n2 = v; upd(); }).init();
  }

  // ---- 4.2: тонкая линза. Расстояние до предмета d и фокусное расстояние F, ход трёх лучей и изображение ----
  function lens(el) {
    const W = 340, H = 200, X0 = 170, Y0 = 100, S = 13, h = 2;   // S — пикселей на сантиметр, h — высота предмета, см
    const F = frame(el, [['an-g', W, H, 'Ход лучей в тонкой линзе']], false);
    const [g] = F.svgs;
    const px = x => X0 + x * S, py = y => Y0 - y * S;
    const cid = 'an-clip' + (++uid);
    svg('clipPath', { id: cid }, svg('defs', {}, g)).appendChild(svg('rect', { x: 0, y: 0, width: W, height: H }));
    svg('line', { x1: 4, x2: W - 4, y1: Y0, y2: Y0, stroke: C.dark, 'stroke-width': 1.2 }, g);
    const marks = svg('g', {}, g), lensG = svg('g', {}, g);
    const rays = svg('g', { 'clip-path': `url(#${cid})` }, g);
    const obj = svg('path', { ...ARROW, stroke: C.orange, 'stroke-width': 2.6 }, g);
    const img = svg('path', { ...ARROW, stroke: C.blue, 'stroke-width': 2.6 }, g);
    let conv = true, d = 7, Fm = 4;
    const line = (x1, y1, x2, y2, dash) => svg('line', { x1: px(x1), y1: py(y1), x2: px(x2), y2: py(y2), stroke: dash ? C.muted : C.dark, 'stroke-width': dash ? 1.1 : 1.4, 'stroke-dasharray': dash ? '4 3' : 'none' }, rays);
    const upd = () => {
      const Fs = conv ? Fm : -Fm;   // фокусное расстояние со знаком
      // линза: собирающая — стрелки наружу, рассеивающая — внутрь
      const LT = py(6), LB = py(-6), k = conv ? -1 : 1;
      lensG.innerHTML = '';
      svg('path', { d: `M${X0} ${LT}V${LB}M${X0 - 6} ${LT - k * 7}L${X0} ${LT}L${X0 + 6} ${LT - k * 7}M${X0 - 6} ${LB + k * 7}L${X0} ${LB}L${X0 + 6} ${LB + k * 7}`, ...ARROW, stroke: C.blue, 'stroke-width': 2 }, lensG);
      marks.innerHTML = '';
      [-2, -1, 1, 2].forEach(m => {
        const x = px(m * Fm);
        svg('circle', { cx: x, cy: Y0, r: Math.abs(m) === 1 ? 3 : 2, fill: C.dark }, marks);
        text(marks, x, Y0 + 15, (Math.abs(m) === 2 ? '2' : '') + 'F', 'an-ax', 'middle');
      });
      rays.innerHTML = '';
      set(obj, { d: arrowD(px(-d), Y0, px(-d), py(h)) });
      const inf = Math.abs(d - Fs) < 1e-6, f = inf ? Infinity : d * Fs / (d - Fs), yi = inf ? 0 : -h * f / d, virt = f < 0;
      const FAR = 30;
      // 1) параллельно оси → через фокус (у рассеивающей — продолжение через фокус слева)
      line(-d, h, 0, h);
      line(0, h, FAR, h * (1 - FAR / Fs));
      if (!conv) line(0, h, Fs, 0, true);
      else if (virt) line(0, h, f, yi, true);
      // 2) через оптический центр — не преломляется
      line(-d, h, FAR, -h * FAR / d);
      if (virt) line(0, 0, f, yi, true);
      // 3) через передний фокус (у рассеивающей — направлен в задний фокус) → параллельно оси
      if (!inf) {
        const y3 = -h * Fs / (d - Fs);
        if (Math.abs(y3) < 7.5) {
          line(-d, h, 0, y3); line(0, y3, FAR, y3);
          if (virt) line(0, y3, f, y3, true);
          if (conv && d < Fs) line(-Fs, 0, -d, h, true);
          if (!conv) line(0, y3, -Fs, 0, true);
        }
      }
      const Gm = Math.abs(f) / d, onScreen = !inf && Math.abs(px(f) - X0) < X0 - 4 && Math.abs(yi) < 7.5;
      set(img, { d: onScreen ? arrowD(px(f), Y0, px(f), py(yi)) : '', 'stroke-dasharray': virt ? '5 3' : 'none' });
      if (inf) {
        F.f.innerHTML = `<span>${math('d=F')}</span>`;
        F.now.textContent = 'изображения нет: лучи после линзы идут параллельно';
        return;
      }
      const sF = conv ? '' : '-', sf = virt ? '-' : '+';
      F.f.innerHTML = `<span>${math(`${sF}\\dfrac{1}{F}=\\dfrac{1}{d}${sf}\\dfrac{1}{f}`)}</span><span>${math(`f=${tx(Math.abs(f), 1)}~\\text{см},\\ \\Gamma=\\dfrac{f}{d}=${tx(Gm, 2)}`)}</span>`;
      const size = Math.abs(Gm - 1) < 0.01 ? 'равное' : Gm > 1 ? 'увеличенное' : 'уменьшенное';
      F.now.innerHTML = `изображение <b class="${virt ? 'an-eq' : 'an-up'}">${virt ? 'мнимое' : 'действительное'}</b>, ${virt ? 'прямое' : 'перевёрнутое'}, ${size}` + (onScreen ? '' : ' (за краем рисунка)');
    };
    seg(F.ctl, [['c', 'Собирающая'], ['d', 'Рассеивающая']], 'c', v => { conv = v === 'c'; upd(); });
    slider(F.ctl, { label: 'd', min: 1, max: 12, step: 0.5, value: d, unit: 'см' }, v => { d = v; upd(); }).init();
    slider(F.ctl, { label: 'F', min: 2, max: 6, step: 0.5, value: Fm, unit: 'см' }, v => { Fm = v; upd(); }).init();
  }

  // ---- 4.5: фотоэффект. Частота света ν, интенсивность, напряжение U между катодом и анодом; металл катода ----
  function photo(el) {
    const HP = 4.14e-15;   // постоянная Планка, эВ·с
    const F = frame(el, [['an-car', 340, 150, 'Фотоэлемент: катод, анод, источник и амперметр'], ['an-g', 340, 160, 'Вольт-амперная характеристика']]);
    const [sc, g] = F.svgs;
    const KX = 90, AX = 250, TY = 30, BY = 96;
    svg('rect', { x: 50, y: 14, width: 240, height: 96, rx: 40, fill: '#F4F8FF', stroke: C.muted, 'stroke-width': 1.2 }, sc);   // стеклянный баллон
    svg('rect', { x: KX - 6, y: TY, width: 6, height: BY - TY, fill: C.dark }, sc);
    svg('rect', { x: AX, y: TY, width: 6, height: BY - TY, fill: C.dark }, sc);
    text(sc, KX - 3, TY - 4, 'К', 'an-lb', 'middle', C.dark); text(sc, AX + 3, TY - 6, 'А', 'an-lb', 'middle', C.dark);
    // цепь: катод и анод — вниз, источник и амперметр внизу
    svg('path', { d: `M${KX - 3} ${BY}V136H150M190 136H${AX + 3}V${BY}`, fill: 'none', stroke: C.dark, 'stroke-width': 1.5 }, sc);
    const bat = svg('g', {}, sc);
    svg('circle', { cx: 225, cy: 136, r: 10, fill: '#fff', stroke: C.dark, 'stroke-width': 1.5 }, sc);
    text(sc, 225, 140, 'A', 'an-lb', 'middle', C.dark);
    const iT = text(sc, 225, 120, '', 'an-lb', 'middle', C.blue), uT = text(sc, 170, 124, '', 'an-lb', 'middle', C.dark);
    const light = svg('g', {}, sc), elG = svg('g', {}, sc);
    const A = axes(g, { L: 40, R: 326, T: 12, B: 140 }, { xl: 'U, В', yl: 'I, мкА' });
    A.set([-5, 3, 1, 1], [0, 5, 1, 1]);
    const curve = svg('path', { fill: 'none', stroke: C.blue, 'stroke-width': 2.4 }, A.dyn);
    const pt = svg('circle', { r: 5, fill: C.orange, stroke: '#fff', 'stroke-width': 1.5 }, A.dyn);
    const uzT = text(A.top, 0, 0, '', 'an-lb', 'middle', C.orange);
    const METALS = { cs: ['цезий', 1.9], na: ['натрий', 2.3], zn: ['цинк', 4.2] };
    let metal = 'na', nu = 8, inten = 3, U = 1;
    let Ek = 0, Isat = 0, es = [], acc = 0, last = 0;
    const cur = u => Ek <= 0 ? 0 : u >= 0 ? Isat : Math.max(0, Isat * (1 + u / Ek));
    // цвет света по частоте (×10¹⁴ Гц): 4 — красный … 7,5 — фиолетовый, выше — ультрафиолет
    const hue = v => v < 4 ? '#B71C1C' : v > 7.6 ? '#7B1FA2' : `hsl(${Math.round(270 * (v - 4) / 3.6)}, 85%, 45%)`;
    function upd() {
      const Aout = METALS[metal][1], hv = HP * nu * 1e14;
      Ek = hv - Aout; Isat = inten;
      // источник: длинная тонкая пластина — «+». U > 0 — «+» у анода (справа), U < 0 — у катода
      bat.innerHTML = '';
      svg('rect', { x: 150, y: 128, width: 40, height: 16, fill: '#fff' }, bat);
      const lx = U >= 0 ? 175 : 165, sx = U >= 0 ? 165 : 175;
      svg('line', { x1: lx, x2: lx, y1: 126, y2: 146, stroke: C.dark, 'stroke-width': 1.5 }, bat);
      svg('line', { x1: sx, x2: sx, y1: 131, y2: 141, stroke: C.dark, 'stroke-width': 4 }, bat);
      svg('line', { x1: 150, x2: sx, y1: 136, y2: 136, stroke: C.dark, 'stroke-width': 1.5 }, bat);
      svg('line', { x1: lx, x2: 190, y1: 136, y2: 136, stroke: C.dark, 'stroke-width': 1.5 }, bat);
      uT.textContent = `U = ${fmt(U, 1)} В`;
      // свет: волнистые стрелки к катоду, их число — интенсивность
      light.innerHTML = '';
      for (let i = 0; i < inten; i++) {
        const y0 = 6 + i * 10, x0 = 16, x1 = KX - 9, y1 = 40 + i * 10, n = 6, L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
        let dd = `M${x0} ${y0}`;
        for (let k = 1; k <= 28; k++) { const s = L * k / 28, w = 2.2 * Math.sin(k / 28 * n * 2 * Math.PI); dd += `L${x0 + ux * s - uy * w} ${y0 + uy * s + ux * w}`; }
        svg('path', { d: dd, fill: 'none', stroke: hue(nu), 'stroke-width': 1.5 }, light);
        svg('path', { d: arrowD(x1 - ux * 6, y1 - uy * 6, x1, y1), ...ARROW, stroke: hue(nu) }, light);
      }
      let dc = '';
      for (let k = 0; k <= 80; k++) { const u = -5 + 8 * k / 80; dc += (k ? 'L' : 'M') + A.X(u) + ' ' + A.Y(cur(u)); }
      curve.setAttribute('d', dc);
      set(pt, { cx: A.X(U), cy: A.Y(cur(U)) });
      set(uzT, { x: A.X(-Ek) - 16, y: A.Y(0) - 8 }).textContent = Ek > 0 && Ek < 5 ? '−Uз' : '';
      iT.textContent = `${fmt(cur(U), 1)} мкА`;
      F.f.innerHTML = Ek > 0
        ? `<span>${math(`h\\nu=A_{\\text{вых}}+E_{K\\,max}`)}</span><span>${math(`${tx(hv, 2)}=${tx(Aout, 1)}+${tx(Ek, 2)}~\\text{эВ},\\ U_{\\text{з}}=${tx(Ek, 2)}~\\text{В}`)}</span>`
        : `<span>${math(`h\\nu=${tx(hv, 2)}~\\text{эВ}<A_{\\text{вых}}=${tx(Aout, 1)}~\\text{эВ}`)}</span>`;
      F.now.innerHTML = Ek <= 0 ? `<b class="an-down">фотоэффекта нет</b>: частота ниже красной границы ν<sub>min</sub> = ${fmt(Aout / HP / 1e14, 1)}·10¹⁴ Гц`
        : U >= 0 ? 'все выбитые электроны доходят до анода — ток насыщения'
        : -U >= Ek ? '<b class="an-down">тока нет</b>: поле останавливает даже самые быстрые электроны'
        : 'тормозящее поле: до анода долетают только быстрые электроны';
    }
    // электроны: энергия при вылете от 0 до E_K max; поле U ускоряет (U > 0) или тормозит (U < 0)
    const tl = timeline(F.btn, 1e9, 1, t => {
      const dt = Math.min(0.05, t - last); last = t;
      if (Ek > 0) { acc += dt * inten * 5; while (acc >= 1) { acc -= 1; es.push({ E: Ek * Math.random(), s: 0, dir: 1, y: TY + 6 + Math.random() * (BY - TY - 12), c: svg('circle', { r: 3, fill: C.blue }, elG) }); } }
      es = es.filter(e => {
        const KE = e.E + U * e.s;
        if (e.dir > 0 && KE <= 0) e.dir = -1;
        e.s += e.dir * dt * (0.25 + 0.55 * Math.sqrt(Math.max(KE, 0)));
        if (e.s >= 1 || e.s < 0) { e.c.remove(); return false; }
        set(e.c, { cx: KX + 4 + (AX - KX - 8) * e.s, cy: e.y });
        return true;
      });
    }, true);
    seg(F.ctl, Object.entries(METALS).map(([k, [n, a]]) => [k, `${n[0].toUpperCase() + n.slice(1)} ${fmt(a, 1)} эВ`]), metal, v => { metal = v; upd(); });
    slider(F.ctl, { label: '\\nu', min: 4, max: 15, step: 0.5, value: nu, unit: '·10¹⁴ Гц' }, v => { nu = v; upd(); }).init();
    slider(F.ctl, { label: '\\text{интенсивность}', min: 1, max: 5, step: 1, value: inten, unit: '' }, v => { inten = v; upd(); }).init();
    slider(F.ctl, { label: 'U', min: -4, max: 3, step: 0.1, value: U, unit: 'В' }, v => { U = v; upd(); }).init();
    autoplay(el, tl, F.btn);
  }

  const ANIMS = { vt, xt, meet, throw: throwA, circle, incline, spring, collide, energy, lever, buoy, osc, wave, pendulum, iso, work, cycle, field, ohm, lenz, lc, refract, lens, photo, magnet };
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
