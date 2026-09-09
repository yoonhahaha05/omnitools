#!/usr/bin/env python3
"""
OmniTools - Programmatic SEO Build Engine
Extracts all 100 tools and generates:
1. 100 dedicated, semantic, pre-rendered static HTML pages (/tools/<id>.html)
2. Rich JSON-LD Structured Data (WebApplication, FAQPage, HowTo, BreadcrumbList)
3. Full sitemap.xml with priorities and changefreqs
4. Standard robots.txt
"""

import os, re, glob, json, html
from datetime import datetime

BASE_URL = "https://getomnitools.com"
TOOLS_DIR = "tools"

def extract_tools():
    categories_files = [
        ("Text & Formatting", "js/tools/text.js"),
        ("Developer & Data", "js/tools/dev.js"),
        ("Everyday Math & Converters", "js/tools/math.js"),
        ("Media, CSS & Design", "js/tools/media.js"),
        ("Quick Utilities & Life Tools", "js/tools/quick.js")
    ]
    
    all_tools = []
    
    for cat_name, filepath in categories_files:
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
                keywords = re.findall(r'[\"\']([^\"\']+)[\"\']', kw_m.group(1))
                
            # Overview
            ov_m = re.search(r'overview:\s*[\"\'](.*?)[\"\'],\s*(?:\n\s*)?features:', block, re.DOTALL)
            overview = ov_m.group(1).replace('\\n', ' ').strip() if ov_m else desc
            
            # Features
            feat_m = re.search(r'features:\s*\[(.*?)\]', block, re.DOTALL)
            features = []
            if feat_m:
                features = re.findall(r'[\"\']([^\"\']+)[\"\']', feat_m.group(1))
                
            # HowTo
            how_m = re.search(r'howTo:\s*\[(.*?)\]', block, re.DOTALL)
            howto = []
            if how_m:
                howto = re.findall(r'[\"\']([^\"\']+)[\"\']', how_m.group(1))
                
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

