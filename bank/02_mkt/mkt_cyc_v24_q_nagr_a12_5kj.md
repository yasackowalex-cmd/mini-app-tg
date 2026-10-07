---
id: mkt_cyc_v24_q_nagr_a12_5kj
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: Б
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

TODO
