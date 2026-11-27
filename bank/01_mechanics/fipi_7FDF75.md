---
id: fipi_7FDF75
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "-0,5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 7FDF75)
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Определите проекцию $a_x$ ускорения этого тела в интервале времени от $40$ до $60$~с. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.05cm, y=0.04cm, every node/.style={font=\footnotesize}]
    \draw[xstep=10, ystep=20, gray!30, thin] (0,-60) grid (140,60);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (152,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-60) -- (0,84) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,60) {$60$};
    \node[left] at (0,40) {$40$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,-20) {$-20$};
    \node[left] at (0,-40) {$-40$};
    \node[left] at (0,-60) {$-60$};
    \node[left] at (0,0) {$0$};
    \node[below] at (20,0) {$20$};
    \node[below] at (40,0) {$40$};
    \node[below] at (60,0) {$60$};
    \node[below] at (80,0) {$80$};
    \node[below] at (100,0) {$100$};
    \node[below] at (120,0) {$120$};
    \node[below] at (140,0) {$140$};
    \draw[ultra thick, brandPrimary] (0,40) -- (30,-20) -- (70,-40) -- (100,-40) -- (140,60);
\end{tikzpicture}
```

## Подсказка

Интервал лежит на одном прямом участке графика. Найдите $a_x = \dfrac{\Delta v_x}{\Delta t}$ по концам этого участка (одна клетка по времени — $10$~с).

## Решение

От $30$ до $70$~с график — одна прямая. Проекция скорости изменилась от $-20$ до $-40$~м/с за $40$~с:
$$a_x = \frac{-40 - (-20)}{70 - 30} = -0{,}5~\text{м/с}^2.$$
На отрезке от $40$ до $60$~с ускорение то же.
