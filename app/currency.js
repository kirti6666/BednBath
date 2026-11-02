'use client';
import { useSyncExternalStore } from 'react';

// Prices are set in USD and converted with today's rates.
// shortcut: one free, keyless source refreshed once a day; if it is unreachable, prices stay in USD.
const RATES_URL = 'https://open.er-api.com/v6/latest/USD';
const DAY = 24 * 60 * 60 * 1000;
const usdOnly = { code: 'USD', rates: { USD: 1 }, updated: null };

let state = usdOnly;
let started = false;
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
const read = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
const write = (key, value) => { try { localStorage.setItem(key, value); } catch { /* private mode: keep it for this page only */ } };

// Keep only well-formed rates from the outside source.
export const cleanRates = (rates) =>
  Object.fromEntries(Object.entries(rates ?? {}).filter(([c, r]) => /^[A-Z]{3}$/.test(c) && Number.isFinite(r) && r > 0));

function start() {
  started = true;
  let saved = null;
  try { saved = JSON.parse(read('fx')); } catch { /* corrupt cache: fetch again */ }
  set({ code: read('currency') || 'USD', ...(saved?.rates && { rates: saved.rates, updated: saved.updated }) });
  if (saved?.rates && Date.now() - saved.fetched < DAY) return;
  fetch(RATES_URL)
    .then((r) => r.json())
    .then((d) => {
      const rates = cleanRates(d.rates);
      if (d.result !== 'success' || rates.USD !== 1) return;
      const fx = { rates, updated: d.time_last_update_unix * 1000, fetched: Date.now() };
      write('fx', JSON.stringify(fx));
      set(fx);
    })
    .catch(() => {});
}

const subscribe = (l) => { listeners.add(l); if (!started) start(); return () => listeners.delete(l); };
export const useCurrency = () => useSyncExternalStore(subscribe, () => state, () => usdOnly);
export const setCurrency = (code) => { write('currency', code); set({ code }); };

export function formatPrice(usd, { code, rates }) {
  const known = rates[code] ? code : 'USD';
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency: known }).format(usd * rates[known]);
  } catch {
    return `$${usd.toFixed(2)}`;
  }
}
