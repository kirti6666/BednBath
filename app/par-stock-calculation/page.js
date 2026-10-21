import Link from 'next/link';
import ParStock from '../components/ParStock';

export const metadata = { title: 'Par Stock Calculation' };

export default function ParStockPage() {
  return (
    <article className="prose wide">
      <h1 className="title">Par Stock Calculation</h1>
      <p>
        <strong>Par stock</strong> is the number of complete linen sets a hotel keeps for every room. Hotel linen needs
        more than one set per room because at any time some is on the bed, some is in the laundry and some waits on the
        shelf. Enough par stock keeps rooms turning over on time and spreads the washing load, so linen lasts longer.
      </p>
      <ul>
        <li><strong>3 par</strong>: one set in the room, one in the laundry, one in the store. The usual minimum.</li>
        <li><strong>4 par</strong>: adds one set as a buffer for stains, damage and laundry delays.</li>
        <li><strong>5 par</strong>: for high occupancy, an off-site laundry, or time between orders.</li>
      </ul>
      <p className="formula">Total to stock = items in use per room × number of rooms × par level</p>

      <h2>Calculate your par stock</h2>
      <p>Change the number of rooms, the par level and the items per room to match your hotel.</p>
      <ParStock />
      <p>
        Ready to order? Check the <Link href="/price-list">price list</Link> and <Link href="/enquiry-form">send an enquiry</Link> with
        your quantities, or see the <Link href="/to-know-bed-linen-size">size guide</Link>.
      </p>
    </article>
  );
}
