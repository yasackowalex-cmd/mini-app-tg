---
id: dem26_v2_n3
exam: ЕГЭ
kim: 3
section: Механика
theme: Задание №3 (Законы сохранения в механике)
topic: 1.3.2
level: Б
type: расчётная
variant: 2
answer: "-1200"
unit: "Дж"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: kim03.tex
---

## Условие

Под действием постоянной горизонтально направленной силы тяги $80$~Н ящик равномерно прямолинейно перемещается по горизонтальному участку пути на расстояние $15$~м. Какую работу совершает при этом сила трения?

## Решение

Ящик движется равномерно, значит, сила трения уравновешивает силу тяги: $F_\text{тр} = 80$~Н. Сила трения направлена против перемещения, поэтому её работа отрицательна: Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % пол
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-2.2,0) rectangle (2.4,-0.15);
  \draw[thick, brandSecondary] (-2.2,0) -- (2.4,0);
  % ящик
  \draw[thick, fill=brandPrimary!10] (-0.6,0) rectangle (0.6,0.9);
  \fill (0,0.45) circle (1.2pt);
  % силы
  \draw[Fvec] (0,0.45) -- (1.5,0.45) node[right] {$\vec F_\text{тяги}$};
  \draw[Fvec] (-0.6,0.08) -- (-2.1,0.08) node[above right, inner sep=1pt, yshift=1pt] {$\vec F_\text{тр}$};
  \draw[Fvec] (0.12,0.45) -- (0.12,1.4) node[above] {$\vec N$};
  \draw[Fvec] (-0.12,0.45) -- (-0.12,-0.5) node[below] {$m\vec g$};
  \draw[vvec] (0.6,1.25) -- (1.5,1.25) node[above] {$\vec v$};
\end{tikzpicture}
```

$$A_\text{тр} = -F_\text{тр}\, s = -80 \cdot 15 = -1200~\text{Дж}.$$
