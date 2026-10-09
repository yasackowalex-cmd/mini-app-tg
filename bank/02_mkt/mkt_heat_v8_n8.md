---
id: mkt_heat_v8_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: КОЛИЧЕСТВО ТЕПЛОТЫ. УДЕЛЬНАЯ ТЕПЛОЕМКОСТЬ. ФАЗОВЫЕ ПЕРЕХОДЫ
topic: 2.4
level: Б
type: расчётная
variant: 8
answer: "3"
unit: "кг"
has_image: true
author_task: false
tags: [МКТ, ТЕПЛОТА]
source: cal.tex
---

## Условие

Твёрдое тело нагревают. На рисунке представлен график зависимости абсолютной температуры тела от полученного им количества теплоты. Удельная теплоёмкость вещества, из которого состоит тело, равна $720$~Дж/(кг$\cdot$К). Чему равна масса тела?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$Q, \text{ кДж}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$t, \,^{\circ}\text{C}$};
    
    \coordinate (A) at (0,1);
    \coordinate (B) at (4,3.4);
    
    \draw[ultra thick, brandPrimary] (A) -- (B);
    
    \draw[dashed, gray] (1,0) -- (1,1.6);
    \draw[dashed, gray] (2,0) -- (2,2.2);
    \draw[dashed, gray] (3,0) -- (3,2.8);
    \draw[dashed, gray] (4,0) -- (4,3.4);
    
    \node[left] at (0,1) {100};
    \node[left] at (0,2) {150};
    \node[left] at (0,3) {200};
    \node[below] at (1,0) {120};
    \node[below] at (2,0) {240};
    \node[below] at (3,0) {360};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
