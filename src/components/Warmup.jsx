import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Warmup({ warmup, done, onToggle }) {
  const count = done.filter(Boolean).length
  const cleared = done.every(Boolean)

  return (
    <div
      className={`mb-4 overflow-hidden rounded-2xl border bg-surface transition-colors ${
        cleared ? 'border-good/50' : 'border-line'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-line/70 px-4 py-3">
        <span className="font-display text-sm font-600 uppercase tracking-wide">{warmup.label}</span>
        <span
          className={`ml-auto font-display text-[11px] font-500 uppercase tracking-widest2 ${
            cleared ? 'text-good' : 'text-accent'
          }`}
        >
          {cleared ? 'Cleared' : `${count}/${warmup.items.length} · ${warmup.time}`}
        </span>
      </div>
      <div className="p-2">
        {warmup.items.map((item, i) => {
          const on = done[i]
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.99 }}
              onClick={() => onToggle(i)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface2"
            >
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-[1.5px] transition-colors ${
                  on ? 'border-accent bg-accent' : 'border-faint'
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check size={13} strokeWidth={3.5} className="text-accent-fg" />
                </motion.span>
              </span>
              <span
                className={`text-sm transition-colors ${
                  on ? 'text-muted line-through decoration-faint' : 'text-ink'
                }`}
              >
                {item}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
