// The backdrop: a Gulf-coast barrier-island beach in Florida through a whole
// day: white sugar sand, sea oats on the dunes, coconut palms, a distant pier,
// textured clouds and the Gulf. Each Stage is a time of day with its own
// palette and sun (or moon) position; the weather is fair, or a storm.
// Detail sits at the top, the corners and the foot; the middle stays calm sky
// and water so the conversation reads over it.

export type Stage =
  | 'dawn' | 'sunrise' | 'early' | 'morning' | 'midday' | 'afternoon'
  | 'golden' | 'sunset' | 'dusk' | 'night'

export const STAGES: readonly Stage[] = [
  'dawn', 'sunrise', 'early', 'morning', 'midday', 'afternoon', 'golden', 'sunset', 'dusk', 'night',
]

export type Weather = 'fair' | 'storm'

export const WEATHERS: readonly Weather[] = ['fair', 'storm']

type Palette = {
  sky: readonly string[]
  sun: string
  glow: string
  sunX: number
  sunY: number
  sunR: number
  isMoon: boolean
  cloud: string
  cloudLit: string
  cloudAmount: number
  sea: readonly string[]
  ripple: string
  glitter: string
  foam: string
  sand: readonly [string, string]
  wet: string
  sil: string
  stars: boolean
}

export const PALETTES: Record<Stage, Palette> = {
  dawn: {
    sky: ['#1a1e4a', '#3a3a78', '#8a6a9a', '#e89a9a', '#ffc0a0'],
    sun: '#ffd0b0', glow: '#ff9a8a', sunX: 300, sunY: 620, sunR: 44, isMoon: false,
    cloud: '#5a4a7a', cloudLit: '#ffa0a0', cloudAmount: 0.9,
    sea: ['#d89aa8', '#5a5a90', '#3a5a88', '#5a8aa0'],
    ripple: '#ffc8c0', glitter: '#ffb0a0', foam: '#f4e0e4',
    sand: ['#d8c0c0', '#a89098'], wet: '#8a7084',
    sil: '#1a1830', stars: false,
  },
  sunrise: {
    sky: ['#4a5a9a', '#8a8ec0', '#e0b0c0', '#ffc8a8', '#ffe0b8'],
    sun: '#fff0d8', glow: '#ffb89a', sunX: 280, sunY: 552, sunR: 46, isMoon: false,
    cloud: '#b0a2c4', cloudLit: '#ffc8b8', cloudAmount: 0.85,
    sea: ['#e8b8b8', '#8a9ac8', '#5aa0c0', '#7ad0c8'],
    ripple: '#fff0e8', glitter: '#ffe0d0', foam: '#ffffff',
    sand: ['#f6e2d0', '#e0c4aa'], wet: '#c8aa98',
    sil: '#2a2840', stars: false,
  },
  early: {
    sky: ['#5a7ac8', '#8aa6dc', '#d8c8d8', '#ffd8b8', '#ffe8c8'],
    sun: '#fff4e0', glow: '#ffd0a0', sunX: 330, sunY: 430, sunR: 44, isMoon: false,
    cloud: '#d8d0e4', cloudLit: '#ffd8c0', cloudAmount: 0.8,
    sea: ['#f0c8b0', '#7aa0d0', '#3aa8c8', '#6ad8cc'],
    ripple: '#fff4ea', glitter: '#ffe8d0', foam: '#ffffff',
    sand: ['#fbeedc', '#eed8bc'], wet: '#d4bca0',
    sil: '#262a40', stars: false,
  },
  morning: {
    sky: ['#4a86e0', '#78a8ec', '#b0d0f4', '#e0eef8', '#f4f8fa'],
    sun: '#fffdf4', glow: '#fffbe8', sunX: 480, sunY: 230, sunR: 40, isMoon: false,
    cloud: '#f4f6fa', cloudLit: '#ffffff', cloudAmount: 0.55,
    sea: ['#8ac0e8', '#3aa8e0', '#30cfd8', '#8af0e0'],
    ripple: '#ffffff', glitter: '#ffffff', foam: '#ffffff',
    sand: ['#fdf8f0', '#efe4d0'], wet: '#dccfb4',
    sil: '#2a3448', stars: false,
  },
  midday: {
    sky: ['#0a3fb8', '#1f64e0', '#4a90f0', '#8cc0f6', '#c4e2fa'],
    sun: '#ffffff', glow: '#ffffff', sunX: 800, sunY: 90, sunR: 38, isMoon: false,
    cloud: '#ffffff', cloudLit: '#ffffff', cloudAmount: 0.3,
    sea: ['#1a7fd0', '#0a9ad0', '#00c8c0', '#40f0c8'],
    ripple: '#ffffff', glitter: '#ffffff', foam: '#ffffff',
    sand: ['#ffffff', '#f4ead6'], wet: '#e2d4b4',
    sil: '#1e2a3a', stars: false,
  },
  afternoon: {
    sky: ['#2c5cb0', '#5a84cc', '#a0b4d8', '#e4dcc8', '#f6e2b8'],
    sun: '#fff2d0', glow: '#ffe0a0', sunX: 960, sunY: 300, sunR: 44, isMoon: false,
    cloud: '#e8e2e6', cloudLit: '#ffe8c0', cloudAmount: 1,
    sea: ['#c0b890', '#2a78b8', '#1a96b0', '#3ac0b0'],
    ripple: '#fff0d0', glitter: '#fff0c8', foam: '#ffffff',
    sand: ['#f8ecd4', '#e8d4b0'], wet: '#d0b892',
    sil: '#20263a', stars: false,
  },
  golden: {
    sky: ['#2e4f9a', '#5a78b8', '#a8a6b8', '#f2c48a', '#ffd27a'],
    sun: '#fff4d2', glow: '#ffc65a', sunX: 1040, sunY: 470, sunR: 50, isMoon: false,
    cloud: '#8a86a8', cloudLit: '#ffd08a', cloudAmount: 0.9,
    sea: ['#c8a878', '#3f6fae', '#2a8cb0', '#4cc8bc'],
    ripple: '#ffe6b8', glitter: '#ffe6a0', foam: '#ffffff',
    sand: ['#f7e6cc', '#e2c8a2'], wet: '#c9ac88',
    sil: '#1a1a2a', stars: false,
  },
  sunset: {
    sky: ['#1c2a72', '#3e4aa0', '#9a6aa4', '#ff8a5a', '#ffbe55'],
    sun: '#fff0b0', glow: '#ff9a4a', sunX: 1040, sunY: 556, sunR: 62, isMoon: false,
    cloud: '#4c4482', cloudLit: '#ff9e6a', cloudAmount: 1,
    sea: ['#f0a070', '#9a7aa6', '#3f73b8', '#2aa0b4'],
    ripple: '#ffd6b0', glitter: '#ffd48a', foam: '#fff4ea',
    sand: ['#f6d4b4', '#d8a88e'], wet: '#b88a80',
    sil: '#14112a', stars: false,
  },
  dusk: {
    sky: ['#0a0e30', '#1e2460', '#4a3a80', '#b05a7a', '#f08a5a'],
    sun: '#ffb07a', glow: '#ff7a5a', sunX: 1040, sunY: 610, sunR: 50, isMoon: false,
    cloud: '#2a2458', cloudLit: '#d0607a', cloudAmount: 0.95,
    sea: ['#c0607a', '#3a3a7a', '#1a2a5a', '#1a4a6a'],
    ripple: '#ffb0a0', glitter: '#ff9a7a', foam: '#f0d8e0',
    sand: ['#a88a90', '#6a5a70'], wet: '#4a3a5a',
    sil: '#0a0818', stars: false,
  },
  night: {
    sky: ['#000000', '#050a28', '#0f1a4e', '#22306c', '#6a4a72'],
    sun: '#f6f3e8', glow: '#6a78c0', sunX: 1120, sunY: 170, sunR: 30, isMoon: true,
    cloud: '#141c46', cloudLit: '#4a4a86', cloudAmount: 0.8,
    sea: ['#3a3670', '#1c2458', '#0e1a3c', '#0a1c30'],
    ripple: '#b8c4ff', glitter: '#e4e8ff', foam: '#c8d2f0',
    sand: ['#4a4c78', '#2a2c50'], wet: '#20223e',
    sil: '#000000', stars: true,
  },
}

