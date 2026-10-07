---
id: elem_cap_v7_n14
exam: ЕГЭ
kim: 14
section: Электродинамика
theme: ПРОВОДНИКИ И ДИЭЛЕКТРИКИ В ЭЛЕКТРИЧЕСКОМ ПОЛЕ. КОНДЕНСАТОР
topic: 3.1.3
level: Б
type: соответствие/выбор
variant: 7
answer: "15"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ПРОВОДНИКИ]
source: cap.tex
---

## Условие

Незаряженное металлическое тело незамкнутой формы внесли во внешнее однородное электростатическое поле с напряжённостью $\vec{E}_0$. На рисунке показано сечение тела и точки $A, B, C, D$. Из приведённого ниже списка выберите все верные утверждения относительно электростатического состояния тела.

1) Напряжённость суммарного электрического поля в точке $B$ равна нулю.\\
2) Потенциал электрического поля в точке $A$ больше, чем в точке $C$.\\
3) Концентрация свободных электронов в точке $A$ меньше, чем в точке $C$.\\
4) Напряжённость поля в точке $C$ больше, чем напряжённость внешнего поля $E_0$.\\
5) Потенциалы электрического поля во всех внутренних точках металлического тела одинаковы.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,3);
    
    % Силовые линии внешнего поля
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (0.2,0.6) -- (1.2,0.6);
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (0.2,1.5) -- (1.2,1.5) node[above left] {$\vec{E}_0$};
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (0.2,2.4) -- (1.2,2.4);
    
    % Проводник
    \draw[ultra thick, black, fill=gray!20] (2,0.5) -- (4,0.5) arc (-90:90:1) -- (2,2.5) arc (90:270:0.5) -- cycle;
    
    % Точки
    \fill[black] (1.6,1.5) circle (1.5pt) node[left] {$A$};
    \fill[black] (3,1.5) circle (1.5pt) node[above] {$B$};
    \fill[black] (4.4,1.5) circle (1.5pt) node[right] {$C$};
    \fill[black] (3,0.5) circle (1.5pt) node[below] {$D$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
