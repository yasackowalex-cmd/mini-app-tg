---
id: geom_opt_mirror_rotation_gamma_between
exam: ЕГЭ
kim: 13
section: Оптика
theme: 
topic: 4.1
level: Б
type: расчётная
variant: 
answer: "70"
unit: "°"
has_image: true
author_task: false
tags: [ОПТИКА, ОТРАЖЕНИЕ, ЗЕРКАЛО_ПОВОРОТ]
source: opt.tex
---

## Условие

Угол падения луча света на горизонтальное плоское зеркало равен $25^\circ$. Каким будет угол $\gamma$, образованный падающим и отражённым лучами, если повернуть зеркало на $10^\circ$ так, как показано на рисунке? Ответ выразите в градусах ($^\circ$).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Поверхность горизонтальная и под углом 10 град
    \fill[gray!30] (1.0,0.8) -- (4.0,0.8) -- (4.0,0.6) -- (1.0,0.6) -- cycle;
    \draw[thick, black] (1.0,0.8) -- (4.0,0.8);
    \draw[dashed, black, thick] (0.8,1.10) -- (4.2,0.50);
    \draw (3.8,0.8) arc (0:-10:1.3);
    \node[anchor=west] at (4.25,0.66) {$10^\circ$};
    
    % Нормаль и лучи
    \draw[dashed, gray, thick] (2.5,0.8) -- (2.5,2.8);
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.0,2.8) -- (2.5,0.8);
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.5,0.8) -- (4.2,2.8);
    
    \draw (2.5,1.8) arc (90:126:1.0);
    \node at (2.08,2.08) {$25^\circ$};
    
    \draw (2.02,1.44) arc (126.9:49.6:0.8);
    \node at (2.9,1.85) {$\gamma$};
    
\end{tikzpicture}
```

## Решение

При повороте зеркала на $10^\circ$ перпендикуляр к нему поворачивается на те же $10^\circ$. На рисунке зеркало повёрнуто так, что нормаль отклоняется от падающего луча, поэтому угол падения увеличивается: $\alpha = 25^\circ + 10^\circ = 35^\circ$.

Угол отражения равен углу падения, а угол между падающим и отражённым лучами — их сумма:

$$\gamma = 2\alpha = 2\cdot 35^\circ = 70^\circ.$$
