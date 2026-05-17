// src/app/copyright/page.tsx

import { mediaItems } from "@/shared/data/media-items";
import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function CopyrightPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Urheberrecht"
        title="Urheberrecht und Mediennachweise"
        description="Diese Seite dokumentiert die verwendeten Medienarten, Quellen, Lizenzen und Urheberrechtshinweise des GameBoxEdu Webshops."
      />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-900">
            <tr>
              <th className="px-4 py-3 font-bold">Medium</th>
              <th className="px-4 py-3 font-bold">Medienart</th>
              <th className="px-4 py-3 font-bold">Quelle</th>
              <th className="px-4 py-3 font-bold">Autor</th>
              <th className="px-4 py-3 font-bold">Lizenz</th>
              <th className="px-4 py-3 font-bold">Verwendung</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {mediaItems.map((item) => (
              <tr key={item.medium} className="align-top">
                <td className="px-4 py-4 font-medium text-slate-900">
                  {item.medium}
                </td>
                <td className="px-4 py-4 text-slate-700">{item.mediaType}</td>
                <td className="px-4 py-4 text-slate-700">{item.source}</td>
                <td className="px-4 py-4 text-slate-700">{item.author}</td>
                <td className="px-4 py-4 text-slate-700">{item.license}</td>
                <td className="px-4 py-4 text-slate-700">{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-6">
        <InfoCard title="Sicherstellung der Verwertungsrechte">
          <p className="leading-7 text-slate-700">
            Für diesen Webshop werden überwiegend selbst erstellte Texte,
            Layouts, Grafiken, Markenelemente und Interface-Komponenten
            verwendet. Dadurch verbleiben die Verwertungsrechte grundsätzlich
            beim Unternehmen GameBoxEdu GmbH. Externe Standarddateien
            aus dem Next.js Starter Template werden nicht als zentrale
            Medieninhalte des Webshops eingesetzt.
          </p>
        </InfoCard>

        <InfoCard title="Umgang mit externen Medien">
          <p className="leading-7 text-slate-700">
            Bei einer realen Veröffentlichung würden alle externen Bilder,
            Grafiken, Videos, Animationen, Musik, Soundeffekte, Schriftarten und
            Texte vor der Nutzung auf Urheberrecht, Lizenzbedingungen und
            kommerzielle Verwendbarkeit geprüft. Medien ohne klare Lizenz oder
            ohne ausreichende Nutzungsrechte würden nicht verwendet.
          </p>
        </InfoCard>

        <InfoCard title="Nicht verwendete Medien">
          <p className="leading-7 text-slate-700">
            Im aktuellen Prototyp werden keine echten Musikstücke, keine
            Soundeffekte und keine externen Videos produktiv eingebunden. Diese
            Medienarten werden dennoch dokumentiert, weil sie für einen
            realistischen Webshop relevant sein könnten.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}