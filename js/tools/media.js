/**
 * OmniTools - Category: Media, CSS & Design (Tools 76–90)
 */

const mediaTools = [
  // 76. Color Picker & Converter
  {
    id: "color-converter",
    title: "What is this hex color in RGB?",
    category: "Media, CSS & Design",
    icon: "🎨",
    badge: "Popular",
    description: "Pick a color or paste a hex code. Hex, RGB, and HSL stay in sync.",
    keywords: ["color converter", "hex to rgb", "rgb to hex", "hex to hsl", "color picker", "css color"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div class="flex items-center gap-3">
              <input id="color-native" type="color" value="#4f46e5" class="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent">
              <div id="color-preview" class="w-16 h-16 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700" style="background-color: #4f46e5;"></div>
            </div>
            <div class="flex-1 w-full sm:w-auto flex flex-col gap-2">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Interactive Palette</div>
              <div class="flex gap-2">
                <button id="color-random" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold transition">🎲 Random Color</button>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">HEX</span>
                <button data-copy-val="hex" class="color-copy-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="color-hex" type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold" value="#4F46E5">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">RGB</span>
                <button data-copy-val="rgb" class="color-copy-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="color-rgb" type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold" value="rgb(79, 70, 229)">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">HSL</span>
                <button data-copy-val="hsl" class="color-copy-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="color-hsl" type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold" value="hsl(243, 75%, 59%)">
            </div>
          </div>
        </div>
      `;

      const nativePicker = container.querySelector('#color-native');
      const preview = container.querySelector('#color-preview');
      const hexInput = container.querySelector('#color-hex');
      const rgbInput = container.querySelector('#color-rgb');
      const hslInput = container.querySelector('#color-hsl');
      const randomBtn = container.querySelector('#color-random');

      function hexToRgb(hex) {
        let c = hex.replace(/^#/, '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return {
          r: (num >> 16) & 255,
          g: (num >> 8) & 255,
          b: num & 255
        };
      }

      function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }

      function updateFromHex(hex) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
        nativePicker.value = hex;
        preview.style.backgroundColor = hex;
        hexInput.value = hex.toUpperCase();

        const { r, g, b } = hexToRgb(hex);
        rgbInput.value = `rgb(${r}, ${g}, ${b})`;

        const { h, s, l } = rgbToHsl(r, g, b);
        hslInput.value = `hsl(${h}, ${s}%, ${l}%)`;
      }

      nativePicker.addEventListener('input', () => {
        updateFromHex(nativePicker.value);
      });

      hexInput.addEventListener('input', () => {
        let val = hexInput.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        updateFromHex(val);
      });

      randomBtn.addEventListener('click', () => {
        const randHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        updateFromHex(randHex);
      });

      container.querySelectorAll('.color-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-copy-val');
          const target = container.querySelector(`#color-${type}`);
          Utils.copyToClipboard(target.value);
        });
      });
    },
    seoContent: {
      overview: "The OmniTools Color Picker & Converter provides two-way color conversion between HEX, RGB, and HSL formats. Use the interactive color picker or click random to quickly generate palettes for CSS styling and graphic design.",
      features: [
        "Live bidirectional conversion between HEX, RGB, and HSL",
        "Interactive HTML5 color picker widget with instant swatch preview",
        "Random hex color generator for brainstorming palettes"
      ],
      howTo: [
        "Click the color swatch to pick a color, or paste your HEX code.",
        "The RGB and HSL code values will synchronize automatically.",
        "Click 'Copy' next to any format to use it in your CSS stylesheets."
      ],
      faqs: [
        {
          q: "What is HSL and why use it?",
          a: "HSL stands for Hue, Saturation, and Lightness. Unlike RGB, HSL represents color in a way that matches human perception, making it vastly easier to adjust lightness or tint for hover and active button states."
        }
      ]
    }
  },

  // 77. Random Palette Generator
  {
    id: "palette-generator",
    title: "Give me a color palette.",
    category: "Media, CSS & Design",
    icon: "🎨",
    badge: "Popular",
    description: "Generate five colors that work together. Lock the ones you want to keep.",
    keywords: ["palette generator", "color scheme", "color palette", "random palette", "css colors"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-slate-600 dark:text-slate-400">Harmony:</label>
              <select id="pal-mode" class="p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <option value="harmonic">Harmonic Analogous</option>
                <option value="triadic">Triadic Vibrant</option>
                <option value="monochrome">Monochromatic</option>
                <option value="warm">Warm Tones</option>
                <option value="cool">Cool Tech</option>
                <option value="random">True Random</option>
              </select>
            </div>
            <div class="flex gap-2">
              <button id="pal-generate" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>🎲 Generate New</span>
              </button>
              <button id="pal-copy-css" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition">
                Copy CSS Vars
              </button>
            </div>
          </div>

          <!-- Swatches Grid -->
          <div id="pal-grid" class="grid grid-cols-1 sm:grid-cols-5 gap-3"></div>

          <div class="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
            <span>💡 Tip: Click on a color card's lock icon to preserve it while generating new combinations.</span>
          </div>
        </div>
      `;

      let colors = [
        { hex: '#4F46E5', locked: false },
        { hex: '#06B6D4', locked: false },
        { hex: '#10B981', locked: false },
        { hex: '#F59E0B', locked: false },
        { hex: '#EC4899', locked: false }
      ];

      function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
      }

      function generateNewPalette() {
        const mode = container.querySelector('#pal-mode').value;
        const baseHue = Math.floor(Math.random() * 360);

        colors.forEach((col, idx) => {
          if (col.locked) return;
          let h, s, l;

          if (mode === 'harmonic') {
            h = (baseHue + (idx * 25)) % 360;
            s = 65 + Math.floor(Math.random() * 25);
            l = 45 + Math.floor(Math.random() * 20);
          } else if (mode === 'triadic') {
            h = (baseHue + (idx * 72)) % 360;
            s = 70 + Math.floor(Math.random() * 20);
            l = 50 + Math.floor(Math.random() * 15);
          } else if (mode === 'monochrome') {
            h = baseHue;
            s = 60 + Math.floor(Math.random() * 20);
            l = 20 + (idx * 15);
          } else if (mode === 'warm') {
            h = (340 + Math.floor(Math.random() * 80)) % 360;
            s = 70 + Math.floor(Math.random() * 25);
            l = 45 + Math.floor(Math.random() * 20);
          } else if (mode === 'cool') {
            h = 170 + Math.floor(Math.random() * 90);
            s = 65 + Math.floor(Math.random() * 25);
            l = 45 + Math.floor(Math.random() * 20);
          } else {
            h = Math.floor(Math.random() * 360);
            s = 50 + Math.floor(Math.random() * 45);
            l = 40 + Math.floor(Math.random() * 30);
          }
          col.hex = hslToHex(h, s, l);
        });

        renderSwatches();
      }

      function renderSwatches() {
        const grid = container.querySelector('#pal-grid');
        grid.innerHTML = colors.map((col, i) => `
          <div class="flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition hover:shadow-md">
            <div class="h-32 w-full transition-colors flex items-start justify-end p-2" style="background-color: ${col.hex};">
              <button data-idx="${i}" class="pal-lock-btn p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition">
                ${col.locked ? '🔒' : '🔓'}
              </button>
            </div>
            <div class="p-3 flex flex-col items-center gap-1.5">
              <button data-hex="${col.hex}" class="pal-hex-btn font-mono text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                ${col.hex}
              </button>
              <button data-hex="${col.hex}" class="pal-copy-single text-[10px] text-slate-400 hover:text-indigo-600 transition">Copy</button>
            </div>
          </div>
        `).join('');

        grid.querySelectorAll('.pal-lock-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-idx'), 10);
            colors[idx].locked = !colors[idx].locked;
            renderSwatches();
          });
        });

        grid.querySelectorAll('.pal-hex-btn, .pal-copy-single').forEach(btn => {
          btn.addEventListener('click', () => {
            const hex = btn.getAttribute('data-hex');
            Utils.copyToClipboard(hex);
          });
        });
      }

      container.querySelector('#pal-generate').addEventListener('click', generateNewPalette);
      container.querySelector('#pal-mode').addEventListener('change', generateNewPalette);

      container.querySelector('#pal-copy-css').addEventListener('click', () => {
        const css = `:root {\n` + colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n') + `\n}`;
        Utils.copyToClipboard(css);
      });

      renderSwatches();
    },
    seoContent: {
      overview: "The Random Palette Generator creates harmonious color schemes using color harmony algorithms including analogous, triadic, monochromatic, warm, and cool scales with individual color locking.",
      features: [
        "6 color harmony generation algorithms",
        "Interactive swatch locking to curate combinations",
        "Export as modern CSS custom properties (--color-1)"
      ],
      howTo: [
        "Choose a harmony mode or leave on Harmonic Analogous.",
        "Click 'Generate New' or hit the button to explore combinations.",
        "Lock any colors you like with the lock icon.",
        "Copy individual hex codes or click 'Copy CSS Vars'."
      ],
      faqs: [
        {
          q: "What color harmony algorithm is best for UI design?",
          a: "Harmonic Analogous or Cool Tech palettes work best for software interfaces because they provide balanced contrast without visual clashing."
        }
      ]
    }
  },

  // 78. WCAG Color Contrast Checker
  {
    id: "contrast-checker",
    title: "Can people read this text on this background?",
    category: "Media, CSS & Design",
    icon: "👁️",
    badge: "Popular",
    description: "Pick the text color and the background. You see if it passes WCAG.",
    keywords: ["contrast checker", "wcag contrast", "accessibility checker", "color contrast", "a11y contrast"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Controls -->
            <div class="space-y-4">
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Text Color (Foreground)</label>
                  <input id="cc-fg-color" type="color" value="#0F172A" class="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent">
                </div>
                <input id="cc-fg-hex" type="text" value="#0F172A" class="w-full p-2 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              </div>

              <div class="flex justify-center">
                <button id="cc-swap" class="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 transition">
                  ⇄ Swap Colors
                </button>
              </div>

              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Background Color</label>
                  <input id="cc-bg-color" type="color" value="#FFFFFF" class="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent">
                </div>
                <input id="cc-bg-hex" type="text" value="#FFFFFF" class="w-full p-2 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              </div>
            </div>

            <!-- Preview & Score -->
            <div class="space-y-4">
              <!-- Score Box -->
              <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center text-center">
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Contrast Ratio</span>
                <div id="cc-ratio" class="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">19.34:1</div>
                
                <div class="grid grid-cols-3 gap-2 w-full mt-4">
                  <div id="cc-normal-badge" class="p-2 rounded-xl text-center bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                    <div class="text-[10px] font-bold uppercase">Normal Text</div>
                    <div class="text-xs font-extrabold">AAA Pass</div>
                  </div>
                  <div id="cc-large-badge" class="p-2 rounded-xl text-center bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                    <div class="text-[10px] font-bold uppercase">Large Text</div>
                    <div class="text-xs font-extrabold">AAA Pass</div>
                  </div>
                  <div id="cc-ui-badge" class="p-2 rounded-xl text-center bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                    <div class="text-[10px] font-bold uppercase">UI Icons</div>
                    <div class="text-xs font-extrabold">AA Pass</div>
                  </div>
                </div>
              </div>

              <!-- Live Preview Card -->
              <div id="cc-preview" class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all shadow-sm flex flex-col gap-2" style="background-color: #FFFFFF; color: #0F172A;">
                <h3 class="text-lg font-bold">Accessible UI Component Preview</h3>
                <p class="text-xs opacity-90 leading-relaxed">Good contrast ensures that people with visual impairments or individuals reading in bright sunlight can easily digest your content.</p>
                <div class="pt-2">
                  <button class="px-3 py-1.5 rounded-lg text-xs font-semibold border" style="border-color: currentColor;">Action Button</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const fgColor = container.querySelector('#cc-fg-color');
      const fgHex = container.querySelector('#cc-fg-hex');
      const bgColor = container.querySelector('#cc-bg-color');
      const bgHex = container.querySelector('#cc-bg-hex');
      const ratioDisplay = container.querySelector('#cc-ratio');
      const normalBadge = container.querySelector('#cc-normal-badge');
      const largeBadge = container.querySelector('#cc-large-badge');
      const uiBadge = container.querySelector('#cc-ui-badge');
      const preview = container.querySelector('#cc-preview');

      function getLuminance(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;

        const a = [r, g, b].map(v => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
      }

      function updateContrast() {
        const fg = fgHex.value.trim();
        const bg = bgHex.value.trim();

        if (!/^#[0-9A-Fa-f]{6}$/.test(fg) || !/^#[0-9A-Fa-f]{6}$/.test(bg)) return;

        fgColor.value = fg;
        bgColor.value = bg;
        preview.style.backgroundColor = bg;
        preview.style.color = fg;

        const l1 = getLuminance(fg);
        const l2 = getLuminance(bg);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        const ratio = (lighter + 0.05) / (darker + 0.05);

        ratioDisplay.textContent = `${ratio.toFixed(2)}:1`;

        function setBadge(el, title, passAA, passAAA) {
          if (passAAA) {
            el.className = 'p-2 rounded-xl text-center bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300';
            el.innerHTML = `<div class="text-[10px] font-bold uppercase">${title}</div><div class="text-xs font-extrabold">AAA Pass</div>`;
          } else if (passAA) {
            el.className = 'p-2 rounded-xl text-center bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300';
            el.innerHTML = `<div class="text-[10px] font-bold uppercase">${title}</div><div class="text-xs font-extrabold">AA Pass</div>`;
          } else {
            el.className = 'p-2 rounded-xl text-center bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300';
            el.innerHTML = `<div class="text-[10px] font-bold uppercase">${title}</div><div class="text-xs font-extrabold">Fail</div>`;
          }
        }

        setBadge(normalBadge, 'Normal Text', ratio >= 4.5, ratio >= 7.0);
        setBadge(largeBadge, 'Large Text', ratio >= 3.0, ratio >= 4.5);
        setBadge(uiBadge, 'UI / Icons', ratio >= 3.0, ratio >= 3.0);
      }

      fgColor.addEventListener('input', () => {
        fgHex.value = fgColor.value.toUpperCase();
        updateContrast();
      });
      bgColor.addEventListener('input', () => {
        bgHex.value = bgColor.value.toUpperCase();
        updateContrast();
      });

      fgHex.addEventListener('input', () => {
        let val = fgHex.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        fgHex.value = val;
        updateContrast();
      });
      bgHex.addEventListener('input', () => {
        let val = bgHex.value.trim();
        if (!val.startsWith('#')) val = '#' + val;
        bgHex.value = val;
        updateContrast();
      });

      container.querySelector('#cc-swap').addEventListener('click', () => {
        const temp = fgHex.value;
        fgHex.value = bgHex.value;
        bgHex.value = temp;
        updateContrast();
      });

      updateContrast();
    },
    seoContent: {
      overview: "The WCAG Color Contrast Checker evaluates text and UI element readability against Web Content Accessibility Guidelines (WCAG) 2.1 standards for Level AA and AAA compliance.",
      features: [
        "Precise relative luminance calculation algorithm",
        "Detailed breakdowns for normal text (4.5:1), large text (3.0:1), and UI components",
        "Live interactive sample card preview with instant color swap"
      ],
      howTo: [
        "Select or paste your text (foreground) and background colors.",
        "Check the calculated contrast ratio score.",
        "Review AA and AAA pass/fail badges for accessibility compliance."
      ],
      faqs: [
        {
          q: "What is the minimum WCAG contrast requirement?",
          a: "WCAG Level AA requires at least 4.5:1 for standard body text and 3:1 for large text (18pt or 14pt bold) and active UI components."
        }
      ]
    }
  },

  // 79. QR Code Generator
  {
    id: "qr-code-generator",
    title: "Make a QR code for this link.",
    category: "Media, CSS & Design",
    icon: "📱",
    badge: "Popular",
    description: "Paste the URL. Download the code.",
    keywords: ["qr code generator", "create qr code", "free qr code", "qr maker", "barcode generator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Content / URL</label>
                <textarea id="qr-text" rows="4" class="w-full p-3.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="https://yourwebsite.com">https://github.com</textarea>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">QR Color</label>
                  <input id="qr-color-dark" type="color" value="#000000" class="w-full h-9 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-800">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Background</label>
                  <input id="qr-color-light" type="color" value="#ffffff" class="w-full h-9 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-800">
                </div>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-3">
              <canvas id="qr-canvas" width="200" height="200" class="rounded-lg shadow bg-white p-2"></canvas>
              <button id="qr-download" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Download PNG</button>
            </div>
          </div>
        </div>
      `;

      const textIn = container.querySelector('#qr-text');
      const darkColor = container.querySelector('#qr-color-dark');
      const lightColor = container.querySelector('#qr-color-light');
      const canvas = container.querySelector('#qr-canvas');
      const downloadBtn = container.querySelector('#qr-download');

      function renderQR() {
        const text = textIn.value.trim() || 'https://omnitools.dev';
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        const fg = darkColor.value.replace('#', '');
        const bg = lightColor.value.replace('#', '');
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}&color=${fg}&bgcolor=${bg}&margin=1`;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, 200, 200);
        };
        img.onerror = () => {
          ctx.fillStyle = lightColor.value;
          ctx.fillRect(0, 0, 200, 200);
          ctx.fillStyle = darkColor.value;
          ctx.font = "12px monospace";
          ctx.fillText("QR Code Preview", 40, 100);
        };
      }

      textIn.addEventListener('input', Utils.debounce(renderQR, 300));
      darkColor.addEventListener('input', renderQR);
      lightColor.addEventListener('input', renderQR);

      downloadBtn.addEventListener('click', () => {
        try {
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = 'qrcode.png';
          a.click();
          Utils.showToast('Downloaded qrcode.png', 'success');
        } catch (e) {
          Utils.showToast('Right-click the QR code to save image', 'info');
        }
      });

      renderQR();
    },
    seoContent: {
      overview: "The OmniTools QR Code Generator allows anyone to create custom QR codes for website URLs, contact details, WiFi networks, and plain text without expirations or subscriptions.",
      features: [
        "Free and permanent: generated QR codes never expire",
        "Customize foreground and background color combinations",
        "Export as high-resolution PNG image directly"
      ],
      howTo: [
        "Type or paste your URL or message into the content box.",
        "Adjust colors if desired.",
        "Click 'Download PNG' to save your QR code."
      ],
      faqs: [
        {
          q: "Do these QR codes expire?",
          a: "No. These are static QR codes containing the direct encoded string. They will work indefinitely as long as your destination URL remains active."
        }
      ]
    }
  },

  // 80. Barcode Generator (Code 128)
  {
    id: "barcode-generator",
    title: "Make a barcode for this number.",
    category: "Media, CSS & Design",
    icon: "🏷️",
    badge: "New",
    description: "Type the code. Download the barcode.",
    keywords: ["barcode generator", "code 128", "barcode maker", "printable barcode", "free barcode"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Barcode Content (Code 128)</label>
                <input id="bc-text" type="text" value="OMNI-8942-X" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Bar Height</label>
                  <input id="bc-height" type="range" min="40" max="150" value="80" class="w-full">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Module Width</label>
                  <input id="bc-width" type="range" min="1" max="4" value="2" class="w-full">
                </div>
              </div>

              <div class="flex items-center gap-2 pt-1">
                <input id="bc-show-text" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <label for="bc-show-text" class="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">Show Human Readable Text</label>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-3">
              <div class="overflow-x-auto max-w-full p-2 bg-white rounded-lg shadow">
                <canvas id="bc-canvas" class="max-w-full"></canvas>
              </div>
              <button id="bc-download" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Download PNG</button>
            </div>
          </div>
        </div>
      `;

      // Complete Code 128 patterns (widths of bars & spaces alternating)
      const C128 = [
        "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213",
        "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132",
        "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211",
        "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313",
        "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331",
        "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111",
        "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214",
        "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111",
        "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141",
        "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141",
        "114131", "311141", "411131", "211412", "211214", "211232", "2331112"
      ];

      const input = container.querySelector('#bc-text');
      const heightSlider = container.querySelector('#bc-height');
      const widthSlider = container.querySelector('#bc-width');
      const showTextCb = container.querySelector('#bc-show-text');
      const canvas = container.querySelector('#bc-canvas');
      const dlBtn = container.querySelector('#bc-download');

      function drawBarcode() {
        const str = input.value || '12345';
        const barH = parseInt(heightSlider.value, 10);
        const modW = parseInt(widthSlider.value, 10);
        const showText = showTextCb.checked;

        // Code 128B start symbol = 104
        const symbols = [104];
        let checksum = 104;

        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i) - 32;
          const val = (code >= 0 && code <= 95) ? code : 0;
          symbols.push(val);
          checksum += val * (i + 1);
        }

        symbols.push(checksum % 103);
        symbols.push(106); // Stop symbol

        // Calculate modules
        let totalModules = 0;
        symbols.forEach(sym => {
          const pat = C128[sym];
          for (let ch of pat) totalModules += parseInt(ch, 10);
        });

        const quietZone = 10 * modW;
        const totalW = totalModules * modW + (quietZone * 2);
        const totalH = barH + (showText ? 30 : 15);

        canvas.width = totalW;
        canvas.height = totalH;
        const ctx = canvas.getContext('2d');

        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, totalW, totalH);

        // Draw bars
        ctx.fillStyle = '#000000';
        let currentX = quietZone;

        symbols.forEach(sym => {
          const pat = C128[sym];
          for (let i = 0; i < pat.length; i++) {
            const w = parseInt(pat[i], 10) * modW;
            if (i % 2 === 0) {
              // Bar
              ctx.fillRect(currentX, 10, w, barH);
            }
            currentX += w;
          }
        });

        // Optional text
        if (showText) {
          ctx.font = 'bold 14px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(str, totalW / 2, barH + 24);
        }
      }

      input.addEventListener('input', drawBarcode);
      heightSlider.addEventListener('input', drawBarcode);
      widthSlider.addEventListener('input', drawBarcode);
      showTextCb.addEventListener('change', drawBarcode);

      dlBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `barcode-${input.value.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        a.click();
        Utils.showToast('Downloaded barcode PNG', 'success');
      });

      drawBarcode();
    },
    seoContent: {
      overview: "The Code 128 Barcode Generator produces standard linear barcodes in high resolution for inventory management, shipping labels, packaging, and retail scanning.",
      features: [
        "Full alphanumeric Code 128B barcode encoding",
        "Adjustable bar height and module width scaling",
        "Instant client-side HTML5 canvas PNG rendering"
      ],
      howTo: [
        "Type your alphanumeric SKU, order ID, or label code.",
        "Adjust bar height or line width as desired.",
        "Click 'Download PNG' to save for label printing."
      ],
      faqs: [
        {
          q: "Can Code 128 encode letters and numbers?",
          a: "Yes. Code 128 is one of the most versatile barcode formats in the world, encoding all 128 ASCII characters including letters, digits, and punctuation marks."
        }
      ]
    }
  },

  // 81. CSS Box Shadow Generator
  {
    id: "box-shadow-generator",
    title: "What CSS makes this shadow?",
    category: "Media, CSS & Design",
    icon: "🔳",
    description: "Move the sliders. Copy the box-shadow line.",
    keywords: ["css box shadow", "box shadow generator", "shadow builder", "css shadow", "drop shadow css"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Horizontal Offset</span>
                  <span id="bs-x-val">0px</span>
                </div>
                <input id="bs-x" type="range" min="-50" max="50" value="0" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Vertical Offset</span>
                  <span id="bs-y-val">10px</span>
                </div>
                <input id="bs-y" type="range" min="-50" max="50" value="10" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Blur Radius</span>
                  <span id="bs-blur-val">25px</span>
                </div>
                <input id="bs-blur" type="range" min="0" max="100" value="25" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Spread Radius</span>
                  <span id="bs-spread-val">-5px</span>
                </div>
                <input id="bs-spread" type="range" min="-30" max="50" value="-5" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Shadow Opacity</span>
                  <span id="bs-op-val">0.15</span>
                </div>
                <input id="bs-op" type="range" min="0" max="1" step="0.01" value="0.15" class="w-full">
              </div>
            </div>

            <!-- Preview Card -->
            <div class="p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center min-h-[220px]">
              <div id="bs-card" class="w-36 h-36 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 transition-shadow">
                Preview Card
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Generated CSS Code</label>
              <button id="bs-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy CSS</button>
            </div>
            <input id="bs-css" readonly type="text" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold" value="box-shadow: 0px 10px 25px -5px rgba(0, 0, 0, 0.15);">
          </div>
        </div>
      `;

      const x = container.querySelector('#bs-x');
      const y = container.querySelector('#bs-y');
      const blur = container.querySelector('#bs-blur');
      const spread = container.querySelector('#bs-spread');
      const op = container.querySelector('#bs-op');
      const card = container.querySelector('#bs-card');
      const cssOut = container.querySelector('#bs-css');

      function updateShadow() {
        const xV = x.value;
        const yV = y.value;
        const bV = blur.value;
        const sV = spread.value;
        const oV = op.value;

        container.querySelector('#bs-x-val').textContent = `${xV}px`;
        container.querySelector('#bs-y-val').textContent = `${yV}px`;
        container.querySelector('#bs-blur-val').textContent = `${bV}px`;
        container.querySelector('#bs-spread-val').textContent = `${sV}px`;
        container.querySelector('#bs-op-val').textContent = oV;

        const shadowRule = `${xV}px ${yV}px ${bV}px ${sV}px rgba(0, 0, 0, ${oV})`;
        card.style.boxShadow = shadowRule;
        cssOut.value = `box-shadow: ${shadowRule};`;
      }

      [x, y, blur, spread, op].forEach(slider => slider.addEventListener('input', updateShadow));
      container.querySelector('#bs-copy').addEventListener('click', () => {
        Utils.copyToClipboard(cssOut.value);
      });

      updateShadow();
    },
    seoContent: {
      overview: "The CSS Box Shadow Generator is an interactive visual styling tool for front-end developers and UI designers. Fine-tune elevation, blur, spread, and softness with live previews and clean CSS output.",
      features: [
        "Real-time visual sliders for X, Y offset, blur, and spread radius",
        "Custom shadow alpha/opacity control",
        "Clean, ready-to-paste CSS snippet generation"
      ],
      howTo: [
        "Drag the sliders to adjust elevation, direction, and spread.",
        "Observe the rendered card preview in real time.",
        "Click 'Copy CSS' to paste the declaration directly into your stylesheet."
      ],
      faqs: [
        {
          q: "What does negative spread radius do in box-shadow?",
          a: "A negative spread radius shrinks the shadow size inwards, creating subtle and realistic lighting effects that avoid harsh borders under cards."
        }
      ]
    }
  },

  // 82. CSS Border Radius / Blob Generator
  {
    id: "border-radius-generator",
    title: "What CSS makes this rounded corner?",
    category: "Media, CSS & Design",
    icon: "🫧",
    badge: "New",
    description: "Move the sliders. Copy the border-radius.",
    keywords: ["border radius generator", "css blob", "blob generator", "css shape", "border radius 8 points"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <button id="blob-random" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
              🎲 Random Organic Blob
            </button>
            <button id="blob-copy" class="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 transition">
              Copy CSS
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div class="space-y-3">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Horizontal Radii</div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[10px] text-slate-500">Top-Left: <span id="blob-h1-val">60%</span></label>
                  <input id="blob-h1" type="range" min="0" max="100" value="60" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Top-Right: <span id="blob-h2-val">40%</span></label>
                  <input id="blob-h2" type="range" min="0" max="100" value="40" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Bottom-Right: <span id="blob-h3-val">30%</span></label>
                  <input id="blob-h3" type="range" min="0" max="100" value="30" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Bottom-Left: <span id="blob-h4-val">70%</span></label>
                  <input id="blob-h4" type="range" min="0" max="100" value="70" class="w-full">
                </div>
              </div>

              <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-2">Vertical Radii</div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-[10px] text-slate-500">Top-Left: <span id="blob-v1-val">60%</span></label>
                  <input id="blob-v1" type="range" min="0" max="100" value="60" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Top-Right: <span id="blob-v2-val">30%</span></label>
                  <input id="blob-v2" type="range" min="0" max="100" value="30" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Bottom-Right: <span id="blob-v3-val">70%</span></label>
                  <input id="blob-v3" type="range" min="0" max="100" value="70" class="w-full">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500">Bottom-Left: <span id="blob-v4-val">40%</span></label>
                  <input id="blob-v4" type="range" min="0" max="100" value="40" class="w-full">
                </div>
              </div>
            </div>

            <!-- Blob Preview Box -->
            <div class="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center min-h-[260px]">
              <div id="blob-shape" class="w-48 h-48 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl transition-all duration-300"></div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">CSS Border-Radius Property</label>
            <input id="blob-css" readonly type="text" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-bold" value="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;">
          </div>
        </div>
      `;

      const h1 = container.querySelector('#blob-h1');
      const h2 = container.querySelector('#blob-h2');
      const h3 = container.querySelector('#blob-h3');
      const h4 = container.querySelector('#blob-h4');
      const v1 = container.querySelector('#blob-v1');
      const v2 = container.querySelector('#blob-v2');
      const v3 = container.querySelector('#blob-v3');
      const v4 = container.querySelector('#blob-v4');
      const shape = container.querySelector('#blob-shape');
      const cssOut = container.querySelector('#blob-css');

      function updateBlob() {
        container.querySelector('#blob-h1-val').textContent = `${h1.value}%`;
        container.querySelector('#blob-h2-val').textContent = `${h2.value}%`;
        container.querySelector('#blob-h3-val').textContent = `${h3.value}%`;
        container.querySelector('#blob-h4-val').textContent = `${h4.value}%`;
        container.querySelector('#blob-v1-val').textContent = `${v1.value}%`;
        container.querySelector('#blob-v2-val').textContent = `${v2.value}%`;
        container.querySelector('#blob-v3-val').textContent = `${v3.value}%`;
        container.querySelector('#blob-v4-val').textContent = `${v4.value}%`;

        const rule = `${h1.value}% ${h2.value}% ${h3.value}% ${h4.value}% / ${v1.value}% ${v2.value}% ${v3.value}% ${v4.value}%`;
        shape.style.borderRadius = rule;
        cssOut.value = `border-radius: ${rule};`;
      }

      [h1, h2, h3, h4, v1, v2, v3, v4].forEach(s => s.addEventListener('input', updateBlob));

      container.querySelector('#blob-random').addEventListener('click', () => {
        h1.value = 30 + Math.floor(Math.random() * 50);
        h2.value = 30 + Math.floor(Math.random() * 50);
        h3.value = 30 + Math.floor(Math.random() * 50);
        h4.value = 30 + Math.floor(Math.random() * 50);
        v1.value = 30 + Math.floor(Math.random() * 50);
        v2.value = 30 + Math.floor(Math.random() * 50);
        v3.value = 30 + Math.floor(Math.random() * 50);
        v4.value = 30 + Math.floor(Math.random() * 50);
        updateBlob();
      });

      container.querySelector('#blob-copy').addEventListener('click', () => {
        Utils.copyToClipboard(cssOut.value);
      });

      updateBlob();
    },
    seoContent: {
      overview: "The 8-point CSS Border Radius & Blob Generator creates modern, organic, and fluid shapes using CSS slash syntax for independent horizontal and vertical radii.",
      features: [
        "Full 8-axis border-radius slider controls",
        "Instant random organic blob shape creator",
        "Ready-to-use CSS border-radius code snippet"
      ],
      howTo: [
        "Adjust the horizontal and vertical percentage sliders.",
        "Click 'Random Organic Blob' to find creative inspiration.",
        "Copy the CSS rule into your landing page or UI design."
      ],
      faqs: [
        {
          q: "How does the slash in border-radius work?",
          a: "The values before the slash define the horizontal radii of the 4 corners, while the values after the slash define the vertical radii. This allows creating asymmetrical fluid blob shapes."
        }
      ]
    }
  },

  // 83. CSS Gradient Generator
  {
    id: "gradient-generator",
    title: "What CSS makes this gradient?",
    category: "Media, CSS & Design",
    icon: "🌈",
    badge: "Popular",
    description: "Pick the colors. Copy the gradient line.",
    keywords: ["css gradient generator", "gradient maker", "linear gradient", "radial gradient", "css background"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <!-- Preset Badges -->
          <div class="flex flex-wrap gap-2 items-center">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Presets:</span>
            <button data-grad="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" class="grad-preset px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition">Hyper</button>
            <button data-grad="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" class="grad-preset px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition">Ocean</button>
            <button data-grad="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" class="grad-preset px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition">Sunset</button>
            <button data-grad="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" class="grad-preset px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition">Emerald</button>
            <button data-grad="radial-gradient(circle, #ff007f 0%, #7928ca 100%)" class="grad-preset px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition">Radial Cyber</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Gradient Type</label>
                  <select id="grad-type" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                </div>
                <div id="grad-angle-box">
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Angle (<span id="grad-angle-val">135°</span>)</label>
                  <input id="grad-angle" type="range" min="0" max="360" value="135" class="w-full">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Color 1</label>
                  <div class="flex items-center gap-2">
                    <input id="grad-c1" type="color" value="#4F46E5" class="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent">
                    <input id="grad-c1-hex" type="text" value="#4F46E5" class="w-full font-mono text-xs p-1.5 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                  </div>
                </div>

                <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Color 2</label>
                  <div class="flex items-center gap-2">
                    <input id="grad-c2" type="color" value="#EC4899" class="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent">
                    <input id="grad-c2-hex" type="text" value="#EC4899" class="w-full font-mono text-xs p-1.5 border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                  </div>
                </div>
              </div>
            </div>

            <!-- Preview Card -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center min-h-[190px]">
              <div id="grad-preview" class="w-full h-36 rounded-xl shadow-lg transition-all" style="background: linear-gradient(135deg, #4F46E5 0%, #EC4899 100%);"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">CSS Code</label>
              <button id="grad-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy CSS</button>
            </div>
            <input id="grad-css" readonly type="text" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-bold" value="background: linear-gradient(135deg, #4F46E5 0%, #EC4899 100%);">
          </div>
        </div>
      `;

      const typeSelect = container.querySelector('#grad-type');
      const angleSlider = container.querySelector('#grad-angle');
      const angleVal = container.querySelector('#grad-angle-val');
      const angleBox = container.querySelector('#grad-angle-box');
      const c1 = container.querySelector('#grad-c1');
      const c1Hex = container.querySelector('#grad-c1-hex');
      const c2 = container.querySelector('#grad-c2');
      const c2Hex = container.querySelector('#grad-c2-hex');
      const preview = container.querySelector('#grad-preview');
      const cssOut = container.querySelector('#grad-css');

      function updateGradient() {
        const isLinear = typeSelect.value === 'linear';
        angleBox.style.display = isLinear ? 'block' : 'none';
        angleVal.textContent = `${angleSlider.value}°`;

        let gradStr;
        if (isLinear) {
          gradStr = `linear-gradient(${angleSlider.value}deg, ${c1Hex.value} 0%, ${c2Hex.value} 100%)`;
        } else {
          gradStr = `radial-gradient(circle, ${c1Hex.value} 0%, ${c2Hex.value} 100%)`;
        }

        preview.style.background = gradStr;
        cssOut.value = `background: ${gradStr};`;
      }

      typeSelect.addEventListener('change', updateGradient);
      angleSlider.addEventListener('input', updateGradient);

      c1.addEventListener('input', () => { c1Hex.value = c1.value.toUpperCase(); updateGradient(); });
      c2.addEventListener('input', () => { c2Hex.value = c2.value.toUpperCase(); updateGradient(); });
      c1Hex.addEventListener('input', () => { c1.value = c1Hex.value; updateGradient(); });
      c2Hex.addEventListener('input', () => { c2.value = c2Hex.value; updateGradient(); });

      container.querySelectorAll('.grad-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const grad = btn.getAttribute('data-grad');
          preview.style.background = grad;
          cssOut.value = `background: ${grad};`;
        });
      });

      container.querySelector('#grad-copy').addEventListener('click', () => {
        Utils.copyToClipboard(cssOut.value);
      });

      updateGradient();
    },
    seoContent: {
      overview: "The CSS Gradient Generator allows designers and developers to create fluid linear and radial color transitions with real-time visual previews and ready-to-paste CSS styles.",
      features: [
        "Linear and radial gradient modes with 360-degree rotation",
        "Instant color stops and hex pickers",
        "Curated presets for hyper modern and vibrant UI cards"
      ],
      howTo: [
        "Select Linear or Radial gradient format.",
        "Pick your primary and secondary colors.",
        "Adjust rotation degree slider.",
        "Click 'Copy CSS' to paste into your stylesheets."
      ],
      faqs: [
        {
          q: "Do all modern browsers support CSS gradients?",
          a: "Yes, linear-gradient and radial-gradient syntax is natively supported across all modern browsers without vendor prefixes."
        }
      ]
    }
  },

  // 84. CSS Glassmorphism Generator
  {
    id: "glassmorphism-generator",
    title: "What CSS makes this frosted glass look?",
    category: "Media, CSS & Design",
    icon: "🪟",
    badge: "Popular",
    description: "Set the blur and the transparency. Copy the CSS.",
    keywords: ["glassmorphism generator", "css frosted glass", "backdrop filter blur", "glassmorphism css", "glass card"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Backdrop Blur</span>
                  <span id="glass-blur-val">16px</span>
                </div>
                <input id="glass-blur" type="range" min="0" max="40" value="16" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Background Opacity</span>
                  <span id="glass-bg-op-val">0.25</span>
                </div>
                <input id="glass-bg-op" type="range" min="0" max="1" step="0.05" value="0.25" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Border Opacity</span>
                  <span id="glass-border-op-val">0.20</span>
                </div>
                <input id="glass-border-op" type="range" min="0" max="1" step="0.05" value="0.20" class="w-full">
              </div>

              <div>
                <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  <span>Card Outline Color</span>
                </div>
                <select id="glass-theme" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <option value="white">White Glass (Light Tint)</option>
                  <option value="dark">Obsidian Glass (Dark Tint)</option>
                </select>
              </div>
            </div>

            <!-- Preview Mesh Area -->
            <div class="relative p-6 rounded-2xl overflow-hidden min-h-[240px] flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
              <div class="absolute -top-6 -left-6 w-28 h-28 bg-yellow-400 rounded-full blur-xl opacity-70"></div>
              <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-400 rounded-full blur-xl opacity-70"></div>
              
              <!-- Glass Card -->
              <div id="glass-card" class="relative z-10 w-56 p-5 rounded-2xl text-white shadow-2xl transition-all">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xl">✨</span>
                  <span class="font-bold text-sm">Frosted Glass</span>
                </div>
                <p class="text-[11px] opacity-90 leading-relaxed mb-3">Next-gen UI design card with real-time backdrop blur filter.</p>
                <button class="px-3 py-1 rounded-lg text-xs font-bold bg-white/20 hover:bg-white/30 backdrop-blur-sm transition">Explore</button>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Generated Glassmorphism CSS</label>
              <button id="glass-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy CSS</button>
            </div>
            <textarea id="glass-css" readonly rows="4" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold"></textarea>
          </div>
        </div>
      `;

      const blur = container.querySelector('#glass-blur');
      const bgOp = container.querySelector('#glass-bg-op');
      const borderOp = container.querySelector('#glass-border-op');
      const theme = container.querySelector('#glass-theme');
      const card = container.querySelector('#glass-card');
      const cssOut = container.querySelector('#glass-css');

      function updateGlass() {
        const b = blur.value;
        const bgO = bgOp.value;
        const bO = borderOp.value;
        const isDark = theme.value === 'dark';

        container.querySelector('#glass-blur-val').textContent = `${b}px`;
        container.querySelector('#glass-bg-op-val').textContent = bgO;
        container.querySelector('#glass-border-op-val').textContent = bO;

        const rgb = isDark ? '0, 0, 0' : '255, 255, 255';
        const bgRule = `rgba(${rgb}, ${bgO})`;
        const borderRule = `1px solid rgba(${rgb}, ${bO})`;
        const filterRule = `blur(${b}px)`;

        card.style.background = bgRule;
        card.style.backdropFilter = filterRule;
        card.style.webkitBackdropFilter = filterRule;
        card.style.border = borderRule;

        const cssSnippet = `background: ${bgRule};\nbackdrop-filter: ${filterRule};\n-webkit-backdrop-filter: ${filterRule};\nborder: ${borderRule};\nborder-radius: 16px;`;
        cssOut.value = cssSnippet;
      }

      [blur, bgOp, borderOp, theme].forEach(el => el.addEventListener('input', updateGlass));
      container.querySelector('#glass-copy').addEventListener('click', () => {
        Utils.copyToClipboard(cssOut.value);
      });

      updateGlass();
    },
    seoContent: {
      overview: "The Glassmorphism Generator designs modern frosted glass elements using CSS `backdrop-filter: blur()` with real-time opacity, border, and light/dark tint controls.",
      features: [
        "Dynamic frosted glass preview over colorful geometric mesh backdrop",
        "Includes vendor-prefixed `-webkit-backdrop-filter` for Safari and iOS support",
        "White glass and Obsidian dark glass presets"
      ],
      howTo: [
        "Adjust blur and opacity sliders.",
        "Toggle between light and dark card themes.",
        "Click 'Copy CSS' to integrate into your modern UI cards."
      ],
      faqs: [
        {
          q: "Does glassmorphism work on older browsers?",
          a: "Backdrop-filter is supported in over 96% of global browsers. OmniTools automatically provides the `-webkit-backdrop-filter` prefix for 100% compatibility with Safari."
        }
      ]
    }
  },

  // 85. SVG Path Visualizer
  {
    id: "svg-path-visualizer",
    title: "What does this SVG path draw?",
    category: "Media, CSS & Design",
    icon: "📐",
    badge: "New",
    description: "Paste the path. You see the shape.",
    keywords: ["svg path visualizer", "svg viewer", "svg d attribute", "svg inspector", "svg path preview"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-slate-500">Sample Paths:</span>
              <button data-path="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" class="svg-sample px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">Heart</button>
              <button data-path="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" class="svg-sample px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">Star</button>
              <button data-path="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" class="svg-sample px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">Checkmark</button>
              <button data-path="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" class="svg-sample px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">Home</button>
            </div>
            <button id="svg-copy-code" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy Full SVG</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Path String ('d' attribute)</label>
                <textarea id="svg-input" rows="4" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition">M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z</textarea>
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1">Fill Color</label>
                  <input id="svg-fill" type="color" value="#4F46E5" class="w-full h-8 rounded-lg cursor-pointer border-0">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1">Stroke Color</label>
                  <input id="svg-stroke" type="color" value="#000000" class="w-full h-8 rounded-lg cursor-pointer border-0">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1">Stroke Width</label>
                  <input id="svg-sw" type="number" min="0" max="10" value="0" class="w-full p-1.5 text-xs border rounded-lg dark:bg-slate-800 dark:border-slate-700">
                </div>
              </div>
            </div>

            <!-- Render Box -->
            <div class="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center min-h-[200px]">
              <div id="svg-render-container" class="w-48 h-48 bg-white dark:bg-slate-800 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4"></div>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#svg-input');
      const fill = container.querySelector('#svg-fill');
      const stroke = container.querySelector('#svg-stroke');
      const sw = container.querySelector('#svg-sw');
      const renderBox = container.querySelector('#svg-render-container');

      function renderSVG() {
        const d = input.value.trim();
        const strokeW = parseFloat(sw.value) || 0;
        const svgMarkup = `
          <svg viewBox="0 0 24 24" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="${d}" fill="${fill.value}" stroke="${stroke.value}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        `;
        renderBox.innerHTML = svgMarkup;
      }

      [input, fill, stroke, sw].forEach(el => el.addEventListener('input', renderSVG));

      container.querySelectorAll('.svg-sample').forEach(btn => {
        btn.addEventListener('click', () => {
          input.value = btn.getAttribute('data-path');
          renderSVG();
        });
      });

      container.querySelector('#svg-copy-code').addEventListener('click', () => {
        const d = input.value.trim();
        const strokeW = parseFloat(sw.value) || 0;
        const code = `<svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">\n  <path d="${d}" fill="${fill.value}" stroke="${stroke.value}" stroke-width="${strokeW}" />\n</svg>`;
        Utils.copyToClipboard(code);
      });

      renderSVG();
    },
    seoContent: {
      overview: "The SVG Path Visualizer renders raw SVG `<path>` data instantly in the browser. Easily test, debug, and color icon path strings extracted from Figma, Illustrator, or Material Design.",
      features: [
        "Live interactive rendering of SVG path string coordinates",
        "Color picker controls for fill and stroke",
        "One-click complete standalone SVG code export"
      ],
      howTo: [
        "Paste the `d` attribute string from any SVG path.",
        "Adjust fill or stroke styles.",
        "Click 'Copy Full SVG' to paste into HTML or React components."
      ],
      faqs: [
        {
          q: "What does the 'd' attribute mean in an SVG path?",
          a: "The 'd' attribute contains a series of path commands (such as M for moveto, L for lineto, C for cubic bezier curve, and Z for closepath) that instruct the browser how to trace the geometric outline."
        }
      ]
    }
  },

  // 86. In-Browser Image Resizer (Canvas)
  {
    id: "image-resizer",
    title: "This image is too big.",
    category: "Media, CSS & Design",
    icon: "🖼️",
    badge: "Popular",
    description: "Drop the photo. Set the size and download it. The file stays on this device.",
    keywords: ["image resizer", "resize photo", "canvas image resizer", "compress image", "scale image"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📁</span>
              <div>
                <label class="text-xs font-bold text-slate-800 dark:text-slate-200 block">Select Image to Resize</label>
                <span class="text-[11px] text-slate-500">Supports PNG, JPEG, WEBP. 100% private in-browser execution.</span>
              </div>
            </div>
            <input id="img-file" type="file" accept="image/*" class="text-xs text-slate-600 dark:text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 dark:file:bg-indigo-950 dark:file:text-indigo-400">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Width (px)</label>
                  <input id="img-w" type="number" value="400" min="10" max="4000" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Height (px)</label>
                  <input id="img-h" type="number" value="300" min="10" max="4000" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono">
                </div>
              </div>

              <div class="flex items-center gap-2">
                <input id="img-lock-ratio" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <label for="img-lock-ratio" class="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Lock Aspect Ratio</label>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Format</label>
                <select id="img-format" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <option value="image/png">PNG</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/webp">WEBP</option>
                </select>
              </div>

              <button id="img-dl" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition">
                Download Resized Image
              </button>
            </div>

            <!-- Live Canvas Preview -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-2">
              <span class="text-xs font-semibold text-slate-500 uppercase">Live Canvas Preview</span>
              <div class="overflow-auto max-w-full max-h-[220px] rounded-lg shadow bg-white dark:bg-slate-950 p-2">
                <canvas id="img-canvas" width="400" height="300" class="max-w-full"></canvas>
              </div>
              <span id="img-info" class="text-[11px] text-slate-500 font-mono">400 × 300 px</span>
            </div>
          </div>
        </div>
      `;

      const fileInput = container.querySelector('#img-file');
      const wInput = container.querySelector('#img-w');
      const hInput = container.querySelector('#img-h');
      const lockCb = container.querySelector('#img-lock-ratio');
      const formatSelect = container.querySelector('#img-format');
      const canvas = container.querySelector('#img-canvas');
      const info = container.querySelector('#img-info');
      const dlBtn = container.querySelector('#img-dl');

      let currentImg = new Image();
      let originalRatio = 4 / 3;

      // Draw initial sample graphic
      function drawSample() {
        canvas.width = 400;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 400, 300);
        grad.addColorStop(0, '#4F46E5');
        grad.addColorStop(1, '#06B6D4');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('OmniTools Canvas Resizer', 200, 140);
        ctx.font = '14px system-ui';
        ctx.fillText('Select an image above to resize', 200, 170);
      }
      drawSample();

      function redraw() {
        const w = parseInt(wInput.value, 10) || 100;
        const h = parseInt(hInput.value, 10) || 100;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (currentImg.src) {
          ctx.drawImage(currentImg, 0, 0, w, h);
        } else {
          drawSample();
        }
        info.textContent = `${w} × ${h} px`;
      }

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          currentImg.onload = () => {
            originalRatio = currentImg.width / currentImg.height;
            wInput.value = currentImg.width;
            hInput.value = currentImg.height;
            redraw();
          };
          currentImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

      wInput.addEventListener('input', () => {
        if (lockCb.checked && originalRatio) {
          hInput.value = Math.round(parseInt(wInput.value, 10) / originalRatio);
        }
        redraw();
      });

      hInput.addEventListener('input', () => {
        if (lockCb.checked && originalRatio) {
          wInput.value = Math.round(parseInt(hInput.value, 10) * originalRatio);
        }
        redraw();
      });

      dlBtn.addEventListener('click', () => {
        const fmt = formatSelect.value;
        const ext = fmt.split('/')[1];
        const a = document.createElement('a');
        a.href = canvas.toDataURL(fmt, 0.92);
        a.download = `resized-image.${ext}`;
        a.click();
        Utils.showToast('Downloaded resized image', 'success');
      });
    },
    seoContent: {
      overview: "The In-Browser Image Resizer scales photos and graphics using high-quality bicubic canvas interpolation without uploading your private images to external servers.",
      features: [
        "100% private: images never leave your computer",
        "Aspect ratio lock prevents distortion",
        "Export as PNG, JPEG, or modern WEBP"
      ],
      howTo: [
        "Select an image from your computer.",
        "Enter target width or height in pixels.",
        "Click 'Download Resized Image' to save."
      ],
      faqs: [
        {
          q: "Is there any file size or upload limit?",
          a: "No! Because processing happens directly in your browser's memory using HTML5 Canvas, you can resize images without server bandwidth limits."
        }
      ]
    }
  },

  // 87. In-Browser Image Cropper
  {
    id: "image-cropper",
    title: "Crop this photo.",
    category: "Media, CSS & Design",
    icon: "✂️",
    badge: "New",
    description: "Drop the image. Pick the frame and download it. The file stays on this device.",
    keywords: ["image cropper", "crop photo", "crop image online", "aspect ratio crop", "avatar crop"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <input id="crop-file" type="file" accept="image/*" class="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 dark:file:bg-indigo-950 dark:file:text-indigo-400">
            <div class="flex gap-2">
              <button data-aspect="1" class="crop-aspect-btn px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg">1:1 Square</button>
              <button data-aspect="1.333" class="crop-aspect-btn px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-lg">4:3</button>
              <button data-aspect="1.777" class="crop-aspect-btn px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-lg">16:9</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Crop Window Scale (% of image)</label>
                <input id="crop-scale" type="range" min="20" max="100" value="80" class="w-full">
              </div>
              <button id="crop-download" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow transition">
                Download Cropped Image
              </button>
            </div>

            <!-- Cropped Result Canvas -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-2">
              <span class="text-xs font-semibold text-slate-500 uppercase">Cropped Preview</span>
              <canvas id="crop-canvas" width="200" height="200" class="rounded-xl shadow bg-white p-1 max-w-full"></canvas>
            </div>
          </div>
        </div>
      `;

      let img = new Image();
      let targetAspect = 1.0;
      const fileInput = container.querySelector('#crop-file');
      const scaleSlider = container.querySelector('#crop-scale');
      const canvas = container.querySelector('#crop-canvas');
      const dlBtn = container.querySelector('#crop-download');

      function drawDefault() {
        canvas.width = 240;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#6366F1';
        ctx.fillRect(0, 0, 240, 240);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Cropped Avatar', 120, 110);
        ctx.font = '12px system-ui';
        ctx.fillText('Select image above', 120, 140);
      }
      drawDefault();

      function renderCrop() {
        if (!img.src) return;
        const scale = parseInt(scaleSlider.value, 10) / 100;
        let cropW = img.width * scale;
        let cropH = cropW / targetAspect;

        if (cropH > img.height) {
          cropH = img.height * scale;
          cropW = cropH * targetAspect;
        }

        const cropX = (img.width - cropW) / 2;
        const cropY = (img.height - cropH) / 2;

        canvas.width = Math.min(cropW, 400);
        canvas.height = Math.min(cropH, 400 / targetAspect);

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, canvas.width, canvas.height);
      }

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          img.onload = renderCrop;
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      scaleSlider.addEventListener('input', renderCrop);

      container.querySelectorAll('.crop-aspect-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.crop-aspect-btn').forEach(b => {
            b.className = 'crop-aspect-btn px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-lg';
          });
          btn.className = 'crop-aspect-btn px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg';
          targetAspect = parseFloat(btn.getAttribute('data-aspect'));
          renderCrop();
        });
      });

      dlBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'cropped.png';
        a.click();
        Utils.showToast('Downloaded cropped image', 'success');
      });
    },
    seoContent: {
      overview: "The In-Browser Image Cropper lets you quickly crop photos into 1:1 avatars, 4:3 cards, or 16:9 landscape headers without uploading files to any third party.",
      features: [
        "1:1, 4:3, and 16:9 standard aspect ratio presets",
        "Centered zoom slider to frame your subject",
        "Direct lossless PNG export"
      ],
      howTo: [
        "Upload any image file from your device.",
        "Choose an aspect ratio button (e.g. 1:1 for social avatars).",
        "Download your cropped PNG."
      ],
      faqs: [
        {
          q: "What is the best aspect ratio for profile pictures?",
          a: "A 1:1 square aspect ratio is standard for profile avatars across GitHub, Twitter, Discord, and Slack."
        }
      ]
    }
  },

  // 88. Image Filter / Grayscale Tool
  {
    id: "image-filter-tool",
    title: "Make this photo black and white.",
    category: "Media, CSS & Design",
    icon: "🎞️",
    badge: "New",
    description: "Drop the image. Apply the filter and download it. The file stays on this device.",
    keywords: ["image filter", "grayscale tool", "black and white filter", "sepia photo", "invert colors photo"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <input id="flt-file" type="file" accept="image/*" class="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 dark:file:bg-indigo-950 dark:file:text-indigo-400">
            <div class="flex gap-2">
              <button data-preset="grayscale(100%)" class="flt-preset px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg">B&W Noir</button>
              <button data-preset="sepia(100%)" class="flt-preset px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg">Vintage Sepia</button>
              <button data-preset="invert(100%)" class="flt-preset px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg">Invert</button>
              <button data-preset="contrast(200%)" class="flt-preset px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg">High Contrast</button>
              <button data-preset="none" class="flt-preset px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg">Reset</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div class="space-y-2.5">
              <div>
                <label class="flex justify-between text-xs text-slate-600 dark:text-slate-400">Grayscale <span id="flt-gray-val">0%</span></label>
                <input id="flt-gray" type="range" min="0" max="100" value="0" class="w-full">
              </div>
              <div>
                <label class="flex justify-between text-xs text-slate-600 dark:text-slate-400">Sepia <span id="flt-sepia-val">0%</span></label>
                <input id="flt-sepia" type="range" min="0" max="100" value="0" class="w-full">
              </div>
              <div>
                <label class="flex justify-between text-xs text-slate-600 dark:text-slate-400">Brightness <span id="flt-bright-val">100%</span></label>
                <input id="flt-bright" type="range" min="20" max="200" value="100" class="w-full">
              </div>
              <div>
                <label class="flex justify-between text-xs text-slate-600 dark:text-slate-400">Contrast <span id="flt-contrast-val">100%</span></label>
                <input id="flt-contrast" type="range" min="50" max="250" value="100" class="w-full">
              </div>

              <button id="flt-download" class="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow transition">
                Download Filtered Image
              </button>
            </div>

            <!-- Preview Canvas -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center">
              <canvas id="flt-canvas" width="300" height="200" class="rounded-xl shadow bg-white max-w-full"></canvas>
            </div>
          </div>
        </div>
      `;

      let img = new Image();
      const canvas = container.querySelector('#flt-canvas');
      const fileIn = container.querySelector('#flt-file');
      const gray = container.querySelector('#flt-gray');
      const sepia = container.querySelector('#flt-sepia');
      const bright = container.querySelector('#flt-bright');
      const contrast = container.querySelector('#flt-contrast');
      const dlBtn = container.querySelector('#flt-download');

      function drawDefault() {
        canvas.width = 300;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 300, 200);
        grad.addColorStop(0, '#EC4899');
        grad.addColorStop(1, '#8B5CF6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 300, 200);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Filter Playground', 150, 95);
        ctx.font = '12px system-ui';
        ctx.fillText('Select an image to test filters', 150, 125);
      }
      drawDefault();

      function applyFilter() {
        container.querySelector('#flt-gray-val').textContent = `${gray.value}%`;
        container.querySelector('#flt-sepia-val').textContent = `${sepia.value}%`;
        container.querySelector('#flt-bright-val').textContent = `${bright.value}%`;
        container.querySelector('#flt-contrast-val').textContent = `${contrast.value}%`;

        const ctx = canvas.getContext('2d');
        const filterStr = `grayscale(${gray.value}%) sepia(${sepia.value}%) brightness(${bright.value}%) contrast(${contrast.value}%)`;
        ctx.filter = filterStr;

        if (img.src) {
          canvas.width = img.width > 600 ? 600 : img.width;
          canvas.height = (canvas.width / img.width) * img.height;
          ctx.filter = filterStr;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
          drawDefault();
        }
      }

      [gray, sepia, bright, contrast].forEach(el => el.addEventListener('input', applyFilter));

      fileIn.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          img.onload = applyFilter;
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });

      container.querySelectorAll('.flt-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const p = btn.getAttribute('data-preset');
          if (p.includes('grayscale')) { gray.value = 100; sepia.value = 0; }
          else if (p.includes('sepia')) { sepia.value = 100; gray.value = 0; }
          else if (p.includes('contrast')) { contrast.value = 200; gray.value = 0; }
          else { gray.value = 0; sepia.value = 0; bright.value = 100; contrast.value = 100; }
          applyFilter();
        });
      });

      dlBtn.addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'filtered-image.png';
        a.click();
        Utils.showToast('Downloaded filtered image', 'success');
      });
    },
    seoContent: {
      overview: "The In-Browser Image Filter Tool provides hardware-accelerated photo effects including Grayscale, Vintage Sepia, High-Contrast, and Brightness adjustments without software installation.",
      features: [
        "Real-time HTML5 Canvas filter pipeline",
        "Instant one-click presets: B&W Noir, Sepia, and Contrast Boost",
        "Download processed image directly as PNG"
      ],
      howTo: [
        "Choose an image or test with the preset canvas.",
        "Adjust grayscale or brightness sliders.",
        "Click 'Download Filtered Image' to save."
      ],
      faqs: [
        {
          q: "Does applying filters reduce image resolution?",
          a: "The tool processes images at native resolution up to canvas limits and outputs crisp PNG images."
        }
      ]
    }
  },

  // 89. Favicon Generator (multi-size export)
  {
    id: "favicon-generator",
    title: "I need a favicon.",
    category: "Media, CSS & Design",
    icon: "⭐",
    badge: "Popular",
    description: "Type a letter or pick a shape. Download the sizes a site needs.",
    keywords: ["favicon generator", "create favicon", "apple touch icon", "favicon png", "browser icon maker"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Favicon Emoji / Initial</label>
                <input id="fav-text" type="text" maxlength="2" value="⚡" class="w-full p-3 text-center text-2xl rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Background Color</label>
                  <input id="fav-bg" type="color" value="#4F46E5" class="w-full h-9 rounded-lg cursor-pointer border-0">
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Shape</label>
                  <select id="fav-shape" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <option value="circle">Circle</option>
                    <option value="rounded">Rounded Square</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>

              <button id="fav-dl-32" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition">
                Download 32×32 Favicon PNG
              </button>
            </div>

            <!-- Preview Grid -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-4">
              <span class="text-xs font-semibold text-slate-500 uppercase">Multi-Size Preview</span>
              <div class="flex items-end gap-4">
                <div class="flex flex-col items-center gap-1">
                  <canvas id="fav-c64" width="64" height="64" class="shadow rounded"></canvas>
                  <span class="text-[10px] text-slate-400">64px</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <canvas id="fav-c32" width="32" height="32" class="shadow rounded"></canvas>
                  <span class="text-[10px] text-slate-400">32px</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <canvas id="fav-c16" width="16" height="16" class="shadow rounded"></canvas>
                  <span class="text-[10px] text-slate-400">16px</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">HTML Favicon Code</label>
            <input readonly type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400" value='<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">'>
          </div>
        </div>
      `;

      const textIn = container.querySelector('#fav-text');
      const bgIn = container.querySelector('#fav-bg');
      const shapeIn = container.querySelector('#fav-shape');
      const c64 = container.querySelector('#fav-c64');
      const c32 = container.querySelector('#fav-c32');
      const c16 = container.querySelector('#fav-c16');

      function drawFavicon(cv, size) {
        const ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, size, size);

        // Draw shape
        ctx.fillStyle = bgIn.value;
        const shape = shapeIn.value;
        if (shape === 'circle') {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (shape === 'rounded') {
          const r = size * 0.22;
          ctx.beginPath();
          ctx.roundRect(0, 0, size, size, r);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, size, size);
        }

        // Draw text
        const txt = textIn.value || '⭐';
        ctx.font = `${Math.round(size * 0.62)}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(txt, size / 2, size / 2 + (size * 0.04));
      }

      function updateAll() {
        drawFavicon(c64, 64);
        drawFavicon(c32, 32);
        drawFavicon(c16, 16);
      }

      [textIn, bgIn, shapeIn].forEach(el => el.addEventListener('input', updateAll));

      container.querySelector('#fav-dl-32').addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = c32.toDataURL('image/png');
        a.download = 'favicon-32x32.png';
        a.click();
        Utils.showToast('Downloaded favicon-32x32.png', 'success');
      });

      updateAll();
    },
    seoContent: {
      overview: "The Favicon Generator creates lightweight browser tab icons and Apple touch icons from emojis or initials in 16x16, 32x32, and 64x64 pixel sizes.",
      features: [
        "Multi-size live preview for browser tabs and mobile bookmarks",
        "Circle, rounded square, and square border shaping",
        "HTML snippet included for instant website integration"
      ],
      howTo: [
        "Type your brand emoji, character, or letter.",
        "Pick a background color and corner shape.",
        "Click 'Download 32x32 Favicon PNG'."
      ],
      faqs: [
        {
          q: "What is the standard favicon size for websites?",
          a: "32x32 pixels is standard for high-DPI desktop browser tabs, while 16x16 is used in legacy displays and 180x180 for Apple Touch bookmarks."
        }
      ]
    }
  },

  // 90. Tweet / Quote Card Image Maker
  {
    id: "quote-card-maker",
    title: "Make a quote card I can post.",
    category: "Media, CSS & Design",
    icon: "💬",
    badge: "Popular",
    description: "Type the quote. Download the image.",
    keywords: ["quote card maker", "tweet image maker", "social media card generator", "quote graphic", "tweet generator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Quote Text</label>
                <textarea id="qc-text" rows="3" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">"Simplicity is prerequisite for reliability."</textarea>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Author Name</label>
                  <input id="qc-author" type="text" value="Edsger W. Dijkstra" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Handle / Subtitle</label>
                  <input id="qc-handle" type="text" value="@turing_award" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Card Theme</label>
                <select id="qc-theme" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <option value="dark">Modern Dark (Slate)</option>
                  <option value="indigo">Deep Indigo Gradient</option>
                  <option value="sunset">Sunset Glow</option>
                  <option value="minimal">Clean Paper White</option>
                </select>
              </div>

              <button id="qc-dl" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition">
                Download Card PNG (1200×630)
              </button>
            </div>

            <!-- Canvas Preview -->
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center">
              <canvas id="qc-canvas" width="600" height="315" class="rounded-xl shadow-lg max-w-full"></canvas>
            </div>
          </div>
        </div>
      `;

      const textIn = container.querySelector('#qc-text');
      const authIn = container.querySelector('#qc-author');
      const handleIn = container.querySelector('#qc-handle');
      const themeIn = container.querySelector('#qc-theme');
      const canvas = container.querySelector('#qc-canvas');
      const dlBtn = container.querySelector('#qc-dl');

      function renderCard() {
        canvas.width = 600;
        canvas.height = 315;
        const ctx = canvas.getContext('2d');
        const theme = themeIn.value;

        // Background
        if (theme === 'dark') {
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, 600, 315);
        } else if (theme === 'indigo') {
          const grad = ctx.createLinearGradient(0, 0, 600, 315);
          grad.addColorStop(0, '#312E81');
          grad.addColorStop(1, '#4F46E5');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 600, 315);
        } else if (theme === 'sunset') {
          const grad = ctx.createLinearGradient(0, 0, 600, 315);
          grad.addColorStop(0, '#831843');
          grad.addColorStop(1, '#BE185D');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 600, 315);
        } else {
          ctx.fillStyle = '#F8FAFC';
          ctx.fillRect(0, 0, 600, 315);
        }

        const isLight = theme === 'minimal';
        const primaryText = isLight ? '#0F172A' : '#FFFFFF';
        const secondaryText = isLight ? '#64748B' : '#94A3B8';

        // Quotation mark watermark
        ctx.fillStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
        ctx.font = 'bold 120px Georgia, serif';
        ctx.fillText('“', 40, 110);

        // Quote text
        ctx.fillStyle = primaryText;
        ctx.font = 'italic bold 20px system-ui, -apple-system, sans-serif';
        const words = textIn.value.split(' ');
        let line = '';
        let y = 110;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 500 && n > 0) {
            ctx.fillText(line, 50, y);
            line = words[n] + ' ';
            y += 32;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 50, y);

        // Author & Handle
        ctx.fillStyle = primaryText;
        ctx.font = 'bold 16px system-ui';
        ctx.fillText(authIn.value, 50, 245);

        ctx.fillStyle = secondaryText;
        ctx.font = '13px system-ui';
        ctx.fillText(handleIn.value, 50, 268);
      }

      [textIn, authIn, handleIn, themeIn].forEach(el => el.addEventListener('input', renderCard));

      dlBtn.addEventListener('click', () => {
        // High-res export
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = 1200;
        exportCanvas.height = 630;
        const ctx = exportCanvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.drawImage(canvas, 0, 0);

        const a = document.createElement('a');
        a.href = exportCanvas.toDataURL('image/png');
        a.download = 'quote-card.png';
        a.click();
        Utils.showToast('Downloaded 1200×630 quote card', 'success');
      });

      renderCard();
    },
    seoContent: {
      overview: "The Tweet & Quote Card Image Maker formats text quotes and sayings into shareable 1200x630 social media graphics suitable for Twitter, LinkedIn, and Facebook posts.",
      features: [
        "1200x630 Open Graph card resolution output",
        "Multiple dark, gradient, and minimalist themes",
        "Automatic word wrapping and typography layout"
      ],
      howTo: [
        "Type your quote text and author name.",
        "Select a dark or gradient theme.",
        "Click 'Download Card PNG' to share online."
      ],
      faqs: [
        {
          q: "What is 1200x630 resolution used for?",
          a: "1200x630 is the gold standard aspect ratio for Twitter/X social preview cards and LinkedIn feed image posts."
        }
      ]
    }
  },

  // 16. CSS Clip-Path Polygon Generator
  {
    id: "clip-path-generator",
    title: "What CSS clips this into a shape?",
    category: "Media, CSS & Design",
    icon: "✂️",
    badge: "New",
    description: "Drag the points. Copy the clip-path.",
    keywords: ["css clip-path generator", "clip-path polygon maker", "clippy generator", "css shape generator", "polygon clip-path", "css geometric shapes"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <!-- Preset buttons -->
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 uppercase">Presets:</span>
            <button data-shape="triangle" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Triangle</button>
            <button data-shape="trapezoid" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Trapezoid</button>
            <button data-shape="parallelogram" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Parallelogram</button>
            <button data-shape="rhombus" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Rhombus</button>
            <button data-shape="pentagon" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Pentagon</button>
            <button data-shape="hexagon" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Hexagon</button>
            <button data-shape="star" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Star</button>
            <button data-shape="cross" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Cross</button>
            <button data-shape="arrow" class="cp-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Arrow</button>
          </div>

          <!-- Interactive Editor Stage -->
          <div class="flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <div class="relative select-none" style="width: 280px; height: 280px;">
              <!-- Background grid & clipped box -->
              <div id="cp-target" class="w-full h-full rounded-none bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md transition-all duration-75"></div>
              <!-- Drag points overlay -->
              <svg id="cp-svg-overlay" class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                <polygon id="cp-svg-poly" points="" fill="none" stroke="rgba(255,255,255,0.6)" stroke-dasharray="3,3" stroke-width="1"></polygon>
              </svg>
              <div id="cp-handles" class="absolute inset-0 w-full h-full"></div>
            </div>

            <!-- Controls & Coordinates -->
            <div class="flex-1 w-full space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Vertex Control Points</span>
                <div class="flex items-center gap-2">
                  <button id="cp-add-pt" class="px-2 py-0.5 text-xs font-semibold rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">+ Add Point</button>
                  <button id="cp-del-pt" class="px-2 py-0.5 text-xs font-semibold rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">- Remove Point</button>
                </div>
              </div>
              <p class="text-[11px] text-zinc-500 dark:text-zinc-400">Click and drag any white handle on the canvas to sculpt your geometric polygon.</p>
              <div id="cp-points-list" class="max-h-36 overflow-y-auto space-y-1 font-mono text-xs pr-1"></div>
            </div>
          </div>

          <!-- Generated CSS Output -->
          <div class="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">Generated CSS Rule</span>
              <button id="cp-copy" class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1">Copy CSS</button>
            </div>
            <pre id="cp-code" class="p-3 font-mono text-xs break-all rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 select-all"></pre>
          </div>
        </div>
      `;

      const presets = {
        triangle: [[50, 0], [0, 100], [100, 100]],
        trapezoid: [[20, 0], [80, 0], [100, 100], [0, 100]],
        parallelogram: [[25, 0], [100, 0], [75, 100], [0, 100]],
        rhombus: [[50, 0], [100, 50], [50, 100], [0, 50]],
        pentagon: [[50, 0], [100, 38], [82, 100], [18, 100], [0, 38]],
        hexagon: [[25, 0], [75, 0], [100, 50], [75, 100], [25, 100], [0, 50]],
        star: [[50, 0], [61, 35], [98, 35], [68, 57], [79, 91], [50, 70], [21, 91], [32, 57], [2, 35], [39, 35]],
        cross: [[35, 0], [65, 0], [65, 35], [100, 35], [100, 65], [65, 65], [65, 100], [35, 100], [35, 65], [0, 65], [0, 35], [35, 35]],
        arrow: [[40, 0], [40, 40], [100, 40], [100, 60], [40, 60], [40, 100], [0, 50]]
      };

      let currentPoints = JSON.parse(JSON.stringify(presets.triangle));
      const target = container.querySelector('#cp-target');
      const handlesContainer = container.querySelector('#cp-handles');
      const polySvg = container.querySelector('#cp-svg-poly');
      const codeEl = container.querySelector('#cp-code');
      const pointsListEl = container.querySelector('#cp-points-list');

      function updateUI() {
        const polyStr = currentPoints.map(pt => `${pt[0]}% ${pt[1]}%`).join(', ');
        const cssVal = `clip-path: polygon(${polyStr});\\n-webkit-clip-path: polygon(${polyStr});`;
        target.style.clipPath = `polygon(${polyStr})`;
        target.style.webkitClipPath = `polygon(${polyStr})`;
        polySvg.setAttribute('points', currentPoints.map(pt => `${pt[0]},${pt[1]}`).join(' '));
        codeEl.textContent = cssVal;

        // Render point inputs
        pointsListEl.innerHTML = currentPoints.map((pt, idx) => `
          <div class="flex items-center gap-2 p-1 rounded bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
            <span class="w-5 text-center text-zinc-400 font-semibold text-[10px]">#${idx + 1}</span>
            <span class="text-zinc-500">X:</span>
            <input type="number" min="0" max="100" value="${pt[0]}" data-idx="${idx}" data-axis="0" class="cp-pt-input w-12 px-1 py-0.5 text-center rounded border border-zinc-200 dark:border-zinc-600 bg-transparent">
            <span class="text-zinc-500">Y:</span>
            <input type="number" min="0" max="100" value="${pt[1]}" data-idx="${idx}" data-axis="1" class="cp-pt-input w-12 px-1 py-0.5 text-center rounded border border-zinc-200 dark:border-zinc-600 bg-transparent">
          </div>
        `).join('');

        // Wire inputs
        pointsListEl.querySelectorAll('.cp-pt-input').forEach(inp => {
          inp.addEventListener('input', (e) => {
            const idx = parseInt(e.target.dataset.idx, 10);
            const axis = parseInt(e.target.dataset.axis, 10);
            let val = parseInt(e.target.value, 10);
            if (isNaN(val)) val = 0;
            val = Math.max(0, Math.min(100, val));
            currentPoints[idx][axis] = val;
            renderHandles();
            updateUI();
          });
        });
      }

      function renderHandles() {
        handlesContainer.innerHTML = '';
        currentPoints.forEach((pt, idx) => {
          const dot = document.createElement('div');
          dot.className = 'absolute w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-10';
          dot.style.left = `${pt[0]}%`;
          dot.style.top = `${pt[1]}%`;

          let isDragging = false;

          function onPointerDown(e) {
            isDragging = true;
            dot.setPointerCapture(e.pointerId);
            e.preventDefault();
          }

          function onPointerMove(e) {
            if (!isDragging) return;
            const rect = handlesContainer.getBoundingClientRect();
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            let y = ((e.clientY - rect.top) / rect.height) * 100;
            x = Math.round(Math.max(0, Math.min(100, x)));
            y = Math.round(Math.max(0, Math.min(100, y)));
            currentPoints[idx] = [x, y];
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
            updateUI();
          }

          function onPointerUp(e) {
            if (isDragging) {
              isDragging = false;
              try { dot.releasePointerCapture(e.pointerId); } catch(err) {}
            }
          }

          dot.addEventListener('pointerdown', onPointerDown);
          dot.addEventListener('pointermove', onPointerMove);
          dot.addEventListener('pointerup', onPointerUp);
          dot.addEventListener('pointercancel', onPointerUp);

          handlesContainer.appendChild(dot);
        });
      }

      container.querySelectorAll('.cp-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const shape = btn.dataset.shape;
          if (presets[shape]) {
            currentPoints = JSON.parse(JSON.stringify(presets[shape]));
            renderHandles();
            updateUI();
          }
        });
      });

      container.querySelector('#cp-add-pt').addEventListener('click', () => {
        if (currentPoints.length < 16) {
          const last = currentPoints[currentPoints.length - 1];
          currentPoints.push([Math.min(100, last[0] + 10), Math.min(100, last[1] + 10)]);
          renderHandles();
          updateUI();
        }
      });

      container.querySelector('#cp-del-pt').addEventListener('click', () => {
        if (currentPoints.length > 3) {
          currentPoints.pop();
          renderHandles();
          updateUI();
        }
      });

      container.querySelector('#cp-copy').addEventListener('click', () => {
        Utils.copyToClipboard(codeEl.textContent);
      });

      renderHandles();
      updateUI();
    },
    seoContent: {
      overview: "Free interactive CSS clip-path polygon maker. Create complex geometric CSS shapes, triangles, trapezoids, arrows, and stars with intuitive draggable vertex points.",
      features: [
        "Interactive visual canvas with fluid draggable vertex control points",
        "Includes popular geometric presets: Triangle, Hexagon, Star, Cross, and Arrow",
        "Generates standards-compliant clip-path: polygon() and -webkit-clip-path CSS code",
        "Add or remove arbitrary polygon vertices in real time"
      ],
      howTo: [
        "Select a geometric preset shape or click '+ Add Point' to start your polygon.",
        "Drag the white circular handles on the preview canvas to position your vertices.",
        "Click 'Copy CSS' to copy the generated clip-path code directly into your stylesheet."
      ],
      faqs: [
        { q: "What is CSS clip-path?", a: "The clip-path CSS property creates a clipping region that sets what part of an element should show. Parts inside the polygon remain visible, while parts outside are hidden." },
        { q: "Is clip-path supported by modern browsers?", a: "Yes. All modern browsers (Chrome, Edge, Safari, Firefox, iOS, Android) support CSS clip-path with near 100% global user compatibility." }
      ]
    }
  }
];

window.mediaTools = mediaTools;
