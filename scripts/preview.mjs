// Writes preview.html (home) and preview-<page>.html for a few pages: exported pages as plain HTML/CSS (CSS inlined, Next.js scripts removed).
import { readFileSync, writeFileSync } from 'node:fs';

const routes = ['/', '/products', '/company-profile', '/price-list', '/products/400-tc-cotton-bed-sheet',
  '/enquiry-form', '/contact-us', '/shopping-cart', '/payment-options', '/terms-conditions',
  '/consignment-tracking', '/size-guide', '/sign-in', '/par-stock-calculation', '/conversion-table', '/feedback'];
const pages = Object.fromEntries(routes.map((r) => [r, r === '/' ? 'preview.html' : `preview${r.replaceAll('/', '-')}.html`]));

const fit = `<script>
// Frames (like the claude.ai preview) ignore the viewport meta, so zoom the fixed-width page to fit there too.
const fit = () => (document.querySelector('.page').style.zoom = Math.min(1000, innerWidth) / 1261);
fit(); addEventListener('resize', fit);
document.addEventListener('submit', (e) => e.preventDefault());
</script>`;

for (const [route, file] of Object.entries(pages)) {
  const html = readFileSync(route === '/' ? 'out/index.html' : `out${route}.html`, 'utf8')
    .replace(/<link rel="stylesheet" href="(\/_next\/[^"]+)"[^>]*>/g, (_, href) => `<style>${readFileSync(`out${href}`, 'utf8')}</style>`)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>|<link rel="(?:preload|modulepreload)"[^>]*>/g, '')
    // Pages in the preview link to each other; links to other pages go nowhere.
    .replace(/href="(\/(?!\/)[^"#]*)(#[^"]*)?"/g, (_, path, hash = '') => `href="${pages[path] ? pages[path] + hash : '#'}"`)
    // Inline images so each preview file stands alone.
    .replace(/src="\/images\/([^"]+)"/g, (_, f) => `src="data:image/${f.endsWith('.png') ? 'png' : 'jpeg'};base64,${readFileSync(`public/images/${f}`).toString('base64')}"`)
    .replace('</body>', `${fit}</body>`);

  if (!html.includes('class="page"') || html.includes('/_next/')) throw new Error(`${file} still references the Next.js build`);
  writeFileSync(file, html);
  console.log(`${file} written (${(html.length / 1024).toFixed(0)} KB)`);
}
