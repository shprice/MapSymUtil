// MIL-STD-2525D Symbol Set 25 (Control Measures) entity codes and labels.
// Entity codes are the 6-digit strings used in positions 10–15 of a 20-char SIDC.
// Control measures are graphical planning symbols with no DIS entity type equivalent.
// Codes and labels sourced from milsymbol 3.x (milsymbol/src/numbersidc/sidc/control-measure.js).

export const CM_ENTITIES = {
  // Command and Control Points (13xxxx)
  '130100': 'Control Point',
  '130200': 'Amnesty Point',
  '130300': 'Checkpoint',
  '130400': 'Center of Main Effort',
  '130500': 'Contact Point',
  '130600': 'Coordinating Point',
  '130700': 'Decision Point',
  '130800': 'Distress Call',
  '130900': 'Entry Control Point',
  '131001': 'Fly-To Point (Sonobuoy)',
  '131002': 'Fly-To Point (Weapon)',
  '131003': 'Fly-To Point (Normal)',
  '131100': 'Linkup Point',
  '131200': 'Passage Point',
  '131300': 'Point of Interest',
  '131301': 'Point of Interest / Launch Event',
  '131400': 'Rally Point',
  '131500': 'Release Point',
  '131600': 'Start Point',
  '131700': 'Special Point',
  '131800': 'Waypoint',
  '131900': 'Airfield',
  '132000': 'Target Handover',
  '132100': 'Key Terrain',
  '132200': 'Control Point (alternate)',
  '132300': 'Vital Ground',
  // Maneuver Points (16xxxx)
  '160100': 'Observation Post/Outpost',
  '160201': 'Reconnaissance Outpost',
  '160202': 'Forward Observer Position',
  '160203': 'CBRN Observation Outpost',
  '160204': 'Sensor Outpost/Listening Post',
  '160205': 'Combat Outpost',
  '160300': 'Target Reference Point',
  '160400': 'Point of Departure',
  // Airspace Control Points (18xxxx)
  '180000': 'Air Control Point',
  '180100': 'Air Control Point (ACP)',
  '180200': 'Communications Checkpoint',
  '180300': 'Downed Aircraft Pick-up Point',
  '180400': 'Pop-up Point',
  '180500': 'Air Control Rendezvous',
  '180600': 'TACAN',
  '180700': 'CAP Station',
  '180800': 'AEW Station',
  '180900': 'ASW Station',
  '181000': 'Strike Initial Point',
  '181100': 'Replenishment Station',
  '181200': 'Tanking',
  '181300': 'ASW Rotary Wing',
  '181400': 'SUCAP Fixed Wing',
  '181500': 'SUCAP Rotary Wing',
  '181600': 'MIW Fixed Wing',
  '181700': 'MIW Rotary Wing',
  '181800': 'Tomcat',
  '181900': 'Rescue',
  '182000': 'UAS Station',
  '182100': 'Aircraft (VTUA)',
  '182200': 'Orbit',
  '182300': 'Orbit – Figure Eight',
  '182400': 'Orbit – Race Track',
  '182500': 'Orbit – Random Closed',
  '182600': 'Isolated Personnel Location',
  // Maritime Control Areas (20xxxx)
  '200400': 'Ship Area of Interest',
  '200500': 'Active Maneuver Area',
  // Maritime Control Points (21xxxx)
  '210100': 'Plan Ship',
  '210200': 'Aim Point',
  '210300': 'Defended Asset',
  '210400': 'Drop Point',
  '210500': 'Entry Point',
  '210600': 'Air Detonation',
  '210700': 'Ground Zero',
  '210800': 'Impact Point',
  '210900': 'Predicted Impact Point',
  '211000': 'Launched Torpedo',
  '211100': 'Missile Detection Point',
  '211200': 'Acoustic Countermeasure Decoy',
  '211300': 'ECM Decoy',
  '211400': 'Brief Contact',
  '211500': 'Datum Lost Contact',
  '211600': 'BT Buoy Drop',
  '211700': 'Reported Bottomed Sub',
  '211800': 'Moving Haven',
  '211900': 'Screen Center',
  '212000': 'Lost Contact',
  '212100': 'Sinker',
  '212200': 'Trial Track',
  '212300': 'Acoustic Fix',
  '212400': 'Electromagnetic Fix',
  '212600': 'Optical Fix',
  '212700': 'Formation',
  '212800': 'Harbor',
  '212900': 'Harbor Entrance Point',
  '213000': 'Dip Position',
  '213100': 'Search',
  '213400': 'Navigational Reference Point',
  '213500': 'Sonobuoy',
  '213507': 'Sonobuoy (DIFAR)',
  '213508': 'Sonobuoy (DICASS)',
  '213510': 'Sonobuoy Expired',
  '213600': 'Reference Point',
  '213700': 'Special Point (Maritime)',
  '213900': 'Data Link Reference Point',
  '214400': 'Marshall Point',
  '214500': 'Position and Intended Movement (PIM)',
  '214700': 'Estimated Position (EP)',
  '214800': 'Waypoint (Maritime)',
  '214900': 'General Sea Subsurface Station',
  '215000': 'Submarine Sea Subsurface Station',
  '215600': 'General Sea Surface Station',
  '215700': 'ASW Sea Surface Station',
  '216100': 'Rendezvous Sea Surface Station',
  '216200': 'Replenishment at Sea Station',
  '216300': 'Rescue Sea Surface Station',
  '217000': 'Shore Control Station',
  '218000': 'Distressed Vessel',
  '218100': 'Downed Aircraft',
  '218200': 'Person in Water',
  '218300': 'Iceberg',
  '218600': 'Sea Mine-Like',
  // Fires Points/Areas (24xxxx, 25xxxx)
  '240601': 'Point/Single Target',
  '240602': 'Nuclear Target',
  '240603': 'Recorded Target',
  '240900': 'Fire Support Station',
  '250100': 'Firing Point',
  '250200': 'Hide Point',
  '250300': 'Launch Point',
  '250400': 'Reload Point',
  '250500': 'Survey Control Point',
  // Protection Points (27xxxx, 28xxxx)
  '270701': 'Minefield (Static)',
  '280100': 'Abatis',
  '280200': 'Antipersonnel Mine',
  '280201': 'Antipersonnel Mine (Directional)',
  '280300': 'Antitank Mine',
  '280400': 'Antitank Mine / Anti-handling',
  '280500': 'Wide Area Antitank Mine',
  '280600': 'Unspecified Mine',
  '280700': 'Booby Trap',
  '280800': 'Engineer Regulating Point',
  '281000': 'Shelter Above Ground',
  '281100': 'Below Ground Shelter',
  '281200': 'Fort',
  '281300': 'Chemical Event',
  '281400': 'Biological Event',
  '281500': 'Nuclear Event',
  '281600': 'Nuclear Fallout',
  '281700': 'Radiological',
  '281800': 'Decontamination Point/Site',
  '281801': 'Alternate Decon Point/Site',
  '281802': 'Equipment Decon Point/Site',
  '281803': 'Troop Decon Point/Site',
  '281809': 'Wounded Personnel Decon',
  '282001': 'Vertical Obstruction (Tower, Low)',
  '282002': 'Vertical Obstruction (Tower, High)',
  // Sustainment Points (32xxxx)
  '320100': 'Ambulance Exchange Point',
  '320200': 'Ammunition Supply Point',
  '320300': 'Ammunition Transfer and Holding Point',
  '320500': 'Casualty Collection Point',
  '320600': 'Civilian Collection Point',
  '320700': 'Detainee Collection Point',
  '320800': 'Enemy Prisoner of War Collection Point',
  '320900': 'Logistics Release Point',
  '321000': 'Maintenance Collection Point',
  '321100': 'MEDEVAC Pick-Up Point',
  '321200': 'Rearm, Refuel and Resupply Point (R3P)',
  '321300': 'Refuel on the Move (ROM) Point',
  '321400': 'Traffic Control Post',
  '321500': 'Trailer Transfer Point',
  '321600': 'Unit Maintenance Collection Point',
  '321700': 'General Supply Point',
  '321701': 'Supply Point (NATO Class I)',
  '321702': 'Supply Point (NATO Class II)',
  '321703': 'Supply Point (NATO Class III)',
  '321704': 'Supply Point (NATO Class IV)',
  '321705': 'Supply Point (NATO Class V)',
  '321800': 'Medical Supply Point',
  // Mission Tasks (34xxxx)
  '340900': 'Destroy',
  '341400': 'Interdict',
  '341600': 'Neutralize',
  '342800': 'Suppress',
};

