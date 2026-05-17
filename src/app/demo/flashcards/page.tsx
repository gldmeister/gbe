// src/app/demo/flashcards/page.tsx

"use client";

import { type Flashcard } from "@/shared/data/demo-content";
import { loadFlashcards } from "@/shared/lib/demo-storage";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FlashcardsGamePage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBackVisible, setIsBackVisible] = useState(false);

  useEffect(() => {
    setFlashcards(loadFlashcards());
  }, []);

  const activeFlashcard = flashcards[activeIndex];

  function showNextCard() {
    if (flashcards.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex + 1 >= flashcards.length ? 0 : currentIndex + 1
    );
    setIsBackVisible(false);
  }

  function showPreviousCard() {
    if (flashcards.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex - 1 < 0 ? flashcards.length - 1 : currentIndex - 1
    );
    setIsBackVisible(false);
  }

  function reloadFlashcards() {
    setFlashcards(loadFlashcards());
    setActiveIndex(0);
    setIsBackVisible(false);
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Flashcards spielen"
        title="Flashcards-Lernmodus"
        description="In diesem Modus werden gespeicherte Flashcards nacheinander angezeigt. Die Karte kann mit einer 3D-Animation umgedreht werden."
      />

      <div className="mb-6 flex flex-wrap gap-4">
        <Link
          href="/demo"
          className="inline-flex rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Zurück zur Verwaltung
        </Link>

        <button
          type="button"
          onClick={reloadFlashcards}
          className="inline-flex rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Daten neu laden
        </button>
      </div>

      {activeFlashcard ? (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold text-slate-950">
              Karte {activeIndex + 1} von {flashcards.length}
            </h2>

            <p className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
              3D Flip Animation
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsBackVisible((currentValue) => !currentValue)}
            className="h-96 w-full rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            aria-label="Flashcard umdrehen"
          >
            <div
              className="relative h-full w-full"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative h-full w-full rounded-2xl transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isBackVisible
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-400 bg-slate-50 p-8 text-left shadow-sm"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
                      Vorderseite
                    </p>

                    <p className="mt-8 text-3xl font-bold leading-tight text-slate-950">
                      {activeFlashcard.front}
                    </p>
                  </div>

                  <p className="text-sm text-slate-700">
                    Klicken Sie auf die Karte, um sie umzudrehen.
                  </p>
                </div>

                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-blue-800 bg-blue-800 p-8 text-left text-white shadow-sm"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-blue-100">
                      Rückseite
                    </p>

                    <p className="mt-8 text-3xl font-bold leading-tight">
                      {activeFlashcard.back}
                    </p>
                  </div>

                  <p className="text-sm text-blue-100">
                    Klicken Sie erneut, um die Vorderseite zu sehen.
                  </p>
                </div>
              </div>
            </div>
          </button>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={showPreviousCard}
              className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Vorherige Karte
            </button>

            <button
              type="button"
              onClick={() => setIsBackVisible((currentValue) => !currentValue)}
              className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Karte umdrehen
            </button>

            <button
              type="button"
              onClick={showNextCard}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Nächste Karte
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Keine Flashcards vorhanden
          </h2>

          <p className="mt-3 leading-7 text-slate-800">
            Erstellen Sie zuerst Flashcards in der Demo-Verwaltung.
          </p>

          <div className="mt-6">
            <Link
              href="/demo"
              className="inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Zur Verwaltung
            </Link>
          </div>
        </section>
      )}
    </PageContainer>
  );
}