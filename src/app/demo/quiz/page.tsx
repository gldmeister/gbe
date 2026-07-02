// src/app/demo/quiz/page.tsx

"use client";

import { type QuizQuestion } from "@/shared/data/demo-content";
import { loadQuizQuestions } from "@/shared/lib/demo-storage";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AnswerState = "idle" | "correct" | "wrong";

function shuffleItems<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function QuizGamePage() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [roundKey, setRoundKey] = useState(0);

  useEffect(() => {
    setQuizQuestions(loadQuizQuestions());
  }, []);

  const activeQuestion = quizQuestions[activeIndex];

  const answerOptions = useMemo(() => {
    if (!activeQuestion) {
      return [];
    }

    return shuffleItems(activeQuestion.options);
  }, [activeQuestion, roundKey]);

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

    setSelectedAnswer(null);
    setAnswerState("idle");
    setRoundKey((currentValue) => currentValue + 1);
  }

  function chooseAnswer(answer: string) {
    if (!activeQuestion || answerState !== "idle") {
      return;
    }

    setSelectedAnswer(answer);

    if (answer === activeQuestion.correctAnswer) {
      setAnswerState("correct");
      setCorrectCount((currentValue) => currentValue + 1);
    } else {
      setAnswerState("wrong");
      setWrongCount((currentValue) => currentValue + 1);
    }
  }

  function resetQuizGame() {
    setQuizQuestions(loadQuizQuestions());
    setActiveIndex(0);
    setSelectedAnswer(null);
    setAnswerState("idle");
    setCorrectCount(0);
    setWrongCount(0);
    setRoundKey((currentValue) => currentValue + 1);
  }

  function getOptionClass(option: string) {
    if (answerState === "idle") {
      return "border-slate-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-50 hover:shadow-sm";
    }

    if (option === activeQuestion?.correctAnswer) {
      return "border-green-700 bg-green-50 text-green-900";
    }

    if (option === selectedAnswer && answerState === "wrong") {
      return "border-red-700 bg-red-50 text-red-900";
    }

    return "border-slate-300 bg-slate-50 text-slate-500 opacity-70";
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Quiz spielen"
        title="Multiple-Choice-Quizmodus"
        description="In diesem Modus werden Prüfungsfragen mit zufällig gemischten Antwortmöglichkeiten angezeigt. Nach der Auswahl erscheint eine Erklärung."
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

          <div className="rounded-2xl border border-slate-400 bg-slate-50 p-8 transition duration-300">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full border border-blue-700 bg-white px-3 py-1 text-sm font-semibold text-blue-800">
                {activeQuestion.topic}
              </span>

              <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700">
                {activeQuestion.source}
              </span>
            </div>

            <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
              Prüfungsfrage
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-950">
              {activeQuestion.question}
            </h2>

            <div className="mt-8 grid gap-3">
              {answerOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(option)}
                  disabled={answerState !== "idle"}
                  className={`rounded-xl border px-5 py-4 text-left font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${getOptionClass(
                    option
                  )}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`mt-6 overflow-hidden rounded-xl border transition-all duration-500 ${
              answerState === "idle"
                ? "max-h-0 border-transparent opacity-0"
                : "max-h-96 border-slate-300 opacity-100"
            }`}
          >
            {answerState === "correct" && (
              <div className="bg-green-50 p-4 text-green-900">
                <p className="font-bold">Richtig!</p>
                <p className="mt-2 text-sm leading-6">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}

            {answerState === "wrong" && (
              <div className="bg-red-50 p-4 text-red-900">
                <p className="font-bold">Falsch.</p>
                <p className="mt-2 text-sm leading-6">
                  Die richtige Antwort ist:{" "}
                  <span className="font-semibold">
                    {activeQuestion.correctAnswer}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-6">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={showNextQuestion}
              className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Nächste Frage
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