// src/shared/data/demo-content.ts

import demoFlashcardsJson from "./demo-flashcards.json";
import demoMatchingJson from "./demo-matching.json";
import demoQuizJson from "./demo-quiz.json";

export type Flashcard = {
  id: string;
  front: string;
  back: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  answer: string;
};

export type MatchingItem = {
  id: string;
  left: string;
  right: string;
};

export const demoFlashcards = demoFlashcardsJson as Flashcard[];
export const demoQuizQuestions = demoQuizJson as QuizQuestion[];
export const demoMatchingItems = demoMatchingJson as MatchingItem[];