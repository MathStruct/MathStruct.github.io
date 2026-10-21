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
├── site/              # vendored Quartz + our plugins
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
cd site
npm ci                              # first time only
npx quartz build --serve -d ../content
```

Then open <http://localhost:8080>. Run `npm run check` for typechecking and
formatting.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds with
Quartz and publishes to GitHub Pages. For the site to live at
`https://mathstruct.github.io/`, the repository must be named
**`MathStruct.github.io`** and Pages must be set to deploy from GitHub Actions
(the workflow enables that automatically on first run). If you host it under a
different repository name, update `baseUrl` in `site/quartz.config.ts` to
match — for example `mathstruct.github.io/website`.

## What we changed in Quartz

`site/` is a vendored copy of Quartz 4.5.2 with:

- `quartz/plugins/transformers/tikz.ts` — build-time TikZ → SVG with caching.
- `quartz/plugins/transformers/tabs.ts` — Obsidian Markdown Tabs blocks.
- `quartz/plugins/transformers/latex.ts` — per-*formula* engine selection with
  fallback, so one note can mix Typst and LaTeX; ` ```typst ` fences; and a
  report of which notes are mixed.
- `quartz/components/Authors.tsx` — bylines from `authors:` frontmatter, linked
  to `content/people/<name>.md`; used by `ContentMeta`, `PageList` and `RecentNotes`.

To pull in upstream Quartz changes, merge them into `site/` and keep those four
files.
