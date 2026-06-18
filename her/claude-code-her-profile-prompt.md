# Add a second profile: FOS4Her

Adds a fully separate, pink-themed second app — **FOS4Her** — to the
existing **Fos** repo, sharing all the same components and mechanics
(warmup gate, bodyweight tracker, phases, blocks/supersets, light/dark,
backup/restore) but with her own exercises, her own colors, her own
storage, and her own home-screen icon.

**Everything below has already been built and verified — both profiles
build clean, correct colors, correct isolated data, no ID collisions.**
This is a known-working implementation, not a from-scratch design task.
Apply it as specified; only deviate if you find an actual bug.

## Why two builds, not a runtime switcher

The home-screen icon, app name, and theme-color are baked into static
files (`manifest.webmanifest`, icon PNGs, `<meta>` tags in `index.html`)
at the moment "Add to Home Screen" is tapped — they can't change at
runtime from a single shared build. So this is a **build-time** profile
system: the same source tree compiles into two independent static apps,
deployed to two paths in the same repo (`/strength-log/` and
`/strength-log/her/`). Each phone gets its own icon, its own name, its
own colors. Nothing is shared at runtime, and there is no in-app
profile switcher to build.

## Critical safety property — already verified

Both profiles' program data get bundled into both builds (harmless —
they're statically imported per the pattern below, so both exist in each
JS bundle, just only one is ever read at runtime). But the **storage
key** — the only thing that actually matters for data safety — resolves
to a single concrete string per build with zero trace of the other key.
Verified by grepping the built output: the Fos bundle contains
`jumper_offseason_v1` and nothing else; the her bundle contains
`fos4her_v1` and nothing else. Don't change how `storage.js` resolves
its key (see below) — that's the mechanism that guarantees this.

## Hard constraints

1. Don't touch exercise `id`s in the existing `program.js` (Yaya's data).
2. Don't change the existing `base: '/strength-log/'` behavior for the
   default build — it must keep working exactly as before for anyone
   who already has it installed.
3. `npm run build` (no args) must still work and produce the same
   Fos-only output as before — it now aliases to `build:fos`.
