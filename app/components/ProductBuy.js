'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addLine, load, save, BUY_NOW, BULK_TIERS, discountPct, lineCents, listCents, usd } from '../cart';

const unique = (xs) => [...new Set(xs)];

// Choose fabric / style / size / thread count and quantity, then add to cart or buy now.
export default function ProductBuy({ variants }) {
  const router = useRouter();
  const [pick, setPick] = useState({ fabric: variants[0].fabric, style: variants[0].style, size: variants[0].size, option: 0 });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Each choice narrows the next one; a choice that no longer exists falls back to the first that does.
  const fabrics = unique(variants.map((v) => v.fabric));
  const byFabric = variants.filter((v) => v.fabric === pick.fabric);
  const styles = unique(byFabric.map((v) => v.style));
  const byStyle = byFabric.filter((v) => v.style === pick.style);
  const sizes = byStyle.map((v) => v.size);
  const variant = byStyle.find((v) => v.size === pick.size) ?? byStyle[0];
  const option = variant.options[pick.option] ?? variant.options[0];

  const choose = (field, value) => {
    const next = { ...pick, [field]: value };
    const fit = variants.filter((v) => v.fabric === next.fabric);
    if (!fit.some((v) => v.style === next.style)) next.style = fit[0].style;
    const sized = fit.filter((v) => v.style === next.style);
    if (!sized.some((v) => v.size === next.size)) next.size = sized[0].size;
    setPick(next);
    setAdded(false);
  };

  const line = option && { ...option, qty };
  const pct = line ? discountPct(line) : 0;

  const select = (label, field, values) => values.length > 1 && (
    <label className="pdp-field">
      <span>{label}</span>
      <select value={pick[field] ?? ''} onChange={(e) => choose(field, e.target.value)}>
        {values.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
    </label>
  );

  return (
    <div className="pdp-buy">
      {select('Fabric', 'fabric', fabrics)}
      {select('Style', 'style', styles)}
      {select('Size', 'size', sizes)}
      {variant.options.length > 1 && (
        <div className="pdp-field">
          <span>Thread count</span>
          <div className="pdp-chips" role="radiogroup" aria-label="Thread count">
            {variant.options.map((o, i) => (
              <button key={o.option} type="button" role="radio" aria-checked={o === option} className={o === option ? 'on' : undefined}
                onClick={() => { setPick({ ...pick, option: i }); setAdded(false); }}>
                {o.option}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="pdp-meta">
        {variant.dims && <>Size {variant.dims}</>}{variant.includes && <> · includes {variant.includes.replace('+', '')}</>}
        {option && <> · SKU {option.sku}</>}
      </p>

      {!option ? (
        <div className="pdp-request">
          <p><strong>Price on request</strong> for this size.</p>
          <Link href="/enquiry-form" className="btn">Request a quote</Link>
        </div>
      ) : (
        <>
          <p className="pdp-price">
            {usd(Math.round(option.price * 100))} <small>per {variant.style === 'Pillowcase' || !variant.includes ? 'piece' : 'set'}</small>
          </p>

          <div className="pdp-qty">
            <label htmlFor="qty">Quantity</label>
            <div>
              <button type="button" aria-label="One less" onClick={() => { setQty(Math.max(1, qty - 1)); setAdded(false); }}>−</button>
              <input id="qty" type="number" min="1" step="1" value={qty}
                onChange={(e) => { setQty(Math.max(1, Math.floor(Number(e.target.value)) || 1)); setAdded(false); }} />
              <button type="button" aria-label="One more" onClick={() => { setQty(qty + 1); setAdded(false); }}>+</button>
            </div>
          </div>

          <ul className="pdp-tiers" aria-label="Bulk pricing">
            <li className={pct === 0 ? 'on' : undefined}><span>1–{option.moq - 1}</span>{usd(Math.round(option.price * 100))}</li>
            {[...BULK_TIERS].reverse().map(([times, off], i, all) => {
              const from = times * option.moq, to = all[i + 1] ? all[i + 1][0] * option.moq - 1 : null;
              return (
                <li key={off} className={pct === off ? 'on' : undefined}>
                  <span>{to ? `${from}–${to}` : `${from}+`}</span>{usd(Math.round(option.price * (100 - off)))}<em>{off}% off</em>
                </li>
              );
            })}
          </ul>

          <p className="pdp-total">
            Total <strong>{usd(lineCents(line))}</strong>
            {pct > 0 && <span>You save {usd(listCents(line) - lineCents(line))} ({pct}% bulk discount)</span>}
            {pct === 0 && <span>Order {option.moq} or more for 3% off</span>}
          </p>

          <div className="pdp-actions">
            <button type="button" className="btn ghost" onClick={() => { save(addLine(load(), line)); setAdded(true); }}>Add to cart</button>
            <button type="button" className="btn" onClick={() => { save([line], BUY_NOW); router.push('/checkout?now=1'); }}>Buy now</button>
          </div>
          {added && <p className="pdp-added" role="status">Added {qty} to your cart. <Link href="/shopping-cart">View cart</Link></p>}
        </>
      )}
    </div>
  );
}
