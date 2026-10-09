---
id: atomic_levels_max_freq_min_energy
exam: ЕГЭ
kim: 17
section: Квантовая физика
theme: СОСТАВ ЯДРА. ЯДЕРНЫЕ РЕАКЦИИ. КВАНТОВЫЕ ПЕРЕХОДЫ
topic: 4.6
level: Б
type: соответствие/выбор
variant: 
answer: "14"
unit: ""
has_image: true
author_task: false
tags: [КВАНТОВАЯ_ФИЗИКА, АТОМНАЯ_ФИЗИКА, УРОВНИ_ЭНЕРГИИ]
source: nuc.tex
---

## Условие

На рисунке изображена упрощённая диаграмма нижних энергетических уровней атома. Стрелками отмечены некоторые возможные переходы атома между этими уровнями.

Установите соответствие между процессами излучения света наибольшей частоты и излучения света с наименьшей энергией и энергией соответствующего фотона. К каждой позиции первого столбца подберите соответствующую позицию из второго столбца и запишите в таблицу выбранные цифры под соответствующими буквами.

\smallskip
\begin{tabular}{p{0.55\textwidth}p{0.4\textwidth}}
\textbf{ПРОЦЕСС} & \textbf{ЭНЕРГИЯ ФОТОНА} \\
А) излучение света наибольшей частоты & 1) $E_4 - E_0$ \\
Б) излучение света с наименьшей энергией & 2) $E_3 - E_0$ \\
& 3) $E_2 - E_0$ \\
& 4) $E_1 - E_0$
\end{tabular}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.9, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    \draw[thick, black] (0,0.5) node[left] {$E_0$} -- (3.5,0.5);
    \draw[thick, black] (0,1.2) node[left] {$E_1$} -- (3.5,1.2);
    \draw[thick, black] (0,1.8) node[left] {$E_2$} -- (3.5,1.8);
    \draw[thick, black] (0,2.2) node[left] {$E_3$} -- (3.5,2.2);
    \draw[thick, black] (0,2.5) node[left] {$E_4$} -- (3.5,2.5);
    \draw[dashed, black] (0,2.8) node[left] {$0$} -- (3.5,2.8);
    
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.0,1.2) -- (1.0,0.5);
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.8,2.5) -- (1.8,0.5);
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.6,0.5) -- (2.6,1.8);
    \draw[-{Stealth[scale=0.8]}, thick, black] (3.2,0.5) -- (3.2,2.2);
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
