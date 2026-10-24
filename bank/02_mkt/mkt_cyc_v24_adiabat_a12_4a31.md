---
id: mkt_cyc_v24_adiabat_a12_4a31
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: В
type: расчётная (часть 2)
variant: 
answer: "30"
unit: "%"
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

В качестве рабочего тела в тепловой машине используется идеальный одноатомный газ, который совершает циклический процесс, состоящий из изобарного нагревания (1–2), изохорного охлаждения (2–3) и адиабатного сжатия (3–1). Известно, что работа, совершённая газом в изобарном процессе, в $4$ раза больше работы, совершённой над газом при адиабатном сжатии. Определите КПД этой тепловой машины.

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
    \fill[black] (1) circle (1.2pt) node[above left] {1};
    \fill[black] (2) circle (1.2pt) node[above right] {2};
    \fill[black] (3) circle (1.2pt) node[below right] {3};
    
    % Ноль на оси
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Обозначим $A_{12}$ — работа газа в изобарном процессе, $A'$ — работа внешних сил над газом при адиабатном сжатии; по условию $A' = \dfrac{A_{12}}{4}$.

КПД цикла: $\eta = \dfrac{A}{Q_\text{н}}$, где $A$ — работа газа за цикл, $Q_\text{н}$ — количество теплоты, полученное газом от нагревателя.

Процесс 1–2 (изобарное нагревание): $A_{12} = p_1(V_2 - V_1) = \nu R(T_2 - T_1)$, изменение внутренней энергии одноатомного газа $\Delta U_{12} = \dfrac{3}{2}\nu R(T_2 - T_1) = \dfrac{3}{2}A_{12}$. По первому закону термодинамики $Q_{12} = \Delta U_{12} + A_{12} = \dfrac{5}{2}A_{12} > 0$.

Процесс 2–3 (изохорное охлаждение): $A_{23} = 0$, $\Delta U_{23} < 0$, значит, $Q_{23} = \Delta U_{23} < 0$ — газ отдаёт теплоту.

Процесс 3–1 (адиабатный): $Q_{31} = 0$, работа газа $A_{31} = -A'$.

Значит, $Q_\text{н} = Q_{12} = \dfrac{5}{2}A_{12}$, а работа газа за цикл $A = A_{12} + A_{23} + A_{31} = A_{12} - \dfrac{A_{12}}{4} = \dfrac{3}{4}A_{12}$.

$\eta = \dfrac{\frac{3}{4}A_{12}}{\frac{5}{2}A_{12}} = \dfrac{3}{10} = 0{,}3 = 30\,\%$.
