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

  let list = [];
  function show(topic) {
    const box = $('lesson'), lst = $('lessons-list');
    const L = topic && list.find(x => x.topic === topic);
    lst.hidden = !!L;
    box.hidden = !L;
    if (!L) { box.innerHTML = ''; box.dataset.topic = ''; return; }
    if (box.dataset.topic === topic) return;
    box.dataset.topic = topic;
    const i = list.indexOf(L), next = list[i + 1];
    box.innerHTML = `<p class="lback"><a href="#lessons">← Все уроки</a></p>
      <h2>Урок ${esc(L.topic)}. ${esc(L.title)}</h2>
      ${L.keywords ? `<p class="lkw">${window.texToHtml(L.keywords).replace(/^<p>|<\/p>$/g, '')}</p>` : ''}
      ${videoHtml(L.video)}
      <details class="lconspect" open><summary>Конспект</summary><div class="cond">${conspectHtml(L.conspect)}</div></details>
      ${L.hw.length ? `<h3 class="lhw" id="lesson-hw">Домашнее задание</h3><div class="lhw-list"><p class="status">Загружаю задачи…</p></div>` : ''}
      ${next ? `<p class="lnext"><a class="btn" href="#lesson=${esc(next.topic)}">Следующий урок: ${esc(next.topic)} ${esc(next.title)} →</a></p>` : ''}`;
    box.querySelector('.lvsrc')?.addEventListener('click', e => {
      const b = e.target.closest('[data-src]');
      if (!b) return;
      box.querySelectorAll('.lvsrc [data-src]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      box.querySelector('.lvideo').innerHTML = frame(b.dataset.src);
    });
    if (L.hw.length) bankReady.then(() => {
      if (box.dataset.topic !== topic) return;
      const hw = box.querySelector('.lhw-list');
      hw.innerHTML = '';
      window.bankView.cards(hwTasks(L)).forEach(el => hw.appendChild(el));
    });
  }

  function renderList() {
    $('lessons-list').innerHTML = list.length ? `<h2>Уроки по темам</h2>
      <div class="lpick">${list.map(L => `<a class="lbtn" href="#lesson=${esc(L.topic)}"><b>${esc(L.topic)}</b> ${esc(L.title)}
        <small>${L.video.length ? 'видео · ' : ''}конспект${L.hw.length ? ` · ДЗ: ${L.hw.length}` : ''}</small></a>`).join('')}</div>`
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
