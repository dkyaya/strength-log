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
import { PROGRAM_HER, PHASES_HER, WARMUP_HER, BRAND as BRAND_HER } from './program.her.js'
import { PROGRAM_ZAY, PHASES_ZAY, BRAND as BRAND_ZAY } from './program.zay.js'

const profile = import.meta.env.VITE_PROFILE

export const ACTIVE_PROGRAM = profile === 'her' ? PROGRAM_HER : profile === 'zay' ? PROGRAM_ZAY : PROGRAM
export const ACTIVE_PHASES = profile === 'her' ? PHASES_HER : profile === 'zay' ? PHASES_ZAY : PHASES
export const ACTIVE_WARMUP = profile === 'zay' ? WARMUP_HER : WARMUP
export const ACTIVE_BRAND = profile === 'her' ? BRAND_HER : profile === 'zay' ? BRAND_ZAY : BRAND
