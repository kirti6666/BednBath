import Link from 'next/link';
import { categories, specPage } from '../site';

export const metadata = { title: 'Products' };

export default function Products() {
  return categories.map((c) => (
    <section key={c.name} className="category">
      <h2>{c.name}</h2>
      <p className="muted">
        {c.note}
        {c.spec && <> <Link href={specPage}>400 TC specification</Link> · <Link href="/price-list">Price list</Link></>}
      </p>
      <ul className="gallery">
        {/* shortcut: grey placeholder per product; swap in product photos when available */}
        {c.products.map((p) => <li key={p}><span className="photo" aria-hidden="true" />{p}</li>)}
      </ul>
    </section>
  ));
}
