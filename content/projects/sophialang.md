---
title: sophialang
description: The planned language of the Sophia code store, Julia-flavoured, with autoresolve → unsafe → safe per section of code. An experiment; nothing runs yet.
tags:
  - project
  - rust
---

%% On mathstruct.org this page is replaced by landing/src/pages/projects/sophialang.astro (the
promotional page, built with Astro). This note still feeds the site's search, graph and link
previews: keep its facts in step with that page. %%

**Status:** planned, and an experiment. The surface syntax, the core calculus and name
resolution exist, in [[projects/sophia|Sophia]]'s crates `sophialang-syntax` and
`sophialang-core`; nothing runs yet.
**Design notes:** [SophiaLang overview](https://mathstruct.org/Sophia/vault/Languages/SophiaLang/SophiaLang-Overview),
[SPEC-002 Sophialang Principles](https://mathstruct.org/Sophia/vault/Specifications/SPEC-002-Sophialang-Principles)

## What it is

sophialang is the store's own language: Julia-flavoured, with multiple dispatch, dependent
types as an exchangeable checker, and one governing principle, *autoresolve → unsafe → safe*.

- **Autoresolve.** Write nothing about memory, concurrency or compilation; the system chooses
  (garbage collection, a work-stealing scheduler, JIT on demand) and records what it chose.
- **Unsafe.** Take explicit control of one aspect of one section: manual memory, threads and
  locks, ahead-of-time compilation. The section is marked, and a query lists every unproved
  `unsafe` section reachable from `main`.
- **Safe.** Add a proof in that aspect's DSL (ownership, race freedom, no surprise
  compilation); a checker discharges the mark. Proofs never change a definition's content id.

## A programming system, not a programming language

sophialang is not stored as text and is not meant to be read. The store holds the normalised,
compressed core term: no names, de Bruijn indices, references as hashes, shared structure stored
once. How it is displayed (Julia-like, Rust-like, Lean-like, …) is the reader's configuration, a
rendering profile. So it is less a programming language than a programming system.

**Planned:** agents that work directly on the graph (core terms and mined abstractions) instead
of through a frontend language such as Julia. Today models reach the store through a profile,
and every write is parsed back.

## Why it might be worth it

- **One language from prototype to proof**, instead of choosing between a dynamic language and
  a checked one by the hardest part of the program.
- **Zero inherent overhead.** Types and proofs are erased (usage-0 binders); the GC, scheduler
  and JIT are linked only if some section leaves their aspect to the system.
- **Precise rebuilds.** Definitions are keyed by the hash of their normalised structure. A
  rename or a proof changes no id; an edit changes the ids of exactly its dependents, so only
  those are recompiled and only their tests re-run. A new method invalidates only the call
  sites whose recorded argument types it overlaps.

## One language, not three

[Computational trinitarianism](https://existentialtype.wordpress.com/2011/03/27/the-holy-trinity/)
is Robert Harper's name for the observation that logic, type theory and category theory are
three views of one subject: a proposition is a type is an object, a proof is a program is a
morphism. sophialang takes it as its design. The typing language, the query language and the
logic are one language over one store: a specification is a type, a query is a set of Horn
clauses (sophialang relations and rules), and a proof is a term of the type it proves, stored
and hashed like any other definition. Today the query language runs as its own crate on shared
primitives; folding it into sophialang is the design, not yet the code.

**Compiling to an exact binary is a query over the graph store.** A definition's id is the hash
of its structure, so everything `main` needs is the answer to a recursive query over `refs`,
plus the methods dispatch can reach at pinned versions. Compile that answer, erase types and
proofs, and link a GC, dispatcher or JIT only where some section asks for one
([Minimal Binaries](https://mathstruct.org/Sophia/vault/Design/Minimal-Binaries)).

## Where it stands

| Level | Status |
|---|---|
| L1 Parsed | yes: Julia- and Rust-flavoured profiles, round-trip tested; a Lean-flavoured profile is planned |
| L2 Normalised | yes: `sophialang-core@0`, names never change ids |
| L3 Resolved | yes |
| L5 Executable | no: no interpreter, no type checker |
| L6 Verified | no |

Next: an interpreter and a simple checker (M4), lowering to LLVM and minimal binaries (M5),
self-hosting (M6). Open questions include open method tables against content addressing
(SP-006) and whether all of the principles can hold in one language at once.
