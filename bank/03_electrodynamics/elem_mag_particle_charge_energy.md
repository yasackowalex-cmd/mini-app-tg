---
id: elem_mag_particle_charge_energy
exam: ЕГЭ
kim: 23
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: П
type: расчётная (часть 2)
variant: 
answer: "8·10⁻¹⁹"
unit: "Кл"
has_image: false
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Заряженная частица с массой $m = 1{,}6 \cdot 10^{-25}\text{ кг}$ и зарядом $q$ движется по окружности радиусом $R = 0{,}4\text{ м}$ перпендикулярно линиям магнитной индукции однородного магнитного поля с индукцией $B = 0{,}5\text{ Тл}$. Кинетическая энергия частицы $W = 8 \cdot 10^{-14}\text{ Дж}$. Найдите заряд данной частицы, считая его положительным. Релятивистскими эффектами пренебречь.

## Решение

Обозначим $v$ — скорость частицы.

Кинетическая энергия $W = \dfrac{mv^2}{2}$, откуда $v = \sqrt{\dfrac{2W}{m}}$.

Сила Лоренца $F_\text{Л} = qvB$ (скорость перпендикулярна $\vec B$) сообщает частице центростремительное ускорение. По второму закону Ньютона
$qvB = \dfrac{mv^2}{R}$, откуда $q = \dfrac{mv}{BR} = \dfrac{\sqrt{2Wm}}{BR}$.

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

$v = \sqrt{\dfrac{2\cdot 8\cdot 10^{-14}}{1{,}6\cdot 10^{-25}}}\,\text{м/с} = 10^6\,\text{м/с}$,
$q = \dfrac{1{,}6\cdot 10^{-25}\cdot 10^6}{0{,}5\cdot 0{,}4}\,\text{Кл} = 8\cdot 10^{-19}\,\text{Кл}$.

Ответ: $q = 8\cdot 10^{-19}\,\text{Кл}$.
