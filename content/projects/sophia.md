---
title: Sophia
description: A content-addressed store for code in any language, with proofs, tests and equivalences as evidence.
tags:
  - project
  - rust
---

**Vault:** <https://mathstruct.org/Sophia/>, requirements, specifications, decisions and an
honest risk list
**Source:** <https://github.com/MathStruct/Sophia>

## What it is

Sophia stores code by its structure, not by file and line. Every definition is keyed by the hash
of its normalised structure; names are movable labels on it; proofs, test results and
documentation are annotations and derived facts attached to it. Code from different languages
is meant to interoperate not through a foreign-function interface but through stored
**equivalence edges** that carry machine-checkable evidence.

**[[projects/sophialang|sophialang]]** is the store's own language: Julia-flavoured, with multiple dispatch, dependent
types as an exchangeable checker, and a path from *autoresolve* through *unsafe* to *safe*.

Sophia is part research question and is treated as one: its vault says what is known, what is
not, and where the idea could fail.

## What works

- content-addressed identity and storage on four database backends (SQLite, redb, LMDB,
  DuckDB), with a conformance suite and benchmarks;
- rendering profiles: the same stored code printed and parsed Julia-flavoured or Rust-flavoured;
- a Datalog query language over the store, executed natively on every backend;
- real corpora: all 64 566 theorems of Metamath's set.mm and iset.mm, where "which axioms does
  this theorem rest on?" agrees with metamath.exe on every one; and Julia's LinearAlgebra
  library, where Sophia and [[projects/moonkale|Moonkale]] compute identical identities.

## Languages

Support is stated by level, per language: L1 parsed, L2 normalised, L3 resolved, L4 lowered, L5
executable, L6 verified. Julia, Rust and Python are read through the normaliser shared with
Moonkale (L1 and L2; Rust partly), with names resolved within a module or a file (L3, partly).
Nothing is lowered, run or verified yet, apart from Sophia's own query language, which runs on
every backend, and Metamath, whose dependency analysis is checked against metamath.exe.

## Where it goes

Sophia is designed as the store that Moonkale edits, and later as a home for
[[projects/lenticulum-jl|Lenticulum]] models. The milestones, from the store to the language to
lowering through MLIR, are in the [vault](https://mathstruct.org/Sophia/).
