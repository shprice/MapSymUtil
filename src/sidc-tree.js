// DIS entity type → MIL-STD-2525D SIDC lookup tree (20-character format).
// Source: SISO-REF-010 mapping tables and milsymbol v3 (2525D) entity codes.
//
// Structure: kind → domain → category → { ss, entity, label }
//   ss     = Symbol Set (2-digit string)
//   entity = Entity code (6-digit string, symbol-set specific)
//   label  = Human-readable symbol category name
//
// Each level has a '_' fallback when the next key is not found.
// Country (parts[2] of DIS type) is intentionally skipped — affiliation is
// expressed via Standard Identity, which is derived from forceId.
//
// Symbol set codes:
//   '01'=Air  '02'=AirMissile  '05'=Space  '06'=SpaceMissile
//   '10'=LandUnit  '15'=LandEquipment  '30'=SeaSurface  '35'=SeaSubsurface

export const SIDC_TREE = {
  1: { // Platform
    _: { ss: '10', entity: '120900', label: 'Combat' },
    1: { // Land
      _:  { ss: '10', entity: '120900', label: 'Combat' },
       0: { ss: '10', entity: '120900', label: 'Combat' },
       1: { ss: '10', entity: '120500', label: 'Armor' },               // Tank
       2: { ss: '10', entity: '121100', label: 'Infantry (Mech)' },     // AIFV
       3: { ss: '10', entity: '121100', label: 'Infantry (Mech)' },     // MICV
       4: { ss: '10', entity: '121100', label: 'Infantry' },            // Armored car
       5: { ss: '10', entity: '120900', label: 'Combat' },              // Armored cmd post
       6: { ss: '10', entity: '121300', label: 'Reconnaissance' },      // Wheeled recon
       7: { ss: '10', entity: '120900', label: 'Combat' },              // Wheeled cmd post
       8: { ss: '10', entity: '121100', label: 'Infantry' },            // Wheeled utility (sm)
       9: { ss: '10', entity: '121100', label: 'Infantry' },            // Wheeled utility (lg)
      10: { ss: '10', entity: '130800', label: 'Mortar' },
      11: { ss: '10', entity: '140700', label: 'Engineer' },            // Mine plow
      12: { ss: '10', entity: '140700', label: 'Engineer' },            // Mine rake
      13: { ss: '10', entity: '140700', label: 'Engineer' },            // Mine roller
      14: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      15: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      16: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      17: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      18: { ss: '10', entity: '140700', label: 'Engineer' },
      19: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      20: { ss: '10', entity: '161100', label: 'Maintenance' },         // Maintenance trailer
      21: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      22: { ss: '10', entity: '140100', label: 'CBRN' },               // Chemical decon
      23: { ss: '10', entity: '120900', label: 'Combat' },              // Warning system
      24: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      25: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      26: { ss: '10', entity: '160600', label: 'Combat Service Support' },
      28: { ss: '10', entity: '130100', label: 'Air Defence' },         // Air defense / SAM
      29: { ss: '10', entity: '140200', label: 'Combat Support' },      // C3I system
      30: { ss: '10', entity: '140200', label: 'Combat Support' },      // Operations facility
      31: { ss: '10', entity: '140200', label: 'Combat Support' },      // Intelligence facility
      32: { ss: '10', entity: '140200', label: 'Combat Support' },      // Surveillance facility
      33: { ss: '10', entity: '140200', label: 'Combat Support' },      // Comms facility
      34: { ss: '10', entity: '140200', label: 'Combat Support' },      // Command facility
      35: { ss: '10', entity: '140200', label: 'Combat Support' },      // C4I facility
      36: { ss: '10', entity: '140200', label: 'Combat Support' },      // Control facility
      37: { ss: '10', entity: '130300', label: 'Field Artillery' },     // Fire control
      38: { ss: '10', entity: '130100', label: 'Air Defence' },         // Missile defense
      39: { ss: '10', entity: '140200', label: 'Combat Support' },      // Field cmd post
      40: { ss: '10', entity: '121300', label: 'Reconnaissance' },      // Observation post
    },
    2: { // Air
      _:  { ss: '01', entity: '110100', label: 'Fixed Wing' },
       0: { ss: '01', entity: '110100', label: 'Fixed Wing' },
       1: { ss: '01', entity: '110104', label: 'Fighter' },
       2: { ss: '01', entity: '110102', label: 'Attack / Strike' },
       3: { ss: '01', entity: '110103', label: 'Bomber' },
       4: { ss: '01', entity: '110107', label: 'Cargo / Tanker' },
       5: { ss: '01', entity: '110110', label: 'Maritime Patrol' },     // ASW / MPA
       6: { ss: '01', entity: '110108', label: 'Electronic Warfare' },
       7: { ss: '01', entity: '110111', label: 'Reconnaissance' },
       8: { ss: '01', entity: '110116', label: 'AEW' },                 // Airborne Early Warning
      20: { ss: '01', entity: '110200', label: 'Helicopter (Attack)' },
      21: { ss: '01', entity: '110200', label: 'Helicopter (Utility)' },
      22: { ss: '01', entity: '110200', label: 'Helicopter (ASW)' },
      23: { ss: '01', entity: '110200', label: 'Helicopter (Cargo)' },
      24: { ss: '01', entity: '110200', label: 'Helicopter (Obs)' },
      25: { ss: '01', entity: '110200', label: 'Helicopter (SOF)' },
      40: { ss: '01', entity: '110100', label: 'Trainer' },
      50: { ss: '01', entity: '110300', label: 'UAV' },
    },
    3: { // Surface
      _:  { ss: '30', entity: '120203', label: 'Warship' },
       0: { ss: '30', entity: '120203', label: 'Warship' },
       1: { ss: '30', entity: '120100', label: 'Carrier' },
       2: { ss: '30', entity: '120203', label: 'Command Ship' },
       3: { ss: '30', entity: '120203', label: 'Cruiser' },
       4: { ss: '30', entity: '120203', label: 'Destroyer' },
       5: { ss: '30', entity: '120203', label: 'Destroyer' },
       6: { ss: '30', entity: '120204', label: 'Frigate' },
       7: { ss: '30', entity: '120500', label: 'Patrol Craft' },
       8: { ss: '30', entity: '120402', label: 'Minesweeper' },
       9: { ss: '30', entity: '120203', label: 'Amphibious Ship' },
      10: { ss: '30', entity: '120203', label: 'Landing Ship' },
      11: { ss: '30', entity: '120500', label: 'Landing Craft' },
      14: { ss: '30', entity: '120500', label: 'Patrol Craft' },        // Hydrofoil
      16: { ss: '30', entity: '120203', label: 'Auxiliary' },
      17: { ss: '30', entity: '120203', label: 'Auxiliary' },
      50: { ss: '30', entity: '120204', label: 'Frigate' },
      51: { ss: '30', entity: '120201', label: 'Battleship' },
      52: { ss: '30', entity: '120203', label: 'Cruiser' },
      53: { ss: '30', entity: '120203', label: 'Auxiliary' },
      54: { ss: '30', entity: '120203', label: 'Amphibious Assault' },
      55: { ss: '30', entity: '120203', label: 'Amphibious Cargo' },
      56: { ss: '30', entity: '120203', label: 'Amphibious Transport' },
      57: { ss: '30', entity: '120203', label: 'Auxiliary' },
      58: { ss: '30', entity: '120203', label: 'Auxiliary' },
      59: { ss: '30', entity: '120500', label: 'Surveillance' },
      60: { ss: '30', entity: '120203', label: 'Auxiliary' },
      61: { ss: '30', entity: '120203', label: 'Non-Combatant' },
      62: { ss: '30', entity: '120500', label: 'Coast Guard' },
      63: { ss: '30', entity: '120500', label: 'Coast Guard' },
    },
    4: { // Subsurface
      _:  { ss: '35', entity: '110100', label: 'Submarine' },
       0: { ss: '35', entity: '110100', label: 'Submarine' },
       1: { ss: '35', entity: '110100', label: 'Submarine (SSBN)' },
       2: { ss: '35', entity: '110100', label: 'Submarine (SSGN)' },
       3: { ss: '35', entity: '110100', label: 'Submarine (SSN)' },
       4: { ss: '35', entity: '110100', label: 'Submarine (SSG)' },
       5: { ss: '35', entity: '110100', label: 'Submarine (SS)' },
       6: { ss: '35', entity: '110100', label: 'Submarine (SSAN)' },
       7: { ss: '35', entity: '110100', label: 'Submarine (SSA)' },
    },
    5: { // Space
      _:  { ss: '05', entity: '110700', label: 'Satellite' },
       0: { ss: '05', entity: '110700', label: 'Satellite' },
       1: { ss: '05', entity: '110500', label: 'Space Vehicle' },
       2: { ss: '05', entity: '110700', label: 'Satellite' },
       3: { ss: '05', entity: '110700', label: 'Space Launch' },
    },
  },
  2: { // Munition
    _:  { ss: '02', entity: '110000', label: 'Munition' },
    1: { _: { ss: '15', entity: '110000', label: 'Munition (Land)' } },   // Land Missile (ss 15)
    2: { _: { ss: '02', entity: '110000', label: 'Munition (Air)' } },    // Air Missile (ss 02)
    3: { _: { ss: '30', entity: '110000', label: 'Munition (Sea)' } },    // Sea Surface
    4: { _: { ss: '35', entity: '110000', label: 'Munition (Sub)' } },    // Sea Subsurface
    5: { _: { ss: '06', entity: '110000', label: 'Munition (Space)' } },  // Space Missile (ss 06)
  },
  3: { // Life Form
    _:  { ss: '10', entity: '121100', label: 'Infantry' },
    1: { // Land
      _:  { ss: '10', entity: '121100', label: 'Infantry' },
       0: { ss: '10', entity: '120900', label: 'Combat' },
       1: { ss: '10', entity: '121100', label: 'Infantry' },
       2: { ss: '10', entity: '121100', label: 'Infantry' },
    },
    2: { // Air
      _:  { ss: '01', entity: '110200', label: 'Helicopter' },
       1: { ss: '01', entity: '110200', label: 'Helicopter' },          // Parachutist
    },
    3: { _: { ss: '30', entity: '120203', label: 'Warship' } },
  },
  4: { _: { ss: '10', entity: '120900', label: 'Combat' } },           // Environmental
  8: { _: { ss: '01', entity: '110100', label: 'Fixed Wing' } },       // Expendable
  9: { _: { ss: '10', entity: '140200', label: 'Combat Support' } },   // Sensor / emitter
};

