// charts.js - Logic for data visualization components

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Bar Chart
    const barChartContainer = document.getElementById('bar-chart-bars');
    if (barChartContainer) {
        const barData = [
            { label: 'Mon', value: 45 },
            { label: 'Tue', value: 75 },
            { label: 'Wed', value: 50 },
            { label: 'Thu', value: 90 },
            { label: 'Fri', value: 65 },
            { label: 'Sat', value: 100 },
            { label: 'Sun', value: 30 }
        ];

        barData.forEach((data, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'bar-wrapper';

            const bar = document.createElement('div');
            bar.className = 'bar';
            // Start at 0 for animation
            bar.style.height = '0%';
            
            // Set final height after a short delay for animation
            setTimeout(() => {
                bar.style.height = `${data.value}%`;
            }, 100 + (index * 50));

            const tooltip = document.createElement('div');
            tooltip.className = 'bar-tooltip';
            tooltip.innerText = `${data.value} users`;

            const label = document.createElement('div');
            label.className = 'bar-label';
            label.innerText = data.label;

            bar.appendChild(tooltip);
            wrapper.appendChild(bar);
            wrapper.appendChild(label);
            barChartContainer.appendChild(wrapper);
        });
    }

    // 2. Initialize Heatmap Activity Tracker
    const heatmapContainer = document.getElementById('heatmap-grid');
    if (heatmapContainer) {
        // Generate 36 random cells for the last month
        for(let i = 0; i < 36; i++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Random level 0-4
            const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
            if (level > 0) {
                cell.setAttribute('data-level', level);
            }
            
            // Tooltip for cell
            cell.title = `Activity level: ${level}`;
            heatmapContainer.appendChild(cell);
        }
    }

    // 3. SVG Line Chart Points Interactions
    const points = document.querySelectorAll('.svg-point');
    points.forEach(point => {
        point.addEventListener('mouseenter', (e) => {
            // Optional: Create a custom tooltip element floating near the mouse
            const val = e.target.getAttribute('data-value');
            // For simplicity, we just rely on the built-in title if added, or we could create a custom div.
        });
    });
});

// Helper for copy code buttons
function toggleCode(id, btn) {
    const block = document.getElementById(id);
    if (!block) return;
    const isOpen = block.classList.toggle('show');
    btn.innerHTML = isOpen
        ? '<i class="fa-solid fa-eye-slash"></i> Hide Code'
        : '<i class="fa-solid fa-code"></i> View Code';
}

let toastTimer;
function showToast() {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyCode(id, btn) {
    const codeBlock = document.getElementById(id);
    if (!codeBlock) return;
    
    // Grab the pre code text or fallback to block text
    const textToCopy = codeBlock.querySelector('code')?.innerText || codeBlock.innerText;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        btn.classList.add('copied');
        showToast();
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Global Layout Logic
document.addEventListener('DOMContentLoaded', () => {
    /* Dark Mode Toggle */
    const toggle = document.getElementById('darkModeToggle');
    if (toggle) {
        const icon = toggle.querySelector('i');
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            if (icon) icon.className = 'fa-solid fa-sun';
        }
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    /* Scroll animations */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.component-card').forEach(el => observer.observe(el));
});

/* Sidebar */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.toggle('open');
    if (backdrop) backdrop.classList.toggle('visible');
}

/* Scroll Top */
function scrollToTop() { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbar = document.getElementById('navbar');
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

