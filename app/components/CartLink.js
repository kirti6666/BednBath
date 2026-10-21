'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { load } from '../cart';

// Cart link with the number of lines saved in this browser; refreshes on each page load.
export default function CartLink() {
  const [count, setCount] = useState(0);
  useEffect(() => setCount(load().length), []);
  return <Link href="/shopping-cart">Cart{count > 0 && <span className="count">{count}</span>}</Link>;
}
