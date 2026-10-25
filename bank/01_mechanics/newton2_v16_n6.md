---
id: newton2_v16_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: соответствие/выбор
variant: 16
answer: "34"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

На рисунке показан график зависимости координаты $x$ тела, движущегося вдоль оси $Ox$, от времени $t$ (парабола). Графики А и Б представляют собой зависимости физических величин, характеризующих движение этого тела, от времени $t$.

[[рис 1]]

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут представлять.

\begin{center}
\begin{tabular}{|c|l|}
\hline
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\ \hline
[[рис 2]] &
1) проекция на ось $Ox$ скорости тела
2) проекция перемещения на ось $Ox$ тела
3) кинетическая энергия тела
4) модуль равнодействующей сил, действующих на тело \\ \hline
\end{tabular}
\end{center}

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
    \draw[ultra thick, brandPrimary, domain=0:3, samples=60] plot (\x, {1.5 - 1.2*\x + 0.4*\x*\x});
    \draw[dashed] (1.5,0) -- (1.5,0.6);
    \node[below] at (1.5,0) {$t_1$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

```latex
\begin{tikzpicture}[scale=0.65, every node/.style={font=\footnotesize}]
  \begin{scope}[xshift=0cm]
    \node at (1.5,2.35) {А)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-0.3) -- (0,1.8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary, domain=0:3, samples=100] plot (\x, {0.6*(\x-1.5)*(\x-1.5)});
    \node[below] at (1.5,0) {$t_1$};
    \node[below left] at (0,0) {0};
  \end{scope}
  \begin{scope}[shift={(0,-3.6)}]
    \node at (1.5,2.35) {Б)};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,-0.3) -- (0,1.8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (3.5,0) node[right] {$t$};
    \draw[ultra thick, brandPrimary] (0,1.0) -- (3,1.0);
    \node[below left] at (0,0) {0};
  \end{scope}
\end{tikzpicture}
```

## Решение

Координата меняется по параболе, значит, тело движется равноускоренно: $a_x = \text{const}$, а $v_x$ — линейная функция времени.

А) Парабола, которая убывает до минимума и затем растёт. Так меняется кинетическая энергия $E_\text{к} = \dfrac{mv_x^2}{2}$: она квадратично зависит от скорости, наименьшая в момент остановки и затем снова растёт (3). Проекция скорости изображалась бы прямой, а проекция перемещения в начальный момент равна нулю, график А же начинается не из нуля.

Б) Горизонтальная прямая — величина не меняется. При равноускоренном движении постоянна равнодействующая сила $F = ma$, значит, это её модуль (4).
