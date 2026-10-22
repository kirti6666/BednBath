import Checkout from '../components/Checkout';

export const metadata = { title: 'Checkout' };

export default function CheckoutPage() {
  return (
    <section>
      <h1 className="title">Checkout</h1>
      <Checkout />
    </section>
  );
}
