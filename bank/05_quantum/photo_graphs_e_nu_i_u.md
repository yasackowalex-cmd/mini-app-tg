---
id: photo_graphs_e_nu_i_u
exam: ЕГЭ
kim: 17
section: Квантовая физика
theme: ФОТОЭФФЕКТ. ГРАФИКИ И СВОЙСТВА ФОТОЭЛЕМЕНТА
topic: 4.5
level: Б
type: соответствие/выбор
variant: 
answer: "34"
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
А) График А & 1) зависимость энергии фотона от его длины волны \\
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
    \draw[ultra thick, brandPrimary] (0,0) -- (2.8,1.6);
    \node[below left] at (0,0) {0};
    \node[left] at (-0.2,1.8) {\textbf{А)}};
\begin{scope}[shift={(4.8,0)}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (3,2);
    
    % График Б (ВАХ)
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (0,2.3) node[above] {$y$};
    \draw[-{Stealth[scale=0.8]}, thick, black] (0,0) -- (3.3,0) node[right] {$x$};
    \draw[ultra thick, brandPrimary] plot[domain=0:2.8, samples=100] (\x, {1.6/(1 + exp(-3*(\x-1.0)))});
    \draw[dashed, gray] (0,1.6) -- (2.8,1.6);
    \node[below left] at (0,0) {0};
    \node[left] at (-0.2,1.8) {\textbf{Б)}};
\end{scope}
\end{tikzpicture}
```

## Решение

А) Прямая, выходящая из начала координат, — прямая пропорциональность. Так зависит энергия фотона от частоты: $E = h\nu$ (3). Максимальная энергия фотоэлектронов $h\nu - A_\text{вых}$ начинается не с нуля, а с красной границы, а $E = \dfrac{hc}{\lambda}$ — гипербола.

Б) Кривая растёт, а затем выходит на постоянное значение. Так ведёт себя сила фототока при увеличении напряжения: все выбитые электроны доходят до анода, наступает ток насыщения (4).