// Human-readable category labels keyed by the leading 2 digits of the entity code.
export const CM_CATEGORY_LABELS = {
  '13': 'Command & Control Points',
  '16': 'Maneuver Points',
  '18': 'Airspace Control Points',
  '20': 'Maritime Control Areas',
  '21': 'Maritime Control Points',
  '24': 'Fires Areas',
  '25': 'Fires Points',
  '27': 'Protection Areas',
  '28': 'Protection Points',
  '32': 'Sustainment Points',
  '34': 'Mission Tasks',
};

/**
 * Return the human-readable label for a control measure entity code, or null if unknown.
 * @param {string} entityCode  6-character entity code from a ss=25 SIDC (positions 10–15).
 * @returns {string|null}
 */
export function cmLabel(entityCode) {
  return CM_ENTITIES[String(entityCode)] ?? null;
}

/**
 * Return true if the given 20-char 2525D SIDC belongs to symbol set 25 (Control Measures).
 * @param {string} sidc
 * @returns {boolean}
 */
export function isCmSidc(sidc) {
  return typeof sidc === 'string' && sidc.length === 20 && sidc.slice(4, 6) === '25';
}

/**
 * Parse a 20-char 2525D Control Measure SIDC and return metadata, or null if not ss=25.
 *
 * @param {string} sidc
 * @returns {{ symbolSet:'25', entityCode:string, label:string|null, standardIdentity:string }|null}
 */
export function parseCmSidc(sidc) {
  if (!isCmSidc(sidc)) return null;
  const entityCode      = sidc.slice(10, 16);
  const standardIdentity = sidc.slice(2, 4);
  return {
    symbolSet:        '25',
    entityCode,
    label:            cmLabel(entityCode) ?? 'Control Measure',
    standardIdentity,
  };
}

/**
 * Build a 20-char 2525D SIDC for a control measure entity code.
 *
 * @param {string} entityCode  6-character entity code (e.g. '130300').
 * @param {string} [si='01']   Standard identity 2-char string (e.g. '03' for Friend).
 * @returns {string}
 */
export function cmToSidc(entityCode, si = '01') {
  return `10${si}250000${entityCode}0000`;
}

/**
 * Return all control measure entities as an array, optionally filtered by category prefix.
 *
 * @param {string} [categoryPrefix]  Leading 2 digits of entity code, e.g. '13' for C2 Points.
 * @returns {{ entityCode:string, label:string }[]}
 */
export function cmEntries(categoryPrefix) {
  return Object.entries(CM_ENTITIES)
    .filter(([code]) => !categoryPrefix || code.startsWith(categoryPrefix))
    .map(([entityCode, label]) => ({ entityCode, label }));
}
