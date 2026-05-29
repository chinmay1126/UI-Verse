#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const componentsFile = path.join(dataDir, 'components.json');
const metaDir = path.join(dataDir, 'meta');
const outDir = path.join(root, 'docs', 'components-contrib');

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeFile(p, content) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, content, 'utf8'); }

const argv = process.argv.slice(2);
function parseArgs() {
  const res = {};
  for (let i=0;i<argv.length;i++) {
    const a = argv[i];
    if (a === '--component' && argv[i+1]) { res.component = argv[i+1]; i++; }
    if (a === '--all') res.all = true;
    if (a === '--check') res.check = true;
  }
  return res;
}

function generateFor(component, meta) {
  const title = component.title || meta.title || component.id;
  const id = component.id;
  const description = component.description || meta.description || '';
  const pathRel = component.path || meta.path || (id + '.html');

  const changelogHead = (meta.changelog && meta.changelog[0]) ? `**Latest:** ${meta.changelog[0].version} — ${meta.changelog[0].date}` : '';

  const md = [`# ${title} — Contribution Template`,
    '',
    `**Component ID:** ${id}`,
    `**Path:** ${pathRel}`,
    '',
    `## Short Description`,
    '',
    description || 'Describe the component purpose in one or two sentences.',
    '',
    '## Acceptance Criteria',
    '',
    '- Visual matches current design token system',
    '- Accessibility: keyboard operable, ARIA roles where needed, labels for controls',
    '- Responsive behavior for common breakpoints',
    '',
    '## Usage Example',
    '',
    '```html',
    `<!-- example for ${id} -->`,
    `<!-- Add markup snippet below -->`,
    '```',
    '',
    '## Props / Variants',
    '',
    '- Variant: primary / secondary / outline',
    '- Size: small / medium / large',
    '',
    '## Accessibility Checklist',
    '',
    '- [ ] Focus visible and logical order',
    '- [ ] ARIA attributes and roles validated',
    '- [ ] Color contrast verified',
    '- [ ] Form labels and accessible names present',
    '',
    '## Testing Notes',
    '',
    '- Playwright visual test: tests/visual/components/' + id + '.spec.ts (add if missing)',
    '- Unit tests for keyboard interactions',
    '',
    '## Changelog',
    '',
    changelogHead,
    '',
    '---',
    '',
    '*Fill in implementation details and any special considerations.*'
  ].join('\n');

  return md;
}

function run() {
  if (!fs.existsSync(componentsFile)) { console.error('components.json missing'); process.exit(2); }
  const components = loadJson(componentsFile);
  const args = parseArgs();

  const targets = [];
  if (args.all) {
    targets.push(...components);
  } else if (args.component) {
    const comp = components.find(c => c.id === args.component || c.id === args.component.toLowerCase());
    if (!comp) { console.error('component not found:', args.component); process.exit(2); }
    targets.push(comp);
  } else {
    console.error('Specify --component <id> or --all'); process.exit(2);
  }

  let created = 0;
  for (const c of targets) {
    const metaFile = path.join(metaDir, `${c.id}.json`);
    let meta = {};
    if (fs.existsSync(metaFile)) meta = loadJson(metaFile);
    const md = generateFor(c, meta);
    const outPath = path.join(outDir, `${c.id}-CONTRIBUTING.md`);
    if (args.check) {
      if (!fs.existsSync(outPath)) { console.error('Missing contrib template for', c.id); process.exit(1); }
      // compare
      const existing = fs.readFileSync(outPath, 'utf8');
      if (existing !== md) { console.error('Outdated template for', c.id); process.exit(1); }
    } else {
      writeFile(outPath, md);
      console.log('Wrote', outPath);
      created++;
    }
  }

  if (!args.check) console.log(`Templates generated: ${created}`);
}

if (require.main === module) run();
