import ProductGrid from './components/ProductGrid';

export default function Home() {
  return (
    <>
      <section className="signin">
        <h2>Sign In</h2>
        {/* shortcut: no handler yet, point action at the Node.js auth endpoint when it exists */}
        <form method="post" action="/api/auth/login">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" autoComplete="username" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
          <button type="submit" className="btn">Submit</button>
        </form>
        <a href="/sign-up">Sign Up</a>
      </section>

      <section>
        <h2 className="section-title">Our Products</h2>
        <ProductGrid />
      </section>
    </>
  );
}
