---
title: Authoring guide
description: Frontmatter, TikZ, Typst and LaTeX — everything you need to write a page here.
tags:
  - meta
---

The site is an [Obsidian](https://obsidian.md) vault published with
[Quartz 4](https://quartz.jzhao.xyz). Open the repository root as a vault and
write markdown in `content/`; pushing to `master` rebuilds and deploys.

## Frontmatter

Every page starts with a YAML block. Only `title` is required.

```yaml
---
title: The title shown at the top of the page
authors:              # bylines; must match a heading on the People page
  - Daniel Boigk
created: 2026-09-13   # publication date — controls blog ordering
description: One sentence used in previews, search and RSS.
tags:
  - category-theory
math: typst           # optional; omit for LaTeX/KaTeX
draft: true           # optional; excluded from the build entirely
---
```

`authors` also accepts a single name (`authors: Daniel Boigk`) or a
comma-separated string. Every name becomes a link to
[[people|the people page]], so add yourself there once and the bylines take care
of themselves.

## Where things go

| Path | What belongs there |
| --- | --- |
| `content/blog/` | Dated, signed posts. Filename `YYYY-MM-DD-slug.md`. |
| `content/notes/` | Undated reference notes, definitions, work in progress. |
| `content/projects/` | One page per project, pointing at its real home. |
| `content/templates/` | Obsidian templates. Not published. |
| `content/private/` | Anything you want in the vault but not on the web. |

## Mathematics

### LaTeX (the default)

Inline `$e^{i\pi} + 1 = 0$` and display:

```markdown
$$
\int_{x \in \mathcal{C}} \big[\mathcal{C}(a, x), F x\big] \cong F a
$$
```

$$
\int_{x \in \mathcal{C}} \big[\mathcal{C}(a, x), F x\big] \cong F a
$$

Rendered by KaTeX at build time.

### Typst, one page at a time

Put `math: typst` in the frontmatter and every `$…$` on that page is compiled by
Typst instead. This mirrors the **Wypst** plugin in the vault. See
[[blog/2026-09-11-formulas-in-typst|the worked example]].

> [!warning] Wypst is global in Obsidian
> The Wypst plugin applies to the whole vault, so a LaTeX page looks wrong in
> Obsidian while Wypst is enabled — and vice versa. The published site reads the
> `math:` key per page and is not affected.

### Typst inside a LaTeX page

A fenced `typst` block is always compiled by Typst, whatever the page setting:

````markdown
```typst
sum_(k=1)^n k = (n(n+1))/2
```
````

```typst
sum_(k=1)^n k = (n(n+1))/2
```

## TikZ

A fenced `tikz` block, containing its `\usepackage` lines and a complete
document:

````markdown
```tikz
\usepackage{tikz-cd}
\begin{document}
\begin{tikzcd}
A \arrow[r, "f"] \arrow[d, "g"'] & B \arrow[d, "h"] \\
C \arrow[r, "k"'] & D
\end{tikzcd}
\end{document}
```
````

```tikz
\usepackage{tikz-cd}
\begin{document}
\begin{tikzcd}
A \arrow[r, "f"] \arrow[d, "g"'] & B \arrow[d, "h"] \\
C \arrow[r, "k"'] & D
\end{tikzcd}
\end{document}
```

`tikz`, `tikz-cd`, `circuitikz` and `pgfplots` are available. Diagrams are
compiled once and cached by content hash in `site/.tikz-cache`; commit that
directory so CI does not recompile everything.

The **Inline TikZ** plugin renders the same blocks live in Obsidian.

## Tabs

The `tabs` block from the Obsidian *Markdown Tabs* plugin works here too:

````markdown
````tabs
tab: Julia
```julia
f(x) = x^2
```
tab: Python
```python
def f(x): return x**2
```
````
````

## Links and callouts

Wikilinks (`[[people]]`, `[[people|our people]]`), embeds (`![[image.png]]`),
backlinks, the graph view and Obsidian callouts all work as they do in the
vault:

> [!note] Callouts
> `> [!note]`, `[!tip]`, `[!warning]`, `[!todo]`, `[!example]`, … all render.

## Previewing locally

```bash
cd site
npm ci          # first time only
npx quartz build --serve -d ../content
```

Then open <http://localhost:8080>. The server watches `content/` and rebuilds on
save.
