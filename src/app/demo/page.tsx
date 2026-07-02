// src/app/demo/page.tsx

"use client";

import {
  demoFlashcards,
  demoMatchingItems,
  demoQuizQuestions,
  type Flashcard,
  type MatchingItem,
  type QuizQuestion,
} from "@/shared/data/demo-content";
import {
  createDemoId,
  FLASHCARDS_STORAGE_KEY,
  loadFlashcards,
  loadMatchingItems,
  loadQuizQuestions,
  MATCHING_STORAGE_KEY,
  QUIZ_STORAGE_KEY,
  resetDemoStorage,
  saveToLocalStorage,
} from "@/shared/lib/demo-storage";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export default function DemoPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [flashcards, setFlashcards] = useState<Flashcard[]>(demoFlashcards);
  const [quizQuestions, setQuizQuestions] =
    useState<QuizQuestion[]>(demoQuizQuestions);
  const [matchingItems, setMatchingItems] =
    useState<MatchingItem[]>(demoMatchingItems);

  const [flashcardFront, setFlashcardFront] = useState("");
  const [flashcardBack, setFlashcardBack] = useState("");
  const [editingFlashcardId, setEditingFlashcardId] = useState<string | null>(
    null
  );

  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState("");
  const [quizWrongAnswers, setQuizWrongAnswers] = useState("");
  const [quizTopic, setQuizTopic] = useState("");
  const [quizSource, setQuizSource] = useState("");
  const [quizExplanation, setQuizExplanation] = useState("");
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  const [matchingLeft, setMatchingLeft] = useState("");
  const [matchingRight, setMatchingRight] = useState("");
  const [editingMatchingId, setEditingMatchingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setFlashcards(loadFlashcards());
    setQuizQuestions(loadQuizQuestions());
    setMatchingItems(loadMatchingItems());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(FLASHCARDS_STORAGE_KEY, flashcards);
    }
  }, [flashcards, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(QUIZ_STORAGE_KEY, quizQuestions);
    }
  }, [quizQuestions, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(MATCHING_STORAGE_KEY, matchingItems);
    }
  }, [matchingItems, isLoaded]);

  function resetFlashcardForm() {
    setFlashcardFront("");
    setFlashcardBack("");
    setEditingFlashcardId(null);
  }

  function resetQuizForm() {
    setQuizQuestion("");
    setQuizCorrectAnswer("");
    setQuizWrongAnswers("");
    setQuizTopic("");
    setQuizSource("");
    setQuizExplanation("");
    setEditingQuizId(null);
  }

  function resetMatchingForm() {
    setMatchingLeft("");
    setMatchingRight("");
    setEditingMatchingId(null);
  }

  function buildQuizOptions(correctAnswer: string, wrongAnswersText: string) {
    const wrongAnswers = wrongAnswersText
      .split("\n")
      .map((answer) => answer.trim())
      .filter(Boolean);

    return Array.from(new Set([correctAnswer.trim(), ...wrongAnswers]));
  }

  function submitFlashcard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!flashcardFront.trim() || !flashcardBack.trim()) {
      return;
    }

    if (editingFlashcardId) {
      setFlashcards((currentCards) =>
        currentCards.map((card) =>
          card.id === editingFlashcardId
            ? {
                ...card,
                front: flashcardFront.trim(),
                back: flashcardBack.trim(),
              }
            : card
        )
      );
    } else {
      setFlashcards((currentCards) => [
        ...currentCards,
        {
          id: createDemoId("flashcard"),
          front: flashcardFront.trim(),
          back: flashcardBack.trim(),
        },
      ]);
    }

    resetFlashcardForm();
  }

  function startEditFlashcard(card: Flashcard) {
    setEditingFlashcardId(card.id);
    setFlashcardFront(card.front);
    setFlashcardBack(card.back);
  }

  function deleteFlashcard(cardId: string) {
    setFlashcards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId)
    );
  }

  function submitQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const options = buildQuizOptions(quizCorrectAnswer, quizWrongAnswers);

    if (!quizQuestion.trim() || !quizCorrectAnswer.trim() || options.length < 2) {
      return;
    }

    const quizPayload = {
      question: quizQuestion.trim(),
      correctAnswer: quizCorrectAnswer.trim(),
      options,
      topic: quizTopic.trim() || "Allgemein",
      source: quizSource.trim() || "Eigene Eingabe",
      explanation:
        quizExplanation.trim() ||
        "Für diese Frage wurde noch keine Erklärung hinterlegt.",
    };

    if (editingQuizId) {
      setQuizQuestions((currentQuestions) =>
        currentQuestions.map((question) =>
          question.id === editingQuizId
            ? {
                ...question,
                ...quizPayload,
              }
            : question
        )
      );
    } else {
      setQuizQuestions((currentQuestions) => [
        ...currentQuestions,
        {
          id: createDemoId("quiz"),
          ...quizPayload,
        },
      ]);
    }

    resetQuizForm();
  }

  function startEditQuiz(question: QuizQuestion) {
    setEditingQuizId(question.id);
    setQuizQuestion(question.question);
    setQuizCorrectAnswer(question.correctAnswer);
    setQuizWrongAnswers(
      question.options
        .filter((option) => option !== question.correctAnswer)
        .join("\n")
    );
    setQuizTopic(question.topic);
    setQuizSource(question.source);
    setQuizExplanation(question.explanation);
  }

  function deleteQuiz(questionId: string) {
    setQuizQuestions((currentQuestions) =>
      currentQuestions.filter((question) => question.id !== questionId)
    );
  }

  function submitMatching(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!matchingLeft.trim() || !matchingRight.trim()) {
      return;
    }

    if (editingMatchingId) {
      setMatchingItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingMatchingId
            ? {
                ...item,
                left: matchingLeft.trim(),
                right: matchingRight.trim(),
              }
            : item
        )
      );
    } else {
      setMatchingItems((currentItems) => [
        ...currentItems,
        {
          id: createDemoId("matching"),
          left: matchingLeft.trim(),
          right: matchingRight.trim(),
        },
      ]);
    }

    resetMatchingForm();
  }

  function startEditMatching(item: MatchingItem) {
    setEditingMatchingId(item.id);
    setMatchingLeft(item.left);
    setMatchingRight(item.right);
  }

  function deleteMatching(itemId: string) {
    setMatchingItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  }

  function resetAllDemoData() {
    resetDemoStorage();
    setFlashcards(demoFlashcards);
    setQuizQuestions(demoQuizQuestions);
    setMatchingItems(demoMatchingItems);
    resetFlashcardForm();
    resetQuizForm();
    resetMatchingForm();
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Produktdemo"
        title="GameBoxEdu Plattform-Simulation"
        description="Diese Seite simuliert die Verwaltungsoberfläche nach dem Checkout. Inhalte werden aus JSON-Dateien geladen und ohne Datenbank im Browser gespeichert."
      />

      <div className="mb-8 rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-950">
          Demo-Verwaltung
        </h2>

        <p className="mt-3 leading-7 text-slate-800">
          Hier können Lerninhalte hinzugefügt, geändert und gelöscht werden. Die
          Startdaten kommen aus JSON-Dateien. Änderungen werden lokal im Browser
          gespeichert.
        </p>

        <button
          type="button"
          onClick={resetAllDemoData}
          className="mt-5 rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        >
          Alle Demo-Daten zurücksetzen
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Flashcards</h2>
              <p className="mt-2 text-slate-800">
                Lernkarten verwalten und im Spielmodus umdrehen.
              </p>
            </div>

            <Link
              href="/demo/flashcards"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Spielen
            </Link>
          </div>

          <form onSubmit={submitFlashcard} className="mt-6 space-y-3">
            <div>
              <label
                htmlFor="flashcard-front"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Vorderseite
              </label>

              <input
                id="flashcard-front"
                name="flashcard-front"
                value={flashcardFront}
                onChange={(event) => setFlashcardFront(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Vorderseite"
              />
            </div>

            <div>
              <label
                htmlFor="flashcard-back"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Rückseite
              </label>

              <input
                id="flashcard-back"
                name="flashcard-back"
                value={flashcardBack}
                onChange={(event) => setFlashcardBack(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Rückseite"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                {editingFlashcardId ? "Änderung speichern" : "Hinzufügen"}
              </button>

              {editingFlashcardId && (
                <button
                  type="button"
                  onClick={resetFlashcardForm}
                  className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {flashcards.map((card) => (
              <article
                key={card.id}
                className="rounded-xl border border-slate-300 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-950">{card.front}</p>
                <p className="mt-1 text-sm text-slate-800">{card.back}</p>

                <details className="mt-3">
                  <summary className="cursor-pointer rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950">
                    Aktionen
                  </summary>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEditFlashcard(card)}
                      className="rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                    >
                      Ändern
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteFlashcard(card.id)}
                      className="rounded-lg border border-red-700 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
                    >
                      Löschen
                    </button>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Quizze</h2>
              <p className="mt-2 text-slate-800">
                Quizfragen verwalten und im Spielmodus beantworten.
              </p>
            </div>

            <Link
              href="/demo/quiz"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Spielen
            </Link>
          </div>

          <form onSubmit={submitQuiz} className="mt-6 space-y-3">
            <div>
              <label
                htmlFor="quiz-question"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Frage
              </label>

              <input
                id="quiz-question"
                name="quiz-question"
                value={quizQuestion}
                onChange={(event) => setQuizQuestion(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Frage"
              />
            </div>

            <div>
              <label
                htmlFor="quiz-correct-answer"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Richtige Antwort
              </label>

              <input
                id="quiz-correct-answer"
                name="quiz-correct-answer"
                value={quizCorrectAnswer}
                onChange={(event) => setQuizCorrectAnswer(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Richtige Antwort"
              />
            </div>

            <div>
              <label
                htmlFor="quiz-wrong-answers"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Falsche Antworten
              </label>

              <textarea
                id="quiz-wrong-answers"
                name="quiz-wrong-answers"
                rows={4}
                value={quizWrongAnswers}
                onChange={(event) => setQuizWrongAnswers(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder={"Eine falsche Antwort pro Zeile\nFalsche Antwort 1\nFalsche Antwort 2\nFalsche Antwort 3"}
              />
            </div>

            <div>
              <label
                htmlFor="quiz-topic"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Thema
              </label>

              <input
                id="quiz-topic"
                name="quiz-topic"
                value={quizTopic}
                onChange={(event) => setQuizTopic(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="z.B. DSGVO, Grundrechte, Prüfung"
              />
            </div>

            <div>
              <label
                htmlFor="quiz-source"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Quelle
              </label>

              <input
                id="quiz-source"
                name="quiz-source"
                value={quizSource}
                onChange={(event) => setQuizSource(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="z.B. Vorlesung 3, Altfrage 2025, TUWEL"
              />
            </div>

            <div>
              <label
                htmlFor="quiz-explanation"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Erklärung
              </label>

              <textarea
                id="quiz-explanation"
                name="quiz-explanation"
                rows={4}
                value={quizExplanation}
                onChange={(event) => setQuizExplanation(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Kurze Erklärung, warum diese Antwort richtig ist."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                {editingQuizId ? "Änderung speichern" : "Hinzufügen"}
              </button>

              {editingQuizId && (
                <button
                  type="button"
                  onClick={resetQuizForm}
                  className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {quizQuestions.map((question) => (
              <article
                key={question.id}
                className="rounded-xl border border-slate-300 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-950">
                  {question.question}
                </p>
                <p className="mt-1 text-sm text-slate-800">
                  <span className="font-semibold">Richtig:</span> {question.correctAnswer}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold">Thema:</span> {question.topic}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold">Quelle:</span> {question.source}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Optionen: {question.options.join(" | ")}
                </p>

                <details className="mt-3">
                  <summary className="cursor-pointer rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950">
                    Aktionen
                  </summary>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEditQuiz(question)}
                      className="rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                    >
                      Ändern
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteQuiz(question.id)}
                      className="rounded-lg border border-red-700 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
                    >
                      Löschen
                    </button>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                Matching Games
              </h2>
              <p className="mt-2 text-slate-800">
                Paare verwalten und im Spielmodus zuordnen.
              </p>
            </div>

            <Link
              href="/demo/matching"
              className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Spielen
            </Link>
          </div>

          <form onSubmit={submitMatching} className="mt-6 space-y-3">
            <div>
              <label
                htmlFor="matching-left"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Begriff
              </label>

              <input
                id="matching-left"
                name="matching-left"
                value={matchingLeft}
                onChange={(event) => setMatchingLeft(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Begriff"
              />
            </div>

            <div>
              <label
                htmlFor="matching-right"
                className="mb-1 block text-sm font-semibold text-slate-950"
              >
                Bedeutung
              </label>

              <input
                id="matching-right"
                name="matching-right"
                value={matchingRight}
                onChange={(event) => setMatchingRight(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                placeholder="Bedeutung"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                {editingMatchingId ? "Änderung speichern" : "Hinzufügen"}
              </button>

              {editingMatchingId && (
                <button
                  type="button"
                  onClick={resetMatchingForm}
                  className="rounded-xl border border-slate-400 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
                >
                  Abbrechen
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 space-y-3">
            {matchingItems.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-300 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-950">{item.left}</p>
                <p className="mt-1 text-sm text-slate-800">{item.right}</p>

                <details className="mt-3">
                  <summary className="cursor-pointer rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950">
                    Aktionen
                  </summary>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEditMatching(item)}
                      className="rounded-lg border border-slate-400 bg-white px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                    >
                      Ändern
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMatching(item.id)}
                      className="rounded-lg border border-red-700 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-50"
                    >
                      Löschen
                    </button>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}