---
id: elem_coulomb_v22_n21
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: ЗАКОН КУЛОНА. НАПРЯЖЕННОСТЬ ЭЛЕКТРИЧЕСКОГО ПОЛЯ
topic: 3.1.1
level: В
type: качественная
variant: 22
answer: "L/3"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КУЛОН, НАПРЯЖЕННОСТЬ]
source: col.tex
---

## Условие

Два положительных точечных заряда $q$ и $4q$ закреплены на расстоянии $L$ друг от друга. Где на отрезке, соединяющем эти заряды, следует поместить третий точечный заряд $-q_0$, чтобы он находился в равновесии? Укажите расстояние от заряда $q$ до заряда $-q_0$. Ответ обоснуйте, указав используемые физические закономерности.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    \draw[-{Stealth[scale=0.8]}, black, thick] (-0.5,0) -- (4.5,0) node[right] {$x$};
    
    \coordinate (Q1) at (0,0);
    \coordinate (Q2) at (3,0);
    
    \fill[black] (Q1) circle (2pt) node[above] {$+q$};
    \fill[black] (Q2) circle (2pt) node[above] {$+4q$};
    
    \node[below] at (0,0) {$0$};
    \node[below] at (3,0) {$L$};
\end{tikzpicture}
```

## Решение

1. На заряд $-q_0$ действуют силы притяжения со стороны зарядов $q$ и $4q$ (разноимённые заряды притягиваются). Если заряд $-q_0$ находится на отрезке между ними, эти силы направлены вдоль одной прямой в противоположные стороны, поэтому равновесие возможно только на этом отрезке.

Силы показаны на рисунке ($\vec F_1$ — со стороны заряда $q$, $\vec F_2$ — со стороны заряда $4q$).

```latex
\begin{tikzpicture}[scale=1.1, font=\small]
  \draw[gray] (-0.4,0) -- (3.4,0);
  \fill[brandSecondary] (0,0) circle (2.2pt) node[above=2pt] {$+q$};
  \fill[brandSecondary] (3,0) circle (2.2pt) node[above=2pt] {$+4q$};
  \fill[brandAccent] (1,0) circle (2.2pt) node[above=3pt] {$-q_0$};
  \draw[Fvec] (1,0) -- (0.3,0) node[below, xshift=4pt] {$\vec F_1$};
  \draw[Fvec] (1,0) -- (1.7,0) node[below, xshift=-4pt] {$\vec F_2$};
  \draw[<->, gray] (0,-0.6) -- (1,-0.6) node[midway, below, black] {$x$};
  \draw[<->, gray] (1,-0.6) -- (3,-0.6) node[midway, below, black] {$L - x$};
\end{tikzpicture}
```

2. Условие равновесия: равнодействующая сил равна нулю, т.е. модули сил равны. Обозначим $x$ — расстояние от заряда $q$ до заряда $-q_0$. По закону Кулона $k\dfrac{q\,q_0}{x^2} = k\dfrac{4q\,q_0}{(L - x)^2}$.

3. Отсюда $(L - x)^2 = 4x^2$, $L - x = 2x$, $x = \dfrac{L}{3}$. Результат не зависит от величины $q_0$.

Ответ: заряд $-q_0$ надо поместить на отрезке на расстоянии $\dfrac{L}{3}$ от заряда $q$.
