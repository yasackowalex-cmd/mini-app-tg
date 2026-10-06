---
id: elem_osc_v1_n23
exam: ЕГЭ
kim: 23
section: Электродинамика
theme: КОЛЕБАТЕЛЬНЫЙ КОНТУР
topic: 3.2.3
level: Б
type: расчётная (часть 2)
variant: 1
answer: "2\cdot 10^-6"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОЛЕБАНИЯ, КОЛЕБАТЕЛЬНЫЙ_КОНТУР]
source: LC.tex
---

## Условие

В идеальном колебательном контуре напряжение между обкладками конденсатора меняется по закону $U_C = 0{,}2 \cdot \sin(5000t + \pi)$. Максимальное значение силы тока в контуре $I_{\max} = 2\text{ мА}$. Определите электроёмкость конденсатора. Ответ выразите в фарадах (Ф).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,2);
    
    \draw[thick, black] (0.5,0.5) -- (0.5,1.5) -- (2.5,1.5) -- (2.5,0.5) -- cycle;
    
    % Катушка L (слева)
    \fill[white] (0.5,0.7) rectangle (0.5,1.3);
    \draw[thick, black] (0.5,0.5) -- (0.5,0.7);
    \draw[thick, black] (0.5,0.7) arc (-90:90:0.1) arc (-90:90:0.1) arc (-90:90:0.1);
    \draw[thick, black] (0.5,1.3) -- (0.5,1.5);
    \node[left=2pt] at (0.5,1.0) {$L$};
    
    % Конденсатор C (справа)
    \fill[white] (2.5,0.8) rectangle (2.5,1.2);
    \draw[thick, black] (2.5,0.5) -- (2.5,0.9);
    \draw[ultra thick, black] (2.2,0.9) -- (2.8,0.9);
    \draw[ultra thick, black] (2.2,1.1) -- (2.8,1.1);
    \draw[thick, black] (2.5,1.1) -- (2.5,1.5);
    \node[right=2pt] at (2.5,1.0) {$C$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
