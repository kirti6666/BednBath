import Link from 'next/link';
import { brand, categories, strengths, productHref, rangeHref } from './site';

// How an order runs on this site: prepaid online, confirmed once payment succeeds.
const steps = [
  ['Choose a product', 'Pick the fabric, size and thread count. Buy a single piece or in bulk for 3–4% off.'],
  ['Add to cart or buy now', 'Collect several items in the cart, or go straight to checkout with one.'],
  ['Enter your address', 'Delivery worldwide: UAE, USA, UK and more, with your postal or ZIP code.'],
  ['Pay securely online', 'All orders are prepaid. Your order is confirmed as soon as payment succeeds.'],
];

export default function Home() {
  return (
    <div className="home">
      <section className="home-intro">
        <p className="eyebrow">Welcome to {brand.name}</p>
        <h2>Premium hotel linen, manufactured in India since 2010.</h2>
        <p>
          We make bed, bath and banquet linen for 4-star and 5-star hotels, sell through Amazon and eBay, and export a
          significant share of our production worldwide. <Link href="/company-profile">Read our company profile</Link>.
        </p>
      </section>

      <section>
        <div className="home-head">
          <h2>Our ranges</h2>
          <Link href="/products">View all products</Link>
        </div>
        <ul className="ranges">
          {categories.map((c) => (
            <li key={c.name}>
              <Link href={rangeHref(c.name)} className="range-card">
                {c.photo ? <img src={c.photo} alt="" width="900" height="675" /> : <span className="weave" aria-hidden="true">Photography coming soon</span>}
                <strong>{c.name}</strong>
                <small>{c.products.length} products</small>
              </Link>
              <ul className="range-products">
                {c.products.map((p) => <li key={p}><Link href={productHref(p)}>{p}</Link></li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="home-head">
          <h2>How ordering works</h2>
          <Link href="/payment-options">Payment options</Link>
        </div>
        <ol className="steps">
          {steps.map(([title, text]) => <li key={title}><strong>{title}</strong>{text}</li>)}
        </ol>
      </section>

      <section className="why">
        <div>
          <h2>Why buyers choose us</h2>
          <p>Continuous production since 2010 for demanding hotel standards, with the flexibility of a direct manufacturer.</p>
        </div>
        <ul className="ticks">{strengths.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <section className="cta-band">
        <div>
          <h2>Planning a hotel opening or refurbishment?</h2>
          <p>Send your room count and the items you need. We reply with prices, MOQ and lead time.</p>
        </div>
        <div className="cta">
          <Link href="/enquiry-form" className="btn">Request a quote</Link>
          <Link href="/par-stock-calculation" className="link">Par stock calculator</Link>
        </div>
      </section>
    </div>
  );
}
