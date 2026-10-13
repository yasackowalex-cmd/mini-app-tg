---
id: statics_v02_n04
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
variant: 
answer: "0,3"
unit: "м"
has_image: false
author_task: false
tags: []
source: statics.tex
---

## Условие

Школьник выполнял лабораторную работу по исследованию условий равновесия лёгкого рычага под действием двух сил. Полученные результаты он занёс в таблицу.

\begin{center}
\begin{tabular}{|c|c|c|c|}
\hline
$F_{1}$, Н & $l_{1}$, м & $F_{2}$, Н & $l_{2}$, м \\ \hline
80 & ? & 120 & 0{,}2 \\ \hline
\end{tabular}
\end{center}

Каково плечо $l_{1}$, если рычаг находится в равновесии?

## Решение

Рычаг в равновесии, поэтому моменты сил равны: $F_1 l_1 = F_2 l_2$. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % опора
  \draw[thick, fill=gray!15] (0,0) -- (-0.2,-0.4) -- (0.2,-0.4) -- cycle;
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.4,-0.52) rectangle (0.4,-0.4);
  \draw[thick, brandSecondary] (-0.4,-0.4) -- (0.4,-0.4);
  % рычаг
  \draw[thick, fill=brandPrimary!10] (-1.92,0) rectangle (1.28,0.12);
  \fill (0,0) circle (1.2pt);
  % плечи
  \draw[thin, |<->|] (-1.92,0.45) -- (0,0.45) node[midway, above] {$l_1$};
  \draw[thin, |<->|] (0,0.45) -- (1.28,0.45) node[midway, above] {$l_2$};
  \draw[thin, dashed] (0,0.12) -- (0,0.6);
  % силы
  \draw[Fvec] (-1.92,0) -- (-1.92,-0.67) node[below] {$\vec F_1$};
  \draw[Fvec] (1.28,0) -- (1.28,-1.00) node[below] {$\vec F_2$};
\end{tikzpicture}
```

$$l_1 = \frac{F_2 l_2}{F_1} = \frac{120 \cdot 0{,}2}{80} = 0{,}3~\text{м}.$$
