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
          <img src="/images/logo.png" alt={`${brand.name} ${brand.line}`} width="360" height="116" />
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
