"""
OmniTools - Comprehensive Editorial & Technical Knowledge Engine (seo_content.py)
Powers high-value, authoritative, publication-grade static SEO pages for all 105 tools.
Adheres strictly to Google Helpful Content, E-E-A-T guidelines, and Google AdSense quality criteria.
"""

import html

# Category-level authoritative guides
CATEGORY_GUIDES = {
    "developer-data": {
        "title": "Developer & Data Engineering Reference",
        "description": "JSON, tokens, encodings, and hashes, run in the browser.",
        "architecture_summary": "Modern web development requires frequent inspection of serialized payloads, token validation, and cryptographic signature generation. Using cloud-based converters presents serious operational security risks by exposing sensitive API tokens, database connection strings, and user credentials to third-party logs. OmniTools runs these operations in the browser, so the payload you paste is not uploaded to an OmniTools server.",
        "standards": ["RFC 8259 (JSON Data Interchange Format)", "RFC 2104 (HMAC Keyed-Hashing)", "RFC 4122 (UUID v4 Generation)", "RFC 4648 (Base16/32/64 Encodings)", "RFC 7519 (JSON Web Tokens)"]
    },
    "text-formatting": {
        "title": "Text Processing & Editorial Typography Guide",
        "description": "High-speed text analysis, regex transformation, diff checking, and casing conversions optimized for writers, editors, and software engineers.",
        "architecture_summary": "Handling large documents, markdown copy, and code diffs requires high-performance text manipulation with zero transmission latency. OmniTools utilizes V8 string optimization and Unicode-compliant regular expressions (RegExp u-flag) to process documents with hundreds of thousands of words in sub-millisecond frames without exhausting system memory.",
        "standards": ["Unicode Standard Annex #29 (Text Segmentation)", "CommonMark Markdown Specification", "RFC 3986 (URI Percent-Encoding)", "WCAG 2.1 Reading Level Standards"]
    },
    "everyday-math": {
        "title": "High-Precision Mathematics & Unit Conversion Standards",
        "description": "Verified financial, temporal, physical, and scientific conversion calculators implementing IEEE 754 precision standards.",
        "architecture_summary": "Precision in numerical computation is paramount. OmniTools avoids common JavaScript floating-point representation bugs by employing rigorous rounding heuristics, BigInt for large integers, and the native ECMAScript Internationalization API (Intl) for locale-aware number and currency formatting.",
        "standards": ["IEEE 754-2019 Floating-Point Arithmetic", "ISO 8601 Date and Time Representations", "NIST Special Publication 811 (SI Units)", "FINRA Financial Math Guidelines"]
    },
    "media-css-design": {
        "title": "Modern CSS Architecture & Visual Asset Standards",
        "description": "Hardware-accelerated CSS generator suite and in-browser HTML5 Canvas image manipulation utilities.",
        "architecture_summary": "Visual styling tools frequently suffer from poor cross-browser compatibility. OmniTools generates clean, standards-compliant CSS3 code leveraging CSS Variables, Flexbox, Grid, and modern color spaces. In-browser image processing executes via HTML5 Canvas 2D contexts with zero cloud uploads.",
        "standards": ["W3C CSS Box Model Module Level 3", "W3C CSS Color Module Level 4", "WCAG 2.1 Contrast Ratio Standards (1.4.3 & 1.4.6)", "HTML5 Canvas 2D Context Specs"]
    },
    "quick-utilities": {
        "title": "System Diagnostics & Productivity Tool Architecture",
        "description": "Client-side timing benchmarks, cryptographically secure random number generators, and hardware inspection tools.",
        "architecture_summary": "OmniTools productivity tools utilize native browser hardware interfaces, including the Web Audio API for latency-free metronome audio synthesis, Web Cryptography API for CSPRNG passphrase generation, and the Navigation Timing API for real-time latency diagnostics.",
        "standards": ["W3C Web Cryptography API (CSPRNG)", "W3C Web Audio API Specification", "W3C High Resolution Time Level 3", "RFC 4086 Randomness Requirements"]
    }
}

