// Inch sizes from the price sheet ("66x96", '39x75x16"', '2x(39x80)x16"') shown in cm.
// A count before "x(" (the 2 in split-king sizes) is a multiplier, not a length, so it is kept.
export const inToCm = (size) => `${size.replace(/"/g, '').replace(/\d+(\.\d+)?(?!\.|\d|x\()/g, (n) => Math.round(n * 2.54))} cm`;

// Towel sizes are given in cm; one decimal is enough in inches.
export const cmToIn = (size) => `${size.trim().replace(/\d+(\.\d+)?/g, (n) => (n / 2.54).toFixed(1))} in`;

export const gsmToOz = (gsm) => (gsm * 0.0295).toFixed(1);
