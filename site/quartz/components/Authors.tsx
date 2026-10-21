import { slug as slugAnchor } from "github-slugger"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"

/**
 * Byline support for the blog: reads `authors:` (or `author:`) from frontmatter,
 * accepting either a list or a comma-separated string.
 */
export function getAuthors(data: QuartzPluginData): string[] {
  const frontmatter = data.frontmatter as Record<string, unknown> | undefined
  const declared = frontmatter?.authors ?? frontmatter?.author
  if (declared === undefined || declared === null) return []

  const parts = Array.isArray(declared) ? declared : String(declared).split(",")
  return parts.map((author) => String(author).trim()).filter((author) => author.length > 0)
}

// author names link to their pages: "Daniel Boigk" → people/daniel-boigk
const personPage = (author: string) => `people/${slugAnchor(author)}` as SimpleSlug

type Props = {
  data: QuartzPluginData
  currentSlug: FullSlug
}

export function Authors({ data, currentSlug }: Props) {
  const authors = getAuthors(data)
  if (authors.length === 0) return null

  return (
    <span class="authors">
      {authors.map((author, i) => (
        <>
          {i > 0 ? ", " : ""}
          <a
            class="internal"
            href={resolveRelative(currentSlug, personPage(author))}
          >
            {author}
          </a>
        </>
      ))}
    </span>
  )
}
