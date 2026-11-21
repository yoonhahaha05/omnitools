#!/usr/bin/env python3
"""Build Korean, Spanish, Portuguese, German, and French pages.

English URLs stay as they are. A language page is the English path plus
/{ko|es|pt|de|fr}. Files live under lang/{code}/ and Cloudflare rewrites
the public URL onto them, so tools/word-counter.html is never turned into
a folder.
"""

import html
import json
import re
import shutil
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from i18n_glossary import LANGS, glossary  # noqa: E402

BASE = "https://getomnitools.com"
HTML_LANG = {"ko": "ko", "es": "es", "pt": "pt-BR", "de": "de", "fr": "fr"}
HREFLANG = {"en": "en", "ko": "ko", "es": "es", "pt": "pt-BR", "de": "de", "fr": "fr"}
LABELS = {
    "en": "English",
    "ko": "한국어",
    "es": "Español",
    "pt": "Português",
    "de": "Deutsch",
    "fr": "Français",
}
GOOGLE = {"ko": "ko", "es": "es", "pt": "pt", "de": "de", "fr": "fr"}
DELIM = "\n\n§§§\n\n"
CACHE_DIR = ROOT / "i18n" / "cache"
SKIP_JSON_KEYS = {
    "@context", "@type", "price", "priceCurrency", "operatingSystem",
    "applicationCategory", "browserRequirements", "query-input",
}
SCRIPT_LITERALS = (
    "Favorite",
    "Favorited",
    "Link copied to clipboard",
    "Embed code copied to clipboard",
)
META_NAMES = {
    "description", "keywords", "og:title", "og:description", "og:image:alt", "twitter:title", "twitter:description",
}

GLOSSARY = glossary()


def norm(value):
    return re.sub(r"\s+", " ", html.unescape(value or "")).strip()


def should_translate(value):
    if not value or len(value) < 2:
        return False
    if not re.search(r"[A-Za-z]", value):
        return False
    if value.startswith(("http://", "https://", "mailto:")):
        return False
    if " " not in value and re.fullmatch(r"[A-Za-z0-9_.:/#\\+-]{1,48}", value):
        return False
    return True


def protect(text):
    saved = []

    def take(match):
        saved.append(match.group(0))
        return f"ZXQ{len(saved) - 1}QXZ"

    text = text.replace("OmniTools", "OMNITOOLS")
    text = re.sub(r"https?://[^\s<>'\"]+", take, text)
    text = re.sub(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", take, text)
    return text, saved


def restore(text, saved):
    for index, value in enumerate(saved):
        text = text.replace(f"ZXQ{index}QXZ", value)
    text = text.replace("OMNITOUTILS", "OmniTools")
    text = text.replace("OMNITOOLS", "OmniTools")
    text = text.replace("옴니툴즈", "OmniTools")
    return text


def google_translate(payload, lang):
    query = urllib.parse.quote(payload)
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=en&tl={GOOGLE[lang]}&dt=t&q={query}"
    )
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request, timeout=40) as response:
        data = json.loads(response.read().decode("utf-8"))
    return "".join(part[0] for part in data[0] if part and part[0])


def translate_many(strings, lang):
    if not strings:
        return []
    protected = []
    vaults = []
    for item in strings:
        text, saved = protect(item)
        protected.append(text)
        vaults.append(saved)
    try:
        translated = google_translate(DELIM.join(protected), lang)
    except Exception:
        if len(strings) == 1:
            return [strings[0]]
        mid = len(strings) // 2
        return translate_many(strings[:mid], lang) + translate_many(strings[mid:], lang)
    parts = [part.strip() for part in translated.split("§§§")]
    if len(parts) != len(strings):
        if len(strings) == 1:
            return [restore(translated.strip(), vaults[0])]
        mid = len(strings) // 2
        return translate_many(strings[:mid], lang) + translate_many(strings[mid:], lang)
    return [restore(part, saved) for part, saved in zip(parts, vaults)]


def load_cache(lang):
    path = CACHE_DIR / f"{lang}.json"
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return {}


def save_cache(lang, table):
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    (CACHE_DIR / f"{lang}.json").write_text(
        json.dumps(table, ensure_ascii=False, indent=0),
        encoding="utf-8",
    )


