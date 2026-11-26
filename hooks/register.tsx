import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register, ThemeColors, ThemeSetArgs } from 'claude-code'

import type { Limit } from '../types'
import { makeColors } from './make-colors.js'
import { sceneSvg, STAGES, WEATHERS } from './scene'
import type { Stage, Weather } from './scene'

// A Florida Gulf-coast beach through a whole day. Your usage sits in a card
// centered above the prompt. The 5-hour window is the scene, one step every
// 10%: dawn, sunrise, early morning, morning, midday, afternoon, golden hour,
// sunset, dusk, night. The weekly limit stays out of the scene until it nears
// its cap: from 85% a storm rolls in, since the week is then what will stop you.

const limits = atom({ plugin: 'gulf-sunset', key: 'limits' } as const, null)

type Anchors = { 'surface-0': string; 'text-primary': string } & Record<string, string>

function colorsFor(label: string, accent: string, dark: Anchors, light: Anchors) {
  return makeColors({
    label,
    roles: { accent, danger: '#ff4f6a', success: '#1fc8b4', warning: '#ffa63a', pro: '#a77bff' },
    dark: { gray: { anchors: dark } },
    light: { gray: { anchors: light } },
  })
}

// Dark mode sits near true black, tinted toward indigo, so the scene and the
// colors pop on an OLED screen. Light mode is white sand.
const DARK: Anchors = {
  'surface-0': '#030308', 'surface-1': '#0b0b16', 'surface-2': '#12121f', 'surface-3': '#161626',
  'text-primary': '#f7f5fc', 'text-secondary': '#e2dfee', 'text-muted': '#cbc8da',
}
const LIGHT: Anchors = {
  'surface-0': '#efe7da', 'surface-1': '#f6f0e6', 'surface-2': '#fcf9f3',
  'text-primary': '#1a1a2c', 'text-secondary': '#3a3a50', 'text-muted': '#535368',
}

const ACCENTS: Record<Stage, string> = {
  dawn: '#e07aa0', sunrise: '#ff8fa3', early: '#ff9e7a',
  morning: '#3a9dff', midday: '#1fb8e0', afternoon: '#3a8dff',
  golden: '#ffb03a', sunset: '#ff7a45', dusk: '#e0608a', night: '#8a7cff',
}

const LABELS: Record<Stage, string> = {
  dawn: 'Dawn', sunrise: 'Sunrise', early: 'Early morning', morning: 'Morning', midday: 'Midday', afternoon: 'Afternoon',
  golden: 'Golden hour', sunset: 'Sunset', dusk: 'Dusk', night: 'Night',
}

const BUILT = Object.fromEntries(
  STAGES.map(stage => [stage, colorsFor(LABELS[stage], ACCENTS[stage], DARK, LIGHT)]),
) as Record<Stage, ReturnType<typeof makeColors>>

// One time of day for every 10% of the 5-hour window, in STAGES order.
function stageAt(percent: number): Stage {
  const index = Math.max(0, Math.min(STAGES.length - 1, Math.floor(percent / 10)))
  return STAGES[index]!
}

// The weekly limit only shows in the scene as a storm near its cap.
const STORM_FROM = 85

type Scene = { stage: Stage; weather: Weather }

