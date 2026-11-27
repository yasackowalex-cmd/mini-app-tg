---
id: fipi_D795BB
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "300"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание D795BB)
---

## Условие

Груз поднимают с помощью рычага (см. рисунок). Рычаг состоит из шарнира без трения и однородного стержня массой $m = 20$~кг и длиной $L = 4$~м. Расстояние от оси шарнира до точки подвеса груза равно $b = 1$~м. Какую вертикальную силу надо приложить к концу рычага, чтобы медленно поднимать груз массой $M = 80$~кг?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-1.4,-0.15) rectangle (0.3,0);
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (0.3,-2.2) rectangle (0.45,0);
  \draw[thick] (-1.4,0) -- (0.3,0) -- (0.3,-2.2);
  \draw[thick, fill=white] (0,0.5) -- (-0.25,0) -- (0.25,0) -- cycle;
  \draw[thick, fill=white] (0,0.5) rectangle (4,0.62); \fill (0,0.56) circle (1.5pt);
  \node[below] at (3,0.5) {$m$};
  \draw (1,0.5) -- (1,-1.3); \draw[thick, fill=white] (0.7,-1.3) rectangle (1.3,-1.9); \node at (1,-1.6) {$M$};
  \draw[-{Stealth[scale=0.9]}, very thick] (4,0.62) -- (4,1.6) node[right] {$\vec F$};
  \draw[{Stealth[scale=0.7]}-{Stealth[scale=0.7]}] (0,1.0) -- node[above] {$b$} (1,1.0);
  \draw[{Stealth[scale=0.7]}-{Stealth[scale=0.7]}] (0,1.45) -- node[above] {$L$} (4,1.45);
\end{tikzpicture}
```

## Подсказка

Запишите правило моментов относительно оси шарнира. Сила тяжести однородного стержня приложена к его середине.

## Решение

Груз поднимают медленно, рычаг можно считать находящимся в равновесии. Относительно оси шарнира на рычаг действуют: вес груза $Mg$ с плечом $b$, сила тяжести стержня $mg$ (приложена к его середине, плечо $\dfrac L2$) и сила $F$ с плечом $L$. По правилу моментов
$$FL = Mgb + mg\frac L2 \quad\Rightarrow\quad F = \frac{800\cdot 1 + 200\cdot 2}{4} = \frac{1200}{4} = 300~\text{Н}.$$
