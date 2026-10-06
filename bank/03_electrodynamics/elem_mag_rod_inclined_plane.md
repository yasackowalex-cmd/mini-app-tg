---
id: elem_mag_rod_inclined_plane
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: расчётная (часть 2)
variant: 
answer: "2,5"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА, НАКЛОННАЯ_ПЛОСКОСТЬ]
source: mag.tex
---

## Условие

Горизонтальный проводящий стержень прямоугольного сечения поступательно движется с ускорением $a = 1{,}5\text{ м/с}^2$ вверх по гладкой диэлектрической наклонной плоскости в вертикальном однородном магнитном поле (см. рисунок). Угол наклона плоскости $\alpha = 30^\circ$. Отношение массы стержня к его длине $\frac{m}{L} = 0{,}1\text{ кг/м}$. Модуль индукции магнитного поля $B = 0{,}3\text{ Тл}$. Определите силу тока $I$, протекающего по стержню. Сделайте рисунок с указанием сил, действующих на стержень. Ответ выразите в амперах (А).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,3);
    
    % Наклонная плоскость
    \draw[thick, black] (0.5,0.5) -- (4.5,2.5) -- (4.5,0.5) -- cycle;
    \draw (1.2,0.5) arc (0:26.56:0.7) node[pos=0.6, right] {$\alpha$};
    
    % Вектор индукции B (вертикально вверх)
    \draw[-{Stealth[scale=0.8]}, thick, black] (1.0,0.8) -- (1.0,2.6) node[above] {$\vec{B}$};
    
    % Стержень на плоскости
    \draw[thick, black, fill=white, rotate around={26.56:(2.2,1.35)}] (1.7,1.2) rectangle (2.7,1.5);
    
    % Ток I (стрелка на стержне)
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.4,1.6) -- (1.8,1.3) node[above=2pt] {$I$};
    
    % Ускорение a (параллельно плоскости)
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.8,1.9) -- (3.6,2.3) node[above left] {$\vec{a}$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
