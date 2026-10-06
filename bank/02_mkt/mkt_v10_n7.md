---
id: mkt_v10_n7
exam: ЕГЭ
kim: 7
section: МКТ и термодинамика
theme: ОСНОВНОЕ УРАВНЕНИЕ МКТ. АБСОЛЮТНАЯ ТЕМПЕРАТУРА. КИНЕТИЧЕСКАЯ ЭНЕРГИЯ
topic: 2.1
level: Б
type: расчётная
variant: 10
answer: "4"
has_image: true
author_task: false
tags: [МКТ]
source: mkt.tex
---

## Условие

В сосуде под поршнем находится некоторое постоянное количество идеального газа. Во сколько раз уменьшится температура газа, если он перейдёт из состояния 2 в состояние 1 (см. рисунок)?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,5);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (5.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$p$};
    
    \coordinate (1) at (2,4);
    \coordinate (2) at (4,5); % В соответствии со значениями 8p0 и 4V0
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    
    \node[left] at (0,4) {$4p_0$};
    \node[left] at (0,5) {$8p_0$};
    \node[below] at (2,0) {$2V_{0}$};
    \node[below] at (4,0) {$4V_{0}$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