def source_files():
    files = [ROOT / "index.html"]
    files += sorted((ROOT / "categories").glob("*.html"))
    files += sorted(p for p in (ROOT / "tools").glob("*.html") if p.name != "clipboard.html")
    files += sorted((ROOT / "pages").glob("*.html"))
    return files


def tool_ids():
    return {p.stem for p in (ROOT / "tools").glob("*.html") if p.name != "clipboard.html"}


def mask_blocks(text):
    pattern = re.compile(r"(?is)(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>|<pre\b[^>]*>.*?</pre>)")
    blocks = []

    def hold(match):
        blocks.append(match.group(0))
        return f"__OMNI_BLOCK_{len(blocks) - 1}__"

    return pattern.sub(hold, text), blocks


def unmask(text, blocks):
    for index, block in enumerate(blocks):
        text = text.replace(f"__OMNI_BLOCK_{index}__", block)
    return text


def walk_json_strings(node, found):
    if isinstance(node, dict):
        for key, value in node.items():
            if key in SKIP_JSON_KEYS or key in {"url", "item", "target"}:
                continue
            walk_json_strings(value, found)
    elif isinstance(node, list):
        for value in node:
            walk_json_strings(value, found)
    elif isinstance(node, str):
        value = norm(node)
        if should_translate(value):
            found.add(value)


def collect_strings():
    found = set(GLOSSARY["ko"])
    for path in source_files():
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'(?is)<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', text):
            try:
                walk_json_strings(json.loads(match.group(1)), found)
            except json.JSONDecodeError:
                pass
        masked, _blocks = mask_blocks(text)
        for part in re.split(r"<[^>]+>", masked):
            value = norm(part)
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r"(?i)<meta\b[^>]*>", masked):
            tag = match.group(0)
            name = re.search(r'(?i)(?:name|property)\s*=\s*"([^"]*)"', tag)
            content = re.search(r'(?i)content\s*=\s*"([^"]*)"', tag)
            if not name or not content or name.group(1).lower() not in META_NAMES:
                continue
            value = norm(content.group(1))
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r'(?i)\b(?:placeholder|title|alt|aria-label)\s*=\s*"([^"]*)"', masked):
            value = norm(match.group(1))
            if should_translate(value):
                found.add(value)
    for path in (ROOT / "js" / "tools").glob("*.js"):
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'(?m)^\s*(?:title|description|badge):\s*"([^"]*)"', text):
            value = norm(match.group(1))
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r'(?:overview|q|a):\s*"([^"]*)"', text):
            value = norm(match.group(1))
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r'placeholder="([^"]*)"', text):
            value = norm(match.group(1))
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r">([^<>${}][^<>]{1,160})<", text):
            value = norm(match.group(1))
            if should_translate(value):
                found.add(value)
        for match in re.finditer(r'"([^"\\]{12,700})"', text):
            value = norm(match.group(1))
            if " " in value and "<" not in value and should_translate(value):
                found.add(value)
    app = (ROOT / "js" / "app.js").read_text(encoding="utf-8")
    for match in re.finditer(r"(?:omniHtml|\.t)\('([^']*)'\)", app):
        value = norm(match.group(1))
        if should_translate(value):
            found.add(value)
    return found


def chunks(items, limit=2800):
    batch = []
    size = 0
    for item in items:
        extra = len(item) + len(DELIM)
        if batch and size + extra > limit:
            yield batch
            batch = []
            size = 0
        batch.append(item)
        size += extra
    if batch:
        yield batch


