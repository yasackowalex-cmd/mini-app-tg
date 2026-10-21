---
id: dem24_v5_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: расчётная
variant: 5
answer: "24"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, ГРАФИКИ]
source: Демидова, ЕГЭ-2024, 30 вариантов (вариант 5)
---

## Условие

На графике приведена зависимость ускорения $a$ бруска, скользящего без трения по горизонтальной поверхности, от величины приложенной к нему горизонтальной силы $F$. Систему отсчёта считать инерциальной. Чему равна масса бруска?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.6cm, y=0.6cm, every node/.style={font=\small}]
\foreach \i in {1,...,6} \draw[gray!50, thin] (\i,0) -- (\i,5);
  \foreach \j in {1,...,5} \draw[gray!50, thin] (0,\j) -- (6,\j);
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (6.8,0) node[below right] {$F$, Н};
  \draw[-{Stealth[scale=0.8]}, thick] (0,0) -- (0,5.8) node[left] {$a$, м/с$^2$};
  \node[below left] at (0,0) {$0$};
  \node[below] at (2,0) {$2$};
  \node[below] at (4,0) {$4$};
  \node[below] at (6,0) {$6$};
  \node[left] at (0,2) {$0{,}1$};
  \node[left] at (0,4) {$0{,}2$};
  \draw[very thick, brandPrimary] (0,0) -- (6,5);
\end{tikzpicture}
```

## Решение

Трения нет, по второму закону Ньютона $F = ma$, откуда $m = \dfrac{F}{a}$. По графику при $F = 6$~Н ускорение $a = 0{,}25$~м/с$^2$:
$$m = \frac{6}{0{,}25} = 24~\text{кг}.$$
