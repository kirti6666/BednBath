import Link from 'next/link';

export default function Home() {
  return (
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
  );
}
