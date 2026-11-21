/**
 * Runtime translations for tool widgets and the homepage catalog.
 * Phrase tables live in /js/i18n/{lang}.js and set window.OMNI_PHRASES.
 */
(function () {
  function normalize(s) {
    return String(s).replace(/\s+/g, " ").trim();
  }

  function t(s) {
    if (!window.OMNI_LANG || s == null) return s;
    const table = window.OMNI_PHRASES || {};
    const key = normalize(s);
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : s;
  }

  function translateRoot(root) {
    if (!window.OMNI_LANG || !root) return;
    const table = window.OMNI_PHRASES || {};
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const raw = node.nodeValue;
      if (!raw || !raw.trim()) return;
      const key = normalize(raw);
      if (!Object.prototype.hasOwnProperty.call(table, key) || table[key] === key) return;
      const lead = raw.match(/^\s*/)[0];
      const tail = raw.match(/\s*$/)[0];
      node.nodeValue = lead + table[key] + (tail === raw ? "" : tail);
    });
    root.querySelectorAll("[placeholder], [title], [aria-label]").forEach((el) => {
      ["placeholder", "title", "aria-label"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const key = normalize(value);
        if (Object.prototype.hasOwnProperty.call(table, key)) el.setAttribute(attr, table[key]);
      });
    });
  }

  window.OmniI18n = { t, translateRoot };
})();
