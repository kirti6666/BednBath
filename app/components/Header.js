import Link from 'next/link';
import { brand, topLinks, mainNav, products } from '../data';

export default function Header() {
  return (
    <header className="header">
      <nav className="top-links" aria-label="Account">
        {topLinks.map((l, i) => (
          <span key={l.label}>
            {i > 0 && <span className="sep">|</span>}
            <Link href={l.href}>{l.label}</Link>
          </span>
        ))}
      </nav>

      <div className="brand-row">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden="true">B</span>
          <span>
            <span className="logo-name">{brand.name}</span>
            <span className="logo-tag">{brand.tagline}</span>
          </span>
        </Link>
        <div className="badge">
          The first hotel linen supplier to get
          <strong>ISO 9001 Certification</strong>
        </div>
      </div>

      <div className="main-nav">
        <nav aria-label="Main">
          {mainNav.map((l, i) => (
            <Link key={l.label} href={l.href} className={i === 0 ? 'active' : ''}>{l.label}</Link>
          ))}
        </nav>
        <form className="search" action="/products" role="search">
          <input name="q" placeholder="search..." aria-label="Search products" />
          <button type="submit">Go</button>
        </form>
      </div>

      <section className="banner">
        <div className="banner-text">
          <p className="eyebrow">For hotels &amp; resorts</p>
          <h1>Linen that makes every stay feel five-star.</h1>
          <p>Bed linen, towels and blankets supplied in bulk.</p>
          <div className="banner-cta">
            <Link href="/enquiry-form" className="btn">Request a bulk quote</Link>
            <Link href="/products" className="link">View collections</Link>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Product range">
        {/* Rendered twice so the CSS loop is seamless. */}
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1}>{products.join('  -  ')}  -  </span>
          ))}
        </div>
      </div>
    </header>
  );
}
