---
id: mechanics_v1_n26
exam: ЕГЭ
kim: 26
section: Механика
theme: МЕХАНИКА (ВЫСОКИЙ УРОВЕНЬ СЛОЖНОСТИ)
topic: 1.4.1
level: В
type: расчётная (часть 2)
variant: 1
answer: "3,13"
unit: "кг"
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: kim22,26.tex
---

## Условие

Тонкий однородный стержень $AB$ постоянного сечения шарнирно закреплён в точке $A$ и удерживается горизонтальной нитью $BC$ (см. рисунок), угол наклона стержня к горизонту $\alpha = 45^{\circ}$. Трение в шарнире пренебрежимо мало. Найдите массу стержня $m$, если модуль силы $F$, с которой шарнир действует на стержень, равен $35$~Н. Сделайте рисунок, на котором укажите все силы, действующие на стержень. Обоснуйте применимость законов, используемых для решения задачи.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.3, every node/.style={font=\footnotesize}]
    % Вертикальная стена
    \draw[thick] (0,0) -- (0,3.2);
    \foreach \y in {0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0}
        \draw[gray, thin] (0,\y) -- (-0.12,\y+0.12);
        
    % Горизонтальный пол
    \draw[thick] (0,0) -- (3.2,0);
    \foreach \x in {0.2,0.4,0.6,0.8,1.0,1.2,1.4,1.6,1.8,2.0,2.2,2.4,2.6,2.8,3.0}
        \draw[gray, thin] (\x,0) -- (\x-0.12,-0.12);

    % Координаты
    \coordinate (A) at (1.2,0.4);
    \coordinate (B) at (2.6,1.8);
    \coordinate (C) at (0,1.8);

    % Шарнир А
    \draw[thick] (1.0,0) -- (A) -- (1.4,0);
    \fill[black] (A) circle (1.5pt) node[left=3pt] {$A$};

    % Стержень
    \begin{scope}[shift={(A)}, rotate=45]
        \draw[thick, fill=white] (0,-0.05) rectangle (1.98,0.05);
    \end{scope}
    \fill[black] (B) circle (1.5pt) node[above right] {$B$};

    % Нить BC
    \draw[thick] (C) -- (B);
    \node[above right] at (C) {$C$};

    % Угол альфа
    \draw[dashed, thin] (A) -- (2.2,0.4);
    \draw (1.6,0.4) arc (0:45:0.4);
    \node at (1.8,0.58) {$\alpha$};
\end{tikzpicture}
```

## Решение

\textbf{Обоснование.} Систему отсчёта, связанную с Землёй, считаем инерциальной. Стержень — твёрдое тело, находящееся в равновесии, поэтому векторная сумма действующих на него сил равна нулю и сумма моментов сил относительно любой оси (в частности, относительно оси шарнира $A$) равна нулю. Стержень однородный, поэтому сила тяжести приложена к его середине. Нить невесома, сила её натяжения направлена вдоль нити, т.е. горизонтально. Трения в шарнире нет, поэтому момент силы реакции шарнира относительно оси $A$ равен нулю.

\textbf{Решение.} На стержень действуют сила тяжести $m\vec g$ (в середине стержня), сила натяжения нити $\vec T$ (в точке $B$, горизонтально к стене) и сила $\vec F$ со стороны шарнира. Обозначим $L$ — длину стержня, $F_x$, $F_y$ — горизонтальную и вертикальную составляющие силы $\vec F$.

Силы показаны на рисунке.

```latex
\begin{tikzpicture}[scale=1.0, font=\small]
  % стена и пол
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.15,0) rectangle (0,2.8);
  \fill[pattern=north east lines, pattern color=brandSecondary!40] (-0.15,-0.15) rectangle (3.4,0);
  \draw[thick, brandSecondary] (0,2.8) -- (0,0) -- (3.4,0);
  % шарнир и стержень
  \coordinate (A) at (1.2,0.5);
  \coordinate (B) at (3.0,2.3);
  \draw[thick] (1.0,0) -- (A) -- (1.4,0);
  \draw[line width=3pt, brandPrimary!35] (A) -- (B);
  \draw[thick, fill=white] (A) circle (2pt);
  \node[left, xshift=-2pt] at (A) {$A$};
  \node[above right, inner sep=1pt] at (B) {$B$};
  % нить
  \draw[thick] (0,2.3) -- (B);
  \node[above right, inner sep=1pt] at (0,2.3) {$C$};
  % угол
  \draw[dashed, thin] (A) -- (2.1,0.5);
  \draw (1.65,0.5) arc (0:45:0.45);
  \node at (1.85,0.65) {$\alpha$};
  % силы
  \draw[Fvec] (B) -- (2.4,2.3) node[above] {$\vec T$};
  \draw[Fvec] (2.1,1.4) -- (2.1,0.2) node[right] {$m\vec g$};
  \fill (2.1,1.4) circle (1.2pt);
  \draw[dashed, -{Stealth[scale=0.7]}, brandSecondary] (A) -- (1.8,0.5);
  \node[below] at (1.75,0.5) {$F_x$};
  \draw[dashed, -{Stealth[scale=0.7]}, brandSecondary] (A) -- (1.2,1.7);
  \node[left] at (1.2,1.35) {$F_y$};
  \draw[dashed, thin, gray] (1.2,1.7) -- (1.8,1.7) -- (1.8,0.5);
  \draw[Fvec] (A) -- (1.8,1.7) node[above] {$\vec F$};
\end{tikzpicture}
```

Правило моментов относительно оси $A$: $TL\sin\alpha = mg\dfrac{L}{2}\cos\alpha$, откуда $T = \dfrac{mg}{2\,\mathrm{tg}\,\alpha} = \dfrac{mg}{2}$ (так как $\mathrm{tg}\,45^\circ = 1$).

Равенство нулю суммы сил: по горизонтали $F_x = T = \dfrac{mg}{2}$, по вертикали $F_y = mg$.

Модуль силы шарнира: $F = \sqrt{F_x^2 + F_y^2} = mg\sqrt{\dfrac{1}{4} + 1} = \dfrac{\sqrt{5}}{2}mg$.

Отсюда $m = \dfrac{2F}{\sqrt{5}g} = \dfrac{2\cdot 35}{2{,}236\cdot 10}\,\text{кг} \approx 3{,}13\,\text{кг}$.

Ответ: $m \approx 3{,}13\,\text{кг}$.
