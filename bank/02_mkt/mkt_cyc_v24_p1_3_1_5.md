---
id: mkt_cyc_v24_p1_3_1_5
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: В
type: расчётная (часть 2)
variant: 
answer: "0,92"
unit: ""
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

На рисунке в координатах $p-V$ представлен циклический процесс, проводимый с идеальным одноатомным газом. Давление идеального одноатомного газа изохорно увеличивают в $3$ раза, затем объём газа увеличивают в $4$ раза так, что давление линейно зависит от объёма и возрастает в $1{,}5$ раза. После этого газ возвращают в исходное состояние в процессе, в котором давление линейно зависит от объёма. Определите отношение модуля количества теплоты, отданного газом за цикл холодильнику, к количеству теплоты, полученному за цикл от нагревателя $\frac{|Q_{\text{х}}|}{Q_{\text{н}}}$.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$p$};
    
    % Координаты точек: 1=(1,1), 2=(1,3), 3=(4,4.5)
    \coordinate (1) at (1,1);
    \coordinate (2) at (1,3);
    \coordinate (3) at (4,4.5);
    
    % Линии процесса со стрелками по центру
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1,2.1);
    \draw[ultra thick, brandPrimary] (1,2.0) -- (2);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.6,3.8);
    \draw[ultra thick, brandPrimary] (2.5,3.75) -- (3);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (2.4,2.633);
    \draw[ultra thick, brandPrimary] (2.5,2.75) -- (1);
    
    
    % Точки
    \fill[black] (1) circle (1.5pt) node[left=2pt] {1};
    \fill[black] (2) circle (1.5pt) node[above left] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    % Засечки и подписи на осях
    \foreach \yy in {1,3,4.5} \draw[thick] (0,\yy) -- (0.12,\yy);
    \foreach \xx in {1,4} \draw[thick] (\xx,0) -- (\xx,0.12);
    \node[left] at (0,1) {$p_1$};
    \node[left] at (0,3) {$p_2$};
    \node[left] at (0,4.5) {$p_3$};
    \node[below] at (1,0) {$V_1$};
    \node[below] at (4,0) {$V_3$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Обозначим $p_1$, $V_1$ — давление и объём газа в состоянии 1. По условию $p_2 = 3p_1$, $V_2 = V_1$; $p_3 = 1{,}5p_2 = 4{,}5p_1$, $V_3 = 4V_1$.

Внутренняя энергия одноатомного газа $U = \dfrac{3}{2}\nu RT = \dfrac{3}{2}pV$. По первому закону термодинамики $Q = \Delta U + A$.

Процесс 1–2 (изохорное нагревание, $A_{12} = 0$): $Q_{12} = \dfrac{3}{2}(p_2 - p_1)V_1 = 3p_1V_1 > 0$.

Процесс 2–3 (расширение с ростом давления, газ нагревается): $A_{23} = \dfrac{p_2 + p_3}{2}(V_3 - V_2) = \dfrac{7{,}5p_1}{2}\cdot 3V_1 = 11{,}25p_1V_1$, $\Delta U_{23} = \dfrac{3}{2}(p_3V_3 - p_2V_2) = \dfrac{3}{2}(18 - 3)p_1V_1 = 22{,}5p_1V_1$, $Q_{23} = 33{,}75p_1V_1 > 0$.

Процесс 3–1: газ сжимается ($A_{31} < 0$) и охлаждается ($\Delta U_{31} < 0$), поэтому $Q_{31} < 0$ — газ отдаёт теплоту.

Значит, $Q_\text{н} = Q_{12} + Q_{23} = 36{,}75p_1V_1$.

Работа газа за цикл равна площади треугольника 1–2–3: $A = \dfrac{1}{2}(p_2 - p_1)(V_3 - V_1) = \dfrac{1}{2}\cdot 2p_1\cdot 3V_1 = 3p_1V_1$.

За цикл $Q_\text{н} - |Q_\text{х}| = A$, откуда $|Q_\text{х}| = Q_\text{н} - A = 33{,}75p_1V_1$ и
$\dfrac{|Q_\text{х}|}{Q_\text{н}} = \dfrac{33{,}75}{36{,}75} \approx 0{,}92$.

Ответ: $\dfrac{|Q_\text{х}|}{Q_\text{н}} \approx 0{,}92$.
