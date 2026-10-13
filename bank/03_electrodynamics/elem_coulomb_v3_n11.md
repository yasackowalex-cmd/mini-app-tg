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
unit: "кВ/м"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

В вершинах $A$ и $B$ равнобедренного прямоугольного треугольника $ABC$ с прямым углом $C$ и катетами $a = 10\text{ см}$ расположены точечные заряды $q_A = +3\text{ нКл}$ и $q_B = -4\text{ нКл}$. Найдите модуль напряжённости электрического поля этих зарядов в точке $C$. Ответ выразите в кВ/м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \coordinate (A) at (1,3);
    \coordinate (B) at (3,1);
    \coordinate (C) at (1,1);
    
    \draw[thick, gray] (A) -- (B) -- (C) -- cycle;
    \draw[gray] ($(C)+(0.22,0)$) -- ($(C)+(0.22,0.22)$) -- ($(C)+(0,0.22)$);
    \node[left] at ($(A)!0.5!(C)$) {$a$};
    \node[below] at ($(C)!0.5!(B)$) {$a$};
    
    \fill[black] (A) circle (2pt) node[above right] {$A$ ($q_A$)};
    \fill[black] (B) circle (2pt) node[below right] {$B$ ($q_B$)};
    \fill[black] (C) circle (2pt) node[below left] {$C$};
    
\end{tikzpicture}
```

## Решение

Каждый заряд создаёт в точке $C$ поле $E = \dfrac{k|q|}{a^2}$. Вектор $\vec E_A$ направлен вдоль $AC$ от заряда $q_A$, вектор $\vec E_B$ — вдоль $CB$ к заряду $q_B$. Угол $C$ прямой, поэтому векторы перпендикулярны.

$$E_A = \frac{9 \cdot 10^9 \cdot 3 \cdot 10^{-9}}{0{,}1^2} = 2700~\text{В/м}, \qquad E_B = \frac{9 \cdot 10^9 \cdot 4 \cdot 10^{-9}}{0{,}1^2} = 3600~\text{В/м}.$$

$$E = \sqrt{E_A^2 + E_B^2} = \sqrt{2700^2 + 3600^2} = 4500~\text{В/м} = 4{,}5~\text{кВ/м}.$$
