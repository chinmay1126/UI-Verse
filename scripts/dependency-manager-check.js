#!/usr/bin/env node

const DependencyManager = require('../js/core/dependency-manager.js');

const report = DependencyManager.validateGraph();

if (!report.valid) {
  console.error('\n❌ Dependency graph validation failed.');

  if (report.missing.length > 0) {
    console.error('Missing dependencies:');
    report.missing.forEach((item) => {
      console.error(`- ${item.module} -> ${item.dependency}`);
    });
  }

  if (report.circular.length > 0) {
    console.error('Circular dependencies:');
    report.circular.forEach((message) => {
      console.error(`- ${message}`);
    });
  }

  process.exit(1);
}

console.log(`\n✅ Dependency graph is valid (${DependencyManager.getRegisteredNames().length} modules).`);