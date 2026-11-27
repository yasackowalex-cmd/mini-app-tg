---
id: fipi_0E7CCE
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "25"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 0E7CCE)
---

## Условие

На рисунке приведён график зависимости проекции скорости $v_x$ от времени $t$ для тела, движущегося прямолинейно вдоль оси $Ox$.

[[рис 1]]

Определите проекцию $a_x$ ускорения тела.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.8cm, y=0.06cm, every node/.style={font=\footnotesize}]
    \draw[xstep=0.2, ystep=5, gray!30, thin] (0,-30) grid (2.2,35);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (2.44,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-30) -- (0,41) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,-15) {$-15$};
    \node[left] at (0,-30) {$-30$};
    \node[left] at (0,0) {$0$};
    \node[below] at (1,0) {$1$};
    \node[below] at (2,0) {$2$};
    \draw[ultra thick, brandPrimary] (0,-25) -- (2.2,30);
\end{tikzpicture}
```

## Подсказка

Цена деления: по времени $0{,}2$~с, по скорости $5$~м/с. Возьмите две точки графика на узлах сетки.

## Решение

График — прямая, ускорение постоянно. За $1$~с проекция скорости изменилась от $-25$ до $0$~м/с:
$$a_x = \frac{0 - (-25)}{1} = 25~\text{м/с}^2.$$
