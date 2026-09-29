#!/usr/bin/env python3
"""
OmniTools - Programmatic SEO Build Engine
Extracts all 100 tools and generates:
1. 100 dedicated, semantic, pre-rendered static HTML pages (/tools/<id>.html)
2. 5 dedicated Category Hub pages (/categories/<slug>.html)
3. Rich JSON-LD Structured Data (WebApplication, CollectionPage, FAQPage, HowTo, BreadcrumbList)
4. OpenGraph and Twitter Card social preview metadata
5. Full sitemap.xml with priorities (Home 1.0, Categories 0.9, Tools 0.8, Pages 0.5)
6. Standard robots.txt
"""

import os, re, glob, json, html
from datetime import datetime
from seo_content import (
    get_tool_deep_dive,
    get_tool_use_cases,
    get_tool_cli_snippets,
    get_tool_spec_table,
    get_expanded_faqs,
    CATEGORY_GUIDES
)

BASE_URL = "https://getomnitools.com"
TOOLS_DIR = "tools"
CATEGORIES_DIR = "categories"

CATEGORIES = [
    {
        "name": "Text & Formatting",
        "slug": "text-formatting",
        "file": "js/tools/text.js",
        "icon": "type",
        "badge": "25 Utilities",
        "description": "High-speed client-side text tools for writers, programmers, and content creators. Remove whitespace, convert casing, inspect markdown, strip HTML tags, diff text, and format copy with zero data leaving your browser.",
        "h1": "Text & Formatting Utilities",
        "meta_title": "Free Online Text & Formatting Tools (100% Client-Side) | OmniTools",
        "meta_description": "Clean, format, convert, and inspect text instantly in your browser. 25 free client-side text tools including Word Counter, Diff Checker, Case Converter, and Markdown Previewer.",
        "faqs": [
            {
                "q": "Is my text data stored or sent to any remote server?",
                "a": "The text you type is not uploaded to an OmniTools server. Advertising cookies load only if you accept them."
            },
            {
                "q": "Can I use these text formatting tools without an active internet connection?",
                "a": "Yes! OmniTools is a Progressive Web App (PWA) with full offline caching. Once loaded, all text operations work seamlessly offline."
            },
            {
                "q": "Are there character or file size limits for text processing?",
                "a": "Because computation happens locally inside your browser memory, you can comfortably process documents with hundreds of thousands of words without hitting API timeouts."
            }
        ]
    },
    {
        "name": "Developer & Data",
        "slug": "developer-data",
        "file": "js/tools/dev.js",
        "icon": "code-2",
        "badge": "28 Utilities",
        "description": "Essential web developer and data manipulation utilities. Format and validate JSON, decode JWTs, convert curl requests, calculate IPv4 subnets, generate HMAC signatures, test regex, and encode Base64 without exposing confidential code to external servers.",
        "h1": "Developer & Data Processing Tools",
        "meta_title": "Free Developer & Data Tools (100% Client-Side & Private) | OmniTools",
        "meta_description": "28 fast client-side developer utilities. IPv4 subnet calculator, HMAC generator, HTTP header audit, JSON validator, JWT decoder, and cURL converter running 100% locally in browser memory.",
        "faqs": [
            {
                "q": "Can I safely inspect proprietary JSON or JWT tokens here?",
                "a": "Yes. Since OmniTools runs entirely inside your browser sandbox, sensitive tokens, environment keys, and payload secrets are never uploaded anywhere."
            },
            {
                "q": "How does OmniTools compare to online converters that require backend servers?",
                "a": "The tools run in the browser, so the payload you paste is not uploaded to an OmniTools server. Advertising cookies load only if you accept them."
            },
            {
                "q": "Can I embed these developer tools into our engineering docs or internal wikis?",
                "a": "Yes! Click the 'Embed' button on any tool to copy an iframe widget snippet you can embed directly into Notion, Confluence, or developer documentation."
            }
        ]
    },
    {
        "name": "Everyday Math & Converters",
        "slug": "everyday-math",
        "file": "js/tools/math.js",
        "icon": "calculator",
        "badge": "25 Utilities",
        "description": "Instant unit converters and everyday calculators for finance, time, science, and measurement. Calculate compound interest, tip splits, percentage changes, time zone differences, and unit metrics with zero calculation lag.",
        "h1": "Everyday Math & Unit Converters",
        "meta_title": "Free Online Math & Unit Converters (Instant & Precise) | OmniTools",
        "meta_description": "25 instant math, currency, time, and unit calculators. Calculate percentages, compound interest, tip splitting, salary conversions, and epoch timestamps with zero latency.",
        "faqs": [
            {
                "q": "Are financial calculations like compound interest rounded accurately?",
                "a": "Yes, our calculators use standard financial formulas with high-precision floating-point arithmetic for trustworthy projections."
            },
            {
                "q": "Can I convert timestamps between different time zones accurately?",
                "a": "Yes, the time zone and Unix timestamp tools use your browser's native Internationalization API (Intl) and system clock to deliver exact conversions."
            }
        ]
    },
    {
        "name": "Media, CSS & Design",
        "slug": "media-css-design",
        "file": "js/tools/media.js",
        "icon": "palette",
        "badge": "16 Utilities",
        "description": "High-performance CSS generators, color tools, and in-browser image processing utilities. Generate clip-path polygons, box shadows, gradients, and glassmorphism styling, check WCAG 2.1 color contrast, and resize or crop images directly via HTML5 Canvas.",
        "h1": "Media, CSS Generators & Design Utilities",
        "meta_title": "Free CSS Generators, Color & Media Tools (Client-Side) | OmniTools",
        "meta_description": "16 CSS and design utilities. Generate CSS clip-path polygons, box shadows, gradients, glassmorphism, QR codes, palettes, and check WCAG contrast. Crop and resize images 100% client-side.",
        "faqs": [
            {
                "q": "Do my images get uploaded to a cloud server when resizing or cropping?",
                "a": "No. Images are rendered and modified directly in your browser's HTML5 Canvas memory. Your photos never leave your device."
            },
            {
                "q": "Are the generated CSS styles compatible with modern browsers?",
                "a": "Yes, all CSS snippets are optimized for modern web standards including Flexbox, CSS Grid, CSS Variables, and cross-browser prefixes."
            }
        ]
    },
    {
        "name": "Quick Utilities & Life Tools",
        "slug": "quick-utilities",
        "file": "js/tools/quick.js",
        "icon": "zap",
        "badge": "11 Utilities",
        "description": "Everyday productivity boosters and quick system utilities. Tap tempo BPM, generate cryptographically strong passwords via Web Crypto, run Pomodoro focus cycles, inspect viewport dimensions, and test network latency.",
        "h1": "Quick Utilities & Everyday Productivity Tools",
        "meta_title": "Free Productivity & Quick Life Tools (Offline-Ready) | OmniTools",
        "meta_description": "11 handy productivity tools. Tap tempo BPM calculator, cryptographically secure password generator, Pomodoro focus timer, metronome, stopwatch, and local scratchpad.",
        "faqs": [
            {
                "q": "How secure is the Password Generator?",
                "a": "It uses the browser's cryptographic window.crypto.getRandomValues() standard, ensuring true cryptographically secure pseudorandom entropy."
            },
            {
                "q": "Where does the Scratchpad store my notes?",
                "a": "Notes are stored in your browser's local window.localStorage sandbox. They remain on your device even if you close the tab."
            }
        ]
    }
]

