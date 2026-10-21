---
id: dem24_v6_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: расчётная
variant: 6
answer: "25"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, ГРАФИКИ]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 6)
---

## Условие

На графике приведена зависимость горизонтальной силы $F$, приложенной к бруску, скользящему без трения по горизонтальной поверхности, от величины его ускорения $a$. Систему отсчёта считать инерциальной. Чему равна масса бруска?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=0.6cm, every node/.style={font=\small}]
\foreach \i in {1,...,6} \draw[gray!50, thin] (\i,0) -- (\i,5);
  \foreach \j in {1,...,5} \draw[gray!50, thin] (0,\j) -- (6,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (6.8,0) node[below right] {$a$, м/с$^2$};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,5.8) node[left] {$F$, Н};
  \node[below left] at (0,0) {$0$};
  \node[below] at (2,0) {$0{,}2$};
  \node[below] at (4,0) {$0{,}4$};
  \node[below] at (6,0) {$0{,}6$};
  \node[left] at (0,2) {$6$};
  \node[left] at (0,4) {$12$};
  \draw[very thick, brandPrimary] (0,0) -- (6,5);
\end{tikzpicture}
```

## Решение

Трения нет, по второму закону Ньютона $F = ma$, откуда $m = \dfrac{F}{a}$. По графику при $a = 0{,}6$~м/с$^2$ сила $F = 15$~Н:
$$m = \frac{15}{0{,}6} = 25~\text{кг}.$$
