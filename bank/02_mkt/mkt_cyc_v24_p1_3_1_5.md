---
id: mkt_cyc_v24_p1_3_1_5
exam: ЕГЭ
kim: 24
section: МКТ и термодинамика
theme: КПД ТЕПЛОВОЙ МАШИНЫ. КПД ЦИКЛА
topic: 2.6
level: Б
type: расчётная (часть 2)
variant: 
answer: "0,92"
unit: ""
has_image: true
author_task: false
tags: [МКТ, КПД_ЦИКЛА]
source: 2td.tex
---

## Условие

\textbf{Задача.} На рисунке в координатах $p-V$ представлен циклический процесс, проводимый с идеальным одноатомным газом. Давление идеального одноатомного газа изохорно увеличивают в $3$ раза, затем объём газа увеличивают в $4$ раза так, что давление линейно зависит от объёма и возрастает в $1{,}5$ раза. После этого газ возвращают в исходное состояние в процессе, в котором давление линейно зависит от объёма. Определите отношение модуля количества теплоты, отданного газом за цикл холодильнику, к количеству теплоты, полученному за цикл от нагревателя $\frac{|Q_{\text{х}}|}{Q_{\text{н}}}$.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.1, every node/.style={font=\footnotesize}]
    
    
    % Оси координат
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (4.5,0) node[right] {$V$};
    \draw[-{Stealth[scale=0.8]}, black, thick] (0,0) -- (0,5.5) node[above] {$p$};
    
    % Координаты точек: 1=(1,1), 2=(1,3), 3=(4,4.5)
    \coordinate (1) at (1,1);
    \coordinate (2) at (1,3);
    \coordinate (3) at (4,4.5);
    
    % Линии процесса со стрелками по центру
    \draw[ultra thick, brandPrimary, ->, >=stealth] (1) -- (1,2.1);
    \draw[ultra thick, brandPrimary] (1,2.0) -- (2);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (2) -- (2.6,3.8);
    \draw[ultra thick, brandPrimary] (2.5,3.75) -- (3);
    
    \draw[ultra thick, brandPrimary, ->, >=stealth] (3) -- (2.4,2.68);
    \draw[ultra thick, brandPrimary] (2.5,2.75) -- (1);
    
    % Пунктирные линии к осям
    \draw[dashed, gray] (0,1) -- (1,1);
    \draw[dashed, gray] (0,3) -- (1,3);
    \draw[dashed, gray] (0,4.5) -- (3);
    \draw[dashed, gray] (1,0) -- (1,1);
    \draw[dashed, gray] (4,0) -- (3);
    
    % Точки
    \fill[black] (1) circle (1.5pt) node[left=2pt] {1};
    \fill[black] (2) circle (1.5pt) node[above left] {2};
    \fill[black] (3) circle (1.5pt) node[above right] {3};
    
    % Подписи осей
    \node[left] at (0,1) {$p_1$};
    \node[left] at (0,3) {$p_2$};
    \node[left] at (0,4.5) {$p_3$};
    \node[below] at (1,0) {$V_1$};
    \node[below] at (4,0) {$V_3$};
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
