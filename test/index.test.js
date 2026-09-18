// Node.js built-in test runner (node --test)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  disToSidc,
  disToSidcLabel,
  disToSidcComponents,
  entityToSidc,
  parseDisEntityType,
  parseSidc,
  sidcToDis,
  sidcToDisTypeString,
  sidcToForceId,
} from '../src/index.js';

// ── DIS → SIDC ──────────────────────────────────────────────────────────────

describe('parseDisEntityType', () => {
  it('parses dot-separated string', () => {
    const r = parseDisEntityType('1.2.0.1.0.0.0');
    assert.equal(r.kind, 1);
    assert.equal(r.domain, 2);
    assert.equal(r.country, 0);
    assert.equal(r.category, 1);
  });

  it('parses object', () => {
    const r = parseDisEntityType({ kind: 1, domain: 3, category: 6 });
    assert.equal(r.kind, 1);
    assert.equal(r.domain, 3);
    assert.equal(r.category, 6);
    assert.equal(r.country, 0);
  });

  it('parses dash-separated string', () => {
    const r = parseDisEntityType('1-1-0-1-0-0-0');
    assert.equal(r.kind, 1);
    assert.equal(r.domain, 1);
    assert.equal(r.category, 1);
  });
});

describe('disToSidc', () => {
  it('returns 20-char string', () => {
    const sidc = disToSidc('1.1.0.1.0.0.0', 1);
    assert.equal(typeof sidc, 'string');
    assert.equal(sidc.length, 20);
  });

  it('friendly land tank → correct SIDC prefix', () => {
    // kind=1 Platform, domain=1 Land, category=1 Tank → ss=10, entity=120500, si=03 (Friendly)
    const sidc = disToSidc('1.1.0.1.0.0.0', 1);
    assert.equal(sidc, '10031000001205000000');
  });

  it('hostile air fighter → correct SIDC', () => {
    // kind=1, domain=2, cat=1 Fighter → ss=01, entity=110104, si=06 (Hostile)
    const sidc = disToSidc('1.2.0.1.0.0.0', 2);
    assert.equal(sidc, '10060100001101040000');
  });

  it('neutral surface carrier → correct SIDC', () => {
    // kind=1, domain=3, cat=1 Carrier → ss=30, entity=120100, si=04 (Neutral)
    const sidc = disToSidc('1.3.0.1.0.0.0', 3);
    assert.equal(sidc, '10043000001201000000');
  });

  it('unknown (forceId=0) results in si=01', () => {
    const sidc = disToSidc('1.1.0.0.0.0.0', 0);
    assert.ok(sidc.startsWith('1001'));
  });

  it('domain fallback when category not in tree', () => {
    // category 99 not in domain 1 → falls back to domain-level _
    const sidc = disToSidc('1.1.0.99.0.0.0', 1);
    assert.ok(sidc !== null);
    assert.equal(sidc.length, 20);
  });

  it('kind fallback for unknown domain', () => {
    // domain 9 not in kind 1 → falls back to kind-level _
    const sidc = disToSidc('1.9.0.0.0.0.0', 1);
    assert.ok(sidc !== null);
  });

  it('returns null for unmapped kind', () => {
    const sidc = disToSidc('0.0.0.0.0.0.0', 1);
    assert.equal(sidc, null);
  });

  it('subsurface submarine → ss=35', () => {
    const comps = disToSidcComponents('1.4.0.3.0.0.0');
    assert.equal(comps?.symbolSet, '35');
  });

  it('space platform → ss=05', () => {
    const comps = disToSidcComponents('1.5.0.1.0.0.0');
    assert.equal(comps?.symbolSet, '05');
  });

  it('air munition → ss=02', () => {
    const comps = disToSidcComponents('2.2.0.0.0.0.0');
    assert.equal(comps?.symbolSet, '02');
  });

  it('land munition → ss=15', () => {
    const comps = disToSidcComponents('2.1.0.0.0.0.0');
    assert.equal(comps?.symbolSet, '15');
  });
});

describe('disToSidcLabel', () => {
  it('returns human-readable label', () => {
    assert.equal(disToSidcLabel('1.1.0.1.0.0.0'), 'Armor');
    assert.equal(disToSidcLabel('1.2.0.1.0.0.0'), 'Fighter');
    assert.equal(disToSidcLabel('1.4.0.1.0.0.0'), 'Submarine (SSBN)');
  });

  it('returns null for unknown kind', () => {
    assert.equal(disToSidcLabel('0.0.0.0.0.0.0'), null);
  });
});

