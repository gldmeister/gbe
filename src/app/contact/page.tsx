// src/app/contact/page.tsx

import { InfoCard } from "@/shared/ui/info-card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Kontakt"
        title="Kontaktieren Sie GameBoxEdu"
        description="Haben Sie Fragen zu GameBoxEdu, unseren Abo-Modellen oder zur Nutzung der Plattform? Über diese Seite können Kundinnen und Kunden Kontakt mit uns aufnehmen."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <InfoCard title="Kontaktdaten">
          <p className="leading-7 text-slate-700">
            GameBoxEdu GmbH
            <br />
            Fritz-Hahn-Gasse 1/49
            <br />
            1100 Wien
            <br />
            Österreich
          </p>

          <p className="mt-6 leading-7 text-slate-700">
            E-Mail: e12134416@student.tuwien.ac.at
            <br />
            Telefon: +43 677 64420230
          </p>
        </InfoCard>

        <InfoCard title="Kontaktformular">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-medium text-slate-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ihr Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-slate-900"
              >
                E-Mail-Adresse
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="max@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-medium text-slate-900"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Ihre Nachricht an GameBoxEdu..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Nachricht senden
            </button>

            <p className="text-sm leading-6 text-slate-600">
              Hinweis: Dieses Formular ist im Rahmen der Übung gemockt. Es
              werden keine echten Nachrichten gespeichert oder versendet.
            </p>
          </form>
        </InfoCard>
      </div>
    </PageContainer>
  );
}