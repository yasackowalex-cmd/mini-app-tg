---
id: fipi_6ADAD4
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "250"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 6ADAD4)
---

## Условие

На рисунке представлен график зависимости модуля скорости $v$ автомобиля от времени $t$.

[[рис 1]]

Определите по графику путь, пройденный автомобилем в интервале времени от $0$ до $40$~с после начала движения.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.09cm, y=0.15cm, every node/.style={font=\footnotesize}]
    \draw[xstep=10, ystep=5, gray!30, thin] (0,0) grid (50,10);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (62,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,16) node[above] {$v, \text{ м/с}$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (10,0) {$10$};
    \node[below] at (20,0) {$20$};
    \node[below] at (30,0) {$30$};
    \node[below] at (40,0) {$40$};
    \node[below] at (50,0) {$50$};
    \draw[ultra thick, brandPrimary] (0,0) -- (10,10) -- (20,10) -- (40,0) -- (50,0);
\end{tikzpicture}
```

## Подсказка

Путь равен площади под графиком модуля скорости: разбейте её на треугольники, прямоугольники и трапеции.

## Решение

Путь равен площади под графиком скорости.

От $0$ до $10$~с: $s_1 = \dfrac{10\cdot 10}{2} = 50$~м. От $10$ до $20$~с: $s_2 = 10\cdot 10 = 100$~м. От $20$ до $40$~с: $s_3 = \dfrac{10\cdot 20}{2} = 100$~м.
$$s = 50 + 100 + 100 = 250~\text{м}.$$
