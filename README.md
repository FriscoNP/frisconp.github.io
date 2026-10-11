# frisconp.github.io

Personal CV and portfolio of **Frisco Nirwana Putra**, Software Engineer.

Live site: <https://frisconp.github.io>

A static site with no build step, served by GitHub Pages. Plain HTML, CSS and a little JavaScript.

## Features

- Sections for about, skills, experience, projects, education, blog and contact
- All content lives in one data file, so updating the CV never touches the HTML
- Light and dark theme (follows the system setting, remembers the choice)
- Responsive layout with a mobile menu
- **Download CV** button: a print stylesheet turns the page into a plain, single-column CV you can save as PDF
- Respects `prefers-reduced-motion`; works without JavaScript for the key contact details

## Project structure

```
index.html              page skeleton
404.html                custom not-found page
posts/index.html        blog
assets/css/style.css    all styling (theme tokens, layout, print styles)
assets/js/cv-data.js    CV content: edit this to update the site
assets/js/main.js       renders the content and handles scroll effects
assets/js/theme.js      light/dark theme and mobile menu (shared by all pages)
assets/img/             profile photo and favicon
scripts/check.py        link, asset and anchor checker
.github/workflows/      CI
```

## Updating the content

Edit `assets/js/cv-data.js`: profile, skills, experience, projects and education are all defined there. Any field set to `null` shows as a `???` badge on the page so gaps are easy to spot.

## Local development

Requires Python 3 and `make`.

```sh
make dev     # serve at http://localhost:8080
make check   # check local links, assets and JS syntax
```

## Deployment

GitHub Pages serves this repository from the `main` branch (Settings → Pages → Deploy from a branch → `main` / root). `.nojekyll` tells Pages to serve the files as they are.

The CI workflow (`.github/workflows/ci.yml`) runs `make check` on every push to `main` and on every pull request.
