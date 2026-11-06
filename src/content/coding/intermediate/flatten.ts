import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "flatten",
  title: "Deep Flatten",
  level: "intermediate",
  minutes: 15,
  fn: "flatten",
  noMutate: true,
  signatureJS: `function flatten(arr)`,
  signatureTS: `type Nested = number | Nested[];
function flatten(arr: Nested[]): number[]`,
  description: `Flatten an arbitrarily nested array into a single-level array, preserving order.
Do NOT use <code>Array.prototype.flat</code>. Do not mutate the input.`,
  examples: [["[1,[2,[3,[4]],5]]","[1,2,3,4,5]"]],
  hint: "Cada elemento es un valor o un arreglo anidado. Piensa en recursión (o una pila) y cómo detectar con seguridad que algo es un arreglo.",
  solution: `function flatten(arr) {
  const out = [];
  const walk = a => { for (const x of a) Array.isArray(x) ? walk(x) : out.push(x); };
  walk(arr);
  return out;
}`,
  visible: [
    { args: [[1,[2,[3,[4]],5]]], expected: [1,2,3,4,5] },
    { args: [[]], expected: [] },
  ],
  hidden: [
    { args: [[[[[]]]]], expected: [] },
    { args: [[1,2,3]], expected: [1,2,3] },
    { args: [[[1,2],[3,[4,[5,[6]]]],7]], expected: [1,2,3,4,5,6,7] },
  ],
};

export default challenge;