def fill_caches(strings):
    pending = {}
    for lang in LANGS:
        table = load_cache(lang)
        missing = [item for item in strings if item not in GLOSSARY[lang] and item not in table]
        pending[lang] = (table, missing)
        print(f"{lang}: {len(missing)} strings to translate, {len(table)} cached")
    jobs = []
    for lang, (table, missing) in pending.items():
        for batch in chunks(missing):
            jobs.append((lang, batch))
    if not jobs:
        return {lang: pending[lang][0] for lang in LANGS}

    done = {lang: 0 for lang in LANGS}
    total = {lang: len(pending[lang][1]) for lang in LANGS}

    def work(job):
        lang, batch = job
        translated = translate_many(batch, lang)
        return lang, batch, translated

    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(work, job) for job in jobs]
        for future in as_completed(futures):
            lang, batch, translated = future.result()
            table = pending[lang][0]
            for source, target in zip(batch, translated):
                table[source] = target or source
            done[lang] += len(batch)
            save_cache(lang, table)
            print(f"  {lang} {done[lang]}/{total[lang]}", flush=True)
    return {lang: pending[lang][0] for lang in LANGS}


def lookup(caches, lang, text):
    value = norm(text)
    if value in GLOSSARY[lang]:
        return GLOSSARY[lang][value]
    return caches[lang].get(value, value)


def lang_url(english_url, lang):
    path = urllib.parse.urlparse(english_url).path or "/"
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    if path == "/":
        return f"{BASE}/{lang}"
    return f"{BASE}{path}/{lang}"


def absolutize(url):
    if url.startswith(("http://", "https://", "//", "mailto:", "data:", "#", "javascript:")):
        return None
    trimmed = url
    while trimmed.startswith("../"):
        trimmed = trimmed[3:]
    if trimmed.startswith("./"):
        trimmed = trimmed[2:]
    if trimmed.startswith(("assets/", "css/", "js/", "manifest.webmanifest")):
        return "/" + trimmed
    return None


def localize_path(path, lang, ids):
    query = ""
    if "?" in path:
        path, query = path.split("?", 1)
        query = "?" + query
    bare = path[:-5] if path.endswith(".html") else path
    if bare in ("", "/"):
        return f"/{lang}{query}"
    match = re.fullmatch(r"/tools/([a-z0-9-]+)", bare)
    if match and match.group(1) in ids:
        return f"/tools/{match.group(1)}/{lang}{query}"
    match = re.fullmatch(r"/categories/([a-z0-9-]+)", bare)
    if match:
        return f"/categories/{match.group(1)}/{lang}{query}"
    match = re.fullmatch(r"/pages/(about|contact|privacy|terms)", bare)
    if match:
        return f"/pages/{match.group(1)}/{lang}{query}"
    return None


def rewrite_url(url, lang, ids):
    asset = absolutize(url)
    if asset:
        return asset
    if url.startswith(("mailto:", "javascript:", "data:", "#")):
        return url
    absolute = url.startswith(BASE)
    path = url[len(BASE):] if absolute else url
    if not path.startswith("/"):
        return url
    localized = localize_path(path, lang, ids)
    if not localized:
        return url
    return (BASE + localized) if absolute else localized


def hreflang_block(english_url):
    lines = ["<!-- omni-hreflang -->", f'<link rel="alternate" hreflang="en" href="{english_url}">', f'<link rel="alternate" hreflang="x-default" href="{english_url}">']
    for code in LANGS:
        lines.append(f'<link rel="alternate" hreflang="{HREFLANG[code]}" href="{lang_url(english_url, code)}">')
    lines.append("<!-- /omni-hreflang -->")
    return "\n  ".join(lines)


def langbar(english_url, current):
    pieces = ['<!-- omni-langbar -->', '<div class="omni-langbar" aria-label="Language">']
    items = [("en", english_url)] + [(code, lang_url(english_url, code)) for code in LANGS]
    for code, href in items:
        current_attr = ' aria-current="page"' if code == current else ""
        pieces.append(f'<a href="{href}" hreflang="{HREFLANG[code]}"{current_attr}>{LABELS[code]}</a>')
    pieces.append("</div>")
    pieces.append("<!-- /omni-langbar -->")
    return "\n".join(pieces)


def translate_json(node, caches, lang, ids):
    if isinstance(node, dict):
        output = {}
        for key, value in node.items():
            if key in {"url", "item", "target"} and isinstance(value, str):
                output[key] = rewrite_url(value, lang, ids)
            elif key in SKIP_JSON_KEYS:
                output[key] = value
            else:
                output[key] = translate_json(value, caches, lang, ids)
        return output
    if isinstance(node, list):
        return [translate_json(value, caches, lang, ids) for value in node]
    if isinstance(node, str):
        value = norm(node)
        if should_translate(value):
            return lookup(caches, lang, value)
        return node
    return node


