---
id: newton2_v28_n22
exam: ЕГЭ
kim: 22
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА И СВЯЗАННЫЕ ТЕЛА)
topic: 1.2.2
level: П
type: расчётная (часть 2)
variant: 28
answer: "160"
unit: "Н/м"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

Груз массой $200$~г подвешен на пружине к потолку лифта. Лифт равноускоренно движется вниз с ускорением $2$~м/с$^{2}$, набирая скорость. Какова жёсткость пружины, если удлинение её постоянно и равно $1$~см?

## Решение

Обозначим $m = 0{,}2\,\text{кг}$ — масса груза, $a = 2\,\text{м/с}^2$ — ускорение лифта, $x = 0{,}01\,\text{м}$ — удлинение пружины, $k$ — её жёсткость.

На груз действуют сила тяжести $m\vec{g}$ и сила упругости пружины, по закону Гука равная по модулю $F_\text{упр} = kx$. Лифт разгоняется вниз, значит, ускорение груза направлено вниз. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % потолок лифта
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.9,1.6) rectangle (0.9,1.75);
  \draw[thick, brandSecondary] (-0.9,1.6) -- (0.9,1.6);
  % пружина
  \draw[thick, decorate, decoration={zigzag, segment length=5pt, amplitude=3pt, pre length=4pt, post length=4pt}] (0,1.6) -- (0,0.4);
  % груз
  \draw[thick, fill=brandAccent!20] (-0.4,-0.2) rectangle (0.4,0.4);
  \fill (0,0.1) circle (1.2pt);
  % силы
  \draw[Fvec] (0.25,0.4) -- (0.25,1.2) node[right] {$\vec F_\text{упр}$};
  \draw[Fvec] (0,0.1) -- (0,-1.0) node[below] {$m\vec g$};
  \draw[vvec] (0.85,0.3) -- (0.85,-0.4) node[right] {$\vec a$};
  % ось
  \draw[-{Stealth[scale=0.8]}, thin] (-1.0,0.6) -- (-1.0,-0.6) node[left] {$y$};
\end{tikzpicture}
```

По второму закону Ньютона в проекции на вертикальную ось, направленную вниз: $mg - kx = ma$.

Отсюда $k = \dfrac{m(g - a)}{x} = \dfrac{0{,}2\cdot(10 - 2)}{0{,}01} = 160\,\text{Н/м}$.
