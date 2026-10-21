// Cart lines live in this browser's localStorage until the Node.js order API exists.
const KEY = 'cart';

export const addLine = (lines, line) =>
  lines.some((l) => l.key === line.key)
    ? lines.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l))
    : [...lines, line];

// Never below the minimum order quantity; empty or invalid input falls back to the MOQ.
export const setQty = (lines, key, qty) => lines.map((l) => (l.key === key ? { ...l, qty: Math.max(l.moq, Math.floor(Number(qty)) || 0) } : l));

export const removeLine = (lines, key) => lines.filter((l) => l.key !== key);

// Sum in cents so totals don't pick up floating-point noise.
export const lineCents = (l) => Math.round(l.price * 100) * l.qty;
export const totalCents = (lines) => lines.reduce((sum, l) => sum + lineCents(l), 0);
export const usd = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
};
export const save = (lines) => {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage blocked: cart lasts for this page only */ }
  // Tell the header's cart count; it stays mounted across page changes, so it won't reload on its own.
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('cart-change'));
};
