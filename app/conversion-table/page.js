import { inToCm, gsmToOz } from '../units';

export const metadata = { title: 'Conversion Table' };

const units = [
  ['1 inch', '2.54 cm'], ['1 cm', '0.394 inch'], ['1 foot', '30.48 cm'], ['1 metre', '39.37 inches'],
  ['1 GSM (g/m²)', '0.0295 oz/yd²'], ['1 oz/yd²', '33.9 GSM'], ['1 kg', '2.205 lb'], ['1 lb', '0.454 kg'],
];
// GSM values used in our product specifications.
const gsm = [['120 GSM', 'Duvet / comforter outer fabric'], ['250 GSM', 'Duvet / comforter microfibre filling'], ['550 GSM', 'Bath towel']];
const inches = [20, 26, 30, 36, 40, 54, 66, 72, 80, 90, 96, 102, 108, 122, 132];

export default function ConversionTable() {
  return (
    <section>
      <h1 className="title">Conversion Table</h1>
      <p className="lead">Quick conversions for the measurements used in hotel linen specifications and our price list.</p>
      <div className="tables-2">
        <table className="data">
          <caption>Units</caption>
          <tbody>{units.map(([a, b]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td></tr>)}</tbody>
        </table>
        <table className="data">
          <caption>Inches to centimetres<span>Sizes that appear in our price list</span></caption>
          <thead><tr><th scope="col" className="num">Inches</th><th scope="col" className="num">cm</th></tr></thead>
          <tbody>{inches.map((n) => <tr key={n}><td className="num">{n}</td><td className="num">{inToCm(String(n)).replace(' cm', '')}</td></tr>)}</tbody>
        </table>
      </div>
      <table className="data">
        <caption>Fabric weight (GSM)<span>GSM is grams per square metre: higher GSM means a heavier, denser fabric.</span></caption>
        <thead><tr><th scope="col">GSM</th><th scope="col" className="num">oz/yd²</th><th scope="col">Where we use it</th></tr></thead>
        <tbody>{gsm.map(([g, use]) => <tr key={g}><th scope="row">{g}</th><td className="num">{gsmToOz(parseInt(g, 10))}</td><td>{use}</td></tr>)}</tbody>
      </table>
      <table className="data">
        <caption>Thread count (TC)</caption>
        <tbody>
          <tr><th scope="row">What it means</th><td>The number of threads woven into one square inch of fabric, counting both directions.</td></tr>
          <tr><th scope="row">300 TC</th><td>Crisp, durable everyday hotel quality.</td></tr>
          <tr><th scope="row">400 TC</th><td>Smoother, softer premium hotel quality.</td></tr>
        </tbody>
      </table>
    </section>
  );
}
