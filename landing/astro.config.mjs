import { defineConfig } from "astro/config"

// The front page of mathstruct.org. site/build.sh builds it after Quartz and copies dist/ over
// Quartz's output, so it replaces only /index.html; every other page stays a Quartz page.
export default defineConfig({
  site: "https://mathstruct.org",
  // Quartz writes /static/; keep Astro's bundles out of its way
  build: { assets: "assets" },
  devToolbar: { enabled: false },
})
