import { motion } from 'framer-motion'

export default function PhaseSwitcher({ phases, phaseIdx, onChange }) {
  return (
    <div className="mb-3 flex flex-col items-center">
      <div className="inline-flex rounded-full border border-line bg-surface p-1">
        {phases.map((ph, i) => (
          <button
            key={ph.key}
            onClick={() => onChange(i)}
            className={`relative rounded-full px-3.5 py-1.5 font-display text-[12px] font-600 uppercase tracking-wide transition-colors ${
              i === phaseIdx ? 'text-accent-fg' : 'text-muted hover:text-ink'
            }`}
          >
            {i === phaseIdx && (
              <motion.span
                layoutId="phase-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{ph.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 max-w-[52ch] text-[12.5px] leading-snug text-muted">
        <span className="font-600 text-ink">{phases[phaseIdx].weeks}.</span> {phases[phaseIdx].blurb}
      </p>
    </div>
  )
}
