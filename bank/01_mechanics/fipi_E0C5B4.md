---
id: fipi_E0C5B4
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "-2"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание E0C5B4)
---

## Условие

Автомобиль движется по прямой улице, параллельной оси $Ox$. На графике представлена зависимость проекции его скорости $v_x$ от времени $t$.

[[рис 1]]

Определите проекцию ускорения автомобиля $a_x$ в интервале времени от $0$ до $10$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.14cm, y=0.14cm, every node/.style={font=\small}]
\foreach \i in {5,10,...,40} \draw[gray!50, thin] (\i,0) -- (\i,20);
  \foreach \j in {5,10,15,20} \draw[gray!50, thin] (0,\j) -- (40,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (44,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,24) node[above] {$v_x$, м/с};
  \foreach \i in {10,20,30,40} \node[below] at (\i,0) {$\i$};
  \foreach \j in {10,20} \node[left] at (0,\j) {$\j$};
  \node[below left] at (0,0) {$0$};
  \draw[very thick, brandPrimary] (0,20) -- (10,0) -- (20,10) -- (30,10) -- (40,15);
\end{tikzpicture}
```

## Подсказка

$a_x = \dfrac{v_x - v_{0x}}{t}$ по концам интервала. Скорость убывает — проекция ускорения отрицательна.

## Решение

От $0$ до $10$~с проекция скорости уменьшилась от $20$ до $0$~м/с:
$$a_x = \frac{0 - 20}{10} = -2~\text{м/с}^2.$$
