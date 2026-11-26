import type { Project } from "./projects"

// The Chinese copy of the front page's project list (lib/projects.ts): the same projects with
// translated strings and links to the Chinese pages in src/pages/zh/.
export const zhProjects: Project[] = [
  {
    layer: "models",
    name: "Lenticulum.jl",
    page: "/zh/projects/lenticulum-jl",
    tagline: "学习关系，而非函数。",
    description:
      "可以向任意方向查询的模型，在因子图上组合，并以信念的形式携带不确定性。",
    status: "研究原型",
    stack: "Julia",
    highlights: [
      "扩散模型等隐式学习器，可向任意方向查询",
      "消息传递要么精确，要么明确标注为近似",
      "消息传递与自由能，均与解析形式核对",
    ],
    links: [
      { label: "知识库", href: "https://mathstruct.org/Lenticulum.jl/" },
      { label: "API", href: "https://mathstruct.org/Lenticulum.jl/api/dev/" },
      { label: "源码", href: "https://github.com/MathStruct/Lenticulum.jl" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.23314723" },
    ],
    related: {
      label: "LenticulumLM",
      href: "/zh/projects/lenticulumLM",
      note: "由这类关系组装成的语言模型",
    },
  },
  {
    layer: "code",
    name: "Sophia",
    page: "/zh/projects/sophia",
    tagline: "以结构为键的代码。",
    description:
      "面向任意语言代码的内容寻址存储：定义以结构的哈希为键，证明、测试与跨语言等价性作为证据附带其上。",
    status: "早期研究",
    stack: "Rust",
    highlights: [
      "基于四种数据库后端的内容寻址存储",
      "在所有后端上都原生支持的 Datalog 查询语言",
      "为 set.mm 与 iset.mm 的全部 64 566 条定理追踪公理",
    ],
    links: [
      { label: "知识库", href: "https://mathstruct.org/Sophia/" },
      { label: "源码", href: "https://github.com/MathStruct/Sophia" },
    ],
    related: {
      label: "sophialang",
      href: "/zh/projects/sophialang",
      note: "存储自身的语言，计划作为一项实验",
    },
  },
  {
    layer: "interface",
    name: "Moonkale",
    page: "/zh/projects/moonkale",
    tagline: "一张图，每个编辑器都是一个视图。",
    description:
      "图原生编辑器：文件、符号、笔记、数据库与关系同属一张图，每个编辑器都是它上面的一个视图，人与 AI 代理皆可使用。",
    status: "可运行原型",
    stack: "Rust · Linux、Web、Android",
    highlights: [
      "代码配语言服务器；Markdown 配 wiki 链接、KaTeX 与 Typst",
      "十万个节点的 GPU 图视图；数据库既可作表格也可作图",
      "审批门槛之后的 LLM 代理，以及 MCP 端点",
    ],
    links: [
      { label: "知识库", href: "https://mathstruct.org/Moonkale/" },
      { label: "下载", href: "https://github.com/MathStruct/Moonkale/releases/latest" },
      { label: "源码", href: "https://github.com/MathStruct/Moonkale" },
    ],
  },
  {
    layer: "foundation",
    name: "范畴论与机器学习维基",
    page: "/zh/projects/category-theory-ml-wiki",
    tagline: "可以运行的知识。",
    description:
      "MathStruct 的共享知识图谱：范畴论在学习、推断、数据库与编译器中出现之处，每个概念一篇笔记，附 Julia、Lean 4 与 Haskell 代码。",
    status: "持续更新的维基 · 初稿",
    stack: "Obsidian 笔记库",
    highlights: [
      "347 篇概念笔记，核对自四个来源与 67 篇论文",
      "约 490 道附完整解答的习题",
      "Lenticulum.jl 与 Sophia 的 188 篇笔记所链接的理论",
    ],
    links: [
      { label: "Wiki", href: "https://mathstruct.org/CategoryTheory-ML-Wiki/" },
      { label: "源码", href: "https://github.com/MathStruct/CategoryTheory-ML-Wiki" },
    ],
  },
]

export const zhLayer: Record<Project["layer"], string> = {
  models: "模型",
  code: "代码",
  interface: "界面",
  foundation: "基础",
}
