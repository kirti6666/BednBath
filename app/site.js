// All menus, links and product names in one place.
export const brand = { name: 'Luxurious Life', line: 'Hotel Bed & Bath', maker: 'Sagar Traders, India' };
export const badge = { line: 'Hotel linen manufacturer & exporter', strong: 'Since 2010' };
// shortcut: contact details not supplied yet; pages show "to be added" for null values.
export const contact = { address: null, phone: null, email: null };

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const links = (...labels) => labels.map((label) => ({ label, href: `/${slug(label)}` }));

export const topLinks = [{ label: 'Sign In', href: '/' }, { label: 'Home', href: '/' }, ...links('Company Profile', 'Enquiry Form')];
export const mainNav = links('Products', 'Clients', 'Mfg. Facilities', 'Attractive Offers', 'Testimonial', 'Contact us');
export const sideLinks = links('Consignment tracking', 'To know bed linen size', 'Par stock calculation', 'Conversion table', 'Feedback');
export const sideButtons = links('Price List', 'Shopping Cart', 'Payment Options');
// Sections of the Payment Options page.
export const paymentLinks = links('Online bank transfer', 'Direct deposit').map((l) => ({ ...l, href: `/payment-options#${l.href.slice(1)}` }));
export const termsLinks = links('Terms & Conditions');
export const footerLinks = [...topLinks.slice(1), ...mainNav];

// Inner pages rendered by app/[slug]; these have their own folders under app/.
const ownPages = ['/company-profile', '/products', '/price-list', '/enquiry-form', '/contact-us', '/shopping-cart', '/payment-options', '/terms-conditions'];
export const pages = [...topLinks.slice(2), ...mainNav, ...sideLinks, ...sideButtons, ...termsLinks, ...links('Sign Up')]
  .filter((p) => !ownPages.includes(p.href));
export const specPage = '/products/400-tc-cotton-bed-sheet';

export const categories = [
  { name: 'Bed Linen', note: 'High thread count (TC) cotton, poly cotton and luxury blends.',
    products: ['Bedsheets', 'Duvet Covers', 'Pillowcases', 'Duvets & Comforters', 'Mattress Protectors', 'Bed Skirts'], spec: true, photo: '/images/bedsheets.jpg' },
  { name: 'Bath Linen', note: 'Soft, highly absorbent and durable hotel-quality towels.',
    products: ['Bath Towels', 'Hand Towels', 'Face Towels', 'Bath Mats', 'Bathrobes'], photo: '/images/bath-towels.jpg' },
  { name: 'Banquet Linen', note: 'Stain-resistant, elegant fabrics for banquets and events.',
    products: ['Table Cloths', 'Napkins', 'Runners', 'Chair Covers', 'Skirting'] },
];
export const products = categories.flatMap((c) => c.products);
// shortcut: photos for the products we have pictures of; the rest show a placeholder.
export const photos = { 'Bedsheets': '/images/bedsheets.jpg', 'Duvet Covers': '/images/duvet-covers.jpg', 'Pillowcases': '/images/pillowcases.jpg', 'Bath Towels': '/images/bath-towels.jpg' };

export const strengths = [
  'Long-term production continuity since 2010',
  'Experience serving demanding 4-star and 5-star hotel standards',
  'Flexible production capacity for bulk orders as well as retail volumes',
  'Export-ready packaging and documentation',
  'Competitive pricing with consistent quality',
  'Customization of sizes, colours, embroidery, logo and packaging to buyer requirements',
];
