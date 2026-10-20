// Writes preview.html: the exported home page as one plain HTML/CSS file (CSS inlined, Next.js scripts removed).
import { readFileSync, writeFileSync } from 'node:fs';

const fit = `<script>
// Frames (like the claude.ai preview) ignore the viewport meta, so zoom the fixed-width page to fit there too.
const fit = () => (document.querySelector('.page').style.zoom = Math.min(1, innerWidth / 1260));
fit(); addEventListener('resize', fit);
document.addEventListener('submit', (e) => e.preventDefault());
</script>`;

const html = readFileSync('out/index.html', 'utf8')
  .replace(/<link rel="stylesheet" href="(\/_next\/[^"]+)"[^>]*>/g, (_, href) => `<style>${readFileSync(`out${href}`, 'utf8')}</style>`)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>|<link rel="(?:preload|modulepreload)"[^>]*>/g, '')
  .replace(/href="\/(?!\/)[^"]*"/g, 'href="#"')
  .replace('</body>', `${fit}</body>`);

if (!html.includes('class="page"') || html.includes('/_next/')) throw new Error('preview.html still references the Next.js build');
writeFileSync('preview.html', html);
console.log(`preview.html written (${(html.length / 1024).toFixed(0)} KB)`);
