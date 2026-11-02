import { brand, whatsapp } from '../site';

export const waLink = (text) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
const href = (topic) => waLink(`Hello ${brand.name}, I would like to enquire about ${topic}.`);

// WhatsApp logo: a speech bubble with a phone handset.
const Logo = () => (
  <svg className="wa-logo" viewBox="0 0 24 24" aria-hidden="true">
    <path className="wa-bubble" d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.95 5.08-1.33A10 10 0 1 0 12 2z" />
    <path className="wa-phone" transform="translate(6.6 6.6) scale(.45)" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z" />
  </svg>
);

// "WhatsApp us" button, placed beside enquiry buttons; `compact` shows only the logo.
export function WhatsAppButton({ topic = 'your hotel linen', compact = false }) {
  return (
    <a className={`btn wa${compact ? ' wa-compact' : ''}`} href={href(topic)} target="_blank" rel="noopener noreferrer" aria-label={compact ? 'Enquire on WhatsApp' : undefined}>
      <Logo />{!compact && 'WhatsApp us'}
    </a>
  );
}

// Round WhatsApp button fixed to the bottom corner of every page.
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={href('your hotel linen')} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp">
      <Logo />
    </a>
  );
}