const r1 = (n: number) => Math.round(n * 10) / 10

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255].map(v => r1(v * 100) / 100) as [
    number,
    number,
    number,
  ]
}

// Noise shaped into cloud banks of one color: the alpha comes from the noise,
// pushed through a threshold so the sky shows between the clouds.
function cloudFilter(id: string, color: string, seed: number, gain: number, cut: number): string {
  const [r, g, b] = rgb(color)
  return `<filter id="${id}" x="0" y="0" width="1600" height="560" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.0021 0.0085" numOctaves="5" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} ${gain} 0 0 0 ${cut}"/></filter>`
}

// A seeded random source, so the drawing is the same every time.
function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function mix(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const ch = (shift: number) =>
    Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t)
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, '0')}`
}

// A coconut palm as a sunset silhouette: a curved, tapering trunk and a crown
// of arching fronds, each a drooping stem lined with fine leaflets.
function coconutPalm(
  x: number, base: number, height: number, lean: number, scale: number,
  color: string, seed: number, delay: number,
): string {
  const rand = rng(seed)
  const tx = x + lean
  const ty = base - height
  // Trunk: a cubic curve, sampled, widened into a tapering outline.
  const c1x = x + lean * 0.05
  const c1y = base - height * 0.45
  const c2x = x + lean * 0.75
  const c2y = base - height * 0.82
  const left: string[] = []
  const right: string[] = []
  for (let i = 0; i <= 24; i++) {
    const t = i / 24
    const u = 1 - t
    const px = u * u * u * x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * tx
    const py = u * u * u * base + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * ty
    const dx = 3 * u * u * (c1x - x) + 6 * u * t * (c2x - c1x) + 3 * t * t * (tx - c2x)
    const dy = 3 * u * u * (c1y - base) + 6 * u * t * (c2y - c1y) + 3 * t * t * (ty - c2y)
    const len = Math.hypot(dx, dy) || 1
    const w = (t < 0.06 ? 30 - t * 100 : 24 - t * 11) * scale * 0.5
    const nx = (-dy / len) * w
    const ny = (dx / len) * w
    left.push(`${r1(px + nx)} ${r1(py + ny)}`)
    right.unshift(`${r1(px - nx)} ${r1(py - ny)}`)
  }
  const trunk = `M${left.join('L')}L${right.join('L')}Z`

  let stems = ''
  let leaves = ''
  const fronds = 18
  for (let f = 0; f < fronds; f++) {
    // Spread the fronds around the crown: most arch up and out, some hang.
    const spread = -200 + (f / (fronds - 1)) * 220 + (rand() - 0.5) * 14
    let heading = (spread * Math.PI) / 180
    const length = (200 + rand() * 70) * scale * (spread > -40 || spread < -160 ? 0.85 : 1)
    const steps = 32
    const step = length / steps
    let px = tx
    let py = ty
    // Coordinates after the first are relative and whole, which draws the same
    // and keeps the scene well under the app's size limit.
    let lastX = Math.round(px)
    let lastY = Math.round(py)
    let stem = `M${lastX} ${lastY}`
    const gravity = 0.075 + rand() * 0.03
    for (let k = 1; k <= steps; k++) {
      // Gravity turns the heading toward straight down (pi / 2).
      const down = Math.PI / 2
      let diff = down - heading
      while (diff > Math.PI) diff -= 2 * Math.PI
      while (diff < -Math.PI) diff += 2 * Math.PI
      heading += diff * gravity * (k / steps + 0.4)
      px += Math.cos(heading) * step
      py += Math.sin(heading) * step
      const sx = Math.round(px)
      const sy = Math.round(py)
      stem += `l${sx - lastX} ${sy - lastY}`
      lastX = sx
      lastY = sy
      if (k < 2) continue
      const t = k / steps
      const leafLen = 44 * scale * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.15)), 0.55) * (0.92 + rand() * 0.16)
      for (const side of [-1, 1]) {
        let a = heading + side * (1.05 + (rand() - 0.5) * 0.12)
        // Leaflets hang: pull each toward straight down.
        let d = Math.PI / 2 - a
        while (d > Math.PI) d -= 2 * Math.PI
        while (d < -Math.PI) d += 2 * Math.PI
        a += d * 0.32
        const ex = px + Math.cos(a) * leafLen
        const ey = py + Math.sin(a) * leafLen
        const mx = (px + ex) / 2 + Math.cos(a + side * 0.5) * leafLen * 0.08
        const my = (py + ey) / 2 - leafLen * 0.06
        leaves += `M${sx} ${sy}q${Math.round(mx) - sx} ${Math.round(my) - sy} ${Math.round(ex) - sx} ${Math.round(ey) - sy}`
      }
    }
    stems += stem
  }
  const nuts = [[-10, 14], [6, 18], [16, 8], [-4, 24], [-18, 6]]
    .map(([dx, dy]) => `<circle cx="${r1(tx + dx! * scale)}" cy="${r1(ty + dy! * scale)}" r="${r1(8 * scale)}"/>`)
    .join('')
  return `<g fill="${color}" stroke="${color}" stroke-linecap="round"><path d="${trunk}" stroke="none"/><g class="sway" style="transform-origin:${r1(tx)}px ${r1(ty)}px;animation-delay:-${delay}s"><path d="${stems}" fill="none" stroke-width="${r1(3.4 * scale)}"/><path d="${leaves}" fill="none" stroke-width="${r1(2.4 * scale)}"/>${nuts}</g></g>`
}

// Dune grass and sea oats: fine arching blades and slender seed panicles.
function dunePlants(x0: number, x1: number, base: number, color: string, seed: number, delay: number): string {
  const rand = rng(seed)
  let blades = ''
  let heads = ''
  for (let i = 0; i < 70; i++) {
    const x = x0 + rand() * (x1 - x0)
    const b = base + rand() * 14
    const h = 30 + rand() * 60
    const bend = (rand() - 0.5) * 50
    blades += `M${r1(x)} ${r1(b)}Q${r1(x + bend * 0.3)} ${r1(b - h * 0.7)} ${r1(x + bend)} ${r1(b - h)}`
  }
  for (let i = 0; i < 16; i++) {
    const x = x0 + rand() * (x1 - x0)
    const b = base + rand() * 10
    const h = 100 + rand() * 50
    const bend = (rand() - 0.5) * 70
    const ex = x + bend
    const ey = b - h
    blades += `M${r1(x)} ${r1(b)}Q${r1(x + bend * 0.2)} ${r1(b - h * 0.6)} ${r1(ex)} ${r1(ey)}`
    const dir = bend >= 0 ? 1 : -1
    for (let s = 0; s < 7; s++) {
      const sx = ex + dir * s * 1.6
      const sy = ey + s * 5.5
      heads += `M${r1(sx)} ${r1(sy)}l${r1(dir * 5)} ${r1(6)}`
    }
  }
  return `<g class="oats" fill="none" stroke="${color}" stroke-linecap="round" style="transform-origin:${(x0 + x1) / 2}px ${base}px;animation-delay:-${delay}s"><path d="${blades}" stroke-width="1.4"/><path d="${heads}" stroke-width="2.6"/></g>`
}

// The pier far down the beach: a long, low deck on fine pilings with a small
// shelter at the end, softened by haze.
function pier(color: string): string {
  const deckY = 572
  let d = `M1250 ${deckY}H1600v4H1250Z`
  for (let x = 1254; x <= 1600; x += 8) d += `M${x} ${deckY + 4}h2v13h-2Z`
  d += `M1250 ${deckY - 5}H1600v1H1250Z`
  for (let x = 1252; x <= 1600; x += 14) d += `M${x} ${deckY - 5}h0.9v5h-0.9Z`
  d += `M1252 ${deckY}v-11h1.5v11ZM1280 ${deckY}v-11h1.5v11ZM1246 ${deckY - 10}L1267 ${deckY - 17}L1288 ${deckY - 10}Z`
  return `<path fill="${color}" d="${d}"/><path fill="${color}" opacity=".18" d="M1250 ${deckY + 16}H1600v6H1250Z"/>`
}

// The shoreline, left to right, shifted down by dy; shoreBack closes a band of
// the given depth by running the same line back right to left.
const SHORE_PTS = [
  [0, 760], [260, 742], [520, 772], [760, 780], [1000, 786], [1240, 752], [1440, 760], [1600, 774],
] as const

function shore(dy: number): string {
  const [first, ...rest] = SHORE_PTS
  let d = `M${first[0]} ${first[1] + dy}`
  rest.forEach(([x, y], i) => {
    const [px, py] = SHORE_PTS[i]!
    const mx = (px + x) / 2
    d += `C${mx} ${py + dy} ${mx} ${y + dy} ${x} ${y + dy}`
  })
  return d
}

function shoreBack(dy: number): string {
  const pts = [...SHORE_PTS].reverse()
  let d = `L${pts[0]![0]} ${pts[0]![1] + dy}`
  pts.slice(1).forEach(([x, y], i) => {
    const [px, py] = pts[i]!
    const mx = (px + x) / 2
    d += `C${mx} ${py + dy} ${mx} ${y + dy} ${x} ${y + dy}`
  })
  return d
}

const STARS = [
  [90, 60], [240, 140], [380, 50], [520, 120], [660, 40], [800, 150], [930, 70], [1010, 30], [1250, 110],
  [1330, 60], [1480, 120], [160, 260], [450, 230], [720, 270], [960, 240], [1290, 220], [1540, 280], [600, 330],
] as const

type Look = Palette & { sunOpacity: number; cover: number; rain: boolean }

// A storm greys the sky, sea and sand, closes the clouds over the sun and
// brings in rain; fair weather leaves the time of day as it is.
function withWeather(base: Palette, weather: Weather): Look {
  const gray = (list: readonly string[], to: string, t: number) => list.map(c => mix(c, to, t))
  switch (weather) {
    case 'fair':
      return { ...base, sunOpacity: 1, cover: -1.3, rain: false }
    case 'storm':
      return {
        ...base,
        sky: gray(base.sky, '#2c3139', 0.72),
        sea: gray(base.sea, '#2a3c42', 0.68),
        sand: [mix(base.sand[0], '#8a8a8a', 0.4), mix(base.sand[1], '#6a6a6a', 0.4)],
        cloud: mix(base.cloud, '#1e2228', 0.85),
        cloudLit: mix(base.cloudLit, '#4a505c', 0.7),
        glitter: mix(base.glitter, '#6a707c', 0.7),
        cloudAmount: 1,
        sunOpacity: 0,
        cover: -0.3,
        rain: true,
        stars: false,
      }
  }
}

export function sceneSvg(stage: Stage, weather: Weather = 'fair'): string {
  const p = withWeather(PALETTES[stage], weather)
  // The soft fade behind the chat: dark in dark mode, sand in light mode, but
  // always dark over a dark scene, where a pale fade would look like fog.
  const isDarkScene = stage === 'dusk' || stage === 'night' || weather === 'storm'
  const scrimCss = isDarkScene
    ? '.sc{stop-color:#04040c}'
    : '.sc{stop-color:#04040c}\n@media (prefers-color-scheme: light){.sc{stop-color:#f7f0e4}}'
  const stops = (list: readonly string[]) =>
    list.map((c, i) => `<stop offset="${r1(i / (list.length - 1))}" stop-color="${c}"/>`).join('')
  const glitter = Array.from({ length: 9 }, (_, i) => {
    const y = 566 + i * 20
    const w = 40 + i * 22 + ((i * 37) % 30)
    const dx = ((i * 53) % 40) - 20
    return `<rect class="gl" x="${r1(p.sunX + dx - w / 2)}" y="${y}" width="${w}" height="3" rx="1.5" fill="${p.glitter}" style="animation-delay:-${r1(i * 0.9)}s"/>`
  }).join('')
  // Rain: thin slanted streaks drifting down slowly, kept faint.
  const rainRand = rng(5)
  let rainPath = ''
  for (let i = 0; i < 90; i++) {
    const x = Math.round(rainRand() * 1700 - 50)
    const y = Math.round(rainRand() * 1000)
    rainPath += `M${x} ${y}l-8 26`
  }
  const rain = `<g class="rain" stroke="#c8d0dc" stroke-width="1.2" stroke-linecap="round" opacity=".22"><path d="${rainPath}"/><path d="${rainPath}" transform="translate(300 -1000)"/></g>`
  const stars = p.stars
    ? STARS.map(
        ([x, y], i) =>
          `<circle class="tw" cx="${x}" cy="${y}" r="${i % 3 === 0 ? 1.8 : 1.2}" fill="#ffffff" style="animation-delay:-${r1((i * 0.7) % 5)}s"/>`,
      ).join('')
    : ''
  // A crescent moon: the lit outer edge, then a shallower arc back.
  const disc = p.isMoon
    ? `<path fill="${p.sun}" d="M${p.sunX} ${p.sunY - p.sunR}A${p.sunR} ${p.sunR} 0 1 0 ${p.sunX} ${p.sunY + p.sunR}A${r1(p.sunR * 0.72)} ${p.sunR} 0 1 1 ${p.sunX} ${p.sunY - p.sunR}Z"/>`
    : `<circle cx="${p.sunX}" cy="${p.sunY}" r="${p.sunR}" fill="${p.sun}"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
