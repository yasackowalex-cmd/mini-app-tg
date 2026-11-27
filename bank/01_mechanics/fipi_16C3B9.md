---
id: fipi_16C3B9
exam: ЕГЭ
kim: 4
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная
answer: "800"
unit: "кг/м³"
has_image: true
author_task: false
tags: [МЕХАНИКА, ГИДРОСТАТИКА, СИЛА_АРХИМЕДА]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 16C3B9)
---

## Условие

Груз массой $m = 2{,}0$~кг и объёмом $V = 10^{-3}$~м³, подвешенный на тонкой нити, целиком погружён в жидкость и не касается дна сосуда (см. рисунок). Модуль силы натяжения нити $T = 12$~Н. Найдите плотность жидкости.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-0.4,3.0) rectangle (0.4,3.15); \draw[thick] (-0.4,3.0) -- (0.4,3.0);
  \fill[brandPrimary!12] (-1.2,0) rectangle (1.2,2.0); \draw[brandPrimary] (-1.2,2.0) -- (1.2,2.0);
  \draw[thick] (-1.2,2.5) -- (-1.2,0) -- (1.2,0) -- (1.2,2.5);
  \draw (0,3.0) -- (0,1.2); \draw[thick, fill=white] (-0.3,0.6) rectangle (0.3,1.2);
\end{tikzpicture}
```

## Подсказка

Из условия равновесия груза найдите силу Архимеда, затем плотность жидкости из $F_\text{А} = \rho gV$.

## Решение

1. На груз действуют сила тяжести, сила натяжения нити и сила Архимеда:

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[thick, fill=white] (-0.3,-0.3) rectangle (0.3,0.3); \fill (0,0) circle (1.5pt);
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.12,0) -- (0.12,1.1) node[right] {$\vec T$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (-0.12,0) -- (-0.12,0.75) node[left] {$\vec F_\text{А}$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,0) -- (0,-1.6) node[right] {$m\vec g$};
\end{tikzpicture}
```

2. Груз в равновесии: $T + F_\text{А} = mg$, откуда
$$F_\text{А} = mg - T = 20 - 12 = 8~\text{Н}.$$

3. Сила Архимеда $F_\text{А} = \rho gV$:
$$\rho = \frac{F_\text{А}}{gV} = \frac{8}{10\cdot 10^{-3}} = 800~\text{кг/м}^3.$$
