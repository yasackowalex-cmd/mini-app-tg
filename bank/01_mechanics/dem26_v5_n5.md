---
id: dem26_v5_n5
exam: ЕГЭ
kim: 5
section: Механика
theme: 
topic: 1.1.3
level: Б
type: соответствие/выбор
variant: 5
answer: "34"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kinem.tex
---

## Условие

Два тела, каждое массой $2$~кг, движутся по одной прямой, вдоль которой направлена ось $Ox$. На рисунке приведены графики зависимости проекций $v_x$ их скоростей от времени $t$. 

Из приведённого ниже списка выберите все верные утверждения о движении тел.
1) Равнодействующая сил, действующих на тело 1, монотонно убывает в течение всего времени наблюдения.
2) В промежутке времени от $0$ до $14$~с тела двигались навстречу друг другу.
3) Кинетическая энергия тела 2 за промежуток времени от $6$ до $14$~с увеличилась в $4$ раза.
4) Путь, пройденный телом 1 за промежуток времени от $0$ до $18$~с, больше пути, пройденного телом 2 за тот же промежуток времени.
5) Модуль импульса тела 2 в момент времени $t=10$~с равен $10$~\text{кг}$\cdot$\text{м/с}.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.25cm, y=0.15cm, every node/.style={font=\footnotesize}]
    \draw[xstep=2, ystep=2, gray!30, thin] (0,0) grid (18,8);
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (20,0) node[right] {$t, \text{ с}$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,9) node[above] {$v_x, \text{ м/с}$};
    \node[left] at (0,8) {$8$};
    \node[left] at (0,6) {$6$};
    \node[left] at (0,4) {$4$};
    \node[left] at (0,2) {$2$};
    \node[below left] at (0,0) {$0$};
    \foreach \x in {2,4,6,8,10,12,14,16,18} \node[below] at (\x,0) {\x};
    \draw[ultra thick, brandPrimary] (0,7) -- (18,3.14) node[right, black] {1};
    \draw[ultra thick, brandAccent] (0,0.5) -- (18,5) node[right, black] {2};
\end{tikzpicture}
```

## Решение

TODO
