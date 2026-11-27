---
id: fipi_428cFB
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "2"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 428cFB)
---

## Условие

На рисунке показан график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Какова проекция $a_x$ ускорения тела в интервале времени от $0$ до $10$~с? Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.13cm, y=0.06cm, every node/.style={font=\footnotesize}]
    \draw[xstep=5, ystep=10, gray!30, thin] (0,-20) grid (45,30);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (51,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-20) -- (0,42) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,30) {$30$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,-10) {$-10$};
    \node[left] at (0,-20) {$-20$};
    \node[left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    \draw[ultra thick, brandPrimary] (0,10) -- (10,30) -- (20,-20) -- (23,-20) -- (35,20) -- (42,0);
\end{tikzpicture}
```

## Подсказка

Ускорение равно изменению проекции скорости, делённому на время: $a_x = \dfrac{\Delta v_x}{\Delta t}$.

## Решение

На участке от $0$ до $10$~с график — отрезок прямой, движение равноускоренное. Проекция скорости выросла от $10$ до $30$~м/с:
$$a_x = \frac{v_x - v_{0x}}{t} = \frac{30 - 10}{10} = 2~\text{м/с}^2.$$
