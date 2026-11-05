import type { CodingLevel, QuizCategory } from '@/content/types';

export type SimulationStage =
  | { type: 'quiz'; label: string; categories: QuizCategory[]; count: number; minutes: number }
  | { type: 'coding'; label: string; pool: CodingLevel | 'debug'; minutes: number };

export interface SimulationConfig {
  id: string;
  name: string;
  stages: SimulationStage[];
}

/** Para crear otro simulacro, agrega un objeto a esta lista. */
export const SIMULATIONS: SimulationConfig[] = [
  {
    id: 'corto',
    name: 'Corto · 25 min',
    stages: [
      { type: 'quiz', label: 'React (MCQ)', categories: ['react'], count: 10, minutes: 10 },
      { type: 'coding', label: 'Algoritmo entry', pool: 'entry', minutes: 15 },
    ],
  },
  {
    id: 'completo',
    name: 'Completo · ~65 min',
    stages: [
      { type: 'quiz', label: 'React (MCQ)', categories: ['react'], count: 10, minutes: 10 },
      { type: 'quiz', label: 'TS/JS (MCQ)', categories: ['ts', 'js'], count: 10, minutes: 10 },
      { type: 'coding', label: 'Algoritmo entry', pool: 'entry', minutes: 15 },
      { type: 'coding', label: 'Debugging', pool: 'debug', minutes: 30 },
    ],
  },
  {
    id: 'mid',
    name: 'Mid-level · ~72 min',
    stages: [
      { type: 'quiz', label: 'Mixto (MCQ)', categories: ['react', 'ts', 'a11y', 'arch', 'web'], count: 12, minutes: 12 },
      { type: 'coding', label: 'Algoritmo intermedio', pool: 'intermediate', minutes: 30 },
      { type: 'coding', label: 'Debugging', pool: 'debug', minutes: 30 },
    ],
  },
];
