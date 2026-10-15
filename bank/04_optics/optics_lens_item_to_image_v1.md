---
id: optics_lens_item_to_image_v1
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная
variant: 
answer: "1"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА, ЛИНЗЫ, ПОСТРОЕНИЕ_ИЗОБРАЖЕНИЙ]
source: len.tex
---

## Условие

Какому из предметов 1--4 соответствует изображение $AB$ в тонкой собирающей линзе с фокусным расстоянием $F$?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-4,-2) grid (4,2);
    
    % Главная оптическая ось
    \draw[thick, black] (-4,0) -- (4,0);
    \draw[ultra thick, black, <->] (0,-1.8) -- (0,1.8);
    
    % Побочные оси
    \draw[dashed, black] (-3,1.5) -- (3,-1.5);
    \draw[dashed, black] (-3,-1.5) -- (3,1.5);
    
    % Фокусы
    \draw[thick, black] (-1,0.1) -- (-1,-0.1) node[below] {$F$};
    \draw[thick, black] (-2,0.1) -- (-2,-0.1) node[below] {$2F$};
    \draw[thick, black] (1,0.1) -- (1,-0.1) node[below] {$F$};
    \draw[thick, black] (2,0.1) -- (2,-0.1) node[below] {$2F$};
    
    % Изображение AB
    \draw[-{Stealth[scale=0.8]}, line width=1.5pt, black] (1.5,0) -- (1.5,-0.75) node[pos=0, above] {$A$} node[pos=1, below] {$B$};
    
    % Предметы 1-4
    \draw[-{Stealth[scale=0.8]}, thick, black] (-3,0) -- (-3,1.5) node[right] {1};
    \draw[-{Stealth[scale=0.8]}, thick, black] (-0.8,0) -- (-0.8,-0.4) node[right] {2};
    \draw[-{Stealth[scale=0.8]}, thick, black] (-2.6,0) -- (-2.6,-1.3) node[left] {3};
    \draw[-{Stealth[scale=0.8]}, thick, black] (-1.5,0) -- (-1.5,0.5) node[right] {4};
    
    \node[below left] at (-4,-2) {0};
\end{tikzpicture}
```

## Решение

Изображение $AB$ действительное, перевёрнутое (стрелка вниз) и находится на расстоянии $f = 1{,}5F$ от линзы.

По формуле тонкой линзы $\dfrac{1}{d} + \dfrac{1}{f} = \dfrac{1}{F}$:

$$d = \frac{fF}{f - F} = \frac{1{,}5F \cdot F}{0{,}5F} = 3F.$$

Увеличение $\Gamma = \dfrac{f}{d} = 0{,}5$: предмет вдвое выше изображения и направлен вверх. Это предмет 1.

Предмет 2 стоит ближе фокуса и даёт мнимое изображение, предмет 3 даёт изображение, направленное вверх, предмет 4 (на расстоянии $1{,}5F$) даёт изображение на расстоянии $3F$.
