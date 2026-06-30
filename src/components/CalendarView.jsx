import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { todayKey, fmtShort } from '../lib/calc.js'

const COLORS = [
  'rgb(var(--accent))',
  '#3b82f6',
  '#f59e0b',
  'rgb(var(--good))',
  '#a855f7',
  '#06b6d4',
]

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function CalendarView({ program, sessions, logs, notes }) {
  const today = todayKey()
  const [year, setYear] = useState(() => parseInt(today.slice(0, 4)))
  const [month, setMonth] = useState(() => parseInt(today.slice(5, 7)) - 1)
  const [tapped, setTapped] = useState(null)

  const dayMeta = Object.fromEntries(
    program.map((day, i) => [day.id, { color: COLORS[i % COLORS.length] }])
  )

  const sessionMap = {}
  for (const s of sessions) sessionMap[s.date] = s

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (firstDay.getDay() + 6) % 7 // Mon=0

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push({ d, dateStr, session: sessionMap[dateStr] || null })
  }
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    if (month === 0) { setYear((y) => y - 1); setMonth(11) }
    else setMonth((m) => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setYear((y) => y + 1); setMonth(0) }
    else setMonth((m) => m + 1)
  }

  function getTappedSummary(cell) {
    const dayData = program.find((d) => d.id === cell.session.day)
    if (!dayData) return null
    const exercisesLogged = dayData.blocks
      .flatMap((b) => b.ex)
      .filter((ex) => (logs[ex.id] || []).some((e) => e.date === cell.dateStr))
    return { dayData, exercisesLogged }
  }

  const summary = tapped?.session ? getTappedSummary(tapped) : null

  return (
    <div>
      <h2 className="mb-3 font-display text-[19px] font-700 tracking-tight">Calendar</h2>

      <div className="mb-3 flex items-center gap-2">
        <button
          onClick={prevMonth}
          className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="flex-1 text-center font-display text-[15px] font-700 uppercase tracking-wide">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface p-3">
        <div className="mb-1 grid grid-cols-7">
          {DAY_HEADERS.map((d, i) => (
            <div key={i} className="py-1 text-center font-display text-[10px] uppercase tracking-wide text-faint">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell) return <div key={i} />
            const isToday = cell.dateStr === today
            const meta = cell.session ? dayMeta[cell.session.day] : null
            const isTapped = tapped?.dateStr === cell.dateStr
            return (
              <button
                key={i}
                onClick={() => cell.session ? setTapped(isTapped ? null : cell) : undefined}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg font-display text-[13px] font-600 transition-colors ${
                  isToday ? 'ring-2 ring-accent ring-offset-1 ring-offset-bg' : ''
                } ${
                  isTapped
                    ? 'bg-surface2'
                    : cell.session
                    ? 'hover:bg-surface2 cursor-pointer'
                    : 'text-muted cursor-default'
                }`}
              >
                {cell.d}
                {meta && (
                  <span
                    className="absolute bottom-1 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {tapped && summary && (
        <div className="mt-3 rounded-2xl border border-line bg-surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 flex-none rounded-full"
              style={{ backgroundColor: dayMeta[tapped.session.day]?.color }}
            />
            <span className="font-display text-[15px] font-700">{summary.dayData.name}</span>
            <span className="ml-auto font-display text-[12px] text-muted">{fmtShort(tapped.dateStr)}</span>
          </div>
          {summary.exercisesLogged.length > 0 ? (
            <div className="space-y-1.5">
              {summary.exercisesLogged.map((ex) => {
                const sets = (logs[ex.id] || []).filter((e) => e.date === tapped.dateStr)
                return (
                  <div key={ex.id} className="flex items-center justify-between">
                    <span className="text-[15px] text-ink">{ex.name}</span>
                    <span className="font-display text-[11px] tnum text-muted">
                      {sets.length} {sets.length === 1 ? 'set' : 'sets'}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-[15px] text-muted">Session marked done — no individual sets recorded</p>
          )}
          {notes && notes[`${tapped.session.day}_${tapped.dateStr}`] && (
            <p className="mt-3 border-t border-line pt-3 text-[15px] italic text-muted">
              {notes[`${tapped.session.day}_${tapped.dateStr}`]}
            </p>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {program.map((day) => (
          <div key={day.id} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 flex-none rounded-full"
              style={{ backgroundColor: dayMeta[day.id]?.color }}
            />
            <span className="font-display text-[11px] text-muted">{day.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
