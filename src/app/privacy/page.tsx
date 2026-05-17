// src/app/privacy/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function PrivacyPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Datenschutz"
        title="Datenschutzerklärung"
        description="Diese Datenschutzerklärung beschreibt, wie GameBoxEdu im Rahmen dieses Webshops mit personenbezogenen Daten, Cookies, Kontaktformularen, localStorage und Analyse-Tools umgehen würde."
      />

      <div className="space-y-6">
        <InfoCard title="1. Verantwortlicher">
          <p className="leading-7 text-slate-700">
            Verantwortlich für die Verarbeitung personenbezogener Daten ist die
            GameBoxEdu GmbH, Fritz-Hahn-Gasse 1/49, 1100 Wien, Österreich.
            Kontakt: e12134416@student.tuwien.ac.at. Dieses Projekt wurde im
            Rahmen einer Übung erstellt.
          </p>
        </InfoCard>

        <InfoCard title="2. Kontaktformular">
          <p className="leading-7 text-slate-700">
            Das Kontaktformular ist in dieser Übung gemockt. Es werden keine
            echten Nachrichten gespeichert oder versendet. In einem realen
            Betrieb würden Name, E-Mail-Adresse und Nachricht verarbeitet
            werden, um Anfragen zu beantworten. Zweck der Verarbeitung wäre die
            Bearbeitung der Anfrage.
          </p>
        </InfoCard>

        <InfoCard title="3. Warenkorb und Checkout">
          <p className="leading-7 text-slate-700">
            Der Warenkorb und der Checkout-Prozess sind in diesem Webshop nur
            simuliert. Es findet keine echte Bestellung statt. Es werden keine
            Zahlungsdaten, Rechnungsdaten oder Bestelldaten an externe
            Zahlungsdienstleister übermittelt. Nach dem simulierten Checkout
            wird lediglich eine Produktdemo geöffnet.
          </p>
        </InfoCard>

        <InfoCard title="4. Cookies, localStorage und Cookie-Banner">
          <p className="leading-7 text-slate-700">
            Der Webshop enthält einen gemockten Cookie-Banner. Die Auswahl der
            Nutzerinnen und Nutzer wird lokal im Browser über localStorage unter
            dem Schlüssel gameboxedu-cookie-consent gespeichert. Außerdem
            speichert die Produktdemo selbst erstellte Flashcards, Quizfragen
            und Matching-Paare lokal im Browser. Diese Daten werden nicht an
            einen Server übertragen und können durch Zurücksetzen der Demo-Daten
            oder durch Löschen des Browser-Speichers entfernt werden.
          </p>
        </InfoCard>

        <InfoCard title="5. Produktdemo und lokale Speicherung">
          <p className="leading-7 text-slate-700">
            Die Demo-Funktionen für Flashcards, Quizze und Matching Games
            verwenden JSON-Dateien als Startdaten. Änderungen, die Nutzerinnen
            und Nutzer in der Demo vornehmen, werden ohne Backend und ohne
            Datenbank im localStorage des jeweiligen Browsers gespeichert. Diese
            Speicherung dient ausschließlich dazu, die Funktionsweise der
            Lernplattform im Rahmen der Übung zu simulieren.
          </p>
        </InfoCard>

        <InfoCard title="6. Analyse-Tools">
          <p className="leading-7 text-slate-700">
            Analyse-Tools werden in diesem Projekt nur erwähnt und simuliert. Es
            findet keine echte Analyse des Nutzerverhaltens statt. Es werden
            keine Tracking-Cookies gesetzt und keine personenbezogenen
            Nutzungsprofile erstellt.
          </p>
        </InfoCard>

        <InfoCard title="7. Speicherdauer">
          <p className="leading-7 text-slate-700">
            In diesem Webshop werden keine echten personenbezogenen Daten auf
            einem Server dauerhaft gespeichert, da Kontaktformular, Warenkorb
            und Checkout im Rahmen der Übung nur simuliert werden. Die
            Cookie-Auswahl und die Demo-Inhalte im localStorage bleiben im
            Browser gespeichert, bis sie durch die Nutzerin oder den Nutzer
            gelöscht oder über die Demo zurückgesetzt werden.
          </p>
        </InfoCard>

        <InfoCard title="8. Rechte der Nutzerinnen und Nutzer">
          <p className="leading-7 text-slate-700">
            Betroffene Personen hätten in einem realen Betrieb insbesondere das
            Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte
            Verarbeitungen. Außerdem könnten sie eine erteilte Einwilligung mit
            Wirkung für die Zukunft widerrufen.
          </p>
        </InfoCard>
      </div>
    </PageContainer>
  );
}