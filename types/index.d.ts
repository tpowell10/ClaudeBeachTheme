export type Limit = { kind: string; percentUsed: number; resetsAt?: string }

declare module 'claude-code' {
  interface PluginState {
    'gulf-sunset': { limits: Limit[] | null }
  }
}
