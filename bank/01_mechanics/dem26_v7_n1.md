---
id: dem26_v7_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 7
answer: "250"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$. Определите путь, пройденный телом, в интервале времени от $20$ до $40$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.15cm, y=0.12cm, every node/.style={font=\footnotesize}]
    % Сетка (шаг 10 по x, шаг 10 по y)
    \draw[xstep=10, ystep=10, gray!30, thin] (0,0) grid (40,25);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,27) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    % График
    \draw[ultra thick, brandPrimary] (0,5) -- (10,20) -- (20,10) -- (30,20) -- (40,0);
\end{tikzpicture}
```

## Решение

На интервале от $20$ до $40$~с проекция скорости не меняет знак, поэтому путь равен площади под графиком $v_x(t)$.

От $20$ до $30$~с скорость растёт от $10$ до $20$~м/с, от $30$ до $40$~с — убывает от $20$ до $0$:

$$s = \frac{10 + 20}{2}\cdot 10 + \frac{20 + 0}{2}\cdot 10 = 150 + 100 = 250~\text{м}.$$
