// Домашние задания (только в Телеграме). Учитель собирает подборку и нажимает «Задать как ДЗ» —
// получает ссылку t.me/<бот>?startapp=hw_<код>. Ученик открывает ссылку, ДЗ появляется
// в панели «Домашние задания». Заданные ДЗ и результаты учеников — во вкладке «Кабинет учителя» (teacher.js).
(function () {
  'use strict';
  const BOT = 'physics_is_phun_bot';
  const $ = id => document.getElementById(id);
  const { pick } = window.taskRender;
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

  function hwItem(hw) {
    const v = window.bankView, ids = hw.task_ids.filter(v.has);
    const done = ids.filter(v.solved).length;
    return `<li class="hwi" data-id="${esc(hw.id)}">
      <div class="hwt"><b>${esc(hw.title)}</b> <span class="cnt">${date(hw.created_at)} · задач ${ids.length} · решено ${done} из ${ids.length}</span></div>
      <div class="hwa"><button class="btn" type="button" data-act="open">Открыть задачи</button></div>
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
      document.dispatchEvent(new CustomEvent('hw-changed'));
    });
  });

  window.hwShare = share;
  ['tg-hw', 'bank-ready', 'tg-progress', 'tg-attempt'].forEach(ev => document.addEventListener(ev, render));
})();
