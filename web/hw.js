// Домашние задания (только в Телеграме). Учитель собирает подборку и нажимает «Задать как ДЗ» —
// получает ссылку t.me/<бот>?startapp=hw_<код>. Ученик открывает ссылку, ДЗ появляется
// в панели «Домашние задания». Заданные ДЗ и результаты учеников — во вкладке «Кабинет учителя» (teacher.js).
(function () {
  'use strict';
  const BOT = 'physics_is_phun_bot';
  const $ = id => document.getElementById(id);
  const { pick, hwStars, starsText, cleanSolved, retryNote } = window.taskRender;
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
  // picker(box) рисует список и возвращает { ids() } — выбранные Telegram id.
  function picker(box) {
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
      box.innerHTML = `<p class="small">Кому задать (можно никого не отмечать — тогда только ссылка):</p>${keys.map((g, i) => {
        const list = by.get(g).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        return `<div class="wg"><label class="wgh"><input type="checkbox" data-g="${i}"> <b>${esc(g)}</b> <span class="small">(${list.length})</span></label>
          <div class="wl">${list.map(s => `<label><input type="checkbox" data-s="${esc(s.tg_id)}" data-gi="${i}"> ${esc(s.name)}${s.grp && s.grade ? ` <span class="small">${esc(s.grade)}</span>` : ''}</label>`).join('')}</div></div>`;
      }).join('')}${r.groups ? '' : '<p class="small">Группы появятся, когда в Supabase будет выполнен 010_groups.sql и обновлена функция.</p>'}`;
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
    const res = `${st ? `<span class="stars" title="${window.taskRender.STARS_RULE}">${starsText(st)}</span> ` : ''}решено ${r.ok} из ${ids.length}`;
    return `<li class="hwi" data-id="${esc(hw.id)}">
      <div class="hwt"><b>${esc(hw.title)}</b> <span class="cnt wrap">${date(hw.created_at)} · задач ${ids.length} · ${res}</span></div>
      ${r.ok < ids.length ? `<p class="cnt">${window.taskRender.STARS_RULE}</p>` : note ? `<p class="cnt">${note}</p>` : ''}
      <div class="hwa">${L ? `<a class="btn" href="#lesson=${esc(L.id || L.topic)}">Открыть урок</a>` : '<button class="btn" type="button" data-act="open">Открыть задачи</button>'}</div>
    </li>`;
  }

  function render() {
    // кнопка учителя не зависит от списка ДЗ: он может не загрузиться (например, таблиц ДЗ ещё нет)
    const teacher = !!window.tgTeacher;
    $('hw-new').hidden = !teacher;
    const h = window.tgHw, v = window.bankView;
    if (!h || !v) return;
    const box = $('hw');
    // заданные учителем ДЗ живут во вкладке «Кабинет учителя» (teacher.js), здесь — только ДЗ ученика
    box.hidden = !h.mine.length;
    $('hw-body').innerHTML = h.mine.length ? `<ul class="hwl">${h.mine.map(hwItem).join('')}</ul>` : '';
    // открыли по ссылке на ДЗ — сразу показываем его задачи
    if (!opened && window.tgHwOpen) {
      opened = true;
      const hw = h.mine.find(x => x.id === window.tgHwOpen);
      if (hw) { box.open = true; v.show(hw.title, hw.task_ids); }
    }
  }

  $('hw-body').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = b.closest('.hwi').dataset.id;
    const hw = window.tgHw.mine.find(x => x.id === id);
    if (hw && b.dataset.act === 'open') window.bankView.show(hw.title, hw.task_ids);
  });

  let formPick = null;
  $('hw-new').addEventListener('click', () => {
    const f = $('hw-form');
    f.hidden = !f.hidden;
    if (!f.hidden) { formPick = picker(f.querySelector('.hw-who')); f.elements.title.focus(); f.scrollIntoView({ block: 'end' }); }
  });
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
      if (who.length) { const t = tg(), m = `ДЗ задано: ${r.assigned ?? who.length} уч. Оно уже у них во вкладке «Задачи».`; if (t && t.showAlert) t.showAlert(m); }
      else share({ ...r.hw, created_at: new Date().toISOString() });
      window.tgReloadHw();
      document.dispatchEvent(new CustomEvent('hw-changed'));
    });
  });

  window.hwShare = share;
  ['tg-hw', 'bank-ready', 'tg-progress', 'tg-attempt', 'lessons-ready'].forEach(ev => document.addEventListener(ev, render));
})();
