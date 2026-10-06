---
id: oscillations_v6_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5
level: Б
type: расчётная
variant: 6
answer: "1,6"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: osc.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ от времени $t$ для одной из точек колеблющейся струны. Какой путь проходит точка струны за два периода колебаний?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=8cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=0.1, gray!30, thin] (0,-0.2) grid (11,0.2);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (12,0) node[right] {$t, 10^{-3}\text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-0.22) -- (0,0.25) node[above] {$x, \text{ см}$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \foreach \y in {-0.2,-0.1,0.1,0.2} \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] plot[domain=0:11, samples=200] (\x, {0.2*cos(\x*360/8)});
    \fill[black] (0,0.2) circle (1.5pt);
    \fill[black] (2,0) circle (1.5pt);
    \fill[black] (4,-0.2) circle (1.5pt);
    \fill[black] (6,0) circle (1.5pt);
    \fill[black] (8,0.2) circle (1.5pt);
    \fill[black] (10,0) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
