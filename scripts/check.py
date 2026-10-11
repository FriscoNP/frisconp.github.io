#!/usr/bin/env python3
"""Lightweight site checks: local links/assets exist, in-page anchors resolve, ids are unique.

Run from the repo root:  python3 scripts/check.py
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urldefrag, urlparse

ROOT = Path(__file__).resolve().parent.parent
PAGES = ["index.html", "posts/index.html", "404.html"]
SKIP_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript"}


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []  # (attr, value)
        self.ids = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag in ("a", "link") and a.get("href"):
            if tag == "link" and a.get("rel") in ("preconnect", "canonical"):
                return
            self.refs.append(a["href"])
        if tag in ("script", "img") and a.get("src"):
            self.refs.append(a["src"])
        if tag == "use" and (a.get("href") or a.get("xlink:href")):
            self.refs.append(a.get("href") or a.get("xlink:href"))


def resolve(page: Path, ref: str):
    url, _frag = urldefrag(ref)
    if not url:
        return page
    target = ROOT / url.lstrip("/") if url.startswith("/") else (page.parent / url)
    if target.is_dir():
        target = target / "index.html"
    return target


def main() -> int:
    errors = []
    for name in PAGES:
        page = ROOT / name
        if not page.exists():
            errors.append(f"{name}: page is missing")
            continue
        c = Collector()
        c.feed(page.read_text(encoding="utf-8"))

        dupes = {i for i in c.ids if c.ids.count(i) > 1}
        for d in sorted(dupes):
            errors.append(f"{name}: duplicate id '{d}'")

        for ref in c.refs:
            parsed = urlparse(ref)
            if parsed.scheme in SKIP_SCHEMES:
                continue
            target = resolve(page, ref)
            if not target.exists():
                errors.append(f"{name}: broken reference '{ref}'")
                continue
            _url, frag = urldefrag(ref)
            if frag and target.suffix in (".html", ".svg"):
                tc = Collector()
                tc.feed(target.read_text(encoding="utf-8"))
                # sections rendered by JS never appear in the static HTML, so only static ids are checked
                if frag not in tc.ids and frag != "top":
                    errors.append(f"{name}: anchor '#{frag}' not found in {target.relative_to(ROOT)}")

    # Icons rendered by JS (assets/js/main.js) never appear in the static HTML, so check their names here.
    sprite = ROOT / "assets/img/icons.svg"
    main_js = ROOT / "assets/js/main.js"
    if sprite.exists() and main_js.exists():
        symbols = set(re.findall(r'<symbol id="i-([a-z0-9-]+)"', sprite.read_text(encoding="utf-8")))
        src = main_js.read_text(encoding="utf-8")
        used = set(re.findall(r"icon\('([a-z0-9-]+)'\)", src)) | set(re.findall(r"\['([a-z0-9-]+)', '[A-Z]", src))
        for name in sorted(used - symbols):
            errors.append(f"assets/js/main.js: icon '{name}' is not defined in assets/img/icons.svg")

    if errors:
        print("\n".join(errors))
        print(f"\n{len(errors)} problem(s) found")
        return 1
    print(f"OK: checked {len(PAGES)} pages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
