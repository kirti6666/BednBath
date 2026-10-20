export const brand = { name: '[YOUR BRAND]', tagline: 'Soft product... Solid support...' };

export const topLinks = [
  { label: 'Sign In', href: '/' },
  { label: 'Home', href: '/' },
  { label: 'Company Profile', href: '/company-profile' },
  { label: 'Enquiry Form', href: '/enquiry-form' },
];

export const mainNav = [
  { label: 'Products', href: '/products' },
  { label: 'Clients', href: '/clients' },
  { label: 'Mfg. Facilities', href: '/mfg-facilities' },
  { label: 'Attractive Offers', href: '/attractive-offers' },
  { label: 'Testimonial', href: '/testimonial' },
  { label: 'Contact us', href: '/contact-us' },
];

export const sidebarLinks = [
  { label: 'Consignment tracking', href: '/consignment-tracking' },
  { label: 'To know bed linen size', href: '/bed-linen-size' },
  { label: 'Par stock calculation', href: '/par-stock-calculation' },
  { label: 'Conversion table', href: '/conversion-table' },
  { label: 'Feedback', href: '/feedback' },
];

export const sidebarButtons = [
  { label: 'Price List', href: '/price-list', icon: '☰' },
  { label: 'Shopping Cart', href: '/shopping-cart', icon: '🛒' },
  { label: 'Payment Options', href: '/payment-options', icon: '💳' },
];

export const paymentLinks = [
  { label: 'Online bank transfer', href: '/online-bank-transfer' },
  { label: 'Direct deposit', href: '/direct-deposit' },
];

export const termsLinks = [{ label: 'Terms & Conditions', href: '/terms-and-conditions' }];

export const products = [
  'Bed Sheets', 'Duvet Covers', 'Pillow Covers', 'Duvets', 'Pillows', 'Mattress Protectors',
  'Blankets', 'Bed Spreads', 'Bath Towels', 'Hand Towels', 'Face Towels', 'Pool Towels',
  'Health Club Towels', 'Bath Mats', 'Bathrobes', 'Bath Room Slippers',
  'Polyester Shower Curtains', 'Table Linen',
];

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const footerLinks = [...topLinks.slice(1), ...mainNav.slice(1)];

// Every internal page the links above point to, used to pre-render placeholders.
export const allPages = [...topLinks, ...mainNav, ...sidebarLinks, ...sidebarButtons, ...paymentLinks, ...termsLinks]
  .filter((l) => l.href !== '/');
