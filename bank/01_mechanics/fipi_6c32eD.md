---
id: fipi_6c32eD
exam: ЕГЭ
kim: 3
section: Механика
theme: Задание №3 (Законы сохранения в механике)
topic: 1.3.2
level: Б
type: расчётная
answer: "10"
unit: "Н"
has_image: false
author_task: false
tags: [МЕХАНИКА, ЗАКОНЫ_СОХРАНЕНИЯ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 6c32eD)
---

## Условие

При равномерном прямолинейном перемещении саней по горизонтальному участку пути на $50$~м постоянная горизонтально направленная сила тяги совершает работу $500$~Дж. Какова сила трения?

## Рисунок (TikZ)



## Подсказка

При равномерном движении сила трения равна силе тяги, а работа силы тяги $A = Fs$.

## Решение

1. Силы, действующие на сани:

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\small}]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-0.6,-0.15) rectangle (3.8,0);
  \draw[thick] (-0.6,0) -- (3.8,0);
  \draw[thick, fill=white] (0.8,0) rectangle (2.2,0.6);
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (2.2,0.3) -- (3.4,0.3) node[above] {$\vec F_\text{тяги}$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.8,0.1) -- (-0.3,0.1) node[above right] {$\vec F_\text{тр}$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (1.5,0.6) -- (1.5,1.3) node[right] {$\vec N$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (1.5,0.3) -- (1.5,-0.5) node[right] {$m\vec g$};
\end{tikzpicture}
```

2. Сани движутся равномерно и прямолинейно, поэтому сила трения уравновешивает силу тяги: $F_\text{тр} = F_\text{тяги}$.

3. Работа силы тяги $A = F_\text{тяги}s$, откуда
$$F_\text{тр} = F_\text{тяги} = \frac As = \frac{500}{50} = 10~\text{Н}.$$
