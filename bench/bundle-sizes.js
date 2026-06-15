const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function walk(dir, ext = '.js') {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) entries.push(...walk(full, ext));
    else if (path.extname(name) === ext) entries.push(full);
  }
  return entries;
}

function fmt(n) { return (n/1024).toFixed(2) + ' kB'; }

async function run() {
  const targets = ['dist', 'js'];
  const all = [];
  for (const t of targets) {
    const dir = path.join(__dirname, '..', t);
    const files = walk(dir, '.js');
    for (const f of files) {
      const buf = fs.readFileSync(f);
      const gz = zlib.gzipSync(buf).length;
      const raw = buf.length;
      all.push({ file: path.relative(process.cwd(), f), raw, gz });
    }
  }
  all.sort((a,b) => b.gz - a.gz);
  const outDir = path.join(__dirname, '..', 'bench-results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const outFile = path.join(outDir, `bundles-${Date.now()}.json`);
  fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
  console.log('Bundle sizes (gzipped) — top files:');
  all.slice(0, 10).forEach((r) => console.log(fmt(r.gz), fmt(r.raw), r.file));
  console.log('Results written to', outFile);
}

run();
