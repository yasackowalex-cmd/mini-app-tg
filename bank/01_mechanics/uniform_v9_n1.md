---
id: uniform_v9_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 9
answer: "1 м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

На рисунке представлен график зависимости координаты $x$ тела от времени $t$. Чему равен модуль скорости этого тела?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.2cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=2, gray!30, thin] (0,-6) grid (10,6);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (11,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-6) -- (0,7) node[above] {$x, \text{ м}$};
    \node[left] at (0,6) {$6$};
    \node[left] at (0,4) {$4$};
    \node[left] at (0,2) {$2$};
    \node[left] at (0,-2) {$-2$};
    \node[left] at (0,-4) {$-4$};
    \node[left] at (0,-6) {$-6$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,4) -- (10,-6);
\end{tikzpicture}
```

## Решение

TODO
