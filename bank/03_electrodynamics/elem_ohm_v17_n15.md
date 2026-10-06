---
id: elem_ohm_v17_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: ЗАКОН ОМА ДЛЯ УЧАСТКА ЦЕПИ. УДЕЛЬНОЕ СОПРОТИВЛЕНИЕ
topic: 3.1.4
level: Б
type: расчётная
variant: 17
answer: "24"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, ЗАКОН_ОМА]
source: ohm1.tex
---

## Условие

На рисунке показаны графики зависимости силы тока $I$ от напряжения $U$ для двух цилиндрических проводников 1 и 2 одинаковой длины и одинаковой площади поперечного сечения, изготовленных из разных металлов. Из приведённого ниже списка выберите все верные утверждения относительно этих проводников.

1) Сопротивление первого проводника больше сопротивления второго проводника.\\
2) Электрическое сопротивление второго проводника в $2$ раза больше сопротивления первого проводника.\\
3) Удельное сопротивление материала первого проводника больше удельного сопротивления материала второго проводника.\\
4) При одинаковом напряжении сила тока в первом проводнике в $2$ раза больше, чем во втором.\\
5) При одинаковой силе тока напряжение на концах первого проводника больше, чем на концах второго.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$U$, В};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$I$, А};
    
    % График 1: R1 = 1 Ом (I = U)
    \draw[ultra thick, brandPrimary] (0,0) -- (4,4) node[above right] {1};
    
    % График 2: R2 = 2 Ом (I = U/2)
    \draw[ultra thick, brandPrimary] (0,0) -- (4,2) node[right] {2};
    
    % Точки
    \fill[black] (2,2) circle (1.5pt);
    \fill[black] (4,4) circle (1.5pt);
    \fill[black] (2,1) circle (1.5pt);
    \fill[black] (4,2) circle (1.5pt);
    
    % Пунктиры
    \draw[dashed, gray] (2,0) -- (2,2);
    \draw[dashed, gray] (4,0) -- (4,4);
    \draw[dashed, gray] (0,1) -- (2,1);
    \draw[dashed, gray] (0,2) -- (4,2);
    \draw[dashed, gray] (0,4) -- (4,4);
    
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
