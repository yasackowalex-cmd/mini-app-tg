---
id: nuclear_decay_graph_point1
exam: ЕГЭ
kim: 16
section: Квантовая физика
theme: РАДИОАКТИВНЫЙ РАСПАД. КВАНТОВЫЕ ПЕРЕХОДЫ
topic: 4.6
level: Б
type: соответствие/выбор
variant: 
answer: "1"
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, ЯДЕРНАЯ_ФИЗИКА, ГРАФИК_РАСПАДА]
source: nuc.tex
---

## Условие

Ядра изотопа тантала $^{185}_{73}\text{Ta}$ испытывают $\beta^-$-распад с периодом полураспада $50\text{ мин}$. В момент начала наблюдения в образце содержится $4\cdot 10^{20}$ ядер тантала (см. рисунок). Через какую из точек (1, 2, 3 или 4), кроме точки $A$, пройдёт график зависимости от времени числа ещё не распавшихся ядер тантала?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.8, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,5);
    
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (6.5,0) node[right] {$t$, мин};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,5.5) node[above] {$N, 10^{20}$};
    
    \fill[black] (0,4) circle (2pt) node[above right] {$A$};
    \fill[black] (1,2) circle (2pt) node[above right] {1};
    \fill[black] (2,1.5) circle (2pt) node[above right] {2};
    \fill[black] (3,1.5) circle (2pt) node[above right] {3};
    \fill[black] (5,0.5) circle (2pt) node[above right] {4};
    
    \foreach \x/\val in {1/50, 2/100, 3/150, 4/200, 5/250, 6/300}
        \node[below] at (\x,0) {\val};
    \foreach \y in {1,2,3,4,5}
        \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
