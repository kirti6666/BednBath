// Writes preview.html (home) and preview-<page>.html for a few pages: exported pages as plain HTML/CSS (CSS inlined, Next.js scripts removed).
import { readFileSync, writeFileSync } from 'node:fs';

const routes = ['/', '/products', '/company-profile', '/price-list', '/products/bed-sheet-specification', '/products/comforter-specification',
  '/enquiry-form', '/contact-us', '/payment-options', '/terms-conditions',
  '/testimonials', '/size-guide', '/sign-in', '/par-stock-calculation', '/conversion-table', '/feedback',
  '/products/bedsheets', '/products/duvet-covers', '/products/pillowcases', '/products/bath-towels', '/products/duvets-comforters',
  '/products/bed-linen', '/products/bath-linen', '/products/banquet-linen'];
const pages = Object.fromEntries(routes.map((r) => [r, r === '/' ? 'preview.html' : `preview${r.replaceAll('/', '-')}.html`]));

const fit = `<script>
// Frames (like the claude.ai preview) ignore the viewport meta, so zoom the fixed-width page to fit there too.
const fit = () => (document.querySelector('.page').style.zoom = Math.min(1000, innerWidth) / 1261);
fit(); addEventListener('resize', fit);
document.addEventListener('submit', (e) => e.preventDefault());
</script>`;

// Without React, convert prices here: currency options carry their rate, country options their currency.
const fx = `<script>
const fmt = (usd, code, rate) => { try { return new Intl.NumberFormat('en', { style: 'currency', currency: code }).format(usd * rate); } catch { return '$' + usd.toFixed(2); } };
const pick = (code) => {
  const opt = document.querySelector('.currency:not(.country) option[value="' + code + '"]');
  const rate = opt ? Number(opt.dataset.rate) : 1;
  if (!opt) code = 'USD';
  document.querySelectorAll('.currency:not(.country) select').forEach((s) => (s.value = code));
  document.querySelectorAll('[data-usd]').forEach((el) => (el.textContent = fmt(Number(el.dataset.usd), code, rate)));
};
document.addEventListener('change', (e) => {
  const s = e.target.closest('.currency select');
  if (s) pick(s.closest('.country') ? s.selectedOptions[0].dataset.currency : s.value);
});
</script>`;

for (const [route, file] of Object.entries(pages)) {
  const html = readFileSync(route === '/' ? 'out/index.html' : `out${route}.html`, 'utf8')
    .replace(/<link rel="stylesheet" href="(\/_next\/[^"]+)"[^>]*>/g, (_, href) => `<style>${readFileSync(`out${href}`, 'utf8')}</style>`)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>|<link rel="(?:preload|modulepreload)"[^>]*>/g, '')
    // Pages in the preview link to each other; links to other pages go nowhere.
    .replace(/href="(\/(?!\/)[^"#]*)(#[^"]*)?"/g, (_, path, hash = '') => `href="${pages[path] ? pages[path] + hash : '#'}"`)
    // Inline images so each preview file stands alone.
    .replace(/src="\/images\/([^"]+)"/g, (_, f) => `src="data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${readFileSync(`public/images/${f}`).toString('base64')}"`)
    .replace('</body>', () => `${fit}${fx}</body>`);

  if (!html.includes('class="page"') || html.includes('/_next/')) throw new Error(`${file} still references the Next.js build`);
  writeFileSync(file, html);
  console.log(`${file} written (${(html.length / 1024).toFixed(0)} KB)`);
}
