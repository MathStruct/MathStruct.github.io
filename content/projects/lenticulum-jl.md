---
title: Lenticulum.jl
description: Learn relations, not functions. Implicit machine learning on factor graphs, in Julia.
math: latex
tags:
  - project
  - julia
---

%% On mathstruct.org this page is replaced by landing/src/pages/projects/lenticulum-jl.astro (the
promotional page, built with Astro). This note still feeds the site's search, graph and link
previews: keep its facts in step with that page and with the library's README. %%

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

The library is built around three paths, each its own set of packages:

- **A. Gaussian factor graphs** (`LenticulumCore`, `Mycelium`, `Lenticulum`): exact smoothing and
  state estimation on linear-Gaussian graphs, nonlinear measurements by linearisation, the free
  energy and its gradient, as in GTSAM, with factors that can be learned.
- **B. Relation learners** (`VariationalDiffusion`): a diffusion model queried in any direction by
  root finding, with an adjoint backward pass, Laplace beliefs and conditional sampling.
- **C. Structure and regimes** (`Lenticulum`, `Mycelium`, `MyceliumLearning`): switching and
  regime factors, hierarchical models, expectation maximisation, search over structures.

What is exact is tested against closed forms: random linear-Gaussian trees against the dense
joint solve, switching chains against enumeration, the diffusion field against a Gaussian
mixture's score. A relation is trained through its own inference with the AD backend chosen per
model (Zygote, Enzyme, ForwardDiff, Mooncake or Reactant). On MNIST, one diffusion model of
(image, label) classifies by root finding with the image clamped (96.1%, the same as a diffusion
classifier with the same network); the other direction, label to image, does not work yet with
that model ([the note](https://mathstruct.org/Lenticulum.jl/Relation-Learners/MNIST-in-Both-Directions)).

Three further packages are off the three paths and not yet reviewed as the core was:
`ImplicitLayers` (deep equilibrium models, neural ODEs), `AlgebraicFactors` (exact discrete toric
models) and `AdversarialFactors` (implicit generative models). Their suites pass and run weekly.

It is a research prototype: Julia, one author, in the
[MathStruct registry](https://github.com/MathStruct/Registry), APIs still changing.

## Known limits

- a mixture message into a Gaussian or constraint factor is collapsed to its moments, unless the
  switch and what it reaches share one cluster node;
- inference cost grows quadratically with the number of separately parametrised factors (plates
  with tied parameters are not affected);
- the implicit learner recovers the ridge of a smoothed density, not the data's support, and every
  query returns a root, on the relation or not;
- learned networks are small by design: a factor's joint space has a handful of coordinates.

## Where it goes

Proposed, in the library's backlog:

- the factor graph as a compiled program, with [[projects/sophia|Sophia]] as its compiler backend;
- factor graphs edited as diagrams in [[projects/moonkale|Moonkale]];
- hyperparameters by the evidence, and incremental inference after a local change;
- the whole library to the SciML standard: typed for dispatch, any AD backend, any array type,
  parallel, benchmarked.

[LenticulumLM](https://mathstruct.org/LenticulumLM/) is a sister project: a diffusion
language model assembled from such relations.

## Installation

```julia
using Pkg
Pkg.Registry.add(RegistrySpec(url = "https://github.com/MathStruct/Registry.git"))   # once
Pkg.add("Lenticulum")             # paths A and C
Pkg.add("VariationalDiffusion")   # path B
```

A registered version is a snapshot; for the newest code, `Pkg.develop` a clone of the packages
under `lib/`.

## Vault and API documentation

- The [vault](https://mathstruct.org/Lenticulum.jl/) holds the derivations, design notes and
  dead ends: start there to understand *why* it is built this way. Every page has a comment
  thread.
- The [API documentation](https://mathstruct.org/Lenticulum.jl/api/dev/) is generated from
  docstrings, with eleven tutorials: start there to *use* it.
