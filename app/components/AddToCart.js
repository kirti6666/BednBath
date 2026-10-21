'use client';
import { useState } from 'react';
import { addLine, load, save } from '../cart';

// A price in the price list; clicking adds that item to the cart at its MOQ.
export default function AddToCart({ line }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      className={added ? 'price-btn added' : 'price-btn'}
      aria-label={`Add ${line.moq} × ${line.name}, ${line.option} at ${line.price.toFixed(2)} USD to cart`}
      onClick={() => {
        save(addLine(load(), { ...line, qty: line.moq }));
        setAdded(true);
      }}
    >
      {line.price.toFixed(2)}
    </button>
  );
}
