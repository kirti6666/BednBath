// Single-colour line icons for the payment page, drawn on a 24px grid.
const Svg = ({ children }) => <svg className="pay-icon" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;

export const BankIcon = () => (
  <Svg>
    <path d="M3 9.5 12 4.5l9 5H3z" />
    <path d="M5.5 10.5v6.5M10 10.5v6.5M14 10.5v6.5M18.5 10.5v6.5M4 17.5h16M3 20h18" />
  </Svg>
);

export const CashIcon = () => (
  <Svg>
    <rect x="2.5" y="6.5" width="19" height="11" rx="1.5" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 9.5v5M18 9.5v5" />
  </Svg>
);

export const CardIcon = () => (
  <Svg>
    <rect x="2.5" y="5.5" width="19" height="13" rx="1.8" />
    <path d="M2.5 9.5h19M6 14.5h4.5" />
  </Svg>
);

export const ShieldIcon = () => (
  <Svg>
    <path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
    <path d="m9 12 2.2 2.2L15.2 10" />
  </Svg>
);
