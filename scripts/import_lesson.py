# -*- coding: utf-8 -*-
"""
Перенос урока из исходников Александра (папка темы: <код>_chapter.tex — конспект, <код>_hw.tex — ДЗ)
в сайт:
  lessons/<тема>.md                — конспект: шапка (тема, название, ключевые слова, видео, задачи ДЗ),
                                      текст в LaTeX, чертежи TikZ блоками ```latex (как в банке);
  ДЗ урока — задачи банка по теме; где в банке подходящей нет, своя задача ДЗ
  lessons/tasks/les<тема>_n<N>.md (формат задачи банка, но в банк не входит).
Ответы берутся из раздела «Ответы и подсказки» в конце ДЗ; ответ, который не удалось вытащить
автоматически, печатается в отчёт — его надо дописать руками (answer в шапке задачи).
Запуск: python -I scripts/import_lesson.py <папка темы> [--force]
Лекции (_pres.tex) не переносятся: они для учителя.
"""
import re, os, sys, glob, json, argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# раздел банка по коду темы: (папка, раздел, тег)
def section_of(topic):
    if topic.startswith('1.'): return '01_mechanics', 'Механика', 'МЕХАНИКА'
    if topic.startswith('2.'): return '02_mkt', 'МКТ и термодинамика', 'МКТ'
    if topic.startswith('3.'): return '03_electrodynamics', 'Электродинамика', 'ЭЛЕКТРОДИНАМИКА'
    if topic in ('4.1', '4.2', '4.3'): return '04_optics', 'Оптика', 'ОПТИКА'
    return '05_quantum', 'Квантовая физика', 'КВАНТЫ'


# уровни сложности по спецификации ЕГЭ 2027 (решение владельца)
def level_of(kim):
    return 'В' if kim in (24, 25, 26) else 'П' if kim in (5, 9, 14, 21, 22, 23) else 'Б'


def braced(s, i):
    """s[i] == '{' → (содержимое, позиция после парной скобки)."""
    depth = 0
    for j in range(i, len(s)):
        if s[j] == '{': depth += 1
        elif s[j] == '}':
            depth -= 1
            if depth == 0: return s[i + 1:j], j + 1
    return s[i + 1:], len(s)


def body_of(tex):
    """Текст между \\begin{document} и \\end{document}; свои команды из преамбулы без аргументов
    (\\newcommand{\\ac}{a_{\\text{ц}}}) раскрываются — их не знают ни сайт, ни сборка TikZ."""
    m = re.search(r'\\begin\{document\}(.*)\\end\{document\}', tex, re.S)
    body = m.group(1) if m else tex
    pre = tex[:m.start()] if m else ''
    for d in re.finditer(r'\\(?:re)?newcommand\*?\{?\\([a-zA-Z]+)\}?\s*\{', pre):
        i, depth = d.end(), 1
        while i < len(pre) and depth:
            depth += {'{': 1, '}': -1}.get(pre[i], 0); i += 1
        val = pre[d.end():i - 1]
        body = re.sub(r'\\' + d.group(1) + r'(?![a-zA-Z])', lambda _: val, body)
    return body


