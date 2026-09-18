// MIL-STD-2525D SIDC → DIS entity type conversion.
// Implements the reverse mapping per SISO-REF-010 / MIL-STD-2525D Appendix A.
//
// This direction is inherently lossy: many DIS entity types share the same
// SIDC symbol.  The functions below return the most specific DIS entity type
// that was used to produce the given SIDC, falling back to domain/kind-level
// matches when a specific category entry is not found.

import { SI_TO_FORCE_ID, DIS_ENTITY_KIND, DIS_DOMAIN } from './constants.js';
import { REVERSE_INDEX } from './sidc-tree.js';

/**
 * Parse a 20-character MIL-STD-2525D SIDC string into its named fields.
 *
 * @param {string} sidc 20-character SIDC string.
 * @returns {{
 *   version: string,
 *   standardIdentity: string,
 *   symbolSet: string,
 *   status: string,
 *   hqTfDummy: string,
 *   amplifier: string,
 *   entity: string,
 *   entityType: string,
 *   entitySubtype: string,
 * }|null} Parsed fields, or null if the string is not a valid length.
 */
export function parseSidc(sidc) {
  if (typeof sidc !== 'string' || sidc.length !== 20) return null;
  return {
    version:          sidc.slice(0, 2),
    standardIdentity: sidc.slice(2, 4),
    symbolSet:        sidc.slice(4, 6),
    status:           sidc.slice(6, 7),
    hqTfDummy:        sidc.slice(7, 8),
    amplifier:        sidc.slice(8, 10),
    entity:           sidc.slice(10, 16),
    entityType:       sidc.slice(16, 18),
    entitySubtype:    sidc.slice(18, 20),
  };
}

/**
 * Convert a MIL-STD-2525D SIDC to the best-match DIS entity type fields.
 *
 * Lookup priority:
 *   1. Exact (symbolSet + entityCode) → specific category match
 *   2. Exact (symbolSet + entityCode) → domain-fallback match (category = -1)
 *   3. Exact (symbolSet + entityCode) → kind-fallback match (domain = -1)
 *
 * @param {string} sidc 20-character SIDC string.
 * @returns {{
 *   kind: number,
 *   domain: number,
 *   category: number,
 *   forceId: number,
 *   kindName: string,
 *   domainName: string,
 *   label: string,
 * }|null} Best-match DIS fields, or null if no mapping found.
 */
export function sidcToDis(sidc) {
  const parsed = parseSidc(sidc);
  if (!parsed) return null;

  const { symbolSet, standardIdentity, entity: entityCode } = parsed;
  const forceId = SI_TO_FORCE_ID[standardIdentity] ?? 0;

  const key = `${symbolSet}:${entityCode}`;
  const candidates = REVERSE_INDEX.get(key);
  if (!candidates || candidates.length === 0) return null;

  // Prefer specific category matches (category >= 0 and domain >= 0)
  let best =
    candidates.find(c => c.category >= 0 && c.domain >= 0) ??
    candidates.find(c => c.domain >= 0) ??
    candidates[0];

  return {
    kind:       best.kind,
    domain:     best.domain >= 0 ? best.domain : 0,
    category:   best.category >= 0 ? best.category : 0,
    forceId,
    kindName:   DIS_ENTITY_KIND[best.kind] ?? 'Unknown',
    domainName: DIS_DOMAIN[best.domain >= 0 ? best.domain : 0] ?? 'Unknown',
    label:      best.label,
  };
}

/**
 * Convert a SIDC to a DIS entity type dot-notation string.
 * Country and subcategory fields are set to 0 (unknown).
 *
 * @param {string} sidc 20-character SIDC string.
 * @returns {string|null} Entity type string like "1.2.0.1.0.0.0", or null.
 */
export function sidcToDisTypeString(sidc) {
  const result = sidcToDis(sidc);
  if (!result) return null;
  return `${result.kind}.${result.domain}.0.${result.category}.0.0.0`;
}

/**
 * Extract only the DIS Force ID from a SIDC's Standard Identity field.
 *
 * @param {string} sidc 20-character SIDC string.
 * @returns {number|null} DIS Force ID 0–3, or null for an invalid SIDC.
 */
export function sidcToForceId(sidc) {
  const parsed = parseSidc(sidc);
  if (!parsed) return null;
  return SI_TO_FORCE_ID[parsed.standardIdentity] ?? 0;
}
