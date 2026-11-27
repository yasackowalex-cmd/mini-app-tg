---
id: fipi_C85E34
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "7,5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание C85E34)
---

## Условие

На рисунке приведён график зависимости проекции скорости $v_x$ от времени $t$ для тела, движущегося прямолинейно по оси $x$.

[[рис 1]]

Определите проекцию ускорения тела $a_x$.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.2cm, y=0.06cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=15, gray!30, thin] (0,-30) grid (3,30);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.2,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-30) -- (0,48) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,30) {$30$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,-15) {$-15$};
    \node[left] at (0,-30) {$-30$};
    \node[left] at (0,0) {$0$};
    \node[below] at (1,0) {$1$};
    \node[below] at (2,0) {$2$};
    \node[below] at (3,0) {$3$};
    \draw[ultra thick, brandPrimary] (0,-15) -- (3,7.5);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

График — прямая. За $2$~с проекция скорости изменилась от $-15$ до $0$~м/с:
$$a_x = \frac{0 - (-15)}{2} = 7{,}5~\text{м/с}^2.$$
