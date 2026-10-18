// Общий показ задачи для банка (app.js) и страницы подборки (print.js).
(function () {
  'use strict';

  // решение; метка [[рис N]] — чертёж из «## Решение» (assets/<id>_sN.svg)
  function solutionHtml(t) {
    const imgs = t.solution_images || [];
    return texToHtml(t.solution).replace(/(?:<p>\s*)?\[\[рис (\d+)\]\](?:\s*<\/p>)?/g, (m, n) => {
      const src = imgs[n - 1];
      return src ? `<div class="figs"><img src="${src}" alt="Рисунок к решению" loading="lazy"></div>` : '';
    });
  }

  // условие; метка [[рис N]] ставит N-й рисунок задачи в это место, остальные рисунки идут после условия
  function conditionHtml(t) {
    const imgs = t.images || [];
    const used = new Set();
    const html = texToHtml(t.condition).replace(/(?:<p>\s*)?\[\[рис (\d+)\]\](?:\s*<\/p>)?/g, (m, n) => {
      const src = imgs[n - 1];
      if (!src) return '';
      used.add(n - 1);
      return `<div class="figs"><img src="${src}" alt="Рисунок к задаче" loading="lazy"></div>`;
    });
    return { html, rest: imgs.filter((_, i) => !used.has(i)) };
  }

  const answerHtml = t => t.answer ? texToHtml(t.answer).replace(/^<p>|<\/p>$/g, '') + (t.unit ? ' ' + t.unit : '') : 'нет в банке';

  // Подборка задач (для печати и ДЗ): список id в порядке добавления, хранится в браузере.
  // Если хранилище недоступно, подборка живёт до перезагрузки страницы.
  const KEY = 'pick';
  let mem = [];
  const pick = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return mem; } },
    set(ids) { mem = ids; try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) { /* остаётся mem */ } },
  };

  window.taskRender = { solutionHtml, conditionHtml, answerHtml, pick };
})();
