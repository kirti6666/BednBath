import Link from 'next/link';
import { brand, categories, strengths } from './site';

// How a B2B order runs on this site: the order is confirmed by proforma invoice before payment.
const steps = [
  ['Choose products', 'Open the price list and click a price to add that item to your cart at its minimum order quantity.'],
  ['Send your order request', 'Check sizes and quantities in the cart, then send it with your delivery country.'],
  ['Receive a proforma invoice', 'We confirm stock, lead time and shipping, and send the final amount for approval.'],
  ['Pay and we dispatch', 'Pay by bank transfer, deposit or card. Follow your shipment with consignment tracking.'],
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
              <Link href="/products">
                {c.photo ? <img src={c.photo} alt="" width="400" height="300" /> : <span className="weave" aria-hidden="true">Photography coming soon</span>}
                <span className="range-text">
                  <strong>{c.name}</strong>
                  <small>{c.products.length} products</small>
                  <span>{c.products.join(' · ')}</span>
                </span>
              </Link>
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
