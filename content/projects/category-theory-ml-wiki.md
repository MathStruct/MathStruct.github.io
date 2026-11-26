---
title: Category Theory & ML Wiki
description: MathStruct's shared knowledge graph. It has one note per concept of category theory where it shows up in learning, inference, databases and compilers, with sources cited and runnable code.
tags:
  - project
  - category-theory
---

**Wiki:** <https://mathstruct.org/CategoryTheory-ML-Wiki/>
**Source:** <https://github.com/MathStruct/CategoryTheory-ML-Wiki>

## What it is

The wiki is where MathStruct keeps what it knows. It is an Obsidian vault of 347 concept notes, one
per definition, theorem or construction. It was built from *Seven Sketches in Compositionality*,
*Category Theory for Scientists*, *The Dao of Functional Programming*, the *Kittenlab.jl* lectures
and 67 papers. Each note reconciles what the sources say and cites exact section and exercise
numbers. Most notes carry code tabs in **Julia** (Catlab), **Lean 4** (Mathlib) and **Haskell**.
About 490 exercises come with worked solutions.

It is the root vault of the MathStruct projects, and every project documents itself in the same
format. Where [[projects/lenticulum-jl|Lenticulum]] uses Bayesian lenses, Markov categories or
Bayesian inversion, its notes link here for the general concept. Where [[projects/sophia|Sophia]]
uses categorical semantics, e-graphs or Datalog, its notes do the same. Each project note keeps
only what is specific to the project. 121 notes of Lenticulum.jl's vault and 67 of Sophia's link
here.

## Where it stands

The vault is a first draft. The notes were written with an AI from the sources and are being
checked against them. Links say that two notes are related, but not how. The code is not yet run
by CI.

## Where it goes

- **Typed links:** front matter that says why two notes are linked, for example *needs*,
  *generalises*, *example of* or *implemented by*.
- **Checked code:** every Julia, Lean and Haskell tab run or compiled in CI.
- **One graph in [[projects/moonkale|Moonkale]]:** the wiki, the project vaults and the projects'
  code shown as one graph.
- **Learning paths:** routes through the prerequisite graph, exercises as review cards, and
  progress kept as a map.
- **Beyond category theory:** machine learning, databases and compiler engineering in the same
  format.

## How to read it

- Start at [Start Here](https://mathstruct.org/CategoryTheory-ML-Wiki/Start-Here). It explains the
  conventions and proposes an order of study: Stages 0–4 cover the core, from sets and preorders
  to monoidal categories. Six tracks follow. Track E leads towards machine learning and
  Lenticulum.jl, and Track F towards compilers, databases and Sophia.
- For the bridge to machine learning, good entry points are the notes on
  [Bayesian lenses](https://mathstruct.org/CategoryTheory-ML-Wiki/Bayesian-Lens) and
  [backpropagation as a functor](https://mathstruct.org/CategoryTheory-ML-Wiki/Backprop-as-Functor).
