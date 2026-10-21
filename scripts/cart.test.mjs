// node scripts/cart.test.mjs
import assert from 'node:assert/strict';
import { addLine, setQty, removeLine, totalCents, usd } from '../app/cart.js';

const sheet = { key: 'FSQ-102|400 TC', price: 67.1, moq: 10, qty: 10 };
const towel = { key: 'BTW-1026|Price', price: 25.11, moq: 25, qty: 25 };

let lines = addLine(addLine([], sheet), towel);
assert.equal(lines.length, 2);
lines = addLine(lines, sheet);
assert.equal(lines.length, 2, 'same item merges');
assert.equal(lines[0].qty, 20);
assert.equal(setQty(lines, sheet.key, 3)[0].qty, 10, 'not below MOQ');
assert.equal(setQty(lines, sheet.key, '')[0].qty, 10, 'empty input -> MOQ');
assert.equal(setQty(lines, sheet.key, '12.7')[0].qty, 12);
assert.equal(totalCents(lines), 6710 * 20 + 2511 * 25);
assert.equal(usd(totalCents([{ price: 49.42, qty: 10 }])), '$494.20');
assert.equal(removeLine(lines, towel.key).length, 1);
console.log('cart ok');
