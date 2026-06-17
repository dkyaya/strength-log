import { useState } from 'react'
import { PROGRAM } from '../data/program.js'
import { topSetByDate, fmtShort } from '../lib/calc.js'
import ProgressChart from './ProgressChart.jsx'

export default function ProgressView({ logs }) {
  const [selectedId, setSelectedId] = useState(PROGRAM[0].blocks[0].ex[0].id)

  const { points, isReps } = topSetByDate(logs, selectedId)

  let bestEver = null
  let mostRecent = null
  if (points.length > 0) {
    mostRecent = points[points.length - 1]
    bestEver = points.reduce((a, b) => (b.value > a.value ? b : a))
  }

  const unit = isReps ? 'reps' : 'lb'

  return (
    <div>
      <h2 className="mb-3 font-display text-[19px] font-700 tracking-tight">Progress</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="mb-4 w-full rounded-xl border border-line bg-surface px-4 py-3 font-display text-[14px] font-600 text-ink outline-none focus:border-accent"
      >
        {PROGRAM.map((day) => (
          <optgroup key={day.id} label={day.name}>
            {day.blocks.flatMap((b) => b.ex).map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {points.length >= 2 && (
        <div className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <div className="bg-surface px-3.5 py-3">
            <div className="font-display text-[26px] font-700 leading-none tnum">
              {bestEver.value}
              <span className="ml-1 text-[14px] font-500 text-muted">{unit}</span>
            </div>
            <div className="mt-1 font-display text-[10px] uppercase tracking-widest2 text-faint">Best ever</div>
            <div className="mt-0.5 font-display text-[10px] text-muted">{fmtShort(bestEver.date)}</div>
          </div>
          <div className="bg-surface px-3.5 py-3">
            <div className="font-display text-[26px] font-700 leading-none tnum">
              {mostRecent.value}
              <span className="ml-1 text-[14px] font-500 text-muted">{unit}</span>
            </div>
            <div className="mt-1 font-display text-[10px] uppercase tracking-widest2 text-faint">Most recent</div>
            <div className="mt-0.5 font-display text-[10px] text-muted">{fmtShort(mostRecent.date)}</div>
          </div>
        </div>
      )}

      <ProgressChart points={points} isReps={isReps} />
    </div>
  )
}
