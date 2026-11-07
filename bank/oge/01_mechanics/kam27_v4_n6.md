---
id: kam27_v4_n6
exam: ОГЭ
kim: 6
section: Механика
theme: СИЛА УПРУГОСТИ. СИЛА ТРЕНИЯ
topic: 1.2.4
level: Б
type: расчётная
variant: 4
answer: "10"
unit: "Н/м"
has_image: true
author_task: false
tags: [МЕХАНИКА, ЗАКОН_ГУКА]
source: Камзеева, ОГЭ-2027, 30 вариантов (вариант 4)
---

## Условие

Для определения жёсткости пружины к ней подвесили два груза по $100$~г каждый (см. рисунок). Чему равна жёсткость пружины?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[y=0.04cm, x=1cm, every node/.style={font=\scriptsize}]
  \begin{scope}[shift={(0.0,0)}]
  \draw[thick] (0,-6) -- (0,104); \draw[thick] (-0.4,-6) -- (3.0,-6);
  \draw[thick] (0,96) -- (1.25,96) -- (1.25,92);
  \draw[thick, fill=white] (1.75,-2) rectangle (2.75,108);
  \foreach \c in {0,2,...,100} \draw (1.75,\c) -- (1.86,\c);
  \foreach \c in {0,10,...,100} {\draw (1.75,\c) -- (1.95,\c); \node[right, inner sep=1pt] at (1.97,\c) {\c};}
  \node[above] at (2.25,108) {см};
  \draw[thick, decorate, decoration={coil, aspect=0.5, segment length=2.3pt, amplitude=4pt}] (1.25,92) -- (1.25,80);
  \draw[-{Stealth}, brandAccent, thick] (1.3,80) -- (1.72,80);
  
  \end{scope}
  \begin{scope}[shift={(4.14,0)}]
  \draw[thick] (0,-6) -- (0,104); \draw[thick] (-0.4,-6) -- (3.0,-6);
  \draw[thick] (0,96) -- (1.25,96) -- (1.25,92);
  \draw[thick, fill=white] (1.75,-2) rectangle (2.75,108);
  \foreach \c in {0,2,...,100} \draw (1.75,\c) -- (1.86,\c);
  \foreach \c in {0,10,...,100} {\draw (1.75,\c) -- (1.95,\c); \node[right, inner sep=1pt] at (1.97,\c) {\c};}
  \node[above] at (2.25,108) {см};
  \draw[thick, decorate, decoration={coil, aspect=0.5, segment length=5.2pt, amplitude=4pt}] (1.25,92) -- (1.25,60);
  \draw[-{Stealth}, brandAccent, thick] (1.3,60) -- (1.72,60);
  \draw[thick] (1.25,60) -- (1.25,57); \fill[brandSecondary] (1.1,47) rectangle (1.4,57); \draw[thick] (1.25,47) -- (1.25,43); \fill[brandSecondary] (1.1,33) rectangle (1.4,43);
  \end{scope}
\end{tikzpicture}
```

## Подсказка

Удлинение — разность показаний линейки; масса двух грузов $200$~г.

## Решение

По рисунку без грузов конец пружины на отметке $80$~см, с грузами — на $60$~см. Удлинение $x = 20$~см $= 0{,}2$~м.

Грузы висят неподвижно, сила упругости равна их весу: $F = mg = 0{,}2\cdot 10 = 2$~Н. По закону Гука
$$k = \frac{F}{x} = \frac{2}{0{,}2} = 10~\text{Н/м}.$$
