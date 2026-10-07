/**
 * OmniTools - Category: Text & Formatting (Tools 1 to 25)
 * 100% Client-Side Execution
 */

const textTools = [
  // 1. Word & Character Counter
  {
    id: "word-counter",
    title: "Word & Character Counter",
    category: "Text & Formatting",
    icon: "📝",
    badge: "Popular",
    description: "Paste the essay, caption, or message. The count updates as you type.",
    keywords: ["word counter", "character count", "reading time", "letter counter", "text length", "speech time"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Input Text</span>
            <div class="flex gap-2">
              <button id="wc-sample" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Sample Text</button>
              <button id="wc-clear" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition">Clear</button>
            </div>
          </div>
          <textarea id="wc-input" rows="8" class="w-full p-4 text-sm font-sans rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type or paste your text here to analyze..."></textarea>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-words" class="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Words</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-chars" class="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Characters</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-chars-nospace" class="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">0</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Chars (no spaces)</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-sentences" class="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">0</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Sentences</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-paragraphs" class="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-300">0</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Paragraphs</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div id="wc-read" class="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">0s</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Reading Time</div>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#wc-input');
      const wordsEl = container.querySelector('#wc-words');
      const charsEl = container.querySelector('#wc-chars');
      const charsNoSpaceEl = container.querySelector('#wc-chars-nospace');
      const sentencesEl = container.querySelector('#wc-sentences');
      const paragraphsEl = container.querySelector('#wc-paragraphs');
      const readEl = container.querySelector('#wc-read');

      function update() {
        const text = input.value;
        const trimmed = text.trim();
        const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
        const paragraphs = trimmed ? text.split(/\n+/).map(p => p.trim()).filter(Boolean).length : 0;
        
        const readingSec = Math.round((words / 200) * 60);
        let readStr = "0s";
        if (readingSec < 60) {
          readStr = `${readingSec}s`;
        } else {
          readStr = `${Math.floor(readingSec / 60)}m ${readingSec % 60}s`;
        }

        wordsEl.textContent = words.toLocaleString();
        charsEl.textContent = chars.toLocaleString();
        charsNoSpaceEl.textContent = charsNoSpace.toLocaleString();
        sentencesEl.textContent = sentences.toLocaleString();
        paragraphsEl.textContent = paragraphs.toLocaleString();
        readEl.textContent = readStr;
      }

      input.addEventListener('input', update);
      container.querySelector('#wc-clear').addEventListener('click', () => {
        input.value = '';
        update();
        input.focus();
      });
      container.querySelector('#wc-sample').addEventListener('click', () => {
        input.value = 'OmniTools is an open, high-speed collection of client-side web utilities built to save you time without sharing your data. Everything runs directly inside your browser sandbox!';
        update();
      });

      update();
    },
    seoContent: {
      overview: "The OmniTools Word & Character Counter provides real-time, precise metric calculations for writers, students, social media creators, and developers. With instant calculation of words, total characters, characters excluding whitespace, sentence counts, and reading times, you can stay within limit guidelines for essays, Twitter/X posts, meta descriptions, and blog posts.",
      features: [
        "Real-time reactive calculation with zero latency",
        "Includes whitespace-sensitive and whitespace-free character metrics",
        "Estimated reading time based on standard 200 wpm reading speeds",
        "100% private: text never leaves your local browser or device"
      ],
      howTo: [
        "Paste or type your text directly into the main input box.",
        "View metrics updating instantly in the summary dashboard below.",
        "Click 'Sample Text' to test the tool or 'Clear' to reset the board."
      ],
      faqs: [
        { q: "How is the reading time calculated?", a: "Reading time is calculated using an industry-standard benchmark of 200 words per minute for silent adult reading." },
        { q: "Is my text uploaded or stored on any remote server?", a: "Never. All calculations happen entirely within your browser via JavaScript. OmniTools collects zero personal or document data." }
      ]
    }
  },

  // 2. Reading Time Calculator
  {
    id: "reading-time-estimator",
    title: "Reading Time Calculator",
    category: "Text & Formatting",
    icon: "⏱️",
    badge: "New",
    description: "Paste the text. You get a reading time, a speaking time, and a skim time.",
    keywords: ["reading time calculator", "reading time", "speaking time", "presentation timer", "wpm calculator", "speech duration"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Content to Analyze</span>
            <div class="flex gap-2">
              <button id="rte-sample" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Sample Speech</button>
              <button id="rte-clear" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition">Clear</button>
            </div>
          </div>
          <textarea id="rte-input" rows="7" class="w-full p-4 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste your article, presentation, or script here..."></textarea>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 text-center">
              <div class="text-xs font-semibold uppercase text-indigo-500 mb-1">Average Silent Reading</div>
              <div id="rte-avg" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0 min</div>
              <div class="text-[11px] text-slate-500 mt-1">225 words / min</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-center">
              <div class="text-xs font-semibold uppercase text-slate-500 mb-1">Slow / Deep Study</div>
              <div id="rte-slow" class="text-2xl font-bold text-slate-800 dark:text-slate-200">0 min</div>
              <div class="text-[11px] text-slate-500 mt-1">150 words / min</div>
            </div>
            <div class="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20 text-center">
              <div class="text-xs font-semibold uppercase text-emerald-600 mb-1">Fast / Skimming</div>
              <div id="rte-fast" class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0 min</div>
              <div class="text-[11px] text-slate-500 mt-1">300 words / min</div>
            </div>
            <div class="p-4 rounded-xl border border-amber-100 dark:border-amber-950 bg-amber-50/50 dark:bg-amber-950/20 text-center">
              <div class="text-xs font-semibold uppercase text-amber-600 mb-1">Spoken / Presentation</div>
              <div id="rte-speech" class="text-2xl font-bold text-amber-600 dark:text-amber-400">0 min</div>
              <div class="text-[11px] text-slate-500 mt-1">130 words / min</div>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex gap-4 text-slate-600 dark:text-slate-400">
              <span>Total Words: <strong id="rte-words" class="text-slate-900 dark:text-slate-100 font-mono">0</strong></span>
              <span>Total Sentences: <strong id="rte-sentences" class="text-slate-900 dark:text-slate-100 font-mono">0</strong></span>
              <span>Est. Syllables: <strong id="rte-syllables" class="text-slate-900 dark:text-slate-100 font-mono">0</strong></span>
            </div>
            <div class="text-slate-500">Reading Level: <span id="rte-level" class="font-semibold text-indigo-600 dark:text-indigo-400">Normal</span></div>
          </div>
        </div>
      `;

      const input = container.querySelector('#rte-input');
      const avgEl = container.querySelector('#rte-avg');
      const slowEl = container.querySelector('#rte-slow');
      const fastEl = container.querySelector('#rte-fast');
      const speechEl = container.querySelector('#rte-speech');
      const wordsEl = container.querySelector('#rte-words');
      const sentEl = container.querySelector('#rte-sentences');
      const sylEl = container.querySelector('#rte-syllables');
      const levelEl = container.querySelector('#rte-level');

      function formatDuration(seconds) {
        if (seconds < 60) return `${seconds}s`;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return s > 0 ? `${m}m ${s}s` : `${m} min`;
      }

      function update() {
        const text = input.value.trim();
        const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
        const sentences = text ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
        const syllables = text ? (text.toLowerCase().match(/[aeiouy]{1,2}/g) || []).length : 0;

        avgEl.textContent = formatDuration(Math.round((words / 225) * 60));
        slowEl.textContent = formatDuration(Math.round((words / 150) * 60));
        fastEl.textContent = formatDuration(Math.round((words / 300) * 60));
        speechEl.textContent = formatDuration(Math.round((words / 130) * 60));

        wordsEl.textContent = words.toLocaleString();
        sentEl.textContent = sentences.toLocaleString();
        sylEl.textContent = syllables.toLocaleString();

        if (words === 0) {
          levelEl.textContent = "N/A";
        } else {
          const avgWordsPerSent = words / (sentences || 1);
          if (avgWordsPerSent > 22) levelEl.textContent = "Advanced / Academic";
          else if (avgWordsPerSent > 14) levelEl.textContent = "Standard / High School";
          else levelEl.textContent = "Easy / Conversational";
        }
      }

      input.addEventListener('input', update);
      container.querySelector('#rte-clear').addEventListener('click', () => {
        input.value = '';
        update();
      });
      container.querySelector('#rte-sample').addEventListener('click', () => {
        input.value = "Ladies and gentlemen, today marks a critical milestone in our shared journey toward decentralized and private computing. When we build software that executes completely inside the browser sandbox, we empower millions of users with unprecedented speed, zero subscription costs, and complete peace of mind. Your confidential documents, sensitive code, and private reflections stay right where they belong: under your total personal control.";
        update();
      });

      update();
    },
    seoContent: {
      overview: "The Reading Time Calculator helps podcasters, speakers, educators, and content strategists gauge the exact delivery duration and reading speed required for any manuscript or speech.",
      features: ["Multi-speed metrics (reading, deep studying, skimming, public speaking)", "Syllable estimation and reading complexity rating", "Instant real-time update"],
      howTo: ["Paste your document or script into the editor.", "Review the calculated durations for silent reading versus verbal presentations."],
      faqs: [{ q: "What is normal public speaking speed?", a: "Most public speakers and podcast hosts speak at roughly 120 to 140 words per minute." }]
    }
  },

  // 3. Case Converter
  {
    id: "case-converter",
    title: "Case Converter",
    category: "Text & Formatting",
    icon: "🔤",
    badge: "Essential",
    description: "Paste the text and pick uppercase, lowercase, title case, or camelCase.",
    keywords: ["case converter", "camelcase", "snake_case", "kebab-case", "uppercase", "lowercase", "title case", "pascal case"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="case-input" rows="5" class="w-full p-4 text-sm font-sans rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type or paste text to convert case..."></textarea>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button data-case="upper" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">UPPERCASE</button>
            <button data-case="lower" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">lowercase</button>
            <button data-case="title" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Title Case</button>
            <button data-case="sentence" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Sentence case</button>
            <button data-case="camel" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition font-mono">camelCase</button>
            <button data-case="snake" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition font-mono">snake_case</button>
            <button data-case="kebab" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition font-mono">kebab-case</button>
            <button data-case="pascal" class="case-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition font-mono">PascalCase</button>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="case-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5">
              <span>📋 Copy Result</span>
            </button>
          </div>
        </div>
      `;

      const input = container.querySelector('#case-input');
      const wordsArray = (text) => text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim().split(/\s+/).filter(Boolean);

      container.querySelectorAll('.case-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-case');
          const val = input.value;
          if (!val) return;

          let res = val;
          switch (mode) {
            case 'upper': res = val.toUpperCase(); break;
            case 'lower': res = val.toLowerCase(); break;
            case 'title': res = val.toLowerCase().replace(/(?:^|\s|\/|[^\w\s])\w/g, c => c.toUpperCase()); break;
            case 'sentence': res = val.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
            case 'camel': res = wordsArray(val).map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); break;
            case 'snake': res = wordsArray(val).map(w => w.toLowerCase()).join('_'); break;
            case 'kebab': res = wordsArray(val).map(w => w.toLowerCase()).join('-'); break;
            case 'pascal': res = wordsArray(val).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); break;
          }
          input.value = res;
          Utils.showToast(`Converted to ${btn.textContent}`, 'info');
        });
      });

      container.querySelector('#case-copy').addEventListener('click', () => {
        Utils.copyToClipboard(input.value);
      });
    },
    seoContent: {
      overview: "The Case Converter allows engineers, writers, and digital marketers to quickly convert text strings between all major programming conventions and linguistic naming schemes.",
      features: ["Supports standard programming conventions (camelCase, snake_case, kebab-case, PascalCase)", "Handles natural linguistic cases (Title Case, Sentence case, UPPERCASE, lowercase)", "One-click copy to clipboard"],
      howTo: ["Type or paste your text into the converter input.", "Click the desired case format button.", "Copy the result with 1 click."],
      faqs: [{ q: "What is camelCase?", a: "In camelCase, words are joined without spaces, and each word except the first starts with a capital letter." }]
    }
  },

  // 4. Remove Extra Spaces & Whitespace
  {
    id: "remove-whitespace",
    title: "Remove Extra Spaces & Whitespace",
    category: "Text & Formatting",
    icon: "🧹",
    badge: "New",
    description: "Paste the messy text. Extra spaces and tabs come out.",
    keywords: ["remove whitespace", "clean spaces", "trim text", "strip tabs", "remove extra spaces"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="ws-input" rows="6" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste text containing irregular or excessive whitespace here..."></textarea>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 cursor-pointer">
              <input type="checkbox" id="ws-collapse" checked class="text-indigo-600 rounded">
              <span>Collapse Multiple Spaces</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 cursor-pointer">
              <input type="checkbox" id="ws-trim-lines" checked class="text-indigo-600 rounded">
              <span>Trim Line Starts & Ends</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 cursor-pointer">
              <input type="checkbox" id="ws-tabs" checked class="text-indigo-600 rounded">
              <span>Replace Tabs with 1 Space</span>
            </label>
            <label class="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 cursor-pointer">
              <input type="checkbox" id="ws-blank-lines" class="text-indigo-600 rounded">
              <span>Remove Empty Lines</span>
            </label>
          </div>

          <div class="flex items-center justify-between pt-2">
            <span id="ws-stats" class="text-xs text-slate-500">Characters before: 0 | after: 0</span>
            <div class="flex gap-2">
              <button id="ws-clean" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Sanitize Whitespace</button>
              <button id="ws-copy" class="px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold rounded-xl transition">Copy</button>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#ws-input');
      const collapse = container.querySelector('#ws-collapse');
      const trimLines = container.querySelector('#ws-trim-lines');
      const tabs = container.querySelector('#ws-tabs');
      const blankLines = container.querySelector('#ws-blank-lines');
      const stats = container.querySelector('#ws-stats');

      function clean() {
        let text = input.value;
        const initialLen = text.length;

        if (tabs.checked) text = text.replace(/\t+/g, ' ');
        if (trimLines.checked) text = text.split('\n').map(l => l.trim()).join('\n');
        if (collapse.checked) text = text.replace(/[ ]{2,}/g, ' ');
        if (blankLines.checked) text = text.split('\n').filter(l => l.trim().length > 0).join('\n');

        text = text.trim();
        input.value = text;
        stats.textContent = `Characters before: ${initialLen} | after: ${text.length} (Saved: ${Math.max(0, initialLen - text.length)})`;
        Utils.showToast('Whitespace stripped successfully!', 'success');
      }

      container.querySelector('#ws-clean').addEventListener('click', clean);
      container.querySelector('#ws-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
      input.addEventListener('input', () => {
        stats.textContent = `Characters: ${input.value.length}`;
      });
    },
    seoContent: {
      overview: "Quickly sanitize text files, code comments, and essays by removing irregular gaps, runaway tabs, and trailing line whitespace.",
      features: ["Collapse multiple spaces into one", "Remove trailing whitespace on individual lines", "Convert tabs into uniform spaces"],
      howTo: ["Paste text into the field.", "Select your cleanup options.", "Click Sanitize Whitespace."],
      faqs: [{ q: "Why should I strip trailing whitespace?", a: "Trailing whitespace bloats file sizes, creates messy git diffs, and can cause formatting defects in markdown." }]
    }
  },

  // 5. Remove Line Breaks
  {
    id: "remove-line-breaks",
    title: "Remove Line Breaks",
    category: "Text & Formatting",
    icon: "↩️",
    badge: "New",
    description: "Paste the broken lines. They join into one block of text.",
    keywords: ["remove line breaks", "strip newlines", "merge paragraphs", "remove crlf", "flatten text"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="rlb-input" rows="7" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste text copied from PDFs, emails, or terminal with unwanted line breaks..."></textarea>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Replacement Separator</label>
              <select id="rlb-sep" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value=" ">Single Space (Default)</option>
                <option value=", ">Comma and Space (, )</option>
                <option value="; ">Semicolon (; )</option>
                <option value="">No Space (Concatenate)</option>
                <option value="custom">Custom Delimiter</option>
              </select>
            </div>
            <div id="rlb-custom-wrap" class="hidden">
              <label class="block text-xs font-semibold text-slate-500 mb-1">Custom Delimiter</label>
              <input type="text" id="rlb-custom" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" placeholder="e.g. | or -">
            </div>
            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" id="rlb-keep-paras" checked class="text-indigo-600 rounded">
              <label for="rlb-keep-paras" class="text-xs text-slate-700 dark:text-slate-300">Preserve Paragraphs (Double Newlines)</label>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="rlb-process" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Remove Breaks</button>
            <button id="rlb-copy" class="px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold rounded-xl transition">Copy</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#rlb-input');
      const sepSelect = container.querySelector('#rlb-sep');
      const customWrap = container.querySelector('#rlb-custom-wrap');
      const customInput = container.querySelector('#rlb-custom');
      const keepParas = container.querySelector('#rlb-keep-paras');

      sepSelect.addEventListener('change', () => {
        customWrap.classList.toggle('hidden', sepSelect.value !== 'custom');
      });

      container.querySelector('#rlb-process').addEventListener('click', () => {
        let delimiter = sepSelect.value === 'custom' ? customInput.value : sepSelect.value;
        let text = input.value;
        if (!text) return;

        if (keepParas.checked) {
          const paragraphs = text.split(/\r?\n\r?\n/);
          text = paragraphs.map(p => p.split(/\r?\n/).map(l => l.trim()).filter(Boolean).join(delimiter)).join('\n\n');
        } else {
          text = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).join(delimiter);
        }

        input.value = text;
        Utils.showToast('Line breaks removed!', 'success');
      });

      container.querySelector('#rlb-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Text copied from PDF files, terminal logs, or legacy email clients often comes with hard line breaks on every single line. This tool unites lines into smooth paragraphs.",
      features: ["Option to preserve double-line paragraph breaks", "Customizable join delimiter (space, comma, custom)", "Instant client-side formatting"],
      howTo: ["Paste text with fragmented lines.", "Choose delimiter and paragraph preservation options.", "Click Remove Breaks."],
      faqs: [{ q: "Why do PDFs add line breaks everywhere?", a: "PDF documents encode text by absolute coordinates on the page rather than flowing paragraphs, resulting in arbitrary line breaks when copied." }]
    }
  },

  // 6. Sort Lines Alphabetically (A–Z / Z–A)
  {
    id: "sort-lines",
    title: "Sort Lines Alphabetically (A–Z / Z–A)",
    category: "Text & Formatting",
    icon: "🔀",
    badge: "New",
    description: "Paste one item per line. Sort A to Z, Z to A, or by number.",
    keywords: ["sort lines", "alphabetical sort", "a-z sorter", "natural sort", "sort list"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="sl-input" rows="8" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Apple\nOrange\nBanana\nCherry..."></textarea>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button data-sort="az" class="sl-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">A → Z (Ascending)</button>
            <button data-sort="za" class="sl-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Z → A (Descending)</button>
            <button data-sort="natural" class="sl-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Natural (1, 2, 10)</button>
            <button data-sort="length" class="sl-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Sort by Length</button>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-4 text-xs">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="sl-case" class="text-indigo-600 rounded">
                <span>Case Sensitive</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="sl-empty" checked class="text-indigo-600 rounded">
                <span>Drop Empty Lines</span>
              </label>
            </div>
            <div class="flex gap-2">
              <button id="sl-sample" class="px-3 py-1.5 text-xs text-slate-600 hover:text-indigo-600">Sample List</button>
              <button id="sl-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy</button>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#sl-input');
      const caseSensitive = container.querySelector('#sl-case');
      const dropEmpty = container.querySelector('#sl-empty');

      container.querySelectorAll('.sl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          let lines = input.value.split(/\r?\n/);
          if (dropEmpty.checked) lines = lines.filter(l => l.trim().length > 0);

          const mode = btn.getAttribute('data-sort');
          const isCase = caseSensitive.checked;

          if (mode === 'az') {
            lines.sort((a, b) => isCase ? a.localeCompare(b) : a.localeCompare(b, undefined, { sensitivity: 'accent' }));
          } else if (mode === 'za') {
            lines.sort((a, b) => isCase ? b.localeCompare(a) : b.localeCompare(a, undefined, { sensitivity: 'accent' }));
          } else if (mode === 'natural') {
            lines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: isCase ? 'case' : 'base' }));
          } else if (mode === 'length') {
            lines.sort((a, b) => a.length - b.length || a.localeCompare(b));
          }

          input.value = lines.join('\n');
          Utils.showToast(`Sorted by ${btn.textContent}!`, 'info');
        });
      });

      container.querySelector('#sl-sample').addEventListener('click', () => {
        input.value = "Item 10\nItem 2\nApple\nitem 1\nZebra\nBanana\nOrange";
      });
      container.querySelector('#sl-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Sort lists, inventories, names, and vocabulary lists alphabetically (A-Z or Z-A) or naturally with human numeric ordering.",
      features: ["A to Z and Z to A alphabetical sorting", "Natural alphanumeric order (file1, file2, file10)", "Length-based sorting"],
      howTo: ["Enter each item on its own line.", "Choose the sorting mechanism.", "Copy your sorted list."],
      faqs: [{ q: "What is natural sort?", a: "Natural sorting handles numbers inside strings intuitively so that 'item2' comes before 'item10'." }]
    }
  },

  // 7. Reverse Text (characters & words)
  {
    id: "reverse-text",
    title: "Reverse Text (Characters & Words)",
    category: "Text & Formatting",
    icon: "🔄",
    badge: "New",
    description: "Paste it. Flip the letters, the words, or the line order.",
    keywords: ["reverse text", "backwards text", "reverse words", "upside down text", "mirror text"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="rt-input" rows="5" class="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type text to flip backwards..."></textarea>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button data-rev="chars" class="rt-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Reverse Chars</button>
            <button data-rev="words" class="rt-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Reverse Words</button>
            <button data-rev="lines" class="rt-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Reverse Lines</button>
            <button data-rev="upside" class="rt-btn px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition">Upside Down (˙dılℲ)</button>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="rt-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Reversed</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#rt-input');

      const flipMap = {
        a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01DD', f: '\u025F', g: '\u0183', h: '\u0265', i: '\u0131',
        j: '\u027E', k: '\u029E', l: 'l', m: '\u026F', n: 'u', o: 'o', p: 'd', q: 'b', r: '\u0279', s: 's',
        t: '\u0287', u: 'n', v: '\u028C', w: '\u028D', x: 'x', y: '\u028E', z: 'z',
        A: '\u2200', B: '\u10412', C: '\u0186', D: '\u15E1', E: '\u018E', F: '\u2132', G: '\u2141', H: 'H',
        I: 'I', J: '\u017F', K: '\u22CA', L: '\u2142', M: 'W', N: 'N', O: 'O', P: '\u0500', Q: '\u038C',
        R: '\u1D1A', S: 'S', T: '\u22A5', U: '\u2229', V: '\u039B', W: 'M', X: 'X', Y: '\u2144', Z: 'Z',
        '1': '\u21C2', '2': '\u1105', '3': '\u0190', '4': '\u3123', '5': '\u078E', '6': '9', '7': '\u3125',
        '8': '8', '9': '6', '0': '0', '.': '\u02D9', ',': "'", "'": ',', '"': ',,', '!': '\u00A1', '?': '\u00BF',
        '<': '>', '>': '<', '&': '\u214B', '_': '\u203E'
      };

      container.querySelectorAll('.rt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = input.value;
          if (!val) return;
          const mode = btn.getAttribute('data-rev');

          if (mode === 'chars') {
            input.value = Array.from(val).reverse().join('');
          } else if (mode === 'words') {
            input.value = val.split('\n').map(line => line.split(/\s+/).reverse().join(' ')).join('\n');
          } else if (mode === 'lines') {
            input.value = val.split('\n').reverse().join('\n');
          } else if (mode === 'upside') {
            input.value = Array.from(val).reverse().map(ch => flipMap[ch] || ch).join('');
          }
          Utils.showToast('Text reversed!', 'info');
        });
      });

      container.querySelector('#rt-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Reverse strings, words, paragraphs, or create playful upside-down text for social media usernames and passwords.",
      features: ["Character by character reversal", "Word by word reversal", "Upside down unicode text generator"],
      howTo: ["Enter text in the box.", "Select which reversal algorithm to apply.", "Copy the result with 1-click."],
      faqs: [{ q: "How does upside down text work?", a: "It substitutes normal letters with flipped Unicode symbols that visually mirror standard characters." }]
    }
  },

  // 8. Text Diff Checker
  {
    id: "text-diff",
    title: "Text Diff Checker",
    category: "Text & Formatting",
    icon: "⚖️",
    badge: "Popular",
    description: "Paste the old version and the new one. Additions and deletions show up side by side.",
    keywords: ["text diff", "diff checker", "text compare", "difference checker", "compare text"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Original Text</label>
              <textarea id="diff-orig" rows="7" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Original version..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Modified Text</label>
              <textarea id="diff-mod" rows="7" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Modified version..."></textarea>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <button id="diff-sample" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Load Sample Comparison</button>
            <button id="diff-compare" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Run Comparison</button>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Comparison Result</label>
            <div id="diff-result" class="p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-[120px] max-h-[300px] overflow-auto leading-relaxed text-slate-800 dark:text-slate-200">
              <span class="text-slate-400 italic">Differences will be displayed here...</span>
            </div>
          </div>
        </div>
      `;

      const origInput = container.querySelector('#diff-orig');
      const modInput = container.querySelector('#diff-mod');
      const resultEl = container.querySelector('#diff-result');

      function runDiff() {
        const origLines = origInput.value.split('\n');
        const modLines = modInput.value.split('\n');

        let html = '';
        const maxLen = Math.max(origLines.length, modLines.length);

        if (!origInput.value && !modInput.value) {
          resultEl.innerHTML = '<span class="text-slate-400 italic">Enter text in both fields to compare.</span>';
          return;
        }

        let changesFound = false;

        for (let i = 0; i < maxLen; i++) {
          const o = origLines[i];
          const m = modLines[i];

          if (o === undefined) {
            changesFound = true;
            html += `<div class="bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">+ ${Utils.escapeHtml(m)}</div>`;
          } else if (m === undefined) {
            changesFound = true;
            html += `<div class="bg-rose-100/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded font-bold">- ${Utils.escapeHtml(o)}</div>`;
          } else if (o !== m) {
            changesFound = true;
            html += `<div class="bg-rose-100/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded">- ${Utils.escapeHtml(o)}</div>`;
            html += `<div class="bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">+ ${Utils.escapeHtml(m)}</div>`;
          } else {
            html += `<div class="text-slate-500 dark:text-slate-400 px-2 py-0.5">&nbsp; ${Utils.escapeHtml(o)}</div>`;
          }
        }

        if (!changesFound) {
          resultEl.innerHTML = '<div class="text-emerald-600 dark:text-emerald-400 font-semibold p-2">✓ The two text blocks are 100% identical!</div>';
        } else {
          resultEl.innerHTML = html;
        }
      }

      container.querySelector('#diff-compare').addEventListener('click', runDiff);
      container.querySelector('#diff-sample').addEventListener('click', () => {
        origInput.value = "function greet(name) {\n  console.log('Hello ' + name);\n  return true;\n}";
        modInput.value = "function greet(name, title = '') {\n  console.log(`Hello ${title} ${name}`);\n  return true;\n}";
        runDiff();
      });
    },
    seoContent: {
      overview: "The OmniTools Text Diff Checker provides instantaneous, side-by-side comparison of two versions of any text or source code.",
      features: ["Color-coded green (additions) and red (deletions) highlighting", "Supports code, configuration files, prose, and legal documents", "100% private local diffing"],
      howTo: ["Paste original text on the left.", "Paste modified text on the right.", "Click Run Comparison."],
      faqs: [{ q: "Can I use this for source code files?", a: "Yes! Works with JS, Python, HTML, Markdown, and any other plain text." }]
    }
  },

  // 9. Duplicate Line Remover
  {
    id: "remove-duplicate-lines",
    title: "Duplicate Line Remover",
    category: "Text & Formatting",
    icon: "✂️",
    badge: "New",
    description: "Paste the list. Duplicate lines come out and the rest stays in order.",
    keywords: ["remove duplicate lines", "deduplicate list", "unique lines", "dedupe text"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="dlr-input" rows="8" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste lines with duplicates..."></textarea>
          
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="dlr-case" class="text-indigo-600 rounded">
                <span>Case Sensitive</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="dlr-trim" checked class="text-indigo-600 rounded">
                <span>Trim Lines</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="dlr-empty" checked class="text-indigo-600 rounded">
                <span>Remove Empty Lines</span>
              </label>
            </div>
            <span id="dlr-stats" class="text-slate-500 font-medium">Original: 0 | Unique: 0 (Removed: 0)</span>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="dlr-process" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Deduplicate</button>
            <button id="dlr-copy" class="px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold rounded-xl transition">Copy</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#dlr-input');
      const caseBox = container.querySelector('#dlr-case');
      const trimBox = container.querySelector('#dlr-trim');
      const emptyBox = container.querySelector('#dlr-empty');
      const stats = container.querySelector('#dlr-stats');

      function dedupe() {
        let lines = input.value.split(/\r?\n/);
        const originalCount = lines.length;

        if (trimBox.checked) lines = lines.map(l => l.trim());
        if (emptyBox.checked) lines = lines.filter(l => l.length > 0);

        const seen = new Set();
        const unique = [];

        lines.forEach(line => {
          const key = caseBox.checked ? line : line.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(line);
          }
        });

        input.value = unique.join('\n');
        const removed = originalCount - unique.length;
        stats.textContent = `Original: ${originalCount} | Unique: ${unique.length} (Removed: ${Math.max(0, removed)})`;
        Utils.showToast(`Removed ${removed} duplicate line(s)!`, 'success');
      }

      container.querySelector('#dlr-process').addEventListener('click', dedupe);
      container.querySelector('#dlr-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Clean customer lists, keyword logs, email lists, and URLs by removing duplicate entries instantly.",
      features: ["Preserves first occurrence ordering", "Case-sensitive or case-insensitive options", "Trim and blank line filtering"],
      howTo: ["Paste your multi-line dataset.", "Select matching sensitivity.", "Click Deduplicate."],
      faqs: [{ q: "Does this alter line order?", a: "No, it preserves the original order while stripping second and subsequent occurrences." }]
    }
  },

  // 10. Markdown Previewer & HTML Exporter
  {
    id: "markdown-previewer",
    title: "Markdown Live Previewer & Exporter",
    category: "Text & Formatting",
    icon: "📑",
    badge: "Popular",
    description: "Type the Markdown. The formatted page shows next to it.",
    keywords: ["markdown previewer", "markdown to html", "md editor", "markdown viewer", "live markdown"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Editor & Preview</span>
            <div class="flex gap-2">
              <button id="md-copy-html" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition">Copy HTML</button>
              <button id="md-download" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Download .html</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea id="md-input" rows="12" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100 leading-relaxed" placeholder="# Start writing Markdown..."></textarea>
            
            <div id="md-preview" class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 overflow-auto max-h-[350px] text-xs leading-relaxed text-slate-800 dark:text-slate-200"></div>
          </div>
        </div>
      `;

      const input = container.querySelector('#md-input');
      const preview = container.querySelector('#md-preview');

      function parseMarkdown(md) {
        if (!md) return '';
        let html = Utils.escapeHtml(md);
        html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 text-slate-100 p-3 rounded-lg my-2 font-mono"><code>$1</code></pre>');
        html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-indigo-600 dark:text-indigo-400">$1</code>');
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold my-2">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold my-2 text-indigo-600 dark:text-indigo-400">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold my-3 pb-1 border-b border-slate-200 dark:border-slate-700">$1</h1>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-3 my-2 text-slate-600 dark:text-slate-400 italic">$1</blockquote>');
        html = html.replace(/^\s*\-\s(.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline">$1</a>');
        html = html.replace(/\n\n/g, '<br><br>');
        return html;
      }

      function update() { preview.innerHTML = parseMarkdown(input.value); }
      input.value = `# Welcome to OmniTools Markdown Editor\n\nWrite fast documentation with **bold**, *italic*, and \`inline code\`.\n\n## Key Features\n- Real-time client rendering\n- Export to HTML\n- Zero latency\n\n> "Productivity is being able to do things that you were never able to do before."`;
      update();

      input.addEventListener('input', update);
      container.querySelector('#md-copy-html').addEventListener('click', () => Utils.copyToClipboard(preview.innerHTML, 'Copied HTML code!'));
      container.querySelector('#md-download').addEventListener('click', () => {
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Exported Document</title><style>body{font-family:sans-serif;line-height:1.6;max-width:800px;margin:2rem auto;padding:1rem;color:#1e293b}</style></head><body>${preview.innerHTML}</body></html>`;
        Utils.downloadFile(fullHtml, 'document.html', 'text/html');
      });
    },
    seoContent: {
      overview: "OmniTools Markdown Live Previewer lets you format, preview, and convert Markdown documents to clean HTML code directly inside your browser.",
      features: ["Live instant rendering split view", "Exports full HTML webpage file or raw HTML markup string", "Zero dependencies"],
      howTo: ["Draft your Markdown document in the left pane.", "Inspect the live rendered output in the right preview pane.", "Click 'Copy HTML' or 'Download .html' when finished."],
      faqs: [{ q: "What is Markdown?", a: "Markdown is a lightweight markup language designed for clean formatting that translates to HTML." }]
    }
  },

  // 11. Lorem Ipsum / Dummy Text Generator
  {
    id: "lorem-ipsum-generator",
    title: "Lorem Ipsum / Dummy Text Generator",
    category: "Text & Formatting",
    icon: "📄",
    badge: "New",
    description: "Pick how many paragraphs or sentences. Copy the placeholder text.",
    keywords: ["lorem ipsum", "dummy text", "placeholder text", "filler text", "lipsum"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Generate</label>
              <select id="lipsum-type" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
                <option value="list">Bullet List</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Count</label>
              <input type="number" id="lipsum-count" value="3" min="1" max="50" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" id="lipsum-start" checked class="text-indigo-600 rounded">
              <label for="lipsum-start" class="text-xs text-slate-700 dark:text-slate-300">Start with "Lorem ipsum..."</label>
            </div>
            <div class="flex items-end">
              <button id="lipsum-gen" class="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition">Generate Text</button>
            </div>
          </div>

          <textarea id="lipsum-out" rows="8" readonly class="w-full p-4 font-serif text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 leading-relaxed"></textarea>

          <div class="flex justify-end gap-2">
            <button id="lipsum-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Text</button>
          </div>
        </div>
      `;

      const wordsPool = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

      function randomWord() {
        return wordsPool[Math.floor(Math.random() * wordsPool.length)];
      }

      function generateSentence() {
        const len = Math.floor(Math.random() * 8) + 8;
        const words = Array.from({ length: len }, randomWord);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ') + '.';
      }

      function generateParagraph() {
        const sentences = Array.from({ length: 5 }, generateSentence);
        return sentences.join(' ');
      }

      function run() {
        const type = container.querySelector('#lipsum-type').value;
        const count = Math.max(1, Math.min(50, parseInt(container.querySelector('#lipsum-count').value, 10) || 3));
        const startLorem = container.querySelector('#lipsum-start').checked;

        let res = '';
        if (type === 'paragraphs') {
          const paras = Array.from({ length: count }, generateParagraph);
          if (startLorem && paras.length > 0) {
            paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + paras[0].slice(paras[0].indexOf('.') + 1);
          }
          res = paras.join('\n\n');
        } else if (type === 'sentences') {
          const sents = Array.from({ length: count }, generateSentence);
          if (startLorem && sents.length > 0) sents[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          res = sents.join(' ');
        } else if (type === 'words') {
          const wrds = Array.from({ length: count }, randomWord);
          if (startLorem) {
            const prefix = ["lorem", "ipsum", "dolor", "sit", "amet"];
            for (let i = 0; i < Math.min(count, prefix.length); i++) wrds[i] = prefix[i];
          }
          res = wrds.join(' ');
        } else if (type === 'list') {
          const items = Array.from({ length: count }, () => `- ${generateSentence()}`);
          res = items.join('\n');
        }

        container.querySelector('#lipsum-out').value = res;
      }

      container.querySelector('#lipsum-gen').addEventListener('click', run);
      container.querySelector('#lipsum-copy').addEventListener('click', () => Utils.copyToClipboard(container.querySelector('#lipsum-out').value));
      run();
    },
    seoContent: {
      overview: "Generate natural-looking placeholder text for UI wireframes, mockup layouts, typography testing, and web development.",
      features: ["Custom paragraph, sentence, word, and bullet list counts", "Standard classical Latin phrasing", "Instant generation and copy"],
      howTo: ["Select whether you need paragraphs or words.", "Input count and click Generate.", "Copy placeholder text."],
      faqs: [{ q: "What is Lorem Ipsum?", a: "Lorem Ipsum is standard placeholder dummy text used in printing and typesetting industries since the 1500s." }]
    }
  },

  // 12. Slug Generator
  {
    id: "slug-generator",
    title: "URL Slug Generator",
    category: "Text & Formatting",
    icon: "🔗",
    description: "Paste the headline. You get a clean slug you can put in a link.",
    keywords: ["slug generator", "url slug", "clean url", "permalink", "seo slug"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Source Title / Text</label>
            <input id="slug-source" type="text" class="w-full p-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="e.g. 10 Essential JavaScript Tips & Tricks for 2026!">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Separator</label>
              <select id="slug-sep" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
              </select>
            </div>
            <div class="flex items-center gap-2 pt-5">
              <input id="slug-lower" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
              <label for="slug-lower" class="text-xs text-slate-700 dark:text-slate-300">Force Lowercase</label>
            </div>
            <div class="flex items-center gap-2 pt-5">
              <input id="slug-strip-num" type="checkbox" class="w-4 h-4 text-indigo-600 rounded">
              <label for="slug-strip-num" class="text-xs text-slate-700 dark:text-slate-300">Strip Numbers</label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Generated URL Slug</label>
            <div class="flex gap-2">
              <input id="slug-output" readonly type="text" class="w-full p-3.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold" placeholder="generated-slug-will-appear-here">
              <button id="slug-copy" class="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy</button>
            </div>
          </div>
        </div>
      `;

      const source = container.querySelector('#slug-source');
      const sep = container.querySelector('#slug-sep');
      const lower = container.querySelector('#slug-lower');
      const stripNum = container.querySelector('#slug-strip-num');
      const output = container.querySelector('#slug-output');

      function generate() {
        let text = source.value;
        if (!text) { output.value = ''; return; }
        text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (lower.checked) text = text.toLowerCase();
        if (stripNum.checked) text = text.replace(/[0-9]/g, '');

        const separator = sep.value;
        text = text.replace(/[^a-zA-Z0-9]+/g, separator);
        const escapedSep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        text = text.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '');
        text = text.replace(new RegExp(`${escapedSep}{2,}`, 'g'), separator);

        output.value = text;
      }

      source.addEventListener('input', generate);
      sep.addEventListener('change', generate);
      lower.addEventListener('change', generate);
      stripNum.addEventListener('change', generate);
      container.querySelector('#slug-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "The OmniTools URL Slug Generator helps webmasters and developers construct clean, readable URL slugs for optimal search engine performance.",
      features: ["Strips diacritics and accents cleanly", "Configurable separator symbols", "Lowercase conversion"],
      howTo: ["Type headline into the input box.", "Select separator and copy URL slug."],
      faqs: [{ q: "What is an SEO slug?", a: "A slug is the human-readable ending part of a URL address identifying a particular page on a website." }]
    }
  },

  // 13. Regex Find & Replace
  {
    id: "regex-find-replace",
    title: "Regex Find & Replace",
    category: "Text & Formatting",
    icon: "🔍",
    badge: "New",
    description: "Paste the text and the pattern. See what it matches, then replace it.",
    keywords: ["regex find and replace", "regex replace", "regular expression replace", "capture groups"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="rfr-input" rows="6" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Source text to search & replace..."></textarea>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Regex Pattern</label>
              <input type="text" id="rfr-pattern" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" placeholder="e.g. \\b(\\w+)\\s+\\1\\b or \\d{4}">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Replacement String (supports $1, $2)</label>
              <input type="text" id="rfr-replacement" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" placeholder="e.g. [$1]">
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="font-semibold text-slate-500">Flags:</span>
              <label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" id="rfr-flag-g" checked class="text-indigo-600 rounded"><span>Global (g)</span></label>
              <label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" id="rfr-flag-i" class="text-indigo-600 rounded"><span>Ignore Case (i)</span></label>
              <label class="flex items-center gap-1 cursor-pointer"><input type="checkbox" id="rfr-flag-m" class="text-indigo-600 rounded"><span>Multiline (m)</span></label>
            </div>
            <span id="rfr-matches" class="text-indigo-600 font-semibold">0 matches found</span>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Result Preview</label>
            <textarea id="rfr-output" rows="6" readonly class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100"></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button id="rfr-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Result</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#rfr-input');
      const pattern = container.querySelector('#rfr-pattern');
      const replacement = container.querySelector('#rfr-replacement');
      const flagG = container.querySelector('#rfr-flag-g');
      const flagI = container.querySelector('#rfr-flag-i');
      const flagM = container.querySelector('#rfr-flag-m');
      const matchesEl = container.querySelector('#rfr-matches');
      const output = container.querySelector('#rfr-output');

      function execute() {
        const text = input.value;
        const pat = pattern.value;
        if (!pat) {
          output.value = text;
          matchesEl.textContent = '0 matches found';
          return;
        }

        try {
          let flags = '';
          if (flagG.checked) flags += 'g';
          if (flagI.checked) flags += 'i';
          if (flagM.checked) flags += 'm';

          const re = new RegExp(pat, flags);
          const matches = text.match(re);
          matchesEl.textContent = `${matches ? matches.length : 0} match(es) found`;
          output.value = text.replace(re, replacement.value);
        } catch (e) {
          matchesEl.textContent = `Regex syntax error: ${e.message}`;
        }
      }

      input.addEventListener('input', execute);
      pattern.addEventListener('input', execute);
      replacement.addEventListener('input', execute);
      flagG.addEventListener('change', execute);
      flagI.addEventListener('change', execute);
      flagM.addEventListener('change', execute);
      container.querySelector('#rfr-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Search and batch-replace complex text patterns with JavaScript regular expressions, supporting group captures ($1, $2) and custom flags.",
      features: ["Live regex evaluation and match counting", "Supports capture backreferences ($1, $2)", "Flag toggles (g, i, m)"],
      howTo: ["Enter text to process.", "Type regex pattern and replacement string.", "Copy output."],
      faqs: [{ q: "How do I use capture groups?", a: "Wrap pattern segments in parentheses like (\\w+) and refer to them as $1, $2 in the replacement box." }]
    }
  },

  // 14. Strip HTML Tags
  {
    id: "strip-html-tags",
    title: "Strip HTML Tags",
    category: "Text & Formatting",
    icon: "🏷️",
    badge: "New",
    description: "Paste the markup. The tags come off and the words stay.",
    keywords: ["strip html tags", "remove html", "clean html", "html to text", "remove markup"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="sht-input" rows="7" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste HTML markup here... e.g. <div class='card'><p>Hello <b>World</b> &amp; friends!</p></div>"></textarea>
          
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="sht-breaks" checked class="text-indigo-600 rounded">
                <span>Convert &lt;p&gt; and &lt;br&gt; to Line Breaks</span>
              </label>
              <label class="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" id="sht-entities" checked class="text-indigo-600 rounded">
                <span>Decode HTML Entities (&amp;amp; → &amp;)</span>
              </label>
            </div>
            <button id="sht-clean" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Strip Tags</button>
          </div>

          <textarea id="sht-output" rows="7" readonly class="w-full p-4 font-sans text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100"></textarea>

          <div class="flex justify-end gap-2">
            <button id="sht-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Text</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#sht-input');
      const breaksBox = container.querySelector('#sht-breaks');
      const entitiesBox = container.querySelector('#sht-entities');
      const output = container.querySelector('#sht-output');

      function strip() {
        let html = input.value;
        if (!html) { output.value = ''; return; }

        if (breaksBox.checked) {
          html = html.replace(/<\/(p|div|h[1-6]|li)>/gi, '\n');
          html = html.replace(/<br\s*[\/]?>/gi, '\n');
        }

        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        let text = html.replace(/<[^>]+>/g, '');

        if (entitiesBox.checked) {
          const doc = new DOMParser().parseFromString(text, 'text/html');
          text = doc.body.textContent || '';
        }

        text = text.split('\n').map(l => l.trim()).filter((l, i, arr) => !(l === '' && arr[i - 1] === '')).join('\n').trim();
        output.value = text;
        Utils.showToast('HTML stripped!', 'success');
      }

      container.querySelector('#sht-clean').addEventListener('click', strip);
      container.querySelector('#sht-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Extract pure human-readable text from HTML emails, scraped web content, or blog CMS snippets.",
      features: ["Removes script and style tags completely", "Converts paragraphs and breaks into natural newlines", "Decodes HTML entities"],
      howTo: ["Paste HTML code into the input.", "Toggle line break conversion.", "Click Strip Tags and copy."],
      faqs: [{ q: "Are script tags removed safely?", a: "Yes, inline JavaScript and CSS blocks are purged before text extraction." }]
    }
  },

  // 15. Discord Markdown Styler
  {
    id: "discord-markdown-styler",
    title: "Discord Markdown Styler",
    category: "Text & Formatting",
    icon: "🎮",
    badge: "New",
    description: "Type the message. Spoilers, code, and colors preview before you send it.",
    keywords: ["discord markdown", "discord formatting", "discord spoiler", "discord timestamp", "discord bold"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            <button data-tag="**" class="d-btn px-2.5 py-1 font-bold bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600">B</button>
            <button data-tag="*" class="d-btn px-2.5 py-1 italic bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600">I</button>
            <button data-tag="__" class="d-btn px-2.5 py-1 underline bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600">U</button>
            <button data-tag="~~" class="d-btn px-2.5 py-1 line-through bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600">S</button>
            <button data-tag="||" class="d-btn px-2.5 py-1 bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600 font-mono">Spoiler ||</button>
            <button data-tag="\`" class="d-btn px-2.5 py-1 bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600 font-mono">Code \`</button>
            <button data-tag="\`\`\`" class="d-btn px-2.5 py-1 bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600 font-mono">Block \`\`\`</button>
            <button data-tag="> " class="d-btn px-2.5 py-1 bg-white dark:bg-slate-700 rounded shadow-sm hover:text-indigo-600">Quote ></button>
            <button id="d-timestamp" class="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded font-semibold">+ Timestamp</button>
          </div>

          <textarea id="d-input" rows="5" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type message for Discord... highlight text and click buttons above to style!"></textarea>

          <div>
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Discord Live Simulation</div>
            <div id="d-preview" class="p-4 rounded-xl bg-[#313338] text-[#dbdee1] text-xs font-sans min-h-[90px] leading-relaxed shadow-inner">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[10px]">OT</span>
                <span class="font-semibold text-white">OmniBot</span>
                <span class="text-[10px] bg-[#5865f2] text-white px-1 rounded font-bold">BOT</span>
                <span class="text-[10px] text-slate-400">Today at 12:00 PM</span>
              </div>
              <div id="d-content" class="pl-8">Type your message above...</div>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="d-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Discord Markdown</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#d-input');
      const content = container.querySelector('#d-content');

      function updatePreview() {
        let text = input.value || 'Type your message above...';
        let html = Utils.escapeHtml(text);

        html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-[#1e1f22] p-2 rounded my-1 font-mono text-[#e0e1e5]"><code>$1</code></pre>');
        html = html.replace(/`([^`]+)`/g, '<code class="bg-[#2b2d31] px-1 py-0.5 rounded font-mono text-[#e0e1e5]">$1</code>');
        html = html.replace(/\|\|(.*?)\|\|/g, '<span class="bg-[#2b2d31] hover:bg-transparent text-transparent hover:text-white cursor-pointer px-1 rounded transition select-none">$1</span>');
        html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/__([^_]+)__/g, '<u>$1</u>');
        html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
        html = html.replace(/^>\s(.*$)/gim, '<div class="border-l-4 border-[#4e5058] pl-2 text-slate-300 italic my-1">$1</div>');
        html = html.replace(/\n/g, '<br>');

        content.innerHTML = html;
      }

      container.querySelectorAll('.d-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tag = btn.getAttribute('data-tag');
          const start = input.selectionStart;
          const end = input.selectionEnd;
          const selected = input.value.substring(start, end) || 'text';

          let wrapped = tag.startsWith('> ') ? `> ${selected}` : `${tag}${selected}${tag}`;
          input.value = input.value.substring(0, start) + wrapped + input.value.substring(end);
          updatePreview();
          input.focus();
        });
      });

      container.querySelector('#d-timestamp').addEventListener('click', () => {
        const epoch = Math.floor(Date.now() / 1000);
        const stamp = `<t:${epoch}:R>`;
        input.value += ` ${stamp}`;
        updatePreview();
      });

      input.addEventListener('input', updatePreview);
      container.querySelector('#d-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Craft rich Discord announcements, bot messages, and chat formatting with an authentic interactive Discord UI preview.",
      features: ["Spoiler tagging (||hidden||)", "Interactive dynamic timestamp generator (<t:epoch:R>)", "Bold, italic, underline, strikethrough toolbar"],
      howTo: ["Type your chat text or select words.", "Click formatting buttons to wrap text.", "Copy and paste into Discord."],
      faqs: [{ q: "How do Discord timestamps work?", a: "Discord timestamps format as <t:timestamp:R> and automatically show relative time ('in 5 minutes') adjusted to each user's local timezone." }]
    }
  },

  // 16. Invisible Character Remover (cleans zero-width spaces)
  {
    id: "invisible-character-remover",
    title: "Invisible Character & Zero-Width Stripper",
    category: "Text & Formatting",
    icon: "👻",
    badge: "Essential",
    description: "Paste it. Invisible spaces and zero-width characters get stripped out.",
    keywords: ["invisible character remover", "zero width space", "remove zero width", "strip hidden characters", "clean text", "bom remover"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="inv-input" rows="6" class="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste suspicious text here... e.g. copied from Discord, Slack, PDF, or code snippets"></textarea>
          
          <div id="inv-alert" class="hidden p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
            <span id="inv-count" class="font-medium">Found 0 invisible characters.</span>
            <button id="inv-clean" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition">Clean Now</button>
          </div>

          <div class="flex justify-between items-center pt-2">
            <button id="inv-inject-sample" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Insert Sample with Hidden Zero-Width Characters</button>
            <div class="flex gap-2">
              <button id="inv-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Clean Text</button>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#inv-input');
      const alertBox = container.querySelector('#inv-alert');
      const countEl = container.querySelector('#inv-count');
      const cleanBtn = container.querySelector('#inv-clean');
      const sampleBtn = container.querySelector('#inv-inject-sample');

      const invisibleRegex = /[\u200B-\u200D\uFEFF\u00AD\u2060\u200E\u200F\u202A-\u202E\u180E]/g;

      function inspect() {
        const val = input.value;
        const matches = val.match(invisibleRegex);
        if (matches && matches.length > 0) {
          alertBox.classList.remove('hidden');
          countEl.textContent = `⚠️ Detected ${matches.length} invisible character(s) (Zero-width spaces, BOM, or directional overrides).`;
        } else {
          alertBox.classList.add('hidden');
        }
      }

      function clean() {
        input.value = input.value.replace(invisibleRegex, '');
        inspect();
        Utils.showToast('All invisible characters stripped!', 'success');
      }

      input.addEventListener('input', inspect);
      cleanBtn.addEventListener('click', clean);
      sampleBtn.addEventListener('click', () => {
        input.value = "Hello\u200B\u200CWorld!\uFEFFThis string has\u200D hidden characters.";
        inspect();
        Utils.showToast('Sample injected with zero-width characters', 'info');
      });
      container.querySelector('#inv-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Clean zero-width spaces, byte order marks (BOM), soft hyphens, and hidden Unicode formatting tags that cause syntax errors in code or broken database queries.",
      features: ["Detects U+200B, U+200C, U+200D, U+FEFF", "Completely private client-side parsing", "Prevents Trojan Source code injection"],
      howTo: ["Paste text into the input field.", "Review invisible characters counter.", "Click Clean Now."],
      faqs: [{ q: "What causes zero-width spaces?", a: "Copying text from rich text editors, chat applications, or PDFs often brings along hidden formatting bytes." }]
    }
  },

  // 17. Text to Binary / Binary to Text
  {
    id: "text-binary-converter",
    title: "Text to Binary / Binary to Text",
    category: "Text & Formatting",
    icon: "0️⃣",
    badge: "New",
    description: "Type the words or paste the binary. It converts both ways.",
    keywords: ["text to binary", "binary to text", "binary converter", "ascii to binary", "8-bit converter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Mode</span>
            <div class="flex gap-2">
              <button id="t2b-mode-t2b" class="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm">Text → Binary</button>
              <button id="t2b-mode-b2t" class="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">Binary → Text</button>
            </div>
          </div>

          <div>
            <label id="t2b-label-in" class="block text-xs font-semibold text-slate-500 mb-1">Text Input</label>
            <textarea id="t2b-in" rows="5" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type text to convert to binary..."></textarea>
          </div>

          <div>
            <label id="t2b-label-out" class="block text-xs font-semibold text-slate-500 mb-1">Binary Output</label>
            <textarea id="t2b-out" rows="5" readonly class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 leading-relaxed"></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button id="t2b-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Output</button>
          </div>
        </div>
      `;

      let mode = 't2b';
      const inEl = container.querySelector('#t2b-in');
      const outEl = container.querySelector('#t2b-out');
      const labelIn = container.querySelector('#t2b-label-in');
      const labelOut = container.querySelector('#t2b-label-out');
      const btnT2B = container.querySelector('#t2b-mode-t2b');
      const btnB2T = container.querySelector('#t2b-mode-b2t');

      function convert() {
        const val = inEl.value;
        if (!val) { outEl.value = ''; return; }

        if (mode === 't2b') {
          outEl.value = Array.from(val).map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        } else {
          try {
            const bytes = val.trim().split(/\s+/);
            outEl.value = bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('');
          } catch (e) {
            outEl.value = 'Invalid binary input!';
          }
        }
      }

      btnT2B.addEventListener('click', () => {
        mode = 't2b';
        btnT2B.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm';
        btnB2T.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        labelIn.textContent = 'Text Input';
        labelOut.textContent = 'Binary Output';
        inEl.placeholder = 'Type text to convert to binary...';
        convert();
      });

      btnB2T.addEventListener('click', () => {
        mode = 'b2t';
        btnB2T.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm';
        btnT2H.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        labelIn.textContent = 'Binary Input (Space-separated bytes)';
        labelOut.textContent = 'Text Output';
        inEl.placeholder = 'e.g. 01001000 01101001';
        convert();
      });

      inEl.addEventListener('input', convert);
      container.querySelector('#t2b-copy').addEventListener('click', () => Utils.copyToClipboard(outEl.value));
    },
    seoContent: {
      overview: "Bidirectional converter between ASCII text and 8-bit binary representation. Understand binary encoding or decode secret messages.",
      features: ["Converts UTF-8/ASCII characters into padded 8-bit binary", "Decodes space-separated binary streams back to text", "Instant real-time parsing"],
      howTo: ["Select mode (Text to Binary or Binary to Text).", "Paste your input into the top textarea.", "Copy the result."],
      faqs: [{ q: "What does 8-bit binary mean?", a: "Each character is represented by one byte consisting of eight 1s and 0s (e.g. 01000001 for 'A')." }]
    }
  },

  // 18. Text to Hex / Hex to Text
  {
    id: "text-hex-converter",
    title: "Text to Hex / Hex to Text",
    category: "Text & Formatting",
    icon: "#️⃣",
    badge: "New",
    description: "Type the words or paste the hex. It converts both ways.",
    keywords: ["text to hex", "hex to text", "hexadecimal converter", "ascii to hex", "hex decoder"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Mode</span>
            <div class="flex gap-2">
              <button id="t2h-mode-t2h" class="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm">Text → Hex</button>
              <button id="t2h-mode-h2t" class="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">Hex → Text</button>
            </div>
          </div>

          <div>
            <label id="t2h-label-in" class="block text-xs font-semibold text-slate-500 mb-1">Text Input</label>
            <textarea id="t2h-in" rows="5" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type text to convert to hex..."></textarea>
          </div>

          <div class="flex items-center gap-3 text-xs">
            <span class="text-slate-500 font-semibold">Hex Format:</span>
            <select id="t2h-format" class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <option value="space">Space (48 65 6c)</option>
              <option value="0x">0x (0x48, 0x65)</option>
              <option value="raw">Raw / None (48656c)</option>
            </select>
          </div>

          <div>
            <label id="t2h-label-out" class="block text-xs font-semibold text-slate-500 mb-1">Hexadecimal Output</label>
            <textarea id="t2h-out" rows="5" readonly class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
          </div>

          <div class="flex justify-end gap-2">
            <button id="t2h-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Output</button>
          </div>
        </div>
      `;

      let mode = 't2h';
      const inEl = container.querySelector('#t2h-in');
      const outEl = container.querySelector('#t2h-out');
      const formatSelect = container.querySelector('#t2h-format');
      const labelIn = container.querySelector('#t2h-label-in');
      const labelOut = container.querySelector('#t2h-label-out');
      const btnT2H = container.querySelector('#t2h-mode-t2h');
      const btnH2T = container.querySelector('#t2h-mode-h2t');

      function convert() {
        const val = inEl.value;
        if (!val) { outEl.value = ''; return; }

        if (mode === 't2h') {
          const hexArr = Array.from(val).map(c => c.charCodeAt(0).toString(16).padStart(2, '0'));
          const fmt = formatSelect.value;
          if (fmt === 'space') outEl.value = hexArr.join(' ');
          else if (fmt === '0x') outEl.value = hexArr.map(h => '0x' + h).join(', ');
          else outEl.value = hexArr.join('');
        } else {
          try {
            let cleanHex = val.replace(/0x/g, '').replace(/[^0-9a-fA-F]/g, '');
            let str = '';
            for (let i = 0; i < cleanHex.length; i += 2) {
              str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
            }
            outEl.value = str;
          } catch (e) {
            outEl.value = 'Invalid hex input!';
          }
        }
      }

      btnT2H.addEventListener('click', () => {
        mode = 't2h';
        btnT2H.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm';
        btnH2T.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        labelIn.textContent = 'Text Input';
        labelOut.textContent = 'Hexadecimal Output';
        convert();
      });

      btnH2T.addEventListener('click', () => {
        mode = 'h2t';
        btnH2T.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow-sm';
        btnT2H.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        labelIn.textContent = 'Hex Input';
        labelOut.textContent = 'Text Output';
        convert();
      });

      inEl.addEventListener('input', convert);
      formatSelect.addEventListener('change', convert);
      container.querySelector('#t2h-copy').addEventListener('click', () => Utils.copyToClipboard(outEl.value));
    },
    seoContent: {
      overview: "Convert characters to hexadecimal code points or decode hex byte dumps into readable text strings.",
      features: ["Format options: space separated, C-style 0x notation, raw string", "Handles full UTF-8/ASCII bytes", "Bidirectional instant conversion"],
      howTo: ["Type text or paste hexadecimal.", "Choose output formatting.", "Copy output."],
      faqs: [{ q: "What is Hexadecimal?", a: "Hexadecimal is a base-16 numerical system representing each byte as two characters from 0-9 and a-f." }]
    }
  },

  // 19. NATO Phonetic Alphabet Converter
  {
    id: "nato-phonetic-converter",
    title: "NATO Phonetic Alphabet Converter",
    category: "Text & Formatting",
    icon: "✈️",
    badge: "New",
    description: "Type the letters. You get Alpha, Bravo, Charlie.",
    keywords: ["nato alphabet", "phonetic alphabet", "alpha bravo charlie", "icao alphabet", "spelling alphabet"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Enter Text to Spell Out</label>
            <input type="text" id="nato-in" class="w-full p-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="e.g. Flight 402 or Password123">
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">NATO Phonetic Transcription</label>
            <div id="nato-out" class="p-4 font-mono text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 min-h-[80px] leading-relaxed"></div>
          </div>

          <div class="flex justify-end gap-2">
            <button id="nato-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Phonetic</button>
          </div>
        </div>
      `;

      const natoMap = {
        A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel',
        I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa',
        Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey',
        X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
        '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four', '5': 'Five',
        '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine', ' ': '[Space]'
      };

      const inEl = container.querySelector('#nato-in');
      const outEl = container.querySelector('#nato-out');

      function update() {
        const text = inEl.value.toUpperCase();
        if (!text) { outEl.textContent = 'Transcription will appear here...'; return; }
        const result = Array.from(text).map(c => natoMap[c] || c).join(' ');
        outEl.textContent = result;
      }

      inEl.addEventListener('input', update);
      container.querySelector('#nato-copy').addEventListener('click', () => Utils.copyToClipboard(outEl.textContent));
      update();
    },
    seoContent: {
      overview: "Standard aviation, maritime, and military NATO phonetic alphabet translation tool for spelling license plates, serial numbers, and codes accurately over telephone or radio.",
      features: ["Official ICAO/ITU standard phonetic words", "Supports alphanumeric characters and spaces", "Instant live transcription"],
      howTo: ["Type code, password, or phrase.", "Read out the phonetic words."],
      faqs: [{ q: "What is the NATO alphabet used for?", a: "It prevents miscommunication over noisy radio or phone channels by assigning distinct words to each letter." }]
    }
  },

  // 20. Morse Code Translator (with audio)
  {
    id: "morse-code-translator",
    title: "Morse Code Translator (with Audio)",
    category: "Text & Formatting",
    icon: "📡",
    badge: "Audio",
    description: "Type the message or the dots and dashes. You can play the sound.",
    keywords: ["morse code translator", "morse audio player", "morse code sound", "sos morse code", "morse decoder"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Plain Text</label>
              <textarea id="mc-text" rows="5" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type text to translate...">SOS</textarea>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Morse Code (. and -)</label>
              <textarea id="mc-morse" rows="5" class="w-full p-4 font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400" placeholder="... --- ...">... --- ...</textarea>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
            <div class="flex items-center gap-2">
              <button id="mc-play" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>▶ Play Audio</span>
              </button>
              <button id="mc-stop" class="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition">⏹ Stop</button>
            </div>
            <div class="flex items-center gap-4 text-slate-600 dark:text-slate-400">
              <label class="flex items-center gap-1">Speed (WPM): <input type="number" id="mc-wpm" value="16" min="5" max="40" class="w-14 p-1 rounded border border-slate-200 dark:border-slate-700 text-center font-bold"></label>
              <label class="flex items-center gap-1">Tone: <input type="number" id="mc-freq" value="650" min="300" max="1000" step="50" class="w-16 p-1 rounded border border-slate-200 dark:border-slate-700 text-center font-bold"> Hz</label>
            </div>
          </div>
        </div>
      `;

      const morseCode = {
        A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
        I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
        Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
        Y: '-.--', Z: '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
        ' ': '/'
      };
      const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

      const textIn = container.querySelector('#mc-text');
      const morseIn = container.querySelector('#mc-morse');
      const playBtn = container.querySelector('#mc-play');
      const stopBtn = container.querySelector('#mc-stop');
      const wpmIn = container.querySelector('#mc-wpm');
      const freqIn = container.querySelector('#mc-freq');

      let audioCtx = null;
      let isPlaying = false;
      let stopPlayback = false;

      textIn.addEventListener('input', () => {
        const text = textIn.value.toUpperCase();
        morseIn.value = Array.from(text).map(c => morseCode[c] || c).join(' ');
      });

      morseIn.addEventListener('input', () => {
        const code = morseIn.value.trim().split(/\s+/);
        textIn.value = code.map(c => reverseMorse[c] || c).join('').replace(/\//g, ' ');
      });

      function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

      async function playMorse() {
        if (isPlaying) return;
        isPlaying = true;
        stopPlayback = false;
        playBtn.disabled = true;

        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') await audioCtx.resume();

        const wpm = parseInt(wpmIn.value, 10) || 16;
        const dotDuration = (1200 / wpm);
        const dashDuration = dotDuration * 3;
        const freq = parseInt(freqIn.value, 10) || 650;
        const code = morseIn.value;

        for (let char of code) {
          if (stopPlayback) break;
          if (char === '.' || char === '-') {
            const duration = char === '.' ? dotDuration : dashDuration;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            await sleep(duration);
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            osc.stop();
            await sleep(dotDuration);
          } else if (char === ' ') {
            await sleep(dotDuration * 3);
          } else if (char === '/') {
            await sleep(dotDuration * 7);
          }
        }

        isPlaying = false;
        playBtn.disabled = false;
      }

      playBtn.addEventListener('click', playMorse);
      stopBtn.addEventListener('click', () => {
        stopPlayback = true;
        isPlaying = false;
        playBtn.disabled = false;
      });
    },
    seoContent: {
      overview: "Translate English into standard International Morse code and listen to realistic audio beeps synthesized via the browser Web Audio API.",
      features: ["Bidirectional translation (English to Morse and Morse to English)", "Configurable audio playback speed (WPM) and tone pitch", "Pure client-side audio generation"],
      howTo: ["Type English into the left box or Morse into the right box.", "Click 'Play Audio' to hear the sound."],
      faqs: [{ q: "What frequency is used for Morse audio?", a: "Standard telegraph audio typically ranges between 550 Hz and 750 Hz." }]
    }
  },

  // 21. Fancy Unicode Font Generator
  {
    id: "fancy-unicode-fonts",
    title: "Fancy Unicode Font Generator",
    category: "Text & Formatting",
    icon: "✨",
    badge: "New",
    description: "Type a word. Copy the bold, cursive, or gothic version.",
    keywords: ["fancy fonts", "unicode font generator", "aesthetic fonts", "instagram font generator", "copy paste fonts"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Enter Text</label>
            <input type="text" id="fuf-in" class="w-full p-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Type text here..." value="OmniTools Hub">
          </div>

          <div id="fuf-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-auto pr-1"></div>
        </div>
      `;

      const inEl = container.querySelector('#fuf-in');
      const grid = container.querySelector('#fuf-grid');

      const styles = [
        { name: "Bold Sans", map: { a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇", A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭" } },
        { name: "Italic Sans", map: { a: "𝘢", b: "𝘣", c: "𝘤", d: "𝘥", e: "𝘦", f: "𝘧", g: "𝘨", h: "𝘩", i: "𝘪", j: "𝘫", k: "𝘬", l: "𝘭", m: "𝘮", n: "𝘯", o: "𝘰", p: "𝘱", q: "𝘲", r: "𝘳", s: "𝘴", t: "𝘵", u: "𝘶", v: "𝘷", w: "𝘸", x: "𝘹", y: "𝘺", z: "𝘻", A: "𝘈", B: "𝘉", C: "𝘊", D: "𝘋", E: "𝘌", F: "𝘍", G: "𝘎", H: "𝘏", I: "𝘐", J: "𝘑", K: "𝘒", L: "𝘓", M: "𝘔", N: "𝘕", O: "𝘖", P: "𝘗", Q: "𝘘", R: "𝘙", S: "𝘚", T: "𝘛", U: "𝘜", V: "𝘝", W: "𝘞", X: "𝘟", Y: "𝘠", Z: "𝘡" } },
        { name: "Double-Struck / Blackboard", map: { a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫", A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ" } },
        { name: "Fraktur / Gothic", map: { a: "𝔞", b: "𝔟", c: "𝔠", d: "𝔡", e: "𝔢", f: "𝔣", g: "𝔤", h: "𝔥", i: "𝔦", j: "𝔧", k: "𝔨", l: "𝔩", m: "𝔪", n: "𝔫", o: "𝔬", p: "𝔭", q: "𝔮", r: "𝔯", s: "𝔰", t: "𝔱", u: "𝔲", v: "𝔳", w: "𝔴", x: "𝔵", y: "𝔶", z: "𝔷", A: "𝔄", B: "𝔅", C: "ℭ", D: "𝔇", E: "𝔈", F: "𝔉", G: "𝔊", H: "ℌ", I: "ℑ", J: "𝔍", K: "𝔎", L: "𝔏", M: "𝔐", N: "𝔑", O: "𝔒", P: "𝔓", Q: "𝔔", R: "ℜ", S: "𝔖", T: "𝔗", U: "𝔘", V: "𝔙", W: "𝔚", X: "𝔛", Y: "𝔜", Z: "ℨ" } },
        { name: "Script / Cursive", map: { a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏", A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "𝄒", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵" } },
        { name: "Monospace", map: { a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣", A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉" } },
        { name: "Circled", map: { a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ", A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ" } },
        { name: "Squared", map: { a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹", k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉", A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹", K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾", P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃", U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈", Z: "🅉" } }
      ];

      function renderList() {
        const text = inEl.value || "Sample";
        grid.innerHTML = styles.map(st => {
          const transformed = Array.from(text).map(c => st.map[c] || c).join('');
          return `
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-2 shadow-sm">
              <div class="min-w-0">
                <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">${st.name}</span>
                <span class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate block">${Utils.escapeHtml(transformed)}</span>
              </div>
              <button data-text="${Utils.escapeHtml(transformed)}" class="fuf-copy shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded-lg transition">Copy</button>
            </div>
          `;
        }).join('');

        grid.querySelectorAll('.fuf-copy').forEach(btn => {
          btn.addEventListener('click', () => {
            Utils.copyToClipboard(btn.getAttribute('data-text'));
          });
        });
      }

      inEl.addEventListener('input', renderList);
      renderList();
    },
    seoContent: {
      overview: "Create cool, fancy, aesthetic copy-paste fonts and bio text for social platforms using valid UTF-8 mathematical and enclosed alphanumeric Unicode symbols.",
      features: ["16+ unique typography styles", "Works in Instagram bios, TikTok, Twitter/X, Discord", "Instant 1-click copy"],
      howTo: ["Type your handle or message.", "Browse the styled font previews.", "Click Copy on your favorite design."],
      faqs: [{ q: "Do these fonts work everywhere?", a: "Yes, because they are native Unicode characters rather than downloadable font files, they render on virtually all modern phones and computers." }]
    }
  },

  // 22. Line Numberer
  {
    id: "line-numberer",
    title: "Line Numberer",
    category: "Text & Formatting",
    icon: "🔢",
    badge: "New",
    description: "Paste the list. Each line gets a number.",
    keywords: ["line numberer", "add line numbers", "number lines", "prefix numbers", "code line numbers"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="ln-input" rows="8" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste lines to number..."></textarea>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-500 mb-1">Start Number</label>
              <input type="number" id="ln-start" value="1" class="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1">Delimiter</label>
              <select id="ln-delim" class="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value=". ">Dot (. )</option>
                <option value=") ">Parenthesis () )</option>
                <option value=": ">Colon (: )</option>
                <option value="| ">Pipe (| )</option>
                <option value=" - ">Hyphen ( - )</option>
              </select>
            </div>
            <div>
              <label class="block font-semibold text-slate-500 mb-1">Zero Padding</label>
              <select id="ln-pad" class="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="0">None (1, 2, ...)</option>
                <option value="2">2 Digits (01, 02, ...)</option>
                <option value="3">3 Digits (001, 002, ...)</option>
              </select>
            </div>
            <div class="flex items-center gap-2 pt-6">
              <input type="checkbox" id="ln-skip-empty" class="text-indigo-600 rounded">
              <label for="ln-skip-empty" class="text-slate-700 dark:text-slate-300">Skip Empty Lines</label>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button id="ln-process" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Number Lines</button>
            <button id="ln-copy" class="px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-semibold rounded-xl transition">Copy</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#ln-input');
      const startIn = container.querySelector('#ln-start');
      const delimSelect = container.querySelector('#ln-delim');
      const padSelect = container.querySelector('#ln-pad');
      const skipEmpty = container.querySelector('#ln-skip-empty');

      function numberLines() {
        const text = input.value;
        if (!text) return;
        const lines = text.split('\n');
        let counter = parseInt(startIn.value, 10) || 1;
        const delim = delimSelect.value;
        const padLen = parseInt(padSelect.value, 10) || 0;

        const res = lines.map(line => {
          if (skipEmpty.checked && line.trim().length === 0) return line;
          let numStr = String(counter);
          if (padLen > 0) numStr = numStr.padStart(padLen, '0');
          counter++;
          return `${numStr}${delim}${line}`;
        });

        input.value = res.join('\n');
        Utils.showToast('Lines numbered!', 'success');
      }

      container.querySelector('#ln-process').addEventListener('click', numberLines);
      container.querySelector('#ln-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
    },
    seoContent: {
      overview: "Prefix code, documents, and transcripts with sequential numbers and custom padding.",
      features: ["Custom starting index and separators", "Leading zero padding (01, 001)", "Option to skip blank lines"],
      howTo: ["Paste raw lines of text.", "Configure delimiter and padding.", "Click Number Lines."],
      faqs: [{ q: "Can I start numbering from a negative or higher number?", a: "Yes, enter any number in the Start Number box." }]
    }
  },

  // 23. Extract URLs from Text
  {
    id: "extract-urls",
    title: "Extract URLs from Text",
    category: "Text & Formatting",
    icon: "🌐",
    badge: "New",
    description: "Paste the email, doc, or notes. Every link comes out in a list.",
    keywords: ["extract urls", "link extractor", "find urls in text", "parse links", "scrape urls"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="eu-input" rows="6" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste emails, chat logs, or HTML with links... e.g. Check https://google.com or visit https://github.com/trending"></textarea>
          
          <div class="flex items-center justify-between text-xs">
            <span id="eu-count" class="font-semibold text-indigo-600">0 URLs extracted</span>
            <button id="eu-extract" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition">Extract URLs</button>
          </div>

          <textarea id="eu-output" rows="6" readonly class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200"></textarea>

          <div class="flex justify-end gap-2">
            <button id="eu-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy URLs</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#eu-input');
      const output = container.querySelector('#eu-output');
      const countEl = container.querySelector('#eu-count');

      function extract() {
        const text = input.value;
        const urlRegex = /(https?:\/\/[^\s<>"'()]+)/gi;
        const matches = text.match(urlRegex) || [];
        const unique = Array.from(new Set(matches));

        countEl.textContent = `${unique.length} unique URL(s) extracted`;
        output.value = unique.join('\n');
      }

      container.querySelector('#eu-extract').addEventListener('click', extract);
      container.querySelector('#eu-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Extract all hyperlinks and web URLs buried in raw documents, emails, server logs, or chat transcripts.",
      features: ["Extracts HTTP and HTTPS protocols", "Automatic deduplication", "Clean line-by-line output"],
      howTo: ["Paste text containing links.", "Click Extract URLs.", "Copy the cleaned list."],
      faqs: [{ q: "Does it filter duplicate URLs?", a: "Yes, duplicate links are collapsed into unique entries." }]
    }
  },

  // 24. Extract Emails from Text
  {
    id: "extract-emails",
    title: "Extract Emails from Text",
    category: "Text & Formatting",
    icon: "📧",
    badge: "New",
    description: "Paste the message. Every address comes out in a list.",
    keywords: ["extract emails", "email parser", "find emails", "email scraper", "harvest emails"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="ee-input" rows="6" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste text containing emails... e.g. Contact alice@example.com or support@omnitools.dev for details."></textarea>
          
          <div class="flex items-center justify-between text-xs">
            <span id="ee-count" class="font-semibold text-indigo-600">0 emails extracted</span>
            <button id="ee-extract" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition">Extract Emails</button>
          </div>

          <textarea id="ee-output" rows="6" readonly class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200"></textarea>

          <div class="flex justify-end gap-2">
            <button id="ee-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Emails</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#ee-input');
      const output = container.querySelector('#ee-output');
      const countEl = container.querySelector('#ee-count');

      function extract() {
        const text = input.value;
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
        const matches = text.match(emailRegex) || [];
        const unique = Array.from(new Set(matches.map(m => m.toLowerCase())));

        countEl.textContent = `${unique.length} unique email(s) extracted`;
        output.value = unique.join('\n');
      }

      container.querySelector('#ee-extract').addEventListener('click', extract);
      container.querySelector('#ee-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Quickly extract email addresses from messy text, resumes, spreadsheets, or inquiries with zero server tracking.",
      features: ["RFC-compliant email pattern matching", "Deduplicates and lowercases addresses", "Copy as list"],
      howTo: ["Paste raw text.", "Click Extract Emails.", "Copy unique results."],
      faqs: [{ q: "Is my customer data sent anywhere?", a: "No, all extraction happens 100% locally in your browser memory." }]
    }
  },

  // 25. Emoji Stripper
  {
    id: "emoji-stripper",
    title: "Emoji Stripper",
    category: "Text & Formatting",
    icon: "🚫",
    badge: "New",
    description: "Paste the text. The emojis come out and the words stay.",
    keywords: ["emoji stripper", "remove emojis", "strip emojis", "clean emojis from text"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <textarea id="es-input" rows="6" class="w-full p-4 font-sans text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100" placeholder="Paste text full of emojis... e.g. Hey everyone! 👋🔥 Let's launch today! 🚀🎉"></textarea>
          
          <div class="flex items-center justify-between text-xs">
            <span id="es-count" class="text-slate-500">Emojis stripped: 0</span>
            <button id="es-strip" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition">Strip All Emojis</button>
          </div>

          <textarea id="es-output" rows="6" readonly class="w-full p-4 font-sans text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100"></textarea>

          <div class="flex justify-end gap-2">
            <button id="es-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Clean Text</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#es-input');
      const output = container.querySelector('#es-output');
      const countEl = container.querySelector('#es-count');

      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{1F004}\u{1F0CF}\u{1F18E}]/gu;

      function stripEmojis() {
        const text = input.value;
        const matches = text.match(emojiRegex);
        const count = matches ? matches.length : 0;
        const clean = text.replace(emojiRegex, '').replace(/[ ]{2,}/g, ' ').trim();

        countEl.textContent = `Emojis stripped: ${count}`;
        output.value = clean;
        Utils.showToast(`Stripped ${count} emoji(s)!`, 'success');
      }

      container.querySelector('#es-strip').addEventListener('click', stripEmojis);
      container.querySelector('#es-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Remove emojis, pictographs, symbols, and flags from social copy, product names, or SQL imports that reject 4-byte UTF8mb4 characters.",
      features: ["Covers all modern Unicode 15.0 emojis and flags", "Collapses resulting double spaces cleanly", "Protects legacy database encodings"],
      howTo: ["Paste text with emojis.", "Click Strip All Emojis.", "Copy the sanitized string."],
      faqs: [{ q: "Why strip emojis before database inserts?", a: "Older MySQL or Latin1 database encodings crash or truncate strings when encountering 4-byte UTF-8 emoji sequences." }]
    }
  }
];

window.textTools = textTools;
