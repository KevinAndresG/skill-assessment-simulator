import type { Language, QuizCategory } from '@/content/types';

export interface QuizAttempt {
  at: number;
  categories: QuizCategory[];
  exam: boolean;
  percent: number;
}

export interface SimulationAttempt {
  at: number;
  name: string;
  results: { label: string; score: number; detail?: string }[];
  average: number;
}

export interface ProgressSnapshot {
  /** Mejor puntaje (0-100) por id de reto. */
  scores: Record<string, number>;
  /** Borradores por `${challengeId}:${lang}`. */
  drafts: Record<string, string>;
  /** Checklist del plan de estudio. */
  checks: Record<string, boolean>;
  quiz: QuizAttempt[];
  simulations: SimulationAttempt[];
  language: Language;
}

/**
 * Contrato del progreso del usuario. Hoy se guarda en localStorage
 * (`localProgressStore`); para sincronizar con una base de datos implementa
 * esta interfaz (por ejemplo con Supabase + auth) y cámbiala en `index.ts`.
 */
export interface ProgressStore {
  getSnapshot(): ProgressSnapshot;
  subscribe(listener: () => void): () => void;
  recordScore(challengeId: string, score: number): void;
  saveDraft(challengeId: string, lang: Language, code: string): void;
  setLanguage(lang: Language): void;
  toggleCheck(key: string, value: boolean): void;
  addQuizAttempt(attempt: QuizAttempt): void;
  addSimulation(attempt: SimulationAttempt): void;
  reset(): void;
}

export const EMPTY_PROGRESS: ProgressSnapshot = {
  scores: {},
  drafts: {},
  checks: {},
  quiz: [],
  simulations: [],
  language: 'js',
};
