// Домашние задания (только в Телеграме). Учитель собирает подборку и нажимает «Задать как ДЗ» —
// получает ссылку t.me/<бот>?startapp=hw_<код>. Ученик открывает ссылку, ДЗ появляется
// в панели «Домашние задания»; учитель там же видит таблицу «кто что решил».
(function () {
  'use strict';
  const BOT = 'physics_is_phun_bot';
  const $ = id => document.getElementById(id);
  const { pick } = window.taskRender;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = id => `https://t.me/${BOT}?startapp=hw_${id}`;
  const date = s => new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const tg = () => window.Telegram && window.Telegram.WebApp;
  let opened = false, report = null;

  function share(hw) {
    const url = link(hw.id), t = tg();
    const text = `Домашнее задание «${hw.title}»`;
    if (t && t.openTelegramLink) t.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    else if (navigator.clipboard) navigator.clipboard.writeText(url);
  }

  function hwItem(hw, teacher) {
    const v = window.bankView, ids = hw.task_ids.filter(v.has);
    const done = ids.filter(v.solved).length;
    return `<li class="hwi" data-id="${esc(hw.id)}">
      <div class="hwt"><b>${esc(hw.title)}</b> <span class="cnt">${date(hw.created_at)} · задач ${ids.length}${
        teacher ? '' : ` · решено ${done} из ${ids.length}`}</span></div>
      <div class="hwa">
        <button class="btn" type="button" data-act="open">Открыть задачи</button>
        ${teacher ? `<button class="btn" type="button" data-act="share">Отправить ссылку</button>
        <button class="btn" type="button" data-act="report">Кто что решил</button>` : ''}
      </div>
      ${teacher && report && report.hw.id === hw.id ? reportHtml(report) : ''}
    </li>`;
  }

  function reportHtml(r) {
    const ids = r.hw.task_ids;
    if (!r.students.length) return '<p class="muted small">Ссылку ещё никто не открыл.</p>';
    const name = s => [s.last_name, s.first_name].filter(Boolean).join(' ') + (s.grade ? `, ${s.grade}` : '');
    const rows = r.students
      .map(s => ({ s, ok: ids.filter(id => s.tasks[id] === 1).length }))
      .sort((a, b) => name(a.s).localeCompare(name(b.s), 'ru'))
      .map(({ s, ok }) => `<tr><th>${esc(name(s))}</th>${ids.map(id =>
        s.tasks[id] === 1 ? '<td class="ok">✓</td>' : s.tasks[id] === 0 ? '<td class="bad">✗</td>' : '<td>·</td>').join('')}
        <td class="sum">${ok}/${ids.length}</td></tr>`).join('');
    return `<div class="tblwrap"><table class="hwr"><thead><tr><th>Ученик</th>${ids.map((_, i) => `<th>${i + 1}</th>`).join('')}<th>Итог</th></tr></thead>
      <tbody>${rows}</tbody></table></div>
      <p class="muted small">✓ решена верно, ✗ были только неверные ответы, · не решал. Учитываются ответы после выдачи ДЗ.</p>`;
  }

  function render() {
    // кнопка учителя не зависит от списка ДЗ: он может не загрузиться (например, таблиц ДЗ ещё нет)
    const teacher = !!window.tgTeacher;
    $('hw-new').hidden = !teacher;
    const h = window.tgHw, v = window.bankView;
    if (!h || !v) return;
    const box = $('hw');
    box.hidden = !h.mine.length && !(teacher && h.given.length);
    $('hw-body').innerHTML =
      (h.mine.length ? `<ul class="hwl">${h.mine.map(hw => hwItem(hw, false)).join('')}</ul>` : '') +
      (teacher && h.given.length ? `<h3 class="ph">Заданные мной</h3><ul class="hwl">${h.given.map(hw => hwItem(hw, true)).join('')}</ul>` : '');
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
    const id = b.closest('.hwi').dataset.id, h = window.tgHw;
    const hw = h.mine.concat(h.given).find(x => x.id === id);
    if (!hw) return;
    if (b.dataset.act === 'open') window.bankView.show(hw.title, hw.task_ids);
    if (b.dataset.act === 'share') share(hw);
    if (b.dataset.act === 'report') {
      if (report && report.hw.id === id) { report = null; render(); return; }
      b.disabled = true;
      window.tgApi('hw_report', { id }).then(r => { b.disabled = false; if (r) { report = r; render(); } });
    }
  });

  $('hw-new').addEventListener('click', () => {
    const f = $('hw-form');
    f.hidden = !f.hidden;
    if (!f.hidden) { f.elements.title.focus(); f.scrollIntoView({ block: 'end' }); }
  });
  $('hw-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.currentTarget, msg = f.querySelector('.msg'), ids = pick.get();
    if (!ids.length) { msg.textContent = 'Подборка пуста.'; return; }
    f.querySelector('button').disabled = true;
    msg.textContent = 'Создаю…';
    window.tgApi('hw_create', { title: f.elements.title.value.trim(), task_ids: ids }).then(r => {
      f.querySelector('button').disabled = false;
      if (!r) { msg.textContent = 'Не получилось, попробуйте ещё раз.'; return; }
      msg.textContent = '';
      f.reset();
      f.hidden = true;
      pick.set([]);
      document.dispatchEvent(new CustomEvent('pick-changed'));
      share({ ...r.hw, created_at: new Date().toISOString() });
      window.tgReloadHw();
    });
  });

  ['tg-hw', 'bank-ready', 'tg-progress', 'tg-attempt'].forEach(ev => document.addEventListener(ev, render));
})();
