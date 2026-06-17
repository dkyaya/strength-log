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

// Returns per-date top sets for charting. If any set has a numeric weight,
// tracks weight; otherwise tracks reps (bodyweight-only exercises).
export function topSetByDate(logs, exId) {
  const entries = logs[exId] || []
  if (!entries.length) return { points: [], isReps: false }
  const hasWeight = entries.some((e) => parseFloat(e.weight) > 0)
  const byDate = {}
  for (const e of entries) {
    if (!byDate[e.date]) byDate[e.date] = []
    byDate[e.date].push(e)
  }
  const points = Object.keys(byDate)
    .sort()
    .map((date) => {
      const sets = byDate[date]
      let best
      if (hasWeight) {
        best = sets.reduce((a, b) => {
          const wa = parseFloat(a.weight) || 0
          const wb = parseFloat(b.weight) || 0
          if (wb !== wa) return wb > wa ? b : a
          return (parseFloat(b.reps) || 0) >= (parseFloat(a.reps) || 0) ? b : a
        })
        return { date, value: parseFloat(best.weight) || 0 }
      } else {
        best = sets.reduce((a, b) =>
          (parseFloat(b.reps) || 0) >= (parseFloat(a.reps) || 0) ? b : a,
        )
        return { date, value: parseFloat(best.reps) || 0 }
      }
    })
  return { points, isReps: !hasWeight }
}
