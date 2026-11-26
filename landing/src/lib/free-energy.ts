// Loopy Gaussian belief propagation on a ring, and its Bethe free energy, for the free-energy demo on
// /projects/lenticulum-jl. Small and exact enough to run in the browser: n scalar variables x_i,
// an observation factor exp(-τ/2 (x_i - y_i)²) at each, and a coupling factor exp(-λ/2 (x_i - x_{i+1})²)
// between neighbours, wired round a ring. "Cut" removes the coupling between the last and the first,
// which leaves a chain (a tree), where the Bethe free energy is exact.
//
// The free energy follows Lenticulum.jl's vault (Gaussian Graphs/Bethe Free Energy):
//   F = Σ_f ( E_{b_f}[-log f] - H[b_f] ) + Σ_v (1 - d_v) (-H[b_v]),
// with the observation factors counted as factors, so d_v = 3 on the ring.

export type Msg = { L: number; e: number } // a Gaussian message in information form: precision, precision × mean
export type State = { fwd: Msg[]; bwd: Msg[] } // fwd[i]: coupling (i, i+1) → x_{i+1}; bwd[i]: coupling (i, i+1) → x_i
export type Model = { n: number; lam: number; tau: number; y: number[]; cut: boolean }
export type Schedule = "flood" | "loop"

const LOG2PIE = Math.log(2 * Math.PI * Math.E)
const coupling = (M: Model, i: number) => (M.cut && i === M.n - 1 ? 0 : M.lam)

export function init(M: Model): State {
  const z = () => Array.from({ length: M.n }, () => ({ L: 0, e: 0 }))
  return { fwd: z(), bwd: z() }
}
const clone = (S: State): State => ({ fwd: S.fwd.map((m) => ({ ...m })), bwd: S.bwd.map((m) => ({ ...m })) })

// what x_i tells a coupling factor: its observation and its other incoming message
function v2f(M: Model, S: State, i: number, excl: "left" | "right" | null) {
  const n = M.n
  let A = M.tau
  let a = M.tau * M.y[i]
  const fromLeft = S.fwd[(i - 1 + n) % n]
  const fromRight = S.bwd[i]
  if (excl !== "left") {
    A += fromLeft.L
    a += fromLeft.e
  }
  if (excl !== "right") {
    A += fromRight.L
    a += fromRight.e
  }
  return { A, a }
}
// a coupling factor marginalises the far variable out
function f2v(A: number, a: number, l: number): Msg {
  return { L: l - (l * l) / (l + A), e: (l * a) / (l + A) }
}
const msgFwd = (M: Model, S: State, i: number) => {
  const { A, a } = v2f(M, S, i, "right")
  return f2v(A, a, coupling(M, i))
}
const msgBwd = (M: Model, S: State, i: number) => {
  const { A, a } = v2f(M, S, (i + 1) % M.n, "left")
  return f2v(A, a, coupling(M, i))
}

/** One sweep. "flood" updates every message from the old ones at once; "loop" goes once round the
 *  ring each way, using each new message as soon as it exists. Damping mixes in the old message;
 *  momentum (heavy ball) adds β × the last change. Returns the order the messages were sent in. */
export function sweep(M: Model, S: State, sched: Schedule, damp: number, beta: number, prev: State | null) {
  const old = clone(S)
  let T: State
  const order: [("fwd" | "bwd"), number][] = []
  if (sched === "flood") {
    T = { fwd: old.fwd.map((_, i) => msgFwd(M, old, i)), bwd: old.bwd.map((_, i) => msgBwd(M, old, i)) }
    for (let i = 0; i < M.n; i++) order.push(["fwd", i], ["bwd", i])
  } else {
    T = clone(old)
    for (let i = 0; i < M.n; i++) {
      T.fwd[i] = msgFwd(M, T, i)
      order.push(["fwd", i])
    }
    for (let i = M.n - 1; i >= 0; i--) {
      T.bwd[i] = msgBwd(M, T, i)
      order.push(["bwd", i])
    }
  }
  const mix = (t: Msg, o: Msg, p: Msg | undefined): Msg => {
    let L = (1 - damp) * t.L + damp * o.L
    let e = (1 - damp) * t.e + damp * o.e
    if (beta && p) {
      L += beta * (o.L - p.L)
      e += beta * (o.e - p.e)
    }
    return { L, e }
  }
  const N: State = {
    fwd: T.fwd.map((t, i) => mix(t, old.fwd[i], prev?.fwd[i])),
    bwd: T.bwd.map((t, i) => mix(t, old.bwd[i], prev?.bwd[i])),
  }
  let res = 0
  for (const k of ["fwd", "bwd"] as const)
    N[k].forEach((m, i) => {
      res = Math.max(res, Math.abs(m.L - old[k][i].L), Math.abs(m.e - old[k][i].e))
    })
  return { S: N, prev: old, res, order }
}