def rewrite_tag(tag, caches, lang, ids):
    if re.search(r'rel="canonical"', tag, re.I):
        href = re.search(r'href="([^"]*)"', tag)
        if href:
            localized = rewrite_url(href.group(1), lang, ids)
            tag = re.sub(r'href="[^"]*"', f'href="{localized}"', tag, count=1)

    def url_attr(match):
        name, url = match.group(1), match.group(2)
        return f'{name}="{rewrite_url(url, lang, ids)}"'

    tag = re.sub(r'\b(href|src)="([^"]*)"', url_attr, tag)

    def text_attr(match):
        name, value = match.group(1), match.group(2)
        translated = lookup(caches, lang, value)
        if translated == norm(value):
            return match.group(0)
        return f'{name}="{html.escape(translated, quote=True)}"'

    tag = re.sub(r'(?i)\b(placeholder|title|alt|aria-label)="([^"]*)"', text_attr, tag)
    if tag.lower().startswith("<meta"):
        name = re.search(r'(?i)(?:name|property)\s*=\s*"([^"]*)"', tag)
        if name and name.group(1).lower() in META_NAMES:
            def content_attr(match):
                value = match.group(1)
                translated = lookup(caches, lang, value)
                if translated == norm(value):
                    return match.group(0)
                return f'content="{html.escape(translated, quote=True)}"'
            tag = re.sub(r'(?i)content="([^"]*)"', content_attr, tag, count=1)
        if re.search(r'(?i)property\s*=\s*"og:url"', tag):
            href = re.search(r'(?i)content="([^"]*)"', tag)
            if href:
                tag = re.sub(r'(?i)content="[^"]*"', f'content="{rewrite_url(href.group(1), lang, ids)}"', tag, count=1)
    return tag


def rewrite_text(text, caches, lang):
    if not text.strip():
        return text
    translated = lookup(caches, lang, text)
    if translated == norm(text):
        return text
    match = re.match(r"^(\s*)(.*?)(\s*)$", text, re.S)
    return match.group(1) + html.escape(translated) + match.group(3)


def apply_translations(text, caches, lang, ids):
    masked, blocks = mask_blocks(text)
    parts = re.split(r"(<[^>]+>)", masked)
    for index, part in enumerate(parts):
        if part.startswith("<"):
            parts[index] = rewrite_tag(part, caches, lang, ids)
        else:
            parts[index] = rewrite_text(part, caches, lang)
    merged = unmask("".join(parts), blocks)

    def json_block(match):
        raw = match.group(1)
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            return match.group(0)
        translated = translate_json(data, caches, lang, ids)
        return '<script type="application/ld+json">\n' + json.dumps(translated, ensure_ascii=False, indent=2) + "\n  </script>"

    merged = re.sub(
        r'(?is)<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        json_block,
        merged,
    )

    def script_literals(match):
        block = match.group(0)
        if re.search(r"application/ld\+json", block[:120], re.I):
            return block
        for key in SCRIPT_LITERALS:
            translated = lookup(caches, lang, key)
            if translated == key:
                continue
            escaped = translated.replace("\\", "\\\\").replace("'", "\\'")
            block = block.replace(f"'{key}'", f"'{escaped}'")
        return block

    merged = re.sub(r"(?is)<script\b[^>]*>.*?</script>", script_literals, merged)

    def root_asset(match):
        name, url = match.group(1), match.group(2)
        asset = absolutize(url)
        if asset:
            return f'{name}="{asset}"'
        return match.group(0)

    merged = re.sub(r'\b(href|src)="([^"]+)"', root_asset, merged)
    return merged


def set_html_lang(text, lang):
    code = HTML_LANG[lang]

    def repl(match):
        tag = match.group(0)
        if re.search(r"\blang=", tag):
            return re.sub(r'lang="[^"]*"', f'lang="{code}"', tag)
        return tag.replace("<html", f'<html lang="{code}"', 1)

    return re.sub(r"<html\b[^>]*>", repl, text, count=1)


