/**
 * UIverse Dependency Manager
 * Central registry for shared module dependencies and dependency graph checks.
 */

(function (global) {
  const DEFAULT_DEPENDENCIES = {
    DependencyManager: [],
    Security: [],
    DesignTokens: [],
    ComponentVersioning: [],
    ComponentsRegistry: ['ComponentVersioning'],
    ComponentDiscovery: ['ComponentVersioning'],
    ComponentIndex: ['ComponentDiscovery'],
    Theme: ['DesignTokens'],
    Search: ['ComponentIndex'],
    CommandPalette: ['ComponentIndex'],
    ComponentGallery: ['ComponentIndex'],
    URLStateManager: []
  };

  const customDependencies = new Map();

  function normalizeName(name) {
    return String(name || '').trim();
  }

  function normalizeDependencies(dependencies = []) {
    return Array.from(new Set((Array.isArray(dependencies) ? dependencies : [])
      .map(normalizeName)
      .filter(Boolean)));
  }

  function getDependencies(name) {
    const key = normalizeName(name);
    if (customDependencies.has(key)) {
      return customDependencies.get(key).slice();
    }

    return Array.isArray(DEFAULT_DEPENDENCIES[key]) ? DEFAULT_DEPENDENCIES[key].slice() : [];
  }

  function register(name, dependencies = []) {
    const key = normalizeName(name);
    if (!key) {
      throw new Error('Dependency name is required');
    }

    customDependencies.set(key, normalizeDependencies(dependencies));
    return getDependencies(key);
  }

  function getRegisteredNames() {
    return Array.from(new Set([
      ...Object.keys(DEFAULT_DEPENDENCIES),
      ...customDependencies.keys()
    ])).sort();
  }

  function buildGraph(names = getRegisteredNames()) {
    const graph = {};
    names.forEach((name) => {
      graph[name] = getDependencies(name).filter((dependency) => names.includes(dependency));
    });
    return graph;
  }

  function topologicalSort(names = getRegisteredNames()) {
    const graph = buildGraph(names);
    const visited = new Set();
    const visiting = new Set();
    const order = [];

    function visit(name) {
      if (visiting.has(name)) {
        throw new Error(`Circular dependency detected at '${name}'`);
      }
      if (visited.has(name)) return;

      visiting.add(name);
      (graph[name] || []).forEach(visit);
      visiting.delete(name);
      visited.add(name);
      order.push(name);
    }

    names.forEach(visit);
    return order;
  }

  function getDependents(name) {
    const target = normalizeName(name);
    return getRegisteredNames().filter((candidate) => getDependencies(candidate).includes(target));
  }

  function validateGraph(names = getRegisteredNames()) {
    const graph = buildGraph(names);
    const missing = [];
    const circular = [];

    names.forEach((name) => {
      getDependencies(name).forEach((dependency) => {
        if (!names.includes(dependency)) {
          missing.push({ module: name, dependency });
        }
      });
    });

    try {
      topologicalSort(names);
    } catch (error) {
      circular.push(error.message);
    }

    return {
      valid: missing.length === 0 && circular.length === 0,
      missing,
      circular,
      graph
    };
  }

  function describe(name) {
    return {
      name: normalizeName(name),
      dependencies: getDependencies(name),
      dependents: getDependents(name)
    };
  }

  function reset() {
    customDependencies.clear();
  }

  const DependencyManager = {
    register,
    getDependencies,
    getRegisteredNames,
    buildGraph,
    topologicalSort,
    getDependents,
    validateGraph,
    describe,
    reset
  };

  global.DependencyManager = DependencyManager;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DependencyManager;
  }
})(typeof window !== 'undefined' ? window : globalThis);