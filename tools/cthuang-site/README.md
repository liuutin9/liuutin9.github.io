# Chih-Tsun Huang — personal site

Plain HTML, CSS and JavaScript. No build step; open `index.html` in a browser or upload the folder as is.

```
cthuang-site/
├─ index.html            Home
├─ styles.css            Home-only styles
├─ scripts.js            Home-only scripts
├─ publications/
│  ├─ index.html         Publications
│  ├─ styles.css         Publications-only styles
│  └─ scripts.js         Publications-only scripts
├─ shared/
│  ├─ styles.css         Tokens, base, header, hero, section type, footer (every page loads this first)
│  └─ layout.js          Header, footer and mobile menu, written once and injected into every page
└─ publications.html     Redirect, so the old /publications.html address still works
```

## Adding a page

1. Copy the `publications/` folder and rename it.
2. In its `index.html`, set `data-page` and `data-root` on `<body>` (`data-root` is `../` one folder down).
3. Add an entry to `NAV` in `shared/layout.js`.

## Editing the header or footer

Edit `shared/layout.js` once; every page picks it up. Because the header and footer are filled in by JavaScript, they do not appear to visitors or crawlers that run no scripts.
