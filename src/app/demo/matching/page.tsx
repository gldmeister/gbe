// src/app/demo/matching/page.tsx

"use client";

import { type MatchingItem } from "@/shared/data/demo-content";
import { loadMatchingItems } from "@/shared/lib/demo-storage";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AnswerState = "idle" | "correct" | "wrong";

function shuffleItems(items: MatchingItem[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function MatchingGamePage() {
  const [matchingItems, setMatchingItems] = useState<MatchingItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [roundKey, setRoundKey] = useState(0);

  useEffect(() => {
    setMatchingItems(loadMatchingItems());
  }, []);

  const activeItem = matchingItems[activeIndex];

  const answerOptions = useMemo(() => {
    if (!activeItem) {
      return [];
    }

    const wrongOptions = matchingItems
      .filter((item) => item.id !== activeItem.id)
      .slice(0, 3);

    return shuffleItems([activeItem, ...wrongOptions]);
  }, [activeItem, matchingItems, roundKey]);

  const progress =
    matchingItems.length > 0
      ? Math.round(((activeIndex + 1) / matchingItems.length) * 100)
      : 0;

  function chooseAnswer(answerId: string) {
    if (!activeItem || answerState !== "idle") {
      return;
    }

    setSelectedAnswerId(answerId);

    if (answerId === activeItem.id) {
      setAnswerState("correct");
      setCorrectCount((currentValue) => currentValue + 1);
    } else {
      setAnswerState("wrong");
      setWrongCount((currentValue) => currentValue + 1);
    }
  }

  function showNextItem() {
    if (matchingItems.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex + 1 >= matchingItems.length ? 0 : currentIndex + 1
    );

    setSelectedAnswerId(null);
    setAnswerState("idle");
    setRoundKey((currentValue) => currentValue + 1);
  }

  function resetMatchingGame() {
    setMatchingItems(loadMatchingItems());
    setActiveIndex(0);
    setSelectedAnswerId(null);
    setAnswerState("idle");
    setCorrectCount(0);
    setWrongCount(0);
    setRoundKey((currentValue) => currentValue + 1);
  }

  function getOptionClass(optionId: string) {
    if (answerState === "idle") {
      return "border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-50 hover:shadow-sm";
    }

    if (optionId === activeItem?.id) {
      return "border-green-700 bg-green-50 text-green-900";
    }

    if (optionId === selectedAnswerId && answerState === "wrong") {
      return "border-red-700 bg-red-50 text-red-900";
    }

    return "border-slate-300 bg-slate-50 text-slate-500 opacity-70";
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Matching spielen"
        title="Matching-Game-Modus"
        description="Wählen Sie die passende Bedeutung zum angezeigten Begriff. Die Auswahl wird sofort als richtig oder falsch markiert."
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
          onClick={resetMatchingGame}
          className="inline-flex rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Spiel neu starten
        </button>
      </div>

      {activeItem ? (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Paar</p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {activeIndex + 1} / {matchingItems.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Richtig</p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {correctCount}
              </p>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Falsch</p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {wrongCount}
              </p>
            </div>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl border border-blue-800 bg-blue-800 p-8 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-100">
                Begriff
              </p>

              <h2 className="mt-5 text-3xl font-bold leading-tight">
                {activeItem.left}
              </h2>

              <p className="mt-8 text-sm leading-6 text-blue-100">
                Wählen Sie rechts die passende Bedeutung.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
              <p className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                Antwortmöglichkeiten
              </p>

              <div className="grid gap-3">
                {answerOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseAnswer(option.id)}
                    disabled={answerState !== "idle"}
                    className={`rounded-xl border px-5 py-4 text-left font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${getOptionClass(
                      option.id
                    )}`}
                  >
                    {option.right}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`mt-6 overflow-hidden rounded-xl border transition-all duration-500 ${
              answerState === "idle"
                ? "max-h-0 border-transparent opacity-0"
                : "max-h-40 border-slate-300 opacity-100"
            }`}
          >
            {answerState === "correct" && (
              <div className="bg-green-50 p-4 text-green-900">
                <p className="font-bold">Richtig!</p>
                <p className="mt-1 text-sm">
                  Die passende Bedeutung wurde korrekt ausgewählt.
                </p>
              </div>
            )}

            {answerState === "wrong" && (
              <div className="bg-red-50 p-4 text-red-900">
                <p className="font-bold">Falsch.</p>
                <p className="mt-1 text-sm">
                  Die richtige Antwort ist:{" "}
                  <span className="font-semibold">{activeItem.right}</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={showNextItem}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Nächstes Paar
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Keine Matching-Paare vorhanden
          </h2>

          <p className="mt-3 leading-7 text-slate-800">
            Erstellen Sie zuerst Matching-Paare in der Demo-Verwaltung.
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