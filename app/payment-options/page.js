import Link from 'next/link';
import CardLogos from '../components/CardLogos';

export const metadata = { title: 'Payment Options' };

const Icon = ({ d }) => <svg className="pay-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
const bank = 'M3 9.5 12 4l9 5.5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18';
const deposit = 'M3 7h18v10H3zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M6.5 12h.01M17.5 12h.01';
const card = 'M3 6.5h18v11H3zM3 10h18M6.5 14.5h4';
const shield = 'M12 3 20 6v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-4.5';

const methods = [
  { id: 'online-bank-transfer', title: 'Online bank transfer', icon: <Icon d={bank} />,
    text: 'Pay by international wire transfer (SWIFT) or by bank transfer within India. Our bank details are sent with the proforma invoice. Please quote the invoice number as the payment reference.' },
  { id: 'direct-deposit', title: 'Direct deposit', icon: <Icon d={deposit} />,
    text: 'Deposit the invoice amount directly into our bank account at a branch, then email us the deposit slip with your invoice number so we can match the payment.' },
  { id: 'cards', title: 'Credit and debit cards', icon: <Icon d={card} />, tile: <CardLogos large />, logos: true,
    text: 'We accept Visa and Mastercard. Ask for a card payment link when you confirm your order.' },
];

export default function PaymentOptions() {
  return (
    <article className="prose wide">
      <h1 className="title">Payment Options</h1>
      <p>
        After you send an <Link href="/shopping-cart">order request</Link> or <Link href="/enquiry-form">enquiry</Link>, we
        confirm prices, lead time and shipping and send a proforma invoice. Payment terms for each order are stated on that
        invoice. All prices are in USD.
      </p>

      <ul className="pay-tiles" aria-label="Ways to pay">
        {methods.map((m) => <li key={m.id}><a href={`#${m.id}`}>{m.tile ?? m.icon}<span>{m.title}</span></a></li>)}
      </ul>

      {methods.map((m) => (
        <section key={m.id} id={m.id} className="pay-method">
          {m.icon}
          <div>
            <h2>{m.title}</h2>
            <p>{m.text}</p>
            {m.logos && <p className="accept"><CardLogos /></p>}
          </div>
        </section>
      ))}

      <section className="pay-method safe">
        <Icon d={shield} />
        <div>
          <h2>Stay safe</h2>
          <ul>
            <li>Bank details only come with our proforma invoice. If you receive changed bank details, call us to confirm before paying.</li>
            <li>We never ask for your card number or PIN by email, phone or WhatsApp.</li>
          </ul>
        </div>
      </section>
      <p>See also our <Link href="/terms-conditions">Terms &amp; Conditions</Link>.</p>
    </article>
  );
}
