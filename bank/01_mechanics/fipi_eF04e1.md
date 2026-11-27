---
id: fipi_eF04e1
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "16"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание eF04e1)
---

## Условие

На рисунке показан график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Какова проекция $a_x$ ускорения этого тела в интервале времени от $0$ до $0{,}5$~с? Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.6cm, y=0.25cm, every node/.style={font=\footnotesize}]
    \draw[xstep=0.5, ystep=2, gray!30, thin] (0,-6) grid (3,6);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.6,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-6) -- (0,8.4) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,6) {$6$};
    \node[left] at (0,4) {$4$};
    \node[left] at (0,2) {$2$};
    \node[left] at (0,-2) {$-2$};
    \node[left] at (0,-4) {$-4$};
    \node[left] at (0,-6) {$-6$};
    \node[left] at (0,0) {$0$};
    \node[below] at (1,0) {$1$};
    \node[below] at (2,0) {$2$};
    \node[below] at (3,0) {$3$};
    \draw[ultra thick, brandPrimary] (0,-6) -- (0.5,2) -- (1.5,2) -- (2,6) -- (2.5,0) -- (3,4);
\end{tikzpicture}
```

## Подсказка

На прямом участке графика $a_x = \dfrac{\Delta v_x}{\Delta t}$. Знак показывает, растёт проекция скорости или убывает. Одна клетка по времени — $0{,}5$~с.

## Решение

От $0$ до $0{,}5$~с проекция скорости выросла от $-6$ до $2$~м/с:
$$a_x = \frac{2 - (-6)}{0{,}5} = 16~\text{м/с}^2.$$
