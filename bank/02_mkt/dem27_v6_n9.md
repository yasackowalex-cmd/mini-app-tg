---
id: dem27_v6_n9
exam: ЕГЭ
kim: 9
section: МКТ и термодинамика
theme: ПЕРВОЕ НАЧАЛО ТЕРМОДИНАМИКИ. РАБОТА ГАЗА. ВНУТРЕННЯЯ ЭНЕРГИЯ
topic: 2.5
level: П
type: соответствие/выбор
variant: 6
answer: "235"
unit: ""
has_image: true
author_task: false
tags: [МКТ, ТЕРМОДИНАМИКА, ГРАФИКИ]
source: Демидова, ЕГЭ-2027, 30 вариантов (вариант 6)
---

## Условие

На рисунке показан график циклического процесса, проведённого с одноатомным идеальным газом, в координатах $V$–$T$, где $V$ — объём газа, $T$ — его абсолютная температура. Количество вещества газа постоянно.

[[рис 1]]

Из приведённого ниже списка выберите все верные утверждения, характеризующие отражённые на графике процессы.

1) В процессе $AB$ газ отдал положительное количество теплоты.\\
2) В процессе $CD$ над газом совершалась положительная работа.\\
3) В процессе $BC$ давление газа увеличилось.\\
4) В процессе $AB$ газ изобарно охлаждался.\\
5) В процессе $DA$ газ отдал положительное количество теплоты.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.42cm, y=0.42cm, every node/.style={font=\small}]
\foreach \i in {1,...,8} \draw[gray!50, thin] (\i,0) -- (\i,8);
  \foreach \j in {1,...,8} \draw[gray!50, thin] (0,\j) -- (8,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (8.8,0) node[below] {$T$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,8.8) node[left] {$V$};
  \node[below left] at (0,0) {$0$};
  \draw[dashed, brandSecondary!55] (0,0) -- (1.2857,3);
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.55 with {\arrow{Stealth[scale=1.0]}}}] (1.2857,3) -- (3,7);
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.55 with {\arrow{Stealth[scale=1.0]}}}] (3,7) -- (6,7);
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.55 with {\arrow{Stealth[scale=1.0]}}}] (6,7) -- (6,3);
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.55 with {\arrow{Stealth[scale=1.0]}}}] (6,3) -- (1.2857,3);
  \foreach \p/\l/\s in {(1.2857,3)/A/below right, (3,7)/B/above left, (6,7)/C/above right, (6,3)/D/below right}
    {\fill \p circle (1.2pt); \node[\s] at \p {$\l$};}
\end{tikzpicture}
```

## Решение

Из $pV = \nu RT$: продолжение отрезка $AB$ проходит через начало координат, $V \sim T$, значит, $AB$ — изобара. $BC$ и $DA$ — изохоры, $CD$ — изотерма.

1) Неверно: в процессе $AB$ газ расширяется ($A > 0$) и нагревается ($\Delta U > 0$), по первому закону термодинамики $Q = \Delta U + A > 0$ — газ получил теплоту.

2) Верно: в процессе $CD$ объём уменьшается, газ сжимают, внешние силы совершают положительную работу.

3) Верно: в процессе $BC$ объём постоянен, а температура растёт, $p = \dfrac{\nu RT}{V}$ увеличивается.

4) Неверно: в процессе $AB$ температура растёт, газ изобарно нагревается.

5) Верно: в процессе $DA$ объём постоянен, работа равна нулю, температура уменьшается: $Q = \Delta U < 0$, газ отдаёт теплоту.
