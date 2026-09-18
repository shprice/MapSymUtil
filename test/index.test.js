import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  disToSidc, disToSidc2525D, disToSidc2525C,
  disToSidcLabel, disToSidcComponents, entityToSidc,
  parseDisEntityType,
  detectSidcFormat, parseSidc, parseSidc2525D, parseSidc2525C,
  sidcToDis, sidcToDisTypeString, sidcToForceId,
} from '../src/index.js';

// ── parseDisEntityType ───────────────────────────────────────────────────────

describe('parseDisEntityType', () => {
  it('parses full dot-separated string', () => {
    const r = parseDisEntityType('1.2.225.1.1.1.0');
    assert.equal(r.kind, 1);
    assert.equal(r.domain, 2);
    assert.equal(r.country, 225);
    assert.equal(r.category, 1);
    assert.equal(r.subcategory, 1);
    assert.equal(r.specific, 1);
    assert.equal(r.extra, 0);
  });

  it('parses dash-separated string', () => {
    const r = parseDisEntityType('1-1-0-1-0-0-0');
    assert.equal(r.kind, 1); assert.equal(r.domain, 1); assert.equal(r.category, 1);
  });

  it('parses object', () => {
    const r = parseDisEntityType({ kind: 1, domain: 3, country: 224, category: 6 });
    assert.equal(r.kind, 1); assert.equal(r.domain, 3);
    assert.equal(r.country, 224); assert.equal(r.category, 6);
    assert.equal(r.subcategory, 0);
  });

  it('defaults missing fields to 0', () => {
    const r = parseDisEntityType('1.1');
    assert.equal(r.category, 0); assert.equal(r.extra, 0);
  });
});

// ── disToSidc — 2525D (20-char) ──────────────────────────────────────────────

describe('disToSidc2525D', () => {
  it('returns 20-char string', () => {
    assert.equal(disToSidc2525D('1.1.0.1.0.0.0', 1)?.length, 20);
  });

  it('friendly land tank', () => {
    assert.equal(disToSidc2525D('1.1.0.1.0.0.0', 1), '10031000001205000000');
  });

  it('hostile air fighter', () => {
    assert.equal(disToSidc2525D('1.2.0.1.0.0.0', 2), '10060100001101040000');
  });

  it('neutral surface carrier', () => {
    assert.equal(disToSidc2525D('1.3.0.1.0.0.0', 3), '10043000001201000000');
  });

  it('unknown force → SI=01', () => {
    assert.equal(disToSidc2525D('1.1.0.0.0.0.0', 0)?.slice(2, 4), '01');
  });

  it('domain fallback for unknown category', () => {
    assert.ok(disToSidc2525D('1.1.0.99.0.0.0', 1) !== null);
  });

  it('returns null for unmapped kind', () => {
    assert.equal(disToSidc2525D('0.0.0.0.0.0.0', 1), null);
  });

  it('country field is ignored', () => {
    const a = disToSidc2525D('1.1.225.1.0.0.0', 1);
    const b = disToSidc2525D('1.1.0.1.0.0.0', 1);
    assert.equal(a, b);
  });

  it('subsurface → ss=35', () => {
    assert.equal(disToSidcComponents('1.4.0.3.0.0.0')?.symbolSet, '35');
  });

  it('space → ss=05', () => {
    assert.equal(disToSidcComponents('1.5.0.1.0.0.0')?.symbolSet, '05');
  });

  it('air munition → ss=02', () => {
    assert.equal(disToSidcComponents('2.2.0.0.0.0.0')?.symbolSet, '02');
  });

  it('land munition → ss=15', () => {
    assert.equal(disToSidcComponents('2.1.0.0.0.0.0')?.symbolSet, '15');
  });
});

// ── disToSidc — 2525C (15-char) ──────────────────────────────────────────────

describe('disToSidc2525C', () => {
  it('returns 15-char string', () => {
    assert.equal(disToSidc2525C('1.1.0.1.0.0.0', 1)?.length, 15);
  });

  it('friendly land tank → SFG prefix + correct FID', () => {
    const sidc = disToSidc2525C('1.1.0.1.0.0.0', 1);
    assert.equal(sidc?.[0], 'S');   // Warfighting
    assert.equal(sidc?.[1], 'F');   // Friend
    assert.equal(sidc?.[2], 'G');   // Ground
    assert.equal(sidc?.[3], 'P');   // Present
    assert.equal(sidc?.slice(4, 10), 'UCAC--'); // Armor FID
  });

  it('hostile air fighter → SHA prefix', () => {
    const sidc = disToSidc2525C('1.2.0.1.0.0.0', 2);
    assert.equal(sidc?.[1], 'H');   // Hostile
    assert.equal(sidc?.[2], 'A');   // Air
    assert.equal(sidc?.slice(4, 10), 'MFFF--'); // Fighter FID
  });

  it('neutral surface carrier → SSS prefix', () => {
    const sidc = disToSidc2525C('1.3.0.1.0.0.0', 3);
    assert.equal(sidc?.[1], 'N');   // Neutral
    assert.equal(sidc?.[2], 'S');   // Sea Surface
    assert.equal(sidc?.slice(4, 10), 'CLCV--'); // Carrier FID
  });

  it('subsurface submarine → U battle dimension', () => {
    const sidc = disToSidc2525C('1.4.0.0.0.0.0', 1);
    assert.equal(sidc?.[2], 'U');
  });

  it('space satellite → P battle dimension', () => {
    const sidc = disToSidc2525C('1.5.0.0.0.0.0', 1);
    assert.equal(sidc?.[2], 'P');
  });

  it('returns null for unmapped kind', () => {
    assert.equal(disToSidc2525C('0.0.0.0.0.0.0', 1), null);
  });
});

