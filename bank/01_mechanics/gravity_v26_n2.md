---
id: gravity_v26_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: ЗАКОН ВСЕМИРНОГО ТЯГОТЕНИЯ И ТРЕТИЙ ЗАКОН НЬЮТОНА
topic: 1.2.3
level: Б
type: расчётная
variant: 26
answer: "20 кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: 3law.tex
---

## Условие

На графике приведена зависимость модуля горизонтальной силы $\vec{F}$, приложенной к бруску, скользящего без трения по горизонтальной поверхности, от модуля его ускорения $a$. Систему отсчёта считать инерциальной. Чему равна масса бруска?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=6cm, y=0.25cm, every node/.style={font=\footnotesize}]
    \draw[xstep=0.1, ystep=2, gray!30, thin] (0,0) grid (0.6,12);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0.68,0) node[right] {$a, \text{ м/с}^{2}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,13) node[above] {$F, \text{ Н}$};
    \foreach \y in {3,6,12} \node[left] at (0,\y) {\y};
    \node[below] at (0.2,0) {$0{,}2$};
    \node[below] at (0.4,0) {$0{,}4$};
    \node[below] at (0.6,0) {$0{,}6$};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (0.6,12);
    \fill[black] (0.6,12) circle (1.5pt);
\end{tikzpicture}
```

## Решение

TODO
