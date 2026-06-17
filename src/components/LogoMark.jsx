import { motion } from 'framer-motion'

// Same glyph as the home-screen icon (public/favicon.svg), but themed
// via CSS vars so it sits correctly in both light and dark mode, and
// animated on mount: the arc traces in like a jump trajectory, the bar
// drops into place once cleared, then a soft accent glow breathes behind
// the mark. Tap/click gives a quick athletic squash-bounce.
//
// `animate` lets a caller opt out (e.g. if LogoMark is reused somewhere
// it's seen many times per session, like inside a list).

export default function LogoMark({ size = 36, className = '', animate = true }) {
  return (
    <motion.div
      className={`relative flex flex-none items-center justify-center rounded-[22%] ${className}`}
      style={{ width: size, height: size, background: '#0B0C0E' }}
      whileTap={{ scale: 0.88, rotate: -4 }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    >
      {/* ambient glow — fades in after the draw-in finishes, then breathes */}
      {animate && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[22%]"
          style={{ background: 'rgb(var(--accent))', filter: 'blur(10px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.32, 0.18] }}
          transition={{
            duration: 2.6,
            times: [0, 0.5, 1],
            delay: 0.65,
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 0.4,
          }}
        />
      )}

      <svg viewBox="0 0 100 100" width="68%" height="68%" className="relative z-10">
        <motion.path
          d="M20 50 Q50 14 80 50"
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="8"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={animate ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.rect
          x="22"
          y="68"
          width="56"
          height="9"
          rx="4.5"
          fill="rgb(var(--accent))"
          initial={animate ? { scaleX: 0, opacity: 0 } : false}
          animate={animate ? { scaleX: 1, opacity: 1 } : false}
          style={{ transformOrigin: '50px 72.5px' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.45 }}
        />
      </svg>
    </motion.div>
  )
}
