---
id: fipi_ece218
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "160"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание ece218)
---

## Условие

На рисунке представлен график зависимости модуля $v$ скорости тела от времени $t$.

[[рис 1]]

Найдите путь, пройденный телом за время от $0$ до $12$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.45cm, y=0.12cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=10, gray!30, thin] (0,0) grid (12,20);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (14.4,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,32) node[above] {$v, \text{ м/с}$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,20) {$20$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (2,0) {$2$};
    \node[below] at (4,0) {$4$};
    \node[below] at (6,0) {$6$};
    \node[below] at (8,0) {$8$};
    \node[below] at (10,0) {$10$};
    \node[below] at (12,0) {$12$};
    \draw[ultra thick, brandPrimary] (0,20) -- (4,20) -- (12,0);
\end{tikzpicture}
```

## Подсказка

Путь равен площади под графиком $v(t)$: прямоугольник плюс треугольник.

## Решение

Путь равен площади под графиком модуля скорости.

От $0$ до $4$~с скорость постоянна: $s_1 = 20\cdot 4 = 80$~м.

От $4$ до $12$~с скорость равномерно уменьшается до нуля (треугольник): $s_2 = \dfrac{20\cdot 8}{2} = 80$~м.
$$s = s_1 + s_2 = 80 + 80 = 160~\text{м}.$$
