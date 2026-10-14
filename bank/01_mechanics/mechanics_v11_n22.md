---
id: mechanics_v11_n22
exam: ЕГЭ
kim: 22
section: Механика
theme: МЕХАНИКА (ВЫСОКИЙ УРОВЕНЬ СЛОЖНОСТИ)
topic: 1.3.2
level: П
type: расчётная (часть 2)
variant: 11
answer: "2000"
unit: "Н"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: kim22,26.tex
---

## Условие

Автомобиль массой $1000$~кг движется по горизонтальной дороге. Под действием постоянной тормозящей силы за время $t = 4$~с кинетическая энергия автомобиля уменьшилась в $4$ раза. Определите модуль тормозящей силы, если начальный импульс автомобиля составлял $16000\text{ кг}\cdot\text{м/с}$.

## Решение

Обозначим $m = 1000\,\text{кг}$, $p_0 = 16\,000\,\text{кг}\cdot\text{м/с}$ — начальный импульс, $v_0$ и $v$ — начальная и конечная скорости автомобиля, $F$ — модуль тормозящей силы.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-2.0,-0.15) rectangle (2.2,0);
  \draw[thick, brandSecondary] (-2.0,0) -- (2.2,0);
  % автомобиль
  \draw[thick, fill=brandPrimary!10] (-0.8,0.15) -- (0.8,0.15) -- (0.8,0.5) -- (0.4,0.5) -- (0.2,0.8) -- (-0.5,0.8) -- (-0.7,0.5) -- (-0.8,0.5) -- cycle;
  \draw[thick, fill=gray!50] (-0.45,0.12) circle (0.12);
  \draw[thick, fill=gray!50] (0.45,0.12) circle (0.12);
  \fill (0,0.45) circle (1.2pt);
  \draw[Fvec] (0,0.45) -- (-1.3,0.45) node[above] {$\vec F$};
  \draw[Fvec] (0,0.45) -- (0,1.35) node[right] {$\vec N$};
  \draw[Fvec] (0,0.45) -- (0,-0.45) node[below] {$m\vec g$};
  \draw[vvec] (0.6,1.15) -- (1.5,1.15) node[right] {$\vec v$};
\end{tikzpicture}
```

Начальная скорость $v_0 = \dfrac{p_0}{m} = 16\,\text{м/с}$.

Кинетическая энергия $E = \dfrac{mv^2}{2}$; уменьшение её в $4$ раза означает уменьшение скорости в $2$ раза: $v = \dfrac{v_0}{2} = 8\,\text{м/с}$.

По второму закону Ньютона в импульсной форме: $F t = m v_0 - m v$, откуда $F = \dfrac{m(v_0 - v)}{t} = \dfrac{p_0}{2t}$.

$F = \dfrac{16\,000}{2\cdot 4} = 2000\,\text{Н}$.

Ответ: $F = 2000\,\text{Н}$.
