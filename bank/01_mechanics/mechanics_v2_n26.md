---
id: mechanics_v2_n26
exam: ЕГЭ
kim: 26
section: Механика
theme: МЕХАНИКА (ВЫСОКИЙ УРОВЕНЬ СЛОЖНОСТИ)
topic: 1.4.1
level: Б
type: расчётная (часть 2)
variant: 2
answer: "30,2"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim22,26.tex
---

## Условие

Тонкий однородный стержень $AB$ постоянного сечения массой $2{,}7$~кг шарнирно закреплён в точке $A$ и удерживается горизонтальной нитью $BC$ (см. рисунок), угол наклона стержня к горизонту $\alpha = 45^{\circ}$. Трение в шарнире пренебрежимо мало. Найдите модуль силы $F$, с которой шарнир действует на стержень. Сделайте рисунок, на котором укажите все силы, действующие на стержень. Обоснуйте применимость законов, используемых для решения задачи.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.3, every node/.style={font=\footnotesize}]
    % Вертикальная стена
    \draw[thick] (0,0) -- (0,3.2);
    \foreach \y in {0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0}
        \draw[gray, thin] (0,\y) -- (-0.12,\y+0.12);
        
    % Горизонтальный пол
    \draw[thick] (0,0) -- (3.2,0);
    \foreach \x in {0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0}
        \draw[gray, thin] (\x,0) -- (\x-0.12,-0.12);

    % Координаты
    \coordinate (A) at (1.2,0.4);
    \coordinate (B) at (2.6,1.8);
    \coordinate (C) at (0,1.8);

    % Шарнир А
    \draw[thick] (1.0,0) -- (A) -- (1.4,0);
    \fill[black] (A) circle (1.5pt) node[left=3pt] {$A$};

    % Стержень
    \begin{scope}[shift={(A)}, rotate=45]
        \draw[thick, fill=white] (0,-0.05) rectangle (1.98,0.05);
    \end{scope}
    \fill[black] (B) circle (1.5pt) node[above right] {$B$};

    % Нить BC
    \draw[thick] (C) -- (B);
    \node[above right] at (C) {$C$};

    % Угол альфа
    \draw[dashed, thin] (A) -- (2.2,0.4);
    \draw (1.6,0.4) arc (0:45:0.4);
    \node at (1.8,0.58) {$\alpha$};
\end{tikzpicture}
```

## Решение

TODO
