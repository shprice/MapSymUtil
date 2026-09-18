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
    _: { ss: '15', entity: '140100', bd: 'G', fid: 'EVU---', label: 'Land Platform', sisoName: 'Platform' },
    1: { // Land — SISO Platform-Land Category (es.type.kind.1.domain.1.cat)
      // ss:'15' = Land Equipment (individual platforms/vehicles, not unit symbols)
      // entity codes from milsymbol numbersidc/sidc/landequipment.js (ss=15)
      // fids from milsymbol lettersidc/sidc/equipment.js (2525C Ground Equipment)
      _:  { ss: '15', entity: '140100', bd: 'G', fid: 'EVU---',  label: 'Land Platform',          sisoName: 'Other' },
       0: { ss: '15', entity: '140100', bd: 'G', fid: 'EVU---',  label: 'Land Platform',          sisoName: 'Other' },
       1: { ss: '15', entity: '120200', bd: 'G', fid: 'EVAT--',  label: 'Tank',                   sisoName: 'Tank' },
       2: { ss: '15', entity: '120101', bd: 'G', fid: 'EVAI--',  label: 'AFV',                    sisoName: 'Armored Fighting Vehicle' },
       3: { ss: '15', entity: '120103', bd: 'G', fid: 'EVAA--',  label: 'APC',                    sisoName: 'Armored Utility Vehicle' },
       4: { ss: '15', entity: '110900', bd: 'G', fid: 'EWH---',  label: 'SP Artillery',           sisoName: 'Self-propelled Artillery' },
       5: { ss: '15', entity: '110900', bd: 'G', fid: 'EWH---',  label: 'Artillery',              sisoName: 'Towed Artillery' },
       6: { ss: '15', entity: '140700', bd: 'G', fid: 'EVUL--',  label: 'Light Utility',          sisoName: 'Small Wheeled Utility Vehicle' },
       7: { ss: '15', entity: '140800', bd: 'G', fid: 'EVUX--',  label: 'Heavy Utility',          sisoName: 'Large Wheeled Utility Vehicle' },
       8: { ss: '15', entity: '140700', bd: 'G', fid: 'EVUL--',  label: 'Small Tracked Utility',  sisoName: 'Small Tracked Utility Vehicle' },
       9: { ss: '15', entity: '140800', bd: 'G', fid: 'EVUX--',  label: 'Large Tracked Utility',  sisoName: 'Large Tracked Utility Vehicle' },
      10: { ss: '15', entity: '111400', bd: 'G', fid: 'EWO---',  label: 'Mortar',                 sisoName: 'Mortar' },
      11: { ss: '15', entity: '130900', bd: 'G', fid: 'EVEA--',  label: 'Mine Clearing',          sisoName: 'Mine plow' },
      12: { ss: '15', entity: '130900', bd: 'G', fid: 'EVEA--',  label: 'Mine Clearing',          sisoName: 'Mine rake' },
      13: { ss: '15', entity: '130900', bd: 'G', fid: 'EVEA--',  label: 'Mine Clearing',          sisoName: 'Mine roller' },
      14: { ss: '15', entity: '140600', bd: 'G', fid: 'EVUS--',  label: 'Cargo',                  sisoName: 'Cargo trailer' },
      15: { ss: '15', entity: '140900', bd: 'G', fid: 'EVUS--',  label: 'Fuel',                   sisoName: 'Fuel trailer' },
      16: { ss: '15', entity: '200700', bd: 'G', fid: 'EVU---',  label: 'Generator',              sisoName: 'Generator trailer' },
      17: { ss: '15', entity: '141000', bd: 'G', fid: 'EVU---',  label: 'Water',                  sisoName: 'Water trailer' },
      18: { ss: '15', entity: '130800', bd: 'G', fid: 'EVEE--',  label: 'Engineer Equip',         sisoName: 'Engineer equipment' },
      19: { ss: '15', entity: '140600', bd: 'G', fid: 'EVUS--',  label: 'HET',                    sisoName: 'Heavy equipment transport trailer' },
      20: { ss: '15', entity: '141200', bd: 'G', fid: 'EVUT--',  label: 'Recovery/Maint',         sisoName: 'Maintenance equipment trailer' },
      21: { ss: '15', entity: '140600', bd: 'G', fid: 'EVUS--',  label: 'Limber',                 sisoName: 'Limber' },
      22: { ss: '15', entity: '200400', bd: 'G', fid: 'EXN---',  label: 'CBRN',                   sisoName: 'Chemical decontamination trailer' },
      23: { ss: '15', entity: '220300', bd: 'G', fid: 'ESR---',  label: 'Warning/Radar',          sisoName: 'Warning System' },
      24: { ss: '15', entity: '150100', bd: 'G', fid: 'EVT---',  label: 'Train Engine',           sisoName: 'Train - Engine' },
      25: { ss: '15', entity: '150200', bd: 'G', fid: 'EVU---',  label: 'Railcar',                sisoName: 'Train - Car' },
      26: { ss: '15', entity: '150200', bd: 'G', fid: 'EVU---',  label: 'Caboose',                sisoName: 'Train - Caboose' },
      27: { ss: '15', entity: '160100', bd: 'G', fid: 'EVC---',  label: 'Civilian Vehicle',       sisoName: 'Civilian Vehicle' },
      28: { ss: '15', entity: '111100', bd: 'G', fid: 'EWMA--',  label: 'SAM',                    sisoName: 'Air Defense / Missile Defense Unit Equipment' },
      29: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'C3I',                    sisoName: 'C3I System' },
      30: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Operations',             sisoName: 'Operations Facility' },
      31: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Intelligence',           sisoName: 'Intelligence Facility' },
      32: { ss: '15', entity: '220100', bd: 'G', fid: 'ES----',  label: 'Surveillance',           sisoName: 'Surveillance Facility' },
      33: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Comms',                  sisoName: 'Communications Facility' },
      34: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Command',                sisoName: 'Command Facility' },
      35: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'C4I',                    sisoName: 'C4I Facility' },
      36: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Control',                sisoName: 'Control Facility' },
      37: { ss: '15', entity: '220300', bd: 'G', fid: 'ESR---',  label: 'Fire Control',           sisoName: 'Fire Control Facility' },
      38: { ss: '15', entity: '111100', bd: 'G', fid: 'EWMA--',  label: 'Missile Defense',        sisoName: 'Missile Defense Facility' },
      39: { ss: '15', entity: '200500', bd: 'G', fid: 'EVU---',  label: 'Command Post',           sisoName: 'Field Command Post' },
      40: { ss: '15', entity: '220100', bd: 'G', fid: 'ES----',  label: 'Observation Post',       sisoName: 'Observation Post' },
    },
    2: { // Air — SISO Platform-Air Category (es.type.kind.1.domain.2.cat)
      // ss:'01' = Air; entity codes from milsymbol numbersidc/sidc/air.js (ss=01)
      // fids from milsymbol lettersidc/sidc/air.js (2525C Air)
      _:  { ss: '01', entity: '110100', bd: 'A', fid: 'MF----',  label: 'Fixed Wing',             sisoName: 'Other' },
       0: { ss: '01', entity: '110100', bd: 'A', fid: 'MF----',  label: 'Fixed Wing',             sisoName: 'Other' },
       1: { ss: '01', entity: '110104', bd: 'A', fid: 'MFF---',  label: 'Fighter',                sisoName: 'Fighter/Air Defense' },
       2: { ss: '01', entity: '110102', bd: 'A', fid: 'MFA---',  label: 'Attack / Strike',        sisoName: 'Attack/Strike' },
       3: { ss: '01', entity: '110103', bd: 'A', fid: 'MFB---',  label: 'Bomber',                 sisoName: 'Bomber' },
       4: { ss: '01', entity: '110107', bd: 'A', fid: 'MFC---',  label: 'Cargo',                  sisoName: 'Cargo/Tanker' },
       5: { ss: '01', entity: '110110', bd: 'A', fid: 'MFP---',  label: 'Maritime Patrol',        sisoName: 'ASW/Patrol/Observation' },
       6: { ss: '01', entity: '110108', bd: 'A', fid: 'MFJ---',  label: 'Electronic Warfare',     sisoName: 'Electronic Warfare (EW)' },
       7: { ss: '01', entity: '110111', bd: 'A', fid: 'MFR---',  label: 'Reconnaissance',         sisoName: 'Reconnaissance' },
       8: { ss: '01', entity: '110116', bd: 'A', fid: 'MFRW--',  label: 'AEW',                    sisoName: 'Surveillance/C2 (Airborne Early Warning)' },
      20: { ss: '01', entity: '110200', bd: 'A', fid: 'MHA---',  label: 'Helicopter (Attack)',    sisoName: 'Attack Helicopter' },
      21: { ss: '01', entity: '110200', bd: 'A', fid: 'MH----',  label: 'Helicopter (Utility)',   sisoName: 'Utility Helicopter' },
      22: { ss: '01', entity: '110200', bd: 'A', fid: 'MH----',  label: 'Helicopter (ASW)',       sisoName: 'Antisubmarine Warfare/Patrol Helicopter' },
      23: { ss: '01', entity: '110200', bd: 'A', fid: 'MH----',  label: 'Helicopter (Cargo)',     sisoName: 'Cargo Helicopter' },
      24: { ss: '01', entity: '110200', bd: 'A', fid: 'MH----',  label: 'Helicopter (Obs)',       sisoName: 'Observation Helicopter' },
      25: { ss: '01', entity: '110200', bd: 'A', fid: 'MH----',  label: 'Helicopter (SOF)',       sisoName: 'Special Operations Helicopter' },
      40: { ss: '01', entity: '110112', bd: 'A', fid: 'MFT---',  label: 'Trainer',                sisoName: 'Trainer' },
      50: { ss: '01', entity: '110300', bd: 'A', fid: 'MFQ---',  label: 'UAV',                    sisoName: 'Unmanned' },
    },
    3: { // Surface — SISO Platform-Surface Category (es.type.kind.1.domain.3.cat)
      // 2525D entity codes and 2525C fids per MIL-STD-2525D Annex B / milsymbol lettersidc/sea.js
      _:  { ss: '30', entity: '120000', bd: 'S', fid: 'C-----',  label: 'Warship',               sisoName: 'Other' },
       0: { ss: '30', entity: '120000', bd: 'S', fid: 'C-----',  label: 'Warship',               sisoName: 'Other' },
       1: { ss: '30', entity: '120100', bd: 'S', fid: 'CLCV--',  label: 'Carrier',               sisoName: 'Carrier' },
       2: { ss: '30', entity: '120202', bd: 'S', fid: 'CLCC--',  label: 'Cruiser',               sisoName: 'Command Ship/Cruiser' },
       3: { ss: '30', entity: '120202', bd: 'S', fid: 'CLCC--',  label: 'Cruiser',               sisoName: 'Guided Missile Cruiser' },
       4: { ss: '30', entity: '120203', bd: 'S', fid: 'CLDD--',  label: 'Destroyer',             sisoName: 'Guided Missile Destroyer (DDG)' },
       5: { ss: '30', entity: '120203', bd: 'S', fid: 'CLDD--',  label: 'Destroyer',             sisoName: 'Destroyer (DD)' },
       6: { ss: '30', entity: '120204', bd: 'S', fid: 'CLFF--',  label: 'Frigate',               sisoName: 'Guided Missile Frigate (FFG)' },
       7: { ss: '30', entity: '120500', bd: 'S', fid: 'CPSB--',  label: 'Patrol Craft',          sisoName: 'Light/Patrol Craft' },
       8: { ss: '30', entity: '120405', bd: 'S', fid: 'CMMA--',  label: 'MCM Vessel',            sisoName: 'Mine Countermeasure Ship/Craft' },
       9: { ss: '30', entity: '120306', bd: 'S', fid: 'CA----',  label: 'Landing Ship (Dock)',   sisoName: 'Dock Landing Ship' },
      10: { ss: '30', entity: '120307', bd: 'S', fid: 'CALST-',  label: 'Landing Ship (Tank)',   sisoName: 'Tank Landing Ship' },
      11: { ss: '30', entity: '120308', bd: 'S', fid: 'CALC--',  label: 'Landing Craft',         sisoName: 'Landing Craft' },
      12: { ss: '30', entity: '120100', bd: 'S', fid: 'CLCV--',  label: 'Light Carrier',         sisoName: 'Light carrier' },
      13: { ss: '30', entity: '120202', bd: 'S', fid: 'CLCC--',  label: 'Cruiser',               sisoName: 'Cruiser/Helicopter Carrier' },
      14: { ss: '30', entity: '120500', bd: 'S', fid: 'CPSB--',  label: 'Patrol Craft',          sisoName: 'Hydrofoil' },
      15: { ss: '30', entity: '120500', bd: 'S', fid: 'CH----',  label: 'Hovercraft',            sisoName: 'Air Cushion/Surface Effect' },
      16: { ss: '30', entity: '130100', bd: 'S', fid: 'NR----',  label: 'Auxiliary',             sisoName: 'Auxiliary' },
      17: { ss: '30', entity: '130100', bd: 'S', fid: 'NR----',  label: 'Auxiliary',             sisoName: 'Auxiliary, Merchant Marine' },
      18: { ss: '30', entity: '130200', bd: 'S', fid: 'NS----',  label: 'Service Craft',         sisoName: 'Utility' },
      19: { ss: '30', entity: '120700', bd: 'S', fid: 'CU----',  label: 'USV',                   sisoName: 'Unmanned Surface Vehicle (USV)' },
      20: { ss: '30', entity: '120206', bd: 'S', fid: 'CLLL--',  label: 'Littoral Combat',       sisoName: 'Littoral Combat Ships (LCS)' },
      21: { ss: '30', entity: '130104', bd: 'S', fid: 'NI----',  label: 'Surveillance Ship',     sisoName: 'Surveillance Ship' },
      50: { ss: '30', entity: '120204', bd: 'S', fid: 'CLFF--',  label: 'Frigate',               sisoName: 'Frigate (including Corvette)' },
      51: { ss: '30', entity: '120201', bd: 'S', fid: 'CLBB--',  label: 'Battleship',            sisoName: 'Battleship' },
      52: { ss: '30', entity: '120202', bd: 'S', fid: 'CLCC--',  label: 'Cruiser',               sisoName: 'Heavy Cruiser' },
      53: { ss: '30', entity: '130100', bd: 'S', fid: 'NR----',  label: 'Auxiliary',             sisoName: 'Destroyer Tender' },
      54: { ss: '30', entity: '120302', bd: 'S', fid: 'CA----',  label: 'Amphibious Assault',    sisoName: 'Amphibious Assault Ship' },
      55: { ss: '30', entity: '120300', bd: 'S', fid: 'CA----',  label: 'Amphibious Cargo',      sisoName: 'Amphibious Cargo Ship' },
      56: { ss: '30', entity: '120306', bd: 'S', fid: 'CA----',  label: 'Amphibious Transport',  sisoName: 'Amphibious Transport Dock' },
      57: { ss: '30', entity: '130101', bd: 'S', fid: 'NRA---',  label: 'Ammo Ship',             sisoName: 'Ammunition Ship' },
      58: { ss: '30', entity: '130102', bd: 'S', fid: 'NR----',  label: 'Stores Ship',           sisoName: 'Combat Stores Ship' },
      59: { ss: '30', entity: '130106', bd: 'S', fid: 'NI----',  label: 'Surveillance',          sisoName: 'Surveillance Towed Array Sonar System' },
      60: { ss: '30', entity: '130109', bd: 'S', fid: 'NR----',  label: 'Combat Support',        sisoName: 'Fast Combat Support Ship' },
      61: { ss: '30', entity: '130000', bd: 'S', fid: 'N-----',  label: 'Non-Combatant',         sisoName: 'Non-Combatant Ship' },
      62: { ss: '30', entity: '140300', bd: 'S', fid: 'XL----',  label: 'Law Enforcement',       sisoName: 'Coast Guard Cutters' },
      63: { ss: '30', entity: '140300', bd: 'S', fid: 'XL----',  label: 'Law Enforcement',       sisoName: 'Coast Guard Boats' },
      64: { ss: '30', entity: '120800', bd: 'S', fid: 'CPSB--',  label: 'Fast Attack Craft',     sisoName: 'Fast Attack Craft' },
      80: { ss: '30', entity: '140110', bd: 'S', fid: 'XMP---',  label: 'Passenger Vessel',      sisoName: 'Passenger Vessel (Group 1 Merchant)' },
      81: { ss: '30', entity: '140101', bd: 'S', fid: 'XMC---',  label: 'Dry Cargo Ship',        sisoName: 'Dry Cargo Ship (Group 2 Merchant)' },
      82: { ss: '30', entity: '140109', bd: 'S', fid: 'XMO---',  label: 'Tanker',                sisoName: 'Tanker (Group 3 Merchant)' },
      83: { ss: '30', entity: '140111', bd: 'S', fid: 'NF----',  label: 'Support Vessel',        sisoName: 'Support Vessel' },
      84: { ss: '30', entity: '140500', bd: 'S', fid: 'XA----',  label: 'Motorboat',             sisoName: 'Private Motorboat' },
      85: { ss: '30', entity: '140400', bd: 'S', fid: 'XR----',  label: 'Sailboat',              sisoName: 'Private Sailboat' },
      86: { ss: '30', entity: '140200', bd: 'S', fid: 'XF----',  label: 'Fishing Vessel',        sisoName: 'Fishing Vessel' },
      87: { ss: '30', entity: '140100', bd: 'S', fid: 'XM----',  label: 'Other Vessel',          sisoName: 'Other Vessels' },
     100: { ss: '30', entity: '130000', bd: 'S', fid: 'N-----',  label: 'SAR Vessel',            sisoName: 'Search and Rescue Vessels' },
     101: { ss: '30', entity: '140000', bd: 'S', fid: 'XM----',  label: 'Life-Saving Equip',     sisoName: 'Life-Saving Equipment' },
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
  9: { _: { ss: '15', entity: '220100', bd: 'G', fid: 'ES----',  label: 'Sensor/Emitter',       sisoName: 'Sensor/Emitter' } },
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
