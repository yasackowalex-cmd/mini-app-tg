---
id: photo_graphs_ek_nu_e_lambda
exam: ЕГЭ
kim: 17
section: Квантовая физика
theme: ФОТОЭФФЕКТ. ГРАФИКИ И СВОЙСТВА ФОТОЭЛЕМЕНТА
topic: 4.5
level: Б
type: соответствие/выбор
variant: 
answer: "21"
unit: ""
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, ФОТОЭФФЕКТ, ГРАФИКИ]
source: fe.tex
---

## Условие

Установите соответствие между графиками, представленными на рисунках, и зависимостями, которые они могут выражать.

К каждой позиции первого столбца подберите соответствующую позицию из второго столбца и запишите в таблицу выбранные цифры под соответствующими буквами.

\begin{center}

\qquad\qquad

\end{center}

\smallskip
\begin{tabular}{p{0.35\textwidth}p{0.6\textwidth}}
\textbf{ГРАФИКИ} & \textbf{ЗАВИСИМОСТИ} \\
А) График А & 1) зависимость энергии фотона от длины волны \\
Б) График Б & 2) зависимость максимальной энергии фотоэлектронов от частоты света \\
& 3) зависимость энергии фотона от частоты света \\
& 4) зависимость силы фототока от напряжения между электродами при неизменной освещённости
\end{tabular}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,2);
    
    % График А
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,2.3) node[above] {$y$};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (3.3,0) node[right] {$x$};
    \draw[ultra thick, brandPrimary] (1.0,0) -- (2.8,1.2);
    \node[below left] at (0,0) {0};
    \node[left] at (-0.2,1.8) {\textbf{А)}};
\begin{scope}[shift={(4.8,0)}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,2);
    
    % График Б
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,2.3) node[above] {$y$};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (3.3,0) node[right] {$x$};
    \draw[ultra thick, brandPrimary] plot[domain=0.4:3.0, samples=100] (\x, {0.8/\x});
    
    \draw[dashed, gray] (0.5,0) -- (0.5,1.6) -- (0,1.6);
    \draw[dashed, gray] (1.0,0) -- (1.0,0.8) -- (0,0.8);
    \draw[dashed, gray] (2.0,0) -- (2.0,0.4) -- (0,0.4);
    
    \node[below left] at (0,0) {0};
    \node[left] at (-0.2,1.8) {\textbf{Б)}};
\end{scope}
\end{tikzpicture}
```

## Решение

График А — прямая, которая начинается не из нуля, а с некоторого значения на горизонтальной оси. Так выглядит зависимость максимальной кинетической энергии фотоэлектронов от частоты: $E_\text{к} = h\nu - A_\text{вых}$, при частоте ниже красной границы фотоэффекта нет (2).

График Б — гипербола: величина обратно пропорциональна аргументу (по пунктирам при увеличении аргумента вдвое значение уменьшается вдвое). Так энергия фотона зависит от длины волны: $E = \dfrac{hc}{\lambda}$ (1).
