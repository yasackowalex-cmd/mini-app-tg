---
id: oscillations_v1_n6
exam: ЕГЭ
kim: 6
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5.2
level: Б
type: соответствие/выбор
variant: 1
answer: "31"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА]
source: osc.tex
---

## Условие

Груз, привязанный к длинной нерастяжимой нити, отклонили от положения равновесия на малый угол и в момент времени $t = 0$ отпустили с нулевой начальной скоростью (см. рисунок).

[[рис 1]]

На графиках А и Б показано изменение физических величин, характеризующих движение груза после этого. $T$ — период колебаний. Сопротивлением воздуха пренебречь. Потенциальная энергия груза отсчитывается от положения равновесия.

Установите соответствие между графиками и физическими величинами, зависимость которых от времени эти графики могут представлять.

К каждой позиции первого столбца подберите соответствующую позицию из второго столбца.

\begin{center}
\begin{tabular}{|c|l|}
\hline
\textbf{ГРАФИКИ} & \textbf{ФИЗИЧЕСКИЕ ВЕЛИЧИНЫ} \\ \hline
[[рис 2]] &
1) проекция скорости~$v_x$
2) координата~$x$
3) проекция ускорения~$a_x$
4) потенциальная энергия груза~$E_{\text{п}}$ \\ \hline
\end{tabular}
\end{center}

Запишите в таблицу выбранные цифры под соответствующими буквами.

\begin{center}
\begin{tabular}{|c|c|}
\hline
А & Б \\ \hline
 & \\ \hline
\end{tabular}
\end{center}

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.8, every node/.style={font=\footnotesize}]
    \fill[pattern=north east lines] (-0.9,2.5) rectangle (0.9,2.7);
    \draw[thick] (-0.9,2.5) -- (0.9,2.5);
    \draw[dashed] (0,2.5) -- (0,0.2);
    \draw[thick] (0,2.5) -- (-0.75,0.55);
    \fill[gray!50] (-0.75,0.4) circle (0.17);
    \draw[thick] (-0.75,0.4) circle (0.17);
    \draw[-{Stealth[scale=0.8]}] (-1.5,-0.2) -- (1.5,-0.2) node[right] {$x$};
    \draw (0,-0.12) -- (0,-0.28);
    \node[below] at (0,-0.25) {0};
\end{tikzpicture}
```

```latex
\begin{tikzpicture}[scale=0.62, every node/.style={font=\footnotesize}]
  \begin{scope}
    \node at (-0.7,1.6) {А)};
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.6,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,1.8);
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.2*cos(\x*180/2)});
    \draw (4,-0.08) -- (4,0.08);
    \node[below] at (4,-0.05) {$T$};
    \node[below left] at (0,0) {0};
  \end{scope}
  \begin{scope}[yshift=-4cm]
    \node at (-0.7,1.6) {Б)};
    \draw[-{Stealth[scale=0.7]}] (0,0) -- (4.6,0) node[right] {$t$};
    \draw[-{Stealth[scale=0.7]}] (0,-1.5) -- (0,1.8);
    \draw[ultra thick, brandPrimary] plot[domain=0:4, samples=100] (\x, {1.0*sin(\x*180/2)});
    \draw (4,-0.08) -- (4,0.08);
    \node[above] at (4,0.05) {$T$};
    \node[below left] at (0,0) {0};
  \end{scope}
\end{tikzpicture}
```

## Решение

Груз отклонили против оси $Ox$ и отпустили без начальной скорости, поэтому $x(t) = -A\cos\dfrac{2\pi t}{T}$: в начальный момент $x = -A$.

А) Проекция ускорения $a_x = -\omega^2 x = \omega^2 A\cos\dfrac{2\pi t}{T}$: в начальный момент максимальна и положительна, график — «плюс косинус» (3). Это не потенциальная энергия: $E_\text{п} \ge 0$, а график А уходит в отрицательные значения, к тому же $E_\text{п}$ меняется с периодом $T/2$.

Б) Проекция скорости $v_x = \omega A\sin\dfrac{2\pi t}{T}$: в начальный момент равна нулю, затем положительна — груз движется к положению равновесия по оси $Ox$ (1).
