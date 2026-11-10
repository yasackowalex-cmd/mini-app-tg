// Уроки по темам курса (out/lessons.json, собирает build_bank.py из lessons/<тема>.md) — вкладка «Уроки».
// Адрес #lessons — список уроков, #lesson=<тема> — урок: видео, конспект и задачи ДЗ.
// ДЗ собрано из задач банка; в темах, где их мало, — свои задачи урока (lessons/tasks, в банк не входят).
// Карточки задач те же, что в банке (их делает app.js), ответы так же идут в прогресс.
// Конспект написан в LaTeX, как условия задач: рамки defbox/notebox/warningbox/solutionbox,
// \keyformula{…} и \section{…} переводятся здесь, остальное — texToHtml (tex.js).
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const load = fetch('out/lessons.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => []);
  window.lessonsLoad = load; // кабинет учителя считает по ним ДЗ уроков

  // ---- конспект ----
  const BOX = { defbox: 'Определение', notebox: '', warningbox: 'Внимание', solutionbox: 'Разбор задачи', critbox: 'Критерии оценивания' };

  // s[i] === '{' → [содержимое, позиция после парной скобки]
  function braced(s, i) {
    let d = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === '{') d++;
      else if (s[j] === '}' && --d === 0) return [s.slice(i + 1, j), j + 1];
    }
    return [s.slice(i + 1), s.length];
  }

  function conspectHtml(src) {
    const slots = [];
    const put = html => `@@${slots.push(html) - 1}@@`;
    let s = src;
    // рамки (внутри них — тот же конспект: формулы, списки, картинки)
    s = s.replace(/\\begin\{(defbox|notebox|warningbox|solutionbox|critbox)\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{\1\}/g, (m, kind, body) =>
      '\n\n' + put(`<div class="lbox ${kind}">${BOX[kind] ? `<div class="lbox-t">${BOX[kind]}</div>` : ''}${conspectHtml(body)}</div>`) + '\n\n');
    // \keyformula{$…$} — главная формула в рамке
    let out = '', i = 0, m;
    const kf = /\\keyformula\s*(?=\{)/g;
    while ((m = kf.exec(s))) {
      const [arg, j] = braced(s, m.index + m[0].length);
      const tex = arg.trim().replace(/^\$+|\$+$/g, '');
      out += s.slice(i, m.index) + '\n\n' + put(`<div class="kf">${window.renderMath(tex, true)}</div>`) + '\n\n';
      i = kf.lastIndex = j;
    }
    s = out + s.slice(i);
    // заголовки разделов
    s = s.replace(/\\(sub)?section\*?\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (m, sub, t) =>
      '\n\n' + put(`<h3 class="lsec${sub ? ' sub' : ''}">${window.texToHtml(t).replace(/^<p>|<\/p>$/g, '')}</h3>`) + '\n\n');
    // картинки: [[img адрес]]
    s = s.replace(/\[\[img ([^\]]+)\]\]/g, (m, src) => '\n\n' + put(`<div class="lfig"><img src="${esc(src)}" alt="Рисунок" loading="lazy"></div>`) + '\n\n');
    let html = window.texToHtml(s);
    html = html.replace(/<p>\s*(@@\d+@@\s*)+<\/p>/g, p => p.replace(/<\/?p>/g, ''));
    let prev;
    do { prev = html; html = html.replace(/@@(\d+)@@/g, (x, n) => slots[+n]); } while (html !== prev);
    return html;
  }

  // ---- видео: YouTube и VK встраиваются плеером, остальное — ссылкой ----
  function videoSrc(url) {
    let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{6,})/);
    if (m) return { name: 'YouTube', src: `https://www.youtube.com/embed/${m[1]}` };
    m = url.match(/vk(?:video)?\.(?:com|ru)\/(?:video|clip)(-?\d+)_(\d+)/);
    if (m) return { name: 'VK Видео', src: `https://vk.com/video_ext.php?oid=${m[1]}&id=${m[2]}&hd=2` };
    return null;
  }
  const frame = src => `<iframe src="${esc(src)}" title="Видео к уроку" allowfullscreen loading="lazy"
    allow="accelerometer; encrypted-media; fullscreen; gyroscope; picture-in-picture"></iframe>`;

  // одно видео на нескольких площадках: один плеер и переключатель (у кого-то не открывается YouTube)
  function videoHtml(urls) {
    const vs = urls.map(videoSrc).filter(Boolean);
    const links = urls.filter(u => !videoSrc(u)).map(u => `<p><a href="${esc(u)}" target="_blank" rel="noopener">Видео к уроку</a></p>`).join('');
    if (!vs.length) return links;
    const seg = vs.length > 1 ? `<div class="seg lvsrc">${vs.map((v, i) =>
      `<button type="button" data-src="${esc(v.src)}" aria-pressed="${!i}">${v.name}</button>`).join('')}</div>` : '';
    return `<div class="lvideo">${frame(vs[0].src)}</div>${seg}${links}`;
  }

  // задачи банка появляются после загрузки банка (app.js)
  const bankReady = new Promise(ok => {
    if (window.bankView) ok();
    else document.addEventListener('bank-ready', ok, { once: true });
  });

  function hwTasks(L) {
    const own = Object.fromEntries((L.tasks || []).map(t => [t.id, t]));
    return L.hw.map(id => own[id] || window.bankView.task(id)).filter(Boolean);
  }

  // итог ученика по ДЗ урока (только в Телеграме, где есть журнал ответов): звёзды, как у ДЗ от учителя
  function hwRes(L) {
    if (!window.tgLog || !L.hw.length) return null;
    const { lessonHwResult, hwStars } = window.taskRender;
    const r = lessonHwResult(L.hw, window.tgLog, window.tgReveals || []);
    const st = hwStars(L.hw.length, r.ok.length, r.help.length);
    return { ok: r.ok.length, n: L.hw.length, st, note: st < 3 ? window.taskRender.retryNote(r.help, window.tgReveals || []) : '' };
  }
  function renderRes() {
    const box = $('lesson'), L = list.find(x => x.topic === box.dataset.topic), el = box.querySelector('.lhw-res');
    const r = L && hwRes(L);
    if (el) {
      el.hidden = !r;
      const T = window.taskRender;
      if (r) el.innerHTML = `${r.st ? `<span class="stars" title="${T.STARS_RULE}">${T.starsText(r.st)}</span> ` : ''}${r.ok === r.n ? `Все задачи решены.${r.note ? ' ' + r.note : ''}` : `Решено ${r.ok} из ${r.n}. ${T.STARS_RULE}`}`;
    }
    if (list.length && !$('lessons-list').hidden) renderList();
  }
  ['tg-progress', 'tg-attempt'].forEach(ev => document.addEventListener(ev, renderRes));

  // учителю (в Телеграме): ссылка на урок для учеников. Кто откроет её, попадёт в «Мои ученики»
  // и сразу увидит урок; как решают ДЗ урока, видно в кабинете («Задания» и у ученика).
  const BOT = 'physics_is_phun_bot';
  function renderTeach() {
    const box = $('lesson'), el = box.querySelector('.lteach');
    if (!el || !window.tgTeacher || el.dataset.done) return;
    el.dataset.done = '1';
    el.hidden = false;
    el.innerHTML = `<span class="small">Задать ученикам: отправьте им ссылку на этот урок. Кто откроет её, попадёт в «Мои ученики», а как он решает ДЗ, будет видно в кабинете.</span>
      <span class="hwa"><button class="btn" type="button" data-ls="share">Отправить ссылку</button>
      <button class="btn" type="button" data-ls="copy">Скопировать</button></span>`;
  }
  document.addEventListener('tg-progress', renderTeach);
  $('lesson').addEventListener('click', e => {
    const b = e.target.closest('[data-ls]');
    if (!b) return;
    const box = $('lesson'), L = list.find(x => x.topic === box.dataset.topic);
    if (!L) return;
    const t = window.Telegram && window.Telegram.WebApp;
    // в адресе Телеграма нельзя точки: 3.1.7 → 3-1-7
    const linkOf = code => `https://t.me/${BOT}?startapp=l_${L.topic.replace(/\./g, '-')}${code ? '_' + code : ''}`;
    const text = `ДЗ: урок ${L.topic}. ${L.title}`;
    const copy = url => {
      const done = () => { b.textContent = 'Скопировано'; setTimeout(() => { b.textContent = 'Скопировать'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(text + '\n' + url).then(done, () => prompt('Ссылка:', url));
      else prompt('Ссылка:', url);
    };
    // окно «Поделиться» Телеграм открывает только сразу после нажатия, поэтому код учителя берём заранее
    const go = code => {
      const url = linkOf(code);
      if (b.dataset.ls === 'share' && t && t.openTelegramLink)
        t.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
      else copy(url);
    };
    if (inviteCode !== undefined) { go(inviteCode); return; }
    const label = b.textContent;
    b.textContent = 'Секунду…';
    getInvite().then(c => { b.textContent = label; go(c); });
  });
  let inviteCode;
  const getInvite = () => (window.teacherInvite ? window.teacherInvite() : Promise.resolve(null)).then(c => (inviteCode = c || null));
  document.addEventListener('tg-progress', () => { if (window.tgTeacher) getInvite(); });

  let list = [];
  function show(topic) {
    const box = $('lesson'), lst = $('lessons-list');
    const L = topic && list.find(x => x.topic === topic);
    lst.hidden = !!L;
    box.hidden = !L;
    if (!L) { box.innerHTML = ''; box.dataset.topic = ''; return; }
    if (box.dataset.topic === topic) return;
    box.dataset.topic = topic;
    const i = list.indexOf(L), prev = list[i - 1], next = list[i + 1];
    box.innerHTML = `<p class="lback"><a href="#lessons">← Все уроки</a></p>
      <h2>Урок ${esc(L.topic)}. ${esc(L.title)}</h2>
      ${L.keywords ? `<p class="lkw">${window.texToHtml(L.keywords).replace(/^<p>|<\/p>$/g, '')}</p>` : ''}
      ${videoHtml(L.video)}
      <details class="lconspect" open><summary>${esc(L.label || 'Конспект')}</summary><div class="cond">${L.conspect != null ? conspectHtml(L.conspect) : '<p class="status">Загружаю…</p>'}</div></details>
      ${L.hw.length ? `<h3 class="lhw" id="lesson-hw">Домашнее задание</h3><div class="lteach" hidden></div><p class="lhw-res cnt" hidden></p><div class="lhw-list"><p class="status">Загружаю задачи…</p></div>` : ''}
      ${prev || next ? `<p class="lnext">${prev ? `<a class="btn" href="#lesson=${esc(prev.topic)}">← Предыдущий<small>${esc(prev.topic)} ${esc(prev.title)}</small></a>` : '<span></span>'}${next ? `<a class="btn nx" href="#lesson=${esc(next.topic)}">Следующий →<small>${esc(next.topic)} ${esc(next.title)}</small></a>` : '<span></span>'}</p>` : ''}`;
    box.querySelector('.lvsrc')?.addEventListener('click', e => {
      const b = e.target.closest('[data-src]');
      if (!b) return;
      box.querySelectorAll('.lvsrc [data-src]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      box.querySelector('.lvideo').innerHTML = frame(b.dataset.src);
    });
    // конспект — отдельный файл урока (out/lessons/<тема>.json), чтобы список уроков грузился быстро
    if (L.conspect == null && L.conspect_url) fetch(L.conspect_url).then(r => r.json()).then(c => {
      L.conspect = c.conspect || '';
      if (box.dataset.topic === topic) box.querySelector('.lconspect .cond').innerHTML = conspectHtml(L.conspect);
    }).catch(() => {
      if (box.dataset.topic === topic) box.querySelector('.lconspect .cond').innerHTML = '<p class="status">Не удалось загрузить конспект. Проверьте интернет и откройте урок ещё раз.</p>';
    });
    renderRes();
    renderTeach();
    if (L.hw.length) bankReady.then(() => {
      if (box.dataset.topic !== topic) return;
      const hw = box.querySelector('.lhw-list');
      hw.innerHTML = '';
      // номер задачи в ДЗ — чтобы ученик мог сказать, с какой задачей проблема
      window.bankView.cards(hwTasks(L)).forEach((el, i) => {
        el.querySelector('.meta')?.insertAdjacentHTML('afterbegin', `<span class="chip num">№ ${i + 1}</span>`);
        hw.appendChild(el);
      });
    });
  }

  // 1 задание, 2 задания, 5 заданий
  const tasksWord = n => n % 10 === 1 && n % 100 !== 11 ? 'задание'
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'задания' : 'заданий';

  // в списке уроков: звёзды за ДЗ или сколько решено
  function resText(L) {
    const r = hwRes(L);
    return !r || !r.ok ? '' : ` · ${r.st ? `<span class="stars">${window.taskRender.starsText(r.st)}</span> ` : ''}решено ${r.ok}`;
  }

  function renderList() {
    $('lessons-list').innerHTML = list.length ? `<h2>Уроки по темам</h2>
      <div class="lpick">${list.map(L => `<a class="lbtn" href="#lesson=${esc(L.topic)}"><b>${esc(L.topic)}</b> ${esc(L.title)}
        <small>${L.video.length ? 'видео · ' : ''}${esc((L.label || 'Конспект').toLowerCase())}${L.hw.length ? ` · ДЗ: ${L.hw.length} ${tasksWord(L.hw.length)}` : ''}${resText(L)}</small></a>`).join('')}</div>`
      : '<p class="status">Уроков пока нет.</p>';
  }

  // адрес → вкладка: #lessons или #lesson=<тема> открывают «Уроки» (true), остальное — не наше (false)
  function route() {
    const h = location.hash.slice(1), topic = new URLSearchParams(h).get('lesson');
    if (!topic && h !== 'lessons') return false;
    window.setTab('lessons');
    load.then(() => { show(topic); window.scrollTo(0, 0); });
    return true;
  }

  load.then(l => { list = l; renderList(); });
  // нажали вкладку «Уроки» — в адрес #lessons (или открытый урок), чтобы ссылку можно было отправить
  document.addEventListener('tab', e => {
    if (e.detail !== 'lessons') return;
    const t = $('lesson').dataset.topic;
    if (!/^#lesson/.test(location.hash)) history.replaceState(null, '', t && !$('lesson').hidden ? '#lesson=' + t : '#lessons');
  });

  window.lessonView = { route };
})();
