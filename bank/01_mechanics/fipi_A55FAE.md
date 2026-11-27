---
id: fipi_A55FAE
exam: ЕГЭ
kim: 4
section: Механика
theme: МОМЕНТ СИЛЫ. СТАТИКА
topic: 1.4.1
level: Б
type: расчётная
answer: "0,75"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА, СТАТИКА, МОМЕНТ_СИЛЫ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание A55FAE)
---

## Условие

Мальчик взвесил рыбу на самодельных весах из лёгкой удочки (см. рисунок). В качестве гири он использовал батон хлеба массой $1$~кг. Определите массу рыбы.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.55, every node/.style={font=\small}]
  \fill[brandSecondary!45] (4,2.2) rectangle (6,2.6); \draw (5,2.2) -- (5,0.4);
  \foreach \i in {0,...,9} \draw[thick, fill=white] (\i,0) rectangle (\i+1,0.4);
  \fill (5,0.4) circle (2pt);
  \draw (1,0) -- (1,-0.5); \draw[thick, fill=white] (1,-1.9) ellipse (0.45 and 1.4); \fill (1,-0.95) circle (1.5pt); \draw[thick, fill=brandSecondary!45] (1,-3.2) -- (1-0.5,-3.8) -- (1+0.5,-3.8) -- cycle; \node[left] at (1-0.5,-1.9) {рыба};
  \draw (8,0) -- (8,-0.5); \draw[thick, fill=brandSecondary!15, rounded corners=8pt] (8-0.5,-0.5) rectangle (8+0.5,-3.2); \foreach \y in {-1.1,-1.7,-2.3} \draw[thick] (8-0.25,\y-0.2) -- (8+0.25,\y+0.2); \node[right] at (8+0.5,-1.85) {1 кг};
\end{tikzpicture}
```

## Подсказка

Правило моментов: рычаг в равновесии, если $F_1l_1 = F_2l_2$.

## Решение

Плечо силы тяжести рыбы — $4$ деления, батона — $3$ деления. По правилу моментов
$$m_\text{р}g\cdot 4 = m_\text{б}g\cdot 3 \quad\Rightarrow\quad m_\text{р} = \frac{1\cdot 3}{4} = 0{,}75~\text{кг}.$$
