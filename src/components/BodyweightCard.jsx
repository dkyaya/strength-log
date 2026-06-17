import { useState } from 'react'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline.jsx'
import { fmtShort } from '../lib/calc.js'

export default function BodyweightCard({ bw, onLog }) {
  const [val, setVal] = useState('')
  const latest = bw.length ? bw[bw.length - 1] : null
  const first = bw.length ? bw[0] : null

  let delta = null
  if (latest && first && bw.length > 1) {
    const d = latest.weight - first.weight
    delta = {
      text: `${d > 0 ? '+' : ''}${d.toFixed(1)} lb since ${fmtShort(first.date)}`,
      cls: d > 0.05 ? 'text-good' : d < -0.05 ? 'text-accent' : 'text-faint',
    }
  }

  function submit() {
    const v = parseFloat(val)
    if (!v || v <= 0) return
    onLog(v)
    setVal('')
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4">
      <div className="flex flex-col">
        <span className="font-display text-[11px] uppercase tracking-widest2 text-faint">
          Bodyweight
        </span>
        <span className="font-display text-3xl font-700 leading-none tnum">
          {latest ? latest.weight : '—'}
          <span className="ml-1 text-sm font-500 text-muted">lb</span>
        </span>
        {delta && <span className={`mt-1 text-[11px] font-500 tnum ${delta.cls}`}>{delta.text}</span>}
      </div>

      <div className="h-11 min-w-[110px] flex-1">
        <Sparkline data={bw} />
      </div>

      <div className="flex items-end gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={latest ? String(latest.weight) : 'lb'}
          className="w-20 rounded-lg border border-line bg-bg px-3 py-2 text-center text-sm tnum outline-none focus:border-accent"
        />
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={submit}
          className="rounded-lg border border-accent px-3 py-2 font-display text-xs font-600 uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-fg"
        >
          Log
        </motion.button>
      </div>
    </div>
  )
}
