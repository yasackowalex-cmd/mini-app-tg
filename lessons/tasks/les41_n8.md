---
id: les41_n8
exam: ЕГЭ
kim: 25
section: Оптика
theme: 
topic: 4.1
level: В
type: расчётная (часть 2)
variant: 
answer: "1,41"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА]
source: ДЗ к уроку 4.1
---

## Условие

Верхняя грань $AB$ прозрачного клина посеребрена и представляет собой плоское зеркало. Угол при вершине клина $\alpha=30^\circ$. Луч света падает из воздуха на клин перпендикулярно грани $AC$, преломляется и выходит в воздух через грань $BC$ под углом $\gamma=45^\circ$ к её нормали. Определите показатель преломления материала клина. Сделайте рисунок, поясняющий ход луча в клине.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.72, transform shape, >=Stealth]
  \def\a{5.0}
  \def\b{2.8}
  \coordinate (A) at (0, 0);
  \coordinate (C) at (\a, 0);
  \coordinate (B) at (\a, \b);
  \fill[brandLight] (A) -- (C) -- (B) -- cycle;
  \draw[line width=2.2pt, brandAccent] (A) -- (B);
  \draw[thick, brandSecondary] (A) -- (C) -- (B);
  \draw[thick, brandSecondary] (\a-0.3, 0) -- (\a-0.3, 0.3) -- (\a, 0.3);
  \draw[thick, brandAccent] (0.8, 0) arc (0:29.25:0.8);
  \node[font=\small\bfseries\itshape, brandAccent] at (1, 0.2) {$\alpha$};
  \node[left=2pt, font=\large\bfseries\itshape, brandSecondary] at (A) {$A$};
  \node[above right=1pt, font=\large\bfseries\itshape, brandSecondary] at (B) {$B$};
  \node[below right=1pt, font=\large\bfseries\itshape, brandSecondary] at (C) {$C$};
  \def\xRay{3.5}
  \draw[line width=1.3pt, ->, brandPrimary] (\xRay, -1.0) -- (\xRay, 0);
  \draw[thick, brandSecondary] (\xRay, -0.3) -- (\xRay+0.3, -0.3) -- (\xRay+0.3, 0);
\end{tikzpicture}
```

## Решение

$\alpha=30^\circ$, $\gamma=45^\circ$.

```latex
\begin{tikzpicture}[scale=0.78, transform shape, every node/.style={font=\footnotesize}]
  \fill[brandLight] (0,0) -- (5.0,0) -- (5.0,2.8) -- cycle;
  \draw[line width=2.2pt, brandAccent] (0,0) -- (5.0,2.8);
  \draw[thick, brandSecondary] (0,0) -- (5.0,0) -- (5.0,2.8);
  \draw[thick, brandSecondary] (4.7,0) -- (4.7,0.3) -- (5.0,0.3);
  \draw[thick, brandAccent] (0.8,0) arc (0:29.25:0.8);
  \node[brandAccent] at (0.55,0.16) {$\alpha$};
  \node[left=2pt, brandSecondary] at (0,0) {$A$};
  \node[above right=1pt, brandSecondary] at (5.0,2.8) {$B$};
  \node[below right=1pt, brandSecondary] at (5.0,0) {$C$};
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (3.5,-1.0) -- (3.5,-0.5);
  \draw[thick, brandPrimary] (3.5,-0.5) -- (3.5,0);
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (3.5,0) -- (3.5,1.05);
  \draw[thick, brandPrimary] (3.5,1.05) -- (3.5,1.96);
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (3.5,1.96) -- (4.25,1.50);
  \draw[thick, brandPrimary] (4.25,1.50) -- (5.0,1.039);
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (5.0,1.039) -- (6.1,-0.061);
  \draw[dashed, brandSecondary!55] (3.06,2.746) -- (3.94,1.174);
  \draw[dashed, brandSecondary!55] (5.0,1.039) -- (6.3,1.039);
  \draw[brandAccent, thick] (5.0,1.039) ++(0:0.8) arc (0:-45:0.8);
  \node[brandAccent] at (5.98,0.80) {$\gamma$};
\end{tikzpicture}
```

Луч падает на грань $AC$ перпендикулярно, поэтому входит в клин, не меняя направления, и идёт вертикально вверх. Зеркальная грань $AB$ наклонена к $AC$ под углом $\alpha$, значит перпендикуляр к $AB$ составляет такой же угол с вертикалью, и угол падения луча на зеркало равен $\alpha=30^\circ$.

По закону отражения луч отражается под тем же углом и после отражения повёрнут на $2\alpha=60^\circ$ относительно вертикали, то есть идёт под углом $30^\circ$ к горизонтали. Грань $BC$ вертикальна, перпендикуляр к ней горизонтален, поэтому угол падения на грань $BC$
\[
\varphi=90^\circ-2\alpha=30^\circ.
\]
При выходе в воздух по закону преломления
\[
n\sin\varphi=\sin\gamma\ \Rightarrow\ n=\frac{\sin45^\circ}{\sin30^\circ}=\frac{\sqrt2/2}{1/2}=\sqrt2\approx1{,}41.
\]

Должно получиться: $n=\sqrt2\approx1{,}41$.
