import { readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { join } from "node:path"

// Blog posts are Quartz pages (content/blog/); the front page only lists them. Their frontmatter
// is plain enough (scalars and lists) to read without a YAML library.
const BLOG = fileURLToPath(new URL("../../../content/blog/", import.meta.url))

export interface Post {
  slug: string
  title: string
  description: string
  authors: string[]
  created: Date
  tags: string[]
}

function frontmatter(src: string): Record<string, string | string[]> {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out: Record<string, string | string[]> = {}
  let key = ""
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/)
    if (item && key) {
      const list = Array.isArray(out[key]) ? (out[key] as string[]) : []
      list.push(unquote(item[1]))
      out[key] = list
      continue
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!kv) continue
    key = kv[1]
    const v = kv[2].trim()
    if (v.startsWith("[") && v.endsWith("]")) {
      out[key] = v.slice(1, -1).split(",").map((s) => unquote(s.trim())).filter(Boolean)
    } else {
      out[key] = unquote(v)
    }
  }
  return out
}

const unquote = (s: string) => s.replace(/^(["'])(.*)\1$/, "$2")
const list = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v])

export function latestPosts(limit = 3): Post[] {
  return readdirSync(BLOG)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .map((f) => {
      const fm = frontmatter(readFileSync(join(BLOG, f), "utf8"))
      if (fm.draft === "true") return null
      const date = String(fm.created ?? fm.date ?? f.slice(0, 10))
      return {
        slug: "blog/" + f.replace(/\.md$/, ""),
        title: String(fm.title ?? f),
        description: String(fm.description ?? ""),
        authors: list(fm.authors),
        created: new Date(date + "T00:00:00Z"),
        tags: list(fm.tags),
      } satisfies Post
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.created.getTime() - a.created.getTime())
    .slice(0, limit)
}

// people/<name in lower case, hyphenated>, as content/people/ and Quartz's bylines spell it
export const personSlug = (name: string) =>
  "people/" + name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-")
