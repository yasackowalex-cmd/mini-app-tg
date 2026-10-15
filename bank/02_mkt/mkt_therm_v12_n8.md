---
id: mkt_therm_v12_n8
exam: ЕГЭ
kim: 8
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: Б
type: расчётная
variant: 12
answer: "60"
unit: "Дж"
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА]
source: 1td.tex
---

## Условие

На рисунке показан график циклического процесса, проведенного с идеальным одноатомным газом, в координатах $p-V$. В ходе изобарного расширения 1–2 газ совершил работу $80$~Дж. Какую работу совершили внешние силы над газом в процессе 3–1?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.5) node[above] {$p$};
    
    \coordinate (1) at (1,2);
    \coordinate (2) at (2,2);
    \coordinate (3) at (2,1);
    
    \tikzset{midarrow/.style={postaction={decorate}, decoration={markings, mark=at position 0.58 with {\arrow{Stealth[length=7pt, width=6pt]}}}}}
    \draw[ultra thick, brandPrimary, midarrow] (1) -- (2);
    \draw[ultra thick, brandPrimary, midarrow] (2) -- (3);
    \draw[ultra thick, brandPrimary, midarrow] (3) -- (1);
    
    \fill[black] (1) circle (1.5pt) node[above left] {1};
    \fill[black] (2) circle (1.5pt) node[above right] {2};
    \fill[black] (3) circle (1.5pt) node[below right] {3};
    
    \node[left] at (0,1) {$p_0$};
    \node[left] at (0,2) {$2p_0$};
    \node[below] at (1,0) {$V_0$};
    \node[below] at (2,0) {$2V_0$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Работа в изобарном процессе 1–2: $A_{12} = 2p_0(2V_0 - V_0) = 2p_0V_0 = 80$~Дж, откуда $p_0V_0 = 40$~Дж.

В процессе 3–1 газ сжимается, работа внешних сил равна площади трапеции под отрезком 3–1:

$$A = \frac{p_0 + 2p_0}{2} \cdot V_0 = 1{,}5\,p_0V_0 = 1{,}5 \cdot 40 = 60~\text{Дж}.$$
