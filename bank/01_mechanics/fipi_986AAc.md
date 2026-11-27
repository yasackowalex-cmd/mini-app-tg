---
id: fipi_986AAc
exam: ЕГЭ
kim: 2
section: Механика
theme: СИЛА УПРУГОСТИ (ЗАКОН ГУКА)
topic: 1.2.4
level: Б
type: расчётная
answer: "250"
unit: "Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, СИЛА_УПРУГОСТИ, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 986AAc)
---

## Условие

На рисунке представлен график зависимости модуля силы упругости $F$ от удлинения пружины $x$.

[[рис 1]]

Какова жёсткость пружины?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.2cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=5, gray!30, thin] (0,0) grid (6,15);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (8.4,0) node[right] {$x$, см};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,21) node[above] {$F$, Н};
    \node[left] at (0,5) {$5$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,15) {$15$};
    \node[below left] at (0,0) {$0$};
    \node[below] at (2,0) {$2$};
    \node[below] at (4,0) {$4$};
    \node[below] at (6,0) {$6$};
    \draw[ultra thick, brandPrimary] (0,0) -- (6,15);
\end{tikzpicture}
```

## Подсказка

По закону Гука $F = kx$. Возьмите точку графика на пересечении линий сетки и переведите сантиметры в метры.

## Решение

По закону Гука $F = kx$, откуда $k = \dfrac Fx$. По графику при $x = 6$~см $= 0{,}06$~м сила $F = 15$~Н:
$$k = \frac{15}{0{,}06} = 250~\text{Н/м}.$$
