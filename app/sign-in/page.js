import Link from 'next/link';

export const metadata = { title: 'Trade sign in' };

export default function SignIn() {
  return (
    <section className="signin" aria-labelledby="signin-title">
      <h1 id="signin-title">Trade sign in</h1>
      <p className="muted">For registered hotel and trade buyers: view your orders, invoices and consignments.</p>
      {/* shortcut: posts straight to the Node.js API; add client-side handling when that endpoint exists */}
      <form className="form" method="post" action="/api/auth/login">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" autoComplete="username" required />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
        <span />
        <button type="submit" className="btn">Sign in</button>
      </form>
      <p>New buyer? <Link href="/sign-up">Create an account</Link> or <Link href="/enquiry-form">send an enquiry</Link>.</p>
    </section>
  );
}
