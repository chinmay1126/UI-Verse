import React from 'react';

export default function badges(){
  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-text">UIverse</span>
        </div>
      
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="index.html">
                <i className="fa-solid fa-house"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="button.html">
                <i className="fa-solid fa-hand-pointer"></i>
                <span>Buttons</span>
              </a>
            </li>
            <li>
              <a href="navbar.html">
                <i className="fa-solid fa-bars"></i>
                <span>Navbar</span>
              </a>
            </li>
            <li>
              <a href="cards.html">
                <i className="fa-solid fa-table-cells-large"></i>
                <span>Cards</span>
              </a>
            </li>
            <li>
              <a href="inputs.html">
                <i className="fa-solid fa-keyboard"></i>
                <span>Inputs</span>
              </a>
            </li>
            <li>
              <a href="contact.html">
                <i className="fa-regular fa-user"></i>
                <span>Contact Us</span>
              </a>
            </li>
            <li>
              <a href="forms.html">
                <i className="fa-brands fa-wpforms"></i>
                <span>Forms</span>
              </a>
            </li>
            <li className="active">
              <a href="badges.html">
                <i className="fa-solid fa-award"></i>
                <span>Badges</span>
              </a>
            </li>
            <li>
              <a href="loaders.html">
                <i className="fa-solid fa-award"></i>
                <span>Loaders</span>
              </a>
            </li>
            <li>
              <a href="about.html">
                <i className="fa-solid fa-award"></i>
                <span>About us</span>
              </a>
            </li>
          </ul>
        </nav>
      
        <div className="sidebar-footer">
          <a href="#" title="GitHub"><i className="fab fa-github"></i></a>
          <a href="#" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
          <a href="#" title="Twitter"><i className="fab fa-x-twitter"></i></a>
        </div>
      </aside>
      
      {/* ================= SIDEBAR BACKDROP ================= */}
      <div className="sidebar-backdrop" id="sidebarBackdrop" onclick="toggleSidebar()"></div>
      
      {/* ================= NAVBAR ================= */}
      <header className="navbar" id="navbar">
        <button className="menu-toggle" onclick="toggleSidebar()" aria-label="Toggle Menu">
          <i className="fa-solid fa-bars"></i>
        </button>
      
        <div className="logo">UIverse</div>
      
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="searchInput" placeholder="Search components..." onkeydown="handleSearch(event)" />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      
        <div className="nav-right">
          <button className="nav-btn outline-nav-btn">
            <i className="fa-solid fa-plus"></i> Add Component
          </button>
          <button className="nav-btn primary-nav-btn">
            <i className="fa-solid fa-bookmark"></i> My Collection
          </button>
          <button id="syncCollectionsBtn" className="nav-btn outline-nav-btn" title="Sync collections now">
            <i className="fa-solid fa-sync"></i>
          </button>
          <button id="darkModeToggle" className="theme-toggle" title="Toggle Theme">
            <i className="fa-solid fa-moon"></i>
          </button>
        </div>
      </header>
      
      <section className="badges-page">
        <h1><i className="fa-solid fa-trophy"></i> My Badges</h1>
      
        <h2><i className="fa-solid fa-medal"></i> Earned Badges</h2>
        <div className="badge-container">
          
          <div className="badge">
            <picture><source type="image/avif" srcset="generated-images/badge1/badge1-320.avif 320w, generated-images/badge1/badge1-480.avif 480w, generated-images/badge1/badge1-768.avif 768w, generated-images/badge1/badge1-1024.avif 1024w, generated-images/badge1/badge1-1300.avif 1300w" sizes="(max-width: 768px) 96px, 160px"><source type="image/webp" srcset="generated-images/badge1/badge1-320.webp 320w, generated-images/badge1/badge1-480.webp 480w, generated-images/badge1/badge1-768.webp 768w, generated-images/badge1/badge1-1024.webp 1024w, generated-images/badge1/badge1-1300.webp 1300w" sizes="(max-width: 768px) 96px, 160px"><img src="generated-images/badge1/badge1-optimized-1300.jpg" alt="First PR badge icon" sizes="(max-width: 768px) 96px, 160px" loading="lazy" decoding="async" width="1300" height="1390" /></picture>
            <h3>First PR</h3>
            <p>Completed your first pull request</p>
          </div>
      
          <div className="badge">
             <picture><source type="image/avif" srcset="generated-images/badge2/badge2-212.avif 212w" sizes="(max-width: 768px) 96px, 160px"><source type="image/webp" srcset="generated-images/badge2/badge2-212.webp 212w" sizes="(max-width: 768px) 96px, 160px"><img src="generated-images/badge2/badge2-optimized-212.jpg" alt="Contributor badge icon" sizes="(max-width: 768px) 96px, 160px" loading="lazy" decoding="async" width="212" height="238" /></picture>
            <h3>Contributor</h3>
            <p>Contributed to 10 PRs</p>
          </div>
      
        </div>
      
        {/* In Progress */}
        <h2 className="prog-1">In Progress</h2>
        <div className="badge-container">
      
          <div className="badge progress">
            <picture><source type="image/avif" srcset="generated-images/time/time-320.avif 320w, generated-images/time/time-480.avif 480w, generated-images/time/time-512.avif 512w" sizes="(max-width: 768px) 96px, 160px"><source type="image/webp" srcset="generated-images/time/time-320.webp 320w, generated-images/time/time-480.webp 480w, generated-images/time/time-512.webp 512w" sizes="(max-width: 768px) 96px, 160px"><img src="generated-images/time/time-optimized-512.png" alt="Top Contributor badge with progress indicator" sizes="(max-width: 768px) 96px, 160px" loading="lazy" decoding="async" width="512" height="512" /></picture>
            <h3>Top Contributor</h3>
            <p>14/50 PRs completed</p>
            <progress value="14" max="50"></progress>
          </div>
      
        </div>
      
        {/* Earned Badges */}
      <h2>✨ Earned Badges</h2>
      <div className="badge-container">
      
        <div className="badge gold" data-collectible="badge-first-pr">
          <div className="badge-icon">
            <i className="fa-solid fa-code-pull-request"></i>
          </div>
          <h3>First PR</h3>
          <p>Completed your first pull request</p>
          <span className="badge-tag">Unlocked</span>
          <button className="collect-btn" data-action="add" aria-label="Add to collection">👉 Save</button>
        </div>
      
        <div className="badge blue">
          <div className="badge-icon">
            <i className="fa-solid fa-users"></i>
          </div>
          <h3>Contributor</h3>
          <p>Contributed to 10 PRs</p>
          <span className="badge-tag">Level 1</span>
        </div>
      
        <div className="badge purple">
          <div className="badge-icon">
            <i className="fa-solid fa-fire"></i>
          </div>
          <h3>Streak Master</h3>
          <p>Maintained a 30-day coding streak</p>
          <span className="badge-tag">Hot</span>
        </div>
      
        <div className="badge green">
          <div className="badge-icon">
            <i className="fa-solid fa-bug-slash"></i>
          </div>
          <h3>Bug Hunter</h3>
          <p>Resolved 25 reported issues</p>
          <span className="badge-tag">Expert</span>
        </div>
      
        <div className="badge orange">
          <div className="badge-icon">
            <i className="fa-solid fa-medal"></i>
          </div>
          <h3>Open Source Hero</h3>
          <p>Made impactful open-source contributions</p>
          <span className="badge-tag">Popular</span>
        </div>
      
      </div>
      
      
      {/* In Progress */}
      <h2 className="prog-1">🚀 In Progress</h2>
      <div className="badge-container">
      
        <div className="badge progress">
          <div className="badge-icon">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h3>Top Contributor</h3>
          <p>14/50 PRs completed</p>
          <progress value="14" max="50"></progress>
        </div>
      
        <div className="badge progress">
          <div className="badge-icon">
            <i className="fa-solid fa-terminal"></i>
          </div>
          <h3>Code Wizard</h3>
          <p>40/100 coding challenges solved</p>
          <progress value="40" max="100"></progress>
        </div>
      
      </div>
      
      
      {/* Locked Badges */}
      <h2 className="prog-2">🔒 Locked Badges</h2>
      <div className="badge-container">
      
        <div className="badge locked">
          <div className="badge-icon">
            <i className="fa-solid fa-crown"></i>
          </div>
          <h3>Elite Hacker</h3>
          <p>Complete 100 PRs</p>
        </div>
      
        <div className="badge locked">
          <div className="badge-icon">
            <i className="fa-solid fa-rocket"></i>
          </div>
          <h3>Launch Legend</h3>
          <p>Deploy 50 successful projects</p>
        </div>
      
        <div className="badge locked">
          <div className="badge-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3>Security Master</h3>
          <p>Fix 100 security vulnerabilities</p>
        </div>
      
      </div>
      
        {/* Locked Badges */}
        <h2 className="prog-2">Locked Badges</h2>
        <div className="badge-container">
      
          <div className="badge locked">
            <picture><source type="image/avif" srcset="generated-images/lock/lock-320.avif 320w, generated-images/lock/lock-480.avif 480w, generated-images/lock/lock-612.avif 612w" sizes="(max-width: 768px) 96px, 160px"><source type="image/webp" srcset="generated-images/lock/lock-320.webp 320w, generated-images/lock/lock-480.webp 480w, generated-images/lock/lock-612.webp 612w" sizes="(max-width: 768px) 96px, 160px"><img src="generated-images/lock/lock-optimized-612.jpg" alt="Elite Hacker locked badge icon" sizes="(max-width: 768px) 96px, 160px" loading="lazy" decoding="async" width="612" height="612" /></picture>
            <h3>Elite Hacker</h3>
            <p>Complete 100 PRs</p>
          </div>
      
        </div>
      
      </section>
      
        {/* UIverse Modular Scripts */}
        <script src="js/core/utils.js"></script>
        <script src="js/features/toast.js"></script>
        <script src="js/features/popup.js"></script>
        <script src="js/features/code-tools.js"></script>
        <script src="js/features/sidebar.js"></script>
        <script src="js/features/search.js"></script>
        <script src="js/features/theme.js"></script>
        <script src="js/features/scroll.js"></script>
        <script src="js/features/alerts.js"></script>
        <script src="js/features/sandbox.js"></script>
        <script src="js/features/accessibility.js"></script>
      <script src="js/bootstrap.js"></script>
      
        {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
      
          <div className="footer-col brand">
            <h2 className="footer-logo"><i className="fa-solid fa-cube"></i> UIverse</h2>
            <p>Build modern, reusable UI components with clean HTML, CSS, and JavaScript.</p>
            <div className="socials">
              <a href="#" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" title="Twitter"><i className="fab fa-x-twitter"></i></a>
            </div>
          </div>
      
          <div className="footer-col">
            <h3>Explore</h3>
            <ul>
              <li><a href="button.html">Buttons</a></li>
              <li><a href="navbar.html">Navbars</a></li>
              <li><a href="cards.html">Cards</a></li>
              <li><a href="inputs.html">Inputs</a></li>
              <li><a href="forms.html">Forms</a></li>
            </ul>
          </div>
      
          <div className="footer-col">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Contribute</a></li>
              <li><a href="#">GitHub Repo</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
      
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="privacypolicy.html">Privacy Policy</a></li>
              <li><a href="terms.html">Terms of Service</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </div>
      
          <div className="footer-col newsletter">
            <h3>Stay Updated</h3>
            <p>Get notified when new components drop.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" />
              <button type="button" onclick="subscribe()">Subscribe</button>
            </div>
          </div>
      
        </div>
      
        <div className="footer-bottom">
          <p>© 2026 UIverse. Made with ❤️ for developers worldwide.</p>
        </div>
      </footer>
      
      {/* ================= COMMAND PALETTE ================= */}
      <div id="commandPaletteOverlay" className="command-palette-overlay">
        <div className="command-palette-container">
          <div className="command-palette-input-wrapper">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              id="commandPaletteInput" 
              className="command-palette-input" 
              placeholder="Search components... (Cmd+K)"
              autocomplete="off"
            />
          </div>
          <ul id="commandPaletteResults" className="command-palette-results"></ul>
          <div className="command-palette-footer">
            <div className="command-palette-footer-item">
              <span className="command-palette-footer-kbd">↑↓</span>
              <span>Navigate</span>
            </div>
            <div className="command-palette-footer-item">
              <span className="command-palette-footer-kbd">⏎</span>
              <span>Select</span>
            </div>
            <div className="command-palette-footer-item">
              <span className="command-palette-footer-kbd">Esc</span>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
