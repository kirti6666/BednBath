export const metadata = { title: 'Feedback' };

const ratings = ['Excellent', 'Good', 'Average', 'Poor'];

export default function Feedback() {
  return (
    <section>
      <h1 className="title">Feedback</h1>
      <p className="lead">
        Tell us how we did. Your feedback on our products, packaging, delivery and service helps us improve. Fields marked *
        are required.
      </p>
      {/* shortcut: posts to the future Node.js API, which should store or email the feedback */}
      <form className="form" method="post" action="/api/feedback">
        <label htmlFor="fb-name">Name *</label>
        <input id="fb-name" name="name" autoComplete="name" required />
        <label htmlFor="fb-company">Company / hotel</label>
        <input id="fb-company" name="company" autoComplete="organization" />
        <label htmlFor="fb-email">Email *</label>
        <input id="fb-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="fb-order">Invoice / order number</label>
        <input id="fb-order" name="order" />
        <span className="label">Overall rating *</span>
        <fieldset>
          <legend className="sr-only">Overall rating</legend>
          {ratings.map((r) => <label key={r} className="check"><input type="radio" name="rating" value={r} required /> {r}</label>)}
        </fieldset>
        <label htmlFor="fb-message">Your feedback *</label>
        <textarea id="fb-message" name="message" rows="5" required />
        <span />
        <button type="submit" className="btn">Send feedback</button>
      </form>
    </section>
  );
}
