import Link from 'next/link';
import sections from '../price-list.json';
import { specPage } from '../site';
import { Price, CurrencySelect, RateNote } from '../components/Currency';

export const metadata = { title: 'Price List' };

// Lowest numeric price in a section, for its summary line.
const from = (s) => Math.min(...s.rows.flatMap((r) => r.filter((v, i) => s.columns[i].endsWith('(USD)') && v !== 'On request').map(Number)));

export default function PriceList() {
  return (
    <section>
      <h1 className="title">Price List</h1>
      <p className="lead">
        Prices per set or piece, set in USD; choose a currency to see them converted at today&apos;s rate. MOQ is the minimum order quantity per size. For prices marked &ldquo;On request&rdquo;,
        custom sizes, colours or bulk quotations, please <Link href="/enquiry-form">send an enquiry</Link>.
        Fabric details: <Link href={specPage}>bed sheet specification</Link>. Open a section to see sizes and prices.
        Final prices, lead time and shipping are confirmed on your quotation.
      </p>
      <p className="pl-currency"><label htmlFor="currency-pl">Show prices in</label> <CurrencySelect id="currency-pl" /></p>
      <RateNote />
      {sections.map((s) => (
        <details key={s.title} className="pl-section">
          <summary>
            <strong>{s.title}</strong>
            {s.note && <span>{s.note}</span>}
            <span className="pl-meta">{s.rows.length} items · from <Price usd={from(s)} /></span>
          </summary>
          <table className="data">
            <caption className="sr-only">{s.title}</caption>
            <thead>
              <tr>{s.columns.map((c) => <th key={c} scope="col">{c.replace(' (USD)', '')}</th>)}</tr>
            </thead>
            <tbody>
              {s.rows.map((r) => (
                <tr key={r.join('|')}>
                  {r.map((v, i) => {
                    const isPrice = s.columns[i].endsWith('(USD)');
                    return (
                      <td key={i} className={isPrice || s.columns[i] === 'MOQ' ? 'num' : undefined}>
                        {isPrice && v !== 'On request' ? <Price usd={Number(v)} /> : v}
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
