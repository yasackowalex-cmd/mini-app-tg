// Уроки по темам курса (out/lessons.json, собирает build_bank.py из lessons/<тема>.md).
// Список уроков — блок «Уроки по темам» на главной; урок открывается по адресу #lesson=<тема>:
// сверху видео и конспект, ниже задачи ДЗ урока (обычные карточки банка, их показывает app.js).
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
  function videoHtml(url) {
    let m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{6,})/);
    if (m) return `<div class="lvideo"><iframe src="https://www.youtube.com/embed/${m[1]}" title="Видео к уроку" allowfullscreen loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
    m = url.match(/vk(?:video)?\.(?:com|ru)\/(?:video|clip)(-?\d+)_(\d+)/);
    if (m) return `<div class="lvideo"><iframe src="https://vk.com/video_ext.php?oid=${m[1]}&id=${m[2]}&hd=2" title="Видео к уроку" allowfullscreen loading="lazy"
      allow="encrypted-media; fullscreen; picture-in-picture"></iframe></div>`;
    return `<p><a href="${esc(url)}" target="_blank" rel="noopener">Видео к уроку</a></p>`;
  }

  function show(topic) {
    const box = $('lesson');
    if (!topic) { box.hidden = true; box.innerHTML = ''; box.dataset.topic = ''; return; }
    if (box.dataset.topic === topic && !box.hidden) return;
    load.then(list => {
      const L = list.find(x => x.topic === topic);
      if (!L) { box.hidden = true; return; }
      box.dataset.topic = topic;
      box.innerHTML = `<h2>Урок ${esc(L.topic)}. ${esc(L.title)}</h2>
        ${L.keywords ? `<p class="lkw">${window.texToHtml(L.keywords).replace(/^<p>|<\/p>$/g, '')}</p>` : ''}
        ${L.video.map(videoHtml).join('')}
        <details class="lconspect" open><summary>Конспект</summary><div class="cond">${conspectHtml(L.conspect)}</div></details>
        ${L.hw.length ? `<p class="lhw"><a href="#viewbar" class="btn">К домашнему заданию: задач ${L.hw.length}</a></p>` : ''}`;
      box.hidden = false;
    });
  }

  // ---- список уроков на главной ----
  load.then(list => {
    const box = $('lessons-top');
    if (!list.length || !box) return;
    box.querySelector('.lpick').innerHTML = list.map(L =>
      `<a class="lbtn" href="#lesson=${esc(L.topic)}"><b>${esc(L.topic)}</b> ${esc(L.title)}</a>`).join('');
    box.hidden = false;
  });

  // для app.js: урок по коду темы ({topic, title, hw, …} или null) и показ его шапки над задачами
  window.lessonView = {
    get: topic => load.then(list => list.find(x => x.topic === topic) || null),
    show,
  };
})();
