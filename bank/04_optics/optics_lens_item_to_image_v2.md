---
id: optics_lens_item_to_image_v2
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная
variant: 
answer: "3"
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
    
    \draw[thick, black] (-4,0) -- (4,0);
    \draw[ultra thick, black, <->] (0,-1.8) -- (0,1.8);
    
    \draw[dashed, black] (-3,1.5) -- (3,-1.5);
    \draw[dashed, black] (-3,-1.5) -- (3,1.5);
    
    \draw[thick, black] (-1,0.1) -- (-1,-0.1) node[below] {$F$};
    \draw[thick, black] (-2,0.1) -- (-2,-0.1) node[below] {$2F$};
    \draw[thick, black] (1,0.1) -- (1,-0.1) node[below] {$F$};
    \draw[thick, black] (2,0.1) -- (2,-0.1) node[below] {$2F$};
    
    % Изображение AB
    \draw[-{Stealth[scale=0.8]}, line width=1.5pt, black] (1.625,0) -- (1.625,0.8125) node[pos=0, below left] {$A$} node[pos=1, above] {$B$};
    
    % Предметы
    \draw[-{Stealth[scale=0.8]}, thick, black] (-1.3,0) -- (-1.3,0.65) node[right] {1};
    \draw[-{Stealth[scale=0.8]}, thick, black] (-1.3,0) -- (-1.3,-0.65) node[left] {2};
    \draw[-{Stealth[scale=0.8]}, thick, black] (-2.6,0) -- (-2.6,-1.3) node[right] {3};
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.3,0) -- (1.3,-0.65) node[right] {4};
    
\end{tikzpicture}
```

## Решение

Изображение $AB$ действительное (справа от линзы), прямое на рисунке, значит, предмет находится слева от линзы и перевёрнут — это предмет 2 или 3. Оба лежат на луче, идущем через оптический центр в точку $B$, поэтому выбираем по формуле линзы.

Изображение находится между $F$ и $2F$: $f = 1{,}625F$. Тогда

$$\frac{1}{d} = \frac{1}{F} - \frac{1}{f} = \frac{1}{F} - \frac{1}{1{,}625F} \;\Rightarrow\; d = \frac{1{,}625F}{0{,}625} = 2{,}6F.$$

Предмет стоит за двойным фокусом на расстоянии $2{,}6F$ — это предмет 3. Для предмета 2 ($d = 1{,}3F$) изображение получилось бы за $2F$.
