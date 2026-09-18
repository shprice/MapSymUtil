// DIS entity type → MIL-STD-2525D SIDC conversion.
// Implements the mapping defined in SISO-REF-010 (Entity Type to Symbol mapping).

import { FORCE_ID_TO_SI } from './constants.js';
import { treeLookup } from './sidc-tree.js';

/**
 * Parse a DIS entity type string or object into its component fields.
 *
 * Accepts either:
 *   - A dot/dash-separated string: "1.1.0.1.0.0.0"  (kind.domain.country.category.subcategory.specific.extra)
 *   - An object: { kind, domain, category }
 *
 * @param {string|{kind:number,domain:number,category:number}} entityType
 * @returns {{ kind:number, domain:number, country:number, category:number,
 *             subcategory:number, specific:number, extra:number }}
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
 * Convert a DIS entity type to a MIL-STD-2525D 20-character SIDC string.
 *
 * @param {string|{kind:number,domain:number,category:number}} entityType
 *   DIS entity type as a dot-separated string or component object.
 * @param {number} [forceId=0]
 *   DIS Force ID: 0=Other/Unknown, 1=Friendly, 2=Opposing, 3=Neutral.
 * @returns {string|null} 20-character SIDC string, or null if no mapping found.
 */
export function disToSidc(entityType, forceId = 0) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  const entry = treeLookup(kind, domain, category);
  if (!entry) return null;

  const si = FORCE_ID_TO_SI[forceId] ?? '01';
  // 20-char 2525D: Version(10) + SI(2) + SymSet(2) + Status(0) + HQ(0) + Amp(00) + Entity(6) + Type(00) + Subtype(00)
  return `10${si}${entry.ss}0000${entry.entity}0000`;
}

/**
 * Look up the human-readable SIDC label for a DIS entity type without
 * constructing the full SIDC string.
 *
 * @param {string|{kind:number,domain:number,category:number}} entityType
 * @returns {string|null}
 */
export function disToSidcLabel(entityType) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  return treeLookup(kind, domain, category)?.label ?? null;
}

/**
 * Convert a DIS entity represented as a full object (as decoded from a PDU)
 * into a 20-character SIDC string.
 *
 * Expects the entity to have:
 *   - type: dot-separated entity type string (e.g. "1.1.0.1.0.0.0"), OR
 *           individual fields kind/domain/category
 *   - forceId: 0–3
 *
 * @param {{ type?:string, kind?:number, domain?:number, category?:number,
 *           forceId?:number }} entity
 * @returns {string|null}
 */
export function entityToSidc(entity) {
  const typeStr = entity.type ?? `${entity.kind ?? 0}.${entity.domain ?? 0}.0.${entity.category ?? 0}.0.0.0`;
  return disToSidc(typeStr, entity.forceId ?? 0);
}

/**
 * Return the symbol set code and entity code that the DIS type maps to,
 * without constructing the full SIDC string.
 *
 * @param {string|{kind:number,domain:number,category:number}} entityType
 * @returns {{ symbolSet:string, entityCode:string, label:string }|null}
 */
export function disToSidcComponents(entityType) {
  const { kind, domain, category } = parseDisEntityType(entityType);
  const entry = treeLookup(kind, domain, category);
  if (!entry) return null;
  return { symbolSet: entry.ss, entityCode: entry.entity, label: entry.label };
}
