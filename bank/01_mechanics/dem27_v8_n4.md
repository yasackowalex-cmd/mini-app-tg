---
id: dem27_v8_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
variant: 8
answer: "21"
unit: "см"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Демидова, ЕГЭ-2027, 30 вариантов (вариант 8)
---

## Условие

Невесомый рычаг находится в равновесии, когда к его правому плечу длиной $l_2 = 15$~см подвешен груз массой $m_2 = 0{,}2$~кг, а к левому плечу длиной $l_1$ — груз массой $m_1 = 0{,}5$~кг (см. рисунок). Чему равна длина рычага $l$?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
\fill[pattern=north east lines, pattern color=brandSecondary!70] (-0.8,2.0) rectangle (0.8,2.25);
  \draw[thick] (-0.8,2.0) -- (0.8,2.0);
  \draw[thick] (0,2.0) -- (0,0);
  \draw[very thick] (-1.6,0) -- (4,0);
  \fill (0,0) circle (1.5pt);
  \draw[thick] (-1.6,0) -- (-1.6,-0.6); \draw[thick] (4,0) -- (4,-0.6);
  \draw[thick, fill=brandAccent!20] (-1.95,-0.6) rectangle (-1.25,-1.3); \node at (-1.6,-0.95) {$m_1$};
  \draw[thick, fill=brandAccent!20] (3.7,-0.6) rectangle (4.3,-1.2); \node at (4,-0.9) {$m_2$};
  \draw[|-|, thin] (-1.6,0.35) -- (0,0.35); \node[above] at (-0.8,0.35) {$l_1$};
  \draw[|-|, thin] (0,0.35) -- (4,0.35); \node[above] at (2,0.35) {$l_2$};
\end{tikzpicture}
```

## Решение

Правило моментов: момент силы, поворачивающей рычаг против часовой стрелки, равен моменту силы, поворачивающей его по часовой стрелке:
$$m_1gl_1 = m_2gl_2, \qquad l_1 = \frac{m_2l_2}{m_1} = \frac{0{,}2 \cdot 15}{0{,}5} = 6~\text{см}.$$
Длина рычага $l = l_1 + l_2 = 6 + 15 = 21$~см.