def insert_marked(text, start, end, block, anchor_pattern, after=True):
    marked = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if marked.search(text):
        return marked.sub(block, text, count=1)
    match = re.search(anchor_pattern, text, re.I)
    if not match:
        return text
    point = match.end() if after else match.start()
    return text[:point] + "\n" + block + "\n" + text[point:]


def runtime_scripts(lang):
    return f"""<script>window.OMNI_LANG="{lang}";</script>
<script src="/js/i18n.js"></script>
<script src="/js/i18n/{lang}.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {{
  var run = function () {{
    var arena = document.getElementById("tool-arena");
    if (arena && window.OmniI18n) window.OmniI18n.translateRoot(arena);
  }};
  run();
  setTimeout(run, 0);
}});
</script>"""


def english_url_for(path, text):
    match = re.search(r'<link rel="canonical" href="([^"]+)"', text)
    if match:
        return match.group(1)
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return BASE + "/"
    return BASE + "/" + relative[:-5]


def output_path(path, lang):
    relative = path.relative_to(ROOT)
    if relative.as_posix() == "index.html":
        return ROOT / "lang" / lang / "index.html"
    return ROOT / "lang" / lang / relative


def build_pages(caches):
    ids = tool_ids()
    lang_root = ROOT / "lang"
    if lang_root.exists():
        shutil.rmtree(lang_root)
    count = 0
    for path in source_files():
        original = path.read_text(encoding="utf-8")
        english_url = english_url_for(path, original)
        stamped = insert_marked(
            original,
            "<!-- omni-hreflang -->",
            "<!-- /omni-hreflang -->",
            hreflang_block(english_url),
            r'<link rel="canonical" href="[^"]+">',
        )
        stamped = insert_marked(
            stamped,
            "<!-- omni-langbar -->",
            "<!-- /omni-langbar -->",
            langbar(english_url, "en"),
            r"<body\b[^>]*>",
        )
        path.write_text(stamped, encoding="utf-8")
        for lang in LANGS:
            page = apply_translations(original, caches, lang, ids)
            page = set_html_lang(page, lang)
            page = insert_marked(
                page,
                "<!-- omni-hreflang -->",
                "<!-- /omni-hreflang -->",
                hreflang_block(english_url),
                r'<link rel="canonical" href="[^"]+">',
            )
            page = insert_marked(
                page,
                "<!-- omni-langbar -->",
                "<!-- /omni-langbar -->",
                langbar(english_url, lang),
                r"<body\b[^>]*>",
            )
            if "window.OMNI_LANG" not in page:
                page = page.replace("</body>", runtime_scripts(lang) + "\n</body>", 1)
            destination = output_path(path, lang)
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(page, encoding="utf-8")
            count += 1
    print(f"Wrote {count} language pages")


def collect_runtime():
    found = set(GLOSSARY["ko"])
    for path in list((ROOT / "js" / "tools").glob("*.js")) + [ROOT / "js" / "app.js", ROOT / "js" / "registry.js"]:
        text = path.read_text(encoding="utf-8")
        for match in re.finditer(r'(?m)^\s*(?:title|description|badge):\s*"([^"]*)"', text):
            found.add(norm(match.group(1)))
        for match in re.finditer(r'(?:overview|q|a):\s*"([^"]*)"', text):
            found.add(norm(match.group(1)))
        for match in re.finditer(r'placeholder="([^"]*)"', text):
            found.add(norm(match.group(1)))
        for match in re.finditer(r">([^<>${}][^<>]{1,160})<", text):
            found.add(norm(match.group(1)))
        for match in re.finditer(r'"([^"\\]{12,700})"', text):
            value = norm(match.group(1))
            if " " in value and "<" not in value:
                found.add(value)
        for match in re.finditer(r"(?:omniHtml|\.t)\('([^']*)'\)", text):
            found.add(norm(match.group(1)))
    return {item for item in found if item}


