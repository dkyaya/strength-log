import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { PROGRAM } from '../data/program.js'
import { todayKey } from '../lib/calc.js'

export default function BackupPanel({ getState, onRestore }) {
  const [open, setOpen] = useState(false)
  const [out, setOut] = useState('')
  const [input, setInput] = useState('')
  const [msg, setMsg] = useState('')

  function generate() {
    const code = JSON.stringify(getState())
    setOut(code)
    navigator.clipboard?.writeText(code).then(
      () => flash('Copied ✓'),
      () => flash('Select & copy below'),
    )
  }

  function flash(text) {
    setMsg(text)
    setTimeout(() => setMsg(''), 2200)
  }

  function downloadCSV() {
    const state = getState()
    const allExercises = PROGRAM.flatMap((d) => d.blocks.flatMap((b) => b.ex))
    const rows = [['date', 'exercise', 'weight', 'reps']]
    for (const ex of allExercises) {
      for (const e of state.logs[ex.id] || []) {
        rows.push([e.date, ex.name, e.weight || '', e.reps])
      }
    }
    for (const bw of state.bw || []) {
      rows.push([bw.date, 'Bodyweight', bw.weight, ''])
    }
    const header = rows.shift()
    rows.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    rows.unshift(header)
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strength-log-export-${todayKey()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function restore() {
    const raw = input.trim()
    if (!raw) return
    let obj
    try {
      obj = JSON.parse(raw)
    } catch {
      alert("That doesn't look like a valid backup code — check you copied the whole thing.")
      return
    }
    if (typeof obj !== 'object' || !('logs' in obj) || !('sessions' in obj)) {
      alert('That backup is missing data. Copy the full code and try again.')
      return
    }
    if (!confirm('Replace your current log with this backup? This overwrites what’s here now.')) return
    onRestore(obj)
    setInput('')
    alert('Restored.')
  }

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-line bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3.5 text-left"
      >
        <span className="font-display text-sm font-600">Backup &amp; restore</span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} className="ml-auto text-faint">
          <ChevronRight size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-line/70 px-4 pb-4 pt-3">
              <p className="mb-3 text-[13px] leading-snug text-muted">
                Your log saves on this device and survives closing the app. Pull a backup as
                insurance, or paste one in to bring data over from another device.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={generate}
                  className="rounded-lg border border-accent px-3.5 py-2 font-display text-xs font-600 uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-fg"
                >
                  Copy backup code
                </button>
                <button
                  onClick={downloadCSV}
                  className="rounded-lg border border-line px-3.5 py-2 font-display text-xs font-600 uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  Export CSV
                </button>
                {msg && <span className="font-display text-xs font-500 text-good">{msg}</span>}
              </div>
              <textarea
                readOnly
                value={out}
                placeholder="Your backup code appears here — copy it somewhere safe."
                className="mt-3 h-16 w-full resize-y rounded-lg border border-line bg-bg p-2.5 font-mono text-[11px] text-ink outline-none"
              />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a backup code here to restore…"
                className="mt-2 h-16 w-full resize-y rounded-lg border border-line bg-bg p-2.5 font-mono text-[11px] text-ink outline-none focus:border-accent"
              />
              <button
                onClick={restore}
                className="mt-2 rounded-lg border border-accent px-3.5 py-2 font-display text-xs font-600 uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-fg"
              >
                Restore from code
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
