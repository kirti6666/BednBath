import MailForm from '../components/MailForm';

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
      <MailForm
        subject="New feedback"
        button="Send feedback"
        thanksTitle="Thank you for your feedback"
        thanksText="We read every message and use it to improve our products and service."
      >
        <label htmlFor="fb-name">Name *</label>
        <input id="fb-name" name="Name" autoComplete="name" maxLength={100} required />
        <label htmlFor="fb-company">Company / hotel</label>
        <input id="fb-company" name="Company / hotel" autoComplete="organization" maxLength={150} />
        <label htmlFor="fb-email">Email *</label>
        <input id="fb-email" name="Email" type="email" autoComplete="email" maxLength={150} required />
        <label htmlFor="fb-order">Invoice / order number</label>
        <input id="fb-order" name="Invoice / order number" maxLength={50} />
        <span className="label">Overall rating *</span>
        <fieldset>
          <legend className="sr-only">Overall rating</legend>
          {ratings.map((r) => <label key={r} className="check"><input type="radio" name="Rating" value={r} required /> {r}</label>)}
        </fieldset>
        <label htmlFor="fb-message">Your feedback *</label>
        <textarea id="fb-message" name="Feedback" rows="5" maxLength={3000} required />
      </MailForm>
    </section>
  );
}
