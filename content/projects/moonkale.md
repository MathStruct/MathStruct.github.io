---
title: Moonkale
description: A graph-native editor for code and knowledge, in Rust, for desktop, web and Android.
tags:
  - project
  - rust
---

**Vault:** <https://mathstruct.org/Moonkale/>, the design notes, one note per decision
**Download:** [latest release](https://github.com/MathStruct/Moonkale/releases/latest) ·
**Source:** <https://github.com/MathStruct/Moonkale>

![Moonkale on the desktop: activity bar, Explorer, a vault as a graph, a file in the code editor](https://raw.githubusercontent.com/MathStruct/Moonkale/master/assets/UILinux.png)

## What it is

Code editors, note-taking apps, database tools and no-code tools are separate worlds. Moonkale
opens folders *and* databases and shows everything as **one graph**: files, symbols,
wiki-links, tables and relations are nodes and edges, and every editor (code, rich text,
table, graph, flow, terminal) is a view on that graph. Language servers, indexers and LLM agents
work on the same graph through the same interface as the user.

It is written in Rust with Dioxus, one codebase for desktop, web and Android, and it is
extension-driven: the built-in editors are extensions with no privileged access.

## What works

Tested on Linux (desktop and browser) and on Android:

- folders, local or over SSH; code editing with syntax highlighting and language servers;
- a WYSIWYG Markdown editor with wiki-links, backlinks, KaTeX formulas and Typst preview;
- GPU-rendered 2D and 3D graph views, usable with 100k nodes;
- databases (SQLite, DuckDB, embedded graph databases and more) as tables and as graphs;
- git as a graph, keyword and meaning-based search, a change history with restore;
- LLM agents behind an approval gate, and an MCP endpoint;
- WebAssembly extensions and a node-based flow editor.

It is a prototype: expect breaking changes. Windows and macOS builds exist but are untested.
The [status page](https://mathstruct.org/Moonkale/Status) goes area by area.

## Where it goes

The long-term goal is a **graphical editor for factor graphs**: a
[[projects/lenticulum-jl|Lenticulum]] model edited as a diagram that stays a diagram instead of
becoming code, with ModelingToolkit and Lux.jl models alongside. Its code store is to be
[[projects/sophia|Sophia]], whose identities Moonkale already shares.
