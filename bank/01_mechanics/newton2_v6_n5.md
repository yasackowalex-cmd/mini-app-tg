---
id: newton2_v6_n5
exam: ЕГЭ
kim: 5
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА И КРИВОЛИНЕЙНОЕ ДВИЖЕНИЕ)
topic: 1.2.2
level: Б
type: соответствие/выбор
variant: 6
answer: "14"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

Два тела, каждое массой $2$~кг, движутся по одной прямой, вдоль которой направлена ось $Ox$. На рисунке приведены графики зависимости проекций $v_x$ их скоростей от времени $t$.

Из приведённого ниже списка выберите все верные утверждения о движении тел.

1) Равнодействующая сил, действующих на тело 1, остаётся в течение всего времени наблюдения постоянной.
2) В промежутке времени от $0$ до $14$~с тела двигались в одном направлении.
3) Кинетическая энергия тела 2 за промежуток времени от $6$ до $14$~с увеличилась в $2$ раза.
4) Путь, пройденный телом 1 за промежуток времени от $0$ до $18$~с, меньше пути, пройденного телом 2 за тот же промежуток времени.
5) Модуль импульса тела 2 в момент времени $t=10$~с равен $6$~\text{кг}$\cdot$\text{м/с}.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.4cm, y=0.35cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=1, gray!30, thin] (0,0) grid (18,7);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (19.5,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,7.5) node[above] {$v_x, \text{ м/с}$};
    \foreach \y in {2,4,6} \node[left] at (0,\y) {\y};
    \foreach \x in {4,8,12,16} \node[below] at (\x,0) {\x};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,7) -- (18,2.8) node[right, black] {1};
    \draw[ultra thick, brandAccent] (0,0.5) -- (18,5.7) node[right, black] {2};
\end{tikzpicture}
```

## Решение

TODO
