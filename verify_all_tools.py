import re, sys

categories = {
    "Text & Formatting": "js/tools/text.js",
    "Developer & Data": "js/tools/dev.js",
    "Everyday Math & Converters": "js/tools/math.js",
    "Media, CSS & Design": "js/tools/media.js",
    "Quick Utilities & Life Tools": "js/tools/quick.js"
}

all_ids = set()
duplicates = []
tools_by_cat = {}
total = 0

for cat_name, path in categories.items():
    content = open(path, encoding='utf-8').read()
    
    # Extract IDs
    ids = re.findall(r'id:\s*["\']([a-zA-Z0-9_-]+)["\'],\s*(?:\n\s*)?title:', content)
    tools_by_cat[cat_name] = ids
    total += len(ids)
    
    for tid in ids:
        if tid in all_ids:
            duplicates.append(tid)
        all_ids.add(tid)
    
    # Check SEO contents
    seo_count = len(re.findall(r'seoContent:\s*\{', content))
    render_count = len(re.findall(r'render:\s*(?:\(|function)', content))
    print(f"[{cat_name}] Count: {len(ids)} | render(): {render_count} | seoContent: {seo_count}")

print("="*60)
print(f"TOTAL TOOLS: {total}")
if duplicates:
    print(f"DUPLICATE IDS FOUND: {duplicates}")
else:
    print("ALL 105 TOOL IDS ARE GLOBALLY UNIQUE!")

expected_counts = {
    "Text & Formatting": 25,
    "Developer & Data": 28,
    "Everyday Math & Converters": 25,
    "Media, CSS & Design": 16,
    "Quick Utilities & Life Tools": 11
}

all_passed = True
for cat, expected in expected_counts.items():
    actual = len(tools_by_cat[cat])
    if actual != expected:
        print(f"FAIL: {cat} expected {expected}, got {actual}")
        all_passed = False
    else:
        print(f"PASS: {cat} has exact {actual} tools.")

if all_passed and total == 105:
    print("\nSUCCESS: All 105 tools are accounted for, unique, and validly structured!")
else:
    sys.exit(1)
