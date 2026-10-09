---
id: elem_pot_v6_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: ПОТЕНЦИАЛ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.2
level: Б
type: соответствие/выбор
variant: 6
answer: "24"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ПОТЕНЦИАЛ]
source: pot.tex
---

## Условие

На рисунке показан график зависимости потенциала $\varphi$ электростатического поля от координаты $x$. Из приведённого ниже списка выберите все верные утверждения относительно характеристик этого поля.

1) На участке от $x = 0$ до $x = 2\text{ см}$ модуль напряжённости поля равен $20\text{ В/м}$.\\
2) На участке от $x = 2\text{ см}$ до $x = 4\text{ см}$ напряжённость электрического поля равна нулю.\\
3) В точке $x = 1\text{ см}$ вектор напряжённости поля направлен вдоль положительного направления оси $Ox$.\\
4) В точке $x = 5\text{ см}$ вектор напряжённости поля направлен в сторону положительного направления оси $Ox$.\\
5) Работа поля при перемещении положительного заряда из точки $x = 2\text{ см}$ в точку $x = 4\text{ см}$ отрицательна.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$x$, см};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$\varphi$, В};
    
    \coordinate (A) at (0,1);
    \coordinate (B) at (2,3);
    \coordinate (C) at (4,3);
    \coordinate (D) at (6,0);
    
    \draw[ultra thick, brandPrimary] (A) -- (B) -- (C) -- (D);
    
    \draw[dashed, gray] (0,1) -- (A);
    \draw[dashed, gray] (0,3) -- (B);
    \draw[dashed, gray] (2,0) -- (B);
    \draw[dashed, gray] (4,0) -- (C);
    \draw[dashed, gray] (6,0) -- (D);
    
    \node[left] at (0,1) {10};
    \node[left] at (0,3) {30};
    \node[below] at (2,0) {2};
    \node[below] at (4,0) {4};
    \node[below] at (6,0) {6};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
