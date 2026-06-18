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
