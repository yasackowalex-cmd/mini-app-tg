---
id: dem24_v6_n3
exam: ЕГЭ
kim: 4
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5
level: Б
type: расчётная
variant: 6
answer: "2"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА, КОЛЕБАНИЯ, ГРАФИКИ]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 6)
---

## Условие

На рисунке представлены графики зависимости координаты $x$ от времени $t$ для двух тел. Чему равно отношение частот колебаний этих тел $\dfrac{\nu_2}{\nu_1}$?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
\draw[step=1, gray!40, thin] (0,-1.5) grid (5,1.5);
  \foreach \y in {-1,-0.5,0,0.5,1} \draw[gray!40, thin] (0,\y) -- (5,\y);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (5.5,0) node[below] {$t$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-1.5) -- (0,1.9) node[left] {$x$};
  \node[left] at (0,0) {$0$};
  \draw[very thick, brandPrimary, domain=0:4, samples=120] plot (\x, {-sin(90*\x)});
  \draw[very thick, black, domain=0:4, samples=160] plot (\x, {0.5*sin(180*\x)});
  \node at (0.5,0.8) {2};
  \node at (1,-1.25) {1};
\end{tikzpicture}
```

## Решение

По графику период колебаний тела 1 равен $4$ клеткам, тела 2 — $2$ клеткам: $T_1 = 2T_2$. Частота $\nu = \dfrac1T$, поэтому
$$\frac{\nu_2}{\nu_1} = \frac{T_1}{T_2} = 2.$$
