---
id: uniform_v27_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 27
answer: "2 м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

Тело движется вдоль оси $Ox$. На рисунке приведён график зависимости координаты $x$ этого тела от времени $t$. Определите проекцию $v_x$ скорости тела.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.15cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=5, gray!30, thin] (0,-5) grid (10,15);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (11,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-5) -- (0,17) node[above] {$x, \text{ м}$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[below left] at (0,0) {$0$};
    \node[left] at (0,-5) {$-5$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,-5) -- (10,15);
\end{tikzpicture}
```

## Решение

TODO