def clean(s):
    """Печатное оформление, которого нет на сайте."""
    s = re.sub(r'(?m)^\s*%.*\n', '', s)                       # строки-комментарии
    s = re.sub(r'\\setlength\{[^}]*\}\{[^}]*\}', '', s)
    s = re.sub(r'\\(newpage|clearpage|medskip|smallskip|bigskip|noindent)(?![a-zA-Z])', '', s)
    s = re.sub(r'\\vspace\*?\{[^}]*\}', '', s)
    # «\\[0.2em]» на сайте — просто перенос строки (иначе «\[» читается как начало формулы)
    s = re.sub(r'\\\\\[[^\]]*\]', r'\\\\', s)
    # «\vec v\,'» KaTeX не разбирает (штрих после отступа) — штрих к группе: {\vec v}'
    s = re.sub(r"(\\vec\s*\w)\\,'", r"{\1}'", s)
    # «{\small …}» — размер шрифта для печати; на сайте скобки остались бы в тексте.
    # В чертежах не трогаем: там это подпись узла, node{…} без скобок не собирается.
    parts = re.split(r'(\\begin\{tikzpicture\}.*?\\end\{tikzpicture\})', s, flags=re.S)
    for k in range(0, len(parts), 2):
        t = parts[k]
        while (m := re.search(r'\{\\(?:small|footnotesize|scriptsize|large|Large)(?![a-zA-Z])\s*', t)):
            d, j = 1, m.end()
            while j < len(t) and d:
                d += {'{': 1, '}': -1}.get(t[j], 0); j += 1
            t = t[:m.start()] + t[m.end():j - 1] + t[j:]
        parts[k] = t
    s = ''.join(parts)
    s = re.sub(r'\\shead\{', r'\\subsection{', s)                 # заголовки шпаргалки
    s = re.sub(r'\{\\color\{[^}]*\}\\rule\{[^}]*\}\{[^}]*\}\}', '', s)  # цветная линия под шапкой
    s = s.replace('\\emph{Сначала на пальцах.} ', '')    # владелец: эту фразу не используем
    return s


def tikz_blocks(s, label):
    """Чертежи (с окружающим center) → метки [[<label> N]] и список исходников."""
    pics = []
    def put(m):
        pics.append(m.group('pic').strip())
        return f'\n[[{label} {len(pics)}]]\n'
    pat = r'(?:\\begin\{center\}\s*)?(?P<pic>\\begin\{tikzpicture\}.*?\\end\{tikzpicture\}(?:\s*(?:\\hspace\{[^}]*\}|\\quad|\\qquad)?\s*\\begin\{tikzpicture\}.*?\\end\{tikzpicture\})*)(?:\s*\\end\{center\})?'
    s = re.sub(pat, put, s, flags=re.S)
    return s, pics


def latex_blocks(pics):
    return '\n\n'.join(f'```latex\n{p}\n```' for p in pics)


# ---------- конспект ----------
def import_chapter(path, topic):
    body = clean(body_of(open(path, encoding='utf-8').read()))
    title, kw = '', ''
    m = re.search(r'\\begin\{center\}(.*?)\\end\{center\}', body, re.S)
    if m and re.search(r'Глава|Шпаргалка', m.group(1)):
        head = m.group(1)
        t = re.search(r'Глава\s+[\d.]+\.?\s*(.*?)\s*(?:\}|\\\\|\n)', head)
        title = t.group(1).strip() if t else ''
        k = re.search(r'ключевые понятия:\s*(.*)', head, re.S)
        kw = re.sub(r'\s+', ' ', k.group(1)).strip() if k else ''
        body = body[:m.start()] + body[m.end():]
    body, pics = tikz_blocks(body, 'рис')
    # картинки-файлы: \includegraphics{имя} → [[файл имя]], сами файлы кладём в assets/lessons/
    body = re.sub(r'(?:\\begin\{center\}\s*)?\\includegraphics(?:\[[^\]]*\])?\{([^}]*)\}(?:\s*\\end\{center\})?',
                  lambda m: f'\n[[файл {os.path.basename(m.group(1))}]]\n', body)
    body = re.sub(r'\n{3,}', '\n\n', body).strip()
    return title, kw, body, pics


# ---------- ДЗ ----------
TASK_RE = re.compile(r'\\begin\{(taskbasic|taskmedium|taskadvanced)\}(.*?)\\end\{\1\}', re.S)