def write_phrase_files(strings, caches):
    folder = ROOT / "js" / "i18n"
    folder.mkdir(parents=True, exist_ok=True)
    for lang in LANGS:
        table = {}
        for key in strings:
            translated = lookup(caches, lang, key)
            if translated != key:
                table[key] = translated
        payload = "window.OMNI_PHRASES = " + json.dumps(table, ensure_ascii=False, separators=(",", ":")) + ";\n"
        (folder / f"{lang}.js").write_text(payload, encoding="utf-8")
        print(f"phrases {lang}: {len(table)}")


def update_sitemap():
    text = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    blocks = re.findall(r"<url>.*?</url>", text, re.S)
    urls = []
    for block in blocks:
        loc = re.search(r"<loc>(.*?)</loc>", block).group(1)
        changefreq = re.search(r"<changefreq>(.*?)</changefreq>", block)
        priority = re.search(r"<priority>(.*?)</priority>", block)
        urls.append({
            "loc": loc,
            "lastmod": date.today().isoformat(),
            "changefreq": changefreq.group(1) if changefreq else "weekly",
            "priority": priority.group(1) if priority else "0.5",
        })
    # Drop language URLs if a previous run appended them.
    urls = [item for item in urls if not re.search(r"/(ko|es|pt|de|fr)$", urllib.parse.urlparse(item["loc"]).path)]

    def alternates(english_url):
        links = [
            f'    <xhtml:link rel="alternate" hreflang="en" href="{english_url}"/>',
            f'    <xhtml:link rel="alternate" hreflang="x-default" href="{english_url}"/>',
        ]
        for code in LANGS:
            links.append(f'    <xhtml:link rel="alternate" hreflang="{HREFLANG[code]}" href="{lang_url(english_url, code)}"/>')
        return "\n".join(links)

    body = []
    for item in urls:
        body.append(
            "  <url>\n"
            f"    <loc>{item['loc']}</loc>\n"
            f"    <lastmod>{item['lastmod']}</lastmod>\n"
            f"    <changefreq>{item['changefreq']}</changefreq>\n"
            f"    <priority>{item['priority']}</priority>\n"
            f"{alternates(item['loc'])}\n"
            "  </url>"
        )
        for code in LANGS:
            body.append(
                "  <url>\n"
                f"    <loc>{lang_url(item['loc'], code)}</loc>\n"
                f"    <lastmod>{item['lastmod']}</lastmod>\n"
                f"    <changefreq>{item['changefreq']}</changefreq>\n"
                "    <priority>0.6</priority>\n"
                f"{alternates(item['loc'])}\n"
                "  </url>"
            )
    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        + "\n".join(body)
        + "\n</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    print(f"sitemap urls: {sitemap.count('<loc>')}")


def update_redirects():
    path = ROOT / "_redirects"
    text = path.read_text(encoding="utf-8")
    marker = "# Language rewrites. English URLs stay unchanged."
    if marker in text:
        text = text.split(marker)[0].rstrip() + "\n"
    rules = [
        marker,
        "/ko   /lang/ko/index.html   200",
        "/es   /lang/es/index.html   200",
        "/pt   /lang/pt/index.html   200",
        "/de   /lang/de/index.html   200",
        "/fr   /lang/fr/index.html   200",
        "/tools/:tool/:lang   /lang/:lang/tools/:tool.html   200",
        "/categories/:cat/:lang   /lang/:lang/categories/:cat.html   200",
        "/pages/:page/:lang   /lang/:lang/pages/:page.html   200",
        "",
    ]
    path.write_text(text.rstrip() + "\n\n" + "\n".join(rules), encoding="utf-8")


def update_robots():
    path = ROOT / "robots.txt"
    text = path.read_text(encoding="utf-8")
    if "Disallow: /lang/" not in text:
        text = text.replace("Allow: /\n", "Allow: /\nDisallow: /lang/\n")
        path.write_text(text, encoding="utf-8")


def main():
    started = time.time()
    print("Collecting strings...")
    strings = sorted(collect_strings())
    print(f"{len(strings)} unique strings")
    caches = fill_caches(strings)
    print("Writing pages...")
    build_pages(caches)
    write_phrase_files(collect_runtime(), caches)
    update_sitemap()
    update_redirects()
    update_robots()
    print(f"Done in {int(time.time() - started)}s")


if __name__ == "__main__":
    main()
