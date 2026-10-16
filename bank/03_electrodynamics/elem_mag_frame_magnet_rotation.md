---
id: elem_mag_frame_magnet_rotation
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: П
type: качественная
variant: 
answer: "Рамка повернётся против часовой стрелки и своей плоскостью встанет перпендикулярно оси магнита так, что контакт «+» окажется внизу"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА, КАЧЕСТВЕННАЯ_ЗАДАЧА]
source: mag.tex
---

## Условие

Небольшую рамку с постоянным током удерживают неподвижно в поле полосового магнита (см. рисунок). Полярность подключения источника тока к выводам рамки показана на рисунке. Опишите движение рамки относительно неподвижной оси $MO$ после того, как рамку отпустят. Ответ поясните, указав, какие физические закономерности Вы использовали для объяснения. Считать, что рамка испытывает небольшое сопротивление движению со стороны воздуха. ЭДС индукции, возникающей в рамке, и колебаниями рамки пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.7, line join=round, every node/.style={font=\small}]
  % полосовой магнит в перспективе
  % северный полюс (синий) обращён к рамке, южный дальний
  \fill[brandPrimary!25] (2.70,1.90) rectangle (4.05,3.10);
  \fill[brandPrimary!35] (2.70,3.10) -- (4.05,3.10) -- (3.50,3.65) -- (2.15,3.65) -- cycle;
  \draw[thick] (1.30,1.90) rectangle (4.05,3.10);
  \draw[thick] (1.30,3.10) -- (0.75,3.65) -- (3.50,3.65) -- (4.05,3.10);
  \draw[thick] (0.75,3.65) -- (0.75,2.45) -- (1.30,1.90);
  \draw[thick] (2.70,1.90) -- (2.70,3.10) -- (2.15,3.65);
  \node[font=\large] at (2.00,2.50) {$S$};
  \node[font=\large] at (3.375,2.50) {$N$};
  % ось MO
  \draw[thin, dash dot] (4.60,4.48) -- (9.00,0.15);
  \node at (3.70,4.50) {$M$};
  \node at (7.90,0.20) {$O$};
  % рамка с выводами
  \draw[thick] (7.45,1.18) -- (6.40,2.22) -- (5.60,2.22) -- (3.90,3.95) -- (6.40,3.95) -- (8.12,2.22) -- (7.30,2.22) -- (8.35,1.18);
  \node at (6.28,1.62) {$-$};
  \node at (8.60,1.68) {$+$};
\end{tikzpicture}
```

## Решение

1. Ответ: рамка повернётся против часовой стрелки и своей плоскостью встанет перпендикулярно оси магнита так, что контакт «+» окажется внизу.

2. Рассмотрим сечение рамки плоскостью рисунка.

В исходном положении в левом звене рамки ток направлен от нас, а в правом — к нам.

```latex
\begin{tikzpicture}[scale=0.85, line join=round, every node/.style={font=\small}]
  % силовые линии слева (входят в S)
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.45 with {\arrow{Stealth}}}] (-3.4,0) -- (-1,0);
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.4 with {\arrow{Stealth}}}] (-3.4,-0.45) to[out=0, in=180] (-1,-0.22);
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.4 with {\arrow{Stealth}}}] (-3.4,0.45) to[out=0, in=180] (-1,0.22);
  \draw[thick] (-1,0.3) to[out=170, in=-20] (-3.0,1.35);
  \draw[thick] (-1,-0.3) to[out=-170, in=20] (-3.0,-1.35);
  % силовые линии справа (выходят из N)
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.93 with {\arrow{Stealth}}}] (1,0) -- (4.0,0);
  \draw[thick] (1,0.3) to[out=10, in=200] (3.6,1.35);
  \draw[thick] (1,-0.3) to[out=-10, in=160] (3.6,-1.35);
  \draw[thick] (1,0.22) to[out=0, in=180] (3.6,0.5);
  \draw[thick] (1,-0.22) to[out=0, in=180] (3.6,-0.5);
  % магнит в сечении: S слева (белый), N справа (голубой)
  \draw[thick, fill=white] (-1,-0.38) rectangle (0,0.38);
  \draw[thick, fill=brandPrimary!25] (0,-0.38) rectangle (1,0.38);
  \node[font=\large] at (0.5,0) {$N$};
  \node[font=\large] at (-0.5,0) {$S$};
  \draw[thick, fill=white] (1.9,0) circle (0.17);
  \draw[thick] (1.9-0.12,0-0.12) -- (1.9+0.12,0+0.12) (1.9-0.12,0+0.12) -- (1.9+0.12,0-0.12);
  \draw[thick, fill=white] (3.0,0) circle (0.17); \fill (3.0,0) circle (0.045);
  \draw[Fvec] (1.9,-0.17) -- (1.9,-1.0) node[left] {$\vec F_{A1}$};
  \draw[Fvec] (3.0,0.17) -- (3.0,1.0) node[left] {$\vec F_{A2}$};
  \node at (0.3,-1.85) {Рис. а};
