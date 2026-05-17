// src/app/license/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function LicensePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Lizenz"
        title="Lizenzbedingungen für GameBoxEdu"
        description="Diese Seite beschreibt, welche Nutzungsrechte Kundinnen und Kunden durch den Kauf oder das Abonnement von GameBoxEdu erwerben und welche Rechte beim Unternehmen verbleiben."
      />

      <div className="space-y-6">
        <InfoCard title="1. Erworbene Nutzungsrechte">
          <p className="leading-7 text-slate-700">
            Kundinnen und Kunden erhalten ein einfaches, nicht ausschließliches
            und nicht übertragbares Nutzungsrecht an GameBoxEdu. Dieses Recht
            erlaubt die Nutzung der Plattform im Rahmen des gewählten
            Abonnements.
          </p>
        </InfoCard>

        <InfoCard title="2. Erlaubte Nutzung">
          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>Erstellung und Bearbeitung digitaler Lernmaterialien</li>
            <li>Nutzung von Flashcards, Quizzen und Matching Games</li>
            <li>Teilen von Übungen mit Lernenden im Unterrichtskontext</li>
            <li>Nutzung der gebuchten Funktionen während der Vertragslaufzeit</li>
          </ul>
        </InfoCard>

        <InfoCard title="3. Rechte, die beim Unternehmen verbleiben">
          <p className="mb-3 leading-7 text-slate-700">
            Alle Rechte an der Software verbleiben bei der GameBoxEdu GmbH.
            Dazu gehören insbesondere:
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>Quellcode und technische Architektur</li>
            <li>Design, Benutzeroberfläche und Layout</li>
            <li>Logo, Marken, Produktname und Corporate Design</li>
            <li>Datenbankstruktur und Plattformfunktionen</li>
            <li>Dokumentation, Texte und eigene Medieninhalte</li>
          </ul>
        </InfoCard>

        <InfoCard title="4. Nicht erlaubte Nutzung">
          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>Weiterverkauf oder Vermietung des Zugangs</li>
            <li>Kopieren, Dekompilieren oder Reverse Engineering der Software</li>
            <li>Entfernung von Urheberrechts- oder Markenhinweisen</li>
            <li>Nutzung der Plattform für rechtswidrige Inhalte</li>
            <li>Umgehung technischer Schutzmaßnahmen oder Zugriffsbeschränkungen</li>
          </ul>
        </InfoCard>

        <InfoCard title="5. Haftungsbeschränkung">
          <p className="leading-7 text-slate-700">
            Die GameBoxEdu GmbH haftet im Rahmen der gesetzlichen Vorschriften.
            Eine Haftung für indirekte Schäden, Datenverluste,
            Nutzungsausfälle oder entgangene Gewinne wird, soweit gesetzlich
            zulässig, ausgeschlossen. Dieses Lizenzmodell wurde im Rahmen einer
            Lehrveranstaltungsübung erstellt.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}