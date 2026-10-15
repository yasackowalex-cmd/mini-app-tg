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
answer: "25"
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
\begin{tikzpicture}[x=0.42cm, y=0.15cm, every node/.style={font=\footnotesize}]
    % Сетка (шаг 1 по x, шаг 10 по y)
    \draw[xstep=1, ystep=10, gray!30, thin] (0,-10) grid (11,20);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (12,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-10) -- (0,24) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,0) {$0$};
    % Оцифровка оси t — под нижним краем сетки, чтобы линия графика не пересекала числа
    \foreach \t in {0,...,11} \node[below] at (\t,-10) {$\t$};
    \node[left] at (0,-10) {$-10$};
    % График
    \draw[ultra thick, brandPrimary] (0,20) -- (3,-10) -- (7,0) -- (11,10);
\end{tikzpicture}
```

## Решение

Путь — площадь между графиком $v_x(t)$ и осью времени. На участке $0$–$3$~с скорость меняется линейно от $20$ до $-10$~м/с, то есть на $10$~м/с за каждую секунду, и обращается в ноль при $t = 2$~с.

Треугольник над осью ($0$–$2$~с) и под осью ($2$–$3$~с):

$$s = \frac{20 \cdot 2}{2} + \frac{10 \cdot 1}{2} = 20 + 5 = 25~\text{м}.$$
