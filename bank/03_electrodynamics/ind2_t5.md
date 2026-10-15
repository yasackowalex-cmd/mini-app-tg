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
answer: "59"
unit: "мкДж"
has_image: true
author_task: false
tags: []
source: ind2.tex
---

## Условие

Квадратная рамка из медного провода с площадью поперечного сечения
$S_0=0{,}1$~мм$^2$ помещена в однородное поле электромагнита. На рисунке приведён график зависимости
от времени $t$ для проекции $B_n$ вектора индукции этого поля на перпендикуляр к плоскости рамки.
Какое количество теплоты выделяется в рамке за время $\tau=4$~с? Длина стороны рамки $l=10$~см.
Удельное сопротивление меди $\rho=1{,}7\cdot10^{-8}$~Ом$\cdot$м.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[x=0.95cm, y=7cm, font=\small, >=Stealth]
  \foreach \t in {1,2,3,4,5}{\draw[gray!35,thin] (\t,-0.25) -- (\t,0.35);}
  \foreach \b in {-0.2,-0.1,0.1,0.2,0.3}{\draw[gray!35,thin] (0,\b) -- (5.6,\b);}
  \draw[-{Stealth[scale=0.8]},thick] (0,0) -- (6.2,0) node[below right] {$t$, с};
  \draw[-{Stealth[scale=0.8]},thick] (0,-0.28) -- (0,0.40) node[above] {$B_n$, Тл};
  \draw[ultra thick,brandPrimary] (0,0.3) -- (5,-0.2);
  \foreach \t in {1,2,4,5}{\node[below,font=\footnotesize] at (\t,0) {\t};}
  \node[below right,font=\footnotesize] at (3,0) {3};
  \foreach \b/\lab in {0.3/{$0{,}3$},0.2/{$0{,}2$},0.1/{$0{,}1$},-0.1/{$-0{,}1$},-0.2/{$-0{,}2$}}{
    \node[left,font=\footnotesize] at (0,\b) {\lab};}
  \node[below left,font=\footnotesize] at (0,0) {0};
\end{tikzpicture}
```

## Решение

По графику индукция меняется линейно: от $0{,}3\,\text{Тл}$ при $t = 0$ до $-0{,}2\,\text{Тл}$ при $t = 5\,\text{с}$, т. е. скорость её изменения постоянна: $\left|\dfrac{\Delta B_n}{\Delta t}\right| = \dfrac{0{,}5}{5}\,\text{Тл/с} = 0{,}1\,\text{Тл/с}$.

Магнитный поток через рамку $\Phi = B_nl^2$. По закону электромагнитной индукции ЭДС индукции $\mathcal{E} = \left|\dfrac{\Delta\Phi}{\Delta t}\right| = l^2\left|\dfrac{\Delta B_n}{\Delta t}\right|$ — постоянна, поэтому постоянна и сила тока.

Сопротивление рамки (длина провода $4l$): $R = \rho\dfrac{4l}{S_0}$.

По закону Джоуля — Ленца количество теплоты $Q = \dfrac{\mathcal{E}^2}{R}\tau = \dfrac{l^4\left(\dfrac{\Delta B_n}{\Delta t}\right)^2S_0\tau}{4\rho l} = \dfrac{l^3S_0\tau}{4\rho}\left(\dfrac{\Delta B_n}{\Delta t}\right)^2$.

$\mathcal{E} = 0{,}1^2\cdot 0{,}1\,\text{В} = 10^{-3}\,\text{В}$, $R = \dfrac{1{,}7\cdot 10^{-8}\cdot 0{,}4}{0{,}1\cdot 10^{-6}}\,\text{Ом} = 0{,}068\,\text{Ом}$,

$Q = \dfrac{(10^{-3})^2\cdot 4}{0{,}068}\,\text{Дж} \approx 5{,}9\cdot 10^{-5}\,\text{Дж} = 59\,\text{мкДж}$.

Ответ: $Q \approx 59\,\text{мкДж}$.