CATEGORY_MAP = {c["name"]: c for c in CATEGORIES}

def extract_js_string_list(text):
    if not text:
        return []
    pattern = r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\''
    matches = re.findall(pattern, text)
    res = []
    for dq, sq in matches:
        s = dq if dq else sq
        res.append(s.replace(r'\"', '"').replace(r"\'", "'").strip())
    return [x for x in res if x]

def extract_tools():
    all_tools = []
    
    for cat_meta in CATEGORIES:
        cat_name = cat_meta["name"]
        filepath = cat_meta["file"]
        content = open(filepath, encoding='utf-8').read()
        
        # Split into blocks starting with `id:`
        tool_blocks = re.split(r'\n\s*//\s*\d+\.\s*', content)
        
        for block in tool_blocks:
            id_m = re.search(r'id:\s*[\"\']([^\"\']+)[\"\']', block)
            if not id_m:
                continue
            tid = id_m.group(1)
            
            title_m = re.search(r'title:\s*[\"\']([^\"\']+)[\"\']', block)
            title = title_m.group(1) if title_m else tid
            
            cat_m = re.search(r'category:\s*[\"\']([^\"\']+)[\"\']', block)
            cat = cat_m.group(1) if cat_m else cat_name
            
            desc_m = re.search(r'description:\s*[\"\']([^\"\']+)[\"\']', block)
            desc = desc_m.group(1) if desc_m else ''
            
            icon_m = re.search(r'icon:\s*[\"\']([^\"\']+)[\"\']', block)
            icon = icon_m.group(1) if icon_m else 'sparkles'
            
            badge_m = re.search(r'badge:\s*[\"\']([^\"\']+)[\"\']', block)
            badge = badge_m.group(1) if badge_m else ''
            
            # Keywords
            kw_m = re.search(r'keywords:\s*\[(.*?)\]', block, re.DOTALL)
            keywords = []
            if kw_m:
                keywords = extract_js_string_list(kw_m.group(1))
                
            # Overview
            ov_m = re.search(r'overview:\s*[\"\'](.*?)[\"\'],\s*(?:\n\s*)?features:', block, re.DOTALL)
            overview = ov_m.group(1).replace('\\n', ' ').strip() if ov_m else desc
            
            # Features
            feat_m = re.search(r'features:\s*\[(.*?)\]', block, re.DOTALL)
            features = []
            if feat_m:
                features = extract_js_string_list(feat_m.group(1))
                
            # HowTo
            how_m = re.search(r'howTo:\s*\[(.*?)\]', block, re.DOTALL)
            howto = []
            if how_m:
                howto = extract_js_string_list(how_m.group(1))
                
            # FAQs
            faq_matches = re.findall(r'\{\s*q:\s*[\"\'](.*?)[\"\'],\s*a:\s*[\"\'](.*?)[\"\']\s*\}', block, re.DOTALL)
            faqs = [{'q': q.strip(), 'a': a.strip()} for q, a in faq_matches]
            
            all_tools.append({
                'id': tid,
                'title': title,
                'category': cat,
                'description': desc,
                'icon': icon,
                'badge': badge,
                'keywords': keywords,
                'overview': overview,
                'features': features,
                'howTo': howto,
                'faqs': faqs
            })
            
    return all_tools

