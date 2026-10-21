---
title: Lenticulum.jl
description: Learn relations, not functions. Implicit machine learning on factor graphs, in Julia.
math: latex
tags:
  - project
  - julia
---

**Vault:** <https://mathstruct.org/Lenticulum.jl/>, the theory, design and implementation notes
**API documentation:** <https://mathstruct.org/Lenticulum.jl/api/dev/>
**Source:** <https://github.com/MathStruct/Lenticulum.jl> ·
**DOI:** [10.5281/zenodo.23314723](https://doi.org/10.5281/zenodo.23314723)

## What it is

A neural network learns a function $f_\theta : X \to Y$ and can only be run one way. Lenticulum
learns a **relation** on a joint space and decides at query time which coordinates are inputs and
which are outputs. The same trained model answers "given $x$, what is $y$?", "given $y$, what
is $x$?" and "fill in whatever is missing", and a relation can have several answers where a
function has one.

Relations compose. Lenticulum wires them into **factor graphs**: each factor is a learned or
hand-written relation, each variable carries a belief (a Gaussian, a mixture, samples, a
categorical distribution), and inference is message passing, with the free energy of the graph
as the training objective. The mathematics underneath is that of Bayesian lenses: a factor
together with its inversions, composed along wires.

## What works

- **Implicit learners**: diffusion models, deep equilibrium layers and energy models read as
  relations and queried in any direction, with every answer a stable root of a learned field.
- **Factors with exact or labelled approximate messages**: linear-Gaussian and acausal
  constraint factors (exact), nonlinear factors by linearisation or the unscented transform,
  non-Gaussian likelihoods (counts, ordered categories) by Laplace or expectation propagation.
- **Graphs**: message passing on trees and loopy graphs, schedules, Bethe free energies,
  polarity resolution (which way information flows).
- **Tests against closed forms** wherever one exists, and implementation notes that say what
  each part does not do.

It is a research prototype: Julia, not registered, APIs still changing.

## Where it goes

- learned factors with full-covariance uncertainty, so a learned relation can sit in a graph
  with correlated beliefs;
- graphs that grow as data arrive, and hyperparameters fitted by evidence;
- a graphical editor for factor graphs in [[projects/moonkale|Moonkale]], and Lenticulum running
  on [[projects/sophia|Sophia]]'s store.

[LenticulumLM](https://mathstruct.org/LenticulumLM/) is a sister project: a diffusion
language model assembled from such relations, in which continuation, backward prediction and
infilling are one model queried with different clamps.

## Installation

```julia
using Pkg
Pkg.add(url = "https://github.com/MathStruct/Lenticulum.jl")
```

## Vault and API documentation

- The [vault](https://mathstruct.org/Lenticulum.jl/) holds the derivations, design notes and
  dead ends: start there to understand *why* it is built this way. Every page has a comment
  thread.
- The [API documentation](https://mathstruct.org/Lenticulum.jl/api/dev/) is generated from
  docstrings, with tutorials: start there to *use* it.
