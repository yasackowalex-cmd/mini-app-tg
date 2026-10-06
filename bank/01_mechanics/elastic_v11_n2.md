---
id: elastic_v11_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: СИЛА УПРУГОСТИ (ЗАКОН ГУКА)
topic: 1.2.4
level: Б
type: расчётная
variant: 11
answer: "150 Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: упругость.tex
---

## Условие

На рисунке приведён график зависимости модуля силы упругости $F$ пружины от её удлинения $\Delta l$. Чему равна жёсткость этой пружины?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.5cm, y=0.4cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=2, gray!30, thin] (0,0) grid (4,8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$\Delta l, \text{ см}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,8.5) node[above] {$F, \text{ Н}$};
    \foreach \x in {1,2,3,4} \node[below] at (\x,0) {\x};
    \foreach \y in {2,4,6,8} \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (4,6);
    \fill[black] (4,6) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
