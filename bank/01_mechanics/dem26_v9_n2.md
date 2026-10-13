---
id: dem26_v9_n2
exam: ЕГЭ
kim: 2
section: Механика
theme: Задание №2 (Динамика)
topic: 1.2.4
level: Б
type: расчётная
variant: 9
answer: "10"
unit: "Н"
has_image: false
author_task: false
tags: [МЕХАНИКА]
source: kim02.tex
---

## Условие

При прямолинейном движении по горизонтальной поверхности на брусок массой $20$~кг действует сила трения скольжения, равная по модулю $20$~Н. Чему будет равен модуль силы трения скольжения после уменьшения массы тела в $2$ раза, если коэффициент трения не изменится?

## Решение

На горизонтальной поверхности $N = mg$, поэтому $F_\text{тр} = \mu mg$ — сила трения пропорциональна массе. Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  \fill[pattern=north east lines, pattern color=brandSecondary!50] (-2.0,0) rectangle (2.0,-0.15);
  \draw[thick, brandSecondary] (-2.0,0) -- (2.0,0);
  \draw[thick, fill=brandPrimary!10] (-0.6,0) rectangle (0.6,0.8);
  \fill (0,0.4) circle (1.2pt);
  \draw[Fvec] (0.12,0.4) -- (0.12,1.4) node[above] {$\vec N$};
  \draw[Fvec] (-0.12,0.4) -- (-0.12,-0.6) node[below] {$m\vec g$};
  \draw[Fvec] (-0.6,0.08) -- (-1.5,0.08) node[above, yshift=1pt] {$\vec F_\text{тр}$};
  \draw[vvec] (0.7,1.1) -- (1.6,1.1) node[above] {$\vec v$};
\end{tikzpicture}
```

Масса уменьшилась в $2$ раза при том же $\mu$, значит, и сила трения уменьшилась в $2$ раза:

$$F_\text{тр2} = \frac{20}{2} = 10~\text{Н}.$$
