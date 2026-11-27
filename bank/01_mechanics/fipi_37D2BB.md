---
id: fipi_37D2BB
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "5"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 37D2BB)
---

## Условие

Невесомый стержень, находящийся в ящике с гладкими дном и стенками, составляет угол $\alpha = 45^\circ$ с вертикалью (см. рисунок). К середине стержня подвешен на нити шарик массой $1$~кг. Каков модуль силы упругости $\vec N$, действующей на стержень со стороны левой стенки ящика?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.3, every node/.style={font=\small}]
\fill[pattern=north east lines] (-0.18,-0.18) rectangle (0,2.6); \draw[thick] (0,0) -- (0,2.6);
  \fill[pattern=north east lines] (2.121,-0.18) rectangle (2.301,2.6); \draw[thick] (2.121,0) -- (2.121,2.6);
  \fill[pattern=north east lines] (-0.18,-0.18) rectangle (2.301,0); \draw[thick] (0,0) -- (2.121,0);
  \draw[very thick] (0,2.121) -- (2.121,0);
  \draw (0,1.721) arc (270:315:0.4); \node at (0.18,1.501) {$\alpha$};
  \draw[thin] (1.06,1.06) -- (1.06,0.62); \draw[thick, fill=white] (1.06,0.54) circle (0.08);
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,2.121) -- (0.6,2.121) node[above] {$\vec N$};
\end{tikzpicture}
```

## Подсказка

Запишите правило моментов относительно нижнего конца стержня: силы, приложенные в этой точке, моментов не создают.

## Решение

1. На стержень действуют сила натяжения нити, равная $mg$, силы реакции левой стенки $\vec N$, дна $\vec N_1$ и правой стенки $\vec N_2$ (стенки и дно гладкие, силы перпендикулярны поверхностям):

```latex
\begin{tikzpicture}[scale=1.3, every node/.style={font=\small}]
\fill[pattern=north east lines] (-0.18,-0.18) rectangle (0,2.6); \draw[thick] (0,0) -- (0,2.6);
  \fill[pattern=north east lines] (2.121,-0.18) rectangle (2.301,2.6); \draw[thick] (2.121,0) -- (2.121,2.6);
  \fill[pattern=north east lines] (-0.18,-0.18) rectangle (2.301,0); \draw[thick] (0,0) -- (2.121,0);
  \draw[very thick] (0,2.121) -- (2.121,0);
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,2.121) -- (0.6,2.121) node[above] {$\vec N$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (1.06,1.06) -- (1.06,0.4) node[left] {$m\vec g$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (2.121,0.05) -- (2.121,0.7) node[left] {$\vec N_1$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (2.121,0.05) -- (1.52,0.05) node[above left] {$\vec N_2$};
  \fill (2.121,0) circle (1.5pt); \node[below] at (2.121,-0.18) {$B$};
\end{tikzpicture}
```

2. Запишем правило моментов относительно нижнего конца стержня $B$: моменты сил $\vec N_1$ и $\vec N_2$ равны нулю. Пусть длина стержня $L$. Плечо силы $mg$ равно $\dfrac L2\sin\alpha$, плечо силы $N$ равно $L\cos\alpha$:
$$mg\cdot\frac L2\sin\alpha = N\cdot L\cos\alpha \quad\Rightarrow\quad N = \frac{mg}{2}\,\text{tg}\,\alpha = \frac{10}{2}\cdot 1 = 5~\text{Н}.$$
