// Домашние задания (только в Телеграме). Учитель собирает подборку и нажимает «Задать как ДЗ» —
// получает ссылку t.me/<бот>?startapp=hw_<код>. Ученик открывает ссылку, ДЗ появляется
// в панели «Домашние задания». Заданные ДЗ и результаты учеников — во вкладке «Кабинет учителя» (teacher.js).
(function () {
  'use strict';
  const BOT = 'physics_is_phun_bot';
  const $ = id => document.getElementById(id);
  const { pick, hwStars, starsText, cleanSolved, retryNote, hwExam, examCounts, examBadge, gradeExam } = window.taskRender;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = id => `https://t.me/${BOT}?startapp=hw_${id}`;
  const date = s => new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const tg = () => window.Telegram && window.Telegram.WebApp;
  let opened = false;

  function share(hw) {
    const url = link(hw.id), t = tg();
    const text = `Домашнее задание «${hw.title}»`;
    if (t && t.openTelegramLink) t.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    else if (navigator.clipboard) navigator.clipboard.writeText(url);
  }

  // Итог ученика по ДЗ, как у учителя в кабинете: решённые верно после выдачи ДЗ и из них решённые
  // после подсказки или показанного ответа (они стоят звезду).
  function hwResult(hw, ids) {
    const since = Date.parse(hw.created_at) / 1000, log = window.tgLog || [], rv = window.tgReveals || [];
    let ok = 0;
    const help = [];
    for (const id of ids) {
      let first = null;
      for (const e of log) if (e[0] === id && e[1] && e[2] >= since) first = e[2]; // журнал от новых к старым
      if (first === null) continue;
      ok++;
      // задача с подсказкой засчитывается полностью, если её перерешали позже без подсказки (см. RETRY_DAYS)
      if (rv.some(r => r[0] === id && r[2] >= since && r[2] <= first) && !cleanSolved(id, log, rv, since)) help.push(id);
    }
    return { ok, help, since, rv };
  }

  // ---- выбор учеников для ДЗ (учитель): группы целиком или по одному; используется и в уроке (lesson.js) ----
  // picker(box, exam) рисует список и возвращает { ids() } — выбранные Telegram id.
  // exam — экзамен ДЗ: ученики другого экзамена (по классу: 9 — ОГЭ) свёрнуты в конце списка.
  function picker(box, exam) {
    let studs = [];
    box.innerHTML = '<p class="small">Загружаю учеников…</p>';
    (window.teacherRoster ? window.teacherRoster() : Promise.resolve(null)).then(r => {
      if (!r || !r.students.length) { box.innerHTML = '<p class="small">Учеников пока нет: ДЗ получат те, кто откроет ссылку.</p>'; return; }
      studs = r.students;
      // группы учителя, а у кого группы нет — по школьному классу
      const by = new Map();
      studs.forEach(s => {
        const g = s.grp || (s.grade ? `${s.grade} (без группы)` : 'Без группы');
        if (!by.has(g)) by.set(g, []);
        by.get(g).push(s);
      });
      const keys = [...by.keys()].sort((a, b) => /без группы/i.test(a) - /без группы/i.test(b) || a.localeCompare(b, 'ru', { numeric: true }));
      // группа «другого экзамена»: все её ученики с классом другого экзамена
      const away = g => !!exam && by.get(g).every(s => s.grade && gradeExam(s.grade) !== exam);
      const grpHtml = (g, i) => {
        const list = by.get(g).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        return `<div class="wg"><label class="wgh"><input type="checkbox" data-g="${i}"> <b>${esc(g)}</b> <span class="small">(${list.length})</span></label>
          <div class="wl">${list.map(s => `<label><input type="checkbox" data-s="${esc(s.tg_id)}" data-gi="${i}"> ${esc(s.name)}${s.grp && s.grade ? ` <span class="small">${esc(s.grade)}</span>` : ''}${exam && s.grade && gradeExam(s.grade) !== exam ? ` ${examBadge(gradeExam(s.grade))}` : ''}</label>`).join('')}</div></div>`;
      };
      const here = keys.map((g, i) => [g, i]).filter(([g]) => !away(g)), far = keys.map((g, i) => [g, i]).filter(([g]) => away(g));
      const other = exam === 'ОГЭ' ? 'ЕГЭ' : 'ОГЭ';
      box.innerHTML = `<p class="small">Кому задать (можно никого не отмечать — тогда только ссылка):</p>${here.map(([g, i]) => grpHtml(g, i)).join('')}${
        far.length ? `<details class="wg-far"><summary class="small">Ученики ${other} (${far.reduce((a, [g]) => a + by.get(g).length, 0)})</summary>${far.map(([g, i]) => grpHtml(g, i)).join('')}</details>` : ''}${r.groups ? '' : '<p class="small">Группы появятся, когда в Supabase будет выполнен 010_groups.sql и обновлена функция.</p>'}`;
    });
    box.onchange = e => {
      const c = e.target;
      if (c.dataset.g !== undefined) box.querySelectorAll(`[data-gi="${c.dataset.g}"]`).forEach(x => { x.checked = c.checked; });
      // галочка группы: все отмечены — стоит, часть — «частично»
      box.querySelectorAll('[data-g]').forEach(g => {
        const m = [...box.querySelectorAll(`[data-gi="${g.dataset.g}"]`)], n = m.filter(x => x.checked).length;
        g.checked = n === m.length; g.indeterminate = n > 0 && n < m.length;
      });
    };
    return { ids: () => [...new Set([...box.querySelectorAll('[data-s]:checked')].map(x => Number(x.dataset.s)))] };
  }
  window.hwPicker = picker;

  // ДЗ, составленное из ДЗ урока (задано из урока): у ученика открывается сам урок
  const lessonOf = hw => window.lessonByHw ? window.lessonByHw(hw.task_ids) : null;

  function hwItem(hw) {
    const v = window.bankView, L = lessonOf(hw), own = id => L && (L.tasks || []).some(t => t.id === id);
    const ids = hw.task_ids.filter(id => v.has(id) || own(id));
    const r = hwResult(hw, ids), st = hwStars(ids.length, r.ok, r.help.length);
    const note = st < 3 ? retryNote(r.help, r.rv, r.since) : '';
    const done = ids.length > 0 && r.ok >= ids.length;
    const res = `${st ? `<span class="stars" title="${window.taskRender.STARS_RULE}">${starsText(st)}</span> ` : ''}решено ${r.ok} из ${ids.length}`;
    const ex = hwExam(hw.task_ids);
    return { done, ex, html: `<li class="hwi${ex ? ` ex-${ex === 'ОГЭ' ? 'o' : 'e'}` : ''}" data-id="${esc(hw.id)}">
      <div class="hwt">${examBadge(ex)} <b>${esc(hw.title)}</b> <span class="cnt wrap">${date(hw.created_at)} · задач ${ids.length} · ${res}</span></div>
      ${r.ok < ids.length ? `<p class="cnt">${window.taskRender.STARS_RULE}</p>` : note ? `<p class="cnt">${note}</p>` : ''}
      <div class="hwa">${L ? `<a class="btn" href="#lesson=${esc(L.id || L.topic)}">Открыть урок</a>` : '<button class="btn" type="button" data-act="open">Открыть задачи</button>'}</div>
    </li>` };
  }

  function render() {
    // кнопка учителя не зависит от списка ДЗ: он может не загрузиться (например, таблиц ДЗ ещё нет)
    const teacher = !!window.tgTeacher;
    $('hw-new').hidden = !teacher;
    const h = window.tgHw, v = window.bankView;
    if (!h || !v) return;
    const box = $('hw'), EXAM = window.EXAM || 'ЕГЭ';
    // открыли по ссылке ДЗ другого экзамена — открываем приложение заново по его экзамену (как ссылки на уроки)
    if (!opened && window.tgHwOpen) {
      const hw = h.mine.find(x => x.id === window.tgHwOpen), ex = hw && hwExam(hw.task_ids);
      let tried = null;
      try { tried = sessionStorage.getItem('hwExamSwitch'); } catch (e) { tried = hw && hw.id; }
      if (ex && ex !== EXAM && tried !== hw.id && window.switchExam) {
        try { sessionStorage.setItem('hwExamSwitch', hw.id); } catch (e) { /* без хранилища не переключаем повторно */ }
        window.switchExam(ex);
        return;
      }
    }
    // заданные учителем ДЗ живут во вкладке «Кабинет учителя» (teacher.js), здесь — только ДЗ ученика,
    // и только выбранного экзамена; про ДЗ другого экзамена — строка с кнопкой «Перейти»
    const all = h.mine.map(hwItem), items = all.filter(x => !x.ex || x.ex === EXAM), away = all.filter(x => x.ex && x.ex !== EXAM && !x.done);
    const other = EXAM === 'ОГЭ' ? 'ЕГЭ' : 'ОГЭ';
    box.hidden = !items.length && !away.length;
    // выполненные ДЗ (решены все задачи) убираем в свёрнутый список «Выполненные», чтобы не загромождали экран
    const todo = items.filter(x => !x.done), done = items.filter(x => x.done);
    const wasOpen = !!document.querySelector('#hw-body .hw-done[open]');
    $('hw-sum').textContent = todo.length ? `Домашние задания ${EXAM} (${todo.length})` : `Домашние задания ${EXAM}`;
    $('hw-body').innerHTML = (!items.length ? '' :
      (todo.length ? `<ul class="hwl">${todo.map(x => x.html).join('')}</ul>` : `<p class="cnt">Все домашние задания ${EXAM} выполнены.</p>`) +
      (done.length ? `<details class="hw-done"${wasOpen ? ' open' : ''}><summary>Выполненные (${done.length})</summary><ul class="hwl">${done.map(x => x.html).join('')}</ul></details>` : '')) +
      (away.length ? `<p class="hw-away"><span>${examBadge(other)} Есть невыполненные ДЗ по ${other}: ${away.length}</span><button class="btn" type="button" data-act="exam" data-ex="${other}">Перейти в ${other}</button></p>` : '');
    // открыли по ссылке на ДЗ (или кнопкой из уведомления бота) — сразу показываем его задачи,
    // а ДЗ, заданное из урока, — сам урок; ждём список уроков, иначе урок по ДЗ не узнать
    if (!opened && window.tgHwOpen && window.lessonsLoaded) {
      opened = true;
      const hw = h.mine.find(x => x.id === window.tgHwOpen), L = hw && lessonOf(hw);
      if (L) location.hash = '#lesson=' + (L.id || L.topic);
      else if (hw) { box.open = true; v.show(hw.title, hw.task_ids); }
    }
  }

  $('hw-body').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'exam') { window.switchExam(b.dataset.ex); return; }
    const id = b.closest('.hwi').dataset.id;
    const hw = window.tgHw.mine.find(x => x.id === id);
    if (hw && b.dataset.act === 'open') window.bankView.show(hw.title, hw.task_ids);
  });

  let formPick = null;
  $('hw-new').addEventListener('click', () => {
    const f = $('hw-form');
    f.hidden = !f.hidden;
    if (!f.hidden) { formPick = picker(f.querySelector('.hw-who'), formExam()); f.elements.title.focus(); f.scrollIntoView({ block: 'end' }); }
  });
  // экзамен подборки для формы «Задать как ДЗ»: метка в форме и предупреждение, если в подборке задачи обоих экзаменов
  function formExam() {
    const n = examCounts(pick.get()), ex = n['ОГЭ'] > n['ЕГЭ'] ? 'ОГЭ' : 'ЕГЭ', box = $('hw-form').querySelector('.hw-ex');
    if (box) box.innerHTML = `<span>Задаётся ДЗ ${examBadge(ex)}</span>` + (n['ОГЭ'] && n['ЕГЭ']
      ? `<span class="hw-mix">В подборке задачи обоих экзаменов: ЕГЭ ${n['ЕГЭ']}, ОГЭ ${n['ОГЭ']}. Ученикам понятнее ДЗ одного экзамена: уберите лишние задачи или задайте их отдельным ДЗ.</span>` : '');
    return ex;
  }
  $('hw-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.currentTarget, msg = f.querySelector('.msg'), ids = pick.get();
    if (!ids.length) { msg.textContent = 'Подборка пуста.'; return; }
    if (ids.length > 60) { msg.textContent = `В одном ДЗ не больше 60 задач, сейчас ${ids.length}.`; return; }
    f.querySelector('button').disabled = true;
    msg.textContent = 'Создаю…';
    const who = formPick ? formPick.ids() : [];
    window.tgApi('hw_create', { title: f.elements.title.value.trim(), task_ids: ids, tg_ids: who }).then(r => {
      f.querySelector('button').disabled = false;
      if (!r) { msg.textContent = 'Не получилось, попробуйте ещё раз.'; return; }
      msg.textContent = '';
      f.reset();
      f.hidden = true;
      pick.set([]);
      document.dispatchEvent(new CustomEvent('pick-changed'));
      // ученики отмечены — ДЗ уже у них, ссылку отправлять не нужно; иначе — окно «Поделиться» со ссылкой
      if (who.length) { const t = tg(), m = `ДЗ задано: ${r.assigned ?? who.length} уч. Оно уже у них во вкладке «Задачи».${notified(r)}`; if (t && t.showAlert) t.showAlert(m); }
      else share({ ...r.hw, created_at: new Date().toISOString() });
      window.tgReloadHw();
      document.dispatchEvent(new CustomEvent('hw-changed'));
    });
  });

  // подборку меняют при открытой форме — метка экзамена и предупреждение пересчитываются
  document.addEventListener('pick-changed', () => { if (!$('hw-form').hidden) formExam(); });

  // сколько учеников получили сообщение от бота о новом ДЗ (бот пишет только тем, кто его запускал)
  const notified = r => typeof r.notified !== 'number' ? '' : r.notified >= (r.assigned || 0)
    ? ' Бот прислал им уведомление.'
    : ` Уведомление от бота получили ${r.notified} из ${r.assigned}: остальные не запускали бота или выключили его.`;
  window.hwNotified = notified;

  window.hwShare = share;
  ['tg-hw', 'bank-ready', 'tg-progress', 'tg-attempt', 'lessons-ready'].forEach(ev => document.addEventListener(ev, render));
})();
