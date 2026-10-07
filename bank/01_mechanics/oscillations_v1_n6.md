---
id: oscillations_v1_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5.2
level: Б
type: соответствие/выбор
variant: 1
answer: "41"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: osc.tex
---

## Условие

Груз, привязанный к длинной нерастяжимой нити, отклонили от положения равновесия на малый угол и в момент времени $t = 0$ отпустили с нулевой начальной скоростью (см. рисунок). На графиках А и Б показано изменение физических величин, характеризующих движение груза после этого. $T$ — период колебаний. Сопротивлением воздуха пренебречь. Потенциальная энергия груза отсчитывается от положения равновесия.

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут представлять.

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
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    % Потолок
    \draw[thick] (-0.8,2) -- (0.8,2);
    \foreach \x in {-0.7,-0.5,-0.3,-0.1,0.1,0.3,0.5,0.7}
        \draw (\x,2) -- (\x+0.1,2.15);
    % Равновесие
    \draw[dashed, gray] (0,2) -- (0,0);
    \node[below] at (0,-0.4) {$0$};
    % Нить и груз
    \draw[thick] (0,2) -- (-0.8,0.4);
    \draw[thick, fill=gray!40] (-0.95,0.1) rectangle (-0.65,0.6);
    % Ось Ox
    \draw[-{Stealth[scale=0.8]}, thick] (-1.3,-0.4) -- (1.5,-0.4) node[right] {$x$};
\end{tikzpicture}
\begin{tikzpicture}[scale=0.5, every node/.style={font=\tiny}]
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.5,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,2) node[above] {А)};
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.2*cos(\x*180/2)});
    \node[below] at (4,0) {$T$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
\begin{tikzpicture}[scale=0.5, every node/.style={font=\tiny}]
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.5,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,1.5) node[above] {Б)};
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.2*sin(\x*180/2)});
    \node[below] at (4,0) {$T$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
