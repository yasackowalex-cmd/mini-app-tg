---
id: nuclear_half_life_mercury_graph
exam: ЕГЭ
kim: 16
section: Квантовая физика
theme: ФИЗИКА ЯДРА. РАДИОАКТИВНЫЙ РАСПАД. СТРОЕНИЕ АТОМА
topic: 4.6
level: Б
type: соответствие/выбор
variant: 
answer: "25"
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, ЯДЕРНАЯ_ФИЗИКА, ПЕРИОД_ПОЛУРАСПАДА]
source: nuc.tex
---

## Условие

Дан график зависимости числа нераспавшихся ядер ртути $^{190}_{80}\text{Hg}$ от времени. Чему равен период полураспада этого изотопа ртути? Ответ выразите в минутах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.8, every node/.style={font=\footnotesize}]
    \draw[xstep=0.5, ystep=1, gray!30, thin] (0,0) grid (6,5);
    
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (6.5,0) node[right] {$t$, мин};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,5.5) node[above] {$N, 10^{18}$};
    
    \draw[ultra thick, brandPrimary] plot[domain=0:5.5, samples=100] (\x, {5*exp(-0.5545*\x)});
    
    \node[below] at (2,0) {50};
    \node[below] at (4,0) {100};
    \node[below] at (6,0) {150};
    
    \node[left] at (0,1) {10};
    \node[left] at (0,2) {20};
    \node[left] at (0,3) {30};
    \node[left] at (0,4) {40};
    \node[left] at (0,5) {50};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
