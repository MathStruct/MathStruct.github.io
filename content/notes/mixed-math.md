---
title: Mixed Typst and LaTeX
description: A note whose formulas are deliberately half Typst and half LaTeX, to exercise the fallback.
tags:
  - meta
  - typst
---

This note does not declare a `math:` engine, so every formula is tried with
Typst first and falls through to KaTeX if Typst rejects it. The two styles sit
side by side on purpose — this is what our vaults actually look like.

## Typst formulas

Inline: $sum_(k=1)^n k = (n(n+1))/2$ and $integral_0^1 x^2 dif x$ and $cal(C)$.

$$
mat(a, b; c, d) vec(x, y) = vec(a x + b y, c x + d y)
$$

## LaTeX formulas

Inline: $\mathrm{Nat}(\mathrm{Hom}(X, -), F) \cong F(X)$ and $a_{ij}$ and
$\hat{y} = X\beta$.

$$
\int_{x \in \mathcal{C}} \big[\mathcal{C}(a, x), F x\big] \cong F a
$$

$$
\begin{pmatrix} a & b \\ c & d \end{pmatrix}
\begin{pmatrix} x \\ y \end{pmatrix}
= \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}
$$

## Both in one paragraph

The Typst $lim_(h -> 0) (f(x+h) - f(x))/h$ and the LaTeX
$\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$ should render identically, each by a
different engine.

## Valid in both

$x^2 + y^2 = z^2$ parses as either. Typst gets it, and the result is the same
either way.
