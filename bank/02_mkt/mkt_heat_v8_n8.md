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
answer: "5"
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
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,5);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$Q, \text{ кДж}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$t, \,^{\circ}\text{C}$};
    
    \coordinate (A) at (0,2);
    \coordinate (B) at (3.75,4.5);
    
    \draw[ultra thick, brandPrimary] (A) -- (B);
    
    
    \node[left] at (0,1) {50};
    \node[left] at (0,2) {100};
    \node[left] at (0,3) {150};
    \node[left] at (0,4) {200};
    \node[left] at (0,5) {250};
    \node[below] at (1,0) {120};
    \node[below] at (2,0) {240};
    \node[below] at (3,0) {360};
    \node[below] at (4,0) {480};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

По графику при получении $Q = 360$~кДж температура тела выросла от $100$ до $200~^\circ$C, то есть $\Delta T = 100$~К.

$$Q = cm\Delta T \;\Rightarrow\; m = \frac{Q}{c\,\Delta T} = \frac{360\,000}{720 \cdot 100} = 5~\text{кг}.$$
