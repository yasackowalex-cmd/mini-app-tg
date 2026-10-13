---
id: statics_v01_n04
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
variant: 
answer: "0,2"
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
40 & 0{,}6 & 120 & ? \\ \hline
\end{tabular}
\end{center}

Каково плечо $l_{2}$, если рычаг находится в равновесии?

## Решение

По правилу моментов рычаг в равновесии, если моменты сил равны: $F_1 l_1 = F_2 l_2$. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % опора
  \draw[thick, fill=gray!15] (0,0) -- (-0.2,-0.4) -- (0.2,-0.4) -- cycle;
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.4,-0.52) rectangle (0.4,-0.4);
  \draw[thick, brandSecondary] (-0.4,-0.4) -- (0.4,-0.4);
  % рычаг
  \draw[thick, fill=brandPrimary!10] (-2.40,0) rectangle (0.80,0.12);
  \fill (0,0) circle (1.2pt);
  % плечи
  \draw[thin, |<->|] (-2.40,0.45) -- (0,0.45) node[midway, above] {$l_1$};
  \draw[thin, |<->|] (0,0.45) -- (0.80,0.45) node[midway, above] {$l_2$};
  \draw[thin, dashed] (0,0.12) -- (0,0.6);
  % силы
  \draw[Fvec] (-2.40,0) -- (-2.40,-0.35) node[below] {$\vec F_1$};
  \draw[Fvec] (0.80,0) -- (0.80,-1.00) node[below] {$\vec F_2$};
\end{tikzpicture}
```

$$l_2 = \frac{F_1 l_1}{F_2} = \frac{40 \cdot 0{,}6}{120} = 0{,}2~\text{м}.$$