4. After applying everything below, run `npm run build:fos` AND
   `npm run build:her` and confirm both succeed with no errors, **in
   that order**, without deleting `dist/` between them (her build's
   `outDir` is `dist/her`, nested inside the Fos build's `dist` — if you
   run her first or wipe `dist` after, you'll lose the Fos output).

## New files — full content, write exactly as given

### `src/data/program.her.js`

```js
// FOS4Her program data.
//
// Translated from a plain-text workout list, not from known maxes — so
// unlike program.js (Yaya's), there are NO computed weight targets here.
// Every exercise's `weight` reads "Your pick" rather than a number we
// have no basis for. Once she's logged a few sessions, the "Last" line
// on each card becomes the real reference.
//
// PHASES exist structurally (same mechanism as the other profile) but
// all three currently hold identical numbers — there's no periodization
// data to differentiate Phase 2/3 from Phase 1 yet. Once she's trained
// for a few weeks, come back and give Phase 2/3 their own progression
// based on what she's actually hitting.
//
// Judgment calls made translating her notes — flagged so they're easy
// to correct:
//   1. Abs day "6x3" / "10x3" read as REPS x SETS (6 reps for 3 sets;
//      10 reps for 3 sets) — different shorthand than the other four
//      days, which all unambiguously start "1x10" (SETS x REPS). The
//      tell: "1 min plank x3" right above them can only mean 3 sets.
//   2. "Cable Crunches" had no numbers — defaulted to 3x15.
//   3. Quad day "Leg extension (single leg then superset)" didn't say
//      what it supersets WITH — paired it with Leg Press (the exercise
//      listed right before it). Confirm/correct if that's wrong.
//   4. "Leg raise with dumbbell" appears twice on Abs day with different
//      schemes (10x3 and 3x12) — kept both as written, treating it as
//      an intentional repeat in the circuit rather than a duplicate.

export const BRAND = {
  name: 'FOS4Her',
  eyebrow: 'Strength Training',
  subtitle: 'Abs, push, glute, quad, back & bis — the numbers are the demand, your call what you load.',
}

const WEIGHT = 'Your pick'

// Pyramid prescription used by Push/Glute/Quad/Back&Bis: 3 sets,
// descending reps, presumably ascending weight per step.
const pyramid = { sets: 3, reps: '10, 8, 6', weight: WEIGHT }
const samePyramidAllPhases = [pyramid, pyramid, pyramid]

const fixed = (sets, reps) => {
  const rx = { sets, reps, weight: WEIGHT }
  return [rx, rx, rx]
}

export const PHASES_HER = [
  {
    key: 'phase1',
    label: 'Phase 1',
    weeks: 'Starting point',
    blurb: 'Your current numbers. Log a few weeks here before we set up real progression for Phase 2.',
  },
  {
    key: 'phase2',
    label: 'Phase 2',
    weeks: 'Not set up yet',
    blurb: 'Placeholder — same as Phase 1 for now. Once Phase 1 has a few weeks logged, come back and we\u2019ll fill this in based on what you\u2019re actually hitting.',
  },
  {
    key: 'phase3',
    label: 'Phase 3',
    weeks: 'Not set up yet',
    blurb: 'Placeholder — same as Phase 1 for now, for the same reason as Phase 2.',
  },
]

export const PROGRAM_HER = [
  {
    id: 'abs',
    name: 'Abs',
    focus: 'Core',
    blocks: [
      { tag: 'A', kind: 'straight', note: '3 sets · short rest', ex: [
        { id: 'inout', name: 'In & Out (Dumbbell)', cue: 'Controlled — don\u2019t let momentum do the work.', phases: fixed(3, '6') },
      ]},
      { tag: 'B', kind: 'straight', note: '3 sets', ex: [
        { id: 'legraise_db1', name: 'Leg Raise (Dumbbell)', cue: 'Lower back flat to the floor throughout.', phases: fixed(3, '10') },
      ]},
      { tag: 'C', kind: 'straight', note: '3 sets, holds', ex: [
        { id: 'plank', name: 'Plank', cue: 'Hips level, brace like you\u2019re about to get punched.', phases: fixed(3, '1 min hold') },
      ]},
      { tag: 'D', kind: 'straight', note: '3 sets', ex: [
        { id: 'pallof_her', name: 'Pallof Press', cue: 'Anti-rotation — resist the twist, don\u2019t create it.', phases: fixed(3, '12') },
      ]},
      { tag: 'E', kind: 'straight', note: '3 sets, holds — each side', ex: [
        { id: 'sideplank', name: 'Weighted Side Plank', cue: 'Stack hips, don\u2019t let them sag.', phases: fixed(3, '45 sec hold') },
      ]},
      { tag: 'F', kind: 'straight', note: '3 sets', ex: [
        { id: 'sideraise', name: 'Weighted Side Raise', cue: 'Obliques — slow and controlled, not swung.', phases: fixed(3, '10') },
      ]},
      { tag: 'G', kind: 'straight', note: '3 sets — second leg-raise pass', ex: [
        { id: 'legraise_db2', name: 'Leg Raise (Dumbbell) \u2014 Round 2', cue: 'Second pass at this one in the circuit — as written.', phases: fixed(3, '12') },
      ]},
      { tag: 'H', kind: 'straight', note: '3 sets · placeholder reps, confirm', ex: [
        { id: 'cablecrunch', name: 'Cable Crunch', cue: 'No rep count given for this one — defaulted to 15, easy to change.', phases: fixed(3, '15') },
      ]},
    ],
  },

  {
    id: 'push',
    name: 'Push',
    focus: 'Chest, Shoulders, Triceps',
    blocks: [
      { tag: 'A', kind: 'straight', note: 'pyramid · rest as needed', ex: [
        { id: 'bench_her', name: 'Bench Press', cue: 'Reps drop, weight should climb each set.', phases: samePyramidAllPhases },
      ]},
      { tag: 'B', kind: 'straight', note: 'pyramid', ex: [
        { id: 'dbshoulder', name: 'Dumbbell Shoulder Press', cue: 'Controlled, full range overhead.', phases: samePyramidAllPhases },
      ]},
      { tag: 'C', kind: 'straight', note: 'pyramid', ex: [
        { id: 'eztricep', name: 'EZ Bar Tricep Extension', cue: 'Elbows pinned, don\u2019t let them flare.', phases: samePyramidAllPhases },
      ]},
      { tag: 'D', kind: 'straight', note: 'pyramid', ex: [
        { id: 'chestfly', name: 'Chest Fly', cue: 'Slight bend in the elbows throughout.', phases: samePyramidAllPhases },
      ]},
      { tag: 'E', kind: 'straight', note: 'pyramid', ex: [
        { id: 'cablelateral', name: 'Cable Lateral Raise', cue: 'Lead with the elbow, not the hand.', phases: samePyramidAllPhases },
      ]},
      { tag: 'F', kind: 'straight', note: 'pyramid', ex: [
        { id: 'triceppushdown', name: 'Tricep Push Down', cue: 'Elbows stay glued to your sides.', phases: samePyramidAllPhases },
      ]},
    ],
  },

  {
    id: 'glute',
    name: 'Glute',
    focus: 'Glutes & Hamstrings',
    blocks: [
      { tag: 'A', kind: 'straight', note: 'pyramid', ex: [
        { id: 'bulgarian_her', name: 'Bulgarian Split Squat', cue: 'Rear foot elevated, drive through the front heel.', phases: samePyramidAllPhases },
      ]},
      { tag: 'B', kind: 'straight', note: 'pyramid', ex: [
        { id: 'hipthrust_her', name: 'Hip Thrust', cue: 'Full lockout at the top, pause and squeeze.', phases: samePyramidAllPhases },
      ]},
      { tag: 'C', kind: 'straight', note: 'pyramid', ex: [
        { id: 'stepup', name: 'Step Up', cue: 'Drive through the working leg, don\u2019t push off the bottom foot.', phases: samePyramidAllPhases },
      ]},
      { tag: 'D', kind: 'straight', note: 'pyramid', ex: [
        { id: 'hyperext', name: 'Hyperextension', cue: 'Squeeze glutes at the top, don\u2019t hyperextend the low back.', phases: samePyramidAllPhases },
      ]},
      { tag: 'E', kind: 'straight', note: 'pyramid', ex: [
        { id: 'cablekickback', name: 'Cable Kickback', cue: 'Slow and controlled — no swinging.', phases: samePyramidAllPhases },
      ]},
      { tag: 'F', kind: 'superset', note: 'as marked in her notes · alternate', ex: [
        { id: 'rdl_her', name: 'RDL', cue: 'Hinge from the hips, chase the hamstring stretch.', phases: samePyramidAllPhases },
        { id: 'hamstringcurl', name: 'Hamstring Curl', cue: 'Full range, controlled on the way back.', phases: samePyramidAllPhases },
      ]},
    ],
  },

  {
    id: 'quad',
    name: 'Quad',
    focus: 'Quads & Calves',
    blocks: [
      { tag: 'A', kind: 'straight', note: 'pyramid', ex: [
        { id: 'backsquat_her', name: 'Back Squat', cue: 'Reps drop, weight climbs each set.', phases: samePyramidAllPhases },
      ]},
      { tag: 'B', kind: 'superset', note: 'as marked in her notes · alternate', ex: [
        { id: 'lunges', name: 'Dumbbell Lunges', cue: 'Controlled descent, drive through the front heel.', phases: samePyramidAllPhases },
        { id: 'calfraise', name: 'Calf Raises', cue: 'Full stretch at the bottom, pause at the top.', phases: samePyramidAllPhases },
      ]},
      { tag: 'C', kind: 'superset', note: 'best-guess pairing \u2014 confirm', ex: [
        { id: 'legpress', name: 'Leg Press', cue: 'Full range, don\u2019t round the lower back at the bottom.', phases: samePyramidAllPhases },
        { id: 'legext', name: 'Leg Extension (Single-Leg)', cue: 'Paired here with Leg Press as our best read of "single leg then superset" \u2014 flag if a different pairing was meant.', phases: samePyramidAllPhases },
      ]},
    ],
  },

  {
    id: 'backbis',
    name: 'Back & Bis',
    focus: 'Back & Biceps',
    blocks: [
      { tag: 'A', kind: 'straight', note: 'pyramid', ex: [
        { id: 'latpulldown', name: 'Lat Pulldown', cue: 'Drive elbows down and back, chest up.', phases: samePyramidAllPhases },
      ]},
      { tag: 'B', kind: 'straight', note: 'pyramid', ex: [
        { id: 'seatedrow', name: 'Seated Row', cue: 'Squeeze the shoulder blades together at the finish.', phases: samePyramidAllPhases },
      ]},
      { tag: 'C', kind: 'straight', note: 'pyramid', ex: [
        { id: 'reardeltfly', name: 'Rear Delt Fly / Face Pull', cue: 'High elbows, pull toward the eyes.', phases: samePyramidAllPhases },
      ]},
      { tag: 'D', kind: 'straight', note: 'pyramid', ex: [
        { id: 'preachercurl', name: 'Preacher Curl', cue: 'Full stretch at the bottom, no momentum.', phases: samePyramidAllPhases },
      ]},
      { tag: 'E', kind: 'straight', note: 'pyramid', ex: [
        { id: 'seatedwidecurl', name: 'Seated Wide Curl', cue: 'Wide grip, controlled through the full range.', phases: samePyramidAllPhases },
      ]},
      { tag: 'F', kind: 'straight', note: 'pyramid · confirm exercise name', ex: [
        { id: 'latpushdown', name: 'Lat Push Down', cue: 'Kept as written \u2014 double check this is distinct from Tricep Push Down on Push day.', phases: samePyramidAllPhases },
      ]},
    ],
  },
]
```

### `src/data/active-profile.js`

```js
// Resolves which profile's program data is active for this build.
// Both profiles are statically imported (required for Vite/Rollup to
// bundle correctly) but only one is ever used per build — each profile
// is built separately via `vite build --mode fos` / `--mode her`, so
// the unused branch's data (plain objects, no side effects) is the only
// thing that doesn't get exercised at runtime. Bundle cost is trivial.
//
// To add a third profile later: create src/data/program.<name>.js
// following the same shape (PROGRAM_X, PHASES_X, BRAND, WARMUP if it
// needs its own), import it below, and add a branch.

import { PROGRAM, PHASES, WARMUP, BRAND } from './program.js'
import { PROGRAM_HER, PHASES_HER, BRAND as BRAND_HER } from './program.her.js'

const isHer = import.meta.env.VITE_PROFILE === 'her'

export const ACTIVE_PROGRAM = isHer ? PROGRAM_HER : PROGRAM
export const ACTIVE_PHASES = isHer ? PHASES_HER : PHASES
export const ACTIVE_WARMUP = WARMUP // shared — generic, not profile-specific
export const ACTIVE_BRAND = isHer ? BRAND_HER : BRAND
```

### `src/theme-fos.css`

```css
/* Fos accent theme — orange-red. Swapped in at build time via the
   `@theme` alias in vite.config.js (mode: 'fos', the default). */

:root {
  --accent: 240 68 36;
  --accent-fg: 255 255 255;
}

.dark {
  --accent: 250 79 46;
  --accent-fg: 17 9 6;
}
```

### `src/theme-her.css`

```css
/* FOS4Her accent theme — pink. Swapped in at build time via the
   `@theme` alias in vite.config.js (mode: 'her'). Uses Tailwind's
   pink-600 (light) / pink-500 (dark) values — well-tested for contrast,
   so swapping the hex later is easy without redoing the calibration. */

:root {
  --accent: 219 39 119; /* pink-600 */
  --accent-fg: 255 255 255;
}

.dark {
  --accent: 236 72 153; /* pink-500 */
  --accent-fg: 17 9 6;
}
```

### `.env.fos`

```
VITE_PROFILE=fos
VITE_STORAGE_KEY=jumper_offseason_v1
VITE_THEME_KEY=strength_theme
VITE_APP_TITLE=Fos — Strength Base Log
VITE_APPLE_TITLE=Fos
VITE_THEME_COLOR="#0B0C0E"
```

### `.env.her`

```
VITE_PROFILE=her
VITE_STORAGE_KEY=fos4her_v1
VITE_THEME_KEY=fos4her_theme
VITE_APP_TITLE=FOS4Her — Strength Log
VITE_APPLE_TITLE=FOS4Her
VITE_THEME_COLOR="#0B0C0E"
```

**Note the quotes around `#0B0C0E`.** This bit us during verification:
`.env` files treat unquoted `#` as a comment, silently truncating the
value to empty. Don't remove the quotes.

### `public-her/manifest.webmanifest`

```json
{
  "name": "FOS4Her — Strength Log",
  "short_name": "FOS4Her",
  "description": "Strength training tracker.",
  "start_url": "/strength-log/her/",
  "scope": "/strength-log/her/",
  "display": "standalone",
  "background_color": "#0B0C0E",
  "theme_color": "#0B0C0E",
  "icons": [
    { "src": "/strength-log/her/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/strength-log/her/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

### `public-her/favicon.svg`

Same glyph as the Fos icon, recolored pink (`#EC4899`) instead of orange:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0B0C0E"/>
  <path d="M20 50 Q50 14 80 50" fill="none" stroke="#EC4899" stroke-width="8" stroke-linecap="round"/>
  <rect x="22" y="68" width="56" height="9" rx="4.5" fill="#EC4899"/>
</svg>
```

### `public-her/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png`

**These are binary PNG files — they can't be authored from this text
prompt.** They're already generated and verified (rendered from the SVG
above at 192/512/180/32px) and are provided as separate files alongside
this prompt. Drop all four directly into `public-her/`. If you'd rather
generate them yourself: `rsvg-convert -w <size> -h <size>
public-her/favicon.svg -o public-her/<name>.png` for each size
(192, 512, 180→apple-touch-icon.png, 32→favicon-32.png) — requires
`librsvg2-bin` (or use ImageMagick's `convert -background none` as a
fallback if that's what's available).

## Modified files — exact changes

### `vite.config.js` — replace entirely

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mode-aware config so the SAME source tree builds two completely
// separate static apps: the default ("fos") and a second profile
// ("her"), each with its own base path, its own public/ folder (so each
// gets its own favicon/icons/manifest), and its own accent color theme.
//
// Run with: vite build --mode fos   (default, also what `vite dev` uses)
//           vite build --mode her --outDir dist/her
//
// NOTE: `base` must match your GitHub repo name + the her-build's
// subfolder. Repo "strength-log" -> fos served at
// https://<user>.github.io/strength-log/ and her served at
// https://<user>.github.io/strength-log/her/. If you rename the repo,
// update both base values below.
export default defineConfig(({ mode }) => {
  const isHer = mode === 'her'
  return {
    plugins: [react()],
    base: isHer ? '/strength-log/her/' : '/strength-log/',
    publicDir: isHer ? 'public-her' : 'public',
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, isHer ? 'src/theme-her.css' : 'src/theme-fos.css'),
      },
    },
  }
})
```

### `package.json` — replace the `scripts` block

```json
"scripts": {
  "dev": "vite --mode fos",
  "dev:her": "vite --mode her",
  "build": "npm run build:fos",
  "build:fos": "vite build --mode fos",
  "build:her": "vite build --mode her --outDir dist/her",
  "preview": "vite preview",
  "deploy": "npm run build:fos && npm run build:her && gh-pages -d dist"
},
```

### `src/main.jsx` — add one import

```diff
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
+ import '@theme'
```

### `src/index.css` — remove `--accent` / `--accent-fg` lines

These now live in `theme-fos.css` / `theme-her.css` instead. Remove
these two lines from `:root`:

```diff
    --faint: 150 156 166;
-   --accent: 240 68 36;
-   --accent-fg: 255 255 255;
    --good: 22 145 74;
```

And these two lines from `.dark`:

```diff
    --faint: 92 99 110;
-   --accent: 250 79 46;
-   --accent-fg: 17 9 6;
    --good: 64 201 122;
```

Everything else in `index.css` stays untouched.

### `src/lib/storage.js` — change the two key constants

```diff
  // Persists to the browser's localStorage, keyed to the page origin.
- // KEY is unchanged from earlier versions so your logged history carries over
- // automatically when this deploys to the same github.io origin.
-
- const KEY = 'jumper_offseason_v1'
- const THEME_KEY = 'strength_theme'
+ // KEY/THEME_KEY come from build-time env vars (set per profile in
+ // .env.fos / .env.her) so each profile gets fully independent storage —
+ // even though both profiles are served from the same origin
+ // (<user>.github.io), the actual key STRING differs, so there's zero
+ // chance of one profile's data overwriting the other's. Falls back to
+ // the original Fos defaults if the env var isn't set (e.g. plain
+ // `vite dev` with no --mode flag), so nothing breaks for existing usage.
+
+ const KEY = import.meta.env.VITE_STORAGE_KEY || 'jumper_offseason_v1'
+ const THEME_KEY = import.meta.env.VITE_THEME_KEY || 'strength_theme'
```

(The rest of the file is unchanged.)

### `src/data/program.js` — add a `BRAND` export

Add this near the top, right before the existing `export const PHASES = [`:

```js
export const BRAND = {
  name: 'Fos',
  eyebrow: 'Offseason · General Prep',
  subtitle: 'Strength base for the offseason. Four days, twice through upper and lower — the numbers are the demand, your call what you load.',
}
```

### `src/components/PhaseSwitcher.jsx` — receive phases as a prop

It currently imports `PHASES` directly from `program.js`, which would
silently show Yaya's phase labels even in the her build. Fix:

```diff
  import { motion } from 'framer-motion'
- import { PHASES } from '../data/program.js'

- export default function PhaseSwitcher({ phaseIdx, onChange }) {
+ export default function PhaseSwitcher({ phases, phaseIdx, onChange }) {
    return (
      <div className="mb-3">
        <div className="inline-flex rounded-full border border-line bg-surface p-1">
-         {PHASES.map((ph, i) => (
+         {phases.map((ph, i) => (
```

...and further down:

```diff
        <p className="mt-2 max-w-[52ch] text-[12.5px] leading-snug text-muted">
-         <span className="font-600 text-ink">{PHASES[phaseIdx].weeks}.</span> {PHASES[phaseIdx].blurb}
+         <span className="font-600 text-ink">{phases[phaseIdx].weeks}.</span> {phases[phaseIdx].blurb}
        </p>
```

### `src/App.jsx` — three changes

**1. Swap the import** (this is the one place that decides which profile
is active for the whole app):

```diff
- import { PROGRAM, PHASES, WARMUP } from './data/program.js'
+ import { ACTIVE_PROGRAM as PROGRAM, ACTIVE_PHASES as PHASES, ACTIVE_WARMUP as WARMUP, ACTIVE_BRAND as BRAND } from './data/active-profile.js'
```

**2. Pass `phases` into `PhaseSwitcher`:**

```diff
- <PhaseSwitcher phaseIdx={state.phase} onChange={(i) => setState((s) => ({ ...s, phase: i }))} />
+ <PhaseSwitcher phases={PHASES} phaseIdx={state.phase} onChange={(i) => setState((s) => ({ ...s, phase: i }))} />
```

**3. Replace the hardcoded header copy with `BRAND` fields:**

```diff
  <div className="mb-2.5 flex items-center gap-2">
    <span className="font-display text-[11px] font-500 uppercase tracking-widest2 text-faint">
-     Offseason · General Prep
+     {BRAND.eyebrow}
    </span>
    <span className="h-px flex-1 bg-line" />
    <ThemeToggle theme={theme} onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
  </div>

  <h1 className="flex items-center gap-3 font-display text-[34px] font-700 uppercase leading-[1.02] tracking-tight">
    <LogoMark size={40} />
-   Fos
+   {BRAND.name}
  </h1>
  <p className="mt-1.5 max-w-[54ch] text-[14px] text-muted">
-   Strength base for the offseason. Four days, twice through upper and lower — the numbers are the demand, your call what you load.
+   {BRAND.subtitle}
  </p>
```

### `index.html` — three placeholders

```diff
- <meta name="apple-mobile-web-app-title" content="Fos" />
- <meta name="theme-color" content="#0B0C0E" />
+ <meta name="apple-mobile-web-app-title" content="%VITE_APPLE_TITLE%" />
+ <meta name="theme-color" content="%VITE_THEME_COLOR%" />
```

```diff
- <title>Fos — Strength Base Log</title>
+ <title>%VITE_APP_TITLE%</title>
```

(The favicon/manifest `<link>` tags already use `%BASE_URL%`, which
already resolves correctly per-mode since `base` is mode-aware in
`vite.config.js` — no change needed there.)

## Verification — already passed once, confirm it still does

```bash
npm install
npm run build:fos
npm run build:her
```

Both must succeed with no errors. Then:

```bash
grep -o '\-\-accent:[0-9 ]*' dist/assets/*.css        # expect: 240 68 36 / 250 79 46
grep -o '\-\-accent:[0-9 ]*' dist/her/assets/*.css     # expect: 219 39 119 / 236 72 153
grep "theme-color" dist/index.html dist/her/index.html # both must show a real hex, not ""
grep -o "jumper_offseason_v1\|fos4her_v1" dist/assets/*.js | sort -u      # expect only jumper_offseason_v1
grep -o "jumper_offseason_v1\|fos4her_v1" dist/her/assets/*.js | sort -u  # expect only fos4her_v1
```

If any of those don't match, something regressed from the verified state
— don't ship it, debug it first.

## Deploy

```bash
npm run deploy
```

This runs both builds (Fos into `dist/`, her into `dist/her/`) and
publishes the combined `dist/` via `gh-pages`. First time only: nothing
extra needed in GitHub Pages settings — same `gh-pages` branch as
before, GitHub Pages serves nested folders automatically.

Her URL: `https://<username>.github.io/strength-log/her/` — she opens
that in Safari, **Share → Add to Home Screen**, and gets her own pink
"FOS4Her" icon, fully independent from the existing "Fos" one.
