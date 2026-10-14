---
id: mkt_cyc_v24_q_nagr_a12_5kj
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: В
type: расчётная (часть 2)
variant: 
answer: "14,375"
unit: "кДж"
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

\textbf{Задача.} Изменение состояния постоянной массы одноатомного идеального газа происходит по циклу, показанному на рисунке. При переходе из состояния 1 в состояние 2 газ совершает работу $A_{12} = 5$~кДж. Какое количество теплоты газ получает за цикл от нагревателя?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    % Сетка gray!30
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    % Координаты точек: 1=(1,2), 2=(3,2), 3=(1,1)
    \coordinate (1) at (1,2);
    \coordinate (2) at (3,2);
    \coordinate (3) at (1,1);
    
    % Процесс 1->2 (изобара)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2.1,2);
    \draw[ultra thick, brandPrimary] (2.0,2) -- (2);
    
    % Процесс 2->3 (линейный)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (1.9,1.45);
    \draw[ultra thick, brandPrimary] (2.0,1.5) -- (3);
    
    % Процесс 3->1 (изохора)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (1,1.6);
    \draw[ultra thick, brandPrimary] (1,1.5) -- (1);
    
    % Пунктирные линии к осям
    \draw[dashed, gray] (0,1) -- (1,1);
    \draw[dashed, gray] (0,2) -- (1,2);
    \draw[dashed, gray] (1,0) -- (1,1);
    \draw[dashed, gray] (3,0) -- (3,2);
    
    % Точки
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[below left] {3};
    
    % Подписи на осях
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

По графику: $p_1 = p_2 = 2p_0$, $V_1 = V_3 = V_0$, $V_2 = 3V_0$, $p_3 = p_0$.

Работа газа в изобарном процессе 1–2: $A_{12} = 2p_0(3V_0 - V_0) = 4p_0V_0$, откуда $p_0V_0 = \dfrac{A_{12}}{4}$.

Внутренняя энергия одноатомного газа $U = \dfrac{3}{2}\nu RT = \dfrac{3}{2}pV$. По первому закону термодинамики $Q = \Delta U + A$.

Процесс 1–2 (изобарное расширение): $\Delta U_{12} = \dfrac{3}{2}\cdot 2p_0\cdot 2V_0 = 6p_0V_0$, $Q_{12} = 6p_0V_0 + 4p_0V_0 = 10p_0V_0 > 0$.

Процесс 2–3 (сжатие с уменьшением давления): работа газа $A_{23} = -\dfrac{2p_0 + p_0}{2}\cdot 2V_0 = -3p_0V_0$, $\Delta U_{23} = \dfrac{3}{2}(p_0V_0 - 6p_0V_0) = -7{,}5p_0V_0$, $Q_{23} = -10{,}5p_0V_0 < 0$ — газ отдаёт теплоту.

Процесс 3–1 (изохорное нагревание, $A_{31} = 0$): $Q_{31} = \dfrac{3}{2}(2p_0 - p_0)V_0 = 1{,}5p_0V_0 > 0$.

Теплоту газ получает в процессах 1–2 и 3–1, поэтому
$Q_\text{н} = Q_{12} + Q_{31} = 11{,}5p_0V_0 = \dfrac{11{,}5}{4}A_{12} = 2{,}875\cdot 5\,\text{кДж} = 14{,}375\,\text{кДж}$.

Ответ: $Q_\text{н} = 14{,}375\,\text{кДж}$.
