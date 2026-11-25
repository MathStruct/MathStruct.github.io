---
title: LenticulumLM
description: A plan for a language model built as a factor graph of thousands of small models, wired by belief algebra. Not implemented yet.
tags:
  - project
  - julia
---

%% On mathstruct.org this page is replaced by landing/src/pages/projects/lenticulumLM.astro (the
promotional page, built with Astro). This note still feeds the site's search, graph and link
previews: keep its facts in step with that page. %%

**Status:** a concept. There is no implementation yet; what it would be built from exists in
[[projects/lenticulum-jl|Lenticulum.jl]], [[projects/sophia|Sophia]] and
[[projects/moonkale|Moonkale]].
**Design notes:** <https://mathstruct.org/LenticulumLM/>

## What it is

A transformer is one frozen function. LenticulumLM is a plan for a language model built as a
**factor graph**: thousands to tens of thousands of small models, each a relation between a few
variables, wired together by Lenticulum.jl's belief algebra. Factors can be added, deleted and
loaded from a store (Sophia) while the model runs.

## The ideas

- **Generation is SLAM.** Each token is a new pose, a reference back to something said earlier
  is a loop closure, a fact from the store is a landmark. As in iSAM2 (Kaess et al. 2012), each
  step re-solves only the variables the new factors reach.
- **Denoising, not committing.** The factors can be diffusion models or energy networks. Read as
  a stream, older tokens carry less noise than newer ones; read as a graph, many positions are
  denoised at once.
- **Verified output.** Any language with a checker (Lean 4, a type checker, a schema) runs inside
  the model as a hard factor.
- **Learning by insertion.** Training runs along knowledge and code graphs: new knowledge is new
  factors, trained locally; deleting a factor removes what it contributed.
- **The harness inside.** Retrieval, tool calls and agent loops are subgraphs of the model,
  editable in Moonkale.
- **Query depth is model size.** A query loads only the factors it reaches, so effort follows
  the question.

## Open questions

- Adding the scores of diffusion models samples their product only at $t = 0$; along the
  trajectory a correction is needed (Du et al. 2023).
- Products of experts are hard to sample and tend to bland text.
- Message passing on loopy graphs need not converge.
- Whether many small factors can match one large network at equal compute is unmeasured.

Lenticulum.jl's own review of the idea: [Language Models](https://mathstruct.org/Lenticulum.jl/Parked/Applications/Language-Models).
