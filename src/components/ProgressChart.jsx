import { fmtShort } from '../lib/calc.js'

export default function ProgressChart({ points, isReps }) {
  if (!points || points.length < 2) {
    return (
      <div className="flex h-44 items-center justify-center rounded-2xl border border-line bg-surface text-[13px] text-muted">
        Log a couple sessions to see the trend
      </div>
    )
  }

  const W = 400
  const H = 220
  const padL = 46
  const padR = 14
  const padT = 18
  const padB = 42

  const vals = points.map((p) => p.value)
  const minV = Math.min(...vals)
  const maxV = Math.max(...vals)
  const range = maxV - minV || 1

  const toX = (i) => padL + (i / (points.length - 1)) * (W - padL - padR)
  const toY = (v) => padT + (1 - (v - minV) / range) * (H - padT - padB)

  const coords = points.map((p, i) => [toX(i), toY(p.value)])
  const line = coords.map((c, i) => (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1)).join(' ')
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)} ${H - padB} L${coords[0][0].toFixed(1)} ${H - padB} Z`

  const yTicks = [0, 1, 2, 3, 4].map((i) => ({
    y: toY(minV + (range * i) / 4),
    label: Math.round(minV + (range * i) / 4),
  }))

  const labelCount = Math.min(points.length, 6)
  const xLabels = Array.from({ length: labelCount }, (_, i) => {
    const idx = Math.round((i / (labelCount - 1)) * (points.length - 1))
    return { x: toX(idx), label: fmtShort(points[idx].date) }
  })

  const last = coords[coords.length - 1]

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface p-4 pt-2">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y gridlines + labels */}
        {yTicks.map(({ y, label }, i) => (
          <g key={i}>
            <line
              x1={padL} y1={y.toFixed(1)} x2={W - padR} y2={y.toFixed(1)}
              stroke="rgb(var(--line))" strokeWidth="1"
            />
            <text
              x={padL - 7} y={(y + 4).toFixed(1)} textAnchor="end"
              fontSize="11" fill="rgb(var(--faint))" fontFamily="Inter,sans-serif"
            >
              {label}
            </text>
          </g>
        ))}

        {/* X date labels */}
        {xLabels.map(({ x, label }, i) => (
          <text
            key={i} x={x.toFixed(1)} y={(H - 10).toFixed(1)} textAnchor="middle"
            fontSize="11" fill="rgb(var(--faint))" fontFamily="Inter,sans-serif"
          >
            {label}
          </text>
        ))}

        {/* Unit label top-left */}
        <text
          x={padL - 7} y={(padT - 5).toFixed(1)} textAnchor="end"
          fontSize="9" fill="rgb(var(--faint))" fontFamily="Inter,sans-serif"
        >
          {isReps ? 'reps' : 'lb'}
        </text>

        {/* Area fill */}
        <path d={area} fill="url(#chart-fill)" />

        {/* Line */}
        <path
          d={line} fill="none" stroke="rgb(var(--accent))" strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        />

        {/* All data points (small) */}
        {coords.map(([cx, cy], i) => (
          <circle key={i} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="2.5"
            fill="rgb(var(--surface))" stroke="rgb(var(--accent))" strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Latest point (large, filled) */}
        <circle
          cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="4"
          fill="rgb(var(--accent))" vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
