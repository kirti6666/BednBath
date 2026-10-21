import Link from 'next/link';
import { sideGroups } from '../site';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {sideGroups.map((g) => (
        <nav key={g.title} className="side-card" aria-label={g.title}>
          <h2>{g.title}</h2>
          <ul>{g.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
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
