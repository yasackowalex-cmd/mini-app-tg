---
id: elem_ohm_v5_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: ЗАКОН ОМА ДЛЯ УЧАСТКА ЦЕПИ. УДЕЛЬНОЕ СОПРОТИВЛЕНИЕ
topic: 3.1.4
level: Б
type: расчётная
variant: 5
answer: "0,5"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, ЗАКОН_ОМА]
source: ohm1.tex
---

## Условие

На рисунке показаны графики зависимости силы тока $I$ от напряжения $U$ для двух резисторов. Чему равно отношение сопротивлений этих резисторов $\frac{R_1}{R_2}$?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Сетка gray!30
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$U$, В};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$I$, А};
    
    % Графики VAH
    % Проводник 1: R1=2 Ом -> I = U/2 (проходит через (0,0), (2,1), (4,2))
    \draw[ultra thick, brandPrimary] (0,0) -- (4,2) node[right] {1};
    
    % Проводник 2: R2=1 Ом -> I = U/1 (проходит через (0,0), (2,2), (4,4))
    \draw[ultra thick, brandPrimary] (0,0) -- (4,4) node[above right] {2};
    
    % Точки на узлах
    \fill[black] (2,1) circle (1.5pt);
    \fill[black] (4,2) circle (1.5pt);
    \fill[black] (2,2) circle (1.5pt);
    \fill[black] (4,4) circle (1.5pt);
    
    % Пунктиры
    \draw[dashed, gray] (2,0) -- (2,2);
    \draw[dashed, gray] (4,0) -- (4,4);
    \draw[dashed, gray] (0,1) -- (2,1);
    \draw[dashed, gray] (0,2) -- (4,2);
    \draw[dashed, gray] (0,4) -- (4,4);
    
    % Оцифровка
    \node[left] at (0,1) {1};
    \node[left] at (0,2) {2};
    \node[left] at (0,4) {4};
    \node[below] at (2,0) {2};
    \node[below] at (4,0) {4};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
