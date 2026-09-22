// mapsyblib — Bidirectional DIS ↔ MIL-STD-2525 SIDC conversion library.
// Supports MIL-STD-2525D (20-char) and MIL-STD-2525C (15-char) formats.
// IEEE 1278.1 (DIS) entity type enumerations per SISO-REF-010.

export { SIDC_TREE, treeLookup } from './sidc-tree.js';

export {
  DIS_FORCE_ID,
  DIS_ENTITY_KIND,
  DIS_DOMAIN,
  SIDC_STANDARD_IDENTITY,
  SIDC_SYMBOL_SET,
  FORCE_ID_TO_SI,
  SI_TO_FORCE_ID,
  FORCE_ID_TO_SI_CHAR,
  SI_CHAR_TO_FORCE_ID,
  BD_CHAR_TO_KIND_DOMAIN,
} from './constants.js';

export {
  parseDisEntityType,
  disToSidc,
  disToSidc2525D,
  disToSidc2525C,
  disToSidcLabel,
  disToSidcComponents,
  entityToSidc,
} from './dis-to-sidc.js';

export {
  detectSidcFormat,
  parseSidc,
  parseSidc2525D,
  parseSidc2525C,
  sidcToDis,
  sidcToDisTypeString,
  sidcToForceId,
} from './sidc-to-dis.js';

export {
  CM_ENTITIES,
  CM_CATEGORY_LABELS,
  cmLabel,
  isCmSidc,
  parseCmSidc,
  cmToSidc,
  cmEntries,
} from './control-measures.js';

export {
  SS_ENTITIES,
  SS_CATEGORY_LABELS,
  EXTENDED_SS_IDS,
  ssLabel,
  isExtendedSidc,
  parseExtendedSidc,
  ssToSidc,
  ssEntries,
} from './symbol-sets.js';
