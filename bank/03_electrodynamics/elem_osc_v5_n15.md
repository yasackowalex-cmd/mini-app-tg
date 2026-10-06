---
id: elem_osc_v5_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: КОЛЕБАТЕЛЬНЫЙ КОНТУР
topic: 3.2.3
level: Б
type: расчётная
variant: 5
answer: "21"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОЛЕБАНИЯ, КОЛЕБАТЕЛЬНЫЙ_КОНТУР]
source: LC.tex
---

## Условие

Конденсатор идеального колебательного контура длительное время подключён к источнику постоянного напряжения. В момент $t = 0$ переключатель $K$ перевели из положения 1 в положение 2. Графики А и Б отражают изменение с течением времени физических величин, характеризующих свободные электромагнитные колебания, возникшие в контуре после этого ($T$ --- период колебаний).

\begin{center}

\qquad

\end{center}

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут изображать.

\smallskip
\begin{tabular}{p{0.45\textwidth}p{0.5\textwidth}}
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\
А) График А & 1) заряд правой обкладки конденсатора \\
Б) График Б & 2) энергия магнитного поля катушки \\
& 3) энергия электрического поля конденсатора \\
& 4) сила тока в катушке
\end{tabular}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % График А
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.5 - 1.5*cos(\x*180)});
    
    \node[below left] at (0,0) {0};
    \node[below] at (4,0) {$T$};
    \node[below] at (2,0) {$t$};
\end{tikzpicture}
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % График Б
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.5 + 1.5*cos(\x*90)});
    
    \node[below left] at (0,0) {0};
    \node[below] at (4,0) {$T$};
    \node[below] at (2,0) {$t$};
\end{tikzpicture}
```

## Решение

TODO