SEO_OVERRIDES = {
    'word-counter': {
        'title': 'Word Counter - Count Words, Characters & Reading Time Online | OmniTools',
        'description': 'Free online word counter and character calculator. Instantly count words, characters with/without spaces, sentences, paragraphs, and reading time in real time.',
        'keywords': ['word counter', 'count words', 'character counter', 'word counter without spaces', 'reading time calculator', 'text length', 'count characters online']
    },
    'aspect-ratio-calculator': {
        'title': 'Aspect Ratio Calculator (16:9, 4:3, 21:9) - Calculate Dimensions Online | OmniTools',
        'description': 'Free online aspect ratio calculator. Quickly calculate proportional width and height dimensions for 16:9, 4:3, 21:9 video, images, screens, and CSS layouts.',
        'keywords': ['aspect ratio calculator', '16:9 calculator', 'aspect ratio scaler', '4:3 calculator', 'calculate resolution', 'image aspect ratio', 'video dimensions calculator']
    },
    'json-beautifier': {
        'title': 'JSON Formatter & Beautifier - Format, Validate & Clean JSON Online | OmniTools',
        'description': 'Free online JSON formatter, beautifier, and validator. Format unreadable JSON with custom indentation, validate syntax errors with line markers, and minify code.',
        'keywords': ['json formatter', 'json beautifier', 'format json online', 'validate json', 'json cleaner', 'pretty print json', 'json validator']
    },
    'base64-tool': {
        'title': 'Base64 Encode & Decode - Free String & Data Converter (100% Private) | OmniTools',
        'description': 'Free online Base64 encoder and decoder. Convert text, strings, and binary data to and from standard or URL-safe Base64 with instant client-side privacy.',
        'keywords': ['base64 encode', 'base64 decode', 'base64 converter', 'online base64 decoder', 'btoa atob', 'url safe base64', 'string to base64']
    },
    'discord-markdown-styler': {
        'title': 'Discord Markdown Styler - Colored Text, Spoilers & Code Blocks Preview | OmniTools',
        'description': 'Free Discord text formatting tool with real-time preview. Generate ANSI colored text, spoilers, code blocks, bold, strikethrough, and relative timestamps.',
        'keywords': ['discord markdown', 'discord text formatting', 'discord colored text', 'discord spoiler generator', 'discord timestamp generator', 'discord code block styling']
    },
    'qr-code-generator': {
        'title': 'Free QR Code Generator - Custom QR Codes with Instant Download | OmniTools',
        'description': 'Free, fast online QR code generator. Create high-resolution QR codes for URLs, WiFi, plain text, and emails. 100% private, no tracking or expiration.',
        'keywords': ['qr code generator', 'create qr code free', 'qr generator online', 'custom qr code', 'qr code maker without signup']
    },
    'text-diff': {
        'title': 'Text Diff Checker - Compare Two Texts & Find Differences Online | OmniTools',
        'description': 'Free online text comparison tool. Highlight added, deleted, and modified lines between two texts or code snippets side-by-side.',
        'keywords': ['diff checker', 'compare text online', 'text difference checker', 'code diff online', 'side by side text compare']
    },
    'uuid-generator': {
        'title': 'UUID Generator - Generate Version 4 (v4) UUIDs & GUIDs Online | OmniTools',
        'description': 'Fast bulk UUID / GUID generator. Generate cryptographically secure RFC 4122 Version 4 random UUIDs in uppercase or lowercase with instant copy.',
        'keywords': ['uuid generator', 'guid generator', 'generate uuid v4', 'random uuid generator', 'online guid maker', 'bulk uuid generator']
    },
    'lorem-ipsum-generator': {
        'title': 'Lorem Ipsum Generator - Free Placeholder & Dummy Text Generator | OmniTools',
        'description': 'Generate custom Lorem Ipsum placeholder text by paragraphs, sentences, or words. Perfect dummy text generator for web design and typography layouts.',
        'keywords': ['lorem ipsum generator', 'dummy text generator', 'placeholder text', 'fake text generator', 'latin text generator']
    },
    'hash-generator': {
        'title': 'Online Hash Generator - MD5, SHA-1, SHA-256 & SHA-512 Checksums | OmniTools',
        'description': 'Generate cryptographic checksum hashes including MD5, SHA-1, SHA-256, SHA-384, and SHA-512 instantly in your browser. 100% client-side privacy.',
        'keywords': ['hash generator', 'sha256 generator online', 'md5 hash generator', 'sha512 generator', 'calculate checksum', 'cryptographic hash tool']
    },
    'url-encoder-decoder': {
        'title': 'URL Encoder & Decoder - Percent-Encoding for URIs & Parameters | OmniTools',
        'description': 'Fast online URL encoder and decoder. Encode special characters to percent-encoded URI strings and decode query parameters safely in real time.',
        'keywords': ['url encoder', 'url decoder', 'percent encoding', 'uri encoder online', 'decode url parameter', 'encode uri component']
    },
    'case-converter': {
        'title': 'Case Converter - UPPERCASE, lowercase, Title Case & camelCase | OmniTools',
        'description': 'Convert text case instantly online. Convert between UPPERCASE, lowercase, Title Case, camelCase, kebab-case, snake_case, and Sentence case.',
        'keywords': ['case converter', 'uppercase to lowercase', 'title case converter', 'camelcase converter', 'text case changer', 'sentence case converter']
    },
    'subnet-calculator': {
        'title': 'IPv4 Subnet & CIDR Calculator - Calculate IP Range, Mask & Hosts | OmniTools',
        'description': 'Free online IPv4 subnet and CIDR calculator. Instantly calculate network address, broadcast address, usable host IP range, and wildcard netmask.',
        'keywords': ['subnet calculator', 'cidr calculator', 'ipv4 subnet', 'ip subnet mask', 'network address calculator', 'cidr notation', 'usable host range']
    },
    'hmac-generator': {
        'title': 'In-Browser HMAC Generator - SHA-256, SHA-512 & SHA-1 (100% Private) | OmniTools',
        'description': 'Cryptographically secure in-browser HMAC generator via Web Crypto API. Calculate HMAC-SHA256, HMAC-SHA512, and webhook signatures with zero server transmission.',
        'keywords': ['hmac generator', 'hmac sha256', 'hmac sha512', 'webhook signature generator', 'crypto subtle hmac', 'online hmac tool']
    },
    'http-header-parser': {
        'title': 'HTTP Header Parser & Security Audit - Analyze CSP, HSTS & CORS | OmniTools',
        'description': 'Parse raw HTTP response headers into structured key-values and audit critical security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy) in your browser.',
        'keywords': ['http header parser', 'security header checker', 'parse http headers', 'csp validator', 'hsts checker', 'http response headers']
    },
    'clip-path-generator': {
        'title': 'CSS Clip-Path Generator - Interactive Polygon Shape Maker | OmniTools',
        'description': 'Free visual CSS clip-path polygon generator. Drag vertex handles on an interactive canvas to sculpt custom geometric polygons, stars, and triangles.',
        'keywords': ['css clip-path generator', 'clip-path polygon maker', 'clippy generator', 'css shape generator', 'polygon clip-path', 'css geometric shapes']
    },
    'tap-tempo-bpm': {
        'title': 'Tap Tempo BPM Calculator - Accurate Music Speed & Delay Timings | OmniTools',
        'description': 'Free online tap tempo BPM calculator. Tap your spacebar or screen to calculate exact music tempo, beat duration, and audio delay/reverb millisecond timings.',
        'keywords': ['tap tempo', 'bpm calculator', 'tap bpm', 'tempo finder', 'delay time calculator', 'music tempo calculator', 'tap tempo online']
    }
}

