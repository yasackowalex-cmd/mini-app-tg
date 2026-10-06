---
id: fluid_iron_ball_hg
exam: ЕГЭ
kim: 22
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная (часть 2)
variant: 
answer: "0,5"
has_image: true
author_task: false
tags: []
source: pres.tex
---

## Условие

В стакан налита ртуть, а поверх неё — вода. Однородный железный шар плавает, погружённый в обе жидкости. Какая часть объёма шара находится в ртути?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[>=Stealth, scale=1.2]
    % --- Штриховка жидкости в сосуде ---
    % Уровень жидкости на высоте 1.8 см, ширина сосуда 2.0 см (от -1 до 1)
    \fill[pattern=dots, pattern color=brandSecondary!60] (-1.0,0) rectangle (1.0,1.8);

    % --- Стенки сосуда и дно ---
    \draw[thick, color=brandSecondary] (-1.0,3.5) -- (-1.0,0) -- (1.0,0) -- (1.0,3.5);

    % --- Поршень сверху ---
    \draw[very thick, color=brandSecondary] (-1.0,2.9) -- (1.0,2.9);

    % --- Плавающий шар ---
    % Центр шара в точке (0, 2.1), радиус R = 0.6 см
    % Заливаем весь шар белым цветом, чтобы полностью перекрыть узор воды внутри него
    \fill[color=white] (0, 2.1) circle (0.6);
    
    % Отрисовка контура шара поверх скрытого уровня воды
    \draw[thick, color=brandSecondary] (0, 2.1) circle (0.6);

    % --- Линии поверхности жидкости (только снаружи шара) ---
    \draw[thick, color=brandSecondary] (-1.0,1.8) -- (-0.565,1.8); 
    \draw[thick, color=brandSecondary] (0.565,1.8) -- (1.0,1.8);
\end{tikzpicture}
```

## Решение

TODO
