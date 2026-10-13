---
id: mkt_therm_v14_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 14
answer: "120"
unit: "Дж"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

На рисунке показано, как меняется давление идеального газа в зависимости от его объёма при переходе из состояния 1 в состояние 2, а затем в состояние 3. В ходе процесса 2–3 газ совершил работу $360$~Дж. Чему равна величина произведения $p_0V_0$?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (1,2);
    \coordinate (3) at (3,1);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1,1.6);
    \draw[ultra thick, brandPrimary] (1,1.5) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.1,1.45);
    \draw[ultra thick, brandPrimary] (2,1.5) -- (3);
    
    \draw[dashed, gray] (0,1) -- (1,1);
    \draw[dashed, gray] (0,2) -- (1,2);
    \draw[dashed, gray] (1,0) -- (1,1);
    \draw[dashed, gray] (3,0) -- (3,1);
    
    \fill[black] (1) circle (1.5pt) node[below right] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Работа газа равна площади под графиком процесса в координатах $p$–$V$. Процесс 2–3 идёт от $(V_0;\,2p_0)$ до $(3V_0;\,p_0)$, под ним трапеция:

$$A_{23} = \frac{2p_0 + p_0}{2} \cdot (3V_0 - V_0) = 3p_0V_0.$$

$$p_0V_0 = \frac{A_{23}}{3} = \frac{360}{3} = 120~\text{Дж}.$$
