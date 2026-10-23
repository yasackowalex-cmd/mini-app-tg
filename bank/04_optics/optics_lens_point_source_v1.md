---
id: optics_lens_point_source_v1
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная
variant: 
answer: "5"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА, ЛИНЗЫ, ПОСТРОЕНИЕ_ИЗОБРАЖЕНИЙ]
source: len.tex
---

## Условие

Какая из точек (1, 2, 3, 4, 5 или 6), показанных на рисунке, является изображением точечного источника света $S$, полученным в тонкой собирающей линзе с фокусным расстоянием $F$?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-4,-2) grid (4,2);
    
    % Главная оптическая ось
    \draw[thick, black] (-4,0) -- (4,0);
    
    % Собирающая линза
    \draw[ultra thick, black, <->] (0,-1.8) -- (0,1.8);
    
    % Фокусы
    \draw[thick, black] (-1,0.1) -- (-1,-0.1) node[below] {$F$};
    \draw[thick, black] (-2,0.1) -- (-2,-0.1) node[below] {$2F$};
    \draw[thick, black] (1,0.1) -- (1,-0.1) node[below] {$F$};
    \draw[thick, black] (2,0.1) -- (2,-0.1) node[below] {$2F$};
    
    % Источник S (справа вверху, за 2F)
    \node at (2.6,1.2) {$\sun$};
    \node[below] at (2.6,1.1) {$S$};
    
    % Точки изображений
    \fill[black] (2.6,-1.2) circle (1.5pt) node[right] {1};
    \fill[black] (-0.8,-0.5) circle (1.5pt) node[right] {2};
    \fill[black] (-1.4,0.8) circle (1.5pt) node[right] {3};
    \fill[black] (-2.2,1.4) circle (1.5pt) node[right] {4};
    \fill[black] (-1.3,-0.9) circle (1.5pt) node[left] {5};
    \fill[black] (-2.2,-1.6) circle (1.5pt) node[left] {6};
    
\end{tikzpicture}
```

## Решение

Источник $S$ находится справа от линзы за двойным фокусом ($d > 2F$). Собирающая линза даёт в этом случае действительное изображение по другую сторону линзы, между $F$ и $2F$.

Изображение действительное, значит, перевёрнутое: источник выше главной оптической оси, а изображение должно оказаться ниже неё.

Слева от линзы, ниже оси и между $F$ и $2F$ лежит только точка 5. Точка 2 ближе фокуса, точка 6 дальше $2F$, точки 3 и 4 выше оси, точка 1 вообще с той же стороны, что и источник.
