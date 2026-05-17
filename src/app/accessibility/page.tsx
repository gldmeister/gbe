// src/app/accessibility/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function AccessibilityPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Barrierefreiheit"
        title="Barrierefreiheitserklärung"
        description="Diese Website wurde mit dem Ziel entwickelt, die Anforderungen der WCAG 2.2 auf Konformitätsstufe AA zu berücksichtigen. Die Inhalte, Navigation und Formulare sollen möglichst zugänglich und verständlich gestaltet sein."
      />

      <div className="space-y-6">
        <InfoCard title="1. Tastaturbedienbarkeit">
          <p className="leading-7 text-slate-700">
            Alle wichtigen interaktiven Elemente wie Navigation, Links, Buttons
            und Formularfelder sind per Tastatur erreichbar. Sichtbare
            Fokuszustände unterstützen die Orientierung bei der Bedienung ohne
            Maus.
          </p>
        </InfoCard>

        <InfoCard title="2. Kontraste und Lesbarkeit">
          <p className="leading-7 text-slate-700">
            Die Website verwendet gut lesbare Schriftgrößen, klare Abstände und
            kontrastreiche Farbkombinationen. Texte und Bedienelemente sind so
            gestaltet, dass sie auch bei Vergrößerung gut nutzbar bleiben.
          </p>
        </InfoCard>

        <InfoCard title="3. Semantische Struktur">
          <p className="leading-7 text-slate-700">
            Die Seiten verwenden semantische HTML-Strukturen wie Header,
            Navigation, Main-Bereich, Sections, Überschriften und Labels.
            Dadurch können Screenreader und andere assistive Technologien die
            Inhalte besser erfassen.
          </p>
        </InfoCard>

        <InfoCard title="4. Formulare">
          <p className="leading-7 text-slate-700">
            Formularfelder sind mit sichtbaren Labels verbunden. Dadurch ist
            klar erkennbar, welche Eingaben erwartet werden. Das
            Kontaktformular ist in dieser Übung gemockt und speichert keine
            echten Daten.
          </p>
        </InfoCard>

        <InfoCard title="5. Aktueller Stand">
          <p className="leading-7 text-slate-700">
            Die Website wurde manuell auf grundlegende Barrierefreiheitsaspekte
            geprüft. Zusätzlich können Tools wie WAVE oder AXE DevTools zur
            weiteren Prüfung eingesetzt werden. Etwaige gefundene Probleme
            würden im Rahmen der Weiterentwicklung behoben.
          </p>
        </InfoCard>

        <InfoCard title="6. Prüfung mit WAVE">
          <p className="leading-7 text-slate-700">
            Die Website wurde mit dem WAVE Evaluation Tool geprüft. Die
            automatische Prüfung ergab auf den getesteten Seiten 0 Errors und 0
            Contrast Errors. Der AIM Score betrug jeweils 10 von 10 Punkten.
            Zusätzlich bleibt eine manuelle Prüfung notwendig, um eine optimale
            Barrierefreiheit sicherzustellen.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}