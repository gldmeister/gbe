// src/app/about/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Über uns"
        title="Über GameBoxEdu"
        description="GameBoxEdu ist ein Start-Up aus Wien, das digitale Lernsoftware für Schulen, Lehrkräfte und Bildungseinrichtungen entwickelt. Ziel ist es, Unterricht interaktiver, zugänglicher und motivierender zu gestalten."
      />

      <div className="space-y-6">
        <InfoCard title="1. Softwareprodukt">
          <p className="leading-7 text-slate-700">
            GameBoxEdu ist eine webbasierte Lernplattform für interaktive
            Unterrichtsmaterialien. Lehrkräfte können digitale Flashcards,
            Quizze und Matching Games direkt im Browser erstellen, bearbeiten
            und mit Lernenden teilen.
          </p>
        </InfoCard>

        <InfoCard title="2. Funktionen">
          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>Erstellung von digitalen Flashcards</li>
            <li>Erstellung von Quizzen</li>
            <li>Erstellung von Zuordnungsübungen und Matching Games</li>
            <li>Einbindung von Texten und Bildern in Lernmaterialien</li>
            <li>Bearbeitung und Verwaltung eigener Lernsets</li>
            <li>Teilen von Übungen mit Schülerinnen und Schülern</li>
            <li>Nutzung direkt im Webbrowser ohne Installation</li>
          </ul>
        </InfoCard>

        <InfoCard title="3. Zielgruppe">
          <p className="leading-7 text-slate-700">
            Die Zielgruppe von GameBoxEdu sind Lehrerinnen und Lehrer, Schulen,
            Nachhilfeinstitute, Sprachkurse, Bildungseinrichtungen, private
            Tutorinnen und Tutoren sowie Lernende, die selbstständig üben
            möchten.
          </p>
        </InfoCard>

        <InfoCard title="4. Unternehmen">
          <p className="leading-7 text-slate-700">
            Unternehmensname: GameBoxEdu GmbH
            <br />
            Rechtsform: GmbH
            <br />
            Standort: Wien, Österreich
            <br />
            Adresse: Fritz-Hahn-Gasse 1/49, 1100 Wien, Österreich
            <br />
            Geschäftsführer: Zhangir Lekerov
            <br />
            Anzahl der Mitarbeiterinnen und Mitarbeiter: 5
            <br />
            Unternehmensbereich: Educational Technology, Softwareentwicklung und
            E-Learning
          </p>
        </InfoCard>

        <InfoCard title="5. Geschäftsmodell">
          <p className="mb-3 leading-7 text-slate-700">
            GameBoxEdu verwendet ein Freemium-Modell. Die Basisversion ist
            kostenlos. Erweiterte Funktionen werden über kostenpflichtige
            Abonnements angeboten.
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>
              <strong>Free Plan:</strong> 0 € / Monat
            </li>
            <li>
              <strong>Teacher Plan:</strong> 9,99 € / Monat
            </li>
            <li>
              <strong>School Plan:</strong> 199 € / Jahr
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="6. Markenformen">
          <p className="mb-5 leading-7 text-slate-700">
            Für GameBoxEdu wurden drei unterschiedliche Markenformen entworfen:
            eine Wortmarke, eine Bildmarke und ein Slogan. Die Wortmarke und die
            Bildmarke werden getrennt dargestellt, damit sie nicht als bloße
            Wortbildmarke gewertet werden.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Wortmarke
              </p>

              <div className="mb-4 rounded-xl bg-white p-4 text-center shadow-sm">
                <span className="text-2xl font-bold tracking-tight text-blue-800">
                  GameBoxEdu
                </span>
              </div>

              <p className="leading-7 text-slate-700">
                Die Wortmarke „GameBoxEdu“ verbindet die Begriffe Game, Box und
                Education. Sie steht für spielerische Lerninhalte, die in einer
                digitalen Lernbox gesammelt und genutzt werden.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Bildmarke
              </p>

              <div className="mb-4 flex justify-center rounded-xl bg-white p-4 shadow-sm">
                <div
                  aria-label="Symbolische Bildmarke von GameBoxEdu"
                  className="relative h-20 w-20 rounded-2xl bg-blue-700"
                >
                  <div className="absolute left-4 top-4 h-10 w-12 rounded-lg bg-white shadow-sm" />
                  <div className="absolute left-7 top-7 h-10 w-12 rounded-lg border-2 border-white bg-blue-500" />
                  <div className="absolute bottom-3 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-white" />
                </div>
              </div>

              <p className="leading-7 text-slate-700">
                Die Bildmarke zeigt eine stilisierte Box mit Lernkarten. Sie
                symbolisiert digitale Lernmaterialien, Ordnung, Wiederholung und
                spielerische Wissensvermittlung.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
                Slogan
              </p>

              <div className="mb-4 rounded-xl bg-white p-4 text-center shadow-sm">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Create. Play. Learn.
                </span>
              </div>

              <p className="leading-7 text-slate-700">
                Der Slogan beschreibt die zentrale Idee der Plattform:
                Lehrkräfte erstellen Inhalte, Lernende nutzen diese spielerisch
                und der Lernprozess wird dadurch motivierender.
              </p>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="7. Bedeutung der Marken">
          <p className="leading-7 text-slate-700">
            Die Marke GameBoxEdu soll modern, zugänglich und vertrauenswürdig
            wirken. Die Farbe Blau wird verwendet, weil sie Seriosität, digitale
            Technologie und Bildung symbolisiert. Runde Formen und Kartenmotive
            sollen die Plattform freundlich und leicht verständlich erscheinen
            lassen. Die Marke richtet sich an Schulen und Lehrkräfte, soll aber
            gleichzeitig spielerisch genug wirken, um Lernende zu motivieren.
          </p>
        </InfoCard>

        <InfoCard title="8. Nizza-Klassen">
          <p className="mb-3 leading-7 text-slate-700">
            Für eine mögliche Markenanmeldung wären insbesondere folgende
            Nizza-Klassen relevant:
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-7 text-slate-700">
            <li>
              <strong>Klasse 9:</strong> herunterladbare Software, digitale
              Anwendungen und elektronische Lernmaterialien
            </li>
            <li>
              <strong>Klasse 41:</strong> Bildung, Unterricht, Training,
              Lernangebote und digitale Lerninhalte
            </li>
            <li>
              <strong>Klasse 42:</strong> Software as a Service, Entwicklung,
              Bereitstellung und Wartung von Webanwendungen
            </li>
          </ul>
        </InfoCard>

        <InfoCard title="9. Markenrechtliche Prüfung">
          <p className="leading-7 text-slate-700">
            Zur Vermeidung von Markenrechtsverletzungen würde vor einer realen
            Veröffentlichung eine Recherche in Datenbanken wie EUIPO eSearch,
            TMview und Madrid Monitor durchgeführt. Dabei würden insbesondere
            Wortwahl, Bildwahl, Farbwahl, Positionswahl und Formwahl geprüft.
            Die Marke verwendet keine bekannten Logos, geschützten Figuren oder
            fremden Kennzeichen. Dieses Projekt dient einer
            Lehrveranstaltungsübung.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}