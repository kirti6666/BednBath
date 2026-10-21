import Cart from '../components/Cart';

export const metadata = { title: 'Shopping Cart' };

export default function ShoppingCart() {
  return (
    <section>
      <h1 className="title">Shopping Cart</h1>
      <Cart />
    </section>
  );
}
