/**
 * OmniTools - Central Tool Registry
 * Aggregates all category modules into an indexed catalog
 */

const ToolRegistry = {
  categories: [
    { id: "all", name: "All Tools", icon: "layers" },
    { id: "text", name: "Text & Formatting", icon: "file-text", count: 25 },
    { id: "dev", name: "Developer & Data", icon: "terminal", count: 28 },
    { id: "math", name: "Everyday Math & Converters", icon: "calculator", count: 25 },
    { id: "media", name: "Media, CSS & Design", icon: "palette", count: 16 },
    { id: "quick", name: "Quick Utilities & Life Tools", icon: "zap", count: 11 }
  ],

  // Dynamically compile all tools from global arrays
  getAllTools() {
    const list = [
      ...(window.textTools || []),
      ...(window.devTools || []),
      ...(window.mathTools || []),
      ...(window.mediaTools || []),
      ...(window.quickTools || [])
    ];
    return list;
  },

  getToolById(id) {
    return this.getAllTools().find(t => t.id === id);
  },

  getToolsByCategory(categoryName) {
    if (!categoryName || categoryName === 'All Tools' || categoryName === 'all') {
      return this.getAllTools();
    }
    return this.getAllTools().filter(t => t.category.toLowerCase() === categoryName.toLowerCase());
  },

  searchTools(query) {
    if (!query) return this.getAllTools();
    const q = query.toLowerCase().trim();
    return this.getAllTools().filter(t => {
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchKeywords = t.keywords && t.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchKeywords;
    });
  }
};

window.ToolRegistry = ToolRegistry;
