// Persists to the browser's localStorage, keyed to the page origin.
// KEY/THEME_KEY come from build-time env vars (set per profile in
// .env.fos / .env.her) so each profile gets fully independent storage —
// even though both profiles are served from the same origin
// (<user>.github.io), the actual key STRING differs, so there's zero
// chance of one profile's data overwriting the other's. Falls back to
// the original Fos defaults if the env var isn't set (e.g. plain
// `vite dev` with no --mode flag), so nothing breaks for existing usage.

const KEY = import.meta.env.VITE_STORAGE_KEY || 'jumper_offseason_v1'
const THEME_KEY = import.meta.env.VITE_THEME_KEY || 'strength_theme'

const EMPTY = { logs: {}, sessions: [], bw: [], warmups: {}, phase: 0 }

export function loadData() {
  let state = { ...EMPTY }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) state = { ...EMPTY, ...JSON.parse(raw) }
  } catch (e) {
    /* first run or blocked storage — start fresh */
  }
  if (!state.logs || typeof state.logs !== 'object') state.logs = {}
  if (!Array.isArray(state.sessions)) state.sessions = []
  if (!Array.isArray(state.bw)) state.bw = []
  if (!state.warmups || typeof state.warmups !== 'object') state.warmups = {}
  if (typeof state.phase !== 'number') state.phase = 0
  return state
}

export function saveData(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    return true
  } catch (e) {
    return false
  }
}

export function clearData() {
  try {
    localStorage.removeItem(KEY)
  } catch (e) {
    /* ignore */
  }
}

export function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY)
    if (t === 'light' || t === 'dark') return t
  } catch (e) {
    /* ignore */
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'dark'
}

export function saveTheme(t) {
  try {
    localStorage.setItem(THEME_KEY, t)
  } catch (e) {
    /* ignore */
  }
}
