---
id: elem_osc_v1_n23
exam: ЕГЭ
kim: 25
section: Электродинамика
theme: КОЛЕБАТЕЛЬНЫЙ КОНТУР
topic: 3.2.3
level: Б
type: расчётная (часть 2)
variant: 1
answer: "2"
unit: "мкФ"
has_image: true
author_task: false
tags: [ЭЛЕКТРОДИНАМИКА, КОЛЕБАНИЯ, КОЛЕБАТЕЛЬНЫЙ_КОНТУР]
source: LC.tex
---

## Условие

В идеальном колебательном контуре напряжение между обкладками конденсатора меняется по закону $U_C = 0{,}2 \cdot \sin(5000t + \pi)$ (все величины в СИ). Максимальное значение силы тока в контуре $I_{\max} = 2\text{ мА}$. Определите электроёмкость конденсатора. Ответ выразите в микрофарадах (мкФ).

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1.0, every node/.style={font=\footnotesize}]
    \draw[thick, black] (0.5,0.5) -- (0.5,1.5) -- (2.5,1.5) -- (2.5,0.5) -- cycle;
    
    % Катушка L (слева)
    \fill[white] (0.5,0.7) rectangle (0.5,1.3);
    \draw[thick, black] (0.5,0.5) -- (0.5,0.7);
    \draw[thick, black] (0.5,0.7) arc (-90:90:0.1) arc (-90:90:0.1) arc (-90:90:0.1);
    \draw[thick, black] (0.5,1.3) -- (0.5,1.5);
    \node[left=2pt] at (0.5,1.0) {$L$};
    
    % Конденсатор C (справа)
    \fill[white] (2.5,0.8) rectangle (2.5,1.2);
    \draw[thick, black] (2.5,0.5) -- (2.5,0.9);
    \draw[ultra thick, black] (2.2,0.9) -- (2.8,0.9);
    \draw[ultra thick, black] (2.2,1.1) -- (2.8,1.1);
    \draw[thick, black] (2.5,1.1) -- (2.5,1.5);
    \node[right=2pt] at (2.5,1.0) {$C$};
    
\end{tikzpicture}
```

## Решение

Из закона изменения напряжения: амплитуда напряжения $U_{\max} = 0{,}2\,\text{В}$, циклическая частота $\omega = 5000\,\text{рад/с}$.

Заряд конденсатора $q = CU_C = CU_{\max}\sin(\omega t + \pi)$. Сила тока — производная заряда по времени: $i = q' = CU_{\max}\omega\cos(\omega t + \pi)$, поэтому амплитуда тока $I_{\max} = CU_{\max}\omega$.

(То же следует из закона сохранения энергии $\dfrac{CU_{\max}^2}{2} = \dfrac{LI_{\max}^2}{2}$ и формулы Томсона $\omega = \dfrac{1}{\sqrt{LC}}$.)

Отсюда $C = \dfrac{I_{\max}}{\omega U_{\max}}$.

$C = \dfrac{2\cdot 10^{-3}}{5000\cdot 0{,}2}\,\text{Ф} = 2\cdot 10^{-6}\,\text{Ф}$.

Ответ: $C = 2\cdot 10^{-6}\,\text{Ф} = 2\,\text{мкФ}$.
