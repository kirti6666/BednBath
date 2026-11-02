'use client';
import { useSyncExternalStore } from 'react';
import saved from './fx.json';
import { countryCurrency } from './countries';

// Prices are set in USD and converted with daily rates. Pages start with the rates saved at build time (app/fx.json),
// then switch to today's rates. shortcut: one free, keyless rate source; if it is down, the saved rates stay.
const RATES_URL = 'https://open.er-api.com/v6/latest/USD';
const DAY = 24 * 60 * 60 * 1000;
const initial = { code: 'USD', country: '', rates: saved.rates, updated: saved.updated };

let state = initial;
let started = false;
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };
const read = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
const write = (key, value) => { try { localStorage.setItem(key, value); } catch { /* private mode: keep it for this page only */ } };

// Keep only well-formed rates from the outside source.
export const cleanRates = (rates) =>
  Object.fromEntries(Object.entries(rates ?? {}).filter(([c, r]) => /^[A-Z]{3}$/.test(c) && Number.isFinite(r) && r > 0));

// First visit: guess the country from the browser's language setting (en-GB -> GB), for the currency only.
const guessCountry = () => {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const region = tag?.match(/-([A-Z]{2})\b/i)?.[1]?.toUpperCase();
    if (region && countryCurrency[region]) return region;
  }
  return '';
};

function start() {
  started = true;
  let cached = null;
  try { cached = JSON.parse(read('fx')); } catch { /* corrupt cache: fetch again */ }
  const country = read('country') ?? guessCountry();
  const code = read('currency') || countryCurrency[country] || 'USD';
  set({ country, code, ...(cached?.rates && { rates: cached.rates, updated: cached.updated }) });
  if (cached?.rates && Date.now() - cached.fetched < DAY) return;
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
export const useCurrency = () => useSyncExternalStore(subscribe, () => state, () => initial);
export const setCurrency = (code) => { write('currency', code); set({ code }); };
export const setCountry = (country) => {
  write('country', country);
  set({ country });
  if (countryCurrency[country]) setCurrency(countryCurrency[country]);
};

export function formatPrice(usd, { code, rates }) {
  const known = rates[code] ? code : 'USD';
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency: known }).format(usd * rates[known]);
  } catch {
    return `$${usd.toFixed(2)}`;
  }
}
