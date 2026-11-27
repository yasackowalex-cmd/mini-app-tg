---
id: fipi_97B7FB
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "12"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 97B7FB)
---

## Условие

Невесомый рычаг находится в равновесии (см. рисунок). Модуль силы $\vec F_2$ равен $8$~Н, её плечо равно $15$~см. Каков модуль силы $\vec F_1$, если её плечо равно $10$~см?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[thick, fill=white] (0,0) rectangle (5,0.15);
  \draw[thick, fill=white] (2,0) -- (1.75,-0.45) -- (2.25,-0.45) -- cycle;
  \fill (2,0.075) circle (1.5pt); \node[above] at (2,0.15) {$O$};
  \draw[-{Stealth[scale=0.9]}, very thick] (0.05,0) -- (0.05,-0.8) node[right] {$\vec F_1$};
  \draw[-{Stealth[scale=0.9]}, very thick] (4.95,0) -- (4.95,-0.8) node[left] {$\vec F_2$};
\end{tikzpicture}
```

## Подсказка

Правило моментов: рычаг в равновесии, если $F_1l_1 = F_2l_2$.

## Решение

По правилу моментов $F_1l_1 = F_2l_2$:
$$F_1 = \frac{F_2l_2}{l_1} = \frac{8\cdot 15}{10} = 12~\text{Н}.$$
