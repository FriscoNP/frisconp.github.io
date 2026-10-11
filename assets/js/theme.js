// Shared by every page: applies the day/night theme before first paint and wires up the HUD.
(function () {
    const store = {
        get(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                /* storage unavailable: setting just won't persist */
            }
        },
    };
    window.pxStore = store;

    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = store.get('theme');
    root.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('themeToggle');

        const syncTheme = () => {
            const dark = root.dataset.theme === 'dark';
            if (themeToggle) themeToggle.setAttribute('aria-pressed', String(dark));
        };
        syncTheme();

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                store.set('theme', root.dataset.theme);
                syncTheme();
                document.dispatchEvent(new CustomEvent('themechange'));
            });
        }

        const menuToggle = document.getElementById('menuToggle');
        const menu = document.getElementById('navMenu');
        if (menuToggle && menu) {
            const setOpen = (open) => {
                menu.classList.toggle('is-open', open);
                menuToggle.setAttribute('aria-expanded', String(open));
            };
            menuToggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
            menu.addEventListener('click', (e) => {
                if (e.target.closest('a')) setOpen(false);
            });
        }
    });
})();
