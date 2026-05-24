import React from 'react';

export default function navbar(){
  return (
    <>
      <main className="main-home">
      
        {/* Page Hero */}
        <div className="page-hero">
          <div className="page-hero-left">
            <div className="breadcrumb">
              <a href="index.html">Home</a>
              <i className="fa-solid fa-chevron-right"></i>
              <span>Navbars</span>
            </div>
            <h1 className="page-title">Navbar Components</h1>
      <<<<<<< HEAD
            <p className="page-desc">A complete collection of navigation bar styles G�� from simple to glassmorphic, dark themed, search-enabled, and split layouts. Copy and use instantly.</p>
      =======
            <p className="page-desc">A complete collection of navigation bar styles — from simple to glassmorphic, dark themed, search-enabled, and split layouts. Copy and use instantly.</p>
      >>>>>>> upstream/main
            <div className="page-meta">
              <span className="meta-badge"><i className="fa-solid fa-layer-group"></i> 8 Components</span>
              <span className="meta-badge"><i className="fa-solid fa-code"></i> Pure CSS</span>
              <span className="meta-badge"><i className="fa-solid fa-mobile-screen"></i> Responsive</span>
            </div>
          </div>
          <div className="page-hero-right">
            <div className="hero-nav-preview">
              <div className="mini-nav">
      <<<<<<< HEAD
                <span className="mini-brand">G�� UIverse</span>
      =======
                <span className="mini-brand">⬡ UIverse</span>
      >>>>>>> upstream/main
                <div className="mini-links">
                  <span>Home</span>
                  <span>Docs</span>
                  <span className="mini-cta">Get Started</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Filter Bar */}
        <div className="filter-bar">
          <button className="filter-btn active" onclick="filterCards('all', this)">All</button>
          <button className="filter-btn" onclick="filterCards('simple', this)">Simple</button>
          <button className="filter-btn" onclick="filterCards('dark', this)">Dark</button>
          <button className="filter-btn" onclick="filterCards('glass', this)">Glass</button>
          <button className="filter-btn" onclick="filterCards('advanced', this)">Advanced</button>
          <div className="filter-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Filter navbars..." oninput="liveFilter(this.value)" />
          </div>
        </div>
      
        {/* Navbars Grid */}
        <div className="navbar-grid" id="navbarGrid">
      <<<<<<< HEAD
        {/* =========================================================
           NAVBAR 9 G�� FLOATING NAVBAR
      =======
         <!-- =========================================================
           TRANSPARENT HERO NAVBAR
      >>>>>>> upstream/main
      ========================================================= */}
      
      <div className="component-card" data-name="transparent hero navbar landing page" data-cat="glass">
      
        <div className="card-top">
      
          <span className="card-label">
            Transparent Hero Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview hero-nav-preview">
      
          <nav className="demo-hero-nav">
      
      <<<<<<< HEAD
            <span className="dnav-brand">G�� UIverse</span>
      =======
            <span className="hero-brand">
              ⬡ UIverse
            </span>
      
            <div className="hero-links">
      >>>>>>> upstream/main
      
              <a href="#">Home</a>
      
              <a href="#">Features</a>
      
              <a href="#">Pricing</a>
      
              <a href="#">Contact</a>
      
            </div>
      
            <button className="hero-nav-btn">
              Get Started
            </button>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A transparent landing-page navbar with glassmorphism and blur effects.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c18', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c18', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
      <<<<<<< HEAD
        <pre id="c9" className="code-block"><code>&lt;nav className="navbar-floating"&gt;
        &lt;span className="brand"&gt;G�� UIverse&lt;/span&gt;
      =======
        <pre id="c18" className="code-block"><code>&lt;nav className="hero-navbar"&gt;
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      >>>>>>> upstream/main
      
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;Features&lt;/a&gt;
        &lt;/div&gt;
      
        &lt;button&gt;Get Started&lt;/button&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
      <<<<<<< HEAD
           NAVBAR 10 G�� NEON NAVBAR
      =======
           DASHBOARD NAVBAR
      >>>>>>> upstream/main
      ========================================================= */}
      
      <div className="component-card" data-name="dashboard navbar admin analytics" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Dashboard Navbar
          </span>
      
          <span className="card-tag tag-popular">
            Popular
          </span>
      
        </div>
      
        <div className="nav-card-preview dashboard-preview">
      
          <nav className="demo-dashboard-nav">
      
            <div className="dashboard-left">
      
              <span className="dashboard-brand">
                ⬡ Dashboard
              </span>
      
              <div className="dashboard-search">
      
                <i className="fa-solid fa-magnifying-glass"></i>
      
                <input type="text" placeholder="Search..." />
      
              </div>
      
            </div>
      
            <div className="dashboard-right">
      
              <button className="dashboard-icon">
                <i className="fa-regular fa-bell"></i>
              </button>
      
              <button className="dashboard-icon">
                <i className="fa-regular fa-envelope"></i>
              </button>
      
              <img
                src="https://i.pravatar.cc/100?img=15"
                alt="Avatar"
              />
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A professional admin dashboard navbar with search and notification actions.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c19', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c19', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c19" className="code-block"><code>&lt;nav className="dashboard-navbar"&gt;
        &lt;span className="brand"&gt;⬡ Dashboard&lt;/span&gt;
      
        &lt;input type="text" placeholder="Search..."&gt;
      
        &lt;div className="actions"&gt;
          &lt;i className="fa-regular fa-bell"&gt;&lt;/i&gt;
          &lt;i className="fa-regular fa-envelope"&gt;&lt;/i&gt;
        &lt;/div&gt;
      &lt;/nav&gt;</code></pre>
      
      </div> 
          {/* =========================================================
           MACOS DOCK NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="macos dock navbar floating apple glass" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            MacOS Dock Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview dock-preview">
      
          <nav className="demo-dock-nav">
      
            <a href="#">
              <i className="fa-solid fa-house"></i>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-compass"></i>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-heart"></i>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-message"></i>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-user"></i>
            </a>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          An Apple-inspired floating dock navbar with magnify hover effects.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c16', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c16', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c16" className="code-block"><code>&lt;nav className="dock-navbar"&gt;
        &lt;a href="#"&gt;&lt;i className="fa-solid fa-house"&gt;&lt;/i&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;i className="fa-solid fa-heart"&gt;&lt;/i&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;i className="fa-solid fa-user"&gt;&lt;/i&gt;&lt;/a&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
           MEGA MENU NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="mega menu navbar enterprise dropdown" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Mega Menu Navbar
          </span>
      
          <span className="card-tag tag-popular">
            Popular
          </span>
      
        </div>
      
        <div className="nav-card-preview mega-preview">
      
          <nav className="demo-mega-nav">
      
            <span className="mega-brand">
              ⬡ UIverse
            </span>
      
            <div className="mega-links">
      
              <div className="mega-item">
      
                <a href="#">
                  Components
                </a>
      
                <div className="mega-dropdown">
      
                  <div className="mega-column">
      
                    <h4>UI Elements</h4>
      
                    <a href="#">
                      Buttons
                    </a>
      
                    <a href="#">
                      Cards
                    </a>
      
                    <a href="#">
                      Inputs
                    </a>
      
                  </div>
      
                  <div className="mega-column">
      
                    <h4>Navigation</h4>
      
                    <a href="#">
                      Navbars
                    </a>
      
                    <a href="#">
                      Sidebars
                    </a>
      
                    <a href="#">
                      Menus
                    </a>
      
                  </div>
      
                  <div className="mega-column">
      
                    <h4>Advanced</h4>
      
                    <a href="#">
                      Dashboards
                    </a>
      
                    <a href="#">
                      Charts
                    </a>
      
                    <a href="#">
                      Animations
                    </a>
      
                  </div>
      
                </div>
      
              </div>
      
              <a href="#">
                Pricing
              </a>
      
              <a href="#">
                Docs
              </a>
      
            </div>
      
            <button className="mega-btn">
              Get Started
            </button>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A professional enterprise-style navbar with large mega dropdown menus.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c17', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c17', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c17" className="code-block"><code>&lt;nav className="mega-navbar"&gt;
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      
        &lt;div className="mega-menu"&gt;
          &lt;a href="#"&gt;Components&lt;/a&gt;
      
          &lt;div className="dropdown"&gt;
            &lt;a href="#"&gt;Buttons&lt;/a&gt;
            &lt;a href="#"&gt;Cards&lt;/a&gt;
            &lt;a href="#"&gt;Inputs&lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
          
          {/* =========================================================
           PROFILE DROPDOWN NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="profile dropdown navbar settings logout" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Profile Dropdown Navbar
          </span>
      
          <span className="card-tag tag-popular">
            Popular
          </span>
      
        </div>
      
        <div className="nav-card-preview">
      
          <nav className="demo-profile-nav">
      
            <span className="profile-brand">
              ⬡ UIverse
            </span>
      
            <div className="profile-menu">
      
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Avatar"
              />
      
              <div className="dropdown-menu">
      
                <a href="#">
                  <i className="fa-regular fa-user"></i>
                  Profile
                </a>
      
                <a href="#">
                  <i className="fa-solid fa-gear"></i>
                  Settings
                </a>
      
                <a href="#">
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </a>
      
              </div>
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A professional navbar with avatar dropdown and quick profile actions.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c13', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c13', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c13" className="code-block"><code>&lt;nav className="profile-navbar"&gt;
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      
        &lt;div className="profile-menu"&gt;
          &lt;img src="https://i.pravatar.cc/40?img=12" alt="Avatar"&gt;
      
          &lt;div className="dropdown-menu"&gt;
            &lt;a href="#"&gt;Profile&lt;/a&gt;
            &lt;a href="#"&gt;Settings&lt;/a&gt;
            &lt;a href="#"&gt;Logout&lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
           COMMUNITY NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="community navbar discussions tags members" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Community Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview">
      
          <nav className="demo-community-nav">
      
            <span className="community-brand">
              🌍 Community
            </span>
      
            <div className="community-links">
      
              <a href="#">Feed</a>
      
              <a href="#">Discussions</a>
      
              <a href="#">Trending</a>
      
            </div>
      
            <div className="community-meta">
      
              <span className="tag-pill">
                #frontend
              </span>
      
              <span className="tag-pill">
                #css
              </span>
      
              <span className="members-count">
                24K Members
              </span>
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A modern community-focused navbar with trending tags and member count.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c14', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c14', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c14" className="code-block"><code>&lt;nav className="community-navbar"&gt;
        &lt;span className="brand"&gt;🌍 Community&lt;/span&gt;
      
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Feed&lt;/a&gt;
          &lt;a href="#"&gt;Discussions&lt;/a&gt;
          &lt;a href="#"&gt;Trending&lt;/a&gt;
        &lt;/div&gt;
      
        &lt;span&gt;24K Members&lt;/span&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
           PARTICLE ANIMATED NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="particle animated navbar glow futuristic" data-cat="dark">
      
        <div className="card-top">
      
          <span className="card-label">
            Particle Animated Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview particle-preview">
      
          <nav className="demo-particle-nav">
      
            <div className="particles">
      
              <span></span>
              <span></span>
              <span></span>
              <span></span>
      
            </div>
      
            <span className="particle-brand">
              ✨ UIverse
            </span>
      
            <div className="particle-links">
      
              <a href="#">Home</a>
      
              <a href="#">Components</a>
      
              <a href="#">Docs</a>
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A futuristic navbar with animated floating particle effects and glow styling.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c15', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c15', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c15" className="code-block"><code>&lt;nav className="particle-navbar"&gt;
        &lt;div className="particles"&gt;
          &lt;span&gt;&lt;/span&gt;
          &lt;span&gt;&lt;/span&gt;
        &lt;/div&gt;
      
        &lt;span className="brand"&gt;✨ UIverse&lt;/span&gt;
      
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;Docs&lt;/a&gt;
        &lt;/div&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
          {/* =========================================================
           COMMAND PALETTE NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="command palette navbar search quick actions" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Command Palette Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview command-preview">
      
          <nav className="demo-command-nav">
      
            <span className="command-brand">
              ⬡ UIverse
            </span>
      
            <button className="command-palette-btn">
      
              <i className="fa-solid fa-magnifying-glass"></i>
      
              <span>
                Search components...
              </span>
      
              <kbd>⌘K</kbd>
      
            </button>
      
            <div className="command-actions">
      
              <i className="fa-regular fa-bell"></i>
      
              <i className="fa-regular fa-user"></i>
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A modern command palette navbar with quick search and action shortcuts.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c11', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c11', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c11" className="code-block"><code>&lt;nav className="command-navbar"&gt;
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      
        &lt;button className="command-btn"&gt;
          &lt;i className="fa-solid fa-magnifying-glass"&gt;&lt;/i&gt;
          &lt;span&gt;Search components...&lt;/span&gt;
          &lt;kbd&gt;⌘K&lt;/kbd&gt;
        &lt;/button&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
           CATEGORY TABS NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="category tabs navbar ui kits components" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Category Tabs Navbar
          </span>
      
          <span className="card-tag tag-popular">
            Popular
          </span>
      
        </div>
      
        <div className="nav-card-preview tabs-preview">
      
          <nav className="demo-tabs-nav">
      
            <button className="tab-link active-tab">
              Components
            </button>
      
            <button className="tab-link">
              Templates
            </button>
      
            <button className="tab-link">
              UI Kits
            </button>
      
            <button className="tab-link">
              Animations
            </button>
      
            <button className="tab-link">
              Icons
            </button>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A clean tab-style navigation system for switching between categories.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c12', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c12', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c12" className="code-block"><code>&lt;nav className="tabs-navbar"&gt;
        &lt;button className="active"&gt;Components&lt;/button&gt;
        &lt;button&gt;Templates&lt;/button&gt;
        &lt;button&gt;UI Kits&lt;/button&gt;
        &lt;button&gt;Animations&lt;/button&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
          {/* =========================================================
           MOBILE BOTTOM NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="mobile bottom navbar app navigation" data-cat="advanced">
      
        <div className="card-top">
      
          <span className="card-label">
            Mobile Bottom Navbar
          </span>
      
          <span className="card-tag tag-trending">
            Trending
          </span>
      
        </div>
      
        <div className="nav-card-preview mobile-preview">
      
          <nav className="demo-mobile-nav">
      
            <a href="#" className="active-mobile">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-compass"></i>
              <span>Explore</span>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-heart"></i>
              <span>Likes</span>
            </a>
      
            <a href="#">
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </a>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A floating mobile bottom navigation bar inspired by modern mobile apps.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c9', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c9', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c9" className="code-block"><code>&lt;nav className="mobile-bottom-nav"&gt;
        &lt;a href="#" className="active"&gt;
          &lt;i className="fa-solid fa-house"&gt;&lt;/i&gt;
          &lt;span&gt;Home&lt;/span&gt;
        &lt;/a&gt;
      
        &lt;a href="#"&gt;
          &lt;i className="fa-solid fa-compass"&gt;&lt;/i&gt;
          &lt;span&gt;Explore&lt;/span&gt;
        &lt;/a&gt;
      
        &lt;a href="#"&gt;
          &lt;i className="fa-solid fa-heart"&gt;&lt;/i&gt;
          &lt;span&gt;Likes&lt;/span&gt;
        &lt;/a&gt;
      
        &lt;a href="#"&gt;
          &lt;i className="fa-solid fa-user"&gt;&lt;/i&gt;
          &lt;span&gt;Profile&lt;/span&gt;
        &lt;/a&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
      
      {/* =========================================================
           MINIMAL STICKY NAVBAR
      ========================================================= */}
      
      <div className="component-card" data-name="minimal sticky navbar transparent modern" data-cat="simple">
      
        <div className="card-top">
      
          <span className="card-label">
            Minimal Sticky Navbar
          </span>
      
          <span className="card-tag tag-essential">
            Essential
          </span>
      
        </div>
      
        <div className="nav-card-preview sticky-preview">
      
          <nav className="demo-sticky-nav">
      
            <span className="sticky-brand">
              UIverse
            </span>
      
            <div className="sticky-links">
      
              <a href="#">Home</a>
      
              <a href="#">Work</a>
      
              <a href="#">About</a>
      
              <a href="#">Contact</a>
      
            </div>
      
          </nav>
      
        </div>
      
        <p className="card-desc">
          A clean transparent sticky navbar with elegant hover underline animations.
        </p>
      
        <div className="actions">
      
          <button className="action-btn view-btn" onclick="toggleCode('c10', this)">
            <i className="fa-solid fa-code"></i>
            View Code
          </button>
      
          <button className="action-btn copy-btn" onclick="copyCode('c10', this)">
            <i className="fa-solid fa-copy"></i>
            Copy
          </button>
      
        </div>
      
        <pre id="c10" className="code-block"><code>&lt;nav className="minimal-sticky-navbar"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
      
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;Work&lt;/a&gt;
          &lt;a href="#"&gt;About&lt;/a&gt;
          &lt;a href="#"&gt;Contact&lt;/a&gt;
        &lt;/div&gt;
      &lt;/nav&gt;</code></pre>
      
      </div>
          {/* Simple Navbar */}
          <div className="component-card" data-name="simple navbar basic" data-cat="simple">
            <div className="card-top">
              <span className="card-label">Simple Navbar</span>
              <span className="card-tag tag-essential">Essential</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-simple">
                <span className="dnav-brand">UIverse</span>
                <div className="dnav-links">
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
                </div>
              </nav>
            </div>
            <p className="card-desc">A minimal navbar with a brand name on the left and links on the right.</p>
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c1', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c1', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c1" className="code-block"><code>&lt;nav className="navbar-simple"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;About&lt;/a&gt;
          &lt;a href="#"&gt;Contact&lt;/a&gt;
        &lt;/div&gt;
      &lt;/nav&gt;
      
      .navbar-simple {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 24px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .navbar-simple .brand { font-weight: 700; font-size: 18px; }
      .navbar-simple .links a {
        margin-left: 20px;
        text-decoration: none;
        color: #555;
        font-size: 14px;
        transition: color 0.2s;
      }
      .navbar-simple .links a:hover { color: #eb6835; }</code></pre>
          </div>
      
          {/* Centered Navbar */}
          <div className="component-card" data-name="centered navbar links" data-cat="simple">
            <div className="card-top">
              <span className="card-label">Centered Navbar</span>
              <span className="card-tag tag-popular">Popular</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-center">
                <a href="#">Home</a>
                <a href="#">Features</a>
                <span className="dnav-center-brand">UIverse</span>
                <a href="#">Docs</a>
                <a href="#">Pricing</a>
              </nav>
            </div>
            <p className="card-desc">A symmetrical navbar with links flanking the brand name in the center.</p>
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c2', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c2', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c2" className="code-block"><code>&lt;nav className="navbar-center"&gt;
        &lt;a href="#"&gt;Home&lt;/a&gt;
        &lt;a href="#"&gt;Features&lt;/a&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;a href="#"&gt;Docs&lt;/a&gt;
        &lt;a href="#"&gt;Pricing&lt;/a&gt;
      &lt;/nav&gt;
      
      .navbar-center {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 28px;
        padding: 14px 24px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .navbar-center .brand { font-weight: 800; font-size: 18px; color: #eb6835; }
      .navbar-center a { text-decoration: none; color: #555; font-size: 14px; }
      .navbar-center a:hover { color: #eb6835; }</code></pre>
          </div>
      
          {/* Button Navbar */}
          <div className="component-card" data-name="button navbar login cta" data-cat="simple">
            <div className="card-top">
              <span className="card-label">Button Navbar</span>
              <span className="card-tag tag-popular">Popular</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-btn">
                <span className="dnav-brand">UIverse</span>
                <div className="dnav-links">
                  <a href="#">Features</a>
                  <a href="#">Pricing</a>
                </div>
                <div className="dnav-actions">
                  <button className="dnav-outline">Sign In</button>
                  <button className="dnav-primary">Get Started</button>
                </div>
              </nav>
            </div>
            <p className="card-desc">A full-featured navbar with brand, links, and dual action buttons.</p>
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c3', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c3', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c3" className="code-block"><code>&lt;nav className="navbar-btn"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Features&lt;/a&gt;
          &lt;a href="#"&gt;Pricing&lt;/a&gt;
        &lt;/div&gt;
        &lt;div className="actions"&gt;
          &lt;button className="outline"&gt;Sign In&lt;/button&gt;
          &lt;button className="primary"&gt;Get Started&lt;/button&gt;
        &lt;/div&gt;
      &lt;/nav&gt;
      
      .navbar-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 24px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .navbar-btn .primary {
        background: #eb6835; color: #fff;
        border: none; padding: 8px 18px;
        border-radius: 8px; cursor: pointer;
      }
      .navbar-btn .outline {
        background: transparent; color: #555;
        border: 1px solid #ddd; padding: 8px 18px;
        border-radius: 8px; cursor: pointer;
        margin-right: 8px;
      }</code></pre>
          </div>
      
          {/* Dark Navbar */}
          <div className="component-card" data-name="dark navbar theme" data-cat="dark">
            <div className="card-top">
              <span className="card-label">Dark Navbar</span>
              <span className="card-tag tag-trending">Trending</span>
            </div>
            <div className="nav-card-preview dark-preview">
              <nav className="demo-nav-dark">
      <<<<<<< HEAD
                <span className="dnav-brand" style="color:#fff;">G�� UIverse</span>
      =======
                <span className="dnav-brand" style="color:#fff;">⬡ UIverse</span>
      >>>>>>> upstream/main
                <div className="dnav-links">
                  <a href="#" style="color:#aaa;">Home</a>
                  <a href="#" style="color:#aaa;">Docs</a>
                  <a href="#" style="color:#aaa;">Blog</a>
                </div>
                <button className="dnav-primary">Launch App</button>
              </nav>
            </div>
      <<<<<<< HEAD
            <p className="card-desc">A sleek dark-themed navbar with an accent CTA button G�� great for SaaS and dev tools.</p>
      =======
            <p className="card-desc">A sleek dark-themed navbar with an accent CTA button — great for SaaS and dev tools.</p>
      >>>>>>> upstream/main
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c4', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c4', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c4" className="code-block"><code>&lt;nav className="navbar-dark"&gt;
      <<<<<<< HEAD
        &lt;span className="brand"&gt;G�� UIverse&lt;/span&gt;
      =======
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      >>>>>>> upstream/main
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;Docs&lt;/a&gt;
          &lt;a href="#"&gt;Blog&lt;/a&gt;
        &lt;/div&gt;
        &lt;button&gt;Launch App&lt;/button&gt;
      &lt;/nav&gt;
      
      .navbar-dark {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 24px;
        background: #0f0f12;
        border-bottom: 1px solid #222;
      }
      .navbar-dark .brand { color: #fff; font-weight: 700; }
      .navbar-dark .links a { color: #888; margin-left: 20px; text-decoration: none; }
      .navbar-dark .links a:hover { color: #fff; }
      .navbar-dark button {
        background: #eb6835; color: #fff;
        border: none; padding: 8px 18px;
        border-radius: 8px; cursor: pointer;
      }</code></pre>
          </div>
      
          {/* Glass Navbar */}
          <div className="component-card" data-name="glass navbar blur transparent frosted" data-cat="glass">
            <div className="card-top">
              <span className="card-label">Glass Navbar</span>
              <span className="card-tag tag-trending">Trending</span>
            </div>
            <div className="nav-card-preview glass-preview">
              <nav className="demo-nav-glass">
                <span className="dnav-brand" style="color:#fff;">UIverse</span>
                <div className="dnav-links">
                  <a href="#" style="color:rgba(255,255,255,0.75);">Home</a>
                  <a href="#" style="color:rgba(255,255,255,0.75);">About</a>
                  <a href="#" style="color:rgba(255,255,255,0.75);">Work</a>
                </div>
                <button className="dnav-glass-btn">Contact</button>
              </nav>
            </div>
      <<<<<<< HEAD
            <p className="card-desc">A frosted-glass navbar with backdrop blur G�� perfect for image or gradient hero sections.</p>
      =======
            <p className="card-desc">A frosted-glass navbar with backdrop blur — perfect for image or gradient hero sections.</p>
      >>>>>>> upstream/main
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c5', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c5', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c5" className="code-block"><code>&lt;nav className="navbar-glass"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;About&lt;/a&gt;
          &lt;a href="#"&gt;Work&lt;/a&gt;
        &lt;/div&gt;
        &lt;button&gt;Contact&lt;/button&gt;
      &lt;/nav&gt;
      
      .navbar-glass {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 24px;
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(255,255,255,0.2);
      }
      .navbar-glass .brand { color: #fff; font-weight: 700; }
      .navbar-glass .links a { color: rgba(255,255,255,0.8); margin-left: 18px; text-decoration: none; }
      .navbar-glass button {
        background: rgba(255,255,255,0.2);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.35);
        padding: 7px 18px;
        border-radius: 8px;
        cursor: pointer;
        backdrop-filter: blur(6px);
      }</code></pre>
          </div>
      
          {/* Search Navbar */}
          <div className="component-card" data-name="search navbar input bar" data-cat="advanced">
            <div className="card-top">
              <span className="card-label">Search Navbar</span>
              <span className="card-tag tag-popular">Popular</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-search">
                <span className="dnav-brand">UIverse</span>
                <div className="dnav-search-group">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search docs..." />
                </div>
      <<<<<<< HEAD
                <a className="dnav-primary-link" href="#">Get Started G��</a>
              </nav>
            </div>
            <p className="card-desc">A navbar with an integrated search input G�� ideal for documentation or component libraries.</p>
      =======
                <a className="dnav-primary-link" href="#">Get Started →</a>
              </nav>
            </div>
            <p className="card-desc">A navbar with an integrated search input — ideal for documentation or component libraries.</p>
      >>>>>>> upstream/main
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c6', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c6', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c6" className="code-block"><code>&lt;nav className="navbar-search"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;div className="search-group"&gt;
          &lt;i className="fa-solid fa-magnifying-glass"&gt;&lt;/i&gt;
          &lt;input type="text" placeholder="Search docs..."&gt;
        &lt;/div&gt;
      <<<<<<< HEAD
        &lt;a href="#"&gt;Get Started G��&lt;/a&gt;
      =======
        &lt;a href="#"&gt;Get Started →&lt;/a&gt;
      >>>>>>> upstream/main
      &lt;/nav&gt;
      
      .navbar-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .navbar-search .search-group {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 8px 14px;
        flex: 0 1 280px;
      }
      .navbar-search .search-group input {
        border: none; outline: none; background: transparent; font-size: 14px;
      }</code></pre>
          </div>
      
          {/* Split Navbar */}
          <div className="component-card" data-name="split navbar three column utility" data-cat="advanced">
            <div className="card-top">
              <span className="card-label">Split Navbar</span>
              <span className="card-tag tag-trending">Trending</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-split">
                <span className="dnav-brand">UIverse</span>
                <div className="dnav-links">
                  <a href="#">Dashboard</a>
                  <a href="#">Projects</a>
                  <a href="#">Settings</a>
                </div>
                <div className="dnav-meta">
                  <a href="#">Help</a>
                  <span className="dnav-badge">New</span>
                </div>
              </nav>
            </div>
      <<<<<<< HEAD
            <p className="card-desc">A three-section navbar G�� brand left, main links center, utility links right.</p>
      =======
            <p className="card-desc">A three-section navbar — brand left, main links center, utility links right.</p>
      >>>>>>> upstream/main
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c7', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c7', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c7" className="code-block"><code>&lt;nav className="navbar-split"&gt;
        &lt;span className="brand"&gt;UIverse&lt;/span&gt;
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Dashboard&lt;/a&gt;
          &lt;a href="#"&gt;Projects&lt;/a&gt;
        &lt;/div&gt;
        &lt;div className="meta"&gt;
          &lt;a href="#"&gt;Help&lt;/a&gt;
          &lt;span className="badge"&gt;New&lt;/span&gt;
        &lt;/div&gt;
      &lt;/nav&gt;
      
      .navbar-split {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: #fff;
        border-bottom: 1px solid #ebebeb;
      }
      .navbar-split .links { display: flex; gap: 20px; }
      .navbar-split .meta { display: flex; align-items: center; gap: 12px; }
      .navbar-split .badge {
        background: rgba(235,104,53,0.1);
        color: #eb6835;
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
      }</code></pre>
          </div>
      
          {/* Gradient Navbar */}
          <div className="component-card" data-name="gradient navbar colorful dark" data-cat="dark">
            <div className="card-top">
              <span className="card-label">Gradient Navbar</span>
              <span className="card-tag tag-trending">Trending</span>
            </div>
            <div className="nav-card-preview">
              <nav className="demo-nav-gradient">
      <<<<<<< HEAD
                <span className="dnav-brand" style="color:#fff;">G�� UIverse</span>
      =======
                <span className="dnav-brand" style="color:#fff;">⬡ UIverse</span>
      >>>>>>> upstream/main
                <div className="dnav-links">
                  <a href="#" style="color:rgba(255,255,255,0.8);">Home</a>
                  <a href="#" style="color:rgba(255,255,255,0.8);">Work</a>
                  <a href="#" style="color:rgba(255,255,255,0.8);">Blog</a>
                </div>
                <button className="dnav-white-btn">Sign Up Free</button>
              </nav>
            </div>
      <<<<<<< HEAD
            <p className="card-desc">A bold gradient navbar G�� eye-catching and modern for landing pages.</p>
      =======
            <p className="card-desc">A bold gradient navbar — eye-catching and modern for landing pages.</p>
      >>>>>>> upstream/main
            <div className="actions">
              <button className="action-btn view-btn" onclick="toggleCode('c8', this)"><i className="fa-solid fa-code"></i> View Code</button>
              <button className="action-btn copy-btn" onclick="copyCode('c8', this)"><i className="fa-solid fa-copy"></i> Copy</button>
            </div>
            <pre id="c8" className="code-block"><code>&lt;nav className="navbar-gradient"&gt;
      <<<<<<< HEAD
        &lt;span className="brand"&gt;G�� UIverse&lt;/span&gt;
      =======
        &lt;span className="brand"&gt;⬡ UIverse&lt;/span&gt;
      >>>>>>> upstream/main
        &lt;div className="links"&gt;
          &lt;a href="#"&gt;Home&lt;/a&gt;
          &lt;a href="#"&gt;Work&lt;/a&gt;
          &lt;a href="#"&gt;Blog&lt;/a&gt;
        &lt;/div&gt;
        &lt;button&gt;Sign Up Free&lt;/button&gt;
      &lt;/nav&gt;
      
      .navbar-gradient {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 24px;
        background: linear-gradient(90deg, #eb6835 0%, #6c5ce7 100%);
      }
      .navbar-gradient .brand { color: #fff; font-weight: 800; }
      .navbar-gradient .links a { color: rgba(255,255,255,0.85); margin-left: 20px; text-decoration: none; }
      .navbar-gradient button {
        background: #fff;
        color: #eb6835;
        border: none;
        padding: 8px 18px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
      }</code></pre>
          </div>
      
        </div>{/* /navbar-grid */}
      
      </main>
    </>
  );
}
