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

TODO
