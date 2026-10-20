// All menus, links and product names in one place. Brand and badge copy are placeholders to replace.
export const brand = { name: 'BednBath', tagline: 'Crisp linen... Reliable supply...' };
export const badge = { line: 'Hotel & hospitality linen supplier', strong: 'ISO 9001 Certified' };

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const links = (...labels) => labels.map((label) => ({ label, href: `/${slug(label)}` }));

export const topLinks = [{ label: 'Sign In', href: '/' }, { label: 'Home', href: '/' }, ...links('Company Profile', 'Enquiry Form')];
export const mainNav = links('Products', 'Clients', 'Mfg. Facilities', 'Attractive Offers', 'Testimonial', 'Contact us');
export const sideLinks = links('Consignment tracking', 'To know bed linen size', 'Par stock calculation', 'Conversion table', 'Feedback');
export const sideButtons = links('Price List', 'Shopping Cart', 'Payment Options');
export const paymentLinks = links('Online bank transfer', 'Direct deposit');
export const footerLinks = [...topLinks.slice(1), ...mainNav];

// Inner pages rendered by app/[slug]; Products has its own page.
export const pages = [...topLinks.slice(2), ...mainNav.slice(1), ...sideLinks, ...sideButtons, ...paymentLinks, ...links('Sign Up')];

export const products = [
  'Bed Sheets', 'Duvet Covers', 'Pillow Covers', 'Duvets', 'Pillows', 'Mattress Protectors', 'Blankets', 'Bed Spreads',
  'Bath Towels', 'Hand Towels', 'Face Towels', 'Pool Towels', 'Health Club Towels', 'Bath Mats', 'Bathrobes',
  'Bath Room Slippers', 'Polyester Shower Curtains',
];
