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
  showPhases: false,
}

export const WARMUP_HER = {
  label: 'Warmup',
  time: '10–15 min',
  items: [
    'Cardio · 10–15 min',
    'General stretching',
  ],
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
    blurb: 'Placeholder — same as Phase 1 for now. Once Phase 1 has a few weeks logged, come back and we’ll fill this in based on what you’re actually hitting.',
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
        { id: 'inout', name: 'In & Out (Dumbbell)', cue: 'Controlled — don’t let momentum do the work.', phases: fixed(3, '6') },
      ]},
      { tag: 'B', kind: 'straight', note: '3 sets', ex: [
        { id: 'legraise_db1', name: 'Leg Raise (Dumbbell)', cue: 'Lower back flat to the floor throughout.', phases: fixed(3, '10') },
      ]},
      { tag: 'C', kind: 'straight', note: '3 sets, holds', ex: [
        { id: 'plank', name: 'Plank', cue: 'Hips level, brace like you’re about to get punched.', phases: fixed(3, '1 min hold') },
      ]},
      { tag: 'D', kind: 'straight', note: '3 sets', ex: [
        { id: 'pallof_her', name: 'Pallof Press', cue: 'Anti-rotation — resist the twist, don’t create it.', phases: fixed(3, '12') },
      ]},
      { tag: 'E', kind: 'straight', note: '3 sets, holds — each side', ex: [
        { id: 'sideplank', name: 'Weighted Side Plank', cue: 'Stack hips, don’t let them sag.', phases: fixed(3, '45 sec hold') },
      ]},
      { tag: 'F', kind: 'straight', note: '3 sets', ex: [
        { id: 'sideraise', name: 'Weighted Side Raise', cue: 'Obliques — slow and controlled, not swung.', phases: fixed(3, '10') },
      ]},
      { tag: 'G', kind: 'straight', note: '3 sets — second leg-raise pass', ex: [
        { id: 'legraise_db2', name: 'Leg Raise (Dumbbell) — Round 2', cue: 'Second pass at this one in the circuit — as written.', phases: fixed(3, '12') },
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
        { id: 'eztricep', name: 'EZ Bar Tricep Extension', cue: 'Elbows pinned, don’t let them flare.', phases: samePyramidAllPhases },
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
        { id: 'stepup', name: 'Step Up', cue: 'Drive through the working leg, don’t push off the bottom foot.', phases: samePyramidAllPhases },
      ]},
      { tag: 'D', kind: 'straight', note: 'pyramid', ex: [
        { id: 'hyperext', name: 'Hyperextension', cue: 'Squeeze glutes at the top, don’t hyperextend the low back.', phases: samePyramidAllPhases },
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
      { tag: 'C', kind: 'superset', note: 'best-guess pairing — confirm', ex: [
        { id: 'legpress', name: 'Leg Press', cue: 'Full range, don’t round the lower back at the bottom.', phases: samePyramidAllPhases },
        { id: 'legext', name: 'Leg Extension (Single-Leg)', cue: 'Paired here with Leg Press as our best read of "single leg then superset" — flag if a different pairing was meant.', phases: samePyramidAllPhases },
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
        { id: 'latpushdown', name: 'Lat Push Down', cue: 'Kept as written — double check this is distinct from Tricep Push Down on Push day.', phases: samePyramidAllPhases },
      ]},
    ],
  },
]
