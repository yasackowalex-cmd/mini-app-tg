---
id: atomic_levels_max_e_min_lambda
exam: ЕГЭ
kim: 17
section: Квантовая физика
theme: РАДИОАКТИВНЫЙ РАСПАД. КВАНТОВЫЕ ПЕРЕХОДЫ
topic: 4.6
level: Б
type: расчётная
variant: 
answer: "42"
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, АТОМНАЯ_ФИЗИКА, УРОВНИ_ЭНЕРГИИ]
source: nuc.tex
---

## Условие

На рисунке изображена упрощённая диаграмма нижних энергетических уровней атома. Нумерованными стрелками отмечены некоторые возможные переходы атома между этими уровнями. Какой из этих четырёх переходов связан с поглощением кванта света наибольшей энергии, а какой --- с излучением кванта света наименьшей длины волны?

Установите соответствие между процессами поглощения и излучения света и энергетическими переходами атома, указанными стрелками.

\smallskip
\begin{tabular}{p{0.5\textwidth}p{0.45\textwidth}}
\textbf{ПРОЦЕССЫ} & \textbf{ЭНЕРГЕТИЧЕСКИЕ ПЕРЕХОДЫ} \\
А) поглощение кванта света наибольшей энергии & 1) 1 \\
Б) излучение кванта света наименьшей длины волны & 2) 2 \\
& 3) 3 \\
& 4) 4
\end{tabular}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % Уровни
    \draw[thick, black] (0,0.5) node[left] {$E_0$} -- (3.5,0.5);
    \draw[thick, black] (0,1.2) node[left] {$E_1$} -- (3.5,1.2);
    \draw[thick, black] (0,1.8) node[left] {$E_2$} -- (3.5,1.8);
    \draw[thick, black] (0,2.2) node[left] {$E_3$} -- (3.5,2.2);
    \draw[thick, black] (0,2.5) node[left] {$E_4$} -- (3.5,2.5);
    \draw[dashed, black] (0,2.8) node[left] {$0$} -- (3.5,2.8);
    
    % Стрелки
    \draw[-{Stealth[scale=0.8]}, thick, black] (0.8,1.2) -- (0.8,0.5) node[below] {1};
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.6,2.2) -- (1.6,0.5) node[below] {2};
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.4,0.5) -- (2.4,2.2) node[below] {3};
    \draw[-{Stealth[scale=0.8]}, thick, black] (3.2,0.5) -- (3.2,2.5) node[below] {4};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
