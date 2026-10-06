---
id: elem_cap_recharge_heat
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: 
topic: 3.1.3
level: Б
type: расчётная (часть 2)
variant: 
answer: "1"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОНДЕНСАТОР]
source: cap2.tex
---

## Условие

Конденсатор $C_1$ заряжен до напряжения $U = 300\text{ В}$ и включён в последовательную цепь из резистора $R = 300\text{ Ом}$, незаряженного конденсатора $C_2 = 2\text{ мкФ}$ и разомкнутого ключа $K$ (см. рисунок). После замыкания ключа в процессе перезарядки конденсаторов в цепи выделяется количество теплоты $Q = 30\text{ мДж}$. Чему равна ёмкость конденсатора $C_1$? Ответ выразите в микрофарадах (мкФ).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,2);
    
    % Внешний контур
    \draw[thick, black] (0.5,1.0) -- (0.5,1.5) -- (1.5,1.5);
    \draw[thick, black] (2.5,1.5) -- (3.5,1.5) -- (3.5,1.0);
    \draw[thick, black] (0.5,0.5) -- (0.5,0.5) -- (1.5,0.5);
    \draw[thick, black] (2.5,0.5) -- (3.5,0.5) -- (3.5,0.5);
    
    % Конденсатор C1 (слева)
    \draw[ultra thick, black] (0.2,0.9) -- (0.8,0.9);
    \draw[ultra thick, black] (0.2,0.7) -- (0.8,0.7);
    \node[left] at (0.2,0.8) {$C_1$};
    
    % Ключ K (сверху)
    \fill[black] (1.5,1.5) circle (1.5pt);
    \fill[black] (2.5,1.5) circle (1.5pt);
    \draw[thick, black] (1.5,1.5) -- (2.3,1.8);
    \node[above] at (2.0,1.8) {$K$};
    
    % Конденсатор C2 (справа)
    \draw[ultra thick, black] (3.2,0.9) -- (3.8,0.9);
    \draw[ultra thick, black] (3.2,0.7) -- (3.8,0.7);
    \node[right] at (3.8,0.8) {$C_2$};
    
    % Резистор R (снизу)
    \draw[thick, black, fill=white] (1.5,0.3) rectangle (2.5,0.7) node[pos=.5] {$R$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
