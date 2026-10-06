---
id: elem_circuit_diodes_k1_k2
exam: ЕГЭ
kim: 21
section: Электродинамика
theme: СОЕДИНЕНИЕ ПРОВОДНИКОВ. ЗАКОН ОМА ДЛЯ ПОЛНОЙ ЦЕПИ
topic: 3.1.5
level: Б
type: качественная
variant: 
answer: "Показания амперметра уменьшатся до нуля, показания вольтметра увеличатся"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, ТОК, ДИОДЫ]
source: ohm2.tex
---

## Условие

Электрическая цепь состоит из источника ЭДС, двух резисторов сопротивлениями $R_1$ и $R_2$, двух идеальных диодов (сопротивление диода при прямом включении равно нулю, при обратном включении ток через диод равен нулю), двух ключей и идеальных амперметра и вольтметра (см. рисунок). В начальный момент времени ключ $K_1$ разомкнут, а ключ $K_2$ замкнут. Опираясь на законы электродинамики, объясните, как изменятся показания приборов, если ключ $K_1$ замкнуть, а ключ $K_2$ разомкнуть.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[xstep=1, ystep=1, gray!30, thin] (0,0) grid (5,3);
    
    % Внешний контур
    \draw[thick, black] (0.5,0.5) -- (0.5,2.5) -- (4.5,2.5) -- (4.5,0.5) -- cycle;
    
    % Источник тока (слева)
    \fill[white] (0.5,1.0) rectangle (0.5,2.0);
    \draw[thick, black] (0.5,1.0) -- (0.5,1.35);
    \draw[thick, black] (0.2,1.35) -- (0.8,1.35);
    \draw[ultra thick, black] (0.35,1.65) -- (0.65,1.65);
    \draw[thick, black] (0.5,1.65) -- (0.5,2.0);
    \node[left=3pt] at (0.2,1.5) {$\mathcal{E}, r$};
    
    % Вольтметр (параллельно источнику)
    \draw[thick, black] (0.5,2.1) -- (1.5,2.1) -- (1.5,0.9) -- (0.5,0.9);
    \fill[white] (1.5,1.5) circle (0.3);
    \draw[thick, black] (1.5,1.5) circle (0.3) node {V};
    
    % Разветвление на 2 диода
    \draw[thick, black] (2.0,2.5) -- (2.0,1.5) -- (4.5,1.5);
    
    % Верхняя ветвь (D2, K2)
    \draw[thick, black, fill=white] (2.3,2.35) -- (2.3,2.65) -- (2.6,2.5) -- cycle;
    \draw[thick, black] (2.6,2.35) -- (2.6,2.65);
    \node[above] at (2.45,2.65) {$D_2$};
    \fill[black] (2.9,2.5) circle (1.2pt);
    \fill[black] (3.4,2.5) circle (1.2pt);
    \draw[thick, black] (2.9,2.5) -- (3.3,2.7);
    \node[above] at (3.15,2.7) {$K_2$};
    
    % Нижняя ветвь (D1, K1, R2)
    \draw[thick, black, fill=white] (2.6,1.35) -- (2.6,1.65) -- (2.3,1.5) -- cycle;
    \draw[thick, black] (2.3,1.35) -- (2.3,1.65);
    \node[below] at (2.45,1.35) {$D_1$};
    \fill[black] (2.8,1.5) circle (1.2pt);
    \fill[black] (3.2,1.5) circle (1.2pt);
    \draw[thick, black] (2.8,1.5) -- (3.1,1.7);
    \node[below] at (3.0,1.35) {$K_1$};
    \draw[thick, black, fill=white] (3.5,1.3) rectangle (4.2,1.7) node[pos=.5] {$R_2$};
    
    % Амперметр (справа)
    \fill[white] (4.5,1.0) circle (0.3);
    \draw[thick, black] (4.5,1.0) circle (0.3) node {A};
    
    % Резистор R1 (снизу)
    \draw[thick, black, fill=white] (2.5,0.3) rectangle (3.5,0.7) node[pos=.5] {$R_1$};
    
    \node[below left] at (0,0) {0};
\end{tikzpicture}
```

## Решение

TODO
