// Visa and Mastercard marks drawn in CSS; they scale with the font size of the parent.
export default function CardLogos({ large = false }) {
  return (
    <span className={large ? 'cards lg' : 'cards'}>
      <span className="visa" role="img" aria-label="Visa">VISA</span>
      <span className="mastercard" role="img" aria-label="Mastercard"><i /><i /></span>
    </span>
  );
}
