'use client';
import { useCurrency, setCurrency, formatPrice } from '../currency';

// Shown first in the currency list: the main buyer markets.
const common = ['USD', 'EUR', 'GBP', 'AED', 'CAD', 'AUD', 'INR', 'SAR', 'QAR', 'SGD'];
const names = typeof Intl.DisplayNames === 'function' ? new Intl.DisplayNames(['en'], { type: 'currency' }) : null;
const nameOf = (c) => { try { return names?.of(c) ?? c; } catch { return c; } };

// A USD price in the visitor's chosen currency. Google Translate is told to leave it alone.
export function Price({ usd }) {
  return <span translate="no">{formatPrice(usd, useCurrency())}</span>;
}

// Currency drop-down; the choice is shared by every price on the site and remembered.
export function CurrencySelect({ id = 'currency' }) {
  const { code, rates } = useCurrency();
  const codes = [...common.filter((c) => rates[c]), ...Object.keys(rates).filter((c) => !common.includes(c)).sort()];
  return (
    <span className="currency" translate="no">
      <label htmlFor={id} className="sr-only">Currency</label>
      <select id={id} value={rates[code] ? code : 'USD'} onChange={(e) => setCurrency(e.target.value)}>
        {codes.map((c) => <option key={c} value={c}>{c} · {nameOf(c)}</option>)}
      </select>
    </span>
  );
}

// Says where a converted price comes from; nothing while prices are in USD.
export function RateNote() {
  const { code, rates, updated } = useCurrency();
  if (code === 'USD' || !rates[code]) return null;
  const day = updated ? new Date(updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'today';
  return (
    <p className="rate-note">
      Converted from USD at the exchange rate of {day} (1 USD = {rates[code].toFixed(4)} {code}), for guidance.
      Prices are set in USD; your quotation confirms the final price.
    </p>
  );
}
