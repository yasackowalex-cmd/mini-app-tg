// Пробный вариант ЕГЭ: по одной задаче на каждый номер КИМ 1–26, решение на время (3 ч 55 мин),
// автопроверка первой части по критериям ФИПИ и самооценка второй части по решению из банка.
// Есть 10 постоянных вариантов (exams/variants.json, адрес exam.html#v=N) и случайный (exam.html#ids=a,b,… или #new).
// Вариант лежит в адресе, поэтому ссылкой можно дать всей группе один и тот же вариант.
// Ход пробника хранится в браузере: закрыли Телеграм посреди варианта — при следующем открытии продолжаем.
// Пробник ОГЭ — та же страница с #oge в адресе (exam.html#oge&v=N): 22 задания, 3 часа, 39 баллов, отметка по шкале;
// варианты в exams/variants_oge.json, ход и история хранятся отдельно (ключи exam_oge, exams_oge).
(function () {
  'use strict';
  const { solutionHtml, conditionHtml, answerHtml, isRight, KIM_POINTS, testScore, OGE_POINTS, ogeMark } = window.taskRender;
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tg = () => window.Telegram && window.Telegram.WebApp;
  // экзамен страницы: ОГЭ — если в адресе есть #oge, либо адрес без варианта, а в банке выбран ОГЭ
  const OGE = (() => {
    const p = new URLSearchParams(location.hash.slice(1));
    if (p.has('oge')) return true;
    if (p.has('v') || p.has('ids') || p.has('new')) return false;
    try { return localStorage.getItem('examKind') === 'ОГЭ'; } catch (e) { return false; }
  })();
  const EXAM = OGE ? 'ОГЭ' : 'ЕГЭ', PTS = OGE ? OGE_POINTS : KIM_POINTS;
  const KIMS = Object.keys(PTS).map(Number);
  const P1_LAST = OGE ? 16 : 20; // последний номер с автопроверкой; дальше — развёрнутый ответ и самооценка
  const MAX = OGE ? 39 : 45, PART1_MAX = KIMS.filter(k => k <= P1_LAST).reduce((a, k) => a + PTS[k], 0);
  const DURATION = (OGE ? 180 : 235) * 60 * 1000; // ЕГЭ по физике — 3 ч 55 мин, ОГЭ — 3 ч
  const K_EXAM = OGE ? 'exam_oge' : 'exam', K_HIST = OGE ? 'exams_oge' : 'exams';
  // итог словами: тестовые баллы ЕГЭ или отметка ОГЭ
  const res = p => OGE ? `«${ogeMark(p)}»` : `${testScore(p)} тестовых`;
  const resShort = p => OGE ? `«${ogeMark(p)}»` : testScore(p);

  // хранилище браузера; если недоступно, пробник живёт до перезагрузки страницы
  const mem = {};
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return mem[k] ?? d; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* остаётся mem */ } },
  };

  let byId = {}, topics = {}, variants = [], exam = null, timer = null;
  const tasks = () => exam.ids.map(id => byId[id]).filter(Boolean);
  const save = () => store.set(K_EXAM, exam);

  // ---- вариант ----
  // На каждый номер — задача, которую ученик ещё не решал верно и которой не было в его прошлых пробниках.
  // Если таких нет, берём любую задачу номера.
  function newVariant() {
    const solved = window.tgProgress || {};
    const seen = new Set(store.get(K_HIST, []).flatMap(e => e.ids || []));
    const pool = Object.values(byId).filter(t => t.exam === EXAM && !(t.tags || []).includes('ВНЕ_ЕГЭ_2027'));
    const any = a => a[Math.floor(Math.random() * a.length)];
    return KIMS.map(k => {
      const all = pool.filter(t => +t.kim === k);
      const fresh = all.filter(t => !seen.has(t.id) && !(solved[t.id] && solved[t.id].ok));
      const t = any(fresh.length ? fresh : all);
      return t && t.id;
    }).filter(Boolean);
  }

  const hashOf = e => '#' + (OGE ? 'oge&' : '') + (e.n ? 'v=' + e.n : 'ids=' + e.ids.map(encodeURIComponent).join(','));
  const variantUrl = e => new URL('exam.html' + hashOf(e), location.href).href;
  const titleOf = e => e.n ? `Вариант ${e.n}` : 'Случайный вариант';
  const printUrl = e => new URL('print.html#ids=' + e.ids.map(encodeURIComponent).join(',') + '&t=' +
    encodeURIComponent(e.n ? `Пробный вариант ${EXAM} по физике № ${e.n}` : `Пробный вариант ${EXAM} по физике`), location.href).href;

  // новый вариант сохраняется при нажатии «Начать»: незаконченный старый пробник до этого не теряется
  function setVariant(ids, n) {
    exam = { ids, n: n || 0, started: 0, finished: 0, answers: {}, self: {} };
    history.replaceState(null, '', hashOf(exam));
  }
  function setFixed(n) { setVariant(variants[n - 1].ids, n); }
  // лучший результат по каждому постоянному варианту из истории: {n: первичный балл}
  function doneFixed() {
    const d = {};
    store.get(K_HIST, []).forEach(e => { if (e.n) d[e.n] = Math.max(d[e.n] ?? 0, e.score); });
    return d;
  }
  // по умолчанию — первый постоянный вариант, который ученик ещё не решал
  function nextVariant() {
    const d = doneFixed(), v = variants.find(x => d[x.n] === undefined);
    if (v) setFixed(v.n); else setVariant(newVariant());
  }

  // ---- баллы первой части по критериям ФИПИ ----
  // 1 балл за номер — только полностью верный ответ. 2 балла — верный ответ; 1 балл — одна ошибка:
  // в последовательности (соответствие, «как изменится») неверна одна цифра,
  // в выборе утверждений одна цифра лишняя, пропущена или указана вместо верной.
  function points(t, input) {
    const max = PTS[t.kim];
    if (!String(input || '').trim() || t.check === 'none' || !t.answer) return 0;
    if (isRight(t, input)) return max;
    if (max !== 2) return 0;
    const a = String(input).replace(/[\s,;.]+/g, ''), b = String(t.answer).replace(/[\s,;.]+/g, '');
    if (t.check === 'seq') return a.length === b.length && [...a].filter((c, i) => c !== b[i]).length === 1 ? 1 : 0;
    if (t.check === 'set') {
      const A = new Set(a), B = new Set(b);
      const extra = [...A].filter(c => !B.has(c)).length, miss = [...B].filter(c => !A.has(c)).length;
      return extra + miss === 1 || (extra === 1 && miss === 1) ? 1 : 0;
    }
    return 0;
  }

  function scores() {
    const ts = tasks();
    const p1 = ts.filter(t => t.kim <= P1_LAST).reduce((a, t) => a + points(t, exam.answers[t.id]), 0);
    const p2t = ts.filter(t => t.kim > P1_LAST);
    const graded = p2t.filter(t => exam.self[t.id] !== undefined);
    const p2 = graded.reduce((a, t) => a + exam.self[t.id], 0);
    return { p1, p2, graded: graded.length, p2n: p2t.length };
  }

  // ---- экраны ----
  function show(screen) {
    ['start', 'run', 'result'].forEach(s => { $('ex-' + s).hidden = s !== screen; });
    $('timer').hidden = screen !== 'run';
    clearInterval(timer);
    if (screen === 'start') renderStart();
    if (screen === 'run') renderRun();
    if (screen === 'result') { renderResult(); window.taskRender.loadSol(exam.ids.map(id => byId[id])).then(() => { if (!$('ex-result').hidden) renderResult(); }); }
    window.scrollTo(0, 0);
  }

  function renderStart() {
    const ts = tasks();
    $('ex-kims').innerHTML = ts.map((t, i) => `<li><b>${i + 1}</b><span>${esc(topics[t.topic] || t.topic)}</span></li>`).join('');
    $('ex-print').href = printUrl(exam);
    $('ex-title').textContent = exam.n ? `Вариант ${exam.n} из ${variants.length}` : 'Случайный вариант';
    // выбор варианта: постоянные 1–10 (решённые отмечены лучшим тестовым баллом) и случайный
    const d = doneFixed();
    $('ex-pick').innerHTML = variants.map(v => `<button type="button" class="vbtn${d[v.n] !== undefined ? ' done' : ''}" data-v="${v.n}"
      aria-pressed="${exam.n === v.n}" title="${d[v.n] !== undefined ? `решён: ${res(d[v.n])}` : 'ещё не решали'}"><b>${v.n}</b>${
      d[v.n] !== undefined ? `<small>${resShort(d[v.n])}</small>` : ''}</button>`).join('') +
      `<button type="button" class="vbtn rnd" data-v="0" aria-pressed="${!exam.n}"><b>?</b><small>случайный</small></button>`;
    // открыли другой вариант, а прошлый пробник не закончен — можно вернуться к нему
    const saved = store.get(K_EXAM, null);
    const pending = saved && saved.started && !saved.finished && saved.ids.join() !== exam.ids.join();
    $('ex-resume').hidden = !pending;
    if (pending) $('ex-resume-title').textContent = titleOf(saved).toLowerCase();
    const hist = store.get(K_HIST, []);
    $('ex-history').hidden = !hist.length;
    $('ex-hist-body').innerHTML = hist.slice(0, 10).map(e => `<li>${new Date(e.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, ${esc(titleOf(e).toLowerCase())}:
      <b>${res(e.score)}</b> <span class="muted">(первичных ${e.score} из ${MAX}${e.graded ? '' : ', вторая часть не оценена'})</span></li>`).join('');
  }

  function taskForm(t) {
    if (t.check === 'none') return '<p class="muted small">Ответ здесь не вводится: запишите полное решение на листе.</p>';
    const v = esc(exam.answers[t.id] || '');
    const ph = { number: 'число', pm: 'x ± Δx' }[t.check] || 'цифры';
    return `<div class="try"><label>Ответ: <input data-id="${esc(t.id)}" value="${v}" autocomplete="off"
      inputmode="${t.check === 'number' || t.check === 'pm' ? 'text' : 'numeric'}" placeholder="${ph}"></label>
      ${t.unit ? `<span class="unit">${esc(t.unit)}</span>` : ''}</div>
      ${t.kim > P1_LAST ? '<p class="muted small">Полное решение запишите на листе, сюда — только итоговый ответ.</p>' : ''}`;
  }

  function condition(t) {
    const c = conditionHtml(t);
    const figs = c.rest.map(src => `<img src="${src}" alt="Рисунок к задаче" loading="lazy">`).join('');
    return `<div class="cond">${c.html}</div>${figs ? `<div class="figs">${figs}</div>` : ''}`;
  }
  const meta = (t, i, extra) => `<div class="meta"><span class="chip kim">${i + 1}</span><span class="chip">${PTS[t.kim]} б</span>${extra || ''}</div>`;

  function renderRun() {
    const ts = tasks();
    $('ex-tasks').innerHTML = ts.map((t, i) => (i === 0 ? '<h2 class="ph">Часть 1</h2>' : t.kim === P1_LAST + 1 ? '<h2 class="ph">Часть 2</h2>' : '') +
      `<article class="task lv-${t.level}">${meta(t, i)}${condition(t)}${taskForm(t)}</article>`).join('');
    tick();
    timer = setInterval(tick, 1000);
  }

  function tick() {
    const left = exam.started + DURATION - Date.now();
    if (left <= 0) { finish(); return; }
    const m = Math.ceil(left / 60000);
    $('timer-left').textContent = `${Math.floor(m / 60)} ч ${String(m % 60).padStart(2, '0')} мин`;
    $('timer').classList.toggle('late', left < 15 * 60000);
  }

  function finish() {
    if (exam.finished) return;
    exam.finished = Date.now();
    save();
    // ответы идут в прогресс ученика (только в Телеграме), пустые не отправляем
    if (window.tgApi) tasks().forEach(t => {
      const a = String(exam.answers[t.id] || '').trim();
      if (a && t.check !== 'none' && t.answer) window.tgApi('attempt', { task_id: t.id, answer: a, correct: isRight(t, a) });
    });
    record();
    show('result');
  }

  // итог пробника в историю (обновляется, пока ученик оценивает вторую часть)
  function record() {
    const s = scores(), hist = store.get(K_HIST, []);
    const e = { date: exam.finished, ids: exam.ids, n: exam.n || 0, score: s.p1 + s.p2, p1: s.p1, graded: s.graded === s.p2n };
    const i = hist.findIndex(x => x.date === exam.finished);
    if (i >= 0) hist[i] = e; else hist.unshift(e);
    store.set(K_HIST, hist.slice(0, 30));
    // в Телеграме итог уходит учителю (кабинет, вид «Пробники»); повторная запись обновляет тот же пробник
    if (window.tgApi) window.tgApi('exam_save', { started: exam.started, finished: exam.finished, task_ids: exam.ids,
      p1: s.p1, p2: s.p2, graded: s.graded === s.p2n });
  }

  function renderResult() {
    const ts = tasks(), s = scores();
    $('ex-score').innerHTML = `<div class="big">${OGE ? `${ogeMark(s.p1 + s.p2)} <small>отметка</small>` : `${testScore(s.p1 + s.p2)} <small>тестовых баллов из 100</small>`}</div>
      <p>Первичный балл: <b>${s.p1 + s.p2} из ${MAX}</b></p>
      <p>Часть 1: <b>${s.p1} из ${PART1_MAX}</b> · Часть 2: <b>${s.graded === s.p2n ? `${s.p2} из ${MAX - PART1_MAX}` : `оценено ${s.graded} из ${s.p2n}`}</b></p>
      ${s.graded < s.p2n ? '<p class="muted small">Вторую часть оцените сами: сравните своё решение с решением под задачей и поставьте балл.</p>' : ''}
      <p class="muted small">${OGE ? 'Отметка по шкале: 0–9 баллов — «2», 10–19 — «3», 20–29 — «4», 30–39 — «5».' : 'Тестовый балл по шкале перевода 2027 года.'}</p>`;
    $('ex-review').innerHTML = ts.map((t, i) => {
      const a = String(exam.answers[t.id] || '').trim(), max = PTS[t.kim];
      let mark, grade = '';
      if (t.kim <= P1_LAST) {
        const p = points(t, a);
        mark = `<span class="chip mark ${p === max ? 'ok' : p ? 'part' : 'bad'}">${p} из ${max}</span>`;
      } else {
        const g = exam.self[t.id];
        mark = `<span class="chip mark ${g === undefined ? '' : g === max ? 'ok' : g ? 'part' : 'bad'}">${g === undefined ? 'не оценено' : `${g} из ${max}`}</span>`;
        grade = `<div class="grade"><span>Ваш балл по решению:</span>${Array.from({ length: max + 1 }, (_, p) =>
          `<button type="button" class="btn" data-grade="${p}" aria-pressed="${g === p}">${p}</button>`).join('')}</div>`;
      }
      const yours = t.check === 'none' ? '' : `<p>Ваш ответ: <b>${a ? esc(a) : '—'}</b>${a && t.answer ? (isRight(t, a) ? ' <span class="okc">верно</span>' : ' <span class="badc">неверно</span>') : ''}
        · Правильный: <b>${answerHtml(t)}</b></p>`;
      return `<article class="task lv-${t.level}" data-id="${esc(t.id)}">
        ${meta(t, i, mark)}
        <details class="ex-cond"><summary>Условие</summary>${condition(t)}</details>
        ${yours}
        ${t.solution ? `<button class="btn" type="button" data-sol aria-expanded="${t.kim > P1_LAST}">Решение</button>
          <div class="reveal cond" ${t.kim > P1_LAST ? '' : 'hidden'}><b>Решение.</b> ${solutionHtml(t)}</div>` : ''}
        ${grade}
        <div class="id">${esc(t.id)}</div></article>`;
    }).join('');
  }

  // ---- события ----
  $('ex-tasks').addEventListener('input', e => {
    const i = e.target.closest('input[data-id]');
    if (!i) return;
    exam.answers[i.dataset.id] = i.value;
    save();
  });
  $('ex-begin').addEventListener('click', () => { exam.started = Date.now(); save(); show('run'); });
  $('ex-pick').addEventListener('click', e => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    const n = +b.dataset.v;
    if (n) setFixed(n); else setVariant(newVariant());
    show('start');
  });
  $('ex-again').addEventListener('click', () => { nextVariant(); show('start'); });
  $('ex-retry').addEventListener('click', () => { setVariant(exam.ids, exam.n); show('start'); });
  $('ex-resume-btn').addEventListener('click', () => {
    exam = store.get(K_EXAM, null);
    history.replaceState(null, '', hashOf(exam));
    if (Date.now() >= exam.started + DURATION) finish(); else show('run');
  });
  $('ex-finish').addEventListener('click', () => {
    const b = $('ex-finish');
    if (b.dataset.sure) { finish(); return; }
    b.dataset.sure = '1';
    b.textContent = 'Точно завершить? Нажмите ещё раз';
    setTimeout(() => { delete b.dataset.sure; b.textContent = 'Завершить и проверить'; }, 4000);
  });
  $('ex-review').addEventListener('click', e => {
    const art = e.target.closest('article[data-id]');
    if (!art) return;
    const sb = e.target.closest('[data-sol]');
    if (sb) {
      const r = art.querySelector('.reveal');
      r.hidden = !r.hidden;
      sb.setAttribute('aria-expanded', String(!r.hidden));
      return;
    }
    const gb = e.target.closest('[data-grade]');
    if (gb) {
      exam.self[art.dataset.id] = +gb.dataset.grade;
      save();
      // ответ и самооценка — учителю на проверку (кабинет, «2 часть на проверку»)
      const t = tasks().find(x => x.id === art.dataset.id);
      if (window.tgApi && t) {
        const a = String(exam.answers[t.id] || '').trim() || '—';
        window.tgApi('p2_submit', { task_id: t.id, answer: a + ' (пробник)', max: PTS[t.kim] })
          .then(() => window.tgApi('p2_self', { task_id: t.id, score: +gb.dataset.grade }));
      }
      record();
      const y = window.scrollY;
      renderResult();
      window.scrollTo(0, y);
    }
  });
  $('ex-copy').addEventListener('click', () => {
    const url = variantUrl(exam);
    const ok = () => { $('ex-msg').textContent = 'Ссылка на этот вариант скопирована'; };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, () => { $('ex-msg').textContent = url; });
    else $('ex-msg').textContent = url;
  });
  // в Телеграме печати нет: лист открывается в обычном браузере
  $('ex-print').addEventListener('click', e => {
    const t = tg();
    if (t && t.initData && t.openLink) { e.preventDefault(); t.openLink($('ex-print').href); }
  });

  // вход в Телеграме закончился позже, чем ученик завершил пробник: отправляем итог сейчас
  document.addEventListener('tg-progress', () => { if (exam && exam.finished) record(); });

  // ---- запуск ----
  function start() {
    const p = new URLSearchParams(location.hash.slice(1));
    const n = +p.get('v') || 0, fixed = variants[n - 1];
    const urlIds = fixed ? fixed.ids : (p.get('ids') || '').split(',').map(s => s.trim()).filter(id => byId[id] && byId[id].exam === EXAM);
    const saved = store.get(K_EXAM, null);
    const same = saved && saved.ids && urlIds.join() === saved.ids.join();
    // без варианта в адресе — продолжаем последний пробник (или показываем его итог); тот же вариант по ссылке — тоже
    if (saved && saved.ids && ((!urlIds.length && !p.has('new')) || same)) {
      exam = saved;
      history.replaceState(null, '', hashOf(exam));
      if (exam.started && !exam.finished && Date.now() >= exam.started + DURATION) { finish(); return; }
      show(exam.finished ? 'result' : exam.started ? 'run' : 'start');
      return;
    }
    if (fixed) setFixed(n);
    else if (urlIds.length) setVariant(urlIds);
    else if (p.has('new')) setVariant(newVariant());
    else nextVariant();
    show('start');
  }

  Promise.all([
    fetch('out/bank.json', { cache: 'no-cache' }).then(r => r.json()),
    fetch(OGE ? 'out/topics_oge.json' : 'out/topics.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => ({})),
    fetch(OGE ? 'exams/variants_oge.json' : 'exams/variants.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => []),
  ]).then(([b, tp, vs]) => {
    variants = vs;
    b.forEach(t => { byId[t.id] = t; });
    topics = tp;
    if (OGE) {
      document.title = document.title.replace('ЕГЭ', 'ОГЭ');
      document.querySelector('header h1').textContent = 'Пробный вариант ОГЭ';
      $('ex-about').textContent = '22 задания по структуре ОГЭ 2027, по одному на каждый номер. На решение 3 часа, максимум 39 первичных баллов. ' +
        'Задания 1–16 проверяются сразу, задания 17–22 вы оцените сами по решению. Задание 17 — экспериментальное: без оборудования опишите ход опыта и сверьтесь с образцом.';
      document.querySelectorAll('a[href="./"]').forEach(a => { a.href = './#exam=ОГЭ'; });
    }
    $('status').hidden = true;
    start();
  }).catch(() => { $('status').textContent = 'Не удалось загрузить банк задач. Обновите страницу.'; });
})();