// Resolve an entry from the tree with cascading fallbacks.
// Returns { ss, entity, label } or null.
export function treeLookup(kind, domain, category) {
  const kindNode = SIDC_TREE[kind];
  if (!kindNode) return null;
  const domainNode = kindNode[domain];
  if (!domainNode) return kindNode._ ?? null;
  return domainNode[category] ?? domainNode._ ?? kindNode._ ?? null;
}

// Build the reverse index: "ss:entity" → [{ kind, domain, category, label }, ...]
// Built once at module load; first match wins in sidcToDisEntity.
function buildReverseIndex() {
  const index = new Map();

  function addEntry(kind, domain, category, entry) {
    const key = `${entry.ss}:${entry.entity}`;
    if (!index.has(key)) index.set(key, []);
    index.get(key).push({ kind, domain, category, label: entry.label });
  }

  for (const [kindStr, kindNode] of Object.entries(SIDC_TREE)) {
    const kind = Number(kindStr);
    for (const [domainStr, domainNode] of Object.entries(kindNode)) {
      if (domainStr === '_') {
        // kind-level fallback: mark with domain=-1 (wildcard)
        addEntry(kind, -1, -1, domainNode);
        continue;
      }
      const domain = Number(domainStr);
      for (const [catStr, entry] of Object.entries(domainNode)) {
        if (catStr === '_') {
          addEntry(kind, domain, -1, entry);
        } else {
          addEntry(kind, domain, Number(catStr), entry);
        }
      }
    }
  }

  return index;
}

export const REVERSE_INDEX = buildReverseIndex();
