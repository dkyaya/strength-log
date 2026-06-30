import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer as TimerIcon, Play, Pause, RotateCcw, X } from 'lucide-react'

function fmt(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

const PRESETS = [60, 90, 120, 180]

export default function Timer() {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState(90)
  const [remaining, setRemaining] = useState(90)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false)
            setFinished(true)
            clearInterval(intervalRef.current)
            return 0
          }
          return r - 1
        })
      }, 1000)
      return () => clearInterval(intervalRef.current)
    }
  }, [running])

  const start = useCallback(() => {
    if (remaining === 0) setRemaining(duration)
    setFinished(false)
    setRunning(true)
  }, [duration, remaining])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    setFinished(false)
    setRemaining(duration)
  }, [duration])

  function setPreset(seconds) {
    setRunning(false)
    setFinished(false)
    setDuration(seconds)
    setRemaining(seconds)
  }

  function adjustCustom(delta) {
    const next = Math.max(5, duration + delta)
    setDuration(next)
    if (!running) setRemaining(next)
  }

  const isActive = running || (remaining > 0 && remaining < duration)
  const pct = duration > 0 ? (duration - remaining) / duration : 0

  return (
    <>
      {/* collapsed badge — always visible, fixed position */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border px-3.5 py-2.5 shadow-lg backdrop-blur transition-colors ${
          finished
            ? 'border-good bg-good/15 text-good'
            : isActive
              ? 'border-accent bg-accent text-accent-fg'
              : 'border-line bg-surface/95 text-muted'
        }`}
        whileTap={{ scale: 0.94 }}
        animate={finished ? { scale: [1, 1.08, 1] } : {}}
        transition={finished ? { duration: 0.5, repeat: 3 } : {}}
      >
        <TimerIcon size={15} className="flex-none" />
        <span className="font-display text-[13px] font-700 tnum">
          {isActive || finished ? fmt(remaining) : 'Timer'}
        </span>
      </motion.button>

      {/* expanded panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-[4.75rem] right-5 z-40 w-[260px] rounded-2xl border border-line bg-surface p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-[11px] uppercase tracking-widest2 text-faint">Timer</span>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-ink">
                <X size={15} />
              </button>
            </div>

            {/* big countdown display */}
            <div className="mb-3 flex items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgb(var(--line))" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="44" fill="none"
                    stroke={finished ? 'rgb(var(--good))' : 'rgb(var(--accent))'}
                    strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 * (1 - pct)}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <span className="font-display text-2xl font-700 tnum">{fmt(remaining)}</span>
              </div>
            </div>

            {/* presets */}
            <div className="mb-3 flex justify-center gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`rounded-lg border px-2.5 py-1 font-display text-[11px] font-600 transition-colors ${
                    duration === p && !running
                      ? 'border-accent bg-accent text-accent-fg'
                      : 'border-line text-muted hover:text-ink'
                  }`}
                >
                  {p < 60 ? `${p}s` : `${p / 60}m`}
                </button>
              ))}
            </div>

            {/* manual adjust */}
            {!running && (
              <div className="mb-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => adjustCustom(-15)}
                  className="rounded-lg border border-line px-2.5 py-1 font-display text-[13px] text-muted hover:text-ink"
                >
                  −15s
                </button>
                <button
                  onClick={() => adjustCustom(15)}
                  className="rounded-lg border border-line px-2.5 py-1 font-display text-[13px] text-muted hover:text-ink"
                >
                  +15s
                </button>
              </div>
            )}

            {/* controls */}
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={running ? pause : start}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent py-2.5 font-display text-[13px] font-700 text-accent-fg"
              >
                {running ? <Pause size={14} /> : <Play size={14} />}
                {running ? 'Pause' : remaining === 0 ? 'Restart' : 'Start'}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={reset}
                className="flex items-center justify-center rounded-xl border border-line px-3 text-muted hover:text-ink"
              >
                <RotateCcw size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
