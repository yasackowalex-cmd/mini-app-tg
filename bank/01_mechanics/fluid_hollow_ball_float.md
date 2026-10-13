---
id: fluid_hollow_ball_float
exam: ЕГЭ
kim: 4
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная
variant: 
answer: "100"
unit: "Н"
has_image: false
author_task: false
tags: []
source: pres.tex
---

## Условие

Полый стальной шар массой $10$~кг плавает на поверхности озера. Объём шара равен $15$~дм$^3$. Чему равна сила Архимеда, действующая на шар?

## Решение

Шар плавает, значит, сила Архимеда уравновешивает силу тяжести. Объём шара здесь не нужен: шар погружён не полностью. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % жидкость и сосуд
  \fill[brandPrimary!12] (-1.6,0) rectangle (1.6,2.1);
  \draw[brandPrimary!70] (-1.6,2.1) -- (1.6,2.1);
  \draw[very thick, brandSecondary] (-1.6,3.4) -- (-1.6,0) -- (1.6,0) -- (1.6,3.4);
  \node[right, brandSecondary] at (1.6,0.35) {вода};
  % тело
  \draw[thick, fill=brandAccent!15] (0,2.16) circle (0.6);
  \fill (0,2.16) circle (1.2pt);
  % силы
  \draw[Fvec] (-0.14,2.16) -- (-0.14,1.01) node[below] {$m\vec g$};
  \draw[Fvec] (0.14,2.16) -- (0.14,3.31) node[above] {$\vec F_\text{А}$};
\end{tikzpicture}
```

$$F_\text{А} = mg = 10 \cdot 10 = 100~\text{Н}.$$
