---
id: oscillations_optics_v26_n25
exam: ЕГЭ
kim: 25
section: Механика
theme: МЕХАНИЧЕСКИЕ КОЛЕБАНИЯ И ВОЛНЫ
topic: 1.5.2
level: Б
type: расчётная (часть 2)
variant: 26
answer: "2"
unit: "см"
has_image: true
author_task: false
tags: [МЕХАНИКА, ОПТИКА]
source: osc.tex
---

## Условие

Математический маятник совершает колебания в плоскости рисунка с амплитудой $A = 1$~см. Равновесное положение нити маятника находится на расстоянии $l = \sqrt{5}$~см от переднего фокуса собирающей линзы. Крайние положения груза маятника лежат на главной оптической оси линзы. Найдите расстояние между изображениями двух крайних положений груза маятника, если оптическая сила линзы равна $50$~дптр.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.2, every node/.style={font=\footnotesize}]
    % Оптическая ось
    \draw[thick] (-3.5,0) -- (3.5,0);
    
    % Линза собирающая
    \draw[thick, <->] (1.5,-1.2) -- (1.5,1.2);
    
    % Фокусы
    \fill[black] (0,0) circle (1.2pt) node[below=2pt] {$F$};
    \fill[black] (3.0,0) circle (1.2pt) node[below=2pt] {$F$};
    
    % Подвес маятника
    \draw[thin] (-1.5,1.5) -- (-1.5,0);
    \fill[black] (-1.5,1.5) circle (1pt);
    \draw[gray, thin] (-1.5,1.5) -- (-1.8,0);
    \draw[gray, thin] (-1.5,1.5) -- (-1.2,0);
    
    % Груз маятника в крайних положениях
    \fill[brandPrimary] (-1.8,0) circle (2.5pt);
    \fill[brandPrimary] (-1.2,0) circle (2.5pt);
    
    % Обозначение расстояний
    \draw[dashed, gray] (-1.5,0) -- (-1.5,-0.6);
    \draw[dashed, gray] (0,0) -- (0,-0.6);
    \draw[<->, >=stealth, thin] (-1.5,-0.5) -- (0,-0.5) node[midway, above] {$l$};
    
    \draw[<->, >=stealth, thin] (-1.8,-0.2) -- (-1.2,-0.2) node[midway, below] {$2A$};
    
    % Потолок подвеса
    \draw[thick] (-1.8,1.5) -- (-1.2,1.5);
    \foreach \x in {-1.7,-1.5,-1.3} \draw (\x,1.5) -- (\x+0.1,1.65);
\end{tikzpicture}
```

## Решение

TODO
