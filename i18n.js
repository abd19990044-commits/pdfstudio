/* PDF Studio bilingual interface — works entirely in the browser. */
(() => {
  "use strict";

  const exactPairs = [
    // EXACT_TRANSLATIONS
  ];

  const templatePairs = [
    // TEMPLATE_TRANSLATIONS
  ];

  const exact = new Map(exactPairs);
  const escapeRegex = (value) => Array.from(value, (ch) =>
    ".+*?^$()[]{}|\\".includes(ch) ? "\\" + ch : ch).join("");

  const patterns = templatePairs.map(([source, english]) => {
    const keys = [];
    let expression = "^";
    source.split(/(\{\{[^{}]+\}\})/g).forEach((part) => {
      if (part.startsWith("{{") && part.endsWith("}}")) {
        keys.push(part.slice(2, -2));
        expression += "([\\s\\S]*?)";
      } else expression += escapeRegex(part);
    });
    expression += "$";
    return {
      regex: new RegExp(expression),
      keys, english,
      specificity: source.replace(/\{\{[^}]+\}\}/g, "").length
    };
  }).sort((a, b) => b.specificity - a.specificity);

  function englishFor(source) {
    const trimmed = source.trim();
    if (!/[\u0600-\u06FF]/.test(trimmed)) return source;
    let translated = exact.get(trimmed);
    if (translated == null) {
      for (const { regex, keys, english } of patterns) {
        const match = trimmed.match(regex);
        if (!match) continue;
        const values = Object.create(null);
        keys.forEach((key, index) => { values[key] = match[index + 1]; });
        translated = english.replace(/\{\{([^{}]+)\}\}/g, (_, key) => values[key] ?? "");
        break;
      }
    }
    if (translated == null) return source;
    return source.match(/^\s*/)[0] + translated + source.match(/\s*$/)[0];
  }

  const SKIP = "#languageSwitcher, script, style, noscript, textarea, code, pre, [data-no-i18n]";
  const attributes = ["title", "aria-label", "placeholder", "alt"];
  const textHistory = new WeakMap();
  const attributeHistory = new WeakMap();
  const STORAGE_KEY = "pdfstudio.language";
  let language = "ar";

  function processText(node) {
    if (!node.parentElement || node.parentElement.closest(SKIP)) return;
    const current = node.nodeValue;
    const previous = textHistory.get(node);
    const source = previous && current === previous.shown ? previous.source : current;
    const next = language === "en" ? englishFor(source) : source;
    if (current !== next) node.nodeValue = next;
    textHistory.set(node, { source, shown: next });
  }

  function processAttributes(element) {
    if (element.closest(SKIP)) return;
    let memo = attributeHistory.get(element);
    if (!memo) {
      memo = new Map();
      attributeHistory.set(element, memo);
    }
    for (const name of attributes) {
      if (!element.hasAttribute(name)) continue;
      const current = element.getAttribute(name);
      const previous = memo.get(name);
      const source = previous && current === previous.shown ? previous.source : current;
      const next = language === "en" ? englishFor(source) : source;
      if (current !== next) element.setAttribute(name, next);
      memo.set(name, { source, shown: next });
    }
  }

  function processTree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      processText(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) processAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) processText(node);
      else processAttributes(node);
    }
  }

  function applyLanguage(next, save = true) {
    language = next === "en" ? "en" : "ar";
    document.documentElement.lang = language;
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
    document.body.classList.toggle("pdfstudio-ltr", language === "en");
    const ar = document.getElementById("langArBtn");
    const en = document.getElementById("langEnBtn");
    for (const [button, active] of [[ar, language === "ar"], [en, language === "en"]]) {
      if (!button) continue;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("bg-white", active);
      button.classList.toggle("text-brand-700", active);
      button.classList.toggle("shadow-sm", active);
      button.classList.toggle("text-slate-600", !active);
      button.classList.toggle("hover:text-slate-900", !active);
    }
    processTree(document.documentElement);
    if (save) {
      try { localStorage.setItem(STORAGE_KEY, language); } catch (_) { /* storage unavailable */ }
    }
  }

  function init() {
    const ar = document.getElementById("langArBtn");
    const en = document.getElementById("langEnBtn");
    if (!ar || !en) return;
    ar.addEventListener("click", () => applyLanguage("ar"));
    en.addEventListener("click", () => applyLanguage("en"));
    let preferred = "ar";
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") preferred = stored;
    } catch (_) { /* private browsing */ }
    applyLanguage(preferred, false);

    // Translate newly rendered previews, status labels, validation and toast messages.
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") processText(record.target);
        else if (record.type === "attributes") processAttributes(record.target);
        else for (const node of record.addedNodes) processTree(node);
      }
    });
    observer.observe(document.documentElement, {
      subtree: true, childList: true, characterData: true, attributes: true,
      attributeFilter: attributes
    });
    window.PDFStudioI18n = Object.freeze({
      setLanguage: (value) => applyLanguage(value),
      getLanguage: () => language
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else init();
})();
