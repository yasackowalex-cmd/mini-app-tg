---
id: mkt_therm_v4_n9
exam: ЕГЭ
kim: 9
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 4
answer: "15"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

Один моль разреженного аргона является рабочим телом в тепловом двигателе, который работает по циклу, показанному на рисунке в переменных $p-V$. Из приведённого ниже списка выберите все верные утверждения, характеризующие работу двигателя.

1) Аргон получает положительное количество теплоты от нагревателя только в процессах 1–2 и 4–1.\\
2) В процессе 3–4 внутренняя энергия аргона не изменяется.\\
3) Работа аргона за цикл равна $6p_0V_0$.\\
4) Максимальная абсолютная температура аргона в цикле в $6$ раз больше минимальной.\\
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
    \fill[black] (2,2) circle (0pt); 
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

TODO
