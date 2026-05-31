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

  function getTransitiveDependencies(name, names = getRegisteredNames()) {
    const graph = buildGraph(names);
    const start = normalizeName(name);
    const dependencies = new Set();
    const visiting = new Set();

    function walk(node) {
      if (visiting.has(node)) return;
      visiting.add(node);

      (graph[node] || []).forEach((dependency) => {
        if (!dependencies.has(dependency)) {
          dependencies.add(dependency);
          walk(dependency);
        }
      });

      visiting.delete(node);
    }

    if (graph[start]) {
      walk(start);
    }

    dependencies.delete(start);
    return Array.from(dependencies).sort();
  }

  function detectCycles(names = getRegisteredNames()) {
    const graph = buildGraph(names);
    const visited = new Set();
    const stack = new Set();
    const cycles = [];

    function visit(node, trail = []) {
      if (stack.has(node)) {
        const cycleStart = trail.indexOf(node);
        if (cycleStart !== -1) {
          cycles.push(trail.slice(cycleStart).concat(node));
        }
        return;
      }

      if (visited.has(node)) return;

      visited.add(node);
      stack.add(node);

      (graph[node] || []).forEach((dependency) => {
        visit(dependency, trail.concat(node));
      });

      stack.delete(node);
    }

    names.forEach((name) => visit(name));

    const unique = [];
    const seen = new Set();
    cycles.forEach((cycle) => {
      const key = cycle.slice().sort().join('>');
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(cycle);
      }
    });

    return unique;
  }

  function getGraphVisualization(names = getRegisteredNames()) {
    const graph = buildGraph(names);
    return names.map((name) => ({
      name,
      dependencies: graph[name] || [],
      transitiveDependencies: getTransitiveDependencies(name, names),
      dependents: getDependents(name).filter((dependent) => names.includes(dependent))
    }));
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
    const transitive = [];

    names.forEach((name) => {
      const directDependencies = getDependencies(name);
      directDependencies.forEach((dependency) => {
        if (!names.includes(dependency)) {
          missing.push({ module: name, dependency });
        }
      });

      const transitiveDependencies = getTransitiveDependencies(name, names);
      transitiveDependencies.forEach((dependency) => {
        if (!directDependencies.includes(dependency) && names.includes(dependency)) {
          transitive.push({ module: name, dependency });
        }
      });
    });

    detectCycles(names).forEach((cycle) => {
      circular.push(`Circular dependency detected: ${cycle.join(' → ')}`);
    });

    return {
      valid: missing.length === 0 && circular.length === 0,
      missing,
      transitive,
      circular,
      graph,
      visualization: getGraphVisualization(names)
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
    getTransitiveDependencies,
    detectCycles,
    getGraphVisualization,
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