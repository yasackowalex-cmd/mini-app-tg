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

  // число: «0,5», «0.50», «−3» и «-3» считаются одним ответом
  // число, в том числе вида 2,5·10⁸, 2,5*10^8, 2,5e8
  const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
  const toNum = s => {
    const v = String(s).replace(/\s+/g, '').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, c => SUP[c]).replace(/[−–]/g, '-').replace(',', '.');
    const m = v.match(/^([-+]?\d+(?:\.\d+)?)(?:(?:[eE]|[·*xх×]10\^?)([-+]?\d+))?$/);
    return m ? parseFloat(m[1]) * Math.pow(10, m[2] ? parseInt(m[2], 10) : 0) : NaN;
  };
  const digits = s => String(s).replace(/[\s,;.]+/g, '');

  // «4,4 ± 0,2», «4,4 0,2», «4,4+-0,2»: два числа, оба должны совпасть
  const pair = s => String(s).trim().split(/\s*(?:±|\+\/?-)\s*|\s+/).map(toNum);

  function isRight(t, input) {
    if (t.check === 'pm') {
      const a = pair(input), b = pair(t.answer);
      return a.length === 2 && a.every((v, i) => Math.abs(v - b[i]) <= 1e-9 * Math.max(1, Math.abs(b[i])));
    }
    if (t.check === 'number') {
      const a = toNum(input), b = toNum(t.answer);
      return !isNaN(a) && Math.abs(a - b) <= 1e-9 * (b === 0 ? 1 : Math.abs(b));
    }
    const a = digits(input), b = digits(t.answer);
    // «выберите верные утверждения» — порядок цифр не важен, в соответствии важен
    if (t.check === 'set') return [...a].sort().join('') === [...b].sort().join('');
    return a === b;
  }

  // Максимальный первичный балл за номер КИМ (спецификация ЕГЭ 2027, всего 45).
  const KIM_POINTS = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 1, 8: 1, 9: 2, 10: 2, 11: 1, 12: 1, 13: 1,
    14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 3, 22: 2, 23: 2, 24: 3, 25: 3, 26: 4 };

  // Перевод первичного балла (0–45) в тестовый (шкала 2027, прислал Александр 19.10.2026).
  const TEST_SCALE = [0, 5, 9, 14, 18, 23, 27, 32, 36, 39, 41, 43, 44, 46, 48, 49, 51, 53, 54, 56, 58, 59, 61, 62, 64, 65, 67, 68, 70, 71, 73, 74, 76, 77, 79, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100];
  const testScore = p => TEST_SCALE[Math.max(0, Math.min(45, Math.round(p)))];

  // Звёзды за ДЗ (0–3): только когда решены все n задач. Ошибки звёзд не стоят, подсказки и показанные
  // ответы — стоят: без них 3, если они понадобились не больше чем в трети задач — 2, иначе 1.
  const hwStars = (n, ok, help) => !n || ok < n ? 0 : !help ? 3 : help <= n / 3 ? 2 : 1;
  const starsText = k => '★'.repeat(k) + '☆'.repeat(3 - k);
  // Итог по ДЗ урока (у урока нет даты выдачи — считаются все ответы): log — журнал ответов [id, 1|0, unix]
  // от новых к старым, rv — открытые подсказки и ответы [id, вид, unix]. ok — решённые верно, из них help —
  // после подсказки или ответа (открыты до первого верного), retry — после неверного ответа; bad — только неверные.
  function lessonHwResult(ids, log, rv) {
    const first = {}, firstOk = {};
    for (let i = log.length - 1; i >= 0; i--) {
      const [t, c, ts] = log[i];
      if (!(t in first)) first[t] = c;
      if (c && !(t in firstOk)) firstOk[t] = ts;
    }
    const ok = ids.filter(t => t in firstOk);
    const help = ok.filter(t => (rv || []).some(r => r[0] === t && r[2] <= firstOk[t]));
    return { ok, help, retry: ok.filter(t => !first[t] && !help.includes(t)), bad: ids.filter(t => t in first && !(t in firstOk)) };
  }

  const answerHtml = t => t.answer ? texToHtml(t.answer).replace(/^<p>|<\/p>$/g, '') + (t.unit ? ' ' + t.unit : '') : 'нет в банке';

  // Списки задач в браузере: id в порядке добавления. Если хранилище недоступно, список живёт до перезагрузки.
  //   pick — подборка: что решаем или печатаем сейчас (печать и ДЗ);
  //   fav  — избранное ученика (звёздочка): задачи, к которым он хочет вернуться позже.
  function idList(key) {
    let mem = [];
    return {
      get() { try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return mem; } },
      set(ids) { mem = ids; try { localStorage.setItem(key, JSON.stringify(ids)); } catch (e) { /* остаётся mem */ } },
    };
  }
  const pick = idList('pick'), fav = idList('fav');

  // На телефоне цифровая клавиатура (inputmode decimal) часто без минуса: рядом с полем кнопка «±»,
  // она ставит или убирает минус в начале ответа. Обработчик один на страницу (банк, уроки, пробник).
  const NEG_BTN = '<button class="btn neg" type="button" data-neg aria-label="Поставить или убрать минус">±</button>';
  document.addEventListener('mousedown', e => { if (e.target.closest('[data-neg]')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-neg]'), inp = b && b.closest('.try').querySelector('input');
    if (!inp) return;
    const v = inp.value.trim();
    inp.value = /^[-−]/.test(v) ? v.slice(1) : '-' + v;
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    inp.focus();
  });

  window.taskRender = { solutionHtml, NEG_BTN, conditionHtml, answerHtml, isRight, pick, fav, KIM_POINTS, testScore, hwStars, starsText, lessonHwResult };
})();
