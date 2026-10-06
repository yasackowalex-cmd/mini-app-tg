---
id: friction_v12_n26
exam: ЕГЭ
kim: 26
section: Механика
theme: СИЛА ТРЕНИЯ (ДИНАМИКА СВЯЗАННЫХ ТЕЛ)
topic: 1.2.4
level: Б
type: расчётная (часть 2)
variant: 12
answer: "0,045 кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: трение.tex
---

## Условие

Если в установке первоначально покоящуюся тележку толкнуть влево, то она движется с ускорением $2$~м/с$^{2}$. Если же тележку толкнуть вправо, то она движется равномерно. Найдите массу $m$ грузика на нити, если масса тележки $M=450$~г. Массами блока и нити пренебречь. Нить нерастяжима. Модуль силы сопротивления движению тележки считать постоянным и одинаковым в обоих случаях, трением в оси блока пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    % Стол
    \draw[thick, fill=gray!5] (-2.5,0) rectangle (3.0,0.15);
    % Тележка M
    \draw[thick, fill=brandPrimary!10] (-0.8,0.22) rectangle (-0.2,0.42);
    \node[above] at (-0.5,0.42) {$M$};
    \draw[thick, fill=black!50] (-0.65,0.185) circle (0.04);
    \draw[thick, fill=black!50] (-0.35,0.185) circle (0.04);
    % Блок
    \draw[thick, fill=gray!40] (3.0,0.15) circle (0.12);
    \fill[black] (3.0,0.15) circle (1pt);
    \draw[thick] (2.9,0.05) -- (3.0,0.15);
    % Груз m
    \draw[thick, fill=brandAccent!20] (2.85,-0.9) rectangle (3.15,-0.83);
    \node[right] at (3.2,-0.86) {$m$};
    % Нити
    \draw[thick] (-0.2,0.32) -- (3.0,0.27);
    \draw[thick] (3.12,0.15) -- (3.12,-0.83);
\end{tikzpicture}
```

## Решение

TODO
