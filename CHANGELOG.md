# Changelog

All changes to the Fos app, newest first.

---

## 2026-06-29 — Fos Build + Intensify weights locked from Re-entry data

Updated `src/data/program.js` (public Fos profile only — her and zay untouched). Build and Intensify phase weights now reflect actual mid-late June Re-entry session logs.

Key changes from previous targets: Back Squat Build 315 → 295 lb (conservative ramp off 305×6 logged); Front Squat Build 255 → 225 lb (form-flagged, staying light through Intensify too at 245); Hip Thrust Build 275 → 295 lb (logged 315×10, pulled back slightly); Weighted Pull-up Build +45 → +10 lb (was BW-only last session, re-adding load gradually); Face Pull Build pinned at 100 lb (consistency target, not a PR chase); Pallof Press Build 'mid' → 75 lb (logged 70×10 on 6/25, bumped slightly); Tib Raise and BSS weights specified from logged numbers; SL-RDL, Seated Calf, Step-Down, OHP, Incline DB, Chin-up Intensify all bumped proportionally.

---

## 2026-06-20 — Zay: FOS4Her warmup, weeklyTarget 4

Zay now uses the FOS4Her warmup (Cardio 10–15 min + General stretching) instead of the generic shared warmup. `weeklyTarget` set to 4 in his `BRAND`.

---

## 2026-06-20 — Add Zay profile (lime green, 4-day program)

Third profile alongside fos and her. Zay's program: Quads, Hamstrings, Chest & Back, Arms & Shoulders — 4 days, real maxes baked in (Back Squat 275, Front Squat 300, Bench 185, Military Press 115, Hang Clean 175). Trap Deadlift is labeled "bar-limited" instead of a percentage — he's equipment-capped. Two exercises added after the initial draft: Back Extension (4×10) and Straight Bar Deadlift (5×5). Lime-green accent (`--accent: 101 163 13` / `163 230 53`). Storage key `zay_v1`, deployed at `/strength-log/zay/`.

New files: `src/data/program.zay.js`, `src/theme-zay.css`, `.env.zay`, `public-zay/manifest.webmanifest`. Updated: `active-profile.js` (three-way branch), `vite.config.js` (PROFILE_PATHS table), `package.json` (`dev:zay`, `build:zay`, deploy includes all three).

---

## 2026-06-20 — Profile-specific weekly target, session notes, dated data

**Weekly target is now profile-specific.** `BRAND.weeklyTarget` added to both program files (4 for Fos, 6 for FOS4Her). `StatsRow` accepts it as a prop instead of hardcoding `/6`. `App.jsx` passes `BRAND.weeklyTarget` through.

**Session notes.** A "Session notes" textarea now appears below the exercise blocks on the train tab, above "Mark session done." Notes are stored in `state.notes` keyed by `dayId_date` (e.g. `lowerA_2026-06-20`), saved on every keystroke. Notes are also shown in the calendar day popover when tapping a completed session. `CalendarView` accepts a `notes` prop. `restoreFrom` in `App.jsx` handles notes in backup/restore.

**Data dating.** Sets (`logs`), sessions, warmups, and bodyweight entries were already fully dated. Notes have the date baked into their key. `storage.js` now initialises and validates a `notes: {}` field alongside the existing fields.

---

## 2026-06-18 — 6 sessions/week, calendar now profile-aware

**"This week" counter updated to `/6`** in `StatsRow` (was `/4`).

**`CalendarView` prop-ified and made fully profile-aware.** Component was importing `PROGRAM` directly from `program.js` — day dot colors and the legend were hardcoded to Fos day IDs, so FOS4Her sessions would have shown no colored dots and an empty legend. Fixed by accepting a `program` prop and generating `dayMeta` dynamically (cycles through 6 preset colors for as many days as the program has). `App.jsx` now passes `program={PROGRAM}` to `CalendarView`.

---

## 2026-06-18 — FOS4Her exercises in progress dropdown

`ProgressView` was importing `PROGRAM` directly from `program.js`, so the progress dropdown always showed Fos exercises regardless of build. Fixed by making it prop-driven (`program` prop) and passing `PROGRAM` from `App.jsx` — same pattern as the earlier DayTabs/PhaseSwitcher/Warmup fixes. FOS4Her's progress view now shows all five of her days (Abs, Push, Glute, Quad, Back & Bis) grouped by day, with all exercises selectable.

---

## 2026-06-18 — FOS4Her: remove phase switcher, simplify warmup

