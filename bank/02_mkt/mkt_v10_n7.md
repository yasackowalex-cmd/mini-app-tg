---
id: mkt_v10_n7
exam: ЕГЭ
kim: 7
section: МКТ и термодинамика
theme: ОСНОВНОЕ УРАВНЕНИЕ МКТ. АБСОЛЮТНАЯ ТЕМПЕРАТУРА. КИНЕТИЧЕСКАЯ ЭНЕРГИЯ
topic: 2.1
level: Б
type: расчётная
variant: 10
answer: "2"
unit: "раз"
has_image: true
author_task: false
tags: [МКТ]
source: mkt.tex
---

## Условие

В сосуде под поршнем находится некоторое постоянное количество идеального газа. Во сколько раз уменьшится температура газа, если он перейдёт из состояния 1 в состояние 2 (см. рисунок)?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
  \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,4);
  \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.6,0) node[right] {$V$};
  \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.6) node[above] {$p$};
  \draw[very thick, brandPrimary, postaction={decorate}, decoration={markings, mark=at position 0.5 with {\arrow{Stealth[scale=0.9]}}}] (4,2) -- (1,4);
  \fill (4,2) circle (1.2pt) node[above right] {1};
  \fill (1,4) circle (1.2pt) node[above right] {2};
  \node[left] at (0,2) {$4p_0$};
  \node[left] at (0,4) {$8p_0$};
  \node[below] at (2,0) {$2V_0$};
  \node[below] at (4,0) {$4V_0$};
  \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

Для постоянного количества газа $\dfrac{pV}{T} = \text{const}$, поэтому температура пропорциональна произведению $pV$.

По графику в состоянии 1: $p_1 = 4p_0$, $V_1 = 4V_0$; в состоянии 2: $p_2 = 8p_0$, $V_2 = V_0$.

$$\frac{T_1}{T_2} = \frac{p_1V_1}{p_2V_2} = \frac{4p_0 \cdot 4V_0}{8p_0 \cdot V_0} = 2.$$

Температура уменьшится в $2$ раза.
