import Link from 'next/link';
import { brand } from '../../site';

export const metadata = { title: 'Bed Sheet Specification' };

// From the client's bed sheet specification (thread counts 300, 400 and 600 TC).
const spec = [
  ['Product', 'Premium cotton bed sheet, with matching pillow covers and duvet covers'],
  ['Brand', `${brand.name} ${brand.line}`],
  ['Category', 'Bed Linen'],
  ['Fabric', '100% organic cotton (Indian organic cotton), combed cotton / percale'],
  ['Thread count', '300 TC, 400 TC, 600 TC'],
  ['Pattern', '1 cm stripe or plain percale'],
  ['Weave', 'Plain weave; satin stripe on the stripe variant'],
  ['Stripe design', '1 cm white-on-white stripe (stripe variant)'],
  ['Finish', 'Soft, smooth, durable premium finish'],
  ['Colours', 'White, Ivory, Beige, Light Grey; custom colours depending on quantity'],
  ['Sizes', 'Twin, Full, Queen, King, California King and all standard sizes'],
  ['Styles', 'Flat sheet; fitted sheet on request (pocket depth to be specified); matching pillowcases'],
  ['Use', 'Home, hotel, resort and hospitality'],
  ['Customization', 'Size, colour, GSM, finish, labels, packaging and private labelling'],
  ['Packing', 'Individual or bulk export packing, as required'],
  ['MOQ', 'Confirmed by size, design and order quantity'],
  ['Care', 'Machine wash and tumble dry as per tested fabric care requirements'],
  ['Country of origin', 'India'],
];

export default function BedSheetSpec() {
  return (
    <section>
      <h1 className="title">Premium Cotton Bed Sheet</h1>
      <table className="data spec">
        <caption>Product technical specification</caption>
        <tbody>
          {spec.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
        </tbody>
      </table>
      <p>
        <Link href="/price-list">See prices by size</Link> or <Link href="/enquiry-form">send an enquiry</Link> for samples and
        quotations. Sizes in inches and centimetres: <Link href="/size-guide">size guide</Link>.
      </p>
    </section>
  );
}
