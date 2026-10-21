import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"
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
    // the front page lists the latest blog posts
    right: [
      Component.ConditionalRender({
        component: Component.RecentNotes({
          title: "Latest from the blog",
          limit: 4,
          linkToMore: "blog/" as SimpleSlug,
          showTags: false,
          filter: (page) => page.slug!.startsWith("blog/") && page.slug !== "blog/index",
        }),
        condition: (page) => page.fileData.slug === "index",
      }),
    ],
  })