def import_hw(path):
    src = clean(body_of(open(path, encoding='utf-8').read()))
    tasks = []
    for m in TASK_RE.finditer(src):
        t = m.group(2).strip()
        n = re.match(r'\\textbf\{(\d+)\.\}\s*', t)
        num = int(n.group(1)) if n else len(tasks) + 1
        if n: t = t[n.end():]
        k = re.search(r'\\kim(avt)?\{(\d+)\}', t)
        kim = int(k.group(2)) if k else None
        avt = bool(k and k.group(1))
        t = re.sub(r'\\kim(?:avt)?\{\d+\}', '', t).strip()
        t = re.sub(r'\s*\\emph\{\(подсказка есть\)\}', '', t)
        tasks.append({'n': num, 'kim': kim, 'avt': avt, 'text': t})

    # ответы: после заголовка «Ответы» — «\textbf{N.} …» до следующего номера
    sols = {}
    a = re.search(r'\\hwlevel\{Ответы[^}]*\}\{[^}]*\}(.*)', src, re.S)
    if a:
        ans = a.group(1)
        # эталоны второй части: «Эталон … (задание N)» + solutionbox [+ critbox]
        for e in re.finditer(r'\\textbf\{Эталон[^}]*?(\d+)\)\.?\}\s*(\\begin\{solutionbox\}.*?\\end\{solutionbox\})\s*(\\begin\{critbox\}.*?\\end\{critbox\})?', ans, re.S):
            sb = re.sub(r'\\(begin|end)\{solutionbox\}', '', e.group(2)).strip()
            sb = re.sub(r'^\\textbf\{Задание\s*\d+\.\}\s*', '', sb)
            cb = re.sub(r'\\(begin|end)\{critbox\}', '', e.group(3) or '').strip()
            sols[int(e.group(1))] = (sb + ('\n\n\\textbf{Критерии оценивания}\n\n' + cb if cb else ''), True)
        ans = re.sub(r'\\textbf\{Эталон.*', '', ans, flags=re.S)
        ans = re.sub(r'\\textbf\{(Базовый|Повышенный|Высокий)[^}]*\}(\\\\(\[[^\]]*\])?)?', '', ans)
        parts = re.split(r'\\textbf\{(\d+)\.\}', ans)
        for i in range(1, len(parts) - 1, 2):
            num = int(parts[i])
            if num in sols: continue
            txt = re.sub(r'\\\\(\[[^\]]*\])?\s*$', '', parts[i + 1].strip()).strip()
            sols[num] = (txt, False)
    return tasks, sols


NUM = r'[-−]?\d+(?:[.,]\d+)?'


def guess_answer(task, sol):
    """Ответ для автопроверки из решения: последнее «= число» (части 1) или номера утверждений."""
    if not sol: return ''
    txt, full = sol
    if full or (task['kim'] or 0) >= 21: return ''
    m = re.search(r'ответ:\s*\\textbf\{(\d+)\}', txt)   # «Время — 3, дальность — 1 (ответ: \textbf{31})»
    if m: return m.group(1)
    if re.search(r'выбер', task['text'], re.I):
        m = re.match(r'\s*\\textbf\{([\d\s,и]+)\.?\}', txt)
        if m: return re.sub(r'\D', '', m.group(1))
    if ';' in txt.split('\\emph{Подсказка')[0] and txt.count('=') > 2:
        return ''   # несколько искомых величин — проверка по решению
    main = txt.split('\\emph{Подсказка')[0]
    nums = re.findall(r'=\s*(' + NUM + r')\s*(?:\$|~)', main)
    if nums: return nums[-1].replace('.', ',').replace('−', '-')
    return ''


def guess_unit(task, sol):
    if not sol or sol[1]: return ''
    m = re.findall(r'=\s*' + NUM + r'\s*\$?~([^\s.;,$]+(?:\$\^\{?-?\d\}?\$)?)', sol[0].split('\\emph{Подсказка')[0])
    u = m[-1] if m else ''
    for a, b in (('$^2$', '²'), ('$^{2}$', '²'), ('$^3$', '³'), ('$^{3}$', '³')): u = u.replace(a, b)
    return u


def task_type(task):
    k = task['kim'] or 0
    if k >= 22: return 'расчётная (часть 2)'
    if k == 21: return 'качественная'
    if re.search(r'выбер|соответстви|как измен|характер\s+(?:её\s+)?изменени', task['text'], re.I): return 'соответствие/выбор'
    return 'расчётная'


WORD = re.compile(r'[а-яёa-z]{4,}', re.I)


def words(text):
    return {w.lower()[:6] for w in WORD.findall(re.sub(r'\\[a-zA-Z]+', ' ', text))}


