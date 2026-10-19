"""Собирает 10 постоянных пробных вариантов ЕГЭ (exams/variants.json): по задаче на каждый номер КИМ 1–26,
задачи в вариантах не повторяются. В каждом номере берутся задачи разных тем, а распределение по вариантам
подбирается так, чтобы в варианте было побольше разных тем и во второй части (22–26) были разные разделы.
Запуск: python3 scripts/make_variants.py [--seed N]. Повторный запуск с тем же зерном и банком даёт те же варианты."""
import argparse, collections, json, os, random

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
N = 10


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--seed', type=int, default=2027)
    a = ap.parse_args()
    rnd = random.Random(a.seed)
    bank = json.load(open(os.path.join(ROOT, 'out', 'bank.json'), encoding='utf-8'))
    pool = collections.defaultdict(list)
    for t in bank:
        if t['exam'] == 'ЕГЭ' and 'ВНЕ_ЕГЭ_2027' not in (t.get('tags') or []):
            pool[int(t['kim'])].append(t)

    # в каждом номере — N задач по кругу из разных тем
    picked = {}
    for k in range(1, 27):
        by = collections.defaultdict(list)
        for t in sorted(pool[k], key=lambda t: t['id']):
            by[t['topic']].append(t)
        groups = list(by.values())
        rnd.shuffle(groups)
        for g in groups:
            rnd.shuffle(g)
        out = []
        while len(out) < N and any(groups):
            for g in groups:
                if g and len(out) < N:
                    out.append(g.pop())
        if len(out) < N:
            raise SystemExit(f'КИМ {k}: задач меньше {N}')
        picked[k] = out

    def score(vs):
        s = 0
        for v in vs:
            s += len({t['topic'] for t in v}) + 3 * len({t['section'] for t in v[21:26]})
        return s

    best, best_s = None, -1
    for _ in range(3000):
        cols = {k: rnd.sample(picked[k], N) for k in picked}
        vs = [[cols[k][i] for k in range(1, 27)] for i in range(N)]
        s = score(vs)
        if s > best_s:
            best, best_s = vs, s
    data = [{'n': i + 1, 'ids': [t['id'] for t in v]} for i, v in enumerate(best)]
    path = os.path.join(ROOT, 'exams', 'variants.json')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write('\n')
    for i, v in enumerate(best):
        print(i + 1, len({t['topic'] for t in v}), [t['section'][:4] for t in v[21:26]])


if __name__ == '__main__':
    main()
