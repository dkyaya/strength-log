import { motion } from 'framer-motion'

// Real Dancing Script glyph outlines extracted via fonttools (wght=700).
// Coordinates are in font units (Y-up, origin at baseline). Each path is
// wrapped in translate(X, ASCENDER) scale(1,-1) to flip to SVG Y-down space.

const PATHS = {
  F: 'M188 -87Q135 -83 118.5 -61.0Q102 -39 102 -6Q102 31 115.0 83.0Q128 135 149.0 194.0Q170 253 195 311Q184 310 160.5 308.0Q137 306 112.5 303.5Q88 301 73 298Q76 329 96.5 346.5Q117 364 149.5 372.0Q182 380 220 381Q246 453 273.5 521.5Q301 590 329 647Q323 648 315.0 648.5Q307 649 293 649Q232 649 198.5 636.0Q165 623 152.5 599.0Q140 575 140 540Q140 515 145.0 494.5Q150 474 160 450Q113 458 93.0 480.5Q73 503 73 537Q73 589 111.5 629.0Q150 669 215.5 692.0Q281 715 363 715Q416 715 469.0 708.0Q522 701 568 701Q593 701 616.0 704.5Q639 708 669 716Q621 663 590.5 645.0Q560 627 531 627Q507 627 469.0 633.5Q431 640 387 643Q374 611 359.0 569.0Q344 527 328.5 479.0Q313 431 297 380Q349 376 391.0 371.0Q433 366 484 364Q472 348 459.5 338.5Q447 329 426.5 325.0Q406 321 370.5 319.0Q335 317 278 316Q270 286 261.0 255.0Q252 224 245.5 202.0Q239 180 237 175Q209 79 198.5 18.5Q188 -42 188 -87Z',
  o: 'M66 -32Q21 -32 4.5 -2.5Q-12 27 -12 62Q-12 94 -2.0 127.5Q8 161 25.5 190.0Q43 219 64.5 236.5Q86 254 108 254Q115 254 124.5 251.5Q134 249 138 244Q126 229 113.5 207.0Q101 185 90.5 160.5Q80 136 74.0 111.0Q68 86 68 65Q68 45 75.5 32.0Q83 19 102 19Q121 19 147.5 40.5Q174 62 198 90Q166 119 152.0 153.5Q138 188 138 237Q138 258 148.5 285.0Q159 312 182.5 332.0Q206 352 246 352Q289 352 306.5 328.0Q324 304 324 271Q324 234 304.5 188.0Q285 142 258 101Q270 95 286 95Q301 95 322.0 102.0Q343 109 363.0 125.5Q383 142 395 170L413 157Q391 106 354.5 82.5Q318 59 283 59Q270 59 257.0 61.5Q244 64 233 68Q199 28 155.0 -2.0Q111 -32 66 -32ZM224 122Q248 157 265.0 197.0Q282 237 282 271Q282 294 275.0 304.5Q268 315 254 315Q235 315 215.0 288.0Q195 261 195 220Q195 199 202.5 169.0Q210 139 224 122Z',
  s: 'M117 -51Q67 -51 36.5 -30.5Q6 -10 -7.0 21.5Q-20 53 -20 86Q-20 115 -12.0 131.0Q-4 147 8.0 154.5Q20 162 30.5 166.0Q41 170 46 175Q71 201 97.5 235.5Q124 270 143 312V322Q143 362 156.5 378.5Q170 395 188 395Q200 395 205.5 389.0Q211 383 212 375Q212 369 209.5 361.0Q207 353 207 339Q207 309 221.5 270.5Q236 232 250.5 189.0Q265 146 265 101Q265 89 264.0 79.0Q263 69 261 60Q292 68 322.0 94.5Q352 121 379 173L391 164Q372 107 336.0 72.5Q300 38 252 30Q236 -11 199.5 -31.0Q163 -51 117 -51ZM110 -7Q130 -7 147.0 3.0Q164 13 174 32Q133 41 100.0 64.0Q67 87 49 111Q35 108 35 84Q35 51 54.0 22.0Q73 -7 110 -7ZM182 62Q184 69 184.5 78.5Q185 88 185 93Q184 138 173.0 182.0Q162 226 151 272Q133 241 109.0 205.0Q85 169 64 147Q80 120 111.0 96.0Q142 72 182 62Z',
}

// Advance widths (hmtx at wght=700): F=522, o=372, s=351
const ADV_F = 522
const ADV_FO = 522 + 372

// Y-flip: translate(X, 716) scale(1,-1) maps font Y-up → SVG Y-down
const ASCENDER = 716

const VB_W = 522 + 372 + 351  // 1245
const VB_H = 716 + 87          // 803

// Loop timing constants
const STROKE_DURATIONS = [0.6, 0.5, 0.5]
const STROKE_DELAYS    = [0,   0.55, 1.0]
const STROKE_END       = 1.0 + 0.5
const FILL_DURATION    = 0.4
const HOLD_DURATION    = 1.6
const FADE_DURATION    = 0.5
const CYCLE            = STROKE_END + FILL_DURATION + HOLD_DURATION + FADE_DURATION + 0.4

const letters = [
  { key: 'F', d: PATHS.F, x: 0 },
  { key: 'o', d: PATHS.o, x: ADV_F },
  { key: 's', d: PATHS.s, x: ADV_FO },
]

export default function Wordmark({ width = 280, height = 140, animate = true, loop = false, className = '' }) {
  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={width}
      height={height}
      className={className}
      animate={loop ? { opacity: [1, 1, 1, 0, 0] } : undefined}
      transition={loop ? {
        duration: CYCLE,
        times: [
          0,
          (STROKE_END + FILL_DURATION + HOLD_DURATION) / CYCLE,
          (STROKE_END + FILL_DURATION + HOLD_DURATION) / CYCLE,
          (STROKE_END + FILL_DURATION + HOLD_DURATION + FADE_DURATION) / CYCLE,
          1,
        ],
        repeat: Infinity,
        ease: 'linear',
      } : undefined}
    >
      {letters.map((letter, i) => (
        <g key={letter.key} transform={`translate(${letter.x}, ${ASCENDER}) scale(1, -1)`}>
          {/* stroke trace */}
          <motion.path
            d={letter.d}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : false}
            animate={
              animate
                ? loop
                  ? { pathLength: [0, 1, 1, 1, 0] }
                  : { pathLength: 1 }
                : false
            }
            transition={
              loop
                ? {
                    duration: CYCLE,
                    times: [
                      STROKE_DELAYS[i] / CYCLE,
                      (STROKE_DELAYS[i] + STROKE_DURATIONS[i]) / CYCLE,
                      (STROKE_END + FILL_DURATION + HOLD_DURATION) / CYCLE,
                      (STROKE_END + FILL_DURATION + HOLD_DURATION + FADE_DURATION * 0.3) / CYCLE,
                      1,
                    ],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: STROKE_DURATIONS[i], delay: STROKE_DELAYS[i], ease: 'easeInOut' }
            }
          />
          {/* fill — fades in once stroke trace is done, sits on top */}
          {loop && (
            <motion.path
              d={letter.d}
              fill="rgb(var(--accent))"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{
                duration: CYCLE,
                times: [
                  0,
                  STROKE_END / CYCLE,
                  (STROKE_END + FILL_DURATION) / CYCLE,
                  (STROKE_END + FILL_DURATION + HOLD_DURATION) / CYCLE,
                  (STROKE_END + FILL_DURATION + HOLD_DURATION + FADE_DURATION) / CYCLE,
                ],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </g>
      ))}
    </motion.svg>
  )
}