def generate_tool_html(tool, all_tools):
    # Determine category metadata
    cat_meta = CATEGORY_MAP.get(tool['category'], {
        "name": tool['category'],
        "slug": "developer-data"
    })
    cat_slug = cat_meta['slug']
    cat_url = f"{BASE_URL}/categories/{cat_slug}"
    
    # Related tools (3 from same category, excluding self)
    related = [t for t in all_tools if t['category'] == tool['category'] and t['id'] != tool['id']][:3]
    if len(related) < 3:
        related += [t for t in all_tools if t['id'] != tool['id']][:3 - len(related)]
        
    canonical_url = f"{BASE_URL}/tools/{tool['id']}"
    override = SEO_OVERRIDES.get(tool['id'], {})
    page_title = override.get('title', f"{tool['title']} - Free Online Tool (100% Client-Side) | OmniTools")
    meta_desc = override.get('description', tool['description'])
    meta_keywords = override.get('keywords', tool['keywords'])
    
    # JSON-LD Schemas
    schemas = []
    
    # 1. WebApplication schema
    web_app_schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool['title'],
        "url": canonical_url,
        "description": meta_desc,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    }
    schemas.append(web_app_schema)
    
    # 2. Breadcrumbs schema (Pointing to static Category Hub)
    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": f"{BASE_URL}/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": tool['category'],
                "item": cat_url
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": tool['title'],
                "item": canonical_url
            }
        ]
    }
    schemas.append(breadcrumb_schema)
    
    # 3. Expanded FAQ schema (4-6 comprehensive Q&As)
    all_faqs = get_expanded_faqs(tool)
    if all_faqs:
        faq_schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": faq['q'],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq['a']
                    }
                } for faq in all_faqs
            ]
        }
        schemas.append(faq_schema)
        
    # 4. HowTo schema (if exists)
    if tool['howTo']:
        howto_schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": f"How to use {tool['title']}",
            "step": [
                {
                    "@type": "HowToStep",
                    "position": idx + 1,
                    "text": step
                } for idx, step in enumerate(tool['howTo'])
            ]
        }
        schemas.append(howto_schema)

    json_ld_scripts = "\n".join([
        f'  <script type="application/ld+json">\n{json.dumps(s, indent=2)}\n  </script>'
        for s in schemas
    ])
    
    # Deep dive mechanics paragraphs
    deep_dive_text = get_tool_deep_dive(tool)
    deep_dive_paragraphs = "\n".join([f'        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm mt-2 whitespace-pre-line">{html.escape(p.strip())}</p>' for p in deep_dive_text.split("\n\n") if p.strip()])

    # Specifications / Cheat Sheet Table
    spec_table = get_tool_spec_table(tool)
    spec_table_html = ""
    if spec_table:
        headers_th = "".join([f'<th class="px-3.5 py-2.5 text-left font-mono font-bold text-[11px] text-zinc-900 dark:text-zinc-100">{html.escape(h)}</th>' for h in spec_table['headers']])
        rows_tr = []
        for row in spec_table['rows']:
            cells_td = "".join([f'<td class="px-3.5 py-2 text-[11px] text-zinc-600 dark:text-zinc-300 border-t border-zinc-200/60 dark:border-zinc-800/60 font-mono">{html.escape(c)}</td>' for c in row])
            rows_tr.append(f'<tr>{cells_td}</tr>')
        rows_html = "\n".join(rows_tr)
        spec_table_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5">Technical Specifications &amp; Reference</h3>
        <div class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table class="w-full text-left bg-zinc-50/40 dark:bg-zinc-900/20">
            <thead class="bg-zinc-100/80 dark:bg-zinc-800/60">
              <tr>{headers_th}</tr>
            </thead>
            <tbody>
{rows_html}
            </tbody>
          </table>
        </div>
      </div>"""

    # Real-World Use Cases
    use_cases = get_tool_use_cases(tool)
    use_cases_html = ""
    if use_cases:
        use_cases_items = "\n".join([f'        <li class="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 leading-relaxed">{uc}</li>' for uc in use_cases])
        use_cases_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5">Worked uses</h3>
        <ul class="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
{use_cases_items}
        </ul>
      </div>"""

    # Terminal & Code Equivalents
    cli_snippet = get_tool_cli_snippets(tool)
    cli_html = ""
    if cli_snippet:
        bash_block = f"""
          <div class="space-y-1">
            <div class="text-[10px] font-mono uppercase text-zinc-400">Bash / Terminal CLI:</div>
            <pre class="p-3 rounded-lg bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto"><code>{html.escape(cli_snippet['bash'])}</code></pre>
          </div>""" if 'bash' in cli_snippet else ""
        python_block = f"""
          <div class="space-y-1">
            <div class="text-[10px] font-mono uppercase text-zinc-400">Python 3:</div>
            <pre class="p-3 rounded-lg bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto"><code>{html.escape(cli_snippet['python'])}</code></pre>
          </div>""" if 'python' in cli_snippet else ""
        js_block = f"""
          <div class="space-y-1">
            <div class="text-[10px] font-mono uppercase text-zinc-400">JavaScript / Node.js:</div>
            <pre class="p-3 rounded-lg bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto"><code>{html.escape(cli_snippet['js'])}</code></pre>
          </div>""" if 'js' in cli_snippet else ""
          
        cli_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2.5">{html.escape(cli_snippet['title'])}</h3>
        <div class="space-y-3">
{bash_block}
{python_block}
{js_block}
        </div>
      </div>"""

    # Pre-rendered Features list
    features_html = ""
    if tool['features']:
        features_items = "\n".join([f'            <li>{html.escape(f)}</li>' for f in tool['features']])
        features_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Technical Capabilities</h3>
        <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
{features_items}
        </ul>
      </div>"""

    # Pre-rendered HowTo list
    howto_html = ""
    if tool['howTo']:
        howto_items = "\n".join([f'            <li>{html.escape(h)}</li>' for h in tool['howTo']])
        howto_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Usage Steps &amp; Workflow</h3>
        <ol class="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
{howto_items}
        </ol>
      </div>"""

    # Pre-rendered FAQs list (using all_faqs)
    faqs_html = ""
    if all_faqs:
        faq_blocks = "\n".join([f"""
          <div class="p-3.5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70">
            <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100 mb-1">{html.escape(faq['q'])}</h4>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{html.escape(faq['a'])}</p>
          </div>""" for faq in all_faqs])
        faqs_html = f"""
      <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">Frequently Asked Questions</h3>
        <div class="space-y-2.5">
{faq_blocks}
        </div>
      </div>"""

    # Related Tools Cards (Internal Linking for SEO)
    related_cards_html = "\n".join([f"""
        <a href="/tools/{r['id']}" class="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-[#11141a] hover:border-zinc-400 dark:hover:border-zinc-700 transition group block">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{html.escape(r['category'])}</span>
            <i data-lucide="arrow-right" class="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 transition-transform"></i>
          </div>
          <div class="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:underline">{html.escape(r['title'])}</div>
          <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">{html.escape(r['description'])}</p>
        </a>""" for r in related])

    page_content = f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(tool['description'])}">
  <meta name="keywords" content="{html.escape(', '.join(tool['keywords']))}">
  <link rel="canonical" href="{canonical_url}">

  <!-- Favicon & PWA Manifest -->
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/apple-touch-icon.png">
  <link rel="manifest" href="../manifest.webmanifest">
  <meta name="theme-color" content="#0e1117">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(page_title)}">
  <meta property="og:description" content="{html.escape(tool['description'])}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{BASE_URL}/assets/og-image.png">
  <meta property="og:image:secure_url" content="{BASE_URL}/assets/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{html.escape(tool['title'])} - OmniTools">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page_title)}">
  <meta name="twitter:description" content="{html.escape(tool['description'])}">
  <meta name="twitter:image" content="{BASE_URL}/assets/og-image.png">

  <!-- Search Engine Verification -->
  <meta name="google-site-verification" content="">

  <!-- Google Fonts: Inter & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Google AdSense Configuration & Script -->
  <script>
    window.ADSENSE_CONFIG = {{
      client: 'ca-pub-3261737439776294',
      slotHome: '5934296997',
      slotTool: '5934296997',
      slotSidebar: '5934296997'
    }};
    window.adsbygoogle = window.adsbygoogle || [];
  </script>
  <script src="/js/consent.js" defer></script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
          }},
          colors: {{
            brand: {{
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            }}
          }}
        }}
      }}
    }}
  </script>

  <!-- Custom Design System Styles -->
  <link rel="stylesheet" href="../css/styles.css">

  <!-- JSON-LD Structured Data for Search Engines -->
{json_ld_scripts}
</head>
<body class="bg-zinc-50 dark:bg-[#0b0d11] text-zinc-800 dark:text-zinc-200 font-sans min-h-screen flex flex-col antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">

  <!-- Primary Top Navbar -->
  <header class="sticky top-0 z-30 bg-white/95 dark:bg-[#0e1117]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
      
      <!-- Brand -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="/" class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
          </div>
          <span class="font-bold text-base tracking-tight text-zinc-950 dark:text-white">OmniTools</span>
        </a>
      </div>

      <!-- Quick Search / Catalog Link -->
      <div class="flex-1 max-w-md mx-4 hidden sm:block">
        <a href="/" class="flex items-center justify-between w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-850 bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition relative">
          <i data-lucide="search" class="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5"></i>
          <span>Search tools...</span>
          <kbd class="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-zinc-300/70 dark:border-zinc-750 bg-white dark:bg-zinc-800/80 text-zinc-400 shadow-2xs">⌘K</kbd>
        </a>
      </div>

      <!-- Action Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <a href="/categories/{cat_slug}" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5">
          <i data-lucide="folder" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">{html.escape(tool['category'])}</span>
        </a>

        <a href="/" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5">
          <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">All Tools</span>
        </a>

        <button id="theme-toggle" class="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 transition" title="Toggle Theme">
          <i id="theme-icon" data-lucide="moon" class="w-4 h-4"></i>
        </button>

        <a href="https://github.com/yoonhahaha05/omnitools" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition">
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
    
    <!-- Breadcrumbs & Tool Action Buttons -->
    <div class="breadcrumb-bar flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
        <a href="/" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Catalog</a>
        <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
        <a href="/categories/{cat_slug}" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">{html.escape(tool['category'])}</a>
        <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
        <span class="text-zinc-900 dark:text-zinc-200 font-semibold">{html.escape(tool['title'])}</span>
      </div>

      <div class="tool-action-bar flex items-center gap-2">
        <button id="tool-fav-btn" data-tool-id="{tool['id']}" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
          <i data-lucide="star" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span id="fav-label">Favorite</span>
        </button>
        <button id="tool-share-btn" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
          <i data-lucide="link" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span>Share</span>
        </button>
        <button id="tool-embed-btn" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs" title="Copy embeddable widget snippet">
          <i data-lucide="code" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span>Embed</span>
        </button>
      </div>
    </div>

    <!-- Tool Header -->
    <div class="tool-header-card p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      <div class="flex items-start gap-3.5">
        <div class="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
          <i data-lucide="wrench" class="w-4 h-4 tool-main-icon"></i>
        </div>
        <div class="min-w-0 flex-1">
          <h1 class="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
            {html.escape(tool['title'])}
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            {html.escape(tool['description'])}
          </p>
        </div>
      </div>
    </div>

    <!-- Interactive Tool Arena Container -->
    <div id="tool-arena" class="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      <div class="text-xs text-zinc-400 font-mono py-8 text-center">Loading interactive utility workspace...</div>
    </div>

    <div class="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
      <i data-lucide="shield" class="w-3.5 h-3.5"></i>
      <span>Your input stays on this device. Ads use cookies.</span>
    </div>

    <!-- Embed Mode Attribution Banner (shown only when embedded inside iframes) -->
    <div class="embed-attribution p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 items-center justify-between text-xs">
      <a href="{BASE_URL}" target="_blank" rel="noopener" class="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white">
        <span class="w-4 h-4 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center"><i data-lucide="wrench" class="w-2.5 h-2.5"></i></span>
        <span>OmniTools</span>
      </a>
      <span class="text-zinc-400 text-[11px]">Free client-side web utilities</span>
    </div>

    <!-- Google AdSense Responsive Placement -->
    <div class="ad-slot-wrapper w-full p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 my-6">
      <div class="ad-label text-zinc-400 dark:text-zinc-500 mb-2">Advertisement</div>
      <div class="w-full flex justify-center items-center overflow-hidden min-h-[90px]">
        <ins class="adsbygoogle"
             style="display:block;width:100%;"
             data-ad-client="ca-pub-3261737439776294"
             data-ad-slot="5934296997"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>

    <!-- Pre-rendered Semantic SEO Article, Instructions & Technical Notes -->
    <article class="seo-deep-dive p-6 sm:p-7 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-6 text-xs sm:text-sm">
      <div>
        <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Overview &amp; Algorithmic Mechanics</h2>
{deep_dive_paragraphs}
      </div>
{spec_table_html}
{use_cases_html}
{cli_html}
{features_html}
{howto_html}
{faqs_html}
    </article>

    <!-- Related Utilities (Internal Linking Engine for Google SEO) -->
    <div class="related-tools-section space-y-3 pt-2">
      <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Related {html.escape(tool['category'])} Utilities</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
{related_cards_html}
      </div>
    </div>

  </main>

  <!-- Global Footer -->
  <footer class="mt-auto border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0e1117] text-zinc-500 dark:text-zinc-400 text-xs py-7 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 font-mono text-[11px]">
        <span class="font-bold text-zinc-900 dark:text-zinc-200">OmniTools</span>
        <span class="text-zinc-300 dark:text-zinc-700">/</span>
        <span>105 Client-Side Micro-Utilities</span>
      </div>
      <div class="flex flex-wrap items-center gap-4 sm:gap-5 text-xs">
        <a href="/pages/about" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">About</a>
        <a href="/pages/contact" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Contact &amp; Support</a>
        <a href="/pages/privacy" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Privacy Policy</a>
        <a href="/pages/terms" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Terms of Service</a>
        <a href="https://github.com/yoonhahaha05/omnitools" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition flex items-center gap-1 font-medium">
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="../js/utils.js"></script>
  <script src="../js/tools/text.js"></script>
  <script src="../js/tools/dev.js"></script>
  <script src="../js/tools/math.js"></script>
  <script src="../js/tools/media.js"></script>
  <script src="../js/tools/quick.js"></script>
  <script src="../js/registry.js"></script>
  <script src="../js/app.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      // Setup theme
      App.setupTheme();

      // Check for embed mode parameter (?embed=true or #embed)
      if (window.location.search.includes('embed=true') || window.location.hash.includes('embed')) {{
        document.body.classList.add('embed-mode');
      }}
      
      // Mount interactive tool
      const tool = ToolRegistry.getToolById('{tool['id']}');
      const arena = document.getElementById('tool-arena');
      if (tool && arena && typeof tool.render === 'function') {{
        try {{
          tool.render(arena);
        }} catch (err) {{
          console.error('Error rendering tool:', err);
          arena.innerHTML = `<div class="p-4 bg-rose-50 text-rose-700 rounded-lg text-xs">Error rendering tool: ${{err.message}}</div>`;
        }}
      }}
      
      // Update main icon
      if (tool) {{
        const iconName = Utils.getIconName(tool.icon, tool.category);
        const iconEl = document.querySelector('.tool-main-icon');
        if (iconEl) {{
          iconEl.setAttribute('data-lucide', iconName);
        }}
      }}
      
      // Favorite button
      const favBtn = document.getElementById('tool-fav-btn');
      if (favBtn) {{
        const isFav = Utils.storage.isFavorite('{tool['id']}');
        const starIcon = isFav ? '<i data-lucide="star" class="w-3.5 h-3.5 text-amber-500 fill-amber-500"></i>' : '<i data-lucide="star" class="w-3.5 h-3.5 text-zinc-400"></i>';
        favBtn.innerHTML = `${{starIcon}}<span>${{isFav ? 'Favorited' : 'Favorite'}}</span>`;
        favBtn.addEventListener('click', () => {{
          const added = Utils.storage.toggleFavorite('{tool['id']}');
          const updatedStar = added ? '<i data-lucide="star" class="w-3.5 h-3.5 text-amber-500 fill-amber-500"></i>' : '<i data-lucide="star" class="w-3.5 h-3.5 text-zinc-400"></i>';
          favBtn.innerHTML = `${{updatedStar}}<span>${{added ? 'Favorited' : 'Favorite'}}</span>`;
          Utils.refreshIcons();
        }});
      }}
      
      // Share button
      const shareBtn = document.getElementById('tool-share-btn');
      if (shareBtn) {{
        shareBtn.addEventListener('click', () => {{
          Utils.copyToClipboard(window.location.href, 'Link copied to clipboard');
        }});
      }}

      // Embed button
      const embedBtn = document.getElementById('tool-embed-btn');
      if (embedBtn) {{
        embedBtn.addEventListener('click', () => {{
          const embedCode = `<iframe src="{canonical_url}?embed=true" width="100%" height="450" frameborder="0" style="border:1px solid #e4e4e7;border-radius:12px;overflow:hidden;" title="{html.escape(tool['title'])}"></iframe>`;
          Utils.copyToClipboard(embedCode, 'Embed code copied to clipboard');
        }});
      }}
      
      Utils.refreshIcons();
      Utils.initAdUnits();

      // Register PWA Service Worker
      if ('serviceWorker' in navigator) {{
        window.addEventListener('load', () => {{
          navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW failed:', err));
        }});
      }}
    }});
  </script>
</body>
</html>
"""
    return page_content

