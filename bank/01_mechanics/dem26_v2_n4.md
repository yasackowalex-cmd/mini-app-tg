---
id: dem26_v2_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: Задание №4 (Статика, гидростатика, механические колебания и волны)
topic: 1.4.1
level: Б
type: расчётная
variant: 2
answer: "0,3"
unit: "м"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: kim04.tex
---

## Условие

Школьник выполнял лабораторную работу по исследованию условий равновесия лёгкого рычага под действием двух сил. Полученные результаты он занёс в таблицу:
\begin{center}
\begin{tabular}{|c|c|c|c|}
\hline
$F_{1}$, Н & $l_{1}$, м & $F_{2}$, Н & $l_{2}$, м \\ \hline
80 & & 120 & 0,2 \\ \hline
\end{tabular}
\end{center}
Каково плечо $l_{1}$, если рычаг находится в равновесии?

## Решение

Условие равновесия рычага — равенство моментов сил: $F_1 l_1 = F_2 l_2$. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % рычаг и опора
  \draw[line width=2.2pt, brandSecondary] (-2.40,0) -- (1.60,0);
  \draw[thick, fill=gray!20] (0,-0.04) -- (-0.2,-0.42) -- (0.2,-0.42) -- cycle;
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-0.4,-0.42) rectangle (0.4,-0.56);
  \draw[thick, brandSecondary] (-0.4,-0.42) -- (0.4,-0.42);
  \fill (0,0) circle (1.4pt);
  \node[above] at (0,0.02) {$O$};
  % плечи
  \draw[densely dashed, gray] (-2.40,0.05) -- (-2.40,0.75) (1.60,0.05) -- (1.60,0.75) (0,0.35) -- (0,0.75);
  \draw[{Stealth[scale=0.6]}-{Stealth[scale=0.6]}] (-2.40,0.6) -- (0,0.6) node[midway, above] {$l_1$};
  \draw[{Stealth[scale=0.6]}-{Stealth[scale=0.6]}] (0,0.6) -- (1.60,0.6) node[midway, above] {$l_2$};
  % силы
  \draw[Fvec] (-2.40,0) -- (-2.40,-1.00) node[below] {$\vec F_1$};
  \draw[Fvec] (1.60,0) -- (1.60,-1.50) node[below] {$\vec F_2$};
\end{tikzpicture}
```

$$l_1 = \frac{F_2 l_2}{F_1} = \frac{120 \cdot 0{,}2}{80} = 0{,}3~\text{м}.$$
