---
id: power_inclined_force_n3
exam: ЕГЭ
kim: 3
section: Механика
theme: РАБОТА И МОЩНОСТЬ СИЛЫ
topic: 1.3.2
level: Б
type: расчётная
variant: 
answer: "2"
unit: "Вт"
has_image: true
author_task: false
tags: [МЕХАНИКА, РАБОТА_И_МОЩНОСТЬ]
source: work.tex
---

## Условие

\textbf{Задача X.} Брусок массой $5$~кг равномерно перемещают по горизонтальной поверхности со скоростью $1$~м/с, прикладывая к нему постоянную силу $4$~Н, направленную под углом $60^{\circ}$ к горизонту. Чему равна мощность силы $F$?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    % Поверхность стола (пол)
    \draw[thick] (-1.0,0) -- (2.5,0);
    \foreach \x in {-1.0,-0.8,-0.6,-0.4,-0.2,0,0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4}
        \draw[thin] (\x,0) -- (\x-0.1,-0.1);

    % Брусок
    \draw[thick, fill=brandPrimary!20] (0,0) rectangle (1.2,0.6);
    
    % Линия горизонта для угла
    \draw[thick] (1.2,0.2) -- (2.2,0.2);
    
    % Вектор силы F (под углом 60 градусов)
    \draw[-{Stealth[scale=0.8]}, ultra thick, brandAccent] (1.2,0.2) -- ({1.2 + 1.0*cos(60)}, {0.2 + 1.0*sin(60)}) node[left=2pt] {$\vec{F}$};
    
    % Обозначение угла 60 градусов
    \draw (1.5,0.2) arc (0:60:0.3);
    \node at (1.8,0.4) {$60^{\circ}$};
\end{tikzpicture}
```

## Решение

TODO
