---
id: dem24_v9_n4
exam: ЕГЭ
kim: 4
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5
level: Б
type: расчётная
variant: 9
answer: "3"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА, КОЛЕБАНИЯ, ГРАФИКИ]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 9)
---

## Условие

На рисунке представлены графики зависимости координат двух тел от времени. Чему равно отношение амплитуд $\dfrac{A_1}{A_2}$ колебаний этих тел?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
\draw[step=0.5, gray!40, thin] (0,-1.5) grid (4.5,1.5);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (5.0,0) node[below] {$t$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-1.5) -- (0,1.9) node[left] {$x$};
  \node[left] at (0,0) {$0$};
  \draw[very thick, brandPrimary, domain=0:4, samples=160] plot (\x, {1.5*sin(180*\x)});
  \draw[very thick, black, domain=0:4, samples=120] plot (\x, {0.5*sin(90*\x)});
  \node at (0.5,1.75) {1};
  \node at (1.0,0.75) {2};
\end{tikzpicture}
```

## Решение

Амплитуда — наибольшее отклонение от положения равновесия $x = 0$. По графику наибольшее отклонение тела 1 — три клетки, тела 2 — одна клетка:
$$\frac{A_1}{A_2} = \frac31 = 3.$$
