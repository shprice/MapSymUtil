// mapsyblib — Bidirectional DIS ↔ MIL-STD-2525D SIDC conversion library.
// IEEE 1278.1 (DIS) entity type enumerations per SISO-REF-010.
// MIL-STD-2525D 20-character SIDC format.

export { SIDC_TREE, treeLookup } from './sidc-tree.js';

export {
  DIS_FORCE_ID,
  DIS_ENTITY_KIND,
  DIS_DOMAIN,
  SIDC_STANDARD_IDENTITY,
  SIDC_SYMBOL_SET,
  FORCE_ID_TO_SI,
  SI_TO_FORCE_ID,
} from './constants.js';

export {
  parseDisEntityType,
  disToSidc,
  disToSidcLabel,
  disToSidcComponents,
  entityToSidc,
} from './dis-to-sidc.js';

export {
  parseSidc,
  sidcToDis,
  sidcToDisTypeString,
  sidcToForceId,
} from './sidc-to-dis.js';
