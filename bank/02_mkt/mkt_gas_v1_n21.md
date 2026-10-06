---
id: mkt_gas_v1_n21
exam: ЕГЭ
kim: 21
section: МКТ и термодинамика
theme: УРАВНЕНИЕ МЕНДЕЛЕЕВА-КЛАПЕЙРОНА. ОСНОВНЫЕ ГАЗОВЫЕ ЗАКОНЫ
topic: 2.2
level: Б
type: качественная
variant: 1
answer: "Сравнение работы"
has_image: true
author_task: false
tags: [МКТ]
source: ig.tex
---

## Условие

Один моль одноатомного идеального газа участвует в циклическом процессе 1–2–3–4–1, график которого изображён на рисунке в координатах $V-T$, где $V$ — объём газа, $T$ — абсолютная температура. Опираясь на законы молекулярной физики и термодинамики, сравните работу газа в процессе 2–3 и работу внешних сил в процессе 4–1. Постройте график цикла в координатах $p-V$, где $p$ — давление газа, $V$ — объём газа.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (7,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (7.5,0) node[right] {$T$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$V$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (6,1);
    \coordinate (3) at (6,3);
    \coordinate (4) at (3,3);
    
    \draw[dashed, thin, gray] (0,0) -- (1);
    \draw[dashed, thin, gray] (0,0) -- (4);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (4);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (4) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[below right] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    \fill[black] (4) circle (1.5pt) node[above left] {4};
    
    \node[left] at (0,1) {$V_0$};
    \node[left] at (0,3) {$3V_0$};
    \node[below] at (1,0) {$T_0$};
    \node[below] at (3,0) {$3T_0$};
    \node[below] at (6,0) {$6T_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
