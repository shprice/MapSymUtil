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

// MIL-STD-2525D Standard Identity codes (characters 3–4 of the 20-char SIDC)
export const SIDC_STANDARD_IDENTITY = Object.freeze({
  '00': 'Pending',
  '01': 'Unknown',
  '02': 'AssumedFriend',
  '03': 'Friend',
  '04': 'Neutral',
  '05': 'Suspect',
  '06': 'Hostile',
});

// MIL-STD-2525D Symbol Sets (characters 5–6 of the 20-char SIDC)
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
  '27': 'Atmospheric',
  '28': 'Oceanographic',
  '29': 'MeteorologicalSpace',
  '30': 'SeaSurface',
  '35': 'SeaSubsurface',
  '36': 'SeaSubsurfaceMissile',
  '40': 'MineWarfare',
});

// DIS Force ID → MIL-STD-2525D Standard Identity (2-char string)
// Index 0=Other/Unknown, 1=Friendly, 2=Opposing/Hostile, 3=Neutral
export const FORCE_ID_TO_SI = Object.freeze(['01', '03', '06', '04']);

// MIL-STD-2525D Standard Identity → DIS Force ID
export const SI_TO_FORCE_ID = Object.freeze({
  '00': 0, // Pending → Other
  '01': 0, // Unknown → Other
  '02': 1, // AssumedFriend → Friendly
  '03': 1, // Friend → Friendly
  '04': 3, // Neutral → Neutral
  '05': 2, // Suspect → Opposing
  '06': 2, // Hostile → Opposing
});
