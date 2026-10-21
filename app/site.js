// Brand, menus, links and products in one place.
export const brand = { name: 'Luxurious Life', line: 'Hotel Bed & Bath', maker: 'Sagar Traders, India' };
export const tagline = 'Hotel linen manufacturer & exporter · Since 2010 · Made in India';
// shortcut: contact details not supplied yet; pages show "to be added" for null values.
export const contact = { address: null, phone: null, email: null };

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const link = (label, href = `/${slug(label)}`) => ({ label, href });

export const utilityLinks = [link('Trade sign in', '/sign-in'), link('Enquiry', '/enquiry-form')];
export const mainNav = [
  link('Home', '/'), link('About', '/company-profile'), link('Products'), link('Price List'),
  link('Manufacturing'), link('Clients'), link('Testimonials'), link('Contact', '/contact-us'),
];
export const sideGroups = [
  { title: 'Order', links: [link('Price List'), link('Shopping Cart'), link('Payment Options')] },
  { title: 'Buyer tools', links: [link('Size guide'), link('Par stock calculator', '/par-stock-calculation'), link('Conversion table'), link('Consignment tracking')] },
  { title: 'Help', links: [link('Enquiry form'), link('Feedback'), link('Terms & Conditions')] },
];
export const footerColumns = [
  { title: 'Buyer tools', links: sideGroups[1].links },
  { title: 'Company', links: [link('About us', '/company-profile'), link('Manufacturing'), link('Clients'), link('Offers'), link('Testimonials'), link('Contact us')] },
  { title: 'Ordering', links: [...sideGroups[0].links, link('Enquiry form'), link('Terms & Conditions')] },
];

// Placeholder pages rendered by app/[slug]; every other link has its own folder under app/.
export const pages = [link('Manufacturing'), link('Clients'), link('Offers'), link('Testimonials'), link('Sign Up')];
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

// Selling points shown under the banner.
export const highlights = [
  ['Since 2010', 'In continuous production'],
  ['Luxury Hotels', 'Trusted by premium properties'],
  ['Worldwide', 'Export packing & documents'],
  ['Bespoke', 'Sizes, colours & logos'],
];
