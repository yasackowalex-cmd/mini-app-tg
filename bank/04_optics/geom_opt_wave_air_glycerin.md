---
id: geom_opt_wave_air_glycerin
exam: ЕГЭ
kim: 15
section: Оптика
theme: 
topic: 4.1
level: Б
type: соответствие/выбор
variant: 
answer: "32"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА, ПРЕЛОМЛЕНИЕ, ВОЛНЫ]
source: opt.tex
---

## Условие

Плоская световая волна переходит из воздуха в глицерин (см. рисунок). Что происходит при этом переходе с частотой электромагнитных колебаний в световой волне и скоростью их распространения?

Для каждой величины определите соответствующий характер изменения:
1) увеличивается
2) уменьшается
3) не изменяется

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (4,3);
    
    % Граница раздела
    \fill[gray!30] (0,0) rectangle (4,1.5);
    \draw[thick, black] (0,1.5) -- (4,1.5);
    
    % Нормаль
    \draw[dashed, black, thick] (2,0) -- (2,3);
    
    % Падающий луч
    \draw[-{Stealth[scale=0.8]}, thick, black] (0.8,2.7) -- (1.4,2.1);
    \draw[thick, black] (1.4,2.1) -- (2.0,1.5);
    \draw (2.0,2.1) arc (90:124:0.6);
    \node[above left] at (1.8,2.0) {$\alpha$};
    
    % Преломлённый луч
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.0,1.5) -- (2.35,0.75);
    \draw[thick, black] (2.35,0.75) -- (2.7,0);
    \draw (2.0,1.0) arc (-90:-63:0.5);
    \node[below right] at (1.9,1.1) {$\beta$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
