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
answer: "1,6"
unit: "кВ/м"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

В двух противоположных вершинах квадрата со стороной $a = 30\text{ см}$ находятся неподвижные точечные заряды $q_1 = +4\text{ нКл}$ и $q_2 = -4\text{ нКл}$. Чему равен модуль напряжённости электрического поля этих зарядов в центре квадрата? Ответ выразите в кВ/м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$y$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (3,1);
    \coordinate (3) at (3,3);
    \coordinate (4) at (1,3);
    \coordinate (O) at (2,2);
    
    \draw[thick, gray] (1) -- (2) -- (3) -- (4) -- cycle;
    \draw[dashed, gray] (1) -- (3);
    \draw[dashed, gray] (2) -- (4);
    
    \fill[black] (1) circle (2pt) node[below left] {$q_1$};
    \fill[black] (3) circle (2pt) node[above right] {$q_2$};
    \fill[black] (O) circle (2pt) node[above] {$O$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Заряды находятся на концах диагонали, расстояние от каждого из них до центра $r = \dfrac{a}{\sqrt{2}}$, $r^2 = \dfrac{a^2}{2} = \dfrac{0{,}09}{2} = 0{,}045$~м$^2$.

Напряжённость поля каждого заряда в центре:

$$E_1 = E_2 = \frac{k|q|}{r^2} = \frac{9\cdot10^{9}\cdot 4\cdot10^{-9}}{0{,}045} = 800~\text{В/м}.$$

Поле положительного заряда направлено от него, отрицательного — к нему, поэтому оба вектора направлены вдоль диагонали от $q_1$ к $q_2$ и складываются:

$$E = E_1 + E_2 = 1600~\text{В/м} = 1{,}6~\text{кВ/м}.$$
