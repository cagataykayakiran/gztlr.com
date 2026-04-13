'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Bookmark,
  Settings,
  Menu,
  X,
  ChevronDown,
  LogIn,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Teknoloji', href: '/?category=tech' },
  { label: 'Ekonomi', href: '/?category=economy' },
  { label: 'Dunya', href: '/?category=world' },
  { label: 'Bilim', href: '/?category=science' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-xl">
      {/* Top bar — brand accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-40" />

      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl tracking-tight text-text-primary group-hover:text-brand transition-colors">
                GZTLR
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-text-tertiary border border-border px-1.5 py-0.5 rounded">
                beta
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md transition-colors">
                Daha Fazla
                <ChevronDown className="w-3 h-3" />
              </button>
            </nav>
          </div>

          {/* Right: Search + Actions */}
          <div className="flex items-center gap-2">
            {/* Search bar */}
            <div className={`${searchOpen ? 'flex' : 'hidden'} sm:flex items-center absolute sm:relative left-0 right-0 top-full sm:top-auto px-4 sm:px-0 py-2 sm:py-0 bg-bg-primary sm:bg-transparent border-b sm:border-0 border-border`}>
              <div className="relative w-full sm:w-64 lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Haberlerde ara..."
                  className="w-full h-8 pl-9 pr-12 text-[13px] bg-bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-0 focus:outline-none"
                />
                <kbd className="hidden lg:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 h-5 text-[10px] font-mono text-text-muted bg-bg-primary border border-border rounded">
                  /
                </kbd>
              </div>
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1 border-l border-border pl-2 ml-1">
              <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md relative" title="Bildirimler">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand rounded-full" />
              </button>
              <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md" title="Kaydedilenler">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md" title="Ayarlar">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 h-8 px-3 text-[13px] font-medium text-bg-primary bg-brand hover:bg-brand-hover rounded-lg transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Giris Yap
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-bg-primary">
          <nav className="mx-auto max-w-[1400px] px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border space-y-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-brand hover:bg-brand-subtle rounded-md"
              >
                <LogIn className="w-4 h-4" />
                Giris Yap
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
