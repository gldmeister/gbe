// src/app/impressum/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function ImpressumPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Impressum"
        title="Impressum"
        description="Diese Seite enthält die Anbieterkennzeichnung für den GameBoxEdu Webshop im Rahmen einer universitären Übung."
      />

      <div className="space-y-6">
        <InfoCard title="Anbieter">
          <p className="leading-7 text-slate-700">
            GameBoxEdu GmbH
            <br />
            Fritz-Hahn-Gasse 1/49
            <br />
            1100 Wien
            <br />
            Österreich
          </p>
        </InfoCard>

        <InfoCard title="Kontakt">
          <p className="leading-7 text-slate-700">
            E-Mail: e12134416@student.tuwien.ac.at
            <br />
            Telefon: +43 677 64420230
          </p>
        </InfoCard>

        <InfoCard title="Unternehmensdaten">
          <p className="leading-7 text-slate-700">
            Unternehmensname: GameBoxEdu GmbH
            <br />
            Rechtsform: GmbH
            <br />
            Unternehmensgegenstand: Entwicklung und Vertrieb von
            Bildungssoftware
            <br />
            Geschäftsführer: Zhangir Lekerov
            <br />
            Firmenbuchnummer: FN 483921p
            <br />
            Firmenbuchgericht: Handelsgericht Wien
            <br />
            UID-Nummer: ATU91234567
          </p>
        </InfoCard>

        <InfoCard title="Medieninhaber und Offenlegung">
          <p className="leading-7 text-slate-700">
            Medieninhaber dieser Website ist die GameBoxEdu GmbH mit Sitz in
            Wien. Die Website dient der Präsentation und dem Vertrieb der
            Software GameBoxEdu. Es werden Informationen zu Produkt, Preisen,
            Lizenz, Datenschutz und Kontaktmöglichkeiten bereitgestellt.
          </p>
        </InfoCard>

        <InfoCard title="Hinweis zum Übungsprojekt">
          <p className="leading-7 text-slate-700">
            Dieses Impressum wurde im Rahmen einer Lehrveranstaltungsübung
            erstellt.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}