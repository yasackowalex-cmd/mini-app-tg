---
id: uniform_v26_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: Задание №1 (Только равномерное прямолинейное движение)
topic: 1.1.2
level: Б
type: расчётная
variant: 26
answer: "4"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim01_RPD_author.tex
---

## Условие

На рисунке представлены графики зависимости координат $x$ двух тел, движущихся вдоль оси $Ox$, от времени $t$. Каково отношение модулей скоростей этих тел $\frac{v_1}{v_2}$?

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
    \draw[ultra thick, brandPrimary] (0,0) -- (10,20) node[right, black] {1};
    \draw[ultra thick, brandAccent] (0,5) -- (10,10) node[right, black] {2};
\end{tikzpicture}
```

## Решение

Скорость при равномерном движении — наклон графика $x(t)$.

Тело 1: от $0$ до $20$~м за $10$~с, $v_1 = \dfrac{20}{10} = 2$~м/с. Тело 2: от $5$ до $10$~м за $10$~с, $v_2 = \dfrac{5}{10} = 0{,}5$~м/с.

$$\frac{v_1}{v_2} = \frac{2}{0{,}5} = 4.$$
