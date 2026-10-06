---
id: elastic_v5_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: СИЛА УПРУГОСТИ (ЗАКОН ГУКА)
topic: 1.2.4
level: Б
type: расчётная
variant: 5
answer: "400 Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: упругость.tex
---

## Условие

На рисунке приведён график зависимости модуля силы упругости $F$ пружины от её удлинения $x$. Чему равна жёсткость этой пружины?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.2cm, y=0.15cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=2, gray!30, thin] (0,0) grid (5,24);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (5.5,0) node[right] {$x, \text{ см}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,25) node[above] {$F, \text{ Н}$};
    \foreach \x in {1,2,3,4,5} \node[below] at (\x,0) {\x};
    \foreach \y in {4,8,12,16,20,24} \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (5,20);
    \fill[black] (5,20) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
