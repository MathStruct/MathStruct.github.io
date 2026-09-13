---
title: "Diagrams that compile: TikZ on a Quartz site"
authors:
  - Daniel Boigk
created: 2026-09-13
tags:
  - meta
  - tikz
description: How TikZ diagrams get rendered to SVG at build time, and what that means for writing.
---

Every diagram on this site is real TikZ. Not a screenshot, not a hand-drawn SVG
— the same source you would paste into a LaTeX document, compiled during the
site build and inlined as SVG. This post is partly an explanation and partly a
test page: if the pictures below render, the pipeline works.

## A commutative diagram

The naturality square from the Yoneda lemma, written with `tikz-cd`:

```tikz
\usepackage{tikz-cd}
\begin{document}
\begin{tikzcd}
\mathrm{Hom}(X, X) \arrow[r, "\alpha_X"] \arrow[d, "f \circ -"'] & F(X) \arrow[d, "F(f)"] \\
\mathrm{Hom}(X, Y) \arrow[r, "\alpha_Y"'] & F(Y)
\end{tikzcd}
\end{document}
```

The source for that is exactly what you see: a fenced block tagged `tikz`,
containing the `\usepackage` lines you need, then a full `\begin{document}
… \end{document}`.

## Ordinary TikZ, too

`tikz-cd` is not special — anything TikZ can draw, the build can draw. A wiring
diagram for a monoidal preorder:

```tikz
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}[box/.style={draw, minimum height=1.1cm, minimum width=1cm}]
\node[box] (a) at (0,0.6) {$\leq$};
\node[box] (b) at (2,-0.4) {$\leq$};
\node[box] (c) at (4,0.6) {$\leq$};
\draw (-1.2,0.6) node[left]{$t$} -- (a.west);
\draw (a.east) ++(0,0.3) -- ++(0.6,0) node[above]{$v$} |- (c.west);
\draw (a.east) ++(0,-0.3) -- ++(0.4,0) node[below]{$w$} |- ([yshift=0.3cm]b.west);
\draw (-1.2,-0.7) node[left]{$u$} -| ([yshift=-0.3cm]b.west);
\draw ([yshift=0.3cm]b.east) -- ++(0.4,0) node[above]{$x$} |- ([yshift=-0.3cm]c.west);
\draw ([yshift=-0.3cm]b.east) -- (6,-0.7) node[right]{$z$};
\draw (c.east) -- (6,0.6) node[right]{$y$};
\draw[rounded corners, dashed] (-0.9,-1.3) rectangle (5.2,1.5);
\end{tikzpicture}
\end{document}
```

## Formulas around the diagrams

Prose math is KaTeX by default, so the usual LaTeX works inline — the Yoneda
lemma says $\mathrm{Nat}(\mathrm{Hom}(X, -), F) \cong F(X)$, naturally in both
$X$ and $F$ — and in display mode:

$$
\int_{x \in \mathcal{C}} \big[\mathcal{C}(a, x), F x\big] \;\cong\; F a
$$

If you would rather write a formula in Typst, you can do that on any page
without switching the whole page over:

```typst
integral_(x in cal(C)) [cal(C)(a, x), F x] tilde.equiv F a
```

That block is compiled by Typst; the `$…$` around it is LaTeX. In fact this
whole site decides formula by formula, so the two can sit in the same sentence —
see [[notes/mixed-math|the mixed note]]. My colleague's
[[blog/2026-09-11-formulas-in-typst|next post]] covers the stricter option: a
page pinned to Typst.

## Why build-time rendering

Three reasons, in order of how much they matter:

1. **Nothing ships to the reader but SVG.** No TikZJax bundle, no
   client-side LaTeX, no layout shift while a diagram appears.
2. **Failures are loud and early.** A malformed picture breaks the build log
   rather than silently showing nothing in someone's browser.
3. **It is cached.** Each diagram is keyed by a hash of its source, so a rebuild
   only recompiles the pictures that actually changed. The cache lives in
   `site/.tikz-cache` and is committed, which keeps CI builds quick.

## Caveats

- Dark mode inverts the SVG rather than recolouring it. For line art this is
  invisible; if you use strong colours, check both themes.
- Not every LaTeX package is available — the renderer is a TeX build compiled to
  WebAssembly. `tikz`, `tikz-cd`, `circuitikz` and `pgfplots` all work.
- Very large pictures are slow to compile the first time. That is a one-off cost
  per diagram.

> [!tip] Writing in Obsidian
> The vault has the **Inline TikZ** plugin enabled, so these blocks render live
> while you edit. What you see locally is what the build produces.