describe('entityToSidc', () => {
  it('works with entity object using type string', () => {
    const sidc = entityToSidc({ type: '1.2.0.1.0.0.0', forceId: 1 });
    assert.equal(sidc, disToSidc('1.2.0.1.0.0.0', 1));
  });

  it('works with entity object using individual fields', () => {
    const sidc = entityToSidc({ kind: 1, domain: 1, category: 1, forceId: 1 });
    assert.equal(sidc, disToSidc('1.1.0.1.0.0.0', 1));
  });

  it('defaults forceId to 0 when absent', () => {
    const sidc = entityToSidc({ type: '1.1.0.1.0.0.0' });
    assert.equal(sidc?.slice(2, 4), '01'); // Unknown SI
  });
});

// ── SIDC → DIS ──────────────────────────────────────────────────────────────

describe('parseSidc', () => {
  it('parses a valid 20-char SIDC', () => {
    const r = parseSidc('10031000001205000000');
    assert.equal(r?.version, '10');
    assert.equal(r?.standardIdentity, '03');
    assert.equal(r?.symbolSet, '10');
    assert.equal(r?.entity, '120500');
  });

  it('returns null for wrong length', () => {
    assert.equal(parseSidc('1003100000'), null);
    assert.equal(parseSidc(''), null);
  });

  it('returns null for non-string', () => {
    assert.equal(parseSidc(null), null);
  });
});

describe('sidcToDis', () => {
  it('round-trips a friendly land tank', () => {
    const sidc = disToSidc('1.1.0.1.0.0.0', 1); // '10031000001205000000'
    const result = sidcToDis(sidc);
    assert.ok(result !== null);
    assert.equal(result.kind, 1);
    assert.equal(result.domain, 1);
    assert.equal(result.forceId, 1);
  });

  it('round-trips a hostile air fighter', () => {
    const sidc = disToSidc('1.2.0.1.0.0.0', 2);
    const result = sidcToDis(sidc);
    assert.ok(result !== null);
    assert.equal(result.kind, 1);
    assert.equal(result.domain, 2);
    assert.equal(result.forceId, 2);
  });

  it('round-trips a neutral carrier', () => {
    const sidc = disToSidc('1.3.0.1.0.0.0', 3);
    const result = sidcToDis(sidc);
    assert.ok(result !== null);
    assert.equal(result.kind, 1);
    assert.equal(result.domain, 3);
    assert.equal(result.forceId, 3);
  });

  it('returns null for a SIDC with no mapping', () => {
    // All-zero entity code in a symbol set not in the tree
    const result = sidcToDis('10030000000000000000');
    // symbol set 00 not in tree → null
    assert.equal(result, null);
  });

  it('populates kindName and domainName', () => {
    const sidc = disToSidc('1.4.0.0.0.0.0', 1);
    const result = sidcToDis(sidc);
    assert.ok(result?.kindName.length > 0);
    assert.ok(result?.domainName.length > 0);
  });

  it('standard identity AssumedFriend → forceId 1', () => {
    const sidc = '10021000001205000000'; // SI=02 (AssumedFriend)
    const result = sidcToDis(sidc);
    assert.equal(result?.forceId, 1);
  });

  it('standard identity Suspect → forceId 2', () => {
    const sidc = '10051000001205000000'; // SI=05 (Suspect)
    const result = sidcToDis(sidc);
    assert.equal(result?.forceId, 2);
  });
});

describe('sidcToDisTypeString', () => {
  it('returns dot-separated string', () => {
    const sidc = disToSidc('1.2.0.1.0.0.0', 1);
    const typeStr = sidcToDisTypeString(sidc);
    assert.ok(typeof typeStr === 'string');
    assert.ok(typeStr.includes('.'));
    const parts = typeStr.split('.');
    assert.equal(parts.length, 7);
  });

  it('returns null for invalid SIDC', () => {
    assert.equal(sidcToDisTypeString('BAD'), null);
  });
});

describe('sidcToForceId', () => {
  it('extracts force ID from SIDC', () => {
    assert.equal(sidcToForceId('10031000001205000000'), 1); // Friend
    assert.equal(sidcToForceId('10061000001205000000'), 2); // Hostile
    assert.equal(sidcToForceId('10041000001205000000'), 3); // Neutral
    assert.equal(sidcToForceId('10011000001205000000'), 0); // Unknown
  });

  it('returns null for invalid SIDC', () => {
    assert.equal(sidcToForceId('bad'), null);
  });
});
