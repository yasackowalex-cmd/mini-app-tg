---
id: fipi_150AE7
exam: ЕГЭ
kim: 2
section: Механика
theme: ВТОРОЙ ЗАКОН НЬЮТОНА (ДИНАМИКА)
topic: 1.2.2
level: Б
type: расчётная
answer: "6"
unit: "Н"
has_image: true
author_task: false
tags: [МЕХАНИКА, ДИНАМИКА, СВЯЗАННЫЕ_ТЕЛА]
source: Открытый банк заданий ФИПИ, ЕГЭ (задание 150AE7)
---

## Условие

Два груза подвешены на достаточно длинной невесомой нерастяжимой нити, перекинутой через идеальный блок (см. рисунок). Грузы удерживали неподвижно, а затем осторожно отпустили, после чего они начали двигаться равноускоренно. Через $t = 1$~с после начала движения скорость правого груза направлена вверх и равна $4$~м/с. Определите силу натяжения нити, если масса левого груза $M = 1$~кг. Трением пренебречь.

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\small}]
\fill[pattern=north east lines] (-0.8,2.6) rectangle (0.8,2.75); \draw[thick] (-0.8,2.6) -- (0.8,2.6);
  \draw[thick] (0,2.6) -- (0,1.8);
  \draw[thick] (0,1.8) circle (0.5); \fill (0,1.8) circle (1.5pt);
  \draw[thick] (-0.5,1.8) -- (-0.5,0.6); \draw[thick] (0.5,1.8) -- (0.5,0.9);
  \draw[thick, fill=white] (-0.8,0.0) rectangle (-0.2,0.6); \node[left] at (-0.8,0.3) {$M$};
  \draw[thick, fill=white] (0.32,0.54) rectangle (0.68,0.9); \node[right] at (0.68,0.72) {$m$};
\end{tikzpicture}
```

## Подсказка

Ускорение найдите из $v = at$. Левый груз движется вниз: $Ma = Mg - T$.

## Решение

1. На грузы действуют силы тяжести и силы натяжения нити. Правый груз движется вверх, значит, левый — вниз.

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\small}]
\fill[pattern=north east lines] (-0.8,2.6) rectangle (0.8,2.75); \draw[thick] (-0.8,2.6) -- (0.8,2.6);
  \draw[thick] (0,2.6) -- (0,1.8);
  \draw[thick] (0,1.8) circle (0.5); \fill (0,1.8) circle (1.5pt);
  \draw[thick] (-0.5,1.8) -- (-0.5,0.6); \draw[thick] (0.5,1.8) -- (0.5,0.9);
  \draw[thick, fill=white] (-0.8,0.0) rectangle (-0.2,0.6); \node[left] at (-0.8,0.3) {$M$};
  \draw[thick, fill=white] (0.32,0.54) rectangle (0.68,0.9); \node[right] at (0.68,0.72) {$m$};

  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (-0.5,0.6) -- (-0.5,1.3) node[left] {$\vec T$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (-0.5,0.0) -- (-0.5,-0.9) node[left] {$M\vec g$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.5,0.9) -- (0.5,1.45) node[right] {$\vec T$};
  \draw[-{Stealth[scale=0.9]}, very thick, brandPrimary] (0.5,0.54) -- (0.5,-0.05) node[right] {$m\vec g$};
  \draw[-{Stealth[scale=0.9]}, thick] (-1.6,0.6) -- (-1.6,-0.1) node[left] {$\vec a$};
  \draw[-{Stealth[scale=0.9]}, thick] (1.5,0.4) -- (1.5,1.1) node[right] {$\vec a$};
\end{tikzpicture}
```

2. Нить невесома и нерастяжима, блок идеален, поэтому ускорения грузов равны по модулю ($a$), а силы натяжения нити с обеих сторон одинаковы ($T$).

3. Грузы начали двигаться из состояния покоя: $v = at$, откуда
$$a = \frac vt = \frac41 = 4~\text{м/с}^2.$$

4. Второй закон Ньютона для левого груза в проекции на ось, направленную вниз:
$$Ma = Mg - T \quad\Rightarrow\quad T = M(g - a) = 1\cdot(10 - 4) = 6~\text{Н}.$$