def generate_tool_html(tool, all_tools):
    # Determine related tools (3 from same category, excluding self)
    related = [t for t in all_tools if t['category'] == tool['category'] and t['id'] != tool['id']][:3]
    if len(related) < 3:
        related += [t for t in all_tools if t['id'] != tool['id']][:3 - len(related)]
        
    canonical_url = f"{BASE_URL}/tools/{tool['id']}.html"
    page_title = f"{tool['title']} - Free Online Tool (100% Client-Side) | OmniTools"
    
    # JSON-LD Schemas
    schemas = []
    
    # 1. WebApplication schema
    web_app_schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool['title'],
        "url": canonical_url,
        "description": tool['description'],
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
    
    # 2. Breadcrumbs schema
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
                "item": f"{BASE_URL}/index.html#/category/{html.escape(tool['category'])}"
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
    
    # 3. FAQ schema (if exists)
    if tool['faqs']:
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
                } for faq in tool['faqs']
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
    
    # Pre-rendered Features list
    features_html = ""
    if tool['features']:
        features_items = "\n".join([f'            <li>{html.escape(f)}</li>' for f in tool['features']])
        features_html = f"""
          <div>
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
          <div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Usage Steps</h3>
            <ol class="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
{howto_items}
            </ol>
          </div>"""

    # Pre-rendered FAQs list
    faqs_html = ""
    if tool['faqs']:
        faq_blocks = "\n".join([f"""
              <div class="p-3.5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70">
                <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100 mb-1">{html.escape(faq['q'])}</h4>
                <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{html.escape(faq['a'])}</p>
              </div>""" for faq in tool['faqs']])
        faqs_html = f"""
          <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">Frequently Asked Questions</h3>
            <div class="space-y-2.5">
{faq_blocks}
            </div>
          </div>"""

    # Related Tools Cards (Internal Linking for SEO)
    related_cards_html = "\n".join([f"""
        <a href="{r['id']}.html" class="p-3.5 rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-[#11141a] hover:border-zinc-400 dark:hover:border-zinc-700 transition group block">
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

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="{html.escape(page_title)}">
  <meta property="og:description" content="{html.escape(tool['description'])}">
  <meta property="og:url" content="{canonical_url}">

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Google AdSense Configuration & Script -->
  <script>
    window.ADSENSE_CONFIG = {{
      client: 'ca-pub-3261737439776294',
      slotHome: '1234567890',
      slotTool: '2345678901',
      slotSidebar: '3456789012'
    }};
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3261737439776294" crossorigin="anonymous"></script>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
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
  <header class="sticky top-0 z-30 bg-white/90 dark:bg-[#0e1117]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 py-2.5 flex items-center justify-between gap-4">
      
      <!-- Brand -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="../index.html" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center font-mono font-bold text-xs tracking-tight group-hover:scale-105 transition-transform shadow-xs">
            /o
          </div>
          <div class="flex items-baseline gap-2">
            <span class="font-extrabold text-lg tracking-tight text-zinc-950 dark:text-white">OmniTools</span>
            <span class="hidden sm:inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">100 TOOLS</span>
          </div>
        </a>
      </div>

      <!-- Quick Search / Catalog Link -->
      <div class="flex-1 max-w-md mx-4 hidden sm:block">
        <a href="../index.html" class="flex items-center justify-between w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800/90 bg-zinc-100/60 dark:bg-zinc-900/70 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition relative">
          <i data-lucide="search" class="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5"></i>
          <span>Search all 100 utilities...</span>
          <kbd class="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border border-zinc-300/70 dark:border-zinc-750 bg-white dark:bg-zinc-800/80 text-zinc-400 shadow-2xs">⌘K</kbd>
        </a>
      </div>

      <!-- Action Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <a href="../index.html" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition flex items-center gap-1.5">
          <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">All Tools</span>
        </a>

        <button id="theme-toggle" class="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 transition" title="Toggle Theme">
          <i id="theme-icon" data-lucide="moon" class="w-4 h-4"></i>
        </button>

        <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition">
          <i data-lucide="coffee" class="w-3.5 h-3.5 text-amber-500"></i>
          <span>Support</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-6">
    
    <!-- Breadcrumbs & Tool Action Buttons -->
    <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
      <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
        <a href="../index.html" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Catalog</a>
        <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
        <a href="../index.html#/category/{html.escape(tool['category'])}" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">{html.escape(tool['category'])}</a>
        <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
        <span class="text-zinc-900 dark:text-zinc-200 font-semibold">{html.escape(tool['title'])}</span>
      </div>

      <div class="flex items-center gap-2">
        <button id="tool-fav-btn" data-tool-id="{tool['id']}" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
          <i data-lucide="star" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span id="fav-label">Favorite</span>
        </button>
        <button id="tool-share-btn" class="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
          <i data-lucide="link" class="w-3.5 h-3.5 text-zinc-400"></i>
          <span>Share</span>
        </button>
      </div>
    </div>

    <!-- Tool Header Banner -->
    <div class="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0">
          <i data-lucide="sparkles" class="w-5 h-5 tool-main-icon"></i>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-lg sm:text-xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {html.escape(tool['title'])}
            </h1>
            <span class="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Client-Side</span>
          </div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            {html.escape(tool['description'])}
          </p>
        </div>
      </div>
    </div>

    <!-- Interactive Tool Arena Container -->
    <div id="tool-arena" class="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      <div class="text-xs text-zinc-400 font-mono py-8 text-center">Loading interactive utility workspace...</div>
    </div>

    <!-- Architectural Privacy & Sandbox Guarantee -->
    <div class="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/30 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
      <span class="flex items-center gap-2">
        <i data-lucide="lock" class="w-3.5 h-3.5 text-emerald-500"></i>
        <span>Local Browser Memory • Zero Network Telemetry</span>
      </span>
      <a href="../pages/privacy.html" class="underline hover:text-zinc-900 dark:hover:text-zinc-200">Inspect Guarantee</a>
    </div>

    <!-- Google AdSense Responsive Placement -->
    <div class="ad-slot-wrapper w-full p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 my-6">
      <div class="ad-label text-zinc-400 dark:text-zinc-500 mb-2">Advertisement</div>
      <div class="w-full flex justify-center items-center overflow-hidden min-h-[90px]">
        <ins class="adsbygoogle"
             style="display:block;width:100%;"
             data-ad-client="ca-pub-3261737439776294"
             data-ad-slot="2345678901"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>

    <!-- Pre-rendered Semantic SEO Article, Instructions & Technical Notes -->
    <div class="p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-5 text-xs sm:text-sm">
      <div>
        <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Overview & Purpose</h2>
        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm">
          {html.escape(tool['overview'])}
        </p>
      </div>
{features_html}
{howto_html}
{faqs_html}
    </div>

    <!-- Related Utilities (Internal Linking Engine for Google SEO) -->
    <div class="space-y-3 pt-2">
      <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Related {html.escape(tool['category'])} Utilities</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
{related_cards_html}
      </div>
    </div>

  </main>

  <!-- Global Technical Footer -->
  <footer class="mt-auto border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0e1117] text-zinc-500 dark:text-zinc-400 text-xs py-7 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 font-mono text-[11px]">
        <span class="font-bold text-zinc-900 dark:text-zinc-200">OmniTools</span>
        <span class="text-zinc-300 dark:text-zinc-700">/</span>
        <span>100 Client-Side Micro-Utilities</span>
        <span class="text-zinc-300 dark:text-zinc-700">/</span>
        <span class="text-emerald-600 dark:text-emerald-400 font-medium">100% Offline Ready</span>
      </div>
      <div class="flex items-center gap-5 text-xs">
        <a href="../pages/about.html" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">About</a>
        <a href="../pages/privacy.html" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Privacy</a>
        <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition flex items-center gap-1">
          <i data-lucide="coffee" class="w-3.5 h-3.5 text-amber-500"></i>
          <span>Support</span>
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
      
      Utils.refreshIcons();
      Utils.initAdUnits();
    }});
  </script>
</body>
</html>
"""
    return page_content

def generate_sitemap(tools):
    now = datetime.now().strftime("%Y-%m-%d")
    urls = []
    
    # 1. Home page (Priority 1.0)
    urls.append(f"""  <url>
    <loc>{BASE_URL}/</loc>
    <lastmod>{now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>""")
    
    # 2. About & Privacy (Priority 0.5)
    urls.append(f"""  <url>
    <loc>{BASE_URL}/pages/about.html</loc>
    <lastmod>{now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>""")
    urls.append(f"""  <url>
    <loc>{BASE_URL}/pages/privacy.html</loc>
    <lastmod>{now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>""")
    
    # 3. All 100 Tools (Priority 0.8)
    for tool in tools:
        urls.append(f"""  <url>
    <loc>{BASE_URL}/tools/{tool['id']}.html</loc>
    <lastmod>{now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
    
    if len(tools) != 100:
        raise ValueError(f"Expected 100 tools, found {len(tools)}!")
        
    os.makedirs(TOOLS_DIR, exist_ok=True)
    
    print(f"Generating 100 static HTML files in '{TOOLS_DIR}/'...")
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
    print("  sitemap.xml written successfully (103 URLs).")
    
    print("Generating robots.txt...")
    robots_content = generate_robots_txt()
    with open("robots.txt", "w", encoding="utf-8") as f:
        f.write(robots_content)
    print("  robots.txt written successfully.")
    
    print("\nSUCCESS: Programmatic SEO build complete!")

if __name__ == "__main__":
    main()
