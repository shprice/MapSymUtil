// IEEE 1278.1 / SISO-REF-010 DIS enumeration constants relevant to entity type mapping.

export const DIS_FORCE_ID = Object.freeze({
  0: 'Other',
  1: 'Friendly',
  2: 'Opposing',
  3: 'Neutral',
});

export const DIS_ENTITY_KIND = Object.freeze({
  0: 'Other',
  1: 'Platform',
  2: 'Munition',
  3: 'LifeForm',
  4: 'Environmental',
  5: 'CulturalFeature',
  6: 'Supply',
  7: 'Radio',
  8: 'Expendable',
  9: 'SensorEmitter',
});

export const DIS_DOMAIN = Object.freeze({
  0: 'Other',
  1: 'Land',
  2: 'Air',
  3: 'Surface',
  4: 'Subsurface',
  5: 'Space',
});

// ── MIL-STD-2525D (20-char) constants ────────────────────────────────────────

// Standard Identity codes (chars 3–4 of the 20-char SIDC)
export const SIDC_STANDARD_IDENTITY = Object.freeze({
  '00': 'Pending',
  '01': 'Unknown',
  '02': 'AssumedFriend',
  '03': 'Friend',
  '04': 'Neutral',
  '05': 'Suspect',
  '06': 'Hostile',
});

// Symbol Sets (chars 5–6 of the 20-char SIDC)
export const SIDC_SYMBOL_SET = Object.freeze({
  '01': 'Air',
  '02': 'AirMissile',
  '05': 'Space',
  '06': 'SpaceMissile',
  '10': 'LandUnit',
  '11': 'LandCivilianUnit',
  '15': 'LandEquipment',
  '20': 'LandInstallation',
  '25': 'ControlMeasure',
  '27': 'DismountedIndividual',
  '30': 'SeaSurface',
  '35': 'SeaSubsurface',
  '36': 'MineWarfare',
  '40': 'Activities',
  '50': 'SIGINT',
  '51': 'SIGINTAir',
  '52': 'SIGINTLandEquipment',
  '53': 'SIGINTSpace',
  '54': 'SIGINTSeaSurface',
  '60': 'Cyberspace',
});

// DIS Force ID → 2525D Standard Identity (2-char string)
export const FORCE_ID_TO_SI = Object.freeze(['01', '03', '06', '04']);

// 2525D Standard Identity → DIS Force ID
export const SI_TO_FORCE_ID = Object.freeze({
  '00': 0, // Pending → Other
  '01': 0, // Unknown → Other
  '02': 1, // AssumedFriend → Friendly
  '03': 1, // Friend → Friendly
  '04': 3, // Neutral → Neutral
  '05': 2, // Suspect → Opposing
  '06': 2, // Hostile → Opposing
});

// ── MIL-STD-2525C (15-char) constants ────────────────────────────────────────

// DIS Force ID → 2525C Standard Identity character (position 2 of SIDC)
export const FORCE_ID_TO_SI_CHAR = Object.freeze(['U', 'F', 'H', 'N']);

// 2525C Standard Identity character → DIS Force ID
export const SI_CHAR_TO_FORCE_ID = Object.freeze({
  F: 1, // Friend
  G: 1, // Exercise Friend
  D: 1, // Exercise Friend Pending
  M: 1, // Exercise Assumed Friend
  A: 1, // Assumed Friend
  H: 2, // Hostile
  J: 2, // Joker (suspected hostile)
  K: 2, // Faker (friendly acting hostile)
  S: 2, // Suspect
  N: 3, // Neutral
  L: 3, // Exercise Neutral
  U: 0, // Unknown
  W: 0, // Exercise Unknown
  P: 0, // Pending
});

// 2525C Battle Dimension character (position 3) → DIS { kind, domain }
// Returns the most common DIS mapping; reverse is approximate.
export const BD_CHAR_TO_KIND_DOMAIN = Object.freeze({
  A: { kind: 1, domain: 2 }, // Air Platform
  G: { kind: 1, domain: 1 }, // Ground Platform / Land
  S: { kind: 1, domain: 3 }, // Sea Surface Platform
  U: { kind: 1, domain: 4 }, // Subsurface Platform
  P: { kind: 1, domain: 5 }, // Space Platform
  F: { kind: 3, domain: 1 }, // SOF → Life Form / Land
  X: { kind: 1, domain: 1 }, // Other → fallback to Land Platform
  Z: { kind: 1, domain: 1 }, // Unknown → fallback to Land Platform
});
