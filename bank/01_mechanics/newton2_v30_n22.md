---
id: newton2_v30_n22
exam: ЕГЭ
kim: 22
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА И СВЯЗАННЫЕ ТЕЛА)
topic: 1.2.2
level: П
type: расчётная (часть 2)
variant: 30
answer: "2,5"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: din.tex
---

## Условие

Два груза, связанных нерастяжимой и невесомой нитью, движутся по гладкой горизонтальной поверхности под действием горизонтальной силы $\vec{F}$, приложенной к грузу массой $M_1 = 2$~кг. Максимальная сила $F$, при которой нить ещё не обрывается, равна $18$~Н. Известно, что нить может выдержать нагрузку не более $10$~Н. Чему равна масса $M_2$ второго груза?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    % Поверхность стола (чистый fill=gray!5)
    \draw[thick, fill=gray!5] (-2.2,0) -- (3.2,0) -- (3.2,-0.1) -- (-2.2,-0.1) -- cycle;
    
    % Левый груз m_2 (он же M_2 в тексте)
    \draw[thick, fill=brandAccent!20] (-1.3,0) rectangle (-0.3,0.5);
    \node at (-0.8,0.25) {$m_2$};
    
    % Правый груз m_1 (он же M_1 в тексте)
    \draw[thick, fill=brandPrimary!10] (0.8,0) rectangle (1.8,0.5);
    \node at (1.3,0.25) {$m_1$};
    
    % Нить между грузами
    \draw[thick] (-0.3,0.25) -- (0.8,0.25);
    
    % Сила F, приложенная к первому грузу
    \draw[-{Stealth[scale=0.8]}, ultra thick, brandPrimary] (1.8,0.25) -- (2.8,0.25) node[above] {$\vec{F}$};
\end{tikzpicture}
```

## Решение

Обозначим $\vec a_1$ и $\vec a_2$ — ускорения первого и второго грузов, $\vec T_1$ и $\vec T_2$ — силы натяжения нити, действующие на первый и второй грузы. Поверхность гладкая, вертикальные силы скомпенсированы. Горизонтальные силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % поверхность
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.3,-0.15) rectangle (5.2,0);
  \draw[thick, brandSecondary] (-0.3,0) -- (5.2,0);
  % грузы и нить
  \draw[thick, fill=brandAccent!20] (0,0) rectangle (1,0.6);
  \node at (0.5,0.3) {$M_2$};
  \draw[thick, fill=brandPrimary!10] (2.9,0) rectangle (3.9,0.6);
  \node at (3.4,0.3) {$M_1$};
  \draw[thick] (1,0.3) -- (2.9,0.3);
  % силы
  \draw[Fvec] (1,0.3) -- (1.6,0.3) node[above] {$\vec T_2$};
  \draw[Fvec] (2.9,0.3) -- (2.3,0.3) node[above] {$\vec T_1$};
  \draw[Fvec] (3.9,0.3) -- (5.0,0.3) node[above] {$\vec F$};
  % ускорения
  \draw[vvec] (0.1,1.0) -- (0.9,1.0) node[right] {$\vec a_2$};
  \draw[vvec] (3.0,1.0) -- (3.8,1.0) node[right] {$\vec a_1$};
  % ось
  \draw[-{Stealth[scale=0.8]}, thin] (0,-0.45) -- (0.8,-0.45) node[right] {$x$};
\end{tikzpicture}
```

Нить нерастяжима, поэтому ускорения грузов равны по модулю: $a_1 = a_2 = a$. Нить невесома, поэтому силы натяжения, действующие на грузы, равны по модулю: $T_1 = T_2 = T$. При максимальной силе $F = 18\,\text{Н}$ натяжение нити $T = 10\,\text{Н}$.

По второму закону Ньютона в проекции на ось $Ox$, направленную вдоль силы $\vec{F}$:
для второго груза $T = M_2a$;
для первого груза $F - T = M_1a$.

Из второго уравнения $a = \dfrac{F - T}{M_1}$, тогда $T = \dfrac{M_2(F - T)}{M_1}$.

Отсюда $M_2 = \dfrac{TM_1}{F - T} = \dfrac{10\cdot 2}{18 - 10} = 2{,}5\,\text{кг}$.

Ответ: $M_2 = 2{,}5\,\text{кг}$.
