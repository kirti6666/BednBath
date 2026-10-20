import Link from 'next/link';
import { sideLinks, sideButtons, paymentLinks } from '../site';

const icons = {
  'Price List': <path d="M8 7h9M8 12h9M8 17h9M4.5 7h.01M4.5 12h.01M4.5 17h.01" />,
  'Shopping Cart': <path d="M3 4h2.5l2.2 10.5h10L20 7.5H6.5M10.5 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 1 1 3 0M18.5 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 1 1 3 0" />,
  'Payment Options': <path d="M3.5 6.5h17v11h-17zM3.5 10h17M7 14.5h4" />,
};

const List = ({ items }) => (
  <ul className="side-list">
    {items.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
  </ul>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <List items={sideLinks} />
      {sideButtons.map((b) => (
        <Link key={b.href} href={b.href} className="side-btn">
          <span className="side-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[b.label]}</svg></span>
          {b.label}
        </Link>
      ))}
      <List items={paymentLinks} />
      <div className="cards">
        <span className="visa" role="img" aria-label="Visa">VISA</span>
        <span className="mastercard" role="img" aria-label="Mastercard"><i /><i /></span>
      </div>
    </aside>
  );
}
