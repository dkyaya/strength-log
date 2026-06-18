import { motion } from 'framer-motion'
import { todayKey } from '../lib/calc.js'

export default function DayTabs({ program, active, onChange, sessions }) {
  return (
    <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {program.map((day) => {
        const isActive = day.id === active
        const doneToday = sessions.some((s) => s.day === day.id && s.date === todayKey())
        return (
          <button
            key={day.id}
            onClick={() => onChange(day.id)}
            className={`relative flex-none whitespace-nowrap rounded-full border px-4 py-2 font-display text-[13px] font-600 uppercase tracking-wide transition-colors ${
              isActive
                ? 'border-accent bg-accent text-accent-fg'
                : 'border-line bg-surface text-muted hover:text-ink'
            }`}
          >
            {day.name}
            {doneToday && (
              <motion.span
                layoutId={`dot-${day.id}`}
                className={`ml-2 inline-block h-1.5 w-1.5 rounded-full ${
                  isActive ? 'bg-accent-fg' : 'bg-good'
                }`}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
