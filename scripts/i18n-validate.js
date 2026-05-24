const fs = require('fs');
const path = require('path');

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function main() {
  const localesDir = path.join(__dirname, '..', 'src', 'locales');
  const localeFiles = fs.readdirSync(localesDir).filter((f) => f.endsWith('.json'));
  const locales = localeFiles.map((f) => ({ name: f.replace('.json', ''), data: loadJson(path.join(localesDir, f)) }));
  const keys = new Set();
  locales.forEach((l) => Object.keys(l.data).forEach((k) => keys.add(k)));
  const allKeys = Array.from(keys);
  const report = {};
  locales.forEach((l) => {
    const missing = allKeys.filter((k) => !(k in l.data));
    report[l.name] = { missing, total: allKeys.length };
  });
  console.log(JSON.stringify(report, null, 2));
  const anyMissing = Object.values(report).some((r) => r.missing.length > 0);
  if (anyMissing) process.exitCode = 2;
}

if (require.main === module) main();
