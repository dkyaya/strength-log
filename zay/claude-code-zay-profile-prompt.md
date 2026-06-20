# Add a third profile: Zay (final, consolidated)

**This replaces both earlier Zay prompts** — the original "Add a third
profile: Zay" and the smaller "Update Zay's profile with real maxes"
addendum. Use only this one; the other two are superseded. Everything
below reflects the final, verified state: real maxes baked in, two
added exercises, and progressive-overload phase framing instead of a
restart/re-entry framing (he's already trained — this isn't a comeback
program).

Adds a third profile to the **Fos** repo (alongside the existing "fos"
and "her" profiles) for a friend named Zay — same shell and mechanics
(warmup gate, bodyweight tracker, phases, blocks, light/dark,
backup/restore), his own exercises, a lime-green accent, and his own
isolated storage. **The app name stays "Fos"** for this one — only the
color and exercises change.

**Everything below has already been built and verified** — all three
profiles (fos/her/zay) build clean together, correct colors, correct
isolated storage per profile, no exercise ID collisions except one
intentional shared one. Apply it as specified.

This assumes the **her profile already exists** in this repo (the
`@theme` alias, `active-profile.js`, the multi-build `vite.config.js`,
the env-based storage keys in `storage.js`, etc. are already in place
from that earlier change). If it doesn't exist yet, do that first —
this prompt only adds the delta for a third profile on top of the
existing mechanism.

## ⚠️ The public folder for this profile already exists — `public-zay`

