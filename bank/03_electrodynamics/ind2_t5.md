---
id: ind2_t5
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: 
topic: 3.2.2
level: В
type: расчётная (часть 2)
variant: 
answer: "59 мкДж"
unit: ""
has_image: true
author_task: false
tags: []
source: ind2.tex
---

## Условие

\textbf{5.} Квадратная рамка из медного провода с площадью поперечного сечения
$S_0=0{,}1$~мм$^2$ помещена в однородное поле электромагнита. На рисунке приведён график зависимости
от времени $t$ для проекции $B_n$ вектора индукции этого поля на перпендикуляр к плоскости рамки.
Какое количество теплоты выделяется в рамке за время $\tau=4$~с? Длина стороны рамки $l=10$~см.
Удельное сопротивление меди $\rho=1{,}7\cdot10^{-8}$~Ом$\cdot$м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.95cm, y=3.1cm, font=\small, >=Stealth]
  \foreach \t in {1,2,3,4,5}{\draw[gray!35,thin] (\t,-0.25) -- (\t,0.35);}
  \foreach \b in {-0.2,-0.1,0.1,0.2,0.3}{\draw[gray!35,thin] (0,\b) -- (5.6,\b);}
  \draw[-{Stealth[scale=0.8]},thick] (0,0) -- (6.2,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]},thick] (0,-0.28) -- (0,0.40) node[above] {$B_n$, Тл};
  \draw[ultra thick,brandPrimary] (0,0.3) -- (5,-0.2);
  \foreach \t in {1,2,4,5}{\node[below,font=\footnotesize] at (\t,0) {\t};}
  \foreach \b/\lab in {0.3/{0,3},0.2/{0,2},0.1/{0,1},-0.1/{-0,1},-0.2/{-0,2}}{
    \node[left,font=\footnotesize] at (0,\b) {\lab};}
  \node[below left,font=\footnotesize] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
