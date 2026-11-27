---
id: fipi_2A8C90
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "7,5"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 2A8C90)
---

## Условие

На тонкий рычаг действуют силы так, как показано на рисунке. Сила $F_1 = 10$~Н; сила $F_2 = 2{,}5$~Н. Рычаг находится в равновесии. С какой силой рычаг давит на опору в точке $O$? Массой рычага пренебречь.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[line width=1.6pt] (-1.5,0) -- (4,0);
  \draw[thick, fill=white] (0,0) -- (-0.25,-0.45) -- (0.25,-0.45) -- cycle; \node[above] at (0,0) {$O$};
  \draw[-{Stealth[scale=0.9]}, very thick] (1,0) -- (1,-1.6) node[right] {$\vec F_1$};
  \draw[-{Stealth[scale=0.9]}, very thick] (4,0) -- (4,0.6) node[right] {$\vec F_2$};
\end{tikzpicture}
```

## Подсказка

Для равновесия нужно не только равенство моментов, но и равенство нулю суммы сил. Учтите силу реакции опоры.

## Решение

1. На рычаг действуют силы $\vec F_1$, $\vec F_2$ и сила реакции опоры $\vec N$:

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[line width=1.6pt] (-1.5,0) -- (4,0);
  \draw[thick, fill=white] (0,0) -- (-0.25,-0.45) -- (0.25,-0.45) -- cycle; \node[above left] at (0,0) {$O$};
  \draw[-{Stealth[scale=0.9]}, very thick] (1,0) -- (1,-1.6) node[right] {$\vec F_1$};
  \draw[-{Stealth[scale=0.9]}, very thick] (4,0) -- (4,0.6) node[right] {$\vec F_2$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,0) -- (0,1.2) node[right] {$\vec N$};
  \draw[|-|] (0,-0.75) -- node[below] {$l_1$} (1,-0.75); \draw[|-|] (0,0.95) -- node[above] {$l_2$} (4,0.95);
\end{tikzpicture}
```

2. Рычаг в равновесии, поэтому сумма сил равна нулю. По вертикали:
$$N + F_2 = F_1 \quad\Rightarrow\quad N = F_1 - F_2 = 10 - 2{,}5 = 7{,}5~\text{Н}.$$
(Моменты сил $\vec F_1$ и $\vec F_2$ относительно $O$ при этом уравновешены: $F_1l_1 = F_2l_2$, $l_2 = 4l_1$.)

3. По третьему закону Ньютона рычаг давит на опору с такой же силой: $7{,}5$~Н.
