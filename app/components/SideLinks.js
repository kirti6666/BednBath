'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Line icons (24px grid) for the sidebar links, keyed by link address.
const icons = {
  '/price-list': 'M4 6h16M4 12h16M4 18h10',
  '/shopping-cart': 'M3 4h2l2.2 10.5h10.3L20 8H6.4M10 19.5a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0M18 19.5a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0',
  '/payment-options': 'M3 6h18v12H3zM3 10h18M7 15h4',
  '/size-guide': 'M3 15 15 3l6 6L9 21zM7 11l2 2M10 8l2 2M13 5l2 2',
  '/par-stock-calculation': 'M12 3 21 8l-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
  '/conversion-table': 'M4 8h15l-3-3M20 16H5l3 3',
  '/consignment-tracking': 'M2 6h11v10H2zM13 9h5l3 3v4h-8M7.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M18.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0',
  '/enquiry-form': 'M3 6h18v12H3zM3 7l9 6 9-6',
  '/feedback': 'M4 5h16v11H9l-5 4z',
  '/terms-conditions': 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7',
};

// One sidebar group's links; the current page's link is highlighted.
export default function SideLinks({ links }) {
  const pathname = usePathname();
  return (
    <ul>
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} aria-current={pathname === l.href ? 'page' : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icons[l.href]} /></svg>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