**Phase switcher hidden for FOS4Her.** Added `showPhases` flag to the `BRAND` object on both profiles (`true` for Fos, `false` for FOS4Her). `App.jsx` gates `<PhaseSwitcher>` on `BRAND.showPhases` — the Fos build is unchanged; the her build shows no phase tabs.

**FOS4Her warmup simplified to two items:** "Cardio · 10–15 min" and "General stretching". Added `WARMUP_HER` to `program.her.js`, updated `active-profile.js` to export it conditionally instead of always using the shared Fos warmup.

**Bug fix — `Warmup.jsx` prop-ified.** Component was importing `WARMUP` directly from `program.js` (same pattern as the DayTabs/PhaseSwitcher bugs fixed last session). Now receives `warmup` as a prop from `App.jsx`, so the her build correctly uses `WARMUP_HER`.

---

## 2026-06-18 — Add FOS4Her second profile

Added a fully separate pink-themed build of the app — **FOS4Her** — deployed at `/strength-log/her/`. Same source tree, two independent static apps built at deploy time via Vite modes.

**New files:**
- `src/data/program.her.js` — full FOS4Her workout program (Abs, Push, Glute, Quad, Back & Bis; "Your pick" weights; pyramid prescription throughout; three placeholder phases).
- `src/data/active-profile.js` — build-time profile resolver; imports both profiles statically and exports the active one based on `VITE_PROFILE` env var.
- `src/theme-fos.css` / `src/theme-her.css` — per-profile accent color declarations (orange-red vs pink-600/pink-500), aliased at build time via `@theme`.
- `.env.fos` / `.env.her` — per-profile build env vars: storage key, theme key, app title, Apple title, theme-color hex.
- `public-her/` — pink icons (192, 512, 180, 32px), favicon SVG, and `manifest.json` scoped to `/strength-log/her/`.

**Modified files:**
- `vite.config.js` — replaced with mode-aware config; each mode gets its own `base`, `publicDir`, and `@theme` alias.
- `package.json` — added `build:fos`, `build:her`, `dev:her` scripts; `build` and `deploy` updated to run both profiles.
- `src/data/program.js` — added `BRAND` export (name, eyebrow, subtitle) for the Fos profile.
- `src/lib/storage.js` — `KEY` and `THEME_KEY` now read from `VITE_STORAGE_KEY` / `VITE_THEME_KEY` env vars, falling back to original Fos defaults; guarantees zero cross-profile data collision.
- `src/main.jsx` — added `import '@theme'` to pull in the build-time accent palette.
- `src/index.css` — removed `--accent` / `--accent-fg` declarations (now live in theme files).
- `src/App.jsx` — imports from `active-profile.js` instead of `program.js`; header copy driven by `BRAND` fields; passes `phases` to `PhaseSwitcher` and `program` to `DayTabs`; initial active day derived from `PROGRAM[0].id` instead of hardcoded `'lowerA'`.
- `src/components/PhaseSwitcher.jsx` — receives `phases` as a prop instead of importing directly from `program.js`.
- `src/components/DayTabs.jsx` — receives `program` as a prop (bug fix: was importing directly from `program.js`, which would have shown Fos day tabs in the her build).
- `index.html` — `<title>`, `apple-mobile-web-app-title`, and `theme-color` now use `%VITE_*%` placeholders resolved per build.

**Her URL:** `https://dkyaya.github.io/strength-log/her/` — open in Safari, Share → Add to Home Screen for the pink FOS4Her icon.

---

## 2026-06-17 18:14 — Animated LogoMark in header

Created a new `LogoMark` component and placed it in the header next to the "Fos" wordmark.

**The component (`src/components/LogoMark.jsx`):**
- Renders a small rounded-square tile (fixed `#0B0C0E` background, so it looks the same in light and dark mode) containing the brand glyph: a quadratic arc (`M20 50 Q50 14 80 50`) and a bar (`rx=4.5` pill shape), both in the accent color.
- **Draw-in on mount:** the arc strokes in using `pathLength` animation (~0.5s, easeOut), then the bar scales in from the center (~0.3s, 0.45s delay) so it visibly follows the arc rather than appearing at the same time.
- **Ambient glow:** once the draw-in settles, a blurred accent-colored glow breathes behind the tile in an infinite mirrored loop — subtle, not distracting.
- **Tap bounce:** tapping or clicking the mark triggers a quick spring squash (scale 0.88, −4° rotate) with a snappy spring return.
- `animate` prop (default `true`) lets a caller opt out of the entrance animation and glow, keeping only the tap bounce. Useful if the component is ever reused inside a list where entrance animations would be excessive.

