// Интерактивные анимации в конспектах уроков. В конспекте метка [[anim <имя>]] → <div class="lanim" data-anim="<имя>">,
// lesson.js подгружает этот файл, только когда в открытом уроке есть такая метка (главная не тяжелеет).
// Чистый JS + SVG, без библиотек. Новая анимация — функция в ANIMS: (el) => { рисует в el }.
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const C = { blue: '#0066FF', orange: '#FF6B35', dark: '#1B1F3B', muted: '#5B6075', line: '#E1E4EC', grid: '#EEF0F5' };
  // 1,5 и −2 — как в учебнике: запятая и длинный минус
  const fmt = (n, d = 1) => {
    const r = Math.round(n * 10 ** d) / 10 ** d;
    return (Object.is(r, -0) ? 0 : r).toString().replace('.', ',').replace('-', '−');
  };
  const svg = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  let uid = 0;
  const math = tex => window.renderMath ? window.renderMath(tex, false) : tex;

  // ползунок: подпись (KaTeX) + значение
  function slider(box, { label, min, max, step, value, unit }, onInput) {
    const w = document.createElement('label');
    w.className = 'an-sl';
    w.innerHTML = `<span class="an-sl-t"><span>${math(label)}</span> = <b></b> ${unit}</span>
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;
    box.appendChild(w);
    const inp = w.querySelector('input'), out = w.querySelector('b');
    const upd = () => { out.textContent = fmt(+inp.value); onInput(+inp.value); };
    inp.addEventListener('input', upd);
    return { get: () => +inp.value, init: upd };
  }

  // ---- v_x(t) равноускоренного движения: ползунки v0x и ax, ниже — тело на оси x ----
  function vt(el) {
    const T = 10, VMAX = 20;                         // оси: t от 0 до 10 с, v от −20 до 20 м/с
    const W = 340, H = 220, L = 34, R = 326, TOP = 10, BOT = 200;
    const X = t => L + (R - L) * t / T, Y = v => (TOP + BOT) / 2 - (BOT - TOP) / 2 * v / VMAX;
    const cid = 'an-clip' + (++uid);
    let v0 = 4, a = 1.5, t = 0, playing = false, last = 0;

    el.innerHTML = `<div class="an-ctl"></div>
      <div class="an-f"></div>
      <svg class="an-g" viewBox="0 0 ${W} ${H}" role="img" aria-label="График проекции скорости от времени"></svg>
      <svg class="an-car" viewBox="0 0 ${W} 62" aria-hidden="true"></svg>
      <div class="an-bar"><button type="button" class="btn solid an-play">▶ Пуск</button><span class="an-now"></span></div>`;
    const g = el.querySelector('.an-g'), car = el.querySelector('.an-car'), ctl = el.querySelector('.an-ctl');

    // сетка и оси
    for (let i = 0; i <= T; i++) svg('line', { x1: X(i), x2: X(i), y1: TOP, y2: BOT, stroke: C.grid }, g);
    for (let v = -VMAX; v <= VMAX; v += 5) {
      svg('line', { x1: L, x2: R, y1: Y(v), y2: Y(v), stroke: v ? C.grid : C.dark, 'stroke-width': v ? 1 : 1.3 }, g);
      if (v) svg('text', { x: L - 4, y: Y(v) + 4, 'text-anchor': 'end', class: 'an-tk' }, g).textContent = fmt(v);
    }
    svg('line', { x1: L, x2: L, y1: TOP, y2: BOT, stroke: C.dark, 'stroke-width': 1.3 }, g);
    for (let i = 2; i <= T; i += 2) svg('text', { x: X(i), y: Y(0) + 14, 'text-anchor': 'middle', class: 'an-tk' }, g).textContent = i;
    svg('text', { x: L + 4, y: TOP + 10, class: 'an-ax' }, g).textContent = 'vₓ, м/с';
    svg('text', { x: R - 8, y: Y(0) - 5, 'text-anchor': 'end', class: 'an-ax' }, g).textContent = 't, с';
    svg('text', { x: L - 4, y: Y(0) + 4, 'text-anchor': 'end', class: 'an-tk' }, g).textContent = '0';

    // всё, что меняется, — внутри графика (clipPath срезает то, что вышло за ±20 м/с)
    svg('clipPath', { id: cid }, svg('defs', {}, g)).appendChild(svg('rect', { x: L, y: TOP, width: R - L, height: BOT - TOP }));
    const dyn = svg('g', { 'clip-path': `url(#${cid})` }, g);
    const areaP = svg('polygon', { fill: C.blue, 'fill-opacity': .16 }, dyn);
    const areaN = svg('polygon', { fill: C.orange, 'fill-opacity': .2 }, dyn);
    const tri = svg('path', { fill: 'none', stroke: C.orange, 'stroke-width': 1.6, 'stroke-dasharray': '4 3' }, dyn);
    const line = svg('line', { stroke: C.blue, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, dyn);
    const cur = svg('line', { stroke: C.muted, 'stroke-dasharray': '3 3' }, dyn);
    const dot = svg('circle', { r: 5, fill: C.blue, stroke: '#fff', 'stroke-width': 1.5 }, dyn);
    const triT = svg('text', { class: 'an-lb', fill: C.orange }, g), triV = svg('text', { class: 'an-lb', fill: C.orange }, g);

    // полоса с телом: ось x, тело, стрелки скорости (синяя) и ускорения (оранжевая)
    const CL = 14, CR = 326, CY = 42;
    svg('line', { x1: CL, x2: CR, y1: CY, y2: CY, stroke: C.dark, 'stroke-width': 1.3 }, car);
    svg('path', { d: `M${CR} ${CY}l-7 -4v8z`, fill: C.dark }, car);
    svg('text', { x: CR - 2, y: CY + 16, 'text-anchor': 'end', class: 'an-ax' }, car).textContent = 'x';
    const zero = svg('g', {}, car);
    svg('line', { x1: 0, x2: 0, y1: CY - 4, y2: CY + 4, stroke: C.dark }, zero);
    svg('text', { x: 0, y: CY + 16, 'text-anchor': 'middle', class: 'an-tk' }, zero).textContent = '0';
    const body = svg('g', {}, car);
    svg('rect', { x: -11, y: CY - 13, width: 22, height: 11, rx: 3, fill: C.dark }, body);
    svg('circle', { cx: -6, cy: CY - 1.5, r: 2.6, fill: C.muted }, body);
    svg('circle', { cx: 6, cy: CY - 1.5, r: 2.6, fill: C.muted }, body);
    const arrV = svg('path', { stroke: C.blue, 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, car);
    const arrA = svg('path', { stroke: C.orange, 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, car);
    const lbV = svg('text', { class: 'an-lb', fill: C.blue }, car), lbA = svg('text', { class: 'an-lb', fill: C.orange }, car);
    const arrow = (p, x, y, len) => {
      if (Math.abs(len) < 2) { p.setAttribute('d', ''); return; }
      const s = Math.sign(len);
      p.setAttribute('d', `M${x} ${y}h${len}m${-7 * s} -4l${7 * s} 4l${-7 * s} 4`);
    };

    const v = tt => v0 + a * tt, x = tt => v0 * tt + a * tt * tt / 2;
    const fEl = el.querySelector('.an-f'), now = el.querySelector('.an-now'), btn = el.querySelector('.an-play');

    function draw() {
      line.setAttribute('x1', X(0)); line.setAttribute('y1', Y(v(0)));
      line.setAttribute('x2', X(T)); line.setAttribute('y2', Y(v(T)));
      // площадь под графиком до текущего момента: над осью — синяя (sₓ > 0), под осью — оранжевая (sₓ < 0)
      const root = a ? -v0 / a : -1, cut = root > 0 && root < t ? root : null;
      const poly = (t1, t2) => `${X(t1)},${Y(0)} ${X(t1)},${Y(v(t1))} ${X(t2)},${Y(v(t2))} ${X(t2)},${Y(0)}`;
      const parts = cut == null ? [[0, t]] : [[0, cut], [cut, t]];
      areaP.setAttribute('points', ''); areaN.setAttribute('points', '');
      parts.forEach(([t1, t2]) => { if (t2 > t1) (v((t1 + t2) / 2) >= 0 ? areaP : areaN).setAttribute('points', poly(t1, t2)); });
      // треугольник наклона: за Δt = 2 с скорость меняется на Δv = 2aₓ
      const t1 = 1, t2 = 3;
      tri.setAttribute('d', a ? `M${X(t1)} ${Y(v(t1))}H${X(t2)}V${Y(v(t2))}` : '');
      const vis = a && Math.abs(v(t1)) < VMAX && Math.abs(v(t2)) < VMAX;
      triT.textContent = vis ? 'Δt = 2 с' : '';
      triT.setAttribute('x', X(2)); triT.setAttribute('text-anchor', 'middle');
      triT.setAttribute('y', Y(v(t1)) + (a > 0 ? 13 : -5));
      triV.textContent = vis ? `Δv = ${fmt(2 * a)}` : '';
      triV.setAttribute('x', X(t2) + 4); triV.setAttribute('y', (Y(v(t1)) + Y(v(t2))) / 2 + 4);
      // текущий момент
      cur.setAttribute('x1', X(t)); cur.setAttribute('x2', X(t)); cur.setAttribute('y1', TOP); cur.setAttribute('y2', BOT);
      dot.setAttribute('cx', X(t)); dot.setAttribute('cy', Y(Math.max(-VMAX - 1, Math.min(VMAX + 1, v(t)))));

      // тело: масштаб оси x — чтобы весь путь за 10 с поместился
      let lo = 0, hi = 0;
      for (let i = 0; i <= 40; i++) { const xx = x(T * i / 40); lo = Math.min(lo, xx); hi = Math.max(hi, xx); }
      if (hi - lo < 10) hi = lo + 10;
      const px = xx => CL + 16 + (CR - CL - 40) * (xx - lo) / (hi - lo);
      zero.setAttribute('transform', `translate(${px(0)} 0)`);
      const bx = px(x(t));
      body.setAttribute('transform', `translate(${bx} 0)`);
      const vt_ = v(t);
      arrow(arrV, bx, CY - 20, vt_ * 2.2);
      arrow(arrA, bx, CY - 28, a * 6);
      lbV.textContent = Math.abs(vt_) * 2.2 >= 2 ? 'v' : ''; lbV.setAttribute('x', bx + vt_ * 2.2 + (vt_ > 0 ? 3 : -10)); lbV.setAttribute('y', CY - 16);
      lbA.textContent = Math.abs(a) * 6 >= 2 ? 'a' : ''; lbA.setAttribute('x', bx + a * 6 + (a > 0 ? 3 : -10)); lbA.setAttribute('y', CY - 25);

      // подпись: разгон, если знаки vₓ и aₓ совпадают, торможение — если разные
      const kind = !a || Math.abs(vt_) < 1e-9 ? (a ? 'разворот' : 'равномерно') : vt_ * a > 0 ? 'разгон' : 'торможение';
      now.innerHTML = `t = ${fmt(t)} с, vₓ = ${fmt(vt_)} м/с, sₓ = ${fmt(x(t))} м · <b class="an-${kind === 'разгон' ? 'up' : kind === 'торможение' ? 'down' : 'eq'}">${kind}</b>`;
    }
    function formula() {
      const sgn = a < 0 ? '-' : '+';
      const tx = n => fmt(n).replace('−', '-').replace(',', '{,}');   // {,} — без пробела после запятой
      fEl.innerHTML = math(`v_x(t)=${tx(v0)}${sgn}${tx(Math.abs(a))}\\,t`);
    }

    const sV = slider(ctl, { label: 'v_{0x}', min: -10, max: 10, step: 1, value: v0, unit: 'м/с' }, val => { v0 = val; formula(); draw(); });
    const sA = slider(ctl, { label: 'a_x', min: -4, max: 4, step: 0.5, value: a, unit: 'м/с²' }, val => { a = val; formula(); draw(); });
    sV.init(); sA.init();

    // «Пуск»: время бежит от 0 до 10 с за 5 секунд
    function frame(ms) {
      if (!playing) return;
      if (!el.isConnected) { playing = false; return; }   // урок закрыли
      t = Math.min(T, t + (ms - last) / 500); last = ms;
      draw();
      if (t >= T) { playing = false; btn.textContent = '↻ Сначала'; return; }
      requestAnimationFrame(frame);
    }
    btn.addEventListener('click', () => {
      if (playing) { playing = false; btn.textContent = '▶ Дальше'; return; }
      if (t >= T) t = 0;
      playing = true; btn.textContent = '❚❚ Пауза';
      requestAnimationFrame(ms => { last = ms; frame(ms); });
    });
    draw();
  }

  const ANIMS = { vt };
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
