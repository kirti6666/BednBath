import Link from 'next/link';
import sections from '../price-list.json';
import { specPage } from '../site';
import AddToCart from '../components/AddToCart';
import { cartLine } from '../catalog';

export const metadata = { title: 'Price List' };

// Lowest numeric price in a section, for its summary line.
const from = (s) => Math.min(...s.rows.flatMap((r) => r.filter((v, i) => s.columns[i].endsWith('(USD)') && v !== 'On request').map(Number)));

export default function PriceList() {
  return (
    <section>
      <h1 className="title">Price List</h1>
      <p className="lead">
        Prices in USD per set or piece. MOQ is the minimum order quantity per size. For prices marked &ldquo;On request&rdquo;,
        custom sizes, colours or bulk quotations, please <Link href="/enquiry-form">send an enquiry</Link>.
        Fabric details: <Link href={specPage}>400 TC specification</Link>.
        <strong> Open a section to see sizes and prices, then click a price to add that item to your <Link href="/shopping-cart">cart</Link> at its MOQ (3% bulk discount).</strong> Or open any product on the <Link href="/products">Products</Link> page to buy a single piece.
      </p>
      {sections.map((s) => (
        <details key={s.title} className="pl-section">
          <summary>
            <strong>{s.title}</strong>
            {s.note && <span>{s.note}</span>}
            <span className="pl-meta">{s.rows.length} items · from ${from(s).toFixed(2)}</span>
          </summary>
          <table className="data">
            <caption className="sr-only">{s.title}</caption>
            <thead>
              <tr>{s.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
            </thead>
            <tbody>
              {s.rows.map((r) => (
                <tr key={r.join('|')}>
                  {r.map((v, i) => {
                    const isPrice = s.columns[i].endsWith('(USD)');
                    return (
                      <td key={i} className={isPrice || s.columns[i] === 'MOQ' ? 'num' : undefined}>
                        {isPrice && v !== 'On request' ? <AddToCart line={cartLine(s, r, i)} /> : v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      ))}
    </section>
  );
}
