// src/app/product/page.tsx

import { ButtonLink } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function ProductPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Produkt"
        title="GameBoxEdu Lernplattform"
        description="GameBoxEdu ist eine webbasierte Lernplattform für interaktive Unterrichtsmaterialien. Lehrkräfte können digitale Flashcards, Quizze und Matching Games direkt im Browser erstellen, bearbeiten und mit Lernenden teilen."
      />

      <ul className="grid gap-4 text-slate-700 md:grid-cols-3">
        <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold text-slate-900">Flashcards</h2>
          <p>
            Digitale Lernkarten mit Vorderseite und Rückseite erstellen,
            bearbeiten und im Spielmodus umdrehen.
          </p>
        </li>

        <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold text-slate-900">Quizze</h2>
          <p>
            Interaktive Fragen erstellen, Antworten anzeigen und den Lernstand
            im Quizmodus überprüfen.
          </p>
        </li>

        <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 font-bold text-slate-900">Matching Games</h2>
          <p>
            Begriffe und Bedeutungen verwalten und in einem Zuordnungsspiel
            trainieren.
          </p>
        </li>
      </ul>

      <section className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          Interaktive Produktdemo
        </h2>

        <p className="mt-3 leading-7 text-slate-800">
          Nach dem simulierten Checkout können Kundinnen und Kunden eine
          Demo-Oberfläche öffnen. Dort lassen sich Flashcards, Quizfragen und
          Matching-Paare erstellen, ändern und löschen. Zusätzlich gibt es
          eigene Spielmodi: Flashcards können animiert umgedreht werden, Quizze
          zeigen Antworten und Fortschritt an, und Matching Games prüfen die
          richtige Zuordnung.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href="/demo">Demo öffnen</ButtonLink>

          <ButtonLink href="/pricing" variant="secondary">
            Preise ansehen
          </ButtonLink>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          Speicherung der Demo-Inhalte
        </h2>

        <p className="mt-3 leading-7 text-slate-800">
          Die Demo verwendet JSON-Dateien als Startdaten. Änderungen werden ohne
          Backend und ohne Datenbank lokal im Browser gespeichert. Dadurch kann
          die Plattform realistisch simuliert werden, ohne echte Nutzerdaten an
          einen Server zu übertragen.
        </p>
      </section>
    </PageContainer>
  );
}