export function beliefs(M: Model, S: State) {
  return Array.from({ length: M.n }, (_, i) => {
    const { A, a } = v2f(M, S, i, null)
    return { m: a / A, v: 1 / A }
  })
}

export function bethe(M: Model, S: State): number {
  const n = M.n
  let F = 0
  for (let i = 0; i < n; i++) {
    const l = coupling(M, i)
    const j = (i + 1) % n
    const Ai = v2f(M, S, i, "right")
    const Aj = v2f(M, S, j, "left")
    const p11 = l + Ai.A
    const p22 = l + Aj.A
    const det = p11 * p22 - l * l
    if (!(det > 0) || !(p11 > 0)) return NaN
    const s11 = p22 / det
    const s22 = p11 / det
    const s12 = l / det
    const mi = (p22 * Ai.a + l * Aj.a) / det
    const mj = (p11 * Aj.a + l * Ai.a) / det
    F += (l / 2) * ((mi - mj) ** 2 + s11 + s22 - 2 * s12) // E[-log f] of the coupling
    F -= 0.5 * (2 * LOG2PIE + Math.log(s11 * s22 - s12 * s12)) // - H[b_f]
  }
  // each observation factor gives E[-log f] - H[b_v]; each variable then (1 - d_v)(-H[b_v]) with
  // d_v = 3 (two couplings and its observation), which nets to E[-log f] + H[b_v]
  const bs = beliefs(M, S)
  for (let i = 0; i < n; i++) {
    const { m, v } = bs[i]
    if (!(v > 0)) return NaN
    F += (M.tau / 2) * ((m - M.y[i]) ** 2 + v) + 0.5 * (LOG2PIE + Math.log(v))
  }
  return F
}

/** The exact free energy -log p(y) (up to the same constants) and the exact means, by Cholesky. */
export function exact(M: Model) {
  const n = M.n
  const Q = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return M.tau + coupling(M, i) + coupling(M, (i - 1 + n) % n)
      if (j === (i + 1) % n) return -coupling(M, i)
      if (i === (j + 1) % n) return -coupling(M, j)
      return 0
    }),
  )
  const h = M.y.map((v) => M.tau * v)
  const C = Q.map((r) => r.map(() => 0))
  let logdet = 0
  for (let i = 0; i < n; i++)
    for (let j = 0; j <= i; j++) {
      let s = Q[i][j]
      for (let k = 0; k < j; k++) s -= C[i][k] * C[j][k]
      if (i === j) {
        C[i][i] = Math.sqrt(s)
        logdet += 2 * Math.log(C[i][i])
      } else C[i][j] = s / C[j][j]
    }
  const z: number[] = []
  for (let i = 0; i < n; i++) {
    let s = h[i]
    for (let k = 0; k < i; k++) s -= C[i][k] * z[k]
    z[i] = s / C[i][i]
  }
  const quad = z.reduce((s, v) => s + v * v, 0)
  const logZ = 0.5 * quad - 0.5 * M.tau * M.y.reduce((s, v) => s + v * v, 0) + (n / 2) * Math.log(2 * Math.PI) - 0.5 * logdet
  return -logZ
}

// ------------------------------------------------------------------ the moving target
/** A target moving at steady speeds (a triangle wave), observed with noise, and two beliefs that
 *  descend the same prediction error: one carries a position only, the other a position and a
 *  velocity (generalised coordinates, order 1). Returns the traces and the RMS error after t = 5. */
export function track(seconds = 24, dt = 0.05, k = 3, k2 = 6, sigma = 0.15, period = 8) {
  let seed = 7
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const gauss = () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(2 * Math.PI * rnd())
  const tri = (t: number) => {
    const p = (((t / period) % 1) + 1) % 1
    return p < 0.5 ? -1.8 + 7.2 * p : 1.8 - 7.2 * (p - 0.5)
  }
  const out = { t: [] as number[], x: [] as number[], y: [] as number[], o0: [] as number[], o1: [] as number[] }
  let m0 = 0
  let m1 = 0
  let v1 = 0
  let e0 = 0
  let e1 = 0
  let n = 0
  for (let t = 0; t <= seconds + 1e-9; t += dt) {
    const x = tri(t)
    const y = x + sigma * gauss()
    m0 += dt * k * (y - m0) // order 0: dμ/dt = -k ∂F/∂μ
    const err = y - m1
    m1 += dt * (v1 + k * err) // order 1: dμ/dt = μ' - k ∂F/∂μ  (descent in a moving frame)
    v1 += dt * k2 * err //          dμ'/dt = -k₂ ∂F/∂μ
    out.t.push(t)
    out.x.push(x)
    out.y.push(y)
    out.o0.push(m0)
    out.o1.push(m1)
    if (t > 5) {
      e0 += (m0 - x) ** 2
      e1 += (m1 - x) ** 2
      n++
    }
  }
  return { ...out, rms0: Math.sqrt(e0 / n), rms1: Math.sqrt(e1 / n), lag0: (7.2 / period) / k }
}