.gl{opacity:.55;animation:glint 6s ease-in-out infinite}
.tw{opacity:.7;animation:twinkle 6s ease-in-out infinite}
.wash{opacity:0;animation:wash 10s ease-in-out infinite}
.crest{opacity:.3;animation:roll 16s ease-in-out infinite alternate}
.c2{animation-duration:21s;animation-direction:alternate-reverse}
.c3{animation-duration:13s}
.sway{animation:sway 8s ease-in-out infinite}
.oats{animation:oats 6s ease-in-out infinite}
.drift{animation:drift 240s ease-in-out infinite alternate}
@keyframes fall{from{transform:translate(0,0)}to{transform:translate(-300px,1000px)}}
.rain{animation:fall 9s linear infinite}
@keyframes glint{0%,100%{opacity:.3}50%{opacity:.75}}
@keyframes twinkle{0%,100%{opacity:.35}50%{opacity:.9}}
@keyframes wash{0%{transform:translateY(-30px);opacity:0}25%{opacity:.95}60%{transform:translateY(12px);opacity:.8}100%{transform:translateY(24px);opacity:0}}
@keyframes roll{from{transform:translateX(0)}to{transform:translateX(-160px)}}
@keyframes sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}
@keyframes oats{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.5deg)}}
@keyframes drift{from{transform:translateX(0)}to{transform:translateX(-90px)}}
${scrimCss}
</style>
<defs>
<linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0"><stop offset="0" class="sc" stop-opacity="0"/><stop offset=".22" class="sc" stop-opacity=".1"/><stop offset=".36" class="sc" stop-opacity=".3"/><stop offset=".5" class="sc" stop-opacity=".38"/><stop offset=".64" class="sc" stop-opacity=".3"/><stop offset=".78" class="sc" stop-opacity=".1"/><stop offset="1" class="sc" stop-opacity="0"/></linearGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">${stops(p.sky)}</linearGradient>
<linearGradient id="skyFlip" x1="0" y1="1" x2="0" y2="0">${stops(p.sky)}</linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">${stops(p.sea)}</linearGradient>
<linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sand[0]}"/><stop offset="1" stop-color="${p.sand[1]}"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${p.glow}" stop-opacity=".9"/><stop offset=".4" stop-color="${p.glow}" stop-opacity=".35"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>
<linearGradient id="bandG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".2" stop-color="#fff" stop-opacity="${p.cloudAmount}"/><stop offset=".62" stop-color="#fff" stop-opacity="${p.cloudAmount * 0.8}"/><stop offset=".9" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="band" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="560"><rect width="1600" height="560" fill="url(#bandG)"/></mask>
${cloudFilter('cloudLit', p.cloudLit, 23, 2.4, p.cover + 0.25)}
${cloudFilter('cloudBody', p.cloud, 23, 2.6, p.cover)}
<filter id="ripples" x="0" y="560" width="1600" height="240" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.0016 0.09" numOctaves="2" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 ${rgb(p.ripple).join(' 0 0 0 0 ')} 3.2 0 0 0 -1.95"/></filter>
<filter id="grain" x="0" y="740" width="1600" height="260" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 0.4 0 0 0 0 0.32 0 0 0 0 0.24 1.4 0 0 0 -0.75"/></filter>
</defs>
<rect width="1600" height="560" fill="url(#sky)"/>
${stars}
<g opacity="${p.sunOpacity}"><circle cx="${p.sunX}" cy="${p.sunY}" r="${p.sunR * 5}" fill="url(#glow)"/>
${disc}</g>
<g mask="url(#band)"><g class="drift">
<rect width="1700" height="560" filter="url(#cloudLit)" transform="translate(0 10)"/>
<rect width="1700" height="560" filter="url(#cloudBody)"/>
</g></g>
<rect y="556" width="1600" height="444" fill="url(#sea)"/>
<rect y="556" width="1600" height="240" filter="url(#ripples)" opacity=".35"/>
<rect y="554" width="1600" height="4" fill="${p.glow}" opacity=".5"/>
${p.sunOpacity > 0 ? glitter : ''}
${pier(mix(p.sil, p.sky[4]!, 0.45))}
<g fill="none" stroke="${p.foam}" stroke-linecap="round">
<path class="crest" d="M-100 690q60 -8 120 0t120 0t120 0t120 0" stroke-width="2.5"/>
<path class="crest c2" d="M860 708q70 -10 140 0t140 0t140 0t140 0" stroke-width="2.5"/>
<path class="crest c3" d="M380 728q80 -10 160 0t160 0t160 0" stroke-width="3"/>
</g>
<path fill="url(#sand)" d="${shore(0)}V1000H0Z"/>
<rect y="740" width="1600" height="260" filter="url(#grain)" opacity=".18"/>
<path fill="${p.wet}" opacity=".55" d="${shore(0)}${shoreBack(40)}Z"/>
<path fill="url(#skyFlip)" opacity=".28" d="${shore(0)}${shoreBack(34)}Z"/>
${[0, 1, 2]
  .map(
    i =>
      `<g class="wash" style="animation-delay:-${r1(i * 3.3)}s"><path fill="${p.sea[3]}" opacity=".6" d="${shore(-12)}${shoreBack(8)}Z"/><path fill="${p.foam}" d="${shore(4)}${shoreBack(13)}Z"/></g>`,
  )
  .join('')}
<path fill="${p.sand[1]}" d="M0 1000V880C80 860 180 850 300 872C360 884 400 920 430 1000Z"/>
<path fill="${p.sand[1]}" d="M1600 1000V870C1520 856 1440 860 1360 888C1320 904 1290 940 1270 1000Z"/>
${dunePlants(0, 360, 905, p.sil, 3, 0)}
${dunePlants(1290, 1600, 900, p.sil, 8, 3)}
${coconutPalm(330, 880, 330, 70, 0.62, mix(p.sil, p.sky[2]!, 0.35), 21, 2)}
${coconutPalm(60, 1030, 640, 150, 1.05, p.sil, 7, 0)}
${coconutPalm(1580, 1010, 560, -150, 0.95, p.sil, 13, 4)}
${p.rain ? rain : ''}
<rect width="1600" height="1000" fill="url(#scrim)"/>
</svg>`
}
