---
id: newton2_v15_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: соответствие/выбор
variant: 15
answer: "14"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ тела, движущегося вдоль оси $Ox$, от времени $t$ (парабола). Графики А и Б представляют собой зависимости физических величин, характеризующих движение этого тела, от времени $t$.

[[рис 1]]

[[рис 2]]

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут представлять.
1) проекция скорости тела на ось $Ox$
2) проекция перемещения тела на ось $Ox$
3) кинетическая энергия тела
4) модуль равнодействующей сил, действующих на тело

Запишите в таблицу выбранные цифры под соответствующими буквами.

\begin{center}
\begin{tabular}{|c|c|}
\hline
А & Б \\ \hline
 & \\ \hline
\end{tabular}
\end{center}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.65, every node/.style={font=\footnotesize}]
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,2.2) node[above] {$x$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary, domain=0:3, samples=60] plot (\x, {1.5 - 1.2*\x + 0.3*\x*\x});
    \draw[dashed] (2,0) -- (2,0.3);
    \node[below] at (2,0) {$t_1$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

```latex
\begin{tikzpicture}[scale=0.65, every node/.style={font=\footnotesize}]
  \begin{scope}[xshift=0cm]
    \node at (1.5,2.35) {А)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-1.3) -- (0,1.8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary] (0,-1) -- (2,0) -- (3,0.5);
    \node[below right] at (2,0) {$t_1$};
    \node[below left] at (0,0) {0};
  \end{scope}
  \begin{scope}[xshift=5.0cm]
    \node at (1.5,2.35) {Б)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-1.3) -- (0,1.8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary] (0,0.8) -- (3,0.8);
    \node[below left] at (0,0) {0};
  \end{scope}
\end{tikzpicture}
```

## Решение

Координата меняется по параболе, значит, тело движется равноускоренно: ускорение и равнодействующая постоянны, а проекция скорости меняется линейно.

График А — прямая, которая проходит через ноль в момент $t_1$ и меняет знак. Так ведёт себя проекция скорости: в вершине параболы тело останавливается и разворачивается (1). Перемещение и кинетическая энергия меняются по параболе, поэтому не подходят.

График Б — горизонтальная прямая выше нуля, это модуль равнодействующей $F = ma = \text{const}$ (4).
