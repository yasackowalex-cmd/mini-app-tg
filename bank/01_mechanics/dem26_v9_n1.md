---
id: dem26_v9_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 9
answer: "35"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$. Определите путь, пройденный телом в течение интервала времени от $0$ до $3$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.35cm, y=0.08cm, every node/.style={font=\footnotesize}]
    % Сетка (шаг 2 по x, шаг 10 по y)
    \draw[xstep=2, ystep=10, gray!30, thin] (0,-10) grid (11,20);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (12,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-10) -- (0,24) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[left] at (0,-10) {$-10$};
    \node[below] at (2,0) {$2$};
    \node[below] at (4,0) {$4$};
    \node[below] at (6,0) {$6$};
    \node[below] at (8,0) {$8$};
    \node[below] at (10,0) {$10$};
    % График
    \draw[ultra thick, brandPrimary] (0,20) -- (3,-10) -- (7,0) -- (11,10);
\end{tikzpicture}
```

## Решение

TODO
