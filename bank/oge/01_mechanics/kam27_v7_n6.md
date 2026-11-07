---
id: kam27_v7_n6
exam: ОГЭ
kim: 6
section: Механика
theme: ИМПУЛЬС. ЗАКОН СОХРАНЕНИЯ ИМПУЛЬСА. УДАРЫ
topic: 1.3.1
level: Б
type: расчётная
variant: 7
answer: "360"
unit: "кг·м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА, ГРАФИКИ, ИМПУЛЬС]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 7)
---

## Условие

График зависимости скорости $v$ движения велосипедиста от времени $t$ представлен на рисунке. Чему равен импульс велосипедиста через $5$~с после начала движения, если его масса равна $60$~кг?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.55cm, y=0.45cm, every node/.style={font=\small}]
  \foreach \x in {1,...,6} \draw[brandSecondary!30] (\x,0) -- (\x,6);
  \foreach \y in {1,...,6} \draw[brandSecondary!30] (0,\y) -- (6,\y);
  \draw[-{Stealth}, thick] (0,0) -- (7,0) node[right] {$t$, с};
  \draw[-{Stealth}, thick] (0,0) -- (0,7) node[left] {$v$, м/с};
  \foreach \x in {1,...,6} \node[below] at (\x,0) {\x};
  \foreach \y in {1,...,6} \node[left] at (0,\y) {\y};
  \node[below left] at (0,0) {0};
  \draw[very thick, brandPrimary] (0,0) -- (1,2) -- (2,2) -- (4,6) -- (6,6);
\end{tikzpicture}
```

## Подсказка

Найдите на графике скорость в момент $5$~с; $p = mv$.

## Решение

По графику при $t = 5$~с скорость $v = 6$~м/с. Импульс
$$p = mv = 60\cdot 6 = 360~\frac{\text{кг}\cdot\text{м}}{\text{с}}.$$
