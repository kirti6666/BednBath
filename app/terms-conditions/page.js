import { brand } from '../site';

export const metadata = { title: 'Terms & Conditions' };

// Draft wording; the business should review it (ideally with a lawyer) before launch.
const terms = [
  ['Who we are', `This website is run by ${brand.name} ${brand.line}. Products are manufactured and exported by ${brand.maker}. "We" and "us" mean ${brand.maker}; "you" means the buyer.`],
  ['Prices', 'Prices on the price list are in US dollars, per set or piece, and exclude shipping, insurance, duties and taxes. Prices may change without notice until an order is confirmed on a proforma invoice.'],
  ['Orders and MOQ', 'An order is binding once you accept our proforma invoice and we receive the agreed payment. Each item has a minimum order quantity (MOQ) per size, shown on the price list. Custom sizes, colours, embroidery, logos or packaging may have their own MOQ.'],
  ['Payment', 'Payment terms, methods and due dates are stated on the proforma invoice. Production starts when the agreed advance payment is received. See Payment Options.'],
  ['Production and delivery', 'Lead times are confirmed per order. Shipping terms (for example FOB or CIF) and delivery dates are stated on the proforma invoice. We are not responsible for delays caused by carriers, customs or events outside our control.'],
  ['Samples', 'Samples can be supplied on request. Sample and courier charges, if any, are confirmed before dispatch.'],
  ['Product tolerances', 'Hotel linen is a textile product. Small variations in size, weight (GSM), thread count and shade between production lots are normal and within industry tolerance. Colours on screen may differ from the actual fabric.'],
  ['Inspection and claims', 'Please inspect goods on arrival. Report any shortage, damage or defect in writing promptly, with photos and the invoice number, before the goods are used or washed. Accepted claims are settled by replacement, repair or credit at our option.'],
  ['Custom orders and cancellation', 'Orders for custom or private-label products cannot be cancelled once production has started. Other cancellations are subject to charges for materials and work already done.'],
  ['Liability', 'Our liability for any order is limited to the value of the goods in that order. We are not liable for indirect or consequential losses.'],
  ['Governing law', 'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at the place of our registered office.'],
];

export default function Terms() {
  return (
    <article className="prose">
      <h1 className="title">Terms &amp; Conditions</h1>
      {terms.map(([h, p]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </section>
      ))}
    </article>
  );
}
