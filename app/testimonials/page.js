import Link from 'next/link';

export const metadata = { title: 'Testimonials' };

// shortcut: sample reviews to show the layout; replace them with real buyer feedback (with the buyer's permission) before launch,
// then remove the "sample" note below.
const reviews = [
  {
    name: 'Rajesh Malhotra', role: 'Purchase Manager, business hotel', place: 'New Delhi, India',
    text: 'We ordered 400 TC sheet sets and duvet covers for 120 rooms. The fabric matched the approved sample exactly, and the stitching has held up well after months of daily laundry. The order arrived two days before our deadline.',
  },
  {
    name: 'Imran Qureshi', role: 'Procurement Head, serviced apartments', place: 'Dubai, UAE',
    text: 'Clear quotation, no surprises on the invoice. They helped us choose between 300 and 400 TC for our budget and sent samples within a week. Our second container is already on its way.',
  },
  {
    name: 'Michael Thompson', role: 'Operations Director, hotel group', place: 'Manchester, United Kingdom',
    text: 'Consistent quality across three repeat orders, which is what matters most to us. The towels keep their softness and colour after commercial washing. Communication by email was quick and professional throughout.',
  },
  {
    name: 'Priya Nair', role: 'Executive Housekeeper, beach resort', place: 'Kochi, India',
    text: 'The white comforters are lovely and full without being heavy, and guests have commented on how comfortable the beds are. They also stitched our resort logo on the pillowcases at no extra delay.',
  },
  {
    name: 'Sarah Mitchell', role: 'Owner, boutique hotel', place: 'Toronto, Canada',
    text: 'As a small hotel I was worried about minimum order quantities, but the team worked with us on a mixed order of sheets, pillowcases and towels. Packing was excellent and everything arrived in perfect condition.',
  },
  {
    name: 'Fatima Al Mansoori', role: 'Housekeeping Manager, city hotel', place: 'Abu Dhabi, UAE',
    text: 'We replaced all our bed linen with their percale sheets. The sizes are accurate, the fitted sheets stay in place, and the fabric still looks crisp after many washes. Very reliable supplier.',
  },
  {
    name: 'David Fernandes', role: 'Linen Supply Manager, hospitality distributor', place: 'New Jersey, United States',
    text: 'Good value for the quality, and the paperwork for customs was complete and on time. We now supply their bed and bath linen to several of our hotel clients.',
  },
];

export default function Testimonials() {
  return (
    <section>
      <h1 className="title">Testimonials</h1>
      <p className="lead">What hotel and trade buyers say about our linen and service.</p>
      <p className="sample-note">Sample reviews: these show the page layout and will be replaced with feedback from real buyers.</p>
      <ul className="reviews">
        {reviews.map((r) => (
          <li key={r.name}>
            <blockquote>{r.text}</blockquote>
            <p><strong>{r.name}</strong>{r.role}<br />{r.place}</p>
          </li>
        ))}
      </ul>
      <div className="cta">
        <Link href="/feedback" className="btn">Share your feedback</Link>
        <Link href="/enquiry-form" className="link">Send an enquiry</Link>
      </div>
    </section>
  );
}
