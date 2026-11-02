'use client';
import { useCurrency, setCurrency, setCountry, formatPrice } from '../currency';
import { countryCurrency, countryLanguage } from '../countries';
import { chosenLanguage, chooseLanguage } from '../language';
import names from '../names.json';

// Shown first in the currency list: the main buyer markets.
const common = ['USD', 'EUR', 'GBP', 'AED', 'CAD', 'AUD', 'INR', 'SAR', 'QAR', 'SGD'];
// Names are saved in a file (made with Intl.DisplayNames) so the server and every browser show the same text.
// Countries are saved in alphabetical order.
const countries = Object.entries(names.regions).filter(([c]) => countryCurrency[c]);

// A USD price in the visitor's chosen currency. Google Translate is told to leave it alone.
// data-usd lets the static preview (scripts/preview.mjs) convert prices without React.
export function Price({ usd }) {
  return <span translate="no" data-usd={usd}>{formatPrice(usd, useCurrency())}</span>;
}

// Currency drop-down; the choice is shared by every price on the site and remembered.
export function CurrencySelect({ id = 'currency' }) {
  const { code, rates } = useCurrency();
  const codes = [...common.filter((c) => rates[c]), ...Object.keys(rates).filter((c) => !common.includes(c)).sort()];
  return (
    <span className="currency" translate="no">
      <label htmlFor={id} className="sr-only">Currency</label>
      <select id={id} value={rates[code] ? code : 'USD'} onChange={(e) => setCurrency(e.target.value)}>
        {codes.map((c) => <option key={c} value={c} data-rate={rates[c]}>{c} · {names.currencies[c] ?? c}</option>)}
      </select>
    </span>
  );
}

// Country drop-down: every country, each with its currency. Choosing one switches prices to that currency
// and, where the country's language is offered, translates the site into it.
export function CountrySelect({ id = 'country' }) {
  const { country } = useCurrency();
  const choose = (c) => {
    setCountry(c);
    const lang = countryLanguage[c];
    if (lang && lang !== chosenLanguage()) chooseLanguage(lang);
  };
  return (
    <span className="currency country" translate="no">
      <label htmlFor={id} className="sr-only">Your country</label>
      <select id={id} value={country} onChange={(e) => choose(e.target.value)}>
        <option value="" disabled>Your country</option>
        {countries.map(([c, name]) => (
          <option key={c} value={c} data-currency={countryCurrency[c]}>{name} · {countryCurrency[c]}</option>
        ))}
      </select>
    </span>
  );
}

// Says where a converted price comes from; nothing while prices are in USD.
export function RateNote() {
  const { code, rates, updated } = useCurrency();
  if (code === 'USD' || !rates[code]) return null;
  const day = updated && new Date(updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <p className="rate-note">
      Converted from USD at {day ? `the exchange rate of ${day}` : 'an approximate exchange rate'} (1 USD = {rates[code]} {code}), for guidance.
      Prices are set in USD; your quotation confirms the final price.
    </p>
  );
}
