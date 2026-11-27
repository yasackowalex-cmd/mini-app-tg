---
id: fipi_DA7AD2
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "12"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание DA7AD2)
---

## Условие

На рисунке показан график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Какова проекция $a_x$ ускорения этого тела в интервале времени от $1$ до $2$~с?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.7cm, y=0.16cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=4, gray!30, thin] (0,-12) grid (6,12);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (7.2,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-12) -- (0,16.8) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,12) {$12$};
    \node[left] at (0,8) {$8$};
    \node[left] at (0,4) {$4$};
    \node[left] at (0,-4) {$-4$};
    \node[left] at (0,-8) {$-8$};
    \node[left] at (0,-12) {$-12$};
    \node[left] at (0,0) {$0$};
    \node[below] at (2,0) {$2$};
    \node[below] at (4,0) {$4$};
    \node[below] at (6,0) {$6$};
    \draw[ultra thick, brandPrimary] (0,8) -- (1,0) -- (2,12) -- (3,12) -- (4,-4) -- (6,-12);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

От $1$ до $2$~с график — отрезок прямой. Проекция скорости выросла от $0$ до $12$~м/с за $1$~с:
$$a_x = \frac{12 - 0}{1} = 12~\text{м/с}^2.$$
