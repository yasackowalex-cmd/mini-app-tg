---
id: dem27_v9_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
variant: 9
answer: "1,5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Демидова, ЕГЭ-2027, 30 вариантов (вариант 9)
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Определите проекцию $a_x$ ускорения тела в интервале времени от $20$ до $30$~с. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.15cm, y=0.12cm, every node/.style={font=\footnotesize}]
    \draw[xstep=5, ystep=5, gray!30, thin] (0,0) grid (40,25);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,30) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    \draw[ultra thick, brandPrimary] (0,5) -- (10,20) -- (20,10) -- (30,25) -- (40,0);
\end{tikzpicture}
```

## Решение

На участке от $20$ до $30$~с график — прямая, движение равноускоренное. По графику проекция скорости выросла с $10$ до $25$~м/с:
$$a_x = \frac{\Delta v_x}{\Delta t} = \frac{25 - 10}{30 - 20} = 1{,}5~\text{м/с}^2.$$