// Solid cards under each message keep the words readable over the scene.
// Yours take the color of the time of day, deepened in dark mode and washed
// pale in light mode; Claude's stay a neutral card, so the two read apart.
function mixHex(a: string, b: string, t: number): `#${string}` {
  const pa = parseInt(a.slice(1), 16)
  const pb = parseInt(b.slice(1), 16)
  const ch = (shift: number) => Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t)
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, '0')}`
}

export function messageColors(stage: Stage) {
  const accent = ACCENTS[stage]
  return {
    dark: {
      'bg-user-message': mixHex('#10081a', accent, 0.44),
      'text-user-message': '#ffffff' as const,
      'bg-assistant-message': '#0b0b16' as const,
      'text-assistant-message': '#f7f5fc' as const,
    },
    light: {
      'bg-user-message': mixHex('#fcf9f3', accent, 0.22),
      'text-user-message': mixHex('#14141f', accent, 0.15),
      'bg-assistant-message': '#fcf9f3' as const,
      'text-assistant-message': '#1a1a2c' as const,
    },
  }
}

function withMessageColors(colors: ThemeColors, stage: Stage): ThemeColors {
  const own = messageColors(stage)
  return {
    ...colors,
    inputs: {
      light: { ...colors.inputs.light, ...own.light },
      dark: { ...colors.inputs.dark, ...own.dark },
    },
  }
}

const card = { radius: 14, padding: 14 } as const

// A light frost on the app's panels: the scene's own fade does the rest.
const GLASS = { blur: 8, opacity: 0.22 } as const

function lookFor({ stage, weather }: Scene): ThemeSetArgs {
  return {
    colors: withMessageColors(BUILT[stage].theme, stage),
    backdrop: { scene: `${stage}-${weather}`, glass: GLASS },
    style: {
      UserMessage: { ...card, backgroundColor: 'bg-user-message', color: 'text-user-message' },
      AssistantMessage: { ...card, backgroundColor: 'bg-assistant-message', color: 'text-assistant-message' },
    },
  }
}

function percentOf(list: readonly Limit[], kind: string): number | undefined {
  return list.find(l => l.kind === kind)?.percentUsed
}

export function sceneFor(list: readonly Limit[]): Scene {
  const all = Math.max(0, ...list.map(l => l.percentUsed))
  // The 5-hour window sets the time; without one, the fullest window does.
  const hourly = percentOf(list, 'five_hour') ?? all
  const weekly = percentOf(list, 'seven_day') ?? 0
  return {
    stage: stageAt(hourly),
    weather: weekly >= STORM_FROM ? 'storm' : 'fair',
  }
}

function altFor(stage: Stage, weather: Weather): string {
  const sky = weather === 'storm' ? ', under a dark storm with light rain' : ''
  return `A Florida Gulf-coast beach at ${LABELS[stage].toLowerCase()}${sky}: white sand, sea oats, coconut palms, a distant pier, and gentle waves washing up the shore`
}

const NAMES: Record<string, string> = { five_hour: '5-hour', seven_day: 'Weekly', spend_limit: 'Spend' }

// Bar colors from the scene: Gulf turquoise, sunset orange, then hot coral.
function levelColor(percent: number): string {
  if (percent >= 80) return '#ff4f6a'
  if (percent >= 50) return '#ff9a3c'
  return '#1fc8b4'
}

const WIDTH = 14

function resetsIn(resetsAt: string | undefined, now: number): string {
  if (resetsAt === undefined) return ''
  const ms = Date.parse(resetsAt) - now
  if (!Number.isFinite(ms) || ms <= 0) return 'resetting'
  const minutes = Math.round(ms / 60000)
  const days = Math.floor(minutes / 1440)
  const hours = Math.floor((minutes % 1440) / 60)
  const mins = minutes % 60
  if (days > 0) return `resets in ${days}d ${hours}h`
  if (hours > 0) return `resets in ${hours}h ${mins}m`
  return `resets in ${mins}m`
}

let current: string | undefined

async function apply($: EngineInterface, scene: Scene, announce: boolean) {
  const key = `${scene.stage}-${scene.weather}`
  if (key === current) return
  const previous = current
  current = key
  let set
  try {
    set = await $.theme.set(lookFor(scene))
  } catch (error) {
    // A build that does not take `style` refuses the whole look: set it without.
    $.ui.log(`gulf-sunset: ${String(error)}`)
    const { style: _style, ...plain } = lookFor(scene)
    set = await $.theme.set(plain)
  }
  if (!set.isDrawn) return
  if (announce && previous !== undefined) {
    const storm = scene.weather === 'storm' ? ' A storm is rolling in: the weekly limit is past 85%.' : ''
    $.ui.toast(`${LABELS[scene.stage]} on the Gulf.${storm}`)
  }
}

async function record($: EngineInterface, list: readonly Limit[]) {
  const copy = list.map(l => ({ kind: l.kind, percentUsed: l.percentUsed, resetsAt: l.resetsAt }))
  await update($, limits, () => copy)
  // The status line names the windows the scene reads, so its number matches.
  const parts = copy
    .filter(l => l.kind === 'five_hour' || l.kind === 'seven_day')
    .map(l => `${NAMES[l.kind]} ${Math.round(l.percentUsed)}%`)
  $.ui.status(parts.length === 0 ? undefined : parts.join(' · '))
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    for (const [stage, built] of Object.entries(BUILT)) {
      const unpainted = built.problems.find(line => line.startsWith("Desktop won't paint"))
      if (unpainted !== undefined) $.ui.log(`gulf-sunset ${stage}: ${unpainted}`)
    }
    let list: Limit[] = []
    try {
      list = (await $.session.usage()).rateLimits
      if (list.length > 0) await record($, list)
    } catch {
      // No reading yet: session.measure fills it in after the first reply.
    }
    await apply($, sceneFor(list), false)
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    // The first measurement also settles an account with no limits at all,
    // which never reports a change to them.
    if (e.changed.includes('rateLimits') || (await read($, limits)) === null) {
      await record($, e.rateLimits)
      await apply($, sceneFor(e.rateLimits), true)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.plugin !== 'gulf-sunset') return next(e)
    if (e.surface !== 'desktop' && e.surface !== 'mobile') return next(e)
    const [stage, weather] = e.props.scene.split('-') as [Stage, Weather]
    if (!STAGES.includes(stage) || !WEATHERS.includes(weather)) return next(e)
    const { Svg } = $.ui.resolve(e)
    return (
      <Svg
        source={sceneSvg(stage, weather)}
        alt={altFor(stage, weather)}
        isInteractive
      />
    )
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const list = await read($, limits)
    const { Box, Text } = $.ui.resolve(e)
    // A solid dark card with light text, readable over any part of the scene.
    const card = {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 4,
      rowGap: 1,
      paddingX: 2,
      paddingY: 1,
      backgroundColor: '#07070f',
      borderStyle: 'round',
      borderColor: '#2c2a40',
    } as const
    if (list === null || list.length === 0) {
      // null: no reading yet. Empty: the account reports no usage limits,
      // as an API key or a plan without them does.
      const note = list === null ? 'Usage appears after the first reply' : 'This account reports no usage limits'
      return (
        <Box {...card}>
          <Text color="#e2dfee">{note}</Text>
        </Box>
      )
    }
    const now = await $.clock.now()
    return (
      <Box {...card}>
        {list.map(l => {
          const color = levelColor(l.percentUsed)
          const filled = Math.max(0, Math.min(WIDTH, Math.round((l.percentUsed / 100) * WIDTH)))
          const when = resetsIn(l.resetsAt, now)
          return (
            <Box key={l.kind} flexDirection="row" alignItems="center" gap={1}>
              <Text weight="semibold" color="#f7f5fc">
                {NAMES[l.kind] ?? l.kind}
              </Text>
              <Text mono>
                <Text color={color}>{'━'.repeat(filled)}</Text>
                <Text color="#3a3850">{'━'.repeat(WIDTH - filled)}</Text>
              </Text>
              <Text tabular weight="bold" color={color}>
                {`${Math.round(l.percentUsed)}%`}
              </Text>
              {when === '' ? null : <Text color="#d6d3e4">{when}</Text>}
            </Box>
          )
        })}
      </Box>
    )
  })
}
