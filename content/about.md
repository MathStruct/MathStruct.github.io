---
title: About MathStruct
description: Who we are, where the projects came from, how we work, and how we use AI.
---

%% On mathstruct.org this page is replaced by landing/src/pages/about.astro (built with Astro).
This note still feeds the site's search, graph and link previews: keep the two in step. %%

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

## Where this comes from

### A graph for mathematics

MathStruct began as a startup pitch in January 2025. The idea was a new format for mathematical
knowledge: a graph of definitions, statements and proofs that is at the same time a graph of
code.

The motivation was dissatisfaction with how mathematics is shared. Results still travel as
papers, through publishers and a slow round of peer review, and each paper is a sealed
document that cannot be linked into, corrected in place or built upon directly. The tools that
could change this have existed for a long time. The hyperlink and the wiki made linked,
collectively maintained knowledge an everyday thing almost everywhere else, yet in mathematics
they were used half-heartedly, ignored, or looked down upon. Lean offered something no journal
can, a machine-checked guarantee that a statement holds, and for years most of the community
paid it little attention.

A knowledge graph would have made other things straightforward as well. A learning plan in
mathematics could be personal: given what you already know and where you want to go, the path
through the graph is a computation. And there was no good training data for
autoformalisation, or for its reverse, turning formal proofs back into readable mathematics; a
graph in which every informal statement sits next to its formal counterpart is exactly that
data.

We wanted to build a platform around this. It did not get off the ground at the time. Others
have since gone after parts of the same picture, Axiom Math among them, with serious venture
funding behind them. The ideas did not go away, though: they live on in
[[projects/sophia|Sophia]], [[projects/moonkale|Moonkale]] and the
[[projects/category-theory-ml-wiki|Category Theory & ML Wiki]].

### How the library came together

[[projects/lenticulum-jl|Lenticulum.jl]] has an older origin. It started as a question while
working on a sensor-fusion problem with [GTSAM](https://gtsam.org): factor graphs are a
beautiful way to combine many measurements, but they are Gaussian, linearised and hand-built.
What if they were non-Gaussian, non-linear, and *learned*? At the time there was no obvious way
to do it.

The pieces arrived one at a time, over several years:

- **Implicit layers and adjoint methods.** The
  [implicit layers tutorial](http://implicit-layers-tutorial.org) showed how to differentiate
  through the solution of an equation rather than through the steps of a solver.
- **Energy-based models.** Yann LeCun's
  [tutorial on energy-based learning](https://yann.lecun.com/exdb/publis/pdf/lecun-06.pdf)
  gave the language for models that score configurations instead of computing outputs, which is
  what a factor is.
- **Parametric lenses.** Curiosity led to category theory, and there to
  [parametric lenses](https://arxiv.org/abs/2103.01931): a compositional account of
  forward-and-backward computation with parameters.
- **Diffusion models as priors.** Regularising an inverse problem led to conditional sampling
  with diffusion models (DiffPIR, RED-Diff, proximal diffusion methods) and from there into
  their theory: how a learned prior and a data term are combined, step by step.
- **Statistical games.** The last piece was finding the category the rest had been pointing at:
  the statistical games of the [AutoBayes paper](https://arxiv.org/abs/2503.18608), Bayesian
  lenses with a loss attached.

With that in hand, the library could be assembled.

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
- **AI in the open.** We use AI coding agents, and say so; the repositories have an `AGENTS.md`
  with the same rules for agents and people. More on that [[#Move fast and break things|below]].

## Move fast and break things

That is our motto, and we mean it in a specific sense.

**We are not in academia.** A vault of ours may well contain a mistake, and that is fine. We
would rather publish early and be corrected than polish in private. If you find an error,
please say so in a comment on the page, or better, fix it in a pull request.

**We have no staff to delegate to.** A professorship has doctoral students and a company has
employees; we have neither, at least not yet. What we do have are AI agents that can run an
experiment, check a derivation against a closed form or chase down a failing test. Part of our
research is working out how to make that *reliable*: how an agent's results are checked, and
when they can be trusted.

**We are optimistic about this.** For a long time, research rewarded the industrious
temperament: the person who could grind through the implementation, the bookkeeping, the
hundredth experiment. AI shifts that balance towards the creative one: the person with more
ideas than hands, who sees the connection and wants to try it. That includes many people with
ADHD, for whom this may be something of a great reversal. If you have a moonshot project in a
drawer, now is the time to build it. A project of the scope of MathStruct would have been
unthinkable for a group our size a year ago.

**We want a different research format.** Open vaults instead of sealed papers; negative
results written down instead of quietly dropped; code, notes and evidence in one place. Some of
our projects will fail; Sophia, by its own risk list, may be one of them. When they do, the
vault will say why, so that whoever tries next starts further along.

**We do not build on technical debt.** Agents make a rewrite cheap, so we choose the
better-designed stack over the familiar one: Julia rather than Python, C++ and PyTorch; Rust
rather than JavaScript and React, or C++ on the backend. Rust has turned out to be particularly
good for coding with agents, because its strict compiler catches their mistakes early. Poor
performance and a large memory footprint are treated as bugs.

### "Isn't this just AI slop?"

Fair question. Our answer:

- **Human research code was never the gold standard.** The typical fate of a paper's code is a
  repository that is abandoned the day the paper is accepted, and a code review of it would
  rarely make pleasant reading. Current models have been trained on established engineering
  practice, and much of what they write is cleaner than what most of us wrote by hand.
- **We work on the process, not just the prompts.** We follow and try out what is emerging as
  good practice for AI-written code: spec-driven development, careful harness design, chains of
  independent reviewers. The code is tested, benchmarked and profiled.
- **Correctness can be proved, not only tested.** Formal software verification can show that an
  implementation does what its specification says, and we intend to use it;
  [FiniteFields](https://github.com/MathStruct/FiniteFields) is a first step.
- **We read the code.** We wrote Julia, Python, C++, Rust, Pascal, JavaScript and more long before
  any of this, and we still review what the agents produce. The gain in productivity is simply
  too large to leave on the table.

## Working with us

The core projects are and will stay open source. Commercial products may be built downstream
of them, by us or by others, without closing the core.

Implicit learning, learning relations instead of functions, will take a while to become a
familiar idea. In the meantime, if you have a problem it might fit, or you suspect it fits but
do not see how, talk to us: we can design and engineer a solution with you. Areas we have in
mind include simulation, trading, omics, language models and robotics, but the list is not
closed. The easiest way to start is a
[discussion on GitHub](https://github.com/MathStruct/MathStruct.github.io/discussions).

## Collaboration

We welcome collaborators at every level: a comment pointing out an error, a note, a test, a
feature, a research question to work on together. The best first step is a comment on the page
in question, or a discussion on the repository. Contributions are credited; Lenticulum.jl's
[`CONTRIBUTING.md`](https://github.com/MathStruct/Lenticulum.jl/blob/master/CONTRIBUTING.md)
explains how, including authorship on releases.

## Where things live

- [[projects/index|Projects]]: the software and the vaults.
- [[blog/index|Blog]]: essays, notes in progress, release announcements.
- [[people/index|People]]: who we are.
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
