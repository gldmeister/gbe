// src/shared/lib/demo-storage.ts

import {
  demoFlashcards,
  demoMatchingItems,
  demoQuizQuestions,
  type Flashcard,
  type MatchingItem,
  type QuizQuestion,
} from "@/shared/data/demo-content";

export const FLASHCARDS_STORAGE_KEY = "gameboxedu-demo-flashcards";
export const QUIZ_STORAGE_KEY = "gameboxedu-demo-quiz";
export const MATCHING_STORAGE_KEY = "gameboxedu-demo-matching";

export function createDemoId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function loadFromLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const savedValue = window.localStorage.getItem(key);

  if (!savedValue) {
    return fallback;
  }

  try {
    return JSON.parse(savedValue) as T;
  } catch {
    return fallback;
  }
}

export function saveToLocalStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadFlashcards(): Flashcard[] {
  return loadFromLocalStorage<Flashcard[]>(
    FLASHCARDS_STORAGE_KEY,
    demoFlashcards
  );
}

type LegacyQuizQuestion = Partial<QuizQuestion> & {
  answer?: string;
};

export function loadQuizQuestions(): QuizQuestion[] {
  const savedQuestions = loadFromLocalStorage<LegacyQuizQuestion[]>(
    QUIZ_STORAGE_KEY,
    demoQuizQuestions
  );

  return savedQuestions.map((question, index) => {
    const correctAnswer =
      question.correctAnswer ?? question.answer ?? "Keine Antwort hinterlegt.";

    const options =
      Array.isArray(question.options) && question.options.length > 0
        ? question.options
        : [correctAnswer];

    const uniqueOptions = Array.from(new Set([correctAnswer, ...options]));

    return {
      id: question.id ?? `quiz-${index + 1}`,
      topic: question.topic ?? "Allgemein",
      source: question.source ?? "Demo-Daten",
      question: question.question ?? "Keine Frage hinterlegt.",
      correctAnswer,
      options: uniqueOptions,
      explanation:
        question.explanation ??
        "Für diese Frage wurde noch keine Erklärung hinterlegt.",
    };
  });
}

export function loadMatchingItems(): MatchingItem[] {
  return loadFromLocalStorage<MatchingItem[]>(
    MATCHING_STORAGE_KEY,
    demoMatchingItems
  );
}

export function resetDemoStorage() {
  window.localStorage.setItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify(demoFlashcards)
  );
  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(demoQuizQuestions));
  window.localStorage.setItem(
    MATCHING_STORAGE_KEY,
    JSON.stringify(demoMatchingItems)
  );
}