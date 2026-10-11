# Copilot instructions for `frisconp.github.io`

## Project shape

- Static, professional CV / portfolio site. No build step; GitHub Pages serves the files as-is.
- `index.html` holds the page skeleton: nav, hero, about, skills, experience, projects, education, blog link and contact.
- `assets/js/cv-data.js` is the single source of truth for CV content. Edit content there, not in the HTML. `null` values render as a "???" placeholder.
- `assets/js/main.js` renders sections from `CV_DATA` and adds light interactivity (scroll reveal, active nav link).
- `assets/js/theme.js` handles light/dark mode and the mobile menu on every page.
- `assets/css/style.css` holds all styling: theme tokens on `:root` / `[data-theme="dark"]`, a reduced-motion block and a print stylesheet that outputs a plain CV.
- `posts/` is the blog.

## Commands

- `make dev` serves the site at http://localhost:8080.

## Conventions

- Plain CSS in `style.css` using the existing tokens; no Tailwind or other frameworks.
- Keep the design clean and professional: neutral palette, one accent colour, Inter font.
- Wrap `localStorage` access in try/catch (use `window.pxStore`).
- Respect `prefers-reduced-motion`.
- Use relative asset paths.
