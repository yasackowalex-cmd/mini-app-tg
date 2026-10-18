---
id: mkt_cyc_v24_t2_q120kj
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: В
type: расчётная (часть 2)
variant: 
answer: "301"
unit: "К"
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

В цикле, показанном на $pV$-диаграмме, $\nu = 4$~моль разреженного гелия получает от нагревателя количество теплоты $Q_{\text{нагр}} = 120$~кДж. Найдите температуру $T_2$ гелия в состоянии 2.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Сетка gray!30
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,4);
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (5.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    % Координаты точек: 1=(1,1), 2=(1,2), 3=(4,3)
    \coordinate (1) at (1,1);
    \coordinate (2) at (1,2);
    \coordinate (3) at (4,3);
    
    % Процесс 1->2 (изохора)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1,1.6);
    \draw[ultra thick, brandPrimary] (1,1.5) -- (2);
    
    % Процесс 2->3 (линейный)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.6,2.53);
    \draw[ultra thick, brandPrimary] (2.5,2.5) -- (3);
    
    % Процесс 3->1 (линейный)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (2.4,1.93);
    \draw[ultra thick, brandPrimary] (2.5,2.0) -- (1);
    
    
    % Точки
    \fill[black] (1) circle (1.5pt) node[below left] {1};
    \fill[black] (2) circle (1.5pt) node[above left] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    % Подписи на осях
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,3) {$3p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (4,0) {$4V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

По графику: $p_1 = p_0$, $V_1 = V_2 = V_0$, $p_2 = 2p_0$, $p_3 = 3p_0$, $V_3 = 4V_0$.

Внутренняя энергия одноатомного газа $U = \dfrac{3}{2}\nu RT = \dfrac{3}{2}pV$. По первому закону термодинамики $Q = \Delta U + A$.

Процесс 1–2 (изохорное нагревание, $A_{12} = 0$): $Q_{12} = \dfrac{3}{2}(2p_0 - p_0)V_0 = 1{,}5p_0V_0 > 0$.

Процесс 2–3 (расширение с ростом давления, газ нагревается): $A_{23} = \dfrac{2p_0 + 3p_0}{2}\cdot 3V_0 = 7{,}5p_0V_0$, $\Delta U_{23} = \dfrac{3}{2}(3p_0\cdot 4V_0 - 2p_0V_0) = 15p_0V_0$, $Q_{23} = 22{,}5p_0V_0 > 0$.

Процесс 3–1: газ сжимается ($A_{31} < 0$) и охлаждается ($\Delta U_{31} < 0$), поэтому $Q_{31} < 0$ — газ отдаёт теплоту.

Значит, $Q_\text{нагр} = Q_{12} + Q_{23} = 24p_0V_0$.

Из уравнения Менделеева–Клапейрона для состояния 2: $2p_0V_0 = \nu RT_2$, откуда $p_0V_0 = \dfrac{\nu RT_2}{2}$ и $Q_\text{нагр} = 12\nu RT_2$.

Отсюда $T_2 = \dfrac{Q_\text{нагр}}{12\nu R} = \dfrac{120\cdot 10^3}{12\cdot 4\cdot 8{,}31}\,\text{К} \approx 301\,\text{К}$.
