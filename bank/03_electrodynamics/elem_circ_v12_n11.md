---
id: elem_circ_v12_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: СОЕДИНЕНИЕ ПРОВОДНИКОВ. ЗАКОН ОМА ДЛЯ ПОЛНОЙ ЦЕПИ
topic: 3.1.5
level: Б
type: расчётная
variant: 12
answer: "24"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, СОЕДИНЕНИЕ_ПРОВОДНИКОВ]
source: ohm2.tex
---

## Условие

Чему равно общее электрическое сопротивление участка цепи, состоящего из двух последовательно соединённых резисторов сопротивлением $R_1 = 10\text{ Ом}$ и $R_2 = 14\text{ Ом}$? Ответ выразите в омах (Ом).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,1);
    
    \draw[thick, black] (0,0.5) -- (1,0.5);
    \draw[thick, black, fill=white] (1,0.3) rectangle (2,0.7) node[pos=.5] {$R_1$};
    \draw[thick, black] (2,0.5) -- (2.5,0.5);
    \draw[thick, black, fill=white] (2.5,0.3) rectangle (3.5,0.7) node[pos=.5] {$R_2$};
    \draw[thick, black] (3.5,0.5) -- (4.5,0.5);
    
    \fill[black] (0,0.5) circle (1.5pt);
    \fill[black] (4.5,0.5) circle (1.5pt);
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
