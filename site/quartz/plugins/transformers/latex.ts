import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
//@ts-ignore
import rehypeTypst from "@myriaddreamin/rehype-typst"
import { visit } from "unist-util-visit"
import { Element, Properties, Root } from "hast"
import { Code, Root as MdRoot } from "mdast"
import { VFile } from "vfile"
import { QuartzTransformerPlugin } from "../types"
import { KatexOptions } from "katex"
import { Options as MathjaxOptions } from "rehype-mathjax/svg"
//@ts-ignore
import { Options as TypstOptions } from "@myriaddreamin/rehype-typst"

export type RenderEngine = "katex" | "mathjax" | "typst"

interface Options {
  renderEngine: RenderEngine
  customMacros: MacroType
  katexOptions: Omit<KatexOptions, "macros" | "output">
  mathJaxOptions: Omit<MathjaxOptions, "macros">
  typstOptions: TypstOptions
}

// mathjax macros
export type Args = boolean | number | string | null
interface MacroType {
  [key: string]: string | Args[]
}

type Transformer = (tree: Root, file: VFile) => void | Promise<void>

// what an author may write in `math:` frontmatter
const engineAliases: Record<string, RenderEngine> = {
  katex: "katex",
  latex: "katex",
  tex: "katex",
  mathjax: "mathjax",
  typst: "typst",
  wypst: "typst",
}

function engineFor(file: VFile, fallback: RenderEngine): RenderEngine {
  const frontmatter = file.data.frontmatter as Record<string, unknown> | undefined
  const declared = frontmatter?.math ?? frontmatter?.mathEngine
  if (typeof declared !== "string") return fallback
  return engineAliases[declared.trim().toLowerCase()] ?? fallback
}

// classes both rehype-katex and rehype-typst look for
const mathClasses = ["math-inline", "math-display", "language-math"]
// marks a ```typst fence, which renders with Typst whatever the page engine is
const typstFenceClass = "typst-fence"

function classesOf(node: Element): string[] {
  const className = node.properties?.className
  return Array.isArray(className) ? (className as string[]) : []
}

/**
 * Turn a ```typst fence into display math before the syntax highlighter can
 * claim it. The shape mirrors what mdast-util-math emits for `$$…$$`, plus a
 * marker class so the Typst pass can be pointed at exactly these nodes.
 */
function typstFencesToMath() {
  return (tree: MdRoot) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "typst" || !parent || index === undefined) return
      parent.children[index] = {
        type: "math",
        value: node.value,
        data: {
          hName: "pre",
          hChildren: [
            {
              type: "element",
              tagName: "code",
              properties: {
                className: ["language-math", "math-display", typstFenceClass],
              },
              children: [{ type: "text", value: node.value }],
            },
          ],
        },
      } as any
    })
  }
}

/**
 * rehype-typst hard-codes layout into a `style` attribute (and emits a broken
 * `vertical-align: -NaNem` for display math). Swap that for a class so the
 * stylesheet owns how a formula sits in the page.
 */
function tidyTypstOutput(tree: Root) {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "svg" || !classesOf(node).includes("typst-doc")) return
    const style = String(node.properties?.style ?? "").replace(/\s/g, "")
    if (!style.includes("display:block")) return
    node.properties!.className = [...classesOf(node), "typst-display"]
    delete node.properties!.style
  })
}

function findTypstFences(tree: Root): Set<Element> {
  const claimed = new Set<Element>()
  visit(tree, "element", (node: Element) => {
    if (classesOf(node).includes(typstFenceClass)) claimed.add(node)
  })
  return claimed
}

/** Temporarily hide every math node except `keep` from the next renderer pass. */
function hideMathExcept(tree: Root, keep: Set<Element>): Array<[Element, Properties[string]]> {
  const hidden: Array<[Element, Properties[string]]> = []
  visit(tree, "element", (node: Element) => {
    if (keep.has(node)) return
    const classes = classesOf(node)
    if (!classes.some((c) => mathClasses.includes(c))) return
    hidden.push([node, node.properties!.className])
    node.properties!.className = classes.filter((c) => !mathClasses.includes(c))
  })
  return hidden
}

function unhide(hidden: Array<[Element, Properties[string]]>) {
  for (const [node, className] of hidden) {
    node.properties!.className = className
  }
}

export const Latex: QuartzTransformerPlugin<Partial<Options>> = (opts) => {
  const defaultEngine = opts?.renderEngine ?? "katex"
  const macros = opts?.customMacros ?? {}

  // renderers are built on first use: the Typst compiler is expensive to spin
  // up and most pages never need it
  const renderers: Partial<Record<RenderEngine, Transformer>> = {}
  const rendererFor = (engine: RenderEngine): Transformer =>
    (renderers[engine] ??= {
      katex: () =>
        rehypeKatex({ output: "html", macros, ...(opts?.katexOptions ?? {}) }) as Transformer,
      typst: () => rehypeTypst(opts?.typstOptions ?? {}) as Transformer,
      mathjax: () =>
        rehypeMathjax({
          ...(opts?.mathJaxOptions ?? {}),
          // mathjax accepts `macros` at runtime; its published types do not
          tex: { ...(opts?.mathJaxOptions?.tex ?? {}), macros } as MathjaxOptions["tex"],
        }) as Transformer,
    }[engine]())

  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath, typstFencesToMath]
    },
    htmlPlugins() {
      return [
        () => async (tree: Root, file: VFile) => {
          const pageEngine = engineFor(file, defaultEngine)
          const typstFences = findTypstFences(tree)

          if (pageEngine === "typst") {
            await rendererFor("typst")(tree, file)
            tidyTypstOutput(tree)
            return
          }

          if (typstFences.size > 0) {
            const hidden = hideMathExcept(tree, typstFences)
            await rendererFor("typst")(tree, file)
            unhide(hidden)
            tidyTypstOutput(tree)
          }

          await rendererFor(pageEngine)(tree, file)
        },
      ]
    },
    externalResources() {
      // pages opt in and out of engines individually, so KaTeX's stylesheet is
      // always shipped rather than keyed off the default engine
      return {
        css: [{ content: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" }],
        js: [
          {
            // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
            src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js",
            loadTime: "afterDOMReady",
            contentType: "external",
          },
        ],
      }
    },
  }
}
