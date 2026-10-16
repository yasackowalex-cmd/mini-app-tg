---
id: newton2_v14_n26
exam: ЕГЭ
kim: 26
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: В
type: расчётная (часть 2)
variant: 14
answer: "0,2"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

На горизонтальном столе находится брусок массой $M=1$~кг, соединённый невесомой нерастяжимой нитью, перекинутой через гладкий невесомый блок, с грузом массой $m=500$~г. На брусок действует сила величиной $F=8$~Н, направленная под углом $\alpha=30^{\circ}$ к горизонту. В момент начала движения груз находится на расстоянии $L=1$~м от края стола. Каков коэффициент трения между бруском и столом, если груз поднимается до края стола за время $t=2$~с? Трением в оси блока и трением о воздух пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, font=\small]
  % стол и блок
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (0,-0.15) rectangle (3.8,0);
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (0,-2.1) rectangle (0.15,0);
  \draw[thick, brandSecondary] (3.8,0) -- (0,0) -- (0,-2.1);
  \draw[thick] (0,0) -- (-0.35,0.05);
  \draw[thick, fill=gray!15] (-0.35,0.05) circle (0.15);
  \fill (-0.35,0.05) circle (1pt);
  % брусок
  \draw[thick, fill=brandPrimary!10] (1.2,0) rectangle (2.2,0.6);
  \node at (1.7,0.3) {$M$};
  % нити и груз
  \draw[thick] (-0.35,0.2) -- (1.2,0.2);
  \draw[thick] (-0.5,0.05) -- (-0.5,-0.95);
  \draw[thick, fill=brandAccent!20] (-0.72,-1.4) rectangle (-0.28,-0.95);
  \node at (-0.5,-1.175) {$m$};
  % сила F
  \draw[Fvec] (2.2,0.3) -- ++(30:1.1) node[above] {$\vec F$};
  \draw[dashed, thin] (2.2,0.3) -- (3.4,0.3);
  \draw (2.65,0.3) arc (0:30:0.45);
  \node at (2.85,0.42) {$\alpha$};
  % расстояние L
  \draw[thin, gray] (-0.6,0) -- (-1.3,0);
  \draw[thin, gray] (-0.76,-0.95) -- (-1.3,-0.95);
  \draw[<->, thin] (-1.2,0) -- (-1.2,-0.95) node[midway, left] {$L$};
\end{tikzpicture}
```

## Решение

\textbf{Обоснование}

1. Задачу будем решать в инерциальной системе отсчёта, связанной с поверхностью стола.

2. Будем использовать второй закон Ньютона для материальных точек, так как брусок и груз движутся поступательно. Трением о воздух пренебрежём. Силы, действующие на тела, постоянны, движение бруска и груза равноускоренное, поэтому применимы формулы кинематики равноускоренного движения.

3. Так как нить нерастяжима, ускорения бруска и груза равны по модулю: $|\vec a_1| = |\vec a_2| = a$ (1)

4. Так как блок и нить невесомы, трения в блоке нет, то силы натяжения нити, действующие на брусок и груз, одинаковы: $T_1 = T_2 = T$ (2)

\textbf{Решение}

1. На рисунке показаны силы, действующие на брусок, и силы, действующие на груз. Брусок движется от блока (вправо), груз поднимается.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % стол и блок
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (0,-0.15) rectangle (3.8,0);
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (0,-2.1) rectangle (0.15,0);
  \draw[thick, brandSecondary] (3.8,0) -- (0,0) -- (0,-2.1);
  \draw[thick] (0,0) -- (-0.25,0.05);
  \draw[thick, fill=gray!15] (-0.25,0.05) circle (0.15);
  \fill (-0.25,0.05) circle (1pt);
  % брусок
  \draw[thick, fill=brandPrimary!10] (1.2,0) rectangle (2.2,0.6);
  \node at (1.42,0.3) {$M$};
  % нити и груз
  \draw[thick] (-0.25,0.2) -- (1.2,0.2);
  \draw[thick] (-0.4,0.05) -- (-0.4,-0.95);
  \draw[thick, fill=brandAccent!20] (-0.62,-1.4) rectangle (-0.18,-0.95);
  \node at (-0.85,-1.17) {$m$};
  % силы на брусок
  \draw[Fvec] (2.2,0.3) -- ++(30:1.1) node[above] {$\vec F$};
  \draw[dashed, thin] (2.2,0.3) -- (3.4,0.3);
  \draw (2.65,0.3) arc (0:30:0.45);
  \node at (2.85,0.42) {$\alpha$};
  \draw[Fvec] (1.2,0.2) -- (0.55,0.2) node[above] {$\vec T_1$};
  \draw[Fvec] (1.6,0) -- (0.95,0) node[below, yshift=-1pt] {$\vec F_\text{тр}$};
  \draw[Fvec] (1.5,0.6) -- (1.5,1.35) node[left] {$\vec N$};
  \draw[Fvec] (1.7,0.3) -- (1.7,-0.7) node[right] {$M\vec g$};
  \fill (1.7,0.3) circle (1pt);
  \draw[vvec] (1.8,1.6) -- (2.5,1.6) node[right] {$\vec a_1$};
  % силы на груз
  \draw[Fvec] (-0.4,-0.95) -- (-0.4,-0.4) node[left] {$\vec T_2$};
  \draw[Fvec] (-0.4,-1.18) -- (-0.4,-1.95) node[left] {$m\vec g$};
  \draw[vvec] (-1.35,-1.6) -- (-1.35,-1.0) node[left] {$\vec a_2$};
  % оси
  \draw[-{Stealth[scale=0.7]}] (2.8,-1.5) -- (3.5,-1.5) node[below] {$x$};
  \draw[-{Stealth[scale=0.7]}] (2.8,-1.5) -- (2.8,-0.85) node[left] {$y$};
  \node[below left, inner sep=1pt, font=\footnotesize] at (2.8,-1.5) {$0$};
\end{tikzpicture}
```

Запишем второй закон Ньютона для бруска в проекциях на оси $Ox$ и $Oy$, для груза — в проекции на ось $Oy$. С учётом (1) и (2) получим:

$Ma = F\cos\alpha - T - F_\text{тр}$,

$0 = N + F\sin\alpha - Mg$,

$ma = T - mg$.

Учитывая, что $F_\text{тр} = \mu N = \mu(Mg - F\sin\alpha)$, и складывая первое и третье уравнения, найдём модуль ускорения каждого тела: $a = \dfrac{F\cos\alpha - mg - \mu(Mg - F\sin\alpha)}{M + m}$.

2. Груз начинает движение из состояния покоя, поэтому $L = \dfrac{at^2}{2}$, откуда $a = \dfrac{2L}{t^2} = \dfrac{2\cdot 1}{2^2}\,\text{м/с}^2 = 0{,}5\,\text{м/с}^2$.

3. Из выражения для ускорения получим: $\mu = \dfrac{F\cos\alpha - mg - (M + m)a}{Mg - F\sin\alpha} = \dfrac{8\cdot 0{,}866 - 0{,}5\cdot 10 - 1{,}5\cdot 0{,}5}{1\cdot 10 - 8\cdot 0{,}5} \approx 0{,}2$.

Ответ: $\mu \approx 0{,}2$.
