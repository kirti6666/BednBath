import Link from 'next/link';
import CardLogos from '../components/CardLogos';
import { BankIcon, CashIcon, CardIcon, ShieldIcon } from '../components/PayIcons';

export const metadata = { title: 'Payment Options' };

const methods = [
  { id: 'cards', title: 'Credit and debit cards', icon: <CardIcon />, tile: <CardLogos large />, logos: true,
    text: 'Pay at checkout with Visa or Mastercard through our secure payment gateway. Your order is confirmed as soon as the payment succeeds, and a receipt is emailed to you.' },
  { id: 'online-bank-transfer', title: 'Online bank transfer', icon: <BankIcon />,
    text: 'For large bulk orders you can ask to pay by international wire transfer (SWIFT) instead of card. We send a proforma invoice with our bank details; the order is confirmed and dispatched once the payment reaches our account.' },
  { id: 'direct-deposit', title: 'Direct deposit', icon: <CashIcon />,
    text: 'Deposit the proforma invoice amount into our bank account at a branch, then email us the deposit slip with the invoice number. The order is confirmed once the deposit clears.' },
];

export default function PaymentOptions() {
  return (
    <article className="prose wide">
      <h1 className="title">Payment Options</h1>
      <p>
        All orders are prepaid. Choose your products, enter your delivery address at <Link href="/shopping-cart">checkout</Link> and
        pay online; your order is confirmed as soon as the payment succeeds. All prices are in USD, and shipping is added at checkout.
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
            <li>Card payments only happen on our secure checkout page. Bank details only come with our proforma invoice; if you receive changed bank details, call us to confirm before paying.</li>
            <li>We never ask for your card number or PIN by email, phone or WhatsApp.</li>
          </ul>
        </div>
      </section>
      <p>See also our <Link href="/terms-conditions">Terms &amp; Conditions</Link>.</p>
    </article>
  );
}
