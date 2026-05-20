import UVElement from '../../js/core/web-components-factory.js';
import ComponentRegistry from '../../js/core/component-registry.js';

const template = `
  <span class="tooltip" role="tooltip" hidden>
    <slot name="text"></slot>
  </span>
`;

const styles = `
  :host { position: relative; display: inline-block; }
  .tooltip {
    position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.85); color: white; padding: 6px 8px; border-radius: 4px; font-size: 0.85rem;
    white-space: nowrap;
  }
`;

class UVTooltip extends UVElement {
  constructor() { super({ useShadow: true, template, styles }); }

  init() {
    this.host = this;
    this.tooltip = this._root.querySelector('.tooltip');
    this.addEventListener('mouseenter', () => this.show());
    this.addEventListener('mouseleave', () => this.hide());
    this.addEventListener('focus', () => this.show());
    this.addEventListener('blur', () => this.hide());
  }

  show() { this.tooltip.hidden = false; }
  hide() { this.tooltip.hidden = true; }
}

ComponentRegistry.define('uv-tooltip', UVTooltip);
if (!window.UV) window.UV = {};
window.UV.UVTooltip = UVTooltip;

export default UVTooltip;
try { console.log('uv-tooltip module loaded'); } catch(e) {}
