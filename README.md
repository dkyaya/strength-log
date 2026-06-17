# Strength Base Log

A standalone training tracker — React + Vite + Tailwind + Framer Motion.
Saves to the browser's local storage on your phone, so it persists across
closing the app and works offline once loaded. No backend, no account.

## What's inside

- **Three training phases** (Re-entry → Build → Intensify), each with its
  own stated sets × reps × weight per exercise. Switch phases with the pill
  control near the top — your logged history doesn't change when you do.
- **Gated warmup** — three checks, resets daily, unlocks the workout.
- **Bodyweight tracker** with a trend sparkline.
- **Backup & restore** — copies your whole log as a text code, for moving
  between devices or as an offsite backup.
- **Light / dark mode**, toggle top-right.

All program data (the exercises, blocks, and per-phase prescriptions) lives
in `src/data/program.js` — that's the one file you'll hand back to Claude
to edit, or edit yourself, when the plan changes.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Edits hot-reload.

## Deploying to GitHub Pages

This project is configured to deploy to a repo named **`strength-log`**.
If your repo has a different name, update `base` in `vite.config.js` to
match (`base: '/your-repo-name/'`), or it will load with broken asset paths.

```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to a `gh-pages` branch via
the `gh-pages` package. First time only, then go to your repo's
**Settings → Pages → Source** and select the `gh-pages` branch.

Your app will be live at:

```
https://<your-username>.github.io/strength-log/
```

On your phone: open that URL in Safari → **Share → Add to Home Screen.**

## Important: your data carries over automatically

Local storage is tied to the page's origin (`<username>.github.io/strength-log/`),
not to any particular file. As long as future deploys keep:

1. the same GitHub Pages URL, and
2. the same exercise `id` values in `program.js`,

...your logged sets, sessions, and bodyweight all carry over with zero
import/export step. Renaming an exercise's display `name` is safe — only
changing its `id` disconnects its history.

## Updating the program

Open `src/data/program.js`. Each exercise has a `phases` array of three
objects — `{ sets, reps, weight }` — one per phase, in order
`[reentry, build, intensify]`. Edit the numbers, rebuild, redeploy.
