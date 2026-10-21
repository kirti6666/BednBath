import { categories } from '../site';

export const metadata = { title: 'Products' };

export default function Products() {
  return categories.map((c) => (
    <section key={c.name} className="category">
      <h2>{c.name}</h2>
      <p className="muted">{c.note}</p>
      <ul className="gallery">
        {/* shortcut: grey placeholder per product; swap in product photos when available */}
        {c.products.map((p) => <li key={p}><span className="photo" aria-hidden="true" />{p}</li>)}
      </ul>
    </section>
  ));
}
