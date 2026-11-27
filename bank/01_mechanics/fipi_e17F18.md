---
id: fipi_e17F18
exam: ЕГЭ
kim: 4
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5
level: Б
type: расчётная
answer: "125"
unit: "Гц"
has_image: true
author_task: false
tags: [МЕХАНИКА, КОЛЕБАНИЯ, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание e17F18)
---

## Условие

На рисунке показан график зависимости координаты $x$ от времени $t$ для одной из точек колеблющейся струны. Чему равна частота этих колебаний струны согласно графику?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.45cm, y=8cm, every node/.style={font=\small}]
    \foreach \x in {2,4,...,12} \draw[dashed, gray!60] (\x,-0.2) -- (\x,0.2);
    \foreach \y in {-0.2,-0.1,0.1,0.2} \draw[dashed, gray!60] (0,\y) -- (12,\y);
    \draw[-{Stealth[scale=0.8]}, thick] (0,-0.25) -- (0,0.27) node[left] {$x$, см};
    \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (13.5,0) node[below] {$t$, $10^{-3}$~с};
    \foreach \x in {2,4,...,12} \node[below left] at (\x,0) {$\x$};
    \node[left] at (0,0.2) {$0{,}2$}; \node[left] at (0,0.1) {$0{,}1$};
    \node[left] at (0,-0.1) {$-0{,}1$}; \node[left] at (0,-0.2) {$-0{,}2$}; \node[below left] at (0,0) {$0$};
    \draw[ultra thick, brandPrimary, domain=0:12, samples=120] plot (\x, {0.2*cos(45*\x)});
\end{tikzpicture}
```

## Подсказка

Найдите по графику период — время между соседними максимумами, затем $\nu = \dfrac1T$.

## Решение

Период — время между двумя соседними максимумами: при $t = 0$ и $t = 8\cdot 10^{-3}$~с. Значит, $T = 8\cdot 10^{-3}$~с.
$$\nu = \frac1T = \frac{1}{8\cdot 10^{-3}} = 125~\text{Гц}.$$
