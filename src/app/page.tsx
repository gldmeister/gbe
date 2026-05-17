// src/app/page.tsx

import { ButtonLink } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="GameBoxEdu Webshop"
        title="Interaktive Lernspiele für modernen Unterricht"
        description="GameBoxEdu ist eine webbasierte Lernplattform für Lehrkräfte, Schulen und Bildungseinrichtungen. Erstellen Sie digitale Flashcards, Quizze und Matching Games direkt im Browser."
      />

      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/product">Produkt ansehen</ButtonLink>

        <ButtonLink href="/pricing" variant="secondary">
          Preise ansehen
        </ButtonLink>
      </div>
    </PageContainer>
  );
}