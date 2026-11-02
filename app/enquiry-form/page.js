import { categories } from '../site';
import MailForm from '../components/MailForm';

export const metadata = { title: 'Enquiry Form' };

const buyerTypes = ['Hotel or resort', 'Hotel chain', 'Importer or distributor', 'Wholesaler', 'Other'];

// Each field's `name` is its row label in the email the admin receives.
export default function EnquiryForm() {
  return (
    <section>
      <h1 className="title">Enquiry Form</h1>
      <p className="lead">
        Ask for product catalogues, samples, MOQ details or a quotation. Fields marked * are required. We reply by email.
      </p>
      <MailForm
        subject="New enquiry"
        button="Send enquiry"
        whatsapp
        thanksTitle="Thank you for your enquiry"
        thanksText="We have received your enquiry and will reply by email soon with prices, MOQ and lead time."
      >
        <label htmlFor="enq-name">Name *</label>
        <input id="enq-name" name="Name" autoComplete="name" maxLength={100} required />
        <label htmlFor="enq-company">Company / hotel</label>
        <input id="enq-company" name="Company / hotel" autoComplete="organization" maxLength={150} />
        <label htmlFor="enq-type">You are a</label>
        <select id="enq-type" name="Buyer type" defaultValue="">
          <option value="" disabled>Choose one</option>
          {buyerTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        <label htmlFor="enq-country">Country *</label>
        <input id="enq-country" name="Country" autoComplete="country-name" maxLength={80} required />
        <label htmlFor="enq-email">Email *</label>
        <input id="enq-email" name="Email" type="email" autoComplete="email" maxLength={150} required />
        <label htmlFor="enq-phone">Phone / WhatsApp</label>
        <input id="enq-phone" name="Phone / WhatsApp" type="tel" autoComplete="tel" maxLength={30} />

        <span className="label">Products</span>
        <fieldset>
          <legend className="sr-only">Products you are interested in</legend>
          {categories.map((c) => (
            <label key={c.name} className="check"><input type="checkbox" name="Products" value={c.name} /> {c.name}</label>
          ))}
        </fieldset>

        <label htmlFor="enq-qty">Quantities &amp; sizes</label>
        <input id="enq-qty" name="Quantities & sizes" placeholder="e.g. 500 Queen flat sheet sets, 400 TC" maxLength={500} />
        <label htmlFor="enq-custom">Customization</label>
        <input id="enq-custom" name="Customization" placeholder="Size, colour, embroidery, logo, packaging" maxLength={500} />
        <label htmlFor="enq-message">Message *</label>
        <textarea id="enq-message" name="Message" rows="5" maxLength={3000} required />
      </MailForm>
    </section>
  );
}
