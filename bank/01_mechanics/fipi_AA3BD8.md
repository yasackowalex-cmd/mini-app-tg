---
id: fipi_AA3BD8
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание AA3BD8)
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Определите проекцию $a_x$ ускорения этого тела в интервале времени от $10$ до $15$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.3cm, y=0.12cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=5, gray!30, thin] (0,-15) grid (20,15);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (21.2,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-15) -- (0,21) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[left] at (0,-5) {$-5$};
    \node[left] at (0,-10) {$-10$};
    \node[left] at (0,-15) {$-15$};
    \node[left] at (0,0) {$0$};
    \node[below] at (5,0) {$5$};
    \node[below] at (10,0) {$10$};
    \node[below] at (15,0) {$15$};
    \node[below] at (20,0) {$20$};
    \draw[ultra thick, brandPrimary] (0,10) -- (2,10) -- (10,-10) -- (15,15) -- (20,15);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

От $10$ до $15$~с график — отрезок прямой. Проекция скорости изменилась от $-10$ до $15$~м/с:
$$a_x = \frac{15 - (-10)}{5} = 5~\text{м/с}^2.$$
