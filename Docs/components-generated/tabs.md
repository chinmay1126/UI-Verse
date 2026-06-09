# tabs.md

# Tabs Component

Component ID: tabs

- Path: tabs.html
- Version: 0.1.0
- Documentation score: 95/100
- Tags: tabs, navigation, ui, dashboard
- Description: Interactive tab layouts for dashboards, settings pages, and content switching.

## Assets

- CSS: css/main.css, tabs.css, https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css
- JS: tabs.js

## Headings

- H1: Tabs Components
- H2: Dashboard Tabs
- H2: Settings Tabs
- H2: Profile Tabs

## Usage Snippet

```html
<main class="main-home">

<div class="tabs-wrapper">

  <div class="tabs-nav">

    <button class="tab-btn active">
      Overview
    </button>

    <button class="tab-btn">
      Analytics
    </button>

    <button class="tab-btn">
      Reports
    </button>

  </div>

  <div class="tabs-content">

    <div class="tab-panel active">

      Dashboard Overview Content

    </div>

  </div>

</div>

</main>
```