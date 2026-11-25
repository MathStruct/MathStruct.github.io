import { siteLayout } from "./mathstruct/layout"

export const { sharedPageComponents, defaultContentPageLayout, defaultListPageLayout } =
  siteLayout({
    footerLinks: {
      GitHub: "https://github.com/MathStruct",
      "Lenticulum.jl": "https://mathstruct.org/Lenticulum.jl/",
      Sophia: "https://mathstruct.org/Sophia/",
      Moonkale: "https://mathstruct.org/Moonkale/",
      "Category Theory & ML Wiki": "https://mathstruct.org/CategoryTheory-ML-Wiki/",
    },
    // a comment thread under every page, stored in this repository's Discussions
    comments: {
      repo: "MathStruct/MathStruct.github.io",
      repoId: "R_kgDOUZNu4A",
      category: "Announcements",
      categoryId: "DIC_kwDOUZNu4M4DJQY5",
    },
  })
