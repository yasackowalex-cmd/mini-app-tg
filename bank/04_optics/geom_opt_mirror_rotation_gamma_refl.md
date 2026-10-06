---
id: geom_opt_mirror_rotation_gamma_refl
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.1
level: Б
type: расчётная
variant: 
answer: "40"
has_image: true
author_task: false
tags: [ОПТИКА, ОТРАЖЕНИЕ, ЗЕРКАЛО_ПОВОРОТ]
source: opt.tex
---

## Условие

Угол падения луча света на горизонтальное плоское зеркало равен $25^\circ$. Каким будет угол отражения $\gamma$, если повернуть зеркало на $15^\circ$ так, как показано на рисунке? Ответ выразите в градусах ($^\circ$).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,3);
    
    % Поверхность горизонтальная и под углом 15 град
    \fill[gray!30] (1.0,0.8) -- (4.0,0.8) -- (4.0,0.6) -- (1.0,0.6) -- cycle;
    \draw[thick, black] (1.0,0.8) -- (4.0,0.8);
    \draw[dashed, black, thick] (1.0,0.8) -- (4.0,0.1);
    \draw (3.3,0.8) arc (0:-15:0.8);
    \node[right] at (3.5,0.5) {$15^\circ$};
    
    % Нормаль и лучи
    \draw[dashed, gray, thick] (2.5,0.8) -- (2.5,2.8);
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.0,2.8) -- (2.5,0.8);
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.5,0.8) -- (4.0,2.8);
    
    \draw (2.5,1.8) arc (90:126:1.0);
    \node[left] at (2.4,2.0) {$25^\circ$};
    
    \draw (2.5,1.4) arc (90:53:0.6);
    \node[right] at (2.5,1.6) {$\gamma$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