# Rich tool-specific deep dives, CLI/code equivalents, and specifications
TOOL_DETAILS = {
    "subnet-calculator": {
        "deep_dive": """The OmniTools IPv4 Subnet and CIDR Calculator performs real-time bitwise network calculations based on RFC 1519 (Classless Inter-Domain Routing) and RFC 791 (Internet Protocol). 
By converting standard IPv4 dotted-decimal octets into 32-bit binary integers, the calculator applies bitwise AND operations with the subnet mask to determine the exact network base address, broadcast address, and host capacity.
In modern cloud engineering (AWS VPC, Google Cloud VPC, Azure VNet) and on-premises network architecture, precise subnet allocation prevents IP address exhaustion and routing overlap conflicts. The arithmetic runs in your browser.

Worked example. Take 192.168.1.10/24. The prefix /24 means the first 24 bits are the network, so the mask is 255.255.255.0. The network address is 192.168.1.0. The broadcast address is 192.168.1.255. Of the 256 addresses in the block, 254 can be assigned to hosts (192.168.1.1 through 192.168.1.254).""",
        "use_cases": [
            "<strong>Cloud Infrastructure (AWS/GCP/Azure):</strong> Planning non-overlapping VPC CIDR blocks and public/private subnet allocations for multi-tier microservices.",
            "<strong>Enterprise Network Engineering:</strong> Configuring router access control lists (ACLs), DHCP scope ranges, and OSPF/BGP routing summaries.",
            "<strong>DevOps &amp; Docker Orchestration:</strong> Defining bridge network ranges and Kubernetes pod CIDR allocations."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for Subnet Calculation",
            "bash": "# Calculate subnet via ipcalc\nipcalc 192.168.1.0/24\n\n# Inspect local interface subnet\nip -o -f inet addr show",
            "python": "import ipaddress\n\nnet = ipaddress.ip_network('192.168.1.0/24', strict=False)\nprint(f'Network: {net.network_address}')\nprint(f'Broadcast: {net.broadcast_address}')\nprint(f'Usable Hosts: {net.num_addresses - 2}')\nprint(f'Netmask: {net.netmask}')",
            "js": "// Node.js IP subnet calculation via bitwise ops\nfunction cidrToMask(bits) {\n  const mask = ~(2 ** (32 - bits) - 1);\n  return [24, 16, 8, 0].map(s => (mask >>> s) & 255).join('.');\n}\nconsole.log(cidrToMask(24)); // '255.255.255.0'"
        },
        "spec_table": {
            "headers": ["CIDR Prefix", "Subnet Mask", "Total Addresses", "Usable Usable Hosts", "Common Use Case"],
            "rows": [
                ["/32", "255.255.255.255", "1", "1 (Single Host)", "Host route, firewall rule"],
                ["/30", "255.255.255.252", "4", "2", "Point-to-point router links"],
                ["/28", "255.255.255.240", "16", "14", "Small cluster, DMZ subnet"],
                ["/24", "255.255.255.0", "256", "254", "Standard office LAN, AWS subnet"],
                ["/20", "255.255.240.0", "4,096", "4,094", "Regional cloud VPC tier"],
                ["/16", "255.255.0.0", "65,536", "65,534", "Entire corporate network / VPC"]
            ]
        },
        "extra_faqs": [
            {"q": "What is the difference between network address and broadcast address?", "a": "The network address is the lowest IP in the subnet (all host bits 0) and identifies the subnet itself. The broadcast address is the highest IP (all host bits 1) used to send packets to all hosts in that subnet. Neither can be assigned to individual network interfaces."},
            {"q": "Why does AWS reserve 5 IP addresses per subnet instead of 2?", "a": "Standard networking reserves 2 addresses (network and broadcast). AWS reserves an additional 3 addresses for the VPC router (.1), DNS server (.2), and future internal service use (.3)."},
            {"q": "Is my private IP configuration uploaded anywhere?", "a": "Never. Calculations execute purely in browser memory via JavaScript bitwise operations. Your internal network architecture remains completely secure."}
        ]
    },
    "hmac-generator": {
        "deep_dive": """The OmniTools HMAC Generator calculates Hash-based Message Authentication Codes in accordance with RFC 2104. 
HMAC provides cryptographic data integrity and authenticity verification by combining a cryptographic hash function (SHA-256, SHA-512, SHA-384, or SHA-1) with a shared secret key through inner and outer padding passes ($H(K \\oplus \\text{opad} \\parallel H(K \\oplus \\text{ipad} \\parallel m))$).
Our implementation uses the native browser Web Cryptography API (`window.crypto.subtle.sign`), ensuring hardware-accelerated cryptographic performance without third-party dependencies. Sensitive webhook signing secrets, API tokens, and authorization headers never cross the internet.""",
        "use_cases": [
            "<strong>Webhook Signature Verification:</strong> Validating incoming webhook payloads from payment gateways (Stripe, PayPal, Adyen) and developer platforms (GitHub, Twilio).",
            "<strong>API Request Authentication:</strong> Generating AWS Signature Version 4 (SigV4) headers or custom HMAC request tokens.",
            "<strong>Data Integrity &amp; Tamper Detection:</strong> Ensuring transmitted configuration files or session tokens have not been modified in transit."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for HMAC Generation",
            "bash": "# HMAC-SHA256 in Bash via OpenSSL\necho -n \"payload_data\" | openssl dgst -sha256 -hmac \"secret_key\"",
            "python": "import hmac, hashlib\n\nsecret = b'secret_key'\nmsg = b'payload_data'\nh = hmac.new(secret, msg, hashlib.sha256).hexdigest()\nprint('HMAC-SHA256:', h)",
            "js": "// Node.js HMAC\nconst crypto = require('crypto');\nconst hmac = crypto.createHmac('sha256', 'secret_key')\n                   .update('payload_data')\n                   .digest('hex');\nconsole.log(hmac);"
        },
        "spec_table": {
            "headers": ["Algorithm", "Digest Size", "Block Size", "Security Level", "Primary Standards"],
            "rows": [
                ["HMAC-SHA256", "256 bits (64 hex)", "512 bits", "Strong (Recommended)", "NIST SP 800-107, RFC 4868"],
                ["HMAC-SHA512", "512 bits (128 hex)", "1024 bits", "Very Strong", "NIST SP 800-107, FIPS 180-4"],
                ["HMAC-SHA384", "384 bits (96 hex)", "1024 bits", "Strong", "FIPS 180-4, NSA Suite B"],
                ["HMAC-SHA1", "160 bits (40 hex)", "512 bits", "Legacy / Deprecated", "RFC 2104 (Legacy webhooks only)"]
            ]
        },
        "extra_faqs": [
            {"q": "What makes HMAC more secure than standard hashing?", "a": "A standard hash $H(key + message)$ is vulnerable to length-extension attacks. HMAC solves this through its nested two-pass hashing construction with inner and outer pads."},
            {"q": "How can I verify a webhook signature securely?", "a": "Always use a constant-time comparison algorithm (such as crypto.timingSafeEqual in Node.js or hmac.compare_digest in Python) to prevent timing side-channel attacks."},
            {"q": "Are secret keys saved in my browser cache?", "a": "No. Keys are kept in transient JavaScript memory and are immediately cleared when you close or refresh the tab."}
        ]
    },
    "json-beautifier": {
        "deep_dive": """The OmniTools JSON Beautifier, Validator, and Formatter parses raw JSON documents according to RFC 8259 specifications. 
It constructs an abstract syntax representation in client memory, normalizes string escapes, detects structural syntax errors (such as unquoted keys, trailing commas, or missing brackets), and re-serializes the data with configurable 2-space, 4-space, or tab indentation.
The formatter uses the browser's JSON.parse and JSON.stringify. It does not accept comments, single-quoted keys, or trailing commas, because those are not valid JSON.

Worked example. Paste {"name":"Ada","ok":true} and choose 2-space indent. The result is:

{
  "name": "Ada",
  "ok": true
}

A trailing comma, as in {"name":"Ada",}, is rejected. Remove the comma and format again.""",
        "use_cases": [
            "<strong>API Debugging &amp; Payload Inspection:</strong> Formatting unreadable minified REST and GraphQL JSON payloads returned from production servers.",
            "<strong>Configuration File Validation:</strong> Cleaning and linting complex configuration files (package.json, tsconfig.json, Kubernetes ConfigMaps).",
            "<strong>Data Sanitation &amp; Minification:</strong> Stripping extraneous whitespace and carriage returns to optimize payload transfer sizes."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for JSON Formatting",
            "bash": "# Pretty print JSON using jq\ncat data.json | jq .\n\n# Format JSON using Python CLI\npython3 -m json.tool data.json",
            "python": "import json\n\nraw = '{\"name\":\"omnitools\",\"status\":200}'\nparsed = json.loads(raw)\nprint(json.dumps(parsed, indent=2, sort_keys=True))",
            "js": "// JavaScript native JSON formatting\nconst raw = '{\"tool\":\"json-beautifier\",\"local\":true}';\nconst formatted = JSON.stringify(JSON.parse(raw), null, 2);\nconsole.log(formatted);"
        },
        "spec_table": {
            "headers": ["JSON Data Type", "Valid Example", "Invalid Pitfall", "RFC 8259 Rule"],
            "rows": [
                ["String", "\"example\"", "'single quotes'", "Must use double quotes (\\\"...\\\")"],
                ["Number", "42, -3.14, 1e6", "0123, NaN, Infinity", "No leading zeros, NaN/Infinity forbidden"],
                ["Boolean", "true, false", "True, False, 1, 0", "Must be lowercase literals"],
                ["Null", "null", "None, undefined", "Only the lowercase literal null is valid"],
                ["Array", "[1, 2, 3]", "[1, 2, 3,]", "Trailing commas are strictly invalid"],
                ["Object", "{\"key\": \"val\"}", "{key: 'val'}", "Keys must be double-quoted strings"]
            ]
        },
        "extra_faqs": [
            {"q": "Why does JSON forbid trailing commas?", "a": "RFC 8259 strictly forbids trailing commas to ensure unambiguous parsing across all programming languages and older legacy parsers."},
            {"q": "Can OmniTools format huge JSON files without crashing?", "a": "Yes. Because operations run directly in local browser memory without network timeouts, you can comfortably format files up to tens of megabytes depending on available RAM."},
            {"q": "Does OmniTools support JSON5 or JSON with comments?", "a": "Standard JSON strictly disallows comments (// or /* */). Our formatter adheres to the official RFC 8259 standard to ensure output is valid across all production parsers."}
        ]
    },
    "word-counter": {
        "deep_dive": """The word counter splits text on whitespace. A hyphenated word such as client-side stays one word, because the split happens on spaces, tabs, and line breaks, not on punctuation. Characters are the length of the string, including spaces. The no-space count removes whitespace first.

A sentence is a stretch of text that ends with a period, question mark, or exclamation point. A paragraph is a block separated by a blank line.

Reading time uses 200 words per minute, a common estimate for silent adult reading. The page shows that duration in seconds until it reaches a minute.

Worked example. Paste this line:

Ship the JSON formatter today. Check the diff before you merge.

That is 11 words, 63 characters, and 53 characters without spaces. It is 2 sentences and 1 paragraph. Reading time is 3 seconds, because 11 words at 200 words per minute is 3.3 seconds, and the counter rounds that to 3.""",
        "use_cases": [
            "<strong>Content &amp; Copywriting:</strong> Adhering to strict character limits for Google Search meta titles (50–60 chars), meta descriptions (150–160 chars), and social media posts.",
            "<strong>Academic &amp; Essay Writing:</strong> Monitoring word count boundaries for university thesis papers, scholarship essays, and academic journals.",
            "<strong>Keynote &amp; Podcast Preparation:</strong> Estimating exact speech delivery durations for conference presentations and voiceover scripts."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for Word & Character Counting",
            "bash": "# Count words, lines, and bytes in Linux\nwc -w file.txt\nwc -m file.txt  # Character count\nwc -l file.txt  # Line count",
            "python": "text = 'OmniTools delivers high-speed utilities.'\nwords = len(text.split())\nchars = len(text)\nchars_no_spaces = len(text.replace(' ', ''))\nprint(f'Words: {words}, Characters: {chars}')",
            "js": "// Precise JS word counting regex\nconst text = 'Precision client-side web tools.';\nconst words = (text.trim().match(/\\S+/g) || []).length;\nconst readingTimeMin = Math.ceil(words / 200);\nconsole.log({ words, readingTimeMin });"
        },
        "spec_table": {
            "headers": ["Publishing Medium", "Recommended Length", "Metric Priority", "Optimization Goal"],
            "rows": [
                ["SEO Meta Title", "50–60 characters", "Characters (with spaces)", "Prevent SERP pixel truncation"],
                ["SEO Meta Description", "150–160 characters", "Characters (with spaces)", "Maximize search click-through rate"],
                ["X / Twitter Post", "280 characters", "Grapheme clusters", "Single-tweet readability"],
                ["Blog Post Article", "1,200–2,500 words", "Word count & reading time", "Comprehensive topic authority"],
                ["Speech (5 Minutes)", "650–750 words", "Speaking time (130–150 wpm)", "Natural presentation cadence"]
            ]
        },
        "extra_faqs": [
            {"q": "How is reading time calculated?", "a": "Standard adult silent reading speed benchmarks range between 200 and 250 words per minute. OmniTools defaults to an industry-standard 200 wpm baseline for clear comprehension."},
            {"q": "How does OmniTools handle hyphenated words?", "a": "Hyphenated words like 'client-side' or 'real-time' are treated as single semantic word units, matching standard style guides and Google search indexing rules."},
            {"q": "Is my draft text stored or indexed anywhere?", "a": "Never. Text never leaves your browser window. No drafts are ever logged, sent to servers, or used for AI training."}
        ]
    },
    "base64-tool": {
        "deep_dive": """The OmniTools Base64 Encoder and Decoder converts binary and string data to ASCII radix-64 representations in compliance with RFC 4648. 
Base64 encoding takes 3 bytes of binary data (24 bits) and maps them into 4 printable ASCII characters (6 bits each) chosen from a 64-character index table (A–Z, a–z, 0–9, +, /). When the input byte count is not divisible by 3, '=' padding characters are appended to maintain alignment.
Standard JavaScript btoa and atob throw on characters outside Latin-1. This encoder turns the text into UTF-8 bytes first, so accented letters and emoji round-trip. URL-safe mode replaces + with - and / with _.

Worked example. Encode the word OmniTools. The result is T21uaVRvb2xz. Decoding that string returns OmniTools. The word is 9 bytes, which divides evenly by 3, so there is no = padding.""",
        "use_cases": [
            "<strong>Web Development &amp; APIs:</strong> Encoding Basic Authentication authorization headers (`Authorization: Basic <base64>`).",
            "<strong>Data URIs &amp; Inline Assets:</strong> Embedding small SVG icons, fonts, and images directly into CSS and HTML files.",
            "<strong>Data Serialization:</strong> Safely transmitting binary payloads through text-only transmission channels (JSON, XML, Email)."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for Base64 Encoding & Decoding",
            "bash": "# Encode string to Base64 in Bash\necho -n \"OmniTools\" | base64\n\n# Decode Base64 string\necho \"T21uaVRvb2xz\" | base64 --decode",
            "python": "import base64\n\n# Unicode-safe Base64 in Python\nencoded = base64.b64encode('OmniTools 🚀'.encode('utf-8')).decode('ascii')\ndecoded = base64.b64decode(encoded).decode('utf-8')\nprint(f'Encoded: {encoded} -> Decoded: {decoded}')",
            "js": "// Node.js Buffer Base64\nconst str = 'OmniTools 🚀';\nconst b64 = Buffer.from(str, 'utf-8').toString('base64');\nconst original = Buffer.from(b64, 'base64').toString('utf-8');\nconsole.log({ b64, original });"
        },
        "spec_table": {
            "headers": ["Variant", "Alphabet", "Padding", "URL Safe?", "Primary Standards"],
            "rows": [
                ["Standard Base64", "A–Z, a–z, 0–9, +, /", "Yes ('=')", "No (requires %-encoding)", "RFC 4648 §4, MIME RFC 2045"],
                ["URL-Safe Base64", "A–Z, a–z, 0–9, -, _", "Optional / Stripped", "Yes (safe in query strings)", "RFC 4648 §5, JWT RFC 7515"],
                ["Base64 Data URI", "data:[mime];base64,[data]", "Yes", "HTML/CSS Only", "RFC 2397 Data URI scheme"]
            ]
        },
        "extra_faqs": [
            {"q": "Does Base64 encrypt my data?", "a": "No. Base64 is an encoding scheme, NOT encryption. Anyone can decode a Base64 string instantly. Never use Base64 alone to protect passwords, keys, or sensitive credentials."},
            {"q": "Why does Base64 increase data size by ~33%?", "a": "Base64 represents 3 bytes (24 bits) of data using 4 ASCII characters (32 bits). This 4:3 ratio naturally creates an overhead expansion of approximately 33.3%."},
            {"q": "Can I encode binary files safely?", "a": "Yes. Our client-side FileReader API reads binary files directly into Uint8Array buffers, ensuring byte-for-byte fidelity without data loss."}
        ]
    },
    "jwt-decoder": {
        "deep_dive": """The OmniTools JWT Decoder inspects and unpacks JSON Web Tokens in accordance with RFC 7519. 
A JWT consists of three dot-separated Base64URL-encoded segments: the Header (algorithm and token type), the Payload (claims, subject, issuer, expiration, and custom data), and the Cryptographic Signature.
This page decodes the header and payload. It does not check the signature. A signature check needs the secret or public key, and that key should not be pasted into a browser tool.

Worked example. The payload segment eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ decodes to {"sub":"1234567890","name":"John Doe","iat":1516239022}. The iat value 1516239022 is 2018-01-18 01:30:22 UTC. Anyone who has the token can read those claims. The signature only tells a verifier that the issuer signed them.""",
        "use_cases": [
            "<strong>OAuth 2.0 &amp; OpenID Connect:</strong> Inspecting ID tokens and access tokens issued by identity providers (Auth0, Okta, Firebase, AWS Cognito).",
            "<strong>Token Expiration Audits:</strong> Checking `exp` (expiration) and `nbf` (not before) claims to troubleshoot authentication session drops.",
            "<strong>Role-Based Access Verification:</strong> Auditing user roles, scopes, and claims embedded in API authorization headers."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for JWT Inspection",
            "bash": "# Decode JWT payload in terminal using jq\nTOKEN=\"ey...\"\necho $TOKEN | cut -d. -f2 | base64 -d 2>/dev/null | jq .",
            "python": "import json, base64\n\ntoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'\npayload_b64 = token.split('.')[1] + '=='\npayload = json.loads(base64.urlsafe_b64decode(payload_b64))\nprint('JWT Claims:', json.dumps(payload, indent=2))",
            "js": "// Browser client-side JWT payload decoder\nfunction parseJwt(token) {\n  const base64Url = token.split('.')[1];\n  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');\n  return JSON.parse(decodeURIComponent(escape(atob(base64))));\n}"
        },
        "spec_table": {
            "headers": ["Standard Claim", "Key Name", "Type", "Description", "Validation Rule"],
            "rows": [
                ["Issuer", "iss", "String", "Entity that issued the token", "Must match expected IdP URL"],
                ["Subject", "sub", "String", "Unique principal identifier (User ID)", "Stable identifier for user"],
                ["Audience", "aud", "String / Array", "Intended recipient of the token", "Must match backend client ID"],
                ["Expiration Time", "exp", "NumericDate", "Unix epoch timestamp of expiration", "Token invalid if current time > exp"],
                ["Issued At", "iat", "NumericDate", "Unix epoch timestamp when issued", "Used to calculate token age"],
                ["Not Before", "nbf", "NumericDate", "Token cannot be accepted before this time", "Token invalid if current time < nbf"]
            ]
        },
        "extra_faqs": [
            {"q": "Can OmniTools verify the cryptographic signature of my JWT?", "a": "Decoders can inspect the header and claims without a secret key. Signature verification requires the private key or shared secret, which you should never share with any web browser tool."},
            {"q": "Is it safe to paste real customer tokens here?", "a": "Yes. OmniTools runs 100% in your browser. No token data is ever transmitted, logged, or cached on any remote server."},
            {"q": "Why is my token showing 'Expired'?", "a": "The `exp` claim contains a Unix timestamp. OmniTools compares this against your device's current clock. If your computer's system clock is skewed, verify that time sync is enabled."}
        ]
    },
    "aspect-ratio-calculator": {
        "deep_dive": """The OmniTools Aspect Ratio Calculator computes proportional width and height dimensions based on fundamental geometric ratios and greatest common divisor (GCD) algorithms.
When designing responsive websites, rendering 4K/1080p video, or configuring CSS container queries, preserving exact aspect ratios prevents layout shifts (Cumulative Layout Shift, CLS) and visual distortion.
Our calculator calculates exact matching dimensions, finds the simplest integer aspect ratio using Euclid's GCD algorithm, and generates ready-to-use CSS `aspect-ratio` properties for modern web layouts.""",
        "use_cases": [
            "<strong>Responsive Web Design:</strong> Configuring modern CSS `aspect-ratio: 16 / 9` and setting width/height attributes on `<img>` tags to eliminate CLS.",
            "<strong>Video Production &amp; Streaming:</strong> Calculating downscaled or upscaled canvas resolutions for YouTube, TikTok, Instagram Reels, and Twitch.",
            "<strong>UI/UX Design:</strong> Scaling modal viewports, card thumbnails, and hero banners while retaining exact proportional composition."
        ],
        "cli_snippet": {
            "title": "CSS & Code Equivalents for Aspect Ratio Calculation",
            "bash": "# Find image dimensions and aspect ratio via ImageMagick\nidentify -format \"%w x %h\\n\" image.png\n\n# Using ffprobe for video dimensions\nffprobe -v error -select_streams v:0 -show_entries stream=width,height input.mp4",
            "python": "import math\n\ndef get_aspect_ratio(width, height):\n    gcd = math.gcd(width, height)\n    return f\"{width // gcd}:{height // gcd}\"\n\nprint(get_aspect_ratio(1920, 1080)) # '16:9'",
            "js": "// Modern CSS aspect ratio property\n/* CSS Aspect Ratio Standard */\n.video-player {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n}"
        },
        "spec_table": {
            "headers": ["Standard Ratio", "Common Resolutions", "Common Medium", "Decimal Factor"],
            "rows": [
                ["16:9", "1920×1080, 2560×1440, 3840×2160", "Widescreen HDTV, YouTube, Laptops", "1.777..."],
                ["9:16", "1080×1920, 720×1280", "TikTok, Instagram Stories, YouTube Shorts", "0.5625"],
                ["4:3", "1024×768, 1600×1200", "Retro monitors, iPad displays, photography", "1.333..."],
                ["21:9", "2560×1080, 3440×1440", "Ultrawide gaming monitors, CinemaScope", "2.333..."],
                ["1:1", "1080×1080, 500×500", "Instagram feed posts, avatars, app icons", "1.000"]
            ]
        },
        "extra_faqs": [
            {"q": "How do I calculate the new height if I know the width?", "a": "Multiply the new width by the original height, then divide by the original width: $\\text{New Height} = (\\text{New Width} \\times \\text{Original Height}) / \\text{Original Width}$."},
            {"q": "Why is the CSS aspect-ratio property better than padding-bottom hacks?", "a": "The modern CSS `aspect-ratio` property is natively supported in all modern browsers and eliminates the need for container wrappers and `padding-bottom: 56.25%` hacks."},
            {"q": "What is Euclid's algorithm for aspect ratios?", "a": "Euclid's algorithm finds the Greatest Common Divisor (GCD) of two numbers by repeatedly dividing the remainder until it reaches zero, reducing raw dimensions like 1920×1080 to their simplest fractional form (16:9)."}
        ]
    },
    "uuid-generator": {
        "deep_dive": """The OmniTools UUID Generator creates cryptographically secure Version 4 Universally Unique Identifiers in strict compliance with RFC 4122. 
A Version 4 UUID contains 128 bits of data, with 122 bits generated from a cryptographically secure pseudorandom number generator (CSPRNG), 4 bits reserved for the version identifier (`0100` = version 4), and 2 bits for the RFC 4122 variant (`10` = variant 1).
The probability of generating two identical v4 UUIDs (a collision) is infinitesimal: approximately 1 in $2^{122}$ (or roughly 1 in $5.3 \\times 10^{36}$). Even when generating 1 billion UUIDs per second for 100 years, the probability of a duplicate remains below one in a billion.
The generator uses crypto.getRandomValues() in the browser.""",
        "use_cases": [
            "<strong>Database Primary Keys:</strong> Generating globally unique non-sequential entity IDs across distributed database clusters (PostgreSQL, MongoDB, CockroachDB).",
            "<strong>Distributed Tracing &amp; Observability:</strong> Assigning unique request IDs (X-Correlation-ID) across microservice HTTP headers.",
            "<strong>Session &amp; Token Management:</strong> Creating unguessable nonce values and secure temporary transaction tokens."
        ],
        "cli_snippet": {
            "title": "Terminal & Code Equivalents for UUID Generation",
            "bash": "# Generate v4 UUID in Linux / macOS\nuuidgen\n\n# Generate lowercase v4 UUID via python\npython3 -c \"import uuid; print(uuid.uuid4())\"",
            "python": "import uuid\n\n# Generate RFC 4122 v4 UUID\nnew_id = uuid.uuid4()\nprint(f'Standard UUID: {new_id}')\nprint(f'Hex digits: {new_id.hex}')",
            "js": "// Native Web Crypto UUID (Browser & Node.js 16+)\nconst uniqueId = crypto.randomUUID();\nconsole.log(uniqueId);"
        },
        "spec_table": {
            "headers": ["UUID Version", "Generation Basis", "Random Bits", "RFC Standard", "Collision Risk"],
            "rows": [
                ["Version 1", "MAC Address & Timestamp", "0 bits (Deterministic)", "RFC 4122 §4.2", "Risk of machine tracking"],
                ["Version 3", "MD5 Hash & Namespace", "0 bits (Deterministic)", "RFC 4122 §4.3", "Vulnerable to MD5 collisions"],
                ["Version 4", "CSPRNG Random Entropy", "122 bits", "RFC 4122 §4.4", "Virtually zero collision risk"],
                ["Version 5", "SHA-1 Hash & Namespace", "0 bits (Deterministic)", "RFC 4122 §4.3", "Deterministic / Reproducible"]
            ]
        },
        "extra_faqs": [
            {"q": "Can two users generate the same UUID v4?", "a": "Statistically impossible under normal operating conditions. With 122 bits of true entropy, there are $5.3 \\times 10^{36}$ possible combinations—vastly exceeding the number of stars in the observable universe."},
            {"q": "Why are UUIDs formatted with dashes (8-4-4-4-12)?", "a": "The standard 8-4-4-4-12 hexadecimal grouping represents the historical subfields of Version 1 UUIDs (time_low, time_mid, time_hi_and_version, clock_seq, node) as defined in RFC 4122."},
            {"q": "Are the generated UUIDs saved or tracked?", "a": "Never. Generation executes 100% locally on your machine via your browser's Web Cryptography subsystem."}
        ]
    },
    "timestamp-converter": {
        "deep_dive": """A Unix timestamp counts seconds since 1970-01-01 00:00:00 UTC. That instant is called the epoch. A 10-digit number is seconds. A 13-digit number is milliseconds. This converter treats a value under 10,000,000,000 as seconds and multiplies it by 1,000 before building a date. Larger values are already milliseconds.

The page shows the same instant in UTC and in the time zone of the computer you are using.

Worked example. 1700000000 is 10 digits, so it is seconds. It is 2023-11-14 22:13:20 UTC. If your computer is set to Korea Standard Time (UTC+9), the local line reads Wed Nov 15 2023 07:13:20 GMT+0900.""",
        "use_cases": [
            "<strong>Log lines:</strong> A server log stores 1700000000. Paste it to see the UTC time instead of counting seconds by hand.",
            "<strong>API fields:</strong> JSON often stores created_at as seconds. If the number has 13 digits, it is already milliseconds and should not be multiplied by 1,000 again."
        ],
        "spec_table": {
            "headers": ["Digits", "Unit", "Example", "UTC result"],
            "rows": [
                ["10", "Seconds", "1700000000", "2023-11-14 22:13:20"],
                ["13", "Milliseconds", "1700000000000", "2023-11-14 22:13:20"],
                ["10", "Seconds", "0", "1970-01-01 00:00:00"]
            ]
        },
        "extra_faqs": [
            {"q": "Why do some timestamps have 13 digits?", "a": "JavaScript Date.now() returns milliseconds. Unix time in most databases and in Python's time.time() is seconds. Ten digits means seconds. Thirteen digits means milliseconds."},
            {"q": "Does the converter change my clock?", "a": "No. It only reads the timestamp you paste and formats it with the browser's Date object."}
        ]
    },
    "text-diff": {
        "deep_dive": """The diff checker compares two texts one line at a time. It does not mark a changed word inside a line. If line 3 differs, the whole original line is shown with a minus and the whole new line is shown with a plus. Lines that match are shown unchanged. A line that exists only on the right is an addition. A line that exists only on the left is a deletion.

Worked example. Original:

alpha
beta
gamma

Modified:

alpha
beta v2
gamma
delta

The result keeps alpha, marks beta as removed and beta v2 as added, keeps gamma, and marks delta as added.""",
        "use_cases": [
            "<strong>A small edit:</strong> Paste the old paragraph on the left and the new paragraph on the right before you send it.",
            "<strong>Config files:</strong> Compare two .env or JSON exports when you need to see which lines changed."
        ],
        "extra_faqs": [
            {"q": "Does it ignore spaces?", "a": "No. A line with a trailing space is not equal to the same line without that space."},
            {"q": "Can it diff a moved paragraph?", "a": "It compares by line number, not by content that moved. If you insert a line at the top, every following line is reported as changed."}
        ]
    },
    "regex-matcher": {
        "deep_dive": """The regex sandbox compiles the pattern with JavaScript's RegExp. The flags you check are passed through: g finds every match, i ignores letter case, and m changes how ^ and $ treat line breaks. Parentheses create capture groups, and the page lists those groups next to each match.

Worked example. Pattern \\b(\\w+)\\s+\\1\\b with the g flag, tested against "the the cat sat sat". It matches "the the" and "sat sat". Group 1 is the repeated word: the, then sat. The pattern means a word, whitespace, then the same word again.

A pattern that is not valid JavaScript, such as an unclosed bracket, shows the browser's syntax error instead of matches.""",
        "use_cases": [
            "<strong>Repeated words:</strong> \\b(\\w+)\\s+\\1\\b finds doubled words in a draft.",
            "<strong>A date:</strong> \\d{4}-\\d{2}-\\d{2} finds values shaped like 2026-09-29. It does not check that the month is real."
        ],
        "extra_faqs": [
            {"q": "Is this the same regex as Python?", "a": "No. Lookbehind, possessive quantifiers, and some escape sequences differ. Test the pattern in the language that will run it."},
            {"q": "What does the g flag change?", "a": "Without g, the search stops at the first match. With g, every non-overlapping match is listed."}
        ]
    },
    "percentage-calculator": {
        "deep_dive": """The page has three calculations.

A percent of a number is (percent / 100) times the number.
What percent one number is of another is (part / whole) times 100.
The change from an old number to a new number is ((new - old) / old) times 100. A negative result is a decrease.

Worked example. 15% of 250 is 37.5. 45 is 25% of 180, because 45 / 180 = 0.25. Going from 80 to 100 is a 25% increase, because (100 - 80) / 80 = 0.25.""",
        "use_cases": [
            "<strong>A discount:</strong> 20% of 80 is 16, so the sale price is 64.",
            "<strong>A raise:</strong> From 80 to 100 is +25%, not +20. The base is the old number."
        ],
        "spec_table": {
            "headers": ["Question", "Formula", "Example", "Result"],
            "rows": [
                ["p% of n", "(p / 100) × n", "15% of 250", "37.5"],
                ["a is what % of b", "(a / b) × 100", "45 of 180", "25%"],
                ["Change from a to b", "((b - a) / a) × 100", "80 to 100", "+25%"]
            ]
        },
        "extra_faqs": [
            {"q": "Why is 80 to 100 not a 20% increase?", "a": "Twenty is 20% of 100, but the change is measured from the starting value. Twenty is 25% of 80."},
            {"q": "What happens if the starting number is 0?", "a": "Percent change divides by the old number. From 0 to any other number, that division is undefined, so the result is not a meaningful percent."}
        ]
    },
    "cron-explainer": {
        "deep_dive": """A standard cron expression has five fields, in this order: minute, hour, day of month, month, day of week. Stars mean every value. A range such as 1-5 limits the field. A step such as */15 means every 15 units.

This explainer turns those five fields into one English sentence. It expects exactly five fields. A six-field expression that includes seconds, or a name like @daily, is reported as invalid.

Worked example. 0 9 * * 1-5 reads: Runs at minute 0, past hour 9:00, Monday through Friday. That is 09:00 on Monday, Tuesday, Wednesday, Thursday, and Friday.

The five upcoming times under the sentence are spaced 15 minutes apart from your clock. They illustrate a list of times. They are not a full cron calendar.""",
        "use_cases": [
            "<strong>A weekday job:</strong> 0 9 * * 1-5 is 09:00 on weekdays.",
            "<strong>The first of the month:</strong> 0 0 1 * * is 00:00 on day 1 of every month."
        ],
        "spec_table": {
            "headers": ["Field", "Allowed values", "Example", "Meaning"],
            "rows": [
                ["Minute", "0–59", "0", "On the hour"],
                ["Hour", "0–23", "9", "09:00"],
                ["Day of month", "1–31", "*", "Every day"],
                ["Month", "1–12", "*", "Every month"],
                ["Day of week", "0–6 (0 = Sunday)", "1-5", "Monday through Friday"]
            ]
        },
        "extra_faqs": [
            {"q": "Why was my expression rejected?", "a": "It needs five fields separated by spaces. @daily and expressions with a seconds field are a different dialect."},
            {"q": "Does day-of-week 0 mean Sunday?", "a": "Yes. In this explainer, 0 and 7 both mean Sunday. 1 is Monday and 5 is Friday."}
        ]
    },
    "qr-code-generator": {
        "deep_dive": """A QR code stores the text you type as a grid of dark and light modules. A phone camera reads that grid back into the same text. This generator draws the code in the browser from the contents of the box. It does not upload the text, and the PNG download is produced on your computer.

The box is plain text. A web address works because a URL is text. A Wi-Fi setup works only if you paste the WIFI: string yourself. The page does not build that string for you.

Worked example. Type https://getomnitools.com and download the PNG. Scanning it should open that address. A longer text makes a denser code. If the text is too long for the size you picked, shorten the text or raise the error-correction setting the control offers.""",
        "use_cases": [
            "<strong>A link:</strong> Paste a full https URL, including the scheme, so the camera opens it.",
            "<strong>A Wi-Fi string:</strong> WIFI:T:WPA;S:NetworkName;P:secret;; is plain text a phone can interpret. Replace the name and password before you encode it."
        ],
        "extra_faqs": [
            {"q": "Does the QR code expire?", "a": "No. The image only contains the text you encoded. It keeps working until you stop hosting the address, or until you change a password that was written into the text."},
            {"q": "Is the text sent to a QR service?", "a": "No. The image is drawn in your browser."}
        ]
    },
    "password-generator": {
        "deep_dive": """The generator builds each character with crypto.getRandomValues, the browser's cryptographic random source. It does not use Math.random. You choose the length and which sets to include: A–Z, a–z, 0–9, and the symbol set shown on the page.

The strength line is entropy, estimated as length × log2(pool size), rounded to the nearest integer. Under 40 bits is labeled Weak. From 40 to 64 bits is Medium. 65 bits and above is Very Strong.

Worked example. Leave every set checked and set the length to 16. The default pool has 91 characters, and 16 × log2(91) rounds to 104 bits, so the meter says Very Strong. Each click produces a different password. The page does not store it.

A password made only of digits at length 8 is 8 × log2(10), about 27 bits, and the meter labels it Weak.""",
        "use_cases": [
            "<strong>An account password:</strong> Use 16 or more characters with letters, numbers, and symbols, then store it in a password manager.",
            "<strong>A shorter code:</strong> If a site rejects symbols, turn symbols off and add length until the meter is still Very Strong."
        ],
        "extra_faqs": [
            {"q": "Can I recover a password the page just made?", "a": "No. It exists only in the text box until you copy it or refresh."},
            {"q": "Is a Very Strong label a guarantee?", "a": "It measures length and alphabet size. It does not know whether you reused the password on another site."}
        ]
    },
    "salary-calculator": {
        "deep_dive": """Hourly pay converts to a gross salary with three inputs: the hourly wage, hours per week, and paid weeks per year.

Weekly pay is wage × hours per week.
Annual pay is weekly pay × weeks per year.
Monthly pay is annual pay ÷ 12, rounded to the nearest dollar.
The daily figure assumes a five-day week: wage × (hours per week ÷ 5). It is not a calendar-day rate.

Worked example. $35 an hour, 40 hours a week, 52 weeks: weekly pay is $1,400. Annual pay is $72,800. Monthly pay rounds to $6,067. The daily figure is $280, which is 8 hours at $35.

This is gross pay. It does not subtract tax, unpaid leave, or overtime.""",
        "use_cases": [
            "<strong>A job offer:</strong> Compare $35 an hour at 40 hours with a salaried offer of $70,000. At 52 weeks the hourly offer is $72,800 gross.",
            "<strong>A shorter year:</strong> A contractor paid 48 weeks changes the annual total. Set weeks to 48 instead of 52."
        ],
        "spec_table": {
            "headers": ["Input", "Formula", "$35, 40 h, 52 wk"],
            "rows": [
                ["Weekly", "wage × hours", "$1,400"],
                ["Annual", "weekly × weeks", "$72,800"],
                ["Monthly", "annual ÷ 12, rounded", "$6,067"],
                ["Daily", "wage × (hours ÷ 5)", "$280"]
            ]
        },
        "extra_faqs": [
            {"q": "Does this include tax?", "a": "No. The results are gross. Income tax, social insurance, and benefits are not deducted."},
            {"q": "What if I work four days a week?", "a": "Put the real weekly hours in the hours field. The daily line still divides those hours by 5, so use weekly and annual when your week is not five days."}
        ]
    },
    "compound-interest-calculator": {
        "deep_dive": """The calculator compounds monthly. The monthly rate is the annual rate divided by 12. Over n months, with starting principal P and a deposit M added each month, the future value is:

P × (1 + r)^n + M × ((1 + r)^n − 1) / r

r is the monthly rate. If the annual rate is 0, the future value is P plus M × n.

Total principal is P plus every monthly deposit. Interest is the future value minus that principal. Results are rounded to the nearest dollar. This is a projection, not a quote from a bank.

Worked example. Start with $5,000, add $200 a month, at 7.5% a year, for 10 years. That is 120 months and a monthly rate of 0.00625. The future value rounds to $46,146. You put in $29,000 ($5,000 plus $200 × 120). The interest line rounds to $17,146.""",
        "use_cases": [
            "<strong>A savings plan:</strong> $5,000 now and $200 a month at 7.5% for 10 years projects to about $46,146.",
            "<strong>No monthly add:</strong> Set the monthly deposit to 0 to see growth on the starting amount alone."
        ],
        "extra_faqs": [
            {"q": "Why is this different from my bank's number?", "a": "Banks may compound daily, charge fees, or change the rate. This page always compounds monthly and uses the rate you type."},
            {"q": "Are the deposits made at the start or end of the month?", "a": "The formula treats each deposit as earning interest for the remaining months after it is added, which is the ordinary end-of-month annuity."}
        ]
    },
    "contrast-checker": {
        "deep_dive": """Contrast is the WCAG ratio between two colors. The page converts each hex color to relative luminance with the sRGB formula in WCAG 2.1, then computes (lighter + 0.05) / (darker + 0.05).

Normal text passes AA at 4.5:1 and AAA at 7:1. Large text passes AA at 3:1 and AAA at 4.5:1. The UI badge uses 3:1.

Worked example. Text #0F172A on background #FFFFFF has a ratio of 17.85:1. That passes AAA for normal text, large text, and UI. Black #000000 on white is 21:1, the highest ratio two opaque colors can have. #767676 on white is about 4.54:1, which passes AA for normal text and fails AAA.""",
        "use_cases": [
            "<strong>Body text:</strong> #0F172A on #FFFFFF is 17.85:1 and passes AAA.",
            "<strong>A gray that is close to the line:</strong> #767676 on white is about 4.54:1. It passes AA for normal text and fails AAA."
        ],
        "spec_table": {
            "headers": ["Use", "AA", "AAA"],
            "rows": [
                ["Normal text", "4.5:1", "7:1"],
                ["Large text", "3:1", "4.5:1"],
                ["UI components and icons", "3:1", "3:1 on this page"]
            ]
        },
        "extra_faqs": [
            {"q": "What counts as large text?", "a": "WCAG large text is 18pt (24px) and up, or 14pt (about 18.5px) bold and up. This page does not measure your font. It only reports the ratio."},
            {"q": "Do transparent colors work?", "a": "Enter a 6-digit hex color such as #0F172A. The checker does not blend alpha against a page behind the element."}
        ]
    }
}

