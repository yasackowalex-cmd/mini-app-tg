---
id: work_inclined_friction_n3
exam: ЕГЭ
kim: 3
section: Механика
theme: РАБОТА И МОЩНОСТЬ СИЛЫ
topic: 1.3.2
level: Б
type: расчётная
variant: 
answer: "8"
unit: "Дж"
has_image: true
author_task: false
tags: [МЕХАНИКА, РАБОТА_СИЛЫ]
source: work.tex
---

## Условие

\textbf{Задача X.} Брусок массой $2$~кг, к которому приложена сила $4$~Н, направленная вертикально вверх, равномерно движется вниз по шероховатой наклонной плоскости с углом при основании $30^{\circ}$. Чему равен модуль работы, которую совершит над бруском сила трения при перемещении бруска на $1$~м?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.3, every node/.style={font=\footnotesize}]
    % Наклонная плоскость
    \draw[thick, fill=gray!5] (0,0) -- (4.0,0) -- (4.0,2.31) -- cycle; % 4*tan(30) = 2.31
    
    % Угол наклонной плоскости
    \draw (0.5,0) arc (0:30:0.5);
    \node at (0.8,0.22) {$30^{\circ}$};

    % Брусок на склоне (повернутый)
    \begin{scope}[shift={(1.5,0.866)}, rotate=30]
        \draw[thick, fill=brandPrimary!20] (0,0) rectangle (1.2,0.6);
        % Точка приложения вертикальной силы в центре бруска
        \coordinate (C) at (0.6,0.3);
    \end{scope}
    
    % Сила F (строго вертикально вверх из центра бруска)
    \draw[-{Stealth[scale=0.8]}, ultra thick, brandAccent] (C) -- ++(0,1.0) node[right] {$\vec{F}$};
\end{tikzpicture}
```

## Решение

Брусок движется равномерно, значит, сумма сил равна нулю. Сила $F$ направлена вертикально вверх и просто уменьшает «вес» бруска: вместо $mg = 20$~Н вниз действует $mg - F = 20 - 4 = 16$~Н. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % наклонная плоскость
  \draw[thick, fill=gray!10] (0,0) -- (3.6,0) -- (3.6,2.08) -- cycle;
  \draw (0.55,0) arc (0:30:0.55);
  \node at (0.82,0.2) {$30^\circ$};
  % брусок
  \begin{scope}[shift={(1.732,1.0)}, rotate=30]
    \draw[thick, fill=brandPrimary!15] (-0.45,0) rectangle (0.45,0.5);
    \coordinate (C) at (0,0.25);
    \coordinate (N0) at (-0.1,0);
    \coordinate (N1) at (-0.1,0.95);
    \coordinate (Ft0) at (0.45,0.04);
    \coordinate (Ft1) at (0.9,0.04);
    \coordinate (v0) at (0.95,-0.42);
    \coordinate (v1) at (0.2,-0.42);
  \end{scope}
  \fill (C) circle (1.2pt);
  % силы
  \draw[Fvec] (C) -- ++(0,-1.1) node[below] {$m\vec g$};
  \draw[Fvec] ($(C)+(0.12,0)$) -- ++(0,0.5) node[right, inner sep=2pt] {$\vec F$};
  \draw[Fvec] (N0) -- (N1) node[above left, inner sep=1pt] {$\vec N$};
  \draw[Fvec] (Ft0) -- (Ft1) node[right] {$\vec F_\text{тр}$};
  \draw[vvec] (v0) -- (v1) node[below right, inner sep=1pt] {$\vec v$};
\end{tikzpicture}
```

Вдоль плоскости силу трения уравновешивает составляющая этой силы:

$$F_\text{тр} = (mg - F)\sin 30^\circ = 16 \cdot 0{,}5 = 8~\text{Н}.$$

Модуль работы силы трения: $|A| = F_\text{тр} s = 8 \cdot 1 = 8$~Дж.
