---
id: optics_lens_triangle_image_area
exam: ЕГЭ
kim: 25
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная (часть 2)
variant: 
answer: "11,25"
unit: "см²"
has_image: true
author_task: false
tags: [ОПТИКА, ЛИНЗЫ, ГЕОМЕТРИЯ_ИЗОБРАЖЕНИЯ]
source: len.tex
---

## Условие

Прямоугольный треугольник с катетами $c = 2\text{ см}$ и $h = 4\text{ см}$ расположен перед собирающей линзой с фокусным расстоянием $F = 10\text{ см}$, как показано на рисунке. Постройте изображение треугольника, даваемое линзой. Чему равна площадь этого изображения? Ответ выразите в квадратных сантиметрах ($\text{см}^2$).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-4,-2) grid (3,2);
    
    \draw[thick, black, dash dot] (-4,0) -- (3,0);
    \draw[ultra thick, black, <->] (0,-1.8) -- (0,1.8);
    
    \draw[thick, black] (-1,0.1) -- (-1,-0.1) node[below] {$F$};
    \draw[thick, black] (-2,0.1) -- (-2,-0.1) node[below] {$2F$};
    \draw[thick, black] (1,0.1) -- (1,-0.1) node[below] {$F$};
    
    % Треугольник (катеты c и h)
    \draw[thick, black, fill=gray!50] (-2,0) -- (-2,1.2) -- (-1.4,0) -- cycle;
    \node[left] at (-2,0.6) {$h$};
    \node[below] at (-1.7,0) {$c$};
    
    \node[below left] at (-4,-2) {0};
\end{tikzpicture}
```

## Решение

TODO
