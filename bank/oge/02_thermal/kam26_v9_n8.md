---
id: kam26_v9_n8
exam: ОГЭ
kim: 8
section: Тепловые явления
theme: АГРЕГАТНЫЕ СОСТОЯНИЯ ВЕЩЕСТВА
topic: 2.1
level: Б
type: расчётная
variant: 9
answer: "500"
unit: "Дж/(кг·°С)"
has_image: true
author_task: false
tags: [ТЕПЛОВЫЕ_ЯВЛЕНИЯ, УДЕЛЬНАЯ_ТЕПЛОЁМКОСТЬ, КОЛИЧЕСТВО_ТЕПЛОТЫ]
source: Камзеева, ОГЭ-2026, 30 вариантов (вариант 9)
---

## Условие

На рисунке представлен график зависимости температуры твёрдого тела $t$ от полученного им количества теплоты $Q$. Масса тела $2$~кг. Чему равна удельная теплоёмкость вещества этого тела?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1, every node/.style={font=\small}]
  \draw[brandSecondary!35] (0.00,0) -- (0.00,2.4);
  \draw[brandSecondary!35] (1.50,0) -- (1.50,2.4);
  \draw[brandSecondary!35] (3.00,0) -- (3.00,2.4);
  \draw[brandSecondary!35] (0,0.00) -- (3.0,0.00);
  \draw[brandSecondary!35] (0,0.60) -- (3.0,0.60);
  \draw[brandSecondary!35] (0,1.20) -- (3.0,1.20);
  \draw[brandSecondary!35] (0,1.80) -- (3.0,1.80);
  \draw[brandSecondary!35] (0,2.40) -- (3.0,2.40);
  \draw[thick, -{Stealth}] (0,0) -- (3.6,0) node[right] {$Q$, кДж};
  \draw[thick, -{Stealth}] (0,0) -- (0,2.9) node[left] {$t$, $^\circ$C};
  \node[below left] at (0,0) {0};
  \foreach \v/\y in {100/0.6, 200/1.2, 300/1.8, 400/2.4} \node[left] at (0,\y) {\v};
  \foreach \v/\x in {150/1.5, 300/3.0} \node[below] at (\x,0) {\v};
  \draw[very thick, brandPrimary] (0,0.6) -- (3.0,2.4);
\end{tikzpicture}
```

## Подсказка

Найдите по графику изменение температуры и полученное количество теплоты. $Q = cm\Delta t$.

## Решение

По графику: тело получило $Q = 300~\text{кДж} = 300\,000$~Дж, и его температура выросла от $100$ до $400~^\circ\text{C}$, то есть на $\Delta t = 300~^\circ\text{C}$.

Из формулы $Q = cm\Delta t$
$$c = \frac{Q}{m\Delta t} = \frac{300\,000}{2\cdot 300} = 500~\frac{\text{Дж}}{\text{кг}\cdot{}^\circ\text{C}}.$$
