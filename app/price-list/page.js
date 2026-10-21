import Link from 'next/link';
import sections from '../price-list.json';
import { specPage } from '../site';
import AddToCart from '../components/AddToCart';

export const metadata = { title: 'Price List' };

// Cart line for one price cell. SKUs repeat across sizes in the sheet, so the key also uses the item name.
const line = (s, r, i) => {
  const size = r[s.columns.indexOf('Size')];
  const name = `${s.title} · ${r[0]}${size && !r[0].includes(size) ? `, ${size}` : ''}`;
  const option = s.columns[i] === 'Price (USD)' ? 'Standard' : s.columns[i].replace(' (USD)', '');
  const sku = r[s.columns.indexOf('SKU')];
  return { key: `${sku}|${name}|${option}`, name, sku, option, price: Number(r[i]), moq: Number(r[s.columns.indexOf('MOQ')]) };
};

export default function PriceList() {
  return (
    <section>
      <h1 className="title">Price List</h1>
      <p className="lead">
        Prices in USD per set or piece. MOQ is the minimum order quantity per size. For prices marked &ldquo;On request&rdquo;,
        custom sizes, colours or bulk quotations, please <Link href="/enquiry-form">send an enquiry</Link>.
        Fabric details: <Link href={specPage}>400 TC specification</Link>.
        <strong> Click a price to add that item to your <Link href="/shopping-cart">cart</Link> at its MOQ.</strong>
      </p>
      {sections.map((s) => (
        <table key={s.title} className="data">
          <caption>{s.title}{s.note && <span>{s.note}</span>}</caption>
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
                      {isPrice && v !== 'On request' ? <AddToCart line={line(s, r, i)} /> : v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </section>
  );
}
