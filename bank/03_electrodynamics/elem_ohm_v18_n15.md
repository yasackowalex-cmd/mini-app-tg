---
id: elem_ohm_v18_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: ЗАКОН ОМА ДЛЯ УЧАСТКА ЦЕПИ. УДЕЛЬНОЕ СОПРОТИВЛЕНИЕ
topic: 3.1.4
level: Б
type: соответствие/выбор
variant: 18
answer: "15"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, ЗАКОН_ОМА]
source: ohm1.tex
---

## Условие

На рисунке приведён график зависимости силы тока $I$ в реостате от напряжения $U$ на его зажимах. Из приведённого ниже списка выберите все верные утверждения относительно характеристик реостата.

1) Электрическое сопротивление реостата равно $3\text{ Ом}$.\\
2) При напряжении $3\text{ В}$ сила тока в реостате равна $2\text{ А}$.\\
3) С увеличением напряжения сопротивление реостата увеличивается.\\
4) При силе тока $1\text{ А}$ напряжение на реостате равно $1{,}5\text{ В}$.\\
5) При напряжении $12\text{ В}$ сила тока в реостате равна $4\text{ А}$.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$U$, В};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$I$, А};
    
    % График VAH (проходит через (0,0) и (3,2))
    \draw[ultra thick, brandPrimary] (0,0) -- (4.5,3);
    
    \fill[black] (3,2) circle (1.5pt);
    \draw[dashed, gray] (3,0) -- (3,2);
    \draw[dashed, gray] (0,2) -- (3,2);
    
    \node[left] at (0,2) {2};
    \node[below] at (3,0) {6};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
