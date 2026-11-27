---
id: fipi_A29DBB
exam: ЕГЭ
kim: 4
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5
level: Б
type: расчётная
answer: "0,5"
unit: "с"
has_image: true
author_task: false
tags: [МЕХАНИКА, ВОЛНЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание A29DBB)
---

## Условие

На рисунке представлена фотография шнура, по которому распространяется поперечная волна.

[[рис 1]]

Скорость распространения волны по шнуру равна $12$~м/с. Определите период колебаний источника волн.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=0.6cm, every node/.style={font=\footnotesize}]
  \draw[ultra thick, domain=0:12.6, samples=150] plot (\x, {1.6+0.6*cos(60*\x)});
  \draw[thick, fill=white] (-0.3,-0.2) rectangle (13.4,0.7);
  \foreach \x in {0,...,12} {\draw (\x,0.7) -- (\x,0.45); \node at (\x,0.15) {\x};}
  \foreach \x in {0.5,1.5,...,12.5} \draw (\x,0.7) -- (\x,0.55);
  \node at (13,0.15) {м};
\end{tikzpicture}
```

## Подсказка

Найдите по линейке длину волны — расстояние между соседними гребнями, затем $T = \dfrac\lambda v$.

## Решение

Длина волны — расстояние между соседними гребнями: они находятся у отметок $0$ и $6$~м, значит, $\lambda = 6$~м.
$$T = \frac\lambda v = \frac{6}{12} = 0{,}5~\text{с}.$$
