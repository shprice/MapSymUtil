// DIS entity type → MIL-STD-2525 SIDC conversion.
// Supports both MIL-STD-2525D (20-char) and MIL-STD-2525C (15-char) output.
// Mapping derived from SISO-REF-010 entity type enumerations.

import { FORCE_ID_TO_SI, FORCE_ID_TO_SI_CHAR } from './constants.js';
import { treeLookup } from './sidc-tree.js';

/**
 * Parse a DIS entity type string or object into its 7 component fields.
 *
 * Accepts:
 *   - Dot/dash-separated string: "1.1.225.1.1.1.0"
 *     (kind.domain.country.category.subcategory.specific.extra)
 *   - Object: { kind, domain, country, category, subcategory, specific, extra }
 *
 * @param {string|object} entityType
 * @returns {{ kind, domain, country, category, subcategory, specific, extra }}
 */
export function parseDisEntityType(entityType) {
  if (typeof entityType === 'string') {
    const parts = entityType.split(/[.\-]/);
    return {
      kind:        +(parts[0] ?? 0),
      domain:      +(parts[1] ?? 0),
      country:     +(parts[2] ?? 0),
      category:    +(parts[3] ?? 0),
      subcategory: +(parts[4] ?? 0),
      specific:    +(parts[5] ?? 0),
      extra:       +(parts[6] ?? 0),
    };
  }
  return {
    kind:        +(entityType.kind        ?? 0),
    domain:      +(entityType.domain      ?? 0),
    country:     +(entityType.country     ?? 0),
    category:    +(entityType.category    ?? 0),
    subcategory: +(entityType.subcategory ?? 0),
    specific:    +(entityType.specific    ?? 0),
    extra:       +(entityType.extra       ?? 0),
  };
}

/**
 * Convert a DIS entity type to a SIDC string.
 *
 * @param {string|object} entityType  DIS entity type (string or object).
 * @param {number} [forceId=0]        DIS Force ID: 0=Other/Unknown, 1=Friendly, 2=Opposing, 3=Neutral.
 * @param {'2525D'|'2525C'} [format='2525D']  Output SIDC format.
 * @returns {string|null} SIDC string (20-char for 2525D, 15-char for 2525C), or null if no mapping.
 */
export function disToSidc(entityType, forceId = 0, format = '2525D') {
  return format === '2525C'
    ? disToSidc2525C(entityType, forceId)
    : disToSidc2525D(entityType, forceId);
}

/**
 * Generate a MIL-STD-2525D 20-character SIDC.
 *
 * Format: Version(2) + SI(2) + SymSet(2) + Status(1) + HQ(1) + Amp(2) + Entity(6) + Type(2) + Subtype(2)
 *
 * @param {string|object} entityType
 * @param {number} [forceId=0]
 * @returns {string|null}
 */
export function disToSidc2525D(entityType, forceId = 0) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  const entry = treeLookup(kind, domain, category);
  if (!entry) return null;
  const si = FORCE_ID_TO_SI[forceId] ?? '01';
  return `10${si}${entry.ss}0000${entry.entity}0000`;
}

/**
 * Generate a MIL-STD-2525C 15-character SIDC.
 *
 * Format: Scheme(1) + SI(1) + BD(1) + Status(1) + FunctionID(6) + Mod1(1) + Mod2(1) + Country(2) + OOB(1)
 *
 * @param {string|object} entityType
 * @param {number} [forceId=0]
 * @returns {string|null}
 */
export function disToSidc2525C(entityType, forceId = 0) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  const entry = treeLookup(kind, domain, category);
  if (!entry) return null;
  const si  = FORCE_ID_TO_SI_CHAR[forceId] ?? 'U';
  // S=Warfighting, Present (P), 5 trailing dashes (mod1+mod2+country+OOB)
  return `S${si}${entry.bd}P${entry.fid}-----`;
}

/**
 * Look up the human-readable label for a DIS entity type.
 *
 * @param {string|object} entityType
 * @returns {string|null}
 */
export function disToSidcLabel(entityType) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  return treeLookup(kind, domain, category)?.label ?? null;
}

/**
 * Return the full mapping components for a DIS entity type without building the SIDC string.
 *
 * @param {string|object} entityType
 * @returns {{ symbolSet, entityCode, battleDimension, functionId, label, sisoName }|null}
 */
export function disToSidcComponents(entityType) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  const entry = treeLookup(kind, domain, category);
  if (!entry) return null;
  return {
    symbolSet:       entry.ss,
    entityCode:      entry.entity,
    battleDimension: entry.bd,
    functionId:      entry.fid,
    label:           entry.label,
    sisoName:        entry.sisoName,
  };
}

/**
 * Convert a DIS entity object (as decoded from a PDU) to a SIDC string.
 *
 * Accepts an entity with either:
 *   - `type`: dot-separated type string, or
 *   - individual `kind`/`domain`/`category` fields
 * Plus `forceId`.
 *
 * @param {{ type?:string, kind?:number, domain?:number, category?:number, forceId?:number }} entity
 * @param {'2525D'|'2525C'} [format='2525D']
 * @returns {string|null}
 */
export function entityToSidc(entity, format = '2525D') {
  const typeStr = entity.type
    ?? `${entity.kind ?? 0}.${entity.domain ?? 0}.0.${entity.category ?? 0}.0.0.0`;
  return disToSidc(typeStr, entity.forceId ?? 0, format);
}
