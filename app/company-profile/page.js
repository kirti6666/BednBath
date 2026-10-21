import Link from 'next/link';
import { categories } from '../site';

export const metadata = { title: 'Company Profile' };

const List = ({ items }) => <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>;

export default function CompanyProfile() {
  return (
    <article className="prose">
      <h2>Company Overview</h2>
      <p>
        We are a specialized manufacturer and exporter of premium hotel linen, with continuous production since 2010. Our
        core focus is high-quality bed linen, bath linen and banquet linen designed specifically for the hospitality industry.
      </p>
      <p>
        We supply 4-star and 5-star hotels and also sell through major international retail platforms such as Amazon and
        eBay. A significant portion of our production is exported worldwide.
      </p>

      <h2>Our Expertise &amp; Experience</h2>
      <List items={[
        'Continuous manufacturing of hotel-grade linen since 2010',
        'Strong specialization in the hotel industry',
        'Proven track record of supplying leading 4-star and 5-star hotels',
        'Established presence in both B2B (hotels) and B2C (Amazon and eBay) channels',
        'Reliable exporter with consistent international shipments',
      ]} />

      <h2>Product Range</h2>
      <List items={categories.map((c) => `${c.name}: ${c.products.join(', ')}. ${c.note}`)} />
      <p>
        All products are manufactured to meet the durability, softness and frequent-wash requirements of professional hotel
        use. <Link href="/products">View our products</Link>.
      </p>

      <h2>Key Strengths for International Buyers</h2>
      <List items={[
        'Long-term production continuity since 2010',
        'Experience serving demanding 4-star and 5-star hotel standards',
        'Flexible production capacity for bulk orders as well as retail volumes',
        'Export-ready packaging and documentation',
        'Competitive pricing with consistent quality',
        'Customization of sizes, colours, embroidery, logo and packaging to buyer requirements',
      ]} />

      <h2>Markets We Serve</h2>
      <List items={[
        '4-star and 5-star hotels (direct supply)',
        'International retail platforms (Amazon and eBay, exported products)',
        'Hospitality distributors and importers worldwide',
      ]} />

      <h2>Quality Commitment</h2>
      <p>
        We maintain strict quality control at every stage of production to ensure our linen meets international hotel
        standards for strength, colour fastness, softness and longevity after repeated industrial washing.
      </p>

      <h2>Work With Us</h2>
      <p>
        We welcome inquiries from international buyers, hotel chains, importers and distributors. Contact us for product
        catalogues, samples, MOQ details and competitive quotations.
      </p>
      <Link href="/enquiry-form" className="btn">Send an enquiry</Link>
    </article>
  );
}
