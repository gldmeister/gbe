// src/app/demo/quiz/page.tsx

"use client";

import { type QuizQuestion } from "@/shared/data/demo-content";
import { loadQuizQuestions } from "@/shared/lib/demo-storage";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizGamePage() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  useEffect(() => {
    setQuizQuestions(loadQuizQuestions());
  }, []);

  const activeQuestion = quizQuestions[activeIndex];
  const progress =
    quizQuestions.length > 0
      ? Math.round(((activeIndex + 1) / quizQuestions.length) * 100)
      : 0;

  function showNextQuestion() {
    if (quizQuestions.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex + 1 >= quizQuestions.length ? 0 : currentIndex + 1
    );
    setIsAnswerVisible(false);
  }

  function markKnown() {
    setKnownCount((currentValue) => currentValue + 1);
    showNextQuestion();
  }

  function markUnknown() {
    setUnknownCount((currentValue) => currentValue + 1);
    showNextQuestion();
  }

  function resetQuizGame() {
    setQuizQuestions(loadQuizQuestions());
    setActiveIndex(0);
    setIsAnswerVisible(false);
    setKnownCount(0);
    setUnknownCount(0);
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Quiz spielen"
        title="Quizmodus"
        description="In diesem Modus werden Quizfragen nacheinander angezeigt. Die Musterantwort erscheint mit einer weichen Animation."
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
          onClick={resetQuizGame}
          className="inline-flex rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Quiz neu starten
        </button>
      </div>

      {activeQuestion ? (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Frage</p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {activeIndex + 1} / {quizQuestions.length}
              </p>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Gewusst</p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {knownCount}
              </p>
            </div>

            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-sm font-semibold text-slate-700">
                Nicht gewusst
              </p>
              <p className="mt-1 text-xl font-bold text-slate-950">
                {unknownCount}
              </p>
            </div>
          </div>

          <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="rounded-2xl border border-slate-400 bg-slate-50 p-8 transition duration-300">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
              Quizfrage
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-950">
              {activeQuestion.question}
            </h2>

            <div
              className={`grid transition-all duration-500 ${
                isAnswerVisible
                  ? "mt-8 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-xl border border-blue-700 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
                    Musterantwort
                  </p>

                  <p className="mt-3 text-xl leading-8 text-slate-950">
                    {activeQuestion.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsAnswerVisible((currentValue) => !currentValue)}
              className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Antwort anzeigen
            </button>

            <button
              type="button"
              onClick={markUnknown}
              className="rounded-xl border border-red-700 bg-white px-5 py-3 text-sm font-semibold text-red-800 transition hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
            >
              Nicht gewusst
            </button>

            <button
              type="button"
              onClick={markKnown}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Gewusst / nächste Frage
            </button>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Keine Quizfragen vorhanden
          </h2>

          <p className="mt-3 leading-7 text-slate-800">
            Erstellen Sie zuerst Quizfragen in der Demo-Verwaltung.
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