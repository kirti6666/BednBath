import Link from 'next/link';
import MainNav from './MainNav';
import Banner from './Banner';
import CartLink from './CartLink';
import { highlightIcons } from './HighlightIcons';
import { brand, tagline, utilityLinks, highlights } from '../site';

export default function Header() {
  return (
    <header>
      <div className="utility">
        <p>{tagline}</p>
        <form className="search" action="/products" role="search">
          <input name="q" placeholder="Search products" aria-label="Search products" />
          <button type="submit">Search</button>
        </form>
        <ul>
          {utilityLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          <li><CartLink /></li>
        </ul>
      </div>

      <div className="masthead">
        <Link href="/" className="logo">
          <img src="/images/logo.png" alt={`${brand.name} ${brand.line}`} width="270" height="87" />
        </Link>
        <MainNav />
      </div>

      <Banner />

      <ul className="highlights">
        {highlights.map(([strong, text]) => {
          const Icon = highlightIcons[strong];
          return <li key={strong}><Icon /><span><strong>{strong}</strong>{text}</span></li>;
        })}
      </ul>
    </header>
  );
}
