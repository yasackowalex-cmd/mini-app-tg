---
id: fipi_C5B0B3
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "4"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание C5B0B3)
---

## Условие

На рисунке показан график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Какова проекция $a_x$ ускорения этого тела в интервале времени от $4$ до $6$~с?

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
    \draw[ultra thick, brandPrimary] (0,-8) -- (1,0) -- (2,-12) -- (3,-12) -- (4,4) -- (6,12);
\end{tikzpicture}
```

## Подсказка

На прямом участке $a_x = \dfrac{\Delta v_x}{\Delta t}$.

## Решение

От $4$ до $6$~с график — отрезок прямой. Проекция скорости выросла от $4$ до $12$~м/с за $2$~с:
$$a_x = \frac{12 - 4}{2} = 4~\text{м/с}^2.$$
