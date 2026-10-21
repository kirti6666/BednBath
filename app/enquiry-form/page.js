import { categories } from '../site';

export const metadata = { title: 'Enquiry Form' };

const buyerTypes = ['Hotel or resort', 'Hotel chain', 'Importer or distributor', 'Retailer or e-commerce brand', 'Other'];

export default function EnquiryForm() {
  return (
    <section>
      <h1 className="title">Enquiry Form</h1>
      <p className="lead">
        Ask for product catalogues, samples, MOQ details or a quotation. Fields marked * are required. We reply by email.
      </p>
      {/* shortcut: posts to the future Node.js API, which should validate and store or email the enquiry */}
      <form className="form" method="post" action="/api/enquiries">
        <label htmlFor="enq-name">Name *</label>
        <input id="enq-name" name="name" autoComplete="name" required />
        <label htmlFor="enq-company">Company / hotel</label>
        <input id="enq-company" name="company" autoComplete="organization" />
        <label htmlFor="enq-type">You are a</label>
        <select id="enq-type" name="buyerType" defaultValue="">
          <option value="" disabled>Choose one</option>
          {buyerTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        <label htmlFor="enq-country">Country *</label>
        <input id="enq-country" name="country" autoComplete="country-name" required />
        <label htmlFor="enq-email">Email *</label>
        <input id="enq-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="enq-phone">Phone / WhatsApp</label>
        <input id="enq-phone" name="phone" type="tel" autoComplete="tel" />

        <span className="label">Products</span>
        <fieldset>
          <legend className="sr-only">Products you are interested in</legend>
          {categories.map((c) => (
            <label key={c.name} className="check"><input type="checkbox" name="products" value={c.name} /> {c.name}</label>
          ))}
        </fieldset>

        <label htmlFor="enq-qty">Quantities &amp; sizes</label>
        <input id="enq-qty" name="quantities" placeholder="e.g. 500 Queen flat sheet sets, 400 TC" />
        <label htmlFor="enq-custom">Customization</label>
        <input id="enq-custom" name="customization" placeholder="Size, colour, embroidery, logo, packaging" />
        <label htmlFor="enq-message">Message *</label>
        <textarea id="enq-message" name="message" rows="5" required />
        <span />
        <button type="submit" className="btn">Send enquiry</button>
      </form>
    </section>
  );
}
