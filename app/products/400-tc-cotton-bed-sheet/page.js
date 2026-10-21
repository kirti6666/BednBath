import Link from 'next/link';
import { brand } from '../../site';

export const metadata = { title: '400 TC Premium Cotton Bed Sheet' };

const spec = [
  ['Product', '400 TC Premium Cotton Bed Sheet, with matching pillow covers and duvet covers'],
  ['Brand', `${brand.name} ${brand.line}`],
  ['Category', 'Bed Linen'],
  ['Fabric', '100% cotton (Indian cotton), combed cotton / percale'],
  ['Thread count', '400 TC'],
  ['Weave', 'Plain weave; satin stripe on the stripe variant'],
  ['Stripe design', '1 cm white-on-white stripe (stripe variant)'],
  ['Finish', 'Soft, smooth, durable premium finish'],
  ['Colours', 'White, Ivory, Beige, Light Grey and custom colours'],
  ['Sizes', 'Twin, Full, Queen, King and California King'],
  ['Styles', 'Flat sheet; fitted sheet on request (pocket depth to be specified); matching pillowcases'],
  ['Use', 'Hotels, resorts and hospitality'],
  ['Customization', 'Size, colour, GSM, finish, labels, packaging and private labelling'],
  ['Packing', 'Individual retail packaging or bulk export packing, as required'],
  ['MOQ', 'Depends on size, design and order quantity; see the price list'],
  ['Care', 'Machine wash and tumble dry as per tested fabric care requirements'],
  ['Target market', 'USA retailers, wholesalers, importers, hotels and e-commerce brands'],
  ['Country of origin', 'India'],
  ['Manufacturer & exporter', brand.maker],
];

export default function Spec() {
  return (
    <section>
      <h1 className="title">400 TC Premium Cotton Bed Sheet</h1>
      <table className="data spec">
        <caption>Product Technical Specification</caption>
        <tbody>
          {spec.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
        </tbody>
      </table>
      <p>
        <Link href="/price-list">See prices by size</Link> or <Link href="/enquiry-form">send an enquiry</Link> for samples and
        quotations.
      </p>
    </section>
  );
}
