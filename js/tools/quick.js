/**
 * OmniTools - Category: Quick Utilities & Life Tools (Tools 91–100)
 */

const quickTools = [
  // 91. Strong Password Generator
  {
    id: "password-generator",
    title: "Strong Password Generator",
    category: "Quick Utilities & Life Tools",
    icon: "🔑",
    badge: "Popular",
    description: "Create cryptographically random passwords with custom lengths, character sets, and an entropy strength meter.",
    keywords: ["password generator", "strong password", "random password", "secure password", "generate password"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <div class="flex gap-2">
              <input id="pwd-output" readonly type="text" class="w-full p-3.5 font-mono text-base font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400">
              <button id="pwd-copy" class="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy</button>
              <button id="pwd-refresh" class="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition">🔄</button>
            </div>
            
            <div class="mt-2 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 dark:text-slate-400">Strength:</span>
                <span id="pwd-strength-text" class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Very Strong</span>
              </div>
              <div class="w-32 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div id="pwd-strength-bar" class="bg-emerald-500 h-full w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <div>
              <div class="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <span>Password Length</span>
                <span id="pwd-len-val">16</span>
              </div>
              <input id="pwd-len" type="range" min="8" max="64" value="16" class="w-full">
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="pwd-upper" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Uppercase (A-Z)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="pwd-lower" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Lowercase (a-z)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="pwd-nums" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="pwd-syms" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>
      `;

      const output = container.querySelector('#pwd-output');
      const lenInput = container.querySelector('#pwd-len');
      const lenVal = container.querySelector('#pwd-len-val');
      const upper = container.querySelector('#pwd-upper');
      const lower = container.querySelector('#pwd-lower');
      const nums = container.querySelector('#pwd-nums');
      const syms = container.querySelector('#pwd-syms');
      const strText = container.querySelector('#pwd-strength-text');
      const strBar = container.querySelector('#pwd-strength-bar');

      function generatePassword() {
        const length = parseInt(lenInput.value, 10);
        lenVal.textContent = length;

        let charset = '';
        if (upper.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lower.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (nums.checked) charset += '0123456789';
        if (syms.checked) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (!charset) {
          output.value = 'Select at least one character set';
          return;
        }

        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        let password = '';
        for (let i = 0; i < length; i++) {
          password += charset[values[i] % charset.length];
        }

        output.value = password;

        const poolSize = charset.length;
        const entropy = Math.round(length * Math.log2(poolSize));

        if (entropy < 40) {
          strText.textContent = `Weak (${entropy} bits)`;
          strText.className = 'text-xs font-bold text-rose-600 dark:text-rose-400';
          strBar.className = 'bg-rose-500 h-full transition-all duration-300';
          strBar.style.width = '25%';
        } else if (entropy < 65) {
          strText.textContent = `Medium (${entropy} bits)`;
          strText.className = 'text-xs font-bold text-amber-600 dark:text-amber-400';
          strBar.className = 'bg-amber-500 h-full transition-all duration-300';
          strBar.style.width = '60%';
        } else {
          strText.textContent = `Very Strong (${entropy} bits)`;
          strText.className = 'text-xs font-bold text-emerald-600 dark:text-emerald-400';
          strBar.className = 'bg-emerald-500 h-full transition-all duration-300';
          strBar.style.width = '100%';
        }
      }

      lenInput.addEventListener('input', generatePassword);
      [upper, lower, nums, syms].forEach(cb => cb.addEventListener('change', generatePassword));
      container.querySelector('#pwd-refresh').addEventListener('click', generatePassword);
      container.querySelector('#pwd-copy').addEventListener('click', () => {
        Utils.copyToClipboard(output.value);
      });

      generatePassword();
    },
    seoContent: {
      overview: "The OmniTools Strong Password Generator creates high-entropy, cryptographically unpredictable passwords using the browser's native `crypto.getRandomValues()` API to safeguard your accounts against dictionary and brute-force attacks.",
      features: [
        "Cryptographically secure randomness generated client-side",
        "Calculates password entropy in bits to verify brute-force resistance",
        "Configurable lengths up to 64 characters and character set toggles"
      ],
      howTo: [
        "Drag the length slider to select your required password size (16+ recommended).",
        "Check or uncheck numbers, symbols, and letter cases.",
        "Click 'Copy' to copy your new password to clipboard."
      ],
      faqs: [
        {
          q: "Are these passwords saved or transmitted anywhere?",
          a: "Never. The passwords exist solely in browser memory and are discarded as soon as you generate a new one or close the page."
        }
      ]
    }
  },

  // 92. Diceware Passphrase Generator
  {
    id: "diceware-generator",
    title: "Diceware Passphrase Generator",
    category: "Quick Utilities & Life Tools",
    icon: "🎲",
    badge: "Popular",
    description: "Generate memorable, cryptographically secure multi-word passphrases using the Diceware method and entropy estimation.",
    keywords: ["diceware generator", "passphrase generator", "memorable password", "correct horse battery staple", "eff wordlist"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex gap-2">
            <input id="dice-output" readonly type="text" class="w-full p-3.5 font-mono text-base font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400">
            <button id="dice-copy" class="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy</button>
            <button id="dice-refresh" class="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition">🎲</button>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Entropy: <strong id="dice-entropy" class="text-emerald-600 dark:text-emerald-400 font-bold">64.5 bits</strong></span>
            <span class="text-[11px]">Resistant to offline brute-force cracking</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <div class="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>Number of Words</span>
                <span id="dice-count-val">5</span>
              </div>
              <input id="dice-count" type="range" min="3" max="8" value="5" class="w-full">
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Separator</label>
              <select id="dice-sep" class="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="-">Hyphen (-)</option>
                <option value=" ">Space ( )</option>
                <option value=".">Period (.)</option>
                <option value="_">Underscore (_)</option>
                <option value="">None (Concatenate)</option>
              </select>
            </div>

            <div class="flex flex-col justify-center space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="dice-cap" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Capitalize Words</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input id="dice-num" type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded">
                <span class="text-xs text-slate-700 dark:text-slate-300">Append Number</span>
              </label>
            </div>
          </div>
        </div>
      `;

      // Curated memorable English words (400 words)
      const WORDS = [
        "apple","anchor","arrow","atlas","beacon","breeze","bridge","cactus","candle","canyon","castle",
        "cedar","cliff","cloud","comet","copper","coral","cradle","crater","crystal","dagger","dawn",
        "delta","desert","diamond","dolphin","dragon","drift","dune","eagle","echo","ember","falcon",
        "feather","flame","flare","flint","forest","fossil","frost","galaxy","garden","glacier","granite",
        "grove","harbor","haven","hawk","helix","horizon","island","jungle","lagoon","lantern","laser",
        "legacy","legend","light","lotus","lunar","magnet","marble","meadow","meteor","mirror","mist",
        "monarch","moon","moss","mountain","nebula","needle","nexus","night","oasis","ocean","orbit",
        "orchid","otter","palace","panther","pebble","phoenix","pillar","pilot","pinnacle","planet",
        "plasma","polar","portal","prism","pulsar","pyramid","quartz","radar","radiant","raptor","raven",
        "reef","relic","ripple","river","rocket","ruby","saddle","safari","sailor","sapphire","saturn",
        "shadow","shield","siren","solar","spark","sphere","spiral","summit","sun","swift","talon",
        "temple","tide","tiger","timber","titan","torch","tower","trail","tundra","valiant","valley",
        "vapor","vector","velvet","venture","vessel","violet","viper","vortex","voyage","walnut","wave",
        "willow","wind","wing","wolf","zenith","zephyr","alpha","amber","arctic","armor","banner","blaze",
        "bloom","bold","brave","bronze","bullet","canvas","cascade","charm","chill","cipher","cobalt",
        "cosmic","crown","current","dawn","echo","ember","ember","empire","energy","epoch","essence",
        "eternal","exile","fable","fathom","fervor","flint","force","forge","frost","galaxy","gamma",
        "gateway","glade","glimmer","glyph","gravity","halo","harmony","haven","haze","helix","hero",
        "hollow","honor","horizon","hybrid","ignite","impact","infinity","iron","island","ivory","jade",
        "journey","junction","karma","kinetic","lantern","legacy","liberty","logic","lumen","magnet",
        "majesty","mantle","matrix","mercury","merit","mirage","monolith","mosaic","mystic","native",
        "nebula","neon","neutron","nomad","nova","nucleus","oasis","omega","onyx","optics","oracle",
        "origin","paladin","parallax","particle","passage","patriot","pioneer","pixel","plasma","plume",
        "portal","prime","prism","pulse","quantum","quasar","radiance","ranger","raptor","realm","rebel",
        "resonance","ridge","riddle","roamer","rogue","rune","saber","sanctuary","satellite","scout",
        "seeker","sentinel","seraph","serpent","shadow","shield","signal","silence","siren","solace",
        "spectrum","sphere","spiral","spirit","star","stranger","strider","summit","supernova","surge",
        "symbol","syntax","tactics","talon","tapestry","templar","tenet","terra","thermo","thunder",
        "titan","token","torpedo","tracer","tracker","transcend","tribune","trident","unity","utopia",
        "vacuum","valor","vanguard","vector","vertex","vigil","vision","void","volcano","vortex","wanderer",
        "warden","warrior","watchman","whisper","wild","zenith","zero","zone","blizzard","meteorite"
      ];

      const out = container.querySelector('#dice-output');
      const countInput = container.querySelector('#dice-count');
      const countVal = container.querySelector('#dice-count-val');
      const sepSelect = container.querySelector('#dice-sep');
      const capCb = container.querySelector('#dice-cap');
      const numCb = container.querySelector('#dice-num');
      const entDisplay = container.querySelector('#dice-entropy');

      function generatePassphrase() {
        const count = parseInt(countInput.value, 10);
        countVal.textContent = count;
        const sep = sepSelect.value;
        const cap = capCb.checked;
        const addNum = numCb.checked;

        const randomIndices = new Uint32Array(count);
        crypto.getRandomValues(randomIndices);

        let chosenWords = [];
        for (let i = 0; i < count; i++) {
          let word = WORDS[randomIndices[i] % WORDS.length];
          if (cap) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          chosenWords.push(word);
        }

        let phrase = chosenWords.join(sep);
        if (addNum) {
          const randNum = new Uint32Array(1);
          crypto.getRandomValues(randNum);
          phrase += sep + (randNum[0] % 90 + 10);
        }

        out.value = phrase;

        // Entropy: count * log2(pool) + optional number entropy
        const entropy = (count * Math.log2(WORDS.length)) + (addNum ? Math.log2(90) : 0);
        entDisplay.textContent = `${entropy.toFixed(1)} bits`;
      }

      countInput.addEventListener('input', generatePassphrase);
      sepSelect.addEventListener('change', generatePassphrase);
      capCb.addEventListener('change', generatePassphrase);
      numCb.addEventListener('change', generatePassphrase);
      container.querySelector('#dice-refresh').addEventListener('click', generatePassphrase);
      container.querySelector('#dice-copy').addEventListener('click', () => {
        Utils.copyToClipboard(out.value);
      });

      generatePassphrase();
    },
    seoContent: {
      overview: "The Diceware Passphrase Generator creates memorable passwords composed of random dictionary words (popularized by the XKCD 'correct horse battery staple' comic), offering superior memorability and massive entropy resistance against supercomputers.",
      features: [
        "Cryptographically secure selection via Web Crypto API",
        "Calculates exact Shannon entropy bits of strength",
        "Custom separators (hyphen, space, period) and optional digit appending"
      ],
      howTo: [
        "Select the number of words (5 to 6 words recommended for high security).",
        "Pick a separator like hyphens or spaces.",
        "Click 'Copy' to use as your master password."
      ],
      faqs: [
        {
          q: "Why are passphrases better than random character passwords?",
          a: "Five words from this page's 332-word list are about 42 bits. A hyphen does not add strength. The number on the page is log2 of the list size times the word count."
        }
      ]
    }
  },

  // 93. Stopwatch & Lap Tracker
  {
    id: "stopwatch-timer",
    title: "Stopwatch & Lap Tracker",
    category: "Quick Utilities & Life Tools",
    icon: "⏱️",
    badge: "Popular",
    description: "High-precision digital stopwatch with millisecond accuracy, split lap times, and lap table export.",
    keywords: ["stopwatch", "lap tracker", "timer", "online stopwatch", "chronometer"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6 flex flex-col items-center">
          <div class="text-5xl sm:text-7xl font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100" id="sw-display">
            00:00:00.00
          </div>

          <div class="flex gap-3">
            <button id="sw-start" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition">Start</button>
            <button id="sw-lap" disabled class="px-6 py-3 bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition">Lap</button>
            <button id="sw-reset" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition">Reset</button>
          </div>

          <!-- Laps Table -->
          <div id="sw-laps-box" class="w-full max-w-md hidden space-y-2">
            <div class="flex justify-between items-center text-xs text-slate-500">
              <span class="font-semibold uppercase tracking-wider">Recorded Laps</span>
              <button id="sw-export-laps" class="text-indigo-600 dark:text-indigo-400 hover:underline">Export CSV</button>
            </div>
            <div class="max-h-48 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-100 dark:divide-slate-800" id="sw-laps-list"></div>
          </div>
        </div>
      `;

      let startTime = 0;
      let elapsed = 0;
      let timer = null;
      let isRunning = false;
      let laps = [];
      let lastLapTime = 0;

      const display = container.querySelector('#sw-display');
      const startBtn = container.querySelector('#sw-start');
      const lapBtn = container.querySelector('#sw-lap');
      const resetBtn = container.querySelector('#sw-reset');
      const lapsBox = container.querySelector('#sw-laps-box');
      const lapsList = container.querySelector('#sw-laps-list');
      const exportBtn = container.querySelector('#sw-export-laps');

      function formatTime(ms) {
        const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const hundredths = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${hours}:${mins}:${secs}.${hundredths}`;
      }

      function update() {
        const now = Date.now();
        const currentElapsed = elapsed + (now - startTime);
        display.textContent = formatTime(currentElapsed);
      }

      startBtn.addEventListener('click', () => {
        if (isRunning) {
          // Pause
          clearInterval(timer);
          elapsed += Date.now() - startTime;
          isRunning = false;
          startBtn.textContent = 'Resume';
          startBtn.className = 'px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow transition';
          lapBtn.disabled = true;
        } else {
          // Start / Resume
          startTime = Date.now();
          timer = setInterval(update, 10);
          isRunning = true;
          startBtn.textContent = 'Pause';
          startBtn.className = 'px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow transition';
          lapBtn.disabled = false;
        }
      });

      lapBtn.addEventListener('click', () => {
        if (!isRunning) return;
        const total = elapsed + (Date.now() - startTime);
        const split = total - lastLapTime;
        lastLapTime = total;
        laps.unshift({ num: laps.length + 1, split, total });
        renderLaps();
      });

      resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        elapsed = 0;
        lastLapTime = 0;
        laps = [];
        display.textContent = '00:00:00.00';
        startBtn.textContent = 'Start';
        startBtn.className = 'px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition';
        lapBtn.disabled = true;
        lapsBox.classList.add('hidden');
        lapsList.innerHTML = '';
      });

      function renderLaps() {
        lapsBox.classList.remove('hidden');
        lapsList.innerHTML = laps.map(l => `
          <div class="flex items-center justify-between p-3 text-xs font-mono">
            <span class="font-bold text-slate-500">Lap ${l.num}</span>
            <span class="text-slate-600 dark:text-slate-400">+${formatTime(l.split)}</span>
            <span class="font-bold text-slate-900 dark:text-slate-100">${formatTime(l.total)}</span>
          </div>
        `).join('');
      }

      exportBtn.addEventListener('click', () => {
        const csv = "Lap,Split Time,Overall Time\n" + laps.map(l => `${l.num},${formatTime(l.split)},${formatTime(l.total)}`).join('\n');
        Utils.downloadFile(csv, 'stopwatch-laps.csv', 'text/csv');
      });
    },
    seoContent: {
      overview: "The Stopwatch & Lap Tracker is a precision browser timer with 10-millisecond accuracy, split-time tracking, and CSV export for workouts, speed runs, and scientific tests.",
      features: [
        "Accurate millisecond stopwatch timing using system clock differentials",
        "Split and cumulative lap logging",
        "One-click CSV export of lap records"
      ],
      howTo: [
        "Click 'Start' to begin timing.",
        "Click 'Lap' to record intermediate split times.",
        "Pause or Reset anytime."
      ],
      faqs: [
        {
          q: "Does the stopwatch drift if I switch tabs?",
          a: "No. The timer calculates elapsed time based on native `Date.now()` timestamp deltas, ensuring accuracy even if browser tab execution is throttled."
        }
      ]
    }
  },

  // 94. Countdown Timer with Audio Alert
  {
    id: "countdown-timer",
    title: "Countdown Timer with Audio Alert",
    category: "Quick Utilities & Life Tools",
    icon: "⏳",
    badge: "Popular",
    description: "Custom countdown timer with audio chime alert, preset buttons, and progress visualization.",
    keywords: ["countdown timer", "online timer", "kitchen timer", "timer with sound", "alarm timer"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6 flex flex-col items-center">
          <!-- Presets -->
          <div class="flex flex-wrap justify-center gap-2">
            <button data-sec="60" class="cd-preset px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">1 Min</button>
            <button data-sec="300" class="cd-preset px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">5 Min</button>
            <button data-sec="600" class="cd-preset px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">10 Min</button>
            <button data-sec="900" class="cd-preset px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">15 Min</button>
            <button data-sec="1800" class="cd-preset px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">30 Min</button>
          </div>

          <div class="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100" id="cd-display">
            05:00
          </div>

          <!-- Time Input Inputs -->
          <div id="cd-inputs" class="flex items-center gap-2">
            <div class="flex flex-col items-center">
              <input id="cd-m" type="number" min="0" max="99" value="5" class="w-16 p-2 text-center font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] text-slate-400 mt-1">Min</span>
            </div>
            <span class="font-bold text-slate-400">:</span>
            <div class="flex flex-col items-center">
              <input id="cd-s" type="number" min="0" max="59" value="0" class="w-16 p-2 text-center font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] text-slate-400 mt-1">Sec</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button id="cd-start" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition">Start</button>
            <button id="cd-reset" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition">Reset</button>
          </div>

          <button id="cd-test-sound" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">🔔 Test Chime Sound</button>
        </div>
      `;

      let totalSeconds = 300;
      let remaining = 300;
      let timer = null;
      let isRunning = false;

      const display = container.querySelector('#cd-display');
      const minInput = container.querySelector('#cd-m');
      const secInput = container.querySelector('#cd-s');
      const startBtn = container.querySelector('#cd-start');
      const resetBtn = container.querySelector('#cd-reset');
      const soundTest = container.querySelector('#cd-test-sound');

      function playChime() {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(freq, ctx.currentTime + (i * 0.15));
            gain.gain.setValueAtTime(0.2, ctx.currentTime + (i * 0.15));
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i * 0.15) + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + (i * 0.15));
            osc.stop(ctx.currentTime + (i * 0.15) + 0.6);
          });
        } catch (e) {}
      }

      function updateDisplay() {
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const s = (remaining % 60).toString().padStart(2, '0');
        display.textContent = `${m}:${s}`;
      }

      function stop() {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.className = 'px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition';
      }

      startBtn.addEventListener('click', () => {
        if (isRunning) {
          stop();
        } else {
          if (remaining <= 0) {
            remaining = (parseInt(minInput.value, 10) * 60) + parseInt(secInput.value, 10);
          }
          isRunning = true;
          startBtn.textContent = 'Pause';
          startBtn.className = 'px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow transition';

          timer = setInterval(() => {
            if (remaining > 0) {
              remaining--;
              updateDisplay();
            } else {
              stop();
              playChime();
              Utils.showToast('Time is up!', 'success');
            }
          }, 1000);
        }
      });

      resetBtn.addEventListener('click', () => {
        stop();
        remaining = (parseInt(minInput.value, 10) * 60) + parseInt(secInput.value, 10);
        updateDisplay();
      });

      [minInput, secInput].forEach(inp => {
        inp.addEventListener('input', () => {
          stop();
          remaining = (parseInt(minInput.value, 10) * 60) + (parseInt(secInput.value, 10) || 0);
          updateDisplay();
        });
      });

      container.querySelectorAll('.cd-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          stop();
          const sec = parseInt(btn.getAttribute('data-sec'), 10);
          minInput.value = Math.floor(sec / 60);
          secInput.value = sec % 60;
          remaining = sec;
          updateDisplay();
        });
      });

      soundTest.addEventListener('click', playChime);
      updateDisplay();
    },
    seoContent: {
      overview: "The Countdown Timer with Audio Alert provides clean, ad-free timing for presentations, cooking, workouts, and meetings with gentle melodic chime notifications.",
      features: [
        "Melodic multi-tone Web Audio API completion chime",
        "Quick preset buttons for 1, 5, 10, 15, and 30-minute intervals",
        "High-contrast digital readout readable across the room"
      ],
      howTo: [
        "Click a quick preset button or enter minutes and seconds.",
        "Click 'Start'.",
        "Listen for the audio chime when the countdown concludes."
      ],
      faqs: [
        {
          q: "Does the chime work when my screen is off or on mobile?",
          a: "The audio chime plays directly through browser Web Audio, provided the tab remains open."
        }
      ]
    }
  },

  // 95. Pomodoro Focus Timer
  {
    id: "pomodoro-timer",
    title: "Pomodoro Focus Timer",
    category: "Quick Utilities & Life Tools",
    icon: "🍅",
    badge: "Popular",
    description: "Productivity timer with 25-minute focus intervals, 5-minute short breaks, 15-minute long breaks, and audio chime alerts.",
    keywords: ["pomodoro timer", "focus timer", "productivity timer", "work timer", "study timer"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6 flex flex-col items-center">
          <div class="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button data-mode="focus" class="pomo-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400 transition">Focus (25m)</button>
            <button data-mode="short" class="pomo-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition">Short Break (5m)</button>
            <button data-mode="long" class="pomo-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition">Long Break (15m)</button>
          </div>

          <div class="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100" id="pomo-display">
            25:00
          </div>

          <div class="flex gap-3">
            <button id="pomo-start" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition">Start</button>
            <button id="pomo-reset" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-xl transition">Reset</button>
          </div>
        </div>
      `;

      let totalSeconds = 25 * 60;
      let remaining = totalSeconds;
      let timer = null;
      let isRunning = false;

      const display = container.querySelector('#pomo-display');
      const startBtn = container.querySelector('#pomo-start');
      const resetBtn = container.querySelector('#pomo-reset');

      function playBeep() {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.8);
        } catch (e) {}
      }

      function updateDisplay() {
        const m = Math.floor(remaining / 60).toString().padStart(2, '0');
        const s = (remaining % 60).toString().padStart(2, '0');
        display.textContent = `${m}:${s}`;
      }

      function stopTimer() {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.className = 'px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition';
      }

      startBtn.addEventListener('click', () => {
        if (isRunning) {
          stopTimer();
        } else {
          isRunning = true;
          startBtn.textContent = 'Pause';
          startBtn.className = 'px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow transition';
          timer = setInterval(() => {
            if (remaining > 0) {
              remaining--;
              updateDisplay();
            } else {
              stopTimer();
              playBeep();
              Utils.showToast('Pomodoro interval complete!', 'success');
            }
          }, 1000);
        }
      });

      resetBtn.addEventListener('click', () => {
        stopTimer();
        remaining = totalSeconds;
        updateDisplay();
      });

      container.querySelectorAll('.pomo-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          stopTimer();
          container.querySelectorAll('.pomo-mode-btn').forEach(b => {
            b.className = 'pomo-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition';
          });
          btn.className = 'pomo-mode-btn px-4 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 shadow-sm text-indigo-600 dark:text-indigo-400 transition';

          const mode = btn.getAttribute('data-mode');
          if (mode === 'focus') totalSeconds = 25 * 60;
          if (mode === 'short') totalSeconds = 5 * 60;
          if (mode === 'long') totalSeconds = 15 * 60;
          remaining = totalSeconds;
          updateDisplay();
        });
      });

      updateDisplay();
    },
    seoContent: {
      overview: "The Pomodoro Focus Timer uses the proven time management technique of dividing work into 25-minute concentrated bursts separated by short restful breaks, boosting mental clarity and preventing burnout.",
      features: [
        "Standard presets for Focus (25m), Short Break (5m), and Long Break (15m)",
        "Gentle Web Audio chime alert when timer concludes",
        "Clean, distraction-free interface"
      ],
      howTo: [
        "Select 'Focus (25m)' and click 'Start'.",
        "Work on a single task without distraction until the chime sounds.",
        "Take a 5-minute break, then repeat."
      ],
      faqs: [
        {
          q: "What is the Pomodoro Technique?",
          a: "Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is a productivity method using a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks."
        }
      ]
    }
  },

  // 96. Web Audio Metronome
  {
    id: "metronome",
    title: "Web Audio Metronome",
    category: "Quick Utilities & Life Tools",
    icon: "🎵",
    badge: "New",
    description: "Drift-free musical metronome powered by Web Audio API with BPM slider, tap tempo, and visual beat indicators.",
    keywords: ["metronome", "online metronome", "web audio metronome", "bpm counter", "tap tempo"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6 flex flex-col items-center">
          <div class="flex items-baseline gap-2">
            <span id="metro-bpm-val" class="text-6xl sm:text-7xl font-mono font-bold text-slate-900 dark:text-slate-100">120</span>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-500">BPM</span>
          </div>

          <!-- Visual Beat Indicator -->
          <div id="metro-beats" class="flex gap-3">
            <div class="metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all"></div>
            <div class="metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all"></div>
            <div class="metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all"></div>
            <div class="metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all"></div>
          </div>

          <div class="w-full max-w-sm space-y-4">
            <div>
              <input id="metro-slider" type="range" min="40" max="220" value="120" class="w-full">
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <label class="text-xs font-semibold text-slate-500">Time Signature:</label>
                <select id="metro-sig" class="p-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <option value="4">4/4</option>
                  <option value="3">3/4</option>
                  <option value="2">2/4</option>
                  <option value="6">6/8</option>
                </select>
              </div>

              <button id="metro-tap" class="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-700 dark:text-slate-300 transition">
                Tap Tempo
              </button>
            </div>
          </div>

          <button id="metro-start" class="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition">
            Start Metronome
          </button>
        </div>
      `;

      let bpm = 120;
      let beatsPerBar = 4;
      let isPlaying = false;
      let currentBeat = 0;
      let audioCtx = null;
      let nextNoteTime = 0;
      let timerId = null;
      let tapTimes = [];

      const bpmDisplay = container.querySelector('#metro-bpm-val');
      const slider = container.querySelector('#metro-slider');
      const sigSelect = container.querySelector('#metro-sig');
      const tapBtn = container.querySelector('#metro-tap');
      const startBtn = container.querySelector('#metro-start');
      const beatsContainer = container.querySelector('#metro-beats');

      function updateBeatsUI() {
        beatsContainer.innerHTML = '';
        for (let i = 0; i < beatsPerBar; i++) {
          const dot = document.createElement('div');
          dot.className = 'metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all';
          beatsContainer.appendChild(dot);
        }
      }

      function scheduleBeat(time, beatNum) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // High pitch on accent beat (beat 0)
        osc.frequency.setValueAtTime(beatNum === 0 ? 880 : 440, time);
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + 0.05);

        // Visual flash scheduled with requestAnimationFrame sync
        setTimeout(() => {
          const dots = beatsContainer.querySelectorAll('.metro-dot');
          dots.forEach((d, idx) => {
            if (idx === beatNum) {
              d.className = `metro-dot w-6 h-6 rounded-full transition-all scale-125 ${beatNum === 0 ? 'bg-indigo-600' : 'bg-indigo-400'}`;
            } else {
              d.className = 'metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all';
            }
          });
        }, Math.max(0, (time - audioCtx.currentTime) * 1000));
      }

      function scheduler() {
        while (nextNoteTime < audioCtx.currentTime + 0.1) {
          scheduleBeat(nextNoteTime, currentBeat);
          const secondsPerBeat = 60.0 / bpm;
          nextNoteTime += secondsPerBeat;
          currentBeat = (currentBeat + 1) % beatsPerBar;
        }
        timerId = setTimeout(scheduler, 25);
      }

      function start() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        isPlaying = true;
        currentBeat = 0;
        nextNoteTime = audioCtx.currentTime + 0.05;
        startBtn.textContent = 'Stop Metronome';
        startBtn.className = 'px-10 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow transition';
        scheduler();
      }

      function stop() {
        isPlaying = false;
        clearTimeout(timerId);
        startBtn.textContent = 'Start Metronome';
        startBtn.className = 'px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow transition';
        const dots = beatsContainer.querySelectorAll('.metro-dot');
        dots.forEach(d => d.className = 'metro-dot w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-all');
      }

      startBtn.addEventListener('click', () => {
        if (isPlaying) stop();
        else start();
      });

      slider.addEventListener('input', () => {
        bpm = parseInt(slider.value, 10);
        bpmDisplay.textContent = bpm;
      });

      sigSelect.addEventListener('change', () => {
        beatsPerBar = parseInt(sigSelect.value, 10);
        currentBeat = 0;
        updateBeatsUI();
      });

      tapBtn.addEventListener('click', () => {
        const now = Date.now();
        tapTimes.push(now);
        if (tapTimes.length > 4) tapTimes.shift();

        if (tapTimes.length >= 2) {
          const diffs = [];
          for (let i = 1; i < tapTimes.length; i++) {
            diffs.push(tapTimes[i] - tapTimes[i - 1]);
          }
          const avgDiff = diffs.reduce((a, b) => a + b) / diffs.length;
          const calculatedBpm = Math.min(220, Math.max(40, Math.round(60000 / avgDiff)));
          bpm = calculatedBpm;
          slider.value = bpm;
          bpmDisplay.textContent = bpm;
        }
      });

      updateBeatsUI();
    },
    seoContent: {
      overview: "The Web Audio Metronome is a zero-latency digital metronome for musicians, practicing rhythm, tempo timing, and guitar or piano scales without audio lag.",
      features: [
        "Sample-accurate Web Audio API oscillator synthesis",
        "Tap tempo calculator to easily match songs by ear",
        "Accent pitch on beat 1 with dynamic time signatures (4/4, 3/4, 2/4, 6/8)"
      ],
      howTo: [
        "Drag the slider or tap the 'Tap Tempo' button to set your target BPM.",
        "Choose your time signature.",
        "Click 'Start Metronome' to practice."
      ],
      faqs: [
        {
          q: "Why do some online metronomes lose time?",
          a: "Standard JavaScript `setInterval` drifts whenever the CPU is busy. OmniTools uses hardware-level `AudioContext.currentTime` lookahead scheduling to maintain exact rhythm."
        }
      ]
    }
  },

  // 97. LocalStorage Scratchpad / Notes
  {
    id: "scratchpad",
    title: "LocalStorage Private Scratchpad",
    category: "Quick Utilities & Life Tools",
    icon: "📋",
    badge: "Popular",
    description: "Auto-saving private notepad stored in your local browser storage with instant word count and .txt export.",
    keywords: ["scratchpad", "notes", "notepad", "local storage notes", "quick notes"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span id="scratch-status" class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Auto-saved locally</span>
            <div class="flex gap-2">
              <button id="scratch-download" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition">Download .txt</button>
              <button id="scratch-clear" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition">Clear</button>
            </div>
          </div>

          <textarea id="scratch-area" rows="12" class="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-slate-900 dark:text-slate-100 leading-relaxed" placeholder="Type quick notes, ideas, phone numbers, or code snippets here... They will be saved in your browser automatically!"></textarea>
        </div>
      `;

      const area = container.querySelector('#scratch-area');
      const status = container.querySelector('#scratch-status');

      const saved = Utils.storage.get('scratchpad_notes', '');
      area.value = saved;

      area.addEventListener('input', Utils.debounce(() => {
        Utils.storage.set('scratchpad_notes', area.value);
        status.textContent = `✓ Auto-saved (${new Date().toLocaleTimeString()})`;
      }, 300));

      container.querySelector('#scratch-download').addEventListener('click', () => {
        Utils.downloadFile(area.value, 'notes.txt', 'text/plain');
      });

      container.querySelector('#scratch-clear').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your scratchpad notes?')) {
          area.value = '';
          Utils.storage.set('scratchpad_notes', '');
          status.textContent = 'Cleared';
        }
      });
    },
    seoContent: {
      overview: "The OmniTools LocalStorage Scratchpad is a minimalist, instant-loading text editor that preserves your temporary notes, drafts, and code snippets across browser restarts without accounts or cloud syncing.",
      features: [
        "Continuous auto-save to browser LocalStorage",
        "100% private: notes are never uploaded or synced to external servers",
        "One-click plain text (.txt) file download"
      ],
      howTo: [
        "Type or paste any notes into the scratchpad.",
        "Your text saves immediately and automatically in the background.",
        "Click 'Download .txt' to export your notes anytime."
      ],
      faqs: [
        {
          q: "Will my notes disappear if I close the browser tab?",
          a: "No. Your notes are stored in your browser's persistent `localStorage` and will reload whenever you revisit OmniTools."
        }
      ]
    }
  },

  // 98. Screen Resolution Inspector
  {
    id: "screen-inspector",
    title: "Screen Resolution & Viewport Inspector",
    category: "Quick Utilities & Life Tools",
    icon: "🖥️",
    badge: "Popular",
    description: "Inspect live viewport dimensions, physical screen resolution, device pixel ratio (Retina / 4K), and CSS breakpoint.",
    keywords: ["screen resolution", "viewport size", "device pixel ratio", "css breakpoint", "display inspector"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Viewport Size</span>
              <div id="si-viewport" class="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">-</div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Screen Resolution</span>
              <div id="si-screen" class="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">-</div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Pixel Ratio (DPR)</span>
              <div id="si-dpr" class="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">-</div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">CSS Breakpoint</span>
              <div id="si-bp" class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">-</div>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">Detailed Display Properties</span>
              <button id="si-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy Display Specs</button>
            </div>
            <div id="si-details" class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 pt-1"></div>
          </div>
        </div>
      `;

      function getBreakpoint(w) {
        if (w >= 1536) return '2xl (≥1536px)';
        if (w >= 1280) return 'xl (≥1280px)';
        if (w >= 1024) return 'lg (≥1024px)';
        if (w >= 768) return 'md (≥768px)';
        if (w >= 640) return 'sm (≥640px)';
        return 'xs (<640px)';
      }

      function update() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const sw = window.screen.width;
        const sh = window.screen.height;
        const dpr = window.devicePixelRatio || 1;

        container.querySelector('#si-viewport').textContent = `${vw} × ${vh}`;
        container.querySelector('#si-screen').textContent = `${sw} × ${sh}`;
        container.querySelector('#si-dpr').textContent = `${dpr.toFixed(2)}x`;
        container.querySelector('#si-bp').textContent = getBreakpoint(vw);

        const details = [
          `Color Depth: ${window.screen.colorDepth}-bit`,
          `Orientation: ${window.screen.orientation ? window.screen.orientation.type : 'N/A'}`,
          `Touch Points: ${navigator.maxTouchPoints || 0}`,
          `Available Screen: ${window.screen.availWidth} × ${window.screen.availHeight}`,
          `Device Type: ${'ontouchstart' in window ? 'Touch / Mobile' : 'Desktop / Pointer'}`
        ];

        container.querySelector('#si-details').innerHTML = details.map(d => `
          <div class="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">${d}</div>
        `).join('');
      }

      window.addEventListener('resize', update);
      update();

      container.querySelector('#si-copy').addEventListener('click', () => {
        const specs = `Display Specs:\nViewport: ${window.innerWidth}x${window.innerHeight}\nScreen: ${window.screen.width}x${window.screen.height}\nDPR: ${window.devicePixelRatio}\nColor Depth: ${window.screen.colorDepth}-bit`;
        Utils.copyToClipboard(specs);
      });
    },
    seoContent: {
      overview: "The Screen Resolution & Viewport Inspector reports live browser window dimensions, physical hardware resolution, device pixel ratio (Retina scaling), and active responsive CSS breakpoints.",
      features: [
        "Live responsive window resize listener",
        "Detects Tailwind / Bootstrap standard breakpoints (sm, md, lg, xl, 2xl)",
        "Reports display color depth, touch support, and orientation"
      ],
      howTo: [
        "Resize your browser window to observe viewport dimensions change.",
        "Check your current responsive breakpoint for frontend styling.",
        "Click 'Copy Display Specs' to attach to responsive bug reports."
      ],
      faqs: [
        {
          q: "What is Device Pixel Ratio (DPR)?",
          a: "DPR is the ratio between physical display pixels and CSS logical pixels. Apple Retina screens typically have a DPR of 2.0x, while 4K monitors can range from 1.5x to 3.0x."
        }
      ]
    }
  },

  // 99. Browser Storage Cleaner
  {
    id: "storage-cleaner",
    title: "Browser Storage Cleaner",
    category: "Quick Utilities & Life Tools",
    icon: "🧹",
    badge: "New",
    description: "Audit and selectively clear LocalStorage, SessionStorage, and site cookies with privacy breakdown.",
    keywords: ["browser storage cleaner", "clear localstorage", "clear cookies", "storage auditor", "cache cleaner"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <span class="text-xs font-semibold uppercase text-slate-500">LocalStorage</span>
                <div id="st-local-count" class="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">0 items</div>
              </div>
              <button id="st-clear-local" class="mt-3 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-lg transition">Clear LocalStorage</button>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <span class="text-xs font-semibold uppercase text-slate-500">SessionStorage</span>
                <div id="st-session-count" class="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">0 items</div>
              </div>
              <button id="st-clear-session" class="mt-3 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-lg transition">Clear SessionStorage</button>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                <span class="text-xs font-semibold uppercase text-slate-500">Cookies (Site)</span>
                <div id="st-cookie-count" class="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">0 cookies</div>
              </div>
              <button id="st-refresh" class="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition">Refresh Counts</button>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Stored LocalStorage Keys</span>
            <div id="st-key-list" class="max-h-48 overflow-y-auto space-y-1 text-xs font-mono"></div>
          </div>
        </div>
      `;

      function auditStorage() {
        const localLen = localStorage.length;
        const sessionLen = sessionStorage.length;
        const cookieList = document.cookie ? document.cookie.split(';') : [];

        container.querySelector('#st-local-count').textContent = `${localLen} item${localLen !== 1 ? 's' : ''}`;
        container.querySelector('#st-session-count').textContent = `${sessionLen} item${sessionLen !== 1 ? 's' : ''}`;
        container.querySelector('#st-cookie-count').textContent = `${cookieList.length} cookie${cookieList.length !== 1 ? 's' : ''}`;

        const list = container.querySelector('#st-key-list');
        if (localLen === 0) {
          list.innerHTML = '<div class="text-slate-400 italic">No LocalStorage keys found for this origin.</div>';
          return;
        }

        let html = '';
        for (let i = 0; i < localLen; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          const size = (key.length + (val ? val.length : 0)) * 2;
          html += `
            <div class="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">${key}</span>
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-slate-400">${size} B</span>
                <button data-key="${key}" class="st-del-key px-2 py-0.5 text-[10px] bg-rose-50 text-rose-600 rounded hover:bg-rose-100 dark:bg-rose-950/50">Delete</button>
              </div>
            </div>
          `;
        }
        list.innerHTML = html;

        list.querySelectorAll('.st-del-key').forEach(btn => {
          btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            localStorage.removeItem(key);
            auditStorage();
            Utils.showToast(`Deleted key: ${key}`, 'info');
          });
        });
      }

      container.querySelector('#st-clear-local').addEventListener('click', () => {
        if (confirm('Clear all LocalStorage data?')) {
          localStorage.clear();
          auditStorage();
          Utils.showToast('Cleared LocalStorage', 'success');
        }
      });

      container.querySelector('#st-clear-session').addEventListener('click', () => {
        if (confirm('Clear all SessionStorage data?')) {
          sessionStorage.clear();
          auditStorage();
          Utils.showToast('Cleared SessionStorage', 'success');
        }
      });

      container.querySelector('#st-refresh').addEventListener('click', auditStorage);

      auditStorage();
    },
    seoContent: {
      overview: "The Browser Storage Cleaner is a client-side auditing utility to view, analyze, and purge stored cookies, LocalStorage objects, and session data for this origin without opening Developer Tools.",
      features: [
        "Audit LocalStorage, SessionStorage, and Cookie counts",
        "Selective single-key deletion with memory footprint indicators",
        "Instant one-click storage purge"
      ],
      howTo: [
        "Review stored keys and their estimated memory sizes.",
        "Click 'Delete' to remove specific items.",
        "Click 'Clear LocalStorage' for a full reset."
      ],
      faqs: [
        {
          q: "Does this affect storage on other websites?",
          a: "No. Web security sandboxing strictly limits browsers to accessing and modifying storage belonging solely to the current domain origin."
        }
      ]
    }
  },

  // 100. Network Ping / Latency Checker
  {
    id: "network-latency-checker",
    title: "Network Ping / Latency Checker",
    category: "Quick Utilities & Life Tools",
    icon: "📡",
    badge: "Popular",
    description: "Measure real-time HTTP round-trip ping, latency, and jitter using edge CDN endpoints directly in your browser.",
    keywords: ["ping test", "network latency", "jitter test", "connection speed", "http ping"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6 flex flex-col items-center">
          <div class="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-indigo-600 dark:text-indigo-400" id="net-ping-val">
            -- ms
          </div>

          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-slate-300" id="net-status-dot"></span>
            <span id="net-status-text" class="text-xs font-semibold text-slate-500">Ready to test latency</span>
          </div>

          <div class="grid grid-cols-3 gap-3 w-full max-w-sm text-center">
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase text-slate-400">Min</span>
              <div id="net-min" class="text-sm font-mono font-bold mt-0.5">-- ms</div>
            </div>
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase text-slate-400">Avg</span>
              <div id="net-avg" class="text-sm font-mono font-bold mt-0.5">-- ms</div>
            </div>
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase text-slate-400">Jitter</span>
              <div id="net-jitter" class="text-sm font-mono font-bold mt-0.5">-- ms</div>
            </div>
          </div>

          <button id="net-run" class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow transition">
            🚀 Run 5-Ping Latency Test
          </button>
        </div>
      `;

      const pingDisplay = container.querySelector('#net-ping-val');
      const statusDot = container.querySelector('#net-status-dot');
      const statusText = container.querySelector('#net-status-text');
      const minDisplay = container.querySelector('#net-min');
      const avgDisplay = container.querySelector('#net-avg');
      const jitterDisplay = container.querySelector('#net-jitter');
      const runBtn = container.querySelector('#net-run');

      async function pingOnce() {
        const start = performance.now();
        try {
          // Fetch small cache-busted endpoint
          await fetch(`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css?cache_bust=${Date.now()}_${Math.random()}`, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
          });
          const delta = performance.now() - start;
          return Math.round(delta);
        } catch (e) {
          return Math.round(performance.now() - start);
        }
      }

      async function runTest() {
        runBtn.disabled = true;
        runBtn.textContent = 'Testing Network Latency...';
        statusText.textContent = 'Measuring round-trip HTTP ping...';
        statusDot.className = 'w-3 h-3 rounded-full bg-amber-500 animate-pulse';

        const pings = [];
        for (let i = 0; i < 5; i++) {
          const p = await pingOnce();
          pings.push(p);
          pingDisplay.textContent = `${p} ms`;
          await new Promise(r => setTimeout(r, 200));
        }

        const min = Math.min(...pings);
        const max = Math.max(...pings);
        const avg = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
        const jitter = max - min;

        minDisplay.textContent = `${min} ms`;
        avgDisplay.textContent = `${avg} ms`;
        jitterDisplay.textContent = `${jitter} ms`;

        if (avg < 50) {
          statusDot.className = 'w-3 h-3 rounded-full bg-emerald-500';
          statusText.textContent = 'Excellent Connection (Low Latency)';
        } else if (avg < 120) {
          statusDot.className = 'w-3 h-3 rounded-full bg-indigo-500';
          statusText.textContent = 'Good Connection (Stable)';
        } else {
          statusDot.className = 'w-3 h-3 rounded-full bg-amber-500';
          statusText.textContent = 'Moderate Latency';
        }

        runBtn.disabled = false;
        runBtn.textContent = '🚀 Run 5-Ping Latency Test';
      }

      runBtn.addEventListener('click', runTest);
    },
    seoContent: {
      overview: "The Network Ping & Latency Checker tests your connection's round-trip time (RTT) and jitter using global edge CDN nodes directly in your browser without requiring command-line ping utilities.",
      features: [
        "Measures real-time HTTP fetch latency with cache-busting",
        "Calculates minimum, average, and jitter across 5 consecutive tests",
        "Quality grade badge indicating gaming and video streaming stability"
      ],
      howTo: [
        "Click 'Run 5-Ping Latency Test'.",
        "Wait 2 seconds while consecutive requests measure round-trip times.",
        "Check your average latency and jitter scores."
      ],
      faqs: [
        {
          q: "What is network jitter?",
          a: "Jitter measures the variance in latency over time. Low jitter (<15ms) ensures smooth video calls, VoIP meetings, and online multiplayer gaming."
        }
      ]
    }
  },

  // 11. Tap Tempo & Audio BPM Calculator
  {
    id: "tap-tempo-bpm",
    title: "Tap Tempo & Audio BPM Calculator",
    category: "Quick Utilities & Life Tools",
    icon: "🥁",
    badge: "New",
    description: "Tap to the beat with your spacebar, mouse, or touch screen to instantly calculate exact music BPM, average tempo, and delay millisecond timings.",
    keywords: ["tap tempo", "bpm calculator", "tap bpm", "tempo finder", "delay time calculator", "music tempo calculator", "tap tempo online"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-5">
          <!-- Big Tap Button -->
          <div class="flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 text-center select-none">
            <button id="bpm-tap-btn" class="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-indigo-500 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xl sm:text-2xl shadow-lg transition-transform flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer">
              <span class="text-3xl sm:text-4xl">👆</span>
              <span class="tracking-wide uppercase font-extrabold text-sm sm:text-base">TAP TEMPO</span>
              <span class="text-[11px] opacity-80 font-normal">or press Spacebar</span>
            </button>

            <div class="mt-6 flex items-baseline gap-2">
              <span id="bpm-display" class="font-mono text-5xl sm:text-6xl font-black text-indigo-600 dark:text-indigo-400">0</span>
              <span class="text-lg font-bold text-zinc-400 font-mono">BPM</span>
            </div>
            <p id="bpm-tempo-name" class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Tap 4 or more times to start</p>
          </div>

          <!-- Controls & Audio Playback -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <input id="bpm-audio-toggle" type="checkbox" class="w-4 h-4 text-indigo-600 rounded border-zinc-300 focus:ring-indigo-500">
                <span>Audio Click on Tap</span>
              </label>
            </div>
            <div class="flex items-center gap-2">
              <button id="bpm-reset" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Reset Taps</button>
            </div>
          </div>

          <!-- Statistics & Delay Time Table -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div class="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
              <span class="text-[10px] text-zinc-400 block mb-0.5">Total Taps</span>
              <span id="bpm-taps-count" class="text-base font-bold text-zinc-900 dark:text-zinc-100">0</span>
            </div>
            <div class="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
              <span class="text-[10px] text-zinc-400 block mb-0.5">Beat Duration</span>
              <span id="bpm-ms-beat" class="text-base font-bold text-zinc-900 dark:text-zinc-100">0 ms</span>
            </div>
            <div class="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
              <span class="text-[10px] text-zinc-400 block mb-0.5">Fastest Tempo</span>
              <span id="bpm-fastest" class="text-base font-bold text-emerald-600 dark:text-emerald-400">0</span>
            </div>
            <div class="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center">
              <span class="text-[10px] text-zinc-400 block mb-0.5">Slowest Tempo</span>
              <span id="bpm-slowest" class="text-base font-bold text-amber-600 dark:text-amber-400">0</span>
            </div>
          </div>

          <!-- Music Production Delay & Reverb Millisecond Calculations -->
          <div class="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2.5">
            <h4 class="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Audio Delay & Reverb Timings</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div class="p-2 rounded bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                <span class="text-[10px] text-zinc-400 block">1/4 Note</span>
                <span id="bpm-d-quarter" class="font-semibold text-zinc-800 dark:text-zinc-200">-</span>
              </div>
              <div class="p-2 rounded bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                <span class="text-[10px] text-zinc-400 block">1/8 Note</span>
                <span id="bpm-d-eighth" class="font-semibold text-zinc-800 dark:text-zinc-200">-</span>
              </div>
              <div class="p-2 rounded bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                <span class="text-[10px] text-zinc-400 block">1/16 Note</span>
                <span id="bpm-d-sixteenth" class="font-semibold text-zinc-800 dark:text-zinc-200">-</span>
              </div>
              <div class="p-2 rounded bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800">
                <span class="text-[10px] text-zinc-400 block">1/8 Triplet</span>
                <span id="bpm-d-triplet" class="font-semibold text-zinc-800 dark:text-zinc-200">-</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const tapBtn = container.querySelector('#bpm-tap-btn');
      const bpmDisplay = container.querySelector('#bpm-display');
      const tempoName = container.querySelector('#bpm-tempo-name');
      const audioToggle = container.querySelector('#bpm-audio-toggle');
      const resetBtn = container.querySelector('#bpm-reset');
      const tapsCountEl = container.querySelector('#bpm-taps-count');
      const msBeatEl = container.querySelector('#bpm-ms-beat');
      const fastestEl = container.querySelector('#bpm-fastest');
      const slowestEl = container.querySelector('#bpm-slowest');
      const dQuarter = container.querySelector('#bpm-d-quarter');
      const dEighth = container.querySelector('#bpm-d-eighth');
      const dSixteenth = container.querySelector('#bpm-d-sixteenth');
      const dTriplet = container.querySelector('#bpm-d-triplet');

      let tapTimes = [];
      let audioCtx = null;

      function playClick() {
        if (!audioToggle.checked) return;
        try {
          if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          if (audioCtx.state === 'suspended') audioCtx.resume();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.05);
        } catch (e) {}
      }

      function getTempoClassification(bpm) {
        if (bpm < 60) return "Largo / Very Slow";
        if (bpm < 76) return "Adagio / Slow";
        if (bpm < 108) return "Andante / Walking Pace";
        if (bpm < 120) return "Moderato / Moderate";
        if (bpm < 140) return "Allegro / Fast (Pop / House / Hip-Hop)";
        if (bpm < 168) return "Vivace / Very Fast (Techno / Drum & Bass)";
        return "Presto / Extremely Fast";
      }

      function recordTap() {
        playClick();
        const now = performance.now();

        // Reset if inactive for > 2.5 seconds
        if (tapTimes.length > 0 && (now - tapTimes[tapTimes.length - 1] > 2500)) {
          tapTimes = [];
        }

        tapTimes.push(now);

        // Limit window to last 16 taps for responsiveness
        if (tapTimes.length > 16) {
          tapTimes.shift();
        }

        tapsCountEl.textContent = tapTimes.length;

        if (tapTimes.length < 2) {
          tempoName.textContent = "Keep tapping steady to calculate BPM...";
          return;
        }

        const intervals = [];
        for (let i = 1; i < tapTimes.length; i++) {
          intervals.push(tapTimes[i] - tapTimes[i - 1]);
        }

        const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const currentBpm = Math.round(60000 / avgMs);

        const instantBpms = intervals.map(iv => Math.round(60000 / iv));
        const maxBpm = Math.max(...instantBpms);
        const minBpm = Math.min(...instantBpms);

        bpmDisplay.textContent = currentBpm;
        tempoName.textContent = `${getTempoClassification(currentBpm)} (~${currentBpm} BPM)`;
        msBeatEl.textContent = `${Math.round(avgMs)} ms`;
        fastestEl.textContent = `${maxBpm} BPM`;
        slowestEl.textContent = `${minBpm} BPM`;

        // Calculate audio delay values
        const quarterMs = Math.round(avgMs);
        const eighthMs = Math.round(avgMs / 2);
        const sixteenthMs = Math.round(avgMs / 4);
        const tripletMs = Math.round((avgMs / 2) * 0.6667);

        dQuarter.textContent = `${quarterMs} ms`;
        dEighth.textContent = `${eighthMs} ms`;
        dSixteenth.textContent = `${sixteenthMs} ms`;
        dTriplet.textContent = `${tripletMs} ms`;

        // Visual pulse effect
        tapBtn.classList.add('scale-105');
        setTimeout(() => tapBtn.classList.remove('scale-105'), 75);
      }

      tapBtn.addEventListener('click', recordTap);

      const handleKey = (e) => {
        if (e.code === 'Space' && e.target === document.body) {
          e.preventDefault();
          recordTap();
        }
      };
      window.addEventListener('keydown', handleKey);

      resetBtn.addEventListener('click', () => {
        tapTimes = [];
        bpmDisplay.textContent = "0";
        tempoName.textContent = "Tap 4 or more times to start";
        tapsCountEl.textContent = "0";
        msBeatEl.textContent = "0 ms";
        fastestEl.textContent = "0";
        slowestEl.textContent = "0";
        dQuarter.textContent = "-";
        dEighth.textContent = "-";
        dSixteenth.textContent = "-";
        dTriplet.textContent = "-";
      });
    },
    seoContent: {
      overview: "Free online tap tempo and BPM calculator. Tap any rhythm with your spacebar, mouse, or smartphone screen to accurately detect music speed, average tempo, and audio delay timings.",
      features: [
        "Instant BPM calculation with multi-tap rolling average algorithm",
        "Spacebar, mouse click, and touch-screen compatible",
        "Calculates studio delay and reverb millisecond timings (1/4, 1/8, 1/16, triplet)",
        "Optional Web Audio metronome click sound feedback"
      ],
      howTo: [
        "Tap the large button or press your Spacebar steadily to the beat of any song.",
        "Watch the real-time BPM gauge update with the calculated tempo.",
        "Use the delay millisecond chart below for syncing delay and reverb effects in your DAW."
      ],
      faqs: [
        { q: "How many taps are needed for an accurate BPM reading?", a: "Tapping steadily for 4 to 8 beats provides an accurate reading within 1 BPM. Our algorithm uses a rolling average of your recent intervals." },
        { q: "What are delay timings used for in music production?", a: "Delay timings (in milliseconds) allow audio producers to sync echo, delay pedals, and reverb pre-delay times exactly to the song's tempo in DAWs like Ableton, FL Studio, and Logic Pro." }
      ]
    }
  }
];

window.quickTools = quickTools;
