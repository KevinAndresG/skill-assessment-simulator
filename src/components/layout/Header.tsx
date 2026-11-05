'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/navigation';

export function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return (
    <header>
      <div className="bar">
        <Link href="/" className="brand" style={{ color: 'inherit', textDecoration: 'none' }}>
          Skill Assessment <b>Simulator</b>
        </Link>
        <nav className="nav" aria-label="Secciones">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
