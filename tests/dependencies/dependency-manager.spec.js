const { test, expect } = require('@playwright/test');

test.describe('Dependency Manager', () => {
  test('registers shared module dependencies in the runtime registry', async ({ page }) => {
    await page.goto('/button.html');
    await page.waitForFunction(() => !!window.DependencyManager && !!window.UIverseBootstrap);

    await page.evaluate(() => {
      if (window.UIverseBootstrap && typeof window.UIverseBootstrap.init === 'function') {
        window.UIverseBootstrap.init();
      }
    });

    await page.waitForFunction(() => {
      const registry = window.UIverse;
      return !!registry
        && !!registry.getStatus('ComponentIndex')
        && !!registry.getStatus('ComponentDiscovery')
        && !!registry.getStatus('Theme')
        && !!registry.getStatus('CommandPalette');
    });

    const report = await page.evaluate(() => ({
      graphValid: window.DependencyManager.validateGraph().valid,
      componentIndexDeps: window.DependencyManager.getDependencies('ComponentIndex'),
      componentDiscoveryDeps: window.DependencyManager.getDependencies('ComponentDiscovery'),
      themeDeps: window.DependencyManager.getDependencies('Theme'),
      commandPaletteDeps: window.DependencyManager.getDependencies('CommandPalette'),
      componentIndexStatus: window.UIverse.getStatus('ComponentIndex'),
      componentDiscoveryStatus: window.UIverse.getStatus('ComponentDiscovery'),
      themeStatus: window.UIverse.getStatus('Theme'),
      commandPaletteStatus: window.UIverse.getStatus('CommandPalette')
    }));

    expect(report.graphValid).toBeTruthy();
    expect(report.themeDeps).toContain('DesignTokens');
    expect(report.componentIndexDeps).toContain('ComponentDiscovery');
    expect(report.componentDiscoveryDeps).toContain('ComponentVersioning');
    expect(report.commandPaletteDeps).toContain('ComponentIndex');
    expect(report.componentIndexStatus.dependencies).toContain('ComponentDiscovery');
    expect(report.componentDiscoveryStatus.dependencies).toContain('ComponentVersioning');
    expect(report.themeStatus.dependencies).toContain('DesignTokens');
    expect(report.commandPaletteStatus.dependencies).toContain('ComponentIndex');
  });
});