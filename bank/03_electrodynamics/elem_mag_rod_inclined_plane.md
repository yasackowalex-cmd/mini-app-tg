---
id: elem_mag_rod_inclined_plane
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: расчётная (часть 2)
variant: 
answer: "2,5"
unit: "А"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА, НАКЛОННАЯ_ПЛОСКОСТЬ]
source: mag.tex
---

## Условие

Горизонтальный проводящий стержень прямоугольного сечения поступательно движется с ускорением $a = 1{,}5\text{ м/с}^2$ вверх по гладкой диэлектрической наклонной плоскости в вертикальном однородном магнитном поле (см. рисунок). Угол наклона плоскости $\alpha = 30^\circ$. Отношение массы стержня к его длине $\frac{m}{L} = 0{,}1\text{ кг/м}$. Модуль индукции магнитного поля $B = 0{,}3\text{ Тл}$. Определите силу тока $I$, протекающего по стержню. Сделайте рисунок с указанием сил, действующих на стержень. Ответ выразите в амперах (А).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, font=\small, line join=round]
    \fill[brandLight] (0.000,0.000)--(2.571,3.289)--(0.579,3.915)--(-1.992,0.626)--cycle;
    \fill[gray!8] (0.000,0.000)--(2.571,1.148)--(2.571,3.289)--cycle;
    \draw[thick] (0.000,0.000)--(-1.992,0.626);
    \draw[thick] (0.000,0.000)--(2.571,1.148);
    \draw[thick] (0.000,0.000)--(2.571,3.289);
    \draw[dashed, gray] (-1.992,0.626)--(0.579,1.774);
    \draw[thick] (-1.992,0.626)--(0.579,3.915);
    \draw[dashed, gray] (2.571,1.148)--(0.579,1.774);
    \draw[thick] (2.571,1.148)--(2.571,3.289);
    \draw[dashed, gray] (0.579,1.774)--(0.579,3.915);
    \draw[thick] (2.571,3.289)--(0.579,3.915);
    \draw[line width=3pt, brandSecondary] (0.921,1.432)--(-0.752,1.957);
    \draw[-{Stealth[scale=0.8]}, thick, brandAccent] (0.122,1.109)--(-0.774,1.390) node[left] {$I$};
    \draw[-{Stealth[scale=0.9]}, thick] (0.495,2.267)--(1.267,3.254) node[above] {$\vec a$};
    \draw (0.514,0.230) -- (0.514,0.268) -- (0.511,0.306) -- (0.508,0.343) -- (0.503,0.379) -- (0.497,0.414) -- (0.489,0.448) -- (0.480,0.480) -- (0.470,0.511) -- (0.458,0.541) -- (0.445,0.570);
    \node at (0.686,0.553) {$\alpha$};
    \draw[-{Stealth[scale=0.9]}, thick, brandPrimary] (-2.69,0.00)--(-2.69,4.32);
    \draw[-{Stealth[scale=0.9]}, thick, brandPrimary] (3.27,0.00)--(3.27,4.32);
    \node[right, brandPrimary] at (3.27,4.12) {$\vec B$};
\end{tikzpicture}
```

## Решение

На стержень действуют: сила тяжести $m\vec g$ (вертикально вниз), сила нормальной реакции $\vec N$ (перпендикулярно плоскости) и сила Ампера $\vec F_\text{A}$. Трения нет (плоскость гладкая). Так как стержень горизонтален, а $\vec B$ вертикален, сила Ампера горизонтальна и перпендикулярна стержню; чтобы стержень ускорялся вверх по плоскости, она должна быть направлена горизонтально в сторону плоскости. Её модуль $F_\text{A} = IBL$ (ток перпендикулярен $\vec B$). Силы показаны на рисунке (стержень перпендикулярен плоскости рисунка, ток направлен от нас).

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % наклонная плоскость (угол 30°)
  \draw[thick, fill=gray!8] (0,0) -- (4.5,0) -- (4.5,2.598) -- cycle;
  \draw (0.8,0) arc (0:30:0.8);
  \node at (1.05,0.25) {$\alpha$};
  % линии индукции
  \foreach \x in {0.3,5.2} \draw[-{Stealth[scale=0.8]}, brandPrimary] (\x,0.4) -- (\x,2.6);
  \node[above, brandPrimary] at (5.2,2.6) {$\vec B$};
  % стержень (сечение), ток от нас
  \begin{scope}[rotate=30]
    \draw[thick, fill=brandAccent!20] (2.4,0) rectangle (3.0,0.4);
    \coordinate (C) at (2.7,0.2);
    \draw[Fvec] (C) -- ++(0,1.0) coordinate (Ntip);
    \draw[vvec] (3.3,0.7) -- (4.1,0.7) coordinate (atip);
    \draw[-{Stealth[scale=0.8]}, thin] (0.8,0.35) -- (1.8,0.35) coordinate (xtip);
    \coordinate (Ilab) at (2.4,0.3);
  \end{scope}
  \draw[thick, fill=white] (C) circle (0.1);
  \draw (C) ++(-0.07,-0.07) -- ++(0.14,0.14) (C) ++(-0.07,0.07) -- ++(0.14,-0.14);
  
  \node[above] at (Ntip) {$\vec N$};
  \node[above left, inner sep=1pt] at (atip) {$\vec a$};
  \node[above, inner sep=2pt] at (xtip) {$x$};
  \node[left, inner sep=2pt] at (Ilab) {$I$};
  \draw[Fvec] (C) -- ++(0,-1.0) node[below] {$m\vec g$};
  \draw[Fvec] (C) -- ++(1.1,0) node[right] {$\vec F_\text{A}$};
\end{tikzpicture}
```

Ось $Ox$ направим вдоль наклонной плоскости вверх. Угол между горизонтальной силой Ампера и плоскостью равен $\alpha$. По второму закону Ньютона в проекции на $Ox$:
$IBL\cos\alpha - mg\sin\alpha = ma$.

Отсюда
$I = \dfrac{m(a + g\sin\alpha)}{BL\cos\alpha} = \dfrac{m}{L}\cdot\dfrac{a + g\sin\alpha}{B\cos\alpha}$.

$I = 0{,}1\cdot\dfrac{1{,}5 + 10\cdot 0{,}5}{0{,}3\cdot 0{,}866}\,\text{А} \approx 2{,}5\,\text{А}$.

Ответ: $I \approx 2{,}5\,\text{А}$.
