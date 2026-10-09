---
id: elem_coulomb_v4_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: расчётная
variant: 4
answer: "0,5"
unit: "кВ/м"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

В двух вершинах квадрата со стороной $a = 30\text{ см}$ находятся неподвижные точечные заряды $q_1 = +4\text{ нКл}$ и $q_2 = -4\text{ нКл}$. Чему равен модуль напряжённости электрического поля этих зарядов в центре квадрата? Ответ выразите в кВ/м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (3,1);
    \coordinate (3) at (3,3);
    \coordinate (4) at (1,3);
    \coordinate (O) at (2,2);
    
    \draw[thick, gray] (1) -- (2) -- (3) -- (4) -- cycle;
    \draw[dashed, gray] (1) -- (3);
    \draw[dashed, gray] (2) -- (4);
    
    \fill[black] (1) circle (2pt) node[below left] {$q_1$};
    \fill[black] (2) circle (2pt) node[below right] {$q_2$};
    \fill[black] (O) circle (2pt) node[above] {$O$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