\end{tikzpicture}
```

На левое звено рамки действует сила Ампера $\vec F_{A1}$, направленная вниз, а на правое звено — сила Ампера $\vec F_{A2}$, направленная вверх. Эти силы разворачивают рамку относительно неподвижной оси $MO$ против часовой стрелки (см. рисунок а).

3. Под действием этих сил рамка поворачивается вокруг оси и благодаря сопротивлению воздуха устанавливается в положении равновесия перпендикулярно оси магнита так, что контакт «+» оказывается внизу. При этом силы Ампера $\vec F_{A1}$ и $\vec F_{A2}$ обеспечивают равновесие рамки относительно оси $MO$ (см. рисунок б).

```latex
\begin{tikzpicture}[scale=0.85, line join=round, every node/.style={font=\small}]
  % силовые линии слева (входят в S)
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.45 with {\arrow{Stealth}}}] (-3.4,0) -- (-1,0);
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.4 with {\arrow{Stealth}}}] (-3.4,-0.45) to[out=0, in=180] (-1,-0.22);
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.4 with {\arrow{Stealth}}}] (-3.4,0.45) to[out=0, in=180] (-1,0.22);
  \draw[thick] (-1,0.3) to[out=170, in=-20] (-3.0,1.35);
  \draw[thick] (-1,-0.3) to[out=-170, in=20] (-3.0,-1.35);
  % силовые линии справа (выходят из N)
  \draw[thick, postaction={decorate}, decoration={markings, mark=at position 0.93 with {\arrow{Stealth}}}] (1,0) -- (4.0,0);
  \draw[thick] (1,0.3) to[out=15, in=210] (3.8,1.45);
  \draw[thick] (1,-0.3) to[out=-15, in=150] (3.8,-1.45);
  % магнит в сечении: S слева (белый), N справа (голубой)
  \draw[thick, fill=white] (-1,-0.38) rectangle (0,0.38);
  \draw[thick, fill=brandPrimary!25] (0,-0.38) rectangle (1,0.38);
  \node[font=\large] at (0.5,0) {$N$};
  \node[font=\large] at (-0.5,0) {$S$};
  \coordinate (W2) at (2.75,0.87);
  \coordinate (W1) at (2.75,-0.87);
  \draw[thick, fill=white] (2.75,0.87) circle (0.17); \fill (2.75,0.87) circle (0.045);
  \draw[thick, fill=white] (2.75,-0.87) circle (0.17);
  \draw[thick] (2.75-0.12,-0.87-0.12) -- (2.75+0.12,-0.87+0.12) (2.75-0.12,-0.87+0.12) -- (2.75+0.12,-0.87-0.12);
  \draw[Fvec] (2.68,1.03) -- (2.40,1.75) node[left] {$\vec F_{A2}$};
  \draw[Fvec] (2.68,-1.03) -- (2.40,-1.75) node[left] {$\vec F_{A1}$};
  \node at (0.3,-2.25) {Рис. б};
\end{tikzpicture}
```
