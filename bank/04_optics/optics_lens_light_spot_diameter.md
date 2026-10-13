---
id: optics_lens_light_spot_diameter
exam: ЕГЭ
kim: 25
section: Оптика
theme: 
topic: 4.2
level: Б
type: расчётная (часть 2)
variant: 
answer: "8"
unit: "см"
has_image: false
author_task: false
tags: [ОПТИКА, ЛИНЗЫ, СВЕТОВОЕ_ПЯТНО]
source: len.tex
---

## Условие

На двойном фокусном расстоянии от собирающей линзы с оптической силой $5\text{ дптр}$ на её главной оптической оси расположен точечный источник света. Линза вставлена в непрозрачную оправу радиусом $8\text{ см}$. Каков диаметр светлого пятна на экране, расположенном на расстоянии $60\text{ см}$ от линзы? Сделайте рисунок с указанием хода лучей. Ответ выразите в сантиметрах (см).

## Решение

Фокусное расстояние линзы $F = \dfrac{1}{D} = \dfrac{1}{5}\,\text{м} = 20\,\text{см}$. Источник находится на расстоянии $d = 2F = 40\,\text{см}$ от линзы.

По формуле тонкой линзы $\dfrac{1}{d} + \dfrac{1}{f} = \dfrac{1}{F}$ изображение источника $S'$ находится на оси за линзой на расстоянии $f = \dfrac{dF}{d - F} = \dfrac{40\cdot 20}{40 - 20}\,\text{см} = 40\,\text{см}$.

Ход лучей показан на рисунке: лучи от источника $S$, прошедшие через края оправы, после линзы сходятся в точке $S'$, а затем расходятся и попадают на экран, стоящий дальше $S'$ (на $L = 60\,\text{см}$ от линзы). Края светлого пятна — точки пересечения этих крайних лучей с экраном.

```latex
\begin{tikzpicture}[x=0.06cm, y=0.1cm, font=\small]
  % главная оптическая ось
  \draw[thin, gray] (-46,0) -- (66,0);
  % линза в оправе
  \draw[{Stealth[scale=0.8]}-{Stealth[scale=0.8]}, thick, brandSecondary] (0,-8) -- (0,8);
  \draw[line width=2.5pt] (0,8) -- (0,12) (0,-8) -- (0,-12);
  % фокусы
  \foreach \x/\t in {-20/F,20/F,-40/2F} \fill (\x,0) circle (1pt) node[below=1pt] {$\t$};
  % экран и пятно
  \draw[very thick, gray] (60,-11) -- (60,11);
  \draw[line width=3pt, brandAccent!60] (60,-4) -- (60,4);
  % источник и изображение
  \fill (-40,0) circle (1.6pt) node[above left, inner sep=1pt] {$S$};
  % крайние лучи
  \draw[brandAccent, thick] (-40,0) -- (0,8) -- (60,-4);
  \draw[brandAccent, thick] (-40,0) -- (0,-8) -- (60,4);
  \draw[brandAccent, thick, -{Stealth[scale=0.8]}] (-40,0) -- (-20,4);
  \draw[brandAccent, thick, -{Stealth[scale=0.8]}] (-40,0) -- (-20,-4);
  \draw[brandAccent, thick, -{Stealth[scale=0.8]}] (0,8) -- (20,4);
  \draw[brandAccent, thick, -{Stealth[scale=0.8]}] (0,-8) -- (20,-4);
  \fill (40,0) circle (1.6pt) node[above=2pt] {$S'$};
  % размеры
  \draw[|-|, thin] (-40,-16) -- (0,-16) node[midway, fill=white, inner sep=1pt] {$d$};
  \draw[|-|, thin] (0,-16) -- (40,-16) node[midway, fill=white, inner sep=1pt] {$f$};
  \draw[|-|, thin] (0,-21) -- (60,-21) node[midway, fill=white, inner sep=1pt] {$L$};
  \draw[|-|, thin] (-4,0) -- (-4,8) node[midway, left] {$r$};
  \draw[|-|, thin] (64,0) -- (64,4) node[midway, right] {$r_\text{п}$};
\end{tikzpicture}
```

Обозначим $r = 8\,\text{см}$ — радиус оправы, $r_\text{п}$ — радиус пятна. Из подобия треугольников с общей вершиной $S'$: $\dfrac{r_\text{п}}{L - f} = \dfrac{r}{f}$, откуда диаметр пятна $D_\text{п} = 2r_\text{п} = 2r\dfrac{L - f}{f}$.

$D_\text{п} = 2\cdot 8\cdot\dfrac{60 - 40}{40}\,\text{см} = 8\,\text{см}$.

Ответ: $D_\text{п} = 8\,\text{см}$.
