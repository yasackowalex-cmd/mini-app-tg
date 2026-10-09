---
id: elem_mag_frame_magnet_rotation
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: качественная
variant: 
answer: "Рамка повернётся вокруг оси MO и притянется к южному полюсу S магнита"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА, КАЧЕСТВЕННАЯ_ЗАДАЧА]
source: mag.tex
---

## Условие

Небольшую рамку с постоянным током удерживают неподвижно в поле полосового магнита (см. рисунок). Полярность подключения источника тока к выводам рамки показана на рисунке. Опишите движение рамки относительно неподвижной оси $MO$ после того, как рамку отпустят. Ответ поясните, указав, какие физические закономерности Вы использовали для объяснения. Считать, что рамка испытывает небольшое сопротивление движению со стороны воздуха. ЭДС индукции, возникающей в рамке, и колебаниями рамки пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,3);
    
    % Полосовой магнит
    \draw[thick, black, fill=gray!80] (0.5,1.2) rectangle (1.5,2.0) node[pos=.5, white] {\textbf{N}};
    \draw[thick, black, fill=white] (1.5,1.2) rectangle (2.5,2.0) node[pos=.5] {\textbf{S}};
    
    % Ось MO
    \draw[dashed, black, thick] (2.8,2.7) -- (5.5,0.3);
    \node[above left] at (2.8,2.7) {$M$};
    \node[below right] at (5.5,0.3) {$O$};
    
    % Рамка (перспективный параллелограмм)
    \draw[ultra thick, black] (3.2,2.3) -- (4.8,2.3) -- (5.2,1.3) -- (3.6,1.3) -- cycle;
    
    % Выводы к источнику
    \draw[thick, black] (4.8,1.3) -- (5.0,0.8) node[right] {$+$};
    \draw[thick, black] (4.4,1.3) -- (4.6,0.8) node[left] {$-$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
