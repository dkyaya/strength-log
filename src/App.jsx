import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

import { ACTIVE_PROGRAM as PROGRAM, ACTIVE_PHASES as PHASES, ACTIVE_WARMUP as WARMUP, ACTIVE_BRAND as BRAND } from './data/active-profile.js'
import { loadData, saveData, clearData, loadTheme, saveTheme } from './lib/storage.js'
import { todayKey } from './lib/calc.js'

import BodyweightCard from './components/BodyweightCard.jsx'
import NavTabs from './components/NavTabs.jsx'
import StatsRow from './components/StatsRow.jsx'
import PhaseSwitcher from './components/PhaseSwitcher.jsx'
import DayTabs from './components/DayTabs.jsx'
import Warmup from './components/Warmup.jsx'
import BlockGroup from './components/BlockGroup.jsx'
import BackupPanel from './components/BackupPanel.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import ProgressView from './components/ProgressView.jsx'
import CalendarView from './components/CalendarView.jsx'
import LogoMark from './components/LogoMark.jsx'
import Wordmark from './components/Wordmark.jsx'

export default function App() {
  const [state, setState] = useState(loadData)
  const [active, setActive] = useState(() => PROGRAM[0].id)
  const [theme, setTheme] = useState(loadTheme)
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('train')
  const [showCover, setShowCover] = useState(true)

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

  const isZay = import.meta.env.VITE_PROFILE === 'zay'

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
    setState((s) => ({ ...s, bw: s.bw.concat([{ date: todayKey(), weight }]) }))
  }, [])

  const saveNote = useCallback((dayId, date, text) => {
    setState((s) => ({ ...s, notes: { ...s.notes, [`${dayId}_${date}`]: text } }))
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
      notes: obj.notes && typeof obj.notes === 'object' ? obj.notes : {},
      phase: typeof obj.phase === 'number' ? obj.phase : state.phase,
    })
  }

  return (
    <>
      {/* page background — concentric circle motif from the logo, very faint */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <svg width="900" height="900" viewBox="0 0 680 680" className="opacity-[0.06]">
          <circle cx="340" cy="340" r="300" fill="none" stroke="rgb(var(--good))" strokeWidth="1.5" />
          <circle cx="340" cy="340" r="240" fill="none" stroke="rgb(var(--good))" strokeWidth="1" />
          <circle cx="340" cy="340" r="180" fill="none" stroke="rgb(var(--good))" strokeWidth="1" />
          <circle cx="340" cy="340" r="120" fill="none" stroke="rgb(var(--good))" strokeWidth="1" />
          <circle cx="340" cy="340" r="60"  fill="none" stroke="rgb(var(--good))" strokeWidth="1" />
        </svg>
      </div>

      <AnimatePresence>
        {showCover && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-4 px-6"
            style={{ background: 'rgb(var(--bg))' }}
            onClick={() => setShowCover(false)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeIn' }}
          >
            <LogoMark size={120} animate />
            <p className="font-display text-[10px] uppercase tracking-widest2 text-muted">{BRAND.eyebrow}</p>
            <h1 className="text-center font-display text-[52px] font-700 uppercase leading-none tracking-tight text-accent">
              {BRAND.name}
            </h1>
            <p className="max-w-[40ch] text-center text-[15px] text-muted">{BRAND.subtitle}</p>
            <motion.p
              className="absolute bottom-10 font-display text-[10px] uppercase tracking-widest text-faint"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              tap to begin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-[760px] px-4 pb-16 pt-5 [padding-top:calc(1.25rem+env(safe-area-inset-top))]">
        {/* header */}
        <div className="mb-1 flex items-center justify-between">
          <span className="font-display text-[11px] font-500 uppercase tracking-widest2 text-faint">
            {BRAND.eyebrow}
          </span>
          <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
        </div>

        <div className="mb-1 flex justify-center">
          <Wordmark width={220} height={110} animate loop />
        </div>

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
                {isZay && (
                  <div className="mb-3.5">
                    <BodyweightCard bw={state.bw} onLog={logBW} />
                  </div>
                )}
                <StatsRow sessions={state.sessions} weeklyTarget={BRAND.weeklyTarget} />
              </div>

              {PHASES.length > 0 && <PhaseSwitcher phases={PHASES} phaseIdx={state.phase} onChange={(i) => setState((s) => ({ ...s, phase: i }))} />}

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
                      <p className="text-[15px] text-ink">
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

                    <div className="mb-4 mt-2">
                      <label className="mb-1.5 block font-display text-[11px] uppercase tracking-widest2 text-faint">
                        Session notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="How did it go? Any notes on loads, form, how you felt…"
                        value={state.notes[`${active}_${todayKey()}`] || ''}
                        onChange={(e) => saveNote(active, todayKey(), e.target.value)}
                        className="w-full resize-none rounded-xl border border-line bg-surface px-3.5 py-3 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none"
                      />
                    </div>

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
              <ProgressView program={PROGRAM} logs={state.logs} />
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
              <CalendarView program={PROGRAM} sessions={state.sessions} logs={state.logs} notes={state.notes} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
