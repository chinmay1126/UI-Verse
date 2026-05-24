const fs = require('fs');
const path = require('path');

// Very small extractor: finds t('key') or t("key") occurrences in src/ and stories/
function walk(dir, files = []) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) walk(full, files);
    else files.push(full);
  });
  return files;
}

function extractFromFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const re = /t\(\s*['\"]([a-zA-Z0-9_.-]+)['\"]\s*[,)]/g;
  const keys = new Set();
  let m;
  while ((m = re.exec(content))) keys.add(m[1]);
  return Array.from(keys);
}

function main() {
  const roots = ['src', 'stories'];
  const keys = new Set();
  roots.forEach((r) => {
    if (!fs.existsSync(r)) return;
    const files = walk(r).filter((f) => /\.(js|ts|mjs|html)$/.test(f));
    files.forEach((f) => {
      extractFromFile(f).forEach((k) => keys.add(k));
    });
  });
  const out = path.join('locales', 'extracted-keys.json');
  fs.mkdirSync('locales', { recursive: true });
  fs.writeFileSync(out, JSON.stringify(Array.from(keys).sort(), null, 2));
  console.log('Extracted', keys.size, 'keys to', out);
}

if (require.main === module) main();
