import { defineConfig } from "astro/config"

// The front page of mathstruct.org and a few promotional pages (projects/lenticulum-jl,
// projects/lenticulumLM, projects/sophia, projects/sophialang, projects/moonkale).
// site/build.sh builds this after Quartz and copies dist/ over Quartz's output, so each page here
// replaces the Quartz page at the same address; every other page stays a Quartz page.
export default defineConfig({
  site: "https://mathstruct.org",
  // Quartz writes /static/; keep Astro's bundles out of its way
  // "file": src/pages/projects/lenticulum-jl.astro becomes projects/lenticulum-jl.html, the
  // file Quartz writes for content/projects/lenticulum-jl.md, so it replaces that page
  build: { assets: "assets", format: "file" },
  devToolbar: { enabled: false },
})
