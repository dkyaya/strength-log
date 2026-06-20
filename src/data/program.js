// Offseason strength base for a high/triple jumper.
// Three phases. Each exercise carries a prescription per phase: { sets, reps, weight }.
// `weight` is the demanded target — athlete uses discretion, but the number is stated.
// Exercise `id`s are STABLE and match earlier versions so logged history carries over.

export const BRAND = {
  name: 'Fos',
  eyebrow: 'Offseason · General Prep',
  subtitle: 'Strength base for the offseason. Four days, twice through upper and lower — the numbers are the demand, your call what you load.',
  showPhases: true,
  weeklyTarget: 4,
}

export const PHASES = [
  { key: 'reentry', label: 'Re-entry', weeks: 'Weeks 1–2', blurb: 'Ease back in. Lighter, fewer sets, slow eccentrics on the mains. Rebuild tendon tolerance — not PRs.' },
  { key: 'build', label: 'Build', weeks: 'Weeks 2–4', blurb: 'Full sets. Climb the loads via double progression — top of the rep range, then add weight. 1–2 reps in reserve.' },
  { key: 'intensify', label: 'Intensify', weeks: 'Weeks 4–7', blurb: 'Heavier mains, lower reps. Convert the base into strength. Quality stays king on the single-leg and landing work.' },
]

// p(reentry, build, intensify) helper keeps the data readable.
const p = (a, b, c) => [a, b, c]

