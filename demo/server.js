#!/usr/bin/env node
// Minimal static file server for the MapSybLib demo.
// Serves the project root so the browser can import /src/*.js as ES modules.
// Usage: node demo/server.js [port]

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 3456;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.css':  'text/css; charset=utf-8',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
};

const ENUMS_PATH = path.join(ROOT, 'data', 'dis-enums.json');

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // ── API: save enums ────────────────────────────────────────────────────
  if (urlPath === '/api/enums') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
      res.end(); return;
    }
    if (req.method === 'POST') {
      try {
        const body = await readBody(req);
        const data = JSON.parse(body); // validate JSON
        fs.writeFileSync(ENUMS_PATH, JSON.stringify(data, null, 2));
        json(res, 200, { ok: true, entries: Object.keys(data.et ?? {}).length });
      } catch (e) {
        json(res, 400, { ok: false, error: e.message });
      }
      return;
    }
  }

  // ── Static files ───────────────────────────────────────────────────────
  const target = urlPath === '/' ? '/demo/index.html' : urlPath;
  const filePath = path.join(ROOT, target);

  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500);
      res.end(err.code === 'ENOENT' ? `Not found: ${target}` : err.message);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] ?? 'text/plain',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`MapSybLib demo → ${url}`);
  console.log('Press Ctrl+C to stop.');
});
