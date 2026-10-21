// Full-colour payment icons. Flat shading (no gradients) so several copies on a page never clash over SVG ids.
const Svg = ({ children }) => <svg className="pay-icon" viewBox="0 0 64 64" aria-hidden="true">{children}</svg>;

export const BankIcon = () => (
  <Svg>
    <path d="M32 5 59 20H5z" fill="#2a4fa3" />
    <path d="M32 5v15H5z" fill="#3c64bd" />
    <circle cx="32" cy="14.5" r="4" fill="#f5b82e" stroke="#c98a12" strokeWidth="1.2" />
    <circle cx="32" cy="14.5" r="1.6" fill="#ffe08a" />
    <rect x="7" y="20" width="50" height="5" fill="#c9d3e3" />
    {[11, 22.5, 34, 45.5].map((x) => (
      <g key={x}>
        <rect x={x - 1} y="25" width="9.5" height="3" fill="#b8c4d8" />
        <rect x={x} y="28" width="7.5" height="19" fill="#f6f8fb" />
        <rect x={x + 5} y="28" width="2.5" height="19" fill="#d5dceb" />
      </g>
    ))}
    <rect x="7" y="47" width="50" height="4" fill="#8d9bb3" />
    <rect x="4" y="51" width="56" height="6" rx="1.5" fill="#213f84" />
  </Svg>
);

export const CashIcon = () => (
  <Svg>
    <rect x="4" y="10" width="44" height="27" rx="3" fill="#1f7a45" transform="rotate(-8 26 23)" />
    <rect x="7" y="15" width="44" height="27" rx="3" fill="#2f9e5b" />
    <rect x="11" y="19" width="36" height="19" rx="2" fill="none" stroke="#86d7a6" strokeWidth="1.4" />
    <circle cx="29" cy="28.5" r="6.5" fill="#e6f6ec" />
    <text x="29" y="32.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#1f7a45">$</text>
    <circle cx="15.5" cy="28.5" r="1.6" fill="#86d7a6" />
    <circle cx="42.5" cy="28.5" r="1.6" fill="#86d7a6" />
    {/* stack of coins */}
    <ellipse cx="48" cy="56" rx="12" ry="4.5" fill="#d89412" />
    <rect x="36" y="42" width="24" height="14" fill="#e8a420" />
    <path d="M36 47h24M36 51.5h24" stroke="#c98a12" strokeWidth="1.2" />
    <ellipse cx="48" cy="42" rx="12" ry="4.5" fill="#ffd25e" stroke="#c98a12" strokeWidth="1.2" />
    <ellipse cx="48" cy="42" rx="7" ry="2.4" fill="none" stroke="#e8a420" strokeWidth="1.2" />
  </Svg>
);

export const CardIcon = () => (
  <Svg>
    <rect x="16" y="9" width="44" height="28" rx="4" fill="#f5b82e" transform="rotate(10 38 23)" />
    <rect x="4" y="20" width="46" height="30" rx="4" fill="#2a4fa3" />
    <path d="M4 24a4 4 0 0 1 4-4h22L14 50H8a4 4 0 0 1-4-4z" fill="#3c64bd" />
    <rect x="10" y="27" width="10" height="8" rx="1.6" fill="#f5c451" stroke="#c98a12" strokeWidth=".8" />
    <path d="M10 31h10M15 27v8" stroke="#c98a12" strokeWidth=".8" />
    {[10, 19, 28, 37].map((x) => <rect key={x} x={x} y="40" width="7" height="2.4" rx="1.2" fill="#dfe7ff" />)}
    <circle cx="39" cy="29" r="4" fill="#eb001b" />
    <circle cx="44" cy="29" r="4" fill="#f79e1b" opacity=".9" />
  </Svg>
);

export const ShieldIcon = () => (
  <Svg>
    <path d="M32 5 54 13v16c0 13-9.3 23.5-22 29C19.3 52.5 10 42 10 29V13z" fill="#2f9e5b" />
    <path d="M32 5v53C19.3 52.5 10 42 10 29V13z" fill="#3cb371" />
    <path d="m22 31 7 7 14-15" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
