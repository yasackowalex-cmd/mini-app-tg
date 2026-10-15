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
\end{tikzpicture}
```

## Решение

Трения нет, поэтому по второму закону Ньютона $F = ma$, и масса равна отношению силы к ускорению. По графику при $F = 5$~Н ускорение $a = 0{,}2$~м/с$^2$.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-1.6,-0.15) rectangle (2.2,0);
  \draw[thick, brandSecondary] (-1.6,0) -- (2.2,0);
  \draw[thick, fill=brandPrimary!10] (-0.6,0) rectangle (0.6,0.6);
  \node at (-0.35,0.3) {$m$};
  \draw[Fvec] (0.6,0.3) -- (1.8,0.3) node[above] {$\vec F$};
  \draw[Fvec] (0.15,0.6) -- (0.15,1.4) node[right] {$\vec N$};
  \draw[Fvec] (0.15,0.3) -- (0.15,-0.5) node[below] {$m\vec g$};
  \draw[vvec] (-1.2,1.0) -- (-0.4,1.0) node[right] {$\vec a$};
\end{tikzpicture}
```

$$m = \frac{F}{a} = \frac{5}{0{,}2} = 25~\text{кг}.$$
