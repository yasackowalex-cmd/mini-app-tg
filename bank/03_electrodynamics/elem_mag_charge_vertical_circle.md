---
id: elem_mag_charge_vertical_circle
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: Б
type: расчётная (часть 2)
variant: 7
answer: "\dfrac{m(5gL - v_{\text{н}}^2)}{BL\sqrt{v_{\text{н}}^2 - 4gL}}"
unit: ""
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_ЛОРЕНЦА]
source: mag.tex
---

## Условие

Маленькое положительно заряженное тело массой $m$, прикреплённое к невесомой нерастяжимой нити длиной $L$, может двигаться по окружности в вертикальной плоскости. Система находится в однородном магнитном поле, вектор магнитной индукции $\vec{B}$ которого перпендикулярен плоскости движения тела и направлен так, как показано на рисунке. Модуль наименьшей скорости тела в нижней точке, при которой тело совершает полный оборот по окружности, равен $v_{\text{н}}$. Модуль индукции магнитного поля равен $B$. Найдите заряд тела.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Ось/точка подвеса O
    \fill[black] (2.5,2.5) circle (1.5pt) node[above right] {$O$};
    
    % Нить L
    \draw[thick, black] (2.5,2.5) -- (2.5,0.8);
    \node[right] at (2.5,1.65) {$L$};
    
    % Груз m
    \fill[black] (2.5,0.8) circle (3pt) node[below left] {$m$};
    
    % Вектор v_н (вправо)
    \draw[-{Stealth[scale=0.8]}, thick, black] (2.5,0.8) -- (3.5,0.8) node[below] {$\vec{v}_{\text{н}}$};
    
    % Вектор B (на нас)
    \draw[thick, black] (1.2,2.0) circle (0.15);
    \fill[black] (1.2,2.0) circle (1.5pt);
    \node[below=2pt] at (1.2,1.85) {$\vec{B}$};
    
\end{tikzpicture}
```

## Решение

Обозначим $q$ — заряд тела, $v_\text{в}$ — скорость тела в верхней точке, $T$ — сила натяжения нити.

Сила Лоренца $\vec F_\text{Л}$ перпендикулярна скорости и работы не совершает, натяжение нити тоже перпендикулярно скорости. Поэтому по закону сохранения механической энергии (нижнюю точку примем за нулевой уровень)
$\dfrac{mv_\text{н}^2}{2} = \dfrac{mv_\text{в}^2}{2} + mg\cdot 2L$, откуда $v_\text{в}^2 = v_\text{н}^2 - 4gL$.

По правилу левой руки для положительного заряда: в нижней точке ($\vec v$ вправо, $\vec B$ на нас) сила Лоренца направлена вниз, а в верхней точке, где скорость направлена влево, — вверх, т.е. от центра окружности. Её модуль $F_\text{Л} = qv_\text{в}B$.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % поле «на нас»
  \draw[brandPrimary] (-1.9,1.4) circle (0.12); \fill[brandPrimary] (-1.9,1.4) circle (1.3pt);
  \node[brandPrimary, below=2pt] at (-1.9,1.28) {$\vec B$};
  % окружность и нить
  \draw[gray, dashed] (0,0) circle (1.4);
  \fill (0,0) circle (1.3pt) node[left] {$O$};
  \draw[thick] (0,0) -- (0,1.4);
  % тело в верхней точке
  \fill[brandAccent] (0,1.4) circle (2.5pt);
  \draw[vvec] (0,1.4) -- (-0.9,1.4) node[above] {$\vec v_\text{в}$};
  \draw[Fvec] (0,1.4) -- (0,2.25) node[above] {$\vec F_\text{Л}$};
  \draw[Fvec] (-0.15,1.4) -- (-0.15,0.75) node[left] {$\vec T$};
  \draw[Fvec] (0.15,1.4) -- (0.15,0.45) node[right] {$m\vec g$};
  % ось
  \draw[-{Stealth[scale=0.7]}] (1.6,1.6) -- (1.6,0.9) node[below] {$y$};
  % тело в нижней точке
  \fill[brandAccent] (0,-1.4) circle (2.5pt);
  \draw[vvec] (0,-1.4) -- (0.9,-1.4) node[below] {$\vec v_\text{н}$};
\end{tikzpicture}
```

Второй закон Ньютона для верхней точки в проекции на ось, направленную вниз (к центру):
$mg + T - qv_\text{в}B = \dfrac{mv_\text{в}^2}{L}$.

Скорость в нижней точке минимальна, если в верхней точке нить только-только остаётся натянутой: $T = 0$. Тогда
$qv_\text{в}B = mg - \dfrac{mv_\text{в}^2}{L}$, $q = \dfrac{m(gL - v_\text{в}^2)}{BLv_\text{в}}$.

Подставим $v_\text{в}^2 = v_\text{н}^2 - 4gL$:
$q = \dfrac{m(5gL - v_\text{н}^2)}{BL\sqrt{v_\text{н}^2 - 4gL}}$.

Ответ: $q = \dfrac{m(5gL - v_\text{н}^2)}{BL\sqrt{v_\text{н}^2 - 4gL}}$.