**The user has already created a folder named exactly `public-zay`** in
the project root and already placed all five icon/svg asset files in
it (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`,
`favicon-32.png`, `favicon.svg`). Do not create a differently-named
folder for this profile, and do not recreate or move these files —
they're already exactly where they need to be. Every reference to this
profile's public assets — `vite.config.js`'s `publicDir`, the manifest
file's own location, every icon path inside the manifest — must point
at `public-zay` specifically, matching the existing `public` (fos) and
`public-her` (her) naming pattern already established in this repo.

## Real maxes received, plus two exercises he forgot to list initially

Back Squat 275, Front Squat 300, Bench 185, Military Press 115, Hang
Clean 175 (Power Clean unknown — "idk"). Trap Deadlift isn't a true max
at all — he's equipment-limited ("4 plates, that's all it holds"), so
that one gets a descriptive label instead of a percentage. Everything
else still reads "Your pick" — no basis to estimate those without a
stated number. Two exercises he forgot the first time (Back Extension,
Straight Bar Deadlift) are folded into their respective days below.

**Flagging rather than silently accepting**: Front Squat (300) came in
higher than Back Squat (275) — backwards from the norm for almost
everyone (front squat is typically ~80-85% of back squat). Used as
given since he's the authority on his own numbers, but worth a quick
double-check with him in case the two values got swapped when he sent
them.

## On the phases — he's already trained, this isn't a restart

He's been lifting already; the goal is straightforward progressive
overload from his current numbers, not easing back in from a layoff.
`PHASES_ZAY` below is worded accordingly — Phase 1 is framed as his
live working numbers to build from, not a "starting point" to ease into.
Phases 2/3 are still placeholders (no differentiated progression data
exists yet to give them their own numbers), but their wording no longer
implies a restart either.

## Hard constraints

1. Don't touch exercise `id`s or data in `program.js` or `program.her.js`.
2. Don't change the existing `base` paths or behavior for the fos/her
   builds — both must keep working exactly as before.
3. `npm run build` (no args) must still build Fos only, unchanged.
4. Build all three in this order without wiping `dist/` between them:
   `build:fos` → `build:her` → `build:zay`.
5. The public folder is `public-zay` — see the callout above. This is
   not optional or cosmetic; get it wrong and his icons/manifest won't
   resolve at his deployed URL.

## New files — full content, write exactly as given

### `src/data/program.zay.js`

```js
// Zay's program data — "Fos" stays the app name for this profile
// (per instruction), only the accent color and exercises differ.
//
// Maxes received for: Back Squat 275, Front Squat 300, Bench 185,
// Military Press 115, Hang Clean 175 (Power Clean unknown). Trap
// Deadlift has no real max — he's equipment-limited ("4 plates, that's
// all it holds"), so that one gets a descriptive label instead of a
// computed number. Everything else still reads "Your pick" — no basis
// to estimate those without a stated number.
//
// Judgment calls, current as of the maxes update:
//   1. Front Squat (300) is HIGHER than Back Squat (275) — backwards
//      from the norm for almost everyone (front squat is typically
//      ~80-85% of back squat). Using as given since he's the authority
//      on his own numbers, but worth a quick double check in case the
//      two got swapped when he sent them.
//   2. Trap Deadlift weight reads "Max load — bar-limited" rather than
//      a percentage-based number. He's capped by the equipment (4
//      plates/side is the bar's max), not by his own strength, so a
//      percentage prescription doesn't apply — progression on this
//      lift is about reps, not weight, until/unless he switches bars.
//   3. "Hang Clean or Power Clean" weight is calibrated off his known
//      Hang Clean max only (Power Clean is "idk"). If he ends up doing
//      Power Clean specifically on a given day, this may feel a touch
//      light — Power Clean max tends to run slightly higher than Hang
//      Clean for most lifters.
//   4. Incline Bench stays "Your pick" — not estimated off his flat
//      bench max, since incline-to-flat ratios vary too much person to
//      person to safely guess.
//   5. Back Extension and Straight Bar Deadlift (both added after the
//      original translation, per his follow-up) came with no rep
//      scheme — defaulted to 4x10 and 5x5 (the latter matching Trap
//      Deadlift's scheme as the closest analog). Placement within
//      their day is also a guess — he didn't specify where in the
//      order either belongs.
//
// Earlier judgment calls, still in effect:
//   - "Box pistol squats 5x6/8" read as 5 sets, 6-8 rep range.
//   - "Hang or power Clean", "Incline bench or db", "Bench press or
//     db" are exercise CHOICES (pick one variant that session), not
//     supersets — combined into one card each.
//   - "(bi weekly)" tags mean "every other session — skip on
//     alternating weeks." No specific substitute exercise is named
//     anywhere on the sheet to alternate WITH.
//   - "Flat press" on Chest & Back is kept as written — possibly
//     redundant with "Bench press or db" right above it.
//   - Chin-ups (Day 4) had no set count, just "AMRAP" — defaulted to 3.
//   - Pushups appear on both Day 3 and Day 4 with the same id, so his
//     "Last" line is one continuous history.

export const BRAND = {
  name: 'Fos',
  eyebrow: 'Strength Training',
  subtitle: 'Quads, hamstrings, chest & back, arms & shoulders — the numbers are the demand, your call what you load.',
}

const WEIGHT = 'Your pick'

const fixed = (sets, reps, weight = WEIGHT) => {
  const rx = { sets, reps, weight }
  return [rx, rx, rx]
}

export const PHASES_ZAY = [
  {
    key: 'phase1',
    label: 'Phase 1',
    weeks: 'Current numbers',
    blurb: 'Working weights based on his maxes. Bump the load once reps are feeling solid across all sets \u2014 no need to ease into this, he\u2019s already trained.',
  },
  {
    key: 'phase2',
    label: 'Phase 2',
    weeks: 'Not set up yet',
    blurb: 'Next step up from Phase 1 \u2014 come back and fill this in once he\u2019s logged a few weeks and has a sense of what to bump.',
  },
  {
    key: 'phase3',
    label: 'Phase 3',
    weeks: 'Not set up yet',
    blurb: 'Same idea as Phase 2, for whenever that\u2019s ready to set up too.',
  },
]

export const PROGRAM_ZAY = [
  {
    id: 'quad',
    name: 'Quads',
    focus: 'Quads',
    blocks: [
      { tag: 'A', kind: 'straight', note: '5 sets', ex: [
        { id: 'boxpistol', name: 'Box Pistol Squat', cue: 'Box for depth control, full range each rep.', phases: fixed(5, '6-8') },
      ]},
      { tag: 'B', kind: 'straight', note: 'every other session — skip on alternating weeks', ex: [
        { id: 'splitsquat_zay', name: 'Split Squat', cue: 'Choice of 5 or 6 sets — your call which.', phases: fixed('5 or 6', '4 each leg') },
      ]},
      { tag: 'C', kind: 'straight', note: '5 sets', ex: [
        { id: 'hacksquat', name: 'Hack Squat', cue: 'Full range, controlled on the way down.', phases: fixed(5, '6') },
      ]},
      { tag: 'D', kind: 'straight', note: '4 sets · pick one variant', ex: [
        { id: 'hangpowerclean', name: 'Hang Clean or Power Clean', cue: 'Pick one for the session. Calibrated off Hang Clean (175) — Power Clean max unknown, so this may feel light if you pick that variant.', phases: fixed(4, '3-5', '155') },
      ]},
      { tag: 'E', kind: 'straight', note: '5 sets', ex: [
        { id: 'frontsquat_zay', name: 'Front Squat', cue: 'Elbows high, brace before each rep.', phases: fixed(5, '6', '250') },
      ]},
      { tag: 'F', kind: 'straight', note: 'every other session — skip on alternating weeks', ex: [
        { id: 'trapdeadlift', name: 'Trap Deadlift', cue: 'Neutral spine, drive through the floor.', phases: fixed(5, '5', 'Max load — bar-limited (4 plates/side)') },
      ]},
      { tag: 'G', kind: 'straight', note: '6 sets', ex: [
        { id: 'legext_zay', name: 'Leg Extensions', cue: 'Controlled tempo, squeeze at the top.', phases: fixed(6, '8') },
      ]},
    ],
  },

  {
    id: 'hamstring',
    name: 'Hamstrings',
    focus: 'Hamstrings & Glutes',
    blocks: [
      { tag: 'A', kind: 'straight', note: '5 sets', ex: [
        { id: 'innerthigh', name: 'Inner Thigh (Adductor)', cue: 'Controlled, no momentum.', phases: fixed(5, '8') },
      ]},
      { tag: 'B', kind: 'straight', note: '5 sets', ex: [
        { id: 'outerthigh', name: 'Outer Thigh (Abductor)', cue: 'Controlled, no momentum.', phases: fixed(5, '8') },
      ]},
      { tag: 'C', kind: 'straight', note: '4 sets', ex: [
        { id: 'hipthrust_zay', name: 'Hip Thrust', cue: 'Full lockout, pause and squeeze at the top.', phases: fixed(4, '5') },
      ]},
      { tag: 'D', kind: 'straight', note: '5 sets', ex: [
        { id: 'rdl_zay', name: 'RDL', cue: 'Hinge from the hips, chase the hamstring stretch.', phases: fixed(5, '6') },
      ]},
      { tag: 'E', kind: 'straight', note: '6 sets', ex: [
        { id: 'backsquat_zay', name: 'Back Squat', cue: 'Full depth, brace before each rep.', phases: fixed(6, '5', '235') },
      ]},
      { tag: 'F', kind: 'straight', note: 'every other session — skip on alternating weeks · placeholder rep scheme, confirm', ex: [
        { id: 'straightbardeadlift', name: 'Straight Bar Deadlift', cue: 'Added after the original list — no rep scheme given, defaulted to match Trap Deadlift\u2019s 5x5.', phases: fixed(5, '5') },
      ]},
    ],
  },

  {
    id: 'chestback',
    name: 'Chest & Back',
    focus: 'Chest & Back',
    blocks: [
      { tag: 'A', kind: 'straight', note: '4 sets', ex: [
        { id: 'pushups', name: 'Pushups', cue: 'Full range, chest to floor.', phases: fixed(4, 'AMRAP') },
      ]},
      { tag: 'B', kind: 'straight', note: '5 sets · pick one variant', ex: [
        { id: 'inclinebench', name: 'Incline Bench or DB Press', cue: 'Pick bar or dumbbell for the session.', phases: fixed(5, '6') },
      ]},
      { tag: 'C', kind: 'straight', note: 'every other session — skip on alternating weeks · pick one variant', ex: [
        { id: 'benchpress_zay', name: 'Bench Press or DB', cue: 'Pick bar or dumbbell for the session.', phases: fixed(5, '5', '160') },
      ]},
      { tag: 'D', kind: 'straight', note: '4 sets', ex: [
        { id: 'pullups', name: 'Pull-ups', cue: 'Full hang to chin over the bar.', phases: fixed(4, 'AMRAP') },
      ]},
      { tag: 'E', kind: 'straight', note: '6 sets', ex: [
        { id: 'seatedrow_zay', name: 'Seated Row', cue: 'Squeeze the shoulder blades together at the finish.', phases: fixed(6, '8') },
      ]},
      { tag: 'F', kind: 'straight', note: '5 sets', ex: [
        { id: 'uprightrow', name: 'Upright Row', cue: 'Lead with the elbows, stop at shoulder height.', phases: fixed(5, '8') },
      ]},
      { tag: 'G', kind: 'straight', note: '5 sets · confirm vs. Bench Press above', ex: [
        { id: 'flatpress', name: 'Flat Press', cue: 'Kept as written \u2014 check whether this is meant to be distinct from Bench Press or DB above.', phases: fixed(5, '8') },
      ]},
      { tag: 'H', kind: 'straight', note: '5 sets', ex: [
        { id: 'pecflys', name: 'Pec Flys', cue: 'Slight bend in the elbows, controlled stretch.', phases: fixed(5, '8') },
      ]},
      { tag: 'I', kind: 'straight', note: '5 sets', ex: [
        { id: 'latpulldown_zay', name: 'Lat Pull Down', cue: 'Drive elbows down and back, chest up.', phases: fixed(5, '6') },
      ]},
      { tag: 'J', kind: 'straight', note: 'placeholder rep scheme, confirm', ex: [
        { id: 'backextension', name: 'Back Extension', cue: 'Added after the original list — no rep scheme given, defaulted to 4x10.', phases: fixed(4, '10') },
      ]},
    ],
  },

  {
    id: 'arms',
    name: 'Arms & Shoulders',
    focus: 'Arms & Shoulders',
    blocks: [
      { tag: 'A', kind: 'straight', note: '4 sets', ex: [
        { id: 'pushups', name: 'Pushups', cue: 'Full range, chest to floor.', phases: fixed(4, 'AMRAP') },
      ]},
      { tag: 'B', kind: 'straight', note: '5 sets', ex: [
        { id: 'militarypress', name: 'Military Press', cue: 'Brace the core, press straight overhead.', phases: fixed(5, '6', '95') },
      ]},
      { tag: 'C', kind: 'straight', note: '5 sets', ex: [
        { id: 'dips', name: 'Dips', cue: 'Full range, lean forward slightly for chest/tri balance.', phases: fixed(5, 'AMRAP') },
      ]},
      { tag: 'D', kind: 'straight', note: '4 sets', ex: [
        { id: 'declinesitups', name: 'Decline Sit-ups', cue: 'Controlled on the way down, no yanking.', phases: fixed(4, 'AMRAP') },
      ]},
      { tag: 'E', kind: 'straight', note: '5 sets', ex: [
        { id: 'overheadtri', name: 'Overhead Tricep Extension', cue: 'Elbows pinned, full stretch at the bottom.', phases: fixed(5, '8') },
      ]},
      { tag: 'F', kind: 'straight', note: '5 sets', ex: [
        { id: 'lateralraise', name: 'Lateral Shoulder Raise', cue: 'Lead with the elbow, stop at shoulder height.', phases: fixed(5, '8') },
      ]},
      { tag: 'G', kind: 'straight', note: '4 sets', ex: [
        { id: 'preachercurl_zay', name: 'Preacher Curl', cue: 'Full stretch at the bottom, no momentum.', phases: fixed(4, '10') },
      ]},
      { tag: 'H', kind: 'straight', note: '4 sets', ex: [
        { id: 'reversepreacher', name: 'Reverse Preacher Curl', cue: 'Controlled tempo, forearm-forward grip.', phases: fixed(4, '8') },
      ]},
      { tag: 'I', kind: 'straight', note: 'no set count given — defaulted to 3', ex: [
        { id: 'chinups', name: 'Chin-ups', cue: 'No set count was given for this one — defaulted to 3, easy to change.', phases: fixed(3, 'AMRAP') },
      ]},
    ],
  },
]
```

### `src/theme-zay.css`

```css
/* Zay accent theme — lime green. Swapped in at build time via the
   `@theme` alias in vite.config.js (mode: 'zay'). Uses near-black
   accent-fg in BOTH modes (not white in light mode like the other two
   profiles) — lime stays high-luminance even at a darker shade, so
   white text on it tends to wash out. */

:root {
  --accent: 101 163 13; /* lime-600 */
  --accent-fg: 17 9 6;
}

.dark {
  --accent: 163 230 53; /* lime-400 */
  --accent-fg: 17 9 6;
}
```

### `.env.zay`

```
VITE_PROFILE=zay
VITE_STORAGE_KEY=zay_v1
VITE_THEME_KEY=zay_theme
VITE_APP_TITLE=Fos — Strength Log
VITE_APPLE_TITLE=Fos
VITE_THEME_COLOR="#0B0C0E"
```

Note the quotes around `#0B0C0E` — unquoted, `.env` parsers treat `#`
as a comment and silently truncate the value to empty.

### `public-zay/manifest.webmanifest`

**This file goes inside the `public-zay` folder the user already
created** — do not write it anywhere else.

```json
{
  "name": "Fos — Strength Log",
  "short_name": "Fos",
  "description": "Strength training tracker.",
  "start_url": "/strength-log/zay/",
  "scope": "/strength-log/zay/",
  "display": "standalone",
  "background_color": "#0B0C0E",
  "theme_color": "#0B0C0E",
  "icons": [
    { "src": "/strength-log/zay/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/strength-log/zay/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

### `public-zay/favicon.svg`

**The user has already placed this file in `public-zay`** — included
here only for reference/confirmation, no need to recreate it:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0B0C0E"/>
  <path d="M20 50 Q50 14 80 50" fill="none" stroke="#A3E635" stroke-width="8" stroke-linecap="round"/>
  <rect x="22" y="68" width="56" height="9" rx="4.5" fill="#A3E635"/>
</svg>
```

### `public-zay/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `favicon-32.png`

**Already in `public-zay`, placed there by the user.** Binary PNGs —
nothing to generate here. Just confirm they're present at
`public-zay/icon-192.png`, `public-zay/icon-512.png`,
`public-zay/apple-touch-icon.png`, `public-zay/favicon-32.png` before
running the build — if any are missing, stop and tell the user, don't
try to generate replacements from the SVG without `librsvg2-bin` or
ImageMagick available.

## Modified files — exact changes

### `src/data/active-profile.js` — replace entirely

```js
// Resolves which profile's program data is active for this build.
// All profiles are statically imported (required for Vite/Rollup to
// bundle correctly) but only one is ever used per build — each profile
// is built separately via `vite build --mode fos` / `--mode her` /
// `--mode zay`, so the unused branches' data (plain objects, no side
// effects) is the only thing that doesn't get exercised at runtime.
// Bundle cost is trivial.
//
// To add another profile later: create src/data/program.<name>.js
// following the same shape (PROGRAM_X, PHASES_X, BRAND, WARMUP if it
// needs its own), import it below, and add a branch.

import { PROGRAM, PHASES, WARMUP, BRAND } from './program.js'
import { PROGRAM_HER, PHASES_HER, BRAND as BRAND_HER } from './program.her.js'
import { PROGRAM_ZAY, PHASES_ZAY, BRAND as BRAND_ZAY } from './program.zay.js'

const profile = import.meta.env.VITE_PROFILE

export const ACTIVE_PROGRAM = profile === 'her' ? PROGRAM_HER : profile === 'zay' ? PROGRAM_ZAY : PROGRAM
export const ACTIVE_PHASES = profile === 'her' ? PHASES_HER : profile === 'zay' ? PHASES_ZAY : PHASES
export const ACTIVE_WARMUP = WARMUP // shared — generic, not profile-specific
export const ACTIVE_BRAND = profile === 'her' ? BRAND_HER : profile === 'zay' ? BRAND_ZAY : BRAND
```

### `vite.config.js` — replace entirely

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mode-aware config so the SAME source tree builds three completely
// separate static apps: the default ("fos"), and two more profiles
// ("her", "zay"), each with its own base path, its own public/ folder
// (so each gets its own favicon/icons/manifest), and its own accent
// color theme.
//
// Run with: vite build --mode fos   (default, also what `vite dev` uses)
//           vite build --mode her --outDir dist/her
//           vite build --mode zay --outDir dist/zay
//
// NOTE: `base` must match your GitHub repo name + each profile's
// subfolder. Repo "strength-log" -> fos served at
// https://<user>.github.io/strength-log/, her at .../strength-log/her/,
// zay at .../strength-log/zay/. If you rename the repo, update every
// base value below.
//
// publicDir for zay is "public-zay" — that folder already exists with
// all the icon assets already in it. Do not rename it.
const PROFILE_PATHS = {
  her: { base: '/strength-log/her/', publicDir: 'public-her', theme: 'src/theme-her.css' },
  zay: { base: '/strength-log/zay/', publicDir: 'public-zay', theme: 'src/theme-zay.css' },
}

export default defineConfig(({ mode }) => {
  const p = PROFILE_PATHS[mode] || { base: '/strength-log/', publicDir: 'public', theme: 'src/theme-fos.css' }
  return {
    plugins: [react()],
    base: p.base,
    publicDir: p.publicDir,
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, p.theme),
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
  "dev:zay": "vite --mode zay",
  "build": "npm run build:fos",
  "build:fos": "vite build --mode fos",
  "build:her": "vite build --mode her --outDir dist/her",
  "build:zay": "vite build --mode zay --outDir dist/zay",
  "preview": "vite preview",
  "deploy": "npm run build:fos && npm run build:her && npm run build:zay && gh-pages -d dist"
},
```

## Verification — already passed once, confirm it still does

```bash
ls public-zay/   # sanity check the folder + all 5 assets are really there before building
npm install
npm run build:fos
npm run build:her
npm run build:zay
```

All three must succeed with no errors. Then:

```bash
# Accent colors — three distinct pairs, no bleed
grep -o '\-\-accent:[0-9 ]*' dist/assets/*.css       # expect: 240 68 36 / 250 79 46
grep -o '\-\-accent:[0-9 ]*' dist/her/assets/*.css    # expect: 219 39 119 / 236 72 153
grep -o '\-\-accent:[0-9 ]*' dist/zay/assets/*.css    # expect: 101 163 13 / 163 230 53

# Real weight numbers + new exercises present in his bundle
grep -o '"155"\|"250"\|"235"\|"160"\|"95"\|bar-limited' dist/zay/assets/*.js | sort -u
grep -o "Back Extension\|Straight Bar Deadlift" dist/zay/assets/*.js | sort -u

# Phase copy reflects progressive-overload framing, not a restart
grep -o "already trained\|Bump the load" dist/zay/assets/*.js | sort -u

# theme-color must be a real hex in all three, not ""
grep "theme-color" dist/index.html dist/her/index.html dist/zay/index.html

# Storage key isolation — the property that actually matters
grep -o "jumper_offseason_v1\|fos4her_v1\|zay_v1" dist/assets/*.js | sort -u      # expect only jumper_offseason_v1
grep -o "jumper_offseason_v1\|fos4her_v1\|zay_v1" dist/her/assets/*.js | sort -u  # expect only fos4her_v1
grep -o "jumper_offseason_v1\|fos4her_v1\|zay_v1" dist/zay/assets/*.js | sort -u  # expect only zay_v1
```

If any of those don't match, something regressed — don't ship it,
debug it first.

## Deploy

```bash
npm run deploy
```

Builds all three (Fos into `dist/`, her into `dist/her/`, zay into
`dist/zay/`) and publishes the combined `dist/` via `gh-pages`.

Zay's URL: `https://<username>.github.io/strength-log/zay/` — he opens
that in Safari, **Share → Add to Home Screen**, and gets a lime "Fos"
icon. Same word as the original profile's icon ("Fos"), just a
different color — intentional per the brief, not a bug.
