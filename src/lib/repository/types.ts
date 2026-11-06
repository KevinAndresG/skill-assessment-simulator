import type { CodingChallenge, CodingLevel, DebugChallenge, QuizCategory, QuizQuestion, RegexChallenge } from '@/content/types';

/**
 * Contrato de acceso al contenido. Hoy lo implementa `localContentRepository`
 * (archivos en src/content). Para usar una base de datos crea otra implementación
 * (por ejemplo `supabaseContentRepository`) y cámbiala en `lib/repository/index.ts`.
 * Todos los métodos son async para que el cambio no afecte a las páginas.
 */
export interface ContentRepository {
  listCoding(level?: CodingLevel): Promise<CodingChallenge[]>;
  getCoding(id: string): Promise<CodingChallenge | null>;
  listDebug(): Promise<DebugChallenge[]>;
  getDebug(id: string): Promise<DebugChallenge | null>;
  listRegex(): Promise<RegexChallenge[]>;
  getRegex(id: string): Promise<RegexChallenge | null>;
  listQuiz(categories?: QuizCategory[]): Promise<QuizQuestion[]>;
}
