'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardLogos from './CardLogos';
import { load, BUY_NOW, discountPct, lineCents, listCents, totalCents, usd } from '../cart';

const countries = ['United Arab Emirates', 'United States', 'United Kingdom', ...[
  'Australia', 'Bahrain', 'Canada', 'France', 'Germany', 'Hong Kong', 'India', 'Ireland', 'Italy', 'Japan', 'Kenya', 'Kuwait',
  'Malaysia', 'Maldives', 'Netherlands', 'New Zealand', 'Nigeria', 'Oman', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Africa',
  'Spain', 'Sri Lanka', 'Switzerland',
]];
// These countries do not use postal codes, so the field is optional there.
const noPostcode = ['United Arab Emirates', 'Qatar', 'Hong Kong'];

export default function Checkout() {
  const [lines, setLines] = useState(null);
  const [buyNow, setBuyNow] = useState(false);
  const [country, setCountry] = useState(countries[0]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const now = new URLSearchParams(location.search).has('now');
    setBuyNow(now);
    setLines(load(now ? BUY_NOW : undefined));
  }, []);

  if (!lines) return null;
  if (!lines.length) return <p className="lead">There is nothing to check out. Choose a product from the <Link href="/products">Products</Link> page.</p>;

  const pay = async (e) => {
    e.preventDefault();
    const order = { ...Object.fromEntries(new FormData(e.target)), lines, source: buyNow ? 'buy-now' : 'cart' };
    setStatus({ busy: true });
    try {
      // shortcut: expects the Node.js API to create the order and return the payment gateway's page; not built yet.
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { paymentUrl } = await res.json();
      location.href = paymentUrl;
    } catch {
      setStatus({ error: 'Online payment is not connected yet, so no order was placed and nothing was charged. Please try again later or send us an enquiry.' });
    }
  };

  return (
    <div className="checkout">
      <form className="checkout-form" onSubmit={pay}>
        <fieldset>
          <legend>Contact</legend>
          <label htmlFor="co-name">Full name *</label><input id="co-name" name="name" autoComplete="name" required />
          <label htmlFor="co-company">Company / hotel</label><input id="co-company" name="company" autoComplete="organization" />
          <label htmlFor="co-email">Email *</label><input id="co-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="co-phone">Phone with country code *</label>
          <input id="co-phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" pattern="\+?[0-9 \(\)\-]{7,20}" required />
        </fieldset>

        <fieldset>
          <legend>Delivery address</legend>
          <label htmlFor="co-country">Country *</label>
          <select id="co-country" name="country" autoComplete="country-name" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label htmlFor="co-line1">Address line 1 *</label><input id="co-line1" name="address1" autoComplete="address-line1" placeholder="Building, street" required />
          <label htmlFor="co-line2">Address line 2</label><input id="co-line2" name="address2" autoComplete="address-line2" placeholder="Floor, unit, area" />
          <label htmlFor="co-city">City *</label><input id="co-city" name="city" autoComplete="address-level2" required />
          <label htmlFor="co-region">State / province / emirate</label><input id="co-region" name="region" autoComplete="address-level1" />
          <label htmlFor="co-postcode">Postal / ZIP / PIN code{noPostcode.includes(country) ? '' : ' *'}</label>
          <input id="co-postcode" name="postcode" autoComplete="postal-code" pattern="[A-Za-z0-9][A-Za-z0-9 \-]{1,9}"
            required={!noPostcode.includes(country)} placeholder={noPostcode.includes(country) ? `Not used in ${country}` : ''} />
        </fieldset>

        <div className="checkout-pay">
          <button type="submit" className="btn" disabled={status?.busy}>{status?.busy ? 'Connecting…' : `Pay ${usd(totalCents(lines))}`}</button>
          <span>Secure online payment <CardLogos /></span>
        </div>
        {status?.error && <p className="checkout-error" role="alert">{status.error} <Link href="/enquiry-form">Send an enquiry</Link></p>}
      </form>

      <aside className="checkout-summary" aria-label="Order summary">
        <h2>{buyNow ? 'Buying now' : 'Your order'}</h2>
        <ul>
          {lines.map((l) => (
            <li key={l.key}>
              <span>{l.name} · {l.option}<small>{l.qty} × {usd(Math.round(l.price * 100))}{discountPct(l) > 0 && ` · ${discountPct(l)}% bulk discount`}</small></span>
              <strong>{usd(lineCents(l))}</strong>
            </li>
          ))}
        </ul>
        <dl>
          <dt>Items</dt><dd>{usd(lines.reduce((s, l) => s + listCents(l), 0))}</dd>
          {totalCents(lines) < lines.reduce((s, l) => s + listCents(l), 0) && (
            <><dt>Bulk discount</dt><dd>−{usd(lines.reduce((s, l) => s + listCents(l) - lineCents(l), 0))}</dd></>
          )}
          <dt>Shipping</dt><dd>Added at payment</dd>
          <dt className="total">Total (USD)</dt><dd className="total">{usd(totalCents(lines))}</dd>
        </dl>
        {!buyNow && <Link href="/shopping-cart">Edit cart</Link>}
      </aside>
    </div>
  );
}