def pick_from_bank(t, bank, used, min_sim=0.0):
    """Задача банка вместо задачи ДЗ: та же тема и номер КИМ, тот же вид (выбор или расчёт),
    рисунок, если он был; из подходящих — самая близкая по словам условия."""
    if not t['kim']: return None
    want_pic = r'\begin{tikzpicture}' in t['text'] or 'рисунк' in t['text'].lower()
    ty = task_type(t)
    cand = [b for b in bank if b['id'] not in used and str(b.get('kim')) == str(t['kim'])
            and b.get('type') == ty and 'ВНЕ_ЕГЭ_2027' not in (b.get('tags') or [])]
    w = words(t['text'])
    if min_sim:
        cand = [b for b in cand if len(w & words(b.get('condition', ''))) / (len(w | words(b.get('condition', ''))) or 1) >= min_sim]
    if not cand: return None
    jac = lambda x, y: len(x & y) / (len(x | y) or 1)
    picked = [words(x.get('condition', '')) for x in bank if x['id'] in used]
    def score(b):
        bw = words(b.get('condition', ''))
        # похоже на задачу ДЗ, с рисунком, если он был, и не повторяет уже выбранные (разные вопросы)
        return jac(w, bw) + (0.15 if bool(b.get('images')) == want_pic else 0) - 0.5 * max([jac(bw, x) for x in picked] or [0])
    return max(cand, key=score)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src', help='папка темы, например …/1.1.3')
    ap.add_argument('--force', action='store_true', help='перезаписать существующие файлы')
    a = ap.parse_args()
    topic = os.path.basename(os.path.normpath(a.src))
    code = topic.replace('.', '_')
    folder, section, tag = section_of(topic)
    report = []

    # ДЗ урока собирается из задач банка по теме (решение владельца 22.10): на место каждой задачи
    # исходного ДЗ — задача банка того же номера КИМ; если подходящей в банке нет (или задача
    # без номера КИМ), остаётся своя задача ДЗ: lessons/tasks/<id>.md, в банк она не попадает.
    bank_path = os.path.join(ROOT, 'out', 'bank.json')
    full = json.load(open(bank_path, encoding='utf-8')) if os.path.exists(bank_path) else []
    bank = [b for b in full if b.get('topic') == topic]
    min_sim = 0.0
    if not bank:
        # своих задач у темы в банке нет (РЗ-марафон по разделу) — ищем по всему разделу (1.1.*),
        # но берём только задачи, заметно похожие на задачу ДЗ
        pre = topic.rsplit('.', 1)[0] + '.'
        bank = [b for b in full if str(b.get('topic', '')).startswith(pre)]
        min_sim = 0.2
    used = set()
    hw_ids = []
    hw = glob.glob(os.path.join(a.src, f'{code}_hw.tex'))
    if hw:
        tasks, sols = import_hw(hw[0])
        os.makedirs(os.path.join(ROOT, 'lessons', 'tasks'), exist_ok=True)
        for t in tasks:
            b = pick_from_bank(t, bank, used, min_sim)
            if b:
                used.add(b['id']); hw_ids.append(b['id'])
                report.append(f"№{t['n']} → из банка {b['id']}")
                continue
            tid = f"les{topic.replace('.', '')}_n{t['n']}"
            hw_ids.append(tid)
            report.append(f"№{t['n']} → своя задача {tid}")
            out = os.path.join(ROOT, 'lessons', 'tasks', tid + '.md')
            if os.path.exists(out) and not a.force:
                continue
            text, pics = tikz_blocks(t['text'], 'рис')
            text = re.sub(r'\n{3,}', '\n\n', text).strip()
            sol = sols.get(t['n'])
            ans = guess_answer(t, sol)
            if not ans:
                report.append(f'   {tid}: ответ не найден — проверка «показать ответ»')
                # кнопка «Показать ответ» покажет ответ из «Ответов и подсказок» (без подсказки и чертежей)
                if sol and not sol[1] and 'tikzpicture' not in sol[0]:
                    ans = re.sub(r'\s*\\emph\{(Подсказка|Критерий)[^}]*\}.*', '', sol[0], flags=re.S)
                    ans = re.sub(r'\s+', ' ', ans).strip().replace('"', "'")
            sol_txt = sol[0] if sol else ''
            sol_txt = re.sub(r'\\emph\{Подсказка:\}', '\\\\textbf{Подсказка:}', sol_txt)
            # финальную строку «Ответ: …» в решении не пишем (ответ показывает кнопка), правило владельца
            sol_txt = re.sub(r'\n?\\textbf\{Ответ:\}[^\n]*', '', sol_txt).strip()
            sol_txt, sol_pics = tikz_blocks(sol_txt, 'рис')
            if sol_pics:  # чертёж в ответе (построение векторов и т. п.) — блоком ```latex, как в банке
                it = iter(sol_pics)
                sol_txt = re.sub(r'\[\[рис \d+\]\]', lambda m: '```latex\n' + next(it) + '\n```', sol_txt)
            ty = task_type(t)
            meta = [
                ('id', tid), ('exam', 'ЕГЭ'), ('kim', t['kim'] or ''), ('section', section), ('theme', ''),
                ('topic', topic), ('level', level_of(t['kim'] or 0)), ('type', ty), ('variant', ''),
                ('answer', f'"{ans}"'), ('unit', f'"{guess_unit(t, sol) if ans else ""}"'), ('has_image', 'true' if pics else 'false'),
                ('author_task', 'true' if t['avt'] else 'false'), ('tags', f'[{tag}]'),
                ('source', f'ДЗ к уроку {topic}'),
            ]
            md = '---\n' + '\n'.join(f'{k}: {v}' for k, v in meta) + '\n---\n\n## Условие\n\n' + text + '\n'
            if pics: md += '\n## Рисунок (TikZ)\n\n' + latex_blocks(pics) + '\n'
            md += '\n## Решение\n\n' + (sol_txt or 'TODO') + '\n'
            open(out, 'w', encoding='utf-8', newline='\n').write(md)

    ch = glob.glob(os.path.join(a.src, f'{code}_chapter.tex'))
    sheet = not ch and glob.glob(os.path.join(a.src, f'{code}_cheatsheet.tex'))
    if sheet: ch = sheet   # конспекта нет (РЗ-марафон) — на его месте шпаргалка
    out = os.path.join(ROOT, 'lessons', topic + '.md')
    if ch and (a.force or not os.path.exists(out)):
        old = open(out, encoding='utf-8').read() if os.path.exists(out) else ''
        video = re.search(r'^video: (.*)$', old, re.M)   # ссылки на видео при повторном переносе не теряем
        title, kw, body, pics = import_chapter(ch[0], topic)
        if sheet:
            m = re.search(r'^title: "(.*)"$', old, re.M)
            title = m.group(1) if m else ''
        os.makedirs(os.path.dirname(out), exist_ok=True)
        files = re.findall(r'\[\[файл ([^\]]+)\]\]', body)
        if files:
            os.makedirs(os.path.join(ROOT, 'assets', 'lessons'), exist_ok=True)
            for f in files:
                p = os.path.join(a.src, f)
                if os.path.exists(p):
                    import shutil; shutil.copy(p, os.path.join(ROOT, 'assets', 'lessons', f'{code}_{f}'))
                else:
                    report.append(f'конспект: нет файла {f}')
            body = re.sub(r'\[\[файл ([^\]]+)\]\]', lambda m: f'[[файл {code}_{m.group(1)}]]', body)
        head = [('topic', topic), ('title', f'"{title}"'), ('keywords', f'"{kw}"'),
                ('video', video.group(1) if video else '[]'), ('hw', '[' + ', '.join(hw_ids) + ']')]
        if sheet: head.append(('label', '"Шпаргалка"'))
        md = '---\n' + '\n'.join(f'{k}: {v}' for k, v in head) + '\n---\n\n## Конспект\n\n' + body + '\n'
        if pics: md += '\n## Рисунок (TikZ)\n\n' + latex_blocks(pics) + '\n'
        open(out, 'w', encoding='utf-8', newline='\n').write(md)
    print(f'{topic}: задач ДЗ {len(hw_ids)}, {"шпаргалка" if sheet else "конспект"} {"есть" if ch else "нет"}')
    for r in report: print('  ' + r)


if __name__ == '__main__':
    main()