**App.jsx changes:** added the `LogoMark` import and updated the `<h1>` to `flex items-center gap-3` layout with `<LogoMark size={40} />` preceding the wordmark.

---

## 2026-06-17 17:59 — Rebrand display name to "Fos"

Renamed all user-facing brand strings from "Strength Base Log" / "Offseason Strength Log" to "Fos". The technical slug (`strength-log`) was deliberately left unchanged everywhere — renaming it would break the live GitHub Pages URL and require creating a new repo.

**What changed:**
- `index.html`: page `<title>` changed to `Fos — Strength Base Log`; `apple-mobile-web-app-title` changed to `Fos`.
- `public/manifest.json`: `name` changed to `Fos — Strength Base Log`; `short_name` changed to `Fos`. This updates the label that appears under the icon on the iOS home screen.
- `src/App.jsx`: the main `<h1>` now reads `Fos` instead of `Strength Base Log`. The subtitle was updated to "Strength base for the offseason. Four days, twice through upper and lower — the numbers are the demand, your call what you load."
- `README.md`: title updated to `# Fos` with a note explaining the brand-vs-slug split.

**What was not touched:** `package.json` name field, `vite.config.js` base path, the `jumper_offseason_v1` storage key, exercise `id` values. Existing data on any device carries over automatically with no import/export step.

---

## 2026-06-17 17:42 — Progress charts, training calendar, and CSV export

Added two new views alongside the main training tab, accessible via a nav tab bar across the top.

**Progress view:**
- Per-exercise line charts showing max weight logged over time, one chart per exercise.
- Charts are built with Recharts. Each point is the heaviest set logged on that date.
- Only exercises that have at least one logged set appear.

**Calendar view:**
- Monthly calendar grid showing which days had completed sessions.
- Completed days are highlighted. Clicking a day shows a summary of what was logged that day.

**CSV export:**
- Button in the backup panel that downloads your entire log as a `.csv` file — one row per logged set, with columns for date, exercise name, weight, and reps.
- Useful for doing your own analysis outside the app.

**Nav tabs:**
- New `NavTabs` component with three tabs: Train, Progress, Calendar.
- The active view animates in/out with a short fade transition via Framer Motion's `AnimatePresence`.

---

## 2026-06-17 17:10 — PWA manifest and home screen icon support

Added the files needed so the app can be installed as a Progressive Web App and added to the iOS home screen as a bookmark that opens full-screen without browser chrome.

**What was added:**
- `public/manifest.json` — tells the browser the app's name, short name, theme color, and icon. Required for "Add to Home Screen" to produce a proper icon.
- `public/icon-192.png` — the app icon (192×192) used both in the manifest and as the Apple touch icon.
- Meta tags in `index.html`: `apple-mobile-web-app-capable`, `mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, and `theme-color`. These are what make iOS treat the saved bookmark as a standalone app rather than a regular browser tab.
- Link tags for the manifest and apple-touch-icon in `index.html`.

**How to use:** open the app in Safari on iPhone → Share → Add to Home Screen. The icon appears on the home screen, and opening it launches full-screen with the status bar blending into the app's dark background.

---

## 2026-06-17 16:54 — Rebuild as React app

Completely rewrote the app from scratch as a proper React + Vite + Tailwind + Framer Motion single-page app. Replaced whatever existed before with a structured training tracker that works offline and saves everything to the browser's local storage.

**What was added:**
- Three training phases (Re-entry, Build, Intensify) with per-phase sets/reps/weight prescriptions for every exercise. A pill switcher lets you move between phases without losing any logged history.
- Four training days (Upper A, Lower A, Upper B, Lower B) with a tab layout. Each day has its own block of exercises.
- Warmup gate — three checklist items that must all be ticked before the workout unlocks. Resets automatically each day.
- Set logging per exercise: enter weight and reps, tap to log. Previously logged sets show inline with a remove button.
- "Mark session done" button that records a completed session for today.
- Bodyweight tracker with a date-stamped entry and a small sparkline trend chart.
- Stats row showing total sessions logged and current training streak.
- Light / dark mode toggle (top-right), persisted across reloads.
- Backup & restore panel: copies your entire log as a text blob you can paste back in, useful for moving between devices.
- Phase switcher persisted to storage so it survives page reloads.

**Storage:** everything (sets, sessions, bodyweight, warmup state, theme, phase) is stored under the key `jumper_offseason_v1` in `localStorage`. The key and exercise `id` values are the stable identity for your data — changing them would disconnect history.
