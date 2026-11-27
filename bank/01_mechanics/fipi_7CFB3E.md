---
id: fipi_7CFB3E
exam: ЕГЭ
kim: 1
section: Механика
theme: РАВНОУСКОРЕННОЕ ДВИЖЕНИЕ. ГРАФИКИ
topic: 1.1.3
level: Б
type: расчётная
answer: "1"
unit: "м/с²"
has_image: true
author_task: false
tags: [МЕХАНИКА, КИНЕМАТИКА, ГРАФИКИ]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 7CFB3E)
---

## Условие

Материальная точка движется прямолинейно с постоянным ускорением вдоль оси $Ox$. График зависимости её координаты от времени $x = x(t)$ изображён на рисунке.

[[рис 1]]

Определите проекцию $a_x$ ускорения этого тела.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.75cm, y=0.6cm, every node/.style={font=\footnotesize}]
    \draw[gray!30, thin] (-2,0) grid (2,3);
    \draw[-{Stealth[scale=0.8]}, black, thick] (-2.6,0) -- (3,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,3.7) node[above] {$x, \text{ м}$};
    \foreach \t in {-2,-1,1,2} \node[below] at (\t,0) {$\t$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {1,2,3} \node[left] at (0,\x) {$\x$};
    \draw[thick, dashed, brandPrimary] plot[domain=-2.4:0, samples=40] (\x,{\x*\x/2});
    \draw[ultra thick, brandPrimary] plot[domain=0:2.4, samples=40] (\x,{\x*\x/2});
\end{tikzpicture}
```

## Подсказка

При $x_0 = 0$ и $v_{0x} = 0$ координата $x = \dfrac{a_x t^2}{2}$. Возьмите точку параболы на узле сетки.

## Решение

Вершина параболы в начале координат: в момент $t = 0$ координата $x_0 = 0$ и скорость $v_{0x} = 0$. Тогда
$$x = \frac{a_x t^2}{2}.$$
По графику при $t = 2$~с координата $x = 2$~м:
$$a_x = \frac{2x}{t^2} = \frac{2\cdot 2}{2^2} = 1~\text{м/с}^2.$$
