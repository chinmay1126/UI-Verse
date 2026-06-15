const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = process.env.BENCH_PORT || 8000;
const BASE = `http://localhost:${PORT}`;
const ROUTES = [
  '/',
  '/index.html',
  '/button.html',
  '/components/state/demo-state.html'
];

function waitForServer(url, timeout = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      http.get(url, (res) => {
        resolve();
      }).on('error', () => {
        if (Date.now() - start > timeout) return reject(new Error('Server start timeout'));
        setTimeout(check, 200);
      });
    })();
  });
}

async function run() {
  console.log('Starting built-in static server on port', PORT);
  const mime = {
    '.html': 'text/html', '.js': 'application/javascript', '.mjs': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json'
  };

  const staticServer = http.createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(__dirname, '..', urlPath);
      if (urlPath === '/' || urlPath === '') filePath = path.join(__dirname, '..', 'index.html');
      // prevent directory traversal
      if (!filePath.startsWith(path.join(__dirname, '..'))) {
        res.statusCode = 403; res.end('Forbidden'); return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.statusCode = 404; res.end('Not Found');
      }
    } catch (e) {
      res.statusCode = 500; res.end('Server error');
    }
  }).listen(PORT);

  const server = staticServer;

  try {
    await waitForServer(`${BASE}/index.html`);
    console.log('Server is up at', BASE);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const results = [];
    for (const route of ROUTES) {
      const url = route.startsWith('/') ? `${BASE}${route}` : `${BASE}/${route}`;
      console.log('Navigating to', url);
      const resp = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      if (!resp) {
        console.warn('No response for', url);
      }

      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] || null;
        const paints = performance.getEntriesByType('paint') || [];
        const fcp = paints.find(p => p.name === 'first-contentful-paint');
        return {
          timestamp: Date.now(),
          fcp: fcp ? Math.round(fcp.startTime) : null,
          domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : (performance.timing.domContentLoadedEventEnd || null),
          loadEvent: nav ? Math.round(nav.loadEventEnd) : (performance.timing.loadEventEnd || null),
        };
      });

      results.push({ route, url, status: resp ? resp.status() : null, metrics });
      console.log('->', route, JSON.stringify(metrics));
    }

    await browser.close();

    const outDir = path.join(__dirname, '..', 'bench-results');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const outFile = path.join(outDir, `results-${Date.now()}.json`);
    fs.writeFileSync(outFile, JSON.stringify({ base: BASE, results }, null, 2));
    console.log('Results written to', outFile);
    // stop server
    if (server && typeof server.close === 'function') server.close();
    console.log('Server stopped');
    process.exit(0);
  } catch (err) {
    console.error('Benchmark failed:', err);
    try { if (server && typeof server.close === 'function') server.close(); } catch(e){}
    process.exit(2);
  }
}

run();
