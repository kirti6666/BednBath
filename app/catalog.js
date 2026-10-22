// Product options and prices, read from the price list so product pages and the price list never disagree.
import sections from './price-list.json';
import { categories, slug } from './site';

const col = (s, r, name) => r[s.columns.indexOf(name)];
const stripNote = (t) => t.replace(/ \(.*\)$/, '');

// Cart line for one price cell. SKUs repeat across sizes in the sheet, so the key also uses the item name.
export const cartLine = (s, r, i) => {
  const size = col(s, r, 'Size');
  const name = `${s.title} · ${r[0]}${size && !r[0].includes(size) ? `, ${size}` : ''}`;
  const option = s.columns[i] === 'Price (USD)' ? 'Standard' : s.columns[i].replace(' (USD)', '');
  const sku = col(s, r, 'SKU');
  return { key: `${sku}|${name}|${option}`, name, sku, option, price: Number(r[i]), moq: Number(col(s, r, 'MOQ')) };
};

// One sellable row: its choices (fabric, style, size) and a cart line per priced option (300 TC, 400 TC or Standard).
const toVariant = (s, r) => {
  const hasSize = s.columns.includes('Size');
  return {
    fabric: s.title.split(': ')[1] ?? null,
    style: hasSize ? stripNote(r[0]) : null,
    size: hasSize ? col(s, r, 'Size') : stripNote(r[0]),
    dims: col(s, r, 'Size (in)') ? `${col(s, r, 'Size (in)').replace('"', '')} in` : col(s, r, 'Cover (in)') ? `${col(s, r, 'Cover (in)')} in` : col(s, r, 'Size (cm)') ? `${col(s, r, 'Size (cm)').trim()} cm` : null,
    includes: r[0].match(/\((\+[^)]*)\)/)?.[1] ?? null,
    options: s.columns.flatMap((c, i) => (c.endsWith('(USD)') && r[i] !== 'On request' ? [cartLine(s, r, i)] : [])),
  };
};

// Which price-list rows belong to which product.
const sources = {
  'Bedsheets': (s, v) => s.title.startsWith('Bed Sheets') && v.style !== 'Pillowcase',
  'Pillowcases': (s, v) => s.title.startsWith('Bed Sheets') && v.style === 'Pillowcase',
  'Duvet Covers': (s) => s.title.startsWith('Duvet Covers'),
  'Duvets & Comforters': (s) => s.title.startsWith('Duvets'),
  'Bath Towels': (s, v) => s.title === 'Bath Linen' && v.size.startsWith('Bath towel'),
  'Hand Towels': (s, v) => s.title === 'Bath Linen' && v.size.startsWith('Hand towel'),
};

export const variantsFor = (name) =>
  sections.flatMap((s) => s.rows.map((r) => toVariant(s, r)).filter((v) => sources[name]?.(s, v)));

export const allProducts = categories.flatMap((c) => c.products.map((name) => ({ name, slug: slug(name), range: c.name })));
