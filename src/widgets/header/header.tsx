// src/widgets/header/header.tsx

"use client";

import { headerLinks, mobileLegalLinks } from "@/shared/data/navigation-links";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="rounded-lg text-xl font-bold tracking-tight text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          GameBoxEdu
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-4 text-sm font-medium text-slate-700">
            {headerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-2 py-1 hover:bg-slate-100 hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/cart"
          className="hidden rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 lg:inline-flex"
        >
          Warenkorb
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 lg:hidden"
          aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile Hauptnavigation"
          className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-2 text-base font-medium text-slate-700">
            {headerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="block rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                Warenkorb
              </Link>
            </li>

            {mobileLegalLinks.map((link, index) => (
              <li
                key={link.href}
                className={
                  index === 0 ? "border-t border-slate-200 pt-3" : undefined
                }
              >
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}