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
answer: "20"
unit: "кг"
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
    \draw[xstep=0.1, ystep=3, gray!30, thin] (0,0) grid (0.6,12);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0.68,0) node[right] {$a, \text{ м/с}^{2}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,13) node[above] {$F, \text{ Н}$};
    \foreach \y in {3,6,12} \node[left] at (0,\y) {\y};
    \node[below] at (0.2,0) {$0{,}2$};
    \node[below] at (0.4,0) {$0{,}4$};
    \node[below] at (0.6,0) {$0{,}6$};
    \node[below left] at (0,0) {0};
    \draw[ultra thick, brandPrimary] (0,0) -- (0.6,12);
\end{tikzpicture}
```

## Решение

Трения нет, поэтому сила $F$ — единственная горизонтальная сила, и по второму закону Ньютона $F = ma$. Масса равна отношению силы к ускорению в любой точке графика, например $F = 12$~Н при $a = 0{,}6$~м/с$^2$.

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

$$m = \frac{F}{a} = \frac{12}{0{,}6} = 20~\text{кг}.$$
