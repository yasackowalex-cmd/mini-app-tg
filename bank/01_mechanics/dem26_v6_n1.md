---
id: dem26_v6_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 6
answer: "11,25"
unit: "м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

Тело движется вдоль оси $Ox$. На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$. Определите среднюю скорость тела в интервале времени от $0$ до $20$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.15cm, y=0.12cm, every node/.style={font=\footnotesize}]
    % Сетка
    \draw[xstep=10, ystep=5, gray!30, thin] (0,0) grid (40,25);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,30) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,25) {$25$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    % График
    \draw[ultra thick, brandPrimary] (0,15) -- (10,5) -- (20,20) -- (30,0) -- (40,25);
\end{tikzpicture}
```

## Решение

Проекция скорости всё время положительна, поэтому тело не разворачивается, и путь равен площади под графиком $v_x(t)$.

От $0$ до $10$~с — трапеция: $s_1 = \dfrac{15 + 5}{2} \cdot 10 = 100$~м. От $10$ до $20$~с — трапеция: $s_2 = \dfrac{5 + 20}{2} \cdot 10 = 125$~м.

$$v_\text{ср} = \frac{s_1 + s_2}{t} = \frac{100 + 125}{20} = 11{,}25~\text{м/с}.$$
