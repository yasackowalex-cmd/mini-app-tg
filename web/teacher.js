// Кабинет учителя (вкладка видна только учителю из TEACHER_IDS). Данные — одним запросом action "teacher":
// ДЗ учителя и результаты по каждой паре «ДЗ — ученик», ученики, их журналы ответов и подсказок, итоги пробников.
// Два вида:
// «Ученики» — сводка по выбранным ученикам (какие номера КИМ и темы проваливаются) и список учеников;
//   у раскрытого ученика всё о нём: готовность по 26 номерам, проблемные темы, все его ДЗ (от учителя и уроков),
//   пробники, правка имени и «Мои ученики».
// «Задания» — ДЗ учителя и ДЗ уроков одним списком, новые сверху; у каждого таблица учеников с отметками по задачам.
// Фильтр по классу, «Мои / Остальные» и поиск (фамилия или название задания) общие для обоих видов.
// «Мои ученики» — открывшие личную ссылку учителя или его ДЗ либо отмеченные вручную; остальные — в «Остальных».
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
  const { testScore, KIM_POINTS, hwStars, starsText, lessonHwResult } = window.taskRender;
  // звёзды ученика за ДЗ (help есть у результатов, только когда функция уже обновлена)
  const starsOf = (r, n) => hwStars(n, r.ok.length, (r.help || []).length);
  const KIMS = Object.keys(KIM_POINTS);

  // постоянные пробные варианты: номер варианта узнаём по составу задач
  let variantOf = {};
  fetch('exams/variants.json', { cache: 'no-cache' }).then(r => r.json())
    .then(vs => { variantOf = Object.fromEntries(vs.map(v => [v.ids.join(), v.n])); }).catch(() => {});
  // уроки (для ДЗ уроков): грузит lesson.js
  let lessons = null, lessonsAsked = false;
  function loadLessons() {
    if (lessonsAsked) return;
    lessonsAsked = true;
    (window.lessonsLoad || fetch('out/lessons.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => []))
      .then(L => { lessons = (L || []).filter(l => (l.hw || []).length); if (data) render(); });
  }
  let data = null, loading = false, viewMode = 'students', openId = null, confirmDel = null, who = null, editId = null, sumOpen = false;
  const BOT = 'physics_is_phun_bot';

  // ---- вкладка «Кабинет учителя» (сами вкладки переключает app.js) ----
  const setTab = t => window.setTab(t);
  document.addEventListener('tab', e => { if (e.detail === 'teacher' && !data) load(); });

  function showTabs() {
    if (!window.tgTeacher) return;
    document.querySelector('#tabs [data-tab="teacher"]').hidden = false;
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
      loadLessons();
      data.byId = Object.fromEntries(r.students.map(s => [s.tg_id, s]));
      data.exams = r.exams || [];
      data.logs = r.logs || {};
      data.rlogs = r.rlogs || {};
      // mine: null — таблицы своих учеников ещё нет, тогда показываем всех
      data.mine = Array.isArray(r.mine) ? new Set(r.mine.map(String)) : null;
      if (who === null) who = data.mine && data.mine.size ? 'mine' : 'all';
      fillGrades();
      fillWho();
      renderInvite();
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

  // ---- свои ученики и остальные ----
  const isMine = s => !!data.mine && data.mine.has(String(s.tg_id));
  const whoOk = s => !data.mine || who === 'all' || (who === 'mine') === isMine(s);
  function fillWho() {
    const sel = $('t-who');
    sel.hidden = !data.mine;
    if (!data.mine) return;
    const n = data.students.filter(isMine).length;
    sel.innerHTML = `<option value="mine">Мои ученики (${n})</option><option value="other">Остальные (${data.students.length - n})</option>` +
      `<option value="all">Все (${data.students.length})</option>`;
    sel.value = who;
  }
  const inviteLink = () => `https://t.me/${BOT}?startapp=t_${data.invite}`;
  function renderInvite() {
    const box = $('t-invite');
    box.hidden = !(data.mine && data.invite);
    if (box.hidden) return;
    box.innerHTML = `<span class="small">Ваша ссылка для учеников: кто откроет её, попадёт в «Мои ученики». Кто открыл ваше ДЗ, попадает туда сам.</span>
      <span class="hwa"><button class="btn" type="button" data-inv="share">Отправить ссылку</button>
      <button class="btn" type="button" data-inv="copy">Скопировать</button></span>`;
  }
  $('t-invite').addEventListener('click', e => {
    const b = e.target.closest('[data-inv]');
    if (!b) return;
    const url = inviteLink(), t = tg();
    if (b.dataset.inv === 'share' && t && t.openTelegramLink) {
      t.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Задачи ЕГЭ по физике: банк, пробники и ДЗ')}`);
      return;
    }
    const done = () => { b.textContent = 'Скопировано'; setTimeout(() => { b.textContent = 'Скопировать'; }, 1500); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, () => prompt('Ссылка:', url));
    else prompt('Ссылка:', url);
  });
  // под учеником: исправить имя (форма) и «мои ученики»
  function myBtn(s) {
    const edit = editId === String(s.tg_id)
      ? `<div class="t-edit"><input id="te-last" placeholder="Фамилия" maxlength="50" value="${esc(s.last_name)}">
          <input id="te-first" placeholder="Имя" maxlength="50" value="${esc(s.first_name)}">
          <input id="te-grade" placeholder="Класс" maxlength="10" value="${esc(s.grade)}">
          <span class="hwa"><button class="btn" type="button" data-act="name-save">Сохранить</button>
          <button class="btn" type="button" data-act="name-no">Отмена</button></span></div>`
      : `<p class="hwa"><button class="btn" type="button" data-act="name-edit">✎ Изменить имя и класс</button></p>`;
    return edit + myBtnMine(s);
  }
  function saveName(tgId) {
    const v = id => $(id).value.trim();
    const body = { tg_id: Number(tgId), last_name: v('te-last'), first_name: v('te-first'), grade: v('te-grade') };
    const t = tg(), say = m => (t && t.showAlert ? t.showAlert(m) : alert(m));
    if (!body.last_name && !body.first_name) { say('Укажите фамилию или имя.'); return; }
    window.tgApi('student_set', body).then(r => {
      if (!r || !r.student) { say('Не получилось сохранить. Если не помогает, обновите код функции в Supabase.'); return; }
      Object.assign(data.byId[tgId] || {}, r.student);
      editId = null;
      fillGrades();
      render();
    });
  }
  function myBtnMine(s) {
    if (!data.mine) return '';
    return isMine(s)
      ? `<p class="hwa"><span class="cnt">Ваш ученик</span> <button class="btn" type="button" data-act="my-off">Убрать из моих</button></p>`
      : `<p class="hwa"><button class="btn" type="button" data-act="my-on">Добавить в мои ученики</button></p>`;
  }
  function setMine(tgId, on) {
    window.tgApi('my_set', { tg_id: Number(tgId), on }).then(r => {
      if (!r) { const t = tg(); if (t && t.showAlert) t.showAlert('Не получилось сохранить, попробуйте ещё раз.'); return; }
      if (on) data.mine.add(String(tgId)); else data.mine.delete(String(tgId));
      fillWho();
      render();
    });
  }
  function emptyWho() {
    return who === 'mine'
      ? '<p class="status">В «Моих учениках» пока никого. Отправьте ученикам свою ссылку (она выше) или добавьте их из «Остальных».</p>'
      : '<p class="status">Ничего не нашлось.</p>';
  }

  // ученики ДЗ (с учётом фильтра класса) и их результат
  function hwRows(hw) {
    const res = data.results[hw.id] || {}, g = $('t-grade').value;
    return Object.keys(res).map(id => ({ s: data.byId[id] || { tg_id: id }, r: res[id] }))
      .filter(x => !g || x.s.grade === g)
      .sort((a, b) => (a.s.grade || '').localeCompare(b.s.grade || '', 'ru', { numeric: true }) || name(a.s).localeCompare(name(b.s), 'ru'));
  }

  function bar(p) { return `<div class="bar"><span style="width:${p}%"></span></div>`; }

  // таблица «ученики × задачи» для ДЗ учителя и ДЗ урока
  function marksTable(ids, rows, note) {
    if (!rows.length) return `<p class="muted small">${note}</p>`;
    const n = ids.length;
    return `<div class="tblwrap"><table class="hwr"><thead><tr><th>Ученик</th>${ids.map((_, i) => `<th>${i + 1}</th>`).join('')}<th>Итог</th></tr></thead><tbody>${
      rows.map(({ s, r }) => { const st = starsOf(r, n); return `<tr><th>${esc(name(s))}${s.grade ? `, ${esc(s.grade)}` : ''}</th>${ids.map(t =>
        (r.help || []).includes(t) ? '<td class="help" title="решена после подсказки или ответа">💡</td>'
        : (r.retry || []).includes(t) ? '<td class="retry" title="решена после ошибки">✓</td>'
        : r.ok.includes(t) ? '<td class="ok" title="решена сам с первой попытки">✓</td>'
        : r.bad.includes(t) ? '<td class="bad" title="только неверные ответы">✗</td>' : '<td>·</td>').join('')}<td class="sum">${r.ok.length}/${n}${st ? `<br><span class="stars">${starsText(st)}</span>` : ''}</td></tr>`; }).join('')
      }</tbody></table></div>
      <p class="muted small"><b class="okc">✓</b> сам с первой попытки, <b class="retryc">✓</b> после ошибки, 💡 после подсказки или показанного ответа, ✗ только неверные ответы, · не решал. Звёзды — когда решены все задачи: без подсказок 3, с подсказками не больше чем в трети задач 2, иначе 1.</p>`;
  }

  // ---- вид «Задания»: ДЗ учителя и ДЗ уроков одним списком ----
  function taskItems(q) {
    const studs = studentsShown(), qs = q ? studs.filter(s => norm(name(s)).includes(q)) : null;
    const byQ = rows => !qs || !qs.length ? rows : rows.filter(x => qs.includes(x.s));
    const okRow = x => whoOk(x.s);
    const hws = data.homework.map(hw => ({ id: hw.id, hw, title: hw.title, ids: hw.task_ids, sub: `ДЗ от ${day(hw.created_at)}`,
      rows: byQ(hwRows(hw).filter(okRow)), key: Date.parse(hw.created_at) / 1000 }));
    const les = (lessons || []).map(L => {
      const rows = byQ(studs.map(s => ({ s, r: lessonResult(s.tg_id, L) })).filter(x => touched(x.r)));
      const last = Math.max(0, ...rows.map(x => { const set = new Set(L.hw), e = (data.logs[x.s.tg_id] || []).find(y => set.has(y[0])); return e ? e[2] : 0; }));
      return { id: 'l' + L.topic, L, title: lessonName(L), ids: L.hw, sub: 'ДЗ урока', rows, key: last };
    }).filter(x => x.rows.length);
    return hws.concat(les)
      .filter(x => !q || (qs && qs.length && x.rows.length) || norm(x.title).includes(q))
      .sort((a, b) => b.key - a.key);
  }
  function renderTasks(q) {
    const list = taskItems(q);
    if (!list.length) return data.homework.length || (lessons || []).length
      ? '<p class="status">Ничего не нашлось. Свои ДЗ задаются из подборки в банке кнопкой «Задать как ДЗ».</p>'
      : '<p class="status">Заданий пока нет. Соберите подборку в банке и нажмите «Задать как ДЗ».</p>';
    return `<ul class="t-list">${list.map(x => {
      const n = x.ids.length, full = x.rows.filter(y => y.r.ok.length === n).length;
      const avg = x.rows.length ? Math.round(x.rows.reduce((a, y) => a + pctOf(y.r.ok.length, n), 0) / x.rows.length) : 0;
      const open = openId === x.id;
      return `<li class="t-item${open ? ' open' : ''}" data-id="${esc(x.id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(x.title)}</b> <span class="cnt">${x.sub} · задач ${n}</span></span>
          <span class="cnt">${x.hw ? 'открыли' : 'решают'} ${x.rows.length} · сделали всё ${full} · в среднем ${avg}%</span>${bar(avg)}
        </button>${open ? `<div class="t-detail">${marksTable(x.ids, x.rows, x.hw ? 'Ссылку ещё никто не открыл.' : 'Никто ещё не решал.')}${taskActions(x)}</div>` : ''}</li>`;
    }).join('')}</ul>`;
  }
  function taskActions(x) {
    if (x.L) return `<div class="hwa"><button class="btn" type="button" data-act="lesson-open">Открыть урок</button></div>`;
    const del = confirmDel === x.hw.id
      ? `<button class="btn danger" type="button" data-act="del-yes">Точно удалить</button><button class="btn" type="button" data-act="del-no">Отмена</button>`
      : `<button class="btn danger-o" type="button" data-act="del">Удалить ДЗ</button>`;
    return `<div class="hwa"><button class="btn" type="button" data-act="open">Открыть задачи</button>
      <button class="btn" type="button" data-act="share">Отправить ссылку</button>${del}</div>`;
  }

  // пробники ученика, новые сверху
  function studentExams(s) {
    const es = data.exams.filter(e => String(e.tg_id) === String(s.tg_id));
    if (!es.length) return '';
    const vn = e => variantOf[(e.task_ids || []).join()];
    return `<h4 class="t-h">Пробники</h4><ul class="t-sub">${es.map(e => `<li><span>${day(e.finished_at)}${vn(e) ? `, вариант ${vn(e)}` : ', случайный'}${e.graded ? '' : ' <span class="cnt">вторая часть не оценена</span>'}</span>
      <span class="cnt"><b>${testScore(e.score)}</b> тб · ${e.score} перв. (${e.p1} + ${e.p2})</span>${bar(testScore(e.score))}</li>`).join('')}</ul>
      <p class="muted small">тб — тестовые баллы, перв. — первичные (часть 1 + часть 2). Вторую часть ученик оценивает сам по решению из банка.</p>`;
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
      const s = ks[k], need = B.KIM_NEED(k);
      const hint = !s.n ? 'не начат' : `решено ${s.solved} разных задач (нужно ${need}), верных ${pc(s.acc)}%` +
        (s.state === 'stale' ? ', пора повторить' : s.state === 'done' ? ', освоен' : '');
      return `<span class="kc ${s.state}" title="№ ${k}: ${hint}"><b>${k}</b><small>${s.n ? pc(s.acc) + '%' : '—'}</small></span>`;
    }).join('')}</div>`;
  }

  // ученики под фильтрами класса и «Мои / Остальные»
  function studentsShown() {
    const g = $('t-grade').value;
    return data.students.filter(s => whoOk(s) && (!g || s.grade === g))
      .sort((a, b) => (a.grade || '').localeCompare(b.grade || '', 'ru', { numeric: true }) || name(a).localeCompare(name(b), 'ru'));
  }

  // ---- вид «Ученики»: сводка и все сведения об ученике в одной карточке ----
  function renderStudents(q) {
    if (!window.bankStats) return '<p class="status">Загружаю банк задач…</p>';
    if (!data.students.length) return '<p class="status">Учеников пока нет: они появятся, когда войдут в приложение через Телеграм.</p>';
    const g = $('t-grade').value;
    const all = studentsShown().map(s => ({ s, st: studentStats(s.tg_id) }));
    const list = all.filter(x => !q || norm(name(x.s)).includes(q));
    if (!all.length) return emptyWho();
    const active = all.filter(x => x.st.log.length);

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
    const whom = g ? `Класс ${esc(g)}` : who === 'mine' && data.mine ? 'Мои ученики' : who === 'other' && data.mine ? 'Остальные' : 'Все ученики';
    const summary = `<details class="t-sum" id="t-sum"${sumOpen ? ' open' : ''}>
      <summary><b>Сводка: ${whom}</b> <span class="cnt">решают ${active.length} из ${all.length}${hard.length ? ` · хуже всего № ${hard.slice(0, 3).map(c => c.k).join(', ')}` : ''}</span></summary>
      ${active.length ? `${grid}
      <p class="legend"><span class="kc good"></span> верных 80% и больше <span class="kc mid"></span> 60–80% <span class="kc bad"></span> меньше 60% <span class="kc none"></span> не решали</p>
      ${hard.length ? `<p><b>Хуже всего идут номера:</b> ${hard.map(c => `№ ${c.k} (${pc(c.acc)}%, освоили ${c.done} из ${c.tried})`).join(', ')}</p>` : ''}
      ${weakT.length ? `<p><b>Проблемные темы:</b></p><ul class="t-weak">${weakT.map(([t, y]) =>
        `<li>${esc(topicName(t))} <span class="cnt">верных ${pc(y.ok / y.n)}% из ${y.n} ответов, учеников ${y.who}</span></li>`).join('')}</ul>` : ''}`
      : '<p class="muted small">Пока никто из них не решал задачи в Телеграме.</p>'}
      <p class="muted small">Считаются ответы, которые ученики дают в Телеграме: в банке, в ДЗ и в пробниках. Доля верных — по последним ${window.bankStats.KIM_WINDOW} ответам на номер.</p></details>`;

    const rows = list.map(({ s, st }) => {
      const open = openId === 's' + s.tg_id;
      const ex = data.exams.find(e => String(e.tg_id) === String(s.tg_id));
      return `<li class="t-item${open ? ' open' : ''}" data-id="s${esc(s.tg_id)}">
        <button class="t-head" type="button" data-act="toggle" aria-expanded="${open}">
          <span class="t-title"><b>${esc(name(s))}</b> <span class="cnt">${esc(s.grade || 'класс не указан')}</span></span>
          <span class="cnt">${st.log.length ? `освоено ${st.done} из ${KIMS.length} · прогноз ${testScore(st.primary)} тб · ${ago(st.last)}` : 'ещё не решал'}${ex ? ` · пробник ${testScore(ex.score)}` : ''}</span>${bar(pctOf(st.done, KIMS.length))}
        </button>${open ? `<div class="t-detail">${st.log.length ? `${kimGrid(st.ks)}
          <p class="legend"><span class="kc done"></span> освоен <span class="kc stale"></span> пора повторить <span class="kc work"></span> в работе <span class="kc none"></span> не начат</p>
          <p class="small">Прогноз: <b>${st.primary}</b> первичных из 45, это <b>${testScore(st.primary)}</b> тестовых. Решено разных задач: ${st.solved}.</p>
          ${st.weak.length ? `<p class="small"><b>Проблемные темы:</b></p><ul class="t-weak">${st.weak.map(([t, x]) =>
            `<li>${esc(topicName(t))} <span class="cnt">верных ${x.ok} из ${x.n}</span></li>`).join('')}</ul>` : '<p class="muted small">Проблемных тем нет.</p>'}`
          : '<p class="muted small">Задач в Телеграме ещё не решал.</p>'}
          <h4 class="t-h">Домашние задания</h4>${studentWork(s)}${studentExams(s)}${myBtn(s)}</div>` : ''}</li>`;
    }).join('');
    return summary + (list.length ? `<ul class="t-list">${rows}</ul>` : '<p class="status">Ничего не нашлось.</p>');
  }
  document.addEventListener('bank-ready', () => { if (viewMode === 'students' && !$('teacher').hidden) render(); });

  // ---- ДЗ уроков: считаем по журналу ответов и открытым подсказкам (все, без даты выдачи) ----
  // r: ok — решённые, из них help — после подсказки или ответа, retry — после неверного ответа; bad — только неверные
  const lessonResult = (id, L) => lessonHwResult(L.hw, data.logs[id] || [], data.rlogs[id] || []);
  const touched = r => r.ok.length + r.bad.length > 0;
  const lessonName = L => `Урок ${L.topic}. ${L.title}`;
  // отметки по задачам ДЗ одной строкой: номер задачи на цветном фоне, как в таблице ДЗ
  const markOf = (r, t) => (r.help || []).includes(t) ? ['help', '💡 после подсказки или ответа']
    : (r.retry || []).includes(t) ? ['retry', 'решена после ошибки'] : r.ok.includes(t) ? ['ok', 'решена с первой попытки']
    : r.bad.includes(t) ? ['bad', 'только неверные ответы'] : ['', 'не решал'];
  const marks = (ids, r) => `<span class="mks">${ids.map((t, i) => { const [c, tt] = markOf(r, t);
    return `<span class="${c}" title="№ ${i + 1}: ${tt}">${i + 1}${c === 'help' ? '💡' : ''}</span>`; }).join('')}</span>`;
  // всё ДЗ ученика в одном списке (ДЗ от учителя и ДЗ уроков), сначала то, что он решал последним;
  // workOf[ученик] — тот же список для кнопок «Открыть» и «Задачи с ошибками»
  const workOf = {};
  const errIds = (ids, r) => ids.filter(t => ['bad', 'retry', 'help'].includes(markOf(r, t)[0]));
  function studentWork(s) {
    const log = data.logs[s.tg_id] || [];
    const lastOf = ids => { const set = new Set(ids), e = log.find(x => set.has(x[0])); return e ? e[2] : 0; };
    const items = data.homework.filter(hw => data.results[hw.id] && data.results[hw.id][s.tg_id])
      .map(hw => ({ hw, title: hw.title, sub: `ДЗ от ${day(hw.created_at)}`, ids: hw.task_ids, r: data.results[hw.id][s.tg_id],
        last: lastOf(hw.task_ids), key: Math.max(lastOf(hw.task_ids), Date.parse(hw.created_at) / 1000) }))
      .concat((lessons || []).map(L => ({ L, title: lessonName(L), sub: 'ДЗ урока', ids: L.hw, r: lessonResult(s.tg_id, L), last: lastOf(L.hw), key: lastOf(L.hw) }))
        .filter(x => touched(x.r)))
      .sort((a, b) => b.key - a.key);
    workOf[s.tg_id] = items;
    if (!items.length) return '<p class="muted small">ДЗ ещё не решал.</p>';
    const inBank = id => window.bankStats && window.bankStats.byId[id];
    return `<ul class="t-sub t-work">${items.map(({ L, title, sub, ids, r, last }, k) => {
      const n = ids.length, st = starsOf(r, n), errs = errIds(ids, r).filter(inBank);
      return `<li><span><b>${esc(title)}</b> <span class="cnt">${sub}${last ? ` · решал ${ago(last)}` : ''}</span></span>
        <span class="cnt ${r.ok.length === n ? 'okc' : ''}">${st ? `<span class="stars">${starsText(st)}</span> ` : ''}решено ${r.ok.length} из ${n}${r.bad.length ? `, не решено ${r.bad.length}` : ''}${(r.help || []).length ? `, с подсказкой ${r.help.length}` : ''}</span>
        ${marks(ids, r)}
        <span class="hwa"><button class="btn" type="button" data-act="w-open" data-k="${k}">${L ? 'Открыть урок' : 'Открыть ДЗ'}</button>${errs.length ? `<button class="btn" type="button" data-act="w-err" data-k="${k}">Задачи с ошибками (${errs.length})</button>` : ''}</span></li>`;
    }).join('')}</ul>
    <p class="muted small"><b class="okc">зелёный</b> — с первой попытки, <b class="retryc">жёлтый</b> — после ошибки, 💡 — после подсказки, <b class="badc">красный</b> — только неверные ответы, серый — не решал.</p>`;
  }
  function render() {
    if (!data) return;
    document.querySelectorAll('#teacher [data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === viewMode)));
    const q = norm($('t-q').value.trim());
    $('t-body').innerHTML = viewMode === 'tasks' ? renderTasks(q) : renderStudents(q);
  }

  // из списка ДЗ ученика: урок открываем на вкладке «Уроки», ДЗ от учителя и задачи с ошибками — в банке
  function openWork(sid, k, onlyErr) {
    const it = (workOf[sid] || [])[k];
    if (!it) return;
    if (!onlyErr && it.L) { location.hash = '#lesson=' + it.L.topic; return; }
    const s = data.byId[sid] || {}, ids = onlyErr ? errIds(it.ids, it.r).filter(id => window.bankStats.byId[id]) : it.ids;
    setTab('bank');
    if (onlyErr) window.bankView.show(`✗ ${name(s)}, ошибки в «${it.title}»`, ids, true);
    else window.bankView.show(it.title, ids);
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

  // сводка в «Учениках» остаётся раскрытой или свёрнутой между перерисовками
  $('t-body').addEventListener('toggle', e => { if (e.target.id === 't-sum') sumOpen = e.target.open; }, true);
  $('t-body').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = b.closest('.t-item').dataset.id, act = b.dataset.act;
    const hw = data.homework.find(x => x.id === id);
    if (act === 'lesson-open') { location.hash = '#lesson=' + id.slice(1); return; }
    if (act === 'toggle') { openId = openId === id ? null : id; confirmDel = null; editId = null; render(); return; }
    if (act === 'name-edit') { editId = id.slice(1); render(); return; }
    if (act === 'name-no') { editId = null; render(); return; }
    if (act === 'name-save') { saveName(id.slice(1)); return; }
    if (act === 'my-on' || act === 'my-off') { setMine(id.slice(1), act === 'my-on'); return; }
    if (act === 'w-open' || act === 'w-err') { openWork(id.slice(1), +b.dataset.k, act === 'w-err'); return; }
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
  $('t-who').addEventListener('change', () => { who = $('t-who').value; openId = null; render(); });
  $('t-q').addEventListener('input', render);
})();