def generate_category_html(category, tools_in_cat, all_categories):
    canonical_url = f"{BASE_URL}/categories/{category['slug']}"
    page_title = category['meta_title']
    
    # Generate tools grid cards
    tool_cards = []
    for t in tools_in_cat:
        tool_cards.append(f"""
        <a href="/tools/{t['id']}" class="tool-card p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] hover:border-zinc-300 dark:hover:border-zinc-700 transition flex flex-col justify-between group">
          <div>
            <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-3">
              <i data-lucide="{Utils_get_icon(t['icon'], t['category'])}" class="w-4 h-4"></i>
            </div>
            <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{html.escape(t['title'])}</h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">{html.escape(t['description'])}</p>
          </div>
        </a>""")
        
    tool_cards_html = "\n".join(tool_cards)
    
    # Category navigation tabs
    cat_tabs = []
    for c in all_categories:
        is_active = c['slug'] == category['slug']
        active_cls = "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold" if is_active else "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
        cat_tabs.append(f"""
        <a href="/categories/{c['slug']}" class="px-3 py-1.5 rounded-lg text-xs transition whitespace-nowrap {active_cls}">
          {html.escape(c['name'])} ({c['badge'].split()[0]})
        </a>""")
    cat_tabs_html = "\n".join(cat_tabs)

    # Category FAQs
    cat_faqs_html = ""
    if category.get('faqs'):
        faq_blocks = "\n".join([f"""
          <div class="p-4 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 mb-1.5">{html.escape(f['q'])}</h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{html.escape(f['a'])}</p>
          </div>""" for f in category['faqs']])
        cat_faqs_html = f"""
        <div class="space-y-3 pt-4">
          <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Frequently Asked Questions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
{faq_blocks}
          </div>
        </div>"""

    # Structured Data
    schemas = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category['h1'],
            "url": canonical_url,
            "description": category['meta_description'],
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": idx + 1,
                        "name": t['title'],
                        "url": f"{BASE_URL}/tools/{t['id']}"
                    } for idx, t in enumerate(tools_in_cat)
                ]
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": f"{BASE_URL}/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": category['name'],
                    "item": canonical_url
                }
            ]
        }
    ]
    
    if category.get('faqs'):
        schemas.append({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f['q'],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f['a']
                    }
                } for f in category['faqs']
            ]
        })

    json_ld_scripts = "\n".join([
        f'  <script type="application/ld+json">\n{json.dumps(s, indent=2)}\n  </script>'
        for s in schemas
    ])

    return f"""<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(category['meta_description'])}">
  <link rel="canonical" href="{canonical_url}">

  <!-- Favicon & PWA Manifest -->
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/apple-touch-icon.png">
  <link rel="manifest" href="../manifest.webmanifest">
  <meta name="theme-color" content="#0e1117">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(page_title)}">
  <meta property="og:description" content="{html.escape(category['meta_description'])}">
  <meta property="og:url" content="{canonical_url}">
  <meta property="og:image" content="{BASE_URL}/assets/og-image.png">
  <meta property="og:image:secure_url" content="{BASE_URL}/assets/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{html.escape(category['name'])} - OmniTools">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page_title)}">
  <meta name="twitter:description" content="{html.escape(category['meta_description'])}">
  <meta name="twitter:image" content="{BASE_URL}/assets/og-image.png">

  <!-- Google Fonts: Inter & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Lucide Icons CDN (Deferred for Performance) -->
  <script src="https://unpkg.com/lucide@latest" defer></script>

  <!-- Google AdSense Configuration & Script -->
  <script>
    window.ADSENSE_CONFIG = {{
      client: 'ca-pub-3261737439776294',
      slotHome: '5934296997',
      slotTool: '5934296997',
      slotSidebar: '5934296997'
    }};
    window.adsbygoogle = window.adsbygoogle || [];
  </script>
  <script src="/js/consent.js" defer></script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
          }},
          colors: {{
            brand: {{
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
            }}
          }}
        }}
      }}
    }}
  </script>

  <!-- Custom Design System Styles -->
  <link rel="stylesheet" href="../css/styles.css">

  <!-- JSON-LD Structured Data for Search Engines -->
{json_ld_scripts}
</head>
<body class="bg-zinc-50 dark:bg-[#0b0d11] text-zinc-800 dark:text-zinc-200 font-sans min-h-screen flex flex-col antialiased selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">

  <!-- Primary Top Navbar -->
  <header class="sticky top-0 z-30 bg-white/95 dark:bg-[#0e1117]/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
      
      <!-- Brand -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="/" class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center">
            <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
          </div>
          <span class="font-bold text-base tracking-tight text-zinc-950 dark:text-white">OmniTools</span>
        </a>
      </div>

      <!-- Quick Search / Catalog Link -->
      <div class="flex-1 max-w-md mx-4 hidden sm:block">
        <a href="/" class="flex items-center justify-between w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-850 bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition relative">
          <i data-lucide="search" class="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5"></i>
          <span>Search tools...</span>
          <kbd class="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-zinc-300/70 dark:border-zinc-750 bg-white dark:bg-zinc-800/80 text-zinc-400 shadow-2xs">⌘K</kbd>
        </a>
      </div>

      <!-- Action Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <a href="/" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5">
          <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
          <span>All Tools</span>
        </a>

        <button id="theme-toggle" class="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 transition" title="Toggle Theme">
          <i id="theme-icon" data-lucide="moon" class="w-4 h-4"></i>
        </button>

        <a href="https://github.com/yoonhahaha05/omnitools" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition">
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
    
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
      <a href="/" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Home</a>
      <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
      <span class="text-zinc-900 dark:text-zinc-200 font-semibold">{html.escape(category['name'])}</span>
    </div>

    <!-- Category Header Hero -->
    <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 space-y-2">
      <h1 class="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white tracking-tight">
        {html.escape(category['h1'])}
      </h1>
      <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
        {html.escape(category['description'])}
      </p>
    </div>

    <!-- Category Hub Navigation Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <span class="text-[11px] font-mono text-zinc-400 shrink-0 mr-1">Categories:</span>
{cat_tabs_html}
    </div>

    <!-- Category Tools Grid -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Available {html.escape(category['name'])} Tools</h2>
        <span class="text-[11px] font-mono text-zinc-400">{len(tools_in_cat)} utilities</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
{tool_cards_html}
      </div>
    </div>

    <!-- Google AdSense Responsive Unit -->
    <div class="ad-slot-wrapper w-full p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div class="ad-label text-zinc-400 dark:text-zinc-500 mb-2">Advertisement</div>
      <div class="w-full text-center overflow-hidden" style="min-height: 90px;">
        <ins class="adsbygoogle"
             style="display:block;width:100%;min-height:90px;"
             data-ad-client="ca-pub-3261737439776294"
             data-ad-slot="5934296997"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>

    <!-- Category Deep-Dive Architecture Guide -->
    <div class="p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs sm:text-sm">
      <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Domain Architecture &amp; Privacy Standards</h2>
      <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
        {CATEGORY_GUIDES.get(category['slug'], {}).get('architecture_summary', category['description'])}
      </p>
      <div class="pt-2">
        <h3 class="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Governing Specifications &amp; RFC Standards</h3>
        <div class="flex flex-wrap gap-2">
          {"".join([f'<span class="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750">{html.escape(s)}</span>' for s in CATEGORY_GUIDES.get(category['slug'], {}).get('standards', [])])}
        </div>
      </div>
    </div>

    <!-- Category Technical Guide & FAQs -->
{cat_faqs_html}

  </main>

  <!-- Global Footer -->
  <footer class="mt-auto border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0e1117] text-zinc-500 dark:text-zinc-400 text-xs py-7 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 font-mono text-[11px]">
        <span class="font-bold text-zinc-900 dark:text-zinc-200">OmniTools</span>
        <span class="text-zinc-300 dark:text-zinc-700">/</span>
        <span>105 Client-Side Micro-Utilities</span>
      </div>
      <div class="flex flex-wrap items-center gap-4 sm:gap-5 text-xs">
        <a href="/pages/about" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">About</a>
        <a href="/pages/contact" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Contact &amp; Support</a>
        <a href="/pages/privacy" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Privacy Policy</a>
        <a href="/pages/terms" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Terms of Service</a>
        <a href="https://github.com/yoonhahaha05/omnitools" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition flex items-center gap-1 font-medium">
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="../js/utils.js"></script>
  <script src="../js/app.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {{
      App.setupTheme();
      Utils.refreshIcons();
      Utils.initAdUnits();

      // Register Service Worker
      if ('serviceWorker' in navigator) {{
        window.addEventListener('load', () => {{
          navigator.serviceWorker.register('/sw.js').catch(err => console.warn('SW failed:', err));
        }});
      }}
    }});
  </script>
</body>
</html>
"""

