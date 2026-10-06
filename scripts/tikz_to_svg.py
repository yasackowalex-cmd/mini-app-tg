# -*- coding: utf-8 -*-
"""
Компиляция чертежей TikZ из банка в SVG: bank/**/*.md → assets/<id>_<n>.svg.
Каждый блок ```latex из раздела «## Рисунок (TikZ)» собирается отдельным
standalone-документом: latex → .dvi → dvisvgm (шрифты превращаются в контуры,
SVG не зависит от шрифтов браузера).
Пересобираются только изменённые чертежи (хэш в assets/tikz_manifest.json).

Нужно: TeX Live или MiKTeX с пакетами tikz, pgfplots, babel-russian, и dvisvgm.
Запуск: python -I scripts/tikz_to_svg.py [--force] [--only <id>]
Преамбула: scripts/tikz_preamble.tex — туда же добавлять макросы из egephys-style.sty,
если чертёж их использует.
"""
import re, os, sys, json, glob, shutil, hashlib, argparse, subprocess, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_bank import parse_md  # noqa: E402

DOC = r"""\documentclass[tikz,border=2pt]{standalone}
\def\pgfsysdriver{pgfsys-dvisvgm.def}
%(preamble)s
\begin{document}
%(body)s
\end{document}
"""


def compile_one(src, dst, preamble, tmp):
    tex = os.path.join(tmp, 'pic.tex')
    with open(tex, 'w', encoding='utf-8') as f:
        f.write(DOC % {'preamble': preamble, 'body': src})
    r = subprocess.run(['latex', '-interaction=nonstopmode', '-halt-on-error', 'pic.tex'],
                       cwd=tmp, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0:
        err = [l for l in r.stdout.splitlines() if l.startswith('!') or l.startswith('l.')]
        return ' / '.join(err[:3]) or 'latex упал'
    r = subprocess.run(['dvisvgm', '--no-fonts', '--exact-bbox', '--zoom=1.3',
                        '-o', os.path.abspath(dst), 'pic.dvi'],
                       cwd=tmp, capture_output=True, text=True, encoding='utf-8', errors='replace')
    if r.returncode != 0 or not os.path.exists(dst):
        return 'dvisvgm: ' + (r.stderr.strip().splitlines() or ['ошибка'])[-1]
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bank', default=os.path.join(ROOT, 'bank'))
    ap.add_argument('--assets', default=os.path.join(ROOT, 'assets'))
    ap.add_argument('--preamble', default=os.path.join(ROOT, 'scripts', 'tikz_preamble.tex'))
    ap.add_argument('--force', action='store_true', help='пересобрать все чертежи')
    ap.add_argument('--only', help='только задача с этим id')
    a = ap.parse_args()

    for tool in ('latex', 'dvisvgm'):
        if not shutil.which(tool):
            sys.exit(f'Не найден {tool}: нужен TeX Live или MiKTeX.')

    preamble = open(a.preamble, encoding='utf-8').read()
    os.makedirs(a.assets, exist_ok=True)
    man_path = os.path.join(a.assets, 'tikz_manifest.json')
    manifest = json.load(open(man_path, encoding='utf-8')) if os.path.exists(man_path) else {}

    built, cached, failed = 0, 0, []
    with tempfile.TemporaryDirectory() as tmp:
        for f in sorted(glob.glob(os.path.join(a.bank, '**', '*.md'), recursive=True)):
            t = parse_md(f)
            if a.only and t['id'] != a.only:
                continue
            for i, src in enumerate(t['tikz'], 1):
                name = f"{t['id']}_{i}.svg"
                dst = os.path.join(a.assets, name)
                h = hashlib.sha1((preamble + src).encode('utf-8')).hexdigest()
                if not a.force and manifest.get(name) == h and os.path.exists(dst):
                    cached += 1; continue
                err = compile_one(src, dst, preamble, tmp)
                if err:
                    failed.append((name, err)); manifest.pop(name, None)
                else:
                    manifest[name] = h; built += 1

    with open(man_path, 'w', encoding='utf-8', newline='\n') as fo:
        json.dump(dict(sorted(manifest.items())), fo, ensure_ascii=False, indent=1)
    print(f'SVG собрано: {built}, без изменений: {cached}, с ошибкой: {len(failed)}')
    for name, err in failed:
        print(f'   {name} | {err}')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
