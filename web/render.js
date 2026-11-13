// Общий показ задачи для банка (app.js) и страницы подборки (print.js).
(function () {
  'use strict';

  // Решения и подсказки лежат не в bank.json, а в out/sol/<экзамен>_<тема>.json (адрес — поле sol задачи):
  // так первая загрузка сайта в несколько раз легче. loadSol(задачи) дописывает solution, hint и solution_images
  // в сами объекты задач; каждый файл скачивается один раз. У своих задач урока решения уже на месте (sol нет).
  const solFiles = {};
  function loadSol(tasks) {
    const need = (tasks || []).filter(t => t && t.sol && !t._sol);
    const urls = [...new Set(need.map(t => t.sol))];
    return Promise.all(urls.map(u => solFiles[u] || (solFiles[u] = fetch(u).then(r => r.json())
      .catch(() => { delete solFiles[u]; return null; })))).then(parts => {
      const m = Object.assign({}, ...parts.filter(Boolean));
      need.forEach(t => { if (m[t.id]) { Object.assign(t, m[t.id]); t._sol = true; } });
      return parts.every(Boolean);
    });
  }
  // есть ли у задачи подсказка / решение (до загрузки решений — по флагам из bank.json)
  const hasHint = t => !!(t.hint || t.has_hint);
  const hasSol = t => !!(t.solution || t.has_sol);

  // решение; метка [[рис N]] — чертёж из «## Решение» (assets/<id>_sN.svg)
  // «Дано: …. Найти ….» в начале решения (часть 2 ОГЭ) → столбец слева за вертикальной чертой
  function splitTop(s, re) {
    const out = []; let cur = '', math = false;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '$' && s[i - 1] !== '\\') math = !math;
      const m = !math && re.exec(s.slice(i));
      if (m) { out.push(cur); cur = ''; i += m[0].length - 1; } else cur += s[i];
    }
    out.push(cur);
    return out.map(x => x.trim()).filter(Boolean);
  }
  function givenParts(sol) {
    const m = /^\s*Дано:\s*([\s\S]*?)(?:\n\s*\n|$)/.exec(sol || '');
    if (!m) return null;
    let par = m[1].trim(), find = '';
    const f = /\.?\s*Найти:?\s*([\s\S]*?)\.?\s*$/.exec(par);
    if (f) { find = f[1]; par = par.slice(0, f.index); }
    return { items: splitTop(par.replace(/\.\s*$/, ''), /^[,;]\s+/), find: splitTop(find, /^(?:,\s+|\s+и\s+)/), rest: sol.slice(m[0].length) };
  }
  function solutionHtml(t) {
    const imgs = t.solution_images || [];
    const figs = h => h.replace(/(?:<p>\s*)?\[\[рис (\d+)\]\](?:\s*<\/p>)?/g, (m, n) => {
      const src = imgs[n - 1];
      return src ? `<div class="figs"><img src="${src}" alt="Рисунок к решению" loading="lazy"></div>` : '';
    });
    const g = givenParts(t.solution);
    if (!g) return figs(texToHtml(t.solution));
    const line = x => `<div${x.replace(/\$[^$]*\$/g, '').length < 14 ? ' class="nw"' : ''}>${texToHtml(x).replace(/^<p>|<\/p>$/g, '')}</div>`;
    return `<div class="given"><div class="given-l"><i>Дано:</i>${g.items.map(line).join('')}` +
      (g.find.length ? `<div class="given-q">${g.find.map(x => line(x + ' — ?')).join('')}</div>` : '') +
      `</div><div class="given-r">${figs(texToHtml(g.rest))}</div></div>`;
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
  // Частично верный ответ в задаче 1 части на 2 балла (критерии ЕГЭ: одна ошибка — 1 балл):
  // соответствие и последовательность — неверна одна цифра; «выберите все верные» — одна цифра лишняя, пропущена или указана вместо верной (как в пробнике, exam.js points).
  function isPartial(t, input) {
    if (!t || !(t.kim <= 20) || KIM_POINTS[t.kim] !== 2 || isRight(t, input)) return false;
    const a = digits(input), b = digits(t.answer || '');
    if (!a || !b) return false;
    if (t.check === 'set') {
      const A = new Set(a), B = new Set(b);
      if (A.size !== a.length) return false;
      const extra = [...A].filter(x => !B.has(x)).length, miss = [...B].filter(x => !A.has(x)).length;
      return extra + miss === 1 || (extra === 1 && miss === 1);
    }
    if (t.check !== 'seq' || a.length !== b.length) return false;
    return [...a].filter((c, i) => c !== b[i]).length === 1;
  }
  const KIM_POINTS = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 1, 8: 1, 9: 2, 10: 2, 11: 1, 12: 1, 13: 1,
    14: 2, 15: 2, 16: 1, 17: 2, 18: 2, 19: 1, 20: 1, 21: 3, 22: 2, 23: 2, 24: 3, 25: 3, 26: 4 };

  // Перевод первичного балла (0–45) в тестовый (шкала 2027, прислал Александр 19.10.2026).
  const TEST_SCALE = [0, 5, 9, 14, 18, 23, 27, 32, 36, 39, 41, 43, 44, 46, 48, 49, 51, 53, 54, 56, 58, 59, 61, 62, 64, 65, 67, 68, 70, 71, 73, 74, 76, 77, 79, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100];
  const testScore = p => TEST_SCALE[Math.max(0, Math.min(45, Math.round(p)))];

  // ОГЭ 2027 (спецификация ФИПИ): 22 задания, всего 39 первичных баллов; 17–22 — развёрнутый ответ.
  const OGE_POINTS = { 1: 2, 2: 2, 3: 1, 4: 2, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2,
    14: 2, 15: 1, 16: 2, 17: 3, 18: 2, 19: 2, 20: 3, 21: 3, 22: 3 };
  // Перевод первичного балла ОГЭ в отметку (шкала владельца 06.11.2026): 0–9 «2», 10–19 «3», 20–29 «4», 30–39 «5».
  const ogeMark = p => p >= 30 ? 5 : p >= 20 ? 4 : p >= 10 ? 3 : 2;
  // Баллы за номер и «вторая часть» с учётом экзамена задачи
  const pointsOf = t => ((t && t.exam === 'ОГЭ') ? OGE_POINTS : KIM_POINTS)[t && t.kim];
  const isPart2 = t => !!t && (t.exam === 'ОГЭ' ? t.kim >= 17 : t.kim >= 21);

  // Звёзды за ДЗ (0–3): только когда решены все n задач. Ошибки звёзд не стоят, подсказки и показанные
  // ответы — стоят: без них 3, если они понадобились не больше чем в трети задач — 2, иначе 1.
  // звёзды за ДЗ по доле решённого (сроков нет): задача, решённая после подсказки или показанного ответа, — половина;
  // 3★ от 90%, 2★ от 60%, 1★ от 30%. Всё сам — 3, всё решено и подсказки не больше чем в трети задач — 2.
  // Пересдача: задача с подсказкой засчитывается полностью, если её снова решили верно не раньше чем через
  // RETRY_DAYS дней после последней подсказки или показанного ответа к ней (и без новых подсказок).
  const RETRY_DAYS = 7, RETRY_SEC = RETRY_DAYS * 86400;
  const STARS_RULE = `Звёзды за ДЗ: 3 — от 90% решённого, 2 — от 60%, 1 — от 30%. Задача после подсказки или показанного ответа считается за половину, но её можно перерешать через неделю — тогда она засчитается полностью.`;
  // подсказки и ответы к задаче t, открытые не раньше since, которые «мешают» верному ответу в момент ts
  const helpBefore = (t, ts, rv, since) => (rv || []).some(r => r[0] === t && r[2] >= since && r[2] <= ts && ts - r[2] < RETRY_SEC);
  // есть ли верный ответ на t (не раньше since) без подсказки в предыдущие RETRY_DAYS дней
  const cleanSolved = (t, log, rv, since = 0) => (log || []).some(e => e[0] === t && e[1] && e[2] >= since && !helpBefore(t, e[2], rv, since));
  // с какого момента (unix) можно перерешать задачу t: через RETRY_DAYS после последней подсказки
  const retryAt = (t, rv, since = 0) => Math.max(0, ...(rv || []).filter(r => r[0] === t && r[2] >= since).map(r => r[2])) + RETRY_SEC;
  // строка для ученика под звёздами: какие задачи с подсказкой и когда можно перерешать
  function retryNote(help, rv, since = 0) {
    if (!help.length) return '';
    const now = Date.now() / 1000, at = Math.min(...help.map(t => retryAt(t, rv, since)));
    const day = new Date(at * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    return `Задач с подсказкой: ${help.length}. ` + (at <= now ? 'Их уже можно перерешать без подсказки — тогда они засчитаются полностью.'
      : `Перерешать их без подсказки можно с ${day} — тогда они засчитаются полностью.`);
  }
  const hwStars = (n, ok, help) => { const p = n ? (ok - help / 2) / n : 0; return p >= 0.9 - 1e-9 ? 3 : p >= 0.6 - 1e-9 ? 2 : p >= 0.3 - 1e-9 ? 1 : 0; };
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
    const help = ok.filter(t => (rv || []).some(r => r[0] === t && r[2] <= firstOk[t]) && !cleanSolved(t, log, rv));
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

  window.taskRender = { loadSol, hasHint, hasSol, solutionHtml, conditionHtml, answerHtml, isRight, pick, fav, KIM_POINTS, testScore, OGE_POINTS, ogeMark, pointsOf, isPart2, hwStars, starsText, STARS_RULE, lessonHwResult, cleanSolved, retryAt, retryNote, RETRY_DAYS, isPartial };
})();
