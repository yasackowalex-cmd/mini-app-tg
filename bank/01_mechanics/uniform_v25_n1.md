---
id: uniform_v25_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 25
answer: "6"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

Два тела движутся вдоль оси $Ox$. На рисунке приведены графики зависимости их координат $x$ от времени $t$. Чему равно расстояние между телами в момент времени $t = 4$~с?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.5cm, y=0.15cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=5, gray!30, thin] (0,0) grid (10,25);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (11,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,27) node[above] {$x, \text{ м}$};
    \node[left] at (0,25) {$25$};
    \node[left] at (0,20) {$20$};
    \node[left] at (0,15) {$15$};
    \node[left] at (0,10) {$10$};
    \node[left] at (0,5) {$5$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {2,4,6,8,10} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,0) -- (10,25);
    \draw[ultra thick, brandAccent] (0,20) -- (10,10);
\end{tikzpicture}
```

## Решение

Найдём координаты тел в момент $t = 4$~с. Первое тело: $x_1 = \dfrac{25}{10}\,t = 2{,}5 \cdot 4 = 10$~м. Второе тело: $x_2 = 20 - \dfrac{10}{10}\,t = 20 - 4 = 16$~м.

$$\Delta x = x_2 - x_1 = 16 - 10 = 6~\text{м}.$$
