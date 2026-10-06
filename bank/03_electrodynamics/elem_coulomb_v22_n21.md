---
id: elem_coulomb_v22_n21
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: качественная
variant: 22
answer: "L/3"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

Два положительных точечных заряда $q$ и $4q$ закреплены на расстоянии $L$ друг от друга. Где на отрезке, соединяющем эти заряды, следует поместить третий точечный заряд $-q_0$, чтобы он находился в равновесии? Укажите расстояние от заряда $q$ до заряда $-q_0$. Ответ обоснуйте, указав используемые физические закономерности.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,1);
    \draw[-{Stealth[scale=0.8]}, black, thick] (-0.5,0) -- (4.5,0) node[right] {$x$};
    
    \coordinate (Q1) at (0,0);
    \coordinate (Q2) at (3,0);
    
    \fill[black] (Q1) circle (2pt) node[above] {$+q$};
    \fill[black] (Q2) circle (2pt) node[above] {$+4q$};
    
    \node[below] at (0,0) {$0$};
    \node[below] at (3,0) {$L$};
\end{tikzpicture}
```

## Решение

TODO
