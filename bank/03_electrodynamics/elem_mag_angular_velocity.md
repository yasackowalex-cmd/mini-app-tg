---
id: elem_mag_angular_velocity
exam: ЕГЭ
kim: 23
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: П
type: расчётная (часть 2)
variant: 
answer: "2,5·10⁸"
unit: "рад/с"
has_image: false
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Положительно заряженная частица массой $m = 1{,}6 \cdot 10^{-27}\text{ кг}$ и зарядом $q = 8 \cdot 10^{-19}\text{ Кл}$ движется по окружности перпендикулярно линиям индукции однородного магнитного поля. Модуль магнитной индукции $B = 0{,}5\text{ Тл}$. Найдите угловую скорость обращения частицы. Релятивистскими эффектами пренебречь.

## Решение

Обозначим $v$ — скорость частицы, $r$ — радиус окружности, $\omega$ — угловая скорость.

На частицу действует сила Лоренца $F_\text{Л} = qvB$ (скорость перпендикулярна $\vec B$), она сообщает частице центростремительное ускорение. По второму закону Ньютона
$qvB = \dfrac{mv^2}{r}$, откуда $\dfrac{v}{r} = \dfrac{qB}{m}$.

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
  \draw[dashed] (0,0) -- (135:1.3) node[pos=0.55, above right, inner sep=1pt] {$r$};
  % частица
  \fill[brandAccent] (1.3,0) circle (2.5pt);
  \node[right] at (1.33,-0.2) {$+q$};
  \draw[vvec] (1.3,0) -- (1.3,1.0) node[right] {$\vec v$};
  \draw[Fvec] (1.3,0) -- (0.45,0) node[above, xshift=4pt] {$\vec F_\text{Л}$};
\end{tikzpicture}
```

Угловая скорость $\omega = \dfrac{v}{r} = \dfrac{qB}{m}$.

$\omega = \dfrac{8\cdot 10^{-19}\cdot 0{,}5}{1{,}6\cdot 10^{-27}}\,\text{рад/с} = 2{,}5\cdot 10^{8}\,\text{рад/с}$.
