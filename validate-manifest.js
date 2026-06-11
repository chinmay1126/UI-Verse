#!/usr/bin/env node

/**
 * UIverse Manifest Validator
 * 
 * Validates the manifest.json file for:
 * - JSON syntax validity
 * - Required fields presence
 * - Data type correctness
 * - Cross-reference integrity
 * - Component count accuracy
 * - Consistency across sections
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, 'manifest.json');

class ManifestValidator {
  constructor(manifestPath) {
    this.manifestPath = manifestPath;
    this.manifest = null;
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Load and parse manifest file
   */
  load() {
    try {
      const content = fs.readFileSync(this.manifestPath, 'utf8');
      this.manifest = JSON.parse(content);
      console.log('✓ Manifest file loaded successfully');
      return true;
    } catch (error) {
      this.errors.push(`Failed to load manifest: ${error.message}`);
      return false;
    }
  }

  /**
   * Validate JSON structure
   */
  validateStructure() {
    const requiredFields = [
      'name',
      'version',
      'description',
      'author',
      'license',
      'repository',
      'manifestVersion',
      'lastUpdated',
      'metadata',
      'components',
      'resources',
      'pagination',
      'features',
      'documentation',
      'files',
      'stats'
    ];

    requiredFields.forEach(field => {
      if (!this.manifest[field]) {
        this.errors.push(`Missing required field: ${field}`);
      }
    });

    if (this.errors.length === 0) {
      console.log('✓ All required root fields present');
    }
  }

  /**
   * Validate metadata section
   */
  validateMetadata() {
    const { metadata } = this.manifest;
    
    if (!metadata) return;

    const requiredFields = ['totalComponents', 'totalCategories', 'a11yCompliance'];
    requiredFields.forEach(field => {
      if (!metadata[field]) {
        this.warnings.push(`Missing metadata field: ${field}`);
      }
    });

    if (metadata.totalComponents && typeof metadata.totalComponents !== 'number') {
      this.errors.push('totalComponents must be a number');
    }

    if (metadata.totalCategories && typeof metadata.totalCategories !== 'number') {
      this.errors.push('totalCategories must be a number');
    }

    console.log('✓ Metadata section validated');
  }

  /**
   * Validate components section
   */
  validateComponents() {
    const { components } = this.manifest;
    
    if (!components || typeof components !== 'object') {
      this.errors.push('components must be an object');
      return;
    }

    const requiredCategoryFields = [
      'id',
      'name',
      'icon',
      'description',
      'pageFile',
      'cssFile',
      'count',
      'keywords',
      'status',
      'popularity',
      'difficulty'
    ];

    Object.entries(components).forEach(([key, category]) => {
      requiredCategoryFields.forEach(field => {
        if (!(field in category)) {
          this.errors.push(`Component "${key}" missing field: ${field}`);
        }
      });

      // Validate ID matches key
      if (category.id !== key) {
        this.errors.push(`Component ID mismatch: key="${key}", id="${category.id}"`);
      }

      // Validate count is number
      if (typeof category.count !== 'number') {
        this.errors.push(`Component "${key}" count must be a number`);
      }

      // Validate keywords is array
      if (!Array.isArray(category.keywords)) {
        this.errors.push(`Component "${key}" keywords must be an array`);
      }

      // Validate status enum
      if (!['stable', 'beta', 'deprecated'].includes(category.status)) {
        this.errors.push(`Component "${key}" has invalid status: ${category.status}`);
      }

      // Validate popularity enum
      if (!['high', 'medium', 'low'].includes(category.popularity)) {
        this.errors.push(`Component "${key}" has invalid popularity: ${category.popularity}`);
      }

      // Validate difficulty enum
      if (!['beginner', 'intermediate', 'advanced'].includes(category.difficulty)) {
        this.errors.push(`Component "${key}" has invalid difficulty: ${category.difficulty}`);
      }
    });

    console.log('✓ Components section validated');
  }

  /**
   * Validate resources section
   */
  validateResources() {
    const { resources } = this.manifest;
    
    if (!resources) {
      this.warnings.push('Missing resources section');
      return;
    }

    const requiredSubSections = ['css', 'javascript', 'external'];
    requiredSubSections.forEach(section => {
      if (!resources[section]) {
        this.warnings.push(`Missing resources.${section} section`);
      }
    });

    if (resources.css && !Array.isArray(resources.css.global)) {
      this.errors.push('resources.css.global must be an array');
    }

    if (resources.javascript && !Array.isArray(resources.javascript.global)) {
      this.errors.push('resources.javascript.global must be an array');
    }

    console.log('✓ Resources section validated');
  }

  /**
   * Validate pagination section
   */
  validatePagination() {
    const { pagination } = this.manifest;
    
    if (!pagination) {
      this.warnings.push('Missing pagination section');
      return;
    }

    const requiredFields = ['itemsPerPage', 'totalItems', 'totalPages', 'categories'];
    requiredFields.forEach(field => {
      if (!(field in pagination)) {
        this.errors.push(`pagination missing field: ${field}`);
      }
    });

    // Verify total pages calculation
    if (pagination.itemsPerPage && pagination.totalItems && pagination.totalPages) {
      const calculatedPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
      if (calculatedPages !== pagination.totalPages) {
        this.warnings.push(
          `Pagination page count mismatch: expected ${calculatedPages}, got ${pagination.totalPages}`
        );
      }
    }

    console.log('✓ Pagination section validated');
  }

  /**
   * Validate consistency between sections
   */
  validateConsistency() {
    const { components, stats, pagination, metadata } = this.manifest;

    if (!components || !stats) return;

    // Count total components from components section
    const totalFromComponents = Object.values(components)
      .reduce((sum, cat) => sum + cat.count, 0);

    if (stats.totalComponents && stats.totalComponents !== totalFromComponents) {
      this.errors.push(
        `Component count mismatch in stats: expected ${totalFromComponents}, got ${stats.totalComponents}`
      );
    }

    if (metadata && metadata.totalComponents && metadata.totalComponents !== totalFromComponents) {
      this.errors.push(
        `Component count mismatch in metadata: expected ${totalFromComponents}, got ${metadata.totalComponents}`
      );
    }

    if (pagination && pagination.totalItems && pagination.totalItems !== totalFromComponents) {
      this.errors.push(
        `Component count mismatch in pagination: expected ${totalFromComponents}, got ${pagination.totalItems}`
      );
    }

    // Verify category count
    const categoryCount = Object.keys(components).length;
    if (metadata && metadata.totalCategories && metadata.totalCategories !== categoryCount) {
      this.errors.push(
        `Category count mismatch: expected ${categoryCount}, got ${metadata.totalCategories}`
      );
    }

    console.log('✓ Cross-section consistency validated');
  }

  /**
   * Validate files section exists and has proper structure
   */
  validateFiles() {
    const { files } = this.manifest;

    if (!files) {
      this.warnings.push('Missing files section');
      return;
    }

    const requiredCategories = ['html', 'css', 'javascript', 'documentation', 'assets'];
    requiredCategories.forEach(category => {
      if (!files[category]) {
        this.warnings.push(`Missing files.${category} category`);
      } else if (!Array.isArray(files[category])) {
        this.errors.push(`files.${category} must be an array`);
      }
    });

    console.log('✓ Files section validated');
  }

  /**
   * Validate stats section
   */
  validateStats() {
    const { stats } = this.manifest;

    if (!stats) {
      this.warnings.push('Missing stats section');
      return;
    }

    const requiredFields = ['totalFiles', 'htmlFiles', 'cssFiles', 'jsFiles', 'totalComponents', 'totalCategories'];
    requiredFields.forEach(field => {
      if (!(field in stats)) {
        this.warnings.push(`Missing stats.${field}`);
      }
    });

    console.log('✓ Stats section validated');
  }

  /**
   * Run all validations
   */
  validate() {
    console.log('\n📋 Starting Manifest Validation...\n');

    if (!this.load()) {
      return false;
    }

    this.validateStructure();
    this.validateMetadata();
    this.validateComponents();
    this.validateResources();
    this.validatePagination();
    this.validateFiles();
    this.validateStats();
    this.validateConsistency();

    return this.report();
  }

  /**
   * Generate validation report
   */
  report() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION REPORT');
    console.log('='.repeat(60));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ Manifest is valid!\n');
      return true;
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ ERRORS (${this.errors.length}):`);
      this.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS (${this.warnings.length}):`);
      this.warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');

    return this.errors.length === 0;
  }
}

// Run validator if executed directly
if (require.main === module) {
  const validator = new ManifestValidator(MANIFEST_PATH);
  const isValid = validator.validate();
  process.exit(isValid ? 0 : 1);
}

module.exports = ManifestValidator;
