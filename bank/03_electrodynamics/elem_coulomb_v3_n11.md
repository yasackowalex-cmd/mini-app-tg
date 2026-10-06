---
id: elem_coulomb_v3_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: расчётная
variant: 3
answer: "4,5"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

В вершинах равнобедренного прямоугольного треугольника $ABC$ с катетами $a = 10\text{ см}$ расположены точечные заряды $q_A = +2\text{ нКл}$ и $q_B = -2\text{ нКл}$. Найдите модуль напряжённости электрического поля этих зарядов в точке $C$. Ответ выразите в кВ/м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$y$};
    
    \coordinate (A) at (1,1);
    \coordinate (B) at (3,1);
    \coordinate (C) at (1,3);
    
    \draw[thick, gray] (A) -- (B) -- (C) -- cycle;
    
    \fill[black] (A) circle (2pt) node[below left] {$A$ ($+q$)};
    \fill[black] (B) circle (2pt) node[below right] {$B$ ($-q$)};
    \fill[black] (C) circle (2pt) node[above left] {$C$};
    
    \node[left] at (0,1) {$1$};
    \node[left] at (0,3) {$3$};
    \node[below] at (1,0) {$1$};
    \node[below] at (3,0) {$3$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
