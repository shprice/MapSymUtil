// DIS entity type → MIL-STD-2525 SIDC lookup tree.
// Each entry carries codes for BOTH output formats:
//   ss     / entity  — MIL-STD-2525D 20-char Symbol Set + Entity code
//   bd     / fid     — MIL-STD-2525C 15-char Battle Dimension + Function ID (6 chars)
//   label            — human-readable symbol category name
//   sisoName         — official SISO-REF-010 category name (sourced from siso-std-010.xml)
//
// Structure: kind → domain → category → entry
// Each level may carry a '_' fallback used when the category key is absent.
// Country (parts[2]) is intentionally not used — affiliation is expressed via
// Standard Identity derived from forceId instead.
//
// 2525D symbol set codes:
//   '01'=Air  '02'=AirMissile  '05'=Space  '06'=SpaceMissile
//   '10'=LandUnit  '15'=LandEquipment  '30'=SeaSurface  '35'=SeaSubsurface
//
// 2525C battle dimension codes: A=Air  G=Ground  S=SeaSurface  U=Subsurface  P=Space
// 2525C function IDs are 6-char codes padded with '-' (per MIL-STD-2525C Appendix B).

export const SIDC_TREE = {
  1: { // Platform
    _: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---', label: 'Combat', sisoName: 'Platform' },
    1: { // Land — SISO Platform-Land Category (es.type.kind.1.domain.1.cat)
      _:  { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',                 sisoName: 'Other' },
       0: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',                 sisoName: 'Other' },
       1: { ss: '10', entity: '120500', bd: 'G', fid: 'UCAC--',  label: 'Armor',                  sisoName: 'Tank' },
       2: { ss: '10', entity: '121100', bd: 'G', fid: 'UCIZ--',  label: 'Infantry (Mech)',        sisoName: 'Armored Fighting Vehicle' },
       3: { ss: '10', entity: '121100', bd: 'G', fid: 'UCIZ--',  label: 'Infantry (Mech)',        sisoName: 'Armored Utility Vehicle' },
       4: { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',              sisoName: 'Self-propelled Artillery' },
       5: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',                 sisoName: 'Towed Artillery' },
       6: { ss: '10', entity: '121300', bd: 'G', fid: 'UCIS--',  label: 'Reconnaissance',         sisoName: 'Small Wheeled Utility Vehicle' },
       7: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',                 sisoName: 'Large Wheeled Utility Vehicle' },
       8: { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',              sisoName: 'Small Tracked Utility Vehicle' },
       9: { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',              sisoName: 'Large Tracked Utility Vehicle' },
      10: { ss: '10', entity: '130800', bd: 'G', fid: 'UCFCM-',  label: 'Mortar',                 sisoName: 'Mortar' },
      11: { ss: '10', entity: '140700', bd: 'G', fid: 'UCDE--',  label: 'Engineer',               sisoName: 'Mine plow' },
      12: { ss: '10', entity: '140700', bd: 'G', fid: 'UCDE--',  label: 'Engineer',               sisoName: 'Mine rake' },
      13: { ss: '10', entity: '140700', bd: 'G', fid: 'UCDE--',  label: 'Engineer',               sisoName: 'Mine roller' },
      14: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Cargo trailer' },
      15: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Fuel trailer' },
      16: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Generator trailer' },
      17: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Water trailer' },
      18: { ss: '10', entity: '140700', bd: 'G', fid: 'UCDE--',  label: 'Engineer',               sisoName: 'Engineer equipment' },
      19: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Heavy equipment transport trailer' },
      20: { ss: '10', entity: '161100', bd: 'G', fid: 'USSX--',  label: 'Maintenance',            sisoName: 'Maintenance equipment trailer' },
      21: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Limber' },
      22: { ss: '10', entity: '140100', bd: 'G', fid: 'UCDN--',  label: 'CBRN',                   sisoName: 'Chemical decontamination trailer' },
      23: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',                 sisoName: 'Warning System' },
      24: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Train - Engine' },
      25: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Train - Car' },
      26: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Train - Caboose' },
      27: { ss: '10', entity: '160600', bd: 'G', fid: 'USS---',  label: 'CSS',                    sisoName: 'Civilian Vehicle' },
      28: { ss: '10', entity: '130100', bd: 'G', fid: 'UCAA--',  label: 'Air Defence',            sisoName: 'Air Defense / Missile Defense Unit Equipment' },
      29: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'C3I System' },
      30: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Operations Facility' },
      31: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Intelligence Facility' },
      32: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Surveillance Facility' },
      33: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Communications Facility' },
      34: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Command Facility' },
      35: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'C4I Facility' },
      36: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Control Facility' },
      37: { ss: '10', entity: '130300', bd: 'G', fid: 'UCFA--',  label: 'Field Artillery',        sisoName: 'Fire Control Facility' },
      38: { ss: '10', entity: '130100', bd: 'G', fid: 'UCAA--',  label: 'Air Defence',            sisoName: 'Missile Defense Facility' },
      39: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',         sisoName: 'Field Command Post' },
      40: { ss: '10', entity: '121300', bd: 'G', fid: 'UCIS--',  label: 'Reconnaissance',         sisoName: 'Observation Post' },
    },
    2: { // Air — SISO Platform-Air Category (es.type.kind.1.domain.2.cat)
      _:  { ss: '01', entity: '110100', bd: 'A', fid: 'MFF---',  label: 'Fixed Wing',             sisoName: 'Other' },
       0: { ss: '01', entity: '110100', bd: 'A', fid: 'MFF---',  label: 'Fixed Wing',             sisoName: 'Other' },
       1: { ss: '01', entity: '110104', bd: 'A', fid: 'MFFF--',  label: 'Fighter',                sisoName: 'Fighter/Air Defense' },
       2: { ss: '01', entity: '110102', bd: 'A', fid: 'MFFS--',  label: 'Attack / Strike',        sisoName: 'Attack/Strike' },
       3: { ss: '01', entity: '110103', bd: 'A', fid: 'MFFB--',  label: 'Bomber',                 sisoName: 'Bomber' },
       4: { ss: '01', entity: '110107', bd: 'A', fid: 'MFFT--',  label: 'Cargo / Tanker',         sisoName: 'Cargo/Tanker' },
       5: { ss: '01', entity: '110110', bd: 'A', fid: 'MFFM--',  label: 'Maritime Patrol',        sisoName: 'ASW/Patrol/Observation' },
       6: { ss: '01', entity: '110108', bd: 'A', fid: 'MFFE--',  label: 'Electronic Warfare',     sisoName: 'Electronic Warfare (EW)' },
       7: { ss: '01', entity: '110111', bd: 'A', fid: 'MFFR--',  label: 'Reconnaissance',         sisoName: 'Reconnaissance' },
       8: { ss: '01', entity: '110116', bd: 'A', fid: 'MFFA--',  label: 'AEW',                    sisoName: 'Surveillance/C2 (Airborne Early Warning)' },
      20: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (Attack)',    sisoName: 'Attack Helicopter' },
      21: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (Utility)',   sisoName: 'Utility Helicopter' },
      22: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (ASW)',       sisoName: 'Antisubmarine Warfare/Patrol Helicopter' },
      23: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (Cargo)',     sisoName: 'Cargo Helicopter' },
      24: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (Obs)',       sisoName: 'Observation Helicopter' },
      25: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter (SOF)',       sisoName: 'Special Operations Helicopter' },
      40: { ss: '01', entity: '110100', bd: 'A', fid: 'MFF---',  label: 'Trainer',               sisoName: 'Trainer' },
      50: { ss: '01', entity: '110300', bd: 'A', fid: 'MUAV--',  label: 'UAV',                    sisoName: 'Unmanned' },
    },
    3: { // Surface — SISO Platform-Surface Category (es.type.kind.1.domain.3.cat)
      _:  { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Warship',                sisoName: 'Other' },
       0: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Warship',                sisoName: 'Other' },
       1: { ss: '30', entity: '120100', bd: 'S', fid: 'CSSC--',  label: 'Carrier',                sisoName: 'Carrier' },
       2: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSR--',  label: 'Command Ship',           sisoName: 'Command Ship/Cruiser' },
       3: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSR--',  label: 'Cruiser',                sisoName: 'Guided Missile Cruiser' },
       4: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSD--',  label: 'Destroyer',              sisoName: 'Guided Missile Destroyer (DDG)' },
       5: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSD--',  label: 'Destroyer',              sisoName: 'Destroyer (DD)' },
       6: { ss: '30', entity: '120204', bd: 'S', fid: 'CSSFF-',  label: 'Frigate',                sisoName: 'Guided Missile Frigate (FFG)' },
       7: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSPB-',  label: 'Patrol Craft',           sisoName: 'Light/Patrol Craft' },
       8: { ss: '30', entity: '120402', bd: 'S', fid: 'CSMM--',  label: 'Minesweeper',            sisoName: 'Mine Countermeasure Ship/Craft' },
       9: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Amphibious Ship',        sisoName: 'Dock Landing Ship' },
      10: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Landing Ship',           sisoName: 'Tank Landing Ship' },
      11: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSPB-',  label: 'Landing Craft',          sisoName: 'Landing Craft' },
      14: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSPB-',  label: 'Patrol Craft',           sisoName: 'Hydrofoil' },
      16: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Auxiliary' },
      17: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Auxiliary, Merchant Marine' },
      50: { ss: '30', entity: '120204', bd: 'S', fid: 'CSSFF-',  label: 'Frigate',                sisoName: 'Frigate (including Corvette)' },
      51: { ss: '30', entity: '120201', bd: 'S', fid: 'CSSB--',  label: 'Battleship',             sisoName: 'Battleship' },
      52: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSR--',  label: 'Cruiser',                sisoName: 'Heavy Cruiser' },
      53: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Destroyer Tender' },
      54: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Amphibious Assault',     sisoName: 'Amphibious Assault Ship' },
      55: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Amphibious Cargo',       sisoName: 'Amphibious Cargo Ship' },
      56: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Amphibious Transport',   sisoName: 'Amphibious Transport Dock' },
      57: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Ammunition Ship' },
      58: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Combat Stores Ship' },
      59: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSF--',  label: 'Surveillance',           sisoName: 'Surveillance Towed Array Sonar System' },
      60: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Auxiliary',              sisoName: 'Fast Combat Support Ship' },
      61: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Non-Combatant',          sisoName: 'Non-Combatant Ship' },
      62: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSPB-',  label: 'Coast Guard',            sisoName: 'Coast Guard Cutters' },
      63: { ss: '30', entity: '120500', bd: 'S', fid: 'CSSPB-',  label: 'Coast Guard',            sisoName: 'Coast Guard Boats' },
    },
    4: { // Subsurface
      _:  { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine',              sisoName: 'Other' },
       0: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine',              sisoName: 'Other' },
       1: { ss: '35', entity: '110100', bd: 'U', fid: 'SSMB--',  label: 'Submarine (SSBN)',       sisoName: 'SSBN (Nuclear Ballistic Missile)' },
       2: { ss: '35', entity: '110100', bd: 'U', fid: 'SSMB--',  label: 'Submarine (SSGN)',       sisoName: 'SSGN (Nuclear Guided Missile)' },
       3: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine (SSN)',        sisoName: 'SSN (Nuclear Attack)' },
       4: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine (SSG)',        sisoName: 'SSG (Guided Missile)' },
       5: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine (SS)',         sisoName: 'SS (Conventional Attack)' },
       6: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine (SSAN)',       sisoName: 'SSAN (Nuclear Auxiliary)' },
       7: { ss: '35', entity: '110100', bd: 'U', fid: 'SSM---',  label: 'Submarine (SSA)',        sisoName: 'SSA (Auxiliary)' },
    },
    5: { // Space
      _:  { ss: '05', entity: '110700', bd: 'P', fid: 'MSSS--',  label: 'Satellite',              sisoName: 'Other' },
       0: { ss: '05', entity: '110700', bd: 'P', fid: 'MSSS--',  label: 'Satellite',              sisoName: 'Other' },
       1: { ss: '05', entity: '110500', bd: 'P', fid: 'MSS---',  label: 'Space Vehicle',          sisoName: 'Space Vehicle' },
       2: { ss: '05', entity: '110700', bd: 'P', fid: 'MSSS--',  label: 'Satellite',              sisoName: 'Satellite' },
       3: { ss: '05', entity: '110700', bd: 'P', fid: 'MSSS--',  label: 'Space Launch',           sisoName: 'Space Launch Vehicle' },
    },
  },
  2: { // Munition
    _:  { ss: '02', entity: '110000', bd: 'A', fid: 'WMA---',  label: 'Munition',               sisoName: 'Munition' },
    1: { _: { ss: '15', entity: '110000', bd: 'G', fid: 'WWE---',  label: 'Munition (Land)',    sisoName: 'Land Munition' } },
    2: { _: { ss: '02', entity: '110000', bd: 'A', fid: 'WMA---',  label: 'Munition (Air)',     sisoName: 'Air Munition' } },
    3: { _: { ss: '30', entity: '110000', bd: 'S', fid: 'WMS---',  label: 'Munition (Sea)',     sisoName: 'Sea Surface Munition' } },
    4: { _: { ss: '35', entity: '110000', bd: 'U', fid: 'WMU---',  label: 'Munition (Sub)',     sisoName: 'Subsurface Munition' } },
    5: { _: { ss: '06', entity: '110000', bd: 'P', fid: 'WMP---',  label: 'Munition (Space)',   sisoName: 'Space Munition' } },
  },
  3: { // Life Form
    _:  { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',               sisoName: 'Life Form' },
    1: { // Land
      _:  { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',             sisoName: 'Other' },
       0: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',               sisoName: 'Other' },
       1: { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',             sisoName: 'Dismounted' },
       2: { ss: '10', entity: '121100', bd: 'G', fid: 'UCI---',  label: 'Infantry',             sisoName: 'Epaulet' },
    },
    2: { // Air
      _:  { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter',           sisoName: 'Other' },
       1: { ss: '01', entity: '110200', bd: 'A', fid: 'MFH---',  label: 'Helicopter',           sisoName: 'Parachutist' },
    },
    3: { _: { ss: '30', entity: '120203', bd: 'S', fid: 'CSSF--',  label: 'Warship',            sisoName: 'Other' } },
  },
  4: { _: { ss: '10', entity: '120900', bd: 'G', fid: 'UCC---',  label: 'Combat',               sisoName: 'Environmental' } },
  8: { _: { ss: '01', entity: '110100', bd: 'A', fid: 'MFF---',  label: 'Fixed Wing',           sisoName: 'Expendable' } },
  9: { _: { ss: '10', entity: '140200', bd: 'G', fid: 'UCCS--',  label: 'Combat Support',       sisoName: 'Sensor/Emitter' } },
};

// Resolve an entry from the tree with cascading fallbacks.
// Returns { ss, entity, bd, fid, label, sisoName } or null.
export function treeLookup(kind, domain, category) {
  const kindNode = SIDC_TREE[kind];
  if (!kindNode) return null;
  const domainNode = kindNode[domain];
  if (!domainNode) return kindNode._ ?? null;
  return domainNode[category] ?? domainNode._ ?? kindNode._ ?? null;
}

// Build the reverse index: "ss:entity" → [{ kind, domain, category, label, sisoName }, ...]
// Also indexes "bd:fid" for 2525C reverse lookups.
function buildReverseIndex() {
  const byD   = new Map(); // key="ss:entity" → 2525D entries
  const byC   = new Map(); // key="bd:fid"    → 2525C entries

  function add(kind, domain, category, entry) {
    const dKey = `${entry.ss}:${entry.entity}`;
    const cKey = `${entry.bd}:${entry.fid}`;
    const rec  = { kind, domain, category, label: entry.label, sisoName: entry.sisoName };

    if (!byD.has(dKey)) byD.set(dKey, []);
    byD.get(dKey).push(rec);

    if (!byC.has(cKey)) byC.set(cKey, []);
    byC.get(cKey).push(rec);
  }

  for (const [kindStr, kindNode] of Object.entries(SIDC_TREE)) {
    const kind = Number(kindStr);
    for (const [domainStr, domainNode] of Object.entries(kindNode)) {
      if (domainStr === '_') {
        add(kind, -1, -1, kindNode._);
        continue;
      }
      const domain = Number(domainStr);
      for (const [catStr, entry] of Object.entries(domainNode)) {
        const category = catStr === '_' ? -1 : Number(catStr);
        add(kind, domain, category, entry);
      }
    }
  }

  return { byD, byC };
}

export const REVERSE_INDEX = buildReverseIndex();
