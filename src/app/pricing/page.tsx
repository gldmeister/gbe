// src/app/pricing/page.tsx

import { pricingPlans } from "@/shared/data/pricing-plans";
import { ButtonLink } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function PricingPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Preise"
        title="Flexible Abo-Modelle für GameBoxEdu"
        description="GameBoxEdu verwendet ein Freemium-Geschäftsmodell. Die Basisversion ist kostenlos. Erweiterte Funktionen werden über kostenpflichtige Abonnements angeboten."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            key={plan.id}
            className="flex flex-col rounded-2xl border border-slate-300 bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-950">{plan.name}</h2>

            <p className="mt-3 text-slate-800">{plan.description}</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-slate-950">
                {plan.price}
              </span>
              <span className="text-slate-800"> {plan.period}</span>
            </div>

            <ul className="mt-6 flex-1 space-y-3 text-slate-800">
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href={`/cart?plan=${plan.id}`}>
                {plan.buttonLabel}
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}