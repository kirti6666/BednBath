// All menus, links and product names in one place. Brand name and tagline are placeholders to replace.
export const brand = { name: 'BednBath', tagline: 'Crisp linen... Reliable supply...' };
export const badge = { line: 'Hotel linen manufacturer & exporter', strong: 'Since 2010' };

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const links = (...labels) => labels.map((label) => ({ label, href: `/${slug(label)}` }));

export const topLinks = [{ label: 'Sign In', href: '/' }, { label: 'Home', href: '/' }, ...links('Company Profile', 'Enquiry Form')];
export const mainNav = links('Products', 'Clients', 'Mfg. Facilities', 'Attractive Offers', 'Testimonial', 'Contact us');
export const sideLinks = links('Consignment tracking', 'To know bed linen size', 'Par stock calculation', 'Conversion table', 'Feedback');
export const sideButtons = links('Price List', 'Shopping Cart', 'Payment Options');
export const paymentLinks = links('Online bank transfer', 'Direct deposit');
export const termsLinks = links('Terms & Conditions');
export const footerLinks = [...topLinks.slice(1), ...mainNav];

// Inner pages rendered by app/[slug]; Company Profile and Products have their own pages.
export const pages = [...topLinks.slice(3), ...mainNav.slice(1), ...sideLinks, ...sideButtons, ...paymentLinks, ...termsLinks, ...links('Sign Up')];

export const categories = [
  { name: 'Bed Linen', note: 'High thread count (TC) cotton, poly cotton and luxury blends.',
    products: ['Bedsheets', 'Duvet Covers', 'Pillowcases', 'Mattress Protectors', 'Bed Skirts'] },
  { name: 'Bath Linen', note: 'Soft, highly absorbent and durable hotel-quality towels.',
    products: ['Bath Towels', 'Hand Towels', 'Face Towels', 'Bath Mats', 'Bathrobes'] },
  { name: 'Banquet Linen', note: 'Stain-resistant, elegant fabrics for banquets and events.',
    products: ['Table Cloths', 'Napkins', 'Runners', 'Chair Covers', 'Skirting'] },
];
export const products = categories.flatMap((c) => c.products);
