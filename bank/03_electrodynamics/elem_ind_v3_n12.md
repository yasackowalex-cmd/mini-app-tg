---
id: elem_ind_v3_n12
exam: ЕГЭ
kim: 12
section: Электродинамика
theme: МАГНИТНЫЙ ПОТОК. ЭЛЕКТРОМАГНИТНАЯ ИНДУКЦИЯ. САМОИНДУКЦИЯ
topic: 3.2.2
level: Б
type: расчётная
variant: 3
answer: "3,6"
unit: "мВб"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ИНДУКЦИЯ, САМОИНДУКЦИЯ]
source: ind.tex
---

## Условие

На рисунке представлен график зависимости силы тока от времени в катушке индуктивностью $0{,}6\text{ мГн}$. На сколько увеличился магнитный поток, пронизывающий катушку, за первые $2\text{ с}$? Ответ выразите в милливеберах (мВб).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$t$, с};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$I$, А};
    
    \draw[ultra thick, brandPrimary] (0,0) -- (4,3);
    
    \fill[black] (0,0) circle (1.5pt);
    \fill[black] (2,1.5) circle (1.5pt);
    \fill[black] (4,3) circle (1.5pt);
    
    \draw[dashed, gray] (2,0) -- (2,1.5) -- (0,1.5);
    \draw[dashed, gray] (4,0) -- (4,3) -- (0,3);
    
    \node[left] at (0,1) {2};
    \node[left] at (0,2) {4};
    \node[left] at (0,3) {6};
    
    \node[below] at (2,0) {2};
    \node[below] at (4,0) {4};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
