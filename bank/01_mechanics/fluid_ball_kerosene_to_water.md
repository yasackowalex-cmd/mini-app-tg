---
id: fluid_ball_kerosene_to_water
exam: ЕГЭ
kim: 6
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: соответствие/выбор
variant: 
answer: "33"
unit: ""
has_image: false
author_task: false
tags: []
source: pres.tex
---

## Условие

Деревянный шарик плавает в керосине. Как изменятся сила тяжести и сила Архимеда, действующие на шарик, если он будет плавать в воде?

Для каждой величины определите соответствующий характер изменения:
\begin{enumerate}
    \item увеличивается
    \item уменьшится
    \item не изменится
\end{enumerate}

Запишите в таблицу выбранные цифры для каждой физической величины. Цифры в ответе могут повторяться.

\begin{center}
\begin{tabular}{|c|c|}
\hline
Сила тяжести & Сила Архимеда \\ \hline
& \\ \hline
\end{tabular}
\end{center}

## Решение

Силы, действующие на плавающий шарик, показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % керосин
  \begin{scope}[shift={(0,0)}]
  \fill[brandPrimary!12] (-1.3,0) rectangle (1.3,2.0);
  \draw[brandPrimary!70] (-1.3,2.0) -- (1.3,2.0);
  \draw[very thick, brandSecondary] (-1.3,3.3) -- (-1.3,0) -- (1.3,0) -- (1.3,3.3);
  \node[below, brandSecondary] at (0,0) {керосин};
  \draw[thick, fill=brandAccent!15] (0,1.78) circle (0.55);
  \fill (0,1.78) circle (1.2pt);
  \draw[Fvec] (-0.13,1.78) -- (-0.13,0.78) node[below] {$m\vec g$};
  \draw[Fvec] (0.13,1.78) -- (0.13,2.78) node[above] {$\vec F_\text{А}$};
  \end{scope}
  % вода
  \begin{scope}[shift={(3.4,0)}]
  \fill[brandPrimary!12] (-1.3,0) rectangle (1.3,2.0);
  \draw[brandPrimary!70] (-1.3,2.0) -- (1.3,2.0);
  \draw[very thick, brandSecondary] (-1.3,3.3) -- (-1.3,0) -- (1.3,0) -- (1.3,3.3);
  \node[below, brandSecondary] at (0,0) {вода};
  \draw[thick, fill=brandAccent!15] (0,2.00) circle (0.55);
  \fill (0,2.00) circle (1.2pt);
  \draw[Fvec] (-0.13,2.00) -- (-0.13,1.00) node[below] {$m\vec g$};
  \draw[Fvec] (0.13,2.00) -- (0.13,3.00) node[above] {$\vec F_\text{А}$};
  \end{scope}
\end{tikzpicture}
```

Сила тяжести $mg$ зависит только от массы шарика, она не меняется (3).

Шарик плавает и в керосине, и в воде, значит, в обоих случаях сила Архимеда уравновешивает силу тяжести: $F_\text{А} = mg$. Она тоже не меняется (3). В воде шарик просто меньше погружён, потому что плотность воды больше.
