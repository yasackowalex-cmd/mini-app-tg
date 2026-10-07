---
id: uniform_v8_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 8
answer: "24"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

Велосипедист едет по прямой дороге. На рисунке представлен график зависимости координаты $x$ велосипедиста от времени $t$. Какой путь он проехал за промежуток времени от $1$ до $5$~с?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.8cm, y=0.08cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=10, gray!30, thin] (0,0) grid (6,50);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,55) node[above] {$x, \text{ м}$};
    \node[left] at (0,50) {$50$};
    \node[left] at (0,40) {$40$};
    \node[left] at (0,30) {$30$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,10) {$10$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {1,2,3,4,5,6} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,10) -- (6,46);
\end{tikzpicture}
```

## Решение

TODO
