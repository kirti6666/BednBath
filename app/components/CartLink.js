'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { load } from '../cart';

// Cart link with the number of lines saved in this browser, updated whenever the cart changes (here or in another tab).
export default function CartLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const refresh = () => setCount(load().length);
    refresh();
    addEventListener('cart-change', refresh);
    addEventListener('storage', refresh);
    return () => { removeEventListener('cart-change', refresh); removeEventListener('storage', refresh); };
  }, []);
  return <Link href="/shopping-cart">Cart{count > 0 && <span className="count">{count}</span>}</Link>;
}
