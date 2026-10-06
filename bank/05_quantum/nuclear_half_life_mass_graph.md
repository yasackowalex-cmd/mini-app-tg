---
id: nuclear_half_life_mass_graph
exam: ЕГЭ
kim: 16
section: Квантовая физика
theme: ФИЗИКА ЯДРА. РАДИОАКТИВНЫЙ РАСПАД. СТРОЕНИЕ АТОМА
topic: 4.6
level: Б
type: соответствие/выбор
variant: 
answer: "1,5"
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, ЯДЕРНАЯ_ФИЗИКА, ПЕРИОД_ПОЛУРАСПАДА]
source: nuc.tex
---

## Условие

На рисунке показан график изменения массы находящегося в пробирке радиоактивного изотопа с течением времени. Определите период полураспада этого изотопа. Ответ выразите в месяцах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.8, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,6);
    
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (5.5,0) node[right] {$t$, мес.};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,6.5) node[above] {$m$, мг};
    
    \draw[ultra thick, brandPrimary] plot[domain=0:4.8, samples=100] (\x, {6*exp(-0.462*\x)});
    
    \foreach \x in {1,2,3,4}
        \node[below] at (\x,0) {\x};
    \foreach \y in {2,4,6}
        \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
