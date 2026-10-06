---
id: elem_circ_v22_n11
exam: ЕГЭ
kim: 11
section: Электродинамика
theme: СОЕДИНЕНИЕ ПРОВОДНИКОВ. ЗАКОН ОМА ДЛЯ ПОЛНОЙ ЦЕПИ
topic: 3.1.5
level: Б
type: расчётная
variant: 22
answer: "1,5"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, ЗАКОН_ОМА_ПОЛНАЯ_ЦЕПЬ]
source: ohm2.tex
---

## Условие

Источник тока с ЭДС $\mathcal{E} = 9\text{ В}$ и внутренним сопротивлением $r = 1\text{ Ом}$ замкнут на два параллельно соединённых резистора сопротивлением $R_1 = 10\text{ Ом}$ и $R_2 = 10\text{ Ом}$. Чему равна сила тока в неразветвлённой части цепи? Ответ выразите в амперах (А).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % Внешняя контурная рамка цепи
    \draw[thick, black] (0.5,0.5) -- (0.5,2.5) -- (3.5,2.5) -- (3.5,0.5) -- cycle;
    
    % Источник тока (слева)
    \fill[white] (0.5,1.1) rectangle (0.5,1.9);
    \draw[thick, black] (0.5,1.1) -- (0.5,1.4);
    \draw[thick, black] (0.2,1.4) -- (0.8,1.4);
    \draw[ultra thick, black] (0.35,1.6) -- (0.65,1.6);
    \draw[thick, black] (0.5,1.6) -- (0.5,1.9);
    
    % Разветвление справа
    \draw[thick, black] (2.0,2.5) -- (2.0,1.5) -- (3.5,1.5);
    
    % Резистор R1
    \draw[thick, black, fill=white] (2.3,2.3) rectangle (3.1,2.7) node[pos=.5] {$R_1$};
    
    % Резистор R2
    \draw[thick, black, fill=white] (2.3,1.3) rectangle (3.1,1.7) node[pos=.5] {$R_2$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
