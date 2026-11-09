---
id: kam26_v9_n7
exam: ОГЭ
kim: 7
section: Механика
theme: ИМПУЛЬС. ЗАКОН СОХРАНЕНИЯ ИМПУЛЬСА. УДАРЫ
topic: 1.3.1
level: Б
type: расчётная
variant: 9
answer: "3"
unit: ""
has_image: true
author_task: false
tags: [МЕХАНИКА, ЗАКОН_СОХРАНЕНИЯ_ИМПУЛЬСА, НЕУПРУГИЙ_УДАР]
source: Камзеева, ОГЭ-2026, 30 вариантов (вариант 9)
---

## Условие

Два пластилиновых шарика, двигаясь по гладкой горизонтальной плоскости, испытывают абсолютно неупругое соударение и слипаются. В каком случае (см. рисунки) модуль скорости шариков после соударения будет максимальным?

[[рис 1]]

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=1, every node/.style={font=\small}]
  \begin{scope}[shift={(0,3.6)}]
  \node at (-0.45,0.5) {1)};
  \draw[thick, -{Stealth}] (0,0) -- (3.2,0);
  \node[below] at (0,0) {$O$}; \node[below] at (3.1,0) {$X$};
  \foreach \x in {0.1,0.3,...,2.9} \draw (\x,0) -- (\x-0.12,-0.12);
  \fill (0.8,0.11) circle (0.1);
  \node at (0.8,0.62) {$m$};
  \draw[thick, -{Stealth}] (0.8,0.11) -- (1.3,0.11);
  \node[above] at (1.1,0.12) {$2\vec v$};
  \fill (2.2,0.11) circle (0.1);
  \node at (2.2,0.62) {$m$};
  \end{scope}
  \begin{scope}[shift={(0,1.2)}]
  \node at (-0.45,0.5) {3)};
  \draw[thick, -{Stealth}] (0,0) -- (3.2,0);
  \node[below] at (0,0) {$O$}; \node[below] at (3.1,0) {$X$};
  \foreach \x in {0.1,0.3,...,2.9} \draw (\x,0) -- (\x-0.12,-0.12);
  \fill (0.8,0.11) circle (0.1);
  \node at (0.8,0.62) {$m$};
  \draw[thick, -{Stealth}] (0.8,0.11) -- (1.3,0.11);
  \node[above] at (1.1,0.12) {$2\vec v$};
  \fill (2.2,0.11) circle (0.1);
  \node at (2.2,0.62) {$m$};
  \draw[thick, -{Stealth}] (2.2,0.11) -- (2.7,0.11);
  \node[above] at (2.5,0.12) {$\vec v$};
  \end{scope}
  \begin{scope}[shift={(0,2.4)}]
  \node at (-0.45,0.5) {2)};
  \draw[thick, -{Stealth}] (0,0) -- (3.2,0);
  \node[below] at (0,0) {$O$}; \node[below] at (3.1,0) {$X$};
  \foreach \x in {0.1,0.3,...,2.9} \draw (\x,0) -- (\x-0.12,-0.12);
  \fill (0.8,0.11) circle (0.1);
  \node at (0.8,0.62) {$m$};
  \draw[thick, -{Stealth}] (0.8,0.11) -- (1.3,0.11);
  \node[above] at (1.1,0.12) {$2\vec v$};
  \fill (2.2,0.11) circle (0.1);
  \node at (2.2,0.62) {$m$};
  \draw[thick, -{Stealth}] (2.2,0.11) -- (1.7000000000000002,0.11);
  \node[above] at (1.9000000000000001,0.12) {$\vec v$};
  \end{scope}
  \begin{scope}[shift={(0,0)}]
  \node at (-0.45,0.5) {4)};
  \draw[thick, -{Stealth}] (0,0) -- (3.2,0);
  \node[below] at (0,0) {$O$}; \node[below] at (3.1,0) {$X$};
  \foreach \x in {0.1,0.3,...,2.9} \draw (\x,0) -- (\x-0.12,-0.12);
  \fill (0.8,0.11) circle (0.1);
  \node at (0.8,0.62) {$m$};
  \draw[thick, -{Stealth}] (0.8,0.11) -- (1.3,0.11);
  \node[above] at (1.1,0.12) {$\vec v$};
  \fill (2.2,0.11) circle (0.1);
  \node at (2.2,0.62) {$2m$};
  \end{scope}
\end{tikzpicture}
```

## Подсказка

Запишите закон сохранения импульса для каждого случая: $m_1v_1 + m_2v_2 = (m_1 + m_2)u$. Учтите направления скоростей.

## Решение

При абсолютно неупругом ударе выполняется закон сохранения импульса. Проекция импульса системы на ось $OX$ до удара равна проекции импульса слипшихся шариков после удара: $p_x = (m_1 + m_2)u_x$.

1) $m\cdot 2v + 0 = 2mu$, $u = v$.

2) $m\cdot 2v - mv = 2mu$, $u = 0{,}5v$.

3) $m\cdot 2v + mv = 2mu$, $u = 1{,}5v$.

4) $mv + 0 = 3mu$, $u = \dfrac{v}{3}$.

Наибольшая скорость получается в случае 3: шарики движутся в одну сторону, и их импульсы складываются.
