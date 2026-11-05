import type { TestCase } from '@/content/types';
import { buildWorkerSource, HEADER_LINES } from './harness';
import type { RunOutcome, ScoreSummary } from './types';

/**
 * Ejecuta el código en un Web Worker aislado (sin eval en la página) con timeout,
 * como hace la plataforma: un bucle infinito = timeout.
 */
export function runTests(js: string, fnName: string, tests: TestCase[], noMutate = false, timeoutMs = 4000): Promise<RunOutcome> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(new Blob([buildWorkerSource(js, fnName, tests, noMutate)], { type: 'text/javascript' }));
    let worker: Worker;
    try {
      worker = new Worker(url);
    } catch (e) {
      resolve({ status: 'fatal', message: 'El navegador bloqueó el Worker: ' + (e as Error).message });
      return;
    }
    const userLines = js.split('\n').length;
    const done = (r: RunOutcome) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(r);
    };
    const timer = setTimeout(() => done({ status: 'timeout' }), timeoutMs);
    worker.onmessage = e => done(e.data as RunOutcome);
    worker.onerror = e => {
      e.preventDefault();
      const ln = e.lineno ? e.lineno - HEADER_LINES : 0;
      const where = ln > 0 && ln <= userLines ? ` (línea ${ln})` : ln > userLines ? ' (al final del código: ¿falta cerrar una llave o un paréntesis?)' : '';
      done({ status: 'fatal', message: (e.message || 'Error de sintaxis') + where });
    };
  });
}

/** Regla de evaluación: % de casos que pasan, pero 0 si alguno lanzó una excepción. */
export function summarize(outcome: RunOutcome, total: number, strict: boolean): ScoreSummary {
  if (outcome.status !== 'ok') return { passed: 0, total, score: 0, hadErrors: true };
  const passed = outcome.results.filter(r => r.pass).length;
  const hadErrors = outcome.results.some(r => r.error);
  const score = strict && hadErrors ? 0 : Math.round((passed / total) * 100);
  return { passed, total, score, hadErrors };
}