def Utils_get_icon(icon_str, category_name):
    # Mapping helper for icons
    mapping = {
        '🔤': 'type',
        '⏱️': 'clock',
        'Aa': 'case-sensitive',
        '␣': 'space',
        '↵': 'corner-down-left',
        '🔀': 'arrow-up-down',
        '🔄': 'repeat',
        '⚖️': 'git-compare',
        '✂️': 'scissors',
        '📝': 'file-text',
        '📜': 'align-left',
        '🔗': 'link',
        '🔍': 'search',
        '🏷️': 'code',
        '💬': 'message-square',
        '👻': 'ghost',
        '01': 'binary',
        '#': 'hash',
        '📻': 'radio',
        '✨': 'sparkles',
        '🔢': 'list-ordered',
        '🌐': 'globe',
        '✉️': 'mail',
        '🚫': 'smile-plus',
        '{ }': 'braces',
        '📦': 'minimize-2',
        '🔐': 'key-round',
        '📊': 'table',
        '📈': 'file-spreadsheet',
        '&': 'ampersand',
        '🎫': 'shield-check',
        '⏳': 'hourglass',
        '🎯': 'crosshair',
        '🎨': 'palette',
        '⚡': 'zap',
        '🗄️': 'database',
        '📋': 'file-code',
        '🖼️': 'image',
        '🚦': 'signal',
        '📎': 'paperclip',
        '🔒': 'lock',
        '💻': 'terminal',
        '🆔': 'fingerprint',
        '👤': 'user',
        '⌨️': 'keyboard',
        '%': 'percent',
        '🏷️': 'tag',
        '💵': 'receipt',
        '📏': 'ruler',
        '⚖️': 'scale',
        '🌡️': 'thermometer',
        '💾': 'hard-drive',
        '🚀': 'gauge',
        '🌍': 'globe-2',
        '🕒': 'history',
        '📅': 'calendar',
        '🎂': 'cake',
        '↔️': 'calendar-days',
        '📐': 'aspect-ratio',
        '🖥️': 'monitor',
        '💰': 'trending-up',
        '💼': 'briefcase',
        '🎓': 'graduation-cap',
        '🏛️': 'landmark',
        '🎲': 'dice-5',
        '🪙': 'coins',
        '🏃': 'activity',
        '⛽': 'fuel',
        '🧮': 'calculator',
        '👁️': 'eye',
        '📱': 'qr-code',
        '🛒': 'barcode',
        '🌫️': 'layers',
        '🫧': 'circle-dot',
        '🌈': 'paint-bucket',
        '💎': 'gem',
        '〰️': 'spline',
        '📐': 'maximize',
        '✂️': 'crop',
        '🎭': 'sliders',
        '⭐': 'star',
        '🐦': 'twitter',
        '🎲': 'dices',
        '⏱️': 'timer',
        '⏰': 'bell-ring',
        '🍅': 'brain',
        '🎵': 'music',
        '📝': 'notebook-pen',
        '📺': 'tv',
        '🧹': 'trash-2',
        '📶': 'wifi'
    }
    return mapping.get(icon_str, 'sparkles')

