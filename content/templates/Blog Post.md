---
title: "{{title}}"
authors:
  - Your Name
created: {{date:YYYY-MM-DD}}
description: One sentence. Shows up in previews, search results and the RSS feed.
tags:
  - 
math: 
---

Opening paragraph: what this post is about and why anyone should keep reading.
One or two sentences, no throat-clearing.

## Section

Body text. Inline maths like $e^{i\pi} + 1 = 0$, or display:

$$
% your formula
$$

A diagram, if it helps:

```tikz
\usepackage{tikz-cd}
\begin{document}
\begin{tikzcd}
A \arrow[r, "f"] & B
\end{tikzcd}
\end{document}
```

## Section

More body text. Link to related pages with [[notes/index|wikilinks]].

## Wrapping up

What you concluded, and what is still open.

---

Checklist before publishing — delete this block:

- [ ] `title`, `authors`, `created` and `description` filled in
- [ ] your name has a heading on [[people|the People page]]
- [ ] `math: typst` set (or removed) to match how the formulas are written
- [ ] `tags` filled in, empty entries removed
- [ ] previewed locally with `npx quartz build --serve -d ../content`
