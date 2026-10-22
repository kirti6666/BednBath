import Link from 'next/link';
import { variantsFor } from '../catalog';
import { usd } from '../cart';
import { categories, specPage, photos, productHref, rangeHref, slug } from '../site';

// Lowest price across a product's sizes and thread counts, or null when it is only quoted on request.
const fromPrice = (name) => {
  const prices = variantsFor(name).flatMap((v) => v.options.map((o) => o.price));
  return prices.length ? Math.min(...prices) : null;
};

// One range (Bed / Bath / Banquet Linen) as a grid of product cards; `heading` is h1 on the range's own page.
export function RangeGrid({ range, heading: H = 'h2' }) {
  return (
    <section id={slug(range.name)} className="category">
      <H>{range.name}</H>
      <p className="muted">
        {range.note}
        {range.spec && <> <Link href={specPage}>400 TC specification</Link> · <Link href="/price-list">Price list</Link></>}
      </p>
      <ul className="gallery">
        {range.products.map((p) => (
          <li key={p}>
            <Link href={productHref(p)}>
              {photos[p] ? <img className="photo" src={photos[p][0]} alt="" width="900" height="675" /> : <span className="photo weave" aria-hidden="true">Photography coming soon</span>}
              <span className="name">{p}</span>
              <span className="price">{fromPrice(p) ? <>From <strong>{usd(Math.round(fromPrice(p) * 100))}</strong> · 3–4% off in bulk</> : 'Price on request'}</span>
              <span className="more">View product</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Switch between the ranges and the full product list; `current` is the open range's name, or null on All products.
export function RangeTabs({ current }) {
  const tabs = [{ name: 'All products', href: '/products' }, ...categories.map((c) => ({ name: c.name, href: rangeHref(c.name) }))];
  return (
    <nav className="range-tabs" aria-label="Product ranges">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} aria-current={t.name === (current ?? 'All products') ? 'page' : undefined}>{t.name}</Link>
      ))}
    </nav>
  );
}
