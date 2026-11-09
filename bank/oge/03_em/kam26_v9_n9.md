---
id: kam26_v9_n9
exam: ОГЭ
kim: 9
section: Электромагнитные явления
theme: ЗАКОН ОМА
topic: 3.1.2
level: Б
type: расчётная
variant: 9
answer: "0,25"
unit: "А"
has_image: true
author_task: false
tags: [ЭЛЕКТРОМАГНИТНЫЕ_ЯВЛЕНИЯ, СИЛА_ТОКА, ЗАРЯД]
source: Камзеева, ОГЭ-2026, 30 вариантов (вариант 9)
---

## Условие

По проводнику течёт постоянный электрический ток. На рисунке представлен график зависимости величины заряда $q$, проходящего через поперечное сечение проводника, от времени $t$. Чему равна сила тока в проводнике?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1, every node/.style={font=\small}]
  \draw[brandSecondary!35] (0.00,0) -- (0.00,2.1);
  \draw[brandSecondary!35] (0.50,0) -- (0.50,2.1);
  \draw[brandSecondary!35] (1.00,0) -- (1.00,2.1);
  \draw[brandSecondary!35] (1.50,0) -- (1.50,2.1);
  \draw[brandSecondary!35] (2.00,0) -- (2.00,2.1);
  \draw[brandSecondary!35] (2.50,0) -- (2.50,2.1);
  \draw[brandSecondary!35] (3.00,0) -- (3.00,2.1);
  \draw[brandSecondary!35] (0,0.00) -- (3.0,0.00);
  \draw[brandSecondary!35] (0,0.35) -- (3.0,0.35);
  \draw[brandSecondary!35] (0,0.70) -- (3.0,0.70);
  \draw[brandSecondary!35] (0,1.05) -- (3.0,1.05);
  \draw[brandSecondary!35] (0,1.40) -- (3.0,1.40);
  \draw[brandSecondary!35] (0,1.75) -- (3.0,1.75);
  \draw[brandSecondary!35] (0,2.10) -- (3.0,2.10);
  \draw[thick, -{Stealth}] (0,0) -- (3.5,0) node[below] {$t$, с};
  \draw[thick, -{Stealth}] (0,0) -- (0,2.6) node[left] {$q$, Кл};
  \node[below left] at (0,0) {0};
  \foreach \v in {2,4,6} \node[left] at (0,0.35*\v) {\v};
  \foreach \v in {2,4,...,12} \node[below] at (0.25*\v,0) {\v};
  \draw[very thick, brandPrimary] (0,0) -- (3.0,1.05);
\end{tikzpicture}
```

## Подсказка

Возьмите на графике удобную точку и найдите $I = \dfrac{q}{t}$.

## Решение

Сила тока — заряд, проходящий через сечение проводника за единицу времени. По графику за $t = 12$~с прошёл заряд $q = 3$~Кл:
$$I = \frac{q}{t} = \frac{3}{12} = 0{,}25~\text{А}.$$
