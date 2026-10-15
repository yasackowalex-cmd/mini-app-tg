---
id: elem_osc_v20_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: КОЛЕБАТЕЛЬНЫЙ КОНТУР
topic: 3.2.3
level: Б
type: соответствие/выбор
variant: 20
answer: "41"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОЛЕБАНИЯ, КОЛЕБАТЕЛЬНЫЙ_КОНТУР]
source: LC.tex
---

## Условие

Конденсатор идеального колебательного контура длительное время подключён к источнику постоянного напряжения. В момент $t = 0$ переключатель $K$ перевели из положения 1 в положение 2. Графики А и Б отражают изменение с течением времени физических величин, характеризующих свободные электромагнитные колебания в контуре после этого ($T$ --- период колебаний).

[[рис 1]]

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут изображать.

К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.

\begin{center}
\begin{tabular}{|c|l|}
\hline
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\ \hline
[[рис 2]] &
1) заряд правой обкладки конденсатора
2) сила тока в катушке
3) энергия электрического поля конденсатора
4) энергия магнитного поля катушки \\ \hline
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
\begin{circuitikz}[european, scale=1, every node/.style={font=\footnotesize}]
  % клеммы источника
  \draw (0,3) -- (0.9,3) node[ocirc] {};
  \draw (1.5,3) node[ocirc] {} -- (2.4,3) -- (2.4,2.3) node[ocirc] (one) {};
  \node at (0.9,3.35) {$-$};
  \node at (1.5,3.35) {$+$};
  % конденсатор и ключ
  \draw (0,3) -- (0,0);
  \draw (0,1.6) node[circ] {} to[C, l=$C$] (1.6,1.6) node[ocirc] {};
  \draw[thick, -{Stealth[scale=0.8]}] (1.6,1.6) -- (2.3,2.2);
  \node at (1.75,2.15) {$K$};
  \node[right] at (2.45,2.3) {1};
  \draw (2.4,1.0) node[ocirc] {} -- (2.4,0);
  \node[right] at (2.45,1.0) {2};
  % катушка
  \draw (2.4,0) to[cute inductor, l=$L$] (0,0);
\end{circuitikz}
```

```latex
\begin{tikzpicture}[x=1.9cm, y=0.75cm, every node/.style={font=\footnotesize}]
  \begin{scope}
    \node at (-0.3,1.3) {А)};
    \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (1.35,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.8]}, thick] (0,-0.3) -- (0,1.5);
    \node[below left] at (0,0) {$0$};
    \draw (1,-0.08) -- (1,0.08);
    \node[below right, inner xsep=1pt] at (1,0) {$T$};
    \draw[ultra thick, brandPrimary, domain=0:1.2, samples=80, smooth] plot (\x, {sin(360*\x)^2});
  \end{scope}
  \begin{scope}[yshift=-3.0cm]
    \node at (-0.3,1.3) {Б)};
    \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (1.35,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.8]}, thick] (0,-1.3) -- (0,1.5);
    \node[below left] at (0,0) {$0$};
    \draw (1,-0.08) -- (1,0.08);
    \node[below right, inner xsep=1pt] at (1,0) {$T$};
    \draw[ultra thick, brandPrimary, domain=0:1.2, samples=80, smooth] plot (\x, {cos(360*\x)});
  \end{scope}
\end{tikzpicture}
```

## Решение

В момент $t = 0$ конденсатор полностью заряжен, ток в катушке равен нулю. Правая обкладка была подключена к «$+$» источника, поэтому её заряд положителен.

График А начинается с нуля, не бывает отрицательным и меняется с периодом $\dfrac{T}{2}$ — это энергия магнитного поля катушки $W = \dfrac{Li^2}{2}$, $i \sim \sin\dfrac{2\pi t}{T}$ (4).

График Б начинается с положительного максимума и меняется по закону косинуса с периодом $T$ — это заряд правой обкладки $q = q_0\cos\dfrac{2\pi t}{T}$ (1).
