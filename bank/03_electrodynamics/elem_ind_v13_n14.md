---
id: elem_ind_v13_n14
exam: ЕГЭ
kim: 14
section: Электродинамика
theme: МАГНИТНЫЙ ПОТОК. ЭЛЕКТРОМАГНИТНАЯ ИНДУКЦИЯ. САМОИНДУКЦИЯ
topic: 3.2.2
level: Б
type: соответствие/выбор
variant: 13
answer: "24"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ИНДУКЦИЯ]
source: ind.tex
---

## Условие

Проволочная замкнутая рамка площадью $50\text{ см}^2$ помещена в однородное магнитное поле перпендикулярно вектору магнитной индукции. Проекция $B_n$ индукции магнитного поля на нормаль к плоскости рамки изменяется во времени $t$ согласно графику на рисунке. Из приведённого ниже списка выберите все верные утверждения о процессах, происходящих в рамке.

1) Модуль ЭДС индукции, возникающей в рамке в промежутке времени от $0$ до $2\text{ мс}$, равен $2\text{ В}$.\\
2) Модули магнитных потоков, пронизывающих рамку в моменты времени $0\text{ мс}$ и $2\text{ мс}$, одинаковы и равны $10\text{ мВб}$.\\
3) Модуль силы индукционного тока в рамке максимален в промежутке времени от $0$ до $2\text{ мс}$.\\
4) ЭДС индукции в рамке отлична от $0$ только в промежутке времени от $2$ до $4\text{ мс}$.\\
5) В момент времени $t = 3\text{ мс}$ индукционный ток в рамке меняет направление.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (6,4);
    
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,2) -- (6.5,2) node[right] {$t$, мс};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,4.5) node[above] {$B_n$, Тл};
    
    \draw[ultra thick, brandPrimary] (0,4) -- (2,4) -- (4,1) -- (6,1);
    
    \fill[black] (0,4) circle (1.5pt);
    \fill[black] (2,4) circle (1.5pt);
    \fill[black] (4,1) circle (1.5pt);
    \fill[black] (6,1) circle (1.5pt);
    
    \node[left] at (0,4) {2};
    \node[left] at (0,3) {1};
    \node[left] at (0,2) {0};
    \node[left] at (0,1) {--1};
    \node[left] at (0,0) {--2};
    
    \node[below] at (1,2) {1};
    \node[below] at (2,2) {2};
    \node[below] at (3,2) {3};
    \node[below] at (4,2) {4};
    \node[below] at (5,2) {5};
    \node[below] at (6,2) {6};
    \node[below left] at (0,2) {0};
\end{tikzpicture}
```

## Решение

TODO
