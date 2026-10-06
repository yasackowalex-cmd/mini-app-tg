---
id: mkt_v1_n9
exam: ЕГЭ
kim: 9
section: МКТ и термодинамика
theme: ОСНОВНОЕ УРАВНЕНИЕ МКТ. АБСОЛЮТНАЯ ТЕМПЕРАТУРА. КИНЕТИЧЕСКАЯ ЭНЕРГИЯ
topic: 2.1
level: Б
type: расчётная
variant: 1
answer: "25"
has_image: true
author_task: false
tags: [МКТ]
source: mkt.tex
---

## Условие

Один моль разреженного аргона участвует в процессе 1–2–3, представленном на графике зависимости давления $p$ от средней кинетической энергии $\overline{E}_{\text{к}}$ теплового движения молекул.

Из приведённого ниже списка выберите все верные утверждения, характеризующие процессы на рисунке.
1) В процессе 1–2 внутренняя энергия аргона уменьшается.
2) В процессе 2–3 аргон изотермически сжимают.
3) В процессе 1–2 концентрация аргона уменьшается.
4) В процессе 2–3 температура аргона растёт.
5) В процессе 2–3 аргон отдаёт окружающей среде положительное количество теплоты.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$\overline{E}_{\text{к}}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$p$};
    
    \coordinate (1) at (1,1);
    \coordinate (2) at (3,2);
    \coordinate (3) at (3,4);
    
    \draw[dashed, thin, gray] (0,0) -- (1);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (2);
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (3);
    
    \fill[black] (1) circle (1.5pt) node[below right] {1};
    \fill[black] (2) circle (1.5pt) node[right=2pt, yshift=-2pt] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
