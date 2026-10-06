---
id: mkt_cyc_v24_t2_q120kj
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: Б
type: расчётная (часть 2)
variant: 
answer: "301"
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

\textbf{Задача.} В цикле, показанном на $pV$-диаграмме, $\nu = 4$~моль разреженного гелия получает от нагревателя количество теплоты $Q_{\text{нагр}} = 120$~кДж. Найдите температуру $T_2$ гелия в состоянии 2.

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
    
    % Пунктирные линии к осям
    \draw[dashed, gray] (0,1) -- (1,1);
    \draw[dashed, gray] (0,3) -- (4,3);
    \draw[dashed, gray] (1,0) -- (1,1);
    \draw[dashed, gray] (4,0) -- (4,3);
    
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

TODO
