---
id: elem_mag_v16_n25
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: расчётная (часть 2)
variant: 16
answer: "0,5"
unit: "Н"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА]
source: mag.tex
---

## Условие

Из никелиновой проволоки с удельным сопротивлением $\rho = 42\cdot 10^{-8}\text{ Ом}\cdot\text{м}$ и площадью поперечного сечения $S = 0{,}2\text{ мм}^2$ изготовлен прямоугольный контур $KLMN$ с диагональю $KM$. Стороны прямоугольника $KL = l_1 = 20\text{ см}$ и $LM = l_2 = 15\text{ см}$. Контур подключён за диагональ $KM$ к источнику постоянного напряжения с ЭДС $\mathcal{E} = 3\text{ В}$ и помещён в однородное магнитное поле, вектор магнитной индукции которого параллелен сторонам $KL$ и $NM$ и равен по модулю $0{,}5\text{ Тл}$. Чему равен модуль результирующей сил, с которыми магнитное поле действует на контур? Внутренним сопротивлением источника пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,3);
    
    % Силовые линии поля (влево)
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (4.5,0.3) -- (0.5,0.3);
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (4.5,1.5) -- (0.5,1.5) node[above left] {$\vec{B}$};
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (4.5,2.7) -- (0.5,2.7);
    
    % Прямоугольный контур
    \draw[ultra thick, black] (1,0.8) coordinate (K) -- (4,0.8) coordinate (L) -- (4,2.2) coordinate (M) -- (1,2.2) coordinate (N) -- cycle;
    \draw[ultra thick, black] (K) -- (M);
    
    % Подключение к источнику за KM
    \draw[thick, black] (K) -- (1,0.1) -- (2.2,0.1);
    \draw[thick, black] (M) -- (4.5,2.2) -- (4.5,0.1) -- (2.8,0.1);
    
    % Источник
    \fill[white] (2.2,0.0) rectangle (2.8,0.2);
    \draw[thick, black] (2.2,0.1) -- (2.4,0.1);
    \draw[thick, black] (2.4,-0.1) -- (2.4,0.3);
    \draw[ultra thick, black] (2.6,0.0) -- (2.6,0.2);
    \draw[thick, black] (2.6,0.1) -- (2.8,0.1);
    \node[below=2pt] at (2.5,-0.1) {$\mathcal{E}$};
    
    % Подписи вершин
    \node[below left] at (K) {$K$};
    \node[below right] at (L) {$L$};
    \node[above right] at (M) {$M$};
    \node[above left] at (N) {$N$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
