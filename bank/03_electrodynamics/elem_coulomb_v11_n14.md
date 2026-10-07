---
id: elem_coulomb_v11_n14
exam: ЕГЭ
kim: 14
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: соответствие/выбор
variant: 11
answer: "14"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

На оси $Ox$ расположены два неподвижных точечных заряда: $q_1 = +q$ в точке $x = -a$ и $q_2 = -q$ в точке $x = +a$. Из приведённого ниже списка выберите все верные утверждения относительно электростатического поля, создаваемого этими зарядами.

1) В точке $x = 0$ вектор напряжённости суммарного электрического поля направлен вправо (вдоль оси $Ox$).\\
2) Напряжённость суммарного электрического поля в точке $x = 2a$ равна нулю.\\
3) Потенциал суммарного электрического поля в точке $x = -2a$ равен нулю.\\
4) Проекция вектора напряжённости электрического поля на ось $Ox$ в точке $x = 0$ положительна.\\
5) Модуль напряжённости электрического поля в точке $x = -2a$ больше, чем в точке $x = 0$.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-3,0) grid (3,1);
    \draw[-{Stealth[scale=0.8]}, black, thick] (-3.5,0) -- (3.5,0) node[right] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-0.5) -- (0,1.5) node[above] {$y$};
    
    \coordinate (Q1) at (-2,0);
    \coordinate (Q2) at (2,0);
    
    \fill[black] (Q1) circle (2pt) node[above] {$+q$};
    \fill[black] (Q2) circle (2pt) node[above] {$-q$};
    
    \node[below] at (-2,0) {$-a$};
    \node[below] at (2,0) {$a$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
