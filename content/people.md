---
title: People
description: The people behind MathStruct.
---

MathStruct is small for now, and open to new members: [[about#Collaboration|how to join in]].

## Daniel Boigk

Mathematician working on scientific computing, inverse problems and machine learning. Founder of
MathStruct; maintains [[projects/lenticulum-jl|Lenticulum.jl]],
[[projects/moonkale|Moonkale]] and [[projects/sophia|Sophia]].

- GitHub: [@DanielBoigk](https://github.com/DanielBoigk)

### Other projects

**[ModularEIT.jl](https://github.com/DanielBoigk/ModularEIT.jl)**: a Julia library for
electrical impedance tomography (EIT), the inverse problem of recovering a conductivity from
boundary voltage and current measurements, built from exchangeable parts:

- finite element back ends on Ferrite.jl and Gridap.jl;
- the continuum, point, gap and complete electrode models;
- least-squares objectives with adjoint gradients, Tikhonov and total-variation regularisation;
- Gauss–Newton, L-BFGS, FISTA, ADMM and plug-and-play methods;
- fast linear solvers with FFT and multigrid preconditioners, on the CPU and on GPUs;
- adaptive meshes, and synthetic data without inverse crime.

[API documentation](https://danielboigk.github.io/ModularEIT.jl/dev/) ·
[theory wiki](https://danielboigk.github.io/ModularEIT.jl/dev/wiki/)

**[EITDenoiser.jl](https://github.com/DanielBoigk/EITDenoiser.jl)**: diffusion-model priors for
EIT. A diffusion model trained on images supplies the prior, and data consistency enters every
reverse-diffusion step as an exact proximal step for the EIT residual linearised at a classical
reconstruction, so sampling needs no PDE solve. Directions the data determine come from the
data, the others from the prior, and the spread of the samples shows which is which.

![Posterior samples for EIT, 128 × 128 pixels, 255 electrodes: truth, Levenberg–Marquardt reconstruction, posterior mean and standard deviation, three samples and the resolution map](https://raw.githubusercontent.com/DanielBoigk/EITDenoiser.jl/master/assets/landscape_posterior_128.png)

*A grayscale photograph used as conductivity, 255 electrodes, 1 % noise. On this test image the
posterior mean of 8 samples has a relative error of 0.143 against 0.188 for the
Levenberg–Marquardt reconstruction; there is no evaluation over a test set yet.*

---

> [!info] Bylines
> Blog posts list their authors from the `authors:` field of their frontmatter, and each name
> links to the matching heading on this page: `## Daniel Boigk` ↔ `authors: [Daniel Boigk]`.
> To join, add a `## Your Name` section here.
