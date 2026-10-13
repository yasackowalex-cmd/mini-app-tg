---
id: fluid_iron_ball_hg
exam: ЕГЭ
kim: 22
section: Механика
theme: ДАВЛЕНИЕ. СИЛА АРХИМЕДА
topic: 1.4.2
level: Б
type: расчётная (часть 2)
variant: 
answer: "0,54"
unit: ""
has_image: true
author_task: false
tags: []
source: pres.tex
---

## Условие

В стакан налита ртуть, а поверх неё — вода. Однородный железный шар плавает, погружённый в обе жидкости. Какая часть объёма шара находится в ртути?

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2,font=\small]
  \fill[pattern=crosshatch dots, pattern color=brandSecondary!70] (-1.2,0) rectangle (1.2,1.2);
  \fill[pattern=dots, pattern color=brandSecondary!40] (-1.2,1.2) rectangle (1.2,2.4);
  \fill[white] (0,1.168) circle (0.6);
  \draw[thick,brandSecondary] (0,1.168) circle (0.6);
  \draw[thick,brandSecondary] (-1.2,1.2)--(-0.599,1.2) (0.599,1.2)--(1.2,1.2);
  \draw[thick,brandSecondary] (-1.2,2.4)--(1.2,2.4);
  \draw[thick,brandSecondary] (-1.2,3)--(-1.2,0)--(1.2,0)--(1.2,3);
  \node[right] at (1.25,1.80) {вода};
  \node[right] at (1.25,0.60) {ртуть};
\end{tikzpicture}
```

## Решение

Обозначим $V$ — объём шара, $V_1$ — объём его части, находящейся в ртути, $x = \dfrac{V_1}{V}$ — искомая доля. Плотности (табличные): железа $\rho = 7800\,\text{кг/м}^3$, ртути $\rho_1 = 13\,600\,\text{кг/м}^3$, воды $\rho_2 = 1000\,\text{кг/м}^3$.

На шар действуют сила тяжести $\rho Vg$ и выталкивающие силы со стороны ртути $\rho_1 gV_1$ и воды $\rho_2 g(V - V_1)$ (закон Архимеда). Условие плавания (равновесия): $\rho Vg = \rho_1 gV_1 + \rho_2 g(V - V_1)$.

Разделив на $gV$: $\rho = \rho_1 x + \rho_2(1 - x)$, откуда $x = \dfrac{\rho - \rho_2}{\rho_1 - \rho_2}$.

$x = \dfrac{7800 - 1000}{13\,600 - 1000} = \dfrac{6800}{12\,600} \approx 0{,}54$.

Ответ: $x \approx 0{,}54$.
