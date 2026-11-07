# MathStruct

The organisation website for [MathStruct](https://github.com/MathStruct), built
with [Quartz 4](https://quartz.jzhao.xyz) from an Obsidian vault.

**Live site:** <https://mathstruct.org/>

## Layout

```
.
├── content/           # the site — this is what you edit
│   ├── index.md       #   landing page
│   ├── about.md
│   ├── people/        #   one page per person; blog bylines link to them
│   ├── blog/          #   dated, signed posts (YYYY-MM-DD-slug.md)
│   ├── notes/         #   undated reference notes
│   ├── projects/      #   one page per project
│   ├── guides/        #   authoring guide
│   └── templates/     #   Obsidian templates (not published)
├── site/              # this site's Quartz config; the engine is MathStruct/quartz
└── .github/workflows/ # build and deploy to GitHub Pages
```

The repository root is the Obsidian vault — open it in Obsidian and write in
`content/`. The vault ships with **Inline TikZ**, **Wypst** and **Markdown
Tabs**, all of which have matching build-time support.

## Writing

See [the authoring guide](content/guides/authoring.md). The short version:

```yaml
---
title: Post title
authors: [Your Name]      # byline; add content/people/your-name.md
created: 2026-09-13       # publication date; blog is sorted by it, newest first
description: One sentence.
math: typst               # optional; omit for LaTeX/KaTeX
---
```

- **TikZ** — a ` ```tikz ` fence holding `\usepackage` lines plus a full
  `\begin{document} … \end{document}`. Compiled to SVG at build time by
  `node-tikzjax` and cached by content hash in `site/.tikz-cache` (committed, so
  CI does not recompile everything).
- **Maths** — notes may mix Typst and LaTeX freely; each formula is routed on
  its own. A backslash command (`\frac`, `\beta`) means LaTeX and goes to
  KaTeX; everything else is offered to Typst first and falls through to KaTeX if
  Typst rejects it. Pin a page with `math: typst` or `math: latex` to forbid the
  other syntax. A ` ```typst ` fence is always Typst and never falls back.

  The build prints `Mixed math in <file>: N with Typst, M with katex` for every
  note that used both, which is the list to work through if you want to make the
  vault pure.

## Local preview

```bash
site/build.sh --serve      # needs git and Node 22+
```

Then open <http://localhost:8080>; it rebuilds as you edit. `site/build.sh`
alone builds into `site/public/`.

A pull request is built by CI too: the rendered site is attached to the
workflow run as the `site` artifact, so reviewers can look at it without
building anything.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds with
Quartz and publishes to GitHub Pages. For the site to live at
`https://mathstruct.github.io/`, the repository must be named
**`MathStruct.github.io`** and Pages must be set to deploy from GitHub Actions
(the workflow enables that automatically on first run). If you host it under a
different repository name, update `baseUrl` in `site/quartz.config.ts` to
match — for example `mathstruct.github.io/website`.

## Quartz

The site is built with [MathStruct's Quartz](https://github.com/MathStruct/quartz),
shared by all MathStruct sites: Quartz 4 plus our plugins (TikZ with dark-mode
variants, Markdown Tabs, per-formula Typst/LaTeX, bylines) and a preset with the
shared theme and layout. `site/` holds only what is particular to this site:

- `quartz.config.ts` and `quartz.layout.ts` — a call to the preset (title,
  address, footer links, giscus, the blog list on the front page);
- `build.sh` — fetches the shared Quartz into `site/.quartz/` (gitignored) and
  builds;
- `.tikz-cache/` — rendered diagrams, committed.
- `redirects/` — copied into the built site as it is: `mathstruct.org/sophia`
  and the other lowercase spellings redirect to the project sites, whose paths
  are the case-sensitive repository names. A new project site gets one here.
  `eit/` and `EIT/` forward to the ModularEIT wiki on danielboigk.github.io (not
  linked from the site).

A change to the plugins or the theme goes to MathStruct/quartz and reaches every
site on its next build; see its
[MATHSTRUCT.md](https://github.com/MathStruct/quartz/blob/main/MATHSTRUCT.md).
