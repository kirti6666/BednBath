// Cart lines live in this browser's localStorage; the Node.js API receives them at checkout.
// "Buy now" keeps its single line under its own key so it never disturbs the cart.
export const CART = 'cart';
export const BUY_NOW = 'buy-now';

export const addLine = (lines, line) =>
  lines.some((l) => l.key === line.key)
    ? lines.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l))
    : [...lines, line];

// Any whole quantity from 1; empty or invalid input becomes 1.
export const setQty = (lines, key, qty) => lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.floor(Number(qty)) || 0) } : l));

// Bulk discount, by multiples of the item's MOQ: 4% from 5x MOQ, 3% from 1x MOQ, none below.
export const BULK_TIERS = [[5, 4], [1, 3]];
export const discountPct = (l) => BULK_TIERS.find(([times]) => l.qty >= times * l.moq)?.[1] ?? 0;

export const removeLine = (lines, key) => lines.filter((l) => l.key !== key);

// Sum in cents so totals don't pick up floating-point noise; the discount is rounded once per line.
export const listCents = (l) => Math.round(l.price * 100) * l.qty;
export const lineCents = (l) => Math.round((listCents(l) * (100 - discountPct(l))) / 100);
export const totalCents = (lines) => lines.reduce((sum, l) => sum + lineCents(l), 0);
export const usd = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const load = (key = CART) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? []; } catch { return []; }
};
export const save = (lines, key = CART) => {
  try { localStorage.setItem(key, JSON.stringify(lines)); } catch { /* storage blocked: cart lasts for this page only */ }
  // Tell the header's cart count; it stays mounted across page changes, so it won't reload on its own.
  if (key === CART && typeof window !== 'undefined') window.dispatchEvent(new Event('cart-change'));
};