def generate_sitemap(tools):
    now = datetime.now().strftime("%Y-%m-%d")
    urls = []
    
    # 1. Homepage (Priority 1.0)
    urls.append(f"""  <url>
    <loc>{BASE_URL}/</loc>
    <lastmod>{now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>""")

    # 2. 5 Category Hub Pages (Priority 0.9)
    for cat in CATEGORIES:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/categories/{cat['slug']}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>""")
    
    # 3. All 100 Tools (Priority 0.8)
    for tool in tools:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/tools/{tool['id']}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")

    # 4. Compliance & Trust Pages (Priority 0.6)
    for p in ["about", "contact", "privacy", "terms"]:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/pages/{p}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>""")
        
    sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"\n".join(urls)}
</urlset>
"""
    return sitemap_content

def generate_robots_txt():
    return f"""# OmniTools Robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: {BASE_URL}/sitemap.xml
"""

def main():
    print("Extracting tool metadata from category files...")
    tools = extract_tools()
    print(f"Total tools successfully extracted: {len(tools)}")
    
    if len(tools) != 105:
        raise ValueError(f"Expected 105 tools, found {len(tools)}!")
        
    os.makedirs(TOOLS_DIR, exist_ok=True)
    os.makedirs(CATEGORIES_DIR, exist_ok=True)
    
    # Group tools by category
    tools_by_cat = {}
    for cat in CATEGORIES:
        tools_by_cat[cat['name']] = [t for t in tools if t['category'] == cat['name']]
        
    print(f"Generating 5 Category Hub pages in '{CATEGORIES_DIR}/'...")
    for cat in CATEGORIES:
        cat_tools = tools_by_cat[cat['name']]
        cat_html = generate_category_html(cat, cat_tools, CATEGORIES)
        cat_path = os.path.join(CATEGORIES_DIR, f"{cat['slug']}.html")
        with open(cat_path, "w", encoding="utf-8") as f:
            f.write(cat_html)
        print(f"  Generated Category Hub: {cat_path} ({len(cat_tools)} tools)")

    print(f"Generating {len(tools)} static HTML files in '{TOOLS_DIR}/'...")
    for idx, tool in enumerate(tools, 1):
        html_content = generate_tool_html(tool, tools)
        out_path = os.path.join(TOOLS_DIR, f"{tool['id']}.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        if idx % 20 == 0 or idx == len(tools):
            print(f"  Generated [{idx}/{len(tools)}] {out_path}")
            
    print("Generating sitemap.xml...")
    sitemap_content = generate_sitemap(tools)
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    total_urls = len(re.findall(r'<loc>', sitemap_content))
    print(f"  sitemap.xml written successfully ({total_urls} URLs).")
    
    print("Generating robots.txt...")
    robots_content = generate_robots_txt()
    with open("robots.txt", "w", encoding="utf-8") as f:
        f.write(robots_content)
    print("  robots.txt written successfully.")
    
    print(f"\nSUCCESS: Programmatic SEO build complete! {len(tools)} tools + {len(CATEGORIES)} category hubs generated.")

if __name__ == "__main__":
    main()
