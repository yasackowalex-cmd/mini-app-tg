---
id: dem26_v1_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: 
topic: 1.1.3
level: Б
type: расчётная
variant: 1
answer: "-75"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01.tex
---

## Условие

На рисунке приведён график зависимости от времени $t$ проекции $v_x$ скорости тела, движущегося прямолинейно вдоль оси $Ox$. Определите проекцию $s_x$ перемещения этого тела в интервале времени от $0$ до $15$~с. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.35cm, y=0.08cm, every node/.style={font=\footnotesize}]
    % Сетка (шаг 5 по x, шаг 10 по y)
    \draw[xstep=5, ystep=10, gray!30, thin] (0,-20) grid (15,20);
    % Оси
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (17,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-20) -- (0,24) node[above] {$v_x, \text{ м/с}$};
    % Оцифровка
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \node[left] at (0,-10) {$-10$};
    \node[left] at (0,-20) {$-20$};
    \node[below] at (5,0) {$5$};
    \node[below] at (10,0) {$10$};
    \node[below] at (15,0) {$15$};
    % График
    \draw[ultra thick, brandPrimary] (0,-20) -- (10,0) -- (15,10);
\end{tikzpicture}
```

## Решение

Проекция перемещения равна площади под графиком $v_x(t)$ с учётом знака: под осью — минус, над осью — плюс.

От $0$ до $10$~с: треугольник ниже оси, $v_x$ меняется от $-20$~м/с до $0$. От $10$ до $15$~с: треугольник выше оси, $v_x$ растёт от $0$ до $10$~м/с.

$$s_x = -\frac{10 \cdot 20}{2} + \frac{5 \cdot 10}{2} = -100 + 25 = -75~\text{м}.$$
