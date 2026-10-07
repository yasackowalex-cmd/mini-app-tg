---
id: elem_circ_v2_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: СОЕДИНЕНИЕ ПРОВОДНИКОВ. ЗАКОН ОМА ДЛЯ ПОЛНОЙ ЦЕПИ
topic: 3.1.5
level: Б
type: расчётная
variant: 2
answer: "12"
unit: "Ом"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, СОЕДИНЕНИЕ_ПРОВОДНИКОВ]
source: ohm2.tex
---

## Условие

Чему равно общее электрическое сопротивление участка цепи, состоящего из двух параллельно соединённых резисторов сопротивлением $R_1 = 20\text{ Ом}$ и $R_2 = 30\text{ Ом}$? Ответ выразите в омах (Ом).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,2);
    
    % Вход и выход
    \draw[thick, black] (0,1) -- (1,1);
    \draw[thick, black] (3,1) -- (4,1);
    
    % Разветвление
    \draw[thick, black] (1,1) -- (1,0.5) -- (1.5,0.5);
    \draw[thick, black] (1,1) -- (1,1.5) -- (1.5,1.5);
    \draw[thick, black] (2.5,0.5) -- (3,0.5) -- (3,1);
    \draw[thick, black] (2.5,1.5) -- (3,1.5) -- (3,1);
    
    % Резисторы
    \draw[thick, black, fill=white] (1.5,1.3) rectangle (2.5,1.7) node[pos=.5] {$R_1$};
    \draw[thick, black, fill=white] (1.5,0.3) rectangle (2.5,0.7) node[pos=.5] {$R_2$};
    
    % Клеммы
    \fill[black] (0,1) circle (1.5pt);
    \fill[black] (4,1) circle (1.5pt);
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
