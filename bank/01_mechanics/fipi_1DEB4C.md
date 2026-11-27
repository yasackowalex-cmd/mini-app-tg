---
id: fipi_1DEB4C
exam: ЕГЭ
kim: 2
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: расчётная
answer: "1"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, СВЯЗАННЫЕ_ТЕЛА]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 1DEB4C)
---

## Условие

Два груза, связанные нерастяжимой и невесомой нитью, движутся по гладкой горизонтальной поверхности под действием постоянной горизонтальной силы $\vec F$, приложенной к грузу $M_1 = 2$~кг (см. рисунок). Нить обрывается при значении силы натяжения нити $4$~Н, при этом модуль силы $\vec F$ равен $12$~Н. Чему равна масса второго груза $M_2$?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\small}]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (0,-0.15) rectangle (5.2,0);
  \draw[thick] (0,0) -- (5.2,0);
  \draw[thick, fill=white] (0.4,0) rectangle (1.3,0.5); \node at (0.85,0.25) {$M_2$};
  \draw[thick] (1.3,0.2) -- (2.1,0.2);
  \draw[thick, fill=white] (2.1,0) rectangle (3.5,0.5); \node at (2.8,0.25) {$M_1$};
  \draw[-{Stealth[scale=0.9]}, thick] (3.5,0.25) -- (4.6,0.25) node[above] {$\vec F$};
\end{tikzpicture}
```

## Подсказка

Запишите второй закон Ньютона для каждого груза: $M_1a = F - T$, $M_2a = T$. Ускорения грузов одинаковы.

## Решение

1. Силы, действующие на грузы (поверхность гладкая, трения нет):

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\small}]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-0.3,-0.15) rectangle (5.6,0);
  \draw[thick] (-0.3,0) -- (5.6,0);
  \draw[thick, fill=white] (0.4,0) rectangle (1.3,0.5); \node at (0.85,0.25) {$M_2$};
  \draw[thick] (1.3,0.2) -- (2.4,0.2);
  \draw[thick, fill=white] (2.4,0) rectangle (3.8,0.5); \node at (3.1,0.25) {$M_1$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (1.3,0.2) -- (1.85,0.2) node[above] {$\vec T$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (2.4,0.2) -- (1.95,0.2);
  \node[above] at (2.2,0.25) {$\vec T$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (3.8,0.25) -- (4.9,0.25) node[above] {$\vec F$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.85,0.5) -- (0.85,1.1) node[right] {$\vec N_2$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.85,0.25) -- (0.85,-0.45) node[right] {$M_2\vec g$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (3.1,0.5) -- (3.1,1.1) node[right] {$\vec N_1$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (3.1,0.25) -- (3.1,-0.45) node[right] {$M_1\vec g$};
  \draw[-{Stealth[scale=0.9]}, thick] (4.4,0.9) -- (5.2,0.9) node[right] {$\vec a$};
\end{tikzpicture}
```

2. Нить невесома и нерастяжима, поэтому силы натяжения с обеих сторон нити равны $T$, а ускорения грузов одинаковы и равны $a$. По вертикали силы тяжести уравновешены силами реакции опоры.

3. Второй закон Ньютона в проекции на горизонтальную ось для первого груза:
$$M_1a = F - T \quad\Rightarrow\quad a = \frac{F - T}{M_1} = \frac{12 - 4}{2} = 4~\text{м/с}^2.$$

4. Для второго груза:
$$M_2a = T \quad\Rightarrow\quad M_2 = \frac Ta = \frac44 = 1~\text{кг}.$$
