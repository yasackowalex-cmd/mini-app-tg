// Достижения ученика и общий рейтинг (только в Телеграме, где есть журнал ответов).
// Достижения считаются здесь по журналу ответов (tgLog), подсказкам (tgReveals), урокам и пробникам.
// У каждого достижения несколько ступеней; ступень — отдельный id вида «solved-2». Полученные ступени
// уходят на сервер (ach_sync) и больше не отнимаются, даже если, например, номер КИМ потом «просит повторения».
// Награждаем за регулярность, исправление ошибок и самостоятельность; штрафов нет.
// Данные для подсчёта даёт app.js: window.achCtx() → { exam, p, log, rv, kimDone, groups, byId, lessons }.
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plural = (n, a, b, c) => n % 10 === 1 && n % 100 !== 11 ? a : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? b : c;
  const days = n => `${n} ${plural(n, 'день', 'дня', 'дней')}`;
  const tasksN = n => `${n} ${plural(n, 'задачу', 'задачи', 'задач')}`;

  // ---- значения для достижений ----
  // день по местному времени
  const dayOf = ts => { const d = new Date(ts * 1000); return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5); };
  // Серия: дни подряд, когда решена хотя бы одна задача верно. Один пропущенный день серию не обрывает,
  // если прошлый такой пропуск был не меньше 7 дней назад. Возвращает лучшую серию и текущую (0, если оборвалась).
  function streaks(log) {
    const ds = [...new Set(log.filter(e => e[1]).map(e => dayOf(e[2])))].sort((a, b) => a - b);
    let best = 0, cur = 0, prev = null, skip = -1e9;
    for (const d of ds) {
      if (prev !== null && d - prev === 1) cur++;
      else if (prev !== null && d - prev === 2 && d - 1 - skip >= 7) { cur++; skip = d - 1; }
      else { cur = 1; skip = -1e9; }
      best = Math.max(best, cur); prev = d;
    }
    const today = dayOf(Date.now() / 1000);
    const alive = prev !== null && (today - prev <= 1 || (today - prev === 2 && today - 1 - skip >= 7));
    return { best, cur: alive ? cur : 0, today: prev === today, days: new Set(ds), todayN: today };
  }
  // Исправленные ошибки: задачи, в которых сначала был неверный ответ, а потом верный.
  // «Сам»: лучшая серия новых задач подряд, решённых верно с первой попытки без подсказки к ней.
  function history(log, rv) {
    const wrong = new Set(), fixed = new Set(), seen = new Set(), help = {};
    (rv || []).forEach(r => { if (!(r[0] in help) || r[2] < help[r[0]]) help[r[0]] = r[2]; });
    let run = 0, best = 0;
    for (let i = log.length - 1; i >= 0; i--) {
      const [t, ok, ts] = log[i];
      if (!seen.has(t)) {
        seen.add(t);
        if (ok && !(help[t] <= ts)) best = Math.max(best, ++run); else run = 0;
      }
      if (!ok) wrong.add(t); else if (wrong.has(t)) fixed.add(t);
    }
    return { fixed: fixed.size, selfRun: best };
  }

  // ---- список достижений ----
  // tiers — пороги ступеней; val(c) — текущее значение; for — 'ЕГЭ'/'ОГЭ', если достижение только для одного экзамена
  function defs(c) {
    const oge = c.exam === 'ОГЭ', pre = oge ? 'oge-' : '';
    const list = [
      { key: 'streak', icon: '🔥', name: 'Серия', tiers: [3, 7, 14, 30], val: c.streak.best, unit: n => days(n),
        desc: n => `Решать задачи ${days(n)} подряд. Один пропущенный день в неделю серию не обрывает.` },
      { key: 'solved', icon: '📚', name: 'Решатель', tiers: [10, 50, 100, 250, 500, 1000], val: c.solved,
        desc: n => `Решить верно ${tasksN(n)} (разных).` },
      { key: pre + 'kim', icon: '🎯', name: 'Номера КИМ', tiers: oge ? [4, 8, 12, 16] : [5, 10, 15, 20], val: c.kimDone,
        desc: n => `Освоить ${n} ${plural(n, 'номер', 'номера', 'номеров')} КИМ ${c.exam} (см. «Мой прогресс»).` },
    ];
    c.groups.forEach((g, i) => {
      const tiers = [...new Set([25, 75, 150].map(x => Math.min(x, Math.floor(g.total * 0.8))))].filter(x => x > 0);
      list.push({ key: `${pre}sec${i + 1}`, icon: g.icon, name: g.title, tiers, val: g.solved,
        desc: n => `Решить верно ${tasksN(n)} раздела «${g.name}».` });
    });
    list.push(
      { key: 'fix', icon: '🛠️', name: 'Работа над ошибками', tiers: [10, 50, 100], val: c.fixed,
        desc: n => `Исправить ${n} ${plural(n, 'ошибку', 'ошибки', 'ошибок')}: решить верно задачу, в которой раньше ошибся.` },
      { key: 'self', icon: '🧠', name: 'Сам', tiers: [10, 25, 50], val: c.selfRun,
        desc: n => `Решить ${tasksN(n)} подряд верно с первой попытки и без подсказок.` },
      { key: 'hw', icon: '⭐', name: 'Отличник ДЗ', tiers: [1, 5, 15], val: c.hw3,
        desc: n => `Получить ★★★ за ДЗ ${n} ${plural(n, 'урока', 'уроков', 'уроков')}.` },
      { key: 'p2', icon: '✍️', name: 'Вторая часть', tiers: [1, 10, 30], val: c.p2,
        desc: n => `Решить на полный балл ${tasksN(n)} второй части.` },
    );
    list.push({ key: 'week', icon: '📅', name: 'Задания недели', tiers: [1, 4, 12], val: c.weeks,
      desc: n => `Выполнить все задания недели ${n} ${plural(n, 'раз', 'раза', 'раз')}.` });
    if (!oge) list.push(
      { key: 'exam', icon: '📝', name: 'Пробники', tiers: [1, 5, 10], val: c.exams,
        desc: n => `Решить ${n} ${plural(n, 'пробный вариант', 'пробных варианта', 'пробных вариантов')} ЕГЭ.` },
      { key: 'score', icon: '🏆', name: 'Высокий балл', tiers: [60, 75, 90], val: c.bestScore,
        desc: n => `Набрать в пробнике ${n} тестовых баллов.` },
    );
    return list;
  }

  // ---- задача дня ----
  // Одна задача на всех учеников экзамена: по дате (московской) выбирается задача первой части с автопроверкой.
  // Выбор — наименьший хеш от «день:id», поэтому он почти не меняется, когда в банк добавляют задачи.
  const mskDay = ts => Math.floor((ts + 3 * 3600) / 86400);
  const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const dailyCache = {};
  function dailyId(x, day) {
    const key = x.exam + day;
    if (key in dailyCache) return dailyCache[key];
    const T = window.taskRender;
    let best = null, bh = Infinity;
    x.bank.forEach(t => {
      if (!t.answer || T.isPart2(t) || (t.tags || []).includes('ВНЕ_ЕГЭ_2027')) return;
      const h = fnv(day + ':' + t.id);
      if (h < bh) { bh = h; best = t.id; }
    });
    return (dailyCache[key] = best);
  }
  // решена ли задача дня в свой день (верный ответ в тот же московский день)
  const dailySolved = (x, day) => { const id = dailyId(x, day); return !!id && x.log.some(e => e[0] === id && e[1] && mskDay(e[2]) === day); };

  // ---- задания недели ----
  // Три задания на неделю (пн–вс): «реши 20 задач» всегда, ещё два меняются от недели к неделе.
  // Считаются по журналу ответов за эту неделю; награда — достижение «Задания недели».
  const monOf = d => d - ((d + 3) % 7);   // день 0 (1 января 1970) — четверг
  const QUESTS = {
    solve: { goal: 20, name: 'Решить 20 задач' },
    days: { goal: 5, name: 'Заниматься 5 дней' },
    fix: { goal: 5, name: 'Исправить 5 ошибок' },
    p2: { goal: 3, name: 'Решить 3 задачи второй части' },
    daily: { goal: 3, name: 'Решить 3 задачи дня' },
    first: { goal: 10, name: 'Решить 10 новых задач с первой попытки' },
  };
  const ROT = ['days', 'fix', 'p2', 'daily', 'first'];
  const weekSet = mon => { const i = Math.floor(mon / 7) % ROT.length; return ['solve', ROT[i], ROT[(i + 2) % ROT.length]]; };
  function weekQuests(x, mon) {
    const T = window.taskRender, { log, byId } = x;
    const solved = new Set(), daysOk = new Set(), wrong = new Set(), fixed = new Set(), p2 = new Set(), seen = new Set();
    let first = 0;
    for (let i = log.length - 1; i >= 0; i--) {
      const [t, ok, ts] = log[i], d = dayOf(ts), inW = d >= mon && d < mon + 7;
      if (d >= mon + 7) break;
      if (inW && !seen.has(t) && ok) first++;
      seen.add(t);
      if (!ok) { wrong.add(t); continue; }
      if (!inW) continue;
      solved.add(t); daysOk.add(d);
      if (wrong.has(t)) fixed.add(t);
      if (T.isPart2(byId[t])) p2.add(t);
    }
    // задачи дня этой недели (дни московские; для недели берём те же номера дней)
    let daily = 0;
    for (let d = mon; d < mon + 7; d++) if (dailySolved(x, d)) daily++;
    const val = { solve: solved.size, days: daysOk.size, fix: fixed.size, p2: p2.size, daily, first };
    return weekSet(mon).map(k => ({ key: k, ...QUESTS[k], v: Math.min(val[k], QUESTS[k].goal), done: val[k] >= QUESTS[k].goal }));
  }
  // сколько недель закрыто целиком; прошедшие недели не меняются, поэтому считаются один раз
  const weekCache = {};
  function weeksDone(x) {
    if (!x.log.length) return 0;
    const cur = monOf(dayOf(Date.now() / 1000)), start = monOf(dayOf(x.log[x.log.length - 1][2]));
    let n = 0;
    for (let m = start; m <= cur; m += 7) {
      const k = x.exam + m;
      const done = m < cur && k in weekCache ? weekCache[k] : weekQuests(x, m).every(q => q.done);
      if (m < cur) weekCache[k] = done;
      if (done) n++;
    }
    return n;
  }

  // блок «Задача дня» и «Задания недели» под «Планом на сегодня»
  let dailyStat = null, dailyAsked = '';
  function renderQuests(x) {
    const el = $('quests');
    if (!el) return;
    el.hidden = false;
    const today = mskDay(Date.now() / 1000), id = dailyId(x, today), t = id && x.byId[id];
    const tried = id && x.log.some(e => e[0] === id && mskDay(e[2]) === today), ok = dailySolved(x, today);
    // доля решивших — после своего ответа, чтобы не подсказывать сложность заранее
    if (tried && window.tgApi && dailyAsked !== id + today) {
      dailyAsked = id + today;
      window.tgApi('daily', { task_id: id }).then(r => { if (r && r.n) { dailyStat = { id, n: r.n, right: r.right }; renderQuests(window.achCtx()); } });
    }
    const stat = tried && dailyStat && dailyStat.id === id && dailyStat.n >= 3
      ? `<p class="muted small">Сегодня её решали ${dailyStat.n} ${plural(dailyStat.n, 'ученик', 'ученика', 'учеников')}, верно с первой попытки — ${Math.round(100 * dailyStat.right / dailyStat.n)}%.</p>` : '';
    const dailyHtml = !t ? '' : `<h3 class="ph">Задача дня</h3>
      <div class="tdp"><span class="cnt wrap">${ok ? '<b class="okc">Решена ✓</b> Новая появится завтра.' : `Одна задача на всех: № ${t.kim} ${x.exam}${tried ? '. Пока неверно, попробуйте ещё.' : ''}`}</span>
        <button class="btn${ok ? '' : ' solid'}" type="button" data-q="daily">${ok ? 'Открыть' : 'Решать'}</button></div>${stat}`;
    const qs = weekQuests(x, monOf(dayOf(Date.now() / 1000))), all = qs.every(q => q.done);
    const left = 7 - ((new Date().getDay() + 6) % 7);
    el.innerHTML = `${dailyHtml}<h3 class="ph qh">Задания недели <span class="cnt">${all ? '' : `осталось ${days(left)}`}</span></h3>
      ${all ? '<p class="small"><b class="okc">Все задания недели выполнены ✓</b> Новые появятся в понедельник.</p>' : ''}
      <ul class="qlist">${qs.map(q => `<li class="${q.done ? 'done' : ''}"><span class="qn">${q.done ? '✓ ' : ''}${q.name}</span><span class="cnt">${q.v} / ${q.goal}</span><div class="bar"><span style="width:${100 * q.v / q.goal}%"></span></div></li>`).join('')}</ul>
      ${window.tgRemind === null || window.tgRemind === undefined ? '' : `<p class="muted small qr">🔔 Напоминания бота о серии ${window.tgRemind ? 'включены' : 'выключены'}. <button type="button" class="link" data-q="remind">${window.tgRemind ? 'Выключить' : 'Включить'}</button></p>`}`;
    el._daily = id;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('#quests [data-q]');
    if (!b) return;
    if (b.dataset.q === 'daily' && window.bankView && $('quests')._daily) window.bankView.show('Задача дня', [$('quests')._daily], true);
    if (b.dataset.q === 'remind' && window.tgApi) {
      b.disabled = true;
      window.tgApi('remind_set', { on: !window.tgRemind }).then(r => { if (r) window.tgRemind = !!r.remind; renderQuests(window.achCtx()); });
    }
  });

  function compute() {
    const x = window.achCtx && window.achCtx();
    if (!x || !x.log) return null;
    const { log, rv, p, byId } = x, T = window.taskRender;
    const solvedIds = Object.keys(p).filter(id => p[id].ok > 0);
    const h = history(log, rv);
    const hw3 = (x.lessons || []).filter(L => (L.hw || []).length && (() => {
      const r = T.lessonHwResult(L.hw, log, rv);
      return T.hwStars(L.hw.length, r.ok.length, r.help.length) === 3;
    })()).length;
    // пробники: с сервера, иначе история в этом браузере (exam.js)
    let ex = window.tgExams;
    if (!ex) { try { ex = (JSON.parse(localStorage.getItem('exams')) || []).map(e => [e.date / 1000, e.score, e.graded]); } catch (e) { ex = []; } }
    const c = {
      exam: x.exam, streak: streaks(log), solved: solvedIds.length, kimDone: x.kimDone, groups: x.groups,
      fixed: h.fixed, selfRun: h.selfRun, hw3,
      p2: solvedIds.filter(id => T.isPart2(byId[id])).length,
      weeks: weeksDone(x), exams: ex.length, bestScore: ex.length ? Math.max(...ex.map(e => T.testScore(e[1]))) : 0,
    };
    const list = defs(c).map(d => {
      const level = d.tiers.filter(t => d.val >= t).length;
      return { ...d, level, next: d.tiers[level], ids: d.tiers.slice(0, level).map((t, i) => `${d.key}-${i + 1}`) };
    });
    return { c, list, earned: list.flatMap(d => d.ids) };
  }

  // ---- синхронизация и «Новое достижение!» ----
  const seenKey = () => 'achSeen:' + ((window.tgUser && window.tgUser.id) || '');
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* без хранилища карточка покажется ещё раз */ } },
  };
  const all = () => new Set([...(window.tgAch || []), ...(last ? last.earned : [])]);
  let last = null, queue = [], toastOn = false, syncing = false;

  function sync(earned) {
    if (!window.tgApi || !window.tgAch || syncing) return;
    const add = earned.filter(id => !window.tgAch.includes(id));
    if (!add.length) return;
    syncing = true;
    window.tgApi('ach_sync', { ids: add }).then(r => { syncing = false; if (r && Array.isArray(r.ach)) window.tgAch = r.ach; });
  }
  function announce(earned) {
    const seen = store.get(seenKey());
    // первый подсчёт на этом устройстве: всё уже полученное отмечаем без карточек, чтобы не засыпать ими ученика
    if (!Array.isArray(seen)) { store.set(seenKey(), [...all()]); return; }
    const fresh = earned.filter(id => !seen.includes(id));
    if (!fresh.length) return;
    store.set(seenKey(), seen.concat(fresh));
    // по одной карточке на достижение — высшая новая ступень
    const top = {};
    fresh.forEach(id => { const k = id.replace(/-\d+$/, ''), n = +id.match(/\d+$/)[0]; if (!top[k] || n > top[k]) top[k] = n; });
    Object.entries(top).forEach(([k, n]) => { const d = last.list.find(x => x.key === k); if (d) queue.push({ d, n }); });
    showToast();
  }
  function showToast() {
    if (toastOn || !queue.length) return;
    const { d, n } = queue.shift(), el = $('ach-toast');
    if (!el) return;
    toastOn = true;
    el.innerHTML = `<span class="ach-ic t${tierClass(n, d.tiers.length)}">${d.icon}</span><span><b>Новое достижение!</b><br>${esc(d.name)}${d.tiers.length > 1 ? `, ступень ${n} из ${d.tiers.length}` : ''}<br><small>${esc(d.desc(d.tiers[n - 1]))}</small></span>`;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add('on'));
    try { window.Telegram.WebApp.HapticFeedback.notificationOccurred('success'); } catch (e) { /* не в Телеграме */ }
    const close = () => { el.classList.remove('on'); setTimeout(() => { el.hidden = true; toastOn = false; showToast(); }, 300); };
    el.onclick = () => { clearTimeout(el._t); close(); const a = $('ach'); if (a) { a.open = true; a.scrollIntoView({ behavior: 'smooth' }); } };
    el._t = setTimeout(close, 4500);
  }

  // ---- блок «Достижения» ----
  // цвет значка по ступени: бронза, серебро, золото (у последней ступени всегда золото)
  const tierClass = (lvl, n) => !lvl ? 0 : lvl >= n ? 3 : n <= 3 ? lvl : Math.min(3, Math.ceil(3 * lvl / n));
  // Полоска серии наверху экрана: огонёк с числом дней и текущая неделя кружочками (пн–вс).
  // Закрашен день, когда решена хотя бы одна задача; сегодняшний обведён, пока задача не решена.
  function renderStreak(s) {
    const el = $('streak');
    if (!el) return;
    el.hidden = false;
    const mon = s.todayN - ((new Date().getDay() + 6) % 7);
    const dots = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((n, i) => {
      const d = mon + i, cls = s.days.has(d) ? 'y' : d === s.todayN ? 'now' : d < s.todayN ? 'miss' : '';
      return `<span class="sd ${cls}"><i>${s.days.has(d) ? '✓' : ''}</i>${n}</span>`;
    }).join('');
    const text = s.today ? 'Сегодня засчитано. Так держать!'
      : s.cur ? 'Решите сегодня задачу, чтобы серия не прервалась.' : 'Решите сегодня задачу, чтобы начать серию.';
    el.innerHTML = `<div class="st-n${s.today ? ' on' : ''}" title="Серия: дни подряд с решённой задачей"><span>🔥</span><b>${s.cur}</b></div>
      <div class="st-b"><div class="st-t"><b>${s.cur ? `Серия: ${days(s.cur)}` : 'Серия дней'}</b> <span class="muted">${text}</span></div><div class="st-w">${dots}</div></div>`;
  }

  function render() {
    const box = $('ach');
    if (!box) return;
    last = compute();
    if (!last) { box.hidden = true; return; }
    box.hidden = false;
    renderStreak(last.c.streak);
    renderQuests(window.achCtx());
    const have = all();
    // полученные ступени, сохранённые раньше (например, номер КИМ освоен, а теперь просит повторения), тоже считаются
    last.list.forEach(d => { const saved = d.tiers.filter((t, i) => have.has(`${d.key}-${i + 1}`)).length; if (saved > d.level) d.level = saved, d.next = d.tiers[saved]; });
    const total = last.list.reduce((a, d) => a + d.tiers.length, 0), got = last.list.reduce((a, d) => a + d.level, 0);
    const s = last.c.streak;
    $('ach-count').textContent = `${got} из ${total}`;
    $('ach-body').innerHTML = `
      <p class="ach-streak">${s.cur ? `🔥 Серия: <b>${days(s.cur)}</b>${s.today ? '' : ' — решите сегодня задачу, чтобы её продолжить'}` : '🔥 Решите сегодня хотя бы одну задачу, чтобы начать серию.'}${s.best > s.cur ? ` <span class="muted">Лучшая: ${days(s.best)}.</span>` : ''}</p>
      <div class="ach-grid">${last.list.map(d => {
        const tc = tierClass(d.level, d.tiers.length), done = d.level >= d.tiers.length;
        const goal = done ? d.tiers[d.tiers.length - 1] : d.next, v = Math.min(d.val, goal);
        return `<div class="ach-b${d.level ? '' : ' off'}" title="${esc(d.desc(goal))}">
          <span class="ach-ic t${tc}">${d.icon}</span>
          <span class="ach-n">${esc(d.name)}</span>
          <span class="ach-lv">${d.tiers.map((t, i) => `<i class="${i < d.level ? 'y' : ''}"></i>`).join('')}</span>
          <span class="ach-d">${esc(d.desc(goal))}</span>
          ${done ? '<span class="ach-p okc">Все ступени ✓</span>' : `<span class="ach-p">${v} / ${goal}</span><div class="bar"><span style="width:${100 * v / goal}%"></span></div>`}
        </div>`;
      }).join('')}</div>
      <div class="ach-rate">
        <h3 class="ph">Рейтинг</h3>
        <p class="muted small">Общий рейтинг всех учеников. Вместо имён — псевдонимы, ваша строка подсвечена.</p>
        <div class="seg" role="tablist"><button type="button" data-rt="week" aria-pressed="${rt === 'week'}">За неделю</button><button type="button" data-rt="all" aria-pressed="${rt === 'all'}">За всё время</button></div>
        <div id="ach-rt">${rating ? rateHtml() : '<p class="muted small">Загружаю…</p>'}</div>
      </div>`;
    sync(last.earned);
    announce(last.earned);
    if (box.open && !rating) loadRating();
  }

  // ---- рейтинг ----
  let rating = null, rt = 'week', loading = false;
  function loadRating(force) {
    if (!window.tgApi || loading || (rating && !force)) return;
    loading = true;
    window.tgApi('rating').then(r => {
      loading = false;
      rating = r || { fail: true };
      if (r && r.nick) window.tgNick = r.nick;
      const el = $('ach-rt');
      if (el) el.innerHTML = rateHtml();
    });
  }
  function rateHtml() {
    if (!rating || rating.fail) return '<p class="muted small">Рейтинг пока недоступен. Попробуйте позже.</p>';
    const rows = rating[rt] || [], unit = rt === 'week' ? n => tasksN(n).replace('задачу', 'задача') : n => `${n} ${plural(n, 'достижение', 'достижения', 'достижений')}`;
    const me = rows.find(r => r[3]);
    const list = rows.length ? `<ol class="rt">${rows.map((r, i) => `${i && r[0] - rows[i - 1][0] > 1 && i === rows.length - 1 && r[3] ? '<li class="gap">…</li>' : ''}<li class="${r[3] ? 'me' : ''}"><span class="pl">${r[0]}</span><span class="nk">${esc(r[1])}${r[3] ? ' (вы)' : ''}</span><span class="v">${unit(r[2])}</span></li>`).join('')}</ol>`
      : `<p class="muted small">${rt === 'week' ? 'За эту неделю ещё никто не решал задачи.' : 'Достижений пока ни у кого нет.'}</p>`;
    const meLine = me ? '' : `<p class="small">${rt === 'week' ? 'Решите задачу, чтобы попасть в рейтинг недели.' : 'Получите первое достижение, чтобы попасть в рейтинг.'}</p>`;
    const rule = rt === 'week' ? 'За неделю — разные задачи, решённые верно за последние 7 дней.' : 'За всё время — число полученных ступеней достижений.';
    return `${list}${meLine}<p class="muted small">${rule}</p>
      ${rating.nick ? `<p class="small">Ваш псевдоним: <b>${esc(rating.nick)}</b> <button type="button" class="link" data-nick>Другой псевдоним</button></p>` : ''}`;
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('#ach [data-rt]');
    if (b) { rt = b.dataset.rt; document.querySelectorAll('#ach [data-rt]').forEach(x => x.setAttribute('aria-pressed', x === b)); $('ach-rt').innerHTML = rateHtml(); return; }
    const n = e.target.closest('#ach [data-nick]');
    if (n && window.tgApi) {
      n.disabled = true;
      window.tgApi('nick_new').then(r => { if (r && r.nick) { rating = null; loadRating(true); } else n.disabled = false; });
    }
  });
  document.addEventListener('toggle', e => { if (e.target.id === 'ach' && e.target.open) loadRating(); }, true);
  ['tg-progress', 'tg-attempt', 'lessons-ready', 'bank-ready'].forEach(ev => document.addEventListener(ev, () => { if (window.tgLog) render(); }));
  if (window.lessonsLoad) window.lessonsLoad.then(() => { if (window.tgLog) render(); });
  window.achView = { render, compute, streaks, history };
})();
