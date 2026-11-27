---
id: fipi_D52A7D
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "0,3"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание D52A7D)
---

## Условие

Тело массой $0{,}2$~кг подвешено к правому плечу невесомого рычага (см. рисунок). Груз какой массы надо подвесить ко второму делению левого плеча рычага для достижения равновесия?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.55, every node/.style={font=\small}]
  \fill[brandSecondary!45] (4,2.2) rectangle (6,2.6); \draw (5,2.2) -- (5,0.4);
  \foreach \i in {0,...,9} \draw[thick, fill=white] (\i,0) rectangle (\i+1,0.4);
  \fill (5,0.4) circle (2pt);
  \draw[dashed] (3,0) -- (3,-0.7); \draw[dashed, thick] (3,-1.2) circle (0.5); \node at (3,-1.2) {?};
  \draw (8,0) -- (8,-0.7); \draw[thick, fill=brandSecondary!45] (8,-1.2) circle (0.5);
\end{tikzpicture}
```

## Подсказка

Правило моментов: рычаг в равновесии, если $F_1l_1 = F_2l_2$.

## Решение

Плечо силы тяжести тела справа — $3$ деления, плечо искомого груза слева — $2$ деления. По правилу моментов
$$mg\cdot 2 = 0{,}2\cdot g\cdot 3 \quad\Rightarrow\quad m = \frac{0{,}2\cdot 3}{2} = 0{,}3~\text{кг}.$$
