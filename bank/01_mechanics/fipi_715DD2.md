---
id: fipi_715DD2
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "0"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 715DD2)
---

## Условие

Тело движется вдоль оси $Ox$. По графику зависимости проекции скорости тела $v_x$ от времени $t$ установите модуль перемещения тела за время от $t_1 = 6$~с до $t_2 = 10$~с.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.2cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=2.5, gray!30, thin] (0,-5) grid (12,10);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (13.2,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-5) -- (0,13) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[left] at (0,-5) {$-5$};
    \node[left] at (0,0) {$0$};
    \node[below] at (2,0) {$2$};
    \node[below] at (4,0) {$4$};
    \node[below] at (6,0) {$6$};
    \node[below] at (8,0) {$8$};
    \node[below] at (10,0) {$10$};
    \draw[ultra thick, brandPrimary] (0,10) -- (6,-5) -- (12,10);
\end{tikzpicture}
```

## Подсказка

Перемещение равно площади под графиком $v_x(t)$ с учётом знака: площадь над осью времени — со знаком «плюс», под осью — со знаком «минус».

## Решение

Проекция перемещения равна площади под графиком $v_x(t)$ с учётом знака.

От $6$ до $8$~с $v_x < 0$, тело движется против оси: $s_1 = -\dfrac{5\cdot 2}{2} = -5$~м.

От $8$ до $10$~с $v_x > 0$: $s_2 = \dfrac{5\cdot 2}{2} = 5$~м.
$$s_x = -5 + 5 = 0.$$
Тело вернулось в ту же точку, модуль перемещения равен нулю (а путь равен $10$~м).
