// LaTeX-разметка условий → HTML для показа в браузере.
// Формулы рисует KaTeX, текстовые команды (таблицы, списки, \textbf и т.п.) переводятся в HTML.
// Неизвестные команды остаются как есть: так их видно и можно поправить в исходнике.
(function () {
  'use strict';

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // s[i] === '{' → [содержимое, позиция после парной скобки]
  function braced(s, i) {
    let depth = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
    }
    return [s.slice(i + 1), s.length];
  }

  // заменить \cmd{arg}... (n аргументов, опц. [..] в начале) результатом fn(args)
  function replaceCmd(s, name, n, fn) {
    const re = new RegExp('\\\\' + name + '(?![a-zA-Z])', 'g');
    let out = '', last = 0, m;
    while ((m = re.exec(s))) {
      let i = m.index + m[0].length;
      while (s[i] === ' ') i++;
      if (s[i] === '[') { const k = s.indexOf(']', i); if (k > 0) i = k + 1; }
      const args = [];
      for (let a = 0; a < n; a++) {
        while (s[i] === ' ' || s[i] === '\n') i++;
        if (s[i] !== '{') break;
        const [v, j] = braced(s, i); args.push(v); i = j;
      }
      if (args.length < n) continue;
      out += s.slice(last, m.index) + fn(args);
      last = i; re.lastIndex = i;
    }
    return out + s.slice(last);
  }

  function renderMath(src, display) {
    try {
      // индекс без основы ($^A_Z X$, \,^7_3 Li) KaTeX не принимает: подставляем пустую основу
      src = src.replace(/^(\s*)([\^_])/, '$1{}$2').replace(/(\\[,;:!])(\s*)([\^_])/g, '$1$2{}$3');
      return katex.renderToString(src, { displayMode: display, throwOnError: false, strict: 'ignore' });
    } catch (e) {
      return '<code>' + esc(src) + '</code>';
    }
  }

  // текстовые команды внутри абзаца, ячейки или пункта списка
  function inline(s) {
    for (let k = 0; k < 3; k++) {
      s = replaceCmd(s, 'textbf', 1, a => `<b>${a[0]}</b>`);
      s = replaceCmd(s, '(?:textit|emph)', 1, a => `<i>${a[0]}</i>`);
      s = replaceCmd(s, 'underline', 1, a => `<u>${a[0]}</u>`);
      s = replaceCmd(s, '(?:text|mbox|textrm|textup)', 1, a => a[0]);
    }
    return s.replace(/\\q?quad(?![a-zA-Z])/g, '&emsp;')
      .replace(/\{,\}/g, ',')
      .replace(/~/g, '&nbsp;')
      .replace(/---/g, '—').replace(/--/g, '–')
      .replace(/\\\\(?:\[[^\]]*\])?/g, '\n')
      .replace(/\\([%&#_$])/g, '$1')
      .replace(/\\,/g, '&thinsp;');
  }

  function texToHtml(src) {
    const slots = [];
    const put = (html, block) => {
      slots.push(html);
      return (block ? '\u0001' : '\u0002') + (slots.length - 1) + (block ? '\u0001' : '\u0002');
    };

    let s = src.replace(/\r\n/g, '\n');
    s = s.replace(/\\begin\{solutionbox\}[\s\S]*?\\end\{solutionbox\}/g, '');
    s = s.replace(/(^|[^\\])%[^\n]*/g, '$1');   // комментарии, но не \%

    // 1. формулы → KaTeX (до любой другой обработки текста)
    s = s.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$((?:\\\$|[^$])+?)\$|\\\(([\s\S]+?)\\\)/g,
      (m, d1, d2, i1, i2) => d1 || d2 ? put(renderMath(d1 || d2, true), true) : put(renderMath(i1 || i2, false), false));

    s = esc(s);

    // 2. служебное оформление печатной версии
    s = s.replace(/\\(nopagebreak|smallskip|medskip|bigskip|hfill|centering|small|footnotesize|normalsize|noindent|newpage)(?![a-zA-Z])/g, '');
    s = replaceCmd(s, '(?:vspace|hspace)\\*?', 1, () => ' ');
    s = replaceCmd(s, 'includegraphics', 1, () => '');
    s = replaceCmd(s, 'answer', 1, () => '');
    s = replaceCmd(s, 'kim(?:avt)?', 1, () => '');
    s = s.replace(/\\begin\{(center|stylebasic|flushleft|flushright)\}|\\end\{(center|stylebasic|flushleft|flushright)\}/g, '\n');
    s = replaceCmd(s, 'begin\\{minipage\\}', 1, () => '\n');
    s = s.replace(/\\end\{minipage\}/g, '\n');

    // 3. таблицы, начиная с самых вложенных
    const TAB = /\\begin\{tabular\}\s*(?:\[[^\]]*\])?\s*\{((?:[^{}]|\{[^{}]*\})*)\}((?:(?!\\begin\{tabular\})[\s\S])*?)\\end\{tabular\}/;
    let guard = 0, m;
    while ((m = TAB.exec(s)) && guard++ < 50) {
      const body = m[2].replace(/\\(hline|toprule|midrule|bottomrule)/g, '').replace(/\\cline\{[^}]*\}/g, '');
      const rows = body.split(/\\\\(?:\[[^\]]*\])?/).map(r => r.trim()).filter(r => r.replace(/&amp;|\s/g, ''));
      const html = rows.map(r => '<tr>' + r.split('&amp;').map(c => {
        let span = '';
        c = replaceCmd(c, 'multicolumn', 3, a => { span = ` colspan="${parseInt(a[0], 10) || 1}"`; return a[2]; });
        c = replaceCmd(c, 'multirow', 3, a => a[2]);
        return `<td${span}>${inline(c.trim()).replace(/\n+/g, '<br>')}</td>`;
      }).join('') + '</tr>').join('');
      s = s.slice(0, m.index) + put(`<div class="tblwrap"><table>${html}</table></div>`, true) + s.slice(m.index + m[0].length);
    }

    // 4. списки
    s = s.replace(/\\begin\{(enumerate|itemize)\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{\1\}/g, (m, kind, body) => {
      const items = body.split(/\\item(?![a-zA-Z])/).slice(1).map(x => `<li>${inline(x.trim()).replace(/\n+/g, ' ')}</li>`).join('');
      return put(kind === 'enumerate' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`, true);
    });

    // 5. оформление текста
    s = inline(s);

    // 6. абзацы: пустая строка — новый абзац, одиночный перенос — перенос строки
    const html = s.split(/\n[ \t]*\n+/).map(p => p.trim()).filter(Boolean).map(p => {
      if (/^(\u0001\d+\u0001\s*)+$/.test(p)) return p;
      return '<p>' + p.replace(/\s*\n\s*/g, '<br>') + '</p>';
    }).join('');

    // вставленные куски могут сами содержать метки (таблица в таблице), поэтому до упора
    let res = html, prev;
    do { prev = res; res = res.replace(/[\u0001\u0002](\d+)[\u0001\u0002]/g, (m, n) => slots[+n]); } while (res !== prev);
    return res;
  }

  window.texToHtml = texToHtml;
  window.renderMath = renderMath;
})();
