---
id: mkt_therm_v3_n9
exam: ЕГЭ
kim: 9
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: соответствие/выбор
variant: 3
answer: "24"
unit: ""
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

Один моль разреженного аргона участвует в циклическом процессе 1–2–3–4–1, показанном на рисунке в переменных $p-V$. Из приведённого ниже списка выберите все верные утверждения, характеризующие работу двигателя.

1) Аргон отдаёт холодильнику положительное количество теплоты только в процессе 3–4.\\
2) В процессе 3–4 внутренняя энергия аргона уменьшается.\\
3) Работа аргона за цикл равна $2p_0V_0$.\\
4) Максимальная абсолютная температура аргона в цикле в $6$ раз больше минимальной.\\
5) В процессе 4–1 аргон получает от нагревателя положительное количество теплоты.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (3,2);
    \coordinate (3) at (3,1);
    \coordinate (4) at (1,2);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[below left] {4};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[below right] {3};
    \fill[black] (1) circle (1.5pt) ++(0,1) node[above left] {1};
    \draw[ultra thick, brandPrimary] (1,1) -- (1,2) -- (3,2);
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
