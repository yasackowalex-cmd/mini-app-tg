---
id: dem27_v8_n1
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
variant: 8
answer: "4,5"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Демидова, ЕГЭ-2027, 30 вариантов (вариант 8)
---

## Условие

На рисунке приведён график зависимости проекции $v_x$ скорости тела от времени $t$.

[[рис 1]]

Определите проекцию $a_x$ ускорения этого тела в момент времени $1$~с. Ответ запишите с учётом знака проекции.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=0.2cm, every node/.style={font=\small}]
\foreach \i in {0.5,1.5,...,8.5} \draw[gray!25, very thin] (\i,-9) -- (\i,9);
  \foreach \j in {-7.5,-4.5,-1.5,1.5,4.5,7.5} \draw[gray!25, very thin] (0,\j) -- (9,\j);
  \foreach \i in {1,...,9} \draw[gray!50, thin] (\i,-9) -- (\i,9);
  \foreach \j in {-9,-6,-3,3,6,9} \draw[gray!50, thin] (0,\j) -- (9,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (10,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-9) -- (0,11.8) node[left] {$v_x$, м/с};
  \foreach \i in {1,...,9} \node[below, fill=white, inner sep=1pt] at (\i,-0.25) {$\i$};
  \foreach \j in {-9,-6,-3,0,3,6,9} \node[left] at (0,\j) {$\j$};
  \draw[very thick, brandPrimary] (0,-9) -- (3,4.5) -- (5.5,4.5) -- (9,-6);
\end{tikzpicture}
```

## Решение

В момент $1$~с тело движется на участке от $0$ до $3$~с, где проекция скорости меняется линейно от $-9$ до $4{,}5$~м/с:
$$a_x = \frac{\Delta v_x}{\Delta t} = \frac{4{,}5 - (-9)}{3 - 0} = \frac{13{,}5}{3} = 4{,}5~\text{м/с}^2.$$
