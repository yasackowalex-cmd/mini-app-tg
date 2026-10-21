---
id: dem24_v8_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: СИЛА УПРУГОСТИ (ЗАКОН ГУКА)
topic: 1.2.4
level: Б
type: расчётная
variant: 8
answer: "200"
unit: "Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА, СИЛА_УПРУГОСТИ, ГРАФИКИ]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 8)
---

## Условие

На рисунке представлен график зависимости модуля силы упругости $F_\text{упр}$ пружины от величины её деформации $\Delta x$. Определите жёсткость этой пружины.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
\foreach \x in {0.5,1,...,2.5} \draw[gray!40, thin] (\x,0) -- (\x,2.5);
  \foreach \y in {0.5,1,...,2.5} \draw[gray!40, thin] (0,\y) -- (2.5,\y);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (3.2,0) node[below] {$\Delta x$, см};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,3.0) node[left] {$F_\text{упр}$, Н};
  \node[below left] at (0,0) {$0$};
  \node[below] at (1,0) {$10$}; \node[below] at (2,0) {$20$};
  \node[left] at (0,1) {$20$}; \node[left] at (0,2) {$40$};
  \draw[very thick, brandPrimary] (0,0) -- (2.25,2.25);
\end{tikzpicture}
```

## Решение

По закону Гука $F_\text{упр} = k\Delta x$, откуда $k = \dfrac{F_\text{упр}}{\Delta x}$. По графику при $\Delta x = 20$~см $= 0{,}2$~м сила $F_\text{упр} = 40$~Н:
$$k = \frac{40}{0{,}2} = 200~\text{Н/м}.$$
