import { motion } from 'framer-motion'

// Inlines the shapes from public/fos_logo_3d.svg so Framer Motion can
// animate individual elements. Draw order is critical for the over/under
// bar effect: right arc → right upright → crossbar → left arc.
// `animate` prop: false renders all elements fully visible, no transitions.

export default function LogoMark({ size = 36, className = '', animate = true }) {
  return (
    <motion.div
      className={`relative flex flex-none items-center justify-center rounded-[22%] border border-line ${className}`}
      style={{ width: size, height: size, background: 'rgb(var(--surface))' }}
      whileTap={{ scale: 0.88, rotate: -4 }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
    >
      {/* ambient glow — breathes after animation finishes */}
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
            delay: 1.05,
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 0.4,
          }}
        />
      )}

      <svg viewBox="0 0 680 680" width="100%" height="100%" className="relative z-10">
        {/* Background circles — static */}
        <circle cx="340" cy="340" r="300" fill="none" stroke="#a8d5c2" strokeWidth="1.5" />
        <circle cx="340" cy="340" r="240" fill="none" stroke="#a8d5c2" strokeWidth="1" />
        <circle cx="340" cy="340" r="180" fill="none" stroke="#a8d5c2" strokeWidth="1" />
        <circle cx="340" cy="340" r="120" fill="none" stroke="#a8d5c2" strokeWidth="1" />
        <circle cx="340" cy="340" r="60"  fill="none" stroke="#a8d5c2" strokeWidth="1" />

        {/* Mat — static */}
        <polygon points="90,500 590,510 560,545 120,534" fill="#c5e8d8" />

        {/* Left upright — static */}
        <rect x="118" y="295" width="18" height="195" rx="4" fill="#2d6e58" />
        <rect x="100" y="480" width="54"  height="12"  rx="4" fill="#2d6e58" />

        {/* Right arc — animated (behind crossbar) */}
        <motion.path
          d="M 338 82 C 415 82, 500 160, 520 382"
          stroke="#1e3a5f" strokeWidth="30" fill="none" strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
        />
        <motion.path
          d="M 338 82 C 415 82, 500 160, 520 382"
          stroke="#2a5298" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.5"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
        />

        {/* Right upright — static (sits on top of right arc) */}
        <rect x="542" y="320" width="13" height="170" rx="3" fill="#2d6e58" />
        <rect x="528" y="482" width="40" height="10"  rx="3" fill="#2d6e58" />

        {/* Crossbar — slides in left to right (on top of right arc) */}
        <motion.g
          style={{ transformOrigin: '127px 302px' }}
          initial={animate ? { scaleX: 0 } : false}
          animate={animate ? { scaleX: 1 } : false}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <line x1="127" y1="302" x2="547" y2="325" stroke="#3aaa78" strokeWidth="9" strokeLinecap="round" />
        </motion.g>

        {/* Left arc — animated last (in front of crossbar) */}
        <motion.path
          d="M 160 430 C 160 160, 262 82, 338 82"
          stroke="#1e3a5f" strokeWidth="30" fill="none" strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ duration: 0.4, delay: 0.65, ease: 'easeOut' }}
        />
        <motion.path
          d="M 160 430 C 160 160, 262 82, 338 82"
          stroke="#2a5298" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.5"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : false}
          transition={{ duration: 0.4, delay: 0.65, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  )
}
