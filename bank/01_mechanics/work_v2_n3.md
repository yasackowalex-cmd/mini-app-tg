---
id: work_v2_n3
exam: ЕГЭ
kim: 3
section: Механика
theme: РАБОТА И МОЩНОСТЬ СИЛЫ. КИНЕТИЧЕСКАЯ ЭНЕРГИЯ
topic: 1.3.2
level: Б
type: расчётная
variant: 2
answer: "-1200"
unit: "Дж"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: work.tex
---

## Условие

Под действием постоянной горизонтально направленной силы тяги $80$~Н ящик равномерно прямолинейно перемещается по горизонтальному участку пути на расстояние $15$~м. Какую работу совершает при этом сила трения?

## Решение

Ящик движется равномерно, поэтому сила трения уравновешивает силу тяги: $F_\text{тр} = 80$~Н. Она направлена против перемещения, и её работа отрицательна. Силы показаны на рисунке ($\vec F$ — сила тяги).

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % поверхность
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-1.7,-0.15) rectangle (1.9,0);
  \draw[thick, brandSecondary] (-1.7,0) -- (1.9,0);
  % брусок
  \draw[thick, fill=brandPrimary!10] (-0.6,0) rectangle (0.6,0.6);
  \fill (0,0.3) circle (1.2pt);
  % силы
  \draw[Fvec] (-0.12,0.3) -- (-0.12,-0.75) node[below] {$m\vec g$};
  \draw[Fvec] (0.12,0) -- (0.12,1.05) node[above] {$\vec N$};
  \draw[Fvec] (0.6,0.3) -- (1.6,0.3) node[above] {$\vec F$};
  \draw[Fvec] (-0.6,0.06) -- (-1.1,0.06) node[above left, inner sep=1pt] {$\vec F_\text{тр}$};
  \draw[vvec] (0.7,1.0) -- (1.5,1.0) node[right] {$\vec v$};
\end{tikzpicture}
```

$$A_\text{тр} = -F_\text{тр} s = -80 \cdot 15 = -1200~\text{Дж}.$$
