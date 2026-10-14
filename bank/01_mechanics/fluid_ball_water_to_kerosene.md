---
id: fluid_ball_water_to_kerosene
exam: ЕГЭ
kim: 6
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: соответствие/выбор
variant: 
answer: "13"
unit: ""
has_image: false
author_task: false
tags: []
source: pres.tex
---

## Условие

Деревянный шарик плавает в воде. Как изменятся глубина погружения шарика и масса вытесненной шариком жидкости, если он будет плавать в керосине?

Для каждой величины определите соответствующий характер изменения:
\begin{enumerate}
    \item увеличится
    \item уменьшится
    \item не изменится
\end{enumerate}

Запишите в таблицу выбранные цифры для каждой физической величины. Цифры в ответе могут повторяться.

\begin{center}
\begin{tabular}{|c|c|}
\hline
Глубина погружения шарика & Масса вытесненной жидкости \\ \hline
& \\ \hline
\end{tabular}
\end{center}

## Решение

Шарик плавает и в воде, и в керосине, значит, в обоих случаях сила Архимеда равна силе тяжести: $\rho_\text{ж} g V_\text{погр} = mg$. Отсюда масса вытесненной жидкости $\rho_\text{ж} V_\text{погр} = m$ равна массе шарика и не меняется (3). Силы показаны на рисунке.

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

Плотность керосина меньше плотности воды, поэтому, чтобы вытеснить ту же массу жидкости, шарик должен погрузиться на больший объём. Глубина погружения увеличится (1).
