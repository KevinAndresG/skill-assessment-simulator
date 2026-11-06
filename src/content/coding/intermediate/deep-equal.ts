import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "deep-equal",
  title: "Deep Equal",
  level: "intermediate",
  minutes: 20,
  fn: "deepEqual",
  signatureJS: `function deepEqual(a, b)`,
  signatureTS: `function deepEqual(a: unknown, b: unknown): boolean`,
  description: `Return <code>true</code> if two JSON-like values (null, numbers, strings, booleans, arrays, plain objects) are deeply equal.
Object key order does not matter. An array is never equal to an object.`,
  examples: [["{a:[1,{b:2}]}, {a:[1,{b:2}]}","true"],["[1,2], {0:1,1:2}","false"]],
  hint: "Separa casos: valores simples, arreglos y objetos. Para estos dos últimos, ¿qué debes comparar primero antes de bajar a cada elemento o clave?",
  solution: `function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every(k => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
}`,
  visible: [
    { args: [{"a":[1,{"b":2}]}, {"a":[1,{"b":2}]}], expected: true },
    { args: [[1,2], {"0":1,"1":2}], expected: false },
  ],
  hidden: [
    { args: [{"x":1,"y":2}, {"y":2,"x":1}], expected: true },
    { args: [null, {}], expected: false },
    { args: [[1,[2,3]], [1,[2,4]]], expected: false },
    { args: [{"a":1}, {"a":1}], expected: true },
    { args: ["1", 1], expected: false },
    { args: [[], []], expected: true },
  ],
};

export default challenge;
