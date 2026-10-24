---
id: mkt_gas_v9_n10
exam: ЕГЭ
kim: 10
section: МКТ и термодинамика
theme: УРАВНЕНИЕ МЕНДЕЛЕЕВА-КЛАПЕЙРОНА. ОСНОВНЫЕ ГАЗОВЫЕ ЗАКОНЫ
topic: 2.2
level: Б
type: соответствие/выбор
variant: 9
answer: "13"
unit: ""
has_image: true
author_task: false
tags: [МКТ]
source: ig.tex
---

## Условие

Идеальный одноатомный газ постоянной массы переходит из состояния 1 в состояние 2 (см. диаграмму). Как изменяются при этом концентрация молекул газа и его давление?

Для каждой величины определите соответствующий характер изменения:
1) увеличивается;
2) уменьшается;
3) не изменяется.

Запишите в таблицу выбранные цифры для каждой физической величины. Цифры в ответе могут повторяться.
\begin{center}
\begin{tabular}{|c|c|}
\hline
Концентрация молекул газа & Давление газа \\ \hline
 & \\ \hline
\end{tabular}
\end{center}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[xstep=0.5, ystep=0.5, gray!35, thin] (0,0) grid (2.5,2.5);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (3,0) node[below] {$T$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,3) node[left] {$V$};
  \node[below left] at (0,0) {$0$};
  \draw[dashed, gray] (0,0) -- (0.5,0.5);
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.57 with {\arrow{Stealth[scale=0.9]}}}] (2,2) -- (0.5,0.5);
  \fill (2,2) circle (1.2pt) node[above] {$1$};
  \fill (0.5,0.5) circle (1.2pt) node[below right] {$2$};
\end{tikzpicture}
```

## Решение

На диаграмме $V(T)$ отрезок 1–2 лежит на прямой, проходящей через начало координат: $V \sim T$, процесс изобарный. Объём уменьшается.

Концентрация $n = \dfrac{N}{V}$: число молекул постоянно, объём уменьшается — концентрация увеличивается (1).

Давление при изобарном процессе не изменяется (3).
