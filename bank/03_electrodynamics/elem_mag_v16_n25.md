---
id: elem_mag_v16_n25
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: МАГНИТНОЕ ПОЛЕ. СИЛА АМПЕРА. СИЛА ЛОРЕНЦА
topic: 3.2.1
level: В
type: расчётная (часть 2)
variant: 16
answer: "1,04"
unit: "Н"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, МАГНЕТИЗМ, СИЛА_АМПЕРА]
source: mag.tex
---

## Условие

Из никелиновой проволоки с удельным сопротивлением $\rho = 42\cdot 10^{-8}\text{ Ом}\cdot\text{м}$ и площадью поперечного сечения $S = 0{,}2\text{ мм}^2$ изготовлен прямоугольный контур $KLMN$ с диагональю $KM$. Стороны прямоугольника $KL = l_1 = 20\text{ см}$ и $LM = l_2 = 15\text{ см}$. Контур подключён за диагональ $KM$ к источнику постоянного напряжения с ЭДС $\mathcal{E} = 3\text{ В}$ и помещён в однородное магнитное поле, вектор магнитной индукции которого параллелен сторонам $KL$ и $NM$ и равен по модулю $0{,}5\text{ Тл}$. Чему равен модуль результирующей сил, с которыми магнитное поле действует на контур? Внутренним сопротивлением источника пренебречь.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    % Вектор индукции поля (влево, параллельно KL и NM) — над контуром
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (4.0,3.35) -- (1.0,3.35);
    \draw[-{Stealth[scale=0.8]}, brandPrimary, thick] (4.0,3.8) -- (1.0,3.8);
    \node[left, brandPrimary] at (1.0,3.575) {$\vec{B}$};
    
    % Прямоугольный контур (KL : LM = 4 : 3)
    \draw[ultra thick, black] (1,1) coordinate (K) -- (3.4,1) coordinate (L) -- (3.4,2.8) coordinate (M) -- (1,2.8) coordinate (N) -- cycle;
    \draw[ultra thick, black] (K) -- (M);
    
    % Подключение к источнику за KM
    \draw[thick, black] (K) -- (1,0.3) -- (2.1,0.3);
    \draw[thick, black] (M) -- (4.1,2.8) -- (4.1,0.3) -- (2.5,0.3);
    \fill[black] (K) circle (1.6pt);
    \fill[black] (M) circle (1.6pt);
    
    % Источник
    \draw[thick, black] (2.1,0.1) -- (2.1,0.5);
    \draw[ultra thick, black] (2.5,0.2) -- (2.5,0.4);
    \node[below=2pt] at (2.3,0.1) {$\mathcal{E}$};
    
    % Подписи вершин
    \node[below left] at (K) {$K$};
    \node[below right] at (L) {$L$};
    \node[above right] at (M) {$M$};
    \node[above left] at (N) {$N$};
\end{tikzpicture}
```

## Решение

Обозначим $l_3$ — длину диагонали $KM$, $R_1$ — сопротивление диагонали, $R_2$ — сопротивление каждой из ветвей $KLM$ и $KNM$, $I_1$, $I_2$ — токи в диагонали и в каждой из ветвей, $B = 0{,}5\,\text{Тл}$.

По теореме Пифагора $l_3 = \sqrt{l_1^2 + l_2^2} = \sqrt{20^2 + 15^2}\,\text{см} = 25\,\text{см}$.

Сопротивление проводника $R = \dfrac{\rho l}{S}$:
$R_1 = \dfrac{\rho l_3}{S} = \dfrac{42\cdot 10^{-8}\cdot 0{,}25}{0{,}2\cdot 10^{-6}}\,\text{Ом} = 0{,}525\,\text{Ом}$, $R_2 = \dfrac{\rho(l_1 + l_2)}{S} = \dfrac{42\cdot 10^{-8}\cdot 0{,}35}{0{,}2\cdot 10^{-6}}\,\text{Ом} = 0{,}735\,\text{Ом}$.

Три ветви $KM$, $KLM$, $KNM$ соединены параллельно, напряжение на каждой равно $\mathcal{E}$ (внутреннего сопротивления нет). По закону Ома для участка цепи
$I_1 = \dfrac{\mathcal{E}}{R_1} = \dfrac{3}{0{,}525}\,\text{А} \approx 5{,}71\,\text{А}$, $I_2 = \dfrac{\mathcal{E}}{R_2} = \dfrac{3}{0{,}735}\,\text{А} \approx 4{,}08\,\text{А}$.

Сила Ампера $F = IBl\sin\alpha$. На стороны $KL$ и $NM$, параллельные $\vec B$, поле не действует. На стороны $LM$ и $KN$ (ток в обеих течёт от стороны $KL$ к стороне $NM$) действуют одинаково направленные силы $I_2Bl_2$. На диагональ действует сила $I_1Bl_3\sin\alpha = I_1Bl_2$, так как $l_3\sin\alpha = l_2$ ($\alpha$ — угол между $KM$ и $\vec B$). Все силы перпендикулярны плоскости контура и направлены в одну сторону, поэтому
$F = (I_1 + 2I_2)Bl_2 = \left(\dfrac{1}{R_1} + \dfrac{2}{R_2}\right)\mathcal{E}Bl_2$.

$F = (5{,}71 + 2\cdot 4{,}08)\cdot 0{,}5\cdot 0{,}15\,\text{Н} \approx 1{,}04\,\text{Н}$.
