import Link from 'next/link';
import { WhatsAppButton } from './WhatsApp';

export default function Banner() {
  return (
    <section className="banner">
      <div>
        <p className="eyebrow">For hotels &amp; resorts</p>
        <h1>Linen that makes every stay feel five-star.</h1>
        <p>Bed, bath and banquet linen, made since 2010 and exported worldwide.</p>
        <div className="cta">
          <Link href="/enquiry-form" className="btn">Request a bulk quote</Link>
          <WhatsAppButton />
          <Link href="/products" className="link">View collections</Link>
        </div>
      </div>
      <img src="/images/banner.jpg" alt="Hotel room made up with white striped sheets and a navy bed runner" />
    </section>
  );
}
