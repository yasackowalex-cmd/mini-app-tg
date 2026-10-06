---
id: elem_coulomb_v26_n25
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: Б
type: расчётная (часть 2)
variant: 26
answer: "9"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

Маленький шарик массой $m = 0{,}9\text{ г}$ с зарядом $q = 10\text{ нКл}$ подвешен на невесомой шёлковой нити между двумя вертикальными параллельными противоположно заряженными пластинами. Вектор напряжённости электрического поля между пластинами направлен горизонтально, а модуль напряжённости равен $E = 3\cdot 10^5\text{ В/м}$. Определите угол $\alpha$ отклонения нити от вертикали. Ответ выразите в градусах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (-1,0) grid (3,3);
    
    % Пластины
    \draw[ultra thick, black] (-0.5,0.5) -- (-0.5,2.5);
    \draw[ultra thick, black] (2.5,0.5) -- (2.5,2.5);
    \node[above] at (-0.5,2.5) {$+$};
    \node[above] at (2.5,2.5) {$-$};
    
    % Подвес и нить
    \draw[thick, black] (1,2.5) -- (1.8,1.1);
    \draw[dashed, gray] (1,2.5) -- (1,0.5);
    
    % Шарик
    \fill[brandPrimary] (1.8,1.1) circle (3pt) node[right=2pt] {$q$};
    
    % Вектор E
    \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (0,1.5) -- (0.8,1.5) node[above] {$\vec{E}$};
    
    % Угол alpha
    \draw (1,2.0) arc (270:300:0.5);
    \node at (1.15,1.8) {$\alpha$};
    
    \node[below left] at (-1,0) {0};
\end{tikzpicture}
```

## Решение

TODO
