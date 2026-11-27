---
title: Daniel Boigk
description: 数学家；MathStruct 创始人。
---

研究科学计算、逆问题与机器学习的数学家。MathStruct 创始人；维护 [Lenticulum.jl](/zh/projects/lenticulum-jl)、[Moonkale](/zh/projects/moonkale) 与 [Sophia](/zh/projects/sophia)。

- GitHub：[@DanielBoigk](https://github.com/DanielBoigk)

## 背景

- **动作捕捉**：用 Azure Kinect 深度相机与 Vicon 基于标记点的光学系统，使用 Python。
- **传感器融合**：用 GTSAM 在因子图上做传感器融合。因子图的局限（高斯、线性化、手工搭建）引出了后来成为 Lenticulum.jl 的问题：[Lenticulum.jl 的由来](/zh/about#origins)。

## 其他项目

**[ModularEIT.jl](https://github.com/DanielBoigk/ModularEIT.jl)**：面向电阻抗断层成像（EIT）的 Julia 库。EIT 是从边界电压与电流测量反演电导率的逆问题，该库由可替换的部件构建：

- 基于 Ferrite.jl 与 Gridap.jl 的有限元后端；
- 连续、点、缺口与完整电极模型；
- 带伴随梯度的最小二乘目标，Tikhonov 与全变差正则化；
- Gauss–Newton、L-BFGS、FISTA、ADMM 与即插即用方法；
- 带 FFT 与多重网格预条件子的快速线性求解器，覆盖 CPU 与 GPU；
- 自适应网格，以及无逆犯罪（inverse crime）的合成数据。

[API 文档](https://danielboigk.github.io/ModularEIT.jl/dev/) ·
[理论维基](https://danielboigk.github.io/ModularEIT.jl/dev/wiki/)

**[EITDenoiser.jl](https://github.com/DanielBoigk/EITDenoiser.jl)**：面向 EIT 的扩散模型先验。在图像上训练的扩散模型提供先验；数据一致性以对 EIT 残差在经典重建处线性化后的精确近端步进入每一个逆扩散步，因此采样无需解 PDE。数据决定的方向来自数据，其余来自先验，样本的离散程度显示谁是主宰。

![EIT 的后验样本，128 × 128 像素，255 个电极：真值、Levenberg–Marquardt 重建、后验均值与标准差、三个样本与分辨率图](https://raw.githubusercontent.com/DanielBoigk/EITDenoiser.jl/master/assets/landscape_posterior_128.png)

*一幅用作电导率的灰度照片，255 个电极，1% 噪声。在这张测试图上，8 个样本的后验均值相对误差为 0.143，而 Levenberg–Marquardt 重建为 0.188；尚无在测试集上的评估。*
