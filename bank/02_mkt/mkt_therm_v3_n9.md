---
id: mkt_therm_v3_n9
exam: ЕГЭ
kim: 9
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: П
type: соответствие/выбор
variant: 3
answer: "23"
unit: ""
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

Один моль разреженного аргона участвует в циклическом процессе 1–2–3–4–1, показанном на рисунке в переменных $p-V$.

[[рис 1]]

Из приведённого ниже списка выберите все верные утверждения, характеризующие работу двигателя.

1) Аргон отдаёт холодильнику положительное количество теплоты только в процессе 3–4.\\
2) В процессе 3–4 внутренняя энергия аргона уменьшается.\\
3) Работа аргона за цикл равна $2p_0V_0$.\\
4) Максимальная абсолютная температура аргона в цикле в $3$ раза больше минимальной.\\
5) В процессе 4–1 аргон отдаёт холодильнику положительное количество теплоты.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    \draw[ultra thick, brandPrimary] (1,1) -- (1,2) -- (3,2) -- (3,1) -- cycle;
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1,1) -- (1,1.6);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1,2) -- (2.2,2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3,2) -- (3,1.4);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3,1) -- (1.8,1);
    
    \fill[black] (1,2) circle (1.5pt) node[above left] {1};
    \fill[black] (3,2) circle (1.5pt) node[above right] {2};
    \fill[black] (3,1) circle (1.5pt) node[below right] {3};
    \fill[black] (1,1) circle (1.5pt) node[below left] {4};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

По рисунку: $1\,(V_0;\,2p_0)$, $2\,(3V_0;\,2p_0)$, $3\,(3V_0;\,p_0)$, $4\,(V_0;\,p_0)$. Для одного моля $T = \dfrac{pV}{R}$, поэтому $T_1 = \dfrac{2p_0V_0}{R}$, $T_2 = \dfrac{6p_0V_0}{R}$, $T_3 = \dfrac{3p_0V_0}{R}$, $T_4 = \dfrac{p_0V_0}{R}$.

1) Неверно: теплоту аргон отдаёт и в процессе 2–3 (изохорное охлаждение), и в процессе 3–4 (изобарное сжатие с охлаждением).

2) Верно: в процессе 3–4 температура падает от $\dfrac{3p_0V_0}{R}$ до $\dfrac{p_0V_0}{R}$, значит, внутренняя энергия уменьшается.

3) Верно: работа за цикл равна площади прямоугольника: $A = (2p_0 - p_0)(3V_0 - V_0) = 2p_0V_0$.

4) Неверно: $\dfrac{T_\text{max}}{T_\text{min}} = \dfrac{T_2}{T_4} = \dfrac{6p_0V_0}{p_0V_0} = 6$, а не $3$.

5) Неверно: 4–1 — изохорное нагревание, $A = 0$, $\Delta U > 0$, значит, $Q = \Delta U > 0$: аргон теплоту получает, а не отдаёт.
