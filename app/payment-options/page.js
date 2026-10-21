import Link from 'next/link';
import CardLogos from '../components/CardLogos';
import { BankIcon, CashIcon, CardIcon, ShieldIcon } from '../components/PayIcons';

export const metadata = { title: 'Payment Options' };

const methods = [
  { id: 'online-bank-transfer', title: 'Online bank transfer', icon: <BankIcon />,
    text: 'Pay by international wire transfer (SWIFT) or by bank transfer within India. Our bank details are sent with the proforma invoice. Please quote the invoice number as the payment reference.' },
  { id: 'direct-deposit', title: 'Direct deposit', icon: <CashIcon />,
    text: 'Deposit the invoice amount directly into our bank account at a branch, then email us the deposit slip with your invoice number so we can match the payment.' },
  { id: 'cards', title: 'Credit and debit cards', icon: <CardIcon />, tile: <CardLogos large />, logos: true,
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
        <ShieldIcon />
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
