---
id: mkt_gas_v6_n10
exam: ЕГЭ
kim: 10
section: МКТ и термодинамика
theme: УРАВНЕНИЕ МЕНДЕЛЕЕВА-КЛАПЕЙРОНА. ОСНОВНЫЕ ГАЗОВЫЕ ЗАКОНЫ
topic: 2.2
level: Б
type: соответствие/выбор
variant: 6
answer: "12"
unit: ""
has_image: true
author_task: false
tags: [МКТ]
source: ig.tex
---

## Условие

Неизменное количество одноатомного идеального газа участвует в циклическом процессе 1–2–3–1, изображённом на $pV$-диаграмме. Как изменяются внутренняя энергия газа в процессе 3–1 и концентрация газа в процессе 2–3?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (3,3);
    \coordinate (3) at (2,1);
    
    \draw[dashed, thin, gray] (0,0) -- (1);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[below] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,3) {$3p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below, font=\footnotesize] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
