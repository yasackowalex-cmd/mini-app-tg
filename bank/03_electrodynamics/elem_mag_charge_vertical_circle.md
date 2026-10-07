---
id: elem_mag_charge_vertical_circle
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: расчётная (часть 2)
variant: 7
answer: "\dfrac{m(5gL - v_{\text{н}}^2)}{BL\sqrt{v_{\text{н}}^2 - 4gL}}"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Маленькое положительно заряженное тело массой $m$, прикреплённое к невесомой нерастяжимой нити длиной $L$, может двигаться по окружности в вертикальной плоскости. Система находится в однородном магнитном поле, вектор магнитной индукции $\vec{B}$ которого перпендикулярен плоскости движения тела и направлен так, как показано на рисунке. Модуль наименьшей скорости тела в нижней точке, при которой тело совершает полный оборот по окружности, равен $v_{\text{н}}$. Модуль индукции магнитного поля равен $B$. Найдите заряд тела.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % Ось/точка подвеса O
    \fill[black] (2.5,2.5) circle (1.5pt) node[above right] {$O$};
    
    % Нить L
    \draw[thick, black] (2.5,2.5) -- (2.5,0.8);
    \node[right] at (2.5,1.65) {$L$};
    
    % Груз m
    \fill[black] (2.5,0.8) circle (3pt) node[below left] {$m$};
    
    % Вектор v_н (вправо)
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.5,0.8) -- (3.5,0.8) node[below] {$\vec{v}_{\text{н}}$};
    
    % Вектор B (на нас)
    \draw[thick, black] (1.2,2.0) circle (0.15);
    \fill[black] (1.2,2.0) circle (1.5pt);
    \node[below=2pt] at (1.2,1.85) {$\vec{B}$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
