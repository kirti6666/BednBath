'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { load, save, setQty, removeLine, lineCents, totalCents, usd } from '../cart';

export default function Cart() {
  const [lines, setLines] = useState([]);
  useEffect(() => setLines(load()), []);
  const update = (next) => { setLines(next); save(next); };

  if (!lines.length) {
    return (
      <p className="lead">
        Your cart is empty. Open the <Link href="/price-list">Price List</Link> and click any price to add that item at its
        minimum order quantity.
      </p>
    );
  }

  return (
    <>
      <table className="data cart">
        <thead>
          <tr><th scope="col">Item</th><th scope="col">SKU</th><th scope="col">Option</th><th scope="col" className="num">Price (USD)</th>
            <th scope="col">Quantity</th><th scope="col" className="num">Total</th><th scope="col"><span className="sr-only">Remove</span></th></tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.key}>
              <td>{l.name}</td>
              <td>{l.sku}</td>
              <td>{l.option}</td>
              <td className="num">{l.price.toFixed(2)}</td>
              <td>
                <input type="number" min={l.moq} step="1" defaultValue={l.qty} aria-label={`Quantity of ${l.name}`}
                  onBlur={(e) => { const next = setQty(lines, l.key, e.target.value); e.target.value = next.find((n) => n.key === l.key).qty; update(next); }} />
                <small> MOQ {l.moq}</small>
              </td>
              <td className="num">{usd(lineCents(l))}</td>
              <td><button type="button" className="link-btn" onClick={() => update(removeLine(lines, l.key))}>Remove</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><th scope="row" colSpan="5">Subtotal (excluding shipping and duties)</th><td className="num"><strong>{usd(totalCents(lines))}</strong></td><td /></tr>
        </tfoot>
      </table>

      <h2 className="subtitle">Send order request</h2>
      <p>We confirm stock, lead time and shipping, then send a proforma invoice. See <Link href="/payment-options">Payment Options</Link>.</p>
      {/* shortcut: posts to the future Node.js API; the cart is sent as JSON in a hidden field */}
      <form className="form" method="post" action="/api/orders">
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        <label htmlFor="order-name">Name *</label><input id="order-name" name="name" autoComplete="name" required />
        <label htmlFor="order-company">Company</label><input id="order-company" name="company" autoComplete="organization" />
        <label htmlFor="order-email">Email *</label><input id="order-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="order-country">Delivery country *</label><input id="order-country" name="country" autoComplete="country-name" required />
        <span /><button type="submit" className="btn">Send order request</button>
      </form>
    </>
  );
}