from seo_guides import EXTRA_TOOL_DETAILS as _EXTRA_TOOL_DETAILS

for _guide_id, _guide in _EXTRA_TOOL_DETAILS.items():
    if _guide_id not in TOOL_DETAILS:
        TOOL_DETAILS[_guide_id] = _guide

def get_tool_deep_dive(tool):
    """Unique guide for priority tools. One specific paragraph for the rest."""
    if tool['id'] in TOOL_DETAILS:
        return TOOL_DETAILS[tool['id']]['deep_dive']

    description = (tool.get('description') or '').strip()
    if description and not description.endswith('.'):
        description += '.'
    return f"{tool['title']}. {description} It runs in your browser, so what you type is not uploaded to an OmniTools server."

def get_tool_use_cases(tool):
    """Only tools with a written guide get scenario bullets."""
    if tool['id'] in TOOL_DETAILS and TOOL_DETAILS[tool['id']].get('use_cases'):
        return TOOL_DETAILS[tool['id']]['use_cases']
    return []

def get_tool_cli_snippets(tool):
    """Only include a code sample when it was written for this tool."""
    if tool['id'] in TOOL_DETAILS and 'cli_snippet' in TOOL_DETAILS[tool['id']]:
        return TOOL_DETAILS[tool['id']]['cli_snippet']
    return None

def get_tool_spec_table(tool):
    """Returns a structured specification or cheat sheet table for the tool."""
    if tool['id'] in TOOL_DETAILS and 'spec_table' in TOOL_DETAILS[tool['id']]:
        return TOOL_DETAILS[tool['id']]['spec_table']
    return None

def get_expanded_faqs(tool):
    """Keep each tool's own questions. Do not stamp the same FAQ onto every page."""
    existing = list(tool.get('faqs', []))

    if tool['id'] in TOOL_DETAILS and 'extra_faqs' in TOOL_DETAILS[tool['id']]:
        for extra in TOOL_DETAILS[tool['id']]['extra_faqs']:
            if not any(f['q'] == extra['q'] for f in existing):
                existing.append(extra)

    return existing
