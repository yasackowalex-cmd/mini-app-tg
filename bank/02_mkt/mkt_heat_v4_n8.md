---
id: mkt_heat_v4_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: КОЛИЧЕСТВО ТЕПЛОТЫ. УДЕЛЬНАЯ ТЕПЛОЕМКОСТЬ. ФАЗОВЫЕ ПЕРЕХОДЫ
topic: 2.4
level: Б
type: расчётная
variant: 4
answer: "250"
unit: "кДж/кг"
has_image: true
author_task: false
tags: [МКТ, ТЕПЛОТА]
source: cal.tex
---

## Условие

На рисунке показан график зависимости температуры вещества в процессе теплообмена с окружающей средой от отдаваемого им количества теплоты. Масса вещества равна $1{,}2$~кг. Первоначально вещество было в жидком состоянии. Какова удельная теплота плавления вещества?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$Q, 10^5\text{ Дж}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$t, \,^{\circ}\text{C}$};
    
    \coordinate (A) at (0,4);
    \coordinate (B) at (1,2.5);
    \coordinate (C) at (4,2.5);
    \coordinate (D) at (6,0.5);
    
    \draw[ultra thick, brandPrimary] (A) -- (B) -- (C) -- (D);
    
    \draw[dashed, gray] (1,0) -- (1,2.5);
    \draw[dashed, gray] (2,0) -- (2,2.5);
    \draw[dashed, gray] (3,0) -- (3,2.5);
    \draw[dashed, gray] (4,0) -- (4,2.5);
    \draw[dashed, gray] (5,0) -- (5,1.5);
    \draw[dashed, gray] (6,0) -- (6,0.5);
    
    \node[below] at (1,0) {1};
    \node[below] at (2,0) {2};
    \node[below] at (3,0) {3};
    \node[below] at (4,0) {4};
    \node[below] at (5,0) {5};
    \node[below] at (6,0) {6};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Вещество было жидким и остывало. Горизонтальный участок графика — кристаллизация: температура не меняется, а вещество отдаёт теплоту плавления.

По графику этот участок идёт от $Q = 1 \cdot 10^5$ до $Q = 4 \cdot 10^5$~Дж, то есть $Q = 3 \cdot 10^5$~Дж.

$$\lambda = \frac{Q}{m} = \frac{3 \cdot 10^5}{1{,}2} = 2{,}5 \cdot 10^5~\text{Дж/кг} = 250~\text{кДж/кг}.$$
