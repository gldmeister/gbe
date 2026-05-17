// src/widgets/footer/footer.tsx

import { legalLinks, productLinks } from "@/shared/data/navigation-links";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-4 md:gap-10">
        <div className="md:col-span-2">
          <h2 className="mb-3 text-xl font-bold tracking-tight md:text-lg">
            GameBoxEdu
          </h2>

          <p className="max-w-md text-sm leading-6 text-slate-300">
            Eine webbasierte Lernplattform für interaktive Flashcards, Quizze
            und Matching Games. Webshop-Projekt im Rahmen einer Übung.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
          <nav aria-label="Webshop Links">
            <h2 className="mb-3 text-base font-bold md:text-lg">Webshop</h2>

            <ul className="space-y-2 text-sm text-slate-300">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-md hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliche Links">
            <h2 className="mb-3 text-base font-bold md:text-lg">
              Rechtliches
            </h2>

            <ul className="space-y-2 text-sm text-slate-300">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-md hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 text-xs leading-5 text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 GameBoxEdu GmbH. Projekt im Rahmen einer Übung.</p>
          <p>Fritz-Hahn-Gasse 1/49, 1100 Wien · e12134416@student.tuwien.ac.at</p>
        </div>
      </div>
    </footer>
  );
}