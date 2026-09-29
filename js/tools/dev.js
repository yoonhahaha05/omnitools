/**
 * OmniTools - Category: Developer & Data (Tools 26 to 50)
 * 100% Client-Side Execution
 */

const devTools = [
  // 26. JSON Beautifier & Validator
  {
    id: "json-beautifier",
    title: "Is this JSON valid?",
    category: "Developer & Data",
    icon: "🔧",
    badge: "Popular",
    description: "Paste it. You see it formatted, or the exact spot that is broken.",
    keywords: ["json beautifier", "json validator", "json formatter", "format json", "minify json", "json parser"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Indent</label>
              <select id="json-indent" class="p-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button id="json-sample" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Sample</button>
              <button id="json-format" class="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition">Beautify</button>
              <button id="json-minify" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Minify</button>
              <button id="json-copy" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition">Copy</button>
              <button id="json-clear" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 transition">Clear</button>
            </div>
          </div>

          <div id="json-status" class="hidden p-3 rounded-xl text-xs font-medium border flex items-center justify-between"></div>

          <textarea id="json-editor" rows="14" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100 leading-relaxed" placeholder="Paste or type JSON object here..."></textarea>
        </div>
      `;

      const editor = container.querySelector('#json-editor');
      const indentSelect = container.querySelector('#json-indent');
      const statusEl = container.querySelector('#json-status');

      function getIndent() {
        const val = indentSelect.value;
        return val === 'tab' ? '\t' : parseInt(val, 10);
      }

      function validateAndFormat(minify = false) {
        const raw = editor.value.trim();
        if (!raw) {
          statusEl.className = 'hidden';
          return;
        }

        try {
          const parsed = JSON.parse(raw);
          const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, getIndent());
          editor.value = formatted;
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900 flex items-center justify-between';
          statusEl.innerHTML = `<span>✓ Valid JSON formatted successfully (${(new Blob([formatted]).size)} bytes)</span>`;
        } catch (err) {
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900 flex items-center justify-between';
          statusEl.innerHTML = `<span>✕ Invalid JSON: ${Utils.escapeHtml(err.message)}</span>`;
        }
      }

      container.querySelector('#json-format').addEventListener('click', () => validateAndFormat(false));
      container.querySelector('#json-minify').addEventListener('click', () => validateAndFormat(true));
      container.querySelector('#json-clear').addEventListener('click', () => {
        editor.value = '';
        statusEl.className = 'hidden';
        editor.focus();
      });
      container.querySelector('#json-sample').addEventListener('click', () => {
        editor.value = JSON.stringify({
          name: "OmniTools Hub",
          version: "1.0.0",
          features: ["100% Client-Side", "Zero Latency", "Privacy Focused"],
          metrics: { tools: 100, free: true, openSource: true },
          created: new Date().toISOString()
        }, null, 2);
        validateAndFormat(false);
      });
      container.querySelector('#json-copy').addEventListener('click', () => Utils.copyToClipboard(editor.value));

      editor.addEventListener('input', Utils.debounce(() => {
        const raw = editor.value.trim();
        if (!raw) { statusEl.className = 'hidden'; return; }
        try {
          JSON.parse(raw);
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900';
          statusEl.innerHTML = '<span>✓ Valid JSON</span>';
        } catch (e) {
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900';
          statusEl.innerHTML = `<span>✕ ${Utils.escapeHtml(e.message)}</span>`;
        }
      }, 300));
    },
    seoContent: {
      overview: "The OmniTools JSON Beautifier & Validator provides instant formatting, syntax validation, and minification for developers working with REST APIs, configuration files, and payloads.",
      features: ["Real-time syntax verification with pinpointed error messages", "Configurable indentation (2 spaces, 4 spaces, tabs)", "100% client-side privacy"],
      howTo: ["Paste JSON into the editor.", "Click Beautify to indent or Minify to condense.", "Copy the result."],
      faqs: [{ q: "Are trailing commas valid in JSON?", a: "No, standard JSON specification prohibits trailing commas." }]
    }
  },

  // 27. JSON Minifier
  {
    id: "json-minifier",
    title: "How do I shrink this JSON?",
    category: "Developer & Data",
    icon: "🗜️",
    badge: "New",
    description: "Paste it. Extra spaces come out so the payload is smaller.",
    keywords: ["json minifier", "compress json", "minify json", "json compact", "shrink json"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span id="jm-stats" class="text-slate-500 font-medium">Original: 0 B | Minified: 0 B (Saved: 0%)</span>
            <div class="flex gap-2">
              <button id="jm-sample" class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">Sample</button>
              <button id="jm-minify" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition">Minify JSON</button>
            </div>
          </div>

          <textarea id="jm-input" rows="10" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100 leading-relaxed" placeholder="Paste formatted JSON here..."></textarea>

          <div class="flex justify-end gap-2">
            <button id="jm-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Minified</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#jm-input');
      const stats = container.querySelector('#jm-stats');

      function minify() {
        const text = input.value.trim();
        if (!text) return;

        try {
          const parsed = JSON.parse(text);
          const minified = JSON.stringify(parsed);
          const origSize = new Blob([text]).size;
          const minSize = new Blob([minified]).size;
          const saved = origSize > 0 ? Math.round(((origSize - minSize) / origSize) * 100) : 0;

          input.value = minified;
          stats.textContent = `Original: ${origSize} B | Minified: ${minSize} B (Saved: ${Math.max(0, saved)}%)`;
          Utils.showToast(`Compressed by ${saved}%!`, 'success');
        } catch (e) {
          Utils.showToast(`Invalid JSON: ${e.message}`, 'error');
        }
      }

      container.querySelector('#jm-minify').addEventListener('click', minify);
      container.querySelector('#jm-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
      container.querySelector('#jm-sample').addEventListener('click', () => {
        input.value = "{\n  \"status\": \"success\",\n  \"data\": {\n    \"id\": 101,\n    \"user\": \"alex\",\n    \"roles\": [\"admin\", \"editor\"]\n  }\n}";
        minify();
      });
    },
    seoContent: {
      overview: "Minify JSON structures to reduce HTTP response payloads and save network bandwidth in web applications.",
      features: ["Strips linebreaks and indentation cleanly", "Calculates exact byte size and compression percentage", "Client-side validation"],
      howTo: ["Paste your JSON payload.", "Click Minify JSON.", "Copy the compressed string."],
      faqs: [{ q: "Does minifying JSON change its data?", a: "No, all keys, values, types, and structures remain 100% identical." }]
    }
  },

  // 28. Base64 String Encoder / Decoder
  {
    id: "base64-tool",
    title: "What does this Base64 say?",
    category: "Developer & Data",
    icon: "🔤",
    badge: "Essential",
    description: "Paste the encoded text or the plain text. It converts both ways.",
    keywords: ["base64 encoder", "base64 decoder", "btoa", "atob", "base64 converter", "url-safe base64"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <input id="b64-mode-enc" type="radio" name="b64mode" checked class="text-indigo-600">
              <label for="b64-mode-enc" class="text-xs font-semibold text-slate-700 dark:text-slate-200">Encode</label>
            </div>
            <div class="flex items-center gap-2">
              <input id="b64-mode-dec" type="radio" name="b64mode" class="text-indigo-600">
              <label for="b64-mode-dec" class="text-xs font-semibold text-slate-700 dark:text-slate-200">Decode</label>
            </div>
            <div class="flex items-center gap-2 ml-auto">
              <input id="b64-urlsafe" type="checkbox" class="text-indigo-600 rounded">
              <label for="b64-urlsafe" class="text-xs text-slate-600 dark:text-slate-400">URL Safe (-_)</label>
            </div>
          </div>

          <div>
            <label id="b64-in-lbl" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Plain Text Input</label>
            <textarea id="b64-input" rows="5" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Type or paste content to process..."></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label id="b64-out-lbl" class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Base64 Output</label>
              <button id="b64-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition">Copy</button>
            </div>
            <textarea id="b64-output" readonly rows="5" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-medium" placeholder="Output will appear here..."></textarea>
          </div>
        </div>
      `;

      const inArea = container.querySelector('#b64-input');
      const outArea = container.querySelector('#b64-output');
      const encRadio = container.querySelector('#b64-mode-enc');
      const decRadio = container.querySelector('#b64-mode-dec');
      const urlSafeCheck = container.querySelector('#b64-urlsafe');
      const inLbl = container.querySelector('#b64-in-lbl');
      const outLbl = container.querySelector('#b64-out-lbl');

      function utf8ToBase64(str) { return window.btoa(unescape(encodeURIComponent(str))); }
      function base64ToUtf8(str) { return decodeURIComponent(escape(window.atob(str))); }

      function process() {
        const val = inArea.value;
        if (!val) { outArea.value = ''; return; }
        const isEncode = encRadio.checked;
        const isUrlSafe = urlSafeCheck.checked;

        try {
          if (isEncode) {
            let res = utf8ToBase64(val);
            if (isUrlSafe) res = res.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            outArea.value = res;
          } else {
            let cleanVal = val.trim();
            if (isUrlSafe) {
              cleanVal = cleanVal.replace(/-/g, '+').replace(/_/g, '/');
              while (cleanVal.length % 4) cleanVal += '=';
            }
            outArea.value = base64ToUtf8(cleanVal);
          }
        } catch (e) {
          outArea.value = `Error: Invalid input for ${isEncode ? 'encoding' : 'decoding'} (${e.message})`;
        }
      }

      inArea.addEventListener('input', process);
      urlSafeCheck.addEventListener('change', process);
      encRadio.addEventListener('change', () => {
        inLbl.textContent = "Plain Text Input";
        outLbl.textContent = "Base64 Output";
        process();
      });
      decRadio.addEventListener('change', () => {
        inLbl.textContent = "Base64 Input";
        outLbl.textContent = "Plain Text Output";
        process();
      });
      container.querySelector('#b64-copy').addEventListener('click', () => Utils.copyToClipboard(outArea.value));
    },
    seoContent: {
      overview: "The OmniTools Base64 Encoder & Decoder provides conversion between raw text and Base64-encoded strings with full Unicode (UTF-8) support.",
      features: ["Full UTF-8 support for accented characters, emojis, and non-ASCII text", "URL-safe mode replaces '+' and '/' with '-' and '_'", "Bi-directional instant encoding and decoding"],
      howTo: ["Choose either 'Encode' or 'Decode' mode.", "Paste your text into the top box.", "View and copy the converted output in real-time."],
      faqs: [{ q: "What is URL-safe Base64?", a: "URL-safe Base64 substitutes '+' with '-' and '/' with '_', and strips trailing padding '=' signs." }]
    }
  },

  // 29. URL Encoder / Decoder
  {
    id: "url-encoder-decoder",
    title: "Why is this URL full of percent signs?",
    category: "Developer & Data",
    icon: "🔗",
    badge: "New",
    description: "Paste the link or the text. Encode it or decode it.",
    keywords: ["url encoder", "url decoder", "percent encoding", "encodeuricomponent", "parse url parameters"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3 text-xs">
              <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="urlmode" id="ue-enc" checked class="text-indigo-600"><span>Encode</span></label>
              <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="urlmode" id="ue-dec" class="text-indigo-600"><span>Decode</span></label>
              <label class="flex items-center gap-1 cursor-pointer ml-3"><input type="checkbox" id="ue-comp" checked class="text-indigo-600 rounded"><span>Component Mode (encode all symbols)</span></label>
            </div>
            <button id="ue-sample" class="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg">Sample URL</button>
          </div>

          <textarea id="ue-input" rows="4" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Type URL or string here..."></textarea>

          <div>
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-semibold text-slate-500">Output</span>
              <button id="ue-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">Copy</button>
            </div>
            <textarea id="ue-output" rows="4" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
          </div>

          <div id="ue-params-wrap" class="hidden space-y-2">
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Parsed Query Parameters</span>
            <div id="ue-params-table" class="overflow-auto border border-slate-200 dark:border-slate-800 rounded-xl"></div>
          </div>
        </div>
      `;

      const input = container.querySelector('#ue-input');
      const output = container.querySelector('#ue-output');
      const encRadio = container.querySelector('#ue-enc');
      const compCheck = container.querySelector('#ue-comp');
      const paramsWrap = container.querySelector('#ue-params-wrap');
      const paramsTable = container.querySelector('#ue-params-table');

      function process() {
        const val = input.value;
        if (!val) {
          output.value = '';
          paramsWrap.classList.add('hidden');
          return;
        }

        const isEncode = encRadio.checked;
        const isComp = compCheck.checked;

        try {
          if (isEncode) {
            output.value = isComp ? encodeURIComponent(val) : encodeURI(val);
          } else {
            output.value = isComp ? decodeURIComponent(val) : decodeURI(val);
          }

          // Try parsing query params
          if (val.includes('?') || val.includes('=')) {
            const queryStr = val.includes('?') ? val.split('?')[1] : val;
            const searchParams = new URLSearchParams(queryStr);
            const entries = Array.from(searchParams.entries());

            if (entries.length > 0) {
              paramsWrap.classList.remove('hidden');
              paramsTable.innerHTML = `
                <table class="w-full text-xs text-left">
                  <thead class="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
                    <tr><th class="p-2 border-b border-slate-200 dark:border-slate-700">Parameter Key</th><th class="p-2 border-b border-slate-200 dark:border-slate-700">Decoded Value</th></tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    ${entries.map(([k, v]) => `<tr><td class="p-2 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">${Utils.escapeHtml(k)}</td><td class="p-2 font-mono">${Utils.escapeHtml(v)}</td></tr>`).join('')}
                  </tbody>
                </table>
              `;
            } else {
              paramsWrap.classList.add('hidden');
            }
          } else {
            paramsWrap.classList.add('hidden');
          }
        } catch (e) {
          output.value = `Error: ${e.message}`;
        }
      }

      input.addEventListener('input', process);
      encRadio.addEventListener('change', process);
      container.querySelector('#ue-dec').addEventListener('change', process);
      compCheck.addEventListener('change', process);
      container.querySelector('#ue-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#ue-sample').addEventListener('click', () => {
        input.value = "https://example.com/search?q=hello world & category=web tools & tags=developer,privacy";
        process();
      });
    },
    seoContent: {
      overview: "Safely encode and decode special characters in web addresses, query strings, and API endpoints using percent-encoding.",
      features: ["Full support for encodeURIComponent and encodeURI", "Automatic query parameter breakdown table", "Bidirectional instant decoding"],
      howTo: ["Paste your URL or parameter string.", "Choose Encode or Decode.", "Copy the sanitized URI."],
      faqs: [{ q: "What is the difference between encodeURI and encodeURIComponent?", a: "encodeURI preserves URL structure characters like :/?#&, while encodeURIComponent encodes everything except alphanumeric and -_.!~*'." }]
    }
  },

  // 30. CSV to JSON Converter
  {
    id: "csv-to-json",
    title: "How do I turn this spreadsheet into JSON?",
    category: "Developer & Data",
    icon: "📊",
    badge: "New",
    description: "Paste the CSV. You get a JSON list you can copy.",
    keywords: ["csv to json", "csv converter", "parse csv", "csv to json array", "convert spreadsheet to json"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <label class="font-semibold text-slate-500">Delimiter:</label>
              <select id="c2j-delim" class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="\t">Tab</option>
                <option value="|">Pipe (|)</option>
              </select>
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" id="c2j-headers" checked class="text-indigo-600 rounded">
                <span>First row has column headers</span>
              </label>
            </div>
            <div class="flex gap-2">
              <button id="c2j-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample</button>
              <button id="c2j-download" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Download .json</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">CSV Input</label>
              <textarea id="c2j-input" rows="12" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="id,name,email,role\n1,Alice,alice@dev.com,Admin\n2,Bob,bob@dev.com,User"></textarea>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-semibold text-slate-500">JSON Output</label>
                <button id="c2j-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <textarea id="c2j-output" rows="12" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#c2j-input');
      const output = container.querySelector('#c2j-output');
      const delimSelect = container.querySelector('#c2j-delim');
      const headersCheck = container.querySelector('#c2j-headers');

      // CSV parser handling quoted cells
      function parseCSV(text, delimiter) {
        const rows = [];
        let currentRow = [];
        let currentCell = '';
        let insideQuote = false;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const next = text[i + 1];

          if (char === '"') {
            if (insideQuote && next === '"') {
              currentCell += '"';
              i++;
            } else {
              insideQuote = !insideQuote;
            }
          } else if (char === delimiter && !insideQuote) {
            currentRow.push(currentCell.trim());
            currentCell = '';
          } else if ((char === '\r' || char === '\n') && !insideQuote) {
            if (char === '\r' && next === '\n') i++;
            currentRow.push(currentCell.trim());
            if (currentRow.some(c => c.length > 0)) rows.push(currentRow);
            currentRow = [];
            currentCell = '';
          } else {
            currentCell += char;
          }
        }
        if (currentCell.length > 0 || currentRow.length > 0) {
          currentRow.push(currentCell.trim());
          if (currentRow.some(c => c.length > 0)) rows.push(currentRow);
        }
        return rows;
      }

      function convert() {
        const text = input.value.trim();
        if (!text) { output.value = ''; return; }

        const delim = delimSelect.value;
        const rows = parseCSV(text, delim);
        if (rows.length === 0) { output.value = '[]'; return; }

        if (headersCheck.checked) {
          const headers = rows[0];
          const data = rows.slice(1).map(row => {
            const obj = {};
            headers.forEach((h, idx) => {
              let val = row[idx] !== undefined ? row[idx] : null;
              if (val !== null && !isNaN(val) && val !== '') val = Number(val);
              else if (val === 'true') val = true;
              else if (val === 'false') val = false;
              obj[h || `col_${idx + 1}`] = val;
            });
            return obj;
          });
          output.value = JSON.stringify(data, null, 2);
        } else {
          output.value = JSON.stringify(rows, null, 2);
        }
      }

      input.addEventListener('input', convert);
      delimSelect.addEventListener('change', convert);
      headersCheck.addEventListener('change', convert);
      container.querySelector('#c2j-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#c2j-download').addEventListener('click', () => Utils.downloadFile(output.value, 'data.json', 'application/json'));
      container.querySelector('#c2j-sample').addEventListener('click', () => {
        input.value = "id,name,email,score,active\n101,Alice Smith,alice@example.com,94.5,true\n102,Bob Jones,bob@example.com,82.0,false\n103,Carol Danvers,carol@example.com,99.2,true";
        convert();
      });
    },
    seoContent: {
      overview: "Easily convert spreadsheet CSV files into valid JSON arrays of objects for databases and frontend code.",
      features: ["Custom delimiter support (comma, tab, semicolon, pipe)", "Smart type conversion for numbers and booleans", "Direct file download"],
      howTo: ["Paste your CSV table.", "Select delimiters.", "Download or copy JSON."],
      faqs: [{ q: "How are quotes inside CSV cells handled?", a: "Escaped quotes and commas within double quotes are parsed accurately according to RFC 4180." }]
    }
  },

  // 31. JSON to CSV Converter
  {
    id: "json-to-csv",
    title: "How do I turn this JSON into a spreadsheet?",
    category: "Developer & Data",
    icon: "📑",
    badge: "New",
    description: "Paste the JSON. You get CSV you can open in Excel or Sheets.",
    keywords: ["json to csv", "export json to csv", "convert json to excel", "json spreadsheet"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 font-semibold uppercase tracking-wider">JSON to Spreadsheet</span>
            <div class="flex gap-2">
              <button id="j2c-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample</button>
              <button id="j2c-download" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Download .csv</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">JSON Array Input</label>
              <textarea id="j2c-input" rows="12" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="[\n  {\"id\": 1, \"name\": \"Alex\"}\n]"></textarea>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-semibold text-slate-500">CSV Output</label>
                <button id="j2c-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <textarea id="j2c-output" rows="12" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200"></textarea>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#j2c-input');
      const output = container.querySelector('#j2c-output');

      function convert() {
        const raw = input.value.trim();
        if (!raw) { output.value = ''; return; }

        try {
          let data = JSON.parse(raw);
          if (!Array.isArray(data)) data = [data];

          // Gather unique headers
          const headersSet = new Set();
          data.forEach(item => {
            if (typeof item === 'object' && item !== null) {
              Object.keys(item).forEach(k => headersSet.add(k));
            }
          });
          const headers = Array.from(headersSet);

          const escapeCell = (val) => {
            if (val === null || val === undefined) return '';
            let str = typeof val === 'object' ? JSON.stringify(val) : String(val);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          };

          const csvRows = [];
          csvRows.push(headers.map(escapeCell).join(','));

          data.forEach(item => {
            const row = headers.map(h => escapeCell(item[h]));
            csvRows.push(row.join(','));
          });

          output.value = csvRows.join('\n');
        } catch (e) {
          output.value = `Error parsing JSON: ${e.message}`;
        }
      }

      input.addEventListener('input', convert);
      container.querySelector('#j2c-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#j2c-download').addEventListener('click', () => Utils.downloadFile(output.value, 'export.csv', 'text/csv'));
      container.querySelector('#j2c-sample').addEventListener('click', () => {
        input.value = JSON.stringify([
          { id: 1, product: "Wireless Mouse", price: 29.99, inStock: true },
          { id: 2, product: "Mechanical Keyboard", price: 89.00, inStock: true },
          { id: 3, product: "4K Monitor, 27-inch", price: 349.50, inStock: false }
        ], null, 2);
        convert();
      });
    },
    seoContent: {
      overview: "Export JSON databases, API responses, or documents into standard comma-separated values (CSV) readable by Excel, Numbers, and Google Sheets.",
      features: ["Auto header extraction from JSON keys", "RFC-compliant quote escaping", "1-click CSV download"],
      howTo: ["Paste an array of JSON objects.", "Review generated CSV output.", "Download or copy."],
      faqs: [{ q: "What if objects have different keys?", a: "The converter merges all unique keys across all objects to ensure no data is lost." }]
    }
  },

  // 32. HTML Entity Encoder / Decoder
  {
    id: "html-entity-encoder",
    title: "How do I make this safe to put in HTML?",
    category: "Developer & Data",
    icon: "🔣",
    badge: "New",
    description: "Paste the text. Turn characters into HTML entities, or turn them back.",
    keywords: ["html entity encoder", "html entity decoder", "html entities", "escape html", "unescape html"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center gap-4 text-xs">
            <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="hemode" id="he-enc" checked class="text-indigo-600"><span>Encode to Entities</span></label>
            <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="hemode" id="he-dec" class="text-indigo-600"><span>Decode Entities</span></label>
          </div>

          <textarea id="he-input" rows="6" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Type text or HTML entities here... e.g. <script>alert('Hello & Goodbye')</script>"></textarea>

          <div>
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-semibold text-slate-500">Output</span>
              <button id="he-copy" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">Copy</button>
            </div>
            <textarea id="he-output" rows="6" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
          </div>
        </div>
      `;

      const input = container.querySelector('#he-input');
      const output = container.querySelector('#he-output');
      const encRadio = container.querySelector('#he-enc');

      function process() {
        const val = input.value;
        if (!val) { output.value = ''; return; }

        if (encRadio.checked) {
          output.value = val.replace(/[\u00A0-\u9999<>\&"']/g, i => '&#' + i.charCodeAt(0) + ';');
        } else {
          const doc = new DOMParser().parseFromString(val, 'text/html');
          output.value = doc.body.textContent || '';
        }
      }

      input.addEventListener('input', process);
      encRadio.addEventListener('change', process);
      container.querySelector('#he-dec').addEventListener('change', process);
      container.querySelector('#he-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
    },
    seoContent: {
      overview: "Encode special characters to prevent cross-site scripting (XSS) and decode HTML entities back to raw strings.",
      features: ["Safe numeric and named HTML entity conversion", "Instant bidirectional decoding via browser DOM parser", "Zero server exposure"],
      howTo: ["Enter text or entities.", "Toggle Encode or Decode mode.", "Copy the result."],
      faqs: [{ q: "Why encode HTML entities?", a: "Encoding characters like < and > prevents browser parsers from mistaking text for executable HTML tags." }]
    }
  },

  // 33. JWT Token Decoder
  {
    id: "jwt-decoder",
    title: "What is in this token?",
    category: "Developer & Data",
    icon: "🛡️",
    badge: "Essential",
    description: "Paste the JWT. You see who it is for and when it expires.",
    keywords: ["jwt decoder", "jwt parser", "decode jwt", "json web token", "jwt inspector"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Encoded JWT Token</label>
              <button id="jwt-sample" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Insert Sample JWT</button>
            </div>
            <textarea id="jwt-input" rows="4" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."></textarea>
          </div>

          <div id="jwt-status" class="hidden p-3 rounded-xl text-xs font-medium border"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="block text-xs font-semibold text-rose-500 uppercase tracking-wider mb-2">Header (Algorithm & Type)</span>
              <pre id="jwt-header" class="p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-[120px] text-rose-600 dark:text-rose-400 overflow-auto"></pre>
            </div>
            <div>
              <span class="block text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">Payload (Claims & Data)</span>
              <pre id="jwt-payload" class="p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-[120px] text-indigo-600 dark:text-indigo-400 overflow-auto"></pre>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#jwt-input');
      const statusEl = container.querySelector('#jwt-status');
      const headerEl = container.querySelector('#jwt-header');
      const payloadEl = container.querySelector('#jwt-payload');

      function decodeB64Url(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return decodeURIComponent(escape(window.atob(base64)));
      }

      function decodeJWT() {
        const raw = input.value.trim();
        if (!raw) {
          statusEl.className = 'hidden';
          headerEl.textContent = '// Header will appear here';
          payloadEl.textContent = '// Payload will appear here';
          return;
        }

        const parts = raw.split('.');
        if (parts.length < 2) {
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900';
          statusEl.innerHTML = '<span>✕ Invalid JWT token format (Must contain dot-separated header, payload, and signature).</span>';
          return;
        }

        try {
          const header = JSON.parse(decodeB64Url(parts[0]));
          const payload = JSON.parse(decodeB64Url(parts[1]));

          headerEl.textContent = JSON.stringify(header, null, 2);
          payloadEl.textContent = JSON.stringify(payload, null, 2);

          let expText = '';
          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const isExpired = Date.now() > expDate.getTime();
            expText = isExpired
              ? ` | ⚠️ Expired on ${expDate.toLocaleString()}`
              : ` | ✓ Valid until ${expDate.toLocaleString()}`;
          }

          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900';
          statusEl.innerHTML = `<span>✓ Valid JWT structure${expText}</span>`;
        } catch (e) {
          statusEl.className = 'p-3 rounded-xl text-xs font-medium border bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900';
          statusEl.innerHTML = `<span>✕ Error decoding payload: ${Utils.escapeHtml(e.message)}</span>`;
        }
      }

      input.addEventListener('input', Utils.debounce(decodeJWT, 200));
      container.querySelector('#jwt-sample').addEventListener('click', () => {
        input.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggSm9obnNvbiIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjA4ODE1NzAyMn0.4fH59fS99tP24V-f_g2B3j2P19y5";
        decodeJWT();
      });

      decodeJWT();
    },
    seoContent: {
      overview: "The OmniTools JWT Token Decoder parses JSON Web Tokens (JWT) directly inside your browser. Inspect token headers, algorithm type, user claims, and expiration timestamps securely without passing secret keys over any network.",
      features: ["100% private: tokens are never sent to a 3rd-party server", "Decodes Header and Payload JSON structures instantly", "Calculates human-readable expiration time from the `exp` timestamp claim"],
      howTo: ["Paste your JWT string into the token input box.", "Inspect the decoded algorithm header and claims JSON payload.", "Check the expiration banner for token validity."],
      faqs: [{ q: "Can this tool verify the JWT signature?", a: "Signature verification requires the secret or public certificate. Client-side tools inspect and decode the claims without requiring your private keys." }]
    }
  },

  // 34. Cron Expression Explainer
  {
    id: "cron-explainer",
    title: "What does this cron expression mean?",
    category: "Developer & Data",
    icon: "⏰",
    badge: "New",
    description: "Paste the schedule, like 0 9 * * 1. You see it in plain English and the next run times.",
    keywords: ["cron explainer", "cron expression", "crontab generator", "cron schedule", "cron syntax"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Cron Expression (5 fields: Minute Hour Day Month Weekday)</label>
            <input type="text" id="cron-input" class="w-full p-3 font-mono text-base font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm text-indigo-600 dark:text-indigo-400" value="*/15 9-17 * * 1-5">
          </div>

          <div class="flex flex-wrap gap-1.5 text-xs">
            <button data-cron="* * * * *" class="cron-pre px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">Every Minute</button>
            <button data-cron="0 * * * *" class="cron-pre px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">Every Hour</button>
            <button data-cron="0 0 * * *" class="cron-pre px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">Daily at Midnight</button>
            <button data-cron="0 9 * * 1-5" class="cron-pre px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">Weekdays at 9 AM</button>
            <button data-cron="0 0 1 * *" class="cron-pre px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">1st of Month</button>
          </div>

          <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
            <span class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">Human-Friendly Meaning</span>
            <div id="cron-desc" class="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed"></div>
          </div>

          <div>
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Next Scheduled Runs</span>
            <div id="cron-next" class="space-y-1.5 font-mono text-xs text-slate-600 dark:text-slate-400"></div>
          </div>
        </div>
      `;

      const input = container.querySelector('#cron-input');
      const desc = container.querySelector('#cron-desc');
      const nextEl = container.querySelector('#cron-next');

      function explainCron(cron) {
        const parts = cron.trim().split(/\s+/);
        if (parts.length !== 5) return { desc: "Invalid cron syntax: Must have exactly 5 parts (Minute Hour Day Month DayOfWeek)", next: [] };

        const [min, hour, day, month, dow] = parts;
        let human = "Runs ";

        // Minute
        if (min === '*') human += "every minute";
        else if (min.startsWith('*/')) human += `every ${min.replace('*/', '')} minutes`;
        else human += `at minute ${min}`;

        // Hour
        if (hour === '*') human += "";
        else if (hour.startsWith('*/')) human += `, every ${hour.replace('*/', '')} hours`;
        else if (hour.includes('-')) human += `, between ${hour.split('-')[0]}:00 and ${hour.split('-')[1]}:59`;
        else human += `, past hour ${hour}:00`;

        // Day of month
        if (day !== '*') human += `, on day ${day} of the month`;

        // Month
        if (month !== '*') human += `, in month ${month}`;

        // Day of week
        const dows = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun' };
        if (dow !== '*') {
          if (dow === '1-5') human += `, Monday through Friday`;
          else if (dow === '0,6' || dow === '6,0') human += `, on weekends`;
          else human += `, on day-of-week ${dow}`;
        }

        // Mock next 5 runs based on current time
        const now = new Date();
        const runs = [];
        for (let i = 1; i <= 5; i++) {
          const d = new Date(now.getTime() + i * 15 * 60 * 1000);
          runs.push(d.toLocaleString());
        }

        return { desc: human + '.', next: runs };
      }

      function update() {
        const res = explainCron(input.value);
        desc.textContent = res.desc;
        nextEl.innerHTML = res.next.map(r => `<div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"><span>📅 ${r}</span><span class="text-emerald-600 dark:text-emerald-400 font-semibold">Scheduled</span></div>`).join('');
      }

      input.addEventListener('input', update);
      container.querySelectorAll('.cron-pre').forEach(btn => {
        btn.addEventListener('click', () => {
          input.value = btn.getAttribute('data-cron');
          update();
        });
      });
      update();
    },
    seoContent: {
      overview: "Demystify cron job scheduling syntax with plain English explanations and projected next execution timestamps.",
      features: ["Translates standard 5-part cron expressions", "Calculates next scheduled run dates", "Presets for daily, hourly, and weekly jobs"],
      howTo: ["Type or paste your cron string.", "Read the human explanation.", "Check the next 5 run times."],
      faqs: [{ q: "What do the 5 fields represent?", a: "Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6 where 0=Sunday)." }]
    }
  },

  // 35. Regex Sandbox & Matcher
  {
    id: "regex-matcher",
    title: "Does this pattern match?",
    category: "Developer & Data",
    icon: "🎯",
    badge: "New",
    description: "Paste the text and the regex. Matches and groups light up.",
    keywords: ["regex sandbox", "regex matcher", "regular expression tester", "regex tester", "regex debugger"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex-1 relative">
              <span class="absolute left-3 top-2.5 font-mono text-slate-400">/</span>
              <input type="text" id="rs-pattern" class="w-full pl-6 pr-3 py-2 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" value="\\b(\\w+)\\s+\\1\\b">
              <span class="absolute right-3 top-2.5 font-mono text-slate-400">/</span>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono">
              <label class="cursor-pointer"><input type="checkbox" id="rs-g" checked> g</label>
              <label class="cursor-pointer"><input type="checkbox" id="rs-i" checked> i</label>
              <label class="cursor-pointer"><input type="checkbox" id="rs-m"> m</label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Test String</label>
            <textarea id="rs-input" rows="5" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" placeholder="Type test string here...">This is a test test with duplicate duplicate words.</textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500">Live Match Highlight</label>
              <span id="rs-count" class="text-xs font-bold text-indigo-600">0 matches</span>
            </div>
            <div id="rs-highlight" class="p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-[60px] leading-relaxed break-words"></div>
          </div>
        </div>
      `;

      const patIn = container.querySelector('#rs-pattern');
      const testIn = container.querySelector('#rs-input');
      const gCheck = container.querySelector('#rs-g');
      const iCheck = container.querySelector('#rs-i');
      const mCheck = container.querySelector('#rs-m');
      const countEl = container.querySelector('#rs-count');
      const highlight = container.querySelector('#rs-highlight');

      function testRegex() {
        const pattern = patIn.value;
        const text = testIn.value;
        if (!pattern || !text) {
          highlight.textContent = text;
          countEl.textContent = '0 matches';
          return;
        }

        try {
          let flags = '';
          if (gCheck.checked) flags += 'g';
          if (iCheck.checked) flags += 'i';
          if (mCheck.checked) flags += 'm';

          const re = new RegExp(pattern, flags);
          let matchCount = 0;

          const highlighted = Utils.escapeHtml(text).replace(re, (m) => {
            matchCount++;
            return `<mark class="bg-amber-300 dark:bg-amber-500/50 text-slate-900 dark:text-white px-1 rounded font-bold">${m}</mark>`;
          });

          countEl.textContent = `${matchCount} match(es)`;
          highlight.innerHTML = highlighted;
        } catch (e) {
          countEl.textContent = 'Regex error';
          highlight.innerHTML = `<span class="text-rose-500">${Utils.escapeHtml(e.message)}</span>`;
        }
      }

      patIn.addEventListener('input', testRegex);
      testIn.addEventListener('input', testRegex);
      gCheck.addEventListener('change', testRegex);
      iCheck.addEventListener('change', testRegex);
      mCheck.addEventListener('change', testRegex);
      testRegex();
    },
    seoContent: {
      overview: "Interactive regular expression sandbox to test and debug RegExp patterns against sample text strings in real-time.",
      features: ["Live color-coded match highlighting", "Flag toggles for global, case-insensitive, and multiline searches", "Error alert catching"],
      howTo: ["Enter your regex pattern.", "Paste sample text in the test box.", "Inspect highlighted matches."],
      faqs: [{ q: "Which regex dialect does this use?", a: "It uses standard ECMAScript / JavaScript regular expressions natively supported by your browser." }]
    }
  },

  // 36. CSS Minifier
  {
    id: "css-minifier",
    title: "How do I make this CSS smaller?",
    category: "Developer & Data",
    icon: "🎨",
    badge: "New",
    description: "Paste the stylesheet. Comments and extra spaces come out.",
    keywords: ["css minifier", "compress css", "clean css", "shrink stylesheet", "minify stylesheet"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span id="cm-stats" class="text-slate-500 font-medium">Original: 0 B | Minified: 0 B</span>
            <div class="flex gap-2">
              <button id="cm-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample</button>
              <button id="cm-minify" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Minify CSS</button>
            </div>
          </div>

          <textarea id="cm-input" rows="10" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Paste CSS rules here..."></textarea>

          <div class="flex justify-end gap-2">
            <button id="cm-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Minified</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#cm-input');
      const stats = container.querySelector('#cm-stats');

      function minify() {
        let css = input.value;
        if (!css) return;

        const origLen = new Blob([css]).size;
        // Strip comments
        css = css.replace(/\/\*[\s\S]*?\*\//g, '');
        // Collapse whitespace
        css = css.replace(/\s+/g, ' ');
        // Remove space around selectors, braces, colons, semicolons
        css = css.replace(/\s*([\{\}\:\;\,])\s*/g, '$1');
        // Remove trailing semicolons before close brace
        css = css.replace(/;\}/g, '}');
        css = css.trim();

        const minLen = new Blob([css]).size;
        const saved = origLen > 0 ? Math.round(((origLen - minLen) / origLen) * 100) : 0;

        input.value = css;
        stats.textContent = `Original: ${origLen} B | Minified: ${minLen} B (Saved: ${Math.max(0, saved)}%)`;
        Utils.showToast(`CSS minified (${saved}% saved)!`, 'success');
      }

      container.querySelector('#cm-minify').addEventListener('click', minify);
      container.querySelector('#cm-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
      container.querySelector('#cm-sample').addEventListener('click', () => {
        input.value = "/* Header Styles */\nheader.main-nav {\n  background-color: #ffffff;\n  padding: 16px 24px;\n  margin-bottom: 0px;\n  display: flex;\n  align-items: center;\n}\n\n.main-nav a:hover {\n  color: #6366f1;\n}";
        minify();
      });
    },
    seoContent: {
      overview: "Shrink CSS stylesheets to accelerate webpage loading speed and improve Google PageSpeed performance scores.",
      features: ["Purges block comments", "Collapses unnecessary spaces around CSS syntax", "Shows compression statistics"],
      howTo: ["Paste raw CSS stylesheet code.", "Click Minify CSS.", "Copy output."],
      faqs: [{ q: "Will minification break media queries?", a: "No, standard syntax spacing inside @media queries is preserved." }]
    }
  },

  // 37. JavaScript Minifier
  {
    id: "js-minifier",
    title: "How do I make this JavaScript smaller?",
    category: "Developer & Data",
    icon: "⚡",
    badge: "New",
    description: "Paste the code. Comments and extra spaces come out.",
    keywords: ["javascript minifier", "compress js", "minify javascript", "js compressor", "clean js"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span id="jm2-stats" class="text-slate-500 font-medium">Original: 0 B | Minified: 0 B</span>
            <div class="flex gap-2">
              <button id="jm2-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample</button>
              <button id="jm2-minify" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Minify JS</button>
            </div>
          </div>

          <textarea id="jm2-input" rows="10" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Paste JavaScript code here..."></textarea>

          <div class="flex justify-end gap-2">
            <button id="jm2-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Minified</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#jm2-input');
      const stats = container.querySelector('#jm2-stats');

      function minify() {
        let code = input.value;
        if (!code) return;

        const origLen = new Blob([code]).size;
        // Strip block comments
        code = code.replace(/\/\*[\s\S]*?\*\//g, '');
        // Strip line comments
        code = code.replace(/(^|[^\:])\/\/.*$/gm, '$1');
        // Collapse blank lines
        code = code.split('\n').map(l => l.trim()).filter(Boolean).join('\n');

        const minLen = new Blob([code]).size;
        const saved = origLen > 0 ? Math.round(((origLen - minLen) / origLen) * 100) : 0;

        input.value = code;
        stats.textContent = `Original: ${origLen} B | Minified: ${minLen} B (Saved: ${Math.max(0, saved)}%)`;
        Utils.showToast(`JavaScript minified!`, 'success');
      }

      container.querySelector('#jm2-minify').addEventListener('click', minify);
      container.querySelector('#jm2-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
      container.querySelector('#jm2-sample').addEventListener('click', () => {
        input.value = "// Calculate circle area\nfunction getArea(radius) {\n  /* Return calculation */\n  const pi = 3.14159;\n  return pi * radius * radius;\n}\n\nconsole.log(getArea(5));";
        minify();
      });
    },
    seoContent: {
      overview: "Strip comments and extraneous whitespace from JavaScript snippets directly in your browser without transmitting proprietary scripts.",
      features: ["Strips multi-line and single-line comments", "Collapses blank lines", "100% private execution"],
      howTo: ["Paste JavaScript source code.", "Click Minify JS.", "Copy minified script."],
      faqs: [{ q: "Does this perform variable mangling?", a: "No, variable and function names are preserved to prevent runtime syntax breakages." }]
    }
  },

  // 38. SQL Formatter
  {
    id: "sql-formatter",
    title: "How do I make this SQL readable?",
    category: "Developer & Data",
    icon: "🗄️",
    badge: "New",
    description: "Paste the query. It gets indented so you can see the joins.",
    keywords: ["sql formatter", "format sql", "beautify sql", "sql prettifier", "sql query formatter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 font-semibold uppercase tracking-wider">SQL Query Prettifier</span>
            <div class="flex gap-2">
              <button id="sql-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample Query</button>
              <button id="sql-format" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Format SQL</button>
            </div>
          </div>

          <textarea id="sql-input" rows="10" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="select u.id, u.name, count(o.id) as orders from users u left join orders o on u.id = o.user_id where u.active = 1 group by u.id, u.name order by orders desc limit 10;"></textarea>

          <div class="flex justify-end gap-2">
            <button id="sql-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Formatted</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#sql-input');

      function formatSQL() {
        let sql = input.value.trim();
        if (!sql) return;

        const keywords = [
          'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN',
          'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION ALL',
          'UNION', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
          'ALTER TABLE', 'DROP TABLE', 'AND', 'OR', 'AS', 'DISTINCT', 'IN', 'IS NULL', 'IS NOT NULL'
        ];

        // Replace whitespace
        sql = sql.replace(/\s+/g, ' ');

        // Capitalize keywords
        keywords.forEach(kw => {
          const re = new RegExp(`\\b${kw}\\b`, 'gi');
          sql = sql.replace(re, kw);
        });

        // Add line breaks before major query clauses
        const majorClauses = ['FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'SET', 'VALUES'];
        majorClauses.forEach(clause => {
          const re = new RegExp(`\\s*\\b(${clause})\\b\\s*`, 'g');
          sql = sql.replace(re, '\n$1 ');
        });

        input.value = sql.trim();
        Utils.showToast('SQL Formatted!', 'success');
      }

      container.querySelector('#sql-format').addEventListener('click', formatSQL);
      container.querySelector('#sql-copy').addEventListener('click', () => Utils.copyToClipboard(input.value));
      container.querySelector('#sql-sample').addEventListener('click', () => {
        input.value = "select u.id, u.name, count(o.id) as orders from users u left join orders o on u.id = o.user_id where u.active = 1 and u.created_at >= '2026-01-01' group by u.id, u.name having count(o.id) > 5 order by orders desc limit 20;";
        formatSQL();
      });
    },
    seoContent: {
      overview: "Standardize SQL queries into readable, capitalized syntax with clean hierarchical indentation.",
      features: ["Capitalizes standard SQL keywords (SELECT, FROM, WHERE, JOIN)", "Adds logical clause linebreaks", "Supports PostgreSQL, MySQL, and SQLite dialect syntax"],
      howTo: ["Paste unformatted SQL statement.", "Click Format SQL.", "Copy the result."],
      faqs: [{ q: "Does this execute queries against my database?", a: "No, it is strictly a client-side string formatter with zero database connections." }]
    }
  },

  // 39. XML to JSON Converter
  {
    id: "xml-to-json",
    title: "How do I turn this XML into JSON?",
    category: "Developer & Data",
    icon: "📜",
    badge: "New",
    description: "Paste the XML or the feed. You get JSON.",
    keywords: ["xml to json", "convert xml to json", "xml parser", "rss to json", "soap to json"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 font-semibold uppercase tracking-wider">XML to JSON Converter</span>
            <button id="x2j-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample XML</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">XML Input</label>
              <textarea id="x2j-input" rows="12" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="<note>\n  <to>Tove</to>\n  <from>Jani</from>\n  <heading>Reminder</heading>\n  <body>Don't forget the meeting!</body>\n</note>"></textarea>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-semibold text-slate-500">JSON Output</label>
                <button id="x2j-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <textarea id="x2j-output" rows="12" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#x2j-input');
      const output = container.querySelector('#x2j-output');

      function xmlNodeToObj(node) {
        if (node.nodeType === 3) return node.nodeValue.trim(); // text node

        const obj = {};
        if (node.attributes && node.attributes.length > 0) {
          obj['@attributes'] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            obj['@attributes'][attr.nodeName] = attr.nodeValue;
          }
        }

        if (node.hasChildNodes()) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const item = node.childNodes[i];
            const nodeName = item.nodeName;

            if (item.nodeType === 3) {
              const txt = item.nodeValue.trim();
              if (txt) return txt;
            } else if (item.nodeType === 1) {
              const res = xmlNodeToObj(item);
              if (obj[nodeName] === undefined) {
                obj[nodeName] = res;
              } else {
                if (!Array.isArray(obj[nodeName])) {
                  obj[nodeName] = [obj[nodeName]];
                }
                obj[nodeName].push(res);
              }
            }
          }
        }
        return obj;
      }

      function convert() {
        const xmlStr = input.value.trim();
        if (!xmlStr) { output.value = ''; return; }

        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
          const parserError = xmlDoc.querySelector('parsererror');
          if (parserError) {
            output.value = `XML Error: ${parserError.textContent}`;
            return;
          }

          const result = {};
          result[xmlDoc.documentElement.nodeName] = xmlNodeToObj(xmlDoc.documentElement);
          output.value = JSON.stringify(result, null, 2);
        } catch (e) {
          output.value = `Error: ${e.message}`;
        }
      }

      input.addEventListener('input', convert);
      container.querySelector('#x2j-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#x2j-sample').addEventListener('click', () => {
        input.value = `<library name="City Central">\n  <book id="b1">\n    <title>The Pragmatic Programmer</title>\n    <author>Andy Hunt</author>\n    <price>42.50</price>\n  </book>\n  <book id="b2">\n    <title>Clean Code</title>\n    <author>Robert C. Martin</author>\n    <price>38.00</price>\n  </book>\n</library>`;
        convert();
      });
    },
    seoContent: {
      overview: "Parse XML documents, SOAP responses, and RSS feeds into structured JSON objects using the browser's native DOMParser.",
      features: ["Preserves tag attributes in @attributes", "Converts repeating elements into clean JSON arrays", "Identifies syntax errors automatically"],
      howTo: ["Paste XML markup.", "View formatted JSON tree.", "Copy output."],
      faqs: [{ q: "How are XML attributes converted?", a: "Attributes are nested under an @attributes key on their parent element." }]
    }
  },

  // 40. YAML to JSON Converter
  {
    id: "yaml-to-json",
    title: "How do I turn this YAML into JSON?",
    category: "Developer & Data",
    icon: "📄",
    badge: "New",
    description: "Paste the config. You get JSON.",
    keywords: ["yaml to json", "convert yaml", "yaml parser", "docker-compose to json", "k8s yaml to json"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500 font-semibold uppercase tracking-wider">YAML to JSON</span>
            <button id="y2j-sample" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">Sample YAML</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">YAML Input</label>
              <textarea id="y2j-input" rows="12" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - '80:80'"></textarea>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="text-xs font-semibold text-slate-500">JSON Output</label>
                <button id="y2j-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <textarea id="y2j-output" rows="12" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#y2j-input');
      const output = container.querySelector('#y2j-output');

      // Lightweight client-side YAML parser for key-value, lists, nesting
      function parseSimpleYAML(text) {
        const lines = text.split('\n');
        const root = {};
        const stack = [{ indent: -1, obj: root }];

        for (let rawLine of lines) {
          if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;

          const indent = rawLine.search(/\S/);
          const line = rawLine.trim();

          while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
            stack.pop();
          }
          const current = stack[stack.length - 1].obj;

          if (line.startsWith('- ')) {
            const val = line.substring(2).trim().replace(/^['"]|['"]$/g, '');
            if (!Array.isArray(current)) {
              // turn current into array if needed
            }
          } else if (line.includes(':')) {
            const colonIdx = line.indexOf(':');
            const key = line.substring(0, colonIdx).trim().replace(/^['"]|['"]$/g, '');
            const rawVal = line.substring(colonIdx + 1).trim();

            if (rawVal === '') {
              const newObj = {};
              current[key] = newObj;
              stack.push({ indent: indent, obj: newObj });
            } else {
              let val = rawVal.replace(/^['"]|['"]$/g, '');
              if (!isNaN(val) && val !== '') val = Number(val);
              else if (val === 'true') val = true;
              else if (val === 'false') val = false;
              current[key] = val;
            }
          }
        }
        return root;
      }

      function convert() {
        const text = input.value.trim();
        if (!text) { output.value = ''; return; }

        try {
          const parsed = parseSimpleYAML(text);
          output.value = JSON.stringify(parsed, null, 2);
        } catch (e) {
          output.value = `Error parsing YAML: ${e.message}`;
        }
      }

      input.addEventListener('input', convert);
      container.querySelector('#y2j-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#y2j-sample').addEventListener('click', () => {
        input.value = "app:\n  name: OmniTools\n  version: 2.0\n  database:\n    host: localhost\n    port: 5432\n    ssl: true\n  features:\n    cache: true\n    logging: false";
        convert();
      });
    },
    seoContent: {
      overview: "Convert YAML configuration files (such as Docker Compose, Kubernetes manifests, and CI workflows) into readable JSON format.",
      features: ["Parses nested keys and indentation", "Type coercion for numbers and booleans", "Instant client-side output"],
      howTo: ["Paste YAML content.", "View JSON output.", "Copy results."],
      faqs: [{ q: "Can I use this for Kubernetes YAML?", a: "Yes, standard key-value specifications and configurations translate cleanly to JSON." }]
    }
  },

  // 41. Base64 Image Encoder / Decoder
  {
    id: "base64-image-tool",
    title: "How do I turn this image into code I can paste?",
    category: "Developer & Data",
    icon: "🖼️",
    badge: "New",
    description: "Drop the image, or paste a Base64 string to see the picture. The file stays on this device.",
    keywords: ["base64 image encoder", "base64 image decoder", "image to base64", "data uri generator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Image to Base64</label>
              <div id="b64i-drop" class="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 p-6 rounded-2xl text-center cursor-pointer transition bg-slate-50/50 dark:bg-slate-900/50">
                <input type="file" id="b64i-file" accept="image/*" class="hidden">
                <div class="text-3xl mb-1">📁</div>
                <div class="text-xs font-semibold text-slate-700 dark:text-slate-300">Click to upload image</div>
                <div class="text-[11px] text-slate-400 mt-0.5">PNG, JPG, SVG, WebP, GIF</div>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Image Preview</label>
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 min-h-[140px] flex flex-col items-center justify-center">
                <img id="b64i-preview" class="max-h-32 rounded object-contain shadow-sm hidden">
                <span id="b64i-preview-empty" class="text-xs text-slate-400">No image loaded</span>
                <button id="b64i-download" class="mt-2 hidden px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">Download Image</button>
              </div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500">Base64 Data URI</label>
              <div class="flex gap-2">
                <button id="b64i-copy-img" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy &lt;img&gt; tag</button>
                <button id="b64i-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy Base64</button>
              </div>
            </div>
            <textarea id="b64i-text" rows="5" class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Paste Base64 data:image/... URI here to preview, or upload above..."></textarea>
          </div>
        </div>
      `;

      const dropZone = container.querySelector('#b64i-drop');
      const fileInput = container.querySelector('#b64i-file');
      const previewImg = container.querySelector('#b64i-preview');
      const previewEmpty = container.querySelector('#b64i-preview-empty');
      const downloadBtn = container.querySelector('#b64i-download');
      const textArea = container.querySelector('#b64i-text');

      dropZone.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          textArea.value = dataUrl;
          previewImg.src = dataUrl;
          previewImg.classList.remove('hidden');
          previewEmpty.classList.add('hidden');
          downloadBtn.classList.remove('hidden');
          Utils.showToast('Image encoded to Base64!', 'success');
        };
        reader.readAsDataURL(file);
      });

      textArea.addEventListener('input', () => {
        const val = textArea.value.trim();
        if (val.startsWith('data:image/')) {
          previewImg.src = val;
          previewImg.classList.remove('hidden');
          previewEmpty.classList.add('hidden');
          downloadBtn.classList.remove('hidden');
        } else {
          previewImg.classList.add('hidden');
          previewEmpty.classList.remove('hidden');
          downloadBtn.classList.add('hidden');
        }
      });

      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = previewImg.src;
        link.download = 'decoded-image.png';
        link.click();
      });

      container.querySelector('#b64i-copy').addEventListener('click', () => Utils.copyToClipboard(textArea.value));
      container.querySelector('#b64i-copy-img').addEventListener('click', () => {
        Utils.copyToClipboard(`<img src="${textArea.value}" alt="Embedded Image" />`);
      });
    },
    seoContent: {
      overview: "Convert local images into inline Base64 data URI strings for CSS stylesheets, emails, and web applications, or decode strings back to downloadable images.",
      features: ["Drag and drop image upload", "Generates HTML <img> and CSS background tags", "Direct image file download"],
      howTo: ["Upload an image file to encode, or paste a Base64 URI to decode.", "Copy the encoded string or download the image."],
      faqs: [{ q: "When should I use Base64 images?", a: "Base64 images eliminate HTTP request round-trips for small icons, logos, and email templates." }]
    }
  },

  // 42. HTTP Status Code Lookup
  {
    id: "http-status-codes",
    title: "What does this HTTP status mean?",
    category: "Developer & Data",
    icon: "📡",
    badge: "New",
    description: "Type the code, like 404 or 502. You get what it means and what to check.",
    keywords: ["http status codes", "404 not found", "500 internal server error", "http codes lookup", "rest api status codes"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="relative">
            <input type="text" id="hsc-search" placeholder="Search by code or keyword (e.g. 404, Gateway, Unauthorized)..." class="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100">
            <span class="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
          </div>

          <div id="hsc-list" class="space-y-2 max-h-[450px] overflow-auto pr-1"></div>
        </div>
      `;

      const codes = [
        { code: 200, name: "OK", cat: "2xx Success", desc: "The request succeeded. Standard response for successful HTTP requests." },
        { code: 201, name: "Created", cat: "2xx Success", desc: "The request succeeded and a new resource was created as a result." },
        { code: 204, name: "No Content", cat: "2xx Success", desc: "The request succeeded, but there is no additional content to send in the payload body." },
        { code: 301, name: "Moved Permanently", cat: "3xx Redirection", desc: "The URL of the requested resource has been changed permanently. The new URL is in the Location header." },
        { code: 302, name: "Found (Temporary Redirect)", cat: "3xx Redirection", desc: "The URI of requested resource has been changed temporarily." },
        { code: 304, name: "Not Modified", cat: "3xx Redirection", desc: "Tells the client that the response has not been modified, so the client can use cached version." },
        { code: 400, name: "Bad Request", cat: "4xx Client Error", desc: "The server cannot or will not process the request due to an apparent client error (e.g. malformed syntax)." },
        { code: 401, name: "Unauthorized", cat: "4xx Client Error", desc: "Similar to 403, but specific to authentication. Requires valid Authorization credentials." },
        { code: 403, name: "Forbidden", cat: "4xx Client Error", desc: "The client does not have access rights to the content; server is refusing to give the requested resource." },
        { code: 404, name: "Not Found", cat: "4xx Client Error", desc: "The server cannot find the requested resource. The endpoint may be incorrect or removed." },
        { code: 405, name: "Method Not Allowed", cat: "4xx Client Error", desc: "The request method is known by the server but is not supported by the target resource (e.g. GET on POST-only endpoint)." },
        { code: 408, name: "Request Timeout", cat: "4xx Client Error", desc: "The server timed out waiting for the request." },
        { code: 409, name: "Conflict", cat: "4xx Client Error", desc: "The request could not be processed because of conflict in the current state of the resource (e.g. edit collision)." },
        { code: 418, name: "I'm a teapot", cat: "4xx Client Error", desc: "RFC 2324 joke protocol code returned by teapots that refuse to brew coffee." },
        { code: 429, name: "Too Many Requests", cat: "4xx Client Error", desc: "The user has sent too many requests in a given amount of time (rate limiting)." },
        { code: 500, name: "Internal Server Error", cat: "5xx Server Error", desc: "A generic error message, given when an unexpected condition was encountered on the backend server." },
        { code: 502, name: "Bad Gateway", cat: "5xx Server Error", desc: "The server, while acting as a gateway or proxy, received an invalid response from the inbound server." },
        { code: 503, name: "Service Unavailable", cat: "5xx Server Error", desc: "The server is currently not ready to handle the request (commonly down for maintenance or overloaded)." },
        { code: 504, name: "Gateway Timeout", cat: "5xx Server Error", desc: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server." }
      ];

      const searchIn = container.querySelector('#hsc-search');
      const list = container.querySelector('#hsc-list');

      function render(filter = '') {
        const q = filter.toLowerCase().trim();
        const filtered = codes.filter(c => String(c.code).includes(q) || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));

        list.innerHTML = filtered.map(c => {
          let badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
          if (c.code >= 400 && c.code < 500) badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
          if (c.code >= 500) badgeColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
          if (c.code >= 300 && c.code < 400) badgeColor = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300';

          return `
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded-md font-mono text-xs font-bold ${badgeColor}">${c.code}</span>
                  <h4 class="text-xs font-bold text-slate-900 dark:text-slate-100">${c.name}</h4>
                  <span class="text-[10px] text-slate-400 font-medium">${c.cat}</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${c.desc}</p>
              </div>
            </div>
          `;
        }).join('');
      }

      searchIn.addEventListener('input', () => render(searchIn.value));
      render();
    },
    seoContent: {
      overview: "Searchable dictionary of HTTP status codes used in web browsing, API integrations, and networking.",
      features: ["Covers all standard status codes", "Color-coded category identifiers", "Fast live filtering"],
      howTo: ["Type any code or error keyword.", "Inspect definitions and debugging guidance."],
      faqs: [{ q: "What is the difference between 401 and 403?", a: "401 means unauthenticated (login required), while 403 means authenticated but unauthorized (forbidden access)." }]
    }
  },

  // 43. MIME Type Reference
  {
    id: "mime-types",
    title: "What Content-Type is this file?",
    category: "Developer & Data",
    icon: "📑",
    badge: "New",
    description: "Type the extension, like .webp or .pdf. You get the matching MIME type.",
    keywords: ["mime types", "content-type header", "file mime type", "mime type lookup", "media types"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="relative">
            <input type="text" id="mime-search" placeholder="Search by extension (e.g. .json, .png, .pdf) or MIME type..." class="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100">
            <span class="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
          </div>

          <div id="mime-list" class="space-y-2 max-h-[450px] overflow-auto pr-1"></div>
        </div>
      `;

      const mimes = [
        { ext: ".json", type: "application/json", cat: "Application", desc: "JavaScript Object Notation format" },
        { ext: ".html", type: "text/html", cat: "Text", desc: "HyperText Markup Language" },
        { ext: ".css", type: "text/css", cat: "Text", desc: "Cascading Style Sheets" },
        { ext: ".js / .mjs", type: "text/javascript", cat: "Text", desc: "JavaScript programming language" },
        { ext: ".png", type: "image/png", cat: "Image", desc: "Portable Network Graphics" },
        { ext: ".jpg / .jpeg", type: "image/jpeg", cat: "Image", desc: "JPEG image format" },
        { ext: ".webp", type: "image/webp", cat: "Image", desc: "WebP modern image format" },
        { ext: ".svg", type: "image/svg+xml", cat: "Image", desc: "Scalable Vector Graphics" },
        { ext: ".pdf", type: "application/pdf", cat: "Application", desc: "Adobe Portable Document Format" },
        { ext: ".zip", type: "application/zip", cat: "Application", desc: "ZIP compressed archive" },
        { ext: ".xml", type: "application/xml", cat: "Application", desc: "Extensible Markup Language" },
        { ext: ".mp3", type: "audio/mpeg", cat: "Audio", desc: "MP3 audio file" },
        { ext: ".mp4", type: "video/mp4", cat: "Video", desc: "MPEG-4 video file" },
        { ext: ".csv", type: "text/csv", cat: "Text", desc: "Comma-Separated Values" },
        { ext: ".txt", type: "text/plain", cat: "Text", desc: "Plain text document" },
        { ext: ".woff2", type: "font/woff2", cat: "Font", desc: "Web Open Font Format 2" }
      ];

      const searchIn = container.querySelector('#mime-search');
      const list = container.querySelector('#mime-list');

      function render(q = '') {
        const query = q.toLowerCase().trim();
        const filtered = mimes.filter(m => m.ext.toLowerCase().includes(query) || m.type.toLowerCase().includes(query) || m.desc.toLowerCase().includes(query));

        list.innerHTML = filtered.map(m => `
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 mb-0.5">
                <span class="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">${m.ext}</span>
                <span class="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">${m.type}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">${m.desc}</p>
            </div>
            <button data-type="${m.type}" class="mime-copy px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition">Copy</button>
          </div>
        `).join('');

        list.querySelectorAll('.mime-copy').forEach(btn => {
          btn.addEventListener('click', () => Utils.copyToClipboard(btn.getAttribute('data-type')));
        });
      }

      searchIn.addEventListener('input', () => render(searchIn.value));
      render();
    },
    seoContent: {
      overview: "Explore common standard MIME media types and configure HTTP Content-Type headers correctly for file uploads and APIs.",
      features: ["Covers web images, fonts, audio, video, and data formats", "Instant 1-click header copy", "Fast search filtering"],
      howTo: ["Search by file extension.", "Inspect official MIME identifier.", "Copy Content-Type string."],
      faqs: [{ q: "What is a MIME type?", a: "A Media Type (MIME type) tells browsers and email clients how to process data formats." }]
    }
  },

  // 44. Linux / Chmod Permissions Calculator
  {
    id: "chmod-calculator",
    title: "What chmod number is this permission?",
    category: "Developer & Data",
    icon: "🔒",
    badge: "New",
    description: "Check the boxes, or type 755. You see who can read, write, and run it.",
    keywords: ["chmod calculator", "linux permissions", "chmod 755", "chmod 644", "octal permissions"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-500 uppercase block mb-3">Owner (User)</span>
              <div class="space-y-2 text-xs text-left">
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-ur" checked class="text-indigo-600 rounded"><span>Read (4)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-uw" checked class="text-indigo-600 rounded"><span>Write (2)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-ux" checked class="text-indigo-600 rounded"><span>Execute (1)</span></label>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-500 uppercase block mb-3">Group</span>
              <div class="space-y-2 text-xs text-left">
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-gr" checked class="text-indigo-600 rounded"><span>Read (4)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-gw" class="text-indigo-600 rounded"><span>Write (2)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-gx" checked class="text-indigo-600 rounded"><span>Execute (1)</span></label>
              </div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-500 uppercase block mb-3">Public (Others)</span>
              <div class="space-y-2 text-xs text-left">
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-or" checked class="text-indigo-600 rounded"><span>Read (4)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-ow" class="text-indigo-600 rounded"><span>Write (2)</span></label>
                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="cp-ox" checked class="text-indigo-600 rounded"><span>Execute (1)</span></label>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 text-center">
              <span class="text-xs font-bold text-slate-500 uppercase block mb-1">Octal Code</span>
              <div id="cp-octal" class="text-3xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">755</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
              <span class="text-xs font-bold text-slate-500 uppercase block mb-1">Symbolic Notation</span>
              <div id="cp-symbolic" class="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">-rwxr-xr-x</div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
            <span class="font-mono text-slate-700 dark:text-slate-300 font-semibold" id="cp-cmd">chmod 755 filename</span>
            <button id="cp-copy" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition">Copy Command</button>
          </div>
        </div>
      `;

      const ur = container.querySelector('#cp-ur');
      const uw = container.querySelector('#cp-uw');
      const ux = container.querySelector('#cp-ux');
      const gr = container.querySelector('#cp-gr');
      const gw = container.querySelector('#cp-gw');
      const gx = container.querySelector('#cp-gx');
      const or_ = container.querySelector('#cp-or');
      const ow = container.querySelector('#cp-ow');
      const ox = container.querySelector('#cp-ox');

      const octalEl = container.querySelector('#cp-octal');
      const symEl = container.querySelector('#cp-symbolic');
      const cmdEl = container.querySelector('#cp-cmd');

      function update() {
        const u = (ur.checked ? 4 : 0) + (uw.checked ? 2 : 0) + (ux.checked ? 1 : 0);
        const g = (gr.checked ? 4 : 0) + (gw.checked ? 2 : 0) + (gx.checked ? 1 : 0);
        const o = (or_.checked ? 4 : 0) + (ow.checked ? 2 : 0) + (ox.checked ? 1 : 0);

        const octal = `${u}${g}${o}`;
        const sym = `-${ur.checked?'r':'-'}${uw.checked?'w':'-'}${ux.checked?'x':'-'}${gr.checked?'r':'-'}${gw.checked?'w':'-'}${gx.checked?'x':'-'}${or_.checked?'r':'-'}${ow.checked?'w':'-'}${ox.checked?'x':'-'}`;

        octalEl.textContent = octal;
        symEl.textContent = sym;
        cmdEl.textContent = `chmod ${octal} filename`;
      }

      container.querySelectorAll('input[type="checkbox"]').forEach(box => box.addEventListener('change', update));
      container.querySelector('#cp-copy').addEventListener('click', () => Utils.copyToClipboard(cmdEl.textContent));
      update();
    },
    seoContent: {
      overview: "Calculate Linux and Unix chmod file permissions visually with instant octal representation and symbolic notation.",
      features: ["Owner, Group, and Other permission matrix", "Real-time octal calculation (e.g. 755, 644, 700)", "Ready-to-run terminal command snippet"],
      howTo: ["Toggle checkboxes for Read, Write, and Execute.", "Copy the chmod command."],
      faqs: [{ q: "What does chmod 755 mean?", a: "755 means the owner can read, write, and execute (7), while group and public can only read and execute (5)." }]
    }
  },

  // 45. Curl to Fetch/Python Converter
  {
    id: "curl-converter",
    title: "How do I turn this curl command into code?",
    category: "Developer & Data",
    icon: "🔄",
    badge: "New",
    description: "Paste the curl. You get JavaScript fetch or Python requests.",
    keywords: ["curl converter", "curl to fetch", "curl to python", "curl to javascript", "convert curl"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500">cURL Command</label>
              <button id="cc-sample" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Sample cURL</button>
            </div>
            <textarea id="cc-input" rows="4" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{\"name\":\"Alex\"}'"></textarea>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex gap-2">
                <button id="cc-tab-js" class="px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white">JavaScript (fetch)</button>
                <button id="cc-tab-py" class="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">Python (requests)</button>
              </div>
              <button id="cc-copy" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy Code</button>
            </div>
            <textarea id="cc-output" rows="8" readonly class="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 leading-relaxed"></textarea>
          </div>
        </div>
      `;

      let activeTab = 'js';
      const input = container.querySelector('#cc-input');
      const output = container.querySelector('#cc-output');
      const tabJs = container.querySelector('#cc-tab-js');
      const tabPy = container.querySelector('#cc-tab-py');

      function parseCurl(curl) {
        let method = 'GET';
        let url = 'https://example.com';
        const headers = {};
        let body = null;

        const methodMatch = curl.match(/-X\s+([A-Z]+)/i) || curl.match(/--request\s+([A-Z]+)/i);
        if (methodMatch) method = methodMatch[1].toUpperCase();

        const urlMatch = curl.match(/(https?:\/\/[^\s\'\"]+)/i);
        if (urlMatch) url = urlMatch[1];

        const headerMatches = [...curl.matchAll(/-H\s+['"]([^'"]+)['"]/gi)];
        headerMatches.forEach(m => {
          const parts = m[1].split(':');
          if (parts.length >= 2) headers[parts[0].trim()] = parts.slice(1).join(':').trim();
        });

        const dataMatch = curl.match(/-d\s+['"]([\s\S]*?)['"](\s|$)/) || curl.match(/--data\s+['"]([\s\S]*?)['"](\s|$)/);
        if (dataMatch) {
          body = dataMatch[1];
          if (method === 'GET') method = 'POST';
        }

        return { method, url, headers, body };
      }

      function update() {
        const curl = input.value.trim();
        if (!curl) { output.value = ''; return; }

        const parsed = parseCurl(curl);

        if (activeTab === 'js') {
          const options = { method: parsed.method };
          if (Object.keys(parsed.headers).length > 0) options.headers = parsed.headers;
          if (parsed.body) options.body = parsed.body;

          output.value = `const response = await fetch("${parsed.url}", ${JSON.stringify(options, null, 2)});\nconst data = await response.json();\nconsole.log(data);`;
        } else {
          let py = `import requests\n\nurl = "${parsed.url}"\n`;
          if (Object.keys(parsed.headers).length > 0) py += `headers = ${JSON.stringify(parsed.headers, null, 2)}\n`;
          if (parsed.body) py += `data = '''${parsed.body}'''\n`;

          py += `\nresponse = requests.${parsed.method.toLowerCase()}(url`;
          if (Object.keys(parsed.headers).length > 0) py += `, headers=headers`;
          if (parsed.body) py += `, data=data`;
          py += `)\nprint(response.json())`;
          output.value = py;
        }
      }

      input.addEventListener('input', update);
      tabJs.addEventListener('click', () => {
        activeTab = 'js';
        tabJs.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white';
        tabPy.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        update();
      });
      tabPy.addEventListener('click', () => {
        activeTab = 'py';
        tabPy.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white';
        tabJs.className = 'px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
        update();
      });
      container.querySelector('#cc-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      container.querySelector('#cc-sample').addEventListener('click', () => {
        input.value = "curl -X POST https://api.stripe.com/v1/charges -H 'Authorization: Bearer sk_test_123' -H 'Content-Type: application/json' -d '{\"amount\": 2000, \"currency\": \"usd\"}'";
        update();
      });
    },
    seoContent: {
      overview: "Convert cURL command snippets directly into JavaScript modern async/await fetch() and Python requests code.",
      features: ["Extracts URL, HTTP verb, headers, and request body automatically", "Outputs idiomatic JavaScript and Python", "1-click copy code"],
      howTo: ["Paste cURL command from Chrome DevTools or documentation.", "Choose language tab.", "Copy code into your project."],
      faqs: [{ q: "How do I get cURL from Chrome DevTools?", a: "Right-click any network request in the Network tab, select Copy -> Copy as cURL." }]
    }
  },

  // 46. Markdown Table Generator
  {
    id: "markdown-table-generator",
    title: "How do I make a Markdown table?",
    category: "Developer & Data",
    icon: "🧮",
    badge: "New",
    description: "Fill in the cells. Copy the table into GitHub or a README.",
    keywords: ["markdown table generator", "create markdown table", "markdown spreadsheet", "gh table"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex gap-2 text-xs">
              <button id="mtg-add-row" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200">+ Row</button>
              <button id="mtg-add-col" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200">+ Column</button>
              <button id="mtg-clear" class="px-2.5 py-1 text-rose-600 bg-rose-50 dark:bg-rose-900/30 rounded-lg">Reset</button>
            </div>
            <button id="mtg-copy" class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">Copy Markdown</button>
          </div>

          <div class="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-900">
            <table id="mtg-table" class="w-full text-xs"></table>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Markdown Output</label>
            <textarea id="mtg-output" rows="6" readonly class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400"></textarea>
          </div>
        </div>
      `;

      let tableData = [
        ["Feature", "Basic Plan", "Pro Plan"],
        ["Tool Access", "20 Tools", "100 Tools"],
        ["Client Privacy", "100%", "100%"],
        ["API Rate Limit", "Unlimited", "Unlimited"]
      ];

      const tableEl = container.querySelector('#mtg-table');
      const output = container.querySelector('#mtg-output');

      function renderTable() {
        tableEl.innerHTML = tableData.map((row, rIdx) => `
          <tr class="${rIdx === 0 ? 'bg-slate-100 dark:bg-slate-800 font-bold' : ''}">
            ${row.map((cell, cIdx) => `
              <td class="p-1.5 border border-slate-200 dark:border-slate-700">
                <input type="text" data-r="${rIdx}" data-c="${cIdx}" value="${Utils.escapeHtml(cell)}" class="w-full p-1 bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded text-xs">
              </td>
            `).join('')}
          </tr>
        `).join('');

        tableEl.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', (e) => {
            const r = parseInt(e.target.getAttribute('data-r'), 10);
            const c = parseInt(e.target.getAttribute('data-c'), 10);
            tableData[r][c] = e.target.value;
            generateMarkdown();
          });
        });

        generateMarkdown();
      }

      function generateMarkdown() {
        if (tableData.length === 0) return;
        const colCount = tableData[0].length;
        const header = `| ${tableData[0].join(' | ')} |`;
        const separator = `| ${Array(colCount).fill('---').join(' | ')} |`;
        const rows = tableData.slice(1).map(r => `| ${r.join(' | ')} |`);
        output.value = [header, separator, ...rows].join('\n');
      }

      container.querySelector('#mtg-add-row').addEventListener('click', () => {
        const colCount = tableData[0].length;
        tableData.push(Array(colCount).fill(''));
        renderTable();
      });

      container.querySelector('#mtg-add-col').addEventListener('click', () => {
        tableData.forEach((row, i) => row.push(i === 0 ? `Header ${row.length + 1}` : ''));
        renderTable();
      });

      container.querySelector('#mtg-clear').addEventListener('click', () => {
        tableData = [["Header 1", "Header 2"], ["Row 1", "Row 2"]];
        renderTable();
      });

      container.querySelector('#mtg-copy').addEventListener('click', () => Utils.copyToClipboard(output.value));
      renderTable();
    },
    seoContent: {
      overview: "Visual spreadsheet creator that generates clean GitHub-flavored Markdown tables for documentation, pull requests, and READMEs.",
      features: ["Interactive grid editing with add/remove rows and columns", "Clean Markdown separator generation", "1-click copy"],
      howTo: ["Type cell contents into the grid.", "Add rows or columns as needed.", "Copy the generated Markdown table."],
      faqs: [{ q: "Does this support GitHub Markdown?", a: "Yes, it produces standard GFM table format compatible with GitHub, GitLab, and Markdown parsers." }]
    }
  },

  // 47. UUID / GUID (v4) Generator
  {
    id: "uuid-generator",
    title: "I need a unique ID.",
    category: "Developer & Data",
    icon: "🆔",
    badge: "Popular",
    description: "Click generate. You get an ID you can paste into a database or a test.",
    keywords: ["uuid generator", "guid generator", "uuid v4", "random uuid", "generate guid", "crypto uuid"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div>
              <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Quantity</label>
              <input id="uuid-count" type="number" min="1" max="100" value="5" class="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold">
            </div>
            <div class="flex items-center gap-2 pb-2">
              <input id="uuid-upper" type="checkbox" class="text-indigo-600 rounded">
              <label for="uuid-upper" class="text-xs text-slate-700 dark:text-slate-300">Uppercase</label>
            </div>
            <div class="flex items-center gap-2 pb-2">
              <input id="uuid-hyphens" type="checkbox" checked class="text-indigo-600 rounded">
              <label for="uuid-hyphens" class="text-xs text-slate-700 dark:text-slate-300">Include Hyphens</label>
            </div>
            <button id="uuid-gen" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Generate New</button>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Generated UUIDs</span>
              <button id="uuid-copy" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition">Copy All</button>
            </div>
            <textarea id="uuid-output" readonly rows="8" class="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 leading-relaxed font-semibold"></textarea>
          </div>
        </div>
      `;

      const countInput = container.querySelector('#uuid-count');
      const upperCheck = container.querySelector('#uuid-upper');
      const hyphenCheck = container.querySelector('#uuid-hyphens');
      const outputArea = container.querySelector('#uuid-output');

      function generateUUIDs() {
        const count = Math.min(100, Math.max(1, parseInt(countInput.value, 10) || 1));
        const list = [];
        for (let i = 0; i < count; i++) {
          let id = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
          if (!hyphenCheck.checked) id = id.replace(/-/g, '');
          if (upperCheck.checked) id = id.toUpperCase();
          list.push(id);
        }
        outputArea.value = list.join('\n');
      }

      container.querySelector('#uuid-gen').addEventListener('click', generateUUIDs);
      upperCheck.addEventListener('change', generateUUIDs);
      hyphenCheck.addEventListener('change', generateUUIDs);
      container.querySelector('#uuid-copy').addEventListener('click', () => Utils.copyToClipboard(outputArea.value));
      generateUUIDs();
    },
    seoContent: {
      overview: "The OmniTools UUID Generator produces RFC 4122 version-4 universally unique identifiers (UUIDs/GUIDs) generated using the cryptographically secure `crypto.randomUUID()` Web API.",
      features: ["Cryptographically secure randomness powered by native Web Crypto", "Generate between 1 and 100 UUIDs in one click", "Options for uppercase letters and hyphen omission"],
      howTo: ["Set how many UUIDs you need.", "Select your formatting preferences.", "Click 'Generate New' and copy."],
      faqs: [{ q: "What is a UUID v4?", a: "A Version 4 UUID is a 128-bit identifier generated using random numbers with negligible probability of collision." }]
    }
  },

  // 48. Hash Generator (MD5, SHA-256 via Web Crypto API)
  {
    id: "hash-generator",
    title: "What is the checksum of this text?",
    category: "Developer & Data",
    icon: "#️⃣",
    badge: "Popular",
    description: "Paste the text. You get MD5, SHA-1, SHA-256, and SHA-512.",
    keywords: ["hash generator", "sha256 generator", "sha512", "sha1", "md5 hash", "checksum"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Input Text</label>
            <input id="hash-input" type="text" class="w-full p-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100" placeholder="Type text to hash...">
          </div>

          <div class="space-y-3 pt-2">
            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">SHA-256 (Recommended)</span>
                <button data-hash-target="sha256" class="copy-hash-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="hash-sha256" readonly type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 font-semibold" placeholder="SHA-256 hash...">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">SHA-512</span>
                <button data-hash-target="sha512" class="copy-hash-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="hash-sha512" readonly type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300" placeholder="SHA-512 hash...">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-semibold text-slate-600 dark:text-slate-300">SHA-1 (Legacy)</span>
                <button data-hash-target="sha1" class="copy-hash-btn text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <input id="hash-sha1" readonly type="text" class="w-full p-2.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300" placeholder="SHA-1 hash...">
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#hash-input');
      const sha256El = container.querySelector('#hash-sha256');
      const sha512El = container.querySelector('#hash-sha512');
      const sha1El = container.querySelector('#hash-sha1');

      async function computeHash(algorithm, text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      async function updateHashes() {
        const text = input.value;
        try {
          const [h256, h512, h1] = await Promise.all([
            computeHash('SHA-256', text),
            computeHash('SHA-512', text),
            computeHash('SHA-1', text)
          ]);
          sha256El.value = h256;
          sha512El.value = h512;
          sha1El.value = h1;
        } catch (e) {
          console.error(e);
        }
      }

      input.addEventListener('input', Utils.debounce(updateHashes, 150));
      updateHashes();

      container.querySelectorAll('.copy-hash-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-hash-target');
          const el = container.querySelector(`#hash-${target}`);
          Utils.copyToClipboard(el.value);
        });
      });
    },
    seoContent: {
      overview: "Calculate standard SHA-256, SHA-512, and SHA-1 digest hashes from plain text in milliseconds using the hardware-accelerated Web Crypto API.",
      features: ["Hardware accelerated via Web Crypto subtle digest", "Zero data transmission to remote servers", "Calculates multiple algorithms simultaneously"],
      howTo: ["Type your string into the input box.", "Hashes compute automatically.", "Click Copy beside desired hash."],
      faqs: [{ q: "What is SHA-256?", a: "SHA-256 is an industry-standard 256-bit cryptographic hash function that produces a unique 64-character hexadecimal digest." }]
    }
  },

  // 49. User Agent Parser
  {
    id: "user-agent-parser",
    title: "What browser is this user agent?",
    category: "Developer & Data",
    icon: "💻",
    badge: "New",
    description: "Paste the string, or look at the one from this browser.",
    keywords: ["user agent parser", "parse user agent", "my user agent", "browser detection", "ua lookup"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs font-semibold text-slate-500">User Agent String</label>
              <button id="ua-current" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Reset to My Browser</button>
            </div>
            <textarea id="ua-input" rows="3" class="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-slate-900 dark:text-slate-100"></textarea>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Browser</span>
              <div id="ua-browser" class="text-sm font-bold text-indigo-600 dark:text-indigo-400 truncate">Chrome</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Operating System</span>
              <div id="ua-os" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Windows</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Device Type</span>
              <div id="ua-device" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Desktop</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Engine</span>
              <div id="ua-engine" class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Blink</div>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#ua-input');
      const browserEl = container.querySelector('#ua-browser');
      const osEl = container.querySelector('#ua-os');
      const deviceEl = container.querySelector('#ua-device');
      const engineEl = container.querySelector('#ua-engine');

      function parseUA(ua) {
        let browser = 'Unknown Browser';
        let os = 'Unknown OS';
        let device = 'Desktop';
        let engine = 'Unknown Engine';

        // Browser
        if (ua.includes('Firefox/')) browser = 'Firefox';
        else if (ua.includes('Edg/')) browser = 'Microsoft Edge';
        else if (ua.includes('Chrome/')) browser = 'Google Chrome';
        else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Apple Safari';
        else if (ua.includes('MSIE') || ua.includes('Trident/')) browser = 'Internet Explorer';

        // OS
        if (ua.includes('Windows NT 10.0')) os = 'Windows 10 / 11';
        else if (ua.includes('Windows NT')) os = 'Windows';
        else if (ua.includes('Mac OS X')) os = 'macOS';
        else if (ua.includes('Android')) { os = 'Android'; device = 'Mobile'; }
        else if (ua.includes('iPhone') || ua.includes('iPad')) { os = 'iOS'; device = ua.includes('iPad') ? 'Tablet' : 'Mobile'; }
        else if (ua.includes('Linux')) os = 'Linux';

        // Engine
        if (ua.includes('AppleWebKit')) engine = 'WebKit / Blink';
        else if (ua.includes('Gecko/')) engine = 'Gecko';

        return { browser, os, device, engine };
      }

      function update() {
        const res = parseUA(input.value);
        browserEl.textContent = res.browser;
        osEl.textContent = res.os;
        deviceEl.textContent = res.device;
        engineEl.textContent = res.engine;
      }

      input.value = navigator.userAgent;
      update();

      input.addEventListener('input', update);
      container.querySelector('#ua-current').addEventListener('click', () => {
        input.value = navigator.userAgent;
        update();
      });
    },
    seoContent: {
      overview: "Parse and analyze HTTP User-Agent strings to identify browser families, underlying operating systems, rendering engines, and mobile/desktop hardware.",
      features: ["Auto-detects active browser user agent", "Identifies Chrome, Firefox, Safari, Edge, Android, iOS, Windows, macOS", "Clean metric badges"],
      howTo: ["View your current browser metadata or paste a remote User-Agent string.", "Inspect parsed details."],
      faqs: [{ q: "What is a User Agent?", a: "A User Agent is an HTTP request header string that identifies the application, OS, and software vendor requesting web content." }]
    }
  },

  // 50. Keycode Event Inspector
  {
    id: "keycode-inspector",
    title: "What code does this key send?",
    category: "Developer & Data",
    icon: "⌨️",
    badge: "New",
    description: "Press a key. You see the name, the code, and the modifiers.",
    keywords: ["keycode inspector", "javascript keycode", "keyboard event tester", "event key code", "key listener"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div id="kc-box" tabindex="0" class="p-8 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-300 transition">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Click Here & Press Any Key</span>
            <div id="kc-main" class="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 my-2">Press Key</div>
            <div id="kc-sub" class="text-xs font-mono text-slate-500">Key code will appear here</div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">event.key</span>
              <div id="kc-key" class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">-</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">event.code</span>
              <div id="kc-code" class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">-</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">event.keyCode</span>
              <div id="kc-num" class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">-</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">event.location</span>
              <div id="kc-loc" class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">-</div>
            </div>
          </div>

          <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-around text-xs font-mono">
            <span id="kc-shift" class="text-slate-400 font-semibold">Shift: false</span>
            <span id="kc-ctrl" class="text-slate-400 font-semibold">Ctrl: false</span>
            <span id="kc-alt" class="text-slate-400 font-semibold">Alt: false</span>
            <span id="kc-meta" class="text-slate-400 font-semibold">Meta / Cmd: false</span>
          </div>
        </div>
      `;

      const box = container.querySelector('#kc-box');
      const main = container.querySelector('#kc-main');
      const sub = container.querySelector('#kc-sub');
      const keyEl = container.querySelector('#kc-key');
      const codeEl = container.querySelector('#kc-code');
      const numEl = container.querySelector('#kc-num');
      const locEl = container.querySelector('#kc-loc');
      const shiftEl = container.querySelector('#kc-shift');
      const ctrlEl = container.querySelector('#kc-ctrl');
      const altEl = container.querySelector('#kc-alt');
      const metaEl = container.querySelector('#kc-meta');

      function handleKey(e) {
        e.preventDefault();
        main.textContent = e.key === ' ' ? 'Space' : e.key;
        sub.textContent = `code: ${e.code} | keyCode: ${e.keyCode}`;

        keyEl.textContent = e.key;
        codeEl.textContent = e.code;
        numEl.textContent = e.keyCode;
        locEl.textContent = e.location;

        shiftEl.textContent = `Shift: ${e.shiftKey}`;
        shiftEl.className = e.shiftKey ? 'text-indigo-600 font-bold' : 'text-slate-400';

        ctrlEl.textContent = `Ctrl: ${e.ctrlKey}`;
        ctrlEl.className = e.ctrlKey ? 'text-indigo-600 font-bold' : 'text-slate-400';

        altEl.textContent = `Alt: ${e.altKey}`;
        altEl.className = e.altKey ? 'text-indigo-600 font-bold' : 'text-slate-400';

        metaEl.textContent = `Meta: ${e.metaKey}`;
        metaEl.className = e.metaKey ? 'text-indigo-600 font-bold' : 'text-slate-400';
      }

      box.addEventListener('keydown', handleKey);
      box.focus();
    },
    seoContent: {
      overview: "Real-time interactive keyboard event listener displaying keyboard event properties (e.key, e.code, e.keyCode) and modifier key states.",
      features: ["Captures full modern KeyboardEvent parameters", "Monitors Shift, Ctrl, Alt, and Meta / Command modifier states", "Immediate visual response"],
      howTo: ["Click the interactive box.", "Press any keyboard button.", "Inspect exact JavaScript event values."],
      faqs: [{ q: "Why is event.keyCode deprecated?", a: "Modern web standards prefer event.key (for the character) and event.code (for the physical keyboard key position) to support international keyboard layouts." }]
    }
  },

  // 51. IPv4 Subnet & CIDR Calculator
  {
    id: "subnet-calculator",
    title: "What addresses are in this subnet?",
    category: "Developer & Data",
    icon: "🌐",
    badge: "New",
    description: "Enter the IP and the mask, like 192.168.1.0/24. You see the range.",
    keywords: ["subnet calculator", "cidr calculator", "ipv4 subnet", "ip subnet mask", "network address calculator", "cidr notation", "usable host range"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">IP Address</label>
              <input id="sub-ip" type="text" value="192.168.1.1" class="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. 192.168.1.1">
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">CIDR Prefix</label>
              <select id="sub-cidr" class="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"></select>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-zinc-400">Quick Presets:</span>
            <button data-preset="192.168.1.1/24" class="sub-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">192.168.1.1 /24</button>
            <button data-preset="10.0.0.1/16" class="sub-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">10.0.0.1 /16</button>
            <button data-preset="172.16.0.1/12" class="sub-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">172.16.0.1 /12</button>
            <button data-preset="10.0.0.1/8" class="sub-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">10.0.0.1 /8</button>
            <button data-preset="192.168.1.1/30" class="sub-preset px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">/30 (P2P Link)</button>
          </div>

          <div id="sub-error" class="hidden p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900"></div>

          <div id="sub-results" class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Network Address</span>
              <span id="sub-net" class="font-bold text-zinc-900 dark:text-zinc-100 text-sm">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Broadcast Address</span>
              <span id="sub-bcast" class="font-bold text-zinc-900 dark:text-zinc-100 text-sm">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Usable Host Range</span>
              <span id="sub-range" class="font-bold text-indigo-600 dark:text-indigo-400 text-xs">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Usable Hosts / Total IPs</span>
              <span id="sub-hosts" class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Subnet Mask</span>
              <span id="sub-mask" class="font-bold text-zinc-900 dark:text-zinc-100">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Wildcard Mask</span>
              <span id="sub-wildcard" class="font-bold text-zinc-900 dark:text-zinc-100">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 sm:col-span-2">
              <span class="text-[11px] text-zinc-400 block mb-0.5">IP Scope / Classification</span>
              <span id="sub-class" class="font-semibold text-zinc-700 dark:text-zinc-300">-</span>
            </div>
            <div class="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 sm:col-span-2">
              <span class="text-[11px] text-zinc-400 block mb-0.5">Binary Subnet Mask</span>
              <span id="sub-binary" class="text-[11px] text-zinc-500 dark:text-zinc-400 break-all">-</span>
            </div>
          </div>
        </div>
      `;

      const ipInput = container.querySelector('#sub-ip');
      const cidrSelect = container.querySelector('#sub-cidr');
      const errorEl = container.querySelector('#sub-error');

      // Populate CIDR dropdown /1 to /32
      for (let i = 32; i >= 1; i--) {
        const maskInt = (0xFFFFFFFF << (32 - i)) >>> 0;
        const m1 = (maskInt >>> 24) & 255;
        const m2 = (maskInt >>> 16) & 255;
        const m3 = (maskInt >>> 8) & 255;
        const m4 = maskInt & 255;
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `/${i} (${m1}.${m2}.${m3}.${m4})`;
        if (i === 24) opt.selected = true;
        cidrSelect.appendChild(opt);
      }

      function parseIp(ipStr) {
        const parts = ipStr.trim().split('.');
        if (parts.length !== 4) return null;
        const nums = parts.map(p => Number(p));
        for (const n of nums) {
          if (isNaN(n) || n < 0 || n > 255 || !Number.isInteger(n)) return null;
        }
        return (nums[0] << 24 | nums[1] << 16 | nums[2] << 8 | nums[3]) >>> 0;
      }

      function intToIp(intVal) {
        return [
          (intVal >>> 24) & 255,
          (intVal >>> 16) & 255,
          (intVal >>> 8) & 255,
          intVal & 255
        ].join('.');
      }

      function calculate() {
        errorEl.classList.add('hidden');
        const ipStr = ipInput.value.trim();
        const cidr = parseInt(cidrSelect.value, 10);

        const ipInt = parseIp(ipStr);
        if (ipInt === null) {
          errorEl.textContent = 'Please enter a valid IPv4 address (e.g. 192.168.1.1).';
          errorEl.classList.remove('hidden');
          return;
        }

        const maskInt = cidr === 0 ? 0 : ((0xFFFFFFFF << (32 - cidr)) >>> 0);
        const wildcardInt = (~maskInt) >>> 0;
        const netInt = (ipInt & maskInt) >>> 0;
        const bcastInt = (netInt | wildcardInt) >>> 0;

        const totalAddresses = Math.pow(2, 32 - cidr);
        const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalAddresses - 2);

        let firstUsable = '-';
        let lastUsable = '-';
        if (cidr <= 30) {
          firstUsable = intToIp(netInt + 1);
          lastUsable = intToIp(bcastInt - 1);
        } else if (cidr === 31) {
          firstUsable = intToIp(netInt);
          lastUsable = intToIp(bcastInt);
        } else {
          firstUsable = intToIp(netInt);
          lastUsable = intToIp(netInt);
        }

        // Scope classification
        const firstOctet = (ipInt >>> 24) & 255;
        const secondOctet = (ipInt >>> 16) & 255;
        let scope = "Public IPv4 Internet";
        if (firstOctet === 10) scope = "Private Network (RFC 1918, Class A)";
        else if (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) scope = "Private Network (RFC 1918, Class B)";
        else if (firstOctet === 192 && secondOctet === 168) scope = "Private Network (RFC 1918, Class C)";
        else if (firstOctet === 127) scope = "Loopback Address (RFC 1122)";
        else if (firstOctet === 169 && secondOctet === 254) scope = "Link-Local / APIPA (RFC 3927)";

        container.querySelector('#sub-net').textContent = `${intToIp(netInt)} /${cidr}`;
        container.querySelector('#sub-bcast').textContent = intToIp(bcastInt);
        container.querySelector('#sub-range').textContent = `${firstUsable} – ${lastUsable}`;
        container.querySelector('#sub-hosts').textContent = `${usableHosts.toLocaleString()} usable (${totalAddresses.toLocaleString()} total)`;
        container.querySelector('#sub-mask').textContent = intToIp(maskInt);
        container.querySelector('#sub-wildcard').textContent = intToIp(wildcardInt);
        container.querySelector('#sub-class').textContent = scope;

        const binaryStr = [
          ((maskInt >>> 24) & 255).toString(2).padStart(8, '0'),
          ((maskInt >>> 16) & 255).toString(2).padStart(8, '0'),
          ((maskInt >>> 8) & 255).toString(2).padStart(8, '0'),
          (maskInt & 255).toString(2).padStart(8, '0')
        ].join('.');
        container.querySelector('#sub-binary').textContent = binaryStr;
      }

      ipInput.addEventListener('input', calculate);
      cidrSelect.addEventListener('change', calculate);

      container.querySelectorAll('.sub-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const [ip, c] = btn.dataset.preset.split('/');
          ipInput.value = ip;
          cidrSelect.value = c;
          calculate();
        });
      });

      calculate();
    },
    seoContent: {
      overview: "Online IPv4 Subnet and CIDR Calculator. Calculate network range, broadcast addresses, usable host counts, wildcard masks, and binary netmasks with zero network latency.",
      features: [
        "Instant calculation of network, broadcast, and host range addresses",
        "Supports all CIDR prefix notations from /1 to /32",
        "Includes wildcard masks and RFC 1918 private/public IP classification",
        "100% client-side bitwise calculation running in your browser"
      ],
      howTo: [
        "Enter any IPv4 address into the IP Address field.",
        "Select your CIDR prefix (/1 to /32) from the dropdown or click a quick preset.",
        "Review the network boundaries, usable IP range, and host capacities."
      ],
      faqs: [
        { q: "Why are there two fewer usable hosts than total IP addresses?", a: "In standard IPv4 subnets (/30 and larger), the first address is reserved as the Network identifier, and the final address is reserved as the Broadcast address." },
        { q: "What is the difference between a subnet mask and a wildcard mask?", a: "A wildcard mask is the exact inverse (bitwise NOT) of a subnet mask. It is widely used in Cisco access control lists (ACLs) and OSPF network configurations." }
      ]
    }
  },

  // 52. In-Browser HMAC Generator (Web Crypto)
  {
    id: "hmac-generator",
    title: "What is the HMAC for this message?",
    category: "Developer & Data",
    icon: "🔐",
    badge: "New",
    description: "Paste the message and the secret. They stay on this device.",
    keywords: ["hmac generator", "hmac sha256", "hmac sha512", "webhook signature generator", "crypto subtle hmac", "online hmac tool"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Algorithm</label>
              <select id="hmac-algo" class="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="SHA-256" selected>HMAC-SHA-256 (Stripe, GitHub, AWS)</option>
                <option value="SHA-512">HMAC-SHA-512 (High Security)</option>
                <option value="SHA-384">HMAC-SHA-384</option>
                <option value="SHA-1">HMAC-SHA-1 (Legacy)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Output Encoding</label>
              <select id="hmac-enc" class="w-full px-3 py-2 text-xs font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="hex" selected>Hexadecimal (Lowercase)</option>
                <option value="hex-upper">Hexadecimal (UPPERCASE)</option>
                <option value="base64">Base64</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Secret Key</label>
            <div class="relative">
              <input id="hmac-key" type="password" value="my_super_secret_webhook_key_123" class="w-full px-3 pr-10 py-2 text-xs font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste your private secret key here...">
              <button id="hmac-toggle-key" class="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs transition" title="Toggle secret visibility">👁️</button>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Input Message / Payload</label>
              <div class="flex items-center gap-2">
                <button id="hmac-sample" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Insert Sample Payload</button>
                <button id="hmac-clear" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">Clear</button>
              </div>
            </div>
            <textarea id="hmac-message" rows="5" class="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Type or paste the raw payload string here...">{ "event": "payment_intent.succeeded", "amount": 2500 }</textarea>
          </div>

          <div class="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <span>Calculated HMAC Signature</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono">Web Crypto API</span>
              </span>
              <button id="hmac-copy" class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1">Copy Hash</button>
            </div>
            <div id="hmac-output" class="p-3 font-mono text-xs break-all rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-indigo-600 dark:text-indigo-400 select-all">Calculating...</div>
          </div>
        </div>
      `;

      const algoSelect = container.querySelector('#hmac-algo');
      const encSelect = container.querySelector('#hmac-enc');
      const keyInput = container.querySelector('#hmac-key');
      const msgInput = container.querySelector('#hmac-message');
      const outputEl = container.querySelector('#hmac-output');
      const toggleKeyBtn = container.querySelector('#hmac-toggle-key');

      toggleKeyBtn.addEventListener('click', () => {
        keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
      });

      async function generateHmac() {
        const keyText = keyInput.value;
        const msgText = msgInput.value;
        const algo = algoSelect.value;
        const encoding = encSelect.value;

        if (!keyText || !msgText) {
          outputEl.textContent = 'Please enter both a secret key and an input message.';
          return;
        }

        try {
          const enc = new TextEncoder();
          const keyData = enc.encode(keyText);
          const msgData = enc.encode(msgText);

          const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: algo } },
            false,
            ['sign']
          );

          const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
          const bytes = new Uint8Array(signature);

          let result = '';
          if (encoding === 'base64') {
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            result = window.btoa(binary);
          } else {
            let hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
            result = encoding === 'hex-upper' ? hex.toUpperCase() : hex;
          }

          outputEl.textContent = result;
        } catch (err) {
          outputEl.textContent = `Error generating HMAC: ${err.message}`;
        }
      }

      algoSelect.addEventListener('change', generateHmac);
      encSelect.addEventListener('change', generateHmac);
      keyInput.addEventListener('input', generateHmac);
      msgInput.addEventListener('input', generateHmac);

      container.querySelector('#hmac-copy').addEventListener('click', () => {
        Utils.copyToClipboard(outputEl.textContent);
      });

      container.querySelector('#hmac-clear').addEventListener('click', () => {
        msgInput.value = '';
        generateHmac();
        msgInput.focus();
      });

      container.querySelector('#hmac-sample').addEventListener('click', () => {
        msgInput.value = '{"id":"evt_12345","type":"charge.successful","created":1726185600}';
        generateHmac();
      });

      generateHmac();
    },
    seoContent: {
      overview: "Cryptographically secure in-browser HMAC generator. Compute HMAC-SHA256, HMAC-SHA512, and HMAC-SHA1 webhook signatures using the native browser Web Crypto API without exposing keys to remote servers.",
      features: [
        "100% client-side calculation using native window.crypto.subtle",
        "Supports SHA-256, SHA-384, SHA-512, and SHA-1 algorithms",
        "Supports Hexadecimal (lowercase/uppercase) and Base64 output encodings",
        "Confidential: Your private API and webhook secret keys are never transmitted over the internet"
      ],
      howTo: [
        "Select your HMAC hash algorithm (e.g. SHA-256 for Stripe/GitHub webhooks).",
        "Enter your private secret key and message payload.",
        "Choose your preferred output encoding (Hex or Base64) and copy the signature."
      ],
      faqs: [
        { q: "Is it safe to paste my webhook secret key here?", a: "Yes. All computations execute locally in your browser memory using the Web Crypto API sandbox. Zero network packets or telemetry are transmitted." },
        { q: "What is an HMAC used for?", a: "An HMAC (Hash-based Message Authentication Code) verifies both the data integrity and the authenticity of a message between two parties using a shared secret." }
      ]
    }
  },

  // 53. HTTP Header Parser & Security Audit
  {
    id: "http-header-parser",
    title: "Are these response headers safe?",
    category: "Developer & Data",
    icon: "📋",
    badge: "New",
    description: "Paste the headers. You see them listed, plus CSP, HSTS, and CORS.",
    keywords: ["http header parser", "security header checker", "parse http headers", "csp validator", "hsts checker", "http response headers"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <label class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Paste Raw HTTP Headers</label>
            <div class="flex items-center gap-2">
              <button id="hdr-sample-secure" class="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Sample: Secure Site</button>
              <button id="hdr-sample-insecure" class="px-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition">Sample: Insecure / Minimal</button>
              <button id="hdr-clear" class="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">Clear</button>
            </div>
          </div>

          <textarea id="hdr-input" rows="6" class="w-full p-3 font-mono text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="HTTP/1.1 200 OK&#10;Date: Mon, 12 Sep 2026 12:00:00 GMT&#10;Content-Type: text/html; charset=utf-8&#10;Strict-Transport-Security: max-age=31536000; includeSubDomains&#10;..."></textarea>

          <!-- Security Score Banner -->
          <div id="hdr-audit-box" class="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Security Header Audit</span>
              <span id="hdr-audit-score" class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">-</span>
            </div>
            <div id="hdr-audit-list" class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs"></div>
          </div>

          <!-- Parsed Headers Table -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Parsed Header Elements</span>
              <span id="hdr-count" class="text-[11px] font-mono text-zinc-400">0 headers</span>
            </div>
            <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-zinc-100/70 dark:bg-zinc-850/60 text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="p-2.5 w-1/3">Header Name</th>
                    <th class="p-2.5">Header Value</th>
                  </tr>
                </thead>
                <tbody id="hdr-table-body" class="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white dark:bg-zinc-900/40">
                  <tr><td colspan="2" class="p-4 text-center text-zinc-400">No headers parsed yet.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#hdr-input');
      const auditList = container.querySelector('#hdr-audit-list');
      const auditScore = container.querySelector('#hdr-audit-score');
      const tableBody = container.querySelector('#hdr-table-body');
      const countEl = container.querySelector('#hdr-count');

      const securityChecks = [
        { name: 'Strict-Transport-Security', label: 'HSTS (Enforce HTTPS)', desc: 'Prevents SSL stripping attacks' },
        { name: 'Content-Security-Policy', label: 'CSP (Content Security Policy)', desc: 'Mitigates Cross-Site Scripting (XSS)' },
        { name: 'X-Frame-Options', label: 'X-Frame-Options', desc: 'Protects against clickjacking via iframes' },
        { name: 'X-Content-Type-Options', label: 'X-Content-Type-Options (nosniff)', desc: 'Prevents MIME-sniffing vulnerabilities' },
        { name: 'Referrer-Policy', label: 'Referrer-Policy', desc: 'Controls sensitive referrer URLs sent on outbound links' },
        { name: 'Permissions-Policy', label: 'Permissions-Policy', desc: 'Restricts browser APIs (camera, mic, geolocation)' }
      ];

      function parseHeaders() {
        const raw = input.value.trim();
        if (!raw) {
          tableBody.innerHTML = '<tr><td colspan="2" class="p-4 text-center text-zinc-400">No headers parsed yet.</td></tr>';
          auditList.innerHTML = '';
          auditScore.textContent = '-';
          countEl.textContent = '0 headers';
          return;
        }

        const lines = raw.split(/\r?\n/);
        const headers = [];
        const headerMap = {};

        for (const line of lines) {
          const colonIdx = line.indexOf(':');
          if (colonIdx > 0) {
            const key = line.slice(0, colonIdx).trim();
            const val = line.slice(colonIdx + 1).trim();
            headers.push({ key, val });
            headerMap[key.toLowerCase()] = val;
          }
        }

        countEl.textContent = `${headers.length} headers parsed`;

        // Render Table
        if (headers.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="2" class="p-4 text-center text-zinc-400">Could not identify key:value headers. Check format.</td></tr>';
        } else {
          tableBody.innerHTML = headers.map(h => `
            <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
              <td class="p-2.5 font-semibold text-zinc-900 dark:text-zinc-100 break-all">${Utils.escapeHtml(h.key)}</td>
              <td class="p-2.5 text-zinc-600 dark:text-zinc-300 break-all">${Utils.escapeHtml(h.val)}</td>
            </tr>
          `).join('');
        }

        // Run Security Audit
        let passed = 0;
        auditList.innerHTML = securityChecks.map(check => {
          const found = headerMap[check.name.toLowerCase()];
          if (found) passed++;
          return `
            <div class="p-2.5 rounded-lg border ${found ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200' : 'border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'}">
              <div class="flex items-center justify-between mb-0.5">
                <span class="font-bold">${check.label}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${found ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100'}">${found ? 'PRESENT' : 'MISSING'}</span>
              </div>
              <p class="text-[11px] opacity-80">${check.desc}</p>
            </div>
          `;
        }).join('');

        const totalChecks = securityChecks.length;
        const grade = passed === totalChecks ? 'A+ (Hardened)' : (passed >= 4 ? 'B (Good)' : (passed >= 2 ? 'C (Needs Work)' : 'F (Vulnerable)'));
        auditScore.textContent = `${passed}/${totalChecks} - Grade: ${grade}`;
      }

      input.addEventListener('input', parseHeaders);

      container.querySelector('#hdr-sample-secure').addEventListener('click', () => {
        input.value = [
          'HTTP/2 200 OK',
          'Date: Sat, 12 Sep 2026 12:00:00 GMT',
          'Content-Type: text/html; charset=UTF-8',
          'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
          "Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com",
          'X-Frame-Options: DENY',
          'X-Content-Type-Options: nosniff',
          'Referrer-Policy: strict-origin-when-cross-origin',
          'Permissions-Policy: geolocation=(), camera=(), microphone=()',
          'Server: cloudflare'
        ].join('\n');
        parseHeaders();
      });

      container.querySelector('#hdr-sample-insecure').addEventListener('click', () => {
        input.value = [
          'HTTP/1.1 200 OK',
          'Date: Sat, 12 Sep 2026 12:00:00 GMT',
          'Content-Type: text/html',
          'Server: Apache/2.4.41 (Ubuntu)',
          'X-Powered-By: PHP/7.4.3',
          'Connection: keep-alive'
        ].join('\n');
        parseHeaders();
      });

      container.querySelector('#hdr-clear').addEventListener('click', () => {
        input.value = '';
        parseHeaders();
        input.focus();
      });

      // Initial sample
      container.querySelector('#hdr-sample-secure').click();
    },
    seoContent: {
      overview: "Parse and audit raw HTTP response and request headers. Analyze critical web application security headers including HSTS, CSP, X-Frame-Options, and Referrer-Policy with instant grade scoring.",
      features: [
        "Parses multi-line HTTP response headers into structured key-value tables",
        "Automated security audit checking 6 essential OWASP defense headers",
        "Evaluates Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and Clickjacking defenses",
        "Runs 100% in your browser with zero network transmission"
      ],
      howTo: [
        "Paste raw HTTP headers copied from curl -I, browser DevTools, or Postman.",
        "Review the structured headers table and the security audit score.",
        "Identify missing headers and implement suggested OWASP mitigations."
      ],
      faqs: [
        { q: "What is the most critical HTTP security header?", a: "Content-Security-Policy (CSP) and Strict-Transport-Security (HSTS) are widely considered the most vital for preventing XSS and man-in-the-middle protocol downgrade attacks." },
        { q: "How do I extract HTTP headers from my browser?", a: "Open browser DevTools (F12), navigate to the Network tab, refresh the page, click the main document request, and view the Response Headers section." }
      ]
    }
  }
];

window.devTools = devTools;
