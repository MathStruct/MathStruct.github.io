// The people of MathStruct. /people/ lists them and /people/<slug> is each person's page, in English
// and Chinese (src/pages/people/, src/pages/zh/people/), all built from this list: adding a person
// is one entry here, plus their Markdown note in content/people/<slug>.md, which stays for the
// site's search, graph and link previews. Keep the two in step.
//
// The slug is the name in lower case, hyphenated, as blog bylines spell it (personSlug in
// lib/blog.ts), so `authors: [Your Name]` in a post links to the page made from your entry.

/** A string in both languages of the site. */
export interface T {
  en: string
  zh: string
}

export interface Person {
  name: string
  slug: string
  /** one line under the name */
  role: T
  /** a short paragraph: what they work on */
  bio: T
  /** research and engineering areas, shown as tags and used by the filter on /people/ */
  areas: T[]
  /** names of the MathStruct projects they maintain, as lib/projects.ts spells them */
  maintains: string[]
  /** a photo from the site root (public/people/<slug>.jpg); without one, the initials are drawn */
  photo?: string
  links: { label: string; href: string }[]
  /** earlier and outside work: what, with which tools, and why it matters here */
  background?: { k: T; d: T; tools: string[]; more?: { label: T; href: string } }[]
  /** their own projects outside MathStruct */
  work?: {
    name: string
    href: string
    d: T
    points?: { en: string[]; zh: string[] }
    links?: { label: T; href: string }[]
    figure?: { src: string; alt: T; caption: T }
  }[]
}

export const people: Person[] = [
  {
    name: "Daniel Boigk",
    slug: "daniel-boigk",
    role: { en: "Mathematician; founder of MathStruct", zh: "数学家；MathStruct 创始人" },
    bio: {
      en: "Mathematician working on scientific computing, inverse problems and machine learning, with a background in motion capture and sensor fusion.",
      zh: "研究科学计算、逆问题与机器学习的数学家，有动作捕捉与传感器融合的工作背景。",
    },
    areas: [
      { en: "Scientific computing", zh: "科学计算" },
      { en: "Inverse problems", zh: "逆问题" },
      { en: "Machine learning", zh: "机器学习" },
      { en: "Sensor fusion", zh: "传感器融合" },
      { en: "Motion capture", zh: "动作捕捉" },
    ],
    maintains: ["Lenticulum.jl", "Moonkale", "Sophia"],
    links: [{ label: "GitHub", href: "https://github.com/DanielBoigk" }],
    background: [
      {
        k: { en: "Motion capture", zh: "动作捕捉" },
        d: {
          en: "With the Azure Kinect depth camera and Vicon's marker-based optical system, in Python.",
          zh: "使用 Azure Kinect 深度相机与 Vicon 基于标记点的光学系统，用 Python 编写。",
        },
        tools: ["Python", "Azure Kinect", "Vicon"],
      },
      {
        k: { en: "Sensor fusion", zh: "传感器融合" },
        d: {
          en: "With GTSAM, on factor graphs. Their limits (Gaussian, linearised, built by hand) raised the question that became Lenticulum.jl: what if a factor graph were non-Gaussian, non-linear and learned?",
          zh: "使用 GTSAM，在因子图上。因子图的局限（高斯、线性化、手工搭建）引出了后来成为 Lenticulum.jl 的问题：如果因子图是非高斯、非线性、可学习的呢？",
        },
        tools: ["GTSAM", "Factor graphs"],
        more: { label: { en: "Where Lenticulum.jl came from", zh: "Lenticulum.jl 的由来" }, href: "about#origins" },
      },
    ],
    work: [
      {
        name: "ModularEIT.jl",
        href: "https://github.com/DanielBoigk/ModularEIT.jl",
        d: {
          en: "A Julia library for electrical impedance tomography (EIT), the inverse problem of recovering a conductivity from boundary voltage and current measurements, built from exchangeable parts.",
          zh: "面向电阻抗断层成像（EIT）的 Julia 库。EIT 是从边界电压与电流测量反演电导率的逆问题，该库由可替换的部件构建。",
        },
        points: {
          en: [
            "finite element back ends on Ferrite.jl and Gridap.jl",
            "the continuum, point, gap and complete electrode models",
            "least-squares objectives with adjoint gradients, Tikhonov and total-variation regularisation",
            "Gauss–Newton, L-BFGS, FISTA, ADMM and plug-and-play methods",
            "fast linear solvers with FFT and multigrid preconditioners, on the CPU and on GPUs",
            "adaptive meshes, and synthetic data without inverse crime",
          ],
          zh: [
            "基于 Ferrite.jl 与 Gridap.jl 的有限元后端",
            "连续、点、缺口与完整电极模型",
            "带伴随梯度的最小二乘目标，Tikhonov 与全变差正则化",
            "Gauss–Newton、L-BFGS、FISTA、ADMM 与即插即用方法",
            "带 FFT 与多重网格预条件子的快速线性求解器，覆盖 CPU 与 GPU",
            "自适应网格，以及无逆犯罪（inverse crime）的合成数据",
          ],
        },
        links: [
          { label: { en: "API documentation", zh: "API 文档" }, href: "https://danielboigk.github.io/ModularEIT.jl/dev/" },
          { label: { en: "Theory wiki", zh: "理论维基" }, href: "https://danielboigk.github.io/ModularEIT.jl/dev/wiki/" },
        ],
      },
      {
        name: "EITDenoiser.jl",
        href: "https://github.com/DanielBoigk/EITDenoiser.jl",
        d: {
          en: "Diffusion-model priors for EIT. A diffusion model trained on images supplies the prior, and data consistency enters every reverse-diffusion step as an exact proximal step for the EIT residual linearised at a classical reconstruction, so sampling needs no PDE solve. Directions the data determine come from the data, the others from the prior, and the spread of the samples shows which is which.",
          zh: "面向 EIT 的扩散模型先验。在图像上训练的扩散模型提供先验；数据一致性以对 EIT 残差在经典重建处线性化后的精确近端步进入每一个逆扩散步，因此采样无需解 PDE。数据决定的方向来自数据，其余来自先验，样本的离散程度显示哪些方向由谁决定。",
        },
        figure: {
          src: "https://raw.githubusercontent.com/DanielBoigk/EITDenoiser.jl/master/assets/landscape_posterior_128.png",
          alt: {
            en: "Posterior samples for EIT, 128 × 128 pixels, 255 electrodes: truth, Levenberg–Marquardt reconstruction, posterior mean and standard deviation, three samples and the resolution map",
            zh: "EIT 的后验样本，128 × 128 像素，255 个电极：真值、Levenberg–Marquardt 重建、后验均值与标准差、三个样本与分辨率图",
          },
          caption: {
            en: "A grayscale photograph used as conductivity, 255 electrodes, 1 % noise. On this test image the posterior mean of 8 samples has a relative error of 0.143 against 0.188 for the Levenberg–Marquardt reconstruction; there is no evaluation over a test set yet.",
            zh: "一幅用作电导率的灰度照片，255 个电极，1% 噪声。在这张测试图上，8 个样本的后验均值相对误差为 0.143，而 Levenberg–Marquardt 重建为 0.188；尚无在测试集上的评估。",
          },
        },
      },
    ],
  },
]

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
