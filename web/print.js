// Страница подборки: задачи из адреса (#ids=a,b,c&t=Заголовок) для печати и сохранения в PDF.
(function () {
  'use strict';
  const { solutionHtml, conditionHtml, answerHtml, pick } = window.taskRender;
  const $ = id => document.getElementById(id);
  const OPTS = ['name', 'kim', 'line', 'ans', 'sol'];
  let byId = {}, ids = [];

  function readHash() {
    const p = new URLSearchParams(location.hash.slice(1));
    ids = (p.get('ids') || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!ids.length) ids = pick.get();
    if (p.get('t')) $('title').value = p.get('t');
  }

  function writeHash() {
    const p = new URLSearchParams();
    p.set('ids', ids.join(','));
    if ($('title').value !== 'Домашнее задание') p.set('t', $('title').value);
    history.replaceState(null, '', '#' + p.toString().replace(/%2C/g, ','));
  }

  function opt(k) { return $('o-' + k).checked; }

  function render() {
    writeHash();
    const tasks = ids.map(id => byId[id]).filter(Boolean);
    const missing = ids.length - tasks.length;
    document.title = ($('title').value || 'Подборка задач') + ' · Саня дай сотку';
    $('h-title').textContent = $('title').value;
    $('h-name').hidden = !opt('name');
    $('status').textContent = !tasks.length ? 'Подборка пуста. Добавьте задачи кнопкой «В подборку» в банке.'
      : missing ? `Не нашлось задач: ${missing} (возможно, их убрали из банка).` : '';

    $('tasks').innerHTML = tasks.map(t => {
      const c = conditionHtml(t);
      const figs = c.rest.map(src => `<img src="${src}" alt="Рисунок к задаче">`).join('');
      return `<li class="ptask" data-id="${t.id}">
        <button class="rm" type="button" title="Убрать из подборки" aria-label="Убрать из подборки">✕</button>
        ${opt('kim') ? `<span class="pkim">КИМ ${t.kim}</span>` : ''}
        <div class="cond">${c.html}</div>
        ${figs ? `<div class="figs">${figs}</div>` : ''}
        ${opt('line') && t.kim <= 20 ? `<p class="ans-line">Ответ: ________________${t.unit ? ' ' + t.unit : ''}</p>` : ''}
      </li>`;
    }).join('');

    $('answers').innerHTML = opt('ans') && tasks.length ? `<h2>Ответы</h2><table class="atable"><tbody>${
      tasks.map((t, i) => `<tr><td>${i + 1}</td><td>${answerHtml(t)}</td></tr>`).join('')}</tbody></table>` : '';
    const sols = tasks.map((t, i) => [t, i]).filter(([t]) => t.solution);
    $('solutions').innerHTML = opt('sol') && sols.length ? `<h2>Решения</h2>${
      sols.map(([t, i]) => `<div class="psol"><h3>Задача ${i + 1}</h3><div class="cond">${solutionHtml(t)}</div></div>`).join('')}` : '';
  }

  $('tasks').addEventListener('click', e => {
    const b = e.target.closest('.rm');
    if (!b) return;
    const id = b.closest('.ptask').dataset.id;
    ids = ids.filter(x => x !== id);
    pick.set(pick.get().filter(x => x !== id));
    render();
  });
  OPTS.forEach(k => $('o-' + k).addEventListener('change', render));
  $('title').addEventListener('input', render);
  $('print').addEventListener('click', () => window.print());
  $('copy').addEventListener('click', () => {
    const ok = () => { $('msg').textContent = 'Ссылка скопирована'; };
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(ok, () => { $('msg').textContent = location.href; });
    else $('msg').textContent = location.href;
  });

  readHash();
  fetch('out/bank.json', { cache: 'no-cache' }).then(r => r.json()).then(b => {
    b.forEach(t => { byId[t.id] = t; });
    render();
  }).catch(() => { $('status').textContent = 'Не удалось загрузить банк задач. Обновите страницу.'; });
})();
