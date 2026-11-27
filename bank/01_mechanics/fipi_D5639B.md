---
id: fipi_D5639B
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание D5639B)
---

## Условие

На рисунке приведён график зависимости проекции скорости тела $v_x$ от времени.

[[рис 1]]

Определите проекцию ускорения этого тела $a_x$ в интервале времени от $3$ до $5$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.4cm, y=0.12cm, every node/.style={font=\footnotesize}]
\draw[xstep=1, ystep=5, gray!35, thin] (0,-10) grid (21,15);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (22.5,0) node[right] {$t$, с};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-10) -- (0,19) node[above] {$v_x$, м/с};
  \foreach \y in {15,10,5,-5,-10} \node[left] at (0,\y) {$\y$};
  \node[left] at (0,0) {$0$};
  \foreach \x in {5,10,15,20} \node[below] at (\x,-10) {$\x$};
  \draw[ultra thick, brandPrimary] (0,5) -- (3,5) -- (5,15) -- (10,-10) -- (12,-10) -- (18,5) -- (21,5);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает.

## Решение

От $3$ до $5$~с проекция скорости выросла от $5$ до $15$~м/с:
$$a_x = \frac{15 - 5}{2} = 5~\text{м/с}^2.$$
