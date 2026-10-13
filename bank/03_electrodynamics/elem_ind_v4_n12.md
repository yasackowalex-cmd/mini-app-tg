---
id: elem_ind_v4_n12
exam: ЕГЭ
kim: 12
section: Электродинамика
theme: МАГНИТНЫЙ ПОТОК. ЭЛЕКТРОМАГНИТНАЯ ИНДУКЦИЯ. САМОИНДУКЦИЯ
topic: 3.2.2
level: Б
type: расчётная
variant: 4
answer: "0,3"
unit: "мВ"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ИНДУКЦИЯ, САМОИНДУКЦИЯ]
source: ind.tex
---

## Условие

На рисунке представлен график зависимости силы тока от времени в катушке индуктивностью $0{,}2\text{ мГн}$. Определите модуль ЭДС самоиндукции. Ответ выразите в милливольтах (мВ).


## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.9cm, y=0.4cm, every node/.style={font=\footnotesize}]
  \draw[step=1, gray!30, thin] (0,0) grid (4,6);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (5,0) node[right] {$t,\ \text{с}$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,7.8) node[above] {$I,\ \text{А}$};
  \foreach \t in {2,4} \node[below] at (\t,0) {$\t$};
  \foreach \i in {2,4,6} \node[left] at (0,\i) {$\i$};
  \node[below left] at (0,0) {$0$};
  \draw[dashed] (0,6) -- (4,6) -- (4,0);
  \draw[ultra thick, brandPrimary] (0,0) -- (4,6);
\end{tikzpicture}
```

## Решение

По графику сила тока равномерно растёт от $0$ до $6$~А за $4$~с, скорость её изменения $\dfrac{\Delta I}{\Delta t} = \dfrac{6}{4} = 1{,}5$~А/с.

$$\mathcal{E}_{si} = L\frac{\Delta I}{\Delta t} = 0{,}2 \cdot 10^{-3} \cdot 1{,}5 = 0{,}3 \cdot 10^{-3}~\text{В} = 0{,}3~\text{мВ}.$$
