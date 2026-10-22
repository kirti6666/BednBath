import OrderConfirmed from '../components/OrderConfirmed';

export const metadata = { title: 'Order confirmed' };

export default function OrderConfirmationPage() {
  return (
    <section>
      <h1 className="title">Thank you for your order</h1>
      <OrderConfirmed />
    </section>
  );
}
