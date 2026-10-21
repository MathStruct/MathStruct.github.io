import { siteConfig } from "./mathstruct/config"

// The plugins, theme and fixes shared by all MathStruct sites are in the preset
// (https://github.com/MathStruct/quartz, mathstruct/config.ts); this file only says what is
// particular to the organisation site.
export default siteConfig({
  pageTitle: "MathStruct",
  baseUrl: "mathstruct.org",
  // Obsidian note templates (e.g. the blog post template), not pages
  ignorePatterns: ["templates"],
  // this site owns the custom domain: write the CNAME file, so a deploy that replaces the whole
  // published site keeps it
  cname: true,
  // blog posts are listed and dated by when they were published
  defaultDateType: "created",
  // notes may mix Typst and LaTeX: each formula is tried with Typst first, anything Typst
  // rejects falls through to KaTeX. Pin a page with `math: typst` or `math: latex`.
  math: ["typst", "katex"],
  // bylines link to the people pages of this very site
  peoplePages: "people/",
})
