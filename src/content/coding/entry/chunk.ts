import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "chunk",
  title: "Chunk Array",
  level: "entry",
  minutes: 10,
  fn: "chunk",
  noMutate: true,
  signatureJS: `function chunk(arr, size)`,
  signatureTS: `function chunk<T>(arr: T[], size: number): T[][]`,
  description: `Split <code>arr</code> into groups of length <code>size</code>. The last group may be smaller.
If <code>size &lt;= 0</code> return an empty array. Do not mutate the input.`,
  examples: [["[1,2,3,4,5], 2","[[1,2],[3,4],[5]]"]],
  hint: "Avanza de a un bloque por vez. Piensa qué pasa con el último bloque si no está completo y si tu método de cortar modifica el arreglo.",
  solution: `function chunk(arr, size) {
  if (size <= 0) return [];
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}`,
  visible: [
    { args: [[1,2,3,4,5], 2], expected: [[1,2],[3,4],[5]] },
    { args: [[1,2,3], 5], expected: [[1,2,3]] },
  ],
  hidden: [
    { args: [[], 3], expected: [] },
    { args: [[1,2,3], 0], expected: [] },
    { args: [["a","b","c","d"], 2], expected: [["a","b"],["c","d"]] },
    { args: [[1,2,3,4,5,6,7], 3], expected: [[1,2,3],[4,5,6],[7]] },
  ],
};

export default challenge;
