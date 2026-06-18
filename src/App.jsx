import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

import { ACTIVE_PROGRAM as PROGRAM, ACTIVE_PHASES as PHASES, ACTIVE_WARMUP as WARMUP, ACTIVE_BRAND as BRAND } from './data/active-profile.js'
import { loadData, saveData, clearData, loadTheme, saveTheme } from './lib/storage.js'
import { todayKey } from './lib/calc.js'

import NavTabs from './components/NavTabs.jsx'
import StatsRow from './components/StatsRow.jsx'
import BodyweightCard from './components/BodyweightCard.jsx'
import PhaseSwitcher from './components/PhaseSwitcher.jsx'
import DayTabs from './components/DayTabs.jsx'
import Warmup from './components/Warmup.jsx'
import BlockGroup from './components/BlockGroup.jsx'
import BackupPanel from './components/BackupPanel.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import ProgressView from './components/ProgressView.jsx'
import CalendarView from './components/CalendarView.jsx'
import LogoMark from './components/LogoMark.jsx'

export default function App() {
  const [state, setState] = useState(loadData)
  const [active, setActive] = useState(() => PROGRAM[0].id)
  const [theme, setTheme] = useState(loadTheme)
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('train')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    saveTheme(theme)
  }, [theme])

  useEffect(() => {
    const ok = saveData(state)
    if (ok) {
      setSaved(true)
      const t = setTimeout(() => setSaved(false), 1200)
      return () => clearTimeout(t)
    }
  }, [state])

  const day = PROGRAM.find((d) => d.id === active)
  const wuRec = state.warmups[active]
  const wuDone =
    wuRec && wuRec.date === todayKey() && wuRec.done.length === WARMUP.items.length
      ? wuRec.done
      : new Array(WARMUP.items.length).fill(false)
  const cleared = wuDone.every(Boolean)
  const doneToday = state.sessions.some((s) => s.day === active && s.date === todayKey())

  const toggleWarmup = useCallback(
    (idx) => {
      setState((s) => {
        const cur = (s.warmups[active]?.date === todayKey() ? s.warmups[active].done : new Array(WARMUP.items.length).fill(false)).slice()
        cur[idx] = !cur[idx]
        return { ...s, warmups: { ...s.warmups, [active]: { date: todayKey(), done: cur } } }
      })
    },
    [active],
  )

  const logSet = useCallback((exId, weight, reps) => {
    setState((s) => {
      const arr = (s.logs[exId] || []).concat([{ date: todayKey(), weight, reps }])
      return { ...s, logs: { ...s.logs, [exId]: arr } }
    })
  }, [])

  const removeSet = useCallback((exId, idxAmongToday) => {
    setState((s) => {
      const arr = s.logs[exId] || []
      const todays = []
      arr.forEach((e, gi) => {
        if (e.date === todayKey()) todays.push(gi)
      })
      const gi = todays[idxAmongToday]
      if (gi === undefined) return s
      const next = arr.slice()
      next.splice(gi, 1)
      return { ...s, logs: { ...s.logs, [exId]: next } }
    })
  }, [])

  const markDone = useCallback(() => {
    setState((s) => ({ ...s, sessions: s.sessions.concat([{ day: active, date: todayKey() }]) }))
  }, [active])

  const logBW = useCallback((weight) => {
    setState((s) => {
      const tk = todayKey()
      const existing = s.bw.find((e) => e.date === tk)
      let next
      if (existing) {
        next = s.bw.map((e) => (e.date === tk ? { ...e, weight } : e))
      } else {
        next = s.bw.concat([{ date: tk, weight }]).sort((a, b) => (a.date < b.date ? -1 : 1))
      }
      return { ...s, bw: next }
    })
  }, [])

  function resetAll() {
    if (!confirm("Clear all logged sets, sessions, warmups and bodyweight? This can't be undone.")) return
    clearData()
    setState(loadData())
  }

  function restoreFrom(obj) {
    setState({
      logs: obj.logs || {},
      sessions: Array.isArray(obj.sessions) ? obj.sessions : [],
      bw: Array.isArray(obj.bw) ? obj.bw : [],
      warmups: obj.warmups && typeof obj.warmups === 'object' ? obj.warmups : {},
      phase: typeof obj.phase === 'number' ? obj.phase : state.phase,
    })
  }

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-16 pt-5 [padding-top:calc(1.25rem+env(safe-area-inset-top))]">
      {/* header */}
      <div className="mb-2.5 flex items-center gap-2">
        <span className="font-display text-[11px] font-500 uppercase tracking-widest2 text-faint">
          {BRAND.eyebrow}
        </span>
        <span className="h-px flex-1 bg-line" />
        <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      </div>

      <h1 className="flex items-center gap-3 font-display text-[34px] font-700 uppercase leading-[1.02] tracking-tight">
        <LogoMark size={40} />
        {BRAND.name}
      </h1>
      <p className="mt-1.5 max-w-[54ch] text-[14px] text-muted">
        {BRAND.subtitle}
      </p>

      <NavTabs view={view} onChange={setView} />

      <AnimatePresence mode="wait">
        {view === 'train' && (
          <motion.div
            key="train"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="mt-0">
              <StatsRow sessions={state.sessions} />
            </div>
            <div className="mb-5">
              <BodyweightCard bw={state.bw} onLog={logBW} />
            </div>

            {BRAND.showPhases && <PhaseSwitcher phases={PHASES} phaseIdx={state.phase} onChange={(i) => setState((s) => ({ ...s, phase: i }))} />}

            <DayTabs program={PROGRAM} active={active} onChange={setActive} sessions={state.sessions} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="mb-3.5 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-[19px] font-700 tracking-tight">{day.name}</h2>
                  <span className="font-display text-[11px] uppercase tracking-wide text-accent">{day.focus}</span>
                </div>

                <Warmup warmup={WARMUP} done={wuDone} onToggle={toggleWarmup} />

                {!cleared && (
                  <div className="mb-3.5 flex items-center gap-2.5 rounded-xl border border-accent/25 bg-accent/10 px-3.5 py-3">
                    <Lock size={15} className="flex-none text-accent" />
                    <p className="text-[13px] text-ink">
                      Workout locked — finish your warmup to unlock.{' '}
                      <b className="font-display font-700">
                        {wuDone.filter(Boolean).length}/{WARMUP.items.length} done
                      </b>
                    </p>
                  </div>
                )}

                <div className={cleared ? '' : 'pointer-events-none opacity-40 saturate-[0.4]'}>
                  {day.blocks.map((block) => (
                    <BlockGroup
                      key={block.tag}
                      block={block}
                      phaseIdx={state.phase}
                      logs={state.logs}
                      onLogSet={logSet}
                      onRemoveSet={removeSet}
                    />
                  ))}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={!cleared || doneToday}
                    onClick={markDone}
                    className={`mt-1 w-full rounded-xl py-3.5 font-display text-[15px] font-700 transition-colors ${
                      doneToday
                        ? 'border border-good/40 bg-surface text-good'
                        : 'bg-accent text-accent-fg hover:brightness-110'
                    }`}
                  >
                    {doneToday ? '✓ Session logged today' : 'Mark session done'}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-7">
              <BackupPanel getState={() => state} onRestore={restoreFrom} />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
              <span className={`font-display text-[10px] uppercase tracking-wide text-good transition-opacity ${saved ? 'opacity-100' : 'opacity-0'}`}>
                · saved
              </span>
              <button
                onClick={resetAll}
                className="rounded-lg border border-line px-3 py-1.5 font-display text-[11px] uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Reset all data
              </button>
            </div>
          </motion.div>
        )}

        {view === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ProgressView logs={state.logs} />
          </motion.div>
        )}

        {view === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CalendarView sessions={state.sessions} logs={state.logs} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
