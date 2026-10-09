---
id: optics_lens_inside_focus
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная
variant: 
answer: "3"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА, ЛИНЗЫ, ПОСТРОЕНИЕ_ИЗОБРАЖЕНИЙ]
source: len.tex
---

## Условие

Какая из точек (1, 2, 3 или 4) является изображением точечного источника $S$, создаваемым тонкой собирающей линзой с фокусным расстоянием $F$ (см. рисунок)?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-3,-2) grid (3,2);
    
    \draw[thick, black] (-3,0) -- (3,0);
    \draw[ultra thick, black, <->] (0,-1.8) -- (0,1.8);
    
    \draw[thick, black] (-1,0.1) -- (-1,-0.1) node[below] {$F$};
    \draw[thick, black] (1,0.1) -- (1,-0.1) node[below] {$F$};
    
    \node at (0.5,0.8) {\textbf{$\sun$}};
    \node[right] at (0.5,0.7) {$S$};
    
    \fill[black] (0.5,-0.6) circle (1.5pt) node[below] {1};
    \fill[black] (0.8,1.4) circle (1.5pt) node[above] {2};
    \fill[black] (-2.2,-0.8) circle (1.5pt) node[left] {3};
    \fill[black] (-1.2,-0.6) circle (1.5pt) node[below] {4};
    
    \node[below left] at (-3,-2) {0};
\end{tikzpicture}
```

## Решение

TODO
