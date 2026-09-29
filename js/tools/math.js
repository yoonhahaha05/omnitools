/**
 * OmniTools - Category: Everyday Math & Converters (Tools 51 to 75)
 * 100% Client-Side Execution
 */

const mathTools = [
  // 51. Percentage Increase/Decrease Calculator
  {
    id: "percentage-calculator",
    title: "What is 15% of 80?",
    category: "Everyday Math & Converters",
    icon: "➗",
    badge: "Popular",
    description: "Enter the numbers. You get the percent, the increase, or the decrease.",
    keywords: ["percentage calculator", "percent increase", "percent decrease", "calculate percent", "discount calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-6">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">1. Calculate Percentage Value</h3>
            <div class="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <span>What is</span>
              <input id="pct1-x" type="number" value="15" class="w-20 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>% of</span>
              <input id="pct1-y" type="number" value="250" class="w-24 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>=</span>
              <span id="pct1-res" class="px-3 py-1.5 font-bold text-indigo-600 dark:text-indigo-400 text-base bg-indigo-50 dark:bg-indigo-950/40 rounded-lg">37.5</span>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">2. Ratio Percentage</h3>
            <div class="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input id="pct2-x" type="number" value="45" class="w-24 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>is what % of</span>
              <input id="pct2-y" type="number" value="180" class="w-24 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>=</span>
              <span id="pct2-res" class="px-3 py-1.5 font-bold text-indigo-600 dark:text-indigo-400 text-base bg-indigo-50 dark:bg-indigo-950/40 rounded-lg">25%</span>
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">3. Percentage Increase / Decrease</h3>
            <div class="flex flex-wrap items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <span>From</span>
              <input id="pct3-x" type="number" value="80" class="w-24 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>to</span>
              <input id="pct3-y" type="number" value="100" class="w-24 p-2 text-center text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <span>=</span>
              <span id="pct3-res" class="px-3 py-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-base bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">+25%</span>
            </div>
          </div>
        </div>
      `;

      const p1x = container.querySelector('#pct1-x');
      const p1y = container.querySelector('#pct1-y');
      const p1r = container.querySelector('#pct1-res');
      function calc1() {
        const x = parseFloat(p1x.value) || 0;
        const y = parseFloat(p1y.value) || 0;
        p1r.textContent = ((x / 100) * y).toLocaleString(undefined, { maximumFractionDigits: 4 });
      }
      p1x.addEventListener('input', calc1);
      p1y.addEventListener('input', calc1);

      const p2x = container.querySelector('#pct2-x');
      const p2y = container.querySelector('#pct2-y');
      const p2r = container.querySelector('#pct2-res');
      function calc2() {
        const x = parseFloat(p2x.value) || 0;
        const y = parseFloat(p2y.value) || 0;
        if (y === 0) { p2r.textContent = '0%'; return; }
        p2r.textContent = ((x / y) * 100).toFixed(2) + '%';
      }
      p2x.addEventListener('input', calc2);
      p2y.addEventListener('input', calc2);

      const p3x = container.querySelector('#pct3-x');
      const p3y = container.querySelector('#pct3-y');
      const p3r = container.querySelector('#pct3-res');
      function calc3() {
        const x = parseFloat(p3x.value) || 0;
        const y = parseFloat(p3y.value) || 0;
        if (x === 0) { p3r.textContent = '0%'; return; }
        const diff = ((y - x) / x) * 100;
        const sign = diff > 0 ? '+' : '';
        p3r.textContent = `${sign}${diff.toFixed(2)}%`;
        p3r.className = diff >= 0
          ? 'px-3 py-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-base bg-emerald-50 dark:bg-emerald-950/40 rounded-lg'
          : 'px-3 py-1.5 font-bold text-rose-600 dark:text-rose-400 text-base bg-rose-50 dark:bg-rose-950/40 rounded-lg';
      }
      p3x.addEventListener('input', calc3);
      p3y.addEventListener('input', calc3);
    },
    seoContent: {
      overview: "The OmniTools Percentage Calculator handles all three common percentage problem variations in one simple screen. Quickly calculate sales tax, discounts, tips, margins, growth rates, and test scores with real-time recalculation.",
      features: ["Three interactive mathematical calculation models", "Calculates percent change with color-coded indicators", "Supports decimals and negative quantities"],
      howTo: ["Pick the percentage equation that matches your calculation goal.", "Enter your numbers into the input boxes.", "The answer updates immediately."],
      faqs: [{ q: "How do you calculate percentage increase or decrease?", a: "((New - Old) / Old) * 100." }]
    }
  },

  // 52. Discount & Sales Tax Calculator
  {
    id: "discount-tax-calculator",
    title: "What will this cost after the discount and tax?",
    category: "Everyday Math & Converters",
    icon: "🏷️",
    badge: "New",
    description: "Enter the price, the percent off, and the tax rate. You see what you pay.",
    keywords: ["discount calculator", "sales tax calculator", "sale price", "tax savings", "shopping calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Original Price ($)</label>
              <input type="number" id="dt-price" value="120" min="0" step="0.01" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Discount (%)</label>
              <input type="number" id="dt-disc" value="25" min="0" max="100" step="1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Sales Tax (%)</label>
              <input type="number" id="dt-tax" value="8.5" min="0" step="0.1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Discount Savings</span>
              <div id="dt-savings" class="text-xl font-bold text-emerald-600 dark:text-emerald-400">$30.00</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Discounted Price</span>
              <div id="dt-subtotal" class="text-xl font-bold text-slate-800 dark:text-slate-200">$90.00</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Sales Tax Amount</span>
              <div id="dt-taxamt" class="text-xl font-bold text-slate-800 dark:text-slate-200">$7.65</div>
            </div>
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Final Total Price</span>
              <div id="dt-total" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$97.65</div>
            </div>
          </div>
        </div>
      `;

      const priceIn = container.querySelector('#dt-price');
      const discIn = container.querySelector('#dt-disc');
      const taxIn = container.querySelector('#dt-tax');
      const savingsEl = container.querySelector('#dt-savings');
      const subtotalEl = container.querySelector('#dt-subtotal');
      const taxAmtEl = container.querySelector('#dt-taxamt');
      const totalEl = container.querySelector('#dt-total');

      function update() {
        const price = Math.max(0, parseFloat(priceIn.value) || 0);
        const disc = Math.max(0, Math.min(100, parseFloat(discIn.value) || 0));
        const tax = Math.max(0, parseFloat(taxIn.value) || 0);

        const savings = (price * disc) / 100;
        const subtotal = price - savings;
        const taxAmt = (subtotal * tax) / 100;
        const total = subtotal + taxAmt;

        savingsEl.textContent = `$${savings.toFixed(2)}`;
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        taxAmtEl.textContent = `$${taxAmt.toFixed(2)}`;
        totalEl.textContent = `$${total.toFixed(2)}`;
      }

      priceIn.addEventListener('input', update);
      discIn.addEventListener('input', update);
      taxIn.addEventListener('input', update);
      update();
    },
    seoContent: {
      overview: "Compute accurate shopping discounts and state/local sales tax in seconds. Determine your exact savings before heading to checkout.",
      features: ["Combined discount and sales tax formula", "Itemized savings and tax amounts", "Instant responsive updates"],
      howTo: ["Input retail price.", "Input discount and tax percentages.", "Review your final total."],
      faqs: [{ q: "Is sales tax calculated before or after discounts?", a: "In most jurisdictions, sales tax is calculated on the discounted subtotal price." }]
    }
  },

  // 53. Tip & Bill Splitter
  {
    id: "tip-splitter-calculator",
    title: "How much does each person owe?",
    category: "Everyday Math & Converters",
    icon: "💵",
    badge: "New",
    description: "Enter the bill, the tip, and how many people. You see each share.",
    keywords: ["tip calculator", "bill splitter", "split check", "restaurant tip", "gratuity calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Bill Amount ($)</label>
              <input type="number" id="tb-bill" value="85.00" min="0" step="0.01" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Tip Percentage (%)</label>
              <input type="number" id="tb-tip" value="18" min="0" step="1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Number of People</label>
              <input type="number" id="tb-people" value="3" min="1" step="1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
          </div>

          <div class="flex flex-wrap gap-2 text-xs">
            <button data-tip="10" class="tb-preset px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">10%</button>
            <button data-tip="15" class="tb-preset px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">15%</button>
            <button data-tip="18" class="tb-preset px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">18% (Standard)</button>
            <button data-tip="20" class="tb-preset px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">20% (Great)</button>
            <button data-tip="25" class="tb-preset px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-indigo-50">25% (Exceptional)</button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Tip</span>
              <div id="tb-tot-tip" class="text-xl font-bold text-slate-800 dark:text-slate-200">$15.30</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Bill</span>
              <div id="tb-tot-bill" class="text-xl font-bold text-slate-800 dark:text-slate-200">$100.30</div>
            </div>
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Tip Per Person</span>
              <div id="tb-per-tip" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">$5.10</div>
            </div>
            <div class="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span class="text-[10px] uppercase font-bold text-emerald-600 block mb-1">Total Per Person</span>
              <div id="tb-per-bill" class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$33.43</div>
            </div>
          </div>
        </div>
      `;

      const billIn = container.querySelector('#tb-bill');
      const tipIn = container.querySelector('#tb-tip');
      const peopleIn = container.querySelector('#tb-people');
      const totTip = container.querySelector('#tb-tot-tip');
      const totBill = container.querySelector('#tb-tot-bill');
      const perTip = container.querySelector('#tb-per-tip');
      const perBill = container.querySelector('#tb-per-bill');

      function update() {
        const bill = Math.max(0, parseFloat(billIn.value) || 0);
        const tipPct = Math.max(0, parseFloat(tipIn.value) || 0);
        const people = Math.max(1, parseInt(peopleIn.value, 10) || 1);

        const tipAmount = (bill * tipPct) / 100;
        const total = bill + tipAmount;

        totTip.textContent = `$${tipAmount.toFixed(2)}`;
        totBill.textContent = `$${total.toFixed(2)}`;
        perTip.textContent = `$${(tipAmount / people).toFixed(2)}`;
        perBill.textContent = `$${(total / people).toFixed(2)}`;
      }

      billIn.addEventListener('input', update);
      tipIn.addEventListener('input', update);
      peopleIn.addEventListener('input', update);
      container.querySelectorAll('.tb-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          tipIn.value = btn.getAttribute('data-tip');
          update();
        });
      });
      update();
    },
    seoContent: {
      overview: "Calculate exact tip amounts and divide dining checks easily among any number of guests with custom gratuity options.",
      features: ["Preset tip buttons (10%, 15%, 18%, 20%, 25%)", "Instant per-person breakdown", "Mobile friendly for quick restaurant use"],
      howTo: ["Enter total bill amount.", "Select tip percentage.", "Input number of diners to split."],
      faqs: [{ q: "What is the standard US restaurant tip percentage?", a: "Standard tip rates in the United States typically range between 15% and 20% for good service." }]
    }
  },

  // 54. Length Converter (Metric / Imperial)
  {
    id: "length-converter",
    title: "How many feet is 180 centimeters?",
    category: "Everyday Math & Converters",
    icon: "📏",
    badge: "New",
    description: "Type the number and pick the units.",
    keywords: ["length converter", "metric to imperial", "meters to feet", "inches to cm", "distance converter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Value</label>
              <input type="number" id="lc-val" value="10" step="any" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">From Unit</label>
              <select id="lc-unit" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="m">Meters (m)</option>
                <option value="km">Kilometers (km)</option>
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="in">Inches (in)</option>
                <option value="ft">Feet (ft)</option>
                <option value="yd">Yards (yd)</option>
                <option value="mi">Miles (mi)</option>
                <option value="nmi">Nautical Miles (NM)</option>
              </select>
            </div>
          </div>

          <div id="lc-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2.5"></div>
        </div>
      `;

      // Conversion rates relative to 1 meter
      const toMeters = {
        m: 1, km: 1000, cm: 0.01, mm: 0.001,
        in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344, nmi: 1852
      };

      const valIn = container.querySelector('#lc-val');
      const unitSelect = container.querySelector('#lc-unit');
      const grid = container.querySelector('#lc-grid');

      function update() {
        const val = parseFloat(valIn.value) || 0;
        const from = unitSelect.value;
        const meters = val * toMeters[from];

        const units = [
          { id: 'm', label: 'Meters (m)' },
          { id: 'km', label: 'Kilometers (km)' },
          { id: 'cm', label: 'Centimeters (cm)' },
          { id: 'mm', label: 'Millimeters (mm)' },
          { id: 'ft', label: 'Feet (ft)' },
          { id: 'in', label: 'Inches (in)' },
          { id: 'yd', label: 'Yards (yd)' },
          { id: 'mi', label: 'Miles (mi)' },
          { id: 'nmi', label: 'Nautical Miles (NM)' }
        ];

        grid.innerHTML = units.map(u => {
          const converted = meters / toMeters[u.id];
          const formatted = converted < 0.0001 || converted > 100000 ? converted.toExponential(4) : converted.toLocaleString(undefined, { maximumFractionDigits: 4 });
          return `
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">${u.label}</span>
              <div class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate">${formatted}</div>
            </div>
          `;
        }).join('');
      }

      valIn.addEventListener('input', update);
      unitSelect.addEventListener('change', update);
      update();
    },
    seoContent: {
      overview: "Comprehensive metric and imperial distance conversion dashboard for engineers, travelers, and construction projects.",
      features: ["Simultaneous conversion across 9 length units", "Handles scientific notation for microscopic or astronomical scales", "Standard international conversion factors"],
      howTo: ["Input number and choose base unit.", "Read converted units on the live dashboard."],
      faqs: [{ q: "How many feet are in a meter?", a: "1 meter is approximately equal to 3.28084 feet." }]
    }
  },

  // 55. Weight & Mass Converter
  {
    id: "weight-converter",
    title: "How many pounds is 70 kilograms?",
    category: "Everyday Math & Converters",
    icon: "⚖️",
    badge: "New",
    description: "Type the number and pick the units.",
    keywords: ["weight converter", "mass converter", "kg to lbs", "pounds to kilograms", "grams to ounces"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Weight Value</label>
              <input type="number" id="wc2-val" value="70" step="any" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Unit</label>
              <select id="wc2-unit" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="kg">Kilograms (kg)</option>
                <option value="g">Grams (g)</option>
                <option value="mg">Milligrams (mg)</option>
                <option value="lb">Pounds (lbs)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="st">Stones (st)</option>
                <option value="ton">Metric Tons (t)</option>
              </select>
            </div>
          </div>

          <div id="wc2-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2.5"></div>
        </div>
      `;

      // Rates relative to 1 kilogram
      const toKg = {
        kg: 1, g: 0.001, mg: 0.000001, ton: 1000,
        lb: 0.45359237, oz: 0.028349523125, st: 6.35029318
      };

      const valIn = container.querySelector('#wc2-val');
      const unitSelect = container.querySelector('#wc2-unit');
      const grid = container.querySelector('#wc2-grid');

      function update() {
        const val = parseFloat(valIn.value) || 0;
        const from = unitSelect.value;
        const kg = val * toKg[from];

        const units = [
          { id: 'kg', label: 'Kilograms (kg)' },
          { id: 'lb', label: 'Pounds (lbs)' },
          { id: 'g', label: 'Grams (g)' },
          { id: 'oz', label: 'Ounces (oz)' },
          { id: 'st', label: 'Stones (st)' },
          { id: 'ton', label: 'Metric Tons (t)' }
        ];

        grid.innerHTML = units.map(u => {
          const converted = kg / toKg[u.id];
          return `
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">${u.label}</span>
              <div class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate">${converted.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
            </div>
          `;
        }).join('');
      }

      valIn.addEventListener('input', update);
      unitSelect.addEventListener('change', update);
      update();
    },
    seoContent: {
      overview: "Convert weight measurements between metric and imperial scales for fitness tracking, cooking recipes, and shipping calculations.",
      features: ["Simultaneous multi-unit updates", "Exact conversion factors for pounds, kilograms, and ounces", "Zero latency calculations"],
      howTo: ["Enter weight quantity and choose starting unit.", "Review converted units instantly."],
      faqs: [{ q: "How many pounds are in 1 kilogram?", a: "1 kilogram is equal to approximately 2.20462 pounds." }]
    }
  },

  // 56. Temperature Converter (°C, °F, K)
  {
    id: "temperature-converter",
    title: "What is 180°C in Fahrenheit?",
    category: "Everyday Math & Converters",
    icon: "🌡️",
    badge: "New",
    description: "Type the temperature. Celsius, Fahrenheit, and Kelvin update together.",
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Celsius (°C)</label>
              <input type="number" id="tc-c" value="25" step="0.1" class="w-full p-2 font-mono text-xl font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400">
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Fahrenheit (°F)</label>
              <input type="number" id="tc-f" value="77" step="0.1" class="w-full p-2 font-mono text-xl font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400">
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Kelvin (K)</label>
              <input type="number" id="tc-k" value="298.15" step="0.1" class="w-full p-2 font-mono text-xl font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400">
            </div>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2 text-xs">
            <span class="font-bold text-slate-700 dark:text-slate-300 block mb-1">Physical Reference Benchmarks</span>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div class="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block">Water Freezes</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">0°C / 32°F</span>
              </div>
              <div class="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block">Room Temp</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">20°C / 68°F</span>
              </div>
              <div class="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block">Body Temp</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">37°C / 98.6°F</span>
              </div>
              <div class="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block">Water Boils</span>
                <span class="font-semibold text-slate-800 dark:text-slate-200">100°C / 212°F</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const cIn = container.querySelector('#tc-c');
      const fIn = container.querySelector('#tc-f');
      const kIn = container.querySelector('#tc-k');

      cIn.addEventListener('input', () => {
        const c = parseFloat(cIn.value);
        if (isNaN(c)) return;
        fIn.value = ((c * 9/5) + 32).toFixed(2);
        kIn.value = (c + 273.15).toFixed(2);
      });

      fIn.addEventListener('input', () => {
        const f = parseFloat(fIn.value);
        if (isNaN(f)) return;
        const c = (f - 32) * 5/9;
        cIn.value = c.toFixed(2);
        kIn.value = (c + 273.15).toFixed(2);
      });

      kIn.addEventListener('input', () => {
        const k = parseFloat(kIn.value);
        if (isNaN(k)) return;
        const c = k - 273.15;
        cIn.value = c.toFixed(2);
        fIn.value = ((c * 9/5) + 32).toFixed(2);
      });
    },
    seoContent: {
      overview: "Real-time three-way temperature converter connecting Celsius, Fahrenheit, and scientific Kelvin scales.",
      features: ["Interactive linked temperature inputs", "Physical reference points for water and human body", "Accurate thermodynamic formulas"],
      howTo: ["Type temperature into any of the three boxes.", "The other two units recalculate automatically."],
      faqs: [{ q: "What temperature is equal in Celsius and Fahrenheit?", a: "-40° Celsius is exactly equal to -40° Fahrenheit." }]
    }
  },

  // 57. Data Storage Converter (Bytes to TB)
  {
    id: "data-storage-converter",
    title: "How many GB is 500 MB?",
    category: "Everyday Math & Converters",
    icon: "💾",
    badge: "New",
    description: "Type the size. Bytes through terabytes, including GiB and MiB.",
    keywords: ["data storage converter", "bytes to gb", "mb to gb", "gib to gb", "file size calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Size Value</label>
              <input type="number" id="dsc-val" value="500" step="any" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Unit</label>
              <select id="dsc-unit" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="gb">Gigabytes (GB - 10^9)</option>
                <option value="mb">Megabytes (MB - 10^6)</option>
                <option value="tb">Terabytes (TB - 10^12)</option>
                <option value="b">Bytes (B)</option>
                <option value="kb">Kilobytes (KB - 10^3)</option>
                <option value="gib">Gibibytes (GiB - 2^30)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="dsc-grid"></div>
        </div>
      `;

      const valIn = container.querySelector('#dsc-val');
      const unitSelect = container.querySelector('#dsc-unit');
      const grid = container.querySelector('#dsc-grid');

      const toBytes = {
        b: 1,
        kb: 1e3, mb: 1e6, gb: 1e9, tb: 1e12, pb: 1e15,
        kib: 1024, mib: 1024**2, gib: 1024**3, tib: 1024**4
      };

      function update() {
        const val = parseFloat(valIn.value) || 0;
        const from = unitSelect.value;
        const bytes = val * toBytes[from];

        const units = [
          { id: 'b', label: 'Bytes (B)' },
          { id: 'kb', label: 'Kilobytes (KB)' },
          { id: 'mb', label: 'Megabytes (MB)' },
          { id: 'gb', label: 'Gigabytes (GB)' },
          { id: 'tb', label: 'Terabytes (TB)' },
          { id: 'gib', label: 'Gibibytes (GiB - OS)' }
        ];

        grid.innerHTML = units.map(u => {
          const converted = bytes / toBytes[u.id];
          return `
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">${u.label}</span>
              <div class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate">${converted.toLocaleString(undefined, { maximumFractionDigits: 3 })}</div>
            </div>
          `;
        }).join('');
      }

      valIn.addEventListener('input', update);
      unitSelect.addEventListener('change', update);
      update();
    },
    seoContent: {
      overview: "Convert storage and file sizes between standard decimal (SI) and binary (IEC) computing units.",
      features: ["Covers Bytes through Terabytes", "Compares marketing storage (GB) vs actual Windows capacity (GiB)", "High precision decimal calculations"],
      howTo: ["Input file or drive size.", "Choose source unit.", "Read exact sizes across all storage formats."],
      faqs: [{ q: "Why is a 1TB hard drive only 931 GB in Windows?", a: "Manufacturers sell drives using decimal gigabytes (10^9 bytes), while Windows calculates using binary gibibytes (2^30 bytes)." }]
    }
  },

  // 58. Speed Converter (mph, km/h, m/s)
  {
    id: "speed-converter",
    title: "What is 60 mph in km/h?",
    category: "Everyday Math & Converters",
    icon: "🏎️",
    badge: "New",
    description: "Type the speed. Miles, kilometers, meters per second, and knots update together.",
    keywords: ["speed converter", "mph to kmh", "km/h to mph", "knots to mph", "velocity converter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Speed Value</label>
              <input type="number" id="sc-val" value="65" step="any" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Unit</label>
              <select id="sc-unit" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <option value="mph">Miles per Hour (mph)</option>
                <option value="kmh">Kilometers per Hour (km/h)</option>
                <option value="ms">Meters per Second (m/s)</option>
                <option value="kn">Knots (kn)</option>
                <option value="fts">Feet per Second (ft/s)</option>
              </select>
            </div>
          </div>

          <div id="sc-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2.5"></div>
        </div>
      `;

      // Rates relative to 1 m/s
      const toMs = {
        ms: 1, kmh: 1 / 3.6, mph: 0.44704, kn: 0.514444, fts: 0.3048
      };

      const valIn = container.querySelector('#sc-val');
      const unitSelect = container.querySelector('#sc-unit');
      const grid = container.querySelector('#sc-grid');

      function update() {
        const val = parseFloat(valIn.value) || 0;
        const from = unitSelect.value;
        const ms = val * toMs[from];

        const units = [
          { id: 'mph', label: 'Miles / Hour (mph)' },
          { id: 'kmh', label: 'Kilometers / Hour (km/h)' },
          { id: 'ms', label: 'Meters / Second (m/s)' },
          { id: 'kn', label: 'Knots (kn)' },
          { id: 'fts', label: 'Feet / Second (ft/s)' }
        ];

        grid.innerHTML = units.map(u => {
          const converted = ms / toMs[u.id];
          return `
            <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">${u.label}</span>
              <div class="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 truncate">${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            </div>
          `;
        }).join('');
      }

      valIn.addEventListener('input', update);
      unitSelect.addEventListener('change', update);
      update();
    },
    seoContent: {
      overview: "Convert velocity across metric, imperial, and maritime nautical speed units.",
      features: ["Instant conversion for driving, running, and aviation", "Covers knots, mph, km/h, and m/s", "High precision output"],
      howTo: ["Enter speed and select starting unit.", "View live table of speed equivalents."],
      faqs: [{ q: "What is 1 knot in mph?", a: "1 knot equals 1 nautical mile per hour, or approximately 1.15078 statute mph." }]
    }
  },

  // 59. Time Zone Converter & World Clock
  {
    id: "timezone-converter",
    title: "What time is 9am New York in Seoul?",
    category: "Everyday Math & Converters",
    icon: "🌐",
    badge: "New",
    description: "Pick the two places. You see both clocks.",
    keywords: ["timezone converter", "world clock", "utc to est", "pst to est", "time difference"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <label class="block text-xs font-semibold text-slate-500 mb-1">Select Base Time</label>
            <input type="datetime-local" id="tz-input" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          </div>

          <div id="tz-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"></div>
        </div>
      `;

      const input = container.querySelector('#tz-input');
      const grid = container.querySelector('#tz-grid');

      const zones = [
        { name: "UTC / GMT", zone: "UTC" },
        { name: "New York (EST/EDT)", zone: "America/New_York" },
        { name: "San Francisco (PST/PDT)", zone: "America/Los_Angeles" },
        { name: "London (GMT/BST)", zone: "Europe/London" },
        { name: "Paris / Berlin (CET)", zone: "Europe/Paris" },
        { name: "Tokyo (JST)", zone: "Asia/Tokyo" },
        { name: "Sydney (AEST/AEDT)", zone: "Australia/Sydney" },
        { name: "New Delhi (IST)", zone: "Asia/Kolkata" }
      ];

      function update() {
        const d = input.value ? new Date(input.value) : new Date();

        grid.innerHTML = zones.map(z => {
          const timeStr = d.toLocaleTimeString('en-US', { timeZone: z.zone, hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const dateStr = d.toLocaleDateString('en-US', { timeZone: z.zone, month: 'short', day: 'numeric', weekday: 'short' });
          return `
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] font-bold uppercase text-slate-400 block">${z.name}</span>
              <div class="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">${timeStr}</div>
              <span class="text-xs text-slate-500 block mt-0.5">${dateStr}</span>
            </div>
          `;
        }).join('');
      }

      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      input.value = now.toISOString().slice(0, 16);

      input.addEventListener('input', update);
      update();
    },
    seoContent: {
      overview: "Plan meetings across distributed international teams with a synchronized multi-time-zone clock.",
      features: ["Real-time world clocks for NYC, London, Tokyo, Paris, Sydney", "Daylight Saving Time (DST) automatic compensation", "Interactive base datetime selector"],
      howTo: ["Pick date and time.", "Read the converted local time in each major world city."],
      faqs: [{ q: "Does this handle Daylight Saving Time?", a: "Yes, the browser's native Intl API automatically applies regional DST rules." }]
    }
  },

  // 60. Epoch / Unix Timestamp to Human Date
  {
    id: "timestamp-converter",
    title: "What time is this Unix timestamp?",
    category: "Everyday Math & Converters",
    icon: "⏰",
    badge: "Essential",
    description: "Paste the number from the log. You see the date.",
    keywords: ["unix timestamp", "epoch converter", "timestamp to date", "current timestamp", "epoch time"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Current Unix Epoch Time:</span>
              <div id="epoch-current" class="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">0</div>
            </div>
            <button id="epoch-copy-now" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition">Copy Current</button>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Timestamp to Date</label>
            <div class="flex gap-2">
              <input id="ts-in" type="number" class="w-full p-2.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200" placeholder="e.g. 1700000000">
              <button id="ts-convert-btn" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition">Convert</button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 block mb-0.5">GMT / UTC Date:</span>
                <span id="ts-out-utc" class="font-mono font-semibold text-slate-800 dark:text-slate-200">-</span>
              </div>
              <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-500 dark:text-slate-400 block mb-0.5">Your Local Time:</span>
                <span id="ts-out-local" class="font-mono font-semibold text-slate-800 dark:text-slate-200">-</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const currentEl = container.querySelector('#epoch-current');
      const tsIn = container.querySelector('#ts-in');
      const tsUtc = container.querySelector('#ts-out-utc');
      const tsLocal = container.querySelector('#ts-out-local');

      const interval = setInterval(() => {
        if (!document.body.contains(currentEl)) { clearInterval(interval); return; }
        currentEl.textContent = Math.floor(Date.now() / 1000);
      }, 1000);
      currentEl.textContent = Math.floor(Date.now() / 1000);

      container.querySelector('#epoch-copy-now').addEventListener('click', () => Utils.copyToClipboard(currentEl.textContent));

      function convertTimestamp() {
        let val = parseInt(tsIn.value, 10);
        if (isNaN(val)) return;
        if (val < 10000000000) val *= 1000;
        const d = new Date(val);
        tsUtc.textContent = d.toUTCString();
        tsLocal.textContent = d.toString();
      }

      tsIn.value = Math.floor(Date.now() / 1000);
      convertTimestamp();
      tsIn.addEventListener('input', convertTimestamp);
      container.querySelector('#ts-convert-btn').addEventListener('click', convertTimestamp);
    },
    seoContent: {
      overview: "Transforms 10-digit second timestamps and 13-digit millisecond timestamps into local and UTC dates with a live epoch ticker.",
      features: ["Active real-time live epoch ticker", "Auto-detection of seconds vs milliseconds", "UTC and local offsets"],
      howTo: ["Paste Unix timestamp to decode date.", "Copy current epoch timestamp."],
      faqs: [{ q: "What is epoch time?", a: "Epoch time is the number of seconds elapsed since January 1, 1970 UTC." }]
    }
  },

  // 61. Human Date to Unix Timestamp
  {
    id: "human-date-to-unix",
    title: "What is this date as a Unix timestamp?",
    category: "Everyday Math & Converters",
    icon: "📅",
    badge: "New",
    description: "Pick the date and time. You get seconds and milliseconds.",
    keywords: ["date to unix", "date to timestamp", "convert date to epoch", "epoch generator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Pick Date and Time</label>
            <input type="datetime-local" id="d2u-input" class="w-full p-3 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-indigo-500 uppercase">Unix Timestamp (Seconds)</span>
                <button id="d2u-copy-sec" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <div id="d2u-sec" class="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">0</div>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-slate-500 uppercase">Milliseconds (13 digits)</span>
                <button id="d2u-copy-ms" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Copy</button>
              </div>
              <div id="d2u-ms" class="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">0</div>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#d2u-input');
      const secEl = container.querySelector('#d2u-sec');
      const msEl = container.querySelector('#d2u-ms');

      function update() {
        const val = input.value;
        if (!val) return;
        const d = new Date(val);
        const ms = d.getTime();
        secEl.textContent = Math.floor(ms / 1000);
        msEl.textContent = ms;
      }

      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      input.value = now.toISOString().slice(0, 16);
      update();

      input.addEventListener('input', update);
      container.querySelector('#d2u-copy-sec').addEventListener('click', () => Utils.copyToClipboard(secEl.textContent));
      container.querySelector('#d2u-copy-ms').addEventListener('click', () => Utils.copyToClipboard(msEl.textContent));
    },
    seoContent: {
      overview: "Select any calendar date and instant to generate exact 10-digit and 13-digit Unix timestamps for databases and APIs.",
      features: ["Interactive date-time picker", "Generates standard seconds and milliseconds", "1-click copy"],
      howTo: ["Select date from the picker.", "Copy the generated timestamp."],
      faqs: [{ q: "Why do some timestamps have 13 digits?", a: "JavaScript and modern databases often use millisecond timestamps (13 digits) rather than seconds (10 digits)." }]
    }
  },

  // 62. Age & Days Alive Calculator
  {
    id: "age-calculator",
    title: "How old am I in days?",
    category: "Everyday Math & Converters",
    icon: "🎂",
    badge: "New",
    description: "Enter the birthday. You see years, months, days, and the next birthday.",
    keywords: ["age calculator", "days alive calculator", "birthday countdown", "how old am i", "calculate age"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">Select Date of Birth</label>
            <input type="date" id="ac-dob" class="w-full p-3 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" value="1998-05-15">
          </div>

          <div class="p-6 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/30 text-center">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">Exact Age</span>
            <div id="ac-main" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-tight">28 years, 3 months, 25 days</div>
            <div id="ac-countdown" class="text-xs text-slate-500 mt-2 font-medium">Next birthday in: 120 days</div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Days Alive</span>
              <div id="ac-days" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">10,345</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Weeks</span>
              <div id="ac-weeks" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">1,477</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Hours</span>
              <div id="ac-hours" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">248,280</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Heartbeats</span>
              <div id="ac-hearts" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">~1.07 B</div>
            </div>
          </div>
        </div>
      `;

      const dobIn = container.querySelector('#ac-dob');
      const mainEl = container.querySelector('#ac-main');
      const cdEl = container.querySelector('#ac-countdown');
      const daysEl = container.querySelector('#ac-days');
      const weeksEl = container.querySelector('#ac-weeks');
      const hoursEl = container.querySelector('#ac-hours');
      const heartsEl = container.querySelector('#ac-hearts');

      function calculate() {
        const val = dobIn.value;
        if (!val) return;

        const birth = new Date(val);
        const now = new Date();

        if (birth > now) {
          mainEl.textContent = "Date is in the future!";
          return;
        }

        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prevMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        mainEl.textContent = `${years} years, ${months} months, ${days} days`;

        const diffMs = now.getTime() - birth.getTime();
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        daysEl.textContent = totalDays.toLocaleString();
        weeksEl.textContent = Math.floor(totalDays / 7).toLocaleString();
        hoursEl.textContent = (totalDays * 24).toLocaleString();
        heartsEl.textContent = `~${((totalDays * 24 * 60 * 75) / 1e9).toFixed(2)} B`;

        // Next birthday
        let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
        const daysToBday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        cdEl.textContent = daysToBday === 0 ? "🎉 Happy Birthday Today!" : `Next birthday in: ${daysToBday} day(s)`;
      }

      dobIn.addEventListener('input', calculate);
      calculate();
    },
    seoContent: {
      overview: "Determine your exact age down to the day, total days alive on earth, and countdown to your next birthday.",
      features: ["Precision years, months, and days calculation", "Next birthday countdown", "Cumulative lifetime metrics (hours, weeks, heartbeats)"],
      howTo: ["Select date of birth from calendar.", "Inspect exact age breakdown."],
      faqs: [{ q: "How is heartbeats estimated?", a: "Using an average resting human heart rate of 75 beats per minute." }]
    }
  },

  // 63. Date Difference Calculator
  {
    id: "date-difference-calculator",
    title: "How many days are there between these dates?",
    category: "Everyday Math & Converters",
    icon: "📆",
    badge: "New",
    description: "Pick the start and the end. You see days, weeks, and weekdays.",
    keywords: ["date difference", "days between dates", "duration calculator", "business days calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Start Date</label>
              <input type="date" id="dd-start" class="w-full p-2.5 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">End Date</label>
              <input type="date" id="dd-end" class="w-full p-2.5 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
          </div>

          <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 text-center">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">Duration</span>
            <div id="dd-summary" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0 days</div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Calendar Days</span>
              <div id="dd-days" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">0</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Business Days</span>
              <div id="dd-biz" class="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">0</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Weeks</span>
              <div id="dd-weeks" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">0</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Weekend Days</span>
              <div id="dd-weekends" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">0</div>
            </div>
          </div>
        </div>
      `;

      const startIn = container.querySelector('#dd-start');
      const endIn = container.querySelector('#dd-end');
      const sumEl = container.querySelector('#dd-summary');
      const daysEl = container.querySelector('#dd-days');
      const bizEl = container.querySelector('#dd-biz');
      const weeksEl = container.querySelector('#dd-weeks');
      const wkndEl = container.querySelector('#dd-weekends');

      function calculate() {
        const s = new Date(startIn.value);
        const e = new Date(endIn.value);
        if (isNaN(s.getTime()) || isNaN(e.getTime())) return;

        const diffTime = Math.abs(e.getTime() - s.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let cur = new Date(Math.min(s.getTime(), e.getTime()));
        const target = new Date(Math.max(s.getTime(), e.getTime()));
        let bizDays = 0;
        let weekends = 0;

        while (cur < target) {
          const dayOfWeek = cur.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) weekends++;
          else bizDays++;
          cur.setDate(cur.getDate() + 1);
        }

        sumEl.textContent = `${totalDays} calendar days (${bizDays} business days)`;
        daysEl.textContent = totalDays.toLocaleString();
        bizEl.textContent = bizDays.toLocaleString();
        weeksEl.textContent = (totalDays / 7).toFixed(1);
        wkndEl.textContent = weekends.toLocaleString();
      }

      const today = new Date();
      const future = new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000);
      startIn.value = today.toISOString().slice(0, 10);
      endIn.value = future.toISOString().slice(0, 10);
      calculate();

      startIn.addEventListener('input', calculate);
      endIn.addEventListener('input', calculate);
    },
    seoContent: {
      overview: "Compute the duration between any two dates, including calendar days, weekends, and working business days.",
      features: ["Excludes weekends for accurate business days", "Displays weeks and calendar days", "Instant calculation"],
      howTo: ["Select Start Date and End Date.", "Review total elapsed days and working days."],
      faqs: [{ q: "What defines a business day?", a: "Monday through Friday (5 days per week), excluding Saturdays and Sundays." }]
    }
  },

  // 64. Aspect Ratio Scaler (16:9, 4:3, etc.)
  {
    id: "aspect-ratio-calculator",
    title: "What height keeps this at 16:9?",
    category: "Everyday Math & Converters",
    icon: "📐",
    badge: "Popular",
    description: "Enter the width or the height. The other side stays in ratio.",
    keywords: ["aspect ratio calculator", "16:9 calculator", "image scale", "proportional scale", "resolution scaler"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <button data-ratio="16:9" class="ar-preset px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition">16:9 (Widescreen)</button>
            <button data-ratio="4:3" class="ar-preset px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition">4:3 (Standard)</button>
            <button data-ratio="1:1" class="ar-preset px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition">1:1 (Square)</button>
            <button data-ratio="21:9" class="ar-preset px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition">21:9 (Ultrawide)</button>
            <button data-ratio="9:16" class="ar-preset px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition">9:16 (TikTok/Reels)</button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
            <div>
              <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Ratio Width (W1)</label>
              <input id="ar-w1" type="number" value="16" class="w-full p-2.5 text-center font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Ratio Height (H1)</label>
              <input id="ar-h1" type="number" value="9" class="w-full p-2.5 text-center font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Target Width (W2)</label>
              <input id="ar-w2" type="number" value="1920" class="w-full p-2.5 text-center font-semibold rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            </div>
            <div>
              <label class="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Target Height (H2)</label>
              <input id="ar-h2" type="number" value="1080" class="w-full p-2.5 text-center font-semibold rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            </div>
          </div>

          <div class="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center min-h-[160px]">
            <div id="ar-preview-box" class="border-2 border-dashed border-indigo-500 bg-indigo-100/50 dark:bg-indigo-950/50 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 transition-all max-w-full" style="width: 240px; height: 135px;">
              1920 × 1080 (16:9)
            </div>
          </div>
        </div>
      `;

      const w1 = container.querySelector('#ar-w1');
      const h1 = container.querySelector('#ar-h1');
      const w2 = container.querySelector('#ar-w2');
      const h2 = container.querySelector('#ar-h2');
      const box = container.querySelector('#ar-preview-box');

      function updateFromW2() {
        const rW = parseFloat(w1.value) || 16;
        const rH = parseFloat(h1.value) || 9;
        const width = parseFloat(w2.value) || 0;
        const height = Math.round((width / rW) * rH);
        h2.value = height;
        updatePreview(width, height, rW, rH);
      }

      function updateFromH2() {
        const rW = parseFloat(w1.value) || 16;
        const rH = parseFloat(h1.value) || 9;
        const height = parseFloat(h2.value) || 0;
        const width = Math.round((height / rH) * rW);
        w2.value = width;
        updatePreview(width, height, rW, rH);
      }

      function updatePreview(width, height, rW, rH) {
        box.textContent = `${width} × ${height} (${rW}:${rH})`;
        const maxBoxW = 260;
        const maxBoxH = 140;
        let pW = maxBoxW;
        let pH = (maxBoxW / rW) * rH;
        if (pH > maxBoxH) {
          pH = maxBoxH;
          pW = (maxBoxH / rH) * rW;
        }
        box.style.width = `${Math.round(pW)}px`;
        box.style.height = `${Math.round(pH)}px`;
      }

      w1.addEventListener('input', updateFromW2);
      h1.addEventListener('input', updateFromW2);
      w2.addEventListener('input', updateFromW2);
      h2.addEventListener('input', updateFromH2);

      container.querySelectorAll('.ar-preset').forEach(btn => {
        btn.addEventListener('click', () => {
          const [pw, ph] = btn.getAttribute('data-ratio').split(':');
          w1.value = pw;
          h1.value = ph;
          updateFromW2();
        });
      });

      updateFromW2();
    },
    seoContent: {
      overview: "The Aspect Ratio Scaler calculates proportional dimensions when resizing images, video clips, canvas elements, and web frames.",
      features: ["Presets for 16:9, 4:3, 1:1, 21:9, and 9:16 mobile formats", "Bi-directional height and width calculation", "Live responsive proportion box"],
      howTo: ["Pick a standard ratio preset or type custom ratio values.", "Type your target width or height.", "The corresponding dimension will scale automatically."],
      faqs: [{ q: "What is 16:9 resolution?", a: "16:9 is the standard aspect ratio for high-definition television and modern computer displays." }]
    }
  },

  // 65. Screen PPI / DPI Calculator
  {
    id: "ppi-calculator",
    title: "What is the PPI of this screen?",
    category: "Everyday Math & Converters",
    icon: "🖥️",
    badge: "New",
    description: "Enter the resolution and the diagonal size. You get pixels per inch.",
    keywords: ["ppi calculator", "dpi calculator", "pixels per inch", "screen density", "dot pitch calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Width (Pixels)</label>
              <input type="number" id="ppi-w" value="2560" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Height (Pixels)</label>
              <input type="number" id="ppi-h" value="1440" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Diagonal Size (Inches)</label>
              <input type="number" id="ppi-d" value="27" step="0.1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Pixel Density (PPI)</span>
              <div id="ppi-res" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">108.79</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Dot Pitch</span>
              <div id="ppi-pitch" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">0.2335 mm</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Pixels</span>
              <div id="ppi-pixels" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">3.69 MP</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Aspect Ratio</span>
              <div id="ppi-ratio" class="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">16:9</div>
            </div>
          </div>
        </div>
      `;

      const wIn = container.querySelector('#ppi-w');
      const hIn = container.querySelector('#ppi-h');
      const dIn = container.querySelector('#ppi-d');
      const ppiEl = container.querySelector('#ppi-res');
      const pitchEl = container.querySelector('#ppi-pitch');
      const pixelsEl = container.querySelector('#ppi-pixels');
      const ratioEl = container.querySelector('#ppi-ratio');

      function calculate() {
        const w = parseFloat(wIn.value) || 0;
        const h = parseFloat(hIn.value) || 0;
        const d = parseFloat(dIn.value) || 0;

        if (d === 0) return;

        const diagPx = Math.sqrt(w * w + h * h);
        const ppi = diagPx / d;
        const pitch = 25.4 / ppi;
        const totalMP = (w * h) / 1e6;

        ppiEl.textContent = ppi.toFixed(2);
        pitchEl.textContent = `${pitch.toFixed(4)} mm`;
        pixelsEl.textContent = `${totalMP.toFixed(2)} MP`;

        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
        const div = gcd(w, h);
        ratioEl.textContent = div ? `${w / div}:${h / div}` : '-';
      }

      wIn.addEventListener('input', calculate);
      hIn.addEventListener('input', calculate);
      dIn.addEventListener('input', calculate);
      calculate();
    },
    seoContent: {
      overview: "Calculate display sharpness, dot pitch, and pixels per inch (PPI) for monitors, smartphones, and tablets.",
      features: ["Calculates exact diagonal pixel count and dot pitch", "Calculates aspect ratio and megapixels", "Instant update"],
      howTo: ["Input horizontal and vertical resolution.", "Input diagonal size in inches.", "Review PPI."],
      faqs: [{ q: "What is considered a Retina display?", a: "Apple defines Retina displays as having around 220+ PPI for laptops and 300+ PPI for phones held at typical viewing distances." }]
    }
  },

  // 66. Compound Interest Calculator
  {
    id: "compound-interest-calculator",
    title: "How much will this grow?",
    category: "Everyday Math & Converters",
    icon: "📈",
    badge: "New",
    description: "Enter what you start with, what you add each month, and the rate. You see the balance.",
    keywords: ["compound interest calculator", "investment growth", "future value calculator", "compound interest formula"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Initial Deposit ($)</label>
              <input type="number" id="ci-principal" value="5000" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Monthly Add ($)</label>
              <input type="number" id="ci-monthly" value="200" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Interest Rate (%)</label>
              <input type="number" id="ci-rate" value="7.5" step="0.1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Years to Grow</label>
              <input type="number" id="ci-years" value="10" min="1" max="50" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div class="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20">
              <span class="text-xs font-bold text-emerald-600 uppercase block mb-1">Future Value</span>
              <div id="ci-future" class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">$45,820</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Total Principal</span>
              <div id="ci-contrib" class="text-xl font-bold text-slate-800 dark:text-slate-200">$29,000</div>
            </div>
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-xs font-bold text-indigo-600 uppercase block mb-1">Total Interest Earned</span>
              <div id="ci-interest" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">$16,820</div>
            </div>
          </div>
        </div>
      `;

      const pIn = container.querySelector('#ci-principal');
      const mIn = container.querySelector('#ci-monthly');
      const rIn = container.querySelector('#ci-rate');
      const yIn = container.querySelector('#ci-years');

      const futureEl = container.querySelector('#ci-future');
      const contribEl = container.querySelector('#ci-contrib');
      const interestEl = container.querySelector('#ci-interest');

      function update() {
        const principal = parseFloat(pIn.value) || 0;
        const monthly = parseFloat(mIn.value) || 0;
        const rate = (parseFloat(rIn.value) || 0) / 100;
        const years = parseInt(yIn.value, 10) || 1;

        const months = years * 12;
        const monthlyRate = rate / 12;

        let total = principal * Math.pow(1 + monthlyRate, months);
        if (monthlyRate > 0) {
          total += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        } else {
          total += monthly * months;
        }

        const totalContrib = principal + monthly * months;
        const totalInterest = Math.max(0, total - totalContrib);

        futureEl.textContent = `$${Math.round(total).toLocaleString()}`;
        contribEl.textContent = `$${Math.round(totalContrib).toLocaleString()}`;
        interestEl.textContent = `$${Math.round(totalInterest).toLocaleString()}`;
      }

      pIn.addEventListener('input', update);
      mIn.addEventListener('input', update);
      rIn.addEventListener('input', update);
      yIn.addEventListener('input', update);
      update();
    },
    seoContent: {
      overview: "Calculate the long-term wealth building effect of compound interest with periodic monthly contributions and reinvested returns.",
      features: ["Monthly recurring contribution modeling", "Separates invested principal from compound earnings", "Instant future balance projections"],
      howTo: ["Input initial deposit and monthly contributions.", "Set annual expected return and investment timeframe.", "Review projected balance."],
      faqs: [{ q: "What is compound interest?", a: "Compound interest is the interest calculated on the initial principal plus the accumulated interest from previous periods." }]
    }
  },

  // 67. Hourly Rate to Annual Salary Calculator
  {
    id: "salary-calculator",
    title: "What is $18 an hour per year?",
    category: "Everyday Math & Converters",
    icon: "💼",
    badge: "New",
    description: "Enter the hourly rate and the hours. You see the week, the month, and the year.",
    keywords: ["hourly to salary", "salary calculator", "wage converter", "hourly rate conversion", "annual income calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Hourly Wage ($)</label>
              <input type="number" id="sc2-wage" value="35" step="0.5" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Hours per Week</label>
              <input type="number" id="sc2-hours" value="40" min="1" max="80" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Weeks per Year</label>
              <input type="number" id="sc2-weeks" value="52" min="1" max="52" class="w-full p-2.5 font-semibold text-base rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Daily (8 hrs)</span>
              <div id="sc2-daily" class="text-base font-bold text-slate-800 dark:text-slate-200">$280</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Weekly</span>
              <div id="sc2-weekly" class="text-base font-bold text-slate-800 dark:text-slate-200">$1,400</div>
            </div>
            <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Monthly</span>
              <div id="sc2-monthly" class="text-base font-bold text-slate-800 dark:text-slate-200">$6,066</div>
            </div>
            <div class="p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-[10px] uppercase font-bold text-indigo-500 block mb-1">Annual Salary</span>
              <div id="sc2-annual" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">$72,800</div>
            </div>
          </div>
        </div>
      `;

      const wageIn = container.querySelector('#sc2-wage');
      const hoursIn = container.querySelector('#sc2-hours');
      const weeksIn = container.querySelector('#sc2-weeks');

      const dailyEl = container.querySelector('#sc2-daily');
      const weeklyEl = container.querySelector('#sc2-weekly');
      const monthlyEl = container.querySelector('#sc2-monthly');
      const annualEl = container.querySelector('#sc2-annual');

      function update() {
        const wage = parseFloat(wageIn.value) || 0;
        const hours = parseFloat(hoursIn.value) || 40;
        const weeks = parseFloat(weeksIn.value) || 52;

        const weekly = wage * hours;
        const annual = weekly * weeks;
        const monthly = annual / 12;
        const daily = wage * (hours / 5);

        dailyEl.textContent = `$${Math.round(daily).toLocaleString()}`;
        weeklyEl.textContent = `$${Math.round(weekly).toLocaleString()}`;
        monthlyEl.textContent = `$${Math.round(monthly).toLocaleString()}`;
        annualEl.textContent = `$${Math.round(annual).toLocaleString()}`;
      }

      wageIn.addEventListener('input', update);
      hoursIn.addEventListener('input', update);
      weeksIn.addEventListener('input', update);
      update();
    },
    seoContent: {
      overview: "Convert an hourly wage into equivalent annual salary, monthly earnings, and weekly take-home figures for job offers and freelance contract negotiations.",
      features: ["Customizable working hours and paid weeks per year", "Full breakdown across daily, weekly, monthly, and annual income", "Fast reactive calculations"],
      howTo: ["Input hourly wage and weekly hours.", "Review annual equivalent income."],
      faqs: [{ q: "How many working hours are in a standard year?", a: "A standard full-time year (40 hours/week, 52 weeks) consists of 2,080 working hours." }]
    }
  },

  // 68. GPA Calculator
  {
    id: "gpa-calculator",
    title: "What is my GPA?",
    category: "Everyday Math & Converters",
    icon: "🎓",
    badge: "New",
    description: "Enter each grade and how many credits it is worth. You get the average on a 4.0 scale.",
    keywords: ["gpa calculator", "grade point average", "calculate gpa", "college gpa", "4.0 gpa calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="font-semibold text-slate-500 uppercase tracking-wider">Courses & Grades</span>
            <button id="gpa-add" class="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg font-semibold transition">+ Add Course</button>
          </div>

          <div id="gpa-courses" class="space-y-2"></div>

          <div class="p-6 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 text-center">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">Cumulative GPA</span>
            <div id="gpa-result" class="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">3.80</div>
            <div id="gpa-honor" class="text-xs text-slate-500 mt-1 font-semibold">Magna Cum Laude</div>
          </div>
        </div>
      `;

      const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
      };

      let courses = [
        { name: "Computer Science 101", credits: 4, grade: "A" },
        { name: "Calculus II", credits: 4, grade: "A-" },
        { name: "Physics & Mechanics", credits: 3, grade: "B+" },
        { name: "Academic Writing", credits: 3, grade: "A" }
      ];

      const list = container.querySelector('#gpa-courses');
      const resEl = container.querySelector('#gpa-result');
      const honorEl = container.querySelector('#gpa-honor');

      function renderCourses() {
        list.innerHTML = courses.map((c, i) => `
          <div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 text-xs">
            <input type="text" data-i="${i}" class="c-name flex-1 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent font-medium" value="${Utils.escapeHtml(c.name)}">
            <input type="number" data-i="${i}" min="1" max="10" class="c-cred w-16 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-center font-bold" value="${c.credits}">
            <select data-i="${i}" class="c-grade p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent font-bold text-indigo-600 dark:text-indigo-400">
              ${Object.keys(gradePoints).map(g => `<option value="${g}" ${g === c.grade ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
            <button data-i="${i}" class="c-del px-2 py-1 text-rose-500 hover:bg-rose-50 rounded-lg">✕</button>
          </div>
        `).join('');

        list.querySelectorAll('.c-name').forEach(inp => inp.addEventListener('input', e => { courses[e.target.dataset.i].name = e.target.value; }));
        list.querySelectorAll('.c-cred').forEach(inp => inp.addEventListener('input', e => { courses[e.target.dataset.i].credits = parseFloat(e.target.value) || 1; calculate(); }));
        list.querySelectorAll('.c-grade').forEach(sel => sel.addEventListener('change', e => { courses[e.target.dataset.i].grade = e.target.value; calculate(); }));
        list.querySelectorAll('.c-del').forEach(btn => btn.addEventListener('click', e => { courses.splice(btn.dataset.i, 1); renderCourses(); calculate(); }));
      }

      function calculate() {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(c => {
          const pts = gradePoints[c.grade] || 0;
          totalPoints += pts * c.credits;
          totalCredits += c.credits;
        });

        const gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
        resEl.textContent = gpa.toFixed(2);

        if (gpa >= 3.9) honorEl.textContent = "Summa Cum Laude (Highest Honors)";
        else if (gpa >= 3.7) honorEl.textContent = "Magna Cum Laude (High Honors)";
        else if (gpa >= 3.5) honorEl.textContent = "Cum Laude (Honors)";
        else honorEl.textContent = "Standard Academic Standing";
      }

      container.querySelector('#gpa-add').addEventListener('click', () => {
        courses.push({ name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' });
        renderCourses();
        calculate();
      });

      renderCourses();
      calculate();
    },
    seoContent: {
      overview: "Calculate weighted semester and cumulative Grade Point Averages on a standard 4.0 university grading scale.",
      features: ["Add and remove courses dynamically", "Supports A+ through F letter grades", "Honors level classification"],
      howTo: ["Add course names and credit weightings.", "Select letter grades.", "Inspect calculated GPA."],
      faqs: [{ q: "What is an unweighted vs weighted GPA?", a: "Unweighted GPAs are capped at 4.0 regardless of course difficulty; weighted scales assign higher point values for AP or Honors courses." }]
    }
  },

  // 69. Roman Numeral Converter
  {
    id: "roman-numeral-converter",
    title: "What is 2026 in Roman numerals?",
    category: "Everyday Math & Converters",
    icon: "🏛️",
    badge: "New",
    description: "Type the number or the Roman numerals. It converts both ways.",
    keywords: ["roman numeral converter", "arabic to roman", "roman to arabic", "roman numbers", "roman letters"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Arabic Number (1 – 3,999)</label>
              <input type="number" id="rnc-num" value="2026" min="1" max="3999" class="w-full p-3 font-mono text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Roman Numeral</label>
              <input type="text" id="rnc-rom" value="MMXXVI" class="w-full p-3 font-serif text-xl font-bold tracking-widest rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400">
            </div>
          </div>

          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center text-xs">
            <span class="text-slate-500">Key: I=1, V=5, X=10, L=50, C=100, D=500, M=1000</span>
            <button id="rnc-copy" class="px-3 py-1 bg-indigo-600 text-white rounded-lg font-semibold">Copy Roman</button>
          </div>
        </div>
      `;

      const numIn = container.querySelector('#rnc-num');
      const romIn = container.querySelector('#rnc-rom');

      const map = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
      ];

      function toRoman(num) {
        if (num <= 0 || num > 3999) return '';
        let res = '';
        for (let [val, sym] of map) {
          while (num >= val) {
            res += sym;
            num -= val;
          }
        }
        return res;
      }

      function fromRoman(str) {
        const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let clean = str.toUpperCase().trim();
        let total = 0;
        for (let i = 0; i < clean.length; i++) {
          const cur = romanMap[clean[i]] || 0;
          const nxt = romanMap[clean[i + 1]] || 0;
          if (cur < nxt) {
            total += (nxt - cur);
            i++;
          } else {
            total += cur;
          }
        }
        return total;
      }

      numIn.addEventListener('input', () => {
        const n = parseInt(numIn.value, 10);
        romIn.value = toRoman(n);
      });

      romIn.addEventListener('input', () => {
        const n = fromRoman(romIn.value);
        numIn.value = n > 0 ? n : '';
      });

      container.querySelector('#rnc-copy').addEventListener('click', () => Utils.copyToClipboard(romIn.value));
    },
    seoContent: {
      overview: "Bidirectional converter between standard Arabic integers and classical Roman numerals.",
      features: ["Converts numbers 1 to 3,999", "Handles subtractive notation (IV, IX, CM)", "Instant two-way synchronization"],
      howTo: ["Type number or Roman letters.", "View instant conversion."],
      faqs: [{ q: "What is the largest standard Roman numeral?", a: "3999 (MMMCMXCIX), as numbers 4000+ traditionally require an overline bar (vinculum)." }]
    }
  },

  // 70. Random Number Generator
  {
    id: "random-number-generator",
    title: "Pick a number between 1 and 100.",
    category: "Everyday Math & Converters",
    icon: "🎲",
    badge: "New",
    description: "Set the range and how many you need.",
    keywords: ["random number generator", "rng", "random integer", "crypto random", "pick random number"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Min Value</label>
              <input type="number" id="rng-min" value="1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Max Value</label>
              <input type="number" id="rng-max" value="100" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Quantity</label>
              <input type="number" id="rng-qty" value="5" min="1" max="100" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div class="flex items-end">
              <button id="rng-gen" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition">Generate</button>
            </div>
          </div>

          <div class="flex items-center gap-4 text-xs">
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="rng-unique" checked class="text-indigo-600 rounded"><span>Unique (No duplicates)</span></label>
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" id="rng-sort" class="text-indigo-600 rounded"><span>Sort Ascending</span></label>
          </div>

          <div id="rng-results" class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap gap-2.5 items-center justify-center min-h-[100px]"></div>

          <div class="flex justify-end gap-2">
            <button id="rng-copy" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition">Copy Numbers</button>
          </div>
        </div>
      `;

      const minIn = container.querySelector('#rng-min');
      const maxIn = container.querySelector('#rng-max');
      const qtyIn = container.querySelector('#rng-qty');
      const uniqueCheck = container.querySelector('#rng-unique');
      const sortCheck = container.querySelector('#rng-sort');
      const resultsEl = container.querySelector('#rng-results');

      let currentNumbers = [];

      function getCryptoRandom(min, max) {
        const range = max - min + 1;
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        return min + (arr[0] % range);
      }

      function generate() {
        const min = parseInt(minIn.value, 10) || 1;
        const max = parseInt(maxIn.value, 10) || 100;
        const qty = Math.min(100, Math.max(1, parseInt(qtyIn.value, 10) || 1));

        if (min >= max) {
          resultsEl.innerHTML = '<span class="text-xs text-rose-500 font-semibold">Min must be less than Max!</span>';
          return;
        }

        const numbers = [];
        const seen = new Set();

        let attempts = 0;
        while (numbers.length < qty && attempts < 2000) {
          attempts++;
          const num = getCryptoRandom(min, max);
          if (uniqueCheck.checked) {
            if (!seen.has(num)) {
              seen.add(num);
              numbers.push(num);
            }
            if (seen.size >= (max - min + 1)) break;
          } else {
            numbers.push(num);
          }
        }

        if (sortCheck.checked) numbers.sort((a, b) => a - b);
        currentNumbers = numbers;

        resultsEl.innerHTML = numbers.map(n => `
          <span class="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-base font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">${n}</span>
        `).join('');
      }

      container.querySelector('#rng-gen').addEventListener('click', generate);
      container.querySelector('#rng-copy').addEventListener('click', () => Utils.copyToClipboard(currentNumbers.join(', ')));
      generate();
    },
    seoContent: {
      overview: "Generate cryptographically secure random integers using browser Web Crypto APIs for giveaways, raffles, and statistical sampling.",
      features: ["Hardware entropy via crypto.getRandomValues", "Bulk generation up to 100 items", "Deduplication and sorting options"],
      howTo: ["Set minimum and maximum boundaries.", "Select count.", "Click Generate."],
      faqs: [{ q: "Is this cryptographically random?", a: "Yes, it uses crypto.getRandomValues rather than Math.random, ensuring non-deterministic entropy." }]
    }
  },

  // 71. Dice Roller & Coin Flipper
  {
    id: "dice-coin-roller",
    title: "Roll a d20.",
    category: "Everyday Math & Converters",
    icon: "🎲",
    badge: "New",
    description: "Pick the die, or flip a coin.",
    keywords: ["dice roller", "coin flipper", "flip a coin", "roll d20", "rpg dice roller"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <!-- Coin Section -->
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase block">Coin Flipper</span>
              <div id="dcr-coin-res" class="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">Heads (🦅)</div>
            </div>
            <button id="dcr-flip-btn" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold rounded-xl transition">🪙 Flip Coin</button>
          </div>

          <!-- Polyhedral Dice -->
          <div>
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">RPG Dice (Click to Roll)</span>
            <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
              <button data-sides="4" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d4</button>
              <button data-sides="6" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d6</button>
              <button data-sides="8" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d8</button>
              <button data-sides="10" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d10</button>
              <button data-sides="12" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d12</button>
              <button data-sides="20" class="dice-btn p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold hover:border-indigo-500 transition text-xs">d20</button>
              <button data-sides="100" class="dice-btn p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold hover:border-indigo-500 transition text-xs">d100</button>
            </div>
          </div>

          <!-- Roll Outcome -->
          <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
            <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Last Roll Outcome</span>
            <div id="dcr-dice-res" class="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-1">20</div>
            <span id="dcr-dice-sub" class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Rolled a d20 (Natural 20!)</span>
          </div>
        </div>
      `;

      const coinRes = container.querySelector('#dcr-coin-res');
      const flipBtn = container.querySelector('#dcr-flip-btn');
      const diceRes = container.querySelector('#dcr-dice-res');
      const diceSub = container.querySelector('#dcr-dice-sub');

      flipBtn.addEventListener('click', () => {
        const isHeads = Math.random() >= 0.5;
        coinRes.textContent = isHeads ? "Heads (🦅)" : "Tails (👑)";
        Utils.showToast(`Coin landed on ${isHeads ? 'Heads' : 'Tails'}!`, 'info');
      });

      container.querySelectorAll('.dice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sides = parseInt(btn.getAttribute('data-sides'), 10);
          const roll = Math.floor(Math.random() * sides) + 1;
          diceRes.textContent = roll;

          let extra = `Rolled a d${sides}`;
          if (sides === 20 && roll === 20) extra += " (Natural 20! Critical Hit!)";
          if (sides === 20 && roll === 1) extra += " (Natural 1! Critical Miss!)";
          diceSub.textContent = extra;
          Utils.showToast(`Rolled ${roll} on d${sides}`, 'success');
        });
      });
    },
    seoContent: {
      overview: "Virtual coin flipper and tabletop RPG dice roller for Dungeons & Dragons, Pathfinder, and board games.",
      features: ["Fair binary 50/50 coin flipping", "Standard polyhedral RPG dice set (d4 through d100)", "Immediate natural critical alerts"],
      howTo: ["Click Flip Coin or choose any die type to roll."],
      faqs: [{ q: "What is a natural 20?", a: "In D&D, rolling a 20 on a 20-sided die is a 'Natural 20', typically denoting an automatic critical success." }]
    }
  },

  // 72. Running Pace Calculator
  {
    id: "running-pace-calculator",
    title: "What pace do I need for a 25-minute 5K?",
    category: "Everyday Math & Converters",
    icon: "🏃",
    badge: "New",
    description: "Enter the distance and the time, or the pace you want to hold.",
    keywords: ["running pace calculator", "marathon pace", "5k pace", "pace to time", "runner splits"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <button data-dist="5" class="rpc-dist px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold hover:bg-indigo-50">5K (3.1 mi)</button>
            <button data-dist="10" class="rpc-dist px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold hover:bg-indigo-50">10K (6.2 mi)</button>
            <button data-dist="21.0975" class="rpc-dist px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold hover:bg-indigo-50">Half Marathon</button>
            <button data-dist="42.195" class="rpc-dist px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold hover:bg-indigo-50">Marathon</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Distance (Kilometers)</label>
              <input type="number" id="rpc-km" value="5" step="0.1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Finish Time (Hours : Mins : Secs)</label>
              <div class="flex gap-2">
                <input type="number" id="rpc-h" value="0" min="0" placeholder="HH" class="w-full p-2.5 text-center font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <input type="number" id="rpc-m" value="25" min="0" max="59" placeholder="MM" class="w-full p-2.5 text-center font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <input type="number" id="rpc-s" value="0" min="0" max="59" placeholder="SS" class="w-full p-2.5 text-center font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-xs font-bold text-indigo-500 uppercase block mb-1">Pace (min / km)</span>
              <div id="rpc-pace-km" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">5:00 / km</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Pace (min / mile)</span>
              <div id="rpc-pace-mi" class="text-2xl font-bold text-slate-800 dark:text-slate-200">8:03 / mi</div>
            </div>
          </div>
        </div>
      `;

      const kmIn = container.querySelector('#rpc-km');
      const hIn = container.querySelector('#rpc-h');
      const mIn = container.querySelector('#rpc-m');
      const sIn = container.querySelector('#rpc-s');
      const paceKm = container.querySelector('#rpc-pace-km');
      const paceMi = container.querySelector('#rpc-pace-mi');

      function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.round(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
      }

      function update() {
        const km = parseFloat(kmIn.value) || 0;
        const h = parseInt(hIn.value, 10) || 0;
        const m = parseInt(mIn.value, 10) || 0;
        const s = parseInt(sIn.value, 10) || 0;

        const totalSec = h * 3600 + m * 60 + s;
        if (km <= 0 || totalSec <= 0) return;

        const secPerKm = totalSec / km;
        const secPerMi = totalSec / (km * 0.621371);

        paceKm.textContent = `${formatTime(secPerKm)} / km`;
        paceMi.textContent = `${formatTime(secPerMi)} / mi`;
      }

      kmIn.addEventListener('input', update);
      hIn.addEventListener('input', update);
      mIn.addEventListener('input', update);
      sIn.addEventListener('input', update);

      container.querySelectorAll('.rpc-dist').forEach(btn => {
        btn.addEventListener('click', () => {
          kmIn.value = btn.getAttribute('data-dist');
          update();
        });
      });

      update();
    },
    seoContent: {
      overview: "Plan race targets and split times for popular racing distances with dual metric and imperial pace calculations.",
      features: ["Presets for 5K, 10K, Half Marathon, Full Marathon", "Calculates pace in both min/km and min/mile", "Instant recalculations"],
      howTo: ["Select distance or type custom kilometers.", "Enter target finish time in hours, minutes, and seconds.", "View required pace."],
      faqs: [{ q: "How many miles is a marathon?", a: "An official marathon race distance is 26.219 miles or 42.195 kilometers." }]
    }
  },

  // 73. Fuel Cost Estimator
  {
    id: "fuel-cost-calculator",
    title: "How much gas will this trip cost?",
    category: "Everyday Math & Converters",
    icon: "⛽",
    badge: "New",
    description: "Enter the distance, the mpg, and the price per gallon.",
    keywords: ["fuel cost estimator", "gas cost calculator", "road trip fuel calculator", "trip cost", "mileage calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Distance (Miles)</label>
              <input type="number" id="fc-dist" value="300" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Fuel Economy (MPG)</label>
              <input type="number" id="fc-mpg" value="28" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Gas Price ($/gal)</label>
              <input type="number" id="fc-price" value="3.65" step="0.05" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Passengers</label>
              <input type="number" id="fc-pass" value="2" min="1" class="w-full p-2.5 font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" id="fc-round" class="text-indigo-600 rounded">
            <label for="fc-round" class="text-xs font-semibold text-slate-700 dark:text-slate-300">Round Trip (Double Distance)</label>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span class="text-xs font-bold text-indigo-500 uppercase block mb-1">Total Trip Gas Cost</span>
              <div id="fc-total" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$39.11</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Gallons Needed</span>
              <div id="fc-gals" class="text-xl font-bold text-slate-800 dark:text-slate-200">10.7 gal</div>
            </div>
            <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="text-xs font-bold text-slate-400 uppercase block mb-1">Cost Per Person</span>
              <div id="fc-per" class="text-xl font-bold text-emerald-600 dark:text-emerald-400">$19.55</div>
            </div>
          </div>
        </div>
      `;

      const distIn = container.querySelector('#fc-dist');
      const mpgIn = container.querySelector('#fc-mpg');
      const priceIn = container.querySelector('#fc-price');
      const passIn = container.querySelector('#fc-pass');
      const roundCheck = container.querySelector('#fc-round');

      const totEl = container.querySelector('#fc-total');
      const galEl = container.querySelector('#fc-gals');
      const perEl = container.querySelector('#fc-per');

      function update() {
        let dist = parseFloat(distIn.value) || 0;
        if (roundCheck.checked) dist *= 2;
        const mpg = Math.max(1, parseFloat(mpgIn.value) || 1);
        const price = parseFloat(priceIn.value) || 0;
        const pass = Math.max(1, parseInt(passIn.value, 10) || 1);

        const gals = dist / mpg;
        const totalCost = gals * price;

        totEl.textContent = `$${totalCost.toFixed(2)}`;
        galEl.textContent = `${gals.toFixed(1)} gal`;
        perEl.textContent = `$${(totalCost / pass).toFixed(2)}`;
      }

      distIn.addEventListener('input', update);
      mpgIn.addEventListener('input', update);
      priceIn.addEventListener('input', update);
      passIn.addEventListener('input', update);
      roundCheck.addEventListener('change', update);
      update();
    },
    seoContent: {
      overview: "Plan road trip travel budgets and calculate gas expenses based on distance, vehicle fuel efficiency, and fuel prices.",
      features: ["Round-trip toggle", "Cost per passenger division", "Accurate fuel volume estimation"],
      howTo: ["Input driving distance and vehicle MPG.", "Enter local gas price per gallon.", "Review total and split cost."],
      faqs: [{ q: "How is fuel consumption calculated?", a: "Total Gallons = Distance / MPG. Total Cost = Gallons * Price Per Gallon." }]
    }
  },

  // 74. Base Converter (Hex, Dec, Oct, Bin)
  {
    id: "base-converter",
    title: "What is this number in hex?",
    category: "Everyday Math & Converters",
    icon: "🔢",
    badge: "New",
    description: "Type the value. Binary, octal, decimal, and hex update together.",
    keywords: ["base converter", "hex to dec", "bin to hex", "binary to decimal", "radix converter"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Decimal (Base 10)</label>
              <input type="text" id="bc-dec" value="255" class="w-full p-2.5 font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Hexadecimal (Base 16)</label>
              <input type="text" id="bc-hex" value="FF" class="w-full p-2.5 font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Binary (Base 2)</label>
              <input type="text" id="bc-bin" value="11111111" class="w-full p-2.5 font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 mb-1">Octal (Base 8)</label>
              <input type="text" id="bc-oct" value="377" class="w-full p-2.5 font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            </div>
          </div>
        </div>
      `;

      const decIn = container.querySelector('#bc-dec');
      const hexIn = container.querySelector('#bc-hex');
      const binIn = container.querySelector('#bc-bin');
      const octIn = container.querySelector('#bc-oct');

      function updateAll(dec) {
        if (isNaN(dec) || dec < 0) return;
        decIn.value = dec.toString(10);
        hexIn.value = dec.toString(16).toUpperCase();
        binIn.value = dec.toString(2);
        octIn.value = dec.toString(8);
      }

      decIn.addEventListener('input', () => updateAll(parseInt(decIn.value, 10)));
      hexIn.addEventListener('input', () => updateAll(parseInt(hexIn.value, 16)));
      binIn.addEventListener('input', () => updateAll(parseInt(binIn.value, 2)));
      octIn.addEventListener('input', () => updateAll(parseInt(octIn.value, 8)));
    },
    seoContent: {
      overview: "Real-time linked number base converter supporting Binary, Octal, Decimal, and Hexadecimal representations.",
      features: ["Instant simultaneous conversion across 4 bases", "Uppercase hexadecimal display", "Works with arbitrary integer values"],
      howTo: ["Type into any base input.", "All other bases update synchronously."],
      faqs: [{ q: "What is an Octal number?", a: "Octal is a base-8 number system using digits 0 through 7, historically popular in computing for permission masks." }]
    }
  },

  // 75. Matrix Determinant Calculator
  {
    id: "matrix-determinant-calculator",
    title: "What is the determinant of this matrix?",
    category: "Everyday Math & Converters",
    icon: "🔲",
    badge: "New",
    description: "Enter a 2x2 or 3x3. You see the result and the steps.",
    keywords: ["matrix determinant", "determinant calculator", "matrix math", "linear algebra calculator"],
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center gap-3 text-xs">
            <span class="font-semibold text-slate-500">Size:</span>
            <button id="mdc-size-2" class="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">2 × 2</button>
            <button id="mdc-size-3" class="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold">3 × 3</button>
          </div>

          <div id="mdc-grid" class="flex justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"></div>

          <div class="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/20 text-center">
            <span class="text-xs font-bold text-indigo-500 uppercase block mb-1">Determinant |A|</span>
            <div id="mdc-result" class="text-3xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">0</div>
          </div>
        </div>
      `;

      let size = 3;
      let m = [
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0]
      ];

      const gridEl = container.querySelector('#mdc-grid');
      const resEl = container.querySelector('#mdc-result');
      const btn2 = container.querySelector('#mdc-size-2');
      const btn3 = container.querySelector('#mdc-size-3');

      function renderGrid() {
        gridEl.innerHTML = `
          <div class="inline-grid gap-2 border-l-4 border-r-4 border-slate-700 dark:border-slate-300 px-3 py-2 rounded" style="grid-template-columns: repeat(${size}, minmax(0, 1fr));">
            ${m.map((row, r) => row.map((val, c) => `
              <input type="number" data-r="${r}" data-c="${c}" value="${val}" class="w-14 p-2 text-center font-mono font-bold text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            `).join('')).join('')}
          </div>
        `;

        gridEl.querySelectorAll('input').forEach(inp => {
          inp.addEventListener('input', (e) => {
            const r = parseInt(e.target.dataset.r, 10);
            const c = parseInt(e.target.dataset.c, 10);
            m[r][c] = parseFloat(e.target.value) || 0;
            calcDet();
          });
        });
        calcDet();
      }

      function calcDet() {
        let det = 0;
        if (size === 2) {
          det = (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
        } else {
          // 3x3 expansion
          const a = m[0][0], b = m[0][1], c = m[0][2];
          const d1 = (m[1][1] * m[2][2]) - (m[1][2] * m[2][1]);
          const d2 = (m[1][0] * m[2][2]) - (m[1][2] * m[2][0]);
          const d3 = (m[1][0] * m[2][1]) - (m[1][1] * m[2][0]);
          det = a * d1 - b * d2 + c * d3;
        }
        resEl.textContent = det;
      }

      btn2.addEventListener('click', () => {
        size = 2;
        m = [[1, 2], [3, 4]];
        btn2.className = 'px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold';
        btn3.className = 'px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg';
        renderGrid();
      });

      btn3.addEventListener('click', () => {
        size = 3;
        m = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
        btn3.className = 'px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold';
        btn2.className = 'px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg';
        renderGrid();
      });

      renderGrid();
    },
    seoContent: {
      overview: "Calculate the determinant of 2x2 and 3x3 square matrices for linear algebra equations and geometric transformations.",
      features: ["2x2 and 3x3 matrix solvers", "Interactive visual bracket grid", "Real-time determinant calculation"],
      howTo: ["Select 2x2 or 3x3 matrix dimension.", "Fill in matrix coefficients.", "Read the determinant value."],
      faqs: [{ q: "What does a zero determinant mean?", a: "A matrix with a determinant of zero is singular and cannot be inverted." }]
    }
  }
];

window.mathTools = mathTools;
