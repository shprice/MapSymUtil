// MIL-STD-2525 SIDC → DIS entity type conversion.
// Handles both MIL-STD-2525D (20-char) and MIL-STD-2525C (15-char) SIDCs.
// The reverse direction is inherently approximate: many DIS types share one symbol.

import { SI_TO_FORCE_ID, SI_CHAR_TO_FORCE_ID, BD_CHAR_TO_KIND_DOMAIN, DIS_ENTITY_KIND, DIS_DOMAIN } from './constants.js';
import { REVERSE_INDEX } from './sidc-tree.js';

// ── Format detection ──────────────────────────────────────────────────────────

/**
 * Detect the SIDC format from string length.
 * @param {string} sidc
 * @returns {'2525D'|'2525C'|null}
 */
export function detectSidcFormat(sidc) {
  if (typeof sidc !== 'string') return null;
  if (sidc.length === 20) return '2525D';
  if (sidc.length === 15) return '2525C';
  return null;
}

// ── Parsing ───────────────────────────────────────────────────────────────────

/**
 * Parse a 20-character MIL-STD-2525D SIDC into named fields.
 *
 * @param {string} sidc
 * @returns {{ format:'2525D', version, standardIdentity, symbolSet, status,
 *             hqTfDummy, amplifier, entity, entityType, entitySubtype }|null}
 */
export function parseSidc2525D(sidc) {
  if (typeof sidc !== 'string' || sidc.length !== 20) return null;
  return {
    format:           '2525D',
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
 * Parse a 15-character MIL-STD-2525C SIDC into named fields.
 *
 * Structure: Scheme(1) + SI(1) + BD(1) + Status(1) + FunctionID(6) + Mod1(1) + Mod2(1) + Country(2) + OOB(1)
 *
 * @param {string} sidc
 * @returns {{ format:'2525C', codingScheme, standardIdentity, battleDimension, status,
 *             functionId, modifier1, modifier2, countryCode, orderOfBattle }|null}
 */
export function parseSidc2525C(sidc) {
  if (typeof sidc !== 'string' || sidc.length !== 15) return null;
  return {
    format:           '2525C',
    codingScheme:     sidc[0],
    standardIdentity: sidc[1],
    battleDimension:  sidc[2],
    status:           sidc[3],
    functionId:       sidc.slice(4, 10),
    modifier1:        sidc[10],
    modifier2:        sidc[11],
    countryCode:      sidc.slice(12, 14),
    orderOfBattle:    sidc[14],
  };
}

/**
 * Parse a SIDC string of either supported length.
 * Returns a format-tagged object, or null for unsupported lengths.
 *
 * @param {string} sidc
 * @returns {ReturnType<parseSidc2525D>|ReturnType<parseSidc2525C>|null}
 */
export function parseSidc(sidc) {
  const fmt = detectSidcFormat(sidc);
  if (fmt === '2525D') return parseSidc2525D(sidc);
  if (fmt === '2525C') return parseSidc2525C(sidc);
  return null;
}

// ── Reverse lookup ────────────────────────────────────────────────────────────

function bestCandidate(candidates) {
  if (!candidates || candidates.length === 0) return null;
  return (
    candidates.find(c => c.category >= 0 && c.domain >= 0) ??
    candidates.find(c => c.domain >= 0) ??
    candidates[0]
  );
}

function buildResult(best, forceId) {
  if (!best) return null;
  return {
    kind:       best.kind,
    domain:     best.domain >= 0 ? best.domain : 0,
    category:   best.category >= 0 ? best.category : 0,
    forceId,
    kindName:   DIS_ENTITY_KIND[best.kind]   ?? 'Unknown',
    domainName: DIS_DOMAIN[best.domain >= 0 ? best.domain : 0] ?? 'Unknown',
    label:      best.label,
    sisoName:   best.sisoName,
  };
}

/**
 * Convert a SIDC (either format) to the best-match DIS entity type fields.
 *
 * Lookup priority:
 *   1. Specific category match (category >= 0, domain >= 0)
 *   2. Domain-fallback match
 *   3. Kind-fallback match
 *
 * @param {string} sidc  15-char (2525C) or 20-char (2525D) SIDC.
 * @returns {{ kind, domain, category, forceId, kindName, domainName, label, sisoName }|null}
 */
export function sidcToDis(sidc) {
  const fmt = detectSidcFormat(sidc);
  if (!fmt) return null;

  if (fmt === '2525D') {
    const parsed = parseSidc2525D(sidc);
    if (!parsed) return null;
    const forceId    = SI_TO_FORCE_ID[parsed.standardIdentity] ?? 0;
    const key        = `${parsed.symbolSet}:${parsed.entity}`;
    const candidates = REVERSE_INDEX.byD.get(key);
    return buildResult(bestCandidate(candidates), forceId);
  }

  // 2525C
  const parsed  = parseSidc2525C(sidc);
  if (!parsed) return null;
  const forceId = SI_CHAR_TO_FORCE_ID[parsed.standardIdentity] ?? 0;

  // Try exact fid match first
  const fid = parsed.functionId.replace(/-+$/, ''); // trim trailing dashes for lookup
  const key = `${parsed.battleDimension}:${parsed.functionId}`;
  const candidates = REVERSE_INDEX.byC.get(key);
  const specific   = bestCandidate(candidates);

  if (specific) return buildResult(specific, forceId);

  // Fall back to battle-dimension → kind/domain default
  const kdFallback = BD_CHAR_TO_KIND_DOMAIN[parsed.battleDimension];
  if (!kdFallback) return null;
  return {
    kind:       kdFallback.kind,
    domain:     kdFallback.domain,
    category:   0,
    forceId,
    kindName:   DIS_ENTITY_KIND[kdFallback.kind]   ?? 'Unknown',
    domainName: DIS_DOMAIN[kdFallback.domain] ?? 'Unknown',
    label:      'Unknown',
    sisoName:   'Unknown',
  };
}

/**
 * Convert a SIDC to a DIS entity type dot-notation string (kind.domain.0.category.0.0.0).
 *
 * @param {string} sidc
 * @returns {string|null}
 */
export function sidcToDisTypeString(sidc) {
  const r = sidcToDis(sidc);
  if (!r) return null;
  return `${r.kind}.${r.domain}.0.${r.category}.0.0.0`;
}

/**
 * Extract the DIS Force ID from a SIDC of either format.
 *
 * @param {string} sidc
 * @returns {number|null}
 */
export function sidcToForceId(sidc) {
  const fmt = detectSidcFormat(sidc);
  if (!fmt) return null;
  if (fmt === '2525D') {
    const parsed = parseSidc2525D(sidc);
    return parsed ? (SI_TO_FORCE_ID[parsed.standardIdentity] ?? 0) : null;
  }
  const parsed = parseSidc2525C(sidc);
  return parsed ? (SI_CHAR_TO_FORCE_ID[parsed.standardIdentity] ?? 0) : null;
}