export const PROGRAM = [
  {
    id: 'lowerA',
    name: 'Lower A',
    focus: 'Bilateral + Posterior Chain',
    blocks: [
      {
        tag: 'A', kind: 'straight', note: 'heavy · 2–3 min rest',
        ex: [
          { id: 'backsquat', name: 'Back Squat', cue: 'Re-entry: 3-sec lowering, leave a few in the tank.',
            phases: p({ sets: 3, reps: '6', weight: '275 lb' }, { sets: 4, reps: '5', weight: '315 lb' }, { sets: 4, reps: '4', weight: '340 lb' }) },
        ],
      },
      {
        tag: 'B', kind: 'superset', note: 'alternate · ~90s after the pair',
        ex: [
          { id: 'rdl', name: 'Romanian Deadlift', cue: 'Hinge from the hips, chase the hamstring stretch.',
            phases: p({ sets: 3, reps: '8', weight: '245 lb' }, { sets: 3, reps: '8', weight: '285 lb' }, { sets: 4, reps: '6', weight: '315 lb' }) },
          { id: 'calf_stand', name: 'Standing Calf Raise', cue: 'Straight knee. Full stretch, pause at the top.',
            phases: p({ sets: 3, reps: '12', weight: '70 lb' }, { sets: 4, reps: '12', weight: '90 lb' }, { sets: 4, reps: '12', weight: '110 lb' }) },
        ],
      },
      {
        tag: 'C', kind: 'superset', note: 'alternate · ~90s',
        ex: [
          { id: 'hipthrust', name: 'Hip Thrust', cue: 'Ribs down, full glute lockout, pause at the top.',
            phases: p({ sets: 3, reps: '8', weight: '225 lb' }, { sets: 3, reps: '8', weight: '275 lb' }, { sets: 4, reps: '8', weight: '315 lb' }) },
          { id: 'hanglegraise', name: 'Hanging Leg Raise', cue: 'No swing. Brace and curl the pelvis.',
            phases: p({ sets: 3, reps: '10', weight: 'BW' }, { sets: 3, reps: '12', weight: 'BW' }, { sets: 4, reps: '12', weight: 'BW' }) },
        ],
      },
      {
        tag: 'D', kind: 'straight', note: 'slow eccentrics · 90s rest',
        ex: [
          { id: 'nordic', name: 'Nordic Hamstring Curl', cue: 'Eccentric only to start — fight the lower. (No anchor? Slider leg curls.)',
            phases: p({ sets: 3, reps: '5', weight: 'BW ecc.' }, { sets: 3, reps: '6', weight: 'BW' }, { sets: 4, reps: '6', weight: 'BW' }) },
        ],
      },
    ],
  },

  {
    id: 'upperA',
    name: 'Upper A',
    focus: 'Push + Pull',
    blocks: [
      {
        tag: 'A', kind: 'superset', note: 'push/pull · alternate · ~2 min',
        ex: [
          { id: 'bench', name: 'Bench Press', cue: 'Tuck the elbows, leg drive, controlled touch.',
            phases: p({ sets: 3, reps: '8', weight: '140 lb' }, { sets: 4, reps: '6', weight: '165 lb' }, { sets: 4, reps: '5', weight: '178 lb' }) },
          { id: 'wpullup', name: 'Weighted Pull-up', cue: 'Full hang to chin over bar. Add load when clean.',
            phases: p({ sets: 3, reps: '8', weight: '+25 lb' }, { sets: 4, reps: '6', weight: '+45 lb' }, { sets: 4, reps: '5', weight: '+60 lb' }) },
        ],
      },
      {
        tag: 'B', kind: 'superset', note: 'push/pull · alternate · ~90s',
        ex: [
          { id: 'ohp', name: 'Overhead Press', cue: 'Glutes tight, head through at lockout. (Est. — feel it out.)',
            phases: p({ sets: 3, reps: '8', weight: '90 lb' }, { sets: 3, reps: '8', weight: '100 lb' }, { sets: 4, reps: '6', weight: '110 lb' }) },
          { id: 'row', name: 'Barbell Row', cue: 'Flat back, pull to the lower ribs.',
            phases: p({ sets: 3, reps: '10', weight: '135 lb' }, { sets: 3, reps: '8', weight: '155 lb' }, { sets: 4, reps: '8', weight: '175 lb' }) },
        ],
      },
      {
        tag: 'C', kind: 'superset', note: 'armor · alternate · ~60s',
        ex: [
          { id: 'tib', name: 'Tibialis Raise', cue: 'Anterior shin — shin-splint armor for jumpers.',
            phases: p({ sets: 3, reps: '18', weight: 'light' }, { sets: 3, reps: '20', weight: 'light' }, { sets: 4, reps: '20', weight: 'add load' }) },
          { id: 'pallof', name: 'Pallof Press', cue: 'Anti-rotation. Resist the twist, don’t create it.',
            phases: p({ sets: 3, reps: '10/side', weight: 'mid stack' }, { sets: 3, reps: '12/side', weight: 'mid' }, { sets: 3, reps: '12/side', weight: 'mid' }) },
        ],
      },
    ],
  },

  {
    id: 'lowerB',
    name: 'Lower B',
    focus: 'Single-Leg + Eccentric / Landing',
    blocks: [
      {
        tag: 'A', kind: 'straight', note: 'heavy · 2–3 min rest',
        ex: [
          { id: 'frontsquat', name: 'Front Squat', cue: 'Upright torso, elbows high. Trains the brace too.',
            phases: p({ sets: 3, reps: '5', weight: '225 lb' }, { sets: 4, reps: '4', weight: '255 lb' }, { sets: 4, reps: '3', weight: '275 lb' }) },
        ],
      },
      {
        tag: 'B', kind: 'superset', note: 'alternate · ~90s',
        ex: [
          { id: 'bss', name: 'Bulgarian Split Squat', cue: 'Rear foot elevated. Own the balance before loading.',
            phases: p({ sets: 3, reps: '8/leg', weight: '30 lb DBs' }, { sets: 3, reps: '8/leg', weight: '40 lb DBs' }, { sets: 3, reps: '6/leg', weight: '50 lb DBs' }) },
          { id: 'calf_seat', name: 'Seated Calf Raise', cue: 'Bent knee hits the soleus — tendon stiffness.',
            phases: p({ sets: 3, reps: '12', weight: '45 lb' }, { sets: 4, reps: '12', weight: '70 lb' }, { sets: 4, reps: '15', weight: '90 lb' }) },
        ],
      },
      {
        tag: 'C', kind: 'superset', note: 'alternate · ~90s',
        ex: [
          { id: 'stepdown', name: 'Eccentric Step-Down', cue: '4-sec lower off a box, tap, drive up. Absorb force.',
            phases: p({ sets: 3, reps: '6/leg', weight: 'BW' }, { sets: 3, reps: '8/leg', weight: 'BW' }, { sets: 3, reps: '8/leg', weight: '+20 lb' }) },
          { id: 'suitcase', name: 'Suitcase Carry', cue: 'One side loaded, don’t lean. Anti-lateral-flexion.',
            phases: p({ sets: 3, reps: '40m', weight: '70 lb/side' }, { sets: 3, reps: '40m', weight: '85 lb/side' }, { sets: 3, reps: '40m', weight: '100 lb/side' }) },
        ],
      },
      {
        tag: 'D', kind: 'straight', note: 'balance & control · 90s rest',
        ex: [
          { id: 'slrdl', name: 'Single-Leg RDL', cue: 'Hips square to the floor. Slow and honest.',
            phases: p({ sets: 3, reps: '8/leg', weight: '25 lb DB' }, { sets: 3, reps: '8/leg', weight: '35 lb DB' }, { sets: 3, reps: '8/leg', weight: '45 lb DB' }) },
        ],
      },
    ],
  },

  {
    id: 'upperB',
    name: 'Upper B',
    focus: 'Push + Pull + Armor',
    blocks: [
      {
        tag: 'A', kind: 'superset', note: 'push/pull · alternate · ~2 min',
        ex: [
          { id: 'inclinedb', name: 'Incline DB Press', cue: 'Slight arch, full stretch at the bottom.',
            phases: p({ sets: 3, reps: '10', weight: '50 lb DBs' }, { sets: 4, reps: '8', weight: '60 lb DBs' }, { sets: 4, reps: '8', weight: '65 lb DBs' }) },
          { id: 'chinup', name: 'Chin-up', cue: 'Supinated grip, full hang to chin over bar.',
            phases: p({ sets: 3, reps: '10', weight: 'BW' }, { sets: 4, reps: '8', weight: '+10 lb' }, { sets: 4, reps: '8', weight: '+25 lb' }) },
        ],
      },
      {
        tag: 'B', kind: 'superset', note: 'push/pull · alternate · ~90s',
        ex: [
          { id: 'dbohp', name: 'DB Shoulder Press', cue: 'Neutral or slight angle, control the lower.',
            phases: p({ sets: 3, reps: '12', weight: '40 lb DBs' }, { sets: 3, reps: '10', weight: '45 lb DBs' }, { sets: 3, reps: '10', weight: '50 lb DBs' }) },
          { id: 'facepull', name: 'Face Pull', cue: 'Shoulder health. High elbows, pull to the eyes.',
            phases: p({ sets: 3, reps: '15', weight: 'light' }, { sets: 3, reps: '15', weight: 'mid' }, { sets: 3, reps: '15', weight: 'mid' }) },
        ],
      },
      {
        tag: 'C', kind: 'superset', note: 'tendon + core · alternate · ~60s',
        ex: [
          { id: 'spanish', name: 'Spanish Squat (iso hold)', cue: 'Band behind the knees, sit back, hold. Patellar insurance.',
            phases: p({ sets: 3, reps: '30s', weight: 'band' }, { sets: 3, reps: '40s', weight: 'band' }, { sets: 4, reps: '45s', weight: 'band' }) },
          { id: 'abwheel', name: 'Ab Wheel', cue: 'Long lever, don’t let the hips sag.',
            phases: p({ sets: 3, reps: '8', weight: 'BW' }, { sets: 3, reps: '10', weight: 'BW' }, { sets: 4, reps: '12', weight: 'BW' }) },
        ],
      },
    ],
  },
]

export const WARMUP = {
  label: 'Warmup',
  time: '~7 min',
  items: [
    'Easy cardio — bike, jog, or rope · 3–4 min',
    'Joint circles — ankles, hips, shoulders, T-spine',
    'Leg swings — front-back & lateral · 10 / side',
  ],
}
