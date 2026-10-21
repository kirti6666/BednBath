import Link from 'next/link';
import { brand, categories, strengths } from './site';

export default function Home() {
  return (
    <>
      <section className="signin" aria-labelledby="signin-title">
        <h2 id="signin-title">Sign In</h2>
        {/* shortcut: posts straight to the Node.js API; add client-side handling when that endpoint exists */}
        <form method="post" action="/api/auth/login">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" autoComplete="username" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          <button type="submit" className="btn submit">Submit</button>
        </form>
        <Link href="/sign-up">Sign Up</Link>
      </section>

      <section className="welcome">
        <h2 className="subtitle">Welcome to {brand.name}</h2>
        <p>
          Specialized manufacturer and exporter of premium hotel linen, in continuous production since 2010. We supply
          4-star and 5-star hotels, sell through Amazon and eBay, and export a significant share of our production
          worldwide. <Link href="/company-profile">Read our company profile</Link>.
        </p>

        <ul className="ranges">
          {categories.map((c) => (
            <li key={c.name}>
              <Link href="/products">
                {c.photo ? <img className="photo" src={c.photo} alt="" width="400" height="300" /> : <span className="photo" aria-hidden="true" />}
                <strong>{c.name}</strong>
              </Link>
              <span>{c.products.join(', ')}</span>
            </li>
          ))}
        </ul>

        <h2 className="subtitle">Why buyers choose us</h2>
        <ul className="ticks">{strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="cta">
          <Link href="/price-list" className="btn">See the price list</Link>
          <Link href="/enquiry-form" className="link">Send an enquiry</Link>
        </div>
      </section>
    </>
  );
}
