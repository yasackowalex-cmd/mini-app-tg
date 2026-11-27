---
id: fipi_EA992E
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "-5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание EA992E)
---

## Условие

Тело движется по прямой, параллельной оси $Ox$. На графике представлена зависимость проекции $v_x$ его скорости от времени $t$.

[[рис 1]]

Определите проекцию $a_x$ ускорения тела в интервале времени от $0$ до $5$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.3cm, y=0.1cm, every node/.style={font=\small}]
\foreach \i in {1,...,20} \draw[gray!50, thin] (\i,-15) -- (\i,15);
  \foreach \j in {-15,-10,-5,5,10,15} \draw[gray!50, thin] (0,\j) -- (20,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (21.5,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-15) -- (0,19) node[above] {$v_x$, м/с};
  \foreach \i in {5,10,15,20} \node[below] at (\i,-15) {$\i$};
  \foreach \j in {-15,-10,-5,5,10,15} \node[left] at (0,\j) {$\j$};
  \node[left] at (0,0) {$0$};
  \draw[very thick, brandPrimary] (0,15) -- (5,-10) -- (7,-10) -- (12,5) -- (15,5) -- (19,-5);
\end{tikzpicture}
```

## Подсказка

$a_x = \dfrac{v_x - v_{0x}}{t}$ по концам интервала.

## Решение

От $0$ до $5$~с график — отрезок прямой. Проекция скорости изменилась от $15$ до $-10$~м/с:
$$a_x = \frac{-10 - 15}{5} = -5~\text{м/с}^2.$$
