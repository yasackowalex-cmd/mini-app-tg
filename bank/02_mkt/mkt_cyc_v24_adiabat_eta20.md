---
id: mkt_cyc_v24_adiabat_eta20
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: Б
type: расчётная (часть 2)
variant: 
answer: "2"
unit: ""
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

\textbf{Задача.} В качестве рабочего тела в тепловой машине используется идеальный одноатомный газ, который совершает циклический процесс, состоящий из изобарного нагревания (1–2), изохорного охлаждения (2–3) и адиабатного сжатия (3–1). КПД этой тепловой машины $\eta = 20\%$. Найдите отношение работы $A_{12}$, совершённой газом в изобарном процессе, к работе $A_{31}$, совершённой над газом при адиабатном сжатии.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    
    
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    % Координаты точек: 1=(1.5,3.5), 2=(3.5,3.5), 3=(3.5,1)
    \coordinate (1) at (1.5,3.1);
    \coordinate (2) at (3.5,3.1);
    \coordinate (3) at (3.5,0.8);
    
    % Процесс 1->2 (изобара)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2.6,3.1);
    \draw[ultra thick, brandPrimary] (2.5,3.1) -- (2);
    
    % Процесс 2->3 (изохора)
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3.5,2.1);
    \draw[ultra thick, brandPrimary] (3.5,2.2) -- (3);
    
    % Процесс 3->1 (адиабата y = C/x^(5/3))
    \draw[ultra thick, brandPrimary, domain=1.5:3.5, samples=40] plot (\x, {6.14 / (\x^1.67)});
    \draw[brandPrimary, -{Stealth[scale=0.8, length=5pt, width=4pt]}, domain=2.2:3.5] plot (\x, {6.14 / (\x^1.67)});
    
    % Точки
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[below right] {3};
    
    % Ноль на оси
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Газ получает теплоту только в изобарном процессе 1–2: в процессе 2–3 газ изохорно охлаждается и отдаёт теплоту, в процессе 3–1 теплообмена нет (адиабата).

По первому закону термодинамики для изобарного процесса 1–2: $Q_{12} = \Delta U_{12} + A_{12}$. Для одноатомного газа $\Delta U_{12} = \dfrac{3}{2}\nu R\Delta T = \dfrac{3}{2}p\Delta V = \dfrac{3}{2}A_{12}$, поэтому $Q_\text{н} = Q_{12} = \dfrac{5}{2}A_{12}$.

Работа газа за цикл: $A = A_{12} - A_{31}$ (в процессе 2–3 работа равна нулю, в процессе 3–1 работу $A_{31}$ совершают над газом).

КПД цикла: $\eta = \dfrac{A}{Q_\text{н}} = \dfrac{A_{12} - A_{31}}{\dfrac{5}{2}A_{12}}$, откуда $A_{12} - A_{31} = \dfrac{5}{2}\eta A_{12}$ и
$\dfrac{A_{12}}{A_{31}} = \dfrac{1}{1 - \dfrac{5}{2}\eta} = \dfrac{1}{1 - 2{,}5\cdot 0{,}2} = 2$.

Ответ: $\dfrac{A_{12}}{A_{31}} = 2$.
