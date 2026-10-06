---
id: mkt_therm_v2_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 2
answer: "375"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

На рисунке показано, как меняется давление идеального газа в зависимости от его объёма при переходе из состояния 1 в состояние 2, а затем в состояние 3. В ходе процесса 1–2 газ совершил работу $500$~Дж. Чему равна работа газа в процессе 2–3?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    \coordinate (1) at (1,3);
    \coordinate (2) at (2,3);
    \coordinate (3) at (3,1);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1.6,3);
    \draw[ultra thick, brandPrimary] (1.5,3) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.5,2);
    \draw[ultra thick, brandPrimary] (2.4,2.2) -- (3);
    
    \draw[dashed, gray] (0,1) -- (3,1);
    \draw[dashed, gray] (0,3) -- (1,3);
    \draw[dashed, gray] (1,0) -- (1,3);
    \draw[dashed, gray] (2,0) -- (2,3);
    \draw[dashed, gray] (3,0) -- (3,1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,3) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
