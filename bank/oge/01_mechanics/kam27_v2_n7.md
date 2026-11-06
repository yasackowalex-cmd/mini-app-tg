---
id: kam27_v2_n7
exam: ОГЭ
kim: 7
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА
topic: 1.2.2
level: Б
type: расчётная
variant: 2
answer: "2000"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, ГРАФИКИ]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 2)
---

## Условие

На рисунке представлен график зависимости модуля скорости автомобиля массой $1$~т, движущегося прямолинейно по дороге, от времени.

[[рис 1]]

Чему равен модуль равнодействующей всех сил, действующих на автомобиль в первую секунду движения?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.55cm, y=0.55cm, every node/.style={font=\small}]
  \foreach \x in {1,...,7} \draw[brandSecondary!30] (\x,0) -- (\x,4);
  \foreach \y in {1,2,3,4} \draw[brandSecondary!30] (0,\y) -- (7,\y);
  \draw[-{Stealth}, thick] (0,0) -- (8,0) node[right] {$t$, с};
  \draw[-{Stealth}, thick] (0,0) -- (0,5) node[above] {$v$, м/с};
  \foreach \x in {1,...,7} \node[below] at (\x,0) {\x};
  \foreach \y in {2,4} \node[left] at (0,\y) {\y};
  \node[below left] at (0,0) {0};
  \draw[very thick, brandPrimary] (0,0) -- (1,2) -- (3,2) -- (7,0);
\end{tikzpicture}
```

## Подсказка

Найдите ускорение по наклону графика на первой секунде и примените второй закон Ньютона.

## Решение

За первую секунду скорость выросла от $0$ до $2$~м/с, ускорение
$$a = \frac{\Delta v}{\Delta t} = \frac{2}{1} = 2~\text{м/с}^2.$$

По второму закону Ньютона равнодействующая
$$F = ma = 1000\cdot 2 = 2000~\text{Н}.$$
