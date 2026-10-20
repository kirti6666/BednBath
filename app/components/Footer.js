import Link from 'next/link';
import { brand, footerLinks } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <nav aria-label="Footer">
        {footerLinks.map((l) => <Link key={l.label} href={l.href}>{l.label}</Link>)}
      </nav>
      <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
    </footer>
  );
}
