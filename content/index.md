---
title: MathStruct
description: An open-source research collective developing tooling for mathematics, scientific computing and AI/ML.
---

**MathStruct is an open-source research collective. We develop tooling for mathematics,
scientific computing and AI/ML**: libraries, editors and stores in which models, code and
knowledge are built from parts that compose, with the mathematics that says why they compose
written down next to the code.

The software we build is open source (MIT) and stays that way. Every project is also a
published vault of linked notes: the theory, the design decisions and the dead ends sit beside
the code they explain, and every page of every vault can be commented on.

## One idea, three layers

Most tools treat a model as a function, a program as text in files, and knowledge as documents
in folders. We treat all three as **graphs of parts with typed interfaces**, and build one
project per layer:

| layer | project | what it is | read |
| --- | --- | --- | --- |
| **models** | [[projects/lenticulum-jl\|Lenticulum.jl]] | Learn *relations*, not functions: models that can be queried in any direction, composed on factor graphs, with uncertainty carried as beliefs | [vault](https://mathstruct.org/Lenticulum.jl/) · [API](https://mathstruct.org/Lenticulum.jl/api/dev/) · [code](https://github.com/MathStruct/Lenticulum.jl) |
| **code** | [[projects/sophia\|Sophia]] | A content-addressed store for code in any language: definitions keyed by the hash of their structure, with proofs, tests and cross-language equivalences attached as evidence | [vault](https://mathstruct.org/Sophia/) · [code](https://github.com/MathStruct/Sophia) |
| **interface** | [[projects/moonkale\|Moonkale]] | A graph-native editor: files, symbols, notes, databases and relations are one graph, and every editor is a view on it, for people and AI agents alike | [vault](https://mathstruct.org/Moonkale/) · [download](https://github.com/MathStruct/Moonkale/releases/latest) · [code](https://github.com/MathStruct/Moonkale) |
| **foundation** | [[projects/category-theory-ml-wiki\|Category Theory & ML Wiki]] | The shared mathematics: category theory where it actually shows up in learning, inference and programming | [wiki](https://mathstruct.org/CategoryTheory-ML-Wiki/) · [code](https://github.com/MathStruct/CategoryTheory-ML-Wiki) |

The layers meet. A Lenticulum model is a factor graph, and Moonkale's long-term goal is to
edit it as a diagram that stays a diagram instead of becoming code. Sophia is designed as the
store that Moonkale edits, so that a definition, its proof and its tests are one node rather
than three files. And the reason all of this composes at all is mathematical: factors are
Bayesian lenses, wiring is composition, and the wiki is where that is worked out.

## Where each project stands

We are early, and we say so plainly. Each project page lists what works, what does not, and
what is planned.

- **Lenticulum.jl** is a research prototype with a tested core: diffusion models and other
  implicit learners as relations, queried in any direction; linear-Gaussian, nonlinear and
  non-Gaussian factors whose messages are exact or labelled as approximate; message passing and
  free energies on factor graphs; all of it checked against closed forms. Citable on Zenodo
  ([10.5281/zenodo.23314723](https://doi.org/10.5281/zenodo.23314723)). Its sister project
  [LenticulumLM](https://mathstruct.org/LenticulumLM/) assembles language models from such
  relations.
- **Moonkale** is a working prototype on Linux, in the browser and on Android: code editing with
  language servers, Markdown notes with wiki-links and formulas, GPU graph views of 100k nodes,
  databases as tables and graphs, git, search, and LLM agents behind an approval gate.
- **Sophia** is younger, and part research question: can code from many languages share one
  store, keyed by structure? Its first milestones run: content-addressed identity, storage and
  a Datalog query language on four database backends, with tests and benchmarks. On real code
  it answers "which axioms does this theorem rest on?" for all 64 566 theorems of Metamath's
  set.mm and iset.mm, in agreement with metamath.exe, and gives Julia's LinearAlgebra library
  the same identities as Moonkale does.

## Working with us

- **Researchers and contributors.** Every page of every vault has a comment thread at the
  bottom (giscus, backed by GitHub Discussions): sign in with GitHub and comment. Questions,
  corrections and "this is wrong" are all welcome. The repositories' `CONTRIBUTING.md` files say
  how to contribute code or notes and how contributions are credited.
- **Funders.** The projects are open research infrastructure for mathematics, scientific
  computing and machine learning; [[about|About]] says what we are trying to do and why.
- **Companies and investors.** The open-source core stays open source. Applications built
  downstream of it can be commercial; if that interests you, get in touch.
- **People.** Who we are: [[people|People]]. More will join.

Contact: comment on any page, start a discussion on
[GitHub](https://github.com/MathStruct/MathStruct.github.io/discussions), or reach the
maintainers through their GitHub profiles.
