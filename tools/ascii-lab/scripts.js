/* ASCII Lab — bundled for GitHub Pages. No build step required. */

/* ===== i18n.js ===== */
(function (root) {
  'use strict';
  const KEY = 'ascii-lab-language';
  const EN = {
  "跳到圖片轉換工具": "Skip to the converter",
  "網站導覽": "Site navigation",
  "You-Ting Liu 首頁": "You-Ting Liu home",
  "介面語言": "Interface language",
  "切換網站深淺色模式": "Toggle site theme",
  "切換為深色模式": "Switch to dark mode",
  "切換為淺色模式": "Switch to light mode",
  "把照片與梗圖，變成可以貼進終端機的文字畫。": "Turn photos and memes into text art for your terminal.",
  "從一張圖片開始，讓字元拼出你的下一個靈感。": "Start with an image. Let characters bring your next idea to life.",
  "圖片留在你的裝置": "Images stay on your device",
  "圖片與設定": "Image & settings",
  "試用範例 ↗": "Try a demo ↗",
  "選擇圖片": "Choose image",
  "或拖曳、貼上": "or drop / paste",
  "原始圖片預覽；開啟裁切後可拖曳框選": "Source image preview. Enable cropping to drag a selection.",
  "裁切中": "Crop mode",
  "範例：太空貓": "Demo: Space cat",
  "拖曳框選裁切": "Drag to crop",
  "還原": "Reset",
  "在圖片上拖曳，保留想轉換的範圍。": "Drag across the image to select the area to convert.",
  "每行字元數": "Characters per line",
  "輪廓簡潔": "Simpler shapes",
  "細節豐富": "More detail",
  "字元風格": "Character set",
  "經典 ASCII · . : - = + * # % @": "Classic ASCII · . : - = + * # % @",
  "梗圖風格 · . ! : #": "Meme · . ! : #",
  "終端機 · ! i t f L C G @": "Terminal · ! i t f L C G @",
  "圓點 · . o O 0 @": "Dots · . o O 0 @",
  "自訂字元": "Custom",
  "自訂字元，由稀疏排到密集": "Custom characters, ordered from sparse to dense",
  "由稀疏排到密集，空格也算一個字元。": "Order from sparse to dense. Spaces count as characters.",
  "對比": "Contrast",
  "亮度": "Brightness",
  "亮暗反轉": "Invert tones",
  "抖色": "Dithering",
  "進階設定": "Advanced settings",
  "中間調": "Gamma",
  "字元長寬補償": "Character aspect ratio",
  "圖案看起來太扁或太長時，可以調整這裡。": "Adjust if the image looks too wide or too tall.",
  "重設所有效果": "Reset all effects",
  "文字畫預覽": "Output preview",
  "切換預覽亮暗主題": "Toggle preview theme",
  "輸出內容": "Output content",
  "請長按或按 Ctrl+C 複製": "Long-press or press Ctrl+C to copy",
  "準備中": "Loading",
  "匯出語言": "Export language",
  "純文字": "Plain text",
  "複製文字": "Copy text",
  "下載 art.txt": "Download art.txt",
  "© 2026 劉祐廷 You-Ting Liu.": "© 2026 You-Ting Liu.",
  "{count} 個字元": "{count} characters",
  "{columns} 欄 × {rows} 列": "{columns} columns × {rows} rows",
  "請調整設定": "Adjust your settings",
  "請選擇圖片檔案。": "Please choose an image file.",
  "圖片超過 40 MB，請先縮小圖片。": "The image exceeds 40 MB. Please resize it first.",
  "圖片已載入，可以開始調整。": "Image loaded. Ready to adjust.",
  "這個瀏覽器無法開啟 HEIC / HEIF，請先轉成 JPG 或 PNG 再上傳。": "This browser cannot open HEIC / HEIF. Convert it to JPG or PNG first.",
  "無法開啟這張圖片，請改用 JPG、PNG 或 WebP。": "Cannot open this image. Try JPG, PNG, or WebP.",
  "已複製！貼上時記得使用等寬字型。": "Copied! Use a monospace font when pasting.",
  "已複製文字畫。": "Text art copied.",
  "文字已選取，請按 Ctrl+C / ⌘C，或長按複製。": "Text selected. Press Ctrl+C / ⌘C, or long-press to copy.",
  "下載已開始。": "Download started.",
  "請輸入 2–64 個半形 ASCII 字元，包含空格；由稀疏排到密集。": "Enter 2–64 printable ASCII characters, including spaces, from sparse to dense.",
  "至少需要兩種不同的字元。": "Use at least two different characters.",
  "圖片尺寸不正確。": "Invalid image dimensions.",
  "圖片太長，請減少每行字元數或先裁切圖片。": "The image is too tall. Use fewer columns or crop it first.",
  "像素資料長度不正確。": "Invalid pixel data length.",
  "不支援的輸出語言。": "Unsupported export language.",
  "圖片轉 ASCII 文字畫工具。支援裁切、效果調整，以及 Verilog、C、Python、Bash 匯出。": "Convert images to ASCII art. Crop, adjust effects, and export Verilog, C, Python, or Bash.",
  "把照片與梗圖變成 ASCII 文字畫，匯出純文字、Verilog、C、Python 或 Bash。": "Turn photos and memes into ASCII art. Export plain text, Verilog, C, Python, or Bash.",
  "字型": "Font",
  "輸出寬度": "Output width",
  "等寬字體（系統）": "System monospace",
  "一般字體（系統）": "System sans-serif",
  "未安裝": "Not installed",
  "{count} 字元": "{count} characters",
  "{width} px": "{width} px",
  "{width} px × {rows} 列": "{width} px × {rows} rows",
  "複製（保留字型）": "Copy with font",
  "下載文字畫 PNG": "Download art as PNG",
  "已複製（含字型）；貼到 Word 時請保留來源格式。": "Copied with font. Choose Keep Source Formatting in Word.",
  "已複製純文字；字型需在貼上後自行設定。": "Plain text copied. Set the font after pasting.",
  "圖片匯出失敗，請縮小輸出範圍。": "Image export failed. Try a smaller output.",
  "圖片下載已開始。": "Image download started.",
  "字型資料不正確。": "Invalid font metrics."
};
  const normalize = value => value === 'en' ? 'en' : 'zh-TW';
  function translate(key, language, params = {}) {
    const text = normalize(language) === 'en' ? EN[key] ?? key : key;
    return text.replace(/\{(\w+)\}/g, (match, name) => Object.hasOwn(params, name) ? String(params[name]) : match);
  }
  function read(storage) {
    try { return normalize(storage?.getItem(KEY)); }
    catch (_) { return 'zh-TW'; }
  }
  function write(storage, language) {
    try { storage?.setItem(KEY, normalize(language)); } catch (_) { }
  }
  function applyDocument(doc, language) {
    language = normalize(language);
    doc.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant';
    for (const element of doc.querySelectorAll('[data-i18n]')) element.textContent = translate(element.getAttribute('data-i18n'), language);
    for (const attribute of ['aria-label', 'title', 'content']) {
      for (const element of doc.querySelectorAll('[data-i18n-' + attribute + ']')) element.setAttribute(attribute, translate(element.getAttribute('data-i18n-' + attribute), language));
    }
    const selector = doc.getElementById('site-language');
    if (selector) selector.value = language;
    for (const option of doc.querySelectorAll('[data-language]')) option.setAttribute('aria-checked', String(option.getAttribute('data-language') === language));
  }
  function bindLanguageMenu(doc, onSelect) {
    const trigger = doc.getElementById('site-language');
    const menu = doc.getElementById('site-language-menu');
    const options = Array.from(menu.querySelectorAll('[data-language]'));
    function close(restoreFocus = false) {
      menu.hidden = true; trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    }
    function open(index) {
      menu.hidden = false; trigger.setAttribute('aria-expanded', 'true');
      (options[index] || options.find(option => option.getAttribute('aria-checked') === 'true') || options[0]).focus();
    }
    trigger.addEventListener('click', () => menu.hidden ? open() : close());
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(event.key === 'ArrowUp' ? options.length - 1 : 0); }
    });
    options.forEach(option => option.addEventListener('click', () => { onSelect(option.getAttribute('data-language')); close(true); }));
    menu.addEventListener('keydown', event => {
      const index = options.indexOf(doc.activeElement);
      if (event.key === 'Escape') { event.preventDefault(); close(true); }
      else if (event.key === 'Tab') close(true);
      else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
        options[next].focus();
      }
    });
    doc.addEventListener('click', event => { if (!menu.hidden && !trigger.contains(event.target) && !menu.contains(event.target)) close(); });
    doc.addEventListener('focusin', event => { if (!menu.hidden && !trigger.contains(event.target) && !menu.contains(event.target)) close(); });
  }
  const api = { EN, normalize, translate, read, write, applyDocument, bindLanguageMenu };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else {
    let storage;
    try { storage = root.localStorage; } catch (_) { }
    let language = read(storage);
    root.document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant';
    function setLanguage(value, persist = true) {
      language = normalize(value);
      if (persist) write(storage, language);
      applyDocument(root.document, language);
      root.dispatchEvent(new Event('site-language-change'));
    }
    root.AsciiI18n = { t: (key, params) => translate(key, language, params), getLanguage: () => language, setLanguage };
    root.document.addEventListener('DOMContentLoaded', () => {
      applyDocument(root.document, language);
      bindLanguageMenu(root.document, setLanguage);
    });
    root.addEventListener('storage', event => {
      if (event.key === KEY || event.key === null) setLanguage(read(storage), false);
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== theme.js ===== */
(function (root) {
  'use strict';
  // Use the portfolio's existing "theme" preference on the same origin.
  function read(storage) {
    try { return storage?.getItem('theme') === 'light' ? 'light' : ''; }
    catch (_) { return ''; }
  }
  function write(storage, theme) {
    try { storage?.setItem('theme', theme === 'light' ? 'light' : ''); }
    catch (_) { /* Theme switching still works when storage is unavailable. */ }
  }
  function apply(doc, theme) {
    const light = theme === 'light';
    doc.documentElement.setAttribute('data-theme', light ? 'light' : '');
    doc.documentElement.style.colorScheme = light ? 'light' : 'dark';
    const meta = doc.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#ffffff' : '#1a1a1a');
    const toggle = doc.getElementById('site-theme');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(light));
      const label = light ? '切換為深色模式' : '切換為淺色模式';
      toggle.setAttribute('aria-label', root.AsciiI18n ? root.AsciiI18n.t(label) : label);
    }
  }
  const api = { read, write, apply };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else {
    let storage;
    try { storage = root.localStorage; } catch (_) { }
    apply(root.document, read(storage));
    root.document.addEventListener('DOMContentLoaded', () => {
      apply(root.document, read(storage));
      root.document.getElementById('site-theme').addEventListener('click', () => {
        const next = root.document.documentElement.getAttribute('data-theme') === 'light' ? '' : 'light';
        apply(root.document, next); write(storage, next);
        root.dispatchEvent(new Event('site-theme-change'));
      });
    });
    root.addEventListener('storage', event => {
      if (event.key === 'theme' || event.key === null) { apply(root.document, read(storage)); root.dispatchEvent(new Event('site-theme-change')); }
    });
    root.addEventListener('site-language-change', () => apply(root.document, root.document.documentElement.getAttribute('data-theme')));
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== ascii-core.js ===== */
/** Browser-independent conversion and export helpers. */
(function (root) {
  'use strict';
  const RAMPS = {
    classic: ' .:-=+*#%@',
    terminal: ' .,:;!i1tfLCG08@',
    meme: ' .!:#',
    blocks: ' .oO0@'
  };
  function validateRamp(value) {
    if (!/^[\x20-\x7e]{2,64}$/.test(value)) {
      throw new Error('請輸入 2–64 個半形 ASCII 字元，包含空格；由稀疏排到密集。');
    }
    const ramp = Array.from(new Set(value)).join('');
    if (ramp.length < 2) throw new Error('至少需要兩種不同的字元。');
    return ramp;
  }
  function dimensions(width, height, columns, aspect) {
    if (!(width > 0 && height > 0)) throw new Error('圖片尺寸不正確。');
    const cols = Math.max(16, Math.min(200, Math.round(columns)));
    const rows = Math.max(1, Math.round(height / width * cols * aspect));
    if (rows > 1000) throw new Error('圖片太長，請減少每行字元數或先裁切圖片。');
    return { cols, rows };
  }
  function convert(data, width, height, options = {}) {
    const ramp = validateRamp(options.ramp ?? RAMPS.classic);
    if (data.length !== width * height * 4) throw new Error('像素資料長度不正確。');
    const brightness = Number(options.brightness || 0);
    const contrast = Number(options.contrast ?? 1);
    const gamma = Number(options.gamma ?? 1);
    const values = new Float32Array(width * height);
    for (let i = 0; i < values.length; i++) {
      const k = i * 4, alpha = data[k + 3] / 255;
      const luminance = (.2126 * data[k] + .7152 * data[k + 1] + .0722 * data[k + 2]) * alpha + 255 * (1 - alpha);
      let v = Math.max(0, Math.min(255, (luminance - 127.5) * contrast + 127.5 + brightness));
      v = 255 * Math.pow(v / 255, 1 / gamma);
      values[i] = options.invert ? 255 - v : v;
    }
    const lines = [];
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const v = Math.max(0, Math.min(255, values[i]));
        const index = Math.round(v / 255 * (ramp.length - 1));
        line += ramp[index];
        if (options.dither) {
          const error = v - index / (ramp.length - 1) * 255;
          if (x + 1 < width) values[i + 1] += error * 7 / 16;
          if (y + 1 < height) {
            if (x > 0) values[i + width - 1] += error * 3 / 16;
            values[i + width] += error * 5 / 16;
            if (x + 1 < width) values[i + width + 1] += error / 16;
          }
        }
      }
      lines.push(line);
    }
    return lines.join('\n');
  }
  function verilog(ascii) {
    const escaped = ascii.split('\n').map(line => '  $display("%s", "' + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '");');
    return '// ASCII art — paste into your testbench\ninitial begin\n' + escaped.join('\n') + '\nend\n';
  }
  function exportText(ascii, language = 'txt') {
    const lines = ascii.split('\n');
    switch (language) {
      case 'txt': return ascii;
      case 'verilog': return verilog(ascii);
      case 'c': {
        // Escape question marks as well to preserve trigraphs in older C modes.
        const statements = lines.map(line => '    puts("' + line.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\?/g, '\\?') + '");');
        return '#include <stdio.h>\n\nint main(void) {\n' + statements.join('\n') + '\n    return 0;\n}\n';
      }
      case 'python':
        return lines.map(line => 'print(' + JSON.stringify(line) + ')').join('\n') + '\n';
      case 'bash':
        return '#!/usr/bin/env bash\n' + lines.map(line => "printf '%s\\n' '" + line.replace(/'/g, "'\"'\"'") + "'").join('\n') + '\n';
      default: throw new Error('不支援的輸出語言。');
    }
  }
  const api = { RAMPS, validateRamp, dimensions, convert, verilog, exportText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AsciiCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== typography.js ===== */
(function (root) {
  'use strict';
  const SIZE = 12, LINE_HEIGHT = SIZE * 1.2;
  const FONTS = [
    { id: 'mono', label: '等寬字體（系統）', family: 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace', generic: true },
    { id: 'consolas', label: 'Consolas', family: '"Consolas", monospace', name: 'Consolas' },
    { id: 'courier', label: 'Courier New', family: '"Courier New", monospace', name: 'Courier New' },
    { id: 'arial', label: 'Arial', family: '"Arial", sans-serif', name: 'Arial' },
    { id: 'calibri', label: 'Calibri', family: '"Calibri", sans-serif', name: 'Calibri' },
    { id: 'aptos', label: 'Aptos', family: '"Aptos", sans-serif', name: 'Aptos' },
    { id: 'times', label: 'Times New Roman', family: '"Times New Roman", serif', name: 'Times New Roman' },
    { id: 'jhenghei', label: 'Microsoft JhengHei', family: '"Microsoft JhengHei", sans-serif', name: 'Microsoft JhengHei' },
    { id: 'sans', label: '一般字體（系統）', family: 'system-ui, -apple-system, "Segoe UI", sans-serif', generic: true }
  ];
  const cache = new Map();
  const makeCanvas = () => root.document.createElement('canvas');
  function isAvailable(font, ctx) {
    if (font.generic) return true;
    const sample = 'mmmmmmmmmmWWWWiiii0011';
    return ['monospace', 'serif', 'sans-serif'].some(base => {
      ctx.font = '72px ' + base; const fallback = ctx.measureText(sample).width;
      ctx.font = '72px "' + font.name + '", ' + base;
      return Math.abs(ctx.measureText(sample).width - fallback) > .1;
    });
  }
  function buildProfile(id, ramp, factory = makeCanvas) {
    const font = FONTS.find(font => font.id === id) || FONTS[0];
    const canvas = factory(), ctx = canvas.getContext('2d', { willReadFrequently: true });
    const setFont = () => { ctx.font = SIZE + 'px ' + font.family; ctx.fontKerning = 'none'; ctx.textBaseline = 'top'; };
    setFont();
    const reference = ctx.measureText('0').width || SIZE * .6;
    const widths = Array.from(' iMW.0@').map(char => ctx.measureText(char).width);
    const monospace = id === 'mono' || Math.max(...widths) - Math.min(...widths) < .1;
    const glyphs = Array.from(new Set(ramp)).map(char => {
      setFont(); const width = Math.max(.5, ctx.measureText(char).width);
      canvas.width = Math.ceil(width) + 8; canvas.height = Math.ceil(LINE_HEIGHT) + 8;
      setFont(); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#fff'; ctx.fillText(char, 4, 4);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let ink = 0; for (let i = 3; i < pixels.length; i += 4) ink += pixels[i] / 255;
      return { char, width, tone: ink / (width * LINE_HEIGHT) };
    });
    const maxInk = Math.max(...glyphs.map(glyph => glyph.tone), .00001);
    for (const glyph of glyphs) glyph.tone = glyph.tone / maxInk * 255;
    return { font, size: SIZE, lineHeight: LINE_HEIGHT, reference, monospace, glyphs };
  }
  function profile(id, ramp) {
    const key = id + '\n' + ramp;
    if (!cache.has(key)) cache.set(key, buildProfile(id, ramp));
    return cache.get(key);
  }
  // Variable-width fonts need a different horizontal sample interval per glyph.
  function convertProportional(data, width, height, glyphs, options = {}) {
    if (data.length !== width * height * 4) throw new Error('像素資料長度不正確。');
    if (!glyphs.length || glyphs.some(g => !(g.width > 0 && Number.isFinite(g.width)))) throw new Error('字型資料不正確。');
    const minWidth = Math.min(...glyphs.map(g => g.width));
    const values = new Float32Array(width * height);
    for (let i = 0; i < values.length; i++) {
      const k = i * 4, alpha = data[k + 3] / 255;
      const gray = (.2126 * data[k] + .7152 * data[k + 1] + .0722 * data[k + 2]) * alpha + 255 * (1 - alpha);
      let v = Math.max(0, Math.min(255, (gray - 127.5) * (options.contrast ?? 1) + 127.5 + (options.brightness ?? 0)));
      v = 255 * Math.pow(v / 255, 1 / (options.gamma ?? 1));
      values[i] = options.invert ? 255 - v : v;
    }
    const lines = [];
    for (let y = 0; y < height; y++) {
      const prefix = new Float64Array(width + 1), squares = new Float64Array(width + 1);
      for (let x = 0; x < width; x++) { const v = values[y * width + x]; prefix[x + 1] = prefix[x] + v; squares[x + 1] = squares[x] + v * v; }
      function integral(array, x) { const left = Math.min(width, Math.floor(x)); return array[left] + (left < width ? (x - left) * (array[left + 1] - array[left]) : 0); }
      let x = 0, line = '', carry = 0;
      while (x + minWidth <= width + .0001) {
        let best = null, bestScore = Infinity, bestMean = 0;
        for (const glyph of glyphs) {
          const end = x + glyph.width;
          if (end > width + .0001) continue;
          const mean = (integral(prefix, end) - integral(prefix, x)) / glyph.width;
          const variance = Math.max(0, (integral(squares, end) - integral(squares, x)) / glyph.width - mean * mean);
          const desired = Math.max(0, Math.min(255, mean + (options.dither ? carry : 0)));
          const score = (desired - glyph.tone) ** 2 + variance;
          if (score < bestScore) { best = glyph; bestScore = score; bestMean = desired; }
        }
        if (!best) break;
        line += best.char; x += best.width;
        // Diffuse quantization error into the next variable-width glyph.
        carry = (bestMean - best.tone) * .75;
      }
      lines.push(line);
    }
    return lines.join('\n');
  }
  function escapeHTML(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function richHTML(text, profile, light) {
    const style = 'margin:0;padding:12px;white-space:pre;font-family:' + profile.font.family + ';font-size:' + profile.size * .75 + 'pt;line-height:120%;font-kerning:none;font-variant-ligatures:none;font-feature-settings:"liga" 0,"kern" 0;letter-spacing:0;word-spacing:0;color:' + (light ? '#1a1a1a' : '#f0ede7') + ';background-color:' + (light ? '#f5f5f5' : '#111111') + ';';
    return '<html><body><!--StartFragment--><pre style="' + escapeHTML(style) + '">' + escapeHTML(text) + '</pre><!--EndFragment--></body></html>';
  }
  function drawImage(text, profile, light, factory = makeCanvas) {
    const canvas = factory(), ctx = canvas.getContext('2d');
    ctx.font = profile.size + 'px ' + profile.font.family;
    const widths = new Map();
    const advance = char => { if (!widths.has(char)) widths.set(char, ctx.measureText(char).width); return widths.get(char); };
    const lines = text.split('\n'), padding = 18;
    const width = Math.ceil(Math.max(...lines.map(line => Array.from(line).reduce((sum, char) => sum + advance(char), 0)))) + padding * 2;
    const height = Math.ceil(lines.length * profile.lineHeight) + padding * 2;
    const scale = Math.min(2, Math.sqrt(16000000 / (width * height)), 8192 / Math.max(width, height));
    canvas.width = Math.max(1, Math.floor(width * scale)); canvas.height = Math.max(1, Math.floor(height * scale));
    ctx.scale(scale, scale); ctx.fillStyle = light ? '#f5f5f5' : '#111111'; ctx.fillRect(0, 0, width, height);
    ctx.font = profile.size + 'px ' + profile.font.family; ctx.textBaseline = 'top'; ctx.fontKerning = 'none'; ctx.fillStyle = light ? '#1a1a1a' : '#f0ede7';
    lines.forEach((line, row) => { let x = padding; for (const char of line) { ctx.fillText(char, x, padding + row * profile.lineHeight); x += advance(char); } });
    return canvas;
  }
  const api = { FONTS, SIZE, LINE_HEIGHT, isAvailable, buildProfile, profile, convertProportional, richHTML, drawImage };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AsciiTypography = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== app.js ===== */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const core = window.AsciiCore;
  const typography = window.AsciiTypography;
  const i18n = window.AsciiI18n;
  const t = (key, params) => i18n.t(key, params);
  const source = $('source'), sourceCtx = source.getContext('2d');
  const sample = document.createElement('canvas'), sampleCtx = sample.getContext('2d', { willReadFrequently: true });
  const state = { image: null, isDemo: false, width: 0, height: 0, crop: { x: 0, y: 0, w: 1, h: 1 }, rect: null, ascii: '', format: 'txt', fontId: 'mono', profile: null, loading: 0, valid: false, light: false };
  try { state.fontId = localStorage.getItem('ascii-lab-font') || 'mono'; } catch (_) { }
  const fontCheck = document.createElement('canvas').getContext('2d');
  const availableFonts = new Map(typography.FONTS.map(font => [font.id, typography.isAvailable(font, fontCheck)]));
  function populateFonts() {
    const selector = $('font-family'), previous = state.fontId;
    selector.replaceChildren();
    typography.FONTS.forEach(font => {
      const option = document.createElement('option'); option.value = font.id;
      option.disabled = !availableFonts.get(font.id);
      option.textContent = t(font.label) + (option.disabled ? ' (' + t('未安裝') + ')' : '');
      selector.append(option);
    });
    state.fontId = availableFonts.get(previous) ? previous : 'mono'; selector.value = state.fontId;
  }
  let frame = 0, toastTimer, dragStart = null;
  function notify(message, error = false) {
    clearTimeout(toastTimer); $('toast').dataset.messageKey = message; $('toast').textContent = t(message); $('toast').classList.toggle('error', error); $('toast').hidden = false;
    toastTimer = setTimeout(() => { $('toast').hidden = true; }, error ? 6500 : 3000);
  }
  function drawSource() {
    if (!state.image) return;
    const box = source.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    source.width = Math.round(box.width * dpr); source.height = Math.round(box.height * dpr);
    sourceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = Math.min(box.width / state.width, box.height / state.height);
    const w = state.width * scale, h = state.height * scale, x = (box.width - w) / 2, y = (box.height - h) / 2;
    state.rect = { x, y, w, h };
    sourceCtx.drawImage(state.image, x, y, w, h);
    const c = state.crop;
    if (c.x > 0 || c.y > 0 || c.w < .999 || c.h < .999) {
      const cx = x + c.x * w, cy = y + c.y * h, cw = c.w * w, ch = c.h * h;
      sourceCtx.fillStyle = 'rgba(0,0,0,.6)';
      sourceCtx.beginPath(); sourceCtx.rect(x, y, w, h); sourceCtx.rect(cx, cy, cw, ch); sourceCtx.fill('evenodd');
      sourceCtx.strokeStyle = '#FF4500'; sourceCtx.lineWidth = 1.5; sourceCtx.strokeRect(cx, cy, cw, ch);
      sourceCtx.fillStyle = '#FF4500';
      [[cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch]].forEach(([px, py]) => sourceCtx.fillRect(px - 3, py - 3, 6, 6));
    }
  }
  function updateLabels(profile) {
    $('columns-value').value = profile && !profile.monospace ? t('{width} px', { width: Math.round(Number($('columns').value) * profile.reference) }) : t('{count} 字元', { count: $('columns').value });
    $('contrast-value').value = (Number($('contrast').value) / 100).toFixed(1) + '×';
    $('brightness-value').value = Number($('brightness').value) > 0 ? '+' + $('brightness').value : $('brightness').value;
    $('gamma-value').value = (Number($('gamma').value) / 100).toFixed(2);
    $('custom-wrap').hidden = $('preset').value !== 'custom';
    for (const id of ['columns', 'contrast', 'brightness', 'gamma']) {
      const input = $(id), progress = (input.value - input.min) / (input.max - input.min) * 100;
      input.style.background = 'linear-gradient(to right, var(--bird-orange) ' + progress + '%, var(--range-track) ' + progress + '%)';
    }
  }
  function outputText() { return core.exportText(state.ascii, state.format); }
  function showOutput() {
    $('copy-fallback').hidden = true; $('output').hidden = false;
    $('output').textContent = outputText();
    $('char-count').textContent = t('{count} 個字元', { count: state.ascii.length.toLocaleString(i18n.getLanguage()) });
  }
  function convert() {
    updateLabels();
    if (!state.image) return;
    try {
      const c = state.crop;
      const ramp = core.validateRamp($('preset').value === 'custom' ? $('custom').value : core.RAMPS[$('preset').value]);
      const profile = typography.profile(state.fontId, ramp);
      const { cols, rows } = core.dimensions(state.width * c.w, state.height * c.h, Number($('columns').value), profile.reference / profile.lineHeight);
      const rasterWidth = profile.monospace ? cols : Math.max(1, Math.round(cols * profile.reference));
      sample.width = rasterWidth; sample.height = rows;
      sampleCtx.fillStyle = '#fff'; sampleCtx.fillRect(0, 0, rasterWidth, rows);
      sampleCtx.imageSmoothingEnabled = true; sampleCtx.imageSmoothingQuality = 'high';
      sampleCtx.drawImage(state.image, c.x * state.width, c.y * state.height, c.w * state.width, c.h * state.height, 0, 0, rasterWidth, rows);
      const options = { ramp, brightness: Number($('brightness').value), contrast: Number($('contrast').value) / 100, gamma: Number($('gamma').value) / 100, invert: $('invert').checked, dither: $('dither').checked };
      const pixels = sampleCtx.getImageData(0, 0, rasterWidth, rows).data;
      state.ascii = profile.monospace ? core.convert(pixels, cols, rows, options) : typography.convertProportional(pixels, rasterWidth, rows, profile.glyphs, options);
      state.profile = profile;
      $('output').style.fontFamily = profile.font.family; $('output').style.fontSize = profile.size + 'px'; $('output').style.lineHeight = profile.lineHeight + 'px';
      updateLabels(profile);
      state.valid = true; $('copy').disabled = false; $('download').disabled = false; $('download-image').disabled = false;
      $('dimensions').textContent = profile.monospace ? t('{columns} 欄 × {rows} 列', { columns: cols, rows }) : t('{width} px × {rows} 列', { width: rasterWidth, rows });
      $('custom').setCustomValidity('');
      showOutput();
    } catch (error) {
      state.valid = false; $('copy').disabled = true; $('download').disabled = true; $('download-image').disabled = true;
      $('output').hidden = false; $('copy-fallback').hidden = true;
      $('output').textContent = t(error.message); $('dimensions').textContent = t('請調整設定'); $('char-count').textContent = '';
      if ($('preset').value === 'custom') $('custom').setCustomValidity(t(error.message));
    }
  }
  function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(convert); }
  function setImage(image, filename, isDemo = false) {
    state.image = image; state.isDemo = isDemo; state.width = image.naturalWidth || image.width; state.height = image.naturalHeight || image.height;
    state.crop = { x: 0, y: 0, w: 1, h: 1 };
    $('filename').textContent = isDemo ? t('範例：太空貓') : filename;
    $('filename').title = filename; $('image-size').textContent = state.width + ' × ' + state.height;
    $('crop-mode').checked = false; setCropMode(); drawSource(); convert();
  }
  async function loadFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/') && !/\.(png|jpe?g|webp|gif|bmp|avif|svg|heic|heif)$/i.test(file.name)) { notify('請選擇圖片檔案。', true); return; }
    if (file.size > 40 * 1024 * 1024) { notify('圖片超過 40 MB，請先縮小圖片。', true); return; }
    const ticket = ++state.loading, url = URL.createObjectURL(file), image = new Image();
    $('upload').disabled = true; $('upload').setAttribute('aria-busy', 'true');
    try {
      image.src = url; await image.decode();
      if (ticket !== state.loading) return;
      if (image.naturalWidth * image.naturalHeight > 16000000) {
        const factor = Math.min(1, 4096 / Math.max(image.naturalWidth, image.naturalHeight));
        const reduced = document.createElement('canvas'); reduced.width = Math.max(1, Math.round(image.naturalWidth * factor)); reduced.height = Math.max(1, Math.round(image.naturalHeight * factor));
        reduced.getContext('2d').drawImage(image, 0, 0, reduced.width, reduced.height); setImage(reduced, file.name);
      } else { setImage(image, file.name); }
      notify('圖片已載入，可以開始調整。');
    } catch (_) {
      if (ticket !== state.loading) return;
      notify(/\.hei[cf]$/i.test(file.name) || /heic|heif/.test(file.type) ? '這個瀏覽器無法開啟 HEIC / HEIF，請先轉成 JPG 或 PNG 再上傳。' : '無法開啟這張圖片，請改用 JPG、PNG 或 WebP。', true);
    } finally {
      URL.revokeObjectURL(url);
      if (ticket === state.loading) { $('upload').disabled = false; $('upload').removeAttribute('aria-busy'); }
    }
  }
  function loadDemo() {
    const ticket = ++state.loading;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#10120f"/><circle cx="256" cy="264" r="192" fill="#393d34"/><circle cx="256" cy="264" r="178" fill="#11150f"/><path d="M131 230L133 100 225 175Q258 168 287 178L379 101 382 239" fill="#e5e6db"/><path d="M147 193L150 135 196 173ZM319 180L359 136 363 197Z" fill="#777d6d"/><path d="M126 256Q127 172 255 172Q388 172 386 274Q382 369 256 388Q126 369 126 256Z" fill="#dcddd0"/><path d="M249 174L249 240 222 184ZM274 175L270 237 300 182Z" fill="#858b7a"/><ellipse cx="194" cy="257" rx="31" ry="27" fill="#151b12"/><ellipse cx="319" cy="257" rx="31" ry="27" fill="#151b12"/><ellipse cx="201" cy="250" rx="7" ry="11" fill="#f5f6eb"/><ellipse cx="312" cy="250" rx="7" ry="11" fill="#f5f6eb"/><path d="M239 293Q256 286 274 293L257 309Z" fill="#353c2c"/><path d="M257 309L257 323Q238 343 219 328M257 323Q274 343 292 328" fill="none" stroke="#444c39" stroke-width="7" stroke-linecap="round"/><path d="M114 296L204 302M108 320L204 312M308 302L399 293M308 312L404 320" stroke="#909781" stroke-width="6" stroke-linecap="round"/><path d="M135 384Q255 435 378 382L369 413Q255 462 146 414Z" fill="#999f88"/><circle cx="254" cy="424" r="11" fill="#eef0e3"/><path d="M47 71L47 95M35 83L59 83M448 126L448 142M440 134L456 134M416 431L416 453M405 442L427 442" stroke="#b8c8a0" stroke-width="3"/><circle cx="73" cy="377" r="4" fill="#808e6c"/><circle cx="414" cy="55" r="3" fill="#c8d6b2"/></svg>';
    const image = new Image();
    image.onload = () => { if (ticket === state.loading) { setImage(image, 'space-cat.png', true); $('upload').disabled = false; $('upload').removeAttribute('aria-busy'); } };
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function setCropMode() {
    source.classList.toggle('crop-active', $('crop-mode').checked); $('crop-badge').hidden = !$('crop-mode').checked; $('crop-help').hidden = !$('crop-mode').checked;
  }
  function point(event) {
    const b = source.getBoundingClientRect(), r = state.rect;
    return { x: Math.max(0, Math.min(1, (event.clientX - b.left - r.x) / r.w)), y: Math.max(0, Math.min(1, (event.clientY - b.top - r.y) / r.h)) };
  }
  source.addEventListener('pointerdown', event => {
    if (!$('crop-mode').checked || !state.rect || event.button !== 0) return;
    const b = source.getBoundingClientRect(), r = state.rect;
    if (event.clientX - b.left < r.x || event.clientX - b.left > r.x + r.w || event.clientY - b.top < r.y || event.clientY - b.top > r.y + r.h) return;
    event.preventDefault(); source.setPointerCapture(event.pointerId); dragStart = point(event); dragStart.previous = { ...state.crop };
  });
  source.addEventListener('pointermove', event => {
    if (!dragStart) return;
    const p = point(event), w = Math.abs(p.x - dragStart.x), h = Math.abs(p.y - dragStart.y);
    if (w < .01 || h < .01) return;
    state.crop = { x: Math.min(p.x, dragStart.x), y: Math.min(p.y, dragStart.y), w, h };
    drawSource(); schedule();
  });
  source.addEventListener('pointerup', () => { if (dragStart) { dragStart = null; drawSource(); schedule(); } });
  source.addEventListener('pointercancel', () => { if (dragStart) { state.crop = dragStart.previous; dragStart = null; drawSource(); schedule(); } });
  $('crop-mode').addEventListener('change', setCropMode);
  $('crop-reset').addEventListener('click', () => { state.crop = { x: 0, y: 0, w: 1, h: 1 }; drawSource(); schedule(); });
  $('upload').addEventListener('click', () => $('file').click());
  $('file').addEventListener('change', () => { loadFile($('file').files[0]); $('file').value = ''; });
  const zone = $('dropzone');
  ['dragenter', 'dragover'].forEach(type => zone.addEventListener(type, event => { event.preventDefault(); zone.classList.add('drag-over'); }));
  ['dragleave', 'drop'].forEach(type => zone.addEventListener(type, event => { event.preventDefault(); zone.classList.remove('drag-over'); }));
  zone.addEventListener('drop', event => loadFile(event.dataTransfer.files[0]));
  document.addEventListener('dragover', event => { if (event.dataTransfer.types.includes('Files')) event.preventDefault(); });
  document.addEventListener('drop', event => { if (event.dataTransfer.files.length) { event.preventDefault(); if (!zone.contains(event.target)) loadFile(event.dataTransfer.files[0]); } });
  document.addEventListener('paste', event => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    const file = Array.from(event.clipboardData?.items || []).find(item => item.type.startsWith('image/'))?.getAsFile();
    if (file) { event.preventDefault(); loadFile(file); }
  });
  ['columns', 'preset', 'custom', 'contrast', 'brightness', 'invert', 'dither', 'gamma'].forEach(id => $(id).addEventListener('input', schedule));
  $('font-family').addEventListener('change', () => {
    state.fontId = $('font-family').value;
    try { localStorage.setItem('ascii-lab-font', state.fontId); } catch (_) { }
    convert();
  });
  $('reset-settings').addEventListener('click', () => {
    const defaults = { columns: 84, preset: 'classic', custom: core.RAMPS.classic, contrast: 120, brightness: 0, gamma: 100 };
    Object.entries(defaults).forEach(([id, value]) => { $(id).value = value; }); $('invert').checked = false; $('dither').checked = false; schedule();
  });
  $('export-language').addEventListener('change', () => {
    state.format = $('export-language').value;
    if (state.valid) showOutput();
  });
  $('theme').addEventListener('click', () => {
    state.light = !state.light; document.querySelector('.terminal').classList.toggle('light', state.light);
    $('invert').checked = !$('invert').checked; schedule();
  });
  $('copy').addEventListener('click', async () => {
    if (!state.valid) return;
    const text = outputText();
    try {
      if (!navigator.clipboard?.write || !window.ClipboardItem) throw new Error('Rich clipboard unavailable');
      const html = typography.richHTML(text, state.profile, state.light);
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }), 'text/html': new Blob([html], { type: 'text/html' }) })]);
      notify('已複製（含字型）；貼到 Word 時請保留來源格式。');
    } catch (_) {
      try { await navigator.clipboard.writeText(text); notify('已複製純文字；字型需在貼上後自行設定。'); return; } catch (_) { }
      const field = $('copy-fallback'); field.value = text; field.hidden = false; $('output').hidden = true; field.focus(); field.select();
      try { if (document.execCommand('copy')) { field.hidden = true; $('output').hidden = false; notify('已複製純文字；字型需在貼上後自行設定。'); return; } } catch (_) { }
      notify('文字已選取，請按 Ctrl+C / ⌘C，或長按複製。');
    }
  });
  $('download').addEventListener('click', () => {
    if (!state.valid) return;
    const text = outputText() + (state.format === 'txt' ? '\n' : '');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }), url = URL.createObjectURL(blob), anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'art.txt';
    document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000); notify('下載已開始。');
  });
  $('download-image').addEventListener('click', () => {
    if (!state.valid || !state.profile) return;
    const button = $('download-image'); button.disabled = true;
    try {
      const canvas = typography.drawImage(state.ascii, state.profile, state.light);
      canvas.toBlob(blob => {
        button.disabled = !state.valid;
        if (!blob) { notify('圖片匯出失敗，請縮小輸出範圍。', true); return; }
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = 'art.png'; document.body.append(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000); notify('圖片下載已開始。');
      }, 'image/png');
    } catch (_) { button.disabled = !state.valid; notify('圖片匯出失敗，請縮小輸出範圍。', true); }
  });
  new ResizeObserver(drawSource).observe(zone);
  window.addEventListener('site-language-change', () => {
    populateFonts();
    if (state.isDemo) $('filename').textContent = t('範例：太空貓');
    if (!$('toast').hidden) $('toast').textContent = t($('toast').dataset.messageKey);
    if (state.image) convert();
    else $('dimensions').textContent = t('準備中');
  });
  $('dimensions').textContent = t('準備中');
  populateFonts();
  updateLabels(); loadDemo();
})();

