---
title: About MathStruct
description: Who we are, what we are trying to do, and how we work.
---

## Mission

MathStruct is an open-source research collective developing tooling for mathematics,
scientific computing and AI/ML.

Our working bet is that the same structure keeps appearing in all three: systems built from
parts with typed interfaces, joined by composition. A statistical model is a graph of factors;
a program is a graph of definitions; a body of knowledge is a graph of notes. Category theory is
the mathematics of exactly this kind of composition. Taking it seriously gives tools that do
more than their usual counterparts: a model that can be queried in any direction rather than
run one way ([[projects/lenticulum-jl|Lenticulum.jl]]), a code store in which a proof or a test
is attached to the definition it is about ([[projects/sophia|Sophia]]), an editor in which code,
notes and data are one graph ([[projects/moonkale|Moonkale]]).

## How we work

- **Open by default.** Code, notes, design decisions and negative results are public. The software is
  MIT-licensed.
- **Every project is a vault.** Each repository is an Obsidian vault published with Quartz: the
  concepts, derivations and design notes link to each other and to the code, and source files
  have notes beside them that explain them, including what they do not do and what went wrong
  on the way.
- **Tested against what is known.** Where a closed form exists, the code is tested against it.
  Approximations say that they are approximations, and status pages say what is unfinished.
- **Asynchronous, on GitHub.** Issues, pull requests and discussions; comments on any page of
  any vault (giscus) go straight into GitHub Discussions.
- **Tools.** We use AI coding agents, and say so; the repositories have an `AGENTS.md` with the
  same rules for agents and people.

## Open source and downstream work

The core projects are and will stay open source. Commercial products may be built downstream
of them, by us or by others, without closing the core.

## Collaboration

We welcome collaborators at every level: a comment pointing out an error, a note, a test, a
feature, a research question to work on together. The best first step is a comment on the page
in question, or a discussion on the repository. Contributions are credited; Lenticulum.jl's
[`CONTRIBUTING.md`](https://github.com/MathStruct/Lenticulum.jl/blob/master/CONTRIBUTING.md)
explains how, including authorship on releases.

## Where things live

- [[projects/index|Projects]]: the software and the vaults.
- [[blog/index|Blog]]: essays, notes in progress, release announcements.
- [[people|People]]: who we are.
- [[guides/authoring|Authoring guide]]: how to write a page for this site.

## Citing us

Each release of Lenticulum.jl is archived on Zenodo, credited to MathStruct. Cite the concept
DOI, which always resolves to the latest version:

```bibtex
@software{lenticulum,
  author    = {{MathStruct}},
  title     = {Lenticulum.jl},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.23314723},
  url       = {https://mathstruct.org/Lenticulum.jl/}
}
```
