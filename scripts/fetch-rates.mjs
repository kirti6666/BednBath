// Runs before every build: saves today's USD exchange rates into app/fx.json, so the built pages start with real rates.
// Offline builds keep the rates already in the file.
import { readFileSync, writeFileSync } from 'node:fs';

const file = new URL('../app/fx.json', import.meta.url);
try {
  const d = await (await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(8000) })).json();
  const rates = Object.fromEntries(Object.entries(d.rates ?? {}).filter(([c, r]) => /^[A-Z]{3}$/.test(c) && Number.isFinite(r) && r > 0));
  if (d.result !== 'success' || rates.USD !== 1 || Object.keys(rates).length < 100) throw new Error('unexpected response');
  const fx = { ...JSON.parse(readFileSync(file, 'utf8')), updated: d.time_last_update_unix * 1000, rates };
  writeFileSync(file, `${JSON.stringify(fx, null, 2)}\n`);
  console.log(`fx.json: ${Object.keys(rates).length} live rates`);
} catch (e) {
  console.log(`fx.json: kept saved rates (${e.message})`);
}
