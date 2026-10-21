import Link from 'next/link';

// Folded duvets and towels drawn in the palette; swap for a product photo when one is available.
const duvets = [[30, 140, 250, 44], [42, 98, 232, 44], [56, 58, 210, 42]];
const towels = [[300, 152, 172, 32], [308, 122, 160, 32], [300, 92, 172, 32], [308, 62, 160, 32]];

export default function Banner() {
  return (
    <section className="banner">
      <div>
        <p className="eyebrow">For hotels &amp; resorts</p>
        <h1>Linen that makes every stay feel five-star.</h1>
        <p>Bed, bath and banquet linen, made since 2010 and exported worldwide.</p>
        <div className="cta">
          <Link href="/enquiry-form" className="btn">Request a bulk quote</Link>
          <Link href="/products" className="link">View collections</Link>
        </div>
      </div>
      <svg viewBox="0 0 500 200" aria-hidden="true">
        <defs>
          <linearGradient id="cloth" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#dfe6f1" />
          </linearGradient>
        </defs>
        <ellipse cx="250" cy="188" rx="240" ry="9" fill="#141e33" opacity=".08" />
        {duvets.map(([x, y, w, h]) => (
          <g key={y}>
            <rect x={x} y={y} width={w} height={h} rx="20" fill="url(#cloth)" stroke="#a9b2bf" />
            <path d={`M${x + 22} ${y + h / 2}H${x + w - 22}`} stroke="#a9b2bf" strokeDasharray="4 6" />
          </g>
        ))}
        {towels.map(([x, y, w, h]) => (
          <g key={y}>
            <rect x={x} y={y} width={w} height={h} rx="12" fill="url(#cloth)" stroke="#a9b2bf" />
            <path d={`M${x + w - 30} ${y + 6}v${h - 12}M${x + w - 24} ${y + 6}v${h - 12}`} stroke="#2a4fa3" strokeWidth="2" />
          </g>
        ))}
        <rect x="352" y="22" width="92" height="38" rx="19" fill="url(#cloth)" stroke="#a9b2bf" />
        <ellipse cx="444" cy="41" rx="11" ry="19" fill="#fff" stroke="#a9b2bf" />
        <ellipse cx="444" cy="41" rx="5" ry="9" fill="none" stroke="#a9b2bf" />
      </svg>
    </section>
  );
}
