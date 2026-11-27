---
id: fipi_DC8C1F
exam: ЕГЭ
kim: 3
section: Механика
theme: ИМПУЛЬС ТЕЛА. ЗАКОН СОХРАНЕНИЯ ИМПУЛЬСА
topic: 1.3.1
level: Б
type: расчётная
answer: "10"
unit: "кг·м/с"
has_image: true
author_task: false
tags: [МЕХАНИКА, ЗАКОНЫ_СОХРАНЕНИЯ, ИМПУЛЬС]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание DC8C1F)
---

## Условие

Два тела движутся по взаимно перпендикулярным пересекающимся прямым, как показано на рисунке. Модуль импульса первого тела $p_1 = 8$~кг·м/с, второго тела $p_2 = 6$~кг·м/с. Каков модуль импульса системы этих тел после их абсолютно неупругого удара?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
  \draw[-{Stealth[scale=0.8]}, thick] (-0.8,0) -- (2.2,0) node[below] {$x$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,-0.8) -- (0,2.2) node[left] {$y$};
  \draw[thick, fill=white] (0,1.6) circle (0.15);
  \draw[-{Stealth[scale=0.9]}, very thick] (0,1.45) -- (0,0.65) node[midway, left] {$\vec p_1$};
  \draw[thick, fill=white] (1.5,0) circle (0.15);
  \draw[-{Stealth[scale=0.9]}, very thick] (1.35,0) -- (0.55,0) node[midway, below] {$\vec p_2$};
\end{tikzpicture}
```

## Подсказка

Импульс системы сохраняется и равен векторной сумме $\vec p_1 + \vec p_2$. Векторы перпендикулярны — используйте теорему Пифагора.

## Решение

Внешние силы при ударе не меняют импульс системы, поэтому импульс после удара равен векторной сумме импульсов тел до удара:

```latex
\begin{tikzpicture}[scale=0.3, every node/.style={font=\small}]
  \draw[-{Stealth[scale=0.9]}, very thick] (0,0) -- (0,-8) node[midway, left] {$\vec p_1$};
  \draw[-{Stealth[scale=0.9]}, very thick] (0,-8) -- (-6,-8) node[midway, below] {$\vec p_2$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0,0) -- (-6,-8) node[midway, above left] {$\vec p$};
\end{tikzpicture}
```

Векторы $\vec p_1$ и $\vec p_2$ перпендикулярны, по теореме Пифагора
$$p = \sqrt{p_1^2 + p_2^2} = \sqrt{8^2 + 6^2} = 10~\text{кг}\cdot\text{м/с}.$$
