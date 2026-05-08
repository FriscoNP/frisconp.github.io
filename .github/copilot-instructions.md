# Copilot instructions for `frisconp.github.io`

## Project shape

- This is a single-page static portfolio site.
- `index.html` is the main entrypoint and contains the full page structure and content.
- Styling is done with Tailwind via the CDN script tag in `index.html`; there is no local build pipeline.
- Static assets live under `assets/` and are referenced with relative paths.

## Commands

- No project-specific build, lint, or test scripts are defined in the repository.
- To preview changes locally, open `index.html` in a browser or serve the repo as static files, for example with `python3 -m http.server 8000`.

## Conventions

- Keep page content semantic and section-based: hero, about, tech stack, projects, learning, and footer.
- Prefer Tailwind utility classes directly in the HTML instead of adding custom CSS files.
- Preserve the simple, centered layout and the existing visual rhythm of spaced sections, light borders, and small uppercase section labels.
- Use the existing relative asset path style for images and other static files.
- Keep external links and contact links aligned with the current portfolio-focused content.
