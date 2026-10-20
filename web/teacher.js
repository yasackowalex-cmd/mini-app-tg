// Кабинет учителя (вкладка видна только учителю из TEACHER_IDS). Данные — одним запросом action "teacher":
// все ДЗ учителя, их ученики и по каждой паре «ДЗ — ученик» верно (ok) и неверно (bad) решённые задачи.
// Три вида: «Домашние задания» (по месяцам, у каждого таблица учеников), «Ученики» (у каждого его ДЗ)
// «Пробники» (итоги пробных вариантов ЕГЭ по ученикам, баллы в тестовых по шкале 2027)
// и «Прогресс» (готовность каждого ученика по 26 номерам КИМ и сводка по классу: где проваливаются).
// Фильтр по классу и поиск по названию ДЗ или фамилии работают в обоих видах.
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').toLowerCase().replace(/ё/g, 'е');
  const day = s => new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const month = s => { const m = new Date(s).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }).replace(' г.', ''); return m[0].toUpperCase() + m.slice(1); };
  const pctOf = (a, b) => b ? Math.round(100 * a / b) : 0;
  const name = s => [s.last_name, s.first_name].filter(Boolean).join(' ') || 'Без имени';
  const tg = () => window.Telegram && window.Telegram.WebApp;
  const { testScore, KIM_POINTS } = window.taskRender;
  const KIMS = Object.keys(KIM_POINTS);

  // постоянные пробные варианты: номер варианта узнаём по составу задач
  let variantOf = {};
  fetch('exams/variants.json', { cache: 'no-cache' }).then(r => r.json())
    .then(vs => { variantOf = Object.fromEntries(vs.map(v => [v.ids.join(), v.n])); }).catch(() => {});
  let data = null, loading = false, viewMode = 'progress', openId = null, confirmDel = null;

  // ---- вкладки «Банк задач» / «Кабинет учителя» ----
  function setTab(tab) {
    document.querySelectorAll('#tabs [data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tab === tab)));
    $('teacher').hidden = tab !== 'teacher';
    $('bank-area').hidden = tab === 'teacher';
    document.documentElement.classList.toggle('teacher-mode', tab === 'teacher');
    if (tab === 'teacher' && !data) load();
  }
  $('tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) setTab(b.dataset.tab); });

  function showTabs() {
    if (!window.tgTeacher) return;
    $('tabs').hidden = false;
  }
  document.addEventListener('tg-progress', showTabs);
  document.addEventListener('tg-hw', showTabs);

  function load() {
    if (loading || !window.tgApi) return;
    loading = true;
    window.tgApi('teacher').then(r => {
      loading = false;
      if (!r) { $('t-body').innerHTML = '<p class="status">Не удалось загрузить. Попробуйте открыть вкладку ещё раз.</p>'; return; }
      data = r;
      data.byId = Object.fromEntries(r.students.map(s => [s.tg_id, s]));
      data.exams = r.exams || [];
      data.logs = r.logs || {};
      fillGrades();
      render();
    });
  }
  // новое ДЗ задано — при следующем открытии вкладки данные загрузятся заново
  document.addEventListener('hw-changed', () => { data = null; if (!$('teacher').hidden) load(); });

  function fillGrades() {
    const sel = $('t-grade'), cur = sel.value;
    const grades = [...new Set(data.students.map(s => s.grade).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ru', { numeric: true }));
    sel.innerHTML = '<option value="">Все классы</option>' + grades.map(g => `<option value="${esc(g)}">${esc(g)}</option>`).join('');
    sel.value = grades.includes(cur) ? cur : '';
  }

  // ученики ДЗ (с учётом фильтра класса) и их результат
  function hwRows(hw) {
    const res = data.results[hw.id] || {}, g = $('t-grade').value;
    return Object.keys(res).map(id => ({ s: data.byId[id] || { tg_id: id }, r: res[id] }))
      .filter(x => !g || x.s.grade === g)
      .sort((a, b) => (a.s.grade || '').localeCompare(b.s.grade || '', 'ru', { numeric: true }) || name(a.s).localeCompare(name(b.s), 'ru'));
  }

  function bar(p) { return `<div class="bar"><span style="width:${p}%"></span></div>`; }

  function hwDetail(hw, rows) {
    const ids = hw.task_ids;
    const table = rows.length ? `<div class="tblwrap"><table class="hwr"><thead><tr><th>Ученик</th>${ids.map((_, i) => `<th>${i + 1}</th>`).join('')}<th>Итог</th></tr></thead><tbody>${
      rows.map(({ s, r }) => `<tr><th>${esc(name(s))}${s.grade ? `, ${esc(s.grade)}` : ''}</th>${ids.map(t =>
        r.ok.includes(t) ? '<td class="ok">✓</td>' : r.bad.includes(t) ? '<td class="bad">✗</td>' : '<td>·</td>').join('')}<td class="sum">${r.ok.length}/${ids.length}</td></tr>`).join('')
      }</tbody></table></div>
      <p class="muted small">✓ решена верно, ✗ были только неверные ответы, · не решал. Учитываются ответы после выдачи ДЗ.</p>`
      : '<p class="muted small">Ссылку ещё никто не открыл.</p>';
    const del = confirmDel === hw.id
      ? `<button class="btn danger" type="button" data-act="del-yes">Точно удалить</button><button class="btn" type="button" data-act="del-no">Отмена</button>`
      : `<button class="btn danger-o" type="button" data-act="del">Удалить ДЗ</button>`;
    return `<div class="t-detail">${table}<div class="hwa">
      <button class="btn" type="button" data-act="open">Открыть задачи</button>
      <button class="btn" type="button" data-act="share">Отправить ссылку</button>${del}</div></div>`;
  }

  function renderHw(q) {
    const list = data.homework.filter(hw => {
      if (!q) return true;
      return norm(hw.title).includes(q) || hwRows(hw).some(x => norm(name(x.s)).includes(q));
    });
    if (!list.length) return '<p class="status">Ничего не нашлось.</p>';
    let html = '', cur = '';
    list.forEach(hw => {
      const m = month(hw.created_at);
      if (m !== cur) { if (cur) html += '</ul>'; html += `<h3 class="ph">${esc(m)}</h3><ul class="t-list">`; cur = m; }
      const rows = hwRows(hw), n = hw.task_ids.length;
      const full = rows.filter(x => x.r.ok.length === n).length;
      const avg = rows.length ? Math.round(rows.reduce((a, x) => a + pctOf(x.r.ok.length, n), 0) / rows.length) : 0;
      const open = openId === hw.id;
      html += `<li class="t-item${open ? ' open' : ''}" data-id="${esc(hw.id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(hw.title)}</b> <span class="cnt">${day(hw.created_at)} · задач ${n}</span></span>
          <span class="cnt">открыли ${rows.length} · сделали всё ${full} · в среднем ${avg}%</span>${bar(avg)}
        </button>${open ? hwDetail(hw, rows) : ''}</li>`;
    });
    return html + '</ul>';
  }

  function renderStudents(q) {
    const g = $('t-grade').value;
    const list = data.students
      .filter(s => (!g || s.grade === g) && (!q || norm(name(s)).includes(q)))
      .sort((a, b) => (a.grade || '').localeCompare(b.grade || '', 'ru', { numeric: true }) || name(a).localeCompare(name(b), 'ru'));
    if (!data.students.length) return '<p class="status">Учеников пока нет: они появятся, когда откроют ДЗ или решат пробник.</p>';
    if (!list.length) return '<p class="status">Ничего не нашлось.</p>';
    return `<ul class="t-list">${list.map(s => {
      const ex = data.exams.find(e => String(e.tg_id) === String(s.tg_id));
      const hws = data.homework.filter(hw => data.results[hw.id] && data.results[hw.id][s.tg_id]);
      const ps = hws.map(hw => pctOf(data.results[hw.id][s.tg_id].ok.length, hw.task_ids.length));
      const avg = ps.length ? Math.round(ps.reduce((a, b) => a + b, 0) / ps.length) : 0;
      const open = openId === 's' + s.tg_id;
      return `<li class="t-item${open ? ' open' : ''}" data-id="s${esc(s.tg_id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(name(s))}</b> <span class="cnt">${esc(s.grade || 'класс не указан')}</span></span>
          <span class="cnt">ДЗ ${hws.length} · в среднем ${avg}%${ex ? ` · пробник ${testScore(ex.score)}` : ''}</span>${bar(avg)}
        </button>${open ? `<div class="t-detail"><ul class="t-sub">${hws.map((hw, i) => {
          const r = data.results[hw.id][s.tg_id], n = hw.task_ids.length, p = ps[i];
          return `<li><span>${esc(hw.title)} <span class="cnt">${day(hw.created_at)}</span></span>
            <span class="cnt ${p === 100 ? 'okc' : r.ok.length + r.bad.length === 0 ? 'badc' : ''}">${r.ok.length} из ${n}${r.bad.length ? `, ошибок ${r.bad.length}` : ''}</span>${bar(p)}</li>`;
        }).join('')}</ul></div>` : ''}</li>`;
    }).join('')}</ul>`;
  }

  // пробники: по ученику — последний и лучший результат, внутри — все его пробники
  function renderExams(q) {
    const g = $('t-grade').value, by = {};
    data.exams.forEach(e => { (by[e.tg_id] ??= []).push(e); });
    const list = Object.keys(by).map(id => data.byId[id] || { tg_id: id })
      .filter(s => (!g || s.grade === g) && (!q || norm(name(s)).includes(q)))
      .sort((a, b) => (a.grade || '').localeCompare(b.grade || '', 'ru', { numeric: true }) || name(a).localeCompare(name(b), 'ru'));
    if (!data.exams.length) return '<p class="status">Пробников пока никто не решал. Ученики решают их в Телеграме кнопкой «Пробный вариант ЕГЭ».</p>';
    if (!list.length) return '<p class="status">Ничего не нашлось.</p>';
    const vn = e => variantOf[(e.task_ids || []).join()];
    const row = e => `<li><span>${day(e.finished_at)}${vn(e) ? `, вариант ${vn(e)}` : ', случайный'}${e.graded ? '' : ' <span class="cnt">вторая часть не оценена</span>'}</span>
      <span class="cnt"><b>${testScore(e.score)}</b> тб · ${e.score} перв. (${e.p1} + ${e.p2})</span>${bar(testScore(e.score))}</li>`;
    return `<ul class="t-list">${list.map(s => {
      const es = by[s.tg_id], last = es[0], best = Math.max(...es.map(e => e.score));
      const open = openId === 'e' + s.tg_id;
      return `<li class="t-item${open ? ' open' : ''}" data-id="e${esc(s.tg_id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(name(s))}</b> <span class="cnt">${esc(s.grade || 'класс не указан')}</span></span>
          <span class="cnt">пробников ${es.length} · последний ${testScore(last.score)} · лучший ${testScore(best)}</span>${bar(testScore(last.score))}
        </button>${open ? `<div class="t-detail"><ul class="t-sub">${es.map(row).join('')}</ul>
          <p class="muted small">тб — тестовые баллы, перв. — первичные (часть 1 + часть 2). Первую часть проверяет сайт, вторую ученик оценивает сам по решению из банка.</p></div>` : ''}</li>`;
    }).join('')}</ul>`;
  }

  // ---- прогресс: те же правила освоения номера, что у ученика в «Моём прогрессе» (app.js) ----
  // по журналу ответов ученика: готовность по номерам, прогноз балла и темы, где много ошибок
  function studentStats(id) {
    const B = window.bankStats, log = data.logs[id] || [];
    const p = {}, tp = {};
    log.forEach(([t, ok]) => {
      const r = p[t] || (p[t] = { n: 0, ok: 0 });
      r.n++; if (ok) r.ok++;
      const task = B.byId[t];
      if (!task) return;
      const x = tp[task.topic] || (tp[task.topic] = { n: 0, ok: 0 });
      x.n++; if (ok) x.ok++;
    });
    const ks = B.kimStats(p, log);
    const done = KIMS.filter(k => ks[k].state === 'done');
    const primary = done.reduce((a, k) => a + KIM_POINTS[k], 0);
    const weak = Object.entries(tp).filter(([, x]) => x.n >= WEAK_MIN && x.ok / x.n < WEAK_ACC)
      .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).slice(0, 5);
    return { log, ks, done: done.length, primary, weak, tp, solved: Object.values(p).filter(r => r.ok).length, last: log.length ? log[0][2] : 0 };
  }
  // тема «проблемная», если по ней не меньше WEAK_MIN ответов и верных меньше WEAK_ACC
  const WEAK_MIN = 3, WEAK_ACC = 0.6;
  const pc = x => Math.round(100 * x);
  const topicName = c => `${c} ${(window.bankStats.topics || {})[c] || ''}`.trim();
  const ago = ts => {
    const d = Math.floor((Date.now() / 1000 - ts) / 86400);
    return d <= 0 ? 'сегодня' : d === 1 ? 'вчера' : `${d} дн. назад`;
  };

  function kimGrid(ks) {
    const B = window.bankStats;
    return `<div class="kgrid">${KIMS.map(k => {
      const s = ks[k], need = B.KIM_MIN_SOLVED[B.KIM_LEVEL(k)];
      const hint = !s.n ? 'не начат' : `решено ${s.solved} разных задач (нужно ${need}), верных ${pc(s.acc)}%` +
        (s.state === 'stale' ? ', пора повторить' : s.state === 'done' ? ', освоен' : '');
      return `<span class="kc ${s.state}" title="№ ${k}: ${hint}"><b>${k}</b><small>${s.n ? pc(s.acc) + '%' : '—'}</small></span>`;
    }).join('')}</div>`;
  }

  function renderProgress(q) {
    if (!window.bankStats) return '<p class="status">Загружаю банк задач…</p>';
    const g = $('t-grade').value;
    const list = data.students
      .filter(s => (!g || s.grade === g) && (!q || norm(name(s)).includes(q)))
      .map(s => ({ s, st: studentStats(s.tg_id) }))
      .sort((a, b) => (a.s.grade || '').localeCompare(b.s.grade || '', 'ru', { numeric: true }) || name(a.s).localeCompare(name(b.s), 'ru'));
    if (!data.students.length) return '<p class="status">Учеников пока нет: они появятся, когда войдут в приложение через Телеграм.</p>';
    if (!list.length) return '<p class="status">Ничего не нашлось.</p>';
    const active = list.filter(x => x.st.log.length);

    // сводка по выбранным ученикам: по каждому номеру — сколько освоили и средняя доля верных
    // среди тех, кто его решал; номера, где верных меньше 60%, — красные
    const cls = KIMS.map(k => {
      const tried = active.filter(x => x.st.ks[k].n);
      const acc = tried.length ? tried.reduce((a, x) => a + x.st.ks[k].acc, 0) / tried.length : 0;
      return { k, tried: tried.length, done: tried.filter(x => x.st.ks[k].state === 'done').length, acc };
    });
    const grid = `<div class="kgrid">${cls.map(c => `<span class="kc ${!c.tried ? 'none' : c.acc < WEAK_ACC ? 'bad' : c.acc < 0.8 ? 'mid' : 'good'}"
      title="№ ${c.k}: решали ${c.tried}, освоили ${c.done}, верных в среднем ${pc(c.acc)}%"><b>${c.k}</b><small>${c.tried ? pc(c.acc) + '%' : '—'}</small></span>`).join('')}</div>`;
    const hard = cls.filter(c => c.tried).sort((a, b) => a.acc - b.acc).slice(0, 5).filter(c => c.acc < 0.8);
    // проблемные темы по всем выбранным ученикам вместе
    const tp = {};
    active.forEach(x => Object.entries(x.st.tp).forEach(([t, r]) => {
      const y = tp[t] || (tp[t] = { n: 0, ok: 0, who: 0 });
      y.n += r.n; y.ok += r.ok; y.who++;
    }));
    const weakT = Object.entries(tp).filter(([, y]) => y.n >= 2 * WEAK_MIN && y.ok / y.n < WEAK_ACC)
      .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).slice(0, 8);
    const summary = `<div class="t-sum">
      <h3 class="ph">${g ? `Класс ${esc(g)}` : 'Все ученики'}: решают ${active.length} из ${list.length}</h3>
      ${active.length ? `${grid}
      <p class="legend"><span class="kc good"></span> верных 80% и больше <span class="kc mid"></span> 60–80% <span class="kc bad"></span> меньше 60% <span class="kc none"></span> не решали</p>
      ${hard.length ? `<p><b>Хуже всего идут номера:</b> ${hard.map(c => `№ ${c.k} (${pc(c.acc)}%, освоили ${c.done} из ${c.tried})`).join(', ')}</p>` : ''}
      ${weakT.length ? `<p><b>Проблемные темы:</b></p><ul class="t-weak">${weakT.map(([t, y]) =>
        `<li>${esc(topicName(t))} <span class="cnt">верных ${pc(y.ok / y.n)}% из ${y.n} ответов, учеников ${y.who}</span></li>`).join('')}</ul>` : ''}`
      : '<p class="muted small">Пока никто из них не решал задачи в Телеграме.</p>'}
      <p class="muted small">Считаются ответы, которые ученики дают в Телеграме: в банке, в ДЗ и в пробниках. Доля верных — по последним ${window.bankStats.KIM_WINDOW} ответам на номер.</p></div>`;

    const rows = list.map(({ s, st }) => {
      const open = openId === 'p' + s.tg_id;
      return `<li class="t-item${open ? ' open' : ''}" data-id="p${esc(s.tg_id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(name(s))}</b> <span class="cnt">${esc(s.grade || 'класс не указан')}</span></span>
          <span class="cnt">${st.log.length ? `освоено ${st.done} из ${KIMS.length} · прогноз ${testScore(st.primary)} тб · задач ${st.solved} · ${ago(st.last)}` : 'ещё не решал'}</span>${bar(pctOf(st.done, KIMS.length))}
        </button>${open ? `<div class="t-detail">${st.log.length ? `${kimGrid(st.ks)}
          <p class="legend"><span class="kc done"></span> освоен <span class="kc stale"></span> пора повторить <span class="kc work"></span> в работе <span class="kc none"></span> не начат</p>
          <p class="small">Прогноз: <b>${st.primary}</b> первичных из 45, это <b>${testScore(st.primary)}</b> тестовых.</p>
          ${st.weak.length ? `<p class="small"><b>Проблемные темы:</b></p><ul class="t-weak">${st.weak.map(([t, x]) =>
            `<li>${esc(topicName(t))} <span class="cnt">верных ${x.ok} из ${x.n}</span></li>`).join('')}</ul>` : '<p class="muted small">Проблемных тем нет.</p>'}`
          : '<p class="muted small">Задач в Телеграме ещё не решал.</p>'}</div>` : ''}</li>`;
    }).join('');
    return summary + `<ul class="t-list">${rows}</ul>`;
  }
  document.addEventListener('bank-ready', () => { if (viewMode === 'progress' && !$('teacher').hidden) render(); });

  function render() {
    if (!data) return;
    document.querySelectorAll('#teacher [data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === viewMode)));
    const q = norm($('t-q').value.trim());
    if (viewMode === 'exams') { $('t-body').innerHTML = renderExams(q); return; }
    if (viewMode === 'progress') { $('t-body').innerHTML = renderProgress(q); return; }
    if (viewMode === 'hw' && !data.homework.length) {
      $('t-body').innerHTML = '<p class="status">Заданных ДЗ пока нет. Соберите подборку в банке и нажмите «Задать как ДЗ».</p>';
      return;
    }
    $('t-body').innerHTML = viewMode === 'hw' ? renderHw(q) : renderStudents(q);
  }

  function del(hw) {
    window.tgApi('hw_delete', { id: hw.id }).then(r => {
      if (!r) { const t = tg(); if (t && t.showAlert) t.showAlert('Не получилось удалить, попробуйте ещё раз.'); return; }
      confirmDel = null; openId = null;
      data.homework = data.homework.filter(x => x.id !== hw.id);
      delete data.results[hw.id];
      render();
      window.tgReloadHw && window.tgReloadHw();
    });
  }

  $('t-body').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = b.closest('.t-item').dataset.id, act = b.dataset.act;
    const hw = data.homework.find(x => x.id === id);
    if (act === 'toggle') { openId = openId === id ? null : id; confirmDel = null; render(); return; }
    if (!hw) return;
    if (act === 'open') { setTab('bank'); window.bankView.show(hw.title, hw.task_ids); }
    if (act === 'share') window.hwShare(hw);
    if (act === 'del') { confirmDel = hw.id; render(); }
    if (act === 'del-no') { confirmDel = null; render(); }
    if (act === 'del-yes') del(hw);
  });
  document.querySelectorAll('#teacher [data-view]').forEach(b => b.addEventListener('click', () => {
    viewMode = b.dataset.view; openId = null; confirmDel = null; render();
  }));
  $('t-grade').addEventListener('change', render);
  $('t-q').addEventListener('input', render);
})();
