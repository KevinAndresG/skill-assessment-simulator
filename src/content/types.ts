/**
 * Modelo de contenido. Es la "forma" que tendrá cualquier fuente de datos
 * (archivos locales hoy, base de datos mañana).
 */

export type Language = 'js' | 'ts';

export type CodingLevel = 'entry' | 'intermediate' | 'data';

export type QuizCategory = 'react' | 'ts' | 'js' | 'a11y' | 'arch' | 'web';

export interface TestCase {
  /** Argumentos con los que se llama la función (deben ser serializables a JSON). */
  args: unknown[];
  /** Valor esperado (comparación profunda). */
  expected: unknown;
}

interface ChallengeBase {
  /** Identificador único, se usa en la URL. kebab-case. */
  id: string;
  title: string;
  /** Tiempo sugerido / tiempo del modo examen. */
  minutes: number;
  /** Nombre de la función que se evalúa. */
  fn: string;
  /** Casos que el candidato puede ejecutar. */
  visible: TestCase[];
  /** Casos ocultos que definen la nota. */
  hidden: TestCase[];
  /** Si es true, falla cuando la función muta sus argumentos. */
  noMutate?: boolean;
  /** Solución de referencia en JavaScript (se valida con `npm run validate`). */
  solution: string;
}

export interface CodingChallenge extends ChallengeBase {
  kind: 'coding';
  level: CodingLevel;
  /** Firma en JS, por ejemplo `function sum(a, b)`. */
  signatureJS: string;
  /** Firma en TS (puede incluir tipos auxiliares antes de la función). */
  signatureTS: string;
  /** Enunciado en HTML simple (code, br, b). */
  description: string;
  /** Pares [input, output] para mostrar. */
  examples: [string, string][];
  hint: string;
}

export interface DebugChallenge extends ChallengeBase {
  kind: 'debug';
  level: CodingLevel;
  /** Requisitos en HTML simple. */
  requirements: string;
  /** Código inicial con bugs. Debe fallar al menos un test. */
  buggyCode: string;
  /** Lista de bugs, se muestra al pedir la solución. */
  bugs: string[];
}

export type Challenge = CodingChallenge | DebugChallenge;

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  code?: string;
  options: string[];
  /** Índice de la opción correcta. */
  answer: number;
  explanation: string;
}

export const LEVEL_LABEL: Record<CodingLevel, string> = {
  entry: 'Fácil',
  intermediate: 'Intermedio',
  data: 'Difícil',
};

export const QUIZ_CATEGORY_LABEL: Record<QuizCategory, string> = {
  react: 'React',
  ts: 'TypeScript',
  js: 'JavaScript',
  a11y: 'Accesibilidad (WCAG)',
  arch: 'Microfrontends / NX / Storybook',
  web: 'Auth · HTTP · Testing · Performance',
};
