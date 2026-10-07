/**
 * OmniTools - Core SPA Application Engine
 * Precision Client-Side Architecture & Responsive Workstation
 */

const App = {
  currentCategory: 'all',
  searchQuery: '',
  viewMode: 'grid', // 'grid' or 'compact'

  init() {
    this.viewMode = Utils.storage.get('view_mode', 'grid');
    this.setupTheme();
    this.setupViewMode();
    this.setupEventListeners();
    this.setupRouter();
    this.renderCategoriesNav();
  },

  setupTheme() {
    const savedTheme = Utils.storage.get('theme', null);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const isNowDark = document.documentElement.classList.toggle('dark');
        Utils.storage.set('theme', isNowDark ? 'dark' : 'light');
        this.updateThemeIcon(isNowDark);
      });
      this.updateThemeIcon(isDark);
    }
  },

  updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      Utils.refreshIcons();
    }
  },

  setupViewMode() {
    const toggleBtn = document.getElementById('view-mode-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.viewMode = this.viewMode === 'grid' ? 'compact' : 'grid';
        Utils.storage.set('view_mode', this.viewMode);
        this.updateViewModeIcon();
        if (!window.location.hash.startsWith('#/tool/')) {
          this.renderHome();
        }
      });
      this.updateViewModeIcon();
    }
  },

  updateViewModeIcon() {
    const icon = document.getElementById('view-mode-icon');
    if (icon) {
      icon.setAttribute('data-lucide', this.viewMode === 'grid' ? 'list' : 'layout-grid');
      Utils.refreshIcons();
    }
  },

  setupEventListeners() {
    // Quick search bar in top nav
    const navSearch = document.getElementById('nav-search');
    if (navSearch) {
      navSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (window.location.hash.startsWith('#/tool/')) {
          window.location.hash = '#/';
        }
        this.renderHome();
      });
    }

    // Keyboard shortcut Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('nav-search') || document.getElementById('hero-search');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });

    // Mobile sidebar toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (mobileMenuBtn && sidebar && sidebarOverlay) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('hidden');
      });
      sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
      });
    }
  },

  setupRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  handleRoute() {
    const hash = window.location.hash || '#/';
    
    // Close mobile drawer on route change
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if (sidebar && !sidebar.classList.contains('-translate-x-full')) {
      sidebar.classList.add('-translate-x-full');
      if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (hash.startsWith('#/tool/')) {
      const toolId = hash.replace('#/tool/', '');
      this.renderToolView(toolId);
    } else if (hash.startsWith('#/category/')) {
      const cat = decodeURIComponent(hash.replace('#/category/', ''));
      this.currentCategory = cat;
      this.renderCategoriesNav();
      this.renderHome();
    } else {
      this.currentCategory = 'all';
      this.renderCategoriesNav();
      this.renderHome();
    }
  },

  renderCategoriesNav() {
    const container = document.getElementById('category-list');
    if (!container) return;

    const allTools = ToolRegistry.getAllTools();
    const categories = ToolRegistry.categories;

    container.innerHTML = categories.map(cat => {
      const count = cat.id === 'all' 
        ? allTools.length 
        : allTools.filter(t => t.category.toLowerCase() === cat.name.toLowerCase()).length;

      const isActive = (cat.id === 'all' && this.currentCategory === 'all') ||
                       (cat.name.toLowerCase() === this.currentCategory.toLowerCase());

      const activeClasses = isActive
        ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-50 dark:border dark:border-zinc-700/60 font-semibold shadow-xs'
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100';

      const badgeClasses = isActive
        ? 'bg-zinc-800 text-zinc-300 dark:bg-zinc-700 dark:text-zinc-200'
        : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400';

      return `
        <a href="#/category/${encodeURIComponent(cat.id === 'all' ? 'all' : cat.name)}" 
           data-category="${cat.name}"
           class="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${activeClasses}">
          <span class="flex items-center gap-2 truncate">
            <i data-lucide="${cat.icon || 'layers'}" class="w-3.5 h-3.5 shrink-0 opacity-80"></i>
            <span class="truncate">${cat.name}</span>
          </span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${badgeClasses}">${count}</span>
        </a>
      `;
    }).join('');

    Utils.refreshIcons();
  },

  renderHome() {
    const allTools = ToolRegistry.getAllTools();
    document.title = `OmniTools - Precision Client-Side Web Utilities (${allTools.length} Offline Tools)`;
    const main = document.getElementById('main-content');
    if (!main) return;

    // Filter tools
    let tools = allTools;
    if (this.currentCategory && this.currentCategory !== 'all') {
      tools = tools.filter(t => t.category.toLowerCase() === this.currentCategory.toLowerCase());
    }
    if (this.searchQuery) {
      tools = ToolRegistry.searchTools(this.searchQuery);
    }

    // Check favorites
    const favorites = Utils.storage.get('favorites', []);
    const favTools = allTools.filter(t => favorites.includes(t.id));

    main.innerHTML = `
      <div class="space-y-6 max-w-7xl mx-auto">
        
        ${!this.searchQuery && this.currentCategory === 'all' ? `
          <div class="py-2 sm:py-4 space-y-3">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Web utilities that run locally in your browser
            </h1>
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Fast, free developer and formatting tools. Your input stays on this device. Ads use cookies.
            </p>

            <div class="pt-2 max-w-xl">
              <div class="relative">
                <input id="hero-search" type="text" value="${Utils.escapeHtml(this.searchQuery)}" placeholder="Search utilities (⌘K)..." class="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition shadow-xs">
                <i data-lucide="search" class="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5"></i>
              </div>
              
              <div class="flex items-center gap-2 flex-wrap mt-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span class="text-zinc-400">Popular:</span>
                <a href="/tools/json-beautifier" class="hover:text-zinc-900 dark:hover:text-zinc-200 underline">JSON Formatter</a>
                <span>•</span>
                <a href="/tools/word-counter" class="hover:text-zinc-900 dark:hover:text-zinc-200 underline">Word Counter</a>
                <span>•</span>
                <a href="/tools/text-diff" class="hover:text-zinc-900 dark:hover:text-zinc-200 underline">Diff Checker</a>
                <span>•</span>
                <a href="/tools/base64-tool" class="hover:text-zinc-900 dark:hover:text-zinc-200 underline">Base64</a>
                <span>•</span>
                <a href="/tools/percentage-calculator" class="hover:text-zinc-900 dark:hover:text-zinc-200 underline">Percentage Calculator</a>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Favorites Section (if any exist) -->
        ${favTools.length > 0 && !this.searchQuery && this.currentCategory === 'all' ? `
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <h2 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                <i data-lucide="star" class="w-3.5 h-3.5 text-amber-500 fill-amber-500"></i>
                <span>Pinned Favorites</span>
              </h2>
            </div>
            <div class="${this.viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-1'}">
              ${favTools.map(t => this.renderToolItem(t)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Active View / Filter Bar -->
        <div class="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-3 pt-1">
          <div class="flex items-center gap-2.5">
            <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              ${this.searchQuery ? `Search Results for "${Utils.escapeHtml(this.searchQuery)}"` : (this.currentCategory === 'all' ? 'All Utilities' : this.currentCategory)}
            </h2>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">${tools.length}</span>
          </div>

          <!-- Density switcher for the section -->
          <div class="flex items-center gap-1 text-xs">
            <button class="view-btn p-1.5 rounded border text-xs font-medium transition ${this.viewMode === 'grid' ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}" data-mode="grid" title="Card Grid View">
              <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            </button>
            <button class="view-btn p-1.5 rounded border text-xs font-medium transition ${this.viewMode === 'compact' ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}" data-mode="compact" title="Compact List View">
              <i data-lucide="list" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Category Filter Chips Bar for Quick Filtering -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <a href="#/category/all" class="px-2.5 py-1 rounded-md border text-xs transition ${this.currentCategory === 'all' ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700 font-medium' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}">All (${allTools.length})</a>
          ${ToolRegistry.categories.filter(c => c.id !== 'all').map(c => {
            const isCatActive = this.currentCategory.toLowerCase() === c.name.toLowerCase();
            return `
              <a href="#/category/${encodeURIComponent(c.name)}" class="px-2.5 py-1 rounded-md border text-xs transition ${isCatActive ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 border-zinc-900 dark:border-zinc-700 font-medium' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}">
                ${c.name}
              </a>
            `;
          }).join('')}
        </div>

        <!-- Tools List / Grid Content -->
        ${tools.length === 0 ? `
          <div class="text-center py-16 p-8 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <i data-lucide="search-x" class="w-8 h-8 mx-auto text-zinc-400 mb-2"></i>
            <h3 class="text-sm font-semibold text-zinc-800 dark:text-zinc-200">No matching utilities found</h3>
            <p class="text-xs text-zinc-500 mt-1">Try another search keyword or select another category.</p>
            <button onclick="window.location.hash='#/'" class="mt-3 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">Clear Search</button>
          </div>
        ` : `
          <div class="${this.viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-1'}">
            ${tools.map(t => this.renderToolItem(t)).join('')}
          </div>
        `}

        <!-- Google AdSense Home Feed Placement -->
        ${Utils.renderAdUnit('slotHome', 'my-6')}
      </div>
      </div>
    `;

    // Hero search handler
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
      heroSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const navSearch = document.getElementById('nav-search');
        if (navSearch) navSearch.value = this.searchQuery;
        this.renderHome();
      });
    }

    // View switch buttons inside the view bar
    main.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.viewMode = btn.getAttribute('data-mode');
        Utils.storage.set('view_mode', this.viewMode);
        this.updateViewModeIcon();
        this.renderHome();
      });
    });

    // Favorite card buttons
    main.querySelectorAll('.card-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const toolId = btn.getAttribute('data-tool-id');
        Utils.storage.toggleFavorite(toolId);
        this.renderHome();
      });
    });

    Utils.refreshIcons();
    Utils.initAdUnits();
  },

  renderToolItem(tool) {
    const isFav = Utils.storage.isFavorite(tool.id);
    const iconName = Utils.getIconName(tool.icon, tool.category);

    if (this.viewMode === 'compact') {
      // Compact List Row View
      return `
        <a href="/tools/${tool.id}" class="tool-row flex items-center justify-between p-3 rounded-lg border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-[#11141a] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition group">
          <div class="flex items-center gap-3 min-w-0 pr-4">
            <div class="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center shrink-0 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition">
              <i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline truncate">${tool.title}</span>
                ${tool.badge ? `<span class="px-1.5 py-0.2 text-[9px] font-mono font-semibold rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">${tool.badge}</span>` : ''}
              </div>
              <p class="text-[11px] text-zinc-400 dark:text-zinc-500 truncate hidden sm:block">${tool.description}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hidden md:inline-block">${tool.category}</span>
            <button data-tool-id="${tool.id}" class="card-fav-btn p-1.5 rounded hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition ${isFav ? 'text-amber-500' : 'text-zinc-400 hover:text-amber-500'}" title="Favorite">
              <i data-lucide="star" class="w-3.5 h-3.5 ${isFav ? 'fill-amber-500' : ''}"></i>
            </button>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 transition-transform"></i>
          </div>
        </a>
      `;
    }

    // Clean Grid Card View
    return `
      <a href="/tools/${tool.id}" class="tool-card block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] hover:border-zinc-300 dark:hover:border-zinc-700 transition group relative">
        <div class="flex items-start justify-between mb-2">
          <div class="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
            <i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>
          </div>
          <button data-tool-id="${tool.id}" class="card-fav-btn p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-amber-500 ${isFav ? 'text-amber-500' : ''}" title="Favorite">
            <i data-lucide="star" class="w-3.5 h-3.5 ${isFav ? 'fill-amber-500' : ''}"></i>
          </button>
        </div>
        
        <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline tracking-tight">
          ${tool.title}
        </h3>
        
        <p class="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          ${tool.description}
        </p>

        <div class="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/60 pt-2">
          <span>${tool.category}</span>
        </div>
      </a>
    `;
  },

  renderToolView(toolId) {
    const tool = ToolRegistry.getToolById(toolId);
    const main = document.getElementById('main-content');
    if (!main) return;

    if (!tool) {
      main.innerHTML = `
        <div class="text-center py-20 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a]">
          <i data-lucide="alert-circle" class="w-10 h-10 mx-auto text-zinc-400 mb-3"></i>
          <h2 class="text-base font-bold text-zinc-900 dark:text-zinc-100">Utility Not Found</h2>
          <p class="text-xs text-zinc-500 mt-1">The requested utility does not exist in our catalog.</p>
          <a href="#/" class="inline-block mt-4 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold rounded-lg">Return to Catalog</a>
        </div>
      `;
      Utils.refreshIcons();
      return;
    }

    // Add to recents
    Utils.storage.addRecent(tool.id);

    // Update document metadata for SEO
    document.title = `${tool.title} - OmniTools`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', tool.description);
    }

    const isFav = Utils.storage.isFavorite(tool.id);
    const iconName = Utils.getIconName(tool.icon, tool.category);

    main.innerHTML = `
      <div class="space-y-5 max-w-4xl mx-auto">
        
        <!-- Breadcrumbs & Tool Action Buttons -->
        <div class="flex flex-wrap items-center gap-3 text-xs">
          <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
            <a href="#/" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">Catalog</a>
            <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
            <a href="#/category/${encodeURIComponent(tool.category)}" class="hover:text-zinc-900 dark:hover:text-zinc-200 transition">${tool.category}</a>
            <i data-lucide="chevron-right" class="w-3 h-3 text-zinc-400"></i>
            <span class="text-zinc-900 dark:text-zinc-200 font-medium">${tool.title}</span>
          </div>
        </div>

        <!-- Tool Header Banner -->
        <div class="tool-header-card p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800">
          <div class="flex items-start gap-3.5">
            <div class="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0">
              <i data-lucide="${iconName}" class="w-4 h-4"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h1 class="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                ${tool.title}
              </h1>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                ${tool.description}
              </p>
            </div>
          </div>
        </div>

        <!-- Interactive Tool Arena Container -->
        <div id="tool-arena" class="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800">
          <!-- Tool mounts here -->
        </div>

        <div class="tool-action-bar flex items-center gap-2">
          <button id="tool-fav-btn" class="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
            <i data-lucide="star" class="w-3.5 h-3.5 ${isFav ? 'text-amber-500 fill-amber-500' : 'text-zinc-400'}"></i>
            <span>${isFav ? 'Favorited' : 'Favorite'}</span>
          </button>
          <button id="tool-share-btn" class="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs">
            <i data-lucide="link" class="w-3.5 h-3.5 text-zinc-400"></i>
            <span>Share</span>
          </button>
          <button id="tool-embed-btn" class="px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11141a] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium transition flex items-center gap-1.5 text-xs" title="Copy embed code">
            <i data-lucide="code" class="w-3.5 h-3.5 text-zinc-400"></i>
            <span>Embed</span>
          </button>
        </div>

        <!-- Clean Privacy Note -->
        <div class="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
          <i data-lucide="shield" class="w-3.5 h-3.5"></i>
          <span>Your input stays on this device. Ads use cookies.</span>
        </div>

        <!-- Google AdSense In-Tool Responsive Placement -->
        ${Utils.renderAdUnit('slotTool', 'my-4')}

        <!-- SEO Article, Instructions & Technical Notes -->
        ${tool.seoContent ? `
          <div class="p-6 rounded-xl bg-white dark:bg-[#101319] border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-5 text-xs sm:text-sm">
            <div>
              <h2 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Overview & Purpose</h2>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm">
                ${tool.seoContent.overview}
              </p>
            </div>

            ${tool.seoContent.features && tool.seoContent.features.length > 0 ? `
              <div>
                <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Technical Capabilities</h3>
                <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  ${tool.seoContent.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${tool.seoContent.howTo && tool.seoContent.howTo.length > 0 ? `
              <div>
                <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">Usage Steps</h3>
                <ol class="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  ${tool.seoContent.howTo.map(step => `<li>${step}</li>`).join('')}
                </ol>
              </div>
            ` : ''}

            ${tool.seoContent.faqs && tool.seoContent.faqs.length > 0 ? `
              <div class="border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
                <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">FAQ</h3>
                <div class="space-y-2.5">
                  ${tool.seoContent.faqs.map(faq => `
                    <div class="p-3.5 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70">
                      <h4 class="font-semibold text-xs text-zinc-900 dark:text-zinc-100 mb-1">${faq.q}</h4>
                      <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">${faq.a}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;

    // Mount interactive tool logic
    const arena = document.getElementById('tool-arena');
    if (arena && typeof tool.render === 'function') {
      try {
        tool.render(arena);
      } catch (err) {
        console.error('Error rendering tool:', err);
        arena.innerHTML = `<div class="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-lg text-xs">Error rendering tool: ${err.message}</div>`;
      }
    }

    // Favorite button
    const favBtn = document.getElementById('tool-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const added = Utils.storage.toggleFavorite(tool.id);
        const starIcon = added 
          ? '<i data-lucide="star" class="w-3.5 h-3.5 text-amber-500 fill-amber-500"></i>' 
          : '<i data-lucide="star" class="w-3.5 h-3.5 text-zinc-400"></i>';
        favBtn.innerHTML = `${starIcon}<span>${added ? 'Favorited' : 'Favorite'}</span>`;
        Utils.refreshIcons();
      });
    }

    // Share button
    const shareBtn = document.getElementById('tool-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        Utils.copyToClipboard(window.location.href, 'Link copied to clipboard');
      });
    }

    // Embed button
    const embedBtn = document.getElementById('tool-embed-btn');
    if (embedBtn) {
      embedBtn.addEventListener('click', () => {
        const embedUrl = `${window.location.origin}/tools/${tool.id}?embed=true`;
        const iframeCode = `<iframe src="${embedUrl}" width="100%" height="450" frameborder="0" style="border:1px solid #e4e4e7;border-radius:12px;overflow:hidden;" title="${tool.title}"></iframe>`;
        Utils.copyToClipboard(iframeCode, 'Embed code copied to clipboard');
      });
    }

    Utils.refreshIcons();
    Utils.initAdUnits();
  }
};

window.App = App;
