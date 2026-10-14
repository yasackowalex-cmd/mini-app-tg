---
id: mechanics_v9_n26_fixed
exam: ЕГЭ
kim: 26
section: Механика
theme: МЕХАНИКА (ВЫСОКИЙ УРОВЕНЬ СЛОЖНОСТИ)
topic: 1.4.1
level: В
type: расчётная (часть 2)
variant: 9
answer: "3"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim22,26.tex
---

## Условие

Однородный брусок $AB$ массой $M$ постоянного прямоугольного сечения лежит на гладкой горизонтальной поверхности стола, свешиваясь с него менее чем наполовину (см. рисунок). К правому концу бруска прикреплена невесомая нерастяжимая нить. Другой конец нити закреплён на меньшем из двух дисков невесомого составного блока. На большем диске этого блока закреплена другая невесомая нерастяжимая нить, на которой висит груз массой $m$. Диски скреплены друг с другом и образуют единое целое, $R = 12\text{ см}$, $r = 8\text{ см}$. Найдите минимальное значение отношения $\frac{M}{m}$, при котором система тел остаётся неподвижной. Трением в оси блока пренебречь. Сделайте рисунок, на котором укажите все силы, действующие на брусок, груз и блок. Обоснуйте применимость законов, используемых для решения задачи.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[>=Stealth, scale=1.2]
    % --- Поверхность стола со штриховкой ---
    \fill[pattern=north west lines, pattern color=brandSecondary!30] (0,-0.2) rectangle (4,0);
    \fill[pattern=north west lines, pattern color=brandSecondary!30] (3.8,-1.2) rectangle (4,0);
    \draw[thick, color=brandSecondary] (0,0) -- (4,0) -- (4,-1.2);

    % --- Брусок AB ---
    \draw[thick, fill=white, color=brandSecondary] (0.6,0) rectangle (4.6,0.2);
    \node[above left, inner sep=1pt, font=\footnotesize] at (0.6,0.2) {$A$};
    \node[above right, inner sep=1pt, font=\footnotesize] at (4.6,0.2) {$B$};
    \node[above, font=\footnotesize] at (2.6,0.2) {$M$};

    % --- Составной блок ---
    \coordinate (O) at (5.2, 2.2);
    % Большой диск R
    \draw[thick, color=brandSecondary] (O) circle (1.2);
    % Меньший диск r (левый край касается линии x = 4.6)
    \draw[thick, color=brandSecondary] (O) circle (0.6);
    \fill[color=brandSecondary] (O) circle (1.5pt);

    % Подвес блока к потолку
    \fill[pattern=north west lines, pattern color=brandSecondary!30] (4.8,3.5) rectangle (5.6,3.7);
    \draw[thick, color=brandSecondary] (4.8,3.5) -- (5.6,3.5);
    \draw[thick, color=brandSecondary] (4.9,2.2) -- (4.9,3.5) -- (5.5,3.5) -- (5.5,2.2);

    % --- Нити ---
    % Левая нить (от бруска к малому диску)
    \draw[thick, color=brandSecondary] (4.6,0.2) -- (4.6,2.2);
    % Правая нить (от большого диска к грузу m)
    \draw[thick, color=brandSecondary] (6.4,2.2) -- (6.4,0.8);

    % --- Груз m ---
    \draw[thick, fill=white, color=brandSecondary] (6.1,0.2) rectangle (6.7,0.8);
    \node[right] at (6.7,0.5) {$m$};

    % --- Указатели радиусов (как на исходном рисунке) ---
    \draw[thin, <-] (4.95,2.5) -- (4.2,2.8) node[left, font=\footnotesize] {$r$};
    \draw[thin, <-] (4.4,1.4) -- (3.9,1.1) node[left, font=\footnotesize] {$R$};

    % --- ВЕКТОРЫ СИЛ (выделены brandPrimary) ---
    % На груз m
    \draw[->, very thick, color=brandPrimary] (6.4,0.5) -- (6.4,1.1) node[right] {$\vec{T}_2$};
    \draw[->, very thick, color=brandPrimary] (6.4,0.5) -- (6.4,-0.2) node[right] {$m\vec{g}$};

    % На блок
    \draw[->, very thick, color=brandPrimary] (4.6,2.2) -- (4.6,1.6) node[left] {$\vec{T}'_1$};
    \draw[->, very thick, color=brandPrimary] (6.4,2.2) -- (6.4,1.6) node[right] {$\vec{T}'_2$};
    \draw[->, very thick, color=brandPrimary] (O) -- (5.2, 2.9) node[right] {$\vec{F}_{\text{оси}}$};

    % На брусок
    \draw[->, very thick, color=brandPrimary] (4.6,0.2) -- (4.6,0.9) node[left] {$\vec{T}_1$};
    \draw[->, very thick, color=brandPrimary] (2.6,0.1) -- (2.6,-0.5) node[right] {$M\vec{g}$};
    \draw[->, very thick, color=brandPrimary] (2.0,0.0) -- (2.0,0.6) node[left] {$\vec{N}$};

\end{tikzpicture}
```

## Решение

\textbf{Обоснование}

1. Задачу будем решать в инерциальной системе отсчёта, связанной с Землёй.

2. Груз будем считать материальной точкой, брусок — твёрдым телом. Тела покоятся, поэтому для груза сумма действующих на него сил равна нулю, а для бруска равны нулю и сумма сил, и сумма моментов сил относительно любой оси.

3. Так как нити невесомы, силы натяжения на концах каждой нити одинаковы по модулю: $T_1 = T_1'$, $T_2 = T_2'$ (1)

4. Так как блок невесомый и трения в его оси нет, сумма моментов сил, действующих на блок, относительно его оси равна нулю (диски скреплены и образуют единое целое): $T_1'r = T_2'R$ (2)

5. Стол гладкий, поэтому все силы, действующие на брусок, вертикальны.

\textbf{Решение}

1. На груз действуют сила тяжести $m\vec g$ и сила натяжения $\vec T_2$; на блок — силы натяжения $\vec T_1'$ (плечо $r$), $\vec T_2'$ (плечо $R$) и сила со стороны оси $\vec F_\text{оси}$; на брусок — сила тяжести $M\vec g$ (в середине бруска), сила натяжения $\vec T_1$ (вверх, в точке $B$) и сила реакции стола $\vec N$ (вверх). Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % стол
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.4,-0.15) rectangle (2.0,0);
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (1.85,-0.9) rectangle (2.0,0);
  \draw[thick, brandSecondary] (-0.4,0) -- (2.0,0) -- (2.0,-0.9);
  % брусок
  \draw[thick, fill=brandPrimary!10] (0,0) rectangle (3.0,0.25);
  \node[left] at (0,0.15) {$A$};
  \node[below right, inner sep=1pt] at (3.0,0) {$B$};
  % блок
  \coordinate (O) at (3.4,2.4);
  \draw[thick, gray] (3.4,2.4) -- (3.4,3.7);
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (3.0,3.7) rectangle (3.8,3.85);
  \draw[thick, brandSecondary] (3.0,3.7) -- (3.8,3.7);
  \draw[thick, fill=gray!10] (O) circle (0.6);
  \draw[thick, fill=gray!25] (O) circle (0.4);
  \fill (O) circle (1.2pt);
  \draw[thin] (O) -- (3.0,2.4); \node[above, font=\footnotesize, inner sep=1pt] at (3.17,2.4) {$r$};
  \draw[thin] (O) -- (4.0,2.4); \node[above, font=\footnotesize, inner sep=1pt] at (3.72,2.4) {$R$};
  % нити и груз
  \draw[thick] (3.0,0.25) -- (3.0,2.4);
  \draw[thick] (4.0,2.4) -- (4.0,0.6);
  \draw[thick, fill=brandAccent!20] (3.75,0.1) rectangle (4.25,0.6);
  \node[right] at (4.25,0.35) {$m$};
  % силы на брусок
  \draw[Fvec] (3.0,0.25) -- (3.0,0.95) node[left] {$\vec T_1$};
  \draw[Fvec] (1.5,0.12) -- (1.5,-0.7) node[below] {$M\vec g$};
  \fill (1.5,0.12) circle (1pt);
  \draw[Fvec] (0.6,0) -- (0.6,0.75) node[above] {$\vec N$};
  % силы на блок
  \draw[Fvec] (3.0,2.4) -- (3.0,1.8) node[left] {$\vec T_1'$};
  \draw[Fvec] (4.0,2.4) -- (4.0,1.85) node[right] {$\vec T_2'$};
  \draw[Fvec] (O) -- (3.4,3.25) node[right] {$\vec F_\text{оси}$};
  % силы на груз
  \draw[Fvec] (4.0,0.6) -- (4.0,1.15) node[right] {$\vec T_2$};
  \draw[Fvec] (4.0,0.35) -- (4.0,-0.4) node[right] {$m\vec g$};
\end{tikzpicture}
```

Условие равновесия груза: $T_2 = mg$. С учётом (1) и (2) получим: $T_1 = T_1' = T_2'\dfrac{R}{r} = mg\dfrac{R}{r}$.

2. Обозначим $L$ — длину бруска, $x$ — расстояние от конца $A$ до точки приложения равнодействующей сил реакции стола ($x \ge 0$, точка лежит на опирающейся о стол части бруска). Правило моментов для бруска относительно оси, проходящей через точку $A$:
$Nx + T_1L = Mg\dfrac{L}{2}$.

Так как $N \ge 0$ и $x \ge 0$, равновесие возможно только при $T_1L \le Mg\dfrac{L}{2}$, т. е. $T_1 \le \dfrac{Mg}{2}$; иначе брусок повернётся вокруг конца $A$ и его правый конец поднимется. (При $T_1 \le \dfrac{Mg}{2}$ из условия равновесия сил $N = Mg - T_1 > 0$ и $x = \dfrac{L(Mg/2 - T_1)}{Mg - T_1} \le \dfrac{L}{2}$, т. е. точка приложения $\vec N$ лежит над столом, ведь брусок свешивается менее чем наполовину.)

3. Подставляя $T_1$: $mg\dfrac{R}{r} \le \dfrac{Mg}{2}$, откуда $\dfrac{M}{m} \ge \dfrac{2R}{r}$, и $\left(\dfrac{M}{m}\right)_{\min} = \dfrac{2R}{r} = \dfrac{2\cdot 12}{8} = 3$.

Ответ: $\left(\dfrac{M}{m}\right)_{\min} = 3$.
