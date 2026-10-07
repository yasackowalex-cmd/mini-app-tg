---
id: gravity_v25_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: ЗАКОН ВСЕМИРНОГО ТЯГОТЕНИЯ И ТРЕТИЙ ЗАКОН НЬЮТОНА
topic: 1.2.3
level: Б
type: расчётная
variant: 25
answer: "25"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: 3law.tex
---

## Условие

На графике приведена зависимость ускорения $a$ бруска, скользящего без трения по горизонтальной поверхности, от величины приложенной к нему горизонтальной силы $\vec{F}$. Систему отсчёта считать инерциальной. Чему равна масса бруска?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=10cm, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=0.05, gray!30, thin] (0,0) grid (6,0.25);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$F, \text{ Н}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,0.27) node[above] {$a, \text{ м/с}^{2}$};
    \foreach \x in {2,4,6} \node[below] at (\x,0) {\x};
    \node[left] at (0,0.1) {$0{,}1$};
    \node[left] at (0,0.2) {$0{,}2$};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (5,0.2);
    \fill[black] (5,0.2) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
