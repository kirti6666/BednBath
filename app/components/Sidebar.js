import Link from 'next/link';
import SideLinks from './SideLinks';
import { sideGroups } from '../site';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {sideGroups.map((g) => (
        <nav key={g.title} className="side-card" aria-label={g.title}>
          <h2>{g.title}</h2>
          <SideLinks links={g.links} />
        </nav>
      ))}
      <div className="side-card quote">
        <h2>Need a bulk quote?</h2>
        <p>Tell us the items, sizes and quantities. We reply with prices, MOQ and lead time.</p>
        <Link href="/enquiry-form" className="btn">Request a quote</Link>
      </div>
    </aside>
  );
}
