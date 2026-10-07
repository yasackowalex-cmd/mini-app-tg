---
id: dem26_v4_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 4
answer: "-2,5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$. Определите проекцию $a_x$ ускорения тела в интервале времени от $30$ до $40$~с. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.15cm, y=0.12cm, every node/.style={font=\footnotesize}]
    % Сетка
    \draw[xstep=10, ystep=10, gray!30, thin] (0,0) grid (40,30);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,32) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,30) {$30$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    % График
    \draw[ultra thick, brandPrimary] (0,5) -- (10,20) -- (20,10) -- (30,25) -- (40,0);
\end{tikzpicture}
```

## Решение

TODO
