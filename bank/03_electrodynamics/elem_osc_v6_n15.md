---
id: elem_osc_v6_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: КОЛЕБАТЕЛЬНЫЙ КОНТУР
topic: 3.2.3
level: Б
type: соответствие/выбор
variant: 6
answer: "43"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОЛЕБАНИЯ, КОЛЕБАТЕЛЬНЫЙ_КОНТУР]
source: LC.tex
---

## Условие

Конденсатор идеального колебательного контура длительное время подключён к источнику постоянного напряжения. В момент $t = 0$ переключатель $K$ перевели из положения 1 в положение 2. Графики А и Б отражают изменение с течением времени физических величин, характеризующих свободные электромагнитные колебания, возникшие в контуре после этого ($T$ --- период колебаний).

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут изображать.

\smallskip
\begin{tabular}{p{0.45\textwidth}p{0.5\textwidth}}
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\
А) График А & 1) заряд левой обкладки конденсатора \\
Б) График Б & 2) модуль напряжения на конденсаторе \\
& 3) энергия электрического поля конденсатора \\
& 4) сила тока в катушке
\end{tabular}


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
\begin{tikzpicture}[x=2.2cm, y=0.8cm, every node/.style={font=\footnotesize}]
  \begin{scope}
    \node at (-0.3,1.3) {А)};
    \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (1.35,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.8]}, thick] (0,-1.3) -- (0,1.5);
    \node[below left] at (0,0) {$0$};
    \node[below] at (1,0) {$T$};
    \draw[ultra thick, brandPrimary, domain=0:1.2, samples=80, smooth] plot (\x, {sin(360*\x)});
  \end{scope}
  \begin{scope}[yshift=-3.4cm]
    \node at (-0.3,1.3) {Б)};
    \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (1.35,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.8]}, thick] (0,-1.3) -- (0,1.5);
    \node[below left] at (0,0) {$0$};
    \node[below] at (1,0) {$T$};
    \draw[dashed] (1,0) -- (1,1);
    \draw[ultra thick, brandPrimary, domain=0:1, samples=80, smooth] plot (\x, {cos(360*\x)^2});
  \end{scope}
\end{tikzpicture}
```

## Решение

В момент $t = 0$ конденсатор полностью заряжен, а ток в катушке равен нулю.

График А начинается с нуля и меняет знак с периодом $T$ — так меняется сила тока в катушке: $i = -I_0\sin\dfrac{2\pi t}{T}$ (4).

График Б начинается с максимума, не бывает отрицательным и меняется с периодом $\dfrac{T}{2}$ — это энергия электрического поля конденсатора $W = \dfrac{q^2}{2C}$, $q = q_0\cos\dfrac{2\pi t}{T}$ (3).

Заряд левой обкладки в момент $t = 0$ максимален по модулю, а модуль напряжения имеет изломы в нулях, поэтому они не подходят.
