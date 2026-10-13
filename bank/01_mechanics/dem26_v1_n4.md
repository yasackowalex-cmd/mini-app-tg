---
id: dem26_v1_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: Задание №4 (Статика, гидростатика, механические колебания и волны)
topic: 1.4.1
level: Б
type: расчётная
variant: 1
answer: "0,2"
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
40 & 0,6 & 120 & \\ \hline
\end{tabular}
\end{center}
Каково плечо $l_{2}$, если рычаг находится в равновесии?

## Решение

По правилу моментов рычаг в равновесии, если моменты сил равны: $F_1 l_1 = F_2 l_2$. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % рычаг и опора
  \draw[line width=2.2pt, brandSecondary] (-3.00,0) -- (1.00,0);
  \draw[thick, fill=gray!20] (0,-0.04) -- (-0.2,-0.42) -- (0.2,-0.42) -- cycle;
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-0.4,-0.42) rectangle (0.4,-0.56);
  \draw[thick, brandSecondary] (-0.4,-0.42) -- (0.4,-0.42);
  \fill (0,0) circle (1.4pt);
  \node[above] at (0,0.02) {$O$};
  % плечи
  \draw[densely dashed, gray] (-3.00,0.05) -- (-3.00,0.75) (1.00,0.05) -- (1.00,0.75) (0,0.35) -- (0,0.75);
  \draw[{Stealth[scale=0.6]}-{Stealth[scale=0.6]}] (-3.00,0.6) -- (0,0.6) node[midway, above] {$l_1$};
  \draw[{Stealth[scale=0.6]}-{Stealth[scale=0.6]}] (0,0.6) -- (1.00,0.6) node[midway, above] {$l_2$};
  % силы
  \draw[Fvec] (-3.00,0) -- (-3.00,-0.50) node[below] {$\vec F_1$};
  \draw[Fvec] (1.00,0) -- (1.00,-1.50) node[below] {$\vec F_2$};
\end{tikzpicture}
```

$$l_2 = \frac{F_1 l_1}{F_2} = \frac{40 \cdot 0{,}6}{120} = 0{,}2~\text{м}.$$
