---
id: elem_mag_v25_n23
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: В
type: расчётная (часть 2)
variant: 25
answer: "0,2"
unit: "Тл"
has_image: false
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Заряженная частица с зарядом $q = 3{,}2\cdot 10^{-19}\text{ Кл}$ и массой $m = 6{,}4\cdot 10^{-27}\text{ кг}$ движется в однородном магнитном поле по окружности радиусом $R = 10\text{ см}$ со скоростью $v = 10^6\text{ м/с}$. Найдите модуль индукции $B$ магнитного поля. Ответ выразите в теслах (Тл).

## Решение

Частица движется по окружности, значит, её скорость перпендикулярна $\vec B$ и сила Лоренца $F_\text{Л} = qvB$ сообщает ей центростремительное ускорение. По второму закону Ньютона
$qvB = \dfrac{mv^2}{R}$, откуда $B = \dfrac{mv}{qR}$.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % поле «от нас»
  \foreach \x/\y in {-1.9/1.3,-1.9/-1.3,1.9/1.3,1.9/-1.3,-0.6/-0.75}{
    \draw[brandPrimary,thin] (\x,\y) circle (0.1);
    \draw[brandPrimary,thin] (\x-0.07,\y-0.07) -- (\x+0.07,\y+0.07);
    \draw[brandPrimary,thin] (\x-0.07,\y+0.07) -- (\x+0.07,\y-0.07);}
  \node[brandPrimary] at (2.25,1.3) {$\vec B$};
  % траектория
  \draw[thick, gray] (0,0) circle (1.3);
  \draw[-{Stealth[scale=0.7]}, gray] (60:1.3) arc (60:85:1.3);
  \fill (0,0) circle (1.2pt);
  \draw[dashed] (0,0) -- (135:1.3) node[pos=0.55, above right, inner sep=1pt] {$R$};
  % частица
  \fill[brandAccent] (1.3,0) circle (2.5pt);
  \node[right] at (1.33,-0.2) {$+q$};
  \draw[vvec] (1.3,0) -- (1.3,1.0) node[right] {$\vec v$};
  \draw[Fvec] (1.3,0) -- (0.45,0) node[above, xshift=4pt] {$\vec F_\text{Л}$};
\end{tikzpicture}
```

$B = \dfrac{6{,}4\cdot 10^{-27}\cdot 10^6}{3{,}2\cdot 10^{-19}\cdot 0{,}1}\,\text{Тл} = 0{,}2\,\text{Тл}$.

Ответ: $B = 0{,}2\,\text{Тл}$.
