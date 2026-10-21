import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    // a comment thread under every page (giscus, stored in this repository's Discussions);
    // not on the tag and folder listings
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "giscus",
        options: {
          repo: "MathStruct/MathStruct.github.io",
          repoId: "R_kgDOUZNu4A",
          category: "Announcements",
          categoryId: "DIC_kwDOUZNu4M4DJQY5",
          mapping: "pathname",
          strict: true,
          reactionsEnabled: true,
          inputPosition: "bottom",
        },
      }),
      condition: (page) =>
        !(page.fileData.slug ?? "").startsWith("tags/"),
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/MathStruct",
      "Lenticulum.jl": "https://mathstruct.org/Lenticulum.jl/",
      Sophia: "https://mathstruct.org/Sophia/",
      Moonkale: "https://mathstruct.org/Moonkale/",
      "Category Theory & ML Wiki": "https://mathstruct.org/CategoryTheory-ML-Wiki/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    // the landing page is not an article: no date or reading time on it
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
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
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
