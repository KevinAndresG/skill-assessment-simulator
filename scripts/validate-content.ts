/**
 * Valida todo el contenido antes de publicarlo:
 *  - ids únicos
 *  - cada solución pasa TODOS sus tests (visibles + ocultos) sin mutar inputs si noMutate
 *  - cada reto de debugging FALLA al menos un test con su código con bugs
 *  - las preguntas del quiz tienen un índice de respuesta válido
 *
 * Uso: npm run validate
 */
import vm from 'node:vm';
import { codingChallenges } from '../src/content/coding';
import { debugChallenges } from '../src/content/debugging';
import { quizQuestions } from '../src/content/quiz';
import type { Challenge, TestCase } from '../src/content/types';

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every(k => Object.prototype.hasOwnProperty.call(b, k) && deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
}

async function runCase(code: string, fn: string, t: TestCase, noMutate: boolean): Promise<{ pass: boolean; detail: string }> {
  try {
    const ctx = vm.createContext({ setTimeout, console, Promise });
    vm.runInContext(`${code}\n;globalThis.__fn = ${fn};`, ctx, { timeout: 1000 });
    const args = JSON.parse(JSON.stringify(t.args));
    const before = JSON.stringify(args);
    ctx.__args = args;
    let out = vm.runInContext('__fn(...__args)', ctx, { timeout: 1000 });
    if (out && typeof out.then === 'function') {
      out = await Promise.race([out, new Promise((_, rej) => setTimeout(() => rej(new Error('async timeout')), 2000))]);
    }
    const norm = out === undefined ? undefined : JSON.parse(JSON.stringify(out));
    if (!deepEqual(norm, t.expected)) return { pass: false, detail: `got ${JSON.stringify(norm)} expected ${JSON.stringify(t.expected)}` };
    if (noMutate && JSON.stringify(args) !== before) return { pass: false, detail: 'mutated input' };
    return { pass: true, detail: '' };
  } catch (e) {
    return { pass: false, detail: (e as Error).message };
  }
}

async function main() {
  const errors: string[] = [];
  const all: Challenge[] = [...codingChallenges, ...debugChallenges];

  const ids = new Set<string>();
  for (const c of all) {
    if (ids.has(c.id)) errors.push(`id duplicado: ${c.id}`);
    ids.add(c.id);
    if (!/^[a-z0-9-]+$/.test(c.id)) errors.push(`${c.id}: el id debe ser kebab-case`);
    if (!c.visible.length) errors.push(`${c.id}: necesita al menos un test visible`);
  }

  for (const c of all) {
    const tests = [...c.visible, ...c.hidden];
    for (const [i, t] of tests.entries()) {
      const r = await runCase(c.solution, c.fn, t, !!c.noMutate);
      if (!r.pass) errors.push(`${c.id}: la solución falla el test #${i + 1} → ${r.detail}`);
    }
    if (c.kind === 'debug') {
      let failing = 0;
      for (const t of tests) if (!(await runCase(c.buggyCode, c.fn, t, !!c.noMutate)).pass) failing++;
      if (!failing) errors.push(`${c.id}: el código con bugs pasa todos los tests (no hay nada que depurar)`);
    }
  }

  const qIds = new Set<string>();
  for (const q of quizQuestions) {
    if (qIds.has(q.id)) errors.push(`pregunta duplicada: ${q.id}`);
    qIds.add(q.id);
    if (q.options.length < 2) errors.push(`${q.id}: necesita al menos 2 opciones`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`${q.id}: answer fuera de rango`);
  }

  console.log(`Algoritmos: ${codingChallenges.length} · Debugging: ${debugChallenges.length} · Preguntas: ${quizQuestions.length}`);
  if (errors.length) {
    console.error(`\n✗ ${errors.length} problema(s):\n- ` + errors.join('\n- '));
    process.exit(1);
  }
  console.log('✓ Contenido válido');
}

main();
