// src/app/cart/page.tsx

import { getPricingPlanById } from "@/shared/data/pricing-plans";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";

type CartPageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const params = await searchParams;
  const selectedPlan = getPricingPlanById(params?.plan ?? null);
  const periodLabel = selectedPlan.period.replace("/", "pro ");

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Warenkorb"
        title="Ihr Warenkorb"
        description="Dieser Warenkorb simuliert einen typischen Webshop-Prozess. Es findet keine echte Zahlung statt und es werden keine echten Bestellungen gespeichert."
      />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-slate-400 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Ausgewähltes Produkt
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-900">
                Ihre aktuelle Auswahl für den gemockten Checkout.
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-700 bg-white px-3 py-1 text-sm font-semibold text-slate-950">
              1 Produkt
            </span>
          </div>

          <article className="rounded-2xl border border-slate-400 bg-white p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-950">
                  Abo-Modell
                </p>

                <h3 className="text-xl font-bold text-slate-950">
                  {selectedPlan.name}
                </h3>

                <p className="mt-3 max-w-2xl leading-7 text-slate-900">
                  {selectedPlan.description}
                </p>

                <ul className="mt-4 grid gap-2 text-sm text-slate-900 sm:grid-cols-2">
                  {selectedPlan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 rounded-xl border border-slate-400 bg-white px-5 py-4 text-left md:text-right">
                <p className="whitespace-nowrap text-xl font-bold text-slate-950">
                  {selectedPlan.price}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {periodLabel}
                </p>
              </div>
            </div>
          </article>

          <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-white p-4">
            <p className="text-sm leading-6 text-slate-900">
              Hinweis: Die Produktauswahl wird in diesem Übungsprojekt über die
              URL simuliert. In einem echten Webshop würde der Warenkorb
              dynamisch gespeichert und verwaltet werden.
            </p>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-400 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Zusammenfassung
          </h2>

          <div className="mt-6 space-y-4 text-slate-900">
            <div className="flex justify-between gap-4">
              <span>{selectedPlan.name}</span>
              <span className="whitespace-nowrap font-bold text-slate-950">
                {selectedPlan.price}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span>Laufzeit</span>
              <span className="whitespace-nowrap font-medium text-slate-950">
                {periodLabel}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span>MwSt.</span>
              <span className="whitespace-nowrap font-medium text-slate-950">
                inklusive
              </span>
            </div>

            <div className="border-t border-slate-400 pt-4">
              <div className="flex justify-between gap-4 text-lg font-bold text-slate-950">
                <span>Gesamt</span>
                <span className="whitespace-nowrap">{selectedPlan.price}</span>
              </div>
            </div>
          </div>

          <Link
            href="/demo"
            className="mt-6 inline-flex w-full justify-center rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            Checkout simulieren
          </Link>

          <p className="mt-4 text-sm leading-6 text-slate-900">
            Der Checkout ist gemockt. Es werden keine Zahlungs- oder
            Bestelldaten verarbeitet.
          </p>

          <div className="mt-6">
            <Link
              href="/pricing"
              className="inline-flex rounded-lg font-semibold text-blue-900 underline underline-offset-4 hover:text-blue-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Zurück zu den Preisen
            </Link>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}