---
id: kam27_v8_n9
exam: ОГЭ
kim: 9
section: Электромагнитные явления
theme: ЗАКОН ОМА
topic: 3.1.2
level: Б
type: расчётная
variant: 8
answer: "0,125"
unit: "Кл"
has_image: true
author_task: false
tags: [ЭЛЕКТРОМАГНИТНЫЕ_ЯВЛЕНИЯ, ГРАФИКИ, ЗАРЯД]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 8)
---

## Условие

На рисунке представлен график зависимости силы тока $I$ в проводнике от времени $t$. Какой заряд прошёл по проводнику в интервале времени от $5$ до $10$~с?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.17cm, y=0.06cm, every node/.style={font=\small}]
  \foreach \x in {5,10,...,20} \draw[brandSecondary!30] (\x,0) -- (\x,35);
  \foreach \y in {10,20,30} \draw[brandSecondary!30] (0,\y) -- (22,\y);
  \draw[-{Stealth}, thick] (0,0) -- (26,0) node[right] {$t$, с};
  \draw[-{Stealth}, thick] (0,0) -- (0,42) node[left] {$I$, мА};
  \foreach \x in {5,10,15,20} \node[below] at (\x,0) {\x};
  \foreach \y in {10,20,30} \node[left] at (0,\y) {\y};
  \node[below left] at (0,0) {0};
  \draw[very thick, brandPrimary] (0,0) -- (5,30) -- (10,20) -- (15,20) -- (20,0);
\end{tikzpicture}
```

## Подсказка

Заряд — площадь под графиком силы тока. Не забудьте перевести миллиамперы в амперы.

## Решение

Заряд равен площади под графиком $I(t)$. От $5$ до $10$~с сила тока равномерно уменьшается с $30$ до $20$~мА — под графиком трапеция:
$$q = \frac{30 + 20}{2}\cdot 5 = 125~\text{мКл} = 0{,}125~\text{Кл}.$$
