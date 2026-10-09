---
id: mkt_v5_n7
exam: ЕГЭ
kim: 7
section: МКТ и термодинамика
theme: ОСНОВНОЕ УРАВНЕНИЕ МКТ. АБСОЛЮТНАЯ ТЕМПЕРАТУРА. КИНЕТИЧЕСКАЯ ЭНЕРГИЯ
topic: 2.1
level: Б
type: расчётная
variant: 5
answer: "2"
unit: "раз"
has_image: true
author_task: false
tags: [МКТ]
source: mkt.tex
---

## Условие

В сосуде под поршнем находится некоторое постоянное количество разреженного неона. Во сколько раз увеличится среднеквадратическая скорость теплового движения молекул неона, если он перейдёт из состояния 1 в состояние 2 (см. рисунок)?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,5);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (5.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$p$};
    
    \coordinate (1) at (1,3);
    \coordinate (2) at (3,4);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    
    \node[left] at (0,3) {$3p_0$};
    \node[left] at (0,4) {$4p_0$};
    \node[below] at (1,0) {$V_{0}$};
    \node[below] at (3,0) {$3V_{0}$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
