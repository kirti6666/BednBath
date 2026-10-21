import Link from 'next/link';

export const metadata = { title: 'Payment Options' };

export default function PaymentOptions() {
  return (
    <article className="prose">
      <h1 className="title">Payment Options</h1>
      <p>
        After you send an <Link href="/shopping-cart">order request</Link> or <Link href="/enquiry-form">enquiry</Link>, we
        confirm prices, lead time and shipping and send a proforma invoice. Payment terms for each order are stated on that
        invoice. All prices are in USD.
      </p>

      <h2 id="online-bank-transfer">Online bank transfer</h2>
      <p>
        Pay by international wire transfer (SWIFT) or by bank transfer within India. Our bank details are sent with the
        proforma invoice. Please quote the invoice number as the payment reference.
      </p>

      <h2 id="direct-deposit">Direct deposit</h2>
      <p>
        Deposit the invoice amount directly into our bank account at a branch, then email us the deposit slip with your
        invoice number so we can match the payment.
      </p>

      <h2 id="cards">Credit and debit cards</h2>
      <p>We accept Visa and Mastercard. Ask for a card payment link when you confirm your order.</p>

      <h2>Stay safe</h2>
      <ul>
        <li>Bank details only come with our proforma invoice. If you receive changed bank details, call us to confirm before paying.</li>
        <li>We never ask for your card number or PIN by email, phone or WhatsApp.</li>
      </ul>
      <p>See also our <Link href="/terms-conditions">Terms &amp; Conditions</Link>.</p>
    </article>
  );
}
