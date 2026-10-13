---
id: fluid_iron_cube
exam: ЕГЭ
kim: 4
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная
variant: 
answer: "78"
unit: "Н"
has_image: false
author_task: false
tags: []
source: pres.tex
---

## Условие

Железный кубик плавает в ртути. Ребро кубика равно $10$~см. Определите силу Архимеда, действующую на кубик.

## Решение

Кубик плавает, значит, сила Архимеда уравновешивает силу тяжести: $F_\text{А} = mg$. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % жидкость и сосуд
  \fill[brandPrimary!12] (-1.6,0) rectangle (1.6,2.1);
  \draw[brandPrimary!70] (-1.6,2.1) -- (1.6,2.1);
  \draw[very thick, brandSecondary] (-1.6,3.4) -- (-1.6,0) -- (1.6,0) -- (1.6,3.4);
  \node[right, brandSecondary] at (1.6,0.35) {ртуть};
  % тело
  \draw[thick, fill=gray!35] (-0.6,1.42) rectangle (0.6,2.62);
  \fill (0,2.02) circle (1.2pt);
  % силы
  \draw[Fvec] (-0.14,2.02) -- (-0.14,0.87) node[below] {$m\vec g$};
  \draw[Fvec] (0.14,2.02) -- (0.14,3.17) node[above] {$\vec F_\text{А}$};
\end{tikzpicture}
```

Масса кубика: $m = \rho V = 7800 \cdot 0{,}1^3 = 7{,}8$~кг (плотность железа $7800$~кг/м$^3$).

$$F_\text{А} = mg = 7{,}8 \cdot 10 = 78~\text{Н}.$$
