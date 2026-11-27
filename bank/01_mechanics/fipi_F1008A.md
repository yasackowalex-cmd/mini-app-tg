---
id: fipi_F1008A
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
source: Открытый банк заданий ФИПИ, ЕГЭ (задание F1008A)
---

## Условие

На рисунке приведён график зависимости от времени $t$ проекции $v_x$ скорости тела, движущегося прямолинейно вдоль оси $Ox$.

[[рис 1]]

Определите проекцию $a_x$ ускорения этого тела. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.3cm, y=0.1cm, every node/.style={font=\footnotesize}]
    \draw[xstep=5, ystep=10, gray!30, thin] (0,-20) grid (15,20);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (21,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-20) -- (0,32) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,-10) {$-10$};
    \node[left] at (0,-20) {$-20$};
    \node[left] at (0,0) {$0$};
    \node[below] at (5,0) {$5$};
    \node[below] at (10,0) {$10$};
    \node[below] at (15,0) {$15$};
    \draw[ultra thick, brandPrimary] (0,-20) -- (15,10);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

График — прямая. За $10$~с проекция скорости изменилась от $-20$ до $0$~м/с:
$$a_x = \frac{0 - (-20)}{10} = 2~\text{м/с}^2.$$