// ── disToSidc dispatch ────────────────────────────────────────────────────────

describe('disToSidc dispatch', () => {
  it('defaults to 2525D', () => {
    assert.equal(disToSidc('1.1.0.1.0.0.0', 1)?.length, 20);
  });
  it('explicit 2525D', () => {
    assert.equal(disToSidc('1.1.0.1.0.0.0', 1, '2525D')?.length, 20);
  });
  it('explicit 2525C', () => {
    assert.equal(disToSidc('1.1.0.1.0.0.0', 1, '2525C')?.length, 15);
  });
});

// ── disToSidcComponents (sisoName) ───────────────────────────────────────────

describe('disToSidcComponents', () => {
  it('includes sisoName', () => {
    const c = disToSidcComponents('1.1.0.1.0.0.0');
    assert.equal(c?.sisoName, 'Tank');
  });

  it('Air cat 2 sisoName', () => {
    const c = disToSidcComponents('1.2.0.2.0.0.0');
    assert.equal(c?.sisoName, 'Attack/Strike');
  });

  it('Surface cat 1 sisoName', () => {
    const c = disToSidcComponents('1.3.0.1.0.0.0');
    assert.equal(c?.sisoName, 'Carrier');
  });
});

// ── entityToSidc ─────────────────────────────────────────────────────────────

describe('entityToSidc', () => {
  it('uses type string + forceId', () => {
    assert.equal(entityToSidc({ type: '1.2.0.1.0.0.0', forceId: 1 }), disToSidc('1.2.0.1.0.0.0', 1));
  });
  it('uses individual fields', () => {
    assert.equal(entityToSidc({ kind: 1, domain: 1, category: 1, forceId: 1 }), disToSidc('1.1.0.1.0.0.0', 1));
  });
  it('generates 2525C when specified', () => {
    assert.equal(entityToSidc({ type: '1.1.0.1.0.0.0', forceId: 1 }, '2525C')?.length, 15);
  });
});

// ── detectSidcFormat ─────────────────────────────────────────────────────────

describe('detectSidcFormat', () => {
  it('detects 20-char as 2525D', () => {
    assert.equal(detectSidcFormat('10031000001205000000'), '2525D');
  });
  it('detects 15-char as 2525C', () => {
    assert.equal(detectSidcFormat('SFGPUCAC--F----'), '2525C');
  });
  it('returns null for other lengths', () => {
    assert.equal(detectSidcFormat('short'), null);
    assert.equal(detectSidcFormat(''), null);
  });
});

// ── parseSidc ────────────────────────────────────────────────────────────────

describe('parseSidc2525D', () => {
  it('parses correctly', () => {
    const r = parseSidc2525D('10031000001205000000');
    assert.equal(r?.format, '2525D');
    assert.equal(r?.version, '10');
    assert.equal(r?.standardIdentity, '03');
    assert.equal(r?.symbolSet, '10');
    assert.equal(r?.entity, '120500');
  });
  it('returns null for wrong length', () => {
    assert.equal(parseSidc2525D('SFGPUCAC--F----'), null);
  });
});

describe('parseSidc2525C', () => {
  it('parses correctly', () => {
    const r = parseSidc2525C('SFGPUCAC--F----');
    assert.equal(r?.format, '2525C');
    assert.equal(r?.codingScheme, 'S');
    assert.equal(r?.standardIdentity, 'F');
    assert.equal(r?.battleDimension, 'G');
    assert.equal(r?.status, 'P');
    assert.equal(r?.functionId, 'UCAC--');
  });
  it('returns null for wrong length', () => {
    assert.equal(parseSidc2525C('10031000001205000000'), null);
  });
});

describe('parseSidc (auto-detect)', () => {
  it('routes 20-char to 2525D parser', () => {
    assert.equal(parseSidc('10031000001205000000')?.format, '2525D');
  });
  it('routes 15-char to 2525C parser', () => {
    assert.equal(parseSidc('SFGPUCAC--F----')?.format, '2525C');
  });
  it('returns null for invalid length', () => {
    assert.equal(parseSidc('BAD'), null);
  });
});

// ── sidcToDis — 2525D round-trips ────────────────────────────────────────────

