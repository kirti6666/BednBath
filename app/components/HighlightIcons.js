// Full-colour icons for the selling points under the banner (same flat style as PayIcons).
const Svg = ({ children }) => <svg className="hl-icon" viewBox="0 0 64 64" aria-hidden="true">{children}</svg>;

// Five-point star as a polygon around (cx, cy).
const star = (cx, cy, R, r) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2, d = i % 2 ? r : R;
    return `${(cx + d * Math.cos(a)).toFixed(1)},${(cy + d * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

const Medal = () => (
  <Svg>
    <path d="M18 3h10l8 22H26z" fill="#2a4fa3" />
    <path d="M46 3H36l-8 22h10z" fill="#c8102e" />
    <circle cx="32" cy="41" r="18" fill="#f5b82e" stroke="#c98a12" strokeWidth="2" />
    <circle cx="32" cy="41" r="12.5" fill="#ffd25e" />
    <polygon points={star(32, 41, 8, 3.4)} fill="#c98a12" />
  </Svg>
);

const Hotel = () => (
  <Svg>
    {[18, 32, 46].map((x) => <polygon key={x} points={star(x, 9, 6, 2.5)} fill="#f5b82e" />)}
    <rect x="12" y="18" width="40" height="42" rx="2" fill="#2a4fa3" />
    <rect x="12" y="18" width="20" height="42" rx="2" fill="#3c64bd" />
    {[24, 33, 42].flatMap((y) => [17, 29, 41].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="5" rx="1" fill="#dfe7ff" />))}
    <rect x="27" y="49" width="10" height="11" rx="1.5" fill="#f5b82e" />
  </Svg>
);

const Ship = () => (
  <Svg>
    <rect x="17" y="17" width="13" height="10" fill="#3c64bd" />
    <rect x="31" y="17" width="13" height="10" fill="#e4572e" />
    <rect x="10" y="28" width="13" height="10" fill="#e4572e" />
    <rect x="24" y="28" width="13" height="10" fill="#f5b82e" />
    <rect x="38" y="28" width="13" height="10" fill="#2f9e5b" />
    <rect x="47" y="14" width="6" height="14" fill="#8d9bb3" />
    <path d="M4 39h56l-7 13H11z" fill="#213f84" />
    <path d="M4 39h56l-1.5 3H5.5z" fill="#c8102e" />
    <path d="M3 57c4 0 4-2.5 8-2.5s4 2.5 8 2.5 4-2.5 8-2.5 4 2.5 8 2.5 4-2.5 8-2.5 4 2.5 8 2.5 4-2.5 8-2.5" fill="none" stroke="#5aa0e0" strokeWidth="2.4" strokeLinecap="round" />
  </Svg>
);

const Spool = () => (
  <Svg>
    <rect x="16" y="14" width="26" height="36" fill="#2a4fa3" />
    {[19, 25, 31, 37, 43].map((y) => <path key={y} d={`M16 ${y}h26`} stroke="#5b80d0" strokeWidth="1.6" />)}
    <rect x="11" y="7" width="36" height="8" rx="2" fill="#c9874a" />
    <rect x="11" y="49" width="36" height="8" rx="2" fill="#a96c34" />
    <path d="M42 30c8 2 10 10 6 16" fill="none" stroke="#2a4fa3" strokeWidth="1.6" />
    <path d="M58 6 46 50" stroke="#8d9bb3" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="56.6" cy="11" rx="1.1" ry="2.6" fill="#fff" transform="rotate(15 56.6 11)" />
  </Svg>
);

export const highlightIcons = { 'Since 2010': Medal, '4★ & 5★ hotels': Hotel, 'Export ready': Ship, 'Made to order': Spool };
