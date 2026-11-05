export interface TestCaseResult {
  pass: boolean;
  /** Salida formateada. */
  out?: string;
  error?: string;
  ms?: number;
  note?: string;
}

export type RunOutcome =
  | { status: 'ok'; results: TestCaseResult[]; logs: string[] }
  | { status: 'timeout' }
  | { status: 'fatal'; message: string; logs?: string[] };

export interface ScoreSummary {
  passed: number;
  total: number;
  /** Puntaje de evaluación: 0 si hubo una excepción en algún caso. */
  score: number;
  hadErrors: boolean;
}
