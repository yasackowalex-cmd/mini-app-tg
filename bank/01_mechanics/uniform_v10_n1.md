---
id: uniform_v10_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 10
answer: "12,5"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

На рисунке представлены графики зависимости проекций скоростей $v_x$ двух тел от времени $t$. На сколько метров увеличится расстояние между ними за первые $5$~с совместного равномерного движения, если они движутся в одном направлении?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.4cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=1, gray!30, thin] (0,0) grid (10,5);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (11,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,4) {$4$};
    \node[left] at (0,3) {$3$};
    \node[left] at (0,2) {$2$};
    \node[left] at (0,1) {$1$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,4) -- (10,4);
    \draw[ultra thick, brandAccent] (0,1.5) -- (10,1.5);
\end{tikzpicture}
```

## Решение

TODO
