// The "In action" section of /projects/lenticulum-jl: one entry per demo, shown in this order.
// To add one, put its file in public/projects/lenticulum-jl-media/ (not lenticulum-jl/: a folder of the
// page's own name would shadow the page on GitHub Pages) and add an entry here.
//
//   kind "image"  a PNG, JPG, GIF or SVG
//   kind "video"  an MP4 or WebM; plays muted and looped when it scrolls into view (record at
//                 2x, keep it short; a poster image is shown before it loads)
//
// Every caption states a result that the repository backs (a test, an example or a note), and
// says where: the page promises nothing the library does not do.
export interface Demo {
  title: string
  caption: string
  kind: "image" | "video"
  /** from the site root, e.g. "/projects/lenticulum-jl-media/mnist_ambiguous.png" */
  src: string
  /** for a video: the image shown before it plays */
  poster?: string
  alt: string
  /** where the result comes from */
  source: { label: string; href: string }
  /** "wide" spans the whole row; default is half a row on wide screens */
  wide?: boolean
}

export const demos: Demo[] = [
  {
    title: "Classify by clamping the image",
    caption:
      "One diffusion model of (image, label) on MNIST. Clamp the 784 pixels, free the 10 label coordinates, and the root is the classification: 96.1% on 9000 test digits, the same as a diffusion classifier reading the same network (95.8%). The most ambiguous digits land between two codes, like this “2” written as an “a” at 2: 0.49 / 3: 0.48. The other direction, label to image, does not work yet with this model; the note says why.",
    kind: "image",
    src: "/projects/lenticulum-jl-media/mnist_ambiguous.png",
    alt: "Eight handwritten test digits, each titled with the two largest label coordinates of its root, e.g. 2: 0.49 · 3: 0.48 for a 2 written like an a",
    source: {
      label: "MNIST in Both Directions",
      href: "https://mathstruct.org/Lenticulum.jl/Relation-Learners/MNIST-in-Both-Directions",
    },
    wide: true,
  },
]
