---
id: fipi_FCB3C2
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
source: Открытый банк заданий ФИПИ, ЕГЭ (задание FCB3C2)
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Определите проекцию ускорения этого тела $a_x$ в интервале времени от $10$ до $15$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.35cm, y=0.15cm, every node/.style={font=\footnotesize}]
    % Сетка
    \draw[xstep=5, ystep=5, gray!30, thin] (0,-20) grid (30,15);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (33,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-20) -- (0,18) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,15) {$15$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[below left] at (0,0) {$0$};
    \node[left] at (0,-5) {$-5$};
    \node[left] at (0,-10) {$-10$};
    \node[left] at (0,-15) {$-15$};
    \node[left] at (0,-20) {$-20$};
    \node[below] at (5,0) {$5$};
    \node[below] at (10,0) {$10$};
    \node[below] at (15,0) {$15$};
    \node[below] at (20,0) {$20$};
    \node[below] at (25,0) {$25$};
    \node[below] at (30,0) {$30$};
    % График
    \draw[ultra thick, brandPrimary] (0,15) -- (5,0) -- (10,-15) -- (15,10) -- (20,0) -- (30,-20);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

От $10$ до $15$~с проекция скорости изменилась от $-15$ до $10$~м/с:
$$a_x = \frac{10 - (-15)}{5} = 5~\text{м/с}^2.$$
