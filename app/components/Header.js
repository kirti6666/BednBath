import Link from 'next/link';
import MainNav from './MainNav';
import Banner from './Banner';
import { brand, badge, topLinks, products } from '../site';

export default function Header() {
  return (
    <header>
      <ul className="top-links">
        {topLinks.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}
      </ul>

      <div className="brand-row">
        <Link href="/" className="logo">
          <svg viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="40" cy="40" r="29" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="40" y="53" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontWeight="600" fontSize="38" fill="currentColor">B</text>
          </svg>
          <span>
            <span className="logo-name">{brand.name}</span>
            <span className="logo-tag">{brand.tagline}</span>
          </span>
        </Link>
        <p className="badge">{badge.line}<strong>{badge.strong}</strong></p>
      </div>

      <div className="nav-row">
        <MainNav />
        <form className="search" action="/products" role="search">
          <input name="q" placeholder="search..." aria-label="Search products" />
          <button type="submit">Go</button>
        </form>
      </div>

      <Banner />

      <div className="ticker" aria-label="Product range">
        {/* Two copies so the scroll loops seamlessly. */}
        <div className="ticker-track">
          {[0, 1].map((k) => <span key={k} aria-hidden={k === 1 || undefined}>{products.join(' - ')} - </span>)}
        </div>
      </div>
    </header>
  );
}
