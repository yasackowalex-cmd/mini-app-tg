---
id: kam27_v6_n7
exam: ОГЭ
kim: 7
section: Механика
theme: МЕХАНИЧЕСКАЯ ЭНЕРГИЯ. ЗАКОН СОХРАНЕНИЯ ЭНЕРГИИ
topic: 1.3.3
level: Б
type: расчётная
variant: 6
answer: "40"
unit: "Дж"
has_image: true
author_task: false
tags: [МЕХАНИКА, ГРАФИКИ, ЗСЭ, КОЛЕБАНИЯ]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 6)
---

## Условие

На рисунке представлен график зависимости потенциальной энергии от времени для нитяного маятника, совершающего гармонические колебания.

[[рис 1]]

Чему равна кинетическая энергия маятника в момент, соответствующий точке A на графике?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=1.5cm, y=0.022cm, every node/.style={font=\small}]
  \foreach \x in {0.5,1,...,3.5} \draw[brandSecondary!30] (\x,0) -- (\x,160);
  \foreach \y in {20,40,...,160} \draw[brandSecondary!30] (0,\y) -- (3.5,\y);
  \draw[-{Stealth}, thick] (0,0) -- (3.8,0) node[below] {$t$, с};
  \draw[-{Stealth}, thick] (0,0) -- (0,185) node[left] {$E_\text{п}$, Дж};
  \foreach \x in {1,2,3} \node[below] at (\x,0) {\x};
  \foreach \y in {80,160} \node[left] at (0,\y) {\y};
  \node[below left] at (0,0) {0};
  \draw[very thick, brandPrimary, domain=0:3.4, samples=120, smooth] plot (\x, {80*(1-cos(180*\x))});
  \fill (4/3,120) circle (1.6pt) node[right=3pt] {A};
\end{tikzpicture}
```

## Подсказка

Полная энергия равна максимальной потенциальной: $E_\text{к} = E_{\text{п}\max} - E_\text{п}$.

## Решение

Полная механическая энергия маятника сохраняется и равна наибольшей потенциальной энергии: $E = E_{\text{п}\max} = 160$~Дж (в крайней точке скорость равна нулю).

В точке A по графику $E_\text{п} = 120$~Дж (одна клетка по вертикали — $20$~Дж). Тогда
$$E_\text{к} = E - E_\text{п} = 160 - 120 = 40~\text{Дж}.$$
