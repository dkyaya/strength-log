import { motion } from 'framer-motion'

const VIEWS = [
  { id: 'train', label: 'Train' },
  { id: 'progress', label: 'Progress' },
  { id: 'calendar', label: 'Calendar' },
]

export default function NavTabs({ view, onChange }) {
  return (
    <div className="mt-4 mb-5">
      <div className="inline-flex rounded-full border border-line bg-surface p-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className={`relative rounded-full px-4 py-1.5 font-display text-[12px] font-600 uppercase tracking-wide transition-colors ${
              v.id === view ? 'text-accent-fg' : 'text-muted hover:text-ink'
            }`}
          >
            {v.id === view && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
