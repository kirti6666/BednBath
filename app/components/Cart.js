'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { load, save, setQty, removeLine, discountPct, lineCents, listCents, totalCents, usd } from '../cart';

export default function Cart() {
  const [lines, setLines] = useState([]);
  useEffect(() => setLines(load()), []);
  const update = (next) => { setLines(next); save(next); };

  if (!lines.length) {
    return (
      <p className="lead">
        Your cart is empty. Choose a product on the <Link href="/products">Products</Link> page, or click any price on
        the <Link href="/price-list">Price List</Link>.
      </p>
    );
  }

  const saved = lines.reduce((s, l) => s + listCents(l) - lineCents(l), 0);

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
                <input type="number" min="1" step="1" defaultValue={l.qty} aria-label={`Quantity of ${l.name}`}
                  onBlur={(e) => { const next = setQty(lines, l.key, e.target.value); e.target.value = next.find((n) => n.key === l.key).qty; update(next); }} />
                <small>{discountPct(l) ? ` ${discountPct(l)}% bulk discount` : ` 3% off from ${l.moq}`}</small>
              </td>
              <td className="num">{usd(lineCents(l))}</td>
              <td><button type="button" className="link-btn" onClick={() => update(removeLine(lines, l.key))}>Remove</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {saved > 0 && <tr><th scope="row" colSpan="5">Bulk discount included</th><td className="num">−{usd(saved)}</td><td /></tr>}
          <tr><th scope="row" colSpan="5">Subtotal (shipping added at checkout)</th><td className="num"><strong>{usd(totalCents(lines))}</strong></td><td /></tr>
        </tfoot>
      </table>

      <div className="cart-next">
        <p>All orders are prepaid. Enter your delivery address and pay securely online at checkout. See <Link href="/payment-options">Payment Options</Link>.</p>
        <Link href="/checkout" className="btn">Proceed to checkout</Link>
      </div>
    </>
  );
}
