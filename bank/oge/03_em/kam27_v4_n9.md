---
id: kam27_v4_n9
exam: ОГЭ
kim: 9
section: Электромагнитные явления
theme: СОЕДИНЕНИЯ ПРОВОДНИКОВ. ЗАКОН ДЖОУЛЯ—ЛЕНЦА
topic: 3.1.3
level: Б
type: расчётная
variant: 4
answer: "8"
unit: "Ом"
has_image: true
author_task: false
tags: [ЭЛЕКТРОМАГНИТНЫЕ_ЯВЛЕНИЯ, СОЕДИНЕНИЯ]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 4)
---

## Условие

Участок $AB$ электрической цепи содержит 7 одинаковых резисторов сопротивлением $6$~Ом каждый (см. рисунок).

[[рис 1]]

Чему равно общее электрическое сопротивление участка?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1]
  \draw[thick] (0,0) circle (2pt) node[above left, font=\small] {$A$};
  \draw[thick] (0.07,0) -- (0.4,0);
  \draw[thick] (0.4,0.4) -- (0.4,-0.4); \draw[thick] (1.8,0.4) -- (1.8,-0.4);
  \draw[thick] (0.4,0.4) -- (1.8,0.4); \draw[thick] (0.4,-0.4) -- (1.8,-0.4);
  \draw[thick, fill=white] (0.80,0.29) rectangle (1.40,0.51);\draw[thick, fill=white] (0.80,-0.51) rectangle (1.40,-0.29);
  \draw[thick] (1.8,0) -- (2.3,0);
  \draw[thick] (2.3,0.7) -- (2.3,-0.7); \draw[thick] (3.7,0.7) -- (3.7,-0.7);
  \foreach \y in {0.7,0,-0.7} \draw[thick] (2.3,\y) -- (3.7,\y);
  \draw[thick, fill=white] (2.70,0.59) rectangle (3.30,0.81);\draw[thick, fill=white] (2.70,-0.11) rectangle (3.30,0.11);\draw[thick, fill=white] (2.70,-0.81) rectangle (3.30,-0.59);
  \draw[thick] (3.7,0) -- (4.2,0);
  \draw[thick] (4.2,0.4) -- (4.2,-0.4); \draw[thick] (5.6,0.4) -- (5.6,-0.4);
  \draw[thick] (4.2,0.4) -- (5.6,0.4); \draw[thick] (4.2,-0.4) -- (5.6,-0.4);
  \draw[thick, fill=white] (4.60,0.29) rectangle (5.20,0.51);\draw[thick, fill=white] (4.60,-0.51) rectangle (5.20,-0.29);
  \draw[thick] (5.6,0) -- (5.93,0);
  \draw[thick] (6.0,0) circle (2pt) node[above right, font=\small] {$B$};
  \fill (0.4,0) circle (1.5pt);\fill (1.8,0) circle (1.5pt);\fill (2.3,0) circle (1.5pt);\fill (3.7,0) circle (1.5pt);\fill (4.2,0) circle (1.5pt);\fill (5.6,0) circle (1.5pt);
\end{tikzpicture}
```

## Подсказка

Сначала найдите сопротивление каждой группы параллельных резисторов, затем сложите.

## Решение

Участок состоит из трёх последовательно соединённых групп одинаковых параллельных резисторов. У $n$ одинаковых параллельных резисторов сопротивление в $n$ раз меньше.

1. Две параллельные: $\dfrac{6}{2} = 3$~Ом. 2. Три параллельные: $\dfrac{6}{3} = 2$~Ом. 3. Две параллельные: $3$~Ом.

Группы соединены последовательно:
$$R = 3 + 2 + 3 = 8~\text{Ом}.$$
