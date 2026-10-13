---
id: friction_v12_n26
exam: ЕГЭ
kim: 26
section: Механика
theme: СИЛА ТРЕНИЯ (ДИНАМИКА СВЯЗАННЫХ ТЕЛ)
topic: 1.2.4
level: Б
type: расчётная (часть 2)
variant: 12
answer: "0,05"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: трение.tex
---

## Условие

Если в установке первоначально покоящуюся тележку толкнуть влево, то она движется с ускорением $2$~м/с$^{2}$. Если же тележку толкнуть вправо, то она движется равномерно. Найдите массу $m$ грузика на нити, если масса тележки $M=450$~г. Массами блока и нити пренебречь. Нить нерастяжима. Модуль силы сопротивления движению тележки считать постоянным и одинаковым в обоих случаях, трением в оси блока пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    % Стол
    \draw[thick, fill=gray!5] (-2.5,0) rectangle (3.0,0.15);
    % Тележка M
    \draw[thick, fill=brandPrimary!10] (-0.8,0.22) rectangle (-0.2,0.42);
    \node[above] at (-0.5,0.42) {$M$};
    \draw[thick, fill=black!50] (-0.65,0.185) circle (0.04);
    \draw[thick, fill=black!50] (-0.35,0.185) circle (0.04);
    % Блок
    \draw[thick, fill=gray!40] (3.0,0.15) circle (0.12);
    \fill[black] (3.0,0.15) circle (1pt);
    \draw[thick] (2.9,0.05) -- (3.0,0.15);
    % Груз m
    \draw[thick, fill=brandAccent!20] (2.85,-0.9) rectangle (3.15,-0.83);
    \node[right] at (3.2,-0.86) {$m$};
    % Нити
    \draw[thick] (-0.2,0.32) -- (3.0,0.27);
    \draw[thick] (3.12,0.15) -- (3.12,-0.83);
\end{tikzpicture}
```

## Решение

\textbf{Обоснование.} Систему отсчёта, связанную с Землёй (столом), считаем инерциальной. Тележка и грузик движутся поступательно, считаем их материальными точками и применяем второй закон Ньютона. Нить нерастяжима, поэтому модули ускорений тележки и грузика одинаковы. Нить и блок невесомы, трения в оси блока нет, поэтому сила натяжения нити одинакова на обоих её участках. Сила сопротивления постоянна, поэтому ускорение постоянно.

\textbf{Решение.} Обозначим $F_\text{с}$ — модуль силы сопротивления, $T_1$, $T_2$ — силы натяжения нити в первом и втором случаях, $a$ — модуль ускорения в первом случае. Блок справа, поэтому нить тянет тележку вправо.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  \foreach \dy/\cap/\case in {0/{движение вправо}/1, -3.5/{движение влево}/2} {
  \begin{scope}[yshift=\dy cm]
    \node[anchor=west, font=\footnotesize, brandSecondary] at (-1.2,1.35) {\cap};
    % стол и блок
    \fill[pattern=north east lines, pattern color=brandSecondary!40] (-1.2,-0.15) rectangle (2.6,0);
    \draw[thick, brandSecondary] (-1.2,0) -- (2.6,0) -- (2.6,-0.5);
    \draw[thick] (2.6,0) -- (2.75,0.25);
    \draw[thick, fill=gray!15] (2.75,0.25) circle (0.15);
    \fill (2.75,0.25) circle (1pt);
    % тележка
    \draw[thick, fill=brandPrimary!10] (0.3,0.12) rectangle (1.3,0.55);
    \node at (0.8,0.33) {$M$};
    \draw[thick, fill=gray!50] (0.5,0.06) circle (0.06);
    \draw[thick, fill=gray!50] (1.1,0.06) circle (0.06);
    % нить и грузик
    \draw[thick] (1.3,0.4) -- (2.75,0.4);
    \draw[thick] (2.9,0.25) -- (2.9,-0.9);
    \draw[thick, fill=brandAccent!20] (2.7,-1.3) rectangle (3.1,-0.9);
    \node at (2.9,-1.1) {$m$};
    \draw[Fvec] (2.9,-1.3) -- (2.9,-1.95) node[right] {$m\vec g$};
  \end{scope}}
  % случай 1: вправо, равномерно
  \draw[Fvec] (1.3,0.4) -- (2.05,0.4) node[above, xshift=-2pt] {$\vec T_2$};
  \draw[Fvec] (0.3,0.33) -- (-0.45,0.33) node[above, xshift=2pt] {$\vec F_\text{с}$};
  \draw[vvec] (0.5,0.85) -- (1.1,0.85) node[right] {$\vec v$};
  \draw[Fvec] (2.9,-0.9) -- (2.9,-0.35) node[right, yshift=-2pt] {$\vec T_2$};
  \draw[vvec] (3.6,-0.7) -- (3.6,-1.3) node[right] {$\vec v$};
  % случай 2: влево, торможение
  \begin{scope}[yshift=-3.5cm]
  \draw[Fvec] (1.3,0.4) -- (2.05,0.4) node[above, xshift=-2pt] {$\vec T_1$};
  \draw[Fvec] (1.3,0.2) -- (1.95,0.2) node[below, xshift=-2pt, yshift=-1pt] {$\vec F_\text{с}$};
  \draw[vvec] (1.1,0.85) -- (0.5,0.85) node[left] {$\vec v$};
  \draw[vvec] (0.5,1.2) -- (1.1,1.2) node[right] {$\vec a$};
  \draw[Fvec] (2.9,-0.9) -- (2.9,-0.35) node[right, yshift=-2pt] {$\vec T_1$};
  \draw[vvec] (3.6,-1.3) -- (3.6,-0.7) node[right] {$\vec v$};
  \draw[vvec] (4.15,-0.7) -- (4.15,-1.3) node[right] {$\vec a$};
  \end{scope}
\end{tikzpicture}
```

Тележку толкнули вправо, она движется равномерно: для тележки $T_2 - F_\text{с} = 0$, для грузика $mg - T_2 = 0$. Значит, $F_\text{с} = mg$.

Тележку толкнули влево: она движется влево, грузик поднимается. Сила натяжения и сила сопротивления действуют на тележку вправо, ускорение системы направлено вправо (тележка тормозит). По второму закону Ньютона:
тележка: $T_1 + F_\text{с} = Ma$;
грузик (ускорение направлено вниз): $mg - T_1 = ma$.

Складывая: $mg + F_\text{с} = (M + m)a$, с учётом $F_\text{с} = mg$: $2mg = (M + m)a$.

Отсюда $m(2g - a) = Ma$, $m = \dfrac{Ma}{2g - a} = \dfrac{0{,}45\cdot 2}{2\cdot 10 - 2}\,\text{кг} = 0{,}05\,\text{кг}$.

Ответ: $m = 0{,}05\,\text{кг}$.
