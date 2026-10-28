---
id: dem27_v9_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: КОЛИЧЕСТВО ТЕПЛОТЫ. УДЕЛЬНАЯ ТЕПЛОЕМКОСТЬ. ФАЗОВЫЕ ПЕРЕХОДЫ
topic: 2.4
level: Б
type: расчётная
variant: 9
answer: "2000"
unit: "кДж/кг"
has_image: true
author_task: false
tags: [МКТ, ТЕПЛОТА]
source: Демидова, ЕГЭ-2027, 30 вариантов (вариант 9)
---

## Условие

На рисунке показан график зависимости температуры вещества в процессе теплообмена с окружающей средой от отдаваемого им количества теплоты. Масса вещества равна $150$~г. Первоначально вещество было в газообразном состоянии. Какова удельная теплота парообразования вещества?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=0.5, ystep=0.5, gray!45, very thin] (0,0) grid (6,4);
    \draw[xstep=1, ystep=1, gray!70, thin] (0,0) grid (6,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$Q, 10^5\text{ Дж}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$t, \,^{\circ}\text{C}$};
    
    \coordinate (A) at (0,4);
    \coordinate (B) at (1,2.5);
    \coordinate (C) at (4,2.5);
    \coordinate (D) at (6,0.5);
    
    \draw[ultra thick, brandPrimary] (A) -- (B) -- (C) -- (D);
    
    
    \node[left] at (0,1) {20};
    \node[left] at (0,2) {40};
    \node[left] at (0,3) {60};
    \node[left] at (0,4) {80};
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

Вещество сначала было газом и отдавало теплоту. Горизонтальный участок графика — конденсация: температура постоянна, пока весь пар не превратится в жидкость. Он длится от $1\cdot 10^5$ до $4\cdot 10^5$ Дж, то есть при конденсации выделилось $Q = 3\cdot 10^5$ Дж.

$$L = \frac{Q}{m} = \frac{3\cdot 10^5}{0{,}15} = 2\cdot 10^6~\text{Дж/кг} = 2000~\text{кДж/кг}.$$
