import Link from 'next/link';
import CardLogos from './CardLogos';
import { brand, categories, footerColumns } from '../site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <p className="footer-brand">{brand.name}<span>{brand.line}</span></p>
          <p>Premium bed, bath and banquet linen for hotels, made since 2010 and exported worldwide.</p>
          <ul>{categories.map((c) => <li key={c.name}><Link href="/products">{c.name}</Link></li>)}</ul>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>{col.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {brand.name} {brand.line}. Manufacturer &amp; exporter: {brand.maker}.</p>
        <p className="accept">We accept <CardLogos /></p>
      </div>
    </footer>
  );
}
