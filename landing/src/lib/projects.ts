// The projects as the front page shows them. The long form of each is a Quartz page in
// content/projects/; keep the two in step.
export interface Project {
  layer: "models" | "code" | "interface" | "foundation"
  name: string
  page: string
  tagline: string
  description: string
  status: string
  stack: string
  highlights: string[]
  links: { label: string; href: string }[]
  related?: { label: string; href: string; note: string }
}

export const projects: Project[] = [
  {
    layer: "models",
    name: "Lenticulum.jl",
    page: "/projects/lenticulum-jl",
    tagline: "Learn relations, not functions.",
    description:
      "Models that can be queried in any direction, composed on factor graphs, with uncertainty carried as beliefs.",
    status: "Research prototype",
    stack: "Julia",
    highlights: [
      "Diffusion models and other implicit learners, queried in any direction",
      "Messages that are exact, or labelled as approximate",
      "Message passing and free energies, checked against closed forms",
    ],
    links: [
      { label: "Vault", href: "https://mathstruct.org/Lenticulum.jl/" },
      { label: "API", href: "https://mathstruct.org/Lenticulum.jl/api/dev/" },
      { label: "Source", href: "https://github.com/MathStruct/Lenticulum.jl" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.23314723" },
    ],
    related: {
      label: "LenticulumLM",
      href: "/projects/lenticulumLM",
      note: "a language model assembled from such relations",
    },
  },
  {
    layer: "code",
    name: "Sophia",
    page: "/projects/sophia",
    tagline: "Code, keyed by its structure.",
    description:
      "A content-addressed store for code in any language: definitions keyed by the hash of their structure, with proofs, tests and cross-language equivalences attached as evidence.",
    status: "Early research",
    stack: "Rust",
    highlights: [
      "Content-addressed storage on four database backends",
      "A Datalog query language, native on every backend",
      "Axioms traced for all 64 566 theorems of set.mm and iset.mm",
    ],
    links: [
      { label: "Vault", href: "https://mathstruct.org/Sophia/" },
      { label: "Source", href: "https://github.com/MathStruct/Sophia" },
    ],
    related: {
      label: "sophialang",
      href: "/projects/sophialang",
      note: "the store's own language, planned as an experiment",
    },
  },
  {
    layer: "interface",
    name: "Moonkale",
    page: "/projects/moonkale",
    tagline: "One graph, every editor a view.",
    description:
      "A graph-native editor: files, symbols, notes, databases and relations are one graph, and every editor is a view on it, for people and AI agents alike.",
    status: "Working prototype",
    stack: "Rust · Linux, web, Android",
    highlights: [
      "Code with language servers; Markdown with wiki-links, KaTeX and Typst",
      "GPU graph views of 100k nodes; databases as tables and graphs",
      "LLM agents behind an approval gate, and an MCP endpoint",
    ],
    links: [
      { label: "Vault", href: "https://mathstruct.org/Moonkale/" },
      { label: "Download", href: "https://github.com/MathStruct/Moonkale/releases/latest" },
      { label: "Source", href: "https://github.com/MathStruct/Moonkale" },
    ],
  },
  {
    layer: "foundation",
    name: "Category Theory & ML Wiki",
    page: "/projects/category-theory-ml-wiki",
    tagline: "The mathematics underneath.",
    description:
      "Category theory where it actually shows up in learning, inference and programming: one note per concept, with code in Julia, Lean 4 and Haskell.",
    status: "Living wiki",
    stack: "Obsidian vault",
    highlights: [
      "Several hundred linked notes, reconciled across four sources",
      "Exercises with worked solutions",
      "Bayesian lenses, backpropagation as a functor",
    ],
    links: [
      { label: "Wiki", href: "https://mathstruct.org/CategoryTheory-ML-Wiki/" },
      { label: "Source", href: "https://github.com/MathStruct/CategoryTheory-ML-Wiki" },
    ],
  },
]
