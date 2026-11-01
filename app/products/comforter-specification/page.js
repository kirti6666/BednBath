import Link from 'next/link';
import { brand, comforterSizes } from '../../site';
import { inToCm } from '../../units';

export const metadata = { title: 'Comforter Specification' };

// From the client's comforter specification.
const spec = [
  ['Product', 'Premium comforter'],
  ['Brand', `${brand.name} ${brand.line}`],
  ['Outer fabric', '100% cotton'],
  ['Filling', '250 GSM microfibre, evenly distributed'],
  ['Construction', 'Box quilted or channel quilted, premium stitching'],
  ['Feel', 'Soft and smooth'],
  ['Colours', 'Red, Pink, Grey, Black and White'],
  ['Use', 'Home, hotel and hospitality'],
  ['Packaging', 'Individual polybag or vacuum packing'],
  ['Customization', 'Custom sizes, colours and private labelling'],
  ['Country of origin', 'India'],
];

export default function ComforterSpec() {
  return (
    <section>
      <h1 className="title">Premium Comforter</h1>
      <table className="data spec">
        <caption>Product technical specification</caption>
        <tbody>
          {spec.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
        </tbody>
      </table>
      <table className="data narrow">
        <caption>Sizes (USA standard)</caption>
        <thead><tr><th scope="col">Size</th><th scope="col">Inches</th><th scope="col">Centimetres</th></tr></thead>
        <tbody>
          {comforterSizes.map(([name, inches]) => (
            <tr key={name}><th scope="row">{name}</th><td>{inches.replace('x', ' × ')}</td><td>{inToCm(inches).replace('x', ' × ')}</td></tr>
          ))}
        </tbody>
      </table>
      <p><Link href="/enquiry-form">Send an enquiry</Link> for samples and quotations.</p>
    </section>
  );
}