describe('sidcToDis 2525D', () => {
  it('round-trips friendly land tank', () => {
    const sidc = disToSidc2525D('1.1.0.1.0.0.0', 1);
    const r = sidcToDis(sidc);
    assert.equal(r?.kind, 1); assert.equal(r?.domain, 1); assert.equal(r?.forceId, 1);
  });

  it('round-trips hostile air fighter', () => {
    const sidc = disToSidc2525D('1.2.0.1.0.0.0', 2);
    const r = sidcToDis(sidc);
    assert.equal(r?.kind, 1); assert.equal(r?.domain, 2); assert.equal(r?.forceId, 2);
  });

  it('round-trips neutral surface carrier', () => {
    const sidc = disToSidc2525D('1.3.0.1.0.0.0', 3);
    const r = sidcToDis(sidc);
    assert.equal(r?.kind, 1); assert.equal(r?.domain, 3); assert.equal(r?.forceId, 3);
  });

  it('AssumedFriend SI=02 → forceId 1', () => {
    assert.equal(sidcToDis('10021000001205000000')?.forceId, 1);
  });

  it('Suspect SI=05 → forceId 2', () => {
    assert.equal(sidcToDis('10051000001205000000')?.forceId, 2);
  });

  it('includes sisoName', () => {
    const sidc = disToSidc2525D('1.1.0.1.0.0.0', 1);
    assert.equal(sidcToDis(sidc)?.sisoName, 'Tank');
  });
});

// ── sidcToDis — 2525C round-trips ────────────────────────────────────────────

describe('sidcToDis 2525C', () => {
  it('round-trips friendly land tank', () => {
    const sidc = disToSidc2525C('1.1.0.1.0.0.0', 1);
    const r = sidcToDis(sidc);
    assert.ok(r !== null);
    assert.equal(r?.kind, 1);
    assert.equal(r?.domain, 1);
    assert.equal(r?.forceId, 1);
  });

  it('round-trips hostile air fighter', () => {
    const sidc = disToSidc2525C('1.2.0.1.0.0.0', 2);
    const r = sidcToDis(sidc);
    assert.equal(r?.kind, 1); assert.equal(r?.domain, 2); assert.equal(r?.forceId, 2);
  });

  it('round-trips subsurface submarine', () => {
    const sidc = disToSidc2525C('1.4.0.0.0.0.0', 1);
    const r = sidcToDis(sidc);
    assert.equal(r?.domain, 4);
  });

  it('H SI char → forceId 2 (hostile)', () => {
    const sidc = 'SHGPUCI--------'.slice(0, 15).padEnd(15, '-');
    const r = sidcToDis(sidc);
    assert.equal(r?.forceId, 2);
  });

  it('N SI char → forceId 3 (neutral)', () => {
    const sidc = 'SNGPUCAC--F----';
    assert.equal(sidcToDis(sidc)?.forceId, 3);
  });

  it('falls back to BD when FID not in tree', () => {
    // Unknown FID in Ground BD → should still return a Land Platform
    const sidc = 'SFGPZZZZZZ-----';
    const r = sidcToDis(sidc);
    assert.ok(r !== null);
    assert.equal(r?.domain, 1); // Land from G battle dimension
  });
});

// ── sidcToForceId ────────────────────────────────────────────────────────────

describe('sidcToForceId', () => {
  it('2525D Friend → 1', () => { assert.equal(sidcToForceId('10031000001205000000'), 1); });
  it('2525D Hostile → 2', () => { assert.equal(sidcToForceId('10061000001205000000'), 2); });
  it('2525D Neutral → 3', () => { assert.equal(sidcToForceId('10041000001205000000'), 3); });
  it('2525D Unknown → 0', () => { assert.equal(sidcToForceId('10011000001205000000'), 0); });
  it('2525C F → 1', () => { assert.equal(sidcToForceId('SFGPUCAC--F----'), 1); });
  it('2525C H → 2', () => { assert.equal(sidcToForceId('SHGPUCAC--F----'), 2); });
  it('2525C N → 3', () => { assert.equal(sidcToForceId('SNGPUCAC--F----'), 3); });
  it('invalid → null', () => { assert.equal(sidcToForceId('BAD'), null); });
});

// ── sidcToDisTypeString ───────────────────────────────────────────────────────

describe('sidcToDisTypeString', () => {
  it('returns dot-separated 7-field string (2525D)', () => {
    const sidc = disToSidc2525D('1.2.0.1.0.0.0', 1);
    const s = sidcToDisTypeString(sidc);
    assert.equal(s?.split('.').length, 7);
  });

  it('returns dot-separated 7-field string (2525C)', () => {
    const sidc = disToSidc2525C('1.2.0.1.0.0.0', 1);
    const s = sidcToDisTypeString(sidc);
    assert.equal(s?.split('.').length, 7);
  });

  it('returns null for invalid SIDC', () => {
    assert.equal(sidcToDisTypeString('BAD'), null);
  });
});
