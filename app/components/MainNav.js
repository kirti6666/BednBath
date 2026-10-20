'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '../site';

export default function MainNav() {
  const pathname = usePathname();
  // Like the reference, the Products tab is highlighted on the home page.
  const active = pathname === '/' ? '/products' : pathname;
  return (
    <nav aria-label="Main">
      <ul className="main-nav">
        {mainNav.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={l.href === active ? 'active' : undefined} aria-current={l.href === pathname ? 'page' : undefined}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
