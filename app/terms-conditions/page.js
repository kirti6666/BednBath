import { brand } from '../site';

export const metadata = { title: 'Terms & Conditions' };

// Draft wording; the business should review it (ideally with a lawyer) before launch.
const terms = [
  ['Who we are', `This website is run by ${brand.name} ${brand.line}. Products are manufactured and exported by ${brand.maker}. "We" and "us" mean ${brand.maker}; "you" means the buyer.`],
  ['Prices', 'Prices are in US dollars, per set or piece. Shipping is added at checkout. Import duties and taxes in the destination country are paid by the buyer. Prices may change without notice; the price you pay at checkout is final for that order.'],
  ['Orders and bulk discounts', 'You can order from a single piece. Each item has a minimum order quantity (MOQ) per size, shown on the product page and price list: ordering the MOQ or more gives 3% off, and five times the MOQ or more gives 4% off. An order is confirmed when its payment succeeds. Custom sizes, colours, embroidery, logos or packaging are quoted separately.'],
  ['Payment', 'All orders are prepaid in full, online at checkout. Large bulk orders may instead be paid by bank transfer against a proforma invoice; such orders are confirmed when the payment reaches our account. See Payment Options.'],
  ['Production and delivery', 'Lead time and the expected delivery date are emailed to you after payment, with tracking details once your order ships. We are not responsible for delays caused by carriers, customs or events outside our control.'],
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
