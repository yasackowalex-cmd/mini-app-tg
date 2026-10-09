---
id: 2td_t7
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: Б
type: расчётная (часть 2)
variant: 28
answer: "4\%"
unit: ""
has_image: true
author_task: false
tags: [МКТ, КПД]
source: 2td.tex
---

## Условие

\textbf{12.} На рисунке в координатах $p$--$V$ представлен циклический процесс, проводимый с идеальным одноатомным газом. Давление газа изохорно увеличивают в $2$ раза, затем объём газа увеличивают в $5$ раз так, что давление линейно зависит от объёма и возрастает в $2{,}5$ раза. После этого газ возвращают в исходное состояние в процессе, в котором давление линейно зависит от объёма. Определите коэффициент полезного действия теплового двигателя, работающего по этому циклу. Количество вещества газа постоянно.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[>=Stealth,scale=0.95,font=\small]
  \draw[-{Stealth[scale=0.8]},thick] (0,0)--(0,4.2) node[left]{$p$};
  \draw[-{Stealth[scale=0.8]},thick] (0,0)--(4.8,0) node[below]{$V$};
  \node[below left] at (0,0){0};
  \draw[thin,dashed,gray] (1,0)--(1,2) (4,0)--(4,3.6) (0,0.8)--(1,0.8) (0,2)--(1,2) (0,3.6)--(4,3.6);
  \node[below] at (1,0){$V_1$};\node[below] at (4,0){$V_3$};
  \node[left] at (0,0.8){$p_1$};\node[left] at (0,2){$p_2$};\node[left] at (0,3.6){$p_3$};
  \draw[ultra thick,brandPrimary] (1,0.8)--(1,2)--(4,3.6)--cycle;
  \draw[-{Stealth[scale=1.1]},ultra thick,brandPrimary] (1,0.8)--(1,1.5);
  \draw[-{Stealth[scale=1.1]},ultra thick,brandPrimary] (1,2)--(2.6,2.85);
  \draw[-{Stealth[scale=1.1]},ultra thick,brandPrimary] (4,3.6)--(2.35,2.06);
  \fill (1,0.8) circle (1.5pt) node[below right]{1};
  \fill (1,2) circle (1.5pt) node[above left]{2};
  \fill (4,3.6) circle (1.5pt) node[above right]{3};
\end{tikzpicture}
```

## Решение

TODO
