// npm test
import assert from 'node:assert/strict';

import { inToCm, cmToIn, gsmToOz } from '../app/units.js';
assert.equal(inToCm('66x96'), '168x244 cm');
assert.equal(inToCm('39x75x16"'), '99x191x41 cm');
assert.equal(inToCm('2x(39x80)x16"'), '2x(99x203)x41 cm', 'split-king multiplier kept');
assert.equal(cmToIn('70x140'), '27.6x55.1 in');
assert.equal(cmToIn('40x70 '), '15.7x27.6 in');
assert.equal(gsmToOz(550), '16.2');
console.log('units ok');
