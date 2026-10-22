import Link from 'next/link';
import { categories, specPage, photos, productHref, slug } from '../site';

export const metadata = { title: 'Products' };

export default function Products() {
  return categories.map((c) => (
    <section key={c.name} id={slug(c.name)} className="category">
      <h2>{c.name}</h2>
      <p className="muted">
        {c.note}
        {c.spec && <> <Link href={specPage}>400 TC specification</Link> · <Link href="/price-list">Price list</Link></>}
      </p>
      <ul className="gallery">
        {c.products.map((p) => (
          <li key={p}>
            <Link href={productHref(p)}>
              {photos[p] ? <img className="photo" src={photos[p][0]} alt="" width="900" height="675" /> : <span className="photo" aria-hidden="true" />}
              <span className="name">{p}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ));
}
