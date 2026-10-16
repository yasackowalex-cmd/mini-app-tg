---
id: elem_mag_v27_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: соответствие/выбор
variant: 27
answer: "13"
unit: ""
has_image: false
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Положительно заряженный ион движется по окружности в однородном магнитном поле. Как изменятся модуль центростремительного ускорения иона и период его обращения, если увеличить скорость движения иона?

Для каждой величины определите соответствующий характер изменения:
1) увеличится
2) уменьшится
3) не изменится

Запишите в таблицу выбранные цифры для каждой физической величины. Цифры в ответе могут повторяться.
\begin{center}
\begin{tabular}{|c|c|}
\hline
Модуль центростремительного ускорения & Период обращения \\ \hline
 & \\ \hline
\end{tabular}
\end{center}

## Решение

В магнитном поле на ион действует сила Лоренца: $qvB = \dfrac{mv^2}{R}$, откуда радиус $R = \dfrac{mv}{qB}$.

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
  \draw[vvec] (1.05,-0.25) -- (0.45,-0.25) node[below] {$\vec a$};
\end{tikzpicture}
```

Центростремительное ускорение $a = \dfrac{v^2}{R} = \dfrac{qvB}{m}$ пропорционально скорости — увеличится (1).

Период обращения $T = \dfrac{2\pi R}{v} = \dfrac{2\pi m}{qB}$ от скорости не зависит — не изменится (3).
