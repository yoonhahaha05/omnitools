# OmniTools Hub - All-in-One Web Utilities (100 Micro-Tools)

[![Live Website](https://img.shields.io/badge/Website-getomnitools.com-22c55e?style=for-the-badge&logo=google-chrome&logoColor=white)](https://getomnitools.com)
[![Cloudflare](https://img.shields.io/badge/Hosted_on-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://getomnitools.com)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25_Client--Side-3b82f6?style=for-the-badge)](https://getomnitools.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

> 🚀 **Live Production Site:** **[https://getomnitools.com](https://getomnitools.com)**

A free, 100% client-side web utility hub ("Swiss Army knife") built to rank for high-intent search keywords and generate multi-channel revenue with **$0 monthly hosting costs**.

---

## 🌟 Key Architecture Features

- **Zero Server Costs ($0/mo):** 100% client-side JavaScript execution. Static files deployable directly to Cloudflare Pages, Vercel, or GitHub Pages.
- **Client-Side Privacy:** All operations run locally inside the browser. Sensitive user data (JSON, passwords, tokens, text) is never transmitted across the network.
- **Offline PWA Support:** Installable as a Progressive Web App on macOS, Windows, iOS, and Android. Full offline functionality powered by Service Worker shell caching.
- **5 Dedicated Category Hubs & 100 Tool Pages:** Pre-rendered semantic HTML pages with rich JSON-LD structured data (WebApplication, CollectionPage, FAQPage, HowTo, BreadcrumbList) and OpenGraph / Twitter Cards.
- **Embeddable Tool Widgets:** Clean `?embed=true` mode allowing tech writers and developers to embed any tool into their blogs, docs, and wikis.
- **Instant Search Engine Indexing:** Automated IndexNow integration (`scripts/submit_indexnow.py`) for rapid crawling across Bing, Yandex, Seznam, and AI search engines.
- **Viral Launch Kit:** Ready-to-use launch copy for Hacker News, Reddit, and Product Hunt in `docs/LAUNCH_KIT.md`.
- **Modular JavaScript Registry:** Tools are organized cleanly by category (`js/tools/text.js`, `js/tools/dev.js`, `js/tools/math.js`, `js/tools/media.js`, `js/tools/quick.js`). Adding a new tool takes under 5 minutes without touching any routing logic.

---

## 🛠️ Complete 100-Tool Suite

All 100 tools from the roadmap are implemented with 100% client-side JavaScript, responsive UI, dark mode support, and AdSense-ready SEO content:

### Category 1: Text & Formatting (Tools 1–25)
1. **Word & Character Counter** (`word-counter`)
2. **Reading Time Estimator** (`reading-time-estimator`)
3. **Case Converter** (`case-converter`)
4. **Remove Extra Spaces & Whitespace** (`remove-whitespace`)
5. **Remove Line Breaks** (`remove-line-breaks`)
6. **Sort Lines Alphabetically** (`sort-lines`)
7. **Reverse Text (Characters & Words)** (`reverse-text`)
8. **Text Difference Checker (Diff)** (`text-diff`)
9. **Duplicate Line Remover** (`remove-duplicate-lines`)
10. **Markdown Previewer & HTML Exporter** (`markdown-previewer`)
11. **Lorem Ipsum / Dummy Text Generator** (`lorem-ipsum-generator`)
12. **Slug Generator (Text to URL)** (`slug-generator`)
13. **Regex Find & Replace** (`regex-find-replace`)
14. **Strip HTML Tags** (`strip-html-tags`)
15. **Discord Markdown Styler** (`discord-markdown-styler`)
16. **Invisible Character Remover** (`invisible-character-remover`)
17. **Text to Binary / Binary to Text** (`text-binary-converter`)
18. **Text to Hex / Hex to Text** (`text-hex-converter`)
19. **NATO Phonetic Alphabet Converter** (`nato-phonetic-converter`)
20. **Morse Code Translator (with audio)** (`morse-code-translator`)
21. **Fancy Unicode Font Generator** (`fancy-unicode-fonts`)
22. **Line Numberer** (`line-numberer`)
23. **Extract URLs from Text** (`extract-urls`)
24. **Extract Emails from Text** (`extract-emails`)
25. **Emoji Stripper** (`emoji-stripper`)

### Category 2: Developer & Data (Tools 26–50)
26. **JSON Beautifier & Validator** (`json-beautifier`)
27. **JSON Minifier** (`json-minifier`)
28. **Base64 String Encoder / Decoder** (`base64-tool`)
29. **URL Encoder / Decoder** (`url-encoder-decoder`)
30. **CSV to JSON Converter** (`csv-to-json`)
31. **JSON to CSV Converter** (`json-to-csv`)
32. **HTML Entity Encoder / Decoder** (`html-entity-encoder`)
33. **JWT Token Decoder** (`jwt-decoder`)
34. **Cron Expression Explainer** (`cron-explainer`)
35. **Regex Sandbox & Matcher** (`regex-matcher`)
36. **CSS Minifier** (`css-minifier`)
37. **JavaScript Minifier** (`js-minifier`)
38. **SQL Formatter** (`sql-formatter`)
39. **XML to JSON Converter** (`xml-to-json`)
40. **YAML to JSON Converter** (`yaml-to-json`)
41. **Base64 Image Encoder / Decoder** (`base64-image-tool`)
42. **HTTP Status Code Lookup** (`http-status-codes`)
43. **MIME Type Reference** (`mime-types`)
44. **Linux / Chmod Permissions Calculator** (`chmod-calculator`)
45. **cURL to Fetch / Python Converter** (`curl-converter`)
46. **Markdown Table Generator** (`markdown-table-generator`)
47. **UUID / GUID v4 Generator** (`uuid-generator`)
48. **Hash Generator (MD5, SHA-256 via Web Crypto)** (`hash-generator`)
49. **User Agent Parser** (`user-agent-parser`)
50. **Keycode Event Inspector** (`keycode-inspector`)

### Category 3: Everyday Math & Converters (Tools 51–75)
51. **Percentage Increase/Decrease Calculator** (`percentage-calculator`)
52. **Discount & Sales Tax Calculator** (`discount-tax-calculator`)
53. **Tip & Bill Splitter** (`tip-splitter-calculator`)
54. **Length Converter (Metric / Imperial)** (`length-converter`)
55. **Weight & Mass Converter** (`weight-converter`)
56. **Temperature Converter (°C, °F, K)** (`temperature-converter`)
57. **Data Storage Converter (Bytes to TB)** (`data-storage-converter`)
58. **Speed Converter (mph, km/h, m/s, knots)** (`speed-converter`)
59. **Time Zone Converter & World Clock** (`timezone-converter`)
60. **Epoch / Unix Timestamp to Human Date** (`timestamp-converter`)
61. **Human Date to Unix Timestamp** (`human-date-to-unix`)
62. **Age & Days Alive Calculator** (`age-calculator`)
63. **Date Difference Calculator** (`date-difference-calculator`)
64. **Aspect Ratio Scaler (16:9, 4:3, etc.)** (`aspect-ratio-calculator`)
65. **Screen PPI / DPI Calculator** (`ppi-calculator`)
66. **Compound Interest Calculator** (`compound-interest-calculator`)
67. **Hourly Rate to Annual Salary Calculator** (`salary-calculator`)
68. **GPA Calculator** (`gpa-calculator`)
69. **Roman Numeral Converter** (`roman-numeral-converter`)
70. **Random Number Generator** (`random-number-generator`)
71. **Dice Roller & Coin Flipper** (`dice-coin-roller`)
72. **Running Pace Calculator** (`running-pace-calculator`)
73. **Fuel Cost Estimator** (`fuel-cost-calculator`)
74. **Base Converter (Hex, Dec, Oct, Bin)** (`base-converter`)
75. **Matrix Determinant Calculator** (`matrix-determinant-calculator`)

### Category 4: Media, CSS & Design (Tools 76–90)
76. **Color Picker & Converter (HEX, RGB, HSL)** (`color-converter`)
77. **Random Palette Generator** (`palette-generator`)
78. **WCAG Color Contrast Checker** (`contrast-checker`)
79. **QR Code Generator (SVG / Canvas)** (`qr-code-generator`)
80. **Barcode Generator (Code 128)** (`barcode-generator`)
81. **CSS Box Shadow Generator** (`box-shadow-generator`)
82. **CSS Border Radius / Blob Generator** (`border-radius-generator`)
83. **CSS Gradient Generator** (`gradient-generator`)
84. **CSS Glassmorphism Generator** (`glassmorphism-generator`)
85. **SVG Path Visualizer** (`svg-path-visualizer`)
86. **In-Browser Image Resizer (Canvas)** (`image-resizer`)
87. **In-Browser Image Cropper** (`image-cropper`)
88. **Image Filter / Grayscale Tool** (`image-filter-tool`)
89. **Favicon Generator (multi-size export)** (`favicon-generator`)
90. **Tweet / Quote Card Image Maker** (`quote-card-maker`)

### Category 5: Quick Utilities & Life Tools (Tools 91–100)
91. **Strong Password Generator** (`password-generator`)
92. **Diceware Passphrase Generator** (`diceware-generator`)
93. **Stopwatch & Lap Tracker** (`stopwatch-timer`)
94. **Countdown Timer with Audio Alert** (`countdown-timer`)
95. **Pomodoro Focus Timer (25/5)** (`pomodoro-timer`)
96. **Web Audio Metronome** (`metronome`)
97. **LocalStorage Scratchpad / Notes** (`scratchpad`)
98. **Screen Resolution & Viewport Inspector** (`screen-inspector`)
99. **Browser Storage Cleaner** (`storage-cleaner`)
100. **Network Ping / Latency Checker** (`network-latency-checker`)

---

## 🚀 Instant Deployment (100% Free)

### Option 1: Cloudflare Pages (Recommended - Unlimited Bandwidth)
1. Push this folder to a GitHub or GitLab repository.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Compute (Workers) > Pages**.
3. Click **Connect to Git** and select your repository.
4. Set Build command: *(leave empty)*.
5. Set Build output directory: `.` *(root)*.
6. Click **Save and Deploy**. Your site will be live on `*.pages.dev` with a free SSL certificate!

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel` or import the Git repo on [vercel.com](https://vercel.com).
2. Deploy directly with:
   ```bash
   vercel --prod
   ```

### Option 3: GitHub Pages
1. Push to your GitHub repository.
2. Go to **Settings > Pages > Build and deployment**.
3. Select Source: **Deploy from a branch (`main` / `/root`)**.

---

## 🧩 How to Add New Tools (Scaling from 20 to 100)

To add a new tool (e.g. `nato-alphabet`), open the corresponding category file in `js/tools/` (e.g. `text.js`) and append a tool object:

```javascript
{
  id: "nato-phonetic",
  title: "NATO Phonetic Alphabet Converter",
  category: "Text & Formatting",
  icon: "🔤",
  description: "Convert text to standard military and aviation NATO phonetic alphabet words.",
  keywords: ["nato alphabet", "phonetic alphabet", "alpha bravo charlie"],
  render: (container) => {
    container.innerHTML = `
      <input id="nato-in" class="w-full p-3 border rounded" placeholder="Type text...">
      <div id="nato-out" class="mt-4 p-4 bg-slate-100 font-mono rounded"></div>
    `;
    const input = container.querySelector('#nato-in');
    const out = container.querySelector('#nato-out');
    const natoMap = { A: "Alpha", B: "Bravo", C: "Charlie" /* ... */ };
    input.addEventListener('input', () => {
      out.textContent = input.value.toUpperCase().split('').map(c => natoMap[c] || c).join(' ');
    });
  },
  seoContent: {
    overview: "Detailed 300+ word explanation for Google AdSense and SEO ranking...",
    features: ["Instant conversion", "Standard ICAO compliant"],
    howTo: ["Type text into the box", "View phonetic transcription"],
    faqs: [
      { q: "What is the NATO alphabet?", a: "The NATO phonetic alphabet..." }
    ]
  }
}
```

The tool will **automatically** appear in the search index, category navigation, and routing without any extra configuration!

---

## 📄 License & Compliance

- **AdSense Compliant:** Includes standalone `/pages/privacy.html` with explicit cookie, third-party ad disclosures, and `/pages/about.html`.
- **License:** MIT License. Free for commercial and personal modification.
