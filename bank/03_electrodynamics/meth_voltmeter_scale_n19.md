---
id: meth_voltmeter_scale_n19
exam: ЕГЭ
kim: 19
section: Электродинамика
theme: ПОКАЗАНИЯ ИЗМЕРИТЕЛЬНЫХ ПРИБОРОВ. ПОГРЕШНОСТИ
topic: 4.8
level: Б
type: расчётная
variant: 1
answer: "4,4 ± 0,2"
unit: "В"
has_image: true
author_task: false
tags: [МЕТОДЫ, ПОГРЕШНОСТИ]
source: Демидова, ЕГЭ-2026, 30 вариантов (вариант 1)
---

## Условие

Определите показания вольтметра (см. рисунок), если абсолютная погрешность прямого измерения напряжения равна цене деления прибора. Вольтметр проградуирован в вольтах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9]
  \draw[very thick] (-2.6,-0.4) rectangle (2.6,4.5);
  \foreach \i in {0,...,13} {
    \pgfmathsetmacro{\a}{126-6*\i}
    \pgfmathtruncatemacro{\big}{(\i==1)||(\i==6)||(\i==11)}
    \ifnum\big=1
      \draw[very thick] (\a:2.95) -- (\a:3.55);
    \else
      \draw[very thick] (\a:3.0) -- (\a:3.4);
    \fi
  }
  \node[font=\large\bfseries] at (120:4.0) {3};
  \node[font=\large\bfseries] at (90:4.0) {4};
  \node[font=\large\bfseries] at (60:4.0) {5};
  \draw[line width=2pt, brandPrimary, line cap=round] (0,0) -- (78:2.85);
  \fill[brandSecondary] (0,0) circle (2.5pt);
  \node[font=\Large] at (-1.6,0.6) {V};
\end{tikzpicture}
```

## Решение

Между отметками $3$ и $4$~В пять делений, цена деления $\dfrac{4-3}{5} = 0{,}2$~В.

Стрелка стоит на втором штрихе после отметки $4$: $U = 4 + 2\cdot 0{,}2 = 4{,}4$~В.

Погрешность равна цене деления: $\Delta U = 0{,}2$~В.

Ответ: $(4{,}4 \pm 0{,}2)$~В.
