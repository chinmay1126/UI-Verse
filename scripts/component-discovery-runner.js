const fs = require('fs');
const path = require('path');
const ComponentDiscovery = require('../js/core/component-discovery.js');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

async function run() {
  const root = process.cwd();
  const registryPath = path.join(root, 'data', 'registry.json');
  const componentsPath = path.join(root, 'data', 'components.json');
  const docsPath = path.join(root, 'data', 'meta', 'documentation-catalog.json');
  const registryJson = fs.existsSync(registryPath) ? readJson(registryPath) : {};
  const items = fs.existsSync(componentsPath) ? readJson(componentsPath) : [];
  const docsJson = fs.existsSync(docsPath) ? readJson(docsPath) : {};
  const registryItems = Array.isArray(registryJson.registry) ? registryJson.registry : Array.isArray(registryJson) ? registryJson : [];
  const docsItems = Array.isArray(docsJson.components) ? docsJson.components : Array.isArray(docsJson.pages) ? docsJson.pages : Array.isArray(docsJson) ? docsJson : [];

  await ComponentDiscovery.init({ items, docsItems, registryItems });
  return ComponentDiscovery.discover('', { limit: 10 });
}

module.exports = {
  run
};
