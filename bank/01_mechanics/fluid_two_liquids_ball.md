---
id: fluid_two_liquids_ball
exam: ЕГЭ
kim: 22
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная (часть 2)
variant: 
answer: "850"
unit: "кг/м³"
has_image: true
author_task: false
tags: []
source: pres.tex
---

## Условие

В стакан налита вода, а поверх неё — керосин. Однородный шар плавает, погружённый в обе жидкости. При этом четверть объёма шара находится в воде. Найдите плотность материала шара.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2,font=\small]
  \fill[pattern=crosshatch dots, pattern color=brandSecondary!70] (-1.2,0) rectangle (1.2,1.2);
  \fill[pattern=dots, pattern color=brandSecondary!40] (-1.2,1.2) rectangle (1.2,2.4);
  \fill[white] (0,1.408) circle (0.6);
  \draw[thick,brandSecondary] (0,1.408) circle (0.6);
  \draw[thick,brandSecondary] (-1.2,1.2)--(-0.563,1.2) (0.563,1.2)--(1.2,1.2);
  \draw[thick,brandSecondary] (-1.2,2.4)--(1.2,2.4);
  \draw[thick,brandSecondary] (-1.2,3)--(-1.2,0)--(1.2,0)--(1.2,3);
  \node[right] at (1.25,1.80) {керосин};
  \node[right] at (1.25,0.60) {вода};
\end{tikzpicture}
```

## Решение

Обозначим $V$ — объём шара, $\rho$ — плотность его материала. Плотности (табличные): воды $\rho_1 = 1000\,\text{кг/м}^3$, керосина $\rho_2 = 800\,\text{кг/м}^3$. В воде находится объём $\dfrac{V}{4}$, в керосине — $\dfrac{3V}{4}$.

На шар действуют сила тяжести $\rho Vg$ и выталкивающие силы со стороны воды и керосина (закон Архимеда). Условие плавания (равновесия): $\rho Vg = \rho_1 g\dfrac{V}{4} + \rho_2 g\dfrac{3V}{4}$.

Отсюда $\rho = \dfrac{\rho_1 + 3\rho_2}{4}$.

$\rho = \dfrac{1000 + 3\cdot 800}{4} = 850\,\text{кг/м}^3$.

Ответ: $\rho = 850\,\text{кг/м}^3$.
