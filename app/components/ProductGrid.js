import Link from 'next/link';
import { products, slugify } from '../data';

export default function ProductGrid() {
  return (
    <div className="grid">
      {products.map((p) => (
        <Link key={p} href={`/products#${slugify(p)}`} id={slugify(p)} className="tile">
          <span className="tile-img" aria-hidden="true" />
          <span>{p}</span>
        </Link>
      ))}
    </div>
  );
}
