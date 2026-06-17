import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { lastEntry, todaySets, fmtShort } from '../lib/calc.js'

export default function ExerciseCard({ ex, phaseIdx, slot, logs, onLogSet, onRemoveSet }) {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const rx = ex.phases[phaseIdx]
  const last = lastEntry(logs, ex.id)
  const today = todaySets(logs, ex.id)

  function submit() {
    if (!reps) return
    onLogSet(ex.id, weight.trim(), reps.trim())
    setReps('')
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {slot && (
                <span className="flex-none rounded-md bg-accent px-1.5 py-0.5 font-display text-[10px] font-700 leading-none text-accent-fg">
                  {slot}
                </span>
              )}
              <h3 className="font-display text-[17px] font-600 leading-tight">{ex.name}</h3>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{ex.cue}</p>
          </div>

          {/* The demand — stated, not guessed. */}
          <div className="flex-none text-right">
            <div className="font-display text-2xl font-700 leading-none tnum text-ink">
              {rx.sets} <span className="text-muted">×</span> {rx.reps}
            </div>
            <div className="mt-1.5 inline-block rounded-md bg-accent/12 px-2 py-1 font-display text-xs font-600 uppercase tracking-wide text-accent">
              {rx.weight}
            </div>
          </div>
        </div>

        <div className="mt-3 font-display text-[11px] font-500 uppercase tracking-wide text-faint tnum">
          {last
            ? `Last · ${last.weight || 'BW'}${last.weight ? ' lb' : ''} × ${last.reps} · ${fmtShort(last.date)}`
            : 'No sets logged yet'}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-2 border-t border-line/70 bg-surface2 px-4 py-3">
        <label className="flex flex-col gap-1">
          <span className="font-display text-[9px] uppercase tracking-widest2 text-faint">Weight</span>
          <input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="lb"
            className="w-[74px] rounded-lg border border-line bg-bg px-2.5 py-2 text-center text-sm tnum outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-display text-[9px] uppercase tracking-widest2 text-faint">Reps</span>
          <input
            type="number"
            inputMode="numeric"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="—"
            className="w-[58px] rounded-lg border border-line bg-bg px-2.5 py-2 text-center text-sm tnum outline-none focus:border-accent"
          />
        </label>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={submit}
          className="ml-auto self-end rounded-lg border border-accent px-3.5 py-2 font-display text-xs font-600 uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-fg"
        >
          Log set
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {today.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-1.5 px-4 pb-3"
          >
            {today.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/12 py-1 pl-2.5 pr-1.5 text-xs font-500 tnum text-accent"
              >
                {s.weight || 'BW'}
                {s.weight ? ' × ' : ' ×'}
                {s.reps}
                <button
                  onClick={() => onRemoveSet(ex.id, i)}
                  className="text-accent/60 transition-colors hover:text-accent"
                  aria-label="Remove set"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
