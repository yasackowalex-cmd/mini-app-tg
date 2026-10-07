---
id: momentum_v5_n3
exam: ЕГЭ
kim: 3
section: Механика
theme: ИМПУЛЬС ТЕЛА. ЗАКОН СОХРАНЕНИЯ ИМПУЛЬСА
topic: 1.3.1
level: Б
type: расчётная
variant: 5
answer: "8"
unit: "кг·м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: imp.tex
---

## Условие

В инерциальной системе отсчёта тело движется по прямой линии в одном направлении под действием постоянной силы. На рисунке приведён график зависимости модуля этой силы $F$ от времени $t$. Чему равен модуль изменения импульса тела в интервале времени от $0$ до $3$~с?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.5cm, y=0.8cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,5);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$F, \text{ Н}$};
    \foreach \x in {1,2,3,4} \node[below] at (\x,0) {\x};
    \foreach \y in {1,2,3,4,5} \node[left] at (0,\y) {\y};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (2,4) -- (3,4) -- (4,0);
    \fill[black] (2,4) circle (1.5pt);
    \fill[black] (3,4) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
