---
id: fipi_D359AA
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "100"
unit: "м"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание D359AA)
---

## Условие

На рисунке представлен график зависимости модуля скорости $v$ автомобиля от времени $t$.

[[рис 1]]

Найдите путь, пройденный автомобилем за время от $30$ до $50$~с.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.75cm, y=0.6cm, every node/.style={font=\small}]
\foreach \i in {1,...,5} \draw[gray!50, thin] (\i,0) -- (\i,2);
  \foreach \j in {1,2} \draw[gray!50, thin] (0,\j) -- (5,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (5.7,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,2.7) node[left] {$v$, м/с};
  \node[below left] at (0,0) {$0$};
  \foreach \i/\l in {1/10,2/20,3/30,4/40,5/50} \node[below] at (\i,0) {$\l$};
  \node[left] at (0,2) {$10$};
  \draw[very thick, brandPrimary] (0,0) -- (1,2) -- (3,2) -- (5,0);
\end{tikzpicture}
```

## Подсказка

Путь равен площади под графиком модуля скорости: разбейте её на треугольники, прямоугольники и трапеции.

## Решение

Путь равен площади под графиком скорости. От $30$ до $50$~с скорость равномерно уменьшается от $10$~м/с до нуля (треугольник):
$$s = \frac{10\cdot 20}{2} = 100~\text{м}.$$
