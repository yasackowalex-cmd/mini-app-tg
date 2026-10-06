---
id: mkt_gas_v2_n21
exam: ЕГЭ
kim: 21
section: МКТ и термодинамика
theme: УРАВНЕНИЕ МЕНДЕЛЕЕВА-КЛАПЕЙРОНА. ОСНОВНЫЕ ГАЗОВЫЕ ЗАКОНЫ
topic: 2.2
level: Б
type: качественная
variant: 2
answer: "Сравнение работы"
has_image: true
author_task: false
tags: [МКТ]
source: ig.tex
---

## Условие

Один моль одноатомного идеального газа участвует в циклическом процессе 1–2–3–4–1, график которого изображён на рисунке в координатах $p-T$, где $p$ — давление газа, $T$ — абсолютная температура. Опираясь на законы молекулярной физики и термодинамики, сравните модуль работы газа в процессе 2–3 и модуль работы внешних сил в процессе 4–1. Постройте график цикла в координатах $p-V$, где $p$ — давление газа, $V$ — объём газа.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (7,6);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (7.5,0) node[right] {$T$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,6.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (6,5);
    \coordinate (3) at (6,3);
    \coordinate (4) at (2,1);
    
    \draw[dashed, thin, gray] (0,0) -- (1);
    \draw[dashed, thin, gray] (0,0) -- (3);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (4);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (4) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[right=2pt] {3};
    \fill[black] (4) circle (1.5pt) node[below right] {4};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,3) {$3p_0$};
    \node[left] at (0,5) {$5p_0$};
    \node[below] at (1,0) {$T_0$};
    \node[below] at (2,0) {$2T_0$};
    \node[below] at (6,0) {$6T_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
