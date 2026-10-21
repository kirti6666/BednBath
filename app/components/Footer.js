import Link from 'next/link';
import { brand, footerLinks } from '../site';

export default function Footer() {
  return (
    <footer className="footer">
      <ul>
        {footerLinks.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}
      </ul>
      <p>© {new Date().getFullYear()} {brand.name} {brand.line}. Manufacturer &amp; exporter: {brand.maker}. All rights reserved.</p>
    </footer>
  );
}
