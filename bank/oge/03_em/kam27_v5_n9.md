---
id: kam27_v5_n9
exam: ОГЭ
kim: 9
section: Электромагнитные явления
theme: ЗАКОН ОМА
topic: 3.1.2
level: Б
type: расчётная
variant: 5
answer: "4"
unit: "В"
has_image: true
author_task: false
tags: [ЭЛЕКТРОМАГНИТНЫЕ_ЯВЛЕНИЯ, ЗАКОН_ОМА, ГРАФИКИ]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 5)
---

## Условие

На рисунке представлен график зависимости силы тока в проводнике от электрического сопротивления проводника. Чему равно электрическое напряжение, при котором проводились измерения?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.8cm, y=0.6cm, every node/.style={font=\small}]
  \foreach \x in {1,...,4} \draw[brandSecondary!30] (\x,0) -- (\x,4.5);
  \foreach \y in {1,...,4} \draw[brandSecondary!30] (0,\y) -- (4.8,\y);
  \draw[-{Stealth}, thick] (0,0) -- (5.3,0) node[below] {$R$, Ом};
  \draw[-{Stealth}, thick] (0,0) -- (0,5.0) node[left] {$I$, А};
  \foreach \x in {1,2,4} \node[below] at (\x,0) {\x};
  \foreach \y in {1,2,4} \node[left] at (0,\y) {\y};
  \node[below left] at (0,0) {0};
  \draw[very thick, brandPrimary, domain=1:4.6, samples=40] plot (\x,{4/\x});
\end{tikzpicture}
```

## Подсказка

Возьмите любую точку графика: $U = IR$.

## Решение

По закону Ома $U = IR$. Возьмём точку графика: при $R = 1$~Ом сила тока $I = 4$~А:
$$U = 4\cdot 1 = 4~\text{В}.$$

Для другой точки то же: при $R = 2$~Ом $I = 2$~А, $U = 4$~В.
