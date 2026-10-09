---
id: newton2_v16_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: соответствие/выбор
variant: 16
answer: "34"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ тела, движущегося вдоль оси $Ox$, от времени $t$ (парабола). Графики А и Б представляют собой зависимости физических величин, характеризующих движение этого тела, от времени $t$.
\begin{center}
\begin{minipage}[b]{0.45\linewidth}
\centering

\end{minipage}
\begin{minipage}[b]{0.45\linewidth}
\centering

\end{minipage}
\end{center}
Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут представлять.
1) проекция на ось $Ox$ скорости тела
2) проекция перемещения на ось $Ox$ тела
3) кинетическая энергия тела
4) модуль равнодействующей сил, действующих на тело

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.7, every node/.style={font=\footnotesize}]
    \node[above] at (1.2,2.0) {А)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,2.2) node[above] {};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary, domain=0:2.6, samples=100] plot (\x, {1.2 - 1.2*\x + 0.4*\x*\x});
    \node[below] at (1.5,0) {$t_1$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
\begin{tikzpicture}[scale=0.7, every node/.style={font=\footnotesize}]
    \node[above] at (1.2,2.0) {Б)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,2.2) node[above] {};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary] (0,1.0) -- (3,1.0);
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
