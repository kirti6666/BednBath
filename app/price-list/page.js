import Link from 'next/link';
import sections from '../price-list.json';
import { specPage } from '../site';

export const metadata = { title: 'Price List' };

export default function PriceList() {
  return (
    <section>
      <h1 className="title">Price List</h1>
      <p className="lead">
        Prices in USD per set or piece. MOQ is the minimum order quantity per size. For prices marked &ldquo;On request&rdquo;,
        custom sizes, colours or bulk quotations, please <Link href="/enquiry-form">send an enquiry</Link>.
        Fabric details: <Link href={specPage}>400 TC specification</Link>.
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
                {r.map((v, i) => <td key={i} className={i >= s.columns.indexOf('MOQ') && /^[\d.]+$|^On request$/.test(v) ? 'num' : undefined}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </section>
  );
}
