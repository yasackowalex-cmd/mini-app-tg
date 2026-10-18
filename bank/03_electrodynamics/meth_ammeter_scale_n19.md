---
id: meth_ammeter_scale_n19
exam: ЕГЭ
kim: 19
section: Электродинамика
theme: ПОКАЗАНИЯ ИЗМЕРИТЕЛЬНЫХ ПРИБОРОВ. ПОГРЕШНОСТИ
topic: 4.8
level: Б
type: расчётная
variant: 2
answer: "0,20 ± 0,01"
unit: "А"
has_image: true
author_task: false
tags: [МЕТОДЫ, ПОГРЕШНОСТИ]
source: Демидова, ЕГЭ-2026, 30 вариантов (вариант 2)
---

## Условие

Определите показания амперметра (см. рисунок), если абсолютная погрешность прямого измерения силы тока равна половине цены деления прибора. Амперметр проградуирован в амперах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0]
  \pgfmathsetmacro{\k}{137.5}
  \foreach \i in {0,...,27} {
    \pgfmathsetmacro{\a}{220+\k*0.02*\i}
    \pgfmathtruncatemacro{\r}{mod(\i,5)}
    \ifnum\r=0
      \draw[thick] (\a:3.0) -- (\a:3.45);
    \else
      \draw[thin] (\a:3.0) -- (\a:3.22);
    \fi
  }
  \node[font=\bfseries] at (220:3.8) {0};
  \node[font=\bfseries] at ({220+\k*0.2}:3.8) {0,2};
  \node[font=\bfseries] at ({220+\k*0.4}:3.8) {0,4};
  \draw[line width=1.6pt, brandPrimary, line cap=round] ({220+\k*0.2}:0.6) -- ({220+\k*0.2}:3.3);
  \node[font=\large] at (1.2,-0.6) {A};
\end{tikzpicture}
```

## Решение

Длинные штрихи идут через $0{,}1$~А, между ними пять делений: цена деления $\dfrac{0{,}1}{5} = 0{,}02$~А.

Стрелка стоит на отметке $0{,}2$: $I = 0{,}20$~А.

Погрешность равна половине цены деления: $\Delta I = \dfrac{0{,}02}{2} = 0{,}01$~А. Значение записываем с тем же числом знаков после запятой, что и погрешность.
