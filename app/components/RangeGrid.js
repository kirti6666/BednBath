import Link from 'next/link';
import { categories, specPage, photos, productHref, rangeHref, slug } from '../site';

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
              {photos[p] ? <img className="photo" src={photos[p][0]} alt="" width="900" height="675" /> : <span className="photo" aria-hidden="true" />}
              <span className="name">{p}</span>
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
