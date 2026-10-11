---
id: dem26_v5_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 5
answer: "10"
unit: "м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

Тело движется вдоль оси $Ox$. На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$. Определите среднюю скорость тела в интервале времени от $20$ до $40$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.15cm, y=0.12cm, every node/.style={font=\footnotesize}]
    % Сетка
    \draw[xstep=10, ystep=10, gray!30, thin] (0,0) grid (40,30);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,35) node[above] {$v_x, \text{ м/с}$};
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
    \draw[ultra thick, brandPrimary] (0,15) -- (10,5) -- (20,20) -- (30,0) -- (40,20);
\end{tikzpicture}
```

## Решение

Средняя (путевая) скорость равна отношению всего пути ко всему времени движения. Путь — площадь под графиком $v_x(t)$.

От $20$ до $30$~с скорость уменьшается от $20$ до $0$~м/с: $s_1 = \dfrac{20 \cdot 10}{2} = 100$~м.

От $30$ до $40$~с скорость растёт от $0$ до $20$~м/с: $s_2 = \dfrac{20 \cdot 10}{2} = 100$~м.

$$v_\text{ср} = \frac{s_1 + s_2}{t} = \frac{100 + 100}{20} = 10~\text{м/с}.$$
