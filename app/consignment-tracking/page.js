import Link from 'next/link';

export const metadata = { title: 'Consignment Tracking' };

export default function ConsignmentTracking() {
  return (
    <section>
      <h1 className="title">Consignment Tracking</h1>
      <p className="lead">
        Enter your invoice or order number and the email address you ordered with to see where your consignment is.
      </p>
      {/* shortcut: posts to the future Node.js API, which should look up the order and show its status */}
      <form className="form" method="post" action="/api/tracking">
        <label htmlFor="trk-order">Invoice / order number *</label>
        <input id="trk-order" name="order" required />
        <label htmlFor="trk-email">Email *</label>
        <input id="trk-email" name="email" type="email" autoComplete="email" required />
        <span />
        <button type="submit" className="btn">Track consignment</button>
      </form>

      <h2 className="subtitle">How shipments are tracked</h2>
      <ul className="ticks single">
        <li>When your order is dispatched we email the shipping documents with the courier airway bill (AWB) or the bill of lading (B/L) number.</li>
        <li>Use that number on the courier&apos;s or shipping line&apos;s website for live tracking.</li>
        <li>For any question about a shipment, <Link href="/contact-us">contact us</Link> with your invoice number.</li>
      </ul>
    </section>
  );
}
