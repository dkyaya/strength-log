export default function Sparkline({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="flex h-full items-center text-[11px] font-medium text-faint">
        Log a few to see the trend
      </div>
    )
  }
  const pts = data.slice(-14)
  const ws = pts.map((p) => p.weight)
  const min = Math.min(...ws)
  const max = Math.max(...ws)
  const range = max - min || 1
  const W = 200
  const H = 44
  const pad = 4
  const coords = pts.map((pt, i) => {
    const x = pad + (i * (W - 2 * pad)) / (pts.length - 1)
    const y = H - pad - ((pt.weight - min) / range) * (H - 2 * pad)
    return [x, y]
  })
  const line = coords.map((c, i) => (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1)).join(' ')
  const area = `${line} L ${coords[coords.length - 1][0].toFixed(1)} ${H} L ${coords[0][0].toFixed(1)} ${H} Z`
  const last = coords[coords.length - 1]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path
        d={line}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="2.8" fill="rgb(var(--accent))" />
    </svg>
  )
}
