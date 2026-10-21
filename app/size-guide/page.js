import Link from 'next/link';
import sections from '../price-list.json';
import { inToCm, cmToIn } from '../units';

export const metadata = { title: 'Bed Linen Size Guide' };

// Sizes come from the price list, so the guide always matches what is sold.
const find = (start, end) => sections.find((s) => s.title.startsWith(start) && s.title.endsWith(end));
const sheets = find('Bed Sheets', 'plain percale').rows;
const bedSizes = [...new Set(sheets.filter((r) => !r[0].startsWith('Pillowcase')).map((r) => r[1]))];
const sheetRows = bedSizes.map((size) => {
  const flat = sheets.find((r) => r[0].startsWith('Flat') && r[1] === size);
  const fitted = sheets.find((r) => r[0].startsWith('Fitted') && r[1] === size);
  return { size, flat: flat?.[2], fitted: fitted?.[2], pillow: (flat ?? fitted)[3] };
});
const pillowcases = sheets.filter((r) => r[0].startsWith('Pillowcase'));
const duvets = find('Duvet Covers', 'plain percale').rows;
const towels = find('Bath Linen', '').rows;

const Size = ({ v }) => (v ? <>{v.replace(/"/g, '')} in<br /><small className="muted">{inToCm(v)}</small></> : '–');

export default function SizeGuide() {
  return (
    <section>
      <h1 className="title">Bed Linen Size Guide</h1>
      <p className="lead">
        Finished sizes of our bed and bath linen, in inches with centimetres below. Fitted sheet sizes are length × width ×
        pocket depth. Need another size? We make custom sizes: <Link href="/enquiry-form">send an enquiry</Link>.
      </p>

      <table className="data">
        <caption>Bed sheets</caption>
        <thead><tr><th scope="col">Bed size</th><th scope="col">Flat sheet</th><th scope="col">Fitted sheet</th><th scope="col">Pillowcase in set</th></tr></thead>
        <tbody>
          {sheetRows.map((r) => (
            <tr key={r.size}><th scope="row">{r.size}</th><td><Size v={r.flat} /></td><td><Size v={r.fitted} /></td><td><Size v={r.pillow} /></td></tr>
          ))}
        </tbody>
      </table>

      <table className="data narrow">
        <caption>Pillowcases</caption>
        <thead><tr><th scope="col">Pillowcase</th><th scope="col">Size</th></tr></thead>
        <tbody>{pillowcases.map((r) => <tr key={r[1]}><th scope="row">{r[1]}</th><td><Size v={r[2]} /></td></tr>)}</tbody>
      </table>

      <table className="data">
        <caption>Duvet covers and comforters<span>The same sizes are used for duvets / comforters.</span></caption>
        <thead><tr><th scope="col">Fits bed</th><th scope="col">Size</th><th scope="col">Pillowcases in set</th></tr></thead>
        <tbody>
          {duvets.map((r) => <tr key={r[0]}><th scope="row">{r[0].replace(/ \(.*/, '')}</th><td><Size v={r[1]} /></td><td><Size v={r[2]} /></td></tr>)}
        </tbody>
      </table>

      <table className="data narrow">
        <caption>Towels</caption>
        <thead><tr><th scope="col">Towel</th><th scope="col">Size</th></tr></thead>
        <tbody>
          {towels.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[2].trim()} cm<br /><small className="muted">{cmToIn(r[2])}</small></td></tr>)}
        </tbody>
      </table>
    </section>
  );
}
