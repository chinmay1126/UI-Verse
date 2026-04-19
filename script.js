

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initSearch();
});


function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButton(true);
    } else {
        updateThemeButton(false);
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeButton(isDark);
    });
}

function updateThemeButton(isDark) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}


function initSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const backdrop = document.querySelector('.sidebar-backdrop');
    

    function toggleSidebar() {
        if (window.innerWidth <= 1024) {
            document.body.classList.toggle('sidebar-open');
        } else {
            const isHidden = document.body.classList.toggle('sidebar-hidden');
            localStorage.setItem('sidebarHidden', isHidden);
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (backdrop) backdrop.addEventListener('click', toggleSidebar);


    if (window.innerWidth > 1024 && localStorage.getItem('sidebarHidden') === 'true') {
        document.body.classList.add('sidebar-hidden');
    }


    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar li a').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.parentElement.classList.add('active');
        }
    });
}


function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.feature-card, .component-card');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.toLowerCase().trim();
            const routes = {
                'button': 'button.html',
                'card': 'cards.html',
                'input': 'inputs.html',
                'form': 'form.html',
                'navbar': 'navbar.html',
                'footer': 'footer.html',
                'alert': 'alerts.html',
                'badge': 'badges.html',
                'loader': 'loaders.html',
                'color': 'color.html'
            };

            for (const [key, path] of Object.entries(routes)) {
                if (query.includes(key)) {
                    window.location.href = path;
                    return;
                }
            }
        }
    });
}


function toggleCode(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('show');
}

function copyCode(id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    
    navigator.clipboard.writeText(el.innerText).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = '#10b981';
        btn.style.color = '#fff';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
}
