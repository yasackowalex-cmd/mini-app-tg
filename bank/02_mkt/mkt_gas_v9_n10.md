---
id: mkt_gas_v9_n10
exam: ЕГЭ
kim: 10
section: МКТ и термодинамика
theme: УРАВНЕНИЕ МЕНДЕЛЕЕВА-КЛАПЕЙРОНА. ОСНОВНЫЕ ГАЗОВЫЕ ЗАКОНЫ
topic: 2.2
level: Б
type: соответствие/выбор
variant: 9
answer: "32"
unit: ""
has_image: true
author_task: false
tags: [МКТ]
source: ig.tex
---

## Условие

Идеальный одноатомный газ постоянной массы переходит из состояния 1 в состояние 2 (см. диаграмму). Как изменяются при этом концентрация молекул газа и его давление?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$T$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$V$};
    
    \coordinate (1) at (2,1);
    \coordinate (2) at (2,3);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    
    \fill[black] (1) circle (1.5pt) node[below right] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
