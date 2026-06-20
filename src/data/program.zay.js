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
    blurb: 'Working weights based on his maxes. Bump the load once reps are feeling solid across all sets — no need to ease into this, he’s already trained.',
  },
  {
    key: 'phase2',
    label: 'Phase 2',
    weeks: 'Not set up yet',
    blurb: 'Next step up from Phase 1 — come back and fill this in once he’s logged a few weeks and has a sense of what to bump.',
  },
  {
    key: 'phase3',
    label: 'Phase 3',
    weeks: 'Not set up yet',
    blurb: 'Same idea as Phase 2, for whenever that’s ready to set up too.',
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
        { id: 'straightbardeadlift', name: 'Straight Bar Deadlift', cue: 'Added after the original list — no rep scheme given, defaulted to match Trap Deadlift’s 5x5.', phases: fixed(5, '5') },
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
        { id: 'flatpress', name: 'Flat Press', cue: 'Kept as written — check whether this is meant to be distinct from Bench Press or DB above.', phases: fixed(5, '8') },
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
