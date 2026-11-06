import type { RegexCase, RegexMode } from '@/content/types';
import { EVAL_SRC, type RegexOutcome } from './evaluate';

/** Ejecuta la regex del usuario en un Web Worker con timeout (protege de backtracking catastrófico). */
export function runRegex(mode: RegexMode, pattern: string, flags: string, replacement: string, cases: RegexCase[], timeoutMs = 2000): Promise<RegexOutcome> {
  return new Promise(resolve => {
    const args = [mode, pattern, flags, replacement, cases].map(v => JSON.stringify(v)).join(', ');
    const src = `${EVAL_SRC}\npostMessage(__evalRegex(${args}));`;
    const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    const worker = new Worker(url);
    const done = (r: RegexOutcome) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(r);
    };
    const timer = setTimeout(() => done({ status: 'timeout' }), timeoutMs);
    worker.onmessage = e => done(e.data.fatal ? { status: 'fatal', message: e.data.fatal } : { status: 'ok', results: e.data.results });
    worker.onerror = e => {
      e.preventDefault();
      done({ status: 'fatal', message: e.message || 'Error al evaluar la expresión' });
    };
  });
}
