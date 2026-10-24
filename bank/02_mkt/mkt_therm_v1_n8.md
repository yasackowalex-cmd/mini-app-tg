---
id: mkt_therm_v1_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 1
answer: "1200"
unit: "Дж"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

На рисунке показано, как меняется давление идеального газа в зависимости от его объёма при переходе из состояния 1 в состояние 2, а затем в состояние 3. В ходе процесса 2–3 газ совершил работу $900$~Дж. Чему равна работа газа в процессе 1–2?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    \coordinate (1) at (1,2);
    \coordinate (2) at (2,2);
    \coordinate (3) at (3,1);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1.6,2);
    \draw[ultra thick, brandPrimary] (1.5,2) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.6,1.4);
    \draw[ultra thick, brandPrimary] (2.5,1.5) -- (3);
    
    
    \fill[black] (1) circle (1.2pt) node[above left] {1};
    \fill[black] (2) circle (1.2pt) node[above right] {2};
    \fill[black] (3) circle (1.2pt) node[above right] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Работа газа равна площади под графиком в координатах $p$–$V$.

Процесс 2–3: площадь трапеции
$$A_{23} = \frac{2p_0 + p_0}{2}\cdot(3V_0 - 2V_0) = 1{,}5\,p_0V_0 = 900~\text{Дж},$$
откуда $p_0V_0 = 600$~Дж.

Процесс 1–2 изобарный при давлении $2p_0$:
$$A_{12} = 2p_0\,(2V_0 - V_0) = 2p_0V_0 = 2\cdot 600 = 1200~\text{Дж}.$$
