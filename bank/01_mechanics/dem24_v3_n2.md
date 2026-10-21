---
id: dem24_v3_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: расчётная
variant: 3
answer: "5"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 3)
---

## Условие

На рисунке показаны силы (в заданном масштабе), действующие на материальную точку. Сторона клетки соответствует $1$~Н. Определите модуль равнодействующей приложенных сил.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\small}]
\draw[gray!60, thin] (0,0) grid (5,5);

  \draw[Fvec] (1,1) -- (5,1); \node[above] at (4.4,1) {$\vec F_1$};
  \draw[Fvec] (1,1) -- (1,0); \node[right] at (1,0.4) {$\vec F_2$};
  \draw[Fvec] (1,1) -- (1,5); \node[right] at (1,4.4) {$\vec F_3$};
  \fill (1,1) circle (2pt);
  \draw[very thick, |-|] (3,4.5) -- (4,4.5);
  \node[above] at (3.5,4.5) {1 Н};
\end{tikzpicture}
```

## Решение

Направим ось $x$ вправо, ось $y$ вверх. По клеткам: $\vec F_1$ — $4$~Н вправо, $\vec F_3$ — $4$~Н вверх, $\vec F_2$ — $1$~Н вниз. Проекции равнодействующей:
$$R_x = 4~\text{Н}, \qquad R_y = 4 - 1 = 3~\text{Н}.$$
Модуль равнодействующей
$$R = \sqrt{R_x^2 + R_y^2} = \sqrt{4^2 + 3^2} = 5~\text{Н}.$$
