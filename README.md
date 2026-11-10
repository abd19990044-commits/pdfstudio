# PDF Studio

A browser-based PDF and image utility with bilingual Arabic/English, responsive RTL/LTR interfaces. **PDF Studio** converts images into A4 PDF documents, extracts selected PDF pages, and exports PDF pages as images — without requiring a backend or an account.

**Live application:** https://abd19990044-commits.github.io/pdfstudio/

## Features

### Images to A4 PDF
- Import JPG/JPEG, PNG, and WebP images via file selection or drag and drop.
- Preview, rotate, remove, and reorder images before conversion.
- Choose portrait, landscape, or automatic page orientation.
- Choose no margins, 5 mm margins, or 15 mm margins.
- Fit an entire image on the page or fill the page with cropping.
- Convert selected images into a downloadable, multipage A4 PDF.

### PDF page extraction
- Open a PDF and preview page thumbnails.
- Select pages individually or enter ranges such as `1-3, 5, 8-10`.
- Accept Arabic and Western numerals in the page-range input.
- Quickly select all pages, odd pages, or even pages.
- Export the selected pages into a single PDF or one PDF per page.
- Download files separately or together in a ZIP archive when JSZip is available.

### PDF to images
- Render selected PDF pages as PNG, JPEG, or WebP images (subject to browser support).
- Choose a rendering scale of 1×, 1.5×, 2×, or 3×; large canvases are constrained for stability.
- Use configurable output filenames.
- Preview and download images individually or as a ZIP archive when JSZip is available.

## Quick start

1. Open the [live PDF Studio website](https://abd19990044-commits.github.io/pdfstudio/).
2. Choose **Images to A4** or **Split PDF** in the Arabic-language navigation.
3. Add the images or PDF document from your device.
4. Set your preferred conversion, selection, or export options.
5. Run the processing step, then use the separate **Download** action.

> **Language:** Switch between Arabic (RTL) and English (LTR) using the language selector in the header. English is the default for first-time visitors; your selected language is saved locally in the browser.

## Run locally

PDF Studio is a static website. There is no package installation, application server, database, or build step.

```bash
git clone https://github.com/abd19990044-commits/pdfstudio.git
cd pdfstudio
python -m http.server 8000
```

Open http://localhost:8000/ in your browser.

Opening `index.html` directly may work, but a local HTTP server is recommended for reliable PDF.js worker execution. **An internet connection is required to load external JavaScript and icon/font dependencies from CDNs** unless they have been cached by the browser.

## Technologies

| Component | Purpose |
| --- | --- |
| HTML, CSS, vanilla JavaScript | Static application and interface |
| Tailwind utility CSS (compiled into `index.html`) | Responsive styling without a runtime Tailwind dependency |
| [PDF-Lib 1.17.1](https://pdf-lib.js.org/) | PDF generation and page extraction |
| [PDF.js 3.11.174](https://mozilla.github.io/pdf.js/) | PDF loading, thumbnails, and page rendering |
| [JSZip 3.10.1](https://stuk.github.io/jszip/) | ZIP downloads |
| [Font Awesome 6.5.1](https://fontawesome.com/) | Interface icons |

External dependencies use pinned URLs with integrity checks; the PDF.js worker is fetched and verified before use. The page also defines a Content Security Policy (CSP).

## Browser-side processing and privacy

Document and image processing is implemented locally in the browser; the application has no file-upload endpoint or backend for user documents. Generated files are downloaded to your device.

The app does request externally hosted library, worker, and icon assets. As with any CDN-backed website, those requests may disclose normal network metadata (such as IP address) to the providers. Local processing is not the same as an entirely offline application.

## Application limits

These are limits enforced by the current browser-side implementation, not guarantees that every device can process inputs up to the maximum.

| Operation | Limit |
| --- | --- |
| Images per conversion | 100 |
| Individual source image size | 40 MiB |
| Total source images size | 500 MiB |
| Source PDF size | 300 MiB |
| Source PDF page count | 5,000 |
| Individual PDF-page files per export | 500 |
| PDF pages exported to images per operation | 250 |
| Canvas dimension | Up to 16,384 px per side |
| Canvas area | Up to 80 million pixels |

Performance and memory availability depend on the browser and device. Encrypted or otherwise unsupported PDFs may fail to load or export.

## Deployment to GitHub Pages

The repository includes a GitHub Actions workflow at [`.github/workflows/jekyll-docker.yml`](.github/workflows/jekyll-docker.yml). Despite the legacy filename, this is a **static-site deployment workflow**, not a Jekyll build.

A push to `main` (or a manual workflow dispatch) validates `index.html`, creates a static Pages artifact, and deploys it via `actions/deploy-pages`. The repository's **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.

Site URL: https://abd19990044-commits.github.io/pdfstudio/

## Project structure

```text
pdfstudio/
├── index.html                  # Main interface and document-processing logic
├── i18n.js                     # Arabic/English translations and language selector
├── README.md                   # Project documentation
├── LICENSE                     # Apache License 2.0
└── .github/
    └── workflows/
        └── jekyll-docker.yml   # GitHub Pages deployment workflow
```

## Troubleshooting

- **Convert buttons are unavailable:** Check whether the required PDF-Lib or PDF.js script loaded. Ad blockers, connectivity issues, or CDN restrictions can block dependencies.
- **PDF thumbnails do not appear:** Reload the page and inspect the browser console for PDF.js worker loading or integrity errors.
- **ZIP export is unavailable:** JSZip may not have loaded. Use individual downloads instead.
- **A large document fails:** Try fewer images or pages per operation, use a lower image rendering scale, or switch to a device with more memory.
- **GitHub Pages does not update:** Check the latest run in [Actions](https://github.com/abd19990044-commits/pdfstudio/actions) and confirm the GitHub Pages deployment source.

For developers, the app provides basic self-tests at `?selftest=1`; results are logged to the browser console. These tests are sanity checks, not a complete end-to-end test suite.

## Contributing

Issues and pull requests are welcome. When making changes, preserve the application's Arabic RTL layout, responsive behavior, browser-side processing model, and safe handling of user-supplied files.

## License

The repository is distributed under the [Apache License, Version 2.0](LICENSE). Third-party libraries and assets remain subject to their respective licenses.
