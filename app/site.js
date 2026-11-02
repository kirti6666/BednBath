// Brand, menus, links and products in one place.
export const brand = { name: 'Luxurious Life', line: 'Hotel Bed & Bath' };
export const tagline = 'Hotel linen manufacturer & exporter · India';
// shortcut: contact details not supplied yet; pages show "to be added" for null values.
export const contact = { address: null, phone: '+91 99814 99171', email: null };
// WhatsApp enquiries: wa.me needs the number with its country code and no + or spaces.
export const whatsapp = '919981499171';
// Enquiry and feedback forms are emailed here through FormSubmit (formsubmit.co): no server or password needed.
// The first submission sends an "Activate form" email to this inbox; click it once. FormSubmit then offers a random
// alias for the address: put the alias here so the real address is not in the page code.
export const formsEmail = 'cottonmp09@gmail.com';

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const link = (label, href = `/${slug(label)}`) => ({ label, href });

export const utilityLinks = [link('Trade sign in', '/sign-in'), link('Enquiry', '/enquiry-form')];
export const mainNav = [
  link('Home', '/'), link('About', '/company-profile'), link('Products'), link('Price List'),
  link('Testimonials'), link('Contact', '/contact-us'),
];
export const sideGroups = [
  { title: 'Ordering', links: [link('Price List'), link('Payment Options')] },
  { title: 'Buyer tools', links: [link('Size guide'), link('Par stock calculator', '/par-stock-calculation'), link('Conversion table')] },
  { title: 'Help', links: [link('Enquiry form'), link('Feedback'), link('Terms & Conditions')] },
];
export const footerColumns = [
  { title: 'Buyer tools', links: sideGroups[1].links },
  { title: 'Company', links: [link('About us', '/company-profile'), link('Offers'), link('Testimonials'), link('Contact us')] },
  { title: 'Ordering', links: [...sideGroups[0].links, link('Enquiry form'), link('Terms & Conditions')] },
];

// Placeholder pages rendered by app/[slug]; every other link has its own folder under app/.
export const pages = [link('Offers'), link('Sign Up')];
export const specPage = '/products/bed-sheet-specification';
export const comforterSpecPage = '/products/comforter-specification';

// Standard comforter sizes in inches, from the comforter specification.
// Countries we ship to (named by the client); other destinations are quoted on request.
export const shipsTo = ['United States', 'Canada', 'United Kingdom', 'United Arab Emirates (Dubai)'];

// Languages offered through Google's automatic translation: [code, native name, English name]. Arabic left out on purpose.
export const languages = [
  ['en', 'English'], ['hi', 'हिन्दी', 'Hindi'], ['fr', 'Français', 'French'], ['es', 'Español', 'Spanish'],
  ['de', 'Deutsch', 'German'], ['pt', 'Português', 'Portuguese'], ['it', 'Italiano', 'Italian'], ['nl', 'Nederlands', 'Dutch'],
  ['ru', 'Русский', 'Russian'], ['zh-CN', '中文（简体）', 'Chinese'], ['ja', '日本語', 'Japanese'],
];

export const comforterSizes = [['Twin', '68x88'], ['Twin XL', '68x90'], ['Full / Double', '80x90'], ['Queen', '90x90'], ['King', '104x90'], ['California King', '104x96']];

export const categories = [
  { name: 'Bed Linen', note: 'High thread count (TC) cotton, poly cotton and luxury blends.',
    products: ['Bedsheets', 'Duvet Covers', 'Pillowcases', 'Duvets & Comforters', 'Mattress Protectors', 'Bed Skirts'], spec: true, photo: '/images/bed-gold.jpg' },
  { name: 'Bath Linen', note: 'Soft, highly absorbent and durable hotel-quality towels.',
    products: ['Bath Towels', 'Hand Towels', 'Face Towels', 'Bath Mats', 'Bathrobes'], photo: '/images/towels.jpg' },
  { name: 'Banquet Linen', note: 'Stain-resistant, elegant fabrics for banquets and events.',
    products: ['Table Cloths', 'Napkins', 'Runners', 'Chair Covers', 'Skirting'] },
];
export const products = categories.flatMap((c) => c.products);
// shortcut: photos only for the products we have pictures of; the rest show a placeholder until photos arrive.
const img = (...names) => names.map((n) => `/images/${n}.jpg`);
export const photos = {
  'Bedsheets': img('bed-navy-ll', 'bed-gold', 'room-navy', 'bed-patterned'),
  'Duvet Covers': img('bed-patterned', 'bed-navy-ll', 'room-navy', 'bed-gold'),
  'Pillowcases': img('pillows-gold', 'pillows-patterned', 'pillows-navy'),
  'Bath Towels': img('towels', 'towels-detail'),
  // One photo per colour in the comforter specification (Red, Pink, Grey, Black, White), plus two more grey views.
  'Hand Towels': img('towels-detail', 'towels'), // same white dobby-border towel range as the bath towels
  'Face Towels': img('towels', 'towels-detail'),
  'Duvets & Comforters': img('comforter-red', 'comforter-pink', 'comforter-grey', 'comforter-grey-folded', 'comforter-grey-bed', 'comforter-black', 'comforter-white'),
};
// Captions shown on a product's photos, in the same order as its photos.
export const photoCaptions = { 'Duvets & Comforters': ['Red', 'Pink', 'Grey', 'Grey', 'Grey', 'Black', 'White'] };

// Product facts shown on each product page, by range (from the company profile and the product specifications).
export const rangeDetails = {
  'Bed Linen': ['100% organic Indian cotton, combed cotton / percale', '300 TC, 400 TC and 600 TC; plain percale or 1 cm satin stripe',
    'Soft, smooth, durable finish for frequent industrial washing', 'White, ivory, beige, light grey and custom colours',
    'Custom sizes, colours, embroidery, labels and packaging'],
  'Bath Linen': ['Soft, highly absorbent and durable hotel-quality towels', 'Made for repeated industrial washing',
    'Custom sizes, colours, embroidery and logos'],
  'Banquet Linen': ['Stain-resistant, elegant fabrics for banquets and events', 'Custom sizes, colours and logos'],
};
export const productHref = (name) => `/products/${slug(name)}`;
export const rangeHref = (name) => `/products/${slug(name)}`;  // range and product slugs never collide

export const strengths = [
  'Long-term production continuity since 2010',
  'Experience serving demanding 4-star and 5-star hotel standards',
  'Flexible production capacity for large and repeat bulk orders',
  'Export-ready packaging and documentation',
  'Competitive pricing with consistent quality',
  'Customization of sizes, colours, embroidery, logo and packaging to buyer requirements',
];

// Selling points shown under the banner.
export const highlights = [
  ['Since 2010', 'In continuous production'],
  ['Hospitality Grade', 'For premium hotels & resorts'],
  ['Worldwide', 'Export packing & documents'],
  ['Bespoke', 'Sizes, colours & logos'],
];
