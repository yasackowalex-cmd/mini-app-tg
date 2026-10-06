---
id: uniform_v14_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 14
answer: "10 м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

По прямой дороге в одном направлении движутся два автомобиля со скоростями $v_1 = 15$~м/с и $v_2 = 25$~м/с. На рисунке приведены графики зависимости проекций скоростей $v_x$ этих автомобилей от времени $t$. Чему равен модуль их относительной скорости?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.1cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=10, gray!30, thin] (0,0) grid (10,30);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (11,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,33) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,30) {$30$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,25) -- (10,25) node[right, black] {2};
    \draw[ultra thick, brandAccent] (0,15) -- (10,15) node[right, black] {1};
\end{tikzpicture}
```

## Решение

TODO
