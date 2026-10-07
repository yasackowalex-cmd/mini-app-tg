---
id: elem_coulomb_v25_n21
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: качественная
variant: 25
answer: "0"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

В вершинах квадрата со стороной $a$ закреплены четыре точечных заряда: трех из них равны $+q$, а один равен $-q$. Модуль напряжённости суммарного электрического поля этих зарядов в центре квадрата равен $E_0$. Чему станет равен модуль напряжённости поля в центре квадрата, если заряд $-q$ заменить на $+q$? Ответ обоснуйте, указав используемые физические закономерности.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (-0.5,0) -- (3.5,0) node[right] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-0.5) -- (0,3.5) node[above] {$y$};
    
    \coordinate (1) at (0.5,0.5);
    \coordinate (2) at (2.5,0.5);
    \coordinate (3) at (2.5,2.5);
    \coordinate (4) at (0.5,2.5);
    \coordinate (O) at (1.5,1.5);
    
    \draw[thick, gray] (1) -- (2) -- (3) -- (4) -- cycle;
    \draw[dashed, gray] (1) -- (3);
    \draw[dashed, gray] (2) -- (4);
    
    \fill[black] (1) circle (2pt) node[below left] {$+q$};
    \fill[black] (2) circle (2pt) node[below right] {$+q$};
    \fill[black] (3) circle (2pt) node[above right] {$-q$};
    \fill[black] (4) circle (2pt) node[above left] {$+q$};
    \fill[black] (O) circle (1.5pt) node[below] {$O$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
