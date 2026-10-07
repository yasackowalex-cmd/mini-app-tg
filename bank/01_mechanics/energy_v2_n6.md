---
id: energy_v2_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: КИНЕТИЧЕСКАЯ И ПОТЕНЦИАЛЬНАЯ ЭНЕРГИЯ. ЗСЭ
topic: 1.3.3
level: Б
type: соответствие/выбор
variant: 2
answer: "42"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: energy.tex
---

## Условие

Груз, привязанный к длинной нерастяжимой нити, отклонили от положения равновесия на малый угол и в момент времени $t=0$ отпустили с нулевой начальной скоростью (см. рисунок). На графиках А и Б показано изменение физических величин, характеризующих движение груза после этого. $T$ — период колебаний. Сопротивлением воздуха пренебречь. Потенциальная энергия груза отсчитывается от положения равновесия.

\begin{center}
\begin{stylebasic}
\begin{tabular}{cc}

\begin{tabular}{l}
Установите соответствие между графиками и физическими\\
величинами, зависимость которых от времени эти графики\\
могут представлять.\\
\end{tabular}
\end{tabular}
\end{stylebasic}
\end{center}

К каждой позиции первого столбца подберите соответствующую позицию из второго столбца и запишите в таблицу выбранные цифры под соответствующими буквами.

\begin{center}
\begin{tabular}{cc}
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\

\begin{tabular}{l}
1) проекция скорости $v_x$ \\
2) координата $x$ \\
3) проекция ускорения $a_x$ \\
4) потенциальная энергия груза $E_{\text{п}}$
\end{tabular} \\
 
\end{tabular}
\end{center}

\begin{center}
\begin{tabular}{|c|c|}
\hline
А & Б \\ \hline
 & \\ \hline
\end{tabular}
\end{center}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.7, every node/.style={font=\footnotesize}]
    \draw[thick] (-0.8,2.5) -- (0.8,2.5);
    \foreach \x in {-0.7,-0.5,-0.3,-0.1,0.1,0.3,0.5,0.7}
        \draw (\x,2.5) -- (\x+0.1,2.7);
    \draw[dashed] (0,2.5) -- (0,0);
    \draw[thick] (0,2.5) -- (-0.8,0.5);
    \draw[thick, fill=gray!40] (-0.8,0.5) rectangle (-0.4,1.1);
    \draw[-{Stealth[scale=0.7]}] (-1.2,-0.2) -- (1.5,-0.2) node[right] {$x$};
    \node[below] at (0,-0.2) {0};
\end{tikzpicture}
\begin{tikzpicture}[scale=0.55, every node/.style={font=\tiny}]
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.5,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,2) node[above] {А};
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.2*cos(\x*180/2)});
    \draw[dashed] (4,0) -- (4,1.2);
    \node[below] at (4,0) {$T$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
\begin{tikzpicture}[scale=0.55, every node/.style={font=\tiny}]
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.5,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,1.5) node[above] {Б};
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {-1.0*cos(\x*180/2)});
    \draw[dashed] (4,0) -- (4,0);
    \node[below] at (4,0) {$T$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
