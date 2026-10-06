---
id: mkt_hum_v7_n22
exam: ЕГЭ
kim: 22
section: МКТ и термодинамика
theme: ВЛАЖНОСТЬ ВОЗДУХА. НАСЫЩЕННЫЕ ПАРЫ
topic: 2.3
level: Б
type: расчётная (часть 2)
variant: 7
answer: "50"
has_image: true
author_task: false
tags: [МКТ, ВЛАЖНОСТЬ]
source: wet.tex
---

## Условие

В сосуде содержится влажный воздух при температуре $22^{\circ}\text{C}$. Плотность паров воды в сосуде равна $13\text{ г/м}^3$. Зависимость давления насыщенных паров от температуры представлена на графике. Определите относительную влажность воздуха в сосуде.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$t, presentation^{\circ}\text{C}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p_{\text{н}}$, гПа};
    
    \draw[ultra thick, brandPrimary] (0,0.4) plot[domain=0:4, samples=20] (\x, {0.4 + 0.15*\x^2 + 0.02*\x^3});
    
    \fill[black] (2.2,1.3) circle (1.5pt) node[above left] {26};
    \draw[dashed, gray] (2.2,0) -- (2.2,1.3) -- (0,1.3);
    
    \node[below] at (2.2,0) {22};
    \node[left] at (0,2) {40};
    \node[left] at (0,3) {60};
    \node[left] at (0,4) {80};
    \node[below] at (1,0) {10};
    \node[below] at (2,0) {20};
    \node[below] at (3,0) {30};
    \node[below] at (4,0) {40};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
