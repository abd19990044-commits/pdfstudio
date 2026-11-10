/* PDF Studio bilingual interface — works entirely in the browser. */
(() => {
  "use strict";

  const exactPairs = [
        ["منصة تحويل الصور وتقسيم ملفات PDF الاحترافية","PDF Studio — Image Conversion and PDF Tools"],
    ["تأكيد الإجراء","Confirm action"],
    ["هل أنت متأكد من رغبتك في إتمام هذا الإجراء؟","Are you sure you want to continue?"],
    ["إلغاء","Cancel"],
    ["تأكيد الحذف","Confirm deletion"],
    ["معاينة الصورة","Image preview"],
    ["ستوديو مستندات PDF","PDF Studio"],
    ["تحويل الصور بمقاس A4 وتقسيم ملفات PDF باحترافية","Convert images to A4 PDF and manage PDF pages"],
    ["تحويل صور إلى A4","Images to A4 PDF"],
    ["تقسيم ملف PDF","Split PDF"],
    ["اتجاه صفحة A4:","A4 page orientation:"],
    ["تلقائي (حسب كل صورة)","Automatic (per image)"],
    ["عمودي (Portrait)","Portrait"],
    ["أفقي (Landscape)","Landscape"],
    ["الهوامش:","Margins:"],
    ["بدون هوامش (ملء الورقة)","No margins"],
    ["هوامش صغيرة (5 ملم)","Small margins (5 mm)"],
    ["هوامش قياسية (15 ملم)","Standard margins (15 mm)"],
    ["تناسب الصورة:","Image fit:"],
    ["احتواء كامل مع الحفاظ على النسبة","Fit image (preserve aspect ratio)"],
    ["تغطية مع قص (يحافظ على نسبة الأبعاد)","Fill and crop (preserve aspect ratio)"],
    ["تفريغ القائمة","Clear list"],
    ["جاهز للتحميل","Ready to download"],
    ["1. تحويل الصور إلى PDF","1. Convert images to PDF"],
    ["2. حفظ وتحميل المستند","2. Download document"],
    ["اسحب الصور هنا أو انقر للاختيار","Drop images here or click to browse"],
    ["JPG, PNG, WEBP • حتى 100 صورة • تتم معالجة الملفات محلياً داخل المتصفح","JPG, PNG, WebP • Up to 100 images • Local browser processing"],
    ["اختر الصور من الجهاز","Choose images"],
    ["الصور المختارة للدمج","Selected images"],
    ["0 صورة","0 images"],
    ["اسحب البطاقات لإعادة الترتيب، أو استخدم الأسهم وزر التدوير","Drag cards to reorder, or use arrows and rotate controls"],
    ["اسحب ملف PDF هنا أو انقر للاختيار","Drop a PDF here or click to browse"],
    ["معاينة مرئية • اختيار دقيق • تحويل إلى صور","Visual preview • Precise selection • Image export"],
    ["اختر ملف PDF","Choose PDF"],
    ["إجمالي الصفحات:","Total pages:"],
    ["صفحة • الحجم:","pages • Size:"],
    ["تغيير الملف","Change file"],
    ["نطاق الصفحات المطلوب استخراجها:","Pages to extract:"],
    ["يدعم الأرقام العربية والإنجليزية (مثال: 1-3, 5)","Arabic and Western numerals supported (e.g., 1-3, 5)"],
    ["تطبيق","Apply"],
    ["تحديد الكل","Select all"],
    ["إلغاء التحديد","Clear selection"],
    ["الصفحات الفردية","Odd pages"],
    ["الصفحات الزوجية","Even pages"],
    ["تم تحديد 0 صفحة","0 pages selected"],
    ["طريقة الحفظ والتصدير:","Export method:"],
    ["دمج الصفحات المحددة في ملف PDF واحد جديد","Combine selected pages into one PDF"],
    ["حفظ كل صفحة محددة كملف منفصل","Save each page as a separate PDF"],
    ["جاهز للتنزيل","Ready to download"],
    ["1. معالجة وتقسيم الصفحات","1. Extract selected pages"],
    ["2. تحميل الملفات الناتجة","2. Download output files"],
    ["الملفات الناتجة المنفصلة (يمكنك تحميل كل صفحة مفردة أو تحميل الكل كملف ZIP):","Separate PDFs (download individually or as a ZIP):"],
    ["تحميل الكل كملف ZIP مضغوط","Download all as ZIP"],
    ["تحويل الصفحات المحددة إلى صور","Convert selected pages to images"],
    ["جديد","New"],
    ["صيغة الصورة:","Image format:"],
    ["PNG - جودة عالية","PNG — High quality"],
    ["JPEG - حجم صغير","JPEG — Smaller file"],
    ["WEBP - حديث","WebP — Modern"],
    ["دقة الصورة:","Image resolution:"],
    ["عادية 1x","Standard 1×"],
    ["متوسطة 1.5x","Medium 1.5×"],
    ["عالية 2x - موصى به","High 2× — Recommended"],
    ["فائقة 3x - للطباعة","Ultra 3× — For printing"],
    ["طريقة التسمية:","Filename style:"],
    ["اسم_الملف_صفحة_5","filename_page_5"],
    ["اسم_الملف_005","filename_005"],
    ["5 فقط","Page number only"],
    ["تحويل إلى صور","Convert to images"],
    ["تحميل الصور ZIP","Download images as ZIP"],
    ["جارٍ التحويل...","Converting..."],
    ["الصور المحولة (","Converted images ("],
    ["تحميل فردي","Individual download"],
    ["معاينة الصفحات (انقر على أي صفحة لتحديدها أو إلغائها):","Page previews (click to select or deselect):"],
    ["جارٍ إنشاء المعاينات المرئية للصفحات بدقة عالية...","Generating high-resolution page thumbnails..."],
    ["جارٍ معالجة المستند","Processing document"],
    ["يرجى الانتظار، تتم العملية بدقة عالية داخل متصفحك...","Please wait while processing takes place locally in your browser..."],
    ["تتم معالجة محتوى الملفات محلياً داخل المتصفح • المكتبات الخارجية مثبتة بإصدارات محددة وتخضع للتحقق من السلامة","Files are processed locally in your browser • External libraries have pinned versions and integrity checks"],
    ["إغلاق المعاينة","Close preview"],
    ["أدوات المستندات","Document tools"],
    ["منطقة سحب وإفلات الصور","Image drop zone"],
    ["اختيار صور","Choose images"],
    ["منطقة سحب وإفلات ملف PDF","PDF drop zone"],
    ["اختيار ملف PDF","Choose PDF file"],
    ["تقدم العملية","Operation progress"],
    ["يرجى الانتظار لحظات...","Please wait a moment..."],
    ["هناك عملية أخرى قيد التنفيذ حالياً.","Another operation is currently running."],
    ["لا يوجد مستند PDF محمّل.","No PDF document is loaded."],
    ["صيغة النطاق غير صحيحة. استخدم مثلاً: 1-5, 8, 10.","Invalid page range. Use 1-5, 8, 10, for example."],
    ["لم يتم العثور على صفحات صالحة.","No valid pages found."],
    ["انتظر اكتمال العملية الحالية قبل إضافة ملفات جديدة.","Wait for the current operation to finish before adding files."],
    ["اسحب لإعادة ترتيب الصورة","Drag to reorder image"],
    ["تقديم الصورة","Move image earlier"],
    ["تأخير الصورة","Move image later"],
    ["تدوير 90 درجة","Rotate 90 degrees"],
    ["حذف الصورة","Remove image"],
    ["تمت إزالة الصورة من القائمة.","Image removed."],
    ["تفريغ قائمة الصور","Clear image list"],
    ["هل تريد حذف جميع الصور المحددة من القائمة؟","Remove all selected images?"],
    ["تم تفريغ قائمة الصور.","Image list cleared."],
    ["ملف صورة","image file"],
    ["تعذر ترميز الصورة في المتصفح.","Browser could not encode the image."],
    ["تعذر إنشاء مساحة الرسم في المتصفح.","Could not create a drawing canvas."],
    ["أضف صورة واحدة على الأقل أولاً.","Add at least one image first."],
    ["مكتبة إنشاء PDF لم تُحمّل. تحقق من اتصال الإنترنت ثم أعد فتح الصفحة.","PDF creation library failed to load. Check your connection and reload."],
    ["جارٍ تحويل الصور إلى صفحات A4","Converting images to A4 pages"],
    ["تتم المعالجة داخل المتصفح مع الحفاظ على ترتيب الصور.","Processing locally while preserving image order."],
    ["تم إلغاء العملية بسبب تغير المدخلات.","Operation cancelled because inputs changed."],
    ["إعداد الهوامش غير صالح.","Invalid margins."],
    ["تم إنشاء ملف PDF بنجاح.","PDF created successfully."],
    ["نفّذ التحويل أولاً.","Convert first."],
    ["انتظر اكتمال العملية الحالية قبل تحميل ملف آخر.","Wait for the current operation to finish before loading another file."],
    ["مكتبة قراءة PDF لم تُحمّل. تحقق من اتصال الإنترنت ثم أعد فتح الصفحة.","PDF reader failed to load. Check your connection and reload."],
    ["الملف المحدد لا يحمل توقيع PDF صالحاً.","Selected file has no valid PDF signature."],
    ["جارٍ قراءة ملف PDF","Loading PDF"],
    ["يتم التحقق من الملف وتحضير الصفحات...","Validating PDF and preparing pages..."],
    ["ملفات PDF المشفرة أو المحمية بكلمة مرور غير مدعومة دون فك الحماية أولاً.","Unlock encrypted or password-protected PDFs before use."],
    ["الملف تالف أو غير مدعوم.","File is damaged or unsupported."],
    ["محددة","selected"],
    ["غير محددة","not selected"],
    ["معاينة","Preview"],
    ["تعذرت المعاينة","Preview unavailable"],
    ["اضغط تطبيق","click Apply"],
    ["تم تحديد الصفحات الفردية.","Odd pages selected."],
    ["تم تحديد الصفحات الزوجية.","Even pages selected."],
    ["حمّل ملف PDF أولاً.","Load a PDF first."],
    ["مكتبة PDF المطلوبة لم تُحمّل.","Required PDF library failed to load."],
    ["حدد صفحة واحدة على الأقل.","Select at least one page."],
    ["جارٍ معالجة الصفحات المحددة","Processing selected pages"],
    ["يتم نسخ صفحات PDF دون تحويلها إلى صور.","Copying PDF pages without rasterizing them."],
    ["تم إلغاء العملية بسبب تغير التحديد.","Operation cancelled because selection changed."],
    ["اكتملت معالجة الصفحات.","Page processing complete."],
    ["2. تحميل ملف PDF المدمج","2. Download combined PDF"],
    ["2. تحميل الكل كملف ZIP","2. Download all as ZIP"],
    ["2. تحميل الملفات المنفصلة","2. Download separate files"],
    ["تمت معالجة الصفحات بنجاح.","Selected pages processed successfully."],
    ["لا يمكن تقسيم ملف PDF مشفر دون فك الحماية أولاً.","Unlock encrypted PDF before splitting."],
    ["تنزيل","Download"],
    ["نفّذ معالجة الصفحات أولاً.","Process pages first."],
    ["جارٍ تجهيز ملف ZIP","Preparing ZIP archive"],
    ["يتم جمع ملفات PDF الناتجة دون إعادة ضغط غير ضرورية.","Packaging PDF files without unnecessary recompression."],
    ["قد يطلب المتصفح السماح بتنزيل عدة ملفات.","Your browser may request permission for multiple downloads."],
    ["يتم جمع الصور الناتجة دون نسخ إضافية غير ضرورية.","Packaging generated images."],
    ["تحميل","Download"],
    ["حوّل الصفحات إلى صور أولاً.","Convert pages to images first."],
    ["تعذر بدء التنزيل. استخدم متصفحاً حديثاً وتأكد من السماح بالتنزيلات.","Download failed. Use a modern browser and allow downloads."],
    ["صيغة SRI الخاصة بعامل PDF غير صالحة.","Invalid PDF worker SRI format."],
    ["المتصفح لا يدعم Web Crypto المطلوب للتحقق من سلامة PDF Worker.","Browser does not support Web Crypto for PDF worker integrity checks."],
    ["فشل التحقق من سلامة PDF Worker (SRI mismatch).","PDF worker integrity verification failed."],
    ["تم تحميل PDF Worker لكن WorkerMessageHandler غير متاح.","PDF worker loaded, but WorkerMessageHandler is unavailable."],
    ["تعذر تشغيل PDF Worker الموثق في المسار المحلي.","Could not start verified PDF worker locally."],
    ["JSZip غير متاح؛ سيظل التنزيل الفردي يعمل دون ZIP.","JSZip is unavailable; individual downloads still work."],
    ["WEBP - غير مدعوم في هذا المتصفح","WebP — Not supported in this browser"],
    ["خطأ غير معروف","Unknown error"],
    ["اختبارات ذاتية","Self-tests"],
    ["ناجحة.","passed."],
    ["صفحة","page"],
    ["صورة","image"],
    ["صور","images"],
    ["الصفحة","page"],
    ["معاينة الصفحة","Page preview"]
  ];

  const templatePairs = [
        ["الحد الأقصى هو {{n}} صورة.","Maximum: {{n}} images."],
    ["تم تجاهل الملفات غير المدعومة أو الزائدة عن حد {{n}} صورة.","Unsupported files or images beyond the {{n}}-image limit were skipped."],
    ["تمت إضافة {{n}} صورة بنجاح.","{{n}} images added successfully."],
    ["تم رفض {{n}} ملف لعدم صلاحيته أو لتجاوزه حدود الحجم الآمنة.","{{n}} files rejected as invalid or too large."],
    ["{{n}} صورة","{{n}} image"],
    ["{{n}} صور","{{n}} images"],
    ["صفحة A4 #{{n}}","A4 page #{{n}}"],
    ["تكبير معاينة {{name}}","Enlarge preview of {{name}}"],
    ["تعذر قراءة الصورة: {{name}}","Cannot read image: {{name}}"],
    ["أبعاد الصورة غير صالحة: {{name}}","Invalid image dimensions: {{name}}"],
    ["معالجة الصورة {{n}} من {{total}}...","Processing image {{n}} of {{total}}..."],
    ["تمت معالجة {{n}} من {{total}}","Processed {{n}} of {{total}}"],
    ["جاهز للتحميل ({{info}} • {{n}} صفحة)","Ready to download ({{info}} • {{n}} pages)"],
    ["تعذر تحويل الصور: {{error}}","Could not convert images: {{error}}"],
    ["حجم ملف PDF يجب ألا يتجاوز {{size}} لهذه النسخة المتصفحية.","PDF size must not exceed {{size}} in this browser version."],
    ["عدد الصفحات ({{n}}) يتجاوز الحد الآمن لهذه الواجهة ({{limit}}).","Page count ({{n}}) exceeds the supported limit ({{limit}})."],
    ["تم تحميل ملف PDF بنجاح ({{n}} صفحة).","PDF loaded successfully ({{n}} pages)."],
    ["فشل تحميل ملف PDF: {{error}}","PDF loading failed: {{error}}"],
    ["الصفحة {{n}}: {{status}}","Page {{n}}: {{status}}"],
    ["تم تحديد {{n}} من أصل {{total}} صفحة","{{n}} of {{total}} pages selected"],
    ["المدى الحالي: {{range}}","Current range: {{range}}"],
    ["معاينة: {{n}} صفحة ({{sample}}) — اضغط تطبيق","Preview: {{n}} pages ({{sample}}) — click Apply"],
    ["تم تطبيق: {{n}} صفحة — {{range}}","Applied: {{n}} pages — {{range}}"],
    ["تم تحديد {{n}} صفحة.","{{n}} pages selected."],
    ["رقم الصفحة {{n}} خارج النطاق 1-{{max}}.","Page {{n}} is outside 1–{{max}}."],
    ["الجزء \"{{part}}\" غير صالح.","Invalid range segment \"{{part}}\"."],
    ["النطاق {{range}} خارج حدود المستند 1-{{max}}.","Range {{range}} is outside 1–{{max}}."],
    ["التصدير الفردي محدود إلى {{n}} صفحة في العملية الواحدة لتجنب استهلاك الذاكرة المفرط.","Individual export limited to {{n}} pages to reduce memory usage."],
    ["تجهيز الصفحة {{n}} من {{total}}...","Preparing page {{n}} of {{total}}..."],
    ["تم تجهيز {{n}} صفحة في ملف واحد","{{n}} pages prepared in one PDF"],
    ["تم تجهيز {{n}} ملف PDF منفصل","{{n}} separate PDFs prepared"],
    ["تعذر معالجة PDF: {{error}}","PDF processing failed: {{error}}"],
    ["تنزيل {{name}}","Download {{name}}"],
    ["تحويل الصور محدود إلى {{n}} صفحة في العملية الواحدة حفاظاً على الذاكرة.","Image export limited to {{n}} pages per operation."],
    ["جارٍ تحويل {{n}} صفحة إلى صور","Converting {{n}} pages to images"],
    ["الدقة المختارة: {{n}}x","Selected resolution: {{n}}×"],
    ["تحويل الصفحة {{page}} ({{n}}/{{total}})...","Converting page {{page}} ({{n}}/{{total}})..."],
    ["تم تحويل {{n}} صفحة بنجاح.","{{n}} pages converted successfully."],
    ["تم تحويل {{n}} صفحة.","{{n}} pages converted."],
    ["تحميل {{n}} صورة كـ ZIP","Download {{n}} images as ZIP"],
    ["تم تحويل {{n}} صفحة إلى صور.","{{n}} PDF pages converted to images."],
    ["تعذر تحويل الصفحات إلى صور: {{error}}","Could not convert PDF pages to images: {{error}}"],
    ["تكبير معاينة الصفحة {{n}}","Enlarge preview of page {{n}}"],
    ["معاينة الصفحة {{n}}","Preview of page {{n}}"],
    ["صفحة #{{n}}","Page #{{n}}"],
    ["تعذر تحميل PDF Worker ({{status}}).","Could not load PDF worker ({{status}})."],
    ["تعذر تحميل: {{libs}}. تمنع سياسة الأمان تشغيل نسخة CDN غير متحقق منها.","Failed to load: {{libs}}. Security policy blocks unverified CDN resources."],
    ["تعذر تهيئة محرك PDF.js: {{error}}","Failed to initialize PDF.js: {{error}}"],
    ["اختبارات ذاتية: {{n}}/{{total}} ناجحة.","Self-tests: {{n}}/{{total}} passed."]
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
    let preferred = "en";
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
