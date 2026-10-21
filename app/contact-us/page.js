import Link from 'next/link';
import { brand, contact } from '../site';

export const metadata = { title: 'Contact us' };

const value = (v, as) => (v ? as(v) : <em className="muted">to be added</em>);

export default function ContactUs() {
  return (
    <section>
      <h1 className="title">Contact us</h1>
      <p className="lead">
        We welcome inquiries from international buyers, hotel chains, importers and distributors. Contact us for product
        catalogues, samples, MOQ details and competitive quotations.
      </p>
      <table className="data spec">
        <tbody>
          <tr><th scope="row">Brand</th><td>{brand.name} {brand.line}</td></tr>
          <tr><th scope="row">Manufacturer &amp; exporter</th><td>{brand.maker}</td></tr>
          <tr><th scope="row">Address</th><td>{value(contact.address, (v) => v)}</td></tr>
          <tr><th scope="row">Phone / WhatsApp</th><td>{value(contact.phone, (v) => <a href={`tel:${v.replace(/\s/g, '')}`}>{v}</a>)}</td></tr>
          <tr><th scope="row">Email</th><td>{value(contact.email, (v) => <a href={`mailto:${v}`}>{v}</a>)}</td></tr>
        </tbody>
      </table>
      <div className="cta">
        <Link href="/enquiry-form" className="btn">Send an enquiry</Link>
        <Link href="/price-list" className="link">See the price list</Link>
      </div>
    </section>
  );
}
