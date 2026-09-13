---
title: Writing formulas in Typst
authors:
  - Co-Author Name
created: 2026-09-11
math: typst
tags:
  - meta
  - typst
description: A page where every formula is Typst rather than LaTeX, courtesy of one frontmatter line.
---

This page has `math: typst` in its frontmatter, which pins it to Typst: every
`$…$` below is compiled by Typst, and anything Typst cannot parse is flagged as
an error instead of quietly being reinterpreted as LaTeX. That is the point of
pinning — it keeps a page that has been cleaned up clean.

Pages *without* a `math:` key are the relaxed case: they mix both freely. See
[[notes/mixed-math|the mixed note]] for that.

## Inline

A sum is $sum_(k=1)^n k = (n(n+1))/2$, an integral is $integral_0^1 x^2 dif x =
1/3$, and a map between objects is $f: A -> B$. Greek letters are spelled out:
$alpha$, $beta$, $epsilon$, $cal(C)$.

## Display

$$
sum_(k=1)^n k^2 = (n(n+1)(2n+1))/6
$$

$$
mat(a, b; c, d) vec(x, y) = vec(a x + b y, c x + d y)
$$

$$
lim_(h -> 0) (f(x+h) - f(x))/h = f'(x)
$$

## Why Typst and not LaTeX

Typst's math syntax is closer to how the formula is read aloud. Compare a
fraction of two sums:

| | source |
| --- | --- |
| Typst | `(sum_i a_i)/(sum_i b_i)` |
| LaTeX | `\frac{\sum_i a_i}{\sum_i b_i}` |

$$
(sum_i a_i)/(sum_i b_i)
$$

Neither is better; they suit different hands. The point is that you do not have
to agree with your co-authors — the choice is per page.

## Switching back

Drop the `math: typst` line and the page goes back to the default: Typst first,
LaTeX for anything Typst rejects. Use `math: latex` to pin it the other way. If
you only need one Typst formula in an otherwise-LaTeX page, a fenced ` ```typst `
block always works; see [[blog/2026-09-13-diagrams-that-compile|the previous
post]].

> [!warning] Obsidian's Wypst plugin is global
> Wypst renders *all* `$…$` in the vault as Typst, so LaTeX formulas look wrong
> in Obsidian while Wypst is on. The built site is not affected — it decides
> formula by formula.
