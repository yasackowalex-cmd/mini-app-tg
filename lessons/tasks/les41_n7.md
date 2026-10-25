---
id: les41_n7
exam: ЕГЭ
kim: 25
section: Оптика
theme: 
topic: 4.1
level: В
type: расчётная (часть 2)
variant: 
answer: "1,85"
unit: "м"
has_image: true
author_task: false
tags: [ОПТИКА]
source: ДЗ к уроку 4.1
---

## Условие

В дно водоёма глубиной $3$~м вертикально вбита свая, целиком скрытая под водой. Угол падения солнечных лучей на поверхность воды равен $30^\circ$. Свая отбрасывает на дно водоёма тень длиной $0{,}75$~м. Определите высоту сваи. Сделайте рисунок, показав ход лучей, определяющих тень сваи на дне. Показатель преломления воды $n=\dfrac{4}{3}$.

## Решение

$\alpha=30^\circ$, $l=0{,}75$~м, $n=\dfrac43$.

Тень на дне ограничивает луч, который преломляется на поверхности воды и проходит через верхний конец сваи.

```latex
\begin{tikzpicture}[scale=1.15, every node/.style={font=\footnotesize}]
  \fill[brandLight] (-1.7,-2.6) rectangle (1.9,0);
  \draw[thick, brandSecondary] (-1.7,0) -- (1.9,0);
  \draw[thick, brandSecondary] (-1.7,-2.6) -- (1.9,-2.6);
  \draw[dashed, brandSecondary!50] (-0.4045,-1.6) -- (-0.4045,0.9);
  \draw[line width=2.4pt, brandSecondary] (0,-2.6) -- (0,-1.0);
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (-1.0045,1.039) -- (-0.70,0.52);
  \draw[thick, brandPrimary] (-0.70,0.52) -- (-0.4045,0);
  \draw[-{Stealth[scale=0.8]}, thick, brandPrimary] (-0.4045,0) -- (0,-1.0);
  \draw[thick, brandPrimary] (0,-1.0) -- (0.647,-2.6);
  \draw[brandAccent, thick] (-0.4045,0.55) arc (90:120:0.55);
  \node[brandAccent] at (-0.6,0.8) {$\alpha$};
  \draw[brandAccent, thick] (-0.4045,-0.55) arc (270:292:0.55);
  \node[brandAccent] at (-0.25,-0.8) {$\beta$};
  \draw[|<->|, brandAccent] (0,-2.85) -- (0.647,-2.85);
  \node[below, brandAccent] at (0.32,-2.83) {$l$};
  \draw[|<->|, brandSecondary] (-0.35,-2.6) -- (-0.35,-1.0);
  \node[left, brandSecondary] at (-0.35,-1.8) {$h$};
\end{tikzpicture}
```

По закону преломления
\[
\sin\alpha=n\sin\beta\ \Rightarrow\ \sin\beta=\frac{\sin30^\circ}{4/3}=\frac38=0{,}375.
\]
Тогда
\[
\cos\beta=\sqrt{1-\sin^2\beta}=\frac{\sqrt{55}}{8},\qquad \operatorname{tg}\beta=\frac{\sin\beta}{\cos\beta}=\frac{3}{\sqrt{55}}.
\]
Луч, прошедший через верхний конец сваи, на высоте сваи $h$ смещается по горизонтали на длину тени:
\[
l=h\operatorname{tg}\beta\ \Rightarrow\ h=\frac{l}{\operatorname{tg}\beta}=\frac{0{,}75\sqrt{55}}{3}\approx1{,}85~\text{м}.
\]
Глубина водоёма в расчёт не входит: она лишь показывает, что свая целиком под водой.

Должно получиться: $h\approx1{,}85$~м.
