---
id: elem_pow_v6_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: РАБОТА И МОЩНОСТЬ ТОКА. ЗАКОН ДЖОУЛЯ — ЛЕНЦА
topic: 3.1.6
level: Б
type: расчётная
variant: 6
answer: "0,4"
unit: "Вт"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, МОЩНОСТЬ, ДЖОУЛЬ_ЛЕНЦ]
source: jou.tex
---

## Условие

По проводнику сопротивлением $10\text{ Ом}$ течёт постоянный электрический ток. Величина заряда, прошедшего через поперечное сечение проводника, возрастает с течением времени согласно графику. Определите мощность, выделяющуюся в проводнике. Ответ выразите в ваттах (Вт).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Сетка gray!30
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$t$, с};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$q$, Кл};
    
    % График q(t)
    \draw[ultra thick, brandPrimary] (0,0) -- (4,4);
    
    % Точки на узлах
    \fill[black] (1,1) circle (1.5pt);
    \fill[black] (2,2) circle (1.5pt);
    \fill[black] (3,3) circle (1.5pt);
    \fill[black] (4,4) circle (1.5pt);
    
    % Пунктиры
    \draw[dashed, gray] (4,0) -- (4,4);
    \draw[dashed, gray] (0,4) -- (4,4);
    
    % Оцифровка
    \node[left] at (0,1) {0,2};
    \node[left] at (0,2) {0,4};
    \node[left] at (0,3) {0,6};
    \node[left] at (0,4) {0,8};
    
    \node[below] at (1,0) {1};
    \node[below] at (2,0) {2};
    \node[below] at (3,0) {3};
    \node[below] at (4,0) {4};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
