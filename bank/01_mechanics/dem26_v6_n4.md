---
id: dem26_v6_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: Задание №4 (Статика, гидростатика, механические колебания и волны)
topic: 1.5
level: Б
type: расчётная
variant: 6
answer: "1,6"
unit: "см"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim04.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ от времени $t$ для одной из точек колеблющейся струны. Какой путь проходит точка струны за два периода колебаний?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.2cm, y=10cm]
    \draw[->] (0,-0.25) -- (0,0.25) node[left] {$x$, см};
    \draw[->] (0,0) -- (5.5,0) node[below right] {$t$, $10^{-3}$~с};
    \draw[dashed, gray] (0,0.2) -- (5,0.2);
    \draw[dashed, gray] (0,-0.2) -- (5,-0.2);
    \foreach \x [evaluate=\x as \labelx using int(\x*2)] in {1,2,3,4,5} {
        \draw (\x,0.02) -- (\x,-0.02);
        \node[below] at (\x,0) {\labelx};
    }
    \node[left] at (0,0.2) {0,2};
    \node[left] at (0,0.1) {0,1};
    \node[left] at (0,-0.1) {-0,1};
    \node[left] at (0,-0.2) {-0,2};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, domain=0:5, samples=100] plot (\x, {0.2*cos(180*\x)});
\end{tikzpicture}
```

## Решение

TODO
