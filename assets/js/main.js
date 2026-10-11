// Renders the CV from cv-data.js and adds light interactivity (scroll reveal, active nav link).
(function () {
    const data = window.CV_DATA;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const $ = (id) => document.getElementById(id);

    const escapeHtml = (s) =>
        String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

    // null / undefined values render as a visible "???" placeholder.
    const val = (v) => (v == null ? '<span class="unknown" title="Not filled in yet">???</span>' : escapeHtml(v));

    const { profile, links } = data;

    const icon = (name) =>
        `<svg class="icon" aria-hidden="true"><use href="assets/img/icons.svg#i-${name}"></use></svg>`;

    /* Hero */
    $('name').textContent = profile.name;
    $('title').textContent = profile.title;
    $('tagline').textContent = profile.tagline;
    $('heroGithub').href = links.github;
    $('printCv').addEventListener('click', () => window.print());

    /* About */
    $('aboutText').innerHTML = profile.about.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
    $('facts').innerHTML = [
        ['briefcase', 'Role', profile.title],
        ['building', 'Company', profile.company],
        ['map-pin', 'Location', profile.location],
    ]
        .map(([i, k, v]) => `<div><dt>${icon(i)}${k}</dt><dd>${val(v)}</dd></div>`)
        .join('');

    /* Skills */
    $('skillList').innerHTML = data.skills
        .map(
            (g) => `
            <div class="skill-group">
                <h3>${escapeHtml(g.group)}</h3>
                <ul class="chips">${g.items.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
            </div>`
        )
        .join('');

    /* Experience */
    $('experienceList').innerHTML = data.experience
        .map(
            (e) => `
            <li class="entry">
                <div class="entry__head">
                    <h3>${val(e.role)} <span class="entry__org">· ${val(e.org)}</span></h3>
                    <span class="entry__period">${val(e.period)}</span>
                </div>
                <ul>${e.details.map((d) => `<li>${val(d)}</li>`).join('')}</ul>
                ${e.tech ? `<ul class="chips">${e.tech.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>` : ''}
            </li>`
        )
        .join('');

    /* Projects */
    $('projectList').innerHTML = data.projects
        .map(
            (p) => `
            <a class="card project" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">
                <div class="project__head">
                    <h3>${escapeHtml(p.name)}</h3>
                    <span class="project__ext" title="Opens in a new tab">${icon('external')}</span>
                </div>
                <p>${escapeHtml(p.description)}</p>
                <ul class="chips">${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
            </a>`
        )
        .join('');

    /* Education */
    $('educationList').innerHTML = data.education
        .map(
            (e) => `
            <li class="entry">
                <div class="entry__head">
                    <h3>${val(e.title)} <span class="entry__org">· ${val(e.org)}</span></h3>
                    <span class="entry__period">${val(e.period)}</span>
                </div>
            </li>`
        )
        .join('');

    /* Contact */
    $('contactLinks').innerHTML = `
        <a class="btn" href="mailto:${escapeHtml(links.email)}">${icon('mail')} Email</a>
        <a class="btn btn--outline" href="${escapeHtml(links.github)}" target="_blank" rel="noopener">${icon('code')} GitHub</a>
        <a class="btn btn--outline" href="${escapeHtml(links.linkedin)}" target="_blank" rel="noopener">${icon('link')} LinkedIn</a>`;

    /* Reveal sections on scroll */
    const sections = document.querySelectorAll('.section');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        sections.forEach((s) => s.classList.add('is-visible'));
    } else {
        document.documentElement.classList.add('js-reveal');
        const reveal = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    reveal.unobserve(entry.target);
                }),
            { threshold: 0.1 }
        );
        sections.forEach((s) => reveal.observe(s));
    }

    /* Highlight the current section in the nav */
    const navLinks = [...document.querySelectorAll('.nav__menu a[href^="#"]')];
    const current = new IntersectionObserver(
        (entries) =>
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => a.classList.toggle('is-active', a.hash === `#${entry.target.id}`));
            }),
        { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach((a) => {
        const section = document.querySelector(a.hash);
        if (section) current.observe(section);
    });
})();
