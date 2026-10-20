import { products } from '../site';

export const metadata = { title: 'Products' };

export default function Products() {
  return (
    <section>
      <h1 className="title">Products</h1>
      <ul className="grid">
        {products.map((p) => <li key={p} className="tile">{p}</li>)}
      </ul>
    </section>
  );
}
