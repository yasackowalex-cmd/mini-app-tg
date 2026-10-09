---
id: elem_ind_v1_n14
exam: ЕГЭ
kim: 14
section: Электродинамика
theme: МАГНИТНЫЙ ПОТОК. ЭЛЕКТРОМАГНИТНАЯ ИНДУКЦИЯ. САМОИНДУКЦИЯ
topic: 3.2.2
level: Б
type: соответствие/выбор
variant: 1
answer: "34"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ИНДУКЦИЯ, САМОИНДУКЦИЯ]
source: ind.tex
---

## Условие

На железный сердечник надеты две катушки, как показано на рисунке. По правой катушке пропускают ток. Сила тока в правой катушке меняется с течением времени согласно приведённому графику. На основании этого графика выберите все верные утверждения о процессах, происходящих в катушках и сердечнике. ЭДС самоиндукции можно пренебречь.

1) В течение всего времени измерений сила тока через амперметр отлична от 0.\\
2) В момент времени $3\text{ с}$ показания амперметра равны 0.\\
3) В промежутках времени $0\text{--}1\text{ с}$ и $2\text{--}3\text{ с}$ сила тока в левой катушке одинакова по абсолютной величине.\\
4) В промежутках времени $2\text{--}3\text{ с}$ и $3\text{--}4\text{ с}$ направление тока в левой катушке одинаково.\\
5) В промежутке времени между $1$ и $2\text{ с}$ индукция магнитного поля в сердечнике равна 0.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % График i(t)
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,4);
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,2) -- (5.5,2) node[right] {$t$, с};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$i$, А};
    
    % График
    \draw[ultra thick, brandPrimary] (0,2) -- (1,4) -- (2,4) -- (4,0) -- (5,0);
    
    % Узлы
    \fill[black] (0,2) circle (1.5pt);
    \fill[black] (1,4) circle (1.5pt);
    \fill[black] (2,4) circle (1.5pt);
    \fill[black] (3,2) circle (1.5pt);
    \fill[black] (4,0) circle (1.5pt);
    \fill[black] (5,0) circle (1.5pt);
    
    % Оцифровка
    \node[left] at (0,4) {2};
    \node[left] at (0,3) {1};
    \node[left] at (0,2) {0};
    \node[left] at (0,1) {--1};
    \node[left] at (0,0) {--2};
    
    \node[below] at (1,2) {1};
    \node[below] at (2,2) {2};
    \node[below left] at (3,2) {3};
    \node[above] at (4,2) {4};
    \node[above] at (5,2) {5};
\end{tikzpicture}
```

## Решение

TODO
