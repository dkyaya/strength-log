export function todayKey() {
  const d = new Date()
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  )
}

export function fmtShort(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function startOfWeek() {
  const d = new Date()
  const day = (d.getDay() + 6) % 7 // Monday = 0
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - day)
  return d
}

export function sessionsThisWeek(sessions) {
  const sow = startOfWeek()
  return sessions.filter((s) => {
    const [y, m, d] = s.date.split('-').map(Number)
    return new Date(y, m - 1, d) >= sow
  }).length
}

// Most recent entry for an exercise, preferring a day other than today.
export function lastEntry(logs, exId) {
  const arr = logs[exId] || []
  if (!arr.length) return null
  const prior = arr.filter((e) => e.date !== todayKey())
  return (prior.length ? prior : arr).slice(-1)[0]
}

export function todaySets(logs, exId) {
  return (logs[exId] || []).filter((e) => e.date === todayKey())
}
