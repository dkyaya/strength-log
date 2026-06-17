import ExerciseCard from './ExerciseCard.jsx'

export default function BlockGroup({ block, phaseIdx, logs, onLogSet, onRemoveSet }) {
  const isSS = block.kind === 'superset'
  const label = isSS ? 'Superset' : 'Straight sets'

  return (
    <div className="mb-5">
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-line bg-surface2 font-display text-sm font-700 text-accent">
          {block.tag}
        </span>
        <span className="font-display text-[11px] uppercase tracking-wide text-faint">
          <b className="font-600 text-ink">{label}</b> · {block.note}
        </span>
      </div>

      <div className={isSS ? 'relative space-y-2.5 pl-4' : 'space-y-2.5'}>
        {isSS && (
          <div className="absolute bottom-2 top-2 left-0 w-[3px] rounded-full bg-accent/40" />
        )}
        {block.ex.map((ex, i) => (
          <ExerciseCard
            key={ex.id}
            ex={ex}
            phaseIdx={phaseIdx}
            slot={isSS ? `${block.tag}${i + 1}` : null}
            logs={logs}
            onLogSet={onLogSet}
            onRemoveSet={onRemoveSet}
          />
        ))}
      </div>
    </div>
  )
}
