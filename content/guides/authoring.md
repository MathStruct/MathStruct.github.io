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
your page in `content/people/` (the file name is your name in lower case, with
hyphens for spaces), so add one once and the bylines take care of themselves.

## Where things go

| Path | What belongs there |
| --- | --- |
| `content/blog/` | Dated, signed posts. Filename `YYYY-MM-DD-slug.md`. |
| `content/notes/` | Undated reference notes, definitions, work in progress. |
| `content/projects/` | One page per project, pointing at its real home. |
| `content/templates/` | Obsidian templates. Not published. |
| `content/private/` | Anything you want in the vault but not on the web. |

## Mathematics

Notes may mix Typst and LaTeX freely — that is the default, and it is what our
vaults actually look like. Each formula is rendered on its own:

1. If the source contains a backslash command (`\frac`, `\beta`, `\mathrm`),
   it is LaTeX and goes to KaTeX.
2. Otherwise Typst gets first refusal.
3. Anything Typst rejects falls through to KaTeX.

So both of these work in the same paragraph, with no frontmatter at all:

```markdown
The Typst $lim_(h -> 0) (f(x+h) - f(x))/h$ and the LaTeX
$\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
```

The Typst $lim_(h -> 0) (f(x+h) - f(x))/h$ and the LaTeX
$\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.

### Pinning a page to one engine

| frontmatter | behaviour |
| --- | --- |
| *(none)* | Typst first, KaTeX fallback. Mixed notes work. |
| `math: typst` | Typst only. Anything it rejects is shown as an error. |
| `math: latex` | KaTeX only. Typst is never tried. |

Pinning is how you keep a cleaned-up note clean: once a page is pure, `math:`
makes the build complain if someone slips the other syntax back in. See
[[blog/2026-09-11-formulas-in-typst|the Typst post]] for a pinned page and
[[notes/mixed-math|the mixed note]] for an unpinned one.

> [!warning] Where auto-detection falls down
> `$1/2$` is valid in both, and the two disagree: Typst stacks it as a fraction,
> LaTeX leaves it as a slash. Typst wins by default. If you meant the LaTeX
> reading, write `$\frac{1}{2}$` or pin the page with `math: latex`.
>
> The same goes for any formula with no backslash in it — `$x^2$`, `$f(x)$`,
> `$P(A|B)$` are identical either way, but `$sin x$` is upright in Typst and
> italic in LaTeX.

> [!note] Wypst is global in Obsidian
> The Wypst plugin applies to the whole vault, so LaTeX formulas look wrong in
> Obsidian while Wypst is enabled — and vice versa. The published site does not
> care: it decides per formula.

### Typst inside a LaTeX page

A fenced `typst` block is always compiled by Typst and never falls back, so a
mistake in it shows up as an error rather than being silently reinterpreted:

````markdown
```typst
sum_(k=1)^n k = (n(n+1))/2
```
````

```typst
sum_(k=1)^n k = (n(n+1))/2
```

### Finding mixed notes

The build prints a line for every note that ended up using both engines:

```
Mixed math in content/notes/mixed-math.md: 6 formula(s) rendered with Typst, 6 with katex
```

Use it to work through the vault if you want to make notes pure. Nothing breaks
if you never do.

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

Wikilinks (`[[about]]`, `[[about|about us]]`), embeds (`![[image.png]]`),
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
