---
id: mkt_therm_v13_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 13
answer: "360"
unit: "Дж"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

На рисунке показано, как меняется давление идеального газа в зависимости от его объёма при переходе из состояния 1 в состояние 2, а затем в состояние 3. В ходе процесса 2–3 газ совершил работу $360$~Дж. Чему равна работа газа в процессе 1–2–3?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (1,3);
    \coordinate (3) at (3,1);
    
    \tikzset{midarrow/.style={postaction={decorate}, decoration={markings, mark=at position 0.58 with {\arrow{Stealth[length=7pt, width=6pt]}}}}}
    \draw[ultra thick, brandPrimary, midarrow] (1) -- (2);
    \draw[ultra thick, brandPrimary, midarrow] (2) -- (3);
    
    \fill[black] (1) circle (1.5pt) node[below right] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,3) {$3p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below] at (3,0) {$3V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Работа газа равна площади под графиком процесса на $pV$-диаграмме.

Процесс 1–2 изохорный ($V = V_0 = \text{const}$), в нём газ работу не совершает: $A_{12} = 0$.

$$A_{123} = A_{12} + A_{23} = 0 + 360 = 360~\text{Дж}.$$
