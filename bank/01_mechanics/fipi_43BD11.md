---
id: fipi_43BD11
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "30"
unit: "см"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 43BD11)
---

## Условие

Человек несёт груз на лёгкой палке, опирая её на плечо в точке $O$ (см. рисунок). Чтобы удержать в равновесии груз весом $80$~Н, он прикладывает к концу $B$ палки вертикальную силу $30$~Н. $OB = 80$~см. Чему равно $OA$?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[line width=2pt, brandSecondary] (0,0) -- (4,0);
  \draw[thick, fill=white] (1,0) -- (0.75,-0.45) -- (1.25,-0.45) -- cycle; \node[below right] at (1.2,-0.45) {плечо человека};
  \fill (0,0) circle (2pt) node[above] {$A$}; \fill (1,0) circle (2pt) node[above] {$O$}; \fill (4,0) circle (2pt) node[above] {$B$};
  \draw (0,0) -- (0,-0.6); \draw[thick, fill=white] (-0.3,-0.6) rectangle (0.3,-1.1);
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,-1.1) -- (0,-1.9) node[right] {$\vec P$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (4,0) -- (4,-0.8) node[right] {$\vec F$};
\end{tikzpicture}
```

## Подсказка

Правило моментов: рычаг в равновесии, если $F_1l_1 = F_2l_2$.

## Решение

Палка опирается на плечо в точке $O$. Груз весом $P$ на конце $A$ стремится повернуть палку в одну сторону, рука с силой $F$ на конце $B$ — в другую. По правилу моментов относительно $O$
$$P\cdot OA = F\cdot OB \quad\Rightarrow\quad OA = \frac{F\cdot OB}{P} = \frac{30\cdot 80}{80} = 30~\text{см}.$$
