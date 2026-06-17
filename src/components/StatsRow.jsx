import { sessionsThisWeek, fmtShort } from '../lib/calc.js'

export default function StatsRow({ sessions }) {
  const total = sessions.length
  const week = sessionsThisWeek(sessions)
  const last = sessions.length ? sessions[sessions.length - 1].date : null

  const items = [
    { num: total, label: 'Sessions logged' },
    { num: <>{week}<small className="text-base text-muted">/4</small></>, label: 'This week' },
    { num: last ? fmtShort(last) : '—', label: 'Last trained', small: true },
  ]

  return (
    <div className="mb-3 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
      {items.map((it, i) => (
        <div key={i} className="bg-surface px-3.5 py-3">
          <div className={`font-display font-700 leading-none tnum ${it.small ? 'text-[15px] pt-1' : 'text-[26px]'}`}>
            {it.num}
          </div>
          <div className="mt-1 font-display text-[10px] uppercase tracking-widest2 text-faint">{it.label}</div>
        </div>
      ))}
    </div>
  )
}
