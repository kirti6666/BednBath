'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { save, CART, BUY_NOW } from '../cart';

// The payment gateway returns here with ?order=<number>&source=cart|buy-now once payment succeeds.
export default function OrderConfirmed() {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (!q.get('order')) return;
    setOrder(q.get('order'));
    save([], q.get('source') === 'buy-now' ? BUY_NOW : CART);  // paid: empty what was bought
  }, []);

  return order ? (
    <div className="prose">
      <p className="lead">Payment received. Your order <strong>#{order}</strong> is confirmed and a receipt has been emailed to you.</p>
      <p>We pack and ship from India. You will receive the shipping documents and tracking number by email when your order is dispatched.</p>
      <p><Link href="/consignment-tracking">Track a consignment</Link> · <Link href="/products">Continue shopping</Link></p>
    </div>
  ) : (
    <p className="lead">No order to show. If you have just paid, check your email for the receipt, or <Link href="/contact-us">contact us</Link>.</p>
  );
}
