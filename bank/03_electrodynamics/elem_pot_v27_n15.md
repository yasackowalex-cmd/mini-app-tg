---
id: elem_pot_v27_n15
exam: ЕГЭ
kim: 15
section: Электродинамика
theme: ПОТЕНЦИАЛ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.2
level: Б
type: соответствие/выбор
variant: 27
answer: "23"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ПОТЕНЦИАЛ]
source: pot.tex
---

## Условие

На рисунке показан график зависимости потенциала $\varphi$ электростатического поля от координаты $x$. Из приведённого ниже списка выберите все верные утверждения относительно характеристик этого поля.

1) На участке от $x = 0$ до $x = 2\text{ см}$ модуль напряжённости поля равен нулю.\\
2) На участке от $x = 2\text{ см}$ до $x = 4\text{ см}$ напряжённость электрического поля равна нулю.\\
3) Проекция напряжённости поля $E_x$ на участке от $x = 0$ до $x = 2\text{ см}$ положительна и равна $10\text{ В/см}$.\\
4) Модуль напряжённости поля в точке $x = 5\text{ см}$ равен $1000\text{ В/м}$.\\
5) Работа поля при перемещении положительного заряда из точки $x = 2\text{ см}$ в точку $x = 4\text{ см}$ положительна.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,4);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (6.5,0) node[right] {$x$, см};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$\varphi$, В};
    
    \coordinate (A) at (0,4);
    \coordinate (B) at (2,2);
    \coordinate (C) at (4,2);
    \coordinate (D) at (6,0);
    
    \draw[ultra thick, brandPrimary] (A) -- (B) -- (C) -- (D);
    
    \draw[dashed, gray] (0,4) -- (A);
    \draw[dashed, gray] (0,2) -- (B);
    \draw[dashed, gray] (2,0) -- (B);
    \draw[dashed, gray] (4,0) -- (C);
    \draw[dashed, gray] (6,0) -- (D);
    
    \node[left] at (0,2) {20};
    \node[left] at (0,4) {40};
    \node[below] at (2,0) {2};
    \node[below] at (4,0) {4};
    \node[below] at (6,0) {6};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
