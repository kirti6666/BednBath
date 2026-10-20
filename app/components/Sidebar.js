import Link from 'next/link';
import { sidebarLinks, sidebarButtons, paymentLinks, termsLinks } from '../data';

const List = ({ items }) => (
  <ul className="side-list">
    {items.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}
  </ul>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <List items={sidebarLinks} />
      {sidebarButtons.map((b) => (
        <Link key={b.label} href={b.href} className="side-btn">
          <span className="side-icon" aria-hidden="true">{b.icon}</span>{b.label}
        </Link>
      ))}
      <List items={paymentLinks} />
      <div className="cards" aria-label="We accept">
        <span className="card visa">VISA</span>
        <span className="card mc">Mastercard</span>
      </div>
      <List items={termsLinks} />
    </aside>
  );
}
