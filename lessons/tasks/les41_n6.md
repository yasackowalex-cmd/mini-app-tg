---
id: les41_n6
exam: ЕГЭ
kim: 14
section: Оптика
theme: 
topic: 4.1
level: П
type: соответствие/выбор
variant: 
answer: "235"
unit: ""
has_image: true
author_task: false
tags: [ОПТИКА]
source: ДЗ к уроку 4.1
---

## Условие

Школьник, изучая законы геометрической оптики, провёл опыт по преломлению света (см. рисунок). Для этого он направил узкий пучок света на стеклянную пластину. Пользуясь приведённой таблицей, выберите из приведённого ниже списка все верные утверждения и запишите их номера.

[[рис 1]]

\begin{center}
\begin{tabular}{|c|c|c|c|c|}
\hline
угол $\alpha$ & $20^\circ$ & $40^\circ$ & $50^\circ$ & $70^\circ$ \\
\hline
$\sin\alpha$ & $0{,}34$ & $0{,}64$ & $0{,}78$ & $0{,}94$ \\
\hline
\end{tabular}
\end{center}

1) Угол падения равен $50^\circ$.\\
2) Угол преломления равен $40^\circ$.\\
3) Показатель преломления стекла примерно равен $1{,}47$.\\
4) При увеличении угла падения угол преломления уменьшится.\\
5) Скорость света в стекле примерно в $1{,}47$ раза меньше, чем в вакууме.

## Рисунок (TikZ)

```latex
\begin{tikzpicture}[scale=0.5, transform shape, >=Stealth]
  \def\R{3.5}
  \def\Rg{2.0}
  \draw[line width=1.0pt, brandSecondary] (0,0) circle (\R);
  \foreach \a in {0,1,...,359} {
    \ifnum\a=0\else\ifnum\a=90\else\ifnum\a=180\else\ifnum\a=270\else
      \pgfmathparse{mod(\a,10)==0 ? 1 : (mod(\a,5)==0 ? 2 : 3)}
      \ifnum\pgfmathresult=1
        \draw[thick, brandSecondary] (\a:\R) -- (\a:{\R-0.3});
      \else
        \ifnum\pgfmathresult=2
          \draw[thin, brandSecondary] (\a:\R) -- (\a:{\R-0.2});
        \else
          \draw[very thin, brandSecondary!45] (\a:\R) -- (\a:{\R-0.12});
        \fi
      \fi
    \fi\fi\fi\fi
  }
  \foreach \a in {0, 90, 180, 270} {
    \draw[line width=1.2pt, brandSecondary] (\a:\R) -- (\a:{\R-0.5});
  }
  \node[font=\large\bfseries, brandSecondary] at (90:2.7) {90};
  \node[font=\large\bfseries, brandSecondary] at (270:2.7) {90};
  \draw[line width=1.0pt, brandSecondary, fill=brandLight] (-\Rg, 0) -- (\Rg, 0) arc (0:-180:\Rg) -- cycle;
  \node[font=\large\bfseries, rotate=90, brandSecondary] at (180:2.5) {0};
  \node[font=\large\bfseries, rotate=90, brandSecondary] at (0:2.5) {0};
  \draw[line width=1.1pt, ->, brandPrimary] (160:\R) -- (0,0);
  \begin{scope}[shift={(160:{\R+0.1})}, rotate=-20]
    \draw[line width=0.9pt, brandPrimary, fill=brandPrimary] (-0.3, 0.15) -- (0, 0) -- (-0.3, -0.15) -- (-0.18, 0) -- cycle;
  \end{scope}
  \draw[line width=1.1pt, ->, brandPrimary] (0,0) -- (20:\R);
  \draw[line width=1.1pt, ->, brandPrimary] (0,0) -- (310:\R);
\end{tikzpicture}
```

## Решение

Углы падения и преломления отсчитываются от перпендикуляра к поверхности пластины. На лимбе перпендикуляр — линия «90—90».

1) Неверно. Падающий луч составляет с поверхностью пластины $20^\circ$, значит с перпендикуляром $\alpha=90^\circ-20^\circ=70^\circ$.

2) Верно. Преломлённый луч отклонён от перпендикуляра на $\beta=40^\circ$.

3) Верно. По закону преломления
\[
n=\frac{\sin\alpha}{\sin\beta}=\frac{\sin70^\circ}{\sin40^\circ}=\frac{0{,}94}{0{,}64}\approx1{,}47.
\]

4) Неверно. Из $\sin\alpha=n\sin\beta$ видно, что с ростом угла падения угол преломления тоже растёт.

5) Верно. $v=\dfrac{c}{n}$, значит скорость света в стекле в $n\approx1{,}47$ раза меньше, чем в вакууме.

Должно получиться: 235.
