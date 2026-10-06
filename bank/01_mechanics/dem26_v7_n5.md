---
id: dem26_v7_n5
exam: ЕГЭ
kim: 5
section: Механика
theme: 
topic: 1.1.3
level: Б
type: соответствие/выбор
variant: 7
answer: "125"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kinem.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ тела, движущегося вдоль оси $Ox$, от времени $t$. 

Из приведённого ниже списка выберите все верные утверждения.
1) В положении $A$ модуль скорости тела больше, чем в положении $D$.
2) В точке $B$ проекция скорости тела на ось $Ox$ равна нулю.
3) В положении $D$ векторы скорости и ускорения тела направлены в противоположные стороны.
4) Проекция перемещения тела на ось $Ox$ при его переходе из точки $A$ в точку $B$ положительна.
5) На участке $AB$ модуль скорости тела уменьшается.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,2.5) node[above] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary, domain=0.5:3.5, samples=100] plot (\x, {1.2 + sin(120*(\x-1.5))});
    \fill[black] (0.8, 0.45) circle (1.5pt) node[left] {$A$};
    \fill[black] (1.15, 0.2) circle (1.5pt) node[below] {$B$};
    \fill[black] (2.25, 1.95) circle (1.5pt) node[left] {$C$};
    \fill[black] (3.1, 1.45) circle (1.5pt) node[right] {$D$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
