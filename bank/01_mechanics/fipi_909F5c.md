---
id: fipi_909F5c
exam: ЕГЭ
kim: 2
section: Механика
theme: СИЛА УПРУГОСТИ (ЗАКОН ГУКА)
topic: 1.2.4
level: Б
type: расчётная
answer: "100"
unit: "Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, СИЛА_УПРУГОСТИ, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 909F5c)
---

## Условие

На рисунке представлен график зависимости модуля силы упругости $F$ пружины от её удлинения $x$.

[[рис 1]]

Чему равна жёсткость пружины?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.8cm, y=0.8cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (5.2,0) node[right] {$x$, $10^{-2}$ м};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.2) node[above] {$F$, Н};
    \node[left] at (0,1) {$1$};
    \node[left] at (0,2) {$2$};
    \node[left] at (0,3) {$3$};
    \node[left] at (0,4) {$4$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (1,0) {$1$};
    \node[below] at (2,0) {$2$};
    \node[below] at (3,0) {$3$};
    \node[below] at (4,0) {$4$};
    \draw[ultra thick, brandPrimary] (0,0) -- (4,4);
\end{tikzpicture}
```

## Подсказка

По закону Гука $F = kx$. Возьмите точку графика на пересечении линий сетки и переведите удлинение в метры.

## Решение

По закону Гука $F = kx$, откуда $k = \dfrac Fx$. По графику при $x = 4\cdot 10^{-2}$~м сила $F = 4$~Н:
$$k = \frac{4}{0{,}04} = 100~\text{Н/м}.$$
