---
id: elem_coulomb_v26_n25
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: В
type: расчётная (часть 2)
variant: 26
answer: "18"
unit: "°"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

Маленький шарик массой $m = 0{,}9\text{ г}$ с зарядом $q = 10\text{ нКл}$ подвешен на невесомой шёлковой нити между двумя вертикальными параллельными противоположно заряженными пластинами. Вектор напряжённости электрического поля между пластинами направлен горизонтально, а модуль напряжённости равен $E = 3\cdot 10^5\text{ В/м}$. Определите угол $\alpha$ отклонения нити от вертикали. Ответ выразите в градусах.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    % Пластины
    \draw[ultra thick, black] (-0.5,0.5) -- (-0.5,2.5);
    \draw[ultra thick, black] (2.5,0.5) -- (2.5,2.5);
    \node[above] at (-0.5,2.5) {$+$};
    \node[above] at (2.5,2.5) {$-$};
    
    % Подвес и нить
    \draw[thick, black] (1,2.5) -- (1.8,1.1);
    \draw[dashed, gray] (1,2.5) -- (1,0.5);
    
    % Шарик
    \fill[brandPrimary] (1.8,1.1) circle (3pt) node[right=2pt] {$q$};
    
    % Вектор E
    \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (0,1.5) -- (0.8,1.5) node[above] {$\vec{E}$};
    
    % Угол alpha
    \draw (1,2.0) arc (270:300:0.5);
    \node at (1.15,1.8) {$\alpha$};

\end{tikzpicture}
```

## Решение

На шарик действуют сила тяжести $m\vec{g}$ (вниз), сила натяжения нити $\vec{T}$ (вдоль нити) и электрическая сила $\vec{F} = q\vec{E}$ (горизонтально), $F = qE$.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % пластины
  \draw[ultra thick, brandSecondary] (-1.2,-0.4) -- (-1.2,2.6);
  \draw[ultra thick, brandSecondary] (2.4,-0.4) -- (2.4,2.6);
  \node[above] at (-1.2,2.6) {$+$};
  \node[above] at (2.4,2.6) {$-$};
  \draw[-{Stealth[scale=0.7]}, brandPrimary!70] (-1.0,-0.2) -- (-0.3,-0.2) node[right] {$\vec E$};
  % подвес, нить, шарик
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.3,2.4) rectangle (0.3,2.52);
  \draw[thick] (-0.3,2.4) -- (0.3,2.4);
  \coordinate (P) at (0,2.4);
  \coordinate (S) at ($(P)+(-65:2.0)$);
  \draw[dashed, gray] (P) -- (0,0.1);
  \draw[thick] (P) -- (S);
  \draw (0,1.5) arc (270:295:0.9);
  \node at ($(P)+(-78:1.2)$) {$\alpha$};
  \fill[brandAccent] (S) circle (3pt);
  % силы
  \draw[Fvec] (S) -- ($(S)+(115:0.95)$) node[right] {$\vec T$};
  \draw[Fvec] (S) -- ($(S)+(0,-0.95)$) node[left] {$m\vec g$};
  \draw[Fvec] (S) -- ($(S)+(0.6,0)$) node[above] {$q\vec E$};
  % оси
  \draw[-{Stealth[scale=0.7]}] (1.5,1.7) -- (2.05,1.7) node[below] {$x$};
  \draw[-{Stealth[scale=0.7]}] (1.5,1.7) -- (1.5,2.25) node[left] {$y$};
\end{tikzpicture}
```

Шарик в равновесии, по второму закону Ньютона $m\vec{g} + \vec{T} + q\vec{E} = 0$. В проекциях на горизонтальную и вертикальную оси:
$T\sin\alpha = qE$, $T\cos\alpha = mg$.

Отсюда $\operatorname{tg}\alpha = \dfrac{qE}{mg} = \dfrac{10\cdot 10^{-9}\cdot 3\cdot 10^5}{0{,}9\cdot 10^{-3}\cdot 10} = \dfrac{1}{3}$, $\alpha = \operatorname{arctg}\dfrac{1}{3} \approx 18^\circ$.
