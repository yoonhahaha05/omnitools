/**
 * OmniTools - Shared Utility Functions
 * 100% Client-Side Helpers & Precision Design Primitives
 */

const Utils = {
  /**
   * Lucide vector icon mapping dictionary
   */
  iconMap: {
    // Categories
    "layers": "layers",
    "file-text": "file-text",
    "terminal": "terminal",
    "calculator": "calculator",
    "palette": "palette",
    "zap": "zap",
    
    // Emojis from tool catalog mapped to high-craft Lucide vector glyphs
    "📝": "file-text",
    "⏱️": "timer",
    "🔤": "type",
    "🧹": "eraser",
    "↩️": "undo-2",
    "🔀": "shuffle",
    "🔄": "repeat",
    "⚖️": "scale",
    "✂️": "scissors",
    "📑": "files",
    "📄": "file",
    "🔗": "link",
    "🔍": "search",
    "🏷️": "tag",
    "🎮": "gamepad-2",
    "👻": "ghost",
    "0️⃣": "binary",
    "#️⃣": "hash",
    "✈️": "navigation",
    "📦": "package",
    "🔡": "case-sensitive",
    "🔠": "case-upper",
    "📊": "bar-chart-2",
    "💻": "terminal",
    "⚡": "zap",
    "🔐": "key-round",
    "🛡️": "shield-check",
    "🌐": "globe",
    "📐": "ruler",
    "🛠️": "wrench",
    "🎨": "palette",
    "👁️": "eye",
    "🚀": "rocket",
    "💾": "hard-drive",
    "🖥️": "monitor",
    "📈": "trending-up",
    "💼": "briefcase",
    "🎓": "graduation-cap",
    "🏛️": "landmark",
    "🎲": "dices",
    "🏃": "activity",
    "⛽": "fuel",
    "🔢": "binary",
    "🔲": "square",
    "➗": "divide",
    "💵": "dollar-sign",
    "📏": "ruler",
    "⏰": "clock",
    "📅": "calendar",
    "🎂": "cake",
    "📆": "calendar-days",
    "☕": "coffee",
    "✨": "sparkles",
    "⭐": "star",
    "🌟": "star"
  },

  /**
   * Get vector icon identifier
   */
  getIconName(icon, category = '') {
    if (!icon) return 'sparkles';
    if (this.iconMap[icon]) return this.iconMap[icon];
    
    // Fallback based on category
    const cat = (category || '').toLowerCase();
    if (cat.includes('text')) return 'file-text';
    if (cat.includes('dev') || cat.includes('data')) return 'terminal';
    if (cat.includes('math') || cat.includes('convert')) return 'calculator';
    if (cat.includes('media') || cat.includes('design')) return 'palette';
    return 'cpu';
  },

  /**
   * Render HTML for vector icon
   */
  renderIcon(icon, className = 'w-4 h-4', category = '') {
    const iconName = this.getIconName(icon, category);
    return `<i data-lucide="${iconName}" class="${className}"></i>`;
  },

  /**
   * Refresh all Lucide icons on page
   */
  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  /**
   * Display a precision floating toast notification
   * @param {string} message 
   * @param {'success'|'error'|'info'} type 
   */
  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colorClasses = {
      success: 'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border-zinc-700 dark:border-zinc-300 shadow-xl',
      error: 'bg-rose-950/90 text-rose-100 border-rose-800 shadow-xl',
      info: 'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border-zinc-700 dark:border-zinc-300 shadow-xl'
    }[type] || 'bg-zinc-900 text-zinc-100 border-zinc-800';

    toast.className = `px-3.5 py-2.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 transform translate-y-3 opacity-0 pointer-events-auto flex items-center gap-2.5 ${colorClasses}`;
    
    const iconName = {
      success: 'check',
      error: 'alert-triangle',
      info: 'info'
    }[type] || 'info';

    toast.innerHTML = `<i data-lucide="${iconName}" class="w-3.5 h-3.5 shrink-0"></i><span>${this.escapeHtml(message)}</span>`;
    container.appendChild(toast);
    this.refreshIcons();

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 2.5s
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  },

  /**
   * Copy text to clipboard with toast notification
   * @param {string} text 
   * @param {string} [msg] 
   */
  async copyToClipboard(text, msg = 'Copied to clipboard') {
    if (!text && text !== 0) {
      this.showToast('Nothing to copy', 'info');
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(String(text));
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = String(text);
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      this.showToast(msg, 'success');
    } catch (err) {
      console.error('Copy failed:', err);
      this.showToast('Failed to copy to clipboard', 'error');
    }
  },

  /**
   * Trigger direct file download in browser
   * @param {string|Blob} content 
   * @param {string} filename 
   * @param {string} mimeType 
   */
  downloadFile(content, filename, mimeType = 'text/plain;charset=utf-8') {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    this.showToast(`Downloaded ${filename}`, 'success');
  },

  /**
   * Escape HTML characters to prevent XSS
   * @param {string} str 
   * @returns {string}
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Debounce function calls
   * @param {Function} func 
   * @param {number} waitMs 
   */
  debounce(func, waitMs = 250) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), waitMs);
    };
  },

  /**
   * Safe LocalStorage wrapper
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(`omnitools_${key}`);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('Storage read error:', e);
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(`omnitools_${key}`, JSON.stringify(value));
      } catch (e) {
        console.warn('Storage write error:', e);
      }
    },
    toggleFavorite(toolId) {
      const favs = this.get('favorites', []);
      const index = favs.indexOf(toolId);
      let added = false;
      if (index === -1) {
        favs.push(toolId);
        added = true;
        Utils.showToast('Saved to favorites', 'success');
      } else {
        favs.splice(index, 1);
        Utils.showToast('Removed from favorites', 'info');
      }
      this.set('favorites', favs);
      return added;
    },
    isFavorite(toolId) {
      const favs = this.get('favorites', []);
      return favs.includes(toolId);
    },
    addRecent(toolId) {
      let recents = this.get('recents', []);
      recents = recents.filter(id => id !== toolId);
      recents.unshift(toolId);
      if (recents.length > 8) recents = recents.slice(0, 8);
      this.set('recents', recents);
    }
  },

  /**
   * Render a Google AdSense responsive unit HTML string
   * @param {'slotHome'|'slotTool'|'slotSidebar'} slotKey
   * @param {string} customClass
   */
  renderAdUnit(slotKey = 'slotHome', customClass = 'my-6') {
    const config = window.ADSENSE_CONFIG || {
      client: 'ca-pub-3261737439776294',
      slotHome: '1234567890',
      slotTool: '2345678901',
      slotSidebar: '3456789012'
    };

    const slotId = config[slotKey] || config.slotHome || '1234567890';
    const clientId = config.client || 'ca-pub-3261737439776294';

    return `
      <div class="ad-slot-wrapper w-full p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 ${customClass}">
        <div class="ad-label text-zinc-400 dark:text-zinc-500 mb-2">Advertisement</div>
        <div class="w-full flex justify-center items-center overflow-hidden min-h-[90px]">
          <ins class="adsbygoogle"
               style="display:block;width:100%;"
               data-ad-client="${this.escapeHtml(clientId)}"
               data-ad-slot="${this.escapeHtml(slotId)}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    `;
  },

  /**
   * Safely initialize any unmounted AdSense units
   */
  initAdUnits() {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        const uninitialized = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');
        uninitialized.forEach(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      }
    } catch (e) {
      // Gracefully handled if ad blocker is active or offline
    }
  }
};

window.Utils = Utils;

