'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '../site';

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main">
      <ul className="main-nav">
        {mainNav.map((l) => (
          <li key={l.href}>
            <Link href={l.href} aria-current={l.href === pathname ? 'page' : undefined}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
