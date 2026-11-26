import { expect, test } from 'claude-code/testing'
import type { TestBody } from 'claude-code/testing'
import type { SessionRateLimit, ThemeSetArgs } from 'claude-code'

// Each hook in a test stands for the engine beneath the theme: a call on `$`
// is answered `{ value }`, an event by its own result.

const CONTEXT = { window: 200000 }

function limits(fiveHour: number, weekly: number): SessionRateLimit[] {
  return [
    { kind: 'five_hour', percentUsed: fiveHour, resetsAt: '2026-11-26T15:00:00Z' },
    { kind: 'seven_day', percentUsed: weekly, resetsAt: '2026-11-30T15:00:00Z' },
  ]
}

// What a session answers on its own: the status line, the clock (noon UTC on
// 26 November 2026), the end of a measurement and the session's start.
function engine(on: Parameters<TestBody>[1]) {
  on('ui.status', () => ({ value: undefined }))
  on('clock.now', () => ({ value: Date.parse('2026-11-26T12:00:00Z') }))
  on('session.measure', (_, e) => ({ changed: e.changed }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
}

const ABOVE_PROMPT = {
  plugin: 'gulf-sunset',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isCollapsed: false,
    isWorking: false,
    maxRows: 4,
    bodyColumns: 100,
    scroll: { offset: 0, bodyRows: 4 },
    view: {},
  },
} as const

test('the 5-hour window picks the time of day, and a nearly used week a storm', async ($, on) => {
  const scenes: string[] = []
  const toasts: string[] = []
  let reading = limits(3, 9)
  on('session.usage', () => ({ value: { startedAt: 0, context: CONTEXT, rateLimits: reading } }))
  on('theme.set', (_, e: ThemeSetArgs) => {
    const backdrop = e.backdrop
    scenes.push(backdrop !== undefined && 'scene' in backdrop ? (backdrop.scene ?? '') : '')
    return { value: { isDrawn: true, requestId: 'theme' } }
  })
  on('ui.toast', (_, e) => {
    toasts.push(String((e as { text?: string }).text ?? e))
    return { value: undefined }
  })
  engine(on)

  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  expect(scenes.at(-1)).toBe('dawn-fair')

  const measure = async (fiveHour: number, weekly: number) => {
    reading = limits(fiveHour, weekly)
    await $.session.measure({ context: CONTEXT, rateLimits: reading, changed: ['rateLimits'] })
  }

  await measure(44, 9)
  expect(scenes.at(-1)).toBe('midday-fair')
  await measure(49.9, 84.9)
  expect(scenes.at(-1)).toBe('midday-fair')
  await measure(60, 85)
  expect(scenes.at(-1)).toBe('golden-storm')
  await measure(100, 100)
  expect(scenes.at(-1)).toBe('night-storm')
  await measure(100, 1)
  expect(scenes.at(-1)).toBe('night-fair')
  expect(toasts.some(text => text.includes('The storm has cleared.'))).toBe(true)
})

test('the usage card shows each window and its percentage, on every surface', async ($, on) => {
  on('session.usage', () => ({ value: { startedAt: 0, context: CONTEXT, rateLimits: limits(34, 9) } }))
  on('theme.set', () => ({ value: { isDrawn: true, requestId: 'theme' } }))
  engine(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({ ...ABOVE_PROMPT, surface })
    expect((await ui.find({ type: 'Text', text: /^5-hour$/ }))?.text).toBe('5-hour')
    expect((await ui.find({ type: 'Text', text: /^34%$/ }))?.text).toBe('34%')
    expect((await ui.find({ type: 'Text', text: /^Weekly$/ }))?.text).toBe('Weekly')
    expect((await ui.find({ type: 'Text', text: /^9%$/ }))?.text).toBe('9%')
    expect((await ui.find({ type: 'Text', text: /resets in 3h/ }))?.text).toBe('resets in 3h 0m')
    expect((await ui.find({ type: 'Text', text: /resets in 4d/ }))?.text).toBe('resets in 4d 3h')
    await ui.unmount()
  }
})

test('before any reading the card says usage comes after the first reply', async ($, on) => {
  on('session.usage', () => ({ value: { startedAt: 0, context: CONTEXT, rateLimits: [] } }))
  on('theme.set', () => ({ value: { isDrawn: true, requestId: 'theme' } }))
  engine(on)
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })

  const ui = await $.ui.mount({ ...ABOVE_PROMPT, surface: 'desktop' })
  expect((await ui.find({ type: 'Text' }))?.text).toBe('Usage appears after the first reply')
  await ui.unmount()
})